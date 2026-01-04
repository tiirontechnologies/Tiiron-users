import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  List,
  ListItem,
  Stack,
  Chip,
  Collapse,
  IconButton,
} from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { lessons } from "./lessons";

const getIcon = (type?: string) => {
  switch (type) {
    case "quiz":
      return <QuizOutlinedIcon fontSize="small" />;
    case "assignment":
      return <AssignmentOutlinedIcon fontSize="small" />;
    default:
      return <PlayCircleOutlineIcon fontSize="small" />;
  }
};

const CourseSidebar: React.FC = () => {
  const [openLessonId, setOpenLessonId] = useState<number | null>(null);

  const handleToggle = (lessonId: number) => {
    setOpenLessonId(openLessonId === lessonId ? null : lessonId);
  };

  return (
    <Box
      sx={{
        overflowY: "auto",
      }}
    >
      <List disablePadding>
        {lessons.map((lesson) => {
          const hasQuestions = !!lesson.questions?.length;
          const isOpen = openLessonId === lesson.id;

          return (
            <ListItem
              key={lesson.id}
              disableGutters
              sx={{
                border: "1px solid #e2e8f0",
                p: 1,
                bgcolor: lesson.completed ? "#eef2ff" : "#f8fafc",
                transition: "all .25s ease",
                "&:hover": {
                  bgcolor: "#eef2ff",
                },
                display: "block",
              }}
            >
              {/* HEADER */}
              <Stack direction="row" spacing={1.2} alignItems="flex-start">
                {/* ICON */}
                <Box sx={{ mt: "3px", color: "#6366f1" }}>
                  {getIcon(lesson.type)}
                </Box>

                {/* TITLE + META */}
                <Box flex={1}>
                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    lineHeight={1.35}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {lesson.title}
                  </Typography>

                  {(lesson.duration || lesson.type) && (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mt={0.4}
                    >
                      {lesson.duration && (
                        <Typography fontSize={11} color="text.secondary">
                          ⏱ {lesson.duration}
                        </Typography>
                      )}

                      {lesson.type && (
                        <Chip
                          label={lesson.type}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: 10,
                            textTransform: "capitalize",
                          }}
                        />
                      )}
                    </Stack>
                  )}
                </Box>

                {/* EXPAND */}
                {hasQuestions && (
                  <IconButton
                    size="small"
                    onClick={() => handleToggle(lesson.id)}
                    sx={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "0.25s",
                    }}
                  >
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                )}

                {/* CHECK */}
                <Checkbox
                  checked={lesson.completed}
                  size="small"
                  sx={{ p: 0, ml: 0.5 }}
                />
              </Stack>

              {/* QUESTIONS */}
              {hasQuestions && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      mt: 1,
                      ml: 3,
                    }}
                  >
                    {lesson.questions!.map((q, index) => (
                      <ListItem
                        key={q.id}
                        component="div"
                        disableGutters
                        sx={{
                          py: 0.4,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                      

                        <Typography fontSize={12.5} color="text.secondary">
                          {index + 1}. {q.question}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default CourseSidebar;
