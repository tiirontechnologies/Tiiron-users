import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Question } from '../../types';

interface FillUpTemplateProps {
  question: Question;
}

const FillUpTemplate: React.FC<FillUpTemplateProps> = ({ question }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: "8px",
        background: "#F9FAFA",
        border: "1px solid #E6E6E6",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "15px",
          color: "#6A42AB",
          fontWeight: 600,
          mr: 2,
        }}
      >
        Correct Answer:
      </Typography>
      <input
        type="text"
        value={showAnswers ? question.content.correctAnswer || "" : ""}
        disabled
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #6A42AB",
          background: "#fff",
          fontWeight: 500,
          color: "#222",
          minWidth: 120,
        }}
      />
    </Box>
  );
};

export default FillUpTemplate;
