import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import StarRatings from "./StarRatings";
import UserTestimonial from "./UserTestimonial";
import { useGetCourseRatingQuery } from "../api/courseApi";

const PAGE_SIZE = 4;

export default function CourseReviews({ courseId }: { courseId: number }) {
  const { data, isLoading, isError } =
    useGetCourseRatingQuery(courseId);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" textAlign="center">
        Failed to load reviews.
      </Typography>
    );
  }

  const ratingsData = data?.data;
  const allRatings = ratingsData?.ratings ?? [];
  const visibleRatings = allRatings.slice(0, visibleCount);
  const hasMore = visibleCount < allRatings.length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 , mt:3, }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <Box sx={{ width: { xs: "100%", lg: 320 }, flexShrink: 0 }}>
          <StarRatings
            averageRating={ratingsData?.averageRating}
            totalRatings={ratingsData?.totalRatings}
            ratings={allRatings}
          />
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          {allRatings.length === 0 ? (
            <Box
              sx={{
                border: "1px dashed #CBD5E1",
                borderRadius: 3,
                py: 6,
                px: 3,
                textAlign: "center",
                bgcolor: "#F8FAFC",
              }}
            >
              <RateReviewOutlinedIcon
                sx={{ fontSize: 46, color: "#94A3B8", mb: 1 }}
              />
              <Typography fontWeight={700} fontSize={18}>
                No Reviews Yet
              </Typography>
              <Typography color="#64748B" fontSize={14} mt={0.5}>
                Be the first learner to share your experience for this course.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {visibleRatings.map((item: any) => (
                <UserTestimonial
                  key={item.id}
                  name={`${item.user.firstName} ${item.user.lastName}`}
                  rating={item.value}
                  date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  review={item.review}
                  avatar={item.user.profile?.picture}
                />
              ))}

              {hasMore && (
                <Button
                  variant="outlined"
                  onClick={() => setVisibleCount((p) => p + PAGE_SIZE)}
                  sx={{
                    mt: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.2,
                  }}
                >
                  View More Reviews ({allRatings.length - visibleCount})
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}