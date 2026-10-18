import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ENV } from "../../../config/env";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ICourse } from "../../../types/course.types";
import { useInitiateCheckoutMutation, SingleEnrollmentRequest } from "../../course-browse/api/courseApi";
import { useGetMyEnrolledCoursesQuery } from "../../my-course/api/courseApi";
import { useSnackbar } from "../../../components/ui/Snackbar/SnackBarProvider";
import { useState, useEffect, useMemo } from "react";

interface ProductCardProps {
  course: ICourse | undefined;
  averageRating?: number;
  totalRatings?: number;
}

export default function ProductCard({ course, averageRating, totalRatings }: ProductCardProps) {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Check if course is free
  const isFreeCourse = useMemo(() => {
    return course?.price === 0 || course?.price === 0.00;
  }, [course?.price]);

  // Get enrolled courses to check enrollment status
  const { data: enrollmentData } = useGetMyEnrolledCoursesQuery();

  // Check if user is enrolled in this course
  useEffect(() => {
    if (course?.isEnrolled !== undefined) {
      setIsEnrolled(course.isEnrolled);
    } else if (course?.id && enrollmentData?.data) {
      const enrolled = enrollmentData.data.some(
        (enrollment) => enrollment.courseId === course.id
      );
      setIsEnrolled(enrolled);
    }
  }, [course?.id, course?.isEnrolled, enrollmentData]);

  // Enrollment mutation
  const [initiateCheckout] = useInitiateCheckoutMutation();

  const handleEnrollNow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!course?.id) return;

    // Enrolled users should continue learning instead of being sent to checkout.
    if (isEnrolled) {
      navigate(`/course-practice/${course.id}`);
      return;
    }

    // If paid course, redirect to checkout
    if (!isFreeCourse) {
      navigate(`/checkout?courseId=${course.id}`);
      return;
    }

    // Enroll in free course
    setIsEnrolling(true);
    try {
      const payload: SingleEnrollmentRequest = {
        courseId: course.id,
        status: "active",
        payment_status: "free",
      };

      const response = await initiateCheckout(payload).unwrap();

      if (response.success) {
        setIsEnrolled(true);
        showSnackbar({
          message: "Successfully enrolled in the course!",
          severity: "success",
          duration: 4000,
          position: { vertical: "bottom", horizontal: "center" },
        });
      }
    } catch (error) {
    
        if (error?.status === 401) {
    navigate("/login");
    showSnackbar({
       message: "You're just one step away! Sign in to enroll and start learning.",
        severity: "warning",
        duration: 4000,
        position: { vertical: "bottom", horizontal: "center" },
      });
    return;
  }
      console.error("Enrollment error:", error);
     

      showSnackbar({
        message: "Failed to enroll. Please try again.",
        severity: "error",
        duration: 4000,
        position: { vertical: "bottom", horizontal: "center" },
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const handlePracticeCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (course?.id) {
      navigate(`/course-practice/${course.id}`);
    }
  };

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

  // Determine button text and behavior
  const getButtonConfig = () => {
    if (isEnrolled) {
      return {
        text: "Practice Course",
        onClick: handlePracticeCourse,
        variant: "contained" as const,
        sx: {
          bgcolor: "#10B981",
          color: "#fff",
          py: 1.75,
          mb: 2.5,
          fontSize: { xs: "14px", md: "16px" },
          fontWeight: 600,
          borderRadius: 2,
          textTransform: "none",
          boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.3)",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: "#059669",
            color: "#FFFFFF",
            boxShadow: "0 6px 8px -1px rgba(16, 185, 129, 0.4)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
      };
    }

    return {

      text: "Enroll Now",
      onClick: handleEnrollNow,
      variant: "contained" as const,
      sx: {
        bgcolor: "#4F39F6",
        color: "#fff",
        py: 1.75,
        mb: 2.5,
        fontSize: { xs: "14px", md: "16px" },
        fontWeight: 600,
        borderRadius: 2,
        textTransform: "none",
        boxShadow: "0 4px 6px -1px rgba(79, 57, 246, 0.3)",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "#3E2DC4",
          color: "#FFFFFF",
          boxShadow: "0 6px 8px -1px rgba(79, 57, 246, 0.4)",
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      },
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", md: "360px" },
        width: { xs: "100%", md: "360px" },
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        p: { xs: 2, md: 2.25 },
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
          src={ENV.UPLOADS + course.image}
          alt={course.title || "Course image"}
          sx={{
            width: "100%",
            height: { xs: 150, md: 170 },
            objectFit: "cover",
            borderRadius: 2,
            mb: 1.75,
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
            color: "#4F39F6",
            fontSize: { xs: "28px", md: "32px" },
          }}
        >
            ₹{course?.price || "0.00"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textDecoration: "line-through",
            color: "#94A3B8",
            fontSize: { xs: "16px", md: "18px" },
          }}
        >
            ₹3000.00
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

      <Button
        variant={buttonConfig.variant}
        fullWidth
        onClick={buttonConfig.onClick}
        disabled={isEnrolling}
        sx={buttonConfig.sx}
      >
        {isEnrolling ? "Enrolling..." : buttonConfig.text}
      </Button>

      <Box
        sx={{
          borderTop: "1px solid #E2E8F0",
          pt: 1.75,
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
              width: 38,
              height: 38,
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
              width: 38,
              height: 38,
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
              width: 38,
              height: 38,
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
              width: 38,
              height: 38,
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

