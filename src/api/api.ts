// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_URL, BASE_URL } from '../constants/constants';
import { addEndpoints, authEndpoints, deleteEndpoints, getEndpoints } from './api.routes';
import { TAuth } from 'types/auth.types';

// Define a service using a base URL and expected endpoints
const baseUrl = BASE_URL;
const TAGS = ["Course", "Chapter"] as const;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`); // Add Authorization header
        }
        return headers;
    },
});
export const api = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        // Handle invalid token (401 response)
        if (result.error?.status === 401) {
            const errorData = result.error.data as {
                message: string;
            };
            // Check if the error response contains the "Invalid token" message
            if (errorData?.message === "Invalid token.") {
                // Handle the invalid token case
                localStorage.removeItem("token"); // Remove token from local storage
                api.dispatch(localStorage.clear()); // Dispatch logout action to clear user state (optional)

                // Redirect user to the login page
                window.location.href = "/sign-in"; // Or use router.push('/login') if using react-router

                // Return a custom error message
                return { error: new Error("Session expired. Please log in again.") };
            }

            // Optionally handle other 401 scenarios here
            return { error: new Error("Unauthorized access. Please log in again.") };
        }

        return result;
    },
    tagTypes: TAGS,
    endpoints: (builder) => ({
        getCourse: builder.query({
            ...getEndpoints.getCourse,
            providesTags: ["Course"]
        }),
        getChapters: builder.query({
            ...getEndpoints.getChapters,
            providesTags: ["Chapter"]
        }),
        getCourseByCourseId: builder.query({
            ...getEndpoints.getCourseByCourseId,
            providesTags: ["Course"]
        }),
        getCourseForStudent: builder.query({
            ...getEndpoints.getCourseForStudent,
        }),
        getUnitsWithQuestions: builder.query({
            ...getEndpoints.getUnitsWithQuestions,
        }),
        createCourse: builder.mutation({
            ...addEndpoints.createCourse,
            invalidatesTags: ["Course"]
        }),
        createChapter: builder.mutation({
            ...addEndpoints.createChapter,
            invalidatesTags: ["Chapter"]
        }),
        createUnit: builder.mutation({
            ...addEndpoints.createUnit,
            invalidatesTags: ["Chapter"]
        }),
        deleteCourse: builder.mutation({
            ...deleteEndpoints.deleteCourse,
            invalidatesTags: ["Course"]
        }),
    }),
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        authLogin: builder.mutation<any, TAuth>({
            query: (body) => ({
                url: AUTH_URL + "/signin/user",
                method: "POST",
                body,
            }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success && data?.user?.token) {
                        localStorage.setItem("token", data?.user?.token);
                    } else {
                        throw new Error(data.message || "Login failed");
                    }
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
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
export const {
    useGetCourseQuery,                          // Get Query
    useGetChaptersQuery,
    useGetCourseByCourseIdQuery,
    useGetCourseForStudentQuery,
    useGetUnitsWithQuestionsQuery,
    useCreateCourseMutation,                    // POST / Add QUERY
    useCreateChapterMutation,                   
    useCreateUnitMutation,
    useDeleteCourseMutation,                    // Delete Query
} = api;
export const {
    useAuthLoginMutation,
    useRegisterOrganizationMutation,
    useRegisterUserMutation,
} = authApi;