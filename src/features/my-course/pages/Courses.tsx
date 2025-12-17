import { Box, Typography, Snackbar, Alert } from "@mui/material";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { useGetMyEnrolledCoursesQuery } from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CoursesProps {
  onCourseClick?: (courseId: number) => void;
}

const PAGE_LAYOUT_SX = {
  width: "100%",
  maxWidth: "1440px",
  mx: "auto",
  px: { xs: 3, sm: 5, md: 10, lg: 15 },
  pt: { xs: 3, md: 4 },
  pb: { xs: 1, md: 2 },
};

export default function Courses({ onCourseClick }: CoursesProps) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  }>({ open: false, message: "", severity: "success" });

  const {
    data: enrollmentData,
    isFetching: fetchingEnrollments,
    isError: errorEnrollments,
  } = useGetMyEnrolledCoursesQuery();

  const enrolledCourses = enrollmentData?.data || [];

  const courses: ICourse[] = enrolledCourses
    .filter((enrollment) => enrollment.course)
    .map((enrollment) => ({
      ...enrollment.course,
      id: enrollment.course.id,
      price: enrollment.course.price ?? 0,
      totalChapters: enrollment.course.totalChapters ?? 0,
    })) as ICourse[];

  // Handler for START COURSE button
  const handleStartCourse = (courseId: number) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    } else {
      navigate(`/course-practice/${courseId}`);
    }
  };

  // Handler for share
  const handleShare = async (courseId: number) => {
    // TODO: Implement share functionality
    console.log("Share course:", courseId);
    const url = `${window.location.origin}/course-glossary/${courseId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: courses.find((c) => c.id === courseId)?.title || "Course",
          url: url,
        });
        setSnackbar({
          open: true,
          message: "Course shared successfully!",
          severity: "success",
        });
      } catch (error: any) {
        // User cancelled or error occurred
        if (error.name !== "AbortError") {
          // Copy to clipboard as fallback
          await navigator.clipboard.writeText(url);
          setSnackbar({
            open: true,
            message: "Course link copied to clipboard!",
            severity: "info",
          });
        }
      }
    } else {
      await navigator.clipboard.writeText(url);
      setSnackbar({
        open: true,
        message: "Course link copied to clipboard!",
        severity: "info",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handler for favorite
  const handleFavorite = (courseId: number) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
    // TODO: Implement API call to save favorite
  };

  // Handler for archive
  const handleArchive = (courseId: number) => {
    // TODO: Implement archive functionality
    console.log("Archive course:", courseId);
  };

  return (
    <Box sx={PAGE_LAYOUT_SX}>
      <PageToolbarLayout title="My Courses">
        {fetchingEnrollments ? (
          <Loader />
        ) : errorEnrollments ? (
          <div>Some error occurred...</div>
        ) : courses.length === 0 ? (
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            You have not enrolled in any courses yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: { xs: 3, md: 4 },
              width: "100%",
              maxWidth: "1440px",
              mx: "auto",
              gridTemplateColumns: {
                xs: "repeat(auto-fill, minmax(260px, 1fr))",
                sm: "repeat(2, minmax(260px, 1fr))",
                md: "repeat(3, minmax(260px, 1fr))",
                lg: "repeat(4, minmax(260px, 1fr))",
              },
              justifyItems: "center",
              alignItems: "stretch",
              pt: { xs: 1, md: 2 },
              pb: 0,
            }}
          >
            {courses.map((course) => {
              const courseId = Number(course.id);

              // Mock progress - in production, this should come from API
              const mockProgress = Math.floor(Math.random() * 100);

              // Mock learner rating - in production, this should come from API
              const mockLearnerRating = Math.random() * 5;

              // Get instructor/organization name - prefer createdBy, fallback to orgCode
              const instructorName = course.createdBy || course.orgCode || "";

              return (
                <CourseCardWrapper
                  key={course.id}
                  id={courseId}
                  thumbnailSrc={course.image}
                  tags={course.tags}
                  title={course.title}
                  chapters={course.totalChapters}
                  rating={0}
                  price={course.price}
                  instructor={instructorName}
                  progress={mockProgress}
                  learnerRating={mockLearnerRating}
                  variant="my-course"
                  navigatePath={(id) => `/course-practice/${id}`}
                  onStartCourse={handleStartCourse}
                  onShare={handleShare}
                  onFavorite={handleFavorite}
                  onArchive={handleArchive}
                  isFavorite={favorites.has(courseId)}
                />
              );
            })}
          </Box>
        )}
      </PageToolbarLayout>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
