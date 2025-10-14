import { baseApi } from '../../../api/api.routes';

export interface VideoContentDescription {
  html?: string;
  css?: string;
  title?: string;
  difficulty?: string;
  // Allow additional metadata keys if backend adds more
  [key: string]: unknown;
}

export interface CreateVideoContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 6 for Video
  contentTypeId: number; // e.g., 1
  description: VideoContentDescription;
  title: string;
  url: string; // video url (e.g., YouTube)
  duration: number; // seconds
}

export interface McqOptionPayload {
  text: string;
  isCorrect: boolean;
}

export interface CreateMcqContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 1 for MCQ
  contentTypeId: number; // e.g., 2
  description: VideoContentDescription; // reuse structure for rich text/meta
  options: McqOptionPayload[];
}

export interface CreateFillUpContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 3 for Fill Up
  contentTypeId: number; // e.g., 4
  description: VideoContentDescription; // reuse structure for rich text/meta
}

export interface CreateBlogContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 5 for Blog
  contentTypeId: number; // e.g., 5
  description: VideoContentDescription; // metadata like title, tags, author
  html: string; // full HTML content
}

export interface CreateSubjectiveContentPayload {
  unitId: number;
  quesTypeId: number; // e.g., 4 for Subjective/Assignment
  contentTypeId: number; // e.g., 3
  description: VideoContentDescription;
  question: string;
}

// Content API endpoints for course/unit content (not question bank)
export const contentApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create content for a unit (video content)
    createVideoContent: builder.mutation<
      unknown,
      { body: CreateVideoContentPayload }
    >({
      query: ({ body }) => {
        console.log("🌐 API Call: Creating video content", body);
        return {
          url: '/content/with-type',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (MCQ content)
    createMcqContent: builder.mutation<
      unknown,
      { body: CreateMcqContentPayload }
    >({
      query: ({ body }) => {
        console.log("🌐 API Call: Creating MCQ content", body);
        return {
          url: '/content/with-type',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Fill-Up content)
    createFillUpContent: builder.mutation<
      unknown,
      { body: CreateFillUpContentPayload }
    >({
      query: ({ body }) => ({
        url: '/content/with-type',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Blog content)
    createBlogContent: builder.mutation<
      unknown,
      { body: CreateBlogContentPayload }
    >({
      query: ({ body }) => ({
        url: '/content/with-type',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question', 'Unit'],
    }),

    // Create content for a unit (Subjective/Assignment content)
    createSubjectiveContent: builder.mutation<
      unknown,
      { body: CreateSubjectiveContentPayload }
    >({
      query: ({ body }) => ({
        url: '/content/with-type',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question', 'Unit'],
    }),
  }),
});

export const { 
  useCreateVideoContentMutation, 
  useCreateMcqContentMutation, 
  useCreateFillUpContentMutation, 
  useCreateBlogContentMutation, 
  useCreateSubjectiveContentMutation 
} = contentApiSlice;


