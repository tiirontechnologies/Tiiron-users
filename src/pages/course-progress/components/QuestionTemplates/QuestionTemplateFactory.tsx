import React from 'react';
import { Question, QuestionType } from '../../types';
import McqTemplate from './McqTemplate';
import FillUpTemplate from './FillUpTemplate';
import SubjectiveTemplate from './SubjectiveTemplate';
import BlogTemplate from './BlogTemplate';
import VideoTemplate from './VideoTemplate';
import VideoBlogTabs from './VideoBlogTabs';

interface QuestionTemplateFactoryProps {
  type: QuestionType;
  question: Question;
}

const QuestionTemplateFactory: React.FC<QuestionTemplateFactoryProps> = ({ type, question }) => {
  switch (type) {
    case 'mcq':
      return <McqTemplate question={question} />;
    case 'single_choice':
      return <McqTemplate question={question} />;
    case 'fill_up':
      return <FillUpTemplate question={question} />;
    case 'subjective':
      return <SubjectiveTemplate question={question} />;
    case 'blog':
      return <BlogTemplate question={question} />;
    case 'video':
      return <VideoTemplate question={question} />;
    case 'video_blog':
      return <VideoBlogTabs question={question} />;
    default:
      return null;
  }
};

export default QuestionTemplateFactory;
