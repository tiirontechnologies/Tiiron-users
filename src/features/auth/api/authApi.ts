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

  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterOrganizationMutation,
  useRegisterUserMutation,
} = authApiSlice;
