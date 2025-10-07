import { baseApi } from '../../../api/api.routes';

// Chapter API endpoints
export const chapterApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get chapters for a course with pagination
    getChapters: builder.query({
      query: ({ page = 1, limit = 10, id }: { page?: number; limit?: number; id: string }) => ({
        url: `/org/chapter/${id}`,
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['Chapter'],
    }),
    
    // Get units with questions for a specific unit
    getUnitsWithQuestions: builder.query({
      query: ({ unitId }: { unitId: string }) => ({
        url: `/content/course/2/unit/${unitId}`,
        method: 'GET',
      }),
      providesTags: ['Unit'],
    }),
    
    // Create chapter
    createChapter: builder.mutation({
      query: ({ body }: { body: { title: string; courseId: number } }) => ({
        url: '/org/chapter',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Chapter'],
    }),
    
    // Update chapter
    updateChapter: builder.mutation({
      query: ({ id, body }: { id: number; body: { title: string; courseId: number } }) => ({
        url: `/org/chapter/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Chapter'],
    }),
    
    // Delete chapter
    deleteChapter: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/org/chapter/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chapter'],
    }),
    
    // Create unit
    createUnit: builder.mutation({
      query: ({ body }: { body: { title: string; content: string; chapterId: number } }) => ({
        url: '/org/unit',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Unit'],
    }),
    
    // Update unit
    updateUnit: builder.mutation({
      query: ({ id, body }: { id: number; body: { title: string; content: string; chapterId: number } }) => ({
        url: `/org/unit/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Unit'],
    }),
    
    // Delete unit
    deleteUnit: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/org/unit/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Unit'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetChaptersQuery,
  useGetUnitsWithQuestionsQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = chapterApiSlice;
