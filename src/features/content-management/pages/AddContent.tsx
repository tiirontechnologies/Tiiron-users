import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { CustomTabs } from "@components/ui";
import QuestionConfigurator from "../components/QuestionAI";
import { ManualQuestionForm } from "../components/ManualQuestionForm";
import { PreviewModal } from "../components/PreviewModal";

import {
  useCreateVideoContentMutation,
  useCreateMcqContentMutation,
  useCreateFillUpContentMutation,
  useCreateBlogContentMutation,
  useCreateSubjectiveContentMutation,
} from "../api/contentApi";

// -------- Types ----------
type ContentType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video";

interface IAddCourseContentFormProps {
  type: ContentType;
  unitId: number;
  courseId?: number;
  onClose: () => void;
}

export interface ICreateCourseContent {
  text: string;
  score: number;
  description?: string;
  correctAnswer?: string;
  options?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  blogTags?: string[];
  videoUrl?: string;
  videoFileName?: string;
}

interface GeneratedQuestion {
  id: string;
  type: ContentType;
  text: string;
  description?: string;
  options?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswer?: string;
  score?: number;
}

// Mock data for testing
const getMockQuestions = (type: ContentType): GeneratedQuestion[] => {
  switch (type) {
    case "multiple_choice":
      return [
        {
          id: "1",
          type: "multiple_choice",
          text: "What is GitHub primarily used for?",
          description:
            "<p>Select all correct answers about GitHub's main purposes.</p>",
          score: 5,
          options: [
            { text: "Version control", isCorrect: true },
            { text: "Code hosting", isCorrect: true },
            { text: "Video streaming", isCorrect: false },
            { text: "Collaboration", isCorrect: true },
          ],
        },
        {
          id: "2",
          type: "multiple_choice",
          text: "Which company acquired GitHub?",
          score: 3,
          options: [
            { text: "Google", isCorrect: false },
            { text: "Microsoft", isCorrect: true },
            { text: "Amazon", isCorrect: false },
            { text: "Meta", isCorrect: false },
          ],
        },
      ];

    case "single_choice":
      return [
        {
          id: "1",
          type: "single_choice",
          text: "What does CI/CD stand for?",
          score: 4,
          options: [
            {
              text: "Continuous Integration/Continuous Delivery",
              isCorrect: true,
            },
            { text: "Code Integration/Code Delivery", isCorrect: false },
            {
              text: "Computer Integration/Computer Delivery",
              isCorrect: false,
            },
            { text: "Cloud Integration/Cloud Delivery", isCorrect: false },
          ],
        },
      ];

    case "fill_up":
      return [
        {
          id: "1",
          type: "fill_up",
          text: "GitHub Actions is used for _____ automation.",
          description: "<p>Fill in the blank with the correct term.</p>",
          correctAnswer: "CI/CD",
          score: 3,
        },
      ];

    case "subjective":
      return [
        {
          id: "1",
          type: "subjective",
          text: "Explain how GitHub has transformed software development collaboration.",
          description: "<p>Provide a detailed answer with examples.</p>",
          score: 10,
        },
      ];

    case "blog":
      return [
        {
          id: "1",
          type: "blog",
          text: "<h2>The Evolution of GitHub</h2><p>GitHub has revolutionized how developers collaborate on code. Since its inception, it has become the world's leading platform for version control and collaborative software development...</p>",
        },
      ];

    case "video":
      return [
        {
          id: "1",
          type: "video",
          text: "Introduction to GitHub Actions",
          description:
            "<p>A comprehensive guide to CI/CD automation using GitHub Actions.</p>",
        },
      ];

    default:
      return [];
  }
};

// -------- Main Component ----------
export function AddCourseContentForm({
  type,
  unitId,
  onClose,
}: IAddCourseContentFormProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<
    GeneratedQuestion[]
  >([]);

  // Normalize legacy types
  const effectiveType: ContentType = ((): ContentType => {
    if ((type as string) === "code" || (type as string) === "mcq")
      return "multiple_choice";
    return type;
  })();

  // API mutation hooks
  const [createVideoContent, { isLoading: isVideoLoading }] =
    useCreateVideoContentMutation();
  const [createMcqContent, { isLoading: isMcqLoading }] =
    useCreateMcqContentMutation();
  const [createFillUpContent, { isLoading: isFillUpLoading }] =
    useCreateFillUpContentMutation();
  const [createBlogContent, { isLoading: isBlogLoading }] =
    useCreateBlogContentMutation();
  const [createSubjectiveContent, { isLoading: isSubjectiveLoading }] =
    useCreateSubjectiveContentMutation();

  const isLoading =
    isVideoLoading ||
    isMcqLoading ||
    isFillUpLoading ||
    isBlogLoading ||
    isSubjectiveLoading;

  // Handle preview
  const handlePreview = () => {
    // Check if we have generated questions, otherwise show mock data
    if (generatedQuestions.length > 0) {
      setPreviewOpen(true);
    } else {
      // Show mock questions for testing
      const mockQuestions = getMockQuestions(effectiveType);
      setGeneratedQuestions(mockQuestions);
      setPreviewOpen(true);
    }
  };

  const handleSavePreview = async (questions: GeneratedQuestion[]) => {
    console.log("💾 Saving questions:", questions);

    try {
      // Loop through questions and save each one
      for (const question of questions) {
        const data: ICreateCourseContent = {
          text: question.text,
          score: question.score || 0,
          description: question.description,
          correctAnswer: question.correctAnswer,
          options: question.options,
        };
        await handleContentSubmit(data);
      }

      // Clear generated questions and close modal
      setGeneratedQuestions([]);
      setPreviewOpen(false);
      onClose();
    } catch (error) {
      console.error("❌ Error saving questions:", error);
    }
  };

  // ---- Submit handler (shared by both AI and Manual forms) ----
  const handleContentSubmit = async (data: ICreateCourseContent) => {
    console.log("🚀 Submitting content:", data);

    try {
      let response;
      switch (effectiveType) {
        case "video":
          response = await createVideoContent({
            body: {
              unitId,
              quesTypeId: 6,
              contentTypeId: 1,
              description: {
                html: data.description || "",
                title: data.videoFileName || "",
              },
              title: data.text,
              url: data.videoUrl || "",
              duration: 0,
            },
          }).unwrap();
          break;

        case "multiple_choice":
        case "single_choice":
          response = await createMcqContent({
            body: {
              unitId,
              quesTypeId: effectiveType === "multiple_choice" ? 1 : 2,
              contentTypeId: 2,
              description: {
                html: data.description || "",
                title: data.text,
              },
              options: data.options || [],
            },
          }).unwrap();
          break;

        case "fill_up":
          response = await createFillUpContent({
            body: {
              unitId,
              quesTypeId: 3,
              contentTypeId: 4,
              description: {
                html: data.description || "",
                title: data.text,
                correctAnswer: data.correctAnswer || "",
              },
            },
          }).unwrap();
          break;

        case "blog":
          response = await createBlogContent({
            body: {
              unitId,
              quesTypeId: 5,
              contentTypeId: 5,
              description: {
                html: data.description || "",
                tags: data.blogTags || [],
              },
              html: data.text,
            },
          }).unwrap();
          break;

        case "subjective":
          response = await createSubjectiveContent({
            body: {
              unitId,
              quesTypeId: 4,
              contentTypeId: 3,
              description: { html: data.description || "" },
              question: data.text,
            },
          }).unwrap();
          break;

        default:
          throw new Error(`Unsupported content type: ${type}`);
      }

      console.log("✅ Content created successfully:", response);
      return response;
    } catch (error: any) {
      console.error("❌ Error creating content:", error);
      console.error("❌ Error details:", {
        message: error.message,
        status: error.status,
        data: error.data,
      });
      throw error;
    }
  };

  // Handle AI generation - this should be called from QuestionConfigurator
  const handleAIGenerate = async (data: ICreateCourseContent) => {
    console.log("🤖 Generating questions with AI:", data);

    try {
      // TODO: Replace this with actual AI API call
      // For now, generate mock questions based on the config
      const mockQuestions = getMockQuestions(effectiveType);

      console.log("📝 Generated questions:", mockQuestions);

      // Update state first
      setGeneratedQuestions(mockQuestions);

      // Then open preview
      setPreviewOpen(true);
    } catch (error) {
      console.error("❌ Error generating questions:", error);
    }
  };

  // ---- Render ----
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          p: 3,
          border: "1px solid #EAECF0",
          boxShadow:
            "0px 1px 3px rgba(16,24,40,0.10), 0px 1px 2px rgba(16,24,40,0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        ></Box>
        <Box sx={{ flex: 1, position: "relative" }}>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={handlePreview}
            disabled={isLoading}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 1,
            }}
          >
            Preview Generated Questions
          </Button>
          <CustomTabs
            tabs={["Generate using Ai", "Create Manually"]}
            panels={[
              <QuestionConfigurator
                key="ai"
                type={effectiveType}
                unitId={unitId}
                onClose={onClose}
                onSubmit={handleAIGenerate}
                isLoading={isLoading}
              />,
              <ManualQuestionForm
                key="manual"
                type={effectiveType}
                unitId={unitId}
                onClose={onClose}
                onSubmit={handleContentSubmit}
                isLoading={isLoading}
              />,
            ]}
          />
        </Box>
      </Box>
      <PreviewModal
        contentType={effectiveType}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        questions={generatedQuestions}
        onSave={handleSavePreview}
        key={generatedQuestions.length} // Force re-render when questions change
      />
    </>
  );
}
