import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";

import {
  useGetCourseForFeedQuery,
  useSearchCoursesQuery,
  useGetCartQuery,
  useAddToCartServerMutation,
  useGetCourseRatingQuery,
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

// =====================================================
// CATEGORY NORMALIZE HELPERS
// =====================================================

const normalizeCategory = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value
      .map((v) => normalizeCategory(v))
      .filter(Boolean)
      .join(",");
  }

  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");
};

// Strict key used ONLY for matching (removes all spaces too)
const categoryKey = (value: string): string =>
  value.replace(/\s+/g, "");

const CourseCardWithRating = ({
  course,
  isCourseInCart,
  handleAddToCart,
  isAddingToCart,
}: any) => {
  const { data: ratingData } = useGetCourseRatingQuery(course.id);

  const organizationName =
    course.createdBy?.trim() ||
    `${course.createdByUser?.firstName || ""} ${course.createdByUser?.lastName || ""}`.trim() ||
    "Organization";

  const instructorWithOrg = `${course.instructor?.trim() || "Instructor"} | ${organizationName}`;

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
    />
  );
};

export default function Courses() {
  const [searchParams] = useSearchParams();

  // =====================================================
  // URL PARAMETERS
  // =====================================================

  const searchQuery = searchParams.get("q") || "";

  const category = normalizeCategory(searchParams.get("category") || "");

  const hasCategoryFilter = category !== "";

  const hasSearchQuery = !!searchQuery.trim();

  // =====================================================
  // SEARCH COURSES API
  // =====================================================

  const {
    data: searchData,
    isFetching: fetchingSearch,
    isError: errorSearch,
  } = useSearchCoursesQuery(
    {
      q: searchQuery,
      page: 1,
      limit: 10,
    },
    {
      skip: !hasSearchQuery,
    }
  );

  // =====================================================
  // BROWSE COURSES API
  // =====================================================

  const {
    data: browseData,
    isFetching: fetchingBrowse,
    isError: errorBrowse,
  } = useGetCourseForFeedQuery(
    {
      limit: 10,
      page: 1,
    },
    {
      skip: hasSearchQuery,
    }
  );

  // =====================================================
  // CART
  // =====================================================

  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = async (courseId: number) => {
    await addToCartServer({ courseId }).unwrap();
  };

  // =====================================================
  // BROWSE RESPONSE
  // =====================================================

  const typedBrowseData = browseData as {
    data?: {
      courses?: ICourse[];
    };
  };

  // =====================================================
  // SEARCH COURSES
  // =====================================================

  let searchCourses: ICourse[] = [];

  if (searchData && hasSearchQuery) {
    const data = searchData as any;

    let rawCourses: any[] = [];

    // Structure 1:
    // { data: { results: [...] } }
    if (
      data?.data?.results &&
      Array.isArray(data.data.results)
    ) {
      rawCourses = data.data.results;
    }

    // Structure 2:
    // { data: { courses: [...] } }
    else if (
      data?.data?.courses &&
      Array.isArray(data.data.courses)
    ) {
      rawCourses = data.data.courses;
    }

    // Structure 3:
    // { results: [...] }
    else if (
      data?.results &&
      Array.isArray(data.results)
    ) {
      rawCourses = data.results;
    }

    // Structure 4:
    // { courses: [...] }
    else if (
      data?.courses &&
      Array.isArray(data.courses)
    ) {
      rawCourses = data.courses;
    }

    // Structure 5:
    // Direct array
    else if (Array.isArray(data)) {
      rawCourses = data;
    }

    // Ensure totalChapters exists
    searchCourses = rawCourses.map((course) => ({
      ...course,
      totalChapters:
        course.totalChapters ??
        course._count?.chapters ??
        0,
    }));
  }

  // =====================================================
  // ALL COURSES
  // =====================================================

  const allCourses: ICourse[] = hasSearchQuery
    ? searchCourses
    : typedBrowseData?.data?.courses || [];

  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  const courses: ICourse[] = hasCategoryFilter
    ? allCourses.filter((course) => {
        const backendCategory = normalizeCategory(course.categories);

        return backendCategory
          .split(",")
          .map((c) => categoryKey(c.trim()))
          .includes(categoryKey(category));
      })
    : allCourses;

  // =====================================================
  // LOADING / ERROR
  // =====================================================

  const isFetching = hasSearchQuery
    ? fetchingSearch
    : fetchingBrowse;

  const isError = hasSearchQuery
    ? errorSearch
    : errorBrowse;

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const pageTitle = hasSearchQuery
    ? `Search Results for "${searchQuery}"`
    : hasCategoryFilter
    ? `Courses in "${category}"`
    : "Browse Courses";

  // =====================================================
  // UI
  // =====================================================

  return (
    <Box sx={PAGE_LAYOUT_SX}>
      <PageToolbarLayout title={pageTitle}>
        {/* ================= LOADING ================= */}

        {isFetching ? (
          <Loader />
        ) : isError ? (
          /* ================= ERROR ================= */

          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              mt: 4,
            }}
          >
            Some error occurred...
          </Typography>
        ) : courses.length === 0 ? (
          /* ================= NO COURSES ================= */

          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              mt: 4,
            }}
          >
            {hasCategoryFilter
              ? `Courses for "${category}" are not available.`
              : hasSearchQuery
              ? `No courses found for "${searchQuery}".`
              : "No courses found in the feed."}
          </Typography>
        ) : (
          /* ================= COURSE GRID ================= */

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

              py: {
                xs: 1,
                md: 2,
              },
            }}
          >
            {courses.map((course) => {
              const courseId = Number(course.id);

              const isCourseInCart =
                cartData?.data?.items?.some(
                  (item) =>
                    item.courseId === courseId
                ) || false;

              return (
                <CourseCardWithRating
                  key={course.id}
                  course={course}
                  isCourseInCart={isCourseInCart}
                  handleAddToCart={handleAddToCart}
                  isAddingToCart={isAddingToCart}
                />
              );
            })}
          </Box>
        )}
      </PageToolbarLayout>
    </Box>
  );
}
