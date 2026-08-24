import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { commentTheme } from "../theme";

const EmptyComment: React.FC = () => (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1.5}
    sx={{ py: 6, textAlign: "center" }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        bgcolor: commentTheme.colors.mentorBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ForumOutlinedIcon sx={{ fontSize: 30, color: commentTheme.colors.primary }} />
    </Box>
    <Typography sx={{ fontWeight: 600, fontSize: 15, color: commentTheme.colors.textPrimary }}>
      No discussions yet
    </Typography>
    <Typography sx={{ fontSize: 13, color: commentTheme.colors.textSecondary, maxWidth: 280 }}>
      Be the first to ask a question or share your thoughts on this lesson.
    </Typography>
  </Stack>
);

export default EmptyComment;
