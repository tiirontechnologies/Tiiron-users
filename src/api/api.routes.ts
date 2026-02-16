/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../config/env';

// Base query with authentication and error handling
// Cookies are automatically sent by the browser, no need to manually set Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: ENV.SERVER_URL,
  credentials: 'include', // Include cookies in requests
});

// Enhanced base query with error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  
  // Handle invalid token (401 response)
  // Return serializable error objects (not Error instances) so Redux doesn't warn about non-serializable payloads
  if (result.error?.status === 401) {
    const errorData = result.error.data as { message: string };
    
    // Check if the error response contains the "Invalid token" message
    if (errorData?.message === "Invalid token.") {
      // Handle the invalid token case
      // Cookies will be cleared by the backend or browser
      
      // Redirect user to the login page
      window.location.href = "/login";
      
      // Return a serializable error (matches FetchBaseQueryError shape)
      return {
        error: {
          status: 401,
          data: { message: "Session expired. Please log in again." },
          error: "Session expired",
        },
      };
    }
    
    // Optionally handle other 401 scenarios here
    return {
      error: {
        status: 401,
        data: { message: "Unauthorized access. Please log in again." },
        error: "Unauthorized",
      },
    };
  }
  
  return result;
};

// Base API configuration
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Course', 'Chapter', 'Question', 'QuestionBank', 'Unit', 'Auth', 'Cart', 'Enrollment','PracticeSession','Progress'],
  endpoints: (builder) => ({
    // Check authentication status
    checkAuth: builder.query<{ success: boolean }, void>({
      query: () => ({
        url: '/profile/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCheckAuthQuery,
} = baseApi;

// Auth API configuration
// Cookies are automatically sent by the browser, no need to manually set Authorization header
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.AUTH_URL,
    credentials: 'include', // Include cookies in requests
  }),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});
