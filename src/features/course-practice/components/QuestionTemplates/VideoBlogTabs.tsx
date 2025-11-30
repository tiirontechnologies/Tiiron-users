import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Question } from '../../types';
import { useTabState } from '../../hooks/useTabState';
import VideoTemplate from './VideoTemplate';
import BlogTemplate from './BlogTemplate';

interface VideoBlogTabsProps {
  question: Question;
}

const VideoBlogTabs: React.FC<VideoBlogTabsProps> = ({ question }) => {
  const { activeTab, handleTabChange } = useTabState(0);

  return (
    <Box sx={{ mt: 2 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: '1px solid #E5E7EB',
          mb: 3,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            minHeight: '48px',
            px: 3,
            '&.Mui-selected': {
              color: '#4F39F6',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#4F39F6',
            height: '3px',
            borderRadius: '2px'
          }
        }}
      >
        <Tab label="📹 Video Content" />
        <Tab label="📝 Blog Content" />
      </Tabs>

      <Box sx={{
        display: 'flex',
        gap: 3,
        minHeight: '400px',
        '& > *': {
          flex: 1
        }
      }}>
        {/* Video Section */}
        <Box sx={{
          display: activeTab === 0 ? 'block' : 'none',
          opacity: activeTab === 0 ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <VideoTemplate question={question} />
        </Box>

        {/* Blog Section */}
        <Box sx={{
          display: activeTab === 1 ? 'block' : 'none',
          opacity: activeTab === 1 ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <BlogTemplate question={question} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoBlogTabs;
