import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../types";

interface McqTemplateProps {
  question: Question;
  practiceMode?: boolean;
  showAnswers?: boolean;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
}

const McqTemplate: React.FC<McqTemplateProps> = ({
  question,
  practiceMode = false,
  showAnswers = false,
  userAnswer,
  onAnswerChange,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const allowMultipleSelection =
    question.content?.allowMultipleSelection || false;

  // Update local state when userAnswer prop changes
  useEffect(() => {
    if (userAnswer) {
      if (typeof userAnswer === "string") {
        setSelectedAnswers([userAnswer]);
      } else if (Array.isArray(userAnswer)) {
        setSelectedAnswers(userAnswer);
      }
    } else {
      setSelectedAnswers([]);
    }
  }, [userAnswer]);

  const handleOptionClick = (optionIndex: number) => {
    if (!practiceMode) return;

    const optionId = optionIndex.toString();

    if (allowMultipleSelection) {
      // Multiple selection logic
      const newSelectedAnswers = selectedAnswers.includes(optionId)
        ? selectedAnswers.filter((id) => id !== optionId) // Remove if already selected
        : [...selectedAnswers, optionId]; // Add if not selected

      setSelectedAnswers(newSelectedAnswers);
      onAnswerChange?.(newSelectedAnswers);
    } else {
      // Single selection logic
      setSelectedAnswers([optionId]);
      onAnswerChange?.(optionId);
    }
  };

  if (!Array.isArray(question.content.options)) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {question.content.options.map((opt, oidx) => {
          const optionId = oidx.toString();
          const isSelected = selectedAnswers.includes(optionId);
          const isCorrect = opt.isCorrect;
          const showCorrectAnswer = showAnswers && isCorrect;
          const showUserAnswer = showAnswers && isSelected;

          // Determine styling based on mode
          let borderColor = "#E6E6E6";
          let backgroundColor = "#F9FAFA";
          let textColor = "#222";

          if (practiceMode) {
            // Practice mode styling
            if (isSelected) {
              borderColor = "#6A42AB";
              backgroundColor = "#ECFDF8";
            } else {
              borderColor = "#E6E6E6";
              backgroundColor = "#F9FAFA";
            }
          } else if (showAnswers) {
            // Review mode styling
            if (showCorrectAnswer) {
              borderColor = "#10B981";
              backgroundColor = "#ECFDF8";
              textColor = "#065F46";
            } else if (showUserAnswer && !isCorrect) {
              borderColor = "#EF4444";
              backgroundColor = "#FEF2F2";
              textColor = "#991B1B";
            }
          }

          return (
            <Box
              key={oidx}
              onClick={() => handleOptionClick(oidx)}
              sx={{
                flex: 1,
                minWidth: 180,
                border: `2px solid ${borderColor}`,
                p: "12px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                mb: 1,
                background: backgroundColor,
                cursor: practiceMode ? "pointer" : "default",
                transition: "all 0.2s ease",
                "&:hover": practiceMode
                  ? {
                      borderColor: "#6A42AB",
                      backgroundColor: "#F3F4F6",
                    }
                  : {},
              }}
            >
              <input
                type={allowMultipleSelection ? "checkbox" : "radio"}
                checked={isSelected}
                disabled={!practiceMode}
                onChange={() => handleOptionClick(oidx)}
                style={{
                  marginRight: 12,
                  accentColor: isSelected ? "#6A42AB" : "#E6E6E6",
                  cursor: practiceMode ? "pointer" : "default",
                }}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  color: textColor,
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                {opt.text}
              </Typography>
              {showAnswers && showCorrectAnswer && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#10B981",
                    fontWeight: 600,
                    ml: 1,
                  }}
                >
                  ✓ Correct
                </Typography>
              )}
              {showAnswers && showUserAnswer && !isCorrect && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#EF4444",
                    fontWeight: 600,
                    ml: 1,
                  }}
                >
                  ✗ Your Answer
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default McqTemplate;
