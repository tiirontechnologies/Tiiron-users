import { Box } from "@mui/material";
import ToolBar, { RightSideTools } from "./toolbar";

import CourseMetaTabs from "./CourseMetaTabs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChaptersQuery } from "../../api/api";
import Loader from "@components/ui/Spinner";

const Index = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  if (!courseId) navigate(-1);

  const { data, isFetching, isError } = useGetChaptersQuery({ page: 1, limit: 10, id: courseId! });
  return (
    <Box>
      <ToolBar>
        <RightSideTools />
      </ToolBar>

      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        {isFetching ? <Loader /> : isError ? <div>Some error occuredd...</div> : <CourseMetaTabs data={data?.data} />}
        {/* <CourseMetadataEditor /> */}
      </Box>
    </Box>
  );
};

export default Index;
