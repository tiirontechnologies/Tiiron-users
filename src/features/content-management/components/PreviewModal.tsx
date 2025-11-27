import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  IconButton,
  Chip,
  Paper,
  Radio,
  Checkbox,
} from "@mui/material";

import {
  Close as CloseIcon,
  DragIndicator as DragIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

// ---------- TYPES ----------
type ContentType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video";

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

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (questions: GeneratedQuestion[]) => void;
  contentType: ContentType;
}

// ---------- LABEL ----------
const getContentTypeLabel = (type: ContentType) => {
  switch (type) {
    case "multiple_choice":
      return "Multiple Choice";
    case "single_choice":
      return "Single Choice";
    case "fill_up":
      return "Fill in the Blanks";
    case "subjective":
      return "Subjective";
    case "blog":
      return "Blog";
    case "video":
      return "Video";
    default:
      return "Unknown";
  }
};

export function PreviewModal({ open, onClose, onSave }: PreviewModalProps) {
  // ---------- STATIC DATA ----------
  const STATIC_QUESTIONS: GeneratedQuestion[] = [
    {
      id: "1",
      type: "multiple_choice",
      text: "check3",
      options: [
        { text: "check4", isCorrect: false },
        { text: "check5", isCorrect: true },
        { text: "check6", isCorrect: false },
        { text: "check7", isCorrect: false },
      ],
      score: 5,
    },
    {
      id: "2",
      type: "fill_up",
      text: "_____ is the largest mammal in the world.",
      correctAnswer: "Blue Whale",
      score: 3,
    },
    {
      id: "3",
      type: "subjective",
      text: "Explain the water cycle in detail.",
      description:
        "<p>Include evaporation, condensation, and precipitation.</p>",
      score: 10,
    },
  ];

  const [questions, setQuestions] =
    useState<GeneratedQuestion[]>(STATIC_QUESTIONS);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedQuestion | null>(null);

  // ---------- DRAG ----------
  const handleDragStart = (index: number) => setDraggedIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newQuestions = [...questions];
    const draggedItem = newQuestions[draggedIndex];
    newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(index, 0, draggedItem);

    setQuestions(newQuestions);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => setDraggedIndex(null);

  const handleDelete = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(questions);
    onClose();
  };

  // ---------- EDIT ----------
  const openEditModal = (index: number) => {
    setEditIndex(index);
    setEditData({ ...questions[index] });
  };

  const closeEditModal = () => {
    setEditIndex(null);
    setEditData(null);
  };

  const updateQuestion = () => {
    if (editIndex === null || !editData) return;

    const updated = [...questions];
    updated[editIndex] = editData;
    setQuestions(updated);
    closeEditModal();
  };

  // ---------- RENDER QUESTION ----------
  const renderQuestionContent = (question: GeneratedQuestion) => {
    switch (question.type) {
      case "multiple_choice":
      case "single_choice":
        return (
          <Box>
            <Typography sx={{ mb: 2, fontWeight: 500 }}>
              {question.text}
            </Typography>

            {/* ✅ OPTIONS LIKE YOUR SCREENSHOT */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              {question.options?.map((option, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    px: 2,
                    py: 1.2,
                    bgcolor: option.isCorrect ? "#f1f8e9" : "#fff",
                  }}
                >
                  {question.type === "single_choice" ? (
                    <Radio checked={option.isCorrect} disabled size="small" />
                  ) : (
                    <Checkbox
                      checked={option.isCorrect}
                      disabled
                      size="small"
                    />
                  )}

                  <Typography fontSize={14}>
                    {option.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );

      case "fill_up":
        return (
          <Box>
            <Typography sx={{ mb: 2, fontWeight: 500 }}>
              {question.text}
            </Typography>
            <Box sx={{ bgcolor: "#f1f8e9", p: 2, borderRadius: 1 }}>
              <Typography variant="body2">Correct Answer:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {question.correctAnswer}
              </Typography>
            </Box>
          </Box>
        );

      case "subjective":
        return (
          <Box>
            <Typography sx={{ mb: 2, fontWeight: 500 }}>
              {question.text}
            </Typography>
            {question.description && (
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: question.description,
                }}
              />
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  // ---------- UI ----------
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: "70vh",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Preview Generated Content
            </Typography>
            <Chip
              label={`${questions.length} ${
                questions.length === 1 ? "Item" : "Items"
              }`}
              size="small"
              color="primary"
            />
          </Box>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {questions.map((question, index) => (
              <Paper
                key={question.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                elevation={draggedIndex === index ? 8 : 1}
                sx={{
                  p: 3,
                  cursor: "grab",
                  transition: "all 0.2s",
                  opacity: draggedIndex === index ? 0.5 : 1,
                }}
              >
                {/* HEADER */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <DragIcon sx={{ color: "text.secondary" }} />
                    <Chip label={`#${index + 1}`} size="small" />
                    <Chip
                      label={getContentTypeLabel(question.type)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    {question.score && (
                      <Chip
                        label={`${question.score} pts`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => openEditModal(index)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {/* CONTENT */}
                {renderQuestionContent(question)}
              </Paper>
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save All ({questions.length})
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog
        open={editIndex !== null}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent dividers>
          {editData && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Question"
                value={editData.text}
                fullWidth
                onChange={(e) =>
                  setEditData({ ...editData, text: e.target.value })
                }
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button onClick={updateQuestion} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
