import { baseApi } from '../../../api/api.routes';

// Course API endpoints
export const courseApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get courses with pagination
    getCourses: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: '/org/course',
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['Course'],
    }),
    
    // Get course by ID
    getCourseById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/org/course/${id}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),
    
    // Get course for student (with units and questions)
    getCourseForStudent: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/org/student/chapter/course/${id}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),
    
    // Create course
    createCourse: builder.mutation({
      query: ({ body }: { body: FormData }) => ({
        url: '/org/course',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Course'],
    }),
    
    // Update course
    updateCourse: builder.mutation({
      query: ({ id, body }: { id: number; body: FormData }) => ({
        url: `/org/course/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Course'],
    }),
    
    // Delete course
    deleteCourse: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/org/course/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCourseForStudentQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApiSlice;
