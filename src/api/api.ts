// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants/constants';
import { authEndpoints } from './api.routes';

// Define a service using a base URL and expected endpoints
const baseUrl = BASE_URL;
const TAGS = [] as const;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`); // Add Authorization header
        }
        return headers;
    },
});
export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: TAGS,
    endpoints: (builder) => ({
        authLogin: builder.mutation({
            ...authEndpoints.login,
        })
    }),
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        authLogin: builder.mutation({
            ...authEndpoints.login,
        }),
        registerOrganization: builder.mutation({
            ...authEndpoints.registerOrganization,
        }),
        registerUser: builder.mutation({
            ...authEndpoints.registerUser,
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { } = api;
export const { 
    useRegisterOrganizationMutation,
    useRegisterUserMutation,
 } = authApi;