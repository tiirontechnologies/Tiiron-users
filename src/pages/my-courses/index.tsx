import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import AddNewCourseCard from "./AddNewCourseCard";
import CourseCard from "./CourseCard";
import PageToolbarLayout from "@layouts/PageToolbarLayout";
import { useGetCourseQuery } from "../../api/api";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";

const MyCourses = () => {
  // Optional state for "Add New Course" if you want to manage it here
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("Add New Course");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const { data, isFetching, isError } = useGetCourseQuery({ limit: 10, page: 1 }) as {
    data: {
      data: {
        courses: ICourse[];
      }
    };
    isFetching: boolean;
    isError: boolean;
  };

  /**SNACKBAR */
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title="Courses">
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <AddNewCourseCard
            image={image}
            setImage={setImage}
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
          />

          {isFetching ? (<Loader />) : isError ? (<div>Some error occurred...</div>) : (
            data?.data?.courses?.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                thumbnailSrc={course.image}
                tags={course.tags}
                title={course.title}
                chapters={course.totalChapters}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeverity={setSnackbarSeverity}
              // rating={course.rating}
              />
            ))
          )}
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </PageToolbarLayout>
    </Box>
  );
};

export default MyCourses;
