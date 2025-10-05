import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Question } from '../../types';

interface McqTemplateProps {
  question: Question;
}

const McqTemplate: React.FC<McqTemplateProps> = ({ question }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  if (!Array.isArray(question.content.options)) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
      {question.content.options.map((opt, oidx) => (
        <Box
          key={oidx}
          sx={{
            flex: 1,
            minWidth: 180,
            border: `1px solid ${showAnswers && opt.isCorrect ? "#6A42AB" : "#E6E6E6"}`,
            p: "12px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            mb: 1,
            background: showAnswers && opt.isCorrect ? "#ECFDF8" : "#F9FAFA",
          }}
        >
          <input
            type="radio"
            checked={showAnswers ? opt.isCorrect : false}
            disabled
            style={{
              marginRight: 12,
              accentColor: showAnswers && opt.isCorrect ? "#6A42AB" : "#E6E6E6",
            }}
          />
          <Typography
            sx={{ fontSize: "15px", color: "#222", fontWeight: 500 }}
          >
            {opt.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default McqTemplate;
