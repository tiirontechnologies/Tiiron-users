import React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CodeTestSubmission from "../../../components/CodeTestSubmission";
import { ApiQuestion } from "../types";
import { PAGE } from "../constants";

interface TestResultsModalProps {
  question: ApiQuestion;
  code: string;
  languageId: number;
  onClose: () => void;
  onSubmit: (result: unknown) => void;
}

export const TestResultsModal: React.FC<TestResultsModalProps> = ({
  question,
  code,
  languageId,
  onClose,
  onSubmit,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.72)",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1.25, sm: 2, md: 3 },
        borderRadius: PAGE.radiusLg,
        backdropFilter: "blur(10px)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "min(980px, 100%)",
          maxHeight: { xs: "96%", sm: "92%" },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#18181b",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "14px",
          boxShadow: "0 24px 70px rgba(0,0,0,0.42)",
          "& .MuiTypography-root": {
            color: "inherit",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1.5,
            px: { xs: 1.5, sm: 2.5 },
            py: { xs: 1.5, sm: 2 },
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(15, 15, 18, 0.72)",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#ffffff !important", lineHeight: 1.2 }}>
              Test Results
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                color: "#ffffff !important",
                opacity: 0.82,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: { xs: 220, sm: 620 },
              }}
            >
              {question.title || "Code Challenge"}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              flexShrink: 0,
              color: "#a1a1aa",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.06)", color: "#fff" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, minHeight: 0, overflow: "auto", p: { xs: 1.5, sm: 2.5 } }}>
          <CodeTestSubmission
            questionId={question.id}
            sourceCode={code}
            languageId={languageId}
            onSubmit={onSubmit}
          />
        </Box>
      </Paper>
    </Box>
  );
};
