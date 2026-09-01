import { baseApi } from "../../../api/api.routes";
import type { CertificateTemplateApiResponse, GeneratedCertificateApiResponse } from "../types/certificate.types";

/**
 * The generated-certificate response includes the student, course and
 * template data needed to render the certificate.
 */
export const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseCertificateTemplate: builder.query<CertificateTemplateApiResponse, number>({
      query: (courseId) => ({ url: `/certificate/course/${courseId}`, method: "GET" }),
      providesTags: ["Certificate"],
    }),
    getGeneratedCourseCertificate: builder.query<GeneratedCertificateApiResponse, number>({
      query: (courseId) => ({
        url: `/certificate/${courseId}/generated`,
        method: "GET",
      }),
      providesTags: ["Certificate"],
    }),
    generateCourseCertificate: builder.mutation<GeneratedCertificateApiResponse, number>({
      query: (courseId) => ({
        url: `/certificate/${courseId}/generate`,
        method: "POST",
      }),
      invalidatesTags: ["Certificate"],
    }),
  }),
});

export const {
  useGetCourseCertificateTemplateQuery,
  useGetGeneratedCourseCertificateQuery,
  useGenerateCourseCertificateMutation,
} = certificateApi;
