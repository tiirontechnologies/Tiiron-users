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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        borderRadius: PAGE.radiusLg,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "90%",
          maxHeight: "90%",
          overflow: "auto",
          p: 3,
          position: "relative",
          backgroundColor: "#18181b",
          border: "1px solid #27272a",
          borderRadius: PAGE.radiusLg,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            pb: 2,
            borderBottom: "1px solid #27272a",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
            Test Results
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#a1a1aa",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.06)", color: "#fff" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <CodeTestSubmission
          questionId={question.id}
          sourceCode={code}
          languageId={languageId}
          onSubmit={onSubmit}
        />
      </Paper>
    </Box>
  );
};
