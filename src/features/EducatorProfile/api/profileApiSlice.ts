import { baseApi } from "../../../api/api.routes";
import { RawApiUser } from "../types/educator.types";

interface ProfileApiResponse {
  success: boolean;
  message: string;
  data: RawApiUser;
}

export interface Community {
  id: number;
  telegram: string | null;
  whatsapp: string | null;
  discord: string | null;
  userId: number;
}

interface CommunityResponse {
  success: boolean;
  msg: string;
  data: Community;
}

export const profileApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileByUsername: builder.query<RawApiUser, string>({
      query: (username) => `/profile/${username}`,
      transformResponse: (res: ProfileApiResponse) => res.data,
    }),

    getCoursesByUsername: builder.query<any, string>({
      query: (username) => `/course/instructor/${username}`,
      transformResponse: (res: any) => res.data.courses,
    }),

    // NEW - GET COMMUNITY BY EDUCATOR ID
    getCommunityByUserId: builder.query<Community, number>({
      query: (userId) => `/profile/community/${userId}`,
      transformResponse: (res: CommunityResponse) => res.data,
    }),
  }),
});

export const {
  useGetProfileByUsernameQuery,
  useGetCoursesByUsernameQuery,
  useGetCommunityByUserIdQuery,
} = profileApiSlice;


