import { baseApi } from '../../../api/api.routes';
import { ApiQuestion } from '../../coding-question/types';

// Old codebase endpoints used by Course Progress
// - GET /org/student/chapter/course/:id -> course with chapters/units for student
// - GET /content/course/2/unit/:unitId -> questions for a unit

export const courseProgressApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonAndTopicByCourseId: builder.query<{ data?: any } | any, { id: string }>({
      query: ({ id }) => ({
        url: `course/${id}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),

    getContentByTopicId: builder.query<{ data?: any } | any, { unitId: string, courseId: string }>({
      query: ({ courseId, unitId }) => ({
        url: `/practice/course/${courseId}/unit/${unitId}`,
        method: 'GET',
      }),
      providesTags: ['Unit'],
    }),

    getPracticeProgress: builder.query<{ data?: any } | any, { courseId: string }>({
      query: ({ courseId }) => ({
        url: `/practice/course/${courseId}/progress`,
        method: 'GET',
      }),
      providesTags: ['Progress'],
    }),

    getQuestionById: builder.query<ApiQuestion, { questionId: string, courseId: string }>({
      query: ({ courseId, questionId }) => ({
        url: `/practice/course/${courseId}/question/${questionId}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: ApiQuestion } | ApiQuestion) => {
        if ('data' in response && response.data) {
          return response.data;
        }
        return response as ApiQuestion;
      },
      providesTags: ['Question'],
    }),


    // Get available programming languages
    getCodeLanguages: builder.query<
      {
        success: boolean;
        data?: Array<{
          id: number;
          name: string;
          value?: string;
          label?: string;
        }>;
      },
      void
    >({
      query: () => ({
        url: '/question/code/languages',
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),
  }),
});

export const {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
  useGetQuestionByIdQuery,
  useGetCodeLanguagesQuery,
  useGetPracticeProgressQuery,
} = courseProgressApiSlice;


