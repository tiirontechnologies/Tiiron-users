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

  // Update local state when userAnswer prop changes
  useEffect(() => {
    if (userAnswer && typeof userAnswer === "string") {
      setAnswer(userAnswer);
    }
  }, [userAnswer]);

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    onAnswerChange?.(value);
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "8px",
        background: practiceMode ? "#ffffff" : "#F9FAFA",
        border: practiceMode ? "2px solid #D1D5DB" : "1px solid #E6E6E6",
        display: "flex",
        alignItems: "center",
        gap: 2,
        transition: "all 0.2s ease",
      }}
    >
      <Box>
        <Typography
          sx={{ fontSize: "15px", color: "#374151", fontWeight: 600 }}
        >
          {question.content.question}
          {question.content.correctAnswer}
          {answer}
          {showAnswers && practiceMode && (
            <Typography
              sx={{ fontSize: "15px", color: "#374151", fontWeight: 600 }}
            >
              {answer === question.content.correctAnswer
                ? "✓ Correct"
                : "✗ Incorrect"}
            </Typography>
          )}
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            color: practiceMode ? "#374151" : "#6A42AB",
            fontWeight: 600,
            mr: 2,
          }}
        >
          {practiceMode ? "Your Answer:" : "Correct Answer:"}
        </Typography>
        <input
          type="text"
          value={
            practiceMode
              ? answer
              : showAnswers
              ? question.content.correctAnswer || ""
              : ""
          }
          onChange={(e) => handleAnswerChange(e.target.value)}
          disabled={!practiceMode}
          placeholder={practiceMode ? "Type your answer here..." : ""}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: practiceMode ? "1px solid #6A42AB" : "1px solid #6A42AB",
            background: practiceMode ? "#fff" : "#fff",
            fontWeight: 500,
            color: "#222",
            minWidth: 120,
            flex: 1,
            outline: "none",
            cursor: practiceMode ? "text" : "default",
            "&:focus": practiceMode
              ? {
                  borderColor: "#6A42AB",
                  boxShadow: "0 0 0 3px rgba(106, 66, 171, 0.1)",
                }
              : {},
          }}
        />
        {showAnswers && practiceMode && (
          <Typography
            sx={{
              fontSize: "12px",
              color:
                answer === question.content.correctAnswer
                  ? "#10B981"
                  : "#EF4444",
              fontWeight: 600,
            }}
          >
            {answer === question.content.correctAnswer
              ? "✓ Correct"
              : "✗ Incorrect"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FillUpTemplate;
