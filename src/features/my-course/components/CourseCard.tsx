import {
  Box,
  Typography,
  Chip,
  Divider,
  IconButton,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
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
import {
  useAddToCartServerMutation,
  useGetCartQuery,
} from "../../../features/course/api/courseApi";

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

  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
  });

  const isCourseInCart = cartData?.data?.items?.some(
    (item) => item.courseId === id
  );

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, SetSnackbarMessage] = useState("");
  const [snacbarSeverity, setSnacbarSeverity] = useState("success");

  const handleCardClick = () => {
      navigate(`/course-practice/${id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log("CLICKED CARD ID:", id, "Type:", typeof id);

    if (!id || typeof id !== "number") {
      SetSnackbarMessage("Error: Cannot add course. Course ID is missing.");
      setSnacbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Add to Cart Error: Course ID is invalid or missing.", {
        id,
      });
      return;
    }

    if (isCourseInCart) {
      SetSnackbarMessage("Course already exists in your cart.");
      setSnacbarSeverity("info");
      setSnackbarOpen(true);
      return;
    }

    try {
      await addToCartServer({ courseId: id }).unwrap();

      // SUCCESS Feedback
      SetSnackbarMessage(`"${title}" successfully added to your cart!`);
      setSnacbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error: any) {
      // ERROR Feedback
      let errorMessage = "Failed to add course to cart.";
      let severity: "success" | "error" | "info" | "warning" = "error";

      // Extract server-side error message
      const serverMessage =
        error?.data?.errors?.[0]?.message || error?.data?.message;

      if (serverMessage) {
        // Check for specific error like 'already in cart'
        if (serverMessage.toLowerCase().includes("already in cart")) {
          errorMessage = "This course is already in your cart.";
          severity = "warning";
        } else {
          errorMessage = serverMessage;
          severity = "error";
        }
      }

      SetSnackbarMessage(errorMessage);
      setSnacbarSeverity(severity);
      setSnackbarOpen(true);
      console.error("Add to Cart Server Error:", error);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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

      <Typography
        variant="h6"
        color={price > 0 ? "error.main" : "success.main"}
        sx={{
          fontWeight: 700,
          fontSize: isBrowsingPage ? 18 : 16,
          mt: 0.5,
        }}
      >
        {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
      </Typography>

      {isBrowsingPage ? (
        <Button
          variant="contained"
          size="small"
          startIcon={
            isAddingToCart ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <ShoppingCartIcon />
            )
          }
          disabled={isCourseInCart || isAddingToCart} // <-- isAddingToCart added
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
          {isAddingToCart
            ? "Adding..."
            : isCourseInCart
            ? "In Cart"
            : "Add to Cart"}
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
