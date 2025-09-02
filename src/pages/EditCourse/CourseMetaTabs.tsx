import { Box, Tab, Tabs, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@icons/EditIcon";
import ReportIcon from "@icons/ReportIcon";
import ProfileTwoUserIcon from "@icons/ProfileTwoUserIcon";
import InfoCircleIcon from "@icons/InfoCircleIcon";
import SettingsIcon from "@icons/SettingsIcon";
import Lessons from "./tabs/Lessons/index"
import Settings from "./tabs/Settings/Settings";
import Learners from "./tabs/Learners";
import Reports from "./tabs/Reports";
import Dashboard from "./tabs/Dashboard";

const CourseMetaTabs = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabdata = [
    {
      title: "Overview",
      icon: <InfoCircleIcon />,
      content: <Dashboard />
    },
    {
      title: "Lessons",
      icon: <EditIcon />,
      content: <Lessons />,
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
    <Box 
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
        minHeight: { xs: 'auto', md: '600px' }
      }}
    >
      <Tabs
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
        overflow: 'hidden'
      }}>
        {tabdata.map((tab, index) => (
          <TabPanel key={index} value={value} index={index} isMobile={isMobile}>
            {tab.content}
          </TabPanel>
        ))}
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
          p: { xs: 1, sm: 2, md: 0 }
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

