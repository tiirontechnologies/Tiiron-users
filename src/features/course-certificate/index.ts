export { default as CourseCertificate } from "./components/CourseCertificate";
export {
  useGetCourseCertificateTemplateQuery,
  useGetGeneratedCourseCertificateQuery,
  useGenerateCourseCertificateMutation,
} from "./api/certificateApi";
export type { CertificateTemplate, CourseCertificateProps, GeneratedCertificate } from "./types/certificate.types";
