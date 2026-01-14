import React from "react";
import { Box, Grid, Container } from "@mui/material";
import { QuizConfigurationSidebar } from "@components/QuizConfigurationSidebar";
import { QuizPreview } from "@components/QuizPreview";




const QuizDashboard: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: { xs: 1, md: 4 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left Column - Configuration */}
          <Grid item xs={12} md={5}>
            <QuizConfigurationSidebar />
          </Grid>

          {/* Right Column - Preview */}
          <Grid item xs={12} md={7}>
            <QuizPreview />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default QuizDashboard;