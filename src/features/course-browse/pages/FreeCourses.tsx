import { Box, Typography } from "@mui/material";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import {
  useGetFreeCoursesQuery,
  useGetCartQuery,
  useAddToCartServerMutation,
} from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";

const PAGE_LAYOUT_SX = {
  width: "100%",
  maxWidth: "1440px",
  mx: "auto",
  px: { xs: 3, sm: 5, md: 10, lg: 15 },
  py: { xs: 3, md: 4 },
};

export default function FreeCourses() {
  const {
    data: freeCoursesData,
    isFetching: fetchingFreeCourses,
    isError: errorFreeCourses,
  } = useGetFreeCoursesQuery(
    { limit: 10, page: 1 },
    { skip: false }
  );

  // Cart data for checking if course is in cart
  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  // Handler for adding to cart - passed to reusable component
  const handleAddToCart = async (courseId: number) => {
    await addToCartServer({ courseId }).unwrap();
  };

  // Extract courses from the API response - handle different possible structures
  let courses: ICourse[] = [];
  if (freeCoursesData) {
    const data = freeCoursesData as any;
    let rawCourses: any[] = [];
    
    // Structure 1: { data: { courses: [...] } }
    if (data?.data?.courses && Array.isArray(data.data.courses)) {
      rawCourses = data.data.courses;
    }
    // Structure 2: { courses: [...] }
    else if (data?.courses && Array.isArray(data.courses)) {
      rawCourses = data.courses;
    }
    // Structure 3: Direct array
    else if (Array.isArray(data)) {
      rawCourses = data;
    }
    // Structure 4: { data: [...] }
    else if (data?.data && Array.isArray(data.data)) {
      rawCourses = data.data;
    }
    
    // Map courses to ensure totalChapters is set from _count.chapters if needed
    courses = rawCourses.map((course) => ({
      ...course,
      totalChapters: course.totalChapters ?? course._count?.chapters ?? 0,
    }));
  }

  return (
    <Box sx={PAGE_LAYOUT_SX}>
      <PageToolbarLayout title="Free Courses">
        {fetchingFreeCourses ? (
          <Loader />
        ) : errorFreeCourses ? (
          <div>Some error occurred...</div>
        ) : courses.length === 0 ? (
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            No free courses available at the moment.
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
              py: { xs: 1, md: 2 },
            }}
          >
            {courses.map((course) => {
              const courseId = Number(course.id);
              const isCourseInCart =
                cartData?.data?.items?.some(
                  (item) => item.courseId === courseId
                ) || false;

              // Generate mock rating and review count for demo purposes
              // In production, this should come from the API
              const mockRating = (4.5 + Math.random() * 0.5).toFixed(1);
              const mockReviewCount = Math.floor(Math.random() * 15000) + 1000;

              return (
                <CourseCardWrapper
                  key={course.id}
                  id={courseId}
                  thumbnailSrc={course.image}
                  tags={course.tags}
                  title={course.title}
                  chapters={course.totalChapters}
                  rating={parseFloat(mockRating)}
                  reviewCount={mockReviewCount}
                  instructor={course.createdBy || "Instructor"}
                  price={course.price}
                  navigatePath={(id) => `/course-glossary/${id}`}
                  isCourseInCart={isCourseInCart}
                  onAddToCart={handleAddToCart}
                  isLoadingCart={isAddingToCart}
                />
              );
            })}
          </Box>
        )}
      </PageToolbarLayout>
    </Box>
  );
}

