import { Box, Typography } from "@mui/material";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { useGetMyEnrolledCoursesQuery } from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";
import { useNavigate } from "react-router-dom";

interface CoursesProps {
  onCourseClick?: (courseId: number) => void;
}

export default function Courses({ onCourseClick }: CoursesProps) {
  const navigate = useNavigate();
  
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

  // Handler for course click - decided by parent or default navigation
  const handleCourseClick = (courseId: number) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    } else {
      // Default navigation if no handler provided
      navigate(`/course-practice/${courseId}`);
    }
  };

  return (
    <Box sx={{ padding: "24px" }}>
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
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {courses.map((course) => {
              const courseId = Number(course.id);

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
                  navigatePath={!onCourseClick ? (id) => `/course-practice/${id}` : undefined}
                  onCardClick={handleCourseClick}
                />
              );
            })}
          </Box>
        )}
      </PageToolbarLayout>
    </Box>
  );
}
