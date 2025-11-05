import { Box, Typography } from "@mui/material";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import {
  useGetCourseForFeedQuery,
  useGetCartQuery,
  useAddToCartServerMutation,
} from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";

export default function Courses() {
  const queryArgs = { limit: 10, page: 1 };

  const {
    data: browseData,
    isFetching: fetchingBrowse,
    isError: errorBrowse,
  } = useGetCourseForFeedQuery(queryArgs);

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

  const typedBrowseData = browseData as { data: { courses: ICourse[] } };
  const courses: ICourse[] = typedBrowseData?.data?.courses || [];

  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title="Browse Courses">
        {fetchingBrowse ? (
          <Loader />
        ) : errorBrowse ? (
          <div>Some error occurred...</div>
        ) : courses.length === 0 ? (
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            No courses found in the feed.
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
