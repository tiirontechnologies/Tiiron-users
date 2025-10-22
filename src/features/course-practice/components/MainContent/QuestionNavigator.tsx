import React from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
// NOTE: Re-importing necessary constants/types
import { COLORS, GRADIENTS } from "../../constants";
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
        borderTop: "1px solid #E5E7EB",
        background: "#f8fafc",
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
            background: "rgba(106, 66, 171, 0.05)",
          },
          "&:disabled": {
            borderColor: "#E5E7EB",
            color: "#9CA3AF",
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
                    : "#E5E7EB",
                color:
                  idx === practiceState.currentQuestionIndex ||
                  practiceState.userAnswers[question.id]
                    ? "white"
                    : COLORS.text.muted,
                fontWeight: 600,
                fontSize: "14px",
                "&:hover": {
                  background:
                    idx === practiceState.currentQuestionIndex
                      ? GRADIENTS.primaryHover
                      : practiceState.userAnswers[question.id]
                      ? "#059669"
                      : "#D1D5DB",
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
            background: "rgba(106, 66, 171, 0.05)",
          },
          "&:disabled": {
            borderColor: "#E5E7EB",
            color: "#9CA3AF",
          },
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default QuestionNavigator;
