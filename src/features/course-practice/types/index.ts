export interface Question {
  id: string;
  text: string;
  contentType: QuestionType;
  content: QuestionContent;
  description?: {
    html: string;
    title: string;
  };
  previousPractice?: ApiPractice;
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
  id?: number; // API option ID for submission
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
  | "video_blog"
  | "coding";

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

// API Response Types for Course Practice
export interface ApiQuestionOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface ApiMcq {
  id: number;
  questionId: number;
  options: ApiQuestionOption[];
}

export interface ApiFillUp {
  id: number;
  questionId: number;
  text: string;
  answer: string;
}

export interface ApiSubjective {
  id: number;
  questionId: number;
  questionText: string;
}

export interface ApiPractice {
  id: number;
  questionId: number;
  userId: number;
  userAnswer: string | null;
  isCorrect: boolean;
  score: number;
  timeSpent: number | null;
  createdAt: string;
  updatedAt: string;
  selectedOptionIndex: number | null;
  selectedOptionId: number | null;
}

export interface ApiCodeTestCase {
  input: string; // stdin format
  description: string;
  expectedOutput: string;
}

export interface ApiCodeTemplate {
  template: {
    [language: string]: string;
  };
}

export interface ApiCodeTemplateItem {
  code: string;
  languageId: number;
}

// codeTemplate can be either an array (actual API format) or an object with template property (legacy)
export type ApiCodeTemplateUnion = ApiCodeTemplateItem[] | ApiCodeTemplate;

export interface ApiCode {
  id: number;
  questionId: number;
  testCases: ApiCodeTestCase[];
  codeTemplate: ApiCodeTemplateUnion;
  alllowedLanguage: number[];
}

export interface ApiQuestion {
  id: number;
  title: string;
  description: string;
  score: number;
  questiontypeId: number;
  contentId: number;
  questiontypecon: {
    id: number;
    name: string;
    order: number;
  };
  mcq: ApiMcq | null;
  subjective: ApiSubjective | null;
  fillUp: ApiFillUp | null;
  code: ApiCode | null;
  practices: ApiPractice[];
}

export interface ContentTypeStatus {
  isCompleted: boolean;
  totalScore: number;
}

export interface ApiContentType {
  id: number;
  name: string;
  icon: string;
  order: number;
  questions: ApiQuestion[];
  status: ContentTypeStatus;
}

export interface UnitStatus {
  isCompleted: boolean;
}

export interface CoursePracticeApiResponse {
  success: boolean;
  data: {
    contentTypes: ApiContentType[];
    unitStatus: UnitStatus;
  };
   notes?: {
      pdf_url?: string;
    };
}
