import React from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
// NOTE: Re-importing necessary constants/types
import { COLORS, GRADIENTS, SHADOWS } from "../../constants";
import { Question } from "../../types";

// NOTE: Interfaces for PracticeState are defined minimally for this component
interface PracticeState {
  currentQuestionIndex: number;
  userAnswers: Record<string, string | string[]>;
}

interface QuestionNavigatorProps {
  practiceState: PracticeState;
  questions: Question[];
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  goToQuestion: (index: number) => void;
}

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  practiceState,
  questions,
  goToNextQuestion,
  goToPreviousQuestion,
  goToQuestion,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        borderTop: `1px solid ${COLORS.border.light}`,
        background: COLORS.background.light,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        onClick={goToPreviousQuestion}
        disabled={practiceState.currentQuestionIndex === 0}
        sx={{
          borderColor: COLORS.primary,
          color: COLORS.primary,
          fontWeight: 600,
          px: 3,
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          "&:hover": {
            borderColor: COLORS.primaryDark,
            background: "rgba(79, 57, 246, 0.08)",
            boxShadow: SHADOWS.purple,
          },
          "&:disabled": {
            borderColor: COLORS.border.light,
            color: COLORS.text.light,
            background: COLORS.background.light,
          },
        }}
      >
        Previous
      </Button>

      {/* Question Jump Navigation */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {questions.map((question, idx) => (
          <Tooltip key={idx} title={`Question ${idx + 1}`}>
            <IconButton
              onClick={() => goToQuestion(idx)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background:
                  idx === practiceState.currentQuestionIndex
                    ? GRADIENTS.primary
                    : practiceState.userAnswers[question.id]
                      ? "#10B981"
                      : COLORS.border.light,
                color:
                  idx === practiceState.currentQuestionIndex ||
                    practiceState.userAnswers[question.id]
                    ? "white"
                    : COLORS.text.secondary,
                fontWeight: 600,
                fontSize: "14px",
                transition: "all 0.2s ease",
                "&:hover": {
                  background:
                    idx === practiceState.currentQuestionIndex
                      ? GRADIENTS.primaryHover
                      : practiceState.userAnswers[question.id]
                        ? "#059669"
                        : COLORS.border.medium,
                  transform: "scale(1.05)",
                  boxShadow: SHADOWS.md,
                },
              }}
            >
              {idx + 1}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Button
        variant="outlined"
        onClick={goToNextQuestion}
        disabled={practiceState.currentQuestionIndex === questions.length - 1}
        sx={{
          borderColor: COLORS.primary,
          color: COLORS.primary,
          fontWeight: 600,
          px: 3,
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          "&:hover": {
            borderColor: COLORS.primaryDark,
            background: "rgba(79, 57, 246, 0.08)",
            boxShadow: SHADOWS.purple,
          },
          "&:disabled": {
            borderColor: COLORS.border.light,
            color: COLORS.text.light,
            background: COLORS.background.light,
          },
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default QuestionNavigator;
