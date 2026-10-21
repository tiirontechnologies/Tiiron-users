

import { Tabs, Tab } from "@mui/material";

interface CourseGlossaryTabsProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
  courseId?: string;
  courseName?: string;
  showCertificates: boolean;
}

export default function CourseGlossaryTabs({ activeTab, onTabChange, showCertificates }: CourseGlossaryTabsProps) {
  return (
    <Tabs
      value={activeTab === 2 && !showCertificates ? 0 : activeTab}
      onChange={(_, newValue) => onTabChange(newValue)}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      sx={{
        width: "100%",
        "& .MuiTabs-flexContainer": {
          gap: { xs: "4px", sm: "0px" },
        },
        "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: 500,
          minHeight: 60,
          minWidth: "fit-content",
          whiteSpace: "nowrap",
          padding: { xs: "12px 16px", sm: "12px 24px" },
          color: "#64748B",
          fontSize: { xs: "14px", sm: "15px", md: "16px" },
        },
        "& .MuiTab-root.Mui-selected": {
          color: "#4F39F6",
          fontWeight: 600,
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#090715",
          height: 3,
        },
        "& .MuiTabs-scrollButtons": {
          "&.Mui-disabled": {
            opacity: 0.3,
          },
        },
      }}
    >
      <Tab value={0} label="Overview" />
      <Tab value={1} label="Lessons" />
      {showCertificates && <Tab value={2} label="Certificates" />}
      <Tab value={3} label="Comments" />
      <Tab value={4} label="Reviews" />
    </Tabs>
  );
}
