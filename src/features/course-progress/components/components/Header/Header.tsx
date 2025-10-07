import React from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { School, Star } from '@mui/icons-material';
import { COLORS, GRADIENTS, SHADOWS } from '../../constants';

interface HeaderProps {
  courseName?: string;
  chapterInfo?: string;
  score?: string;
  progress?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  courseName = "Advanced React Development",
  chapterInfo = "Chapter 1 - Lesson 1",
  score = "25/30",
  progress = "83% Complete"
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "289px",
        right: 0,
        height: "84px",
        background: GRADIENTS.background,
        color: COLORS.text.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "0 32px",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: SHADOWS.sm,
        zIndex: 1000,
      }}
    >
      {/* Left Section - Course Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            background: GRADIENTS.primary,
            width: 48,
            height: 48,
          }}
        >
          <School sx={{ color: "white", fontSize: 24 }} />
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: COLORS.text.primary,
              lineHeight: 1.2,
            }}
          >
            {courseName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <Typography
              component="span"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                color: COLORS.text.muted,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              📚 {chapterInfo}
            </Typography>
            <Chip
              label="In Progress"
              size="small"
              sx={{
                background: GRADIENTS.primary,
                color: "white",
                fontWeight: 600,
                fontSize: "12px",
                height: "20px",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Right Section - Score */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: GRADIENTS.background,
          padding: "12px 20px",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: GRADIENTS.primary,
            padding: "8px 16px",
            borderRadius: "12px",
            color: "white",
          }}
        >
          <Star sx={{ fontSize: 20 }} />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: 1,
            }}
          >
            {score}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: COLORS.text.muted,
              textAlign: "right",
            }}
          >
            Points Earned
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: COLORS.text.light,
              textAlign: "right",
            }}
          >
            {progress}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
