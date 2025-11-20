import { Avatar, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function StarRatings() {
  const ratings = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 10 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];

  const averageRating = 4.6;
  const totalReviews = 146951;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: 320 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: { xs: 2, md: 3 },
        bgcolor: "#FAFBFC",
        borderRadius: 3,
        border: "1px solid #E2E8F0",
      }}
    >
      {/* Top Rating Summary */}
      <Box display="flex" alignItems="center" gap={1.5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              sx={{
                fontSize: 20,
                color: i < Math.floor(averageRating) ? "#FBBF24" : "#E2E8F0",
              }}
            />
          ))}
        </Box>
        <Typography
          fontWeight={700}
          fontSize={24}
          sx={{ color: "#0F172A" }}
        >
          {averageRating}
        </Typography>
        <Typography
          color="text.secondary"
          fontSize={14}
          fontWeight={500}
          sx={{ color: "#64748B" }}
        >
          {totalReviews.toLocaleString()} reviews
        </Typography>
      </Box>

      {/* Rating Rows */}
      <Box display="flex" flexDirection="column" gap={1.5}>
        {ratings.map((rating, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              "&:hover": {
                "& .rating-bar": {
                  opacity: 0.8,
                },
              },
            }}
          >
            <Box display="flex" gap={0.5} alignItems="center" minWidth={80}>
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  component="span"
                  sx={{
                    fontSize: 14,
                    color: i < rating.stars ? "#FBBF24" : "#E2E8F0",
                  }}
                >
                  {i < rating.stars ? "★" : "☆"}
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                flex: 1,
                height: 8,
                bgcolor: "#E2E8F0",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                className="rating-bar"
                sx={{
                  height: "100%",
                  width: `${rating.percent}%`,
                  bgcolor: "#6A42AB",
                  borderRadius: 4,
                  transition: "opacity 0.2s ease",
                }}
              />
            </Box>
            <Typography
              fontSize={14}
              fontWeight={600}
              sx={{ color: "#475569", minWidth: 40, textAlign: "right" }}
            >
              {rating.percent}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

