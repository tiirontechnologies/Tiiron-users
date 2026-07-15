// import { Tabs, Tab } from "@mui/material";

// interface CourseGlossaryTabsProps {
//   activeTab: number;
//   onTabChange: (tab: number) => void;
//   courseId?: string;
//   courseName?: string;
// }

// export default function CourseGlossaryTabs({ activeTab, onTabChange }: CourseGlossaryTabsProps) {
//   return (
//     <Tabs
//       value={activeTab}
//       onChange={(_, newValue) => onTabChange(newValue)}
//       sx={{
//         width: "100%",
//         "& .MuiTab-root": {
//           textTransform: "none",
//           fontWeight: 500,
//           minHeight: 60,
//           padding: { xs: "12px 16px", sm: "12px 24px" },
//           color: "#64748B",
//           fontSize: { xs: "14px", sm: "15px", md: "16px" },
//         },
//         "& .MuiTab-root.Mui-selected": {
//           color: "#4F39F6",
//           fontWeight: 600,
//         },
//         "& .MuiTabs-indicator": {
//           backgroundColor: "#090715",
//           height: 3,
//         },
//       }}
//     >
//       <Tab label="Overview" />
//       <Tab label="Lessons" />
//       <Tab label="Certificates" />
//       <Tab label="Reviews" />
//     </Tabs>
//   );
// }


import { Tabs, Tab } from "@mui/material";

interface CourseGlossaryTabsProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
  courseId?: string;
  courseName?: string;
}

export default function CourseGlossaryTabs({ activeTab, onTabChange }: CourseGlossaryTabsProps) {
  return (
    <Tabs
      value={activeTab}
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
      <Tab label="Overview" />
      <Tab label="Lessons" />
      <Tab label="Certificates" />
      <Tab label="Reviews" />
    </Tabs>
  );
}