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
    Skeleton
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Import your new template
import McqTemplate from "../features/course-practice/components/QuestionTemplates/McqTemplate"; 

import { QuizQuestion } from "@features/quiz-generation/types";
import { useSubmitQuizQuestionMutation } from "@features/quiz-generation/api/quizApi";

interface QuizPreviewProps {
  questions: QuizQuestion[];
   isGenerating: boolean;
}


const QuizShimmer: React.FC = () => (
  <Box sx={{ p: 2, borderRadius: "20px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", minHeight: "500px" }}>
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 } }}>
      
      {/* Header shimmer */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Skeleton variant="text" width={160} height={36} />
          <Skeleton variant="text" width={220} height={22} />
        </Box>
        <Skeleton variant="circular" width={60} height={60} />
      </Box>

      {/* Chip shimmer */}
      <Skeleton variant="rounded" width={100} height={24} sx={{ mb: 2, borderRadius: "16px" }} />

      {/* Question text shimmer */}
      <Skeleton variant="text" width="90%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={32} sx={{ mb: 3 }} />

      {/* 4 Options shimmer */}
      {[1, 2, 3, 4].map((i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            p: 2,
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
          }}
        >
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" width={`${45 + i * 10}%`} height={22} />
        </Box>
      ))}

      {/* Navigation buttons shimmer */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} px={2}>
        <Skeleton variant="rounded" width={90} height={40} sx={{ borderRadius: "8px" }} />
        <Box display="flex" gap={2}>
          <Skeleton variant="rounded" width={60} height={40} sx={{ borderRadius: "8px" }} />
          <Skeleton variant="rounded" width={140} height={40} sx={{ borderRadius: "12px" }} />
        </Box>
      </Box>

    </Paper>
  </Box>
);

export const QuizPreview: React.FC<QuizPreviewProps> = ({ questions ,isGenerating }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | string[])[]>([]);
  const [submissionResults, setSubmissionResults] = useState<Record<number, { isCorrect: boolean; correctOptionId: number }>>({});

  const [submitQuizQuestion, { isLoading }] = useSubmitQuizQuestionMutation();

  
  // Update selectedAnswers when questions changes
  React.useEffect(() => {
    setSelectedAnswers(new Array(questions.length).fill(""));
    setSubmissionResults({});
    setCurrentIndex(0);
  }, [questions]);

const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// shimmer effect 
if (isGenerating) {
  return <QuizShimmer />;
}
  if (questions.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center", bgcolor: "#FFFFFF", borderRadius: "20px", border: "1px solid #E2E8F0", minHeight: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", mb: 2 }}>
          No Quiz Generated Yet
        </Typography>
        <Typography variant="body1" sx={{ color: "#64748b" }}>
          Configure the AI parameters on the left and click "Generate Quiz" to see a preview.
        </Typography>
      </Box>
    );
  }

  const currentData = questions[currentIndex];
  const currentResult = submissionResults[currentData.id];

  // --- Adapter: Convert generated questions to the "Question" type used by McqTemplate ---
  const formattedQuestion = {
    id: currentData.id.toString(),
    content: {
      question: currentData.question,
      allowMultipleSelection: false,
      options: currentData.options.map((opt) => ({
        id: opt.id,
        text: opt.text,
        isCorrect: currentResult ? opt.id === currentResult.correctOptionId : false,
      })),
    },
    // Mock previousPractice if we have a result from the single-question submission
    previousPractice: currentResult ? {
      selectedOptionId: Number(selectedAnswers[currentIndex]),
      isCorrect: currentResult.isCorrect,
      score: currentResult.isCorrect ? 1 : 0,
    } : undefined
  };

  const handleAnswerChange = (answer: string | string[]) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const answer = selectedAnswers[currentIndex];
    
    // If it's a single choice (MCQ) and not already submitted, submit it
    if (typeof answer === "string" && !submissionResults[currentData.id]) {
      try {
        const response = await submitQuizQuestion({
          questionId: currentData.id,
          selectedOptionId: Number(answer)
        }).unwrap();

        if (response.success && response.data) {
          setSubmissionResults(prev => ({
            ...prev,
            [currentData.id]: {
              isCorrect: response.data.isCorrect,
              correctOptionId: response.data.correctOptionId
            }
          }));
        }
      } catch (error) {
        console.error("❌ Error submitting answer:", error);
      }
    }
  };

  const totalQuestions = questions.length;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const progressValue = Math.round(((currentIndex + 1) / questions.length) * 100);

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
                {currentIndex + 1} / {totalQuestions}
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
              onClick={currentResult ? handleNext : handleSubmit}
              disabled={(!currentResult && !selectedAnswers[currentIndex]) || (currentResult && currentIndex === totalQuestions - 1)}
              endIcon={currentResult ? <ArrowForwardIcon /> : (isLoading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />)}
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
                {currentResult ? "Next Question" : (isLoading ? "Submitting..." : "Submit Answer")}
              </Box>
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};