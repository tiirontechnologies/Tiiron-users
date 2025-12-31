import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../types";

interface SubjectiveTemplateProps {
  question: Question;
  practiceMode?: boolean;
  showAnswers?: boolean;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
}

const SubjectiveTemplate: React.FC<SubjectiveTemplateProps> = ({
  question,
  practiceMode = false,
  showAnswers = false,
  userAnswer,
  onAnswerChange,
}) => {
  const [answer, setAnswer] = useState("");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const DEBOUNCE_DELAY = 300; // 300ms delay

  // Update local state when userAnswer prop changes
  useEffect(() => {
    if (userAnswer && typeof userAnswer === "string") {
      setAnswer(userAnswer);
    }
  }, [userAnswer]);

  // Debounced callback to parent
  const debouncedOnAnswerChange = useCallback(
    (value: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        onAnswerChange?.(value);
      }, DEBOUNCE_DELAY);
    },
    [onAnswerChange]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleAnswerChange = (value: string) => {
    // Update local state immediately for responsive UI
    setAnswer(value);
    // Debounce the parent callback to reduce re-renders
    debouncedOnAnswerChange(value);
  };

  // Safely get question text
  const questionText = question.content?.question || question.text || '';

  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ mb: 2, fontWeight: 500, color: "#374151" }}>
        {questionText}
      </Typography>
      <Box
        component="textarea"
        value={answer}
        onChange={(e) => handleAnswerChange(e.target.value)}
        placeholder={
          practiceMode
            ? "Type your answer here..."
            : "Answer will be displayed here..."
        }
        disabled={!practiceMode}
        sx={{
          width: "100%",
          minHeight: "120px",
          padding: "12px 16px",
          border: practiceMode ? "2px solid #D1D5DB" : "1px solid #E5E7EB",
          borderRadius: "8px",
          fontSize: "15px",
          fontFamily: "inherit",
          lineHeight: 1.5,
          resize: "vertical",
          outline: "none",
          transition: "border-color 0.2s ease",
          backgroundColor: practiceMode ? "#ffffff" : "#F9FAFA",
          cursor: practiceMode ? "text" : "default",
          "&:focus": practiceMode
            ? {
              borderColor: "#4F39F6",
              boxShadow: "0 0 0 3px rgba(79, 57, 246, 0.1)",
            }
            : {},
          "&:disabled": {
            backgroundColor: "#F9FAFA",
            cursor: "default",
          },
          "&::placeholder": {
            color: "#9CA3AF",
            fontSize: "14px",
          },
        }}
      />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
          {answer.length} characters
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
          Minimum 10 characters required
        </Typography>
      </Box>
    </Box>
  );
};

export default SubjectiveTemplate;
