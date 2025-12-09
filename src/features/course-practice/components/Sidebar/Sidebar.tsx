import React from "react";
import { Box, Button, Avatar, Typography, Divider } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../types";
import NavigationList from "./NavigationList";
import PracticeProgressStats from "./PracticeProgressStats";
import { GRADIENTS, COLORS, SHADOWS } from "../../constants";

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
  selectedUnitId?: string;
  practiceData?: {
    isCompleted: boolean;
    score: number;
  } | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  data,
  onUnitSelect,
  courseId,
  practiceStats,
  selectedUnitId,
  practiceData,
}) => {
  const navigate = useNavigate();

  console.log("Sidebar", data.chapters, onUnitSelect, courseId);
  console.log("sidebar Practice stats:", practiceStats);
  <PracticeProgressStats stats={practiceStats} />;

  const progressStats = {
    current: 3,
    total: 12,
    percentage: 25,
  };

  console.log("Rendering PracticeProgressStats with courseId:", courseId);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "289px",
        height: "100vh",
        background: COLORS.background.white,
        boxShadow: SHADOWS.xl,
        borderRight: `1px solid ${COLORS.border.light}`,
        p: "24px",
        overflowY: "auto",
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
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        startIcon={<KeyboardBackspace sx={{ color: COLORS.text.muted }} />}
        sx={{
          background: COLORS.background.light,
          borderRadius: "12px",
          padding: "8px 16px",
          color: COLORS.text.secondary,
          fontWeight: 600,
          fontSize: "14px",
          textTransform: "none",
          border: `1px solid ${COLORS.border.light}`,
          transition: "all 0.2s ease",
          "&:hover": {
            background: COLORS.background.lighter,
            borderColor: COLORS.primary,
            color: COLORS.primary,
            transform: "translateY(-1px)",
            boxShadow: SHADOWS.md,
          },
        }}
      >
        Back to Course
      </Button>

      {/* Course Progress Section */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              background: GRADIENTS.primary,
              width: 40,
              height: 40,
            }}
          >
            📚
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                color: COLORS.text.primary,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Learning Trail
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
        {/* <ProgressCard stats={progressStats} /> */}
        {practiceStats && <PracticeProgressStats stats={practiceStats} />}
      </Box>

      <Divider sx={{ my: 2, borderColor: COLORS.border.light }} />

      {/* Navigation List */}
      <NavigationList
        chapters={data?.chapters}
        onUnitSelect={onUnitSelect}
        selectedUnitId={selectedUnitId}
        practiceData={practiceData}
      />
    </Box>
  );
};

export default Sidebar;
