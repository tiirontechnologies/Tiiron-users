import React, { useState } from "react";
import { Box, Paper, Tabs, Tab } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ScienceIcon from "@mui/icons-material/Science";
import RestoreIcon from "@mui/icons-material/Restore";
import Description from "../section/Description";
import Editorial from "../section/Editorial";
import Solution from "../section/Solution";
import Submission from "../section/Submission";
import { useQuestionData } from "../hooks/useQuestionData";

interface ProblemPanelProps { }

export const ProblemPanel: React.FC<ProblemPanelProps> = () => {
  const { question } = useQuestionData();
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "rgba(24, 24, 27, 0.96)",
        color: "#fff",
        "& .MuiTypography-root": {
          color: "#fff",
        },
        overflow: "hidden",
        width: "100%",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "12px",
        boxShadow: "0 18px 45px rgba(0,0,0,0.24)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          typography: "body1",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              flexShrink: 0,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(15, 15, 18, 0.94) !important",
              width: "100%",
              overflow: "visible",
              backdropFilter: "blur(10px)",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              className="pareshani"
              sx={{
                width: "100%",
                minHeight: 48,
                px: { xs: 0.5, sm: 1 },
                backgroundColor: "transparent !important",
                "& .MuiTab-root": {
                  color: "#ffffff",
                  textTransform: "none",
                  minHeight: 48,
                  fontWeight: 500,
                  px: { xs: 1.25, sm: 2 },
                  backgroundColor: "transparent",
                  transition: "color 0.2s ease, background-color 0.2s ease",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  },
                },
                "& .Mui-selected": { color: "#fff !important", fontWeight: 800 },
                "& .MuiTab-iconWrapper": { color: "inherit" },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#7c6cff",
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
                "& .MuiTabs-scroller": { overflow: "auto !important" },
                "& .MuiTabs-flexContainer": { flexWrap: "nowrap" },
                "& .MuiTabs-scrollButtons": { color: "#fff" },
              }}
            >
              <Tab icon={<DescriptionIcon />} iconPosition="start" label="Description" value="1" />
              <Tab icon={<AutoStoriesIcon />} iconPosition="start" label="Editorial" value="2" />
              <Tab icon={<ScienceIcon />} iconPosition="start" label="Solutions" value="3" />
              <Tab icon={<RestoreIcon />} iconPosition="start" label="Submissions" value="4" />
            </Tabs>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, p: { xs: 1.5, sm: 2 } }}>
            {activeTab === "1" && <Description question={question} />}
            {activeTab === "2" && <Editorial question={question} />}
            {activeTab === "3" && <Solution question={question} />}
            {activeTab === "4" && <Submission question={question} />}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
