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

  // Update local state when userAnswer prop changes or when previousPractice exists
  useEffect(() => {
    if (userAnswer) {
      if (typeof userAnswer === "string") {
        setSelectedAnswers([userAnswer]);
      } else if (Array.isArray(userAnswer)) {
        setSelectedAnswers(userAnswer);
      }
    } else if (question.previousPractice?.selectedOptionId) {
      // If no userAnswer but there's a previous practice, show the previously selected option
      setSelectedAnswers([question.previousPractice.selectedOptionId.toString()]);
    } else {
      setSelectedAnswers([]);
    }
  }, [userAnswer, question.previousPractice]);

  const handleOptionClick = (optionIndex: number) => {
    if (!practiceMode) return;

    // Use the option ID from API if available, otherwise fall back to index
    const option = question.content.options?.[optionIndex];
    const optionId = option?.id?.toString() ?? optionIndex.toString();

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

  // Check if we should show previous practice info
  const hasPreviousPractice = question.previousPractice && !practiceMode;
  const previousScore = question.previousPractice?.score;
  const previousIsCorrect = question.previousPractice?.isCorrect;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Show previous practice score if available and not in practice mode */}
      {hasPreviousPractice && previousScore !== undefined && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: "8px",
            background: previousIsCorrect
              ? "linear-gradient(135deg, #ECFDF8 0%, #D1FAE5 100%)"
              : "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
            border: `2px solid ${previousIsCorrect ? "#10B981" : "#EF4444"}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: previousIsCorrect ? "#065F46" : "#991B1B",
            }}
          >
            {previousIsCorrect ? "✓ Correct Answer" : "✗ Incorrect Answer"} - Score: {previousScore}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {question.content.options.map((opt, oidx) => {
          // Use API option ID if available, otherwise fall back to index
          const optionId = opt.id?.toString() ?? oidx.toString();
          const isSelected = selectedAnswers.includes(optionId);
          const isCorrect = opt.isCorrect;
          const showCorrectAnswer = showAnswers && isCorrect;
          const showUserAnswer = showAnswers && isSelected;
          // Show previous selection if not in practice mode and this option was previously selected
          const isPreviouslySelected = hasPreviousPractice && 
            question.previousPractice?.selectedOptionId?.toString() === optionId;

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
          } else if (hasPreviousPractice && isPreviouslySelected) {
            // Show previously selected option when viewing completed practice
            borderColor = previousIsCorrect ? "#10B981" : "#EF4444";
            backgroundColor = previousIsCorrect ? "#ECFDF8" : "#FEF2F2";
            textColor = previousIsCorrect ? "#065F46" : "#991B1B";
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
                checked={isSelected || isPreviouslySelected}
                disabled={!practiceMode}
                onChange={() => handleOptionClick(oidx)}
                style={{
                  marginRight: 12,
                  accentColor: (isSelected || isPreviouslySelected) ? "#6A42AB" : "#E6E6E6",
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
              {hasPreviousPractice && isPreviouslySelected && !showAnswers && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: previousIsCorrect ? "#10B981" : "#EF4444",
                    fontWeight: 600,
                    ml: 1,
                  }}
                >
                  {previousIsCorrect ? "✓ Previously Selected" : "✗ Previously Selected"}
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
