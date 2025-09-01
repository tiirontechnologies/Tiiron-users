import { IOrganisationRegister } from "types/user.types";
import { AUTH_URL, SERVER_URL } from "../constants/constants";
import { TAuth } from "types/auth.types";

export const authEndpoints = {
  login: {
    query: ({ body }: { body: TAuth }) => ({
      url: AUTH_URL + "/login",
      body,
      method: "POST",
    }),
  },
  registerOrganization: {
    query: ({
      body,
    }: {
      body: Omit<IOrganisationRegister, "confirmPassword"> & {
        confirmPassword?: string;
      };
    }) => ({
      url: AUTH_URL + "/register/organization",
      body,
      method: "POST",
    }),
  },
  registerUser: {
    query: ({
      body,
    }: {
      body: Omit<IOrganisationRegister, "confirmPassword"> & {
        confirmPassword?: string;
      };
    }) => ({
      url: AUTH_URL + "/register/user",
      body,
      method: "POST",
    }),
  },
};

export const getEndpoints = {
  getCourse: {
    query: ({ page = 1, limit = 10 }: { page?: number, limit?: number }) => ({
      url: SERVER_URL + "/org/course",
      method: "GET",
      params: { page, limit }
    }),
  },
  getQuestionBanks: {
    query: ({ page = 1, limit = 10 }: { page?: number, limit?: number }) => ({
      url: SERVER_URL + "/org/question-bank",
      method: "GET",
      params: { page, limit }
    }),
  },
  getChapters: {
    query: ({ page = 1, limit = 10, id }: { page?: number, limit?: number; id: string }) => ({
      url: SERVER_URL + "/org/chapter/" + id,
      method: "GET",
      params: { page, limit }
    }),
  },
  getCourseByCourseId: {
    query: ({ id }: { id: string }) => ({
      url: SERVER_URL + "/org/course/" + id,
      method: "GET",
    }),
  },
  /**
   * @description
   * This API is for student to read and practice question of a course;
   */
  getCourseForStudent: {
    query: ({ id }: { id: string }) => ({
      url: SERVER_URL + "/student/course/" + id,
      method: "GET",
    }),
  },
  /**
   * @description
   * This API is for student to read and practice question of a unit
   * This API fetches the Units;
   */
  getUnitsWithQuestions: {
    query: ({ unitId }: { unitId: string }) => ({
      url: SERVER_URL + "/student/unit",
      method: "GET",
      params: { unitId }
    }),
  },
  /**
   * @description
   * This API is retrieve all questions of a organization
   * This API fetches the questions;
   */
  getAllQuestions: {
    query: ({ page = 1, limit = 10, questionBankId }: { page?: number, limit?: number, questionBankId?: number }) => ({
      url: SERVER_URL + "/org/question",
      method: "GET",
      params: { page, limit, ...(questionBankId && { questionBankId }) }
    }),
  },
  getQuestionBankById: {
    query: ({ id }: { id: number }) => ({
      url: SERVER_URL + "/org/question-bank/" + id,
      method: "GET",
    }),
  },
  getQuestionBankQuestions: {
    query: ({ id, page = 1, limit = 10 }: { id: number, page?: number, limit?: number }) => ({
      url: SERVER_URL + "/org/question-bank/" + id + "/questions-list",
      method: "GET",
      params: { page, limit }
    }),
  },
};

export const addEndpoints = {
  createCourse: {
    query: ({ body }: { body: FormData }) => ({
      url: SERVER_URL + "/org/course",
      body,
      method: "POST",
    }),
  },
  createChapter: {
    query: ({ body }: { body: { title: string, courseId: number } }) => ({
      url: SERVER_URL + "/org/chapter",
      body,
      method: "POST",
    }),
  },
  createUnit: {
    query: ({ body }: { body: { title: string, content: string; chapterId: number } }) => ({
      url: SERVER_URL + "/org/unit",
      body,
      method: "POST",
    }),
  },
  createQuestion: {
    query: ({ body }: { body: { text: string; type: string; questionBankId: number; score: number; options?: { text: string; isCorrect: boolean }[]; correctAnswer?: string } }) => ({
      url: SERVER_URL + "/org/question",
      body,
      method: "POST",
    }),
  },
  createQuestionBank: {
    query: ({ body }: { body: { name: string; description: string; tags: string[] } }) => ({
      url: SERVER_URL + "/org/question-bank",
      body,
      method: "POST",
    }),
  },
}

export const updateEndpoints = {
  updateQuestionBank: {
    query: ({ id, body }: { id: number; body: { name: string; description: string; tags: string[] } }) => ({
      url: SERVER_URL + "/org/question-bank/" + id,
      body,
      method: "PUT",
    }),
  },
  updateQuestion: {
    query: ({ id, body }: { id: number; body: { text: string; type: string; questionBankId: number; score: number; options?: { text: string; isCorrect: boolean }[]; correctAnswer?: string } }) => ({
      url: SERVER_URL + "/org/question/" + id,
      body,
      method: "PUT",
    }),
  },
}

export const deleteEndpoints = {
  deleteCourse: {
    query: ({ id }: { id: number }) => ({
      url: SERVER_URL + "/org/course/" + id,
      method: "DELETE",
    }),
  },
  deleteQuestionBank: {
    query: ({ id }: { id: number }) => ({
      url: SERVER_URL + "/org/question-bank/" + id,
      method: "DELETE",
    }),
  },
  deleteQuestion: {
    query: ({ id }: { id: number }) => ({
      url: SERVER_URL + "/org/question/" + id,
      method: "DELETE",
    }),
  }
}