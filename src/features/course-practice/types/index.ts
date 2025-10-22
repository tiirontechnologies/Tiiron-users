export interface Question {
  id: string;
  text: string;
  contentType: QuestionType;
  content: QuestionContent;
}

export interface QuestionContent {
  id?: string;
  options?: QuestionOption[];
  correctAnswer?: string | string[];
  question?: string;
  html?: string;
  text?: string;
  url?: string;
  allowMultipleSelection?: boolean;
}

export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export type QuestionType =
  | "mcq"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video"
  | "video_blog";

export interface Chapter {
  id: string;
  title: string;
  units?: Unit[];
  onClick?: () => void;
}

export interface Unit {
  id: string;
  title: string;
}

export interface CourseData {
  chapters: Chapter[];
}

export interface CourseProgressData {
  data: CourseData;
}

export interface ProgressStats {
  current: number;
  total: number;
  percentage: number;
}

export interface TabState {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}
