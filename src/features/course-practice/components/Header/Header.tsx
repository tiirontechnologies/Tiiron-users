import React from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
//import { School, Star } from '@mui/icons-material';
import { School } from '@mui/icons-material';
import { COLORS, GRADIENTS, SHADOWS } from '../../constants';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface HeaderProps {
  courseName?: string;
  chapterInfo?: string;
  score?: string;
  progress?: string;
}

const Header: React.FC<HeaderProps> = ({
  courseName = "",
  chapterInfo = "Chapter 1 - Lesson 1",
  // score = "25/30",
  // progress = "83% Complete"
}) => {
  
    const [openRating, setOpenRating] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(0);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "289px",
        right: 0,
        height: "84px",
        background: COLORS.background.white,
        color: COLORS.text.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "0 32px",
        borderBottom: `1px solid ${COLORS.border.light}`,
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
      {/* right side rating icon  */}
      <Box>
  <IconButton onClick={() => setOpenRating(true)}>
    <StarIcon sx={{ color: "#F59E0B" }} />
  </IconButton>
</Box>
    </Box>
  );
};

export default Header;
