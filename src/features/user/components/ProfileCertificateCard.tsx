import { useEffect } from "react";
import { Box, Button, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { useGetGeneratedCourseCertificateQuery } from "@features/course-certificate";
import { useGetCourseProgressQuery } from "@features/course-glossary/api/courseApi";

export interface ProfileEnrollment {
  id: number;
  courseId: number;
  createdAt: string;
  course: { id: number; title: string; image?: string | null };
}

interface ProfileCertificateCardProps {
  enrollment: ProfileEnrollment;
  onStatusResolved: (courseId: number, earned: boolean) => void;
}

function getCertificatePayload(response: any) {
  return response?.data?.certificate ?? response?.certificate ?? response?.data ?? null;
}

function getOverallScore(certificate: any): string | null {
  const value = certificate?.overallScore ?? certificate?.overall ?? certificate?.score ?? certificate?.evaluation?.overallScore;
  if (value === undefined || value === null || value === "") return null;
  return typeof value === "number" ? `${value.toFixed(1)} / 10` : String(value);
}

export default function ProfileCertificateCard({ enrollment, onStatusResolved }: ProfileCertificateCardProps) {
  const navigate = useNavigate();
  const { data: progressResponse, isLoading: isProgressLoading } = useGetCourseProgressQuery(enrollment.courseId);
  const progress = Number(progressResponse?.data?.progress?.percentage ?? 0);
  const { data: certificateResponse, isLoading: isCertificateLoading, error: certificateError } = useGetGeneratedCourseCertificateQuery(enrollment.courseId, {
    skip: isProgressLoading || progress < 100,
  });
  const certificate = getCertificatePayload(certificateResponse);
  // A failed certificate request cannot be shown as an in-progress certificate.
  const templateUnavailable = Boolean(certificateError);
  const isResolved = !isProgressLoading && (progress < 100 || !isCertificateLoading);
  const earned = isResolved && !templateUnavailable && !!certificate && progress >= 100;
  const score = getOverallScore(certificate);

  useEffect(() => {
    if (isResolved) onStatusResolved(enrollment.courseId, earned);
  }, [earned, enrollment.courseId, isResolved, onStatusResolved]);

  if (!isResolved) {
    return <Card elevation={0} sx={{ minHeight: 170, borderRadius: 3, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }} />;
  }

  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: earned ? "#BBF7D0" : "#E2E8F0", borderRadius: 3, overflow: "hidden" }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: earned ? "#ECFDF5" : "#FFF7ED" }}>
            {earned ? <WorkspacePremiumRoundedIcon sx={{ color: "#059669" }} /> : <LockOutlinedIcon sx={{ color: "#D97706" }} />}
          </Box>
          <Box minWidth={0} flex={1}>
            <Typography fontWeight={800} noWrap>{enrollment.course?.title || "Course certificate"}</Typography>
            <Chip label={earned ? "Certificate earned" : templateUnavailable ? "Not available" : "Locked"} size="small" sx={{ mt: .8, fontWeight: 700, bgcolor: earned ? "#DCFCE7" : "#FFF7ED", color: earned ? "#047857" : "#B45309" }} />
          </Box>
        </Stack>

        {earned ? (
          <Box sx={{ mt: 2 }}>
            {score && <Typography variant="body2" color="text.secondary">Overall score <Box component="span" sx={{ color: "#0F172A", fontWeight: 800 }}>{score}</Box></Typography>}
            <Button fullWidth variant="contained" onClick={() => navigate(`/course-glossary/${enrollment.courseId}?tab=certificates`)} endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 1.5, textTransform: "none", fontWeight: 800, borderRadius: 2, boxShadow: "none" }}>View certificate</Button>
          </Box>
        ) : templateUnavailable ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.55 }}>A certificate is not available for this course yet.</Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between" mb={.7}><Typography variant="body2" color="text.secondary">Course progress</Typography><Typography variant="body2" fontWeight={800}>{Math.min(progress, 100)}%</Typography></Stack>
            <LinearProgress variant="determinate" value={Math.min(progress, 100)} sx={{ height: 7, borderRadius: 5, bgcolor: "#E2E8F0", "& .MuiLinearProgress-bar": { borderRadius: 5, bgcolor: "#F59E0B" } }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.55 }}>Please complete this course to receive your certificate.</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
