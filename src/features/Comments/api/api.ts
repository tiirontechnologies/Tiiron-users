import { baseApi } from "../../../api/api.routes";

// ---------------- Types ----------------
export interface RawUser {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  profile?: { picture: string | null } | null;
}

export interface RawComment {
  id: number;
  content: string;
  userId: number;
  courseId: number;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  likesCount?: number;
  isLiked?: boolean;
  user: RawUser;
}

export interface CommentApiEnvelope {
  success: boolean;
  message: string;
  data: RawComment[];
}

export type SortOption = "newest" | "oldest";

// ---------------- Comment API endpoints ----------------
export const commentApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get comments for a course - ab seedha envelope hi return hoga, no transform
    getCourseComments: builder.query<CommentApiEnvelope, number>({
      query: (courseId: number) => ({
        url: `/comment/course/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),

    createComment: builder.mutation<
      RawComment,
      { courseId: number; text: string; parentId?: number }
    >({
      query: ({ courseId, text, parentId }) => ({
        url: `/comment/course/${courseId}`,
        method: "POST",
        body: parentId ? { content: text, parentId } : { content: text },
      }),
      invalidatesTags: ["Comment"],
    }),

    updateComment: builder.mutation<
      RawComment,
      { commentId: number; courseId: number; text: string }
    >({
      query: ({ commentId, text }) => ({
        url: `/comment/${commentId}`,
        method: "PATCH",
        body: { content: text },
      }),
      async onQueryStarted({ commentId, text, courseId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentApiSlice.util.updateQueryData("getCourseComments", courseId, (draft) => {
            const target = draft.data.find((c) => c.id === commentId);
            if (target) target.content = text;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Comment"],
    }),

    deleteComment: builder.mutation<void, { commentId: number; courseId: number }>({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ commentId, courseId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentApiSlice.util.updateQueryData("getCourseComments", courseId, (draft) => {
            const idx = draft.data.findIndex((c) => c.id === commentId);
            if (idx !== -1) draft.data.splice(idx, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Comment"],
    }),

    likeComment: builder.mutation<
      { liked: boolean; likes: number },
      { commentId: number; courseId: number }
    >({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}/like`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} = commentApiSlice;