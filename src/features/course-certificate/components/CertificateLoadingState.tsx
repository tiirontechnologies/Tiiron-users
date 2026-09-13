import { Box, CircularProgress, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

export default function CertificateLoadingState() {
  return (
    <Box sx={{ py: 4, px: { xs: 1.5, sm: 3 }, background: "#F1F5F9" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              minHeight: 430,
              p: { xs: 3, sm: 5 },
              borderRadius: "14px",
              border: "1px solid #C9D7EA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)",
            }}
          >
            <Stack alignItems="center" spacing={2} textAlign="center">
              <Box
                sx={{
                  position: "relative",
                  width: 92,
                  height: 92,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  bgcolor: "#EEF2FF",
                  color: "#4F46E5",
                }}
              >
                <CircularProgress
                  size={92}
                  thickness={2.5}
                  sx={{ position: "absolute", color: "#818CF8" }}
                />
                <WorkspacePremiumRoundedIcon sx={{ fontSize: 42 }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800} color="#0F172A">
                  Generating your certificate
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, maxWidth: 360, lineHeight: 1.7 }}>
                  We are checking your course progress and preparing your evaluation report.
                </Typography>
              </Box>
              <Stack direction="row" spacing={0.75}>
                {[0, 1, 2].map((dot) => (
                  <Box
                    key={dot}
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      bgcolor: "#6366F1",
                      animation: "certificatePulse 1.2s ease-in-out infinite",
                      animationDelay: `${dot * 0.18}s`,
                      "@keyframes certificatePulse": {
                        "0%, 100%": { opacity: 0.25, transform: "scale(.8)" },
                        "50%": { opacity: 1, transform: "scale(1)" },
                      },
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "10px", border: "1px solid #C9D7EA" }}>
            <Skeleton variant="rounded" height={100} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
