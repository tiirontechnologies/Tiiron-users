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
  FormControlLabel,
} from "@mui/material";

import {
  Close as CloseIcon,
  DragIndicator as DragIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

// Types
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

// 📌 FIX: Missing Function
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
  // 🔥 STATIC DATA
  const STATIC_QUESTIONS: GeneratedQuestion[] = [
    {
      id: "1",
      type: "multiple_choice",
      text: "Which planet is known as the Red Planet?",
      options: [
        { text: "Earth", isCorrect: false },
        { text: "Mars", isCorrect: true },
        { text: "Venus", isCorrect: false },
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

  // Drag Functions
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

  // --- EDIT LOGIC -------------------
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

  const renderQuestionContent = (question: GeneratedQuestion) => {
    switch (question.type) {
      case "multiple_choice":
      case "single_choice":
        return (
          <Box>
            <Typography sx={{ mb: 2, fontWeight: 500 }}>
              {question.text}
            </Typography>

            <Box sx={{ pl: 2 }}>
              {question.options?.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    question.type === "single_choice" ? (
                      <Radio checked={option.isCorrect} disabled />
                    ) : (
                      <Checkbox checked={option.isCorrect} disabled />
                    )
                  }
                  label={option.text}
                  sx={{
                    display: "block",
                    mb: 1,
                    bgcolor: option.isCorrect ? "success.50" : "transparent",
                    borderRadius: 1,
                    px: 1,
                  }}
                />
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

            <Box sx={{ bgcolor: "success.50", p: 2, borderRadius: 1 }}>
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
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
            )}
          </Box>
        );

      default:
        return null;
    }
  };

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
            label={`${questions.length} ${questions.length === 1 ? "Item" : "Items"
              }`}
            size="small"
            color="primary"
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {questions.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No content generated yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Generate content using AI to preview here
            </Typography>
          </Box>
        ) : (
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
                  "&:hover": {
                    boxShadow: 3,
                  },
                  "&:active": {
                    cursor: "grabbing",
                  },
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    p: 3,
                    cursor: "grab",
                    transition: "all 0.2s",
                    opacity: draggedIndex === index ? 0.5 : 1,
                    "&:hover": { boxShadow: 3 },
                    "&:active": { cursor: "grabbing" },
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DragIcon
                        sx={{ color: "text.secondary", cursor: "grab" }}
                      />

                      {/* FIXED: Wrong label syntax */}
                      <Chip
                        label={`#${index + 1}`}
                        size="small"
                        sx={{ minWidth: 45 }}
                      />

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

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        color="primary"
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

                  {/* Content */}
                  {renderQuestionContent(question)}
                </Box>
              </Paper>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSave}>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* EDIT TEXT */}
              <TextField
                label="Question Text"
                fullWidth
                value={editData.text}
                onChange={(e) =>
                  setEditData({ ...editData, text: e.target.value })
                }
              />

              {/* EDIT DESCRIPTION */}
              <TextField
                label="Description (HTML allowed)"
                fullWidth
                multiline
                rows={3}
                value={editData.description || ""}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />

              {/* EDIT OPTIONS (MCQ / SINGLE CHOICE) */}
              {(editData.type === "multiple_choice" ||
                editData.type === "single_choice") && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Options:
                  </Typography>

                  {editData.options?.map((opt, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                      }}
                    >
                      <DeleteIcon width={16} height={18} />
                    </Box>
                  ))}
                </Box>
              )}

              {/* EDIT FILL-UP ANSWER */}
              {editData.type === "fill_up" && (
                <TextField
                  label="Correct Answer"
                  fullWidth
                  value={editData.correctAnswer || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, correctAnswer: e.target.value })
                  }
                />
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button variant="contained" onClick={updateQuestion}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
