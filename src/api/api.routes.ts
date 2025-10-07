import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_URL, SERVER_URL } from '../constants/constants';

// Base query with authentication and error handling
const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Enhanced base query with error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  
  // Handle invalid token (401 response)
  if (result.error?.status === 401) {
    const errorData = result.error.data as { message: string };
    
    // Check if the error response contains the "Invalid token" message
    if (errorData?.message === "Invalid token.") {
      // Handle the invalid token case
      localStorage.removeItem("token");
      
      // Redirect user to the login page
      window.location.href = "/login";
      
      // Return a custom error message
      return { error: new Error("Session expired. Please log in again.") };
    }
    
    // Optionally handle other 401 scenarios here
    return { error: new Error("Unauthorized access. Please log in again.") };
  }
  
  return result;
};

// Base API configuration
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Course', 'Chapter', 'Question', 'QuestionBank', 'Unit', 'Auth'],
  endpoints: (builder) => ({
    // Get course by course ID (alternative endpoint)
    getCourseByCourseId: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/org/course/${id}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),
    
    // Get chapters for a course
    getChapters: builder.query({
      query: ({ page = 1, limit = 10, id }: { page?: number; limit?: number; id: string }) => ({
        url: `/org/chapter/${id}`,
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['Chapter'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCourseByCourseIdQuery,
  useGetChaptersQuery,
} = baseApi;

// Auth API configuration
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});
