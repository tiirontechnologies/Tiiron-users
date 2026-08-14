import { baseApi } from '../../../api/api.routes'; 
import { RawApiUser } from '../types/educator.types';

interface ProfileApiResponse {
  success: boolean;
  message: string;
  data: RawApiUser;
}



export const profileApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileByUsername: builder.query<RawApiUser, string>({
      query: (username) => `/profile/${username}`,
      transformResponse: (res: ProfileApiResponse) => res.data,
    }),


    
    getEducatorCourses: builder.query<any, string>({
      query: (orgCode) => `/courses/educator/${orgCode}`,
      transformResponse: (res: any) => res.data.courses,
    }),


  }),
});

export const { useGetProfileByUsernameQuery ,
    useGetEducatorCoursesQuery,
} = profileApiSlice;