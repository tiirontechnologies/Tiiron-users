import { Question, QuestionType } from '../types';

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
  if (normalized.includes('coding') || normalized.includes('code')) {
    return 'coding';
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
  } else if (questionTypeId === 7) {
    contentType = 'coding';
  } else {
    // Fallback to name-based mapping
    contentType = mapQuestionType(questionTypeName);
  }

  // Build content object based on question type
  const content: any = {};

  if (contentType === 'mcq' || contentType === 'single_choice') {
    // Transform MCQ options
    if (apiQuestion.mcq?.options && Array.isArray(apiQuestion.mcq.options)) {
      // Handle cases where isCorrect might not be present (if question not practiced)
      content.options = apiQuestion.mcq.options.map((option: any) => ({
        id: option.id,
        text: option.text,
        // Only set isCorrect if it exists in the API response (for practiced questions)
        // If not practiced, isCorrect will be undefined
        isCorrect: option.hasOwnProperty('isCorrect') ? option.isCorrect : undefined,
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
    // Video content transformation - check for video object or extract from description
    content.url = apiQuestion.video?.url || apiQuestion.videoUrl || apiQuestion.url || '';
    
    // Try to extract YouTube URL from description if not found
    if (!content.url && apiQuestion.description) {
      const urlMatch = apiQuestion.description.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
      );
      if (urlMatch) {
        content.url = apiQuestion.description;
      }
    }
  }

  // Attach practice data if available
  let previousPractice = undefined;
  
  // Check if there's a practices array and get the most recent one
  if (apiQuestion.practices && Array.isArray(apiQuestion.practices) && apiQuestion.practices.length > 0) {
    // Get the most recent practice (assuming they're sorted by date, or take the last one)
    const latestPractice = apiQuestion.practices[apiQuestion.practices.length - 1];
    previousPractice = {
      id: latestPractice.id,
      questionId: latestPractice.questionId,
      userId: latestPractice.userId,
      userAnswer: latestPractice.userAnswer,
      isCorrect: latestPractice.isCorrect,
      score: latestPractice.score,
      timeSpent: latestPractice.timeSpent,
      createdAt: latestPractice.createdAt,
      updatedAt: latestPractice.updatedAt,
      selectedOptionIndex: latestPractice.selectedOptionIndex,
      selectedOptionId: latestPractice.selectedOptionId,
    };
  }
  // Also check if selectedOptionId is directly on the question (alternative API structure)
  else if (apiQuestion.selectedOptionId !== undefined) {
    // Create a practice object from direct fields on the question
    previousPractice = {
      id: 0,
      questionId: apiQuestion.id,
      userId: 0,
      userAnswer: null,
      isCorrect: apiQuestion.isCorrect || false,
      score: apiQuestion.score || 0,
      timeSpent: null,
      createdAt: '',
      updatedAt: '',
      selectedOptionIndex: null,
      selectedOptionId: apiQuestion.selectedOptionId,
    };
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
    previousPractice,
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

