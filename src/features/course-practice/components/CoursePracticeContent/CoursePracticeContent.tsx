

import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Dialog,
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
import { CodeEditorContext } from "../../../coding-question/context/CodeEditorContext";
import CodingQuestionPage from "../../../coding-question/CodingQuestion";
import NotesSection from "../Notes/Notes"
import InteractiveVideoPlayer from "../InteractiveVideoPlayer/InteractiveVideoPlayer";
import AssignmentTab from "../Assignment/AssignmentTab";

import AccessTimeIcon from "@mui/icons-material/AccessTimeOutlined";

import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface Props {
  data: CoursePracticeApiResponse["data"];
  unitId: string;
}

interface UserAnswers {
  [contentTypeId: number]: {
    [questionId: string]: string | string[];
  };
}

/* =====================================================
   STYLED TAB (Responsive)
===================================================== */

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.82rem",
  padding: "8px 14px",
  minHeight: 40,
  minWidth: 88,
  flexShrink: 0,
  "&.Mui-selected": {
    fontWeight: 600,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    padding: "8px 12px",
    minHeight: 40,
    minWidth: 86,
  },
}));

/* =====================================================
   QUESTION RENDERER (Single Responsibility)
===================================================== */

export const QuestionComponent = ({
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
   TUTORIAL VIDEO SECTION (Responsive)
===================================================== */

const TutorialVideosSection = ({ 
  videoContentType, 
  getUserAnswer, 
  handleAnswerChange,
  courseId,
  navigate
}: any) => {
  if (!videoContentType?.video) return null;

  return (
    <Box sx={{ 
      mb: { xs: 1.5, sm: 2, md: 2 },
      px: 0
    }}>
      <InteractiveVideoPlayer
        videoContentType={videoContentType}
        getUserAnswer={getUserAnswer}
        handleAnswerChange={handleAnswerChange}
        renderQuestion={(apiQ: any, transformed: any, userAnswer: any, onAnswerChange: any) => (
            <QuestionComponent
                apiQuestion={apiQ}
                transformed={transformed}
                practiceMode
                userAnswer={userAnswer}
                onAnswerChange={onAnswerChange}
                onSolve={() =>
                  navigate(`/code-editor/${courseId}/${apiQ.id}`, {
                    state: { question: apiQ },
                  })
                }
            />
        )}
      />
    </Box>
  );
};

/* =====================================================
   QUESTIONS PANEL (Responsive)
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: { xs: 4, sm: 5, md: 6 },
        px: { xs: 3, sm: 4 },
        bgcolor: "#F9FAFB",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: "#E6F1FB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <AccessTimeIcon sx={{ fontSize: 26, color: "#185FA5" }} />
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
          fontWeight: 600,
          color: "#1F2937",
          mb: 0.5,
        }}
      >
        Coming soon
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "0.82rem", sm: "0.85rem" },
          color: "#6B7280",
          maxWidth: 320,
          lineHeight: 1.6,
        }}
      >
        Practice questions for this section are on the way. Check back shortly.
      </Typography>
    </Box>
  );
}

  return (
    <Box sx={{ 
      mt: { xs: 1.25, sm: 1.5, md: 2 },
      pb: { xs: 7, sm: 7, md: 7 },
      px: { xs: 0, sm: 0, md: 0 }
    }}>
      {questions.map((apiQuestion: ApiQuestion) => {
        const transformed = transformApiQuestion(apiQuestion);
        const questionId = apiQuestion.id.toString();
        const userAnswer = getUserAnswer(contentTypeId, questionId);

        return (
          <Card
            key={apiQuestion.id}
            sx={{ 
              mb: { xs: 1.25, sm: 1.5, md: 2 },
              boxShadow: SHADOWS.sm,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ 
              p: { xs: 1.5, sm: 1.75, md: 2 },
              "&:last-child": { pb: { xs: 1.5, sm: 1.75, md: 2 } }
            }}>
              {apiQuestion.title && (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: { xs: 0.75, sm: 0.9, md: 1 },
                    fontWeight: 700, 
                    color: '#1F2937',
                    fontSize: { xs: "0.95rem", sm: "1rem", md: "1.08rem" }
                  }}
                >
                  {apiQuestion.title}
                </Typography>
              )}
              {apiQuestion.description && apiQuestion.questiontypeId !== 7 && (
                <Box
                  sx={{
                    mb: { xs: 1.25, sm: 1.5, md: 2 },
                    color: '#4B5563',
                    fontSize: { xs: '13px', sm: '13.5px', md: '14px' },
                    lineHeight: 1.6,
                    '& p': { mb: { xs: 1, sm: 1.25, md: 1.5 } },
                    '& img, & video, & iframe': {
                      maxWidth: '100%',
                      height: 'auto',
                    },
                    '& pre': {
                      maxWidth: '100%',
                      overflowX: 'auto',
                    },
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
   MAIN COMPONENT (Responsive)
===================================================== */

const CoursePracticeContent: React.FC<Props> = ({ data, unitId }) => {
  const { courseId = "" } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [overlayCodingQuestion, setOverlayCodingQuestion] = useState<ApiQuestion | null>(null);

  const [submitPracticeBulk] = useSubmitPracticeBulkMutation();

  const [videoTab, setVideoTab] = useState(0);

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

  const videoContentType = useMemo(() => {
    return data?.contentTypes?.find((ct) => ct.id === 1);
  }, [data]);

  /* ========================
     TABS DATA (exclude Video content type, id === 1)
  ======================== */

  const tabsData = useMemo(() => {
    if (!data?.contentTypes) return [];

    return data.contentTypes
      .filter((ct) => ct.id !== 1)
      .map((ct) => {
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
      const numericUnitId = Number(unitId);

      const sessionQuestions = activeContentType.questions?.map((q) => {
        const answer = answersForType[q.id.toString()];
        const isMcq = q.questiontypeId === 1 || q.questiontypeId === 2;
        const textAnswer = !isMcq && answer !== undefined
          ? String(answer).trim()
          : undefined;
        const selectedOptionId = isMcq
          ? Number(Array.isArray(answer) ? answer[0] : answer)
          : undefined;

        return {
          questionId: q.id,
          contentId: q.contentId,
          unitId: Number.isFinite(numericUnitId) && numericUnitId > 0
            ? numericUnitId
            : undefined,
          contentTypeId: activeContentType.id,
          questionTypeId: q.questiontypeId,
          selectedOptionId: isMcq && Number.isFinite(selectedOptionId) && selectedOptionId > 0
            ? selectedOptionId
            : undefined,
          userAnswer: textAnswer || undefined,
          answer: textAnswer || undefined,
          timeSpent: 0,
        };
      }).filter((q) => q.selectedOptionId !== undefined || q.userAnswer !== undefined || q.answer !== undefined) || [];

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
    <Box sx={{ 
      width: "100%",
      maxWidth: { xs: "100%", sm: "100%", md: "1080px", lg: "1180px" },
      mx: "auto",
    }}>
      {/* Video always on top */}
      <TutorialVideosSection 
        videoContentType={videoContentType} 
        getUserAnswer={getUserAnswer}
        handleAnswerChange={handleAnswerChange}
        courseId={courseId}
        navigate={(path: string, stateObj: any) => {
           if (stateObj?.state?.question) {
              setOverlayCodingQuestion(stateObj.state.question);
           } else {
              navigate(path, stateObj);
           }
        }}
      />

      {/* Responsive Tab Switcher */}
      <Box sx={{ 
        overflowX: "auto",
        px: 0,
        mb: { xs: 1, sm: 1.25, md: 1.5 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}>
        <Tabs
          value={videoTab}
          onChange={(_, val) => setVideoTab(val)}
          sx={{ 
            minWidth: "max-content",
            "& .MuiTabs-indicator": {
              height: { xs: "2px", sm: "2px", md: "3px" }
            },
            "& .MuiTabs-flexContainer": { gap: { xs: 0, sm: 0.5 } },
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <StyledTab label="Practice" />
          <StyledTab label="Notes" />
          <StyledTab label="Assignment" />
        </Tabs>
      </Box>

      {/* Practice Tab Content */}
      {/* {videoTab === 0 && (
        <Box>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{ 
              minWidth: "max-content",
              mb: { xs: 1, sm: 1.25, md: 1.5 },
              "& .MuiTabs-indicator": {
                height: { xs: "2px", sm: "2px", md: "3px" }
              },
              "& .MuiTabs-flexContainer": { gap: { xs: 0, sm: 0.5 } },
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabsData.map((tab, index) => (
              <StyledTab
                key={index}
                label={tab.label}
              />
            ))}
          </Tabs>

          {tabsData.map((tab, index) => (
            <CustomTabPanel key={index} value={activeTab} index={index}>
              <QuestionsPanel
                questions={tab.contentType.questions}
                contentTypeId={tab.contentType.id}
                courseId={courseId}
                navigate={(path: string, stateObj: any) => {
                  if (stateObj?.state?.question) {
                    setOverlayCodingQuestion(stateObj.state.question);
                  } else {
                    navigate(path, stateObj);
                  }
                }}
                getUserAnswer={getUserAnswer}
                handleAnswerChange={handleAnswerChange}
              />
            </CustomTabPanel>
          ))}
        </Box>
      )} */}
{videoTab === 0 && (
  <Box>
    {tabsData.length > 0 ? (
      <>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ 
            minWidth: "max-content",
            mb: { xs: 1, sm: 1.25, md: 1.5 },
            "& .MuiTabs-indicator": {
              height: { xs: "2px", sm: "2px", md: "3px" }
            },
            "& .MuiTabs-flexContainer": { gap: { xs: 0, sm: 0.5 } },
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabsData.map((tab, index) => (
            <StyledTab key={index} label={tab.label} />
          ))}
        </Tabs>

        {tabsData.map((tab, index) => (
          <CustomTabPanel key={index} value={activeTab} index={index}>
            <QuestionsPanel
              questions={tab.contentType.questions}
              contentTypeId={tab.contentType.id}
              courseId={courseId}
              navigate={(path: string, stateObj: any) => {
                if (stateObj?.state?.question) {
                  setOverlayCodingQuestion(stateObj.state.question);
                } else {
                  navigate(path, stateObj);
                }
              }}
              getUserAnswer={getUserAnswer}
              handleAnswerChange={handleAnswerChange}
            />
          </CustomTabPanel>
        ))}
      </>
    ) : (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      p: { xs: 4, sm: 5, md: 7 },
      px: { xs: 3, sm: 4 },
      background: "linear-gradient(180deg, #FFFFFF, #F9FAFB)",
      border: "1px solid #EEF0F3",
      borderRadius: "16px",
    }}
  >
    <Box
      sx={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        bgcolor: "#E6F1FB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2.5,
      }}
    >
      <RocketLaunchOutlinedIcon sx={{ fontSize: 32, color: "#185FA5" }} />
    </Box>

    <Typography
      sx={{
        fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.2rem" },
        fontWeight: 600,
        color: "#1F2937",
        mb: 1,
      }}
    >
      Something exciting is on its way! 
    </Typography>

    <Typography
      sx={{
        fontSize: { xs: "0.85rem", sm: "0.9rem" },
        color: "#6B7280",
        maxWidth: 380,
        lineHeight: 1.7,
        mb: 2.5,
      }}
    >
      We're crafting fresh practice questions for this section. Hang tight — they'll be ready for you very soon!
    </Typography>

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        px: 2,
        py: 0.75,
        bgcolor: "#E6F1FB",
        borderRadius: "20px",
      }}
    >
      <AutoAwesomeIcon sx={{ fontSize: 15, color: "#185FA5" }} />
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#185FA5" }}>
        Coming soon
      </Typography>
    </Box>
  </Box>

    )}
  </Box>
)}
      {/* Notes Tab */}
      {videoTab === 1 && (
        <Box sx={{ 
          px: { xs: 1, sm: 2, md: 0 },
          py: { xs: 1.5, sm: 2, md: 3 }
        }}>
          <NotesSection
            unitId={Number(unitId)}
          />
        </Box>
      )}

      {/* Assignment Tab */}
      {videoTab === 2 && (
        <Box sx={{ 
          px: { xs: 1, sm: 2, md: 0 },
          py: { xs: 1.5, sm: 2, md: 3 }
        }}>
          <AssignmentTab 
            unitId={Number(unitId)}
          />
        </Box>
      )}

      {/* Footer only for Practice tab */}
      {videoTab === 0 && (
        <Footer
          activeContentType={activeContentType}
          completed={completed}
          total={activeContentType?.questions?.length || 0}
          totalMarks={tabsData[activeTab]?.totalMarks}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      )}

      {/* Full-screen Overlay for Coding Questions */}
      <Dialog
         fullScreen
         open={!!overlayCodingQuestion}
         onClose={() => setOverlayCodingQuestion(null)}
         sx={{ zIndex: 9999 }}
      >
         {overlayCodingQuestion && (
            <CodeEditorContext.Provider value={{ questionOverride: overlayCodingQuestion, onClose: () => setOverlayCodingQuestion(null) }}>
               <CodingQuestionPage />
            </CodeEditorContext.Provider>
         )}
      </Dialog>
    </Box>
  );
};

export default CoursePracticeContent;
