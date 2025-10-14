import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { School, PlayArrow } from '@mui/icons-material';
import { COLORS, GRADIENTS, SHADOWS } from '../../constants';

const EmptyState: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        background: GRADIENTS.card,
        borderRadius: "20px",
        padding: "48px",
        textAlign: "center",
        border: "1px solid #e2e8f0",
        boxShadow: SHADOWS.xl,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: GRADIENTS.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}
      >
        <School sx={{ color: "white", fontSize: 40 }} />
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: COLORS.text.primary,
          fontWeight: 700,
          mb: 2,
          fontSize: "28px",
        }}
      >
        Welcome to Your Learning Journey
      </Typography>
      <Typography
        sx={{
          color: COLORS.text.muted,
          fontSize: "16px",
          mb: 4,
          maxWidth: "500px",
          margin: "0 auto 32px",
          lineHeight: 1.6,
        }}
      >
        Select a unit from the sidebar to start learning and practicing. Each unit contains interactive content designed to enhance your understanding.
      </Typography>
      <Button
        variant="contained"
        startIcon={<PlayArrow />}
        sx={{
          background: GRADIENTS.primary,
          borderRadius: "12px",
          padding: "12px 24px",
          fontWeight: 600,
          fontSize: "16px",
          textTransform: "none",
          boxShadow: SHADOWS.purple,
          "&:hover": {
            background: GRADIENTS.primaryHover,
            boxShadow: SHADOWS.purpleHover,
          },
        }}
      >
        Get Started
      </Button>
    </Paper>
  );
};

export default EmptyState;
