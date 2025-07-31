import { IOrganisationRegister } from "types/user.types";
import { AUTH_URL, BASE_URL } from "../constants/constants";
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
  getDummy: {
    query: ({ body }: { body: TAuth }) => ({
      url: BASE_URL,
      body,
      method: "POST",
    }),
  },
};

