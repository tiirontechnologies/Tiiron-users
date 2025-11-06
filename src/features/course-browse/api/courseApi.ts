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

// Course Browse API - Only for browsing, cart, and enrollment
export const courseBrowseApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get course for feed (browsing)
    getCourseForFeed: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: "/course/all",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Course"],
    }),

    // Search courses (browsing) - uses /course/all endpoint
    searchCourses: builder.query({
      query: ({ page = 1, limit = 100 }: { page?: number; limit?: number }) => ({
        url: "/course/all",
        method: "GET",
        params: { page, limit },
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

    // 4. INITIATE CHECKOUT/ENROLLMENT (Mutation)
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
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCourseForFeedQuery,
  useSearchCoursesQuery,
  useInitiateCheckoutMutation,
  useGetCartQuery,
  useAddToCartServerMutation,
  useRemoveFromCartServerMutation,
} = courseBrowseApiSlice;
