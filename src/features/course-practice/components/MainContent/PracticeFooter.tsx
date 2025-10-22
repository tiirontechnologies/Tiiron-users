import React from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../../constants";
import Scoresvg from "@icons/Score.svg";

interface PracticeState {
  showResults: boolean;
  score: number;
  totalQuestions: number;
  isPracticeMode: boolean;
  completedQuestions: number;
}

interface PracticeFooterProps {
  practiceState: PracticeState;
  questionsLength: number;
}

const PracticeFooter: React.FC<PracticeFooterProps> = ({
  practiceState,
  questionsLength,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: "289px",
        right: 0,
        background: "white",
        borderTop: "1px solid #E5E7EB",
        zIndex: 1000,
        p: 3,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={Scoresvg}
            alt="Score"
            style={{ width: "40px", height: "40px" }}
          />
          <Box>
            {practiceState.showResults ? (
              <>
                <Typography
                  sx={{
                    color: COLORS.text.muted,
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Practice Complete! Your score:
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.primary,
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  {practiceState.score} / {questionsLength}
                </Typography>
              </>
            ) : practiceState.isPracticeMode ? (
              <>
                <Typography
                  sx={{
                    color: COLORS.text.muted,
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Progress
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.text.primary,
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  {practiceState.completedQuestions} / {questionsLength}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    color: COLORS.text.muted,
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Ready to practice
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.text.primary,
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  {questionsLength} Questions
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PracticeFooter;
