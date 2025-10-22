import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Question } from "../../types";
import { COLORS, GRADIENTS, SHADOWS } from "../../constants";
import QuestionCard from "../UI/QuestionCard";
import Scoresvg from "@icons/Score.svg";
import { usePracticeService } from "../../hooks/usePracticeService";
import { useParams } from "react-router-dom";

interface MainContentProps {
  questions: Question[];
}

interface PracticeState {
  isPracticeMode: boolean;
  currentQuestionIndex: number;
  userAnswers: Record<string, string | string[]>;
  score: number;
  totalQuestions: number;
  completedQuestions: number;
  showResults: boolean;
  timeStarted: Date | null;
  timeCompleted: Date | null;
  // New structure for practice data
  practiceData: {
    questions: Array<{
      contentId: number;
      selectedOptionId?: number | number[];
      answer?: string;
      timeSpent: number;
    }>;
    totalTimeSpent: number;
  };
  questionStartTimes: Record<string, Date>;
}

const MainContent: React.FC<MainContentProps> = ({ questions }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const unitId = "current-unit"; // This should come from props or context

  // Practice service integration
  const {
    isAutoSaving,
    hasUnsavedChanges,
    startSession,
    submitSession,
    startAutoSave,
    stopAutoSave,
    markAsChanged,
  } = usePracticeService({
    courseId: courseId || "",
    unitId,
    questions,
  });

  // Notification state
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // Practice state management
  const [practiceState, setPracticeState] = useState<PracticeState>({
    isPracticeMode: false,
    currentQuestionIndex: 0,
    userAnswers: {},
    score: 0,
    totalQuestions: questions.length,
    completedQuestions: 0,
    showResults: false,
    timeStarted: null,
    timeCompleted: null,
    practiceData: {
      questions: [],
      totalTimeSpent: 0,
    },
    questionStartTimes: {},
  });

  // Real-time timer for practice mode
  const [currentTime, setCurrentTime] = useState(new Date());

  // Helper functions
  const getTimeSpent = useCallback(() => {
    if (!practiceState.timeStarted) return 0;
    const endTime = practiceState.timeCompleted || currentTime;
    return Math.floor(
      (endTime.getTime() - practiceState.timeStarted.getTime()) / 1000
    );
  }, [practiceState.timeStarted, practiceState.timeCompleted, currentTime]);

  // Practice functionality methods
  const startPractice = useCallback(async () => {
    const startTime = new Date();

    try {
      // Start backend session
      const backendSessionId = await startSession();

      setPracticeState((prev) => ({
        ...prev,
        isPracticeMode: true,
        currentQuestionIndex: 0,
        userAnswers: {},
        score: 0,
        completedQuestions: 0,
        showResults: false,
        timeStarted: startTime,
        timeCompleted: null,
        practiceData: {
          questions: [],
          totalTimeSpent: 0,
        },
        questionStartTimes: {
          [questions[0]?.id || "0"]: startTime,
        },
      }));

      // Start auto-save
      startAutoSave(() => ({
        currentQuestionIndex: practiceState.currentQuestionIndex,
        userAnswers: practiceState.userAnswers,
        timeSpent: getTimeSpent(),
      }));

      setNotification({
        open: true,
        message: `Practice session started!`,
        // message: `Practice session started! Session ID: ${backendSessionId}`,
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to start practice session. Please try again.",
        severity: "error",
      });
      console.error("Failed to start practice:", error);
    }
  }, [
    questions,
    startSession,
    startAutoSave,
    practiceState.currentQuestionIndex,
    practiceState.userAnswers,
    getTimeSpent,
  ]);

  const calculateScore = useCallback(() => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      const userAnswer = practiceState.userAnswers[question.id];
      if (userAnswer && question.content?.correctAnswer) {
        // Simple comparison - can be enhanced based on question type
        if (
          typeof userAnswer === "string" &&
          typeof question.content.correctAnswer === "string"
        ) {
          if (
            userAnswer.toLowerCase().trim() ===
            question.content.correctAnswer.toLowerCase().trim()
          ) {
            correctAnswers++;
          }
        } else if (
          Array.isArray(userAnswer) &&
          Array.isArray(question.content.correctAnswer)
        ) {
          if (
            JSON.stringify(userAnswer.sort()) ===
            JSON.stringify(question.content.correctAnswer.sort())
          ) {
            correctAnswers++;
          }
        }
      }
    });
    return correctAnswers;
  }, [questions, practiceState.userAnswers]);

  const endPractice = useCallback(async () => {
    const finalScore = calculateScore();
    const endTime = new Date();

    // Calculate final practice data
    const finalPracticeData = {
      questions: questions.map((question, index) => {
        const questionStartTime = practiceState.questionStartTimes[question.id];
        const timeSpent = questionStartTime
          ? Math.floor((endTime.getTime() - questionStartTime.getTime()) / 1000)
          : 0;

        const userAnswer = practiceState.userAnswers[question.id];
        const questionData: {
          contentId: number;
          selectedOptionId?: number | number[];
          answer?: string;
          timeSpent: number;
        } = {
          contentId: parseInt(question.id) || index + 1,
          timeSpent,
        };

        // Add answer data based on question type
        if (
          question.contentType === "mcq" ||
          question.contentType === "single_choice"
        ) {
          if (question.content?.allowMultipleSelection) {
            // Multiple selection - store as array of option IDs
            questionData.selectedOptionId = Array.isArray(userAnswer)
              ? userAnswer.map((id) => parseInt(id)).filter((id) => !isNaN(id))
              : undefined;
          } else {
            // Single selection - store as single option ID
            questionData.selectedOptionId =
              userAnswer && typeof userAnswer === "string"
                ? parseInt(userAnswer)
                : undefined;
          }
        } else {
          questionData.answer =
            typeof userAnswer === "string" ? userAnswer : "";
        }

        return questionData;
      }),
      totalTimeSpent: practiceState.timeStarted
        ? Math.floor(
            (endTime.getTime() - practiceState.timeStarted.getTime()) / 1000
          )
        : 0,
    };

    try {
      // Submit to backend
      await submitSession(finalPracticeData, finalScore);

      setPracticeState((prev) => ({
        ...prev,
        isPracticeMode: false,
        showResults: true,
        score: finalScore,
        timeCompleted: endTime,
        practiceData: finalPracticeData,
      }));

      // Stop auto-save
      stopAutoSave();

      setNotification({
        open: true,
        message: `Practice completed! Score: ${finalScore}/${questions.length}`,
        severity: "success",
      });

      // Log the practice data in the requested format
      console.log("Practice Data:", JSON.stringify(finalPracticeData, null, 2));
    } catch (error) {
      setNotification({
        open: true,
        message:
          "Failed to submit practice session. Your progress may not be saved.",
        severity: "error",
      });
      console.error("Failed to submit practice:", error);

      // Still show results locally even if backend submission fails
      setPracticeState((prev) => ({
        ...prev,
        isPracticeMode: false,
        showResults: true,
        score: finalScore,
        timeCompleted: endTime,
        practiceData: finalPracticeData,
      }));
    }
  }, [
    calculateScore,
    questions,
    practiceState.questionStartTimes,
    practiceState.userAnswers,
    practiceState.timeStarted,
    submitSession,
    stopAutoSave,
  ]);

  const resetPractice = useCallback(() => {
    setPracticeState({
      isPracticeMode: false,
      currentQuestionIndex: 0,
      userAnswers: {},
      score: 0,
      totalQuestions: questions.length,
      completedQuestions: 0,
      showResults: false,
      timeStarted: null,
      timeCompleted: null,
      practiceData: {
        questions: [],
        totalTimeSpent: 0,
      },
      questionStartTimes: {},
    });
  }, [questions.length]);

  const goToNextQuestion = useCallback(() => {
    if (practiceState.currentQuestionIndex < questions.length - 1) {
      const nextQuestionId =
        questions[practiceState.currentQuestionIndex + 1]?.id;
      const now = new Date();

      setPracticeState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        questionStartTimes: {
          ...prev.questionStartTimes,
          [nextQuestionId]: now,
        },
      }));
    }
  }, [practiceState.currentQuestionIndex, questions]);

  const goToPreviousQuestion = useCallback(() => {
    if (practiceState.currentQuestionIndex > 0) {
      const prevQuestionId =
        questions[practiceState.currentQuestionIndex - 1]?.id;
      const now = new Date();

      setPracticeState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        questionStartTimes: {
          ...prev.questionStartTimes,
          [prevQuestionId]: now,
        },
      }));
    }
  }, [practiceState.currentQuestionIndex, questions]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        const targetQuestionId = questions[index]?.id;
        const now = new Date();

        setPracticeState((prev) => ({
          ...prev,
          currentQuestionIndex: index,
          questionStartTimes: {
            ...prev.questionStartTimes,
            [targetQuestionId]: now,
          },
        }));
      }
    },
    [questions]
  );

  const updateAnswer = useCallback(
    (questionId: string, answer: string | string[]) => {
      setPracticeState((prev) => ({
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [questionId]: answer,
        },
      }));

      // Mark as changed for auto-save
      markAsChanged();
    },
    [markAsChanged]
  );

  const getProgressPercentage = useCallback(() => {
    return questions.length > 0
      ? (practiceState.completedQuestions / questions.length) * 100
      : 0;
  }, [practiceState.completedQuestions, questions.length]);

  const getCurrentQuestionTimeSpent = useCallback(() => {
    const currentQuestionId = questions[practiceState.currentQuestionIndex]?.id;
    const questionStartTime =
      practiceState.questionStartTimes[currentQuestionId];
    if (!questionStartTime) return 0;
    return Math.floor(
      (currentTime.getTime() - questionStartTime.getTime()) / 1000
    );
  }, [
    practiceState.currentQuestionIndex,
    practiceState.questionStartTimes,
    questions,
    currentTime,
  ]);

  const getPracticeDataForSubmission = useCallback(() => {
    return {
      questions: questions.map((question, index) => {
        const questionStartTime = practiceState.questionStartTimes[question.id];
        const timeSpent = questionStartTime
          ? Math.floor(
              (currentTime.getTime() - questionStartTime.getTime()) / 1000
            )
          : 0;

        const userAnswer = practiceState.userAnswers[question.id];
        const questionData: {
          contentId: number;
          selectedOptionId?: number | number[];
          answer?: string;
          timeSpent: number;
        } = {
          contentId: parseInt(question.id) || index + 1,
          timeSpent,
        };

        // Add answer data based on question type
        if (
          question.contentType === "mcq" ||
          question.contentType === "single_choice"
        ) {
          if (question.content?.allowMultipleSelection) {
            // Multiple selection - store as array of option IDs
            questionData.selectedOptionId = Array.isArray(userAnswer)
              ? userAnswer.map((id) => parseInt(id)).filter((id) => !isNaN(id))
              : undefined;
          } else {
            // Single selection - store as single option ID
            questionData.selectedOptionId =
              userAnswer && typeof userAnswer === "string"
                ? parseInt(userAnswer)
                : undefined;
          }
        } else {
          questionData.answer =
            typeof userAnswer === "string" ? userAnswer : "";
        }

        return questionData;
      }),
      totalTimeSpent: practiceState.timeStarted
        ? Math.floor(
            (currentTime.getTime() - practiceState.timeStarted.getTime()) / 1000
          )
        : 0,
    };
  }, [
    questions,
    practiceState.questionStartTimes,
    practiceState.userAnswers,
    practiceState.timeStarted,
    currentTime,
  ]);

  // Update completed questions count when answers change
  useEffect(() => {
    const answeredQuestions = Object.keys(practiceState.userAnswers).length;
    setPracticeState((prev) => ({
      ...prev,
      completedQuestions: answeredQuestions,
    }));
  }, [practiceState.userAnswers]);

  // Update total questions when questions prop changes
  useEffect(() => {
    setPracticeState((prev) => ({
      ...prev,
      totalQuestions: questions.length,
    }));
  }, [questions.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (practiceState.isPracticeMode) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000); // Update every second
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [practiceState.isPracticeMode]);

  return (
    <Box
      sx={{
        marginLeft: "289px",
        marginTop: "64px",
        padding: "32px",
        paddingBottom: "120px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        background: GRADIENTS.background,
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: GRADIENTS.primary,
          color: "white",
          p: 3,
          borderRadius: "16px",
          mb: 4,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: "28px",
              }}
            >
              Practice Questions
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}
              >
                {questions.length} Questions Available
              </Typography>
              {practiceState.isPracticeMode && (
                <>
                  <Chip
                    label={`Question ${
                      practiceState.currentQuestionIndex + 1
                    } of ${questions.length}`}
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    label={`${practiceState.completedQuestions} answered`}
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    label={`⏱️ ${Math.floor(getTimeSpent() / 60)}:${String(
                      getTimeSpent() % 60
                    ).padStart(2, "0")}`}
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                  {isAutoSaving && (
                    <Chip
                      label="💾 Saving..."
                      size="small"
                      sx={{
                        background: "rgba(16, 185, 129, 0.2)",
                        color: "white",
                        fontWeight: 500,
                      }}
                    />
                  )}
                  {hasUnsavedChanges && !isAutoSaving && (
                    <Chip
                      label="⚠️ Unsaved"
                      size="small"
                      sx={{
                        background: "rgba(245, 158, 11, 0.2)",
                        color: "white",
                        fontWeight: 500,
                      }}
                    />
                  )}
                </>
              )}
            </Box>
          </Box>

          {/* Practice Controls */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {!practiceState.isPracticeMode && !practiceState.showResults && (
              <Button
                variant="contained"
                onClick={startPractice}
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: "12px",
                  textTransform: "none",
                  border: "1px solid rgba(255,255,255,0.3)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                Start Practice
              </Button>
            )}

            {practiceState.isPracticeMode && (
              <>
                {/* <Button
                  variant="outlined"
                  onClick={() => {
                    const practiceData = getPracticeDataForSubmission();
                    console.log(
                      "Current Practice Data:",
                      JSON.stringify(practiceData, null, 2)
                    );
                    // You can also copy to clipboard or send to API here
                    navigator.clipboard?.writeText(
                      JSON.stringify(practiceData, null, 2)
                    );
                  }}
                  sx={{
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "white",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: "12px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "white",
                      background: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Export Data
                </Button> */}
                <Button
                  variant="outlined"
                  onClick={endPractice}
                  sx={{
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "white",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: "12px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "white",
                      background: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Submit Practice
                </Button>
              </>
            )}

            {practiceState.showResults && (
              <Button
                variant="contained"
                onClick={resetPractice}
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: "12px",
                  textTransform: "none",
                  border: "1px solid rgba(255,255,255,0.3)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                Practice Again
              </Button>
            )}
          </Box>
        </Box>

        {/* Progress Bar */}
        {practiceState.isPracticeMode && (
          <Box sx={{ mt: 3, position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                sx={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}
              >
                Progress
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}
              >
                {Math.round(getProgressPercentage())}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={getProgressPercentage()}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Question List */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "20px",
          background: "white",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          boxShadow: SHADOWS.xl,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {questions.length > 0 ? (
            practiceState.isPracticeMode ? (
              // Single question view in practice mode
              <>
                <QuestionCard
                  key={
                    questions[practiceState.currentQuestionIndex]?.id ||
                    practiceState.currentQuestionIndex
                  }
                  question={questions[practiceState.currentQuestionIndex]}
                  index={practiceState.currentQuestionIndex}
                  isFirst={true}
                  isLast={true}
                  practiceMode={true}
                  userAnswer={
                    practiceState.userAnswers[
                      questions[practiceState.currentQuestionIndex]?.id
                    ]
                  }
                  onAnswerChange={(answer) =>
                    updateAnswer(
                      questions[practiceState.currentQuestionIndex]?.id,
                      answer
                    )
                  }
                />

                {/* Question Navigation */}
                <Box
                  sx={{
                    p: 3,
                    borderTop: "1px solid #E5E7EB",
                    background: "#f8fafc",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={goToPreviousQuestion}
                    disabled={practiceState.currentQuestionIndex === 0}
                    sx={{
                      borderColor: COLORS.primary,
                      color: COLORS.primary,
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      borderRadius: "12px",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: COLORS.primaryDark,
                        background: "rgba(106, 66, 171, 0.05)",
                      },
                      "&:disabled": {
                        borderColor: "#E5E7EB",
                        color: "#9CA3AF",
                      },
                    }}
                  >
                    Previous
                  </Button>

                  {/* Question Jump Navigation */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    {questions.map((_, idx) => (
                      <Tooltip key={idx} title={`Question ${idx + 1}`}>
                        <IconButton
                          onClick={() => goToQuestion(idx)}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background:
                              idx === practiceState.currentQuestionIndex
                                ? GRADIENTS.primary
                                : practiceState.userAnswers[questions[idx]?.id]
                                ? "#10B981"
                                : "#E5E7EB",
                            color:
                              idx === practiceState.currentQuestionIndex ||
                              practiceState.userAnswers[questions[idx]?.id]
                                ? "white"
                                : COLORS.text.muted,
                            fontWeight: 600,
                            fontSize: "14px",
                            "&:hover": {
                              background:
                                idx === practiceState.currentQuestionIndex
                                  ? GRADIENTS.primaryHover
                                  : practiceState.userAnswers[
                                      questions[idx]?.id
                                    ]
                                  ? "#059669"
                                  : "#D1D5DB",
                            },
                          }}
                        >
                          {idx + 1}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    onClick={goToNextQuestion}
                    disabled={
                      practiceState.currentQuestionIndex ===
                      questions.length - 1
                    }
                    sx={{
                      borderColor: COLORS.primary,
                      color: COLORS.primary,
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      borderRadius: "12px",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: COLORS.primaryDark,
                        background: "rgba(106, 66, 171, 0.05)",
                      },
                      "&:disabled": {
                        borderColor: "#E5E7EB",
                        color: "#9CA3AF",
                      },
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </>
            ) : (
              // All questions view in review mode
              questions.map((question, idx) => (
                <QuestionCard
                  key={question.id || idx}
                  question={question}
                  index={idx}
                  isFirst={idx === 0}
                  isLast={idx === questions.length - 1}
                  practiceMode={false}
                  showAnswers={practiceState.showResults}
                  userAnswer={practiceState.userAnswers[question.id]}
                />
              ))
            )
          ) : (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography
                sx={{
                  color: COLORS.text.muted,
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                📚 No questions found for this unit
              </Typography>
              <Typography
                sx={{ color: COLORS.text.light, fontSize: "14px", mt: 1 }}
              >
                Please check back later or contact your instructor
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: "289px",
          right: 0,
          background: "white",
          borderTop: "1px solid #E5E7EB",
          zIndex: 1000,
          p: 3,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              src={Scoresvg}
              alt="Score"
              style={{ width: "40px", height: "40px" }}
            />
            <Box>
              {practiceState.showResults ? (
                <>
                  <Typography
                    sx={{
                      color: COLORS.text.muted,
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Practice Complete! Your score:
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.primary,
                      fontWeight: "700",
                      fontSize: "24px",
                    }}
                  >
                    {practiceState.score} / {questions.length}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.text.light,
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    Time: {Math.floor(getTimeSpent() / 60)}m{" "}
                    {getTimeSpent() % 60}s
                  </Typography>
                </>
              ) : practiceState.isPracticeMode ? (
                <>
                  <Typography
                    sx={{
                      color: COLORS.text.muted,
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Practice in progress:
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.primary,
                      fontWeight: "700",
                      fontSize: "24px",
                    }}
                  >
                    {practiceState.completedQuestions} / {questions.length}{" "}
                    answered
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.text.light,
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    Current question: {getCurrentQuestionTimeSpent()}s | Total:{" "}
                    {Math.floor(getTimeSpent() / 60)}:
                    {String(getTimeSpent() % 60).padStart(2, "0")}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      color: COLORS.text.muted,
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Ready to practice:
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.text.secondary,
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    {questions.length} questions available
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "12px" }}>
            {!practiceState.isPracticeMode && !practiceState.showResults && (
              <>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setPracticeState((prev) => ({ ...prev, showResults: true }))
                  }
                  sx={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: COLORS.primaryDark,
                      background: "rgba(106, 66, 171, 0.05)",
                    },
                  }}
                >
                  Review Questions
                </Button>
                <Button
                  variant="contained"
                  onClick={startPractice}
                  sx={{
                    background: GRADIENTS.primary,
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    boxShadow: SHADOWS.purple,
                    "&:hover": {
                      background: GRADIENTS.primaryHover,
                      boxShadow: SHADOWS.purpleHover,
                    },
                  }}
                >
                  Start Practice
                </Button>
              </>
            )}

            {practiceState.isPracticeMode && (
              <Button
                variant="contained"
                onClick={endPractice}
                sx={{
                  background: GRADIENTS.primary,
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: SHADOWS.purple,
                  "&:hover": {
                    background: GRADIENTS.primaryHover,
                    boxShadow: SHADOWS.purpleHover,
                  },
                }}
              >
                Submit Practice
              </Button>
            )}

            {practiceState.showResults && (
              <Button
                variant="contained"
                onClick={resetPractice}
                sx={{
                  background: GRADIENTS.primary,
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: SHADOWS.purple,
                  "&:hover": {
                    background: GRADIENTS.primaryHover,
                    boxShadow: SHADOWS.purpleHover,
                  },
                }}
              >
                Practice Again
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainContent;
