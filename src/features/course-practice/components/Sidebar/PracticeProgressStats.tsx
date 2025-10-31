import React from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../../constants";
import { LinearProgress } from "@mui/material";

interface PracticeStats {
  totalSessions: number;
  completedSessions: number;
  averageScore: number;
  progressPercent: number;
}

interface PracticeProgressStatsProps {
  stats: PracticeStats;
}

const PracticeProgressStats: React.FC<PracticeProgressStatsProps> = ({
  stats: {
    totalSessions = 0,
    completedSessions = 0,
    averageScore = 0,
    progressPercent = 0,
  },
}) => {
  if (totalSessions === 0) {
    return (
      <Typography sx={{ fontSize: "12px", color: COLORS.text.muted, mt: 1 }}>
        No Practice Data Available
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        p: 1,
        borderRadius: "8px",
        background: COLORS.background.default,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: COLORS.text.primary,
          mb: 1,
        }}
      >
        Practice Stats
      </Typography>

      {/* Progress Bar (NEW) */}
      <Box sx={{ my: 1 }}>
        <Typography sx={{ fontSize: "12px", color: COLORS.text.secondary }}>
          Progress: {progressPercent}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography sx={{ fontSize: "12px", color: COLORS.text.secondary }}>
          Avg. Score:
        </Typography>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 700, color: COLORS.success }}
        >
          {averageScore.toFixed(0)}%
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography sx={{ fontSize: "12px", color: COLORS.text.secondary }}>
          Sessions Completed:
        </Typography>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 700, color: COLORS.text.primary }}
        >
          {completedSessions} / {totalSessions}
        </Typography>
      </Box>
    </Box>
  );
};

export default PracticeProgressStats;
