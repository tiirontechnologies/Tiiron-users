import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Rating,
  Avatar,
  Skeleton,
} from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { useNavigate } from "react-router-dom";

// Raw course shape as returned by getCoursesByUsername
export interface RawCourse {
  id: number | string;
  title: string;
  description?: string;
  language?: string[];
  level?: string;
  image?: string | null;
  isFree?: boolean;
  price?: number;
  totalChapters?: number;
  averageRating?: number;
  totalRatings?: number;
  createdAt?: string;
  createdBy?: string;
}

interface CoursesTabProps {
  courses?: RawCourse[];
  isLoading?: boolean;
}

const levelColor: Record<string, "success" | "warning" | "error" | "default"> = {
  Begginer: "success",
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
  "Advance...": "error",
};

const CoursesTab: React.FC<CoursesTabProps> = ({ courses = [], isLoading = false }) => {
  if (isLoading) {
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
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i}>
            <Skeleton variant="rounded" height={150} sx={{ borderRadius: 3 }} />
            <Skeleton variant="text" height={28} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Box>
    );
  }

  if (!courses.length) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <MenuBookRoundedIcon sx={{ fontSize: 48, color: "grey.300", mb: 1 }} />
        <Typography variant="body1" color="text.secondary">
          No courses uploaded yet.
        </Typography>
      </Box>
    );
  }

  const navigate = useNavigate();
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
      }}
    >
      {courses.map((course) => (
        <Card
          key={course.id}
          elevation={0}
          onClick={() => navigate(`/course-glossary/${course.id}`)}
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
            <Box sx={{ position: "relative" }}>
              {course.image ? (
                <CardMedia
                  component="img"
                  image={course.image}
                  alt={course.title}
                  sx={{ height: 150, objectFit: "cover" }}
                />
              ) : (
                <Box
                  sx={{
                    height: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#4F46E5",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  {course.title}
                </Box>
              )}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(15,10,40,0.15)",
                  opacity: 0,
                  transition: "opacity .2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ".MuiCardActionArea-root:hover &": { opacity: 1 },
                }}
              >
                <PlayCircleRoundedIcon sx={{ fontSize: 44, color: "#fff" }} />
              </Box>

              {/* Price / Free badge */}
              <Chip
                label={course.isFree ? "Free" : `₹${course.price ?? 0}`}
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontWeight: 700,
                  bgcolor: course.isFree ? "success.main" : "rgba(0,0,0,0.7)",
                  color: "#fff",
                }}
              />
            </Box>

            <CardContent sx={{ p: 2 }}>
              {/* Title */}
              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: 48,
                  lineHeight: 1.3,
                }}
              >
                {course.title}
              </Typography>

              {/* Instructor row, YT-channel style */}
              <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                <Avatar sx={{ width: 20, height: 20, fontSize: 11, bgcolor: "#4f46e5" }}>
                  {course.createdBy?.charAt(0) || "T"}
                </Avatar>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {course.createdBy}
                </Typography>
              </Stack>

              {/* Rating + chapters */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                {course.averageRating ? (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Rating value={course.averageRating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary">
                      {course.averageRating.toFixed(1)}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography variant="caption" color="text.disabled">
                    No ratings
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {course.totalChapters ?? 0} chapters
                </Typography>
              </Stack>

              {/* Level chip */}
              {course.level && (
                <Chip
                  label={course.level}
                  size="small"
                  color={levelColor[course.level] || "default"}
                  variant="outlined"
                  sx={{ mt: 1.2, fontWeight: 600, fontSize: 11 }}
                />
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default CoursesTab;