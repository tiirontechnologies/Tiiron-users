import React from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../types";

interface BlogTemplateProps {
  question: Question;
  practiceMode?: boolean;
  showAnswers?: boolean;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
  question,
  practiceMode = false,
  showAnswers = false,
  userAnswer,
  onAnswerChange,
}) => {
  return (
      <Box
        sx={{
          mt: 2,
          p: 3,
        borderRadius: '8px',
        background: '#fff',
        border: '1px solid #E6E6E6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}
      >
        <Box
          dangerouslySetInnerHTML={{
          __html: question.content.html || question.content.text || '' 
          }}
          sx={{
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: '#0F172A',
              fontWeight: 600,
              mb: 2,
              mt: 3,
            '&:first-of-type': {
              mt: 0
            }
            },
          '& p': {
            color: '#374151',
              lineHeight: 1.6,
              mb: 2,
            fontSize: '15px'
            },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            mb: 2
            },
          '& ul, & ol': {
              pl: 3,
              mb: 2,
            '& li': {
              color: '#374151',
                lineHeight: 1.6,
              mb: 1
            }
            },
          '& blockquote': {
            borderLeft: '4px solid #6A42AB',
              pl: 2,
              ml: 0,
            fontStyle: 'italic',
            color: '#6B7280',
            background: '#F9FAFA',
              p: 2,
            borderRadius: '0 8px 8px 0',
            mb: 2
            },
          '& code': {
            background: '#F3F4F6',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'monospace',
            color: '#E11D48'
            },
          '& pre': {
            background: '#1F2937',
            color: '#F9FAFB',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
              mb: 2,
            '& code': {
              background: 'transparent',
              color: 'inherit',
              padding: 0
            }
            },
          '& a': {
            color: '#6A42AB',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
            },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
              mb: 2,
            '& th, & td': {
              border: '1px solid #E5E7EB',
              padding: '8px 12px',
              textAlign: 'left'
              },
            '& th': {
              background: '#F9FAFB',
              fontWeight: 600
            }
          }
          }}
        />
    </Box>
  );
};

export default BlogTemplate;
