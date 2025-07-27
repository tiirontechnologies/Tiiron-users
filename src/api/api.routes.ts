import { BASE_URL } from "../constants/constants";

export const authEndpoints = {
    login: {
        query: ({ body }: { body: { username: string; password: string } }) => ({
            url: BASE_URL,
            body,
            method: "POST",
        }),
    },
}

export const getEndpoints = {
    getDummy: {
        query: ({ body }: { body: { username: string; password: string } }) => ({
            url: BASE_URL,
            body,
            method: "POST",
        }),
    },
}