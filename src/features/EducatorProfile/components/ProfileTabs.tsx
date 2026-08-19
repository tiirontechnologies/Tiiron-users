import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const TAB_LABELS = ['Home', 'Courses', 'Achivements', 
 
  'Reviews', 'Community'];

interface ProfileTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function ProfileTabs({ value, onChange }: ProfileTabsProps) {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        mb: { xs: 2, sm: 3 },
        px: { xs: 0, sm: 1 },
        overflow: 'hidden',
      }}
    >
      <Tabs
        value={value}
        onChange={onChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Educator profile sections"
        sx={{
          minHeight: 48,
          '& .MuiTabs-flexContainer': { gap: { xs: 0.5, sm: 1 } },
          '& .MuiTabs-scroller': {
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          },
          '& .MuiTabScrollButton-root': { width: 28 },
        }}
      >
        {TAB_LABELS.map((label) => (
          <Tab
            key={label}
            label={label}
            sx={{
              minWidth: 'max-content',
              minHeight: 48,
              px: { xs: 1.25, sm: 1.75 },
              fontSize: { xs: '0.78rem', sm: '0.875rem' },
              textTransform: 'none',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
