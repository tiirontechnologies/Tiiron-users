import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Import your new template
import McqTemplate from "../features/course-practice/components/QuestionTemplates/McqTemplate"; 

// --- Dummy Data ---
const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "Which tool introduced by GitHub focuses on providing AI-assisted coding?",
    options: ["GitHub Actions", "GitHub Copilot", "Microsoft Git Service", "GitHub CI/CD Studio"],
    correctAnswer: 1,
    explanation: "GitHub Copilot is the AI-assisted coding tool designed to help developers.",
  },
  {
    id: "q2",
    question: "Which React hook is primarily used for handling side effects?",
    options: ["useState", "useContext", "useEffect", "useReducer"],
    correctAnswer: 2,
    explanation: "useEffect allows you to perform side effects like data fetching.",
  },
  // ... rest of your questions
];

export const QuizPreview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | string[])[]>(
    new Array(QUIZ_QUESTIONS.length).fill("")
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentData = QUIZ_QUESTIONS[currentIndex];

  // --- Adapter: Convert Dummy Data to the "Question" type used by McqTemplate ---
  const formattedQuestion = {
    id: currentData.id,
    content: {
      question: currentData.question,
      allowMultipleSelection: false,
      options: currentData.options.map((opt, index) => ({
        id: index.toString(),
        text: opt,
        isCorrect: index === currentData.correctAnswer,
      })),
    },
    // You can pass previousPractice data here if you want to show results immediately
    previousPractice: undefined 
  };

  const handleAnswerChange = (answer: string | string[]) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const progressValue = Math.round(((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <Box sx={{ p: 2, borderRadius: "20px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", minHeight: "500px" }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 } }}>
        {/* Header Section */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 800, color: "#0f172a" }}>
              Quiz Preview
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Review and practice the generated questions
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Box textAlign="right">
              <Typography variant="overline" sx={{ color: "#94a3b8", fontWeight: 800, fontSize: "0.65rem" }}>PROGRESS</Typography>
              <Typography variant="body1" sx={{ color: "#1e293b", fontWeight: 700 }}>
                {currentIndex + 1} / {QUIZ_QUESTIONS.length}
              </Typography>
            </Box>
            {/* Circular Progress */}
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={isMobile ? 50 : 60}
                thickness={5}
                sx={{ color: "#f1f5f9" }}
              />
              <CircularProgress
                variant="determinate"
                value={progressValue}
                size={isMobile ? 50 : 60}
                thickness={5}
                sx={{ color: "#5046e5", position: "absolute", left: 0 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: isMobile ? "0.75rem" : "0.85rem",
                  }}
                >
                  {progressValue}%
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>

        <Chip label={`QUESTION ${currentIndex + 1}`} size="small" sx={{ bgcolor: "#F0EFFF", color: "#4F39F6", fontWeight: 700, mb: 2 }} />

        <Typography variant="h5" fontWeight={600} mb={2} sx={{ fontSize: { xs: "1.15rem", sm: "1.5rem" } }}>
          {currentData.question}
        </Typography>

        {/* --- Integrated McqTemplate --- */}
        <Box sx={{ mb: 4 }}>
          <McqTemplate
            question={formattedQuestion as any}
            practiceMode={true}
            userAnswer={selectedAnswers[currentIndex]}
            onAnswerChange={handleAnswerChange}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: { xs: 2, md: 3 },
          }}
        >
          {/* Left Side: Previous Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 500,
              minWidth: { xs: "40px", md: "auto" },
              borderRadius: { xs: "50%", md: "8px" },
              padding: { xs: "8px", md: "8px 16px" },
              "&:hover": {
                backgroundColor: "rgba(112, 126, 148, 0.1)",
                color: "#4A5568",
              },
              // Style saat disabled
              "&.Mui-disabled": {
                color: "#CBD5E1",
                opacity: 0.6,
              },
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Previous
            </Box>
          </Button>

          {/* Right Side: Skip and Next */}
          <Stack direction="row" spacing={{ xs: 1, sm: 3 }} alignItems="center">
            <Button
              variant="text"
              sx={{
                color: "#6366F1",
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: "14px", md: "16px" },
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                  color: "#6366F1",
                },
              }}
            >
              Skip
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentIndex === totalQuestions - 1}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                borderRadius: "12px",
                padding: { xs: "10px", md: "10px 24px" },
                minWidth: { xs: "48px", md: "auto" },
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1E293B",
                },
                // Style saat disabled agar background menjadi lebih terang
                "&.Mui-disabled": {
                  backgroundColor: "#94A3B8", // Abu-abu kebiruan terang
                  color: "#F1F5F9",
                  opacity: 0.8,
                },
              }}
            >
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Next Question
              </Box>
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};