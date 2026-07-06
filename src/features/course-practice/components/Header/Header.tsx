
import React from "react";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Button,
  Rating,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { School } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";
import { COLORS, GRADIENTS, SHADOWS } from "../../constants";
import { useGetMyRatingQuery } from "../../api/courseProgressApi";
import { useParams } from "react-router-dom";
import RatingDialog from "../Rating/RatingDialog";

interface HeaderProps {
  courseName?: string;
  chapterInfo?: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ courseName, chapterInfo, onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
          left: 0,
          right: 0,
          height: { xs: "64px", sm: "72px", md: "72px" },
          background: COLORS.background.white,
          color: COLORS.text.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 1.5, sm: 2, md: 3 },
          borderBottom: `1px solid ${COLORS.border.light}`,
          boxShadow: SHADOWS.sm,
          zIndex: 1001,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5, md: 2 },
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Hamburger Menu - Mobile Only */}
          {isMobile && (
            <IconButton
              onClick={onMenuClick}
              sx={{ color: "#374151" }}
              size="small"
            >
              <MenuIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          )}

          {/* Avatar */}
          <Avatar
            sx={{
              background: GRADIENTS.primary,
              width: { xs: 34, sm: 40, md: 42 },
              height: { xs: 34, sm: 40, md: 42 },
              flexShrink: 0,
            }}
          >
            <School sx={{ color: "white", fontSize: { xs: 18, md: 22 } }} />
          </Avatar>

          {/* Course Info */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                fontWeight: 700,
                color: COLORS.text.primary,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {courseName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: { xs: 0.25, md: 0.5 },
                flexWrap: "wrap",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "11px", sm: "12px", md: "13px" },
                  color: COLORS.text.muted,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                📚 {chapterInfo}
              </Typography>
              <Chip
                label="In Progress"
                size="small"
                sx={{
                  background: GRADIENTS.primary,
                  color: "white",
                  fontWeight: 600,
                  fontSize: { xs: "10px", md: "12px" },
                  height: { xs: "18px", md: "20px" },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Right Section - Rating (Hidden on mobile) */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "flex" },
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            ml: 2,
            flexShrink: 0,
          }}
        >
          {averageRating ? (
            <>
              <Rating
                value={averageRating}
                readOnly
                precision={0.5}
                sx={{ color: "#F97316" }}
              />
              <Typography sx={{ fontWeight: 600, fontSize: { xs: "13px", md: "14px" } }}>
                {averageRating.toFixed(1)}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenRating(true)}
                sx={{
                  background: "transparent !important",
                  color: "#f97316 !important",
                  border: "1.5px solid #f97316 !important",
                  borderRadius: "10px !important",
                  textTransform: "none !important",
                  fontWeight: "600 !important",
                  fontSize: { xs: "12px", md: "14px" },
                  boxShadow: "none !important",
                  px: { xs: 1, md: 1.5 },
                  py: 0.5,
                  "&:hover": {
                    background: "transparent !important",
                    color: "#f97316 !important",
                  },
                }}
              >
                Update
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              disableElevation
              startIcon={<StarIcon sx={{ fontSize: "16px" }} />}
              onClick={() => setOpenRating(true)}
              sx={{
                backgroundColor: "#F97316 !important",
                color: "#fff !important",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "999px",
                px: { xs: 1.5, md: 2.5 },
                py: { xs: 0.5, md: 0.8 },
                fontSize: { xs: "12px", md: "14px" },
                boxShadow: "0 2px 8px rgba(238,156,14,0.4) !important",
                "&:hover": {
                  backgroundColor: "#F97316 !important",
                  boxShadow: "0 4px 12px rgba(217,119,6,0.5) !important",
                },
                "&:active": { backgroundColor: "#F97316 !important" },
              }}
            >
              Rate
            </Button>
          )}
        </Box>
      </Box>

      {/* Rating Dialog */}
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
