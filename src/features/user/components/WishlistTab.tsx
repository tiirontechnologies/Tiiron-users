// import { useState } from "react";
// import { Alert, Box, Skeleton, Snackbar, Typography } from "@mui/material";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
// import {
//   useGetWishlistQuery,
//   useRemoveFromWishlistMutation,
//   type ICartItem,
// } from "../../course-browse/api/courseApi";

// function getWishlistItems(data: { data: ICartItem[] | { items: ICartItem[] } } | undefined) {
//   return Array.isArray(data?.data) ? data.data : data?.data?.items ?? [];
// }

// export default function WishlistTab() {
//   const { data, isLoading, isError } = useGetWishlistQuery();
//   const [removeFromWishlist] = useRemoveFromWishlistMutation();
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
//   const items = getWishlistItems(data);

//   const handleRemove = async (courseId: number) => {
//     try {
//       await removeFromWishlist({ courseId }).unwrap();
//       setSnackbar({ open: true, message: "Removed from wishlist", severity: "success" });
//     } catch (error: any) {
//       setSnackbar({ open: true, message: error?.data?.message || "Could not remove this course.", severity: "error" });
//     }
//   };

//   if (isLoading) {
//     return <Box sx={{ p: { xs: 2, sm: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}><Skeleton variant="rounded" height={400} /><Skeleton variant="rounded" height={400} /></Box>;
//   }

//   if (isError) {
//     return <Box sx={{ p: 6, textAlign: "center" }}><Typography fontWeight={800}>Wishlist could not be loaded</Typography><Typography variant="body2" color="text.secondary" mt={1}>Please refresh and try again.</Typography></Box>;
//   }

//   if (!items.length) {
//     return <Box sx={{ p: { xs: 5, sm: 7 }, textAlign: "center" }}><FavoriteBorderRoundedIcon sx={{ fontSize: 48, color: "#FDA4AF" }} /><Typography fontWeight={800} mt={1}>Your wishlist is empty</Typography><Typography variant="body2" color="text.secondary" mt={0.5}>Save courses you want to explore later.</Typography></Box>;
//   }

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//       <Typography fontWeight={800} mb={3}>My Wishlist</Typography>
//       <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(260px, 1fr))", lg: "repeat(3, minmax(260px, 1fr))" }, gap: { xs: 2, md: 3 }, justifyItems: "center" }}>
//         {items.map((item) => (
//           <CourseCardWrapper
//             key={item.id}
//             id={item.courseId}
//             thumbnailSrc={item.course?.image ?? undefined}
//             title={item.course?.title || "Saved course"}
//             price={Number(item.course?.price ?? 0)}
//             rating={0}
//             navigatePath={(id) => `/course-glossary/${id}`}
//             onFavorite={(courseId) => void handleRemove(courseId)}
//             isFavorite
//           />
//         ))}
//       </Box>
//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((current) => ({ ...current, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((current) => ({ ...current, open: false }))}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Rating,
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

// Card thumbnail ke liye gradient set (letter ke hisaab se rotate hoga)
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
  const { data, isLoading, isError } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [removingId, setRemovingId] = useState<number | null>(null);

  const items = getWishlistItems(data);

  const showSnackbar = (message: string, severity: "success" | "error") =>
    setSnackbar({ open: true, message, severity });

  const handleRemove = async (courseId: number) => {
    setRemovingId(courseId);
    try {
      await removeFromWishlist({ courseId }).unwrap();
      showSnackbar("Removed from wishlist", "success");
    } catch (error: any) {
      showSnackbar(error?.data?.message || "Could not remove this course.", "error");
    } finally {
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
      <Box sx={{ p: { xs: 5, sm: 7 }, textAlign: "center" }}>
        <FavoriteBorderRoundedIcon sx={{ fontSize: 48, color: "#FDA4AF" }} />
        <Typography fontWeight={800} mt={1}>
          Your wishlist is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Save courses you want to explore later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography fontWeight={800} mb={3}>
        My Wishlist
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(260px, 1fr))",
            lg: "repeat(3, minmax(260px, 1fr))",
          },
          gap: { xs: 2, md: 3 },
        }}
      >
        {items.map((item) => {
          const course = item.course;
          const title = course?.title || "Saved course";
          const price = Number(course?.price ?? 0);
          const rating = Number(course?.rating ?? 0);
          const ratingCount = Number(course?.ratingCount ?? 0);
          const instructor = course?.instructorName || "HeroAcademy";
          const isRemoving = removingId === item.courseId;

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
              }}
            >
              {/* Gradient thumbnail */}
              <Box
                sx={{
                  position: "relative",
                  height: 140,
                  background: getGradient(title),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                  label={price > 0 ? `₹${price}` : "Free"}
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
                  }}
                >
                  {isRemoving ? (
                    <CircularProgress size={16} />
                  ) : (
                    <FavoriteRoundedIcon sx={{ fontSize: 18, color: "#ef4444" }} />
                  )}
                </Box>
                <Typography sx={{ fontSize: 48, fontWeight: 800, color: "#fff" }}>
                  {title.charAt(0).toUpperCase()}
                </Typography>
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
                    mb: 1,
                  }}
                >
                  {course?.description || "check course"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
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

                {ratingCount > 0 ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
                    <Rating value={rating} precision={0.5} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {rating.toFixed(1)} ({ratingCount})
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="caption" color="text.secondary" mb={1.5}>
                    No ratings yet
                  </Typography>
                )}

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