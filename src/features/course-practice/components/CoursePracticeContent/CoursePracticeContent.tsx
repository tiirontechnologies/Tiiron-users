import React, { useMemo, useState, useCallback } from "react";
import { Box, Typography, Tabs, Tab, Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import CustomTabPanel from "../../../../components/ui/CustomTabPanel";
import { transformApiQuestion } from "../../utils/transformApiResponse";
import { CoursePracticeApiResponse, ApiContentType, ApiQuestion } from "../../types";
import { COLORS, SHADOWS, GRADIENTS } from "../../constants";
import { renderIconFromPath } from "../../utils/iconMapper";
import McqTemplate from "../QuestionTemplates/McqTemplate";
import FillUpTemplate from "../QuestionTemplates/FillUpTemplate";
import SubjectiveTemplate from "../QuestionTemplates/SubjectiveTemplate";
import BlogTemplate from "../QuestionTemplates/BlogTemplate";
import VideoTemplate from "../QuestionTemplates/VideoTemplate";
import { useSubmitPracticeBulkMutation } from "../../api/practiceApi";
import Scoresvg from "@icons/Score.svg";

interface CoursePracticeContentProps {
  data: CoursePracticeApiResponse["data"];
  refetchContent?: () => void;
  courseId?: string;
  unitId?: string;
}

interface UserAnswers {
  [questionId: string]: string | string[];
}

interface ContentTypeAnswers {
  [contentTypeId: number]: UserAnswers;
}

const QuestionComponent = ({
  questiontypeId,
  question,
  practiceMode,
  userAnswer,
  onAnswerChange,
}: {
  questiontypeId: number;
  question: any;
  practiceMode: boolean;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
}) => {
  switch (questiontypeId) {
    case 1: // Multiple Choice
      return (
        <McqTemplate
          question={question}
          practiceMode={practiceMode}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );
    case 2: // Quiz (also MCQ)
      return (
        <McqTemplate
          question={question}
          practiceMode={practiceMode}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );
    case 3: // Fill Ups
      return (
        <FillUpTemplate
          question={question}
          practiceMode={practiceMode}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );
    case 4: // Subjective
      return (
        <SubjectiveTemplate
          question={question}
          practiceMode={practiceMode}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );
    case 5: // Blog
      return <BlogTemplate question={question} practiceMode={practiceMode} />;
    case 6: // Video
      return <VideoTemplate question={question} practiceMode={practiceMode} />;
    default:
      return null;
  }
};

// Styled Tab with icon support
const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'selectedtab',
})<{ selectedtab: boolean }>(
  ({ selectedtab }) => ({
    textTransform: "none",
    fontWeight: selectedtab ? "600" : "500",
    color: selectedtab ? COLORS.primary : COLORS.text.muted,
    transition: "all 0.2s ease",
    "&:hover": {
      color: COLORS.primary,
    },
    "& .MuiTab-iconWrapper": {
      marginRight: "8px",
    },
  })
);

interface TabData {
  label: string;
  icon?: React.ReactNode;
  panel: React.ReactNode;
  contentType: ApiContentType;
  totalMarks: number;
}

const CoursePracticeContent: React.FC<CoursePracticeContentProps> = ({
  data,
  refetchContent,
  courseId: propCourseId,
  unitId: propUnitId,
}) => {
  const params = useParams<{ courseId: string }>();
  const courseId = propCourseId || params.courseId || "";
  const unitId = propUnitId || "";
  const [activeTab, setActiveTab] = useState(0);
  const [userAnswers, setUserAnswers] = useState<ContentTypeAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPracticeBulk] = useSubmitPracticeBulkMutation();

  // Calculate total marks for each content type
  const calculateTotalMarks = (contentType: ApiContentType): number => {
    if (!contentType.questions || contentType.questions.length === 0) return 0;
    return contentType.questions.reduce((total, question) => {
      return total + (question.score || 0);
    }, 0);
  };

  // Handle answer change for a question
  const handleAnswerChange = useCallback(
    (contentTypeId: number, questionId: string, answer: string | string[]) => {
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

  // Get user answer for a question
  const getUserAnswer = useCallback(
    (contentTypeId: number, questionId: string): string | string[] | undefined => {
      return userAnswers[contentTypeId]?.[questionId];
    },
    [userAnswers]
  );

  // Count completed questions for a content type
  const getCompletedCount = useCallback(
    (contentTypeId: number, totalQuestions: number): number => {
      const answers = userAnswers[contentTypeId];
      if (!answers) return 0;
      return Object.keys(answers).length;
    },
    [userAnswers]
  );

  // Submit answers for a specific content type
  const handleSubmitContentType = useCallback(
    async (contentType: ApiContentType) => {
      if (!courseId || !unitId) {
        console.error("Course ID or Unit ID is missing");
        return;
      }

      const answers = userAnswers[contentType.id];
      if (!answers || Object.keys(answers).length === 0) {
        alert("Please answer at least one question before submitting.");
        return;
      }

      setIsSubmitting(true);
      try {
        // Transform answers to API format
        const practiceData = {
          questions: contentType.questions
            .filter((q) => answers[q.id.toString()])
            .map((q) => {
              const answer = answers[q.id.toString()];
              let selectedOptionId: number | number[] | undefined;
              let answerText: string | undefined;

              if (q.questiontypeId === 1 || q.questiontypeId === 2) {
                // MCQ - answer is option ID(s)
                if (typeof answer === "string") {
                  selectedOptionId = parseInt(answer);
                } else if (Array.isArray(answer)) {
                  selectedOptionId = answer.map((a) => parseInt(a));
                }
              } else {
                // Fill up or Subjective - answer is text
                answerText = typeof answer === "string" ? answer : answer.join(", ");
              }

              return {
                questionId: q.id,
                questionTypeId: q.questiontypeId,
                selectedOptionId,
                answer: answerText,
                timeSpent: 0, // TODO: Track time spent
              };
            }),
          totalTimeSpent: 0, // TODO: Track total time
        };

        await submitPracticeBulk(practiceData).unwrap();
        alert("Answers submitted successfully!");
        if (refetchContent) {
          refetchContent();
        }
      } catch (error) {
        console.error("Failed to submit answers:", error);
        alert("Failed to submit answers. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [userAnswers, courseId, unitId, submitPracticeBulk, refetchContent]
  );

  // Extract tutorial videos (contentType.name === "Video" AND question.questiontypecon.name === "Video")
  const tutorialVideos = useMemo(() => {
    if (!data?.contentTypes || !Array.isArray(data.contentTypes)) return [];

    const videoContentType = data.contentTypes.find(ct => ct.name === "Video");
    if (!videoContentType?.questions) return [];

    return videoContentType.questions.filter(
      (q) => q.questiontypecon?.name === "Video"
    );
  }, [data]);

  const { tabsData } = useMemo(() => {
    const tabs: TabData[] = [];

    if (data?.contentTypes && Array.isArray(data.contentTypes)) {
      // Sort contentTypes by order
      const sortedContentTypes = [...data.contentTypes].sort(
        (a, b) => a.order - b.order
      );

      sortedContentTypes.forEach((contentType: ApiContentType) => {
        // Filter out tutorial videos from the Video content type
        let filteredQuestions = contentType.questions || [];
        if (contentType.name === "Video") {
          filteredQuestions = filteredQuestions.filter(
            (q) => q.questiontypecon?.name !== "Video"
          );
          // Skip this tab if no questions left after filtering
          if (filteredQuestions.length === 0) return;
        }

        // Get icon from icon path - ensure it's a valid React element, not null
        const iconElement = contentType.icon
          ? renderIconFromPath(contentType.icon, {
            sx: { fontSize: "20px" },
          })
          : undefined;
        const icon = iconElement || undefined; // Convert null to undefined

        // Calculate total marks for filtered questions
        const totalMarks = filteredQuestions.reduce((total, q) => total + (q.score || 0), 0);

        // Create panel with questions for this contentType
        const questionsPanel = (
          <Box key={contentType.id} sx={{ mt: 3, pb: 10 }}>
            {filteredQuestions.length > 0 ? (
              <>
                {filteredQuestions.map((apiQuestion: ApiQuestion, qIndex: number) => {
                  // Transform API question to Question format
                  const transformedQuestion = transformApiQuestion(apiQuestion);
                  const questionId = apiQuestion.id.toString();
                  const userAnswer = getUserAnswer(contentType.id, questionId);

                  // Debug: Log question transformation for MCQ
                  if (apiQuestion.questiontypeId === 1 || apiQuestion.questiontypeId === 2) {
                    console.log("MCQ Question:", {
                      original: apiQuestion,
                      transformed: transformedQuestion,
                      hasOptions: !!transformedQuestion.content?.options,
                      optionsCount: transformedQuestion.content?.options?.length || 0,
                    });
                  }

                  return (
                    <Card
                      key={`${contentType.id}-${apiQuestion.id}-${qIndex}`}
                      sx={{
                        mb: 3,
                        borderRadius: "12px",
                        boxShadow: SHADOWS.sm,
                        border: `1px solid ${COLORS.border.light}`,
                      }}
                    >
                      <CardContent>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: COLORS.text.primary,
                              mb: 1,
                            }}
                          >
                            {apiQuestion.title}
                          </Typography>
                          {apiQuestion.description && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: COLORS.text.muted,
                                mb: 2,
                              }}
                            >
                              {apiQuestion.description}
                            </Typography>
                          )}
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1,
                              px: 2,
                              py: 0.5,
                              borderRadius: "8px",
                              background: COLORS.background.light,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                color: COLORS.primary,
                              }}
                            >
                              Score: {apiQuestion.score || 0} marks
                            </Typography>
                          </Box>
                        </Box>
                        <QuestionComponent
                          questiontypeId={apiQuestion.questiontypeId}
                          question={transformedQuestion}
                          practiceMode={true}
                          userAnswer={userAnswer}
                          onAnswerChange={(answer) =>
                            handleAnswerChange(contentType.id, questionId, answer)
                          }
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            ) : (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: "12px",
                  background: COLORS.background.white,
                  border: `1px solid ${COLORS.border.light}`,
                }}
              >
                <Typography
                  sx={{
                    color: COLORS.text.muted,
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  No questions available for {contentType.name}
                </Typography>
              </Box>
            )}
          </Box>
        );

        tabs.push({
          label: contentType.name,
          icon,
          panel: questionsPanel,
          contentType: { ...contentType, questions: filteredQuestions },
          totalMarks,
        });
      });
    }

    return { tabsData: tabs };
  }, [data, userAnswers, getUserAnswer, handleAnswerChange]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (tabsData.length === 0) {
    return (
      <Box
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: "12px",
          background: COLORS.background.white,
          border: `1px solid ${COLORS.border.light}`,
        }}
      >
        <Typography
          sx={{
            color: COLORS.text.muted,
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          No content types available
        </Typography>
      </Box>
    );
  }

  const activeContentType = tabsData[activeTab]?.contentType;
  const activeCompletedCount = activeContentType
    ? getCompletedCount(activeContentType.id, activeContentType.questions?.length || 0)
    : 0;
  const activeTotalQuestions = activeContentType?.questions?.length || 0;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tutorial Videos Section - Above Tabs */}
      {tutorialVideos.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {tutorialVideos.map((apiQuestion: ApiQuestion, index: number) => {
            const transformedQuestion = transformApiQuestion(apiQuestion);
            return (
              <Card
                key={`tutorial-video-${apiQuestion.id}-${index}`}
                sx={{
                  mb: 2,
                  borderRadius: "12px",
                  boxShadow: SHADOWS.sm,
                  border: `1px solid ${COLORS.border.light}`,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: COLORS.text.primary,
                      mb: 2,
                    }}
                  >
                    {apiQuestion.title}
                  </Typography>
                  <VideoTemplate question={transformedQuestion} practiceMode={true} />
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      <Box
        sx={{
          position: "sticky",
          top: 0, // Sticky to the top of the scrollable container
          zIndex: 100,
          background: COLORS.background.light,
          pb: 2,
          pt: 1,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            background: COLORS.background.white,
            borderRadius: "16px",
            width: "fit-content",
            p: "0px 20px",
            boxShadow: SHADOWS.sm,
            border: `1px solid ${COLORS.border.light}`,
            "& .MuiTabs-indicator": {
              height: "3px",
              borderRadius: "24px",
              background: COLORS.primary,
            },
          }}
        >
          {tabsData.map((tab, index) => (
            <StyledTab
              key={index}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>{tab.label}</span>
                  <Typography
                    variant="caption"
                    sx={{
                      color: activeTab === index ? COLORS.primary : COLORS.text.muted,
                      fontWeight: 600,
                    }}
                  >
                    ({tab.totalMarks} marks)
                  </Typography>
                </Box>
              }
              {...(tab.icon ? { icon: tab.icon, iconPosition: "start" as const } : {})}
              selectedtab={activeTab === index}
              id={`custom-tab-${index}`}
              aria-controls={`custom-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {tabsData.map((tab, index) => (
        <CustomTabPanel key={index} value={activeTab} index={index}>
          {tab.panel}
        </CustomTabPanel>
      ))}

      {/* Footer for submitting */}
      {activeContentType && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "289px",
            right: 0,
            background: COLORS.background.white,
            borderTop: `1px solid ${COLORS.border.light}`,
            zIndex: 1000,
            p: 3,
            boxShadow: SHADOWS.xl,
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
                <Typography
                  sx={{
                    color: COLORS.text.muted,
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Progress
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.text.primary,
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  {activeCompletedCount} / {activeTotalQuestions}
                </Typography>
              </Box>
              <Box sx={{ ml: 3 }}>
                <Typography
                  sx={{
                    color: COLORS.text.muted,
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Total Marks
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.primary,
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  {tabsData[activeTab]?.totalMarks}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              onClick={() => handleSubmitContentType(activeContentType)}
              disabled={isSubmitting || activeCompletedCount === 0}
              sx={{
                background: COLORS.primary,
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": {
                  background: GRADIENTS.primaryHover,
                },
                "&:disabled": {
                  background: COLORS.border.light,
                  color: COLORS.text.muted,
                },
              }}
            >
              {isSubmitting ? "Submitting..." : `Submit ${activeContentType.name}`}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CoursePracticeContent;
