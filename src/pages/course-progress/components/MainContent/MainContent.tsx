import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Question } from '../../types';
import { COLORS, GRADIENTS, SHADOWS } from '../../constants';
import QuestionCard from '../UI/QuestionCard';
import Scoresvg from '@icons/Score.svg';

interface MainContentProps {
  questions: Question[];
}

const MainContent: React.FC<MainContentProps> = ({ questions }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <Box
      sx={{
        marginLeft: "289px",
        marginTop: "64px",
        padding: "32px",
        paddingBottom: "120px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        background: GRADIENTS.background,
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: GRADIENTS.primary,
          color: "white",
          p: 3,
          borderRadius: "16px",
          mb: 4,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: "28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Practice Questions
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative", zIndex: 1 }}>
          <Typography sx={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
            {questions.length} Questions Available
          </Typography>
        </Box>
      </Box>

      {/* Question List */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "20px",
          background: "white",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          boxShadow: SHADOWS.xl,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {questions.length > 0 ? (
            questions.map((question, idx) => (
              <QuestionCard
                key={question.id || idx}
                question={question}
                index={idx}
                isFirst={idx === 0}
                isLast={idx === questions.length - 1}
              />
            ))
          ) : (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography sx={{ color: COLORS.text.muted, fontSize: "18px", fontWeight: 500 }}>
                📚 No questions found for this unit
              </Typography>
              <Typography sx={{ color: COLORS.text.light, fontSize: "14px", mt: 1 }}>
                Please check back later or contact your instructor
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: "289px",
          right: 0,
          background: "white",
          borderTop: "1px solid #E5E7EB",
          zIndex: 1000,
          p: 3,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img src={Scoresvg} alt="Score" style={{ width: "40px", height: "40px" }} />
            <Box>
              <Typography
                sx={{ color: COLORS.text.muted, fontWeight: "500", fontSize: "14px" }}
              >
                Congratulations! Your score is:
              </Typography>
              <Typography
                sx={{ color: COLORS.primary, fontWeight: "700", fontSize: "24px" }}
              >
                25 / 30
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              variant="outlined"
              onClick={() => setShowAnswers(true)}
              sx={{
                borderColor: COLORS.primary,
                color: COLORS.primary,
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": {
                  borderColor: COLORS.primaryDark,
                  background: "rgba(106, 66, 171, 0.05)",
                }
              }}
            >
              Check Answer
            </Button>
            <Button
              variant="contained"
              sx={{
                background: GRADIENTS.primary,
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: SHADOWS.purple,
                "&:hover": {
                  background: GRADIENTS.primaryHover,
                  boxShadow: SHADOWS.purpleHover,
                }
              }}
            >
              Complete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;
