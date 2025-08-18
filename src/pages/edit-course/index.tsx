import { Box } from "@mui/material";
import ToolBar, { RightSideTools } from "./toolbar";

import CourseMetaTabs from "./CourseMetaTabs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChaptersQuery, useGetCourseByCourseIdQuery } from "../../api/api";
import Loader from "@components/ui/Spinner";
import { createContext, useState } from "react";

export const CourseContext = createContext<any>("");

const Index = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  if (!courseId) navigate(-1);

  const { data, isFetching, isError } = useGetChaptersQuery({ page: 1, limit: 10, id: courseId! });
  const { data: courseData, isFetching: isCourseFetching, isError: isCourseError } = useGetCourseByCourseIdQuery({ id: courseId! });

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
    <Box>
      {isCourseFetching ? <Loader /> : isCourseError ? <div>Some error occuredd...</div> : courseData?.data && <ToolBar courseName={courseData?.data?.title} >
        <RightSideTools />
      </ToolBar>}

      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        {isFetching ? <Loader /> : isError ? <div>Some error occuredd...</div> : <CourseContext.Provider
          value={{
            data: data?.data,
            isLoading: isFetching,
            snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar, setSnackbarOpen,
            setSnackbarMessage, setSnackbarSeverity
          }}>
          <CourseMetaTabs />
        </CourseContext.Provider>}
      </Box>
    </Box>
  );
};

export default Index;
