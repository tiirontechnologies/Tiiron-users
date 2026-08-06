import { authApi } from '../../../api/api.routes';
import { TAuth } from '../../../types/auth.types';
import { IOrganisationRegister } from '../../../types/user.types';

// Auth API endpoints
export const authApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<any, TAuth>({
      query: (body) => ({
        url: '/signin/user',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            // Token is now stored in cookie by the backend, no need to store in localStorage
            // Only store roleId if needed for client-side checks
            if (data?.user?.roleId) {
              localStorage.setItem('roleId', data.user.roleId);
            }
          } else {
            throw new Error(data.message || 'Login failed');
          }
        } catch (error) {
          // console.error('Login error:', error);
          return error;
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Register organization endpoint
    registerOrganization: builder.mutation({
      query: (body: Omit<IOrganisationRegister, 'confirmPassword'> & {
        confirmPassword?: string;
      }) => ({
        url: '/register/organization',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Register user endpoint
    registerUser: builder.mutation({
      query: (body: Omit<IOrganisationRegister, 'confirmPassword'> & {
        confirmPassword?: string;
      }) => ({
        url: '/register/user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Logout endpoint
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/signout/user',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    // Sends a password-reset OTP and establishes the reset session cookie.
    requestPasswordReset: builder.mutation<
      { success: boolean; message: string },
      { email: string }
    >({
      query: (body) => ({
        url: '/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    // Verifies the OTP against the email and reset session cookie.
    verifyPasswordResetOtp: builder.mutation<
      { success: boolean; message: string },
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: '/verify-reset-otp',
        method: 'POST',
        body,
      }),
    }),

    // Resets the password using the verified httpOnly-cookie session.
    resetPassword: builder.mutation<
      { success: boolean; message: string },
      { password: string }
    >({
      query: (body) => ({
        url: '/reset-password',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterOrganizationMutation,
  useRegisterUserMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetOtpMutation,
  useResetPasswordMutation,
} = authApiSlice;
