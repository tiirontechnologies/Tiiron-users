import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useCourseProgress } from './hooks/useCourseProgress';
import { GRADIENTS, COLORS } from './constants';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import EmptyState from './components/UI/EmptyState';
import Loader from '@components/Template/ui/Spinner';

const CourseProgress: React.FC = () => {
  const {
    courseData,
    unitsData,
    selectUnit,
    isLoading,
    hasError,
    hasData,
    hasUnits,
    isCourseLoading,
    isUnitsLoading,
    isCourseError,
    isUnitsError,
  } = useCourseProgress();

  if (!courseData?.data) {
    return (
      <Box sx={{ minHeight: "100vh", background: GRADIENTS.background }}>
        {isCourseLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Loader />
          </Box>
        ) : isCourseError ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
              <Typography color="error" variant="h6">Error loading course data</Typography>
            </Paper>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Typography>Course ID is required</Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: GRADIENTS.background }}>
      {/* Sidebar */}
      <Sidebar 
        data={courseData.data} 
        onUnitSelect={selectUnit}
        courseId={courseData.data?.id}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      {isUnitsLoading ? (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "calc(100vh - 84px)", 
          marginLeft: "289px" 
        }}>
          <Loader />
        </Box>
      ) : isUnitsError ? (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "calc(100vh - 84px)", 
          marginLeft: "289px" 
        }}>
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
            <Typography color="error" variant="h6">Some Error occurred...</Typography>
          </Paper>
        </Box>
      ) : !hasUnits ? (
        <Box sx={{ marginLeft: "289px", marginTop: "84px", padding: "32px" }}>
          <EmptyState />
        </Box>
      ) : (
        <MainContent questions={unitsData?.data || []} />
      )}
    </Box>
  );
};

export default CourseProgress;
