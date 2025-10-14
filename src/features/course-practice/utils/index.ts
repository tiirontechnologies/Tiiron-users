import { QuestionType } from '../types';

export const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export const formatQuestionType = (type: QuestionType): string => {
  return type.replace('_', ' ').toUpperCase();
};

export const calculateProgress = (current: number, total: number): number => {
  return Math.round((current / total) * 100);
};

export const getProgressStats = (current: number, total: number) => {
  return {
    current,
    total,
    percentage: calculateProgress(current, total),
    completed: current,
    remaining: total - current,
  };
};

export const validateQuestionContent = (question: any): boolean => {
  if (!question?.content) return false;
  
  switch (question.contentType) {
    case 'mcq':
    case 'single_choice':
      return Array.isArray(question.content.options) && question.content.options.length > 0;
    case 'fill_up':
      return Boolean(question.content.correctAnswer);
    case 'subjective':
      return Boolean(question.content.question);
    case 'blog':
      return Boolean(question.content.html || question.content.text);
    case 'video':
      return Boolean(question.content.url);
    default:
      return true;
  }
};

export const getQuestionTemplateKey = (type: QuestionType): string => {
  return type === 'video_blog' ? 'video_blog' : type;
};
