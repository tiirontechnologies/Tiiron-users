// import React from "react";
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   Paper, 
//   Skeleton,
//   Divider
// } from "@mui/material";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import FolderIcon from "@mui/icons-material/Folder";

// import { useGetUnitNotesQuery } from "../../api/courseProgressApi";


// interface Note {
//   id: number;
//   title: string;
//   driveUrl: string;
//   unitId: number;
// }

// const NotesSection: React.FC<NotesSectionProps> = ({ unitId }) => {

//   const {
//   data: response,
//   isLoading,
//   error,
// } = useGetUnitNotesQuery(unitId!, {
//   skip: !unitId,
// });

// const notes: Note[] = response?.data || [];


//   // Loading state
//   if (isLoading) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1.25 }} />
//         <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1.25 }} />
//         <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1.25 }} />
//       </Box>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center" }}>
//         <PictureAsPdfIcon sx={{ fontSize: 48, color: "#cbd5e1", mb: 2 }} />
//         <Typography variant="h6" color="error" sx={{ mb: 1 }}>
//           Failed to load notes
//         </Typography>
//         <Typography variant="caption" color="text.secondary">
//           {error?.message || "Please try again later"}
//         </Typography>
//       </Box>
//     );
//   }

//   // No notes state
//   if (!notes || notes.length === 0) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center" }}>
//         <PictureAsPdfIcon sx={{ fontSize: 48, color: "#cbd5e1", mb: 2 }} />
//         <Typography variant="h6" color="text.secondary">
//           📚 No notes available for this unit
//         </Typography>
//         <Typography variant="caption" color="text.secondary">
//           Check back later or contact your instructor
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Section Header */}
//       <Box sx={{ mb: 3 }}>
//         <Typography 
//           variant="h6" 
//           sx={{ fontWeight: 700, color: "#1f2937", display: "flex", alignItems: "center", gap: 1 }}
//         >
//           <FolderIcon sx={{ color: "#f97316" }} />
//           Course Notes ({notes.length})
//         </Typography>
//         <Typography variant="caption" color="text.secondary">
//           Click to open notes in Google Drive
//         </Typography>
//       </Box>

//       {/* Notes List */}
//       <Paper elevation={0} sx={{ border: "1px solid #e5e7eb", borderRadius: 1.5, overflow: "hidden" }}>
//         {notes.map((note, index) => (
//           <Box key={index}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 py: 2,
//                 px: 2.5,
//                 backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
//                 "&:hover": {
//                   backgroundColor: index % 2 === 0 ? "#f3f4f6" : "#f0f1f5",
//                 },
//                 transition: "background-color 0.2s",
//               }}
//             >
//               {/* Left - Icon + Title */}
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
//                 <PictureAsPdfIcon 
//                   sx={{ 
//                     color: "#e53935", 
//                     fontSize: 32,
//                     flexShrink: 0
//                   }} 
//                 />
//                 <Box>
//                   <Typography 
//                     sx={{ 
//                       fontWeight: 600, 
//                       fontSize: "15px",
//                       color: "#1f2937",
//                     }}
//                   >
//                     {note.title}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     PDF Document
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Right - Button */}
//               <Button
//                 variant="contained"
//                 size="small"
//                 startIcon={<OpenInNewIcon />}
//                 href={note.driveUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 sx={{
//                   textTransform: "none",
//                   fontWeight: 600,
//                   flexShrink: 0,
//                   ml: 2,
//                 }}
//               >
//                 Open
//               </Button>
//             </Box>
            
//             {/* Divider - except last item */}
//             {index < notes.length - 1 && <Divider sx={{ my: 0 }} />}
//           </Box>
//         ))}
//       </Paper>

//       {/* Info Box */}
//       <Box 
//         sx={{ 
//           mt: 3, 
//           p: 2.5, 
//           backgroundColor: "#eff6ff", 
//           borderRadius: 1.5,
//           borderLeft: "4px solid #3b82f6"
//         }}
//       >
//        <Typography variant="caption" sx={{ color: "#1e40af", lineHeight: 1.6 }}>
//   💡 <strong>Note:</strong> Study materials are hosted on Google Drive. You can access, download, or print them directly.
// </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default NotesSection;




import React from "react";
import {
  Box,
  Typography,
  Button,
  Skeleton,
  Divider,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useGetUnitNotesQuery } from "../../api/courseProgressApi";

interface Note {
  id: number;
  title: string;
  driveUrl: string;
  unitId: number;
}

interface NotesSectionProps {
  unitId?: number;
}

const NotesSection: React.FC<NotesSectionProps> = ({ unitId }) => {
  const { data: response, isLoading, error } = useGetUnitNotesQuery(
    unitId!,
    {
      skip: !unitId,
    }
  );

  // const notes: Note[] = response?.data || [];
  const notes: Note[] = (response as any)?.data || [];

  // Loading UI
  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={80}
            sx={{ mb: 2, borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  // Error UI (fixed)
  if (error) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <PictureAsPdfIcon sx={{ fontSize: 60, color: "#e5e7eb", mb: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Failed to load notes
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Please try again later or refresh the page.
        </Typography>
      </Box>
    );
  }

  // Empty state
  if (!notes.length) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <PictureAsPdfIcon sx={{ fontSize: 70, color: "#e5e7eb", mb: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          No Study Materials Found
        </Typography>

        <Typography variant="body2" color="text.secondary">
          PDFs will appear here once uploaded by the instructor.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#111827",
          }}
        >
          Study Notes
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Access downloadable PDF materials for this unit
        </Typography>
      </Box>

      {/* Notes List */}
      <Box>
        {notes.map((note, index) => (
          <React.Fragment key={note.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                bgcolor: "#fff",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  borderColor: "#4F39F6",
                },
              }}
            >
              {/* Left Side */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* PDF Icon Box */}
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: 2,
                    bgcolor: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PictureAsPdfIcon
                    sx={{ fontSize: 30, color: "#DC2626" }}
                  />
                </Box>

                {/* Title */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "15px",
                    }}
                  >
                    {note.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280" }}
                  >
                    PDF Document
                  </Typography>
                </Box>
              </Box>

              {/* Button */}
              <Button
                href={note.driveUrl}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                endIcon={<OpenInNewIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: "#4F39F6",
                  color: "#4F39F6",
                  px: 2.5,
                  "&:hover": {
                    bgcolor: "#4F39F6",
                    color: "#fff",
                    borderColor: "#4F39F6",
                  },
                }}
              >
                Open
              </Button>
            </Box>

            {index < notes.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default NotesSection;
