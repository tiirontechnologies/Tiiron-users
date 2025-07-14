import { Box, Button, IconButton, Typography } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import { Question, Topic } from ".";
import ListAddIcon from "@icons/ListAddIcon";

const Topics = ({
  TopicsData,
  selectedId,
  setSelectedId,
}: {
  TopicsData: Topic[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}) => {
  return (
    <>
      {TopicsData.map((question: Topic) => (
        <Box
          sx={{
            border:
              selectedId === question.topicId
                ? "1px solid #6A42AB"
                : "1px solid #CCCCCC",
            p: "16px",
            borderLeft:
              selectedId === question.topicId
                ? "4px solid #6A42AB"
                : "1px solid #CCCCCC",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            mb: "16px",
            height: "44px",
            cursor: "pointer",
          }}
          onClick={() => setSelectedId(question.topicId)}
        >
          <Typography>{question.topicName}</Typography>
          <Typography sx={{ ml: "auto" }}>{question.totalQuestions}</Typography>
          <IconButton>
            <MoreVert sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      ))}
      <Button sx={{ width: "100%" }} startIcon={<ListAddIcon color="#fff" />}>
        Add question
      </Button>
    </>
  );
};

export const QuestionsSideList = ({
  QuestionsData,
  selectedId,
  setSelectedId,
}: {
  QuestionsData: Question[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}) => {
  return (
    <>
      {QuestionsData.map((question: Question) => (
        <Box
          sx={{
            border:
              selectedId === question.questionId
                ? "1px solid #6A42AB"
                : "1px solid #CCCCCC",
            p: "16px",
            borderLeft:
              selectedId === question.questionId
                ? "4px solid #6A42AB"
                : "1px solid #CCCCCC",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            mb: "16px",
            height: "44px",
            cursor: "pointer",
          }}
          onClick={() => setSelectedId(question.questionId)}
        >
          <Typography>{question.question}</Typography>
          <Typography sx={{ ml: "auto" }}>{question.score}</Typography>
          <IconButton>
            <MoreVert sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      ))}
      <Button sx={{ width: "100%" }} startIcon={<ListAddIcon color="#fff" />}>
        Add question
      </Button>
    </>
  );
};
export default Topics;
