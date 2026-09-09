import React from "react";
import { Box, Typography, Chip, Stack, Paper } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

interface ComingSoonProps {
  headerTitle?: string;
  headerSubtitle?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  headerTitle = "Coming Soon",
  headerSubtitle = "This section will be available soon.",
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #eef0f3",
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      {/* White header */}
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          {headerTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
          {headerSubtitle}
        </Typography>
      </Box>

      {/* Colored gradient box */}
      <Box
        sx={{
          mx: 3,
          mb: 3,
          borderRadius: 3,
          py: 4,
          px: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(236,72,153,0.10) 50%, rgba(251,191,36,0.10) 100%)",
        }}
      >
        {/* Header inside colored box - same headerTitle prop */}
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{
            mb: 1.5,
            color: "#7c3aed",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {headerTitle}
        </Typography>

        {/* Icon badge - fixed, same everywhere */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            boxShadow: "0 10px 30px rgba(124,58,237,0.35)",
            mb: 2,
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 26, color: "#fff" }} />
        </Box>

        <Chip
          icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />}
          label="Coming Soon"
          size="small"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            bgcolor: "rgba(124,58,237,0.1)",
            color: "#7c3aed",
            border: "1px solid rgba(124,58,237,0.25)",
          }}
        />

        {/* Fixed title/description - same everywhere */}
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          We're working on it
        </Typography>

        <Typography
          variant="body2"
          sx={{ maxWidth: 380, lineHeight: 1.7, color: "#6b7280" }}
        >
          This section is being prepared. We will share updates here soon.
        </Typography>

        {/* Decorative dots */}
        <Stack direction="row" spacing={1} mt={2}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#7c3aed",
                opacity: i === 1 ? 1 : 0.3,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default ComingSoon;