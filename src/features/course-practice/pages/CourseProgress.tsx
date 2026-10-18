// import React ,{useEffect}from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { useCourseProgress } from "../hooks/useCourseProgress";
// import { GRADIENTS, COLORS } from "../constants";
// import Header from "../components/Header/Header";
// import Sidebar from "../components/Sidebar/Sidebar";
// import MainContent from "../components/MainContent/MainContent";
// import CoursePracticeContent from "../components/CoursePracticeContent";
// import EmptyState from "../components/UI/EmptyState";
// import Loader from "@components/ui/Spinner";

// import { useNavigate } from "react-router-dom";

// const EMPTY_STATS = {
//   totalSessions: 0,
//   completedSessions: 0,
//   averageScore: 0,
//   progressPercent: 0,
// };

// /* ============================= */
// /* ===== Utility Functions ===== */
// /* ============================= */

// const normalizePracticeData = (unitsData: any) => {
//   if (!unitsData) return null;

//   if (
//     typeof unitsData === "object" &&
//     "success" in unitsData &&
//     "data" in unitsData
//   ) {
//     return unitsData.data;
//   }

//   return unitsData;
// };



// /* ============================= */
// /* ===== Layout Components ===== */
// /* ============================= */

// const CenteredLayout: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => (
//   <Box
//     sx={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "calc(100vh - 84px)",
//       marginLeft: "289px",
//     }}
//   >
//     {children}
//   </Box>
// );

// const CenteredLoader = () => (
//   <CenteredLayout>
//     <Loader />
//   </CenteredLayout>
// );

// const CenteredError = () => (
//   <CenteredLayout>
//     <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
//       <Typography color="error" variant="h6">
//         Some Error occurred...
//       </Typography>
//     </Paper>
//   </CenteredLayout>
// );

// const EmptyContent = () => (
//   <Box sx={{ marginLeft: "289px", marginTop: "84px", padding: "32px" }}>
//     <EmptyState />
//   </Box>
// );

// const MAIN_CONTENT_STYLE = {
//   marginLeft: "289px",
//   marginTop: "64px",
//   padding: "32px",
//   paddingBottom: "120px",
//   height: "calc(100vh - 64px)",
//   overflowY: "auto",
//   background: COLORS.background.light,
//   minHeight: "100vh",
// };

// /* ============================= */
// /* ===== Main Component ======== */
// /* ============================= */

// const CourseProgress: React.FC = () => {
//   const {
//     courseId,
//     courseData,
//     unitsData,
//     selectedUnitId,
//     selectUnit,
//     isUnitsLoading,
//     isUnitsError,
//     unitsError,
//     practiceStats = EMPTY_STATS,
//     refetchContent,
//   } = useCourseProgress();

// const navigate = useNavigate();


// useEffect(() => {
//   if (isUnitsError && (unitsError as any)?.status === 401) {
//     navigate('/login');
//   }
// }, [isUnitsError, unitsError, navigate]);

//   /* ---------- Normalize Data ---------- */

//   const course = (courseData as any)?.data ?? courseData;
//   const courseName = course?.title;
//   const lessonName = course?.chapters?.[0]?.units?.[0]?.title;
//   const chapterInfo = lessonName;

//   const courseDataForSidebar = course?.chapters
//     ? course
//     : { chapters: [] };

//   const practiceData = normalizePracticeData(unitsData);


//   if (isUnitsLoading)
//     return <CenteredLoader />;
//   if (isUnitsError)
//     return <CenteredError />;
//   if (!practiceData)
//     return <EmptyContent />;

//   return (
//     <Box sx={{ minHeight: "100vh", background: GRADIENTS.background }}>
//       <Sidebar
//         data={courseDataForSidebar}
//         onUnitSelect={selectUnit}
//         courseId={courseId}
//         practiceStats={practiceStats}
//       />

//       <Header courseName={courseName} chapterInfo={chapterInfo} />
//       <Box sx={MAIN_CONTENT_STYLE}>
//         <CoursePracticeContent
//           data={practiceData}
//            unitId={selectedUnitId}
          
//         />
//       </Box>
//     </Box>
//   );
// };

// export default CourseProgress;



import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Paper, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useCourseProgress } from "../hooks/useCourseProgress";
import { GRADIENTS, COLORS } from "../constants";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import CoursePracticeContent from "../components/CoursePracticeContent";
import EmptyState from "../components/UI/EmptyState";
import Loader from "@components/ui/Spinner";

const EMPTY_STATS = {
  totalSessions: 0,
  completedSessions: 0,
  averageScore: 0,
  progressPercent: 0,
};

const normalizePracticeData = (unitsData: any) => {
  if (!unitsData) return null;
  if (typeof unitsData === "object" && "success" in unitsData && "data" in unitsData) {
    return unitsData.data;
  }
  return unitsData;
};

// Using Header component imported from components/Header

/* ============================= */
/* ===== Centered Layouts ===== */
/* ============================= */

const CenteredLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 154px)",
      marginLeft: { xs: 0, md: "260px" },
      px: { xs: 2, sm: 2 },
      mt: { xs: "64px", sm: "72px", md: "72px" },
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
  <Box
    sx={{
      marginLeft: { xs: 0, md: "260px" },
      marginTop: { xs: "64px", sm: "72px" },
      padding: { xs: "14px", sm: "20px", md: "24px" },
    }}
  >
    <EmptyState />
  </Box>
);

/* ============================= */
/* ===== Main Component ======== */
/* ============================= */

const CourseProgress: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    courseId,
    courseData,
    unitsData,
    selectedUnitId,
    selectUnit,
    isUnitsLoading,
    isUnitsError,
    unitsError,
    practiceStats = EMPTY_STATS,
  } = useCourseProgress();

  /* ---------- 401 Check ---------- */
  useEffect(() => {
    if (isUnitsError && unitsError) {
      const status = (unitsError as any)?.status;
      if (status === 401) {
        navigate("/login");
      }
    }
  }, [isUnitsError, unitsError, navigate]);

  /* ---------- Normalize Data ---------- */
  const course = (courseData as any)?.data ?? courseData;
  const courseName = course?.title;
  const organizationName =
    course?.organization?.name ||
    course?.orgName ||
    course?.createdByUser?.organization?.name ||
    course?.createdBy?.trim() ||
    course?.orgCode?.trim() ||
    "Course Organization";
  const organizationLogo =
    course?.organization?.logo ||
    course?.orgLogo ||
    course?.createdByUser?.profile?.picture ||
    "";
  const organizationId = Number(
    course?.createdByUser?.id ?? course?.createdByUserId ?? course?.instructorId ?? course?.organization?.userId,
  );
  const organizationUsername =
    course?.createdByUser?.username ?? course?.organization?.username ?? "";

  // Get selected unit name dynamically
  const chapterInfo = useMemo(() => {
    if (!selectedUnitId || !course?.chapters) return "";

    for (const chapter of course.chapters) {
      const unit = chapter.units?.find(
        (u: any) => u.id === parseInt(selectedUnitId) || u.id === selectedUnitId
      );
      if (unit) {
        return unit.title;
      }
    }
    return "";
  }, [selectedUnitId, course?.chapters]);

  const selectedUnit = useMemo(() => {
    if (!selectedUnitId || !course?.chapters) return undefined;

    for (const chapter of course.chapters) {
      const unit = chapter.units?.find(
        (item: any) => String(item.id) === String(selectedUnitId)
      );
      if (unit) return unit;
    }
    return undefined;
  }, [selectedUnitId, course?.chapters]);

  const courseDataForSidebar = course?.chapters ? course : { chapters: [] };
  const practiceData = normalizePracticeData(unitsData);

  const handleSidebarSelect = (unitId: string) => {
    selectUnit(unitId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  if (isUnitsLoading) return <CenteredLoader />;
  if (isUnitsError) return <CenteredError />;
  if (!practiceData) return <EmptyContent />;

  return (
    <Box sx={{ minHeight: "100vh", background: GRADIENTS.background }}>
      {/* ===== DESKTOP SIDEBAR ===== */}
      {/* Only visible on md and up */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "fixed",
          left: 0,
          top: { xs: "64px", sm: "72px", md: "72px" },
          width: "260px",
          height: { xs: "calc(100vh - 64px)", sm: "calc(100vh - 72px)", md: "calc(100vh - 72px)" },
          zIndex: 900,
          flexDirection: "column",
        }}
      >
        <Sidebar
          data={courseDataForSidebar}
          onUnitSelect={selectUnit}
          courseId={courseId}
          practiceStats={practiceStats}
        />
      </Box>

      {/* ===== MOBILE DRAWER SIDEBAR ===== */}
      {/* Only visible on mobile */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "280px",
            boxSizing: "border-box",
            top: 0,
            height: "100vh",
            zIndex: 1302,
          },
        }}
        ModalProps={{
          keepMounted: true,
          sx: { zIndex: 1301 },
        }}
      >
        {/* Drawer Header with Close Button */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #e2e8f0",
            background: COLORS.background.white,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>
          <IconButton
            onClick={() => setSidebarOpen(false)}
            size="small"
            sx={{ color: "#374151" }}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>

        {/* Sidebar Content */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Sidebar
            data={courseDataForSidebar}
            onUnitSelect={handleSidebarSelect} 
            courseId={courseId}
            practiceStats={practiceStats}
            showBackButton={false}
          />
        </Box>
      </Drawer>

      {/* ===== HEADER ===== */}
      <Header
        courseName={courseName}
        chapterInfo={chapterInfo}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* ===== MAIN CONTENT ===== */}
      <Box
        sx={{
          marginLeft: { xs: 0, md: "260px" },
          marginTop: { xs: "64px", sm: "72px", md: "72px" },
          padding: { xs: "14px", sm: "18px", md: "20px" },
          paddingBottom: { xs: "80px", sm: "76px", md: "80px" },
          minHeight: { xs: "calc(100vh - 64px)", sm: "calc(100vh - 72px)" },
          overflowY: "auto",
          background: COLORS.background.light,
        }}
      >
        <CoursePracticeContent
          data={practiceData}
          unitId={selectedUnitId}
          unitData={selectedUnit}
          organizationName={organizationName}
          organizationLogo={organizationLogo}
          organizationId={Number.isFinite(organizationId) && organizationId > 0 ? organizationId : undefined}
          organizationUsername={organizationUsername}
        />
      </Box>
    </Box>
  );
};

export default CourseProgress;

 
