import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { useGetMyEnrollmentsQuery, type Enrollment } from "../api/userApi";

export default function ActivityTab() {
  const { data, isLoading, isError } = useGetMyEnrollmentsQuery({ page: 1, limit: 20 });
  const enrollments: Enrollment[] = data?.data ?? [];

  if (isLoading) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={76} />
          <Skeleton variant="rounded" height={76} />
          <Skeleton variant="rounded" height={76} />
        </Stack>
      </Box>
    );
  }

  if (isError) {
    return <Box sx={{ p: 5, textAlign: "center" }}><Typography fontWeight={800}>Activity could not be loaded</Typography><Typography variant="body2" color="text.secondary" mt={1}>Please refresh and try again.</Typography></Box>;
  }

  if (!enrollments.length) {
    return (
      <Box sx={{ p: { xs: 5, sm: 7 }, textAlign: "center" }}>
        <MenuBookRoundedIcon sx={{ fontSize: 46, color: "#818CF8" }} />
        <Typography fontWeight={800} mt={1}>Your activity will appear here</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>Enroll in a course to start building your learning activity.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5 }}>Recent Activity</Typography>
      <Stack spacing={1.5}>
        {enrollments.map((enrollment) => {
          const date = new Date(enrollment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
          const isActive = enrollment.status.toLowerCase() === "active";
          return (
            <Box key={enrollment.id} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, border: "1px solid #E2E8F0", borderRadius: 2.5, bgcolor: "#fff" }}>
              <Box sx={{ width: 40, height: 40, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: isActive ? "#ECFDF5" : "#EEF2FF", color: isActive ? "#059669" : "#4F46E5" }}>
                {isActive ? <CheckCircleOutlineRoundedIcon /> : <WorkspacePremiumRoundedIcon />}
              </Box>
              <Box minWidth={0} flex={1}>
                <Typography fontWeight={750} noWrap>{isActive ? "Learning course" : "Course enrollment"}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{enrollment.course?.title || "Course"}</Typography>
              </Box>
              <Chip label={date} size="small" sx={{ flexShrink: 0, bgcolor: "#F8FAFC", color: "#64748B", fontWeight: 700 }} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
