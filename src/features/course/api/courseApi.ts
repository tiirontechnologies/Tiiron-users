import { baseApi } from "../../../api/api.routes";
import { ICourse } from "../../../types/course.types";

export interface SingleEnrollmentRequest {
  courseId: number;
  status: string;
  payment_status: string;
}

export interface CheckoutResponse {
  success: boolean;
  paymentUrl?: string;
  message: string;
}

export interface ICartItem {
  id: number;
  courseId: number;
  userId: number;
  createdAt: string;

  course: {
    id: number;
    title: string;
    price: number;
    image: string | null;
  };
}

export interface CartResponse {
  data: {
    items: ICartItem[];
    total: number;
  };
}

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

// Course API endpoints
export const courseApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get courses with pagination
    getCourses: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: "/course",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Course"],
    }),

    // get course for feed
    getCourseForFeed: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: "/course/all",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Course"],
    }),

    // Get course by ID
    getCourseById: builder.query({
      query: ({ id }: { id: number }) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // Create course
    createCourse: builder.mutation({
      query: ({ body }: { body: FormData }) => ({
        url: "/course",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    // Update course
    updateCourse: builder.mutation({
      query: ({ id, body }: { id: number; body: FormData }) => ({
        url: `/course/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    // Delete course
    deleteCourse: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Get chapters for a course
    getChapters: builder.query({
      query: ({
        page = 1,
        limit = 10,
        id,
      }: {
        page?: number;
        limit?: number;
        id: number;
      }) => ({
        url: `course/chapter/${id}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Chapter"],
    }),

    searchCourses: builder.query({
      query: (serachTerm: string) => ({
        url: `/course/search?q=${serachTerm}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // 1. GET USER CART (Query)
    getCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // 2. ADD TO CART (Mutation)
    addToCartServer: builder.mutation<void, { courseId: number }>({
      query: ({ courseId }) => ({
        url: "cart/add",
        method: "POST",
        body: { courseId: courseId },
      }),
      // Mutation ke baad cart data ko refetch karwao
      invalidatesTags: ["Cart"],
    }),

    // 3. REMOVE FROM CART (Mutation)
    removeFromCartServer: builder.mutation<void, { cartItemId: number }>({
      query: ({ cartItemId }) => ({
        url: `cart/item/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    initiateCheckout: builder.mutation<
      CheckoutResponse,
      SingleEnrollmentRequest
    >({
      query: (data) => ({
        url: "enrollment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Enrollment"],
    }),

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
  useGetCoursesQuery,
  useGetCourseForFeedQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetChaptersQuery,
  useSearchCoursesQuery,
  useInitiateCheckoutMutation,
  useGetCartQuery,
  useAddToCartServerMutation,
  useRemoveFromCartServerMutation,
  useGetMyEnrolledCoursesQuery,
} = courseApiSlice;
