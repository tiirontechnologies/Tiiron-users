import { Box, Typography } from "@mui/material";
import ToolBar from "@pages/edit-course/toolbar";
import MoreButton from "@pages/edit-course/toolbar/MoreButton";
import PublishButton from "@pages/edit-course/toolbar/PublishButton";
import QuestionBankLayout from "./QuestionBankLayout";
import Topics from "./Topics";
import TopicsQuestions from "./TopicsQuestions";
import { useState } from "react";
import QuestionEdit from "./QuestionEdit";
export interface AnswerOption {
  optionId: number;
  option: string;
}

export interface Question {
  questionId: number;
  question: string;
  score: number;
  questionType: "Multiple Choice" | "Fill in the blank" | string;
  answerOptions: AnswerOption[] | null;
  correctOptionId: number;
}

export interface Topic {
  topicId: number;
  topicName: string;
  totalQuestions: number;
  bankName: string;
  question: Question[];
}

const TopicsData: Topic[] = [
  {
    topicId: 1,
    topicName: "Topic 1",
    totalQuestions: 2,
    bankName: "Bank 1",
    question: [
      {
        questionId: 1,
        question: "Question 1",
        score: 2,
        questionType: "Multiple Choice",
        answerOptions: [
          {
            optionId: 1,
            option: "Option 1",
          },
          {
            optionId: 2,
            option: "Option 2",
          },
        ],
        correctOptionId: 1,
      },
    ],
  },
  {
    topicId: 2,
    topicName: "Topic 2",
    totalQuestions: 2,
    bankName: "Bank 2",
    question: [
      {
        questionId: 1,
        question: "Question 2 is ______",
        score: 2,
        questionType: "Fill in the blank",
        answerOptions: null,
        correctOptionId: 1,
      },
    ],
  },
];

const index = () => {
  const [selectedId, setSelectedId] = useState(TopicsData[0].topicId);
  const [switchView, setSwitchView] = useState("topic-edit");
  return switchView === "topic-edit" ? (
    <Box>
      <ToolBar>
        <RightSideTools />
      </ToolBar>
      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        <QuestionBankLayout
          heading="Topics"
          mainContent={
            <>
              <TopicsQuestions
                TopicsData={TopicsData}
                selectedId={selectedId}
                setSwitchView={setSwitchView}
              />
            </>
          }
          sidebarContent={
            <Topics
              TopicsData={TopicsData}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          }
        />
      </Box>
    </Box>
  ) : (
    <QuestionEdit
      QuestionData={
        (TopicsData.find((t) => t.topicId === selectedId)?.question ??
          []) as Question[]
      }
    />
  );
};

export default index;

export const RightSideTools = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "48px",
      }}
    >
      <PublishButton />
      <MoreButton />
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Lessons</Typography>
      </Box>
      <Typography sx={{ color: "#000000" }}>/</Typography>
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Learners</Typography>
      </Box>
    </Box>
  );
};
