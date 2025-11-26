import { Question, QuestionType } from '../types';

// API Response Types
interface ApiContentItem {
  id: number;
  unitId: number;
  queTypeId: number;
  score: number | null;
  contentTypeId: number;
  description: {
    html: string;
    title: string;
  };
  mcq?: {
    id: number;
    contentId: number;
    options: Array<{
      id: number;
      mcqId?: number;
      text: string;
      isCorrect?: boolean;
    }>;
  };
  video?: any;
  blog?: any;
  subjective?: any;
  fillUp?: any;
  contentTypeCon: {
    id: number;
    name: string;
    icon: string;
    order: number;
  };
  questionTypeCon: {
    id: number;
    name: string;
    order: number;
  };
  practices?: Array<{
    selectedOptionId?: number;
    selectedOption?: {
      id: number;
      mcqId: number;
      text: string;
      isCorrect: boolean;
    };
    score: number;
    userAnswer: string | null;
    isCorrect: boolean;
  }>;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    practice: {
      isCompleted: boolean;
      score: number;
    };
    unit: {
      unit: {
        id: number;
        title: string;
        content: string;
        chapterId: number;
        createdAt: string;
        updatedAt: string;
        chapter: {
          id: number;
          title: string;
          courseId: number;
          createdAt: string;
          updatedAt: string;
        };
      };
      content: ApiContentItem[];
    };
  };
}

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
 * Transforms API content item to Question format
 */
const transformContentItem = (item: ApiContentItem): Question => {
  const questionType = mapQuestionType(item.questionTypeCon?.name || 'Multiple Choice');
  
  // Extract question text from description
  const questionText = item.description?.title || item.description?.html || '';
  
  // Transform MCQ options if available
  let transformedOptions: Array<{ id?: number; text: string; isCorrect: boolean }> = [];
  if (item.mcq?.options && Array.isArray(item.mcq.options)) {
    // Get previously selected option from practices array
    const previousPractice = item.practices && item.practices.length > 0 ? item.practices[0] : null;
    // Handle both selectedOptionId (direct) and selectedOption.id (nested) formats
    const previousSelectedOptionId = previousPractice?.selectedOptionId || previousPractice?.selectedOption?.id;
    
    // Transform options - preserve the API option ID for submission
    // Mark correct options based on the option's isCorrect property
    transformedOptions = item.mcq.options.map((option) => {
      return {
        id: option.id, // Preserve API option ID for submission
        text: option.text,
        isCorrect: option.isCorrect || false, // Use the isCorrect from the option itself
      };
    });
  }
  
  // Build content object based on question type
  const content: any = {};
  
  if (questionType === 'mcq' || questionType === 'single_choice') {
    content.options = transformedOptions;
  } else if (questionType === 'fill_up') {
    // Fill up content transformation
    if (item.fillUp) {
      content.correctAnswer = item.fillUp.correctAnswer;
    }
  } else if (questionType === 'subjective') {
    // Subjective content transformation
    if (item.subjective) {
      content.question = item.subjective.question || questionText;
    }
  } else if (questionType === 'blog') {
    // Blog content transformation
    if (item.blog) {
      content.html = item.blog.html || item.description?.html;
      content.text = item.blog.text;
    }
  } else if (questionType === 'video') {
    // Video content transformation
    if (item.video) {
      content.url = item.video.url;
    }
  }
  
  // Extract previous practice data
  const previousPractice = item.practices && item.practices.length > 0 ? item.practices[0] : null;
  // Handle both selectedOptionId (direct) and selectedOption.id (nested) formats
  const previousSelectedOptionId = previousPractice?.selectedOptionId || previousPractice?.selectedOption?.id;
  const previousAnswer = previousSelectedOptionId 
    ? previousSelectedOptionId.toString()
    : previousPractice?.userAnswer || null;

  return {
    id: item.id.toString(),
    text: questionText,
    contentType: questionType,
    content,
    description: item.description,
    previousAnswer: previousAnswer, // Store previous answer for initialization
    previousPractice: previousPractice ? {
      selectedOptionId: previousSelectedOptionId,
      score: previousPractice.score,
      isCorrect: previousPractice.isCorrect,
    } : null,
  };
};

/**
 * Transforms the new API response structure to extract questions and practice data
 */
export const transformApiResponse = (response: ApiResponse | any) => {
  // Handle both new structure and potential old structure
  if (!response) {
    return {
      questions: [],
      practice: null,
      unit: null,
    };
  }
  
  // Check if it's the new structure
  if (response.success && response.data) {
    const { practice, unit } = response.data;
    
    // Transform content items to questions
    const questions = (unit?.content || []).map(transformContentItem);
    
    return {
      questions,
      practice: practice || null,
      unit: unit?.unit || null,
    };
  }
  
  // Fallback: try to extract from old structure
  const data = response.data || response;
  const contentArray = Array.isArray(data) ? data : (data?.content || []);
  
  return {
    questions: contentArray.map(transformContentItem),
    practice: null,
    unit: null,
  };
};

