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

// ---------- Types ----------
export interface RawCourse {
  id: number | string;
  title: string;
  description?: string;
  language?: string[];
  objective?: string[];
  level?: string;
  image?: string | null;
  duration?: string | null;

  isFree?: boolean;
  price?: number;

  totalChapters?: number;
  averageRating?: number;
  totalRatings?: number;

  createdAt?: string;
  updatedAt?: string;

  orgCode?: string;
  tags?: string[];

  // Organization name
  createdBy?: string;

  // Instructor name
  instructor?: string;

  categories?: string;
  active?: boolean;

  // Future backend support
  organizationLogo?: string | null;
}

interface CoursesTabProps {
  courses?: RawCourse[];
  isLoading?: boolean;
}

// ---------- Level Colors ----------
const getLevelColor = (
  level?: string
): "success" | "warning" | "error" | "default" => {
  const normalizedLevel = level?.trim().toLowerCase();

  if (
    normalizedLevel === "begginer" ||
    normalizedLevel === "beginners" ||
    normalizedLevel === "beginner"
  ) {
    return "success";
  }

  if (normalizedLevel === "intermediate") {
    return "warning";
  }

  if (
    normalizedLevel === "advanced" ||
    normalizedLevel === "advance"
  ) {
    return "error";
  }

  return "default";
};

// ---------- Component ----------
const CoursesTab: React.FC<CoursesTabProps> = ({
  courses = [],
  isLoading = false,
}) => {
  const navigate = useNavigate();

  // ---------- Loading ----------
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2.5,
          py: 2,
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Box key={index}>
            <Skeleton
              variant="rounded"
              height={150}
              sx={{ borderRadius: 3 }}
            />
            <Skeleton
              variant="text"
              height={28}
              sx={{ mt: 1 }}
            />
            <Skeleton
              variant="text"
              width="60%"
            />
          </Box>
        ))}
      </Box>
    );
  }

  // ---------- Empty ----------
  if (!courses.length) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <MenuBookRoundedIcon
          sx={{
            fontSize: 48,
            color: "grey.300",
            mb: 1,
          }}
        />

        <Typography
          variant="body1"
          color="text.secondary"
        >
          No courses uploaded yet.
        </Typography>
      </Box>
    );
  }

  // ---------- Highest Rating First ----------
  const sortedCourses = [...courses].sort(
    (a, b) =>
      (b.averageRating ?? 0) -
      (a.averageRating ?? 0)
  );

  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2.5,
        py: 2,
      }}
    >
      {sortedCourses.map((course) => {
        const organizationName =
          course.createdBy?.trim() || "Organization";

        const instructorName =
          course.instructor?.trim() || "Instructor";

        const level = course.level?.trim() || "";

        return (
          <Card
            key={course.id}
            elevation={0}
            onClick={() =>
              navigate(`/course-glossary/${course.id}`)
            }
            sx={{
              minWidth: 0,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              transition:
                "transform .2s ease, box-shadow .2s ease",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  "0 12px 24px rgba(79,70,229,0.15)",
                borderColor: "transparent",
              },
            }}
          >
            <CardActionArea>
              {/* ================= THUMBNAIL ================= */}
              <Box
                sx={{
                  position: "relative",
                }}
              >
                {course.image ? (
                  <CardMedia
                    component="img"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      height: 150,
                      objectFit: "cover",
                    }}
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

                {/* Hover Overlay */}
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

                    ".MuiCardActionArea-root:hover &": {
                      opacity: 1,
                    },
                  }}
                >
                  <PlayCircleRoundedIcon
                    sx={{
                      fontSize: 44,
                      color: "#fff",
                    }}
                  />
                </Box>

                {/* ================= FREE / PAID ================= */}
                <Chip
                  label={
                    course.isFree
                      ? "FREE"
                      : `₹${course.price ?? 0}`
                  }
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    height: 24,
                    fontSize: 11,
                    fontWeight: 700,

                    bgcolor: course.isFree
                      ? "#EEF2FF"
                      : "#DC2626",

                    color: course.isFree
                      ? "#4338CA"
                      : "#FFFFFF",

                    border: course.isFree
                      ? "1px solid #C7D2FE"
                      : "none",

                    borderRadius: "7px",
                  }}
                />
              </Box>

              {/* ================= CONTENT ================= */}
              <CardContent
                sx={{
                  p: 2,

                  // Bottom spacing kam
                  "&:last-child": {
                    pb: 1.5,
                  },
                }}
              >
                {/* ================= TITLE + STATUS ================= */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      fontSize: 15,
                      fontWeight: 700,
                      lineHeight: 1.3,

                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {course.title}
                  </Typography>

                  {/* Active / Inactive */}
                  <Chip
                    label={
                      course.active
                        ? "Active"
                        : "Inactive"
                    }
                    size="small"
                    sx={{
                      flexShrink: 0,
                      height: 22,
                      fontSize: 10,
                      fontWeight: 700,

                      bgcolor: course.active
                        ? "#DCFCE7"
                        : "#F1F5F9",

                      color: course.active
                        ? "#15803D"
                        : "#64748B",

                      border: course.active
                        ? "1px solid #BBF7D0"
                        : "1px solid #E2E8F0",
                    }}
                  />
                </Box>

                {/* ================= CATEGORY ================= */}
                {course.categories && (
                  <Chip
                    label={course.categories}
                    size="small"
                    sx={{
                      mb: 1,
                      height: 22,
                      bgcolor: "#EEF2FF",
                      color: "#4338CA",
                      fontWeight: 600,
                      fontSize: 11,
                      borderRadius: "6px",
                    }}
                  />
                )}

                {/* ================= ORGANIZATION + INSTRUCTOR ================= */}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={1.2}
                >
                  <Avatar
                    src={
                      course.organizationLogo ||
                      undefined
                    }
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: "#4F46E5",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {organizationName
                      .charAt(0)
                      .toUpperCase()}
                  </Avatar>

                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "text.secondary",
                        lineHeight: 1.2,
                        mb: 0.2,
                      }}
                    >
                      {instructorName}
                      {" | "}
                      {organizationName}
                      {/* Organization
                       */}
                    </Typography>

                  </Box>
                </Stack>

                {/* ================= RATING + CHAPTERS ================= */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1.1,
                  }}
                >
                  {/* Rating */}
                  {course.averageRating &&
                  course.averageRating > 0 ? (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                    >
                      <Rating
                        value={
                          course.averageRating
                        }
                        precision={0.5}
                        size="small"
                        readOnly
                      />

                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#475569",
                        }}
                      >
                        {course.averageRating.toFixed(
                          1
                        )}
                      </Typography>

                      {course.totalRatings !==
                        undefined &&
                        course.totalRatings > 0 && (
                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#94A3B8",
                            }}
                          >
                            ({course.totalRatings})
                          </Typography>
                        )}
                    </Stack>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#94A3B8",
                      }}
                    >
                      No ratings
                    </Typography>
                  )}

                  {/* Chapters */}
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#64748B",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {course.totalChapters ?? 0}{" "}
                    {course.totalChapters === 1
                      ? "Chapter"
                      : "Chapters"}
                  </Typography>
                </Box>

                {/* ================= LEVEL ================= */}
                {level && (
                  <Chip
                    label={level}
                    size="small"
                    color={getLevelColor(level)}
                    variant="outlined"
                    sx={{
                      height: 23,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
};

export default CoursesTab;
