import { Question, QuestionType } from '../types';

// // API Response Types
// interface ApiContentItem {
//   id: number;
//   unitId: number;
//   queTypeId: number;
//   score: number | null;
//   contentTypeId: number;
//   description: {
//     html: string;
//     title: string;
//   };
//   mcq?: {
//     id: number;
//     contentId: number;
//     options: Array<{
//       id: number;
//       mcqId?: number;
//       text: string;
//       isCorrect?: boolean;
//     }>;
//   };
//   video?: any;
//   blog?: any;
//   subjective?: any;
//   fillUp?: any;
//   contentTypeCon: {
//     id: number;
//     name: string;
//     icon: string;
//     order: number;
//   };
//   questionTypeCon: {
//     id: number;
//     name: string;
//     order: number;
//   };
//   practices?: Array<{
//     selectedOptionId?: number;
//     selectedOption?: {
//       id: number;
//       mcqId: number;
//       text: string;
//       isCorrect: boolean;
//     };
//     score: number;
//     userAnswer: string | null;
//     isCorrect: boolean;
//   }>;
// }

// interface Question{
//   id: number;
//   text: string;
//   questionTypeId: QuestionType;
//   titile: string;
//   description: string;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: {
//     practice: {
//       isCompleted: boolean;
//       score: number;
//     };
//     unit: {
//       id: number;
//       title: string;
//       chapters: {
//         id: number;
//         content: {
//           contentTypeId: number;
//           name: string;
//           icon: string;
//           questions: Question[];
//         };
//       };
//     };
//   };
// }

/**
 * Maps question type name from API to QuestionType
 */
const mapQuestionType = (typeName: string): QuestionType => {
  const normalized = typeName.toLowerCase().trim();
  
  if (normalized.includes('multiple') || normalized.includes('mcq')) {
    return 'mcq';
  }
  if (normalized.includes('single')) {
    return 'single_choice';
  }
  if (normalized.includes('fill') || normalized.includes('blank')) {
    return 'fill_up';
  }
  if (normalized.includes('subjective')) {
    return 'subjective';
  }
  if (normalized.includes('blog')) {
    return 'blog';
  }
  if (normalized.includes('video')) {
    return 'video';
  }
  
  return 'mcq'; // default fallback
};

/**
 * Transforms a single API question to Question format
 */
export const transformApiQuestion = (apiQuestion: any): Question => {
  const questionTypeId = apiQuestion.questiontypeId;
  const questionTypeName = apiQuestion.questiontypecon?.name || '';
  
  // Map question type ID to QuestionType
  let contentType: QuestionType = 'mcq';
  if (questionTypeId === 1) {
    contentType = 'mcq';
  } else if (questionTypeId === 3) {
    contentType = 'fill_up';
  } else if (questionTypeId === 4) {
    contentType = 'subjective';
  } else if (questionTypeId === 5) {
    contentType = 'blog';
  } else if (questionTypeId === 6) {
    contentType = 'video';
  } else {
    // Fallback to name-based mapping
    contentType = mapQuestionType(questionTypeName);
  }

  // Build content object based on question type
  const content: any = {};

  if (contentType === 'mcq' || contentType === 'single_choice') {
    // Transform MCQ options
    if (apiQuestion.mcq?.options && Array.isArray(apiQuestion.mcq.options)) {
      content.options = apiQuestion.mcq.options.map((option: any) => ({
        id: option.id,
        text: option.text,
        isCorrect: option.isCorrect || false,
      }));
    } else {
      content.options = [];
    }
  } else if (contentType === 'fill_up') {
    // Fill up content transformation
    if (apiQuestion.fillUp) {
      content.question = apiQuestion.fillUp.text || apiQuestion.title || '';
      content.correctAnswer = apiQuestion.fillUp.answer || '';
    } else {
      content.question = apiQuestion.title || '';
      content.correctAnswer = '';
    }
  } else if (contentType === 'subjective') {
    // Subjective content transformation
    if (apiQuestion.subjective) {
      content.question = apiQuestion.subjective.questionText || apiQuestion.title || '';
    } else {
      content.question = apiQuestion.title || '';
    }
  } else if (contentType === 'blog') {
    // Blog content transformation - API doesn't provide blog structure, use title/description
    content.html = apiQuestion.description || '';
    content.text = apiQuestion.title || '';
  } else if (contentType === 'video') {
    // Video content transformation - API doesn't provide video structure
    content.url = '';
  }

  return {
    id: apiQuestion.id.toString(),
    text: apiQuestion.title || '',
    contentType,
    content,
    description: {
      html: apiQuestion.description || '',
      title: apiQuestion.title || '',
    },
  };
};

/**
 * Transforms the new API response structure to extract questions and practice data
 */
export const transformApiResponse = (response: any):any => {
  // Handle both new structure and potential old structure
  // if (!response) {
  //   return {
  //     questions: [],
  //     practice: null,
  //     unit: null,
  //   };
  // }
  
  return response?.data;
};

