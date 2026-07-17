import React from "react";
import { Box, Button, Avatar, Typography, Divider } from "@mui/material";
import { KeyboardBackspace , MenuBookRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../types";
import NavigationList from "./NavigationList";
import PracticeProgressStats from "./PracticeProgressStats";
import { GRADIENTS, COLORS } from "../../constants";
import MonitoringRoundedIcon from "@mui/icons-material/AutoGraphRounded";

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
    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    width: 40,
    height: 40,
    boxShadow: "0 8px 20px rgba(37,99,235,.25)",
  }}
>
  <MonitoringRoundedIcon sx={{ fontSize: 22 }} />
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
