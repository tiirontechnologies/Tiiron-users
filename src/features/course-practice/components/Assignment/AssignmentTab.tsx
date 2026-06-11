// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
// } from "@mui/material";
// import LinkIcon from "@mui/icons-material/Link";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// const isValidDriveLink = (url: string) =>
//   url.includes("drive.google.com") || url.includes("docs.google.com");

// const AssignmentTab: React.FC = () => {
//   const [driveLink, setDriveLink] = useState("");
//   const [error, setError] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDriveLink(e.target.value);
//     if (error) setError("");
//   };

//   const handleSubmit = async () => {
//     if (!driveLink.trim()) {
//       setError("Google Drive link daalo.");
//       return;
//     }
//     if (!isValidDriveLink(driveLink)) {
//       setError("Sirf Google Drive ya Docs link accepted hai.");
//       return;
//     }
//     setIsLoading(true);
//     // TODO: apni API call yahan lagao
//     await new Promise((r) => setTimeout(r, 900));
//     setIsLoading(false);
//     setSubmitted(true);
//   };

//   /* ── Submitted ── */
//   if (submitted) {
//     return (
//       <Box
//         sx={{
//           maxWidth: 520,
//           mx: "auto",
//           mt: 6,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//           gap: 2,
//         }}
//       >
//         <Box
//           sx={{
//             width: 68,
//             height: 68,
//             borderRadius: "50%",
//             bgcolor: "#F0FDF4",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <CheckCircleOutlineIcon sx={{ fontSize: 38, color: "#16A34A" }} />
//         </Box>
//         <Typography variant="h6" fontWeight={700} color="#1F2937">
//           Assignment Submitted!
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Your work has been received. Instructor will review it shortly.
//         </Typography>
//         <Box
//           component="a"
//           href={driveLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           sx={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 0.75,
//             px: 2,
//             py: 0.75,
//             borderRadius: 99,
//             border: "1px solid #E2E8F0",
//             bgcolor: "#F8FAFC",
//             color: "#2563EB",
//             fontSize: 13,
//             textDecoration: "none",
//             wordBreak: "break-all",
//             "&:hover": { bgcolor: "#EFF6FF" },
//           }}
//         >
//           <LinkIcon sx={{ fontSize: 15 }} />
//           {driveLink.length > 52 ? driveLink.slice(0, 52) + "…" : driveLink}
//           <OpenInNewIcon sx={{ fontSize: 13, flexShrink: 0 }} />
//         </Box>
//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ mt: 1, textTransform: "none", borderRadius: 2 }}
//           onClick={() => {
//             setSubmitted(false);
//             setDriveLink("");
//           }}
//         >
//           Resubmit
//         </Button>
//       </Box>
//     );
//   }

//   /* ── Form ── */
//   return (
//     <Box sx={{ maxWidth: 580, pt: 3, pb: 6 }}>
//       <Typography variant="h6" fontWeight={700} color="#1F2937" gutterBottom>
//         Submit Assignment
//       </Typography>
//       <Typography
//         variant="body2"
//         color="text.secondary"
//         sx={{ mb: 3, lineHeight: 1.7 }}
//       >
//         Complete the assignment and upload it to Google Drive. Paste the shared
//         link below — make sure the sharing permission is set to{" "}
//         <Box component="span" fontWeight={600} color="#374151">
//           "Anyone with the link can view"
//         </Box>
//         .
//       </Typography>

//       {/* Steps */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 1.5,
//           p: 2.5,
//           borderRadius: 2.5,
//           bgcolor: "#F8FAFC",
//           border: "1px solid #E2E8F0",
//           mb: 3.5,
//         }}
//       >
//         {[
//           "Assignment file Google Drive pe upload karo",
//           'File → "Share" → "Anyone with the link can view" karo',
//           "Link copy karo aur neeche paste karo",
//         ].map((step, i) => (
//           <Box
//             key={i}
//             sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
//           >
//             <Box
//               sx={{
//                 minWidth: 22,
//                 height: 22,
//                 borderRadius: "50%",
//                 bgcolor: "#6366F1",
//                 color: "#fff",
//                 fontSize: 12,
//                 fontWeight: 700,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mt: "1px",
//               }}
//             >
//               {i + 1}
//             </Box>
//             <Typography variant="body2" color="#4B5563">
//               {step}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       <TextField
//         fullWidth
//         label="Google Drive Link"
//         placeholder="https://drive.google.com/file/d/..."
//         value={driveLink}
//         onChange={handleChange}
//         error={!!error}
//         helperText={error}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <LinkIcon
//                 sx={{ color: error ? "#EF4444" : "#9CA3AF", fontSize: 20 }}
//               />
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           mb: 2.5,
//           "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: 14 },
//         }}
//       />

//       <Button
//         variant="contained"
//         onClick={handleSubmit}
//         disabled={isLoading}
//         startIcon={<CloudUploadIcon />}
//         sx={{
//           textTransform: "none",
//           fontWeight: 600,
//           px: 3.5,
//           py: 1.1,
//           borderRadius: 2,
//           fontSize: 14,
//           bgcolor: "#6366F1",
//           "&:hover": { bgcolor: "#4F46E5" },
//           "&:disabled": { bgcolor: "#C7D2FE", color: "#fff" },
//         }}
//       >
//         {isLoading ? "Submitting…" : "Submit Assignment"}
//       </Button>
//     </Box>
//   );
// };

// export default AssignmentTab;


import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, InputAdornment, Skeleton,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useParams } from "react-router-dom";
import {
  useGetAssignmentQuery,
  useSubmitAssignmentMutation,
} from "../../api/courseProgressApi"; 

const isValidDriveLink = (url: string) =>
  url.includes("drive.google.com") || url.includes("docs.google.com");

const AssignmentTab: React.FC = () => {
  const { courseId = "" } = useParams();
  const [driveLink, setDriveLink] = useState("");
  const [error, setError] = useState("");
  const [isResubmitting, setIsResubmitting] = useState(false);

  const { data, isLoading, isError } = useGetAssignmentQuery(
    { courseId },
    { skip: !courseId }
  );
  const [submitAssignment, { isLoading: isSubmitting }] = useSubmitAssignmentMutation();

  const submission = data?.data?.[0]; // latest submission
  const isAlreadySubmitted = !!submission && !isResubmitting;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriveLink(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!driveLink.trim()) { setError("Please paste your Google Drive link."); return; }
    if (!isValidDriveLink(driveLink)) { setError("Only Google Drive or Docs links are accepted."); return; }
    try {
      await submitAssignment({ courseId, submissionUrl: driveLink.trim() }).unwrap();
      setIsResubmitting(false);
      setDriveLink("");
    } catch (err: any) {
      setError(err?.data?.message || "Submission failed. Please try again.");
    }
  };

  /* ── Loading ── */
  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 580, pt: 3 }}>
        <Skeleton variant="rounded" height={28} width="40%" sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={80} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={44} width={160} />
      </Box>
    );
  }

  /* ── Already submitted ── */
  if (isAlreadySubmitted) {
    return (
      <Box sx={{ maxWidth: 520, pt: 3 }}>

        {/* Success banner */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, borderRadius: 2, bgcolor: "#F0FDF4", border: "1px solid #BBF7D0", mb: 3 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 32, color: "#16A34A", flexShrink: 0 }} />
          <Box>
            <Typography fontWeight={700} color="#15803D">Assignment Submitted</Typography>
            <Typography variant="body2" color="#166534">
              Your work has been received. The instructor will review it shortly.
            </Typography>
          </Box>
        </Box>

        {/* Submission details */}
        <Box sx={{ p: 2.5, borderRadius: 2, border: "1px solid #E2E8F0", bgcolor: "#F8FAFC", mb: 3 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
            Submitted Link
          </Typography>
          <Box
            component="a"
            href={submission.submissionUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75, color: "#2563EB", fontSize: 13, textDecoration: "none", wordBreak: "break-all", "&:hover": { textDecoration: "underline" } }}
          >
            <LinkIcon sx={{ fontSize: 15, flexShrink: 0 }} />
            {submission.submissionUrl.length > 60
              ? submission.submissionUrl.slice(0, 60) + "…"
              : submission.submissionUrl}
            <OpenInNewIcon sx={{ fontSize: 13, flexShrink: 0 }} />
          </Box>

          {/* Submitted on */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 1.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 13, color: "text.disabled" }} />
            <Typography variant="caption" color="text.secondary">
              Submitted on{" "}
              {new Date(submission.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              })}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsResubmitting(true)}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Resubmit
        </Button>
      </Box>
    );
  }

  /* ── Form ── */
  return (
    <Box sx={{ maxWidth: 580, pt: 3, pb: 6 }}>
      <Typography variant="h6" fontWeight={700} color="#1F2937" gutterBottom>
        Submit Assignment
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
        Complete the assignment and upload it to Google Drive. Paste the shared
        link below — make sure sharing is set to{" "}
        <Box component="span" fontWeight={600} color="#374151">
          "Anyone with the link can view"
        </Box>.
      </Typography>

      {/* Steps */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2.5, borderRadius: 2.5, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0", mb: 3.5 }}>
        {[
          "Upload your assignment file to Google Drive",
          'Right-click → "Share" → set to "Anyone with the link can view"',
          "Copy the link and paste it below",
        ].map((step, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <Box sx={{ minWidth: 22, height: 22, borderRadius: "50%", bgcolor: "#6366F1", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", mt: "1px" }}>
              {i + 1}
            </Box>
            <Typography variant="body2" color="#4B5563">{step}</Typography>
          </Box>
        ))}
      </Box>

      <TextField
        fullWidth
        label="Google Drive Link"
        placeholder="https://drive.google.com/file/d/..."
        value={driveLink}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkIcon sx={{ color: error ? "#EF4444" : "#9CA3AF", fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2.5, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: 14 } }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isSubmitting}
        startIcon={<CloudUploadIcon />}
        sx={{ textTransform: "none", fontWeight: 600, px: 3.5, py: 1.1, borderRadius: 2, fontSize: 14, bgcolor: "#6366F1", "&:hover": { bgcolor: "#4F46E5" }, "&:disabled": { bgcolor: "#C7D2FE", color: "#fff" } }}
      >
        {isSubmitting ? "Submitting…" : "Submit Assignment"}
      </Button>
    </Box>
  );
};

export default AssignmentTab;
