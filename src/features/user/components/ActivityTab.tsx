import { useState } from "react";
import { Box, Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { useGetMyEnrollmentsQuery, type Enrollment } from "../api/userApi";

const VISIBLE_COUNT = 3;
const ITEM_HEIGHT = 76; // ek activity card ki approx height
const ITEM_GAP = 12; // Stack spacing={1.5} = 12px
const CONTAINER_HEIGHT = VISIBLE_COUNT * ITEM_HEIGHT + (VISIBLE_COUNT - 1) * ITEM_GAP; // sirf 3 items jitni jagah

export default function ActivityTab() {
  const { data, isLoading, isError } = useGetMyEnrollmentsQuery({ page: 1, limit: 20 });
  const enrollments: Enrollment[] = data?.data ?? [];
  const [showAll, setShowAll] = useState(false);

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
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography fontWeight={800}>Activity could not be loaded</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Please refresh and try again.
        </Typography>
      </Box>
    );
  }

  if (!enrollments.length) {
    return (
      <Box sx={{ p: { xs: 5, sm: 7 }, textAlign: "center",minHeight:420 }}>
        <MenuBookRoundedIcon sx={{ fontSize: 46, color: "#818CF8" }} />
        <Typography fontWeight={800} mt={1}>Your activity will appear here</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Enroll in a course to start building your learning activity.
        </Typography>
      </Box>
    );
  }

  // Sabse recent 3 (last) activities pehle, ya sab (showAll)
  const sortedEnrollments = [...enrollments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const visibleEnrollments = showAll ? sortedEnrollments : sortedEnrollments.slice(0, VISIBLE_COUNT);
  const hasMore = sortedEnrollments.length > VISIBLE_COUNT;

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 },minHeight:420 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <Typography variant="h6" fontWeight={800}>Recent Activity</Typography>
        {hasMore && (
          <Button
            size="small"
            onClick={() => setShowAll((prev) => !prev)}
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            {showAll ? "Show less" : "See all"}
          </Button>
        )}
      </Box>

      <Box
        sx={{
          height: CONTAINER_HEIGHT,
          overflowY: showAll ? "auto" : "hidden",
          pr: showAll ? 0.5 : 0,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#CBD5E1", borderRadius: 3 },
        }}
      >
        <Stack spacing={1.5}>
          {visibleEnrollments.map((enrollment) => {
            const date = new Date(enrollment.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const isActive = enrollment.status.toLowerCase() === "active";
            return (
              <Box
                key={enrollment.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  border: "1px solid #E2E8F0",
                  borderRadius: 2.5,
                  bgcolor: "#fff",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    bgcolor: isActive ? "#ECFDF5" : "#EEF2FF",
                    color: isActive ? "#059669" : "#4F46E5",
                  }}
                >
                  {isActive ? <CheckCircleOutlineRoundedIcon /> : <WorkspacePremiumRoundedIcon />}
                </Box>
                <Box minWidth={0} flex={1}>
                  <Typography fontWeight={750} noWrap>
                    {isActive ? "Learning course" : "Course enrollment"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {enrollment.course?.title || "Course"}
                  </Typography>
                </Box>
                <Chip
                  label={date}
                  size="small"
                  sx={{ flexShrink: 0, bgcolor: "#F8FAFC", color: "#64748B", fontWeight: 700 }}
                />
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}