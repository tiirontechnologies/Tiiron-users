import React from 'react';
import { Box, Typography } from '@mui/material';
import { Question } from '../../types';
import { getYouTubeEmbedUrl } from '../../utils';

interface VideoTemplateProps {
  question: Question;
}

const VideoTemplate: React.FC<VideoTemplateProps> = ({ question }) => {
  const embedUrl = getYouTubeEmbedUrl(question.content.url || '');

  return (
    <Box sx={{ mt: 2 }}>
      {embedUrl ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '56.25%', // 16:9 aspect ratio
            overflow: 'hidden',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <iframe
            src={embedUrl}
            title="YouTube video"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      ) : (
        <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
          Invalid YouTube URL
        </Typography>
      )}
    </Box>
  );
};

export default VideoTemplate;
