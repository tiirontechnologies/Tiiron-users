import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
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
  questions: GeneratedQuestion[];
  onSave: (questions: GeneratedQuestion[]) => void;
  contentType: ContentType;
}

export function PreviewModal({
  open,
  onClose,
  questions: initialQuestions,
  onSave,
  contentType,
}: PreviewModalProps) {
  const [questions, setQuestions] =
    useState<GeneratedQuestion[]>(initialQuestions);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sync with incoming questions prop - THIS IS THE FIX
  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  // Drag handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

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

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDelete = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(questions);
    onClose();
  };

  // Render question based on type
  const renderQuestionContent = (question: GeneratedQuestion) => {
    switch (question.type) {
      case "multiple_choice":
      case "single_choice":
        return (
          <Box>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
              {question.text}
            </Typography>
            {question.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
            )}
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
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
              {question.text}
            </Typography>
            {question.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
            )}
            <Box
              sx={{
                bgcolor: "success.50",
                p: 2,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "success.200",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Correct Answer:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {question.correctAnswer}
              </Typography>
            </Box>
          </Box>
        );

      case "subjective":
        return (
          <Box>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
              {question.text}
            </Typography>
            {question.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
            )}
          </Box>
        );

      case "blog":
        return (
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 2 }}
              dangerouslySetInnerHTML={{ __html: question.text }}
            />
          </Box>
        );

      case "video":
        return (
          <Box>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              {question.text}
            </Typography>
            {question.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  const getContentTypeLabel = (type: ContentType) => {
    const labels = {
      multiple_choice: "MCQ",
      single_choice: "Single Choice",
      fill_up: "Fill in the Blanks",
      subjective: "Subjective",
      blog: "Blog",
      video: "Video",
    };
    return labels[type];
  };

  return (
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
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon width={16} height={18} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Content */}
                {renderQuestionContent(question)}
              </Paper>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={questions.length === 0}
        >
          Save All ({questions.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
}
