// import React from "react";
// import { Box, Button, Avatar, Typography, Divider } from "@mui/material";
// import { KeyboardBackspace } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { CourseData } from "../../types";
// import NavigationList from "./NavigationList";
// import PracticeProgressStats from "./PracticeProgressStats";
// import { GRADIENTS, COLORS } from "../../constants";
// // import CourseSidebar from "./CourseSidebar";

// interface PracticeStats {
//   totalSessions: number;
//   completedSessions: number;
//   averageScore: number;
//   progressPercent: number;
// }

// interface SidebarProps {
//   data: CourseData;
//   onUnitSelect: (unitId: string) => void;
//   courseId?: string;
//   practiceStats: PracticeStats;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   data,
//   onUnitSelect,
//   courseId,
//   practiceStats,
// }) => {
//   const navigate = useNavigate();

//   const progressStats = {
//     current: 3,
//     total: 12,
//     percentage: 25,
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "289px",
//         height: "100vh",
//         background: GRADIENTS.background,
//         boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
//         borderRight: "1px solid #e2e8f0",

//         overflowY: "auto",
//         "&::-webkit-scrollbar": {
//           width: "4px",
//         },
//         "&::-webkit-scrollbar-track": {
//           background: "transparent",
//         },
//         "&::-webkit-scrollbar-thumb": {
//           background: "#cbd5e1",
//           borderRadius: "2px",
//         },
//       }}
//     >
//       {/* Back Button */}
//       {/* <Button
//         variant="text"
//         onClick={() => navigate(-1)}
//         startIcon={<KeyboardBackspace sx={{ color: COLORS.text.muted }} />}
//         sx={{
//           mt: 1, mx: 3,
//           background: GRADIENTS.background,
//           borderRadius: "12px",
//           padding: "8px 16px",
//           color: COLORS.text.secondary,
//           fontWeight: 600,
//           fontSize: "14px",
//           textTransform: "none",
//           border: "1px solid #e2e8f0",
//           "&:hover": {
//             background: "linear-gradient(135deg, #0b08b2 0%, #cbd5e1 100%)",
//             transform: "translateY(-1px)",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           },
//         }}
//       >
//         Back to Course
//       </Button> */}
//       <Button
//   variant="outlined"
//   onClick={() => navigate(-1)}
//   startIcon={<KeyboardBackspace />}
//   sx={{
//     mt: 2,
//     mx: 3,

//     height: 42,
//     px: 2.2,

//     borderRadius: "10px",
//     border: "1px solid #0539a8",

//     backgroundColor: "#ffffff",
//     color: "#073087",

//     fontWeight: 600,
//     fontSize: "15.5px",
//     letterSpacing: "0.2px",
//     textTransform: "none",

//     boxShadow: "0 1px 2px rgba(15,23,42,0.04)",

//     transition: "all 0.2s ease-in-out",

//     "& .MuiSvgIcon-root": {
//       fontSize: 18,
//       transition: "all 0.2s ease-in-out",
//     },

//     "&:hover": {
//       backgroundColor: "#0c3fad",
//       borderColor: "#2563eb",
//       color: "#ffffff",

//       boxShadow: "0 6px 14px rgba(37,99,235,0.22)",

//       "& .MuiSvgIcon-root": {
//         color: "#ffffff",
//         transform: "translateX(-2px)",
//       },
//     },

//     "&:active": {
//       transform: "scale(0.98)",
//     },
//   }}
// >
//   Back to Course
// </Button>

//       {/* Course Progress Section */}
//       <Box sx={{ my: 4, mx: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
//           <Avatar
//             sx={{
//               background: GRADIENTS.primary,
//               width: 40,
//               height: 40,
//             }}
//           >
//             📚
//           </Avatar>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "18px",
//                 color: COLORS.text.primary,
//                 fontWeight: 700,
//                 lineHeight: 1.2,
//               }}
//             >
//               Practice
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: "12px",
//                 color: COLORS.text.muted,
//                 fontWeight: 500,
//               }}
//             >
//               Track your progress
//             </Typography>
//           </Box>
//         </Box>
//         {/* <ProgressCard stats={progressStats} /> */}
//         {practiceStats && <PracticeProgressStats stats={practiceStats} />}

//       </Box>

//       <Divider sx={{ mt: 2, opacity: 0.3 }} />

//       {/* Navigation List */}
//       <NavigationList chapters={data?.chapters || []} onUnitSelect={onUnitSelect} />
//       {/* <CourseSidebar/> */}
//     </Box>
//   );
// };

// export default Sidebar;

import React from "react";
import { Box, Button, Avatar, Typography, Divider } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../types";
import NavigationList from "./NavigationList";
import PracticeProgressStats from "./PracticeProgressStats";
import { GRADIENTS, COLORS } from "../../constants";

interface PracticeStats {
  totalSessions: number;
  completedSessions: number;
  averageScore: number;
  progressPercent: number;
}

interface SidebarProps {
  data: CourseData;
  onUnitSelect: (unitId: string) => void;
  courseId?: string;
  practiceStats: PracticeStats;
  showBackButton?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  data,
  onUnitSelect,
  courseId,
  practiceStats,
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: GRADIENTS.background,
        boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
        borderRight: "1px solid #e2e8f0",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#cbd5e1",
          borderRadius: "2px",
        },
      }}
    >
      {/* Back Button */}
      {showBackButton && (
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<KeyboardBackspace />}
          sx={{
            mt: 2,
            mx: 2,
            height: 38,
            px: 1.8,
            borderRadius: "10px",
            border: "1px solid #0539a8",
            backgroundColor: "#ffffff",
            color: "#073087",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0.2px",
            textTransform: "none",
            boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            transition: "all 0.2s ease-in-out",
            "& .MuiSvgIcon-root": {
              fontSize: 18,
              transition: "all 0.2s ease-in-out",
            },
            "&:hover": {
              backgroundColor: "#0c3fad",
              borderColor: "#2563eb",
              color: "#ffffff",
              boxShadow: "0 6px 14px rgba(37,99,235,0.22)",
              "& .MuiSvgIcon-root": {
                color: "#ffffff",
                transform: "translateX(-2px)",
              },
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          Back to Course
        </Button>
      )}

      {/* Course Progress Section */}
      <Box sx={{ my: showBackButton ? 2.5 : 2, mx: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Avatar
            sx={{
              background: GRADIENTS.primary,
              width: 34,
              height: 34,
            }}
          >
            📚
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                color: COLORS.text.primary,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Practice
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: COLORS.text.muted,
                fontWeight: 500,
              }}
            >
              Track your progress
            </Typography>
          </Box>
        </Box>
        {practiceStats && <PracticeProgressStats stats={practiceStats} />}
      </Box>

      <Divider sx={{ mt: 1, opacity: 0.3 }} />

      {/* Navigation List */}
      <NavigationList 
        chapters={data?.chapters || []} 
        onUnitSelect={onUnitSelect} 
      />
    </Box>
  );
};

export default Sidebar;
