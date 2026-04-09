import React, { useContext } from "react";
import { Box, Typography, Button, Divider, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { COLORS } from "../../../config/env";
import { ApiQuestion } from "../types";
import { PAGE } from "../constants";

const getDifficultyColor = (difficulty?: string) => {
  if (!difficulty) return COLORS.text.muted;
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "#27AE60";
    case "medium":
      return "#F39C12";
    case "hard":
      return "#E74C3C";
    default:
      return COLORS.text.muted;
  }
};

import { useQuestionData } from "../hooks/useQuestionData";
import { CodeEditorContext } from "../context/CodeEditorContext";

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
  const { question, isLoadingQuestion: isLoading } = useQuestionData();
  const { onClose } = useContext(CodeEditorContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: PAGE.headerHeight,
        backgroundColor: "#18181b",
        borderBottom: "1px solid #27272a",
        px: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexShrink: 0,
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => {
          if (onClose) {
            onClose();
          } else {
            navigate(-1);
          }
        }}
        sx={{
          color: "#a1a1aa",
          textTransform: "none",
          fontWeight: 500,
          borderRadius: PAGE.radius,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "#fff",
          },
        }}
      >
        Back
      </Button>
      <Divider orientation="vertical" flexItem sx={{ borderColor: "#27272a" }} />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#fff",
          flex: 1,
          fontSize: "1rem",
          letterSpacing: "-0.01em",
        }}
      >
        {isLoading ? "Loading..." : (question?.title || "Code Challenge")}
      </Typography>
      {question && (
        <Chip
          label={question.questiontypecon?.name || "Medium"}
          size="small"
          sx={{
            backgroundColor: getDifficultyColor(question.questiontypecon?.name || "Medium"),
            color: "white",
            fontWeight: 600,
            height: 28,
            borderRadius: 6,
          }}
        />
      )}
    </Box>
  );
};
