import {
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Rating,
  LinearProgress,
} from "@mui/material";
import DocumentIcon from "@icons/DocumentIcon";
import DeleteIcon from "@icons/DeleteIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArchiveIcon from "@mui/icons-material/Archive";
import { UPLOADS } from "../../../constants/constants";
import { ICourseCardProps } from "types/course.types";

interface ReusableCourseCardProps extends ICourseCardProps {
  price?: number;
  isInCart?: boolean;
  allowDelete?: boolean;
  isLoadingCart?: boolean;
  instructor?: string;
  reviewCount?: number;
  progress?: number;
  learnerRating?: number;
  variant?: "browse" | "my-course";
  onStartCourse?: (courseId: number) => void;
  onShare?: (courseId: number) => void;
  onFavorite?: (courseId: number) => void;
  onArchive?: (courseId: number) => void;
  isFavorite?: boolean;

  onCardClick?: () => void;
  onDeleteClick?: () => void;
  onAddToCartClick?: (e: React.MouseEvent) => void;
}

export default function CourseCard({
  thumbnailSrc,
  tags,
  title,
  chapters,
  rating = 0,
  price = 0,
  allowDelete = false,
  isInCart = false,
  isLoadingCart = false,
  instructor,
  reviewCount = 0,
  progress = 0,
  learnerRating = 0,
  variant = "browse",
  onStartCourse,
  onShare,
  onFavorite,
  onArchive,
  isFavorite = false,
  onAddToCartClick,
  onCardClick,
  onDeleteClick,
  id,
}: ReusableCourseCardProps) {
  const displayRating = rating > 0 ? rating.toFixed(1) : "0.0";
  const displayLearnerRating = learnerRating > 0 ? learnerRating.toFixed(1) : "0.0";
  const formattedReviewCount =
    reviewCount > 0
      ? reviewCount >= 1000
        ? `${(reviewCount / 1000).toFixed(1)}k`
        : reviewCount.toString()
      : "0";

  const handleStartCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStartCourse && id) {
      onStartCourse(id);
    } else if (onCardClick) {
      onCardClick();
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare && id) {
      onShare(id);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavorite && id) {
      onFavorite(id);
    }
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onArchive && id) {
      onArchive(id);
    }
  };

  // My Course Variant
  if (variant === "my-course") {
    return (
      <Box
        sx={{
          width: 290,
          minHeight: 400,
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#fff",
          cursor: "default",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Thumbnail */}
        <Box
          sx={{
            width: "100%",
            height: 160,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {thumbnailSrc ? (
            <img
              src={UPLOADS + thumbnailSrc}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                bgcolor: "#E2D5FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#452B80",
                fontWeight: 600,
              }}
            >
              No Image
            </Box>
          )}

          {/* Delete button overlay */}
          {allowDelete && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick?.();
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>

        {/* Content Section */}
        <Box sx={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Line 1: Course Title */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: 1.3,
              mb: 0.25,
              color: "#1c1d1f",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "42px",
            }}
          >
            {title}
          </Typography>

          {/* Line 2: Instructor/Organization */}
          {instructor && (
            <Typography
              sx={{
                fontSize: "13px",
                color: "#6a6f73",
                mb: 1.25,
                lineHeight: 1.4,
                fontWeight: 400,
              }}
            >
              {instructor}
            </Typography>
          )}

          {/* Line 3: Progress Bar - Only the broader rounded one */}
          <Box sx={{ mb: 1.5 }}>
            <Box
              sx={{
                width: "100%",
                height: 8,
                bgcolor: "#e5e5e5",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: "100%",
                  borderRadius: "4px",
                  bgcolor: "#e5e5e5",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#452B80",
                    borderRadius: "4px",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Line 4: START COURSE Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleStartCourse}
            sx={{
              bgcolor: "#452B80",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "14px",
              py: 0.75,
              mb: 1.5,
              minHeight: "36px",
              "&:hover": {
                bgcolor: "#3a2366",
              },
            }}
          >
            START COURSE
          </Button>

          {/* Rating Section */}
          {learnerRating > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#b4690e",
                }}
              >
                {displayLearnerRating}
              </Typography>
              <Rating
                value={learnerRating}
                precision={0.5}
                readOnly
                size="small"
                sx={{
                  fontSize: "14px",
                  "& .MuiRating-iconFilled": {
                    color: "#b4690e",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#d1d1d1",
                  },
                }}
              />
            </Box>
          )}

          {/* Action Icons: Share, Favorite, Archive */}
          <Box
            sx={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 1.25,
              borderTop: "1px solid #e5e5e5",
            }}
          >
            <Box
              onClick={handleShare}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.25,
                cursor: "pointer",
                flex: 1,
                py: 0.5,
                borderRadius: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <ShareIcon sx={{ fontSize: 18, color: "#6a6f73" }} />
              <Typography sx={{ fontSize: "10px", color: "#6a6f73", fontWeight: 500 }}>
                Share
              </Typography>
            </Box>

            <Box
              onClick={handleFavorite}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.25,
                cursor: "pointer",
                flex: 1,
                py: 0.5,
                borderRadius: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ fontSize: 18, color: "#e91e63" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 18, color: "#6a6f73" }} />
              )}
              <Typography sx={{ fontSize: "10px", color: "#6a6f73", fontWeight: 500 }}>
                Favorite
              </Typography>
            </Box>

            <Box
              onClick={handleArchive}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.25,
                cursor: "pointer",
                flex: 1,
                py: 0.5,
                borderRadius: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <ArchiveIcon sx={{ fontSize: 18, color: "#6a6f73" }} />
              <Typography sx={{ fontSize: "10px", color: "#6a6f73", fontWeight: 500 }}>
                Archive
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Browse Variant (default)
  return (
    <Box
      sx={{
        width: 290,
        minHeight: 380,
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: "#fff",
        cursor: onCardClick ? "pointer" : "default",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          transform: "translateY(-2px)",
        },
      }}
      onClick={onCardClick}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          width: "100%",
          height: 160,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {thumbnailSrc ? (
          <img
            src={UPLOADS + thumbnailSrc}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              bgcolor: "#E2D5FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#452B80",
              fontWeight: 600,
            }}
          >
            No Image
          </Box>
        )}

        {/* Delete button overlay */}
        {allowDelete && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.();
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tags */}
        {tags && tags.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
            {tags.slice(0, 2).map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                size="small"
                sx={{
                  fontSize: "10px",
                  height: "20px",
                  bgcolor: "#E2D5FF",
                  color: "#452B80",
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        )}

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: 1.4,
            mb: 0.5,
            color: "#1c1d1f",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "44px",
          }}
        >
          {title}
        </Typography>

        {/* Instructor */}
        {instructor && (
          <Typography
            sx={{
              fontSize: "12px",
              color: "#6a6f73",
              mb: 1,
            }}
          >
            {instructor}
          </Typography>
        )}

        {/* Rating and Reviews */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#b4690e",
            }}
          >
            {displayRating}
          </Typography>
          <Rating
            value={rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              fontSize: "16px",
              "& .MuiRating-iconFilled": {
                color: "#b4690e",
              },
              "& .MuiRating-iconEmpty": {
                color: "#d1d1d1",
              },
            }}
          />
          {reviewCount > 0 && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "#6a6f73",
                ml: 0.5,
              }}
            >
              ({formattedReviewCount})
            </Typography>
          )}
        </Box>

        {/* Chapters */}
        {chapters !== undefined && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 2,
            }}
          >
            <DocumentIcon />
            <Typography
              sx={{
                fontSize: "12px",
                color: "#6a6f73",
              }}
            >
              {chapters} {chapters === 1 ? "Chapter" : "Chapters"}
            </Typography>
          </Box>
        )}

        {/* Price and Add to Cart */}
        <Box
          sx={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 1,
            borderTop: "1px solid #e5e5e5",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              color: price > 0 ? "#1c1d1f" : "#6a6f73",
            }}
          >
            {price === 0 ? "FREE" : `$${price.toFixed(0)}`}
          </Typography>

          {onAddToCartClick && (
            <Button
              variant="contained"
              size="small"
              startIcon={!isLoadingCart && <ShoppingCartIcon />}
              disabled={isInCart || isLoadingCart}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCartClick(e);
              }}
              sx={{
                bgcolor: "#452B80",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                px: 2,
                py: 0.75,
                "&:hover": {
                  bgcolor: "#3a2366",
                },
                "&:disabled": {
                  bgcolor: "#d1d7dc",
                  color: "#fff",
                },
              }}
            >
              {isLoadingCart
                ? "Adding..."
                : isInCart
                  ? "In Cart"
                  : "Add to cart"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
