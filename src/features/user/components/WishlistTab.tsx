import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  type ICartItem,
} from "../../course-browse/api/courseApi";

function getWishlistItems(data: { data: ICartItem[] | { items: ICartItem[] } } | undefined) {
  return Array.isArray(data?.data) ? data.data : data?.data?.items ?? [];
}

// Card thumbnail ke liye gradient set (letter ke hisaab se rotate hoga) - fallback jab image na ho
const GRADIENTS = [
  "linear-gradient(135deg, #34d399, #10b981)",
  "linear-gradient(135deg, #60a5fa, #2563eb)",
  "linear-gradient(135deg, #4ade80, #16a34a)",
  "linear-gradient(135deg, #f472b6, #db2777)",
  "linear-gradient(135deg, #fbbf24, #f59e0b)",
];

function getGradient(title: string) {
  const idx = (title?.charCodeAt(0) || 0) % GRADIENTS.length;
  return GRADIENTS[idx];
}

export default function WishlistTab() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [removingId, setRemovingId] = useState<number | null>(null);

  const items = getWishlistItems(data);

  useEffect(() => {
    if (removingId !== null && !items.some((item) => item.courseId === removingId)) {
      setRemovingId(null);
    }
  }, [items, removingId]);

  const showSnackbar = (message: string, severity: "success" | "error") =>
    setSnackbar({ open: true, message, severity });

  const handleRemove = async (courseId: number) => {
    setRemovingId(courseId);
    try {
      await removeFromWishlist({ courseId }).unwrap();
      const refreshed = await refetch().unwrap();
      const refreshedItems = getWishlistItems(refreshed);
      if (refreshedItems.some((item) => item.courseId === courseId)) {
        showSnackbar("Wishlist update is still syncing.", "error");
        return;
      }
      showSnackbar("Removed from wishlist", "success");
      setRemovingId(null);
    } catch (error: any) {
      showSnackbar(error?.data?.message || "Could not remove this course.", "error");
      setRemovingId(null);
    }
  };

  const handleEnroll = (courseId: number) => {
    navigate(`/course-glossary/${courseId}`);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} variant="rounded" height={360} />
        ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 6, textAlign: "center" }}>
        <Typography fontWeight={800}>Wishlist could not be loaded</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Please refresh and try again.
        </Typography>
      </Box>
    );
  }

  if (!items.length) {
    return (
      <Box
        sx={{
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          mt: 2.5,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(239,20,46,0.08)",
            border: "1px solid rgba(239,20,46,0.15)",
            mb: 2.5,
          }}
        >
          <FavoriteBorderRoundedIcon sx={{ fontSize: 28, color: "#ef142e" }} />
        </Box>

        <Typography fontWeight={700} sx={{ fontSize: "16px", color: "#374151", mb: 0.5 }}>
          Your wishlist is empty
        </Typography>

        <Typography variant="body2" sx={{ color: "#9ca3af", maxWidth: 320 }}>
          Save courses you want to explore later.
        </Typography>

        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/course-glossary")}
          sx={{
            mt: 3,
            mb: 3,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "13px",
            borderRadius: "10px",
            borderColor: "#4F39F6",
            color: "#4F39F6",
            "&:hover": {
              borderColor: "#3E2DC4",
              bgcolor: "#3E2DC4",
              color: "#fff",
            },
          }}
        >
          Browse Courses
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
      <Typography fontWeight={800} mb={3}>
        My Wishlist
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(200px, 240px))",
            lg: "repeat(3, minmax(220px, 260px))",
          },
          gap: { xs: 2, md: 3 },
        }}
      >
        {items.map((item) => {
          const course = item.course;
          const title = course?.title || "Saved course";
          const price = Number(course?.price ?? 0);
          const isFree = course?.isFree ?? price === 0;
          const instructor = course?.instructor || course?.createdBy || "HeroAcademy";
          const isRemoving = removingId === item.courseId;
          const imageUrl = course?.image;

          return (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #eef0f3",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#fff",
                p: 0,
              }}
            >
              {/* Thumbnail: real image agar available ho, warna gradient+letter fallback */}
              <Box
                sx={{
                  position: "relative",
                  height: 140,
                  background: imageUrl ? "#f3f4f6" : getGradient(title),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {imageUrl ? (
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      // image broken ho to hide kar do, letter fallback ka space dikh jayega
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Typography sx={{ fontSize: 48, fontWeight: 800, color: "#fff" }}>
                    {title.charAt(0).toUpperCase()}
                  </Typography>
                )}

                <Chip
                  label="Wishlisted"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    bgcolor: "rgba(0,0,0,0.35)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={isFree ? "Free" : `₹${price}`}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 44,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
                <Box
                  component="button"
                  onClick={() => handleRemove(item.courseId)}
                  disabled={isRemoving}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    border: "none",
                    bgcolor: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                >
                  {isRemoving ? (
                    <CircularProgress size={16} />
                  ) : (
                    <FavoriteRoundedIcon sx={{ fontSize: 18, color: "#ef4444" }} />
                  )}
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography fontWeight={800} noWrap>
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 1.5,
                  }}
                >
                  {course?.description || "check course"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      bgcolor: "#6366f1",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {instructor.charAt(0).toUpperCase()}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Instructor | {instructor}
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  startIcon={<PlayArrowRoundedIcon />}
                  onClick={() => handleEnroll(item.courseId)}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: "none",
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    "&:hover": { background: "linear-gradient(90deg, #4f46e5, #7c3aed)" },
                  }}
                >
                  Enroll Now
                </Button>
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((current) => ({ ...current, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((current) => ({ ...current, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

