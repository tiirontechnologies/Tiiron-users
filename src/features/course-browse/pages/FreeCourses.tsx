import { Box, Typography,Alert ,Snackbar } from "@mui/material";
import { useState } from "react";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import {
  useGetFreeCoursesQuery,
  useGetCartQuery,
  useAddToCartServerMutation,
  useGetCourseRatingQuery,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation
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


// const CourseCardWithRating = ({
//   course,
//   isCourseInCart,
//   handleAddToCart,
//   isAddingToCart,
// }: any) => {
//   const { data: ratingData } = useGetCourseRatingQuery(course.id);

//   return (
//     <CourseCardWrapper
//       id={Number(course.id)}
//       thumbnailSrc={course.image}
//       tags={course.tags}
//       title={course.title}
//       chapters={course.totalChapters}
//       rating={ratingData?.data?.averageRating || 0}
//       reviewCount={ratingData?.data?.totalRatings || 0}
//       instructor={course.createdBy || "Instructor"}
//       price={course.price}
//       navigatePath={(id) => `/course-glossary/${id}`}
//       isCourseInCart={isCourseInCart}
//       onAddToCart={handleAddToCart}
//       isLoadingCart={isAddingToCart}
//     />
//   );
// };


const CourseCardWithRating = ({
  course,
  isCourseInCart,
  handleAddToCart,
  isAddingToCart,
  handleFavorite,
  isFavorite,
}: any) => {
  const { data: ratingData } = useGetCourseRatingQuery(course.id);


  // Org Name
 const rawOrgName =
  course.createdBy?.trim() ||
  `${course.createdByUser?.firstName || ""} ${course.createdByUser?.lastName || ""}`.trim() ||
  "Organization";

const orgName =
  rawOrgName.charAt(0).toUpperCase() + rawOrgName.slice(1);

  // Instructor | Org
  const instructorWithOrg = `${course.instructor?.trim() || "Instructor"} | ${orgName}`;

  return (
    <CourseCardWrapper
      id={Number(course.id)}
      thumbnailSrc={course.image}
      tags={course.tags}
      title={course.title}
      chapters={course.totalChapters}
      rating={ratingData?.data?.averageRating || 0}
      reviewCount={ratingData?.data?.totalRatings || 0}
      instructor={instructorWithOrg}
      price={course.price}
      navigatePath={(id) => `/course-glossary/${id}`}
      isCourseInCart={isCourseInCart}
      onAddToCart={handleAddToCart}
      isLoadingCart={isAddingToCart}
      onFavorite={handleFavorite}
      isFavorite={isFavorite}
    />
  );
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

  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success" as "success" | "error",
});
  // Cart data for checking if course is in cart
  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();
  const { data: wishlistData } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const wishlistItems = Array.isArray(wishlistData?.data)
    ? wishlistData.data
    : wishlistData?.data?.items ?? [];
  const wishlistCourseIds = new Set(wishlistItems.map((item) => Number(item.courseId)));

  // Handler for adding to cart - passed to reusable component
  const handleAddToCart = async (courseId: number) => {
    await addToCartServer({ courseId }).unwrap();
  };

  // const handleFavorite = async (courseId: number) => {
  //   if (wishlistCourseIds.has(courseId)) {
  //     await removeFromWishlist({ courseId }).unwrap();
  //   } else {
  //     await addToWishlist({ courseId }).unwrap();
  //   }
  // };
  const handleFavorite = async (courseId: number) => {
  try {
    if (wishlistCourseIds.has(courseId)) {
      await removeFromWishlist({ courseId }).unwrap();

      setSnackbar({
        open: true,
        message: "Removed from wishlist",
        severity: "success",
      });
    } else {
      await addToWishlist({ courseId }).unwrap();

      setSnackbar({
        open: true,
        message: "Added to wishlist",
        severity: "success",
      });
    }
  } catch (err: any) {
    const message =
      err?.data?.errors?.[0]?.message ||
      err?.data?.message ||
      "Something went wrong";

    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  }
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
            {/* {courses.map((course) => {
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
            })} */}
            {courses.map((course) => {
  const courseId = Number(course.id);

  const isCourseInCart =
    cartData?.data?.items?.some(
      (item) => item.courseId === courseId
    ) || false;

  return (
    <CourseCardWithRating
      key={course.id}
      course={course}
      isCourseInCart={isCourseInCart}
      handleAddToCart={handleAddToCart}
      isAddingToCart={isAddingToCart}
      handleFavorite={handleFavorite}
      isFavorite={wishlistCourseIds.has(courseId)}
    />
  );
})}
          </Box>
        )}
      
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
</PageToolbarLayout>
      
    </Box>
  );
}
