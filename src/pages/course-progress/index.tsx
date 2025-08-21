import { Box } from "@mui/material";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import { useGetCourseForStudentQuery, useGetUnitsWithQuestionsQuery } from "../../api/api";
import { useParams } from "react-router-dom";
import Loader from "@components/Template/ui/Spinner";
import { useState } from "react";

const CourseProgress = () => {
  const { courseId } = useParams();
  if (!courseId) return <Box>Course ID is required</Box>;
  const [query, setQuery] = useState<string>("");
  const { data, isFetching, isError } = useGetCourseForStudentQuery({ id: courseId! }); // Replace "courseId" with actual course ID
  const { data: units, isFetching: isUnitsFetching, isError: isUnitsError } = useGetUnitsWithQuestionsQuery({ unitId: query }, { skip: !query });
  return (
    <Box>
      {isFetching ? <Loader /> : isError ? <Box>Error loading course data</Box> : data?.data && <Box sx={{ bgcolor: "#F1F2F4" }}>
        {/* Sidebar */}
        <Sidebar data={data} setQuery={setQuery} />

        {/* Header */}
        <Header />

        {/* Main Content */}
        {isUnitsFetching ? <Loader /> : isUnitsError ? <Box>Some Error occured...</Box> : !units?.unit ? <Box> 
          <Box sx={{ marginLeft: "289px", marginTop: "64px", padding: "24px" }}>
            <h2>Select a unit to view its content</h2>
          </Box>
        </Box> : units?.unit && <MainContent data={units} />}
      </Box>}
    </Box>
  );
};

export default CourseProgress;
