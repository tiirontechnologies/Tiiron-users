import { Box, Typography } from "@mui/material";
import ToolBar from "@pages/edit-course/toolbar";
import MoreButton from "@pages/edit-course/toolbar/MoreButton";
import PublishButton from "@pages/edit-course/toolbar/PublishButton";
import QuestionBankLayout from "./QuestionBankLayout";
import Topics from "./Topics";
import TopicsQuestions from "./TopicsQuestions";
import { useState } from "react";
import QuestionEdit from "./QuestionEdit";
import { useGetAllQuestionsQuery } from "../../api/api";
import Loader from "@components/ui/Spinner";
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


const index = () => {
  const { data, isFetching, isError } = useGetAllQuestionsQuery('');

  const [selectedId, setSelectedId] = useState(data?.data[0].id);
  const [switchView, setSwitchView] = useState("topic-edit");
  const [formType, setFormType] = useState<null | "multiple_choice" | "single_choice" | "fill_up">(null);

  return switchView === "topic-edit" ? (
    <Box>
      <ToolBar>
        <RightSideTools />
      </ToolBar>
      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        {isFetching ? <Loader /> : isError ? <Box>Some Error occured...</Box> : data?.data && <QuestionBankLayout
          heading="Questions"
          mainContent={
            <>
              <TopicsQuestions
                setFormType={setFormType}
                formType={formType}
                selectedId={selectedId}
                setSwitchView={setSwitchView}
              />
            </>
          }
          sidebarContent={
            <Topics
              setFormType={setFormType}
              TopicsData={data?.data}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          }
        />}
      </Box>
    </Box>
  ) : (
    <QuestionEdit
      QuestionData={
        (data?.data.find((t: any) => t.topicId === selectedId)?.question ??
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
