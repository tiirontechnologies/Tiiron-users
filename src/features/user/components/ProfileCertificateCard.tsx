import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import {
  useGetCourseCertificateTemplateQuery,
  useGetGeneratedCourseCertificateQuery,
} from "@features/course-certificate";
import { useGetCourseProgressQuery } from "@features/course-glossary/api/courseApi";

export interface ProfileEnrollment {
  id: number;
  courseId: number;
  createdAt: string;
  course: { id: number; title: string; image?: string | null };
}

interface ProfileCertificateCardProps {
  enrollment: ProfileEnrollment;
  onStatusResolved: (
    courseId: number,
    available: boolean,
    earned: boolean,
  ) => void;
}

function getCertificatePayload(response: any) {
  return (
    response?.data?.certificate ??
    response?.certificate ??
    response?.data ??
    null
  );
}

function getOverallScore(certificate: any): string | null {
  const value =
    certificate?.overallScore ??
    certificate?.overall ??
    certificate?.score ??
    certificate?.evaluation?.overallScore;
  if (value === undefined || value === null || value === "") return null;
  return typeof value === "number" ? `${value.toFixed(1)} / 10` : String(value);
}

export default function ProfileCertificateCard({
  enrollment,
  onStatusResolved,
}: ProfileCertificateCardProps) {
  const navigate = useNavigate();
  const { data: progressResponse, isLoading: isProgressLoading } =
    useGetCourseProgressQuery(enrollment.courseId);
  const {
    data: templateResponse,
    isLoading: isTemplateLoading,
    error: templateError,
  } = useGetCourseCertificateTemplateQuery(enrollment.courseId);
  const progress = Number(progressResponse?.data?.progress?.percentage ?? 0);
  const {
    data: certificateResponse,
    isLoading: isCertificateLoading,
    error: certificateError,
  } = useGetGeneratedCourseCertificateQuery(enrollment.courseId, {
    skip: isProgressLoading || progress < 100,
  });
  const certificate = getCertificatePayload(certificateResponse);
  const template =
    templateResponse?.data ?? templateResponse?.certificate ?? null;
  const certificateAvailable = Boolean(template) && !templateError;
  // A failed certificate request cannot be shown as an in-progress certificate.
  const templateUnavailable = Boolean(certificateError);
  const isResolved =
    !isProgressLoading &&
    !isTemplateLoading &&
    (progress < 100 || !isCertificateLoading);
  const earned =
    isResolved &&
    certificateAvailable &&
    !templateUnavailable &&
    !!certificate &&
    progress >= 100;
  const score = getOverallScore(certificate);

  useEffect(() => {
    if (isResolved)
      onStatusResolved(enrollment.courseId, certificateAvailable, earned);
  }, [
    certificateAvailable,
    earned,
    enrollment.courseId,
    isResolved,
    onStatusResolved,
  ]);

  if (!isResolved || isTemplateLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          minHeight: 220,
          borderRadius: 3,
          bgcolor: "#fff",
          border: "1px solid #E2E8F0",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1.25, textAlign: "center" }}>
          <CircularProgress size={32} thickness={4} sx={{ color: "#4F46E5" }} />
          <Typography fontWeight={800} color="#334155">Loading certificate</Typography>
          <Typography variant="body2" color="text.secondary">Checking your course progress and certificate status…</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!certificateAvailable) {
    return null;
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: earned ? "#C7D2FE" : "#E2E8F0",
        borderRadius: 3,
        overflow: "hidden",
        minWidth: 0,
        width: "100%",
        height: "100%",
        bgcolor: "#fff",
        transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease",
        "&:hover": { transform: "translateY(-2px)", borderColor: "#A5B4FC", boxShadow: "0 12px 26px rgba(79,70,229,.09)" },
      }}
    >
      <Box sx={{ height: 5, background: earned ? "linear-gradient(90deg,#4F46E5,#8B5CF6)" : "linear-gradient(90deg,#CBD5E1,#E2E8F0)" }} />
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: earned ? "#EEF2FF" : "#F8FAFC",
            }}
          >
            {earned ? (
              <WorkspacePremiumRoundedIcon sx={{ color: "#4F46E5" }} />
            ) : (
              <LockOutlinedIcon sx={{ color: "#D97706" }} />
            )}
          </Box>
          <Box minWidth={0} flex={1}>
            <Typography fontWeight={800} noWrap>
              {enrollment.course?.title || "Course certificate"}
            </Typography>
            <Chip
              label={
                earned
                  ? "Certificate earned"
                  : templateUnavailable
                    ? "Not available"
                    : "Locked"
              }
              size="small"
              sx={{
                mt: 0.8,
                fontWeight: 700,
                bgcolor: earned ? "#EEF2FF" : templateUnavailable ? "#FEF2F2" : "#FFF7ED",
                color: earned ? "#4338CA" : templateUnavailable ? "#B91C1C" : "#B45309",
              }}
            />
          </Box>
        </Stack>

        {earned ? (
          <Box sx={{ mt: 2 }}>
            {score && (
              <Typography variant="body2" color="text.secondary">
                Overall score{" "}
                <Box
                  component="span"
                  sx={{ color: "#0F172A", fontWeight: 800 }}
                >
                  {score}
                </Box>
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                navigate(
                  `/course-glossary/${enrollment.courseId}?tab=certificates`,
                )
              }
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 1.5,
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 2,
                boxShadow: "none",
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                "&:hover": { background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)", boxShadow: "0 6px 16px rgba(79,70,229,.2)" },
              }}
            >
              View certificate
            </Button>
          </Box>
        ) : templateUnavailable ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, lineHeight: 1.55 }}
          >
            A certificate is not available for this course yet.
          </Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between" mb={0.7}>
              <Typography variant="body2" color="text.secondary">
                Course progress
              </Typography>
              <Typography variant="body2" fontWeight={800}>
                {Math.min(progress, 100)}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              sx={{
                height: 7,
                borderRadius: 5,
                  bgcolor: "#E2E8F0",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  bgcolor: "#6366F1",
                },
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1.25, lineHeight: 1.55 }}
            >
              Please complete this course to receive your certificate.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
