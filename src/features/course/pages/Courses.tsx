import { Box, Typography } from "@mui/material";
import AddNewCourseCard from "../../course-settings/components/AddNewCourseCard";
import CourseCard from "../components/CourseCard";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import {
  useGetCoursesQuery,
  useGetCourseForFeedQuery,
  useGetMyEnrolledCoursesQuery,
} from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";

export default function Courses({
  isBrowsingPage = false,
}: {
  isBrowsingPage?: boolean;
}) {
  console.log("Courses Component Rendered. isBrowsingPage:", isBrowsingPage);
  const queryArgs = { limit: 10, page: 1 };

  const {
    data: myCoursesData,
    isFetching: fetchingMyCourses,
    isError: errorMyCourses,
  } = useGetCoursesQuery(queryArgs, { skip: true });

  const {
    data: browseData,
    isFetching: fetchingBrowse,
    isError: errorBrowse,
  } = useGetCourseForFeedQuery(queryArgs, { skip: !isBrowsingPage });

  const {
    data: enrollmentData,
    isFetching: fetchingEnrollments,
    isError: errorEnrollments,
  } = useGetMyEnrolledCoursesQuery(undefined, { skip: isBrowsingPage });

  let courses: ICourse[] = [];
  let isFetching: boolean = false;
  let isError: boolean = false;

  if (isBrowsingPage) {
    const typedBrowseData = browseData as { data: { courses: ICourse[] } };
    courses = typedBrowseData?.data?.courses || [];
    isFetching = fetchingBrowse;
    isError = errorBrowse;
  } else {
    const enrolledCourses = enrollmentData?.data || [];

    courses = enrolledCourses
      .filter((enrollment) => enrollment.course)
      .map((enrollment) => ({
        ...enrollment.course,

        id: enrollment.course.id,
        price: enrollment.course.price ?? 0,

        totalChapters: enrollment.course.totalChapters ?? 0,
      })) as ICourse[];

    isFetching = fetchingEnrollments;
    isError = errorEnrollments;
  }

  const title = isBrowsingPage ? "Browse Courses" : "My Courses";
  console.log(`${title} data`, courses);

  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title={title}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {!isBrowsingPage && <AddNewCourseCard />}
          {isFetching ? (
            <Loader />
          ) : isError ? (
            <div>Some error occurred...</div>
          ) : courses.length === 0 ? (
            <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
              {isBrowsingPage
                ? "No courses found in the feed."
                : "You have not enrolled in any courses yet."}
            </Typography>
          ) : (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                id={Number(course.id)}
                thumbnailSrc={course.image}
                tags={course.tags}
                title={course.title}
                chapters={course.totalChapters}
                rating={0}
                price={course.price}
                isBrowsingPage={isBrowsingPage}
              />
            ))
          )}
        </Box>
      </PageToolbarLayout>
    </Box>
  );
}
