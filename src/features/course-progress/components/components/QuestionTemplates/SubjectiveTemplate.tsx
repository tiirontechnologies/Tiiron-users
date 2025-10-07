import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Question } from '../../types';

interface SubjectiveTemplateProps {
  question: Question;
}

const SubjectiveTemplate: React.FC<SubjectiveTemplateProps> = ({ question }) => {
  const [answer, setAnswer] = useState('');

  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
        {question.content.question}
      </Typography>
      <Box
        component="textarea"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        sx={{
          width: '100%',
          minHeight: '120px',
          padding: '12px 16px',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          fontSize: '15px',
          fontFamily: 'inherit',
          lineHeight: 1.5,
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          '&:focus': {
            borderColor: '#6A42AB',
            boxShadow: '0 0 0 3px rgba(106, 66, 171, 0.1)'
          },
          '&::placeholder': {
            color: '#9CA3AF',
            fontSize: '14px'
          }
        }}
      />
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
          {answer.length} characters
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
          Minimum 10 characters required
        </Typography>
      </Box>
    </Box>
  );
};

export default SubjectiveTemplate;
