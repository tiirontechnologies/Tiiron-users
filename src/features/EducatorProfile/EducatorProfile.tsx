import React, { useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetProfileByUsernameQuery,
  useGetCoursesByUsernameQuery,
} from "./api/profileApiSlice";
import { mapApiToEducatorProfileData } from "./utils/mapEducatorProfile";

import ProfileSidebar from "./components/ProfileSidebar";
import HeroBanner from "./components/HeroBanner";
// import StatsRow from './components/StatsRow';
import ProfileTabs from "./components/ProfileTabs";
import AboutTab from "./components/AboutTab";
import CoursesTab from "./components/CoursesTab";
import ComingSoon from "./components/CoomingSoon";
import EducatorCommunity from "./components/Community";
// import AchievementsSection from './components/AchievementsSection';

interface EducatorProfileProps {
  onMessageClick?: () => void;
}

export default function EducatorProfile({
  onMessageClick,
}: EducatorProfileProps) {
  const { username } = useParams<{ username: string }>();
  const [tabValue, setTabValue] = useState(0);

  const {
    data: apiUser,
    isLoading,
    isError,
  } = useGetProfileByUsernameQuery(username ?? "", {
    skip: !username,
  });

  const { data: coursesData, isLoading: isCoursesLoading } =
    useGetCoursesByUsernameQuery(username ?? "", {
      skip: !username,
    });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !apiUser) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography color="text.secondary">Profile coming soon</Typography>
      </Box>
    );
  }

  const data = mapApiToEducatorProfileData(apiUser);
  //  const courses = coursesData?.data?.courses ?? [];
  const courses = coursesData ?? [];
  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pb: 8 }}>
      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1.5, sm: 3 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", md: "25%" },
              flexShrink: 0,
              order: { xs: 2, md: 1 },
            }}
          >
            <ProfileSidebar
              data={data}
              educatorId={apiUser.id}
              language={apiUser.profile?.language}
              website={apiUser.profile?.website}
            />
          </Box>

          {/* Right side: Hero + Tabs — stacked as own column on desktop, */}
          {/* becomes "invisible" wrapper on mobile so its children can be */}
          {/* independently ordered among the other top-level items */}
          <Box
            sx={{
              width: { xs: "100%", md: "75%" },
              display: { xs: "contents", md: "flex" },
              flexDirection: "column",
              gap: 3,
              order: { md: 2 },
            }}
          >
            <Box sx={{ width: "100%", order: { xs: 1, md: "unset" } }}>
              <HeroBanner data={data} />
            </Box>

            <Box sx={{ width: "100%", order: { xs: 3, md: "unset" } }}>
              <ProfileTabs value={tabValue} onChange={handleTabChange} />

              {tabValue === 0 && (
                <AboutTab
                  data={data}
                  courses={courses}
                  isCoursesLoading={isCoursesLoading}
                  subscriberCount={apiUser._count?.subscribers ?? 0}
                />
              )}

              {tabValue === 1 && (
                <CoursesTab courses={courses} isLoading={isCoursesLoading} />
              )}

              {tabValue === 2 && <ComingSoon />}

              {tabValue === 3 && <ComingSoon />}

              {tabValue === 4 && apiUser?.id && (
                <EducatorCommunity educatorId={apiUser.id} />
              )}

              {tabValue === 5 && <ComingSoon />}
            </Box>
          </Box>
        </Box>

        {/* <AchievementsSection achievements={data.achievements} /> */}
      </Container>
    </Box>
  );
}
