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
  getChapters: {
    query: ({ page = 1, limit = 10, id }: { page?: number, limit?: number; id: string }) => ({
      url: SERVER_URL + "/org/chapter/" + id,
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
}

export const deleteEndpoints = {
  deleteCourse: {
    query: ({ id }: { id: number }) => ({
      url: SERVER_URL + "/org/course/" + id,
      method: "DELETE",
    }),
  }
}