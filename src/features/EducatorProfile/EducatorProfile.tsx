import React, { useState } from 'react';
import { Box, Container, Grid, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetProfileByUsernameQuery } from './api/profileApiSlice';
import { mapApiToEducatorProfileData } from './utils/mapEducatorProfile';

import ProfileSidebar from './components/ProfileSidebar';
import HeroBanner from './components/HeroBanner';
// import StatsRow from './components/StatsRow';
import ProfileTabs from './components/ProfileTabs';
import AboutTab from './components/AboutTab';
import CoursesTab from './components/CoursesTab';
import ComingSoon from './components/CoomingSoon';
// import AchievementsSection from './components/AchievementsSection';

interface EducatorProfileProps {
  onMessageClick?: () => void;
}

export default function EducatorProfile({ onMessageClick }: EducatorProfileProps) {
  const { username } = useParams<{ username: string }>();
  const [tabValue, setTabValue] = useState(0);

  const {
    data: apiUser,
    isLoading,
    isError,
  } = useGetProfileByUsernameQuery(username ?? '', {
    skip: !username,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !apiUser) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography color="text.secondary">Profile coming soon</Typography>
      </Box>
    );
  }

  const data = mapApiToEducatorProfileData(apiUser);

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pb: 8 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <ProfileSidebar data={data}   language={apiUser.profile?.language}
  website={apiUser.profile?.website}/>
          </Grid>

          <Grid item xs={12} md={9}>
            <HeroBanner data={data} />
            {/* <StatsRow stats={data.microStats} /> */}
            <ProfileTabs value={tabValue} onChange={handleTabChange} />

            {tabValue === 0 && <AboutTab data={data} />}
            {tabValue === 1 && <ComingSoon/>}
            {tabValue === 2 && <ComingSoon/>}
            {tabValue === 3 && <ComingSoon/>}
            {tabValue === 4 && <ComingSoon/>}
            {tabValue === 5 && <ComingSoon/>}
          </Grid>
        </Grid>

        {/* <AchievementsSection achievements={data.achievements} /> */}
      </Container>
    </Box>
  );
}