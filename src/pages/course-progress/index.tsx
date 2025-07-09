import { Box } from "@mui/material";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const CourseProgress = () => {
  return (
    <Box sx={{ bgcolor: "#F1F2F4" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent />
    </Box>
  );
};

export default CourseProgress;
