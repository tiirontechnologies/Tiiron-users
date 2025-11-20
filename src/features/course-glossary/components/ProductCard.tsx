import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UPLOADS } from "../../../constants/constants";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ICourse } from "../../../types/course.types";

interface ProductCardProps {
  course: ICourse | undefined;
}

export default function ProductCard({ course }: ProductCardProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = course?.title || "Check out this course";

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const discountPercentage = course?.price ? Math.round(((99.5 - course.price) / 99.5) * 100) : 50;

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", md: "400px" },
        width: { xs: "100%", md: "400px" },
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        p: { xs: 2.5, md: 3 },
        bgcolor: "white",
        mx: { xs: "auto", md: 0 },
        boxSizing: "border-box",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {course?.image && (
        <Box
          component="img"
          src={UPLOADS + course.image}
          alt={course.title || "Course image"}
          sx={{
            width: "100%",
            height: { xs: 180, md: 220 },
            objectFit: "cover",
            borderRadius: 2,
            mb: 2.5,
            border: "1px solid #E2E8F0",
          }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          sx={{
            color: "#6A42AB",
            fontSize: { xs: "28px", md: "32px" },
          }}
        >
          ${course?.price || "0.00"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textDecoration: "line-through",
            color: "#94A3B8",
            fontSize: { xs: "16px", md: "18px" },
          }}
        >
          $99.5
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            bgcolor: "#FEF2F2",
            borderRadius: 2,
            border: "1px solid #FECACA",
          }}
        >
          <Typography
            variant="body2"
            color="#DC2626"
            fontWeight="600"
            sx={{ fontSize: { xs: "12px", md: "14px" } }}
          >
            {discountPercentage}% Off
          </Typography>
        </Box>
      </Box>

      <Link
        to="/checkout"
        style={{ textDecoration: "none", width: "100%", display: "block" }}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#6A42AB",
            color: "#fff",
            py: 1.75,
            mb: 2.5,
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "0 4px 6px -1px rgba(106, 66, 171, 0.3)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#5A2A9B",
              boxShadow: "0 6px 8px -1px rgba(106, 66, 171, 0.4)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          Enroll Now
        </Button>
      </Link>

      <Box
        sx={{
          borderTop: "1px solid #E2E8F0",
          pt: 2.5,
          mt: "auto",
        }}
      >
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            mb: 2,
            color: "#1E293B",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Share this course
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <IconButton
            onClick={() => handleShare("facebook")}
            sx={{
              border: "1px solid #E2E8F0",
              bgcolor: "white",
              color: "#1877F2",
              width: 44,
              height: 44,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#EFF6FF",
                borderColor: "#1877F2",
                transform: "scale(1.05)",
              },
            }}
            aria-label="Share on Facebook"
          >
            <FacebookIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton
            onClick={() => handleShare("twitter")}
            sx={{
              border: "1px solid #E2E8F0",
              bgcolor: "white",
              color: "#1DA1F2",
              width: 44,
              height: 44,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#EFF6FF",
                borderColor: "#1DA1F2",
                transform: "scale(1.05)",
              },
            }}
            aria-label="Share on Twitter"
          >
            <TwitterIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton
            onClick={() => handleShare("linkedin")}
            sx={{
              border: "1px solid #E2E8F0",
              bgcolor: "white",
              color: "#0A66C2",
              width: 44,
              height: 44,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#EFF6FF",
                borderColor: "#0A66C2",
                transform: "scale(1.05)",
              },
            }}
            aria-label="Share on LinkedIn"
          >
            <LinkedInIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: course?.title || "Check out this course",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            sx={{
              border: "1px solid #E2E8F0",
              bgcolor: "white",
              color: "#64748B",
              width: 44,
              height: 44,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#F1F5F9",
                borderColor: "#475569",
                color: "#1E293B",
                transform: "scale(1.05)",
              },
            }}
            aria-label="Share"
          >
            <ShareIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

