import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface LessonTabsProps {
  tabs: string[];
  panels: React.ReactNode[];
}

const LessonTabs: React.FC<LessonTabsProps> = ({ tabs, panels }) => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      {/* -------- TAB HEADER -------- */}
      <Box
        sx={{
          borderBottom: "1px solid #E5E7EB",
          marginTop: "16px",
        }}
      >
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          variant="standard"
          TabIndicatorProps={{
            sx: {
              height: "2px",
              backgroundColor: "#F97316", // iNeuron orange
            },
          }}
          sx={{
            minHeight: "40px",
            "& .MuiTabs-flexContainer": {
              gap: "24px",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 500,
              color: "#6B7280",
              padding: 0,
              minHeight: "40px",
            },
            "& .Mui-selected": {
              color: "#111827",
              fontWeight: 600,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} disableRipple />
          ))}
        </Tabs>
      </Box>

      {/* -------- TAB CONTENT -------- */}
      <Box sx={{ mt: 3 }}>
        {panels.map((panel, index) => (
          <Box key={index} hidden={value !== index}>
            {value === index && panel}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LessonTabs;