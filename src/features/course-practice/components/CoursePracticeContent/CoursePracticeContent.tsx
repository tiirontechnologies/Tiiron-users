import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";

import CustomTabPanel from "../../../../components/ui/CustomTabPanel";
import { transformApiQuestion } from "../../utils/transformApiResponse";
import {
  CoursePracticeApiResponse,
  ApiQuestion,
} from "../../types";
import { SHADOWS } from "../../constants";

import McqTemplate from "../QuestionTemplates/McqTemplate";
import FillUpTemplate from "../QuestionTemplates/FillUpTemplate";
import SubjectiveTemplate from "../QuestionTemplates/SubjectiveTemplate";
import BlogTemplate from "../QuestionTemplates/BlogTemplate";
import VideoTemplate from "../QuestionTemplates/VideoTemplate";
import CodeChallengeCard from "../QuestionTemplates/CodeChallengeCard";

import {
  useSubmitPracticeBulkMutation,
  PracticeSessionData
} from "../../api/practiceApi";
import Footer from "../../components/Footer";

/* =====================================================
   TYPES
===================================================== */

interface Props {
  data: CoursePracticeApiResponse["data"];
}

interface UserAnswers {
  [contentTypeId: number]: {
    [questionId: string]: string | string[];
  };
}

/* =====================================================
   QUESTION RENDERER (Single Responsibility)
===================================================== */

const QuestionComponent = ({
  apiQuestion,
  transformed,
  practiceMode,
  userAnswer,
  onAnswerChange,
  onSolve,
}: any) => {
  switch (apiQuestion.questiontypeId) {
    case 1:
    case 2:
      return (
        <McqTemplate
          question={transformed}
          practiceMode={practiceMode}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );

    case 3:
      return (
        <FillUpTemplate
          question={transformed}
          practiceMode={practiceMode}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );

    case 4:
      return (
        <SubjectiveTemplate
          question={transformed}
          practiceMode={practiceMode}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );

    case 5:
      return <BlogTemplate question={transformed} practiceMode={practiceMode} />;

    case 6:
      return <VideoTemplate question={transformed} practiceMode={practiceMode} />;

    case 7:
      return (
        <CodeChallengeCard
          question={apiQuestion}
          onSolve={onSolve}
          isBookmarked={false}
        />
      );

    default:
      return null;
  }
};

/* =====================================================
   TUTORIAL VIDEO SECTION
===================================================== */

const TutorialVideosSection = ({ videos }: { videos: ApiQuestion[] }) => {
  if (!videos.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      {videos.map((video, index) => {
        const transformed = transformApiQuestion(video);

        return (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {video.title}
              </Typography>
              <VideoTemplate question={transformed} practiceMode />
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

/* =====================================================
   QUESTIONS PANEL (Layout + Mapping Only)
===================================================== */

const QuestionsPanel = ({
  questions,
  contentTypeId,
  courseId,
  navigate,
  getUserAnswer,
  handleAnswerChange,
}: any) => {
  if (!questions?.length) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>No questions available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, pb: 10 }}>
      {questions.map((apiQuestion: ApiQuestion) => {
        const transformed = transformApiQuestion(apiQuestion);
        const questionId = apiQuestion.id.toString();
        const userAnswer = getUserAnswer(contentTypeId, questionId);

        return (
          <Card
            key={apiQuestion.id}
            sx={{ mb: 3, boxShadow: SHADOWS.sm }}
          >
            <CardContent>
              {apiQuestion.title && (
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: '#1F2937' }}>
                  {apiQuestion.title}
                </Typography>
              )}
              {apiQuestion.description && (
                <Box
                  sx={{
                    mb: 3,
                    color: '#4B5563',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    '& p': { mb: 1.5 },
                  }}
                  dangerouslySetInnerHTML={{ __html: apiQuestion.description }}
                />
              )}

              <QuestionComponent
                apiQuestion={apiQuestion}
                transformed={transformed}
                practiceMode
                userAnswer={userAnswer}
                onAnswerChange={(answer: any) =>
                  handleAnswerChange(contentTypeId, questionId, answer)
                }
                onSolve={() =>
                  navigate(`/code-editor/${courseId}/${apiQuestion.id}`, {
                    state: { question: apiQuestion },
                  })
                }
              />
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

/* =====================================================
   STYLED TAB
===================================================== */

const StyledTab = styled(Tab)<{ selectedtab: boolean }>(
  ({ selectedtab }) => ({
    textTransform: "none",
    fontWeight: selectedtab ? 600 : 500,
  })
);

/* =====================================================
   MAIN COMPONENT
===================================================== */

const CoursePracticeContent: React.FC<Props> = ({ data }) => {
  const { courseId = "" } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitPracticeBulk] = useSubmitPracticeBulkMutation();

  /* ========================
     ANSWER HANDLING
  ======================== */

  const handleAnswerChange = useCallback(
    (contentTypeId: number, questionId: string, answer: any) => {
      setUserAnswers((prev) => ({
        ...prev,
        [contentTypeId]: {
          ...prev[contentTypeId],
          [questionId]: answer,
        },
      }));
    },
    []
  );

  const getUserAnswer = useCallback(
    (contentTypeId: number, questionId: string) =>
      userAnswers[contentTypeId]?.[questionId],
    [userAnswers]
  );

  const getCompletedCount = useCallback(
    (contentTypeId: number) =>
      userAnswers[contentTypeId]
        ? Object.keys(userAnswers[contentTypeId]).length
        : 0,
    [userAnswers]
  );

  /* ========================
     TUTORIAL VIDEOS
  ======================== */

  const tutorialVideos = useMemo(() => {
    const videoContentType = data?.contentTypes?.find(
      (ct) => ct.name === "Video"
    );

    return (
      videoContentType?.questions?.filter(
        (q) => q.questiontypeId === 6
      ) || []
    );
  }, [data]);

  /* ========================
     TABS DATA
  ======================== */

  const tabsData = useMemo(() => {
    if (!data?.contentTypes) return [];

    return data.contentTypes.map((ct) => {
      const questions = ct.questions ?? [];

      return {
        label: `${ct.name} (${questions.length})`,
        contentType: ct,
        totalMarks: questions.reduce(
          (sum, q) => sum + (q.score ?? 0),
          0
        ),
      };
    });
  }, [data]);

  const activeContentType = tabsData[activeTab]?.contentType;

  const completed = activeContentType
    ? getCompletedCount(activeContentType.id)
    : 0;

  /* ========================
     SUBMIT HANDLER
  ======================== */

  const handleSubmit = async () => {
    if (!activeContentType) return;

    setIsSubmitting(true);
    try {
      const answersForType = userAnswers[activeContentType.id] || {};

      const sessionQuestions = activeContentType.questions?.map((q) => {
        const answer = answersForType[q.id.toString()];
        const isMcq = q.questiontypeId === 1 || q.questiontypeId === 2;

        return {
          questionId: q.id,
          questionTypeId: q.questiontypeId,
          selectedOptionId: isMcq
            ? (Array.isArray(answer) ? answer.map(Number) : (answer ? Number(answer) : undefined))
            : undefined,
          answer: !isMcq ? String(answer || "") : undefined,
          timeSpent: 0,
        };
      }) || [];

      const submissionData: PracticeSessionData = {
        questions: sessionQuestions,
        totalTimeSpent: 0,
      };

      await submitPracticeBulk(submissionData).unwrap();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ========================
     RENDER
  ======================== */

  return (
    <Box sx={{ width: "100%" }}>
      <TutorialVideosSection videos={tutorialVideos} />

      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
      >
        {tabsData.map((tab, index) => (
          <StyledTab
            key={index}
            label={tab.label}
            selectedtab={activeTab === index}
          />
        ))}
      </Tabs>

      {tabsData.map((tab, index) => (
        <CustomTabPanel key={index} value={activeTab} index={index}>
          <QuestionsPanel
            questions={tab.contentType.questions}
            contentTypeId={tab.contentType.id}
            courseId={courseId}
            navigate={navigate}
            getUserAnswer={getUserAnswer}
            handleAnswerChange={handleAnswerChange}
          />
        </CustomTabPanel>
      ))}

      <Footer
        activeContentType={activeContentType}
        completed={completed}
        total={activeContentType?.questions?.length || 0}
        totalMarks={tabsData[activeTab]?.totalMarks}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CoursePracticeContent;
