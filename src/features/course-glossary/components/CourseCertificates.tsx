// import { Box, Typography, Skeleton } from "@mui/material";

// export default function CourseCertificate() {
//   return (
//     <Box sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>

//       {/* Certificate Image Skeleton */}
//       <Skeleton
//         variant="rectangular"
//         width="100%"
//         height={340}
//         sx={{ borderRadius: 3, maxWidth: 600 }}
//       />

//       {/* Coming Soon Text */}
//       <Typography
//         variant="h6"
//         sx={{ color: "#94A3B8", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}
//       >
//         Coming Soon
//       </Typography>

//     </Box>
//   );
// }


import { Box, Typography, Skeleton } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership"; // Ek premium icon ke liye

export default function CourseCertificate() {
  return (
    <Box sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      
      {/* Premium Certificate Container / Skeleton */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          height: 340,
          borderRadius: 4,
          overflow: "hidden",
          // Premium subtle border
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Shimmer Background Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bgcolor: "rgba(255, 255, 255, 0.03)", // Subtle premium dark/glassy base
            "&::after": {
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)",
            },
          }}
        />

        {/* Inner Premium Content (Overlay on Skeleton) */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            opacity: 0.7, // Gives it a nice placeholders/coming-soon look
          }}
        >
          {/* Glowing Premium Icon */}
          <CardMembershipIcon 
            sx={{ 
              fontSize: 64, 
              color: "#E2E8F0",
              filter: "drop-shadow(0px 0px 12px rgba(255,255,255,0.2))"
            }} 
          />
          <Typography
            variant="body2"
            sx={{ color: "#94A3B8", fontWeight: 500, letterSpacing: 1 }}
          >
            Verified Certification
          </Typography>
        </Box>
      </Box>

      {/* Coming Soon Text & Message */}
      <Box sx={{ textAlign: "center", px: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            // Premium text gradient effect (Adjust colors based on your theme)
            background: "linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Coming Soon
        </Typography>
        
        <Typography
          variant="body2"
          sx={{ 
            color: "#64748B", 
            maxWidth: 400, 
            lineHeight: 1.6,
            fontWeight: 400 
          }}
        >
          Complete the course to unlock your premium certificate and showcase your expertise to the world.
        </Typography>
      </Box>

    </Box>
  );
}
