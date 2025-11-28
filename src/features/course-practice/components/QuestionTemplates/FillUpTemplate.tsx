import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../types";

interface FillUpTemplateProps {
  question: Question;
  practiceMode?: boolean;
  showAnswers?: boolean;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
}

const FillUpTemplate: React.FC<FillUpTemplateProps> = ({
  question,
  practiceMode = false,
  showAnswers = false,
  userAnswer,
  onAnswerChange,
}) => {
  const [answer, setAnswer] = useState("");

  // Sync local state with prop value
  useEffect(() => {
    if (typeof userAnswer === "string") {
      setAnswer(userAnswer);
    }
  }, [userAnswer]);

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    onAnswerChange?.(value);
  };

  // ✅ Safely convert to string before using trim()
  const normalize = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
      return value.join(" ").trim().toLowerCase();
    }
    return (value ?? "").trim().toLowerCase();
  };

  const isCorrect =
    normalize(answer) === normalize(question.content.correctAnswer);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "8px",
        background: practiceMode ? "#ffffff" : "#F9FAFA",
        border: practiceMode ? "2px solid #D1D5DB" : "1px solid #E6E6E6",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        transition: "all 0.2s ease",
      }}
    >
      {/* Question */}
      <Typography sx={{ fontSize: "15px", color: "#374151", fontWeight: 600 }}>
        {question.content.question}
      </Typography>

      {/* Label */}
      <Typography
        sx={{
          fontSize: "14px",
          color: practiceMode ? "#374151" : "#6A42AB",
          fontWeight: 600,
        }}
      >
        {practiceMode ? "Your Answer:" : "Correct Answer:"}
      </Typography>

      {/* Input field */}
      <Box
        component="input"
        type="text"
        value={
          practiceMode
            ? answer
            : showAnswers
            ? question.content.correctAnswer || ""
            : ""
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleAnswerChange(e.target.value)
        }
        disabled={!practiceMode}
        placeholder={practiceMode ? "Type your answer here..." : ""}
        sx={{
          p: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #6A42AB",
          background: "#fff",
          fontWeight: 500,
          color: "#222",
          minWidth: 120,
          outline: "none",
          cursor: practiceMode ? "text" : "default",
          "&:focus": {
            borderColor: "#6A42AB",
            boxShadow: "0 0 0 3px rgba(106, 66, 171, 0.1)",
          },
          "&:disabled": {
            background: "#F3F4F6",
            cursor: "not-allowed",
          },
        }}
      />

      {/* Result */}
      {showAnswers && practiceMode && (
        <Typography
          sx={{
            fontSize: "13px",
            color: isCorrect ? "#10B981" : "#EF4444",
            fontWeight: 600,
          }}
        >
          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
        </Typography>
      )}
    </Box>
  );
};

export default FillUpTemplate;
