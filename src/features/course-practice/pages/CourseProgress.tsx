import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useCourseProgress } from "../hooks/useCourseProgress";
import { GRADIENTS, COLORS } from "../constants";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../components/MainContent/MainContent";
import CoursePracticeContent from "../components/CoursePracticeContent";
import EmptyState from "../components/UI/EmptyState";
import Loader from "@components/ui/Spinner";

const EMPTY_STATS = {
  totalSessions: 0,
  completedSessions: 0,
  averageScore: 0,
  progressPercent: 0,
};

const CourseProgress: React.FC = () => {
  const {
    courseId,
    courseData,
    unitsData,
    selectedUnitId,
    selectUnit,
    isLoading,
    hasError,
    hasData,
    hasUnits,
    isCourseLoading,
    isUnitsLoading,
    isCourseError,
    isUnitsError,
    practiceStats = EMPTY_STATS,
    refetchContent,
  } = useCourseProgress();

  // if (!courseData?.data) {
  //   return (
  //     <Box sx={{ minHeight: "100vh", background: GRADIENTS.background }}>
  //       {isCourseLoading ? (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100vh",
  //           }}
  //         >
  //           <Loader />
  //         </Box>
  //       ) : isCourseError ? (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100vh",
  //           }}
  //         >
  //           <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
  //             <Typography color="error" variant="h6">
  //               Error loading course data
  //             </Typography>
  //           </Paper>
  //         </Box>
  //       ) : (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100vh",
  //           }}
  //         >
  //           <Typography>Course ID is required</Typography>
  //         </Box>
  //       )}
  //     </Box>
  //   );
  // }
  
  console.log("Units Data:", unitsData);
  console.log("Course Data:", courseData);
  
  // Extract course data - handle both { data: ... } and direct data structures
  const course = (courseData as any)?.data ?? courseData;
  const courseName = course?.title;
  const lessonName = course?.chapters[0]?.units[0]?.title;
  const chapterInfo = lessonName;
  const courseDataForSidebar = course?.chapters ? course : { chapters: [] };
  // Extract unitsData - handle both wrapped and direct structures
  let practiceData = unitsData;
  if (unitsData && typeof unitsData === 'object' && 'success' in unitsData && 'data' in unitsData) {
    // API returned { success: true, data: {...} }
    practiceData = (unitsData as any).data;
  }
  console.log("PracticeUnit", courseDataForSidebar);
  // Check if the API response has the new structure with contentTypes
  const hasNewStructure = practiceData && 
    typeof practiceData === 'object' && 
    !Array.isArray(practiceData) && 
    practiceData.contentTypes && 
    Array.isArray(practiceData.contentTypes);
  
  console.log("Has New Structure:", hasNewStructure);
  console.log("Practice Data:", practiceData);
  
  return (
    <Box sx={{ minHeight: "100vh", background: GRADIENTS.background }}>
      {/* Sidebar */}
      <Sidebar
        data={courseDataForSidebar}
        onUnitSelect={selectUnit}
        courseId={courseId}
        practiceStats={practiceStats}
      />

      {/* Header */}
      {/* <Header /> */}
      <Header courseName={courseName} chapterInfo={chapterInfo} />

      {/* Render appropriate component based on data structure */}
      {isUnitsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 84px)",
            marginLeft: "289px",
          }}
        >
          <Loader />
        </Box>
      ) : isUnitsError ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 84px)",
            marginLeft: "289px",
          }}
        >
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
            <Typography color="error" variant="h6">
              Some Error occurred...
            </Typography>
          </Paper>
        </Box>
      ) : !practiceData ? (
        <Box sx={{ marginLeft: "289px", marginTop: "84px", padding: "32px" }}>
          <EmptyState />
        </Box>
      ) : hasNewStructure ? (
        // New structure with contentTypes
        <Box
          sx={{
            marginLeft: "289px",
            marginTop: "64px",
            padding: "32px",
            paddingBottom: "120px",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            background: COLORS.background.light,
            minHeight: "100vh",
          }}
        >
          <CoursePracticeContent 
            data={practiceData} 
            courseId={courseId}
            unitId={selectedUnitId}
            refetchContent={refetchContent}
          />
        </Box>
      ) : (
        // Old structure - use MainContent
        <MainContent 
          questions={Array.isArray(practiceData) ? practiceData : (Array.isArray(unitsData) ? unitsData : [])} 
          practiceData={{
            isCompleted: false,
            score: 0,
          }}
          refetchContent={refetchContent}
        />
      )}

      {/* Main Content */}
      {/* {isUnitsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 84px)",
            marginLeft: "289px",
          }}
        >
          <Loader />
        </Box>
      ) : isUnitsError ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 84px)",
            marginLeft: "289px",
          }}
        >
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
            <Typography color="error" variant="h6">
              Some Error occurred...
            </Typography>
          </Paper>
        </Box>
      ) : !hasUnits ? (
        <Box sx={{ marginLeft: "289px", marginTop: "84px", padding: "32px" }}>
          <EmptyState />
        </Box>
      ) : (
        <MainContent 
          questions={Array.isArray(unitsData) ? unitsData : []} 
          practiceData={{
            isCompleted: false,
            score: 0,
          }}
          refetchContent={refetchContent}
        />
      )} */}
      
    </Box>
  );
};

export default CourseProgress;
