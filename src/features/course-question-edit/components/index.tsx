import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import MoreButton from "../../course-settings/components/MoreButton";
import PublishButton from "../../course-settings/components/PublishButton";
import QuestionBankLayout from "../../question-bank-edit/components/QuestionBankLayout";
import { useState } from "react";
import AddCourseQuestionForm from "./AddCourseQuestionForm";
import { useLocation, useParams } from "react-router-dom";

// Dummy data for now, replace with real course/unit questions
const dummyQuestions = [
  {
    questionId: 1,
    question: "What is React?",
    score: 2,
    questionType: "Multiple Choice",
    answerOptions: [
      { optionId: 1, option: "A library" },
      { optionId: 2, option: "A framework" },
    ],
    correctOptionId: 1,
  },
];

const QUESTION_TYPES = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "single_choice", label: "Single Choice" },
  { value: "fill_up", label: "Fill Ups" },
  { value: "subjective", label: "Subjective" },
  { value: "blog", label: "Blog" },
  { value: "video", label: "Video" },
  { value: "assignment", label: "Assignment" },
  { value: "quiz", label: "Quiz" },
];
export default function CourseQuestionEdit() {

  const location = useLocation();
  const params = useParams();
  const defaultType = location.state?.type || null;
  const [selectedId, setSelectedId] = useState(dummyQuestions[0].questionId);
  const [addType, setAddType] = useState(defaultType);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(!!defaultType);

  // Get courseId and unitId from route params
  const courseId = params.courseId ? Number(params.courseId) : undefined;
  const unitId = params.unitId ? Number(params.unitId) : undefined;

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
  };

  return (
    <Box>
      <ToolBar>
        <RightSideTools />
      </ToolBar>
      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        <QuestionBankLayout
          heading="Question Order"
          mainContent={
            <>
              {showForm && addType ? (
                <AddCourseQuestionForm
                  type={addType}
                  courseId={courseId}
                  unitId={unitId}
                  onClose={handleFormClose}
                />
              ) : (
                <Box sx={{ p: 4, color: '#888' }}>Select a question type to add a new question.</Box>
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
                  Add Question
                </Button>
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
                  {QUESTION_TYPES.map((opt) => (
                    <MenuItem key={opt.value} onClick={() => handleTypeSelect(opt.value)}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              {/* List of questions */}
              <Box>
                {dummyQuestions.map((q) => (
                  <Box
                    key={q.questionId}
                    sx={{
                      border:
                        selectedId === q.questionId
                          ? "1px solid #6A42AB"
                          : "1px solid #CCCCCC",
                      p: "16px",
                      borderLeft:
                        selectedId === q.questionId
                          ? "4px solid #6A42AB"
                          : "1px solid #CCCCCC",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      mb: "16px",
                      height: "44px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedId(q.questionId)}
                  >
                    <Typography>{q.question}</Typography>
                    <Typography sx={{ ml: "auto" }}>{q.score}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          }
        />
      </Box>
    </Box>
  );
}

export const RightSideTools = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "48px",
      }}
    >
      <PublishButton />
      <MoreButton />
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Lessons</Typography>
      </Box>
      <Typography sx={{ color: "#000000" }}>/</Typography>
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Learners</Typography>
      </Box>
    </Box>
  );
};
