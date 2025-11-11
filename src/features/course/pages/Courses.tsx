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
