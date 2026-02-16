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

/* ============================= */
/* ===== Utility Functions ===== */
/* ============================= */

const normalizePracticeData = (unitsData: any) => {
  if (!unitsData) return null;

  if (
    typeof unitsData === "object" &&
    "success" in unitsData &&
    "data" in unitsData
  ) {
    return unitsData.data;
  }

  return unitsData;
};



/* ============================= */
/* ===== Layout Components ===== */
/* ============================= */

const CenteredLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 84px)",
      marginLeft: "289px",
    }}
  >
    {children}
  </Box>
);

const CenteredLoader = () => (
  <CenteredLayout>
    <Loader />
  </CenteredLayout>
);

const CenteredError = () => (
  <CenteredLayout>
    <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
      <Typography color="error" variant="h6">
        Some Error occurred...
      </Typography>
    </Paper>
  </CenteredLayout>
);

const EmptyContent = () => (
  <Box sx={{ marginLeft: "289px", marginTop: "84px", padding: "32px" }}>
    <EmptyState />
  </Box>
);

const MAIN_CONTENT_STYLE = {
  marginLeft: "289px",
  marginTop: "64px",
  padding: "32px",
  paddingBottom: "120px",
  height: "calc(100vh - 64px)",
  overflowY: "auto",
  background: COLORS.background.light,
  minHeight: "100vh",
};

/* ============================= */
/* ===== Main Component ======== */
/* ============================= */

const CourseProgress: React.FC = () => {
  const {
    courseId,
    courseData,
    unitsData,
    selectedUnitId,
    selectUnit,
    isUnitsLoading,
    isUnitsError,
    practiceStats = EMPTY_STATS,
    refetchContent,
  } = useCourseProgress();

  /* ---------- Normalize Data ---------- */

  const course = (courseData as any)?.data ?? courseData;
  const courseName = course?.title;
  const lessonName = course?.chapters?.[0]?.units?.[0]?.title;
  const chapterInfo = lessonName;

  const courseDataForSidebar = course?.chapters
    ? course
    : { chapters: [] };

  const practiceData = normalizePracticeData(unitsData);


  if (isUnitsLoading)
    return <CenteredLoader />;
  if (isUnitsError)
    return <CenteredError />;
  if (!practiceData)
    return <EmptyContent />;

  return (
    <Box sx={{ minHeight: "100vh", background: GRADIENTS.background }}>
      <Sidebar
        data={courseDataForSidebar}
        onUnitSelect={selectUnit}
        courseId={courseId}
        practiceStats={practiceStats}
      />

      <Header courseName={courseName} chapterInfo={chapterInfo} />
      <Box sx={MAIN_CONTENT_STYLE}>
        <CoursePracticeContent
          data={practiceData}
          
        />
      </Box>
    </Box>
  );
};

export default CourseProgress;

