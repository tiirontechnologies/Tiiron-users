export interface CourseCertificateProps {
  courseId: string;
  courseName: string;
}

export interface CertificateTemplate {
  id?: number;
  courseId: number;
  startDate?: string;
  endDate?: string;
  instructorName?: string;
  batchId?: string;
  programSummary?: string;
  mentorRemark?: string;
  mentorSignature?: string | null;
  directorSignature?: string | null;
  stamp?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  certificateLogo?: string | null;
}

export interface GeneratedCertificate {
  id: number;
  // verificationId?: string;
  certificateId?: string;
  enrollmentId?: number | string;
  studentId?: number;
  courseId: number;
  overallScore?: number;
  grade?: string;
  issuedAt?: string;
  scorecard?: Record<string, number | string | null>;
  student?: { firstName?: string; lastName?: string; email?: string; orgCode?: string | null; profile?: { collage?: string | null } };
  studentDetails?: { firstName?: string; lastName?: string; collegeName?: string | null };
  course?: {
    title?: string;
    instructor?: string | null;
    createdBy?: string | null;
    orgCode?: string | null;
    image?: string | null;
    organizationLogo?: string | null;
    orgLogo?: string | null;
    language?: string[];
    objective?: string[];
  };
  template?: CertificateTemplate | null;
  templateDetails?: CertificateTemplate | null;
}

export interface GeneratedCertificateApiResponse {
  status?: boolean;
  success?: boolean;
  message?: string;
  data?: GeneratedCertificate;
}

export interface CertificateTemplateApiResponse {
  status?: boolean;
  success?: boolean;
  message?: string;
  data?: CertificateTemplate;
  certificate?: CertificateTemplate;
}
