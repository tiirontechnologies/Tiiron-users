import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../types";
import { COLORS, SHADOWS } from "../../constants";

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
    // Disable selection if question has been practiced
    if (!effectivePracticeMode || isPracticed) return;

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

  // Safety check: ensure content and options exist
  if (!question.content || !Array.isArray(question.content.options) || question.content.options.length === 0) {
    return (
      <Box sx={{ mt: 2, p: 2, background: COLORS.background.light, borderRadius: "8px" }}>
        <Typography variant="body2" sx={{ color: COLORS.text.muted }}>
          No options available for this question.
        </Typography>
        {process.env.NODE_ENV === 'development' && (
          <Typography variant="caption" sx={{ color: COLORS.text.muted, display: 'block', mt: 1 }}>
            Debug: content={!!question.content}, options={Array.isArray(question.content?.options) ? question.content.options.length : 'not array'}
          </Typography>
        )}
      </Box>
    );
  }

  // Check if question has been practiced (has selectedOptionId)
  const hasPreviousPractice = !!question.previousPractice?.selectedOptionId;
  const previousScore = question.previousPractice?.score;
  const previousIsCorrect = question.previousPractice?.isCorrect;
  const selectedOptionId = question.previousPractice?.selectedOptionId;
  
  // If question has been practiced, disable practice mode (show results instead)
  const isPracticed = hasPreviousPractice;
  const effectivePracticeMode = practiceMode && !isPracticed;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Show previous practice score if question has been practiced */}
      {isPracticed && previousScore !== undefined && (
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
      <Box sx={{ display: "flex", gap: { xs: 1.25, sm: 2 }, flexWrap: "wrap" }}>
        {question.content.options.map((opt, oidx) => {
          // Use API option ID if available, otherwise fall back to index
          const optionId = opt.id?.toString() ?? oidx.toString();
          const isSelected = selectedAnswers.includes(optionId);
          
          // Handle isCorrect: may be undefined if question not practiced
          // For practiced questions, isCorrect should be present (true/false)
          // For unpracticed questions, isCorrect will be undefined
          const isCorrect = opt.isCorrect;
          const hasIsCorrectField = opt.hasOwnProperty('isCorrect');
          
          // Check if this is the previously selected option
          const isPreviouslySelected = isPracticed &&
            selectedOptionId?.toString() === optionId;

          // Determine styling based on mode
          let borderColor: string = COLORS.border.light;
          let backgroundColor: string = COLORS.background.light;
          let textColor: string = COLORS.text.primary;

          if (isPracticed) {
            // Question has been practiced - show results
            // isCorrect should be present for practiced questions
            if (isPreviouslySelected) {
              // This is the selected option
              if (previousIsCorrect) {
                // Correct answer - show in green
                borderColor = "#10B981";
                backgroundColor = "#ECFDF8";
                textColor = "#065F46";
              } else {
                // Wrong answer - show in red
                borderColor = "#EF4444";
                backgroundColor = "#FEF2F2";
                textColor = "#991B1B";
              }
            } else if (hasIsCorrectField && isCorrect === true) {
              // Show correct answers (even if not selected) - only if isCorrect is explicitly true
              borderColor = "#10B981";
              backgroundColor = "#ECFDF8";
              textColor = "#065F46";
            }
          } else if (effectivePracticeMode) {
            // Practice mode styling (question not yet practiced)
            if (isSelected) {
              borderColor = COLORS.primary;
              backgroundColor = "#ECFDF8";
            } else {
              borderColor = COLORS.border.light;
              backgroundColor = COLORS.background.light;
            }
          } else if (showAnswers) {
            // Review mode styling
            if (isCorrect) {
              borderColor = "#10B981";
              backgroundColor = "#ECFDF8";
              textColor = "#065F46";
            } else if (isSelected && !isCorrect) {
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
                flex: { xs: "1 1 100%", sm: "1 1 180px" },
                minWidth: 0,
                border: `2px solid ${borderColor}`,
                p: { xs: "9px 11px", sm: "10px 13px" },
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                mb: 1,
                background: backgroundColor,
                cursor: effectivePracticeMode ? "pointer" : "default",
                transition: "all 0.2s ease",
                "&:hover": effectivePracticeMode
                  ? {
                    borderColor: COLORS.primary,
                    backgroundColor: isSelected ? "#D1FAE5" : COLORS.background.lighter,
                    boxShadow: SHADOWS.sm,
                    transform: "translateY(-1px)",
                  }
                  : {},
              }}
            >
              <input
                type={allowMultipleSelection ? "checkbox" : "radio"}
                name={allowMultipleSelection ? undefined : `question-${question.id || 'mcq'}`}
                value={optionId}
                checked={!!(isSelected || isPreviouslySelected)}
                disabled={!effectivePracticeMode || isPracticed}
                onChange={() => handleOptionClick(oidx)}
                style={{
                  accentColor: (isSelected || isPreviouslySelected) ? COLORS.primary : COLORS.border.light,
                  cursor: effectivePracticeMode ? "pointer" : "default",
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "14px" },
                  color: textColor,
                  fontWeight: 500,
                  flex: 1,
                  minWidth: 0,
                  wordBreak: "break-word",
                }}
              >
                {opt.text}
              </Typography>
              {/* Show labels for practiced questions */}
              {isPracticed && (
                <>
                  {isPreviouslySelected && previousIsCorrect && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#10B981",
                        fontWeight: 600,
                        ml: { xs: 0, sm: 1 },
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      ✓ Your Answer (Correct)
                    </Typography>
                  )}
                  {isPreviouslySelected && !previousIsCorrect && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#EF4444",
                        fontWeight: 600,
                        ml: { xs: 0, sm: 1 },
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      ✗ Your Answer (Wrong)
                    </Typography>
                  )}
                  {!isPreviouslySelected && hasIsCorrectField && isCorrect === true && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#10B981",
                        fontWeight: 600,
                        ml: { xs: 0, sm: 1 },
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      ✓ Correct Answer
                    </Typography>
                  )}
                </>
              )}
              {/* Legacy support for showAnswers mode */}
              {!isPracticed && showAnswers && hasIsCorrectField && isCorrect === true && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#10B981",
                    fontWeight: 600,
                    ml: { xs: 0, sm: 1 },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  ✓ Correct
                </Typography>
              )}
              {!isPracticed && showAnswers && isSelected && hasIsCorrectField && isCorrect === false && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#EF4444",
                    fontWeight: 600,
                    ml: { xs: 0, sm: 1 },
                    width: { xs: "100%", sm: "auto" },
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
