import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Radio,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// --- Dummy Data ---
const QUIZ_QUESTIONS = [
  {
    question: "Which tool introduced by GitHub focuses on providing AI-assisted coding?",
    options: ["GitHub Actions", "GitHub Copilot", "Microsoft Git Service", "GitHub CI/CD Studio"],
    correctAnswer: 1,
    explanation: "GitHub Copilot is the AI-assisted coding tool designed to help developers.",
  },
  {
    question: "Which React hook is primarily used for handling side effects?",
    options: ["useState", "useContext", "useEffect", "useReducer"],
    correctAnswer: 2,
    explanation: "useEffect allows you to perform side effects like data fetching.",
  },
  {
    question: "What does the 'SSG' acronym stand for in modern web development?",
    options: ["Server-Side Graphics", "Static Site Generation", "Simple State Generator", "Standard Style Guide"],
    correctAnswer: 1,
    explanation: "Static Site Generation (SSG) pre-renders pages at build time.",
  },
  {
    question: "Which CSS property is used to create a flexible box layout?",
    options: ["float", "position", "display: flex", "align-content"],
    correctAnswer: 2,
    explanation: "The display: flex property enables the Flexbox layout model.",
  },
  {
    question: "In TypeScript, which keyword is used to define the shape of an object?",
    options: ["interface", "typecast", "structure", "define"],
    correctAnswer: 0,
    explanation: "The 'interface' keyword is used to describe the shape of an object.",
  },
];

export const QuizPreview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(QUIZ_QUESTIONS.length).fill(null)
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const userSelection = selectedAnswers[currentIndex];
  const isCorrect = userSelection === currentQuestion.correctAnswer;

  const progressValue = Math.round(((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  const handleSelect = (idx: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = idx;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ p: 2, borderRadius: "20px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", minHeight: "500px", position: "relative",  }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
        }}
      >
        {/* Header Section */}
        <Box
          display="flex"
          flexDirection={{  sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={2}
          mb={4}
        >
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
            Quiz Preview
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Box textAlign={{ xs: "left", sm: "right" }}>
              <Typography
                variant="overline"
                sx={{ color: "#94a3b8", fontWeight: 800, fontSize: "0.65rem", display: "block" }}
              >
                PROGRESS
              </Typography>
              <Typography variant="body1" sx={{ color: "#1e293b", fontWeight: 700, mt: -0.5 }}>
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
                <Typography sx={{ fontWeight: 800, fontSize: isMobile ? "0.75rem" : "0.85rem" }}>
                  {progressValue}%
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>

        <Chip
          label={`QUESTION ${currentIndex + 1}`}
          size="small"
          sx={{ bgcolor: "#F0EFFF", color: "#4F39F6", fontWeight: 700, mb: 2 }}
        />

        {/* Question Text - Responsive Size */}
        <Typography
          variant="h5"
          fontWeight={600}
          mb={4}
          sx={{
            fontSize: { xs: "1.15rem", sm: "1.5rem" },
            lineHeight: 1.4,
            minHeight: { sm: "80px" },
          }}
        >
          {currentQuestion.question}
        </Typography>

        {/* Options Stack */}
        <Stack spacing={1.5} mb={5}>
          {currentQuestion.options.map((option, idx) => {
            const isSelected = userSelection === idx;
            return (
              <Box
                key={idx}
                onClick={() => handleSelect(idx)}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: isSelected ? (isCorrect ? "#10B981" : "#4F39F6") : "#E2E8F0",
                  bgcolor: isSelected ? alpha(isCorrect ? "#10B981" : "#4F39F6", 0.06) : "transparent",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { borderColor: "#4F39F6", bgcolor: alpha("#4F39F6", 0.02) },
                }}
              >
                <Radio checked={isSelected} size={isMobile ? "small" : "medium"} />
                <Typography variant="body2" sx={{ flexGrow: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  {option}
                </Typography>
                {isSelected && isCorrect && <CheckCircleIcon sx={{ color: "#10B981", fontSize: 20 }} />}
              </Box>
            );
          })}
        </Stack>

        {/* Navigation Buttons */}
        <Box display="flex" justifyContent="space-between" mt="auto">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            startIcon={<ChevronLeftIcon />}
            sx={{ fontWeight: 600, textTransform: "none" }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentIndex === QUIZ_QUESTIONS.length - 1}
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              px: { xs: 2, sm: 4 },
              borderRadius: "10px",
              boxShadow: "none",
              "&:hover": { boxShadow: "0px 4px 12px rgba(80, 70, 229, 0.2)" },
            }}
          >
            {isMobile ? "Next" : "Next Question"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};