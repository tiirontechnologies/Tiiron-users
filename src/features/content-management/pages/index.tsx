import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import MoreButton from "../../../components/ui/MoreButton";
import PublishButton from "../../../components/ui/PublishButton";
import CreateContentLayout from "../layout/CreateContentLayout";
import { useState } from "react";
import { AddCourseContentForm } from "./AddContent";
import { useLocation, useParams } from "react-router-dom";
import { useGetUnitsWithQuestionsQuery } from "../../lesson-management/api/chapterApi";

import CourseInfoHeader from "../components/CourseInfoHeader";
import ContentTypeSelector from "../components/ContentTypeSelector";


// Interface for content data from API
interface Content {
  contentId: number;
  content: string | {
    id?: number;
    contentId?: number;
    title?: string;
    url?: string;
    duration?: number;
    question?: string;
  };
  score: number;
  contentType: string;
  answerOptions?: Array<{
    optionId: number;
    option: string;
  }>;
  correctOptionId?: number;
}

const CONTENT_TYPES = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "single_choice", label: "Single Choice" },
  { value: "fill_up", label: "Fill Ups" },
  { value: "subjective", label: "Subjective" },
  { value: "blog", label: "Blog" },
  { value: "video", label: "Video" }
];

export default function ContentCreateForm() {
  const location = useLocation();
  const params = useParams();
  const defaultType = location.state?.type || null;
  const [addType, setAddType] = useState(defaultType);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(!!defaultType);

  // Helper function to get display text from content
  const getContentDisplayText = (contentItem: Content): string => {
    if (typeof contentItem.content === 'string') {
      return contentItem.content;
    }
    
    if (typeof contentItem.content === 'object' && contentItem.content !== null) {
      return contentItem.content.title || 
             contentItem.content.question || 
             `Content ${contentItem.contentId}`;
    }
    
    return `Content ${contentItem.contentId}`;
  };

  // Get courseId and unitId from route params
  const courseId = params.courseId ? Number(params.courseId) : undefined;
  const unitId = params.unitId ? Number(params.unitId) : undefined;

  // Fetch content for the unit
  const { 
    data: questionsData, 
    isLoading: isLoadingQuestions, 
    error: questionsError,
    refetch: refetchQuestions 
  } = useGetUnitsWithQuestionsQuery(
    { unitId: unitId!.toString() }, 
    { skip: !unitId }
  );

  // Handle the API response structure properly
  console.log("🔍 API Response Data:", questionsData);
  console.log("🔍 Data Type:", typeof questionsData);
  console.log("🔍 Is Array:", Array.isArray(questionsData));
  
  const content: Content[] = Array.isArray(questionsData) 
    ? questionsData 
    : questionsData?.questions || questionsData?.data || [];
    
  console.log("🔍 Processed Content:", content);
  console.log("🔍 First content item:", content[0]);
  console.log("🔍 Content structure:", content[0]?.content);
    
  const [selectedId, setSelectedId] = useState<number | null>(
    content.length > 0 ? content[0].contentId : null
  );

  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleTypeSelect = (type: string) => {
    setAddType(type);
    setShowForm(true);
    setAnchorEl(null);
  };
  const handleFormClose = () => {
    setShowForm(false);
    setAddType(null);
    // Refetch content after closing form to get updated list
    refetchQuestions();
  };

  return (
    <Box>
      <ToolBar>
        <CourseInfoHeader />
      </ToolBar>
      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        <CreateContentLayout
          heading="Content Order"
          mainContent={
            <>
              {showForm && addType ? (
                <AddCourseContentForm
                  type={addType}
                  courseId={courseId}
                  unitId={unitId}
                  onClose={handleFormClose}
                />
              ) : (
                <Box sx={{ p: 4, color: '#888' }}>Select a content type to add new content.</Box>
              )}
            </>
          }
          sidebarContent={
            <>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddClick}
                  sx={{ mb: 2 }}
                >
                  Add Content
                </Button>
                <ContentTypeSelector
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleMenuClose}
                  options={CONTENT_TYPES}
                  onSelect={handleTypeSelect}
                />
              </Box>
              {/* List of content */}
              <Box>
                {isLoadingQuestions ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : questionsError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load content. Please try again.
                  </Alert>
                ) : !Array.isArray(content) || content.length === 0 ? (
                  <Typography sx={{ p: 2, color: '#888', textAlign: 'center' }}>
                    No content found for this unit.
                  </Typography>
                ) : (
                  content.map((c) => (
                    <Box
                      key={c.contentId}
                      sx={{
                        border:
                          selectedId === c.contentId
                            ? "1px solid #6A42AB"
                            : "1px solid #CCCCCC",
                        p: "16px",
                        borderLeft:
                          selectedId === c.contentId
                            ? "4px solid #6A42AB"
                            : "1px solid #CCCCCC",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        mb: "16px",
                        height: "44px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedId(c.contentId)}
                    >
                      <Typography>{getContentDisplayText(c)}</Typography>
                      <Typography sx={{ ml: "auto" }}>{c.score}</Typography>
                    </Box>
                  ))
                )}
              </Box>
            </>
          }
        />
      </Box>
    </Box>
  );
}


