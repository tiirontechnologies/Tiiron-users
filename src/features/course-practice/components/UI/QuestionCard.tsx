import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Divider } from '@mui/material';
import { Question } from '../../types';
import { COLORS, GRADIENTS, BORDER_RADIUS, SHADOWS } from '../../constants';
import QuestionTemplateFactory from '../QuestionTemplates/QuestionTemplateFactory';

interface QuestionCardProps {
  question: Question;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const QuestionCard: React.FC<any> = ({ 
  question, 
  index, 
  isFirst = false, 
  isLast = false 
}) => {
  console.log("hello hello",question);
  return (
    <Box>
      {/* Question Header */}
      <Box
        sx={{
          background: isFirst ? GRADIENTS.background : "transparent",
          p: 3,
          borderBottom: !isLast ? "1px solid #E5E7EB" : "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: COLORS.text.primary,
              fontWeight: 700,
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: GRADIENTS.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {index + 1}
            </Box>
             {question?.description?.title}
          </Typography>
          <Chip
            label={question.contentType?.replace('_', ' ').toUpperCase() || 'QUESTION'}
            size="small"
            sx={{
              background: COLORS.primary,
              color: "white",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          />
        </Box>
      </Box>

      {/* Question Content */}
      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            mb: 3,
            color: COLORS.text.secondary,
            lineHeight: 1.6,
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: question.text }} />
        </Typography>
        
        {!isLast && <Divider sx={{ mb: 3, opacity: 0.3 }} />}
        
        <QuestionTemplateFactory 
          type={question.contentType} 
          question={question} 
        />
      </Box>
    </Box>
  );
};

export default QuestionCard;
