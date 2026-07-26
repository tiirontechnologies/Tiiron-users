import React from 'react';
import { Paper, Box, Typography, LinearProgress, Link } from '@mui/material';

interface SkillItem {
  name: string;
  percentage: number;
  color: string;
  logoText: string;
  logoBg: string;
}

const TopSkills: React.FC = () => {
  const skills: SkillItem[] = [
    { name: 'HTML', percentage: 90, color: '#ea580c', logoText: '5', logoBg: '#ffedd5' },
    { name: 'CSS', percentage: 85, color: '#2563eb', logoText: '3', logoBg: '#dbeafe' },
    { name: 'JavaScript', percentage: 70, color: '#ca8a04', logoText: 'JS', logoBg: '#fef9c3' },
    { name: 'React', percentage: 65, color: '#0891b2', logoText: '⚛', logoBg: '#ecfeff' },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Top Skills</Typography>
        <Link href="#" variant="body2" sx={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 600 }}>View all ›</Link>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {skills.map((skill, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Skill Logo Circle */}
            <Box sx={{ 
              width: 32, 
              height: 32, 
              borderRadius: 1.5, 
              bgcolor: skill.logoBg, 
              color: skill.color,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 12
            }}>
              {skill.logoText}
            </Box>

            {/* Name label */}
            <Typography variant="body2" sx={{ fontWeight: 600, width: 80 }}>
              {skill.name}
            </Typography>

            {/* Progress Bar Wrapper */}
            <Box sx={{ flex: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={skill.percentage} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3, 
                  bgcolor: '#f1f5f9', 
                  '& .MuiLinearProgress-bar': { bgcolor: '#6366f1' } // Purple primary bar like mockup
                }} 
              />
            </Box>

            {/* Percentage Text */}
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', minWidth: 35, textAlign: 'right' }}>
              {skill.percentage}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TopSkills;