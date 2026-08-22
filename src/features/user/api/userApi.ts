// import { baseApi } from '../../../api/api.routes';

// export interface UserProfile {
//   id: number;
//   email: string;
//   username: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   headline: string | null;
//   biography: string | null;
//   website: string | null;
//   facebook: string | null;
//   instagram: string | null;
//   linkedin: string | null;
//   twitter: string | null;
//   youtube: string | null;
//   github: string | null;
//   leetcode: string | null;
//   hackerrank: string | null;
//   collage: string | null;
//   language: string | null;
//   picture: string | null;
//   displayName: string | null;
// }

// export interface ProfileDetails {
//   id: number;
//   userId: number;
//   headline: string | null;
//   biography: string | null;
//   language: string | null;
//   website: string | null;
//   facebook: string | null;
//   instagram: string | null;
//   linkedin: string | null;
//   twitter: string | null;
//   youtube: string | null;
//   github: string | null;
//   leetcode: string | null;
//   hackerrank: string | null;
//   collage: string | null;
//   picture?: string | null;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface GetProfileResponse {
//   success: boolean;
//   message: string;
//   data: {
//     firstName: string | null;
//     lastName: string | null;
//     profile: ProfileDetails;
//   };
// }

// export interface UpdateProfileRequest {
//   firstName?: string;
//   lastName?: string;
//   headline?: string;
//   biography?: string;
//   website?: string;
//   facebook?: string;
//   instagram?: string;
//   linkedin?: string;
//   twitter?: string;
//   youtube?: string;
//   github?: string;
//   leetcode?: string;
//   hackerrank?: string;
//   collage?: string;
//   language?: string;
// }

// export interface UploadImageResponse {
//   success: boolean;
//   message: string;
//   imageUrl: string;
// }

// export interface RemoveImageResponse {
//   success: boolean;
//   message: string;
// }

// // User API endpoints
// export const userApiSlice = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get user profile
//     getProfiles: builder.query<GetProfileResponse, void>({
//       query: () => ({
//         url: 'profile/user',
//         method: 'GET',
//       }),
//       providesTags: ['Auth'],
//     }),

//     // Update user profile
//     updateProfile: builder.mutation<GetProfileResponse, UpdateProfileRequest>({
//       query: (body) => ({
//         url: 'profile/update/profile',
//         method: 'PUT',
//         body,
//       }),
//       invalidatesTags: ['Auth'],
//     }),

//     // Upload profile image
//     uploadProfileImage: builder.mutation<UploadImageResponse, FormData>({
//       query: (formData) => ({
//         url: 'profile/upload/image',
//         method: 'POST',
//         body: formData,
//       }),
//       invalidatesTags: ['Auth'],
//     }),

//     // Remove profile image
//     removeProfileImage: builder.mutation<RemoveImageResponse, void>({
//       query: () => ({
//         url: 'profile/upload/deleteImage',
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Auth'],
//     }),


// getMyEnrollments: builder.query<any, { page?: number; limit?: number }>({
//   query: ({ page = 1, limit = 10 } = {}) => ({
//     url: "enrollment/my-enrollments",
//     method: "GET",
//     params: {
//       page,
//       limit,
//     },
//   }),
//   providesTags: ["Auth"],
// }),



//   }),
// });

// // Export hooks for usage in functional components
// export const {
//   useGetProfilesQuery,
//   useUpdateProfileMutation,
//   useUploadProfileImageMutation,
//   useRemoveProfileImageMutation,
//     useGetMyEnrollmentsQuery,
// } = userApiSlice;



import { baseApi } from '../../../api/api.routes';

// =========================
// User Profile Types
// =========================

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
  github: string | null;
  leetcode: string | null;
  hackerrank: string | null;
  collage: string | null;
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
  github: string | null;
  leetcode: string | null;
  hackerrank: string | null;
  collage: string | null;
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
  github?: string;
  leetcode?: string;
  hackerrank?: string;
  collage?: string;
  language?: string;
}

export interface UploadImageResponse {
  success: boolean;
  message: string;
  imageUrl: string;
}

export interface RemoveImageResponse {
  success: boolean;
  message: string;
}

// =========================
// Enrollment Types
// =========================

export interface EnrollmentCourseCount {
  chapters: number;
}

export interface EnrollmentCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
  duration: string | null;
  orgCode: string | null;
  createdBy: string;
  _count: EnrollmentCourseCount;
  averageRating: number;
  totalRatings: number;
}

export interface EnrollmentPayment {
  id?: number;
  [key: string]: unknown;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  paymentId: number | null;
  status: string;
  payment_status: string;
  createdAt: string;
  course: EnrollmentCourse;
  payment: EnrollmentPayment | null;
}

export interface GetMyEnrollmentsResponse {
  success: boolean;
  message: string;
  data: Enrollment[];
}

// =========================
// User API Endpoints
// =========================

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
    updateProfile: builder.mutation<
      GetProfileResponse,
      UpdateProfileRequest
    >({
      query: (body) => ({
        url: 'profile/update/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Upload profile image
    uploadProfileImage: builder.mutation<
      UploadImageResponse,
      FormData
    >({
      query: (formData) => ({
        url: 'profile/upload/image',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Remove profile image
    removeProfileImage: builder.mutation<
      RemoveImageResponse,
      void
    >({
      query: () => ({
        url: 'profile/upload/deleteImage',
        method: 'DELETE',
      }),
      invalidatesTags: ['Auth'],
    }),

    // Get my enrollments
    getMyEnrollments: builder.query<
      GetMyEnrollmentsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: 'enrollment/my-enrollments',
        method: 'GET',
        params: {
          page,
          limit,
        },
      }),
      providesTags: ['Auth'],
    }),
  }),
});

// =========================
// Export Hooks
// =========================

export const {
  useGetProfilesQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation,
  useGetMyEnrollmentsQuery,
} = userApiSlice;
