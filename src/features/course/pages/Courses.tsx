import { Box } from "@mui/material";
import AddNewCourseCard from "../../course-settings/components/AddNewCourseCard";
import CourseCard from "../components/CourseCard";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { useGetCoursesQuery, useGetCourseForFeedQuery } from "../api/courseApi";
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
  } = useGetCoursesQuery(queryArgs, { skip: isBrowsingPage });

  const {
    data: browseData,
    isFetching: fetchingBrowse,
    isError: errorBrowse,
  } = useGetCourseForFeedQuery(
    queryArgs, 
    { skip: !isBrowsingPage }
  );


  let courses: ICourse[] = [];
  let isFetching: boolean = false;
  let isError: boolean = false;

  if (isBrowsingPage) {
    const typedBrowseData = browseData as { data: { courses: ICourse[] } };
    courses = typedBrowseData?.data?.courses || [];
    isFetching = fetchingBrowse;
    isError = errorBrowse;
  } else {
    const typedMyCoursesData = myCoursesData as {
      data: { courses: ICourse[] };
    };
    courses = typedMyCoursesData?.data?.courses || [];
    isFetching = fetchingMyCourses;
    isError = errorMyCourses;
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
          ) : (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                thumbnailSrc={course.image}
                tags={course.tags}
                title={course.title}
                chapters={course.totalChapters}
                rating={0}
                isBrowsingPage={isBrowsingPage}
              />
            ))
          )}
        </Box>
      </PageToolbarLayout>
    </Box>
  );
}
