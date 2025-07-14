import { Box } from "@mui/material";
import ToolBar, { RightSideTools } from "./toolbar";

import CourseMetaTabs from "./CourseMetaTabs";

const Index = () => {
  return (
    <Box>
      <ToolBar>
        <RightSideTools />
      </ToolBar>

      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        <CourseMetaTabs />
        {/* <CourseMetadataEditor /> */}
      </Box>
    </Box>
  );
};

export default Index;
