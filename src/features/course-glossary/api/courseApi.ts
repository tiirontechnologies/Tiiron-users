// import { baseApi } from "../../../api/api.routes";

// // Course API endpoints
// export const courseApiSlice = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//     // Get courses with pagination
//     getCourses: builder.query({
//       query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
//         url: "/course",
//         method: "GET",
//         params: { page, limit },
//       }),
//       providesTags: ["Course"],
//     }),

//     // Get course by ID
//     getCourseById: builder.query({
//       query: ({ id }: { id: number }) => ({
//         url: `/course/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["Course"],
//     }),

//     // ⭐ Get course rating
//   getCourseRating: builder.query({
//   query: (courseId: number) => ({
//     url: `/course/${courseId}/ratings`,
//     method: "GET",
//   }),
// }),

//     // Get course certificate (dynamic certificate data)
//     getCourseCertificate: builder.query({
//       query: (courseId: number) => ({
//         url: `/course/${courseId}/certificate`,
//         method: "GET",
//       }),
//       providesTags: ["Certificate"],
//     }),

//     // Create course
//     createCourse: builder.mutation({
//       query: ({ body }: { body: FormData }) => ({
//         url: "/course",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Course"],
//     }),

//     // Delete course
//     deleteCourse: builder.mutation({
//       query: ({ id }: { id: number }) => ({
//         url: `/course/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Course"],
//     }),

//     // Get chapters for a course
//     getChapters: builder.query({
//       query: ({
//         page = 1,
//         limit = 10,
//         id,
//       }: {
//         page?: number;
//         limit?: number;
//         id: number;
//       }) => ({
//         url: `/course/chapter/${id}`,
//         method: "GET",
//         params: { page, limit },
//       }),
//       providesTags: ["Chapter"],
//     }),

//     // loggedin querry 
//       // Get logged-in user
//     getLoggedInUser: builder.query({
//       query: () => ({
//         url: "/profile/me",
//         method: "GET",
//       }),
//       providesTags: ["Profile"],
//     }),
//   }),
// });

// // Export hooks
// export const {
//     useGetLoggedInUserQuery,
//   useGetCoursesQuery,
//   useGetCourseByIdQuery,
//   useGetCourseRatingQuery,
//   useGetCourseCertificateQuery,
//   useCreateCourseMutation,
//   useDeleteCourseMutation,
//   useGetChaptersQuery,
// } = courseApiSlice;



import { baseApi } from "../../../api/api.routes";

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

    // Get course by ID
    getCourseById: builder.query({
      query: ({ id }: { id: number }) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // ⭐ Get course rating
  getCourseRating: builder.query({
  query: (courseId: number) => ({
    url: `/course/${courseId}/ratings`,
    method: "GET",
  }),
}),

    // Get course certificate (dynamic certificate data)
    getCourseCertificate: builder.query({
      query: (courseId: number) => ({
        url: `/course/${courseId}/certificate`,
        method: "GET",
      }),
      providesTags: ["Certificate"],
    }),

    // 🆕 Get course progress (used to gate certificate visibility/download)
    getCourseProgress: builder.query({
      query: (courseId: number) => ({
        url: `/practice/course/${courseId}/progress`,
        method: "GET",
      }),
      providesTags: ["Progress"],
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
        url: `/course/chapter/${id}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Chapter"],
    }),

    // loggedin querry
    // Get logged-in user
    getLoggedInUser: builder.query({
      query: () => ({
        url: "/profile/user",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCourseRatingQuery,
  useGetCourseCertificateQuery,
  useGetCourseProgressQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetChaptersQuery,
  useGetLoggedInUserQuery,
} = courseApiSlice;