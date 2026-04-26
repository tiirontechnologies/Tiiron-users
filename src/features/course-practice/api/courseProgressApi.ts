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
rateCourse: builder.mutation<
  {
    success: boolean;
    message: string;
    data: {
      id: number;
      value: number;
      review: string;
    };
  },
  { courseId: string; value: number | null; review?: string | null }
>({
  query: ({ courseId, value, review }) => ({
    url: `/course/${courseId}/rate`,
    method: "POST",
    body: {
      value,
      review,
    },
  }),
  invalidatesTags: ["Course"], 
}),

// get rating for course
getCourseRatings: builder.query<
  {
    success: boolean;
    data: {
      averageRating: number;
      totalRatings: number;
      ratings: Array<{
        id: number;
        value: number;
        review: string;
        userId: number;
        courseId: number;
        createdAt: string;
        user: {
          id: number;
          username: string;
          firstName: string;
          lastName: string;
        };
      }>;
    };
  },
  { courseId: string }
>({
  query: ({ courseId }) => ({
    url: `/course/${courseId}/ratings`,
    method: "GET",
  }),
  providesTags: ["Course"],
}),

// update ratings and get ratings by id 
getMyRating: builder.query<
  {
    success: boolean;
    data: {
      id: number;
      value: number;
      review: string;
    } | null;
  },
  { courseId: string }
>({
  query: ({ courseId }) => ({
    url: `/course/${courseId}/rating`,
    method: "GET",
  }),
  providesTags: ["Course"],
}),

updateRating: builder.mutation<
  {
    success: boolean;
    message: string;
    data: {
      id: number;
      value: number;
      review: string;
    };
  },
  { courseId: string; value: number; review?: string }
>({
  query: ({ courseId, value, review }) => ({
    url: `/course/${courseId}/ratings`,
    method: "PATCH",
    body: {
      value,
      review,
    },
  }),
  invalidatesTags: ["Course"],
}),
//   
  }),
});

export const {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
  useGetQuestionByIdQuery,
  useGetCodeLanguagesQuery,
  useGetPracticeProgressQuery,
  useRateCourseMutation,  
   useGetCourseRatingsQuery,
    useGetMyRatingQuery,
  useUpdateRatingMutation,
} = courseProgressApiSlice;


