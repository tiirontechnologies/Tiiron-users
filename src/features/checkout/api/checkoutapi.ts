import { baseApi } from "../../../api/api.routes";

export const checkoutApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCheckoutCourse: builder.query({
      query: (courseId: number) => ({
        url: `/course/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Checkout"],
    }),

    getCheckoutQuote: builder.mutation({
      query: ({ courseId }: { courseId: number }) => ({
        url: `/course/${courseId}/checkout/quote`,
        method: "POST",
        body: {},
      }),
    }),

    validateCourseCoupon: builder.mutation({
      query: ({ courseId, couponCode }: { courseId: number; couponCode: string }) => ({
        url: `/course/${courseId}/coupon/validate`,
        method: "POST",
        body: { couponCode },
      }),
    }),


    createOrder: builder.mutation({
      query: (body: { courseId: number; couponCode?: string }) => ({
        url: `/payment/course/order`,
        method: "POST",
        body,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (body: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => ({
        url: "/payment/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enrollment", "Cart"],
    }),

  }),

  
});

export const {
  useGetCheckoutCourseQuery,
  useGetCheckoutQuoteMutation,
  useValidateCourseCouponMutation,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} = checkoutApiSlice;
