import { Box, Typography } from "@mui/material";
import ToolBar from "@pages/EditCourse/toolbar";
import MoreButton from "@pages/EditCourse/toolbar/MoreButton";
import PublishButton from "@pages/EditCourse/toolbar/PublishButton";
import QuestionBankLayout from "./QuestionBankLayout";
import { QuestionsSideList } from "./Topics";
import { useState } from "react";
import { Question } from ".";
import { QuestionEditMain } from "./TopicsQuestions";
const QuestionEdit = ({ QuestionData }: { QuestionData: Question[] }) => {
  const [selectedId, setSelectedId] = useState(QuestionData[0].questionId);
  return (
    <Box>
      <ToolBar>
        <RightSideTools />
      </ToolBar>
      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        <QuestionBankLayout
          heading="Question Order"
          mainContent={
            <>
              <QuestionEditMain />
            </>
          }
          sidebarContent={
            <QuestionsSideList
              QuestionsData={QuestionData}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default QuestionEdit;

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
