import { Box, List, ListItem, ListItemText } from "@mui/material";

export default function CourseQuestionsSideList({ QuestionsData, selectedId, setSelectedId }: any) {
  return (
    <Box>
      <List>
        {QuestionsData.map((q: any) => (
          <ListItem
            button
            key={q.questionId}
            selected={q.questionId === selectedId}
            onClick={() => setSelectedId(q.questionId)}
          >
            <ListItemText primary={q.question} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
