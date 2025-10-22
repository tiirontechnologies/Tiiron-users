import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { SHADOWS, COLORS } from "../../constants";
import { Question } from "../../types";
import QuestionCard from "../UI/QuestionCard";
import QuestionNavigator from "./QuestionNavigator";

interface PracticeState {
  isPracticeMode: boolean;
  currentQuestionIndex: number;
  userAnswers: Record<string, string | string[]>;
  showResults: boolean;
}

interface QuestionViewerProps {
  questions: Question[];
  practiceState: PracticeState;
  updateAnswer: (questionId: string, answer: string | string[]) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  goToQuestion: (index: number) => void;
}

const QuestionViewer: React.FC<QuestionViewerProps> = ({
  questions,
  practiceState,
  updateAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  goToQuestion,
}) => {
  return (
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
          practiceState.isPracticeMode ? (
            // Single question view in practice mode
            <>
              <QuestionCard
                key={
                  questions[practiceState.currentQuestionIndex]?.id ||
                  practiceState.currentQuestionIndex
                }
                question={questions[practiceState.currentQuestionIndex]}
                index={practiceState.currentQuestionIndex}
                isFirst={true}
                isLast={true}
                practiceMode={true}
                userAnswer={
                  practiceState.userAnswers[
                    questions[practiceState.currentQuestionIndex]?.id
                  ]
                }
                onAnswerChange={(answer) =>
                  updateAnswer(
                    questions[practiceState.currentQuestionIndex]?.id,
                    answer
                  )
                }
              />

              <QuestionNavigator
                practiceState={practiceState}
                questions={questions}
                goToNextQuestion={goToNextQuestion}
                goToPreviousQuestion={goToPreviousQuestion}
                goToQuestion={goToQuestion}
              />
            </>
          ) : (
            // All questions view in review mode
            questions.map((question, idx) => (
              <QuestionCard
                key={question.id || idx}
                question={question}
                index={idx}
                isFirst={idx === 0}
                isLast={idx === questions.length - 1}
                practiceMode={false}
                showAnswers={practiceState.showResults}
                userAnswer={practiceState.userAnswers[question.id]}
              />
            ))
          )
        ) : (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography
              sx={{
                color: COLORS.text.muted,
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              📚 No questions found for this unit
            </Typography>
            <Typography
              sx={{ color: COLORS.text.light, fontSize: "14px", mt: 1 }}
            >
              Please check back later or contact your instructor
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionViewer;
