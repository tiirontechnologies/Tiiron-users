import React, { useState } from "react";
import { Box, Paper, Tabs, Tab } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ScienceIcon from "@mui/icons-material/Science";
import Description from "../section/Description";
import { useQuestionData } from "../hooks/useQuestionData";

import { PAGE } from "../constants";

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
        background: "#18181b",
        color: "#fff",
        overflow: "hidden",
        border: "1px solid #27272a",
        borderRadius: PAGE.radiusLg,
        width: "100%",
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
              borderBottom: "1px solid #27272a",
              background: "#000",
              width: "100%",
              overflow: "visible",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                minHeight: 48,
                px: 1,
                width: "100%",
                "& .MuiTab-root": {
                  color: "#fff",
                  textTransform: "none",
                  minHeight: 48,
                  fontWeight: 500,
                },
                "& .Mui-selected": { color: "#fff" },
                "& .MuiTab-iconWrapper": { color: "#fff" },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#fff",
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
            </Tabs>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, p: activeTab === "1" ? 2 : 0 }}>
            {activeTab === "1" && <Description question={question} />}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
