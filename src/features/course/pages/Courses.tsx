import { Box, Typography } from "@mui/material";
import AddNewCourseCard from "../../course-settings/components/AddNewCourseCard";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import { DeleteModal } from "../components/DeleteCourseModal";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { useGetCoursesQuery } from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const queryArgs = { limit: 10, page: 1 };
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const {
    data: myCoursesData,
    isFetching: fetchingMyCourses,
    isError: errorMyCourses,
  } = useGetCoursesQuery(queryArgs, { skip: !isAdmin });

  const typedMyCoursesData = myCoursesData as {
    data: { courses: ICourse[] };
  };
  const courses: ICourse[] = typedMyCoursesData?.data?.courses || [];

  // Handler for course click - navigate to edit page
  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/edit/${courseId}`);
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title="My Courses">
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <AddNewCourseCard />
          {fetchingMyCourses ? (
            <Loader />
          ) : errorMyCourses ? (
            <div>Some error occurred...</div>
          ) : courses.length === 0 ? (
            <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
              No Course Found
            </Typography>
          ) : (
            courses.map((course) => (
              <CourseCardWrapper
                key={course.id}
                id={Number(course.id)}
                thumbnailSrc={course.image}
                tags={course.tags}
                title={course.title}
                chapters={course.totalChapters}
                rating={0}
                price={course.price}
                onCardClick={handleCourseClick}
                DeleteModalComponent={DeleteModal}
              />
            ))
          )}
        </Box>
      </PageToolbarLayout>
    </Box>
  );
}
