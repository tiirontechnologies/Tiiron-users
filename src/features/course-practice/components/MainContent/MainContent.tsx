import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
// NOTE: Retaining all original imports for types and hooks
import { Question } from "../../types";
import { GRADIENTS, COLORS } from "../../constants";
import { usePracticeService } from "../../hooks/usePracticeService";
import { useParams } from "react-router-dom";
import VideoTemplate from "../QuestionTemplates/VideoTemplate";
import { CustomTabs } from "../../../../components/ui/CustomTabPanel";
// NEW COMPONENT IMPORTS
import QuestionViewer from "./QuestionViewer";
import PracticeFooter from "./PracticeFooter";
import McqTemplate from "../QuestionTemplates/McqTemplate";
import FillUpTemplate from "../QuestionTemplates/FillUpTemplate";
import SubjectiveTemplate from "../QuestionTemplates/SubjectiveTemplate";
import BlogTemplate from "../QuestionTemplates/BlogTemplate";
import { transformApiQuestion } from "../../utils/transformApiResponse";


interface MainContentProps {
  questions: any;
  practiceData?: {
    isCompleted: boolean;
    score: number;
  } | null;
  refetchContent?: () => void;
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

const CustomComponent = ({ questiontypeId, question }: { questiontypeId: number, question: Question }) => {
  switch (questiontypeId) {
    case 1: // Multiple Choice
      return <McqTemplate question={question} />;
    case 2: // Quiz (also MCQ)
      return <McqTemplate question={question} />;
    case 3: // Fill Ups
      return <FillUpTemplate question={question} />;
    case 4: // Subjective
      return <SubjectiveTemplate question={question} />;
    case 5: // Blog
      return <BlogTemplate question={question} />;
    case 6: // Video
      return <VideoTemplate question={question} />;
    default:
      return null;
  }
};

const MainContent: React.FC<MainContentProps> = ({ questions, practiceData, refetchContent }) => {
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

  const { contentTabs, contentPanel } = useMemo(() => {
    const tabs: string[] = [];
    const panels: React.ReactNode[] = [];

    if (questions?.[0]?.contents) {
      questions[0].contents.forEach((content: any) => {
        tabs.push(content.contentTypeCon.name);
        
        // Create one panel per content that contains all questions for that content
        panels.push(
          <Box key={content.id}>
            {content.question?.map((apiQuestion: any, qIndex: number) => {
              // Transform API question to Question format
              const transformedQuestion = transformApiQuestion(apiQuestion);
              return (
                <CustomComponent
                  key={`${content.id}-${apiQuestion.id}-${qIndex}`}
                  questiontypeId={apiQuestion.questiontypeId}
                  question={transformedQuestion}
                />
              );
            })}
          </Box>
        );
      });
    }
    
    return { contentTabs: tabs, contentPanel: panels };
  }, [questions]);

  // useEffect(() => {
  //   const initialAnswers = initializeUserAnswers();
  //   setPracticeState((prev) => ({
  //     ...prev,
  //     userAnswers: initialAnswers,
  //     completedQuestions: practiceData?.isCompleted ? questions.length : Object.keys(initialAnswers).length,
  //     showResults: practiceData?.isCompleted || prev.showResults,
  //     score: practiceData?.score || prev.score,
  //   }));
  // }, [questions, practiceData, initializeUserAnswers]);

  // useEffect(() => {
  //   const answeredQuestions = Object.keys(practiceState.userAnswers).length;
  //   setPracticeState((prev) => ({
  //     ...prev,
  //     completedQuestions: practiceData?.isCompleted ? questions.length : answeredQuestions,
  //   }));
  // }, [practiceState.userAnswers, practiceData, questions.length]);

  // useEffect(() => {
  //   setPracticeState((prev) => ({
  //     ...prev,
  //     totalQuestions: questions.length,
  //   }));
  // }, [questions.length]);
  return (
    <Box
      sx={{
        marginLeft: "289px",
        marginTop: "64px",
        padding: "32px",
        paddingBottom: "120px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        background: COLORS.background.light,
        minHeight: "100vh",
      }}
    >
      {/* 1. Header Section */}
      {/* <VideoTemplate question={{
        id: "1",
        contentType: "video",
        content: {
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      }
      } /> */}


      <CustomTabs tabs={contentTabs} panels={contentPanel}
      />

      {/* 3. Bottom Footer Section */}
      {/* <PracticeFooter
        practiceState={practiceState}
        questionsLength={questions.length}
        startPractice={startPractice}
        endPractice={endPractice}
      /> */}

      {/* Snackbar for Notifications (kept here as it relies on notification state) */}
      {/* <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default MainContent;
