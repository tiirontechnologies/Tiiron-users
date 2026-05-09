import { baseApi } from '../../../api/api.routes';

export interface UserProfile {
  id: number;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  headline: string | null;
  biography: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  youtube: string | null;
  language: string | null;
  picture: string | null;
  displayName: string | null;
}

export interface ProfileDetails {
  id: number;
  userId: number;
  headline: string | null;
  biography: string | null;
  language: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  youtube: string | null;
  picture?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data: {
    firstName: string | null;
    lastName: string | null;
    profile: ProfileDetails;
  };
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  headline?: string;
  biography?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  language?: string;
}

// User API endpoints
export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
 getProfiles: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: 'profile/user',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),

    // Update user profile
   updateProfile: builder.mutation<GetProfileResponse, UpdateProfileRequest>({
  query: (body) => ({
    url: 'profile/update/profile',
    method: 'PUT',
    body,
  }),
  invalidatesTags: ['Auth'],
}),

    // UPLOAD 
uploadProfileImage: builder.mutation<
  { success: boolean; message: string; imageUrl: string },
  FormData
>({
  query: (formData) => ({
    url: "profile/upload/image",
    method: "POST",
    body: formData,
  }),
  invalidatesTags: ["Auth"],
}),
    // CLOSE 
     removeProfileImage: builder.mutation<{ success: boolean; message: string },void>({
      query: () => ({
        url: "profile/upload/deleteImage",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProfilesQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation
} = userApiSlice;


