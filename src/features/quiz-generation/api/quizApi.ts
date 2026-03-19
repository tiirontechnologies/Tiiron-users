import { baseApi } from "../../../api/api.routes";
import { GenerateQuizRequest, GenerateQuizResponse } from "../types";

export const quizApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateQuiz: builder.mutation<GenerateQuizResponse, GenerateQuizRequest>({
      query: (payload) => ({
        url: "/question-generation/generate",
        method: "POST",
        body: payload,
      }),
    }),
    submitQuizQuestion: builder.mutation<
      {
        success: boolean;
        message: string;
        data: { id: number; isCorrect: boolean; correctOptionId: number };
      },
      { questionId: number; selectedOptionId: number }
    >({
      query: (payload) => ({
        url: "/question-generation/submit",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGenerateQuizMutation, useSubmitQuizQuestionMutation } = quizApiSlice;
