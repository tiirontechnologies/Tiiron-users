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

export interface WishlistResponse {
  success?: boolean;
  message?: string;
  data: ICartItem[] | { items: ICartItem[] };
}


export interface CourseRatingResponse {
  success: boolean;
  message: string;
  data: {
    averageRating: number;
    totalRatings: number;
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

    // Search courses
    searchCourses: builder.query({
      query: ({
        q,
        page = 1,
        limit = 10,
      }: {
        q?: string;
        page?: number;
        limit?: number;
      }) => ({
        url: "/course/search",
        method: "GET",
        params: q ? { q, page, limit } : { page, limit },
      }),
      providesTags: ["Course"],
    }),

    // Get free courses
    getFreeCourses: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: "/course/free",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Course"],
    }),

    
    getCourseRating: builder.query<CourseRatingResponse, number>({
      query: (courseId) => ({
        url: `/course/${courseId}/ratings`,
        method: "GET",
      }),
    }),

    // 1. GET USER CART
    getCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // 2. ADD TO CART
    addToCartServer: builder.mutation<void, { courseId: number }>({
      query: ({ courseId }) => ({
        url: "cart/add",
        method: "POST",
        body: { courseId: courseId },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 3. REMOVE FROM CART
    removeFromCartServer: builder.mutation<void, { cartItemId: number }>({
      query: ({ cartItemId }) => ({
        url: `cart/item/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    getWishlist: builder.query<WishlistResponse, void>({
      query: () => ({ url: "cart/wishlist", method: "GET" }),
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation<void, { courseId: number }>({
      query: ({ courseId }) => ({
        url: "cart/wishlist",
        method: "POST",
        body: { courseId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<void, { courseId: number }>({
      query: ({ courseId }) => ({
        url: `cart/wishlist/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // 4. INITIATE CHECKOUT
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

// Export hooks
export const {
  useGetCourseForFeedQuery,
  useSearchCoursesQuery,
  useGetFreeCoursesQuery,
  useInitiateCheckoutMutation,
  useGetCartQuery,
  useAddToCartServerMutation,
  useRemoveFromCartServerMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetCourseRatingQuery, 
} = courseBrowseApiSlice;