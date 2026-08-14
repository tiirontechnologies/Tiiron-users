import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const TAB_LABELS = ['About', 'Courses', 'Achivements', 
  'Certifications', 
  'Reviews', 'Community'];

interface ProfileTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function ProfileTabs({ value, onChange }: ProfileTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 , p:3 }}>
      <Tabs value={value} onChange={onChange} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto">
        {TAB_LABELS.map((label) => (
          <Tab key={label} label={label} sx={{ textTransform: 'none', fontWeight: 600 }} />
        ))}
      </Tabs>
    </Box>
  );
}
