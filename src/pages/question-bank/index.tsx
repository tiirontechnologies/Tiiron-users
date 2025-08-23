import PageToolbarLayout from "@layouts/PageToolbarLayout";
import { Box } from "@mui/material";
import { useState } from "react";
import AddNewQuestionCard from "./AddNewQuestionCard";
import QuestionCard from "./QuestionCard";
const QuestionBankData = [
  {
    questionId: 1,
    courseThumbnailSrc: "", // your image
    questionTags: ["PRIVATE"],
    questionTagsColours: [
      {
        color: "#702DFF",
        bgColor: "#702DFF34",
      },
    ],
    question: "QA to becoming a professional frontend developer",
    name: "Nipun Kalra",
    rating: 5.5,
  },
];
const index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("Add Question Bank");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title="Question Bank">
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <AddNewQuestionCard
            image={image}
            setImage={setImage}
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
          />
          {QuestionBankData.map((course) => (
            <QuestionCard
              key={course.questionId}
              thumbnailSrc={course.courseThumbnailSrc}
              tags={course.questionTags}
              title={course.question}
              name={course.name}
              rating={course.rating}
              backgroundColor={course.questionTagsColours[0].bgColor}
              color={course.questionTagsColours[0].color}
            />
          ))}
        </Box>
      </PageToolbarLayout>
    </Box>
  );
};

export default index;
