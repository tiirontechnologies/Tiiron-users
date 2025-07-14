import { AnswerOption, Question, Topic } from ".";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CollapseRightIcon from "@icons/CollapseRightIcon";

const TopicsQuestions = ({
  TopicsData,
  selectedId,
  setSwitchView,
}: {
  TopicsData: Topic[];
  selectedId: number;
  setSwitchView?: (view: string) => void;
}) => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "16px",
          p: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "24px",
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: "600", fontSize: "16px", color: "#000" }}
          >
            Bank Name
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "16px",
              color: "#000",
              mt: "6px",
            }}
          >
            2 Question
          </Typography>
        </Box>
        <Box sx={{ height: "fit-content" }}>
          <Button
            variant="outlined"
            sx={{ p: "16px 24px", height: "fit-content" }}
            startIcon={<CollapseRightIcon />}
          >
            Collapse All
          </Button>
          <Button
            sx={{ ml: "16px", p: "16px 24px", height: "fit-content" }}
            onClick={() => setSwitchView && setSwitchView("question-edit")}
          >
            Edit Questions
          </Button>
        </Box>
      </Box>
      {TopicsData.map(
        (topic: Topic) =>
          selectedId === topic.topicId &&
          topic.question.map((question: Question, index: number) => (
            <Box
              sx={{
                background: "#fff",
                borderRadius: "16px",
                p: "16px",
                mb: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "16px",
                }}
              >
                <Box>
                  <Typography sx={{ color: "#000000", fontWeight: "600" }}>
                    {index + 1}. {question.question}
                  </Typography>
                  <Typography sx={{ fontWeight: "300" }}>
                    Score :{question.score}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "#E3DCFF",
                    borderRadius: "8px",
                    color: "#000",
                    p: "8px 12px",
                    width: "fit-content",
                    height: "fit-content",
                    fontSize: "14px",
                    mb: "32px",
                  }}
                >
                  {question.questionType}
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: "16px" }}>
                {question.answerOptions?.map((option: AnswerOption) => (
                  <Box
                    key={option.optionId}
                    sx={{
                      flex: 1,
                      border: `1px solid ${"#42B285"}`,
                      p: "8px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={true}
                          onChange={() => {}}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              borderRadius: "4px",
                            },
                            "&.Mui-checked .MuiSvgIcon-root": {
                              color: "#ffffff",
                              backgroundColor: "#42B285",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#000" }}>
                          {option.option}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))
      )}
    </>
  );
};

export default TopicsQuestions;
const items = [
  "Enclose the answer of your fill - in - the - blank questions within square bucket ([])",
  "You can give miltiple answers for a single blank by separation them with a comma (,) inside square brackets.",
  "The words within the brackets will appear as black spaces for the learners.",
];
export const QuestionEditMain = () => {
  return (
    <Box>
      <Box
        sx={{
          padding: "16px",
          borderRadius: "16px",
          bgcolor: "#fff",
          border: "1px solid #E6E6E6",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography
            sx={{ color: "#6A42AB", fontSize: "24px", fontWeight: "600" }}
          >
            02
          </Typography>
          <Divider orientation="vertical" color="#cccccc" flexItem />
          <Typography
            sx={{ color: "#000000", fontSize: "18px", fontWeight: "600" }}
          >
            Question 1 is [()], [()]
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: "16px",
          bgcolor: "#F9FAFA",
          border: "1px solid #E6E6E6",
          mt: "16px",
        }}
      >
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #D9D9D9",
            bgcolor: "#fff",
            width: "fit-content",
            borderRadius: "16px",
          }}
        >
          Answer 1
        </Box>
      </Box>
      <Box
        sx={{
          padding: "16px",
          border: "1px solid #759FFF",
          bgcolor: "#F5F8FF",
          borderRadius: "16px",
          mt: "16px",
        }}
      >
        <List sx={{ p: 0 }}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "flex-start", p: 0 }}
            >
              <span
                style={{ marginRight: 8, fontSize: "1.2rem", lineHeight: 1.5 }}
              >
                •
              </span>
              <ListItemText primary={item} sx={{ color: "#000" }} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          mt: "46px",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: "600", color: "#000000" }}
        >
          Optional Settings
        </Typography>
      </Box>
    </Box>
  );
};
