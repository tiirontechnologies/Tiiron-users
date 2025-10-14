import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ProgressStats } from '../../types';
import { COLORS, GRADIENTS } from '../../constants';
import ProgressBar from '@components/ui/CustomProgress';

interface ProgressCardProps {
  stats: ProgressStats;
  title?: string;
  subtitle?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  stats, 
  title = "Course Progress",
  subtitle = "Track your progress"
}) => {
  return (
    <Box
      sx={{
        background: GRADIENTS.card,
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid #e2e8f0",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontSize: "14px", color: COLORS.text.muted, fontWeight: 600 }}>
          {title}
        </Typography>
        <Chip
          label={`${stats.percentage}%`}
          size="small"
          sx={{
            background: GRADIENTS.primary,
            color: "white",
            fontWeight: 700,
            fontSize: "12px",
          }}
        />
      </Box>
      <ProgressBar progress={stats.percentage} />
      <Typography sx={{ fontSize: "12px", color: COLORS.text.muted, fontWeight: 500, mt: 1 }}>
        {stats.current} of {stats.total} lessons completed
      </Typography>
    </Box>
  );
};

export default ProgressCard;
