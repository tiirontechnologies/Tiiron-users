import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

const ComingSoon: React.FC = () => {
  return (
    <Box
      sx={{
        py: 4,
        px: 3,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Icon badge */}
      <Box
        sx={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          boxShadow: "0 10px 30px rgba(79,70,229,0.35)",
          mb: 3,
        }}
      >
        <MenuBookRoundedIcon sx={{ fontSize: 42, color: "#fff" }} />
      </Box>

      <Chip
        icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
        label="Coming Soon"
        sx={{
          mb: 2,
          fontWeight: 700,
          bgcolor: "rgba(79,70,229,0.1)",
          color: "#4f46e5",
          border: "1px solid rgba(79,70,229,0.25)",
        }}
      />
<Typography variant="h6" fontWeight={700} gutterBottom>
  Stay tuned
</Typography>

<Typography
  variant="body2"
  color="text.secondary"
  sx={{ maxWidth: 380, lineHeight: 1.7 }}
>
  This section is currently being prepared. We're working to bring you fresh
  content and it will be available very soon.
</Typography>

      {/* Decorative dots */}
      <Stack direction="row" spacing={1} mt={4}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#4f46e5",
              opacity: i === 1 ? 1 : 0.3,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ComingSoon;