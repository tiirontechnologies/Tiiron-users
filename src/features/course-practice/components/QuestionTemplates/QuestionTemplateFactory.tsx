import React from "react";
import { Question, QuestionType } from "../../types";
import McqTemplate from "./McqTemplate";
import FillUpTemplate from "./FillUpTemplate";
import SubjectiveTemplate from "./SubjectiveTemplate";
import BlogTemplate from "./BlogTemplate";
import VideoTemplate from "./VideoTemplate";
import VideoBlogTabs from "./VideoBlogTabs";

interface QuestionTemplateFactoryProps {
  type: QuestionType;
  question: Question;
  practiceMode?: boolean;
  showAnswers?: boolean;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
}

const QuestionTemplateFactory: React.FC<QuestionTemplateFactoryProps> = ({
  type,
  question,
  practiceMode = false,
  showAnswers = false,
  userAnswer,
  onAnswerChange,
}) => {
  console.log("Question in QuestionTemplateFactory:", question);
  const commonProps = {
    question,
    practiceMode,
    showAnswers,
    userAnswer,
    onAnswerChange,
  };

  switch (type) {
    case "mcq":
      return <McqTemplate {...commonProps} />;
    case "single_choice":
      return <McqTemplate {...commonProps} />;
    case "fill_up":
      return <FillUpTemplate {...commonProps} />;
    case "subjective":
      return <SubjectiveTemplate {...commonProps} />;
    case "blog":
      return <BlogTemplate {...commonProps} />;
    case "video":
      return <VideoTemplate {...commonProps} />;
    case "video_blog":
      return <VideoBlogTabs {...commonProps} />;
    default:
      return null;
  }
};

export default QuestionTemplateFactory;
