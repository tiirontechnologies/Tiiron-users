import { baseApi } from "../../../api/api.routes";

// Practice session data types
export interface PracticeSessionData {
  questions: Array<{
    questionId: number;
    questionTypeId?: number;
    selectedOptionId?: number | number[];
    answer?: string;
    timeSpent: number;
  }>;
  totalTimeSpent: number;
}

export interface PracticeSession {
  id?: string;
  courseId: string;
  unitId: string;
  userId: string;
  sessionData: PracticeSessionData;
  score: number;
  totalQuestions: number;
  completedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PracticeAnalytics {
  totalSessions: number;
  averageScore: number;
  totalTimeSpent: number;
  bestScore: number;
  lastPracticeDate: string;
  improvementTrend: "up" | "down" | "stable";
}

export interface PracticeHistory {
  sessions: PracticeSession[];
  analytics: PracticeAnalytics;
}

// Practice API endpoints
export const practiceApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitPracticeBulk: builder.mutation<
      { success: boolean; message?: string },
      PracticeSessionData
    >({
      query: (practiceData) => ({
        url: "practice/submit-bulk",
        method: "POST",
        body: practiceData,
      }),
      invalidatesTags: ["PracticeSession", "Unit", "Progress"], // Invalidate Unit to refetch content with updated practice data
    }),

    submitPracticeSingle: builder.mutation<
      { 
         success: boolean;
         score: number;
         isCorrect: boolean;
         correctAnswer?: string | number | number[]; 
         message?: string;
      },
      {
        questionId: number;
        selectedOptionId?: number | number[];
        userAnswer?: string;
        timeSpent?: number;
      }
    >({
      query: (data) => ({
        url: "practice/submit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PracticeSession", "Unit", "Progress"],
    }),

    // Save practice session data
    savePracticeSession: builder.mutation<
      { success: boolean; sessionId: string },
      {
        courseId: string;
        unitId: string;
        sessionData: PracticeSessionData;
        score: number;
        totalQuestions: number;
      }
    >({
      query: ({ courseId, unitId, sessionData, score, totalQuestions }) => ({
        url: "/practice/session",
        method: "POST",
        body: {
          courseId,
          unitId,
          sessionData,
          score,
          totalQuestions,
          completedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["PracticeSession"],
    }),

    // Save practice progress in real-time (for auto-save)
    savePracticeProgress: builder.mutation<
      { success: boolean },
      {
        sessionId?: string;
        courseId: string;
        unitId: string;
        currentQuestionIndex: number;
        userAnswers: Record<string, string | string[]>;
        timeSpent: number;
      }
    >({
      query: (data) => ({
        url: "/practice/progress",
        method: "POST",
        body: {
          ...data,
          updatedAt: new Date().toISOString(),
        },
      }),
    }),

    // Get practice history for a course/unit
    getPracticeHistory: builder.query<
      PracticeHistory,
      { courseId: string; unitId?: string }
    >({
      query: ({ courseId, unitId }) => ({
        url: `/practice/history/${courseId}${unitId ? `/${unitId}` : ""}`,
        method: "GET",
      }),
      providesTags: ["PracticeSession"],
    }),

    // Get specific practice session
    getPracticeSession: builder.query<PracticeSession, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `/practice/session/${sessionId}`,
        method: "GET",
      }),
      providesTags: ["PracticeSession"],
    }),

    // Get practice analytics
    getPracticeAnalytics: builder.query<
      PracticeAnalytics,
      { courseId: string; unitId?: string }
    >({
      query: ({ courseId, unitId }) => ({
        url: `/practice/analytics/${courseId}${unitId ? `/${unitId}` : ""}`,
        method: "GET",
      }),
      providesTags: ["PracticeSession"],
    }),

    // Start a new practice session
    startPracticeSession: builder.mutation<
      { sessionId: string; success: boolean },
      { courseId: string; unitId: string }
    >({
      query: ({ courseId, unitId }) => ({
        url: "/practice/session/start",
        method: "POST",
        body: {
          courseId,
          unitId,
          startedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["PracticeSession"],
    }),

    // Resume a practice session
    resumePracticeSession: builder.mutation<
      { sessionId: string; sessionData: PracticeSessionData },
      { sessionId: string }
    >({
      query: ({ sessionId }) => ({
        url: `/practice/session/${sessionId}/resume`,
        method: "POST",
      }),
    }),

    // Delete practice session
    deletePracticeSession: builder.mutation<
      { success: boolean },
      { sessionId: string }
    >({
      query: ({ sessionId }) => ({
        url: `/practice/session/${sessionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PracticeSession"],
    }),

    // Get practice leaderboard (if applicable)
    getPracticeLeaderboard: builder.query<
      Array<{
        userId: string;
        userName: string;
        score: number;
        timeSpent: number;
        rank: number;
      }>,
      { courseId: string; unitId?: string }
    >({
      query: ({ courseId, unitId }) => ({
        url: `/practice/leaderboard/${courseId}${unitId ? `/${unitId}` : ""}`,
        method: "GET",
      }),
      providesTags: ["PracticeSession"],
    }),

    //run against custom testcase
    codeRun: builder.mutation<any, { questionId: number | string; code: string; testcases: any[]; languageId: number }>({
      query: ({ questionId, code, testcases, languageId }) => ({
        url: "/practice/code/run",
        method: "POST",
        body: {
          questionId,
          code,
          testCases: testcases,
          languageId,
        },
      }),
    }),

    // Test code submission endpoint
    testCodeSubmission: builder.mutation<
      {
        success: boolean;
        data?: {
          passed: number;
          failed: number;
          total: number;
          testCases: Array<{
            testCaseId: number;
            passed: boolean;
            input?: any;
            expectedOutput?: string;
            actualOutput?: string;
            error?: string;
            executionTime?: number;
          }>;
        };
        message?: string;
      },
      {
        questionId: number;
        sourceCode: string;
        languageId: number;
      }
    >({
      query: (payload) => ({
        url: "/question/code/test-all",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Question", "Progress", "PracticeSession"],
    }),
  }),
});

// Export hooks for use in components
export const {
  useSubmitPracticeBulkMutation, // ✨ NEW
  useSubmitPracticeSingleMutation, // ✨ NEW
  useSavePracticeSessionMutation,
  useSavePracticeProgressMutation,
  useGetPracticeHistoryQuery,
  useGetPracticeSessionQuery,
  useGetPracticeAnalyticsQuery,
  useStartPracticeSessionMutation,
  useResumePracticeSessionMutation,
  useDeletePracticeSessionMutation,
  useGetPracticeLeaderboardQuery,
  useCodeRunMutation,
  useTestCodeSubmissionMutation
} = practiceApiSlice;
