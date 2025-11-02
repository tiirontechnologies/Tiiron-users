import {
  Box,
  Typography,
  Chip,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import DocumentIcon from "@icons/DocumentIcon";
import StarFilledIcon from "@icons/StarFilledIcon";
import DeleteIcon from "@icons/DeleteIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UPLOADS } from "../../../constants/constants";
import { ICourseCardProps } from "types/course.types";

interface ReusableCourseCardProps extends ICourseCardProps {
  price?: number;
  isInCart?: boolean;
  allowDelete?: boolean;
  isLoadingCart?: boolean;

  onCardClick?: () => void;
  onDeleteClick?: () => void;
  onAddToCartClick?: (e: React.MouseEvent) => void;
}

export default function CourseCard({
  thumbnailSrc,
  tags,
  title,
  chapters,
  rating,
  price = 0,
  allowDelete = false,
  isInCart = false,
  isLoadingCart = false,
  onAddToCartClick,
  onCardClick,
  onDeleteClick,
}: ReusableCourseCardProps) {
  return (
    <Box
      sx={{
        width: 268,
        height: 311,
        borderRadius: "20px",
        padding: 1.5,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: "#fff",
        cursor: onCardClick ? "pointer" : "default",
      }}
      onClick={onCardClick}
    >
      {/* Thumbnail */}
      <Box sx={{ height: 113, borderRadius: 2, overflow: "hidden" }}>
        {thumbnailSrc ? (
          <img
            src={UPLOADS + thumbnailSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
      </Box>

      {/* Tags */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
        {tags?.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            sx={{ fontSize: "10px", bgcolor: "#E2D5FF", color: "#452B80" }}
          />
        ))}
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          mt: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </Typography>

      {/* Price */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, fontSize: 18 }}
        color={price > 0 ? "error.main" : "success.main"}
      >
        {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
      </Typography>

      {/* Add / Remove / Delete Button */}
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
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "#452B80",
            "&:hover": { bgcolor: "#3a2366" },
          }}
        >
          {isLoadingCart ? "Adding..." : isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      )}

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
            bgcolor: "#fff",
            "&:hover": { bgcolor: "#eee" },
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}

      {/* Footer Section */}
      <Divider sx={{ position: "absolute", bottom: 37, left: 12, right: 12 }} />
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          left: 12,
          right: 12,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <DocumentIcon />
          <Typography sx={{ fontSize: 12, color: "#666" }}>
            {chapters} Chapters
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <StarFilledIcon />
          <Typography sx={{ fontSize: 12, color: "#666" }}>{rating}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
