import { Box } from "@mui/material";
import AddNewCourseCard from "../../components/Courses/Components/AddNewCourseCard";
import CourseCard from "../../components/Courses/Components/CourseCard";
import PageToolbarLayout from "@layouts/PageToolbarLayout";
import { useGetCourseQuery } from "../../api/api";
import { ICourse } from "types/course.types";
import Loader from "@components/Template/ui/Spinner";

export default function Courses() {
  const { data, isFetching, isError } = useGetCourseQuery({ limit: 10, page: 1 }) as {
    data: {
      data: {
        courses: ICourse[];
      };
    };
    isFetching: boolean;
    isError: boolean;
  };
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
                chapters={course.totalChapters} />
            ))
          )}
        </Box>
      </PageToolbarLayout>
    </Box>
  );
}