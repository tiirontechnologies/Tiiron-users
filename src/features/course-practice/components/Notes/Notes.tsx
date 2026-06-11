// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";

// interface NotesSectionProps {
//   pdfUrl?: string;
// }

// const NotesSection: React.FC<NotesSectionProps> = ({ pdfUrl }) => {
//   if (!pdfUrl) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center" }}>
//         <Typography variant="h6" color="text.secondary">
//           No notes available
//         </Typography>
//       </Box>
//     );
//   }

//   // Google Drive URL ko embed format mein convert karo
//   const getEmbedUrl = (url: string) => {
//     // Google Drive share link → embed link
//     // https://drive.google.com/file/d/FILE_ID/view → https://drive.google.com/file/d/FILE_ID/preview
//     if (url.includes("drive.google.com")) {
//       return url.replace("/view", "/preview").replace("/edit", "/preview");
//     }
//     // Supabase ya direct PDF URL
//     return `${url}#toolbar=0`;
//   };

//   const embedUrl = getEmbedUrl(pdfUrl);

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Download Button */}
//       <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
//         <Button
//           variant="contained"
//           startIcon={<DownloadIcon />}
//           href={pdfUrl}
//           download
//           target="_blank"
//           rel="noreferrer"
//         >
//           Download PDF
//         </Button>
//       </Box>

//       {/* PDF Viewer */}
//       <Box
//         sx={{
//           width: "100%",
//           height: "80vh",
//           border: "1px solid #e0e0e0",
//           borderRadius: "8px",
//           overflow: "hidden",
//         }}
//       >
//         <iframe
//           src={embedUrl}
//           width="100%"
//           height="100%"
//           style={{ border: "none" }}
//           title="Notes PDF"
//           allow="autoplay"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default NotesSection;

// import React from "react";
// import { Box, Typography, Button, Paper } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// interface NotesSectionProps {
//   pdfUrl?: string;
//   driveUrl?: string; // Google Drive link
// }

// const NotesSection: React.FC<NotesSectionProps> = ({ pdfUrl, driveUrl }) => {
//   if (!pdfUrl) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center" }}>
//         <Typography variant="h6" color="text.secondary">
//           No notes available
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* PDF Card */}
//       <Paper
//         elevation={0}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           p: 2,
//           mb: 3,
//           border: "1px solid #e0e0e0",
//           borderRadius: "10px",
//           backgroundColor: "#fafafa",
//         }}
//       >
//         {/* Left - PDF Icon + Name */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <PictureAsPdfIcon sx={{ color: "#e53935", fontSize: 36 }} />
//           <Box>
//             <Typography fontWeight={600} fontSize="15px">
//               Course Notes
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               PDF Document
//             </Typography>
//           </Box>
//         </Box>

//         {/* Right - Buttons */}
//         <Box sx={{ display: "flex", gap: 1.5 }}>
//           {driveUrl && (
//             <Button
//               variant="outlined"
//               startIcon={<OpenInNewIcon />}
//               href={driveUrl}
//               target="_blank"
//               rel="noreferrer"
//               size="small"
//             >
//               Open in Drive
//             </Button>
//           )}
//           <Button
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             href={pdfUrl}
//             download
//             target="_blank"
//             rel="noreferrer"
//             size="small"
//           >
//             Download
//           </Button>
//         </Box>
//       </Paper>

//       {/* PDF Viewer */}
//       <Box
//         sx={{
//           width: "100%",
//           height: "80vh",
//           border: "1px solid #e0e0e0",
//           borderRadius: "8px",
//           overflow: "hidden",
//         }}
//       >
//         <iframe
//           src={`${pdfUrl}#toolbar=0`}
//           width="100%"
//           height="100%"
//           style={{ border: "none" }}
//           title="Notes PDF"
//           allow="autoplay"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default NotesSection; 



// new component codes 



// import React from "react";
// import { Box, Typography, Button, Paper } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// interface NotesSectionProps {
//   pdfUrl?: string;
//   driveUrl?: string;
// }

// const NotesSection: React.FC<NotesSectionProps> = ({ pdfUrl, driveUrl }) => {

//   // Dono nahi hain toh empty state
//   if (!pdfUrl && !driveUrl) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center" }}>
//         <Typography variant="h6" color="text.secondary">
//           No notes available
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* PDF Card */}
//       <Paper
//         elevation={0}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           p: 2,
//           mb: 3,
//           border: "1px solid #e0e0e0",
//           borderRadius: "10px",
//           backgroundColor: "#fafafa",
//         }}
//       >
//         {/* Left - PDF Icon + Name */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <PictureAsPdfIcon sx={{ color: "#e53935", fontSize: 36 }} />
//           <Box>
//             <Typography fontWeight={600} fontSize="15px">
//               Course Notes
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               PDF Document
//             </Typography>
//           </Box>
//         </Box>

//         {/* Right - Buttons */}
//         <Box sx={{ display: "flex", gap: 1.5 }}>
//           {/* pdf nahi hai toh drive btn dikha */}
//           {!pdfUrl && driveUrl && (
//             <Button
//               variant="contained"
//               startIcon={<OpenInNewIcon />}
//               href={driveUrl}
//               target="_blank"
//               rel="noreferrer"
//               size="small"
//             >
//               Open in Drive
//             </Button>
//           )}

//           {/* pdf hai toh drive outlined + download dono dikha */}
//           {pdfUrl && (
//             <>
//               {driveUrl && (
//                 <Button
//                   variant="outlined"
//                   startIcon={<OpenInNewIcon />}
//                   href={driveUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   size="small"
//                 >
//                   Open in Drive
//                 </Button>
//               )}
//               <Button
//                 variant="contained"
//                 startIcon={<DownloadIcon />}
//                 href={pdfUrl}
//                 download
//                 target="_blank"
//                 rel="noreferrer"
//                 size="small"
//               >
//                 Download
//               </Button>
//             </>
//           )}
//         </Box>
//       </Paper>

//       {/* PDF Viewer — sirf tab jab pdfUrl ho */}
//       {pdfUrl && (
//         <Box
//           sx={{
//             width: "100%",
//             height: "80vh",
//             border: "1px solid #e0e0e0",
//             borderRadius: "8px",
//             overflow: "hidden",
//           }}
//         >
//           <iframe
//             src={`${pdfUrl}#toolbar=0`}
//             width="100%"
//             height="100%"
//             style={{ border: "none" }}
//             title="Notes PDF"
//             allow="autoplay"
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default NotesSection;



// fort now its static 

import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface NotesSectionProps {
  pdfUrl?: string;
  driveUrl?: string;
  courseId?: number;
}


const COURSE_DRIVE_URLS: Record<number, string> = {
  1: "https://drive.google.com/drive/folders/1GlyM4w1VEjdLB5ckTguIanp_Ib0aU44F",
  2: "https://drive.google.com/drive/folders/1ZyDTALLLcctT_JVZYhX2C9Fy_AxZa3cO?usp=sharing",
};

const NotesSection: React.FC<NotesSectionProps> = ({ pdfUrl, driveUrl, courseId }) => {


  const resolvedDriveUrl = driveUrl || (courseId ? COURSE_DRIVE_URLS[courseId] : undefined);

  if (!pdfUrl && !resolvedDriveUrl) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No notes available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          mb: 3,
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PictureAsPdfIcon sx={{ color: "#e53935", fontSize: 36 }} />
          <Box>
            <Typography fontWeight={600} fontSize="15px">
              Course Notes
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PDF Document
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          {!pdfUrl && resolvedDriveUrl && (
            <Button
              variant="contained"
              startIcon={<OpenInNewIcon />}
              href={resolvedDriveUrl}
              target="_blank"
              rel="noreferrer"
              size="small"
            >
              Open in Drive
            </Button>
          )}

          {pdfUrl && (
            <>
              {resolvedDriveUrl && (
                <Button
                  variant="outlined"
                  startIcon={<OpenInNewIcon />}
                  href={resolvedDriveUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="small"
                >
                  Open in Drive
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                href={pdfUrl}
                download
                target="_blank"
                rel="noreferrer"
                size="small"
              >
                Download
              </Button>
            </>
          )}
        </Box>
      </Paper>

      {pdfUrl && (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Notes PDF"
            allow="autoplay"
          />
        </Box>
      )}
    </Box>
  );
};

export default NotesSection;