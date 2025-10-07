import { Box, Tab, Tabs, Typography, useTheme, useMediaQuery, Button, Divider, Rating } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@icons/EditIcon";
import ReportIcon from "@icons/ReportIcon";
import ProfileTwoUserIcon from "@icons/ProfileTwoUserIcon";
import InfoCircleIcon from "@icons/InfoCircleIcon";
import SettingsIcon from "@icons/SettingsIcon";
import { Lessons, Settings, Learners, Reports, CourseDashboard } from "../../../features";
import ToolBar from "./index";
import MoreButton from "./MoreButton";
import PublishButton from "./PublishButton";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../course-dashboard/api/courseApi";
import { useGetChaptersQuery } from "../../lesson-management/api/chapterApi";
import Loader from "@components/ui/Spinner";

const CourseMetaTabs = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { courseId } = useParams<{ courseId: string }>();
  
  // Fetch course data
  const { data: courseData, isLoading: isCourseLoading, error: courseError } = useGetCourseByIdQuery({ 
    id: courseId || "" 
  }, {
    skip: !courseId // Skip the query if courseId is not available
  });
  
  // Fetch chapters data
  const { data: chaptersData, isLoading: isChaptersLoading, error: chaptersError, isSuccess: isChaptersSuccess } = useGetChaptersQuery({
    id: courseId || "",
    page: 1,
    limit: 100
  }, {
    skip: !courseId // Skip the query if courseId is not available
  });

  // Debug logging
  console.log('CourseMetaTabs - courseId:', courseId);
  console.log('CourseMetaTabs - courseData:', courseData);
  console.log('CourseMetaTabs - chaptersData:', chaptersData);
  console.log('CourseMetaTabs - chaptersData?.data:', chaptersData?.data);
  console.log('CourseMetaTabs - chaptersData?.data?.chapters:', chaptersData?.data?.chapters);
  console.log('CourseMetaTabs - chaptersData?.data || chaptersData:', chaptersData?.data || chaptersData);
  console.log('CourseMetaTabs - final chaptersData:', chaptersData?.data?.chapters || chaptersData?.data || chaptersData);
  console.log('CourseMetaTabs - courseError:', courseError);
  console.log('CourseMetaTabs - chaptersError:', chaptersError);
  console.log('CourseMetaTabs - isCourseLoading:', isCourseLoading);
  console.log('CourseMetaTabs - isChaptersLoading:', isChaptersLoading);
  console.log('CourseMetaTabs - isChaptersSuccess:', isChaptersSuccess);
  console.log('CourseMetaTabs - token:', localStorage.getItem('token'));
  
  // Extract chapters data with fallback
  const extractChaptersData = (data: any) => {
    if (!data) return null;
    
    // Try different possible data structures
    if (Array.isArray(data)) return data;
    if (data.chapters && Array.isArray(data.chapters)) return data.chapters;
    if (data.data && Array.isArray(data.data)) return data.data;
    if (data.data && data.data.chapters && Array.isArray(data.data.chapters)) return data.data.chapters;
    
    return null;
  };
  
  const extractedChaptersData = extractChaptersData(chaptersData);
  console.log('CourseMetaTabs - extractedChaptersData:', extractedChaptersData);
  
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Show error if no courseId
  if (!courseId) {
    console.log('CourseMetaTabs - No courseId provided');
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">No course ID provided. Please navigate to a valid course.</Typography>
      </Box>
    );
  }

  // Validate courseId format
  if (isNaN(Number(courseId))) {
    console.log('CourseMetaTabs - Invalid courseId format:', courseId);
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Invalid course ID format. Please navigate to a valid course.</Typography>
      </Box>
    );
  }

  // Show loading state while fetching course data
  if (isCourseLoading || isChaptersLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
      </Box>
    );
  }

  // Show error state if course fetch failed
  if (courseError || chaptersError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">
          Error loading data: {courseError ? 'Course data' : 'Chapters data'}. Please try again.
        </Typography>
      </Box>
    );
  }

  // Show message if chapters data is not available after successful API call
  if (isChaptersSuccess && !extractedChaptersData) {
    console.log('CourseMetaTabs - No chapters data found after successful API call');
  }

  // Show message if chapters data is empty array
  if (isChaptersSuccess && extractedChaptersData && extractedChaptersData.length === 0) {
    console.log('CourseMetaTabs - Empty chapters array returned from API');
  }

  const tabdata = [
    {
      title: "Overview",
      icon: <InfoCircleIcon />,
      content: <CourseDashboard />
    },
    {
      title: "Lessons",
      icon: <EditIcon />,
      content: <Lessons courseData={courseData?.data} chaptersData={extractedChaptersData} />,
    },
    {
      title: "Report",
      icon: <ReportIcon />,
      content: <Reports />,
    },
    {
      title: "Learners",
      icon: <ProfileTwoUserIcon />,
      content: <Learners />,
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      content: (
        <Settings />
      ),
    },
  ];
  return (
    <Box>
      <ToolBar previousPage="/courses" courseName={courseData?.data?.name || "Course Name"}>
        <RightSideTools />
      </ToolBar>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          minHeight: { xs: 'auto', md: '600px' },
          height: 'calc(100vh - 64px)',
          backgroundColor: '#f8fafc'
        }}
      >
      <Tabs
        className="course-edit-tabs"
        orientation={isMobile ? "horizontal" : "vertical"}
        variant={isMobile ? "scrollable" : "standard"}
        value={value}
        onChange={handleChange}
        aria-label="Course Meta Tabs"
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile={isMobile}
        sx={{
          width: { xs: '100%', md: 112 },
          backgroundColor: "#fff",
          borderBottom: { xs: '1px solid #e0e0e0', md: 'none' },
          borderRight: { xs: 'none', md: '1px solid #e0e0e0' },
          minHeight: { xs: 'auto', md: '100%' },
          '& .MuiTabs-flexContainer': {
            flexDirection: { xs: 'row', md: 'column' },
            gap: { xs: 0, md: 0 }
          },
          '& .MuiTabs-scrollButtons': {
            display: { xs: 'flex', md: 'none' }
          }
        }}
        TabIndicatorProps={{ 
          style: { 
            display: isMobile ? "block" : "none",
            backgroundColor: isMobile ? "#6A42AB" : "transparent",
            height: isMobile ? "2px" : "0px"
          } 
        }}
      >
        {tabdata.map((tab, index) => (
          <Tab
            key={index}
            iconPosition={isMobile ? "start" : "top"}
            id={`${isMobile ? 'horizontal' : 'vertical'}-tab-${index}`}
            aria-controls={`${isMobile ? 'horizontal' : 'vertical'}-tabpanel-${index}`}
            icon={
              <Box
                display="flex"
                flexDirection={{ xs: 'row', md: 'column' }}
                alignItems="center"
                gap={{ xs: 1, md: 0 }}
                sx={{ 
                  background: value === index ? "#FBF8FF" : "#fff",
                  width: '100%'
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  '& svg': {
                    width: { xs: 20, md: 24 },
                    height: { xs: 20, md: 24 }
                  }
                }}>
                  {tab.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "12px" },
                    fontWeight: 500,
                    mt: { xs: 0, md: "6px" },
                    color: "#000000",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {tab.title}
                </Typography>
              </Box>
            }
            sx={{
              minHeight: { xs: "60px", md: "90px" },
              minWidth: { xs: 'auto', md: 112 },
              maxWidth: { xs: 'none', md: 112 },
              borderLeft: {
                xs: 'none',
                md: value === index ? "4px solid #6A42AB" : "4px solid transparent"
              },
              borderBottom: {
                xs: value === index ? "2px solid #6A42AB" : "2px solid transparent",
                md: 'none'
              },
              justifyContent: "center",
              textTransform: "none",
              background: value === index ? "#FBF8FF" : "#fff",
              px: { xs: 2, md: 0 },
              py: { xs: 1, md: 0 },
              '&:hover': {
                backgroundColor: value === index ? "#FBF8FF" : "#f5f5f5"
              }
            }}
          />
        ))}
      </Tabs>

      {/* Tab panels */}
      <Box sx={{ 
        flexGrow: 1, 
        mx: { xs: 0, md: "24px" },
        mt: { xs: 2, md: 0 },
        width: { xs: '100%', md: 'calc(100% - 160px)' },
        maxWidth: { xs: '100%', md: 'none' },
        overflow: 'auto',
        backgroundColor: '#fff',
        borderRadius: { xs: 0, md: '12px' },
        boxShadow: { xs: 'none', md: '0 2px 8px rgba(0,0,0,0.08)' },
        border: { xs: 'none', md: '1px solid #f0f0f0' }
      }}>
        {tabdata.map((tab, index) => (
          <TabPanel key={index} value={value} index={index} isMobile={isMobile}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
      </Box>
    </Box>
  );
};

export const RightSideTools = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "48px",
      }}
    >
      <PublishButton />
      <Button
        variant="outlined"
        onClick={() => navigate(`/course-progress/${courseId}`)}
        sx={{
          padding: "12px 32px",
          height: "48px",
          color: "#6A42AB",
          border: "1px solid #6A42AB",
          borderRadius: "8px",
          backgroundColor: "transparent",
          textTransform: "none", // keeps "Preview" as-is
          "&:hover": {
            border: "2px solid #6A42AB",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // subtle hover
          },
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:active": {
            border: "1px solid #6A42AB",
            boxShadow: "none",
          },
        }}
      >
        Preview
      </Button>
      <MoreButton />
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "#B3B3B3", // sets the line color
          height: "48px", // sets custom height
          borderWidth: "0.8px", // optional: control thickness
        }}
      />
      <Box>
        <Rating
          size="small"
          name="simple-uncontrolled"
          readOnly
          defaultValue={0}
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "#808080", // 🎯 your custom color here (e.g., #ccc, white, etc.)
            },
            "& .MuiRating-iconFilled": {
              color: "gold", // optional: change selected star color
            },
          }}
        />
        <Typography sx={{ color: "#808080", fontSize: "12px" }}>
          No Rating
        </Typography>
      </Box>
      <Typography sx={{ color: "#000000" }}>/</Typography>
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Lessons</Typography>
      </Box>
      <Typography sx={{ color: "#000000" }}>/</Typography>
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Learners</Typography>
      </Box>
    </Box>
  );
};

export default CourseMetaTabs;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  isMobile?: boolean;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, isMobile, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${isMobile ? 'horizontal' : 'vertical'}-tabpanel-${index}`}
      aria-labelledby={`${isMobile ? 'horizontal' : 'vertical'}-tab-${index}`}
      {...other}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {value === index && (
        <Box sx={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          p: { xs: 2, sm: 3, md: 3 },
          minHeight: { xs: '400px', md: '500px' }
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

