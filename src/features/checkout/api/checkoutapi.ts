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


    createOrder: builder.mutation({
  query: (body: { courseId: number; amount: number }) => ({
    url: `/payment/create-order`,
    method: "POST",
    body,
  }),
}),

  }),

  
});

export const { useGetCheckoutCourseQuery, useCreateOrderMutation } = checkoutApiSlice;