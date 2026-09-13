// import React, { useState } from 'react';
// import { Box, Card, Typography, Avatar, Button, Chip, Divider, Stack } from '@mui/material';
// import { Check, Verified } from '@mui/icons-material';
// import { EducatorProfileData } from '../types/educator.types';
// import SocialLinksCard from './SocialLinksCard';
// import { Add, Public } from "@mui/icons-material";
// import {
//   useSubscribeToEducatorMutation,
//   useUnsubscribeFromEducatorMutation,
// } from "../api/profileApiSlice";

// interface ProfileSidebarProps {
//   data: EducatorProfileData;
//   educatorId: number;
//   language?: string;
//   website?: string;
// }

// export default function ProfileSidebar({
//   data,
//   educatorId,
//   website,
// }: ProfileSidebarProps) {
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [subscribeToEducator, { isLoading: isSubscribing }] = useSubscribeToEducatorMutation();
//   const [unsubscribeFromEducator, { isLoading: isUnsubscribing }] = useUnsubscribeFromEducatorMutation();

//   const handleSubscription = async () => {
//     try {
//       if (isSubscribed) {
//         await unsubscribeFromEducator(educatorId).unwrap();
//       } else {
//         await subscribeToEducator(educatorId).unwrap();
//       }
//       setIsSubscribed((current) => !current);
//     } catch (error) {
//       console.error("Could not update educator subscription", error);
//     }
//   };

//   return (
//     <>
//       <Card
//         sx={{
//           borderRadius: 4,
//           boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
//           textAlign: 'center',
//           p: 2,
//           mb: 3,
//         }}
//       >
//         <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
//           <Avatar
//             src={data.avatarUrl}
//             sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
//           />
//           {data.isVerified && (
//             <Verified
//               color="primary"
//               sx={{ position: 'absolute', bottom: 5, right: 5, bgcolor: 'white', borderRadius: '50%' }}
//             />
//           )}
//         </Box>

//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 700,
//             mt: 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: 0.5,
//             wordBreak: 'break-word',
//             overflowWrap: 'break-word',
//             px: 1,
//           }}
//         >
//           {data.name || 'Educator Profile'} {data.isVerified && <Verified color="primary" fontSize="small" />}
//         </Typography>

//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{
//             mb: 2,
//             wordBreak: 'break-word',
//             overflowWrap: 'break-word',
//             px: 1,
//             display: '-webkit-box',
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: 'vertical',
//             overflow: 'hidden',
//           }}
//         >
//           {data.title || 'This educator is still setting up their profile'}
//         </Typography>

//         {data.tags?.length > 0 && (
//           <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 2, rowGap: 1 }}>
//             {data.tags.map((tag) => (
//               <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#EEF2FF', color: '#4F46E5' }} />
//             ))}
//           </Stack>
//         )}

//         <Card
//           elevation={0}
//           sx={{
//             bgcolor: "#F8FAFC",
//             border: "1px solid #E5E7EB",
//             borderRadius: 3,
//             p: 2.5,
//             mb: 3,
//           }}
//         >
//           <Typography
//             variant="subtitle2"
//             sx={{
//               fontWeight: 700,
//               mb: 2,
//               color: "#111827",
//             }}
//           >
//             Quick Information
//           </Typography>

//           <Box
//             sx={{
//               p: 1.5,
//               borderRadius: 2,
//               bgcolor: "#fff",
//               border: "1px solid #E5E7EB",
//               textAlign: "left",
//             }}
//           >
//             <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
//               <Public fontSize="small" color="primary" />
//               <Typography variant="caption" color="text.secondary">
//                 Website
//               </Typography>
//             </Stack>

//             {website ? (
//               <Typography
//                 component="a"
//                 href={
//                   website.startsWith("http")
//                     ? website
//                     : `https://${website}`
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 sx={{
//                   fontSize: "0.875rem",
//                   fontWeight: 600,
//                   color: "#4F46E5",
//                   textDecoration: "none",
//                   textAlign: "left",
//                   display: "block",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap",
//                   bgcolor: "#EEF2FF",
//                   borderRadius: "6px",
//                   px: 1.5,
//                   py: 0.5,
//                   mt: 0.5,
//                   transition: "all 0.2s ease",
//                   '&:hover': { bgcolor: '#E0E7FF' },
//                 }}
//               >
//                 {website}
//               </Typography>
//             ) : (
//               <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mt: 0.5 }}>
//                 No website added yet
//               </Typography>
//             )}
//           </Box>
//         </Card>

//         <Button
//           variant="contained"
//           startIcon={isSubscribed ? <Check /> : <Add />}
//           fullWidth
//           disabled={isSubscribing || isUnsubscribing}
//           onClick={() => void handleSubscription()}
//           sx={{
//             bgcolor: isSubscribed ? '#475569' : '#4F46E5',
//             borderRadius: 2,
//             textTransform: 'none',
//             py: 1,
//             '&:hover': { bgcolor: isSubscribed ? '#334155' : '#4338CA' },
//           }}
//         >
//           {isSubscribing || isUnsubscribing ? "Please wait..." : isSubscribed ? "Unsubscribe" : "Subscribe"}
//         </Button>
//       </Card>

//       <SocialLinksCard links={data.socialLinks} />
//     </>
//   );
// }






import React from 'react';
import { Box, Card, Typography, Avatar, Button, Chip, Stack } from '@mui/material';
import { Check, Verified } from '@mui/icons-material';
import { EducatorProfileData } from '../types/educator.types';
import SocialLinksCard from './SocialLinksCard';
import { Add, Public } from "@mui/icons-material";
import {
  useIsSubscribedQuery,
  useSubscribeToEducatorMutation,
  useUnsubscribeFromEducatorMutation,
} from "../api/profileApiSlice";

interface ProfileSidebarProps {
  data: EducatorProfileData;
  educatorId: number;
  language?: string;
  website?: string;
}

export default function ProfileSidebar({
  data,
  educatorId,
  website,
}: ProfileSidebarProps) {
  const { data: isSubscribed = false } = useIsSubscribedQuery(educatorId, {
    skip: !educatorId,
  });

  const [subscribeToEducator, { isLoading: isSubscribing }] = useSubscribeToEducatorMutation();
  const [unsubscribeFromEducator, { isLoading: isUnsubscribing }] = useUnsubscribeFromEducatorMutation();

  const handleSubscription = async () => {
    try {
      if (isSubscribed) {
        await unsubscribeFromEducator(educatorId).unwrap();
      } else {
        await subscribeToEducator(educatorId).unwrap();
      }
    } catch (error) {
      console.error("Could not update educator subscription", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
          textAlign: 'center',
          p: 2,
          mb: 3,
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
          <Avatar
            src={data.avatarUrl}
            sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
          />
          {data.isVerified && (
            <Verified
              color="primary"
              sx={{ position: 'absolute', bottom: 5, right: 5, bgcolor: 'white', borderRadius: '50%' }}
            />
          )}
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            px: 1,
          }}
        >
          {data.name || 'Educator Profile'} {data.isVerified && <Verified color="primary" fontSize="small" />}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            px: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {data.title || 'This educator is still setting up their profile'}
        </Typography>

        {data.tags?.length > 0 && (
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 2, rowGap: 1 }}>
            {data.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#EEF2FF', color: '#4F46E5' }} />
            ))}
          </Stack>
        )}

        <Card
          elevation={0}
          sx={{
            bgcolor: "#F8FAFC",
            border: "1px solid #E5E7EB",
            borderRadius: 3,
            p: 2.5,
            mb: 3,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#111827",
            }}
          >
            Quick Information
          </Typography>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "#fff",
              border: "1px solid #E5E7EB",
              textAlign: "left",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
              <Public fontSize="small" color="primary" />
              <Typography variant="caption" color="text.secondary">
                Website
              </Typography>
            </Stack>

            {website ? (
              <Typography
                component="a"
                href={
                  website.startsWith("http")
                    ? website
                    : `https://${website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#4F46E5",
                  textDecoration: "none",
                  textAlign: "left",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  bgcolor: "#EEF2FF",
                  borderRadius: "6px",
                  px: 1.5,
                  py: 0.5,
                  mt: 0.5,
                  transition: "all 0.2s ease",
                  '&:hover': { bgcolor: '#E0E7FF' },
                }}
              >
                {website}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mt: 0.5 }}>
                No website added yet
              </Typography>
            )}
          </Box>
        </Card>

        <Button
          variant="contained"
          startIcon={isSubscribed ? <Check /> : <Add />}
          fullWidth
          disabled={isSubscribing || isUnsubscribing}
          onClick={() => void handleSubscription()}
          sx={{
            bgcolor: isSubscribed ? '#475569' : '#4F46E5',
            borderRadius: 2,
            textTransform: 'none',
            py: 1,
            '&:hover': { bgcolor: isSubscribed ? '#334155' : '#4338CA' },
          }}
        >
          {isSubscribing || isUnsubscribing ? "Please wait..." : isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </Card>

      <SocialLinksCard links={data.socialLinks} />
    </>
  );
}