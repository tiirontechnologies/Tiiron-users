import { baseApi } from "../../../api/api.routes";

// ---------------- Types ----------------
export interface CommentUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string; // profile.picture se derive hota hai
}

export interface ReplyType {
  id: number;
  commentId: number; // hamesha ROOT comment ka id (flat Instagram-style list ke liye)
  userId: number;
  user: CommentUser;
  text: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  liked: boolean;
  replyingToUsername?: string; // agar ye kisi reply ka reply hai, to us reply wale ka username (for @mention)
}

export interface CommentType {
  id: number;
  courseId: number;
  userId: number;
  user: CommentUser;
  text: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  liked: boolean;
  replies: ReplyType[];
}

export type SortOption = "newest" | "oldest";

// ---------------- Raw backend shapes ----------------
interface RawUser {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  profile?: { picture: string | null };
}

interface RawComment {
  id: number;
  content: string;
  userId: number;
  courseId: number;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  liked?: boolean;
  user?: RawUser;
}

interface CommentApiEnvelope {
  success: boolean;
  message: string;
  data: RawComment[];
}

type RawCommentResponse = CommentApiEnvelope | RawComment[] | { comments: RawComment[] };

// ---------------- Helpers ----------------
const buildUser = (raw: RawComment): CommentUser => {
  const u = raw.user;
  const firstName = (u?.firstName ?? "").trim();
  const lastName = (u?.lastName ?? "").trim();
  const username = u?.username ?? `user${raw.userId}`;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || username;

  return {
    id: u?.id ?? raw.userId,
    username,
    firstName,
    lastName,
    fullName,
    avatar: u?.profile?.picture ?? "",
  };
};

// Backend arbitrary-depth parentId chain deta hai (reply ka reply bhi ho sakta hai).
// Instagram-style flat UI ke liye: har item ka ROOT comment dhoondo aur usi ke
// "replies" array me daal do — agar direct parent khud ek reply hai (root nahi),
// to uska username "replyingToUsername" me daal do taaki @mention dikha sakein.
const normalizeComments = (raw: RawComment[]): CommentType[] => {
  const byId = new Map<number, RawComment>();
  raw.forEach((item) => byId.set(item.id, item));

  const findRoot = (item: RawComment): RawComment => {
    let current = item;
    const visited = new Set<number>();
    while (current.parentId !== null && current.parentId !== undefined) {
      if (visited.has(current.id)) break; // safety: circular ref se bacho
      visited.add(current.id);
      const parent = byId.get(current.parentId);
      if (!parent) break;
      current = parent;
    }
    return current;
  };

  const roots = new Map<number, CommentType>();

  raw
    .filter((item) => item.parentId === null || item.parentId === undefined)
    .forEach((item) => {
      roots.set(item.id, {
        id: item.id,
        courseId: item.courseId,
        userId: item.userId,
        user: buildUser(item),
        text: item.content,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        likes: item.likes ?? 0,
        liked: item.liked ?? false,
        replies: [],
      });
    });

  const replies = raw
    .filter((item) => item.parentId !== null && item.parentId !== undefined)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  replies.forEach((item) => {
    const rootRaw = findRoot(item);
    const root = roots.get(rootRaw.id);
    if (!root) return; // root kabhi mila hi nahi (edge case), skip

    const directParent = byId.get(item.parentId as number);
    const isReplyToReply = !!directParent && directParent.id !== rootRaw.id;

    root.replies.push({
      id: item.id,
      commentId: rootRaw.id,
      userId: item.userId,
      user: buildUser(item),
      text: item.content,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      likes: item.likes ?? 0,
      liked: item.liked ?? false,
      replyingToUsername: isReplyToReply ? buildUser(directParent!).username : undefined,
    });
  });

  return Array.from(roots.values());
};

const unwrapRaw = (response: RawCommentResponse): RawComment[] => {
  if (Array.isArray(response)) return response;
  if ("data" in response && Array.isArray(response.data)) return response.data;
  if ("comments" in response && Array.isArray(response.comments)) return response.comments;
  return [];
};

// ---------------- Comment API endpoints ----------------
// Note: baseApi ke tagTypes array mein "Comment" add kar lena (jaise "Course", "Chapter" waghera add hain)
export const commentApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get comments for a course
    getCourseComments: builder.query<CommentType[], number>({
      query: (courseId: number) => ({
        url: `/comment/course/${courseId}`,
        method: "GET",
      }),
      transformResponse: (response: RawCommentResponse) => normalizeComments(unwrapRaw(response)),
      providesTags: ["Comment"],
    }),

    // Create comment (top-level) ya reply (parentId diya to — kisi comment ya kisi reply, dono chalega)
    createComment: builder.mutation<
      CommentType,
      { courseId: number; text: string; parentId?: number }
    >({
      query: ({ courseId, text, parentId }) => ({
        url: `/comment/course/${courseId}`,
        method: "POST",
        body: parentId ? { content: text, parentId } : { content: text },
      }),
      invalidatesTags: ["Comment"],
    }),

    // Update comment
    updateComment: builder.mutation<
      CommentType,
      { commentId: number; courseId: number; text: string }
    >({
      query: ({ commentId, text }) => ({
        url: `/comment/${commentId}`,
        method: "PATCH",
        body: { content: text },
      }),
      async onQueryStarted({ commentId, text, courseId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentApiSlice.util.updateQueryData("getCourseComments", courseId, (draft: CommentType[]) => {
            const target = draft.find((c) => c.id === commentId);
            if (target) {
              target.text = text;
              return;
            }
            for (const c of draft) {
              const reply = c.replies.find((r) => r.id === commentId);
              if (reply) {
                reply.text = text;
                break;
              }
            }
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

    // Delete comment
    deleteComment: builder.mutation<void, { commentId: number; courseId: number }>({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ commentId, courseId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentApiSlice.util.updateQueryData("getCourseComments", courseId, (draft: CommentType[]) => {
            const idx = draft.findIndex((c) => c.id === commentId);
            if (idx !== -1) {
              draft.splice(idx, 1);
              return;
            }
            for (const c of draft) {
              const rIdx = c.replies.findIndex((r) => r.id === commentId);
              if (rIdx !== -1) {
                c.replies.splice(rIdx, 1);
                break;
              }
            }
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
  }),
});

// Export hooks
export const {
  useGetCourseCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;