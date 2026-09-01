import { Box, Grid, Paper, Skeleton } from "@mui/material";

export default function CertificateLoadingState() {
  return (
    <Box sx={{ py: 4, px: { xs: 1.5, sm: 3 }, background: "#F1F5F9" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: "28px", borderRadius: "10px", border: "1px solid #C9D7EA" }}>
            <Skeleton variant="rounded" height={60} />
            <Box sx={{ height: 14 }} />
            <Skeleton variant="rounded" height={120} />
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
