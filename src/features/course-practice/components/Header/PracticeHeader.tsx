import React from "react";
import { Box, Typography, Button, LinearProgress, Chip } from "@mui/material";
// NOTE: Re-importing necessary constants/types
import { GRADIENTS } from "../../constants";

interface PracticeState {
  isPracticeMode: boolean;
  currentQuestionIndex: number;
  completedQuestions: number;
  showResults: boolean;
}

interface PracticeHeaderProps {
  practiceState: PracticeState;
  questionsLength: number;
  timeSpent: number;
  isAutoSaving: boolean;
  hasUnsavedChanges: boolean;
  progressPercentage: number;
  startPractice: () => Promise<void>;
  endPractice: () => Promise<void>;
  resetPractice: () => void;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

const PracticeHeader: React.FC<PracticeHeaderProps> = ({
  practiceState,
  questionsLength,
  timeSpent,
  isAutoSaving,
  hasUnsavedChanges,
  progressPercentage,
  startPractice,
  endPractice,
  resetPractice,
}) => {
  return (
    <Box
      sx={{
        background: GRADIENTS.primary,
        color: "white",
        p: 3,
        borderRadius: "16px",
        mb: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: "28px",
            }}
          >
            Practice Questions
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}
            >
              {questionsLength} Questions Available
            </Typography>
            {practiceState.isPracticeMode && (
              <>
                <Chip
                  label={`Question ${
                    practiceState.currentQuestionIndex + 1
                  } of ${questionsLength}`}
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={`${practiceState.completedQuestions} answered`}
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={`⏱️ ${Math.floor(timeSpent / 60)}:${String(
                    timeSpent % 60
                  ).padStart(2, "0")}`}
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                {isAutoSaving && (
                  <Chip
                    label="💾 Saving..."
                    size="small"
                    sx={{
                      background: "rgba(16, 185, 129, 0.2)",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                )}
                {hasUnsavedChanges && !isAutoSaving && (
                  <Chip
                    label="⚠️ Unsaved"
                    size="small"
                    sx={{
                      background: "rgba(245, 158, 11, 0.2)",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Practice Controls */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {!practiceState.isPracticeMode && !practiceState.showResults && (
            <Button
              variant="contained"
              onClick={startPractice}
              sx={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "12px",
                textTransform: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              }}
            >
              Start Practice
            </Button>
          )}

          {practiceState.isPracticeMode && (
            <Button
              variant="outlined"
              onClick={endPractice}
              sx={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Submit Practice
            </Button>
          )}

          {practiceState.showResults && (
            <Button
              variant="contained"
              onClick={resetPractice}
              sx={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "12px",
                textTransform: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              }}
            >
              Practice Again
            </Button>
          )}
        </Box>
      </Box>

      {/* Progress Bar */}
      {practiceState.isPracticeMode && (
        <Box sx={{ mt: 3, position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}
            >
              Progress
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}
            >
              {Math.round(progressPercentage)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "white",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
  // --- END: ORIGINAL HEADER JSX ---
};

export default PracticeHeader;
