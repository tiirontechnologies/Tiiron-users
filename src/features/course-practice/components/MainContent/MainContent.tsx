import React, { useState, useEffect, useCallback } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
// NOTE: Retaining all original imports for types and hooks
import { Question } from "../../types";
import { GRADIENTS } from "../../constants";
import { usePracticeService } from "../../hooks/usePracticeService";
import { useParams } from "react-router-dom";

// NEW COMPONENT IMPORTS
import PracticeHeader from "../Header/PracticeHeader";
import QuestionViewer from "./QuestionViewer";
import PracticeFooter from "./PracticeFooter";

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
  const unitId = "current-unit";

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

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

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

  const [currentTime, setCurrentTime] = useState(new Date());

  const getTimeSpent = useCallback(() => {
    if (!practiceState.timeStarted) return 0;
    const endTime = practiceState.timeCompleted || currentTime;
    return Math.floor(
      (endTime.getTime() - practiceState.timeStarted.getTime()) / 1000
    );
  }, [practiceState.timeStarted, practiceState.timeCompleted, currentTime]);

  const startPractice = useCallback(async () => {
    const startTime = new Date();

    try {
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

      startAutoSave(() => ({
        currentQuestionIndex: practiceState.currentQuestionIndex,
        userAnswers: practiceState.userAnswers,
        timeSpent: getTimeSpent(),
      }));

      setNotification({
        open: true,
        message: `Practice session started!`,
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

    console.log("🐛 Debug Info:");
    console.log("Time Started:", practiceState.timeStarted);
    console.log("Time Completed:", endTime);
    console.log("User Answers:", practiceState.userAnswers);
    console.log("Question Start Times:", practiceState.questionStartTimes);

    const finalPracticeData = {
      questions: questions.map((question, index) => {
        const questionStartTime = practiceState.questionStartTimes[question.id];

        let timeSpent = 0;
        if (questionStartTime) {
          const nextQuestionId = questions[index + 1]?.id;
          const nextQuestionStartTime = nextQuestionId
            ? practiceState.questionStartTimes[nextQuestionId]
            : null;

          const effectiveEndTime = nextQuestionStartTime || endTime;
          timeSpent = Math.floor(
            (effectiveEndTime.getTime() - questionStartTime.getTime()) / 1000
          );
        }

        const userAnswer = practiceState.userAnswers[question.id];

        console.log(`Question ${index + 1} Debug:`, {
          id: question.id,
          userAnswer,
          userAnswerType: typeof userAnswer,
          contentType: question.contentType,
          options: question.content?.options,
          timeSpent,
        });

        const questionData: {
          contentId: number;
          selectedOptionId?: number | number[];
          answer?: string;
          timeSpent: number;
        } = {
          contentId: parseInt(question.id) || index + 1,
          timeSpent,
        };

        if (
          question.contentType === "mcq" ||
          question.contentType === "single_choice"
        ) {
          if (Array.isArray(userAnswer)) {
            questionData.selectedOptionId = userAnswer
              .map((id) => {
                const numId = typeof id === "number" ? id : parseInt(id);
                return isNaN(numId) ? null : numId;
              })
              .filter((id): id is number => id !== null);
          } else if (userAnswer !== undefined) {
            const numId =
              typeof userAnswer === "number"
                ? userAnswer
                : parseInt(String(userAnswer));

            if (!isNaN(numId)) {
              questionData.selectedOptionId = numId;
            }
          }
        } else {
          questionData.answer =
            typeof userAnswer === "string" ? userAnswer : "";
        }

        console.log(`Question ${index + 1} Final Data:`, questionData);

        return questionData;
      }),
      totalTimeSpent: practiceState.timeStarted
        ? Math.floor(
            (endTime.getTime() - practiceState.timeStarted.getTime()) / 1000
          )
        : 0,
    };

    console.log(
      "📊 Final Practice Data:",
      JSON.stringify(finalPracticeData, null, 2)
    );

    try {
      await submitSession(finalPracticeData, finalScore);

      setPracticeState((prev) => ({
        ...prev,
        isPracticeMode: false,
        showResults: true,
        score: finalScore,
        timeCompleted: endTime,
        practiceData: finalPracticeData,
      }));

      stopAutoSave();

      setNotification({
        open: true,
        message: `Practice completed! Score: ${finalScore}/${questions.length}`,
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message:
          "Failed to submit practice session. Your progress may not be saved.",
        severity: "error",
      });
      console.error("Failed to submit practice:", error);

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

      markAsChanged();
    },
    [markAsChanged]
  );

  const getProgressPercentage = useCallback(() => {
    return questions.length > 0
      ? (practiceState.completedQuestions / questions.length) * 100
      : 0;
  }, [practiceState.completedQuestions, questions.length]);

  // NOTE: This function is not used in the final JSX, but kept for logic integrity
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

        if (
          question.contentType === "mcq" ||
          question.contentType === "single_choice"
        ) {
          if (question.content?.allowMultipleSelection) {
            questionData.selectedOptionId = Array.isArray(userAnswer)
              ? userAnswer.map((id) => parseInt(id)).filter((id) => !isNaN(id))
              : undefined;
          } else {
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
  useEffect(() => {
    const answeredQuestions = Object.keys(practiceState.userAnswers).length;
    setPracticeState((prev) => ({
      ...prev,
      completedQuestions: answeredQuestions,
    }));
  }, [practiceState.userAnswers]);

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
      {/* 1. Header Section */}
      <PracticeHeader
        practiceState={practiceState}
        questionsLength={questions.length}
        timeSpent={getTimeSpent()}
        isAutoSaving={isAutoSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        progressPercentage={getProgressPercentage()}
        startPractice={startPractice}
        endPractice={endPractice}
        resetPractice={resetPractice}
      />

      {/* 2. Question Viewer Section */}
      <QuestionViewer
        questions={questions}
        practiceState={practiceState}
        updateAnswer={updateAnswer}
        goToNextQuestion={goToNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
        goToQuestion={goToQuestion}
      />

      {/* 3. Bottom Footer Section */}
      <PracticeFooter
        practiceState={practiceState}
        questionsLength={questions.length}
        startPractice={startPractice}
        endPractice={endPractice}
      />

      {/* Snackbar for Notifications (kept here as it relies on notification state) */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
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
