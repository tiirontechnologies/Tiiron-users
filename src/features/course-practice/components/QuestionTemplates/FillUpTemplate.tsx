import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../types";
import { COLORS, SHADOWS } from "../../constants";

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
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const DEBOUNCE_DELAY = 300; // 300ms delay

  // Sync local state with prop value
  useEffect(() => {
    if (typeof userAnswer === "string") {
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

  // ✅ Safely convert to string before using trim()
  const normalize = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
      return value.join(" ").trim().toLowerCase();
    }
    return (value ?? "").trim().toLowerCase();
  };

  const isCorrect =
    normalize(answer) === normalize(question.content?.correctAnswer);

  // Safely get question text and correct answer
  const questionText = question.content?.question || question.text || '';
  const correctAnswer = question.content?.correctAnswer || '';

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "8px",
        background: practiceMode ? COLORS.background.white : COLORS.background.light,
        border: practiceMode ? `2px solid ${COLORS.border.medium}` : `1px solid ${COLORS.border.light}`,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        transition: "all 0.2s ease",
        "&:hover": practiceMode ? {
          boxShadow: SHADOWS.sm,
          borderColor: COLORS.primary,
        } : {},
      }}
    >
      {/* Question */}
      <Typography sx={{ fontSize: "15px", color: COLORS.text.primary, fontWeight: 600 }}>
        {questionText}
      </Typography>

      {/* Label */}
      <Typography
        sx={{
          fontSize: "14px",
          color: practiceMode ? COLORS.text.secondary : COLORS.primary,
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
              ? correctAnswer
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
          border: `1px solid ${COLORS.primary}`,
          background: COLORS.background.white,
          fontWeight: 500,
          color: COLORS.text.primary,
          minWidth: 120,
          outline: "none",
          cursor: practiceMode ? "text" : "default",
          transition: "all 0.2s ease",
          "&:focus": {
            borderColor: COLORS.primaryDark,
            boxShadow: `0 0 0 3px rgba(79, 57, 246, 0.1)`,
          },
          "&:hover": practiceMode ? {
            borderColor: COLORS.primaryDark,
            boxShadow: SHADOWS.sm,
          } : {},
          "&:disabled": {
            background: COLORS.background.lighter,
            cursor: "not-allowed",
            borderColor: COLORS.border.light,
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
