import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Stack,
  Rating,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import { useGetMyEnrollmentsQuery } from "../api/userApi";


import { useNavigate } from "react-router-dom";

// ---------- Types (matches enrollment API response) ----------
export interface EnrolledCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
  duration: string | null;
  orgCode: string;
  createdBy: string;
  instructor?: string | null;
  _count: { chapters: number };
  averageRating: number;
  totalRatings: number;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: string;
  payment_status: string;
  createdAt: string;
  course: EnrolledCourse;
}

const stringToGradient = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `linear-gradient(135deg, hsl(${hue},70%,55%) 0%, hsl(${hue + 40},70%,45%) 100%)`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const MyCoursesTab: React.FC = () => {

const navigate = useNavigate();

const handleCourseNavigate = (courseId: number) => {
  navigate(`/course-practice/${courseId}`);
};

const {
  data,
  isLoading: loading,
  isError,
} = useGetMyEnrollmentsQuery({
  page: 1,
  limit: 10,
});

// const enrollments = data?.data?.enrollments || data?.data?.courses || [];
const enrollments: Enrollment[] = data?.data || [];

  if (loading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2.5,
          py: 3,
          // px:1,
          // p:2,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i}>
            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
            <Skeleton variant="text" height={28} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          We're having trouble loading your courses
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 320, mx: "auto", lineHeight: 1.7 }}
        >
          Please refresh the page and try again. If the problem continues, it
          may be temporary and should be resolved shortly.
        </Typography>
      </Box>
    );
  }

  if (!enrollments.length) {
    return (
     <Box
  sx={{
    py: 10,
    px: 3,
    display: "flex",
    justifyContent: "center",
  }}
>
  <Box
    sx={{
      maxWidth: 430,
      width: "100%",
      textAlign: "center",
      p: 4,
      borderRadius: 4,
      bgcolor: "#fff",
      border: "1px solid",
      borderColor: "divider",
      boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
    }}
  >
    <Box
      sx={{
        width: 84,
        height: 84,
        mx: "auto",
        mb: 3,
        borderRadius: "50%",
        bgcolor: "rgba(79,70,229,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SchoolRoundedIcon
        sx={{
          fontSize: 42,
          color: "#4F46E5",
        }}
      />
    </Box>

    <Typography
      variant="h6"
      fontWeight={700}
      gutterBottom
    >
      Your learning journey starts here
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        maxWidth: 340,
        mx: "auto",
        lineHeight: 1.8,
        mb: 3,
      }}
    >
      You haven't enrolled in any courses yet. Explore our course library
      and start building new skills at your own pace.
    </Typography>

    <Button
      variant="contained"
      size="large"
      sx={{
        px: 4,
        borderRadius: 2.5,
        textTransform: "none",
        fontWeight: 700,
      }}
    >
      Explore Courses
    </Button>
  </Box>
</Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2.5,
        py: 3,
        p:2,
      }}
    >
      {enrollments.map((enrollment) => {
        const { course } = enrollment;
        const isActive = enrollment.status === "active";

        return (
          <Card
            key={enrollment.id}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              transition: "transform .2s ease, box-shadow .2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(79,70,229,0.15)",
                borderColor: "transparent",
              },
            }}
          >
            <CardActionArea>
              {/* Thumbnail */}
              <Box sx={{ position: "relative", height: 140 }}>
                {course.image ? (
                  <Box
                    component="img"
                    src={course.image}
                    alt={course.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      background: stringToGradient(course.title),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      color="#fff"
                      sx={{ opacity: 0.9 }}
                    >
                      {course.title.charAt(0).toUpperCase()}
                    </Typography>
                  </Box>
                )}

                {/* Enrollment status badge */}
                <Chip
                  label={isActive ? "Enrolled" : enrollment.status}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    fontWeight: 700,
                    bgcolor: isActive ? "success.main" : "grey.600",
                    color: "#fff",
                  }}
                />

                {/* Price badge */}
                <Chip
                  label={course.price === 0 ? "Free" : `₹${course.price}`}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontWeight: 700,
                    bgcolor: "rgba(0,0,0,0.65)",
                    color: "#fff",
                  }}
                />
              </Box>

              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {course.title}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: 32,
                    mt: 0.3,
                  }}
                >
                  {course.description}
                </Typography>

                {/* Instructor */}
                <Stack direction="row" spacing={1} alignItems="center" mt={1.2}>
                  <Avatar sx={{ width: 20, height: 20, fontSize: 11, bgcolor: "#4f46e5" }}>
                    {course.createdBy?.charAt(0)?.toUpperCase() || "T"}
                  </Avatar>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {`${course.instructor?.trim() || "Instructor"} | ${course.createdBy?.trim() || course.orgCode?.trim() || "Organization"}`}
                  </Typography>
                </Stack>

                {/* Rating + chapters */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  {course.totalRatings > 0 ? (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Rating
                        value={course.averageRating}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography variant="caption" color="text.secondary">
                        {course.averageRating.toFixed(1)} ({course.totalRatings})
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      No ratings yet
                    </Typography>
                  )}
                  <Stack direction="row" spacing={0.4} alignItems="center">
                    <MenuBookRoundedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      {course._count.chapters} ch
                    </Typography>
                  </Stack>
                </Stack>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ display: "block", mt: 0.8 }}
                >
                  Enrolled on {formatDate(enrollment.createdAt)}
                </Typography>

                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                 onClick={() => handleCourseNavigate(course.id)}
                  startIcon={<PlayArrowRoundedIcon />}
                  sx={{
                    mt: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(79,70,229,0.35)",
                    },
                  }}
                >
                  Continue Learning
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
};

export default MyCoursesTab;
