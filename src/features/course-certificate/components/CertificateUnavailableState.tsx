import { Box, Button, Paper, Typography } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { useNavigate } from "react-router-dom";

interface CertificateUnavailableStateProps {
  courseName?: string;
  compact?: boolean;
  title?: string;
  description?: string;
}

/** Shared empty state used wherever a course has no certificate template. */
export default function CertificateUnavailableState({
  courseName,
  compact = false,
  title = "Certificate for this course is not available",
  description,
}: CertificateUnavailableStateProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: compact ? 2 : 6, px: compact ? 0 : 2, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={0}
        sx={{ maxWidth: 520, width: "100%", p: compact ? 2.5 : 4, textAlign: "center", border: "1px solid #E2E8F0", borderRadius: 3 }}
      >
        <Box sx={{ width: 56, height: 56, mx: "auto", mb: 2, borderRadius: "50%", bgcolor: "#EEF2FF", display: "grid", placeItems: "center" }}>
          <SchoolRoundedIcon sx={{ color: "#4F46E5", fontSize: 30 }} />
        </Box>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {description ?? (courseName ? `A certificate has not been generated for ${courseName} yet.` : "A certificate has not been generated for this course yet.")}
        </Typography>
        {!compact && (
          <Button onClick={() => navigate("/profile")} sx={{ mt: 2.5, textTransform: "none", fontWeight: 700 }}>
            View my certificates
          </Button>
        )}
      </Paper>
    </Box>
  );
}
