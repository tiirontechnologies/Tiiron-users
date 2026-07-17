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
import { School , MenuBookRounded } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";
import { COLORS, GRADIENTS, SHADOWS } from "../../constants";
import { useGetMyRatingQuery } from "../../api/courseProgressApi";
import { useParams } from "react-router-dom";
import RatingDialog from "../Rating/RatingDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface HeaderProps {
  courseName?: string;
  chapterInfo?: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  courseName,
  chapterInfo,
  onMenuClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openRating, setOpenRating] = React.useState(false);

  const { courseId } = useParams();

  const { data } = useGetMyRatingQuery(
    { courseId: courseId as string },
    { skip: !courseId },
  );

  const averageRating = data?.data?.value || 0;
  const myRating = data?.data;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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
                  gap: 0.8,
                  whiteSpace: "nowrap",
                }}
              >
              <MenuBookRounded sx={{ fontSize: "19px", color: "#6563d3" }} />
              {chapterInfo}
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
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1, md: 2 },
            ml: { xs: 1, sm: 2 },
            flexShrink: 0,
          }}
        >
          {averageRating ? (
            <>
              {/* Mobile: button-style rating chip */}
              <Box
                sx={{
                  display: { xs: "flex", sm: "none" },
                  alignItems: "center",
                  gap: 0.5,
                  background: "#FFF7ED",
                  border: "1px solid #FDBA74",
                  borderRadius: "999px",
                  px: 1.2,
                  py: 0.4,
                }}
              >
                <StarIcon sx={{ fontSize: "14px", color: "#F97316" }} />
                <Typography
                  sx={{ fontWeight: 600, fontSize: "11px", color: "#c2410c" }}
                >
                  {averageRating.toFixed(1)} Rating
                </Typography>
              </Box>

              {/* Desktop/Tablet: full stars + count + Update button (same as pehle) */}
              <Rating
                value={averageRating}
                readOnly
                precision={0.5}
                sx={{ display: { xs: "none", sm: "flex" }, color: "#F97316" }}
              />
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: 600,
                  fontSize: { sm: "13px", md: "14px" },
                }}
              >
                {averageRating.toFixed(1)}
                {/* {data?.data?.totalReviews ? ` (${data.data.totalReviews})` : ""} */}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenRating(true)}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  background: "transparent !important",
                  color: "#f97316 !important",
                  border: "1.5px solid #f97316 !important",
                  borderRadius: "10px !important",
                  textTransform: "none !important",
                  fontWeight: "600 !important",
                  fontSize: { sm: "12px", md: "14px" },
                  boxShadow: "none !important",
                  px: { sm: 1, md: 1.5 },
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
            <>
              {/* Mobile: rating nahi hai to chhota star icon */}
              <IconButton
                onClick={() => setOpenRating(true)}
                size="small"
                sx={{ display: { xs: "flex", sm: "none" }, p: 0.5 }}
              >
                <StarIcon sx={{ fontSize: "20px", color: "#F97316" }} />
              </IconButton>

              {/* Desktop/Tablet: full Rate button */}
              <Button
                variant="contained"
                disableElevation
                startIcon={<StarIcon sx={{ fontSize: "16px" }} />}
                onClick={() => setOpenRating(true)}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
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
            </>
          )}

          {/* Three dot - sirf mobile pe, sirf jab rating already di hai (Update ke liye) */}
          {averageRating ? (
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{ display: { xs: "flex", sm: "none" }, p: 0.5 }}
            >
              <MoreVertIcon sx={{ fontSize: "18px", color: "#374151" }} />
            </IconButton>
          ) : null}

          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                setOpenRating(true);
                handleMenuClose();
              }}
            >
              Update Rating
            </MenuItem>
          </Menu>
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
