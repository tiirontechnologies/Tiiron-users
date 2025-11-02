import { baseApi } from "../../../api/api.routes";
import { ICourse } from "../../../types/course.types";

interface IEnrollment {
  id: number;
  courseId: number;
  status: string;
  payment_status: string;
  course: ICourse;
}

interface MyEnrollmentResponse {
  success: boolean;
  data: IEnrollment[];
}

// My Course API - Only for enrolled courses
export const myCourseApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get my enrolled courses
    getMyEnrolledCourses: builder.query<MyEnrollmentResponse, void>({
      query: () => ({
        url: "enrollment/my-enrollments",
        method: "GET",
        params: {
          page: 1,
          limit: 10,
        },
      }),
      providesTags: ["Enrollment"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMyEnrolledCoursesQuery,
} = myCourseApiSlice;
