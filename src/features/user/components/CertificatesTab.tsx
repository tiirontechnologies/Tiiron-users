import { useCallback, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { useGetMyEnrollmentsQuery } from "../api/userApi";
import ProfileCertificateCard, { type ProfileEnrollment } from "./ProfileCertificateCard";

/** Profile-only coordinator: each course card owns its certificate/progress APIs. */
export default function CertificatesTab() {
  const { data, isLoading, isError } = useGetMyEnrollmentsQuery({ page: 1, limit: 100 });
  const [earnedByCourse, setEarnedByCourse] = useState<Record<number, boolean>>({});
  const enrollments: ProfileEnrollment[] = data?.data ?? [];
  const earnedCount = Object.values(earnedByCourse).filter(Boolean).length;
  const onStatusResolved = useCallback((courseId: number, earned: boolean) => {
    setEarnedByCourse((current) => current[courseId] === earned ? current : { ...current, [courseId]: earned });
  }, []);

  if (isLoading) return <Box sx={{ p: 3, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}><Skeleton variant="rounded" height={190} /><Skeleton variant="rounded" height={190} /></Box>;
  if (isError) return <Box sx={{ p: 5, textAlign: "center" }}><Typography fontWeight={700}>Certificates could not be loaded</Typography><Typography variant="body2" color="text.secondary" mt={1}>Please refresh and try again.</Typography></Box>;
  if (!enrollments.length) return <Box sx={{ p: 6, textAlign: "center" }}><WorkspacePremiumRoundedIcon sx={{ fontSize: 40, color: "#818CF8" }} /><Typography fontWeight={800} mt={1}>No certificates yet</Typography><Typography variant="body2" color="text.secondary" mt={.5}>Complete a course to become eligible for its certificate.</Typography></Box>;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 2.5, p: 2, borderRadius: 2.5, bgcolor: "#F5F3FF", display: "flex", alignItems: "center", gap: 1.5 }}>
        <WorkspacePremiumRoundedIcon sx={{ color: "#6D28D9" }} />
        <Box><Typography fontWeight={800}>{earnedCount} certificate{earnedCount === 1 ? "" : "s"} earned</Typography><Typography variant="caption" color="text.secondary">Your certificate status and results are shown below.</Typography></Box>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
        {enrollments.map((enrollment) => <ProfileCertificateCard key={enrollment.id} enrollment={enrollment} onStatusResolved={onStatusResolved} />)}
      </Box>
    </Box>
  );
}
