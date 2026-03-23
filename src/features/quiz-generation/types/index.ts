export interface QuizOption {
  id: number;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface GenerateQuizRequest {
  topic: string;
  text: string;
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface GenerateQuizResponse {
  success: boolean;
  message: string;
  data: QuizQuestion[];
}
