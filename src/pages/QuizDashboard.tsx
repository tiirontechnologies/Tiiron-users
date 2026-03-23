import React, { useState } from "react";
import { Box, Grid, Container } from "@mui/material";
import { QuizConfigurationSidebar } from "@components/QuizConfigurationSidebar";
import { QuizPreview } from "@components/QuizPreview";
import { QuizQuestion } from "@features/quiz-generation/types";

const QuizDashboard: React.FC = () => {
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);

  const handleQuizGenerated = (questions: QuizQuestion[]) => {
    setGeneratedQuestions(questions);
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pt: 6 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left Column - Configuration */}
          <Grid item xs={12} md={5}>
            <QuizConfigurationSidebar onQuizGenerated={handleQuizGenerated} />
          </Grid>

          {/* Right Column - Preview */}
          <Grid item xs={12} md={7}>
            <QuizPreview questions={generatedQuestions} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default QuizDashboard;