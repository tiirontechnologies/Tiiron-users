import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@icons/EditIcon";
import ReportIcon from "@icons/ReportIcon";
import ProfileTwoUserIcon from "@icons/ProfileTwoUserIcon";
import InfoCircleIcon from "@icons/InfoCircleIcon";
import SettingsIcon from "@icons/SettingsIcon";
import Lessons from "./tabs/Lessons";
import Reports from "./tabs/Reports";
const CourseMetaTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabdata = [
    {
      title: "Lessons",
      icon: <EditIcon />,
      content: <Lessons />,
    },
    {
      title: "Overview",
      icon: <InfoCircleIcon />,
      content: (
        <Box>
          <Typography variant="h6">Overview Section</Typography>
          <Typography variant="body2">
            More details about the course here...
          </Typography>
        </Box>
      ),
    },
    {
      title: "Report",
      icon: <ReportIcon />,
      content: <Reports />,
    },
    {
      title: "Learners",
      icon: <ProfileTwoUserIcon />,
      content: <Typography>This is the Learners tab content</Typography>,
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      content: (
        <Box>
          <Typography variant="h6">Settings</Typography>
          <Typography variant="body2">Adjust your preferences here.</Typography>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical Tabs"
        sx={{
          width: 112,
          backgroundColor: "#fff",
        }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        {tabdata.map((tab, index) => (
          <Tab
            key={index}
            iconPosition="top"
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
            icon={
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ background: value === index ? "#FBF8FF" : "#fff" }}
              >
                {tab.icon}
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    mt: "6px",
                    color: "#000000",
                  }}
                >
                  {tab.title}
                </Typography>
              </Box>
            }
            sx={{
              minHeight: "90px",
              borderLeft:
                value === index ? "4px solid #6A42AB" : "4px solid transparent",
              justifyContent: "center",
              textTransform: "none",
              background: value === index ? "#FBF8FF" : "#fff",
              px: 0,
            }}
          />
        ))}
      </Tabs>

      {/* Right-side tab panels */}
      <Box sx={{ flexGrow: 1, mx: "24px", width: "600px" }}>
        {tabdata.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default CourseMetaTabs;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
}
