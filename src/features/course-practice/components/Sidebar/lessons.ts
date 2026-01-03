export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options?: QuizOption[];
  correctAnswer?: string;
}

export interface Lesson {
  id: number;
  title: string;
  duration?: string;
  type?: "video" | "quiz" | "assignment";
  completed: boolean;

  // only for quiz
  questions?: QuizQuestion[];
}


export const lessons: Lesson[] = [
  // DAY 1 VIDEO
  {
    id: 1,
    title: "Day - 1 | Introduction to Generative AI",
    duration: "1h 30m",
    type: "video",
    completed: true,
  },

  // DAY 1 ASSIGNMENT
  {
    id: 2,
    title: "Day - 1 | Basics of AI – Assignment",
    type: "assignment",
    completed: false,
    questions: [
      {
        id: 1,
        question: "Explain what Artificial Intelligence is in your own words.",
      },
      {
        id: 2,
        question: "List any 3 real-world applications of AI.",
      },
    ],
  },

  // DAY 2 QUIZ
  {
    id: 4,
    title: "Day - 2 | OpenAI Quiz",
    type: "quiz",
    completed: false,
    questions: [
      {
        id: 1,
        question: "What is OpenAI primarily known for?",
        options: [
          { id: "a", label: "Social Media Platforms" },
          { id: "b", label: "Artificial Intelligence Research" },
          { id: "c", label: "Web Hosting Services" },
          { id: "d", label: "Mobile App Development" },
        ],
        correctAnswer: "b",
      },
      {
        id: 2,
        question: "What does a token represent in OpenAI models?",
        options: [
          { id: "a", label: "An API Key" },
          { id: "b", label: "A unit of text" },
          { id: "c", label: "A database record" },
          { id: "d", label: "A server instance" },
        ],
        correctAnswer: "b",
      },
    ],
  },

  // DAY 3 VIDEO
  {
    id: 7,
    title: "Day - 3 | Prompt Engineering Fundamentals",
    duration: "2h 10m",
    type: "video",
    completed: false,
  },

  // DAY 3 ASSIGNMENT
  {
    id: 8,
    title: "Day - 3 | Prompt Writing Practice",
    type: "assignment",
    completed: false,
    questions: [
      {
        id: 1,
        question:
          "Write a prompt that asks an AI to generate a professional email.",
      },
      {
        id: 2,
        question:
          "Explain why clear instructions are important in prompt engineering.",
      },
    ],
  },

  // DAY 5 QUIZ
  {
    id: 12,
    title: "Day - 5 | LangChain Quiz",
    type: "quiz",
    completed: false,
    questions: [
      {
        id: 1,
        question: "What is LangChain mainly used for?",
        options: [
          { id: "a", label: "Building blockchain apps" },
          { id: "b", label: "Connecting LLMs with external data & tools" },
          { id: "c", label: "Frontend UI design" },
          { id: "d", label: "Database management" },
        ],
        correctAnswer: "b",
      },
      {
        id: 2,
        question: "Which component helps maintain conversation context?",
        options: [
          { id: "a", label: "Chains" },
          { id: "b", label: "Agents" },
          { id: "c", label: "Memory" },
          { id: "d", label: "Prompts" },
        ],
        correctAnswer: "c",
      },
    ],
  },

  // DAY 5 ASSIGNMENT
  {
    id: 13,
    title: "Day - 5 | Build a LangChain Chatbot",
    type: "assignment",
    completed: false,
    questions: [
      {
        id: 1,
        question:
          "Explain the architecture of a basic LangChain chatbot.",
      },
      {
        id: 2,
        question:
          "Which LangChain components would you use to store chat history?",
      },
      {
        id: 3,
        question:
          "Write pseudocode for initializing a LangChain conversation chain.",
      },
    ],
  },
];
