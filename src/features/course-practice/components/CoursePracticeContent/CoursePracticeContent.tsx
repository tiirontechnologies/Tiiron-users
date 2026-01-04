import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import CustomTabPanel from "../../../../components/ui/CustomTabPanel";
import { transformApiQuestion } from "../../utils/transformApiResponse";
import {
  CoursePracticeApiResponse,
  ApiContentType,
  ApiQuestion,
} from "../../types";
import { COLORS, SHADOWS, GRADIENTS } from "../../constants";
import { renderIconFromPath } from "../../utils/iconMapper";
import McqTemplate from "../QuestionTemplates/McqTemplate";
import FillUpTemplate from "../QuestionTemplates/FillUpTemplate";
import SubjectiveTemplate from "../QuestionTemplates/SubjectiveTemplate";
import BlogTemplate from "../QuestionTemplates/BlogTemplate";
import VideoTemplate from "../QuestionTemplates/VideoTemplate";
import CodeChallengeCard from "../QuestionTemplates/CodeChallengeCard";
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
    case 7: // Code
      // Code challenges are rendered as CodeChallengeCard, not through QuestionComponent
      return null;
    default:
      return null;
  }
};

// Styled Tab with icon support
const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== "selectedtab",
})<{ selectedtab: boolean }>(({ selectedtab }) => ({
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
}));

interface TabData {
  label: string;
  icon?: React.ReactElement;
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
  const navigate = useNavigate();
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
    (
      contentTypeId: number,
      questionId: string
    ): string | string[] | undefined => {
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
                answerText =
                  typeof answer === "string" ? answer : answer.join(", ");
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
  // These videos should be displayed at the top, not in tabs
  const tutorialVideos = useMemo(() => {
    if (!data?.contentTypes || !Array.isArray(data.contentTypes)) return [];

    const videoContentType = data.contentTypes.find(
      (ct) => ct.name === "Video"
    );
    if (!videoContentType?.questions) return [];

    // Filter for video questions (questiontypeId === 6 or questiontypecon.name === "Video")
    return videoContentType.questions.filter(
      (q) => q.questiontypeId === 6 || q.questiontypecon?.name === "Video"
    );
  }, [data]);

  // Map contentTypeId to tab label
  const getTabLabel = (contentTypeId: number): string | null => {
    switch (contentTypeId) {
      case 1:
        return "Video Practice";
      case 2:
        return "Quiz";
      case 3:
        return "Assessment";
      case 5:
        return "Blog";
      default:
        return null; // Don't show tabs for other contentTypeIds
    }
  };

  const { tabsData } = useMemo(() => {
    const tabs: TabData[] = [];

    if (data?.contentTypes && Array.isArray(data.contentTypes)) {
      // First, collect all questions grouped by contentTypeId
      const questionsByContentTypeId: { [key: number]: ApiQuestion[] } = {};

      data.contentTypes.forEach((contentType: ApiContentType) => {
        const contentTypeId = contentType.id;

        // Only process contentTypes with IDs 1, 2, 3, or 5
        if (![1, 2, 3, 5].includes(contentTypeId)) {
          return;
        }

        // Initialize array if it doesn't exist
        if (!questionsByContentTypeId[contentTypeId]) {
          questionsByContentTypeId[contentTypeId] = [];
        }

        // Filter questions for this contentType
        // For contentTypeId === 1 (Video), exclude video questions (questiontypeId === 6)
        // because those are displayed in the tutorial section at the top
        let filteredQuestions = contentType.questions || [];

        if (contentTypeId === 1) {
          // Exclude video questions from tabs - they're shown in tutorial section
          filteredQuestions = filteredQuestions.filter(
            (q) => q.questiontypeId !== 6 && q.questiontypecon?.name !== "Video"
          );
        }

        // Add questions to the group
        questionsByContentTypeId[contentTypeId].push(...filteredQuestions);
      });

      // Define tab order: Video Practice (1), Quiz (2), Assessment (3), Blog (5)
      const tabOrder = [1, 2, 3, 5];

      // Create tabs in the specified order
      tabOrder.forEach((contentTypeId) => {
        const questions = questionsByContentTypeId[contentTypeId] || [];

        // Only create tab if there are questions
        if (questions.length === 0) {
          return;
        }

        const tabLabel = getTabLabel(contentTypeId);
        if (!tabLabel) {
          return;
        }

        // Find the contentType to get icon and other metadata
        const contentType = data.contentTypes.find(
          (ct) => ct.id === contentTypeId
        );

        // Get icon from icon path - ensure it's a valid React element, not null
        const iconElement = contentType?.icon
          ? renderIconFromPath(contentType.icon, {
              sx: { fontSize: "20px" },
            })
          : undefined;
        const icon = iconElement || undefined; // Convert null to undefined

        // Calculate total marks for questions
        const totalMarks = questions.reduce(
          (total, q) => total + (q.score || 0),
          0
        );

        // Create panel with questions for this contentTypeId
        const questionsPanel = (
          <Box key={contentTypeId} sx={{ mt: 3, pb: 10 }}>
            {questions.length > 0 ? (
              <>
                {questions.map((apiQuestion: ApiQuestion, qIndex: number) => {
                  // Transform API question to Question format
                  const transformedQuestion = transformApiQuestion(apiQuestion);
                  const questionId = apiQuestion.id.toString();
                  const userAnswer = getUserAnswer(contentTypeId, questionId);

                  // Debug: Log question transformation for MCQ
                  if (
                    apiQuestion.questiontypeId === 1 ||
                    apiQuestion.questiontypeId === 2
                  ) {
                    console.log("MCQ Question:", {
                      original: apiQuestion,
                      transformed: transformedQuestion,
                      hasOptions: !!transformedQuestion.content?.options,
                      optionsCount:
                        transformedQuestion.content?.options?.length || 0,
                    });
                  }

                  // Render Code Challenge Card for questiontypeId 7
                  if (apiQuestion.questiontypeId === 7) {
                    return (
                      <CodeChallengeCard
                        key={`${contentType.id}-${apiQuestion.id}-${qIndex}`}
                        question={apiQuestion}
                        onSolve={() => {
                          // Navigate to code editor page with question data in state
                          navigate(
                            `/code-editor/${courseId}/${apiQuestion.id}`,
                            {
                              state: {
                                question: apiQuestion,
                              },
                            }
                          );
                        }}
                        onBookmark={() => {
                          // Handle bookmark toggle
                          console.log("Toggle bookmark:", apiQuestion.id);
                        }}
                        isBookmarked={false}
                      />
                    );
                  }

                  // Render regular question card for other question types
                  return (
                    <Card
                      key={`${contentTypeId}-${apiQuestion.id}-${qIndex}`}
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
                            handleAnswerChange(
                              contentTypeId,
                              questionId,
                              answer
                            )
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
                  No questions available for {tabLabel}
                </Typography>
              </Box>
            )}
          </Box>
        );

        // Create a contentType object for the tab
        const contentTypeForTab: ApiContentType = contentType || {
          id: contentTypeId,
          name: tabLabel,
          icon: "",
          order: tabOrder.indexOf(contentTypeId),
          questions: questions,
          status: { isCompleted: false, totalScore: 0 },
        };

        tabs.push({
          label: `${tabLabel} (${questions.length} ${
            questions.length === 1 ? "question" : "questions"
          })`,
          icon,
          panel: questionsPanel,
          contentType: contentTypeForTab,
          totalMarks,
        });
      });
    }

    return { tabsData: tabs };
  }, [data, userAnswers, getUserAnswer, handleAnswerChange]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // If there are no tabs but there are tutorial videos, still show the videos
  if (tabsData.length === 0 && tutorialVideos.length === 0) {
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
    ? getCompletedCount(
        activeContentType.id,
        activeContentType.questions?.length || 0
      )
    : 0;
  const activeTotalQuestions = activeContentType?.questions?.length || 0;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tutorial Videos Section - Above Tabs */}
      <Box
        sx={{
          mb: 3,
          borderRadius: "12px",
          boxShadow: SHADOWS.sm,
          border: `1px solid ${COLORS.border.light}`,
          background: COLORS.background.white,
        }}
      >
        <>
          {tutorialVideos.length > 0 && (
            <Box>
              {tutorialVideos.map((apiQuestion: ApiQuestion, index: number) => {
                const transformedQuestion = transformApiQuestion(apiQuestion);
                return (
                  <Card
                    key={`tutorial-video-${apiQuestion.id}-${index}`}
                    sx={{
                      boxShadow: "none",
                      borderRadius: "12px",
                      mb: -3,
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
                      <VideoTemplate
                        question={transformedQuestion}
                        practiceMode={true}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          )}
          {/* Tabs  Section - Only show if there are tabs */}
          {tabsData.length > 0 && (
            <>
              <Box
                sx={{
                    
                    boxShadow: "none",
                    borderRadius: 0,
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  centered
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "center",
                    },
                    "& .MuiTabs-indicator": {
                      height: "3px",
                      borderRadius: 0,
                      background: COLORS.primary,
                    },
                  }}
                >
                  {tabsData.map((tab, index) => (
                    <StyledTab
                      key={index}
                      label={tab.label}
                      icon={tab.icon}
                      iconPosition={tab.icon ? "start" : undefined}
                      selectedtab={activeTab === index}
                      id={`custom-tab-${index}`}
                      aria-controls={`custom-tabpanel-${index}`}
                    />
                  ))}
                </Tabs>
              </Box>
            </>
          )}
        </>
      </Box>

      {/* Tabs panels Section - Only show if there are tabs */}

      {tabsData.length > 0 && (
        <>
          {tabsData.map((tab, index) => (
            <CustomTabPanel key={index} value={activeTab} index={index}>
              {tab.panel}
            </CustomTabPanel>
          ))}
        </>
      )}

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
              {isSubmitting
                ? "Submitting..."
                : `Submit ${activeContentType.name}`}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CoursePracticeContent;
