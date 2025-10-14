import { Box } from "@mui/material";
import AddNewCourseCard from "../../course-settings/components/AddNewCourseCard";
import CourseCard from "../components/CourseCard";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { useGetCoursesQuery } from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";

export default function Courses() {
  const { data, isFetching, isError } = useGetCoursesQuery({ limit: 10, page: 1 }) as {
    data: {
      data: {
        courses: ICourse[];
      };
    };
    isFetching: boolean;
    isError: boolean;
  };
  
  // Debug logging
  console.log("Courses data:", data);
  console.log("isFetching:", isFetching);
  console.log("isError:", isError);
  
  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title="Courses">
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <AddNewCourseCard />

          {isFetching ? (<Loader />) : isError ? (<div>Some error occurred...</div>) : (
            data?.data?.courses?.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                thumbnailSrc={course.image}
                tags={course.tags}
                title={course.title}
                chapters={course.totalChapters}
                rating={0} />
            ))
          )}
        </Box>
      </PageToolbarLayout>
    </Box>
  );
}