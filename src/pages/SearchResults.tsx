import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import {
  useSearchCoursesQuery,
  useGetCartQuery,
  useAddToCartServerMutation,
} from "../features/course-browse/api/courseApi";
import { ICourse } from "../types/course.types";
import Loader from "@components/ui/Spinner";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // Fetch all courses (we'll filter client-side)
  const {
    data: searchData,
    isFetching: fetchingSearch,
    isError: errorSearch,
  } = useSearchCoursesQuery(
    { page: 1, limit: 100 },
    { skip: !query.trim() }
  );

  // Cart data for checking if course is in cart
  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  // Handler for adding to cart
  const handleAddToCart = async (courseId: number) => {
    await addToCartServer({ courseId }).unwrap();
  };

  // Extract all courses from response
  const allCourses: ICourse[] =
    (searchData as { data?: { courses?: ICourse[] } })?.data?.courses || [];

  // Filter courses client-side based on search query
  const courses: ICourse[] = query.trim()
    ? allCourses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  // Show message if no query
  if (!query.trim()) {
    return (
      <Box sx={{ padding: "24px" }}>
        <PageToolbarLayout title="Search Results">
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            Please enter a search query.
          </Typography>
        </PageToolbarLayout>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title={`Search Results for "${query}"`}>
        {fetchingSearch ? (
          <Loader />
        ) : errorSearch ? (
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            Some error occurred while searching...
          </Typography>
        ) : courses.length === 0 ? (
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            No courses found for "{query}".
          </Typography>
        ) : (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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

