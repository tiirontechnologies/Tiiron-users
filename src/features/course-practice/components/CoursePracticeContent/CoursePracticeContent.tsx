import React, { useMemo, useState, useCallback, useEffect } from "react";

import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";


import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Dialog,
  Avatar,
  IconButton,
} from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
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
import { useGetUnitNotesQuery, useGetAssignmentQuery } from "../../api/courseProgressApi";
import Footer from "../../components/Footer";
import { CodeEditorContext } from "../../../coding-question/context/CodeEditorContext";
import CodingQuestionPage from "../../../coding-question/CodingQuestion";
import NotesSection from "../Notes/Notes"
import InteractiveVideoPlayer from "../InteractiveVideoPlayer/InteractiveVideoPlayer";
import AssignmentTab from "../Assignment/AssignmentTab";
import EmptyState from "../UI/EmptyState";

import AccessTimeIcon from "@mui/icons-material/AccessTimeOutlined";

import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface Props {
  data: CoursePracticeApiResponse["data"];
  unitId: string;
  unitData?: any;
  organizationName?: string;
  organizationLogo?: string;
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
  videoContentTypes,
  getUserAnswer, 
  handleAnswerChange,
  courseId,
  navigate,
  organizationName,
  organizationLogo,
}: any) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  useEffect(() => setActiveVideoIndex(0), [videoContentTypes]);
  const videoContentType = videoContentTypes?.[activeVideoIndex];
  if (!videoContentType?.video) return null;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: videoContentType.video.title || "Course lecture", url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch (error: any) {
      if (error?.name !== "AbortError") console.error("Could not share this lecture", error);
    }
  };

  return (
    <Box sx={{ mb: { xs: 1.5, sm: 2, md: 2 }, px: 0 }}>
      <Box sx={{ p: { xs: 0.75, sm: 1 }, border: "1px solid #DCE2EA", borderRadius: 2.5, bgcolor: "#fff", boxShadow: "0 4px 14px rgba(15,23,42,0.06)" }}>
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
      <Typography sx={{ px: { xs: 0.75, sm: 1 }, color: "#202124", fontSize: 16, fontWeight: 700, lineHeight: 1.35 }}>
        {videoContentType.video.title || videoContentType.title || "Course lecture"}
      </Typography>
      {(videoContentType.video.description || videoContentType.description) && (
        <Box
          sx={{
            px: { xs: 0.75, sm: 1 },
            mt: 0.4,
            color: "#64748B",
            fontSize: 11,
            lineHeight: 1.5,
            "& p": { m: 0 },
          }}
          dangerouslySetInnerHTML={{
            __html: videoContentType.video.description || videoContentType.description,
          }}
        />
      )}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, px: { xs: 0.5, sm: 1 }, pt: 1.25, pb: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
          <Avatar src={organizationLogo || undefined} alt={organizationName || "Organization"} sx={{ width: 38, height: 38, bgcolor: "#F5F5F5", color: "#475569", border: "1px solid #E5E7EB", fontSize: 14, fontWeight: 700 }}>
            {(organizationName || "O").slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#202124", fontSize: { xs: 14, sm: 15 }, fontWeight: 700 }}>
            {organizationName || "Course Organization"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
          <IconButton aria-label="Share lecture" onClick={() => void handleShare()} size="small" sx={{ border: "1px solid #E5E7EB", borderRadius: "50%", width: 36, height: 36 }}>
            <ShareOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      </Box>
      {videoContentTypes.length > 1 && (
        <Box sx={{ mt: 1.5, p: { xs: 1.25, sm: 1.75 }, border: "1px solid #E2E8F0", borderRadius: 2.5, bgcolor: "#fff" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.25 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#273142" }}>Unit videos</Typography>
            <Typography sx={{ px: 1, py: 0.25, borderRadius: 5, bgcolor: "#F1F5F9", color: "#475569", fontSize: 11, fontWeight: 600 }}>{videoContentTypes.length} lectures</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 0.25, scrollbarWidth: "thin" }}>
          {videoContentTypes.map((item: any, index: number) => {
            const video = item.video;
            const videoId = video.url?.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1];
            const thumbnail = video.thumbnailUrl || video.thumbnail || video.image ||
              (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : undefined);
            return (
              <Box key={`${item.id}-${index}`} onClick={() => setActiveVideoIndex(index)} role="button" tabIndex={0}
                onKeyDown={(event) => event.key === "Enter" && setActiveVideoIndex(index)}
                sx={{ flex: "0 0 112px", cursor: "pointer", borderRadius: 1.5, overflow: "hidden", border: activeVideoIndex === index ? "2px solid #4F39F6" : "1px solid #D8DCE5", bgcolor: "#fff", textAlign: "left" }}>
                {thumbnail ? <Box component="img" src={thumbnail} alt={`Lecture ${index + 1}`} sx={{ display: "block", width: "100%", height: 62, objectFit: "cover", bgcolor: "#EEF0F5" }} /> : <Box sx={{ height: 62, bgcolor: "#EEF0F5" }} />}
                <Typography sx={{ px: 0.75, pt: 0.5, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>Lecture {index + 1}</Typography>
                <Typography sx={{ px: 0.75, pb: 0.5, fontSize: 10, color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.video.title || `Video ${index + 1}`}</Typography>
              </Box>
            );
          })}
          </Box>
        </Box>
      )}
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

const CoursePracticeContent: React.FC<Props> = ({ data, unitId, unitData, organizationName, organizationLogo }) => {
  const { courseId = "" } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [overlayCodingQuestion, setOverlayCodingQuestion] = useState<ApiQuestion | null>(null);

  const [submitPracticeBulk] = useSubmitPracticeBulkMutation();

  const [activeSection, setActiveSection] = useState<
    "practice" | "notes" | "assignment" | null
  >(null);

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

  const videoContentTypes = useMemo(() => {
    const collected: any[] = [];
    const videoData = data as (typeof data & {
      videos?: any;
      unitVideos?: any;
      unit?: { videos?: any };
    });
    const addVideos = (value: any, parent: any = {}) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((entry) => addVideos(entry, parent));
        return;
      }
      if (Array.isArray(value.videos)) {
        addVideos(value.videos, { ...parent, ...value });
        return;
      }

      const rawVideo = value.video ?? value;
      const rawUrl = typeof rawVideo === "string" ? rawVideo : rawVideo?.url;
      if (!rawUrl) {
        if (Array.isArray(value.contents)) addVideos(value.contents, { ...parent, ...value });
        return;
      }

      const markdownUrl = rawUrl.match(/\]\((https?:\/\/[^)]+)\)/)?.[1];
      const url = markdownUrl || rawUrl.replace(/^\[|\]$/g, "");
      const video = typeof rawVideo === "string" ? { url, title: value.title } : { ...rawVideo, url };
      if (!collected.some((item) => item.video.url === url)) {
        collected.push({
          ...parent,
          ...value,
          video,
          questions: value.questions ?? parent.questions,
        });
      }
    };

    const contentTypes = data?.contentTypes ?? [];
    contentTypes
      .filter((contentType: any) => contentType.id === 1 || contentType.name?.trim().toLowerCase() === "video")
      .forEach((contentType: any) => {
        if (contentType.video) addVideos(contentType.video, contentType);
        if (contentType.videos) addVideos(contentType.videos, contentType);
        if (contentType.contents) addVideos(contentType.contents, contentType);
        (contentType.questions ?? []).forEach((question: any) => {
          if (question.video?.url) {
            addVideos({
              ...question.video,
              title: question.video.title || question.title,
              description: question.description,
              questions: [{ timestamp: question.timestamp, questions: [question] }],
            }, contentType);
          }
        });
      });

    addVideos(videoData?.videos);
    addVideos(videoData?.unitVideos);
    addVideos(videoData?.unit?.videos);
    addVideos(unitData?.videos);
    addVideos(unitData?.unitVideos);
    addVideos(unitData?.content?.videos);
    addVideos(unitData?.contents);
    (unitData?.contentTypes ?? unitData?.contents?.contentTypes ?? [])
      .filter((contentType: any) => contentType.id === 1 || contentType.name?.trim().toLowerCase() === "video")
      .forEach((contentType: any) => addVideos(contentType.video ?? contentType.videos ?? contentType.contents, contentType));

    return collected;
  }, [data, unitData]);

  /* ========================
     TABS DATA (exclude Video content type, id === 1)
  ======================== */

  const tabsData = useMemo(() => {
    if (!data?.contentTypes) return [];

    return data.contentTypes
      .filter((ct) => ct.id !== 1 && ct.name?.trim().toLowerCase() !== "video")
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
     NOTES / ASSIGNMENT PRESENCE CHECK
  ======================== */

  const { data: notesResponse, isLoading: notesLoading } = useGetUnitNotesQuery(
    Number(unitId),
    { skip: !unitId }
  );
  const { data: assignmentResponse, isLoading: assignmentLoading } = useGetAssignmentQuery(
    Number(unitId),
    { skip: !unitId }
  );

  const hasNotes = ((notesResponse as any)?.data?.length ?? 0) > 0;
  const hasAssignments = ((assignmentResponse as any)?.data?.length ?? 0) > 0;
  const hasPractice = tabsData.some(
    (tab) => (tab.contentType.questions?.length ?? 0) > 0
  );

  const isCheckingSections = notesLoading || assignmentLoading;

  const sections = useMemo(() => {
    const list: { key: "practice" | "notes" | "assignment"; label: string }[] = [];
    if (hasPractice) list.push({ key: "practice", label: "Practice" });
    if (hasNotes) list.push({ key: "notes", label: "Notes" });
    if (hasAssignments) list.push({ key: "assignment", label: "Assignment" });
    return list;
  }, [hasPractice, hasNotes, hasAssignments]);

  useEffect(() => {
    if (!activeSection && sections.length > 0) {
      setActiveSection(sections[0].key);
    }
  }, [sections, activeSection]);

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

  const hasUnitContent = videoContentTypes.length > 0 || hasPractice;
  if (!isCheckingSections && !hasUnitContent && !hasNotes && !hasAssignments) {
    return (
      <Box sx={{ width: "100%", px: { xs: 1, sm: 2 }, py: { xs: 2, md: 3 } }}>
        <EmptyState />
      </Box>
    );
  }

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
        videoContentTypes={videoContentTypes}
        organizationName={organizationName}
        organizationLogo={organizationLogo}
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

      {/* Responsive Tab Switcher - only sections that actually have content */}
      {!isCheckingSections && sections.length > 0 && (
        <Box sx={{ 
          overflowX: "auto",
          px: 0,
          mb: { xs: 1, sm: 1.25, md: 1.5 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}>
          <Tabs
            value={activeSection || false}
            onChange={(_, val) => setActiveSection(val)}
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
            {sections.map((s) => (
              <StyledTab key={s.key} value={s.key} label={s.label} />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Practice Tab Content */}
      {/* {activeSection === "practice" && (
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
          ) : null}
        </Box>
      )} */}

      {/* Practice Tab Content */}
{activeSection === "practice" && (
  <Box>
    {tabsData.length > 0 ? (
      <>
        <Box sx={{ mb: { xs: 1, sm: 1.5 } , pt:3.75 }}>
          <Typography variant="h6" fontWeight={800} sx={{ color: "#4F46E5" }}>
            Practice
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
            Test your understanding with quiz questions for this unit
          </Typography>
        </Box>

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
    ) : null}
  </Box>
)}

      {/* Notes Tab */}
      {activeSection === "notes" && (
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
      {activeSection === "assignment" && (
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
      {activeSection === "practice" && (
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
