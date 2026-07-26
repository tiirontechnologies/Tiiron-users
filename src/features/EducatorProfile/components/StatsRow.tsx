// import React from 'react';
// import { Grid, Card, Box, Typography } from '@mui/material';
// import {
//   People,
//   MenuBook,
//   AssignmentTurnedIn,
//   Star,
//   ThumbUp,
//   WorkspacePremium,
// } from '@mui/icons-material';
// import { StatItem } from '../types/educator.types';

// // Maps a stat label to its icon so the row stays data-driven — add a
// // label/icon pair here if a new stat type shows up from the API.
// const ICON_MAP: Record<string, React.ReactNode> = {
//   'Total Learners': <People color="primary" />,
//   'Published Courses': <MenuBook color="secondary" />,
//   'Course Completion': <AssignmentTurnedIn color="success" />,
//   'Average Rating': <Star sx={{ color: '#F59E0B' }} />,
//   'Positive Feedback': <ThumbUp color="info" />,
//   'Certificates Issued': <WorkspacePremium sx={{ color: '#8B5CF6' }} />,
// };

// interface StatsRowProps {
//   stats: StatItem[];
// }

// export default function StatsRow({ stats }: StatsRowProps) {
//   return (
//     <Grid container spacing={2} sx={{ mb: 3 }}>
//       {stats.map((stat) => (
//         <Grid item xs={6} sm={4} md={2} key={stat.label}>
//           <Card
//             sx={{
//               borderRadius: 3,
//               textAlign: 'center',
//               p: 1.5,
//               height: '100%',
//               boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
//             }}
//           >
//             <Box sx={{ display: 'inline-flex', p: 1, bgcolor: '#F1F5F9', borderRadius: '50%', mb: 1 }}>
//               {ICON_MAP[stat.label] ?? <Star sx={{ color: '#94A3B8' }} />}
//             </Box>
//             <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
//               {stat.count}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {stat.label}
//             </Typography>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }



import React from 'react';
import { Grid, Card, Box, Typography } from '@mui/material';
import {
  People,
  MenuBook,
  AssignmentTurnedIn,
  Star,
  ThumbUp,
  WorkspacePremium,
} from '@mui/icons-material';
import { StatItem } from '../types/educator.types';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Total Learners': <People color="primary" />,
  'Published Courses': <MenuBook color="secondary" />,
  'Course Completion': <AssignmentTurnedIn color="success" />,
  'Average Rating': <Star sx={{ color: '#F59E0B' }} />,
  'Positive Feedback': <ThumbUp color="info" />,
  'Certificates Issued': <WorkspacePremium sx={{ color: '#8B5CF6' }} />,
};

interface StatsRowProps {
  stats: StatItem[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  if (!stats?.length) {
    return (
      <Card sx={{ borderRadius: 3, p: 2, mb: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Stats coming soon
        </Typography>
      </Card>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {stats.map((stat) => (
        <Grid item xs={6} sm={4} md={2} key={stat.label}>
          <Card
            sx={{
              borderRadius: 3,
              textAlign: 'center',
              p: 1.5,
              height: '100%',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            }}
          >
            <Box sx={{ display: 'inline-flex', p: 1, bgcolor: '#F1F5F9', borderRadius: '50%', mb: 1 }}>
              {ICON_MAP[stat.label] ?? <Star sx={{ color: '#94A3B8' }} />}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
              {stat.count}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {stat.label}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
