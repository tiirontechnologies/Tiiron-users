import {
  Box,
  Typography,
  Chip,
  Divider,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DocumentIcon from "@icons/DocumentIcon";
import StarFilledIcon from "@icons/StarFilledIcon";
import { UPLOADS } from "../../../constants/constants";
import DeleteIcon from "@icons/DeleteIcon";
import { Link } from "react-router-dom";
import { ICourseCardProps } from "types/course.types";
import { useModal } from "../../../hooks/useModal";
import { DeleteModal } from "../components/DeleteCourseModal";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../../slices/cartSlice";

export default function CourseCard({
  thumbnailSrc,
  tags,
  title,
  chapters,
  rating,
  id,
  isBrowsingPage,
  price = 0, // Safely defaulting price to 0 if not provided
}: ICourseCardProps & { price?: number }) {
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isCourseInCart = cartItems.some((item) => item.id === id);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, SetSnackbarMessage] = useState("");
  const [snacbarSeverity, setSnacbarSeverity] = useState("success");

  const handleCardClick = () => {
    if (isBrowsingPage) {
      // If browsing, navigate to the course detail/practice page
      navigate(`/course-practice/${id}`);
    } else {
      // If not browsing, navigate to edit
      navigate(`edit/${id}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isCourseInCart) {
      SetSnackbarMessage("Course already exists in your cart.");
      setSnacbarSeverity("info");
      setSnackbarOpen(true);
      return; // Stop execution
    }

    // 1. Prepare data payload
    const courseToAdd = {
      id: id,
      title: title,
      price: price,
      thumbnail: UPLOADS + thumbnailSrc,
    };

    // 2. Dispatch to Redux Store
    dispatch(addToCart(courseToAdd));

    // 3. Show success feedback
    SetSnackbarMessage("Course added to cart successfully!");
    setSnacbarSeverity("success");
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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
        overflow: "hidden",
        flexShrink: 0,
        background: "#fff",
      }}
      onClick={handleCardClick}
    >
      <Box
        sx={{
          borderRadius: 2,
          height: 113,
          width: "100%",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
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
              backgroundColor: "#E2D5FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#452B80",
              fontWeight: 600,
            }}
          >
            No Image
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: "10px" }}>
        {tags?.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            sx={{
              fontSize: "10px",
              backgroundColor: "#E2D5FF",
              color: "#452B80",
            }}
          />
        ))}
      </Box>
      {isBrowsingPage ? (
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: "10px",
            color: "black",
            cursor: "pointer",
          }}
        >
          {title}
        </Typography>
      ) : (
        <Link
          to={`edit/${id}`}
          style={{
            fontWeight: 600,
            fontSize: 16,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: "10px",
            textDecoration: "none",
            color: "black",
          }}
        >
          {title}
        </Link>
      )}
      {isBrowsingPage ? (
        <Button
          variant="contained"
          size="small"
          startIcon={<ShoppingCartIcon />}
          disabled={isCourseInCart} // <-- Disabled based on Redux state
          onClick={handleAddToCart}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
            backgroundColor: "#452B80",
            "&:hover": { backgroundColor: "#3a2366" },
          }}
        >
          {isCourseInCart ? "In Cart" : "Add to Cart"}
        </Button>
      ) : (
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            background: "#fff",
            "&:hover": { background: "#eee" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
      <Divider
        sx={{
          position: "absolute",
          bottom: 37,
          left: 12,
          right: 12,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          bottom: 12,
          left: 12,
          right: 12,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <DocumentIcon />
          <Typography sx={{ fontSize: "12px", color: "#666666" }}>
            {chapters} Chapters
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <StarFilledIcon />
          <Typography sx={{ fontSize: "12px", color: "#666666", mt: "3px" }}>
            {rating}
          </Typography>
        </Box>
      </Box>
      {!isBrowsingPage && (
        <DeleteModal isOpen={isOpen} onClose={closeModal} id={id} />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snacbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
