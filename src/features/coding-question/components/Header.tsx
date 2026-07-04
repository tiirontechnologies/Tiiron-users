import React, { useContext } from "react";
import { Box, Typography, IconButton, Chip, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { COLORS } from "../../../config/env";
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
        backgroundColor: "rgba(24, 24, 27, 0.96)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        px: { xs: 1.25, sm: 2, md: 2.5 },
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        flexShrink: 0,
        backdropFilter: "blur(12px)",
        color: "#fff",
      }}
    >
      <Tooltip title="Back">
        <IconButton
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              navigate(-1);
            }
          }}
          sx={{
            width: 38,
            height: 38,
            color: "#d4d4d8",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,0.04)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#fff",
            },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: "#ffffff !important",
          flex: 1,
          minWidth: 0,
          fontSize: { xs: "0.92rem", sm: "1rem" },
          letterSpacing: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
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
          height: 26,
          borderRadius: "8px",
          flexShrink: 0,
          "& .MuiChip-label": {
            color: "#fff",
            fontWeight: 800,
          },
        }}
      />
      )}
    </Box>
  );
};
