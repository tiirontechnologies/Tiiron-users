import { Box } from "@mui/material";
import ToolBar from "./toolbar";

import CourseMetadataEditor from "./CourseMetadataEditor";
import CourseMetaTabs from "./CourseMetaTabs";

const Index = () => {
  return (
    <Box>
      <ToolBar />
      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        <CourseMetaTabs />
        {/* <CourseMetadataEditor /> */}
      </Box>
    </Box>
  );
};

export default Index;
