import { useState } from "react";
import { Box, Button, Card, CardContent, Chip, Skeleton, Stack, Typography } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  type ICartItem,
} from "../../course-browse/api/courseApi";

function getWishlistItems(data: { data: ICartItem[] | { items: ICartItem[] } } | undefined) {
  if (Array.isArray(data?.data)) return data.data;
  return data?.data?.items ?? [];
}

function CourseImage({ src, title }: { src?: string | null; title: string }) {
  const [imageSrc, setImageSrc] = useState(src || "/Tiiron_logo.png");
  const isFallback = imageSrc === "/Tiiron_logo.png";

  return (
    <Box
      sx={{
        width: "100%",
        height: 150,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        bgcolor: isFallback ? "#F8FAFC" : "#EEF2FF",
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={title}
        onError={() => setImageSrc("/Tiiron_logo.png")}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: isFallback ? "contain" : "cover",
          p: isFallback ? 3 : 0,
          display: "block",
        }}
      />
    </Box>
  );
}

export default function WishlistTab() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetWishlistQuery();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();
  const items = getWishlistItems(data);

  if (isLoading) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
        <Skeleton variant="rounded" height={230} />
        <Skeleton variant="rounded" height={230} />
      </Box>
    );
  }

  if (isError) {
    return <Box sx={{ p: 6, textAlign: "center" }}><Typography fontWeight={800}>Wishlist could not be loaded</Typography><Typography variant="body2" color="text.secondary" mt={1}>Please refresh and try again.</Typography></Box>;
  }

  if (!items.length) {
    return (
      <Box sx={{ p: { xs: 5, sm: 7 }, textAlign: "center" }}>
        <FavoriteBorderRoundedIcon sx={{ fontSize: 48, color: "#FDA4AF" }} />
        <Typography fontWeight={800} mt={1}>Your wishlist is empty</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>Save courses you want to explore later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 3, p: { xs: 2, sm: 2.5 }, borderRadius: 3, background: "linear-gradient(135deg, #FFF1F2 0%, #FFF7ED 100%)", border: "1px solid #FFE4E6" }}>
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Box sx={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: "#FFE4E6" }}>
            <FavoriteRoundedIcon sx={{ color: "#E11D48" }} />
          </Box>
          <Box>
            <Typography fontWeight={800}>My Wishlist</Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: { xs: 2, md: 2.5 } }}>
        {items.map((item) => {
          const course = item.course;
          return (
            <Card key={item.id} elevation={0} sx={{ border: "1px solid #E2E8F0", borderRadius: 3, overflow: "hidden", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 12px 28px rgba(15,23,42,.1)" } }}>
              <CourseImage src={course?.image} title={course?.title || "Saved course"} />
              <CardContent sx={{ p: 2.25 }}>
                <Typography fontWeight={800} noWrap>{course?.title || "Saved course"}</Typography>
                <Chip label={course?.price ? `₹${course.price}` : "Free"} size="small" sx={{ mt: 1, fontWeight: 700, bgcolor: course?.price ? "#EEF2FF" : "#ECFDF5", color: course?.price ? "#4338CA" : "#047857" }} />
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button fullWidth variant="contained" onClick={() => navigate(`/course-glossary/${item.courseId}`)} endIcon={<ArrowForwardRoundedIcon />} sx={{ textTransform: "none", fontWeight: 800, borderRadius: 2, boxShadow: "none" }}>
                    Enroll
                  </Button>
                  <Button aria-label="Remove from wishlist" color="error" variant="outlined" disabled={isRemoving} onClick={() => void removeFromWishlist({ courseId: item.courseId })} sx={{ minWidth: 46, borderRadius: 2, px: 1 }}>
                    <FavoriteRoundedIcon />
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
