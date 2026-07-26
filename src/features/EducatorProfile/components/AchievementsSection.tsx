// import React from 'react';
// import { Box, Grid, Card, Typography } from '@mui/material';
// import { EmojiEvents, Star, LocalFireDepartment, WorkspacePremium } from '@mui/icons-material';
// import { Achievement } from '../types/educator.types';

// const ICON_MAP: Record<Achievement['icon'], React.ReactNode> = {
//   trophy: <EmojiEvents sx={{ color: '#F59E0B' }} />,
//   star: <Star sx={{ color: '#3B82F6' }} />,
//   fire: <LocalFireDepartment sx={{ color: '#EF4444' }} />,
//   certificate: <WorkspacePremium sx={{ color: '#10B981' }} />,
// };

// interface AchievementsSectionProps {
//   achievements: Achievement[];
// }

// export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
//   if (!achievements?.length) return null;

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
//         Achievements & Recognition
//       </Typography>
//       <Grid container spacing={2}>
//         {achievements.map((badge) => (
//           <Grid item xs={12} sm={6} md={3} key={badge.title}>
//             <Card
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 2,
//                 p: 2,
//                 borderRadius: 3,
//                 border: '1px solid #E2E8F0',
//                 boxShadow: 'none',
//               }}
//             >
//               <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, display: 'inline-flex' }}>
//                 {ICON_MAP[badge.icon]}
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
//                   {badge.title}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {badge.desc}
//                 </Typography>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }



import React from 'react';
import { Box, Grid, Card, Typography } from '@mui/material';
import { EmojiEvents, Star, LocalFireDepartment, WorkspacePremium } from '@mui/icons-material';
import { Achievement } from '../types/educator.types';

const ICON_MAP: Record<Achievement['icon'], React.ReactNode> = {
  trophy: <EmojiEvents sx={{ color: '#F59E0B' }} />,
  star: <Star sx={{ color: '#3B82F6' }} />,
  fire: <LocalFireDepartment sx={{ color: '#EF4444' }} />,
  certificate: <WorkspacePremium sx={{ color: '#10B981' }} />,
};

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Achievements & Recognition
      </Typography>
      {achievements?.length > 0 ? (
        <Grid container spacing={2}>
          {achievements.map((badge) => (
            <Grid item xs={12} sm={6} md={3} key={badge.title}>
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  boxShadow: 'none',
                }}
              >
                <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, display: 'inline-flex' }}>
                  {ICON_MAP[badge.icon]}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {badge.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {badge.desc}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ borderRadius: 3, p: 2, textAlign: 'center', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <Typography variant="body2" color="text.secondary">
            Coming soon
          </Typography>
        </Card>
      )}
    </Box>
  );
}

