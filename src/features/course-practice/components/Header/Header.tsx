import React from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { School } from '@mui/icons-material';
import { COLORS, GRADIENTS, SHADOWS } from '../../constants';
import { Button, Rating } from "@mui/material";
import { useGetCourseRatingsQuery ,useGetMyRatingQuery} from "../../api/courseProgressApi";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import RatingDialog from "../Rating/RatingDialog";

interface HeaderProps {
  courseName?: string;
  chapterInfo?: string;
}

const Header: React.FC<HeaderProps> = ({
  courseName = "",
  chapterInfo = "Chapter 1 - Lesson 1",
}) => {
  const [openRating, setOpenRating] = React.useState(false);

  const { courseId } = useParams();

const { data } = useGetMyRatingQuery(
  { courseId: courseId as string },
  { skip: !courseId }
);

  const averageRating = data?.data?.value || 0;
  const myRating = data?.data;
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "289px",
          right: 0,
          height: "84px",
          background: COLORS.background.white,
          color: COLORS.text.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "0 32px",
          borderBottom: `1px solid ${COLORS.border.light}`,
          boxShadow: SHADOWS.sm,
          zIndex: 1000,
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ background: GRADIENTS.primary, width: 48, height: 48 }}>
            <School sx={{ color: "white", fontSize: 24 }} />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: 700, color: COLORS.text.primary, lineHeight: 1.2 }}>
              {courseName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
              <Typography
                component="span"
                sx={{ fontWeight: "500", fontSize: "14px", color: COLORS.text.muted, display: "flex", alignItems: "center", gap: 0.5 }}
              >
                📚 {chapterInfo}
              </Typography>
              <Chip
                label="In Progress"
                size="small"
                sx={{ background: GRADIENTS.primary, color: "white", fontWeight: 600, fontSize: "12px", height: "20px" }}
              />
            </Box>
          </Box>
        </Box>

        {/* Right Section - Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {averageRating ? (
            <>
              <Rating value={averageRating} readOnly precision={0.5} sx={{ color: "#F97316" }} />
              <Typography sx={{ fontWeight: 600 }}>
                {averageRating.toFixed(1)}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenRating(true)}
                sx={{
    flex: 1,
    background: "transparent !important",
    color: "#f97316 !important",
    border: "1.5px solid #f97316 !important",
    borderRadius: "10px !important",
    textTransform: "none !important",
    fontWeight: "600 !important",
    boxShadow: "none !important",
    "&:hover": {background: "transparent !important", color: "#f97316 !important", },
  }}
              >
                Update Rating
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              disableElevation
              startIcon={<StarIcon />}
              onClick={() => setOpenRating(true)}
              sx={{
                backgroundColor: "#F97316 !important",
                color: "#fff !important",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "999px",
                px: 2.5,
                py: 0.8,
                boxShadow: "0 2px 8px rgba(238,156,14,0.4) !important",
                "&:hover": { backgroundColor: "#F97316 !important", boxShadow: "0 4px 12px rgba(217,119,6,0.5) !important" },
                "&:active": { backgroundColor: "#F97316 !important" },
              }}
            >
              Rate this Course
            </Button>
          )}
        </Box>
      </Box>

<RatingDialog
  open={openRating}
  onClose={() => setOpenRating(false)}
  isUpdate={!!myRating} 
  initialRating={myRating?.value}
  initialReview={myRating?.review}
/>
    </>
  );
};

export default Header;