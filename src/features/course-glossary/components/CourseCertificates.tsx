// import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
// import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import StarIcon from "@mui/icons-material/Star";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import LanguageIcon from "@mui/icons-material/Language";
// import EmailIcon from "@mui/icons-material/Email";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import MemoryIcon from "@mui/icons-material/Memory";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import CodeIcon from "@mui/icons-material/Code";
// import ForumIcon from "@mui/icons-material/Forum";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import SchoolIcon from "@mui/icons-material/School";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { getEvaluationDataForUser, COURSE_CONFIG, COURSE_SKILLS } from "./data";
// import Mohar from "../../../assets/Mohar.png";
// import { useGetLoggedInUserQuery } from "../api/courseApi";
// import { toPng } from "html-to-image"; 

// const COLORS = {
//   primaryBlue: "#081F5C",
//   darkNavy: "#001529",
//   accentRed: "#E4262F",
//   border: "#C9D7EA",
//   background: "#FFFFFF",
//   textPrimary: "#06164A",
//   textSecondary: "#14235A",
//   textMuted: "#596780",
//   link: "#0757D9",
// };

// const FONT_FAMILY = "Arial, Helvetica, sans-serif";
// const CERT_WIDTH = 840;
// const CERT_HEIGHT = 1188;

// interface CourseCertificateProps {
//   courseId: string;
//   courseName: string;
// }

// interface CertificateData {
//   studentName: string;
//   enrollmentId: string;
//   internshipTrack: string;
//   college: string;
//   duration: string;
//   evaluationDate: string;
//   mentorName: string;
//   batch: string;
//   scores: { label: string; score: string; icon: ReactNode }[];
//   overall: string;
//   assessment: string;
//   verificationId: string;
//   skills: string[];
//   remarks: string;
// }

// function formatOrdinalDate(date: Date): string {
//   const day = date.getDate();
//   const month = date.toLocaleString("en-US", { month: "long" });
//   const year = date.getFullYear();
//   const suffix = (d: number) => {
//     if (d > 3 && d < 21) return "th";
//     switch (d % 10) {
//       case 1:
//         return "st";
//       case 2:
//         return "nd";
//       case 3:
//         return "rd";
//       default:
//         return "th";
//     }
//   };
//   return `${day}${suffix(day)} ${month} ${year}`;
// }

// function buildCertificateData(userId: number, studentName: string, courseId: string, courseName: string): CertificateData {
//   const evalData = getEvaluationDataForUser(userId, studentName);
//   const courseConfig = COURSE_CONFIG[courseId] ?? { mentorName: "Priya Mehrotra", batch: "FSWD-MAR25-B1", courseCode: "FSWD" };
//   const skills = COURSE_SKILLS[courseId] ?? COURSE_SKILLS["1"];
//   const iconStyle = { fontSize: 18, color: COLORS.textSecondary };
//   const icons = [
//     <EventNoteIcon sx={iconStyle} />,
//     <AssignmentTurnedInIcon sx={iconStyle} />,
//     <MemoryIcon sx={iconStyle} />,
//     <LightbulbIcon sx={iconStyle} />,
//     <CodeIcon sx={iconStyle} />,
//     <ForumIcon sx={iconStyle} />,
//     <AssignmentIcon sx={iconStyle} />,
//   ];

//   return {
//     studentName,
//     enrollmentId: `INA-${courseConfig.courseCode}-${String(userId).padStart(4, "0")}`,
//     internshipTrack: courseName,
//     college: "Tiiron Technologies",
//     duration: "3rd March 2025 - 3rd June 2025",
//     evaluationDate: formatOrdinalDate(new Date(2025, 5, 4)),
//     mentorName: courseConfig.mentorName,
//     batch: courseConfig.batch,
//     scores: evalData.scores.map((score, index) => ({
//       label: score.label,
//       score: `${score.score.toFixed(1)} / 10`,
//       icon: icons[index] ?? <AssignmentIcon sx={iconStyle} />,
//     })),
//     overall: `${evalData.overall.toFixed(1)} / 10`,
//     assessment: evalData.assessment.toUpperCase(),
//     verificationId: evalData.verificationId,
//     skills,
//     remarks: evalData.remarks,
//   };
// }

// function waitForImages(node: HTMLElement): Promise<void> {
//   const imgs = Array.from(node.querySelectorAll("img"));
//   return Promise.all(
//     imgs.map((img) => {
//       if (img.complete && img.naturalWidth > 0) return Promise.resolve();
//       return new Promise<void>((resolve) => {
//         img.addEventListener("load", () => resolve(), { once: true });
//         img.addEventListener("error", () => resolve(), { once: true });
//         setTimeout(resolve, 4000);
//       });
//     })
//   ).then(() => undefined);
// }

// async function preloadImage(src: string) {
//   const image = new Image();
//   image.src = src;
//   await image.decode().catch(() => undefined);
// }



// async function generatePDFFromNode(node: HTMLElement, cert: CertificateData) {
//   await document.fonts.ready;
//   await preloadImage(Mohar);
//   await waitForImages(node);
//   await new Promise((resolve) => requestAnimationFrame(resolve));

//   const dataUrl = await toPng(node, {
//     quality: 1,
//     pixelRatio: 2,
//     width: CERT_WIDTH,
//     height: CERT_HEIGHT,
//     backgroundColor: "#ffffff",
//     cacheBust: true,
//   });

//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//     compress: false,
//   });

//   pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297);
//   pdf.save(
//     `Evaluation_${cert.studentName.replace(/\s+/g, "_") || "Student"}.pdf`,
//   );
// }

// const PillSectionHeader = ({ title, icon }: { title: string; icon?: ReactNode }) => (
//   <Box
//     sx={{
//       background: COLORS.darkNavy,
//       color: "#fff",
//       px: "15px",
//       py: "7px",
//       borderRadius: "8px 8px 8px 0",
//       display: "inline-flex",
//       alignItems: "center",
//       gap: "8px",
//       minWidth: "214px",
//       boxShadow: "0 2px 7px rgba(0, 21, 41, 0.18)",
//       fontFamily: FONT_FAMILY,
//       fontWeight: 800,
//       fontSize: "0.78rem",
//       lineHeight: 1,
//       textTransform: "uppercase",
//     }}
//   >
//     <Box component="span" sx={{ display: "inline-flex", alignItems: "center", color: "#fff", "& svg": { color: "#fff", fill: "#fff" } }}>
//       {icon}
//     </Box>
//     <Box
//       component="span"
//       sx={{
//         display: "inline-block",
//         color: "#fff",
//         fontFamily: FONT_FAMILY,
//         fontWeight: 800,
//         fontSize: "0.78rem",
//         lineHeight: 1,
//         textTransform: "uppercase",
//         WebkitTextFillColor: "#fff",
//       }}
//     >
//       {title}
//     </Box>
//   </Box>
// );

// const InlineSectionHeader = ({ title, icon }: { title: string; icon?: ReactNode }) => (
//   <Box sx={{ display: "flex", alignItems: "center", gap: "9px", mb: "7px" }}>
//     {icon}
//     <Typography sx={{ fontWeight: 900, fontSize: "0.86rem", color: COLORS.textPrimary, textTransform: "uppercase" }}>
//       {title}
//     </Typography>
//   </Box>
// );

// const InfoRow = ({ label, value }: { label: string; value: string }) => (
//   <Box sx={{ display: "grid", gridTemplateColumns: "140px 14px 1fr", alignItems: "start", py: "3.5px" }}>
//     <Typography sx={{ fontWeight: 800, color: COLORS.textPrimary, fontSize: "0.76rem" }}>{label}</Typography>
//     <Typography sx={{ fontWeight: 800, color: COLORS.textPrimary, fontSize: "0.76rem" }}>:</Typography>
//     <Typography sx={{ fontWeight: 600, color: COLORS.textSecondary, fontSize: "0.76rem", lineHeight: 1.25 }}>{value}</Typography>
//   </Box>
// );

// const Card = ({ children, sx = {} }: { children: ReactNode; sx?: object }) => (
//   <Box
//     sx={{
//       border: `1px solid ${COLORS.border}`,
//       borderRadius: "9px",
//       p: "14px",
//       bgcolor: COLORS.background,
//       boxShadow: "0 2px 8px rgba(8,31,92,0.035)",
//       ...sx,
//     }}
//   >
//     {children}
//   </Box>
// );

// const CertificateHeader = () => (
//   <Box sx={{ mb: "8px" }}>
//     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <Box component="img" src="/inac_nobg.png" alt="Inacademic Logo" crossOrigin="anonymous" sx={{ height: 98, width: 170, objectFit: "contain", objectPosition: "left center" }} />
//       <Box sx={{ textAlign: "center", flex: 1 }}>
//         <SchoolIcon sx={{ color: COLORS.primaryBlue, fontSize: 22, mb: "-3px" }} />
//         <Typography sx={{ fontWeight: 950, fontSize: "2.05rem", letterSpacing: "0.5px", lineHeight: 0.95 }}>
//           <Box component="span" sx={{ color: COLORS.accentRed }}>IN</Box>
//           <Box component="span" sx={{ color: COLORS.darkNavy }}>ACADEMIC</Box>
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", mt: "5px" }}>
//           <Box sx={{ height: 1, width: 34, bgcolor: COLORS.darkNavy }} />
//           <Typography sx={{ fontSize: "0.72rem", letterSpacing: "2px", color: COLORS.textPrimary, fontWeight: 700 }}>
//             INTERNAL EVALUATION REPORT
//           </Typography>
//           <Box sx={{ height: 1, width: 34, bgcolor: COLORS.darkNavy }} />
//         </Box>
//       </Box>
//       <Box component="img" src="/Tiiron_Technologies_Logo.png" alt="Tiiron Technologies Logo" crossOrigin="anonymous" sx={{ height: 108, width: 170, objectFit: "contain", objectPosition: "right center" }} />
//     </Box>
//   </Box>
// );

// function CertificateBody({ cert }: { cert: CertificateData }) {
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: CERT_WIDTH,
//         height: CERT_HEIGHT,
//         background: COLORS.background,
//         fontFamily: FONT_FAMILY,
//         color: COLORS.textPrimary,
//         boxSizing: "border-box",
//         overflow: "hidden",
//         "& .MuiTypography-root": {
//           fontFamily: FONT_FAMILY,
//         },
//       }}
//     >
//       <Box sx={{ position: "absolute", inset: "14px 10px 46px 10px", border: `4px solid ${COLORS.accentRed}`, pointerEvents: "none" }} />
//       <Box sx={{ position: "absolute", left: 0, top: 0, width: 76, height: 76, bgcolor: COLORS.darkNavy, clipPath: "polygon(0 0, 72% 0, 0 72%)" }} />
//       <Box sx={{ position: "absolute", right: 0, bottom: 0, width: 98, height: 98, bgcolor: COLORS.accentRed, clipPath: "polygon(100% 0, 100% 100%, 18% 100%)" }} />
//       <Box sx={{ position: "absolute", right: 0, bottom: 0, width: 72, height: 72, bgcolor: COLORS.darkNavy, clipPath: "polygon(100% 0, 100% 100%, 20% 100%)" }} />

//       <Box sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", px: "42px", pt: "28px", pb: "48px" }}>
//         <CertificateHeader />

//         <Card sx={{ p: 0, mb: "10px" }}>
//           <PillSectionHeader title="Student Information" icon={<PersonOutlineIcon sx={{ fontSize: 20, color: "#fff" }} />} />
//           <Grid container sx={{ px: "16px", py: "8px" }}>
//             <Grid item xs={6} sx={{ borderRight: `1px solid ${COLORS.border}`, pr: "18px" }}>
//               <InfoRow label="Student Name" value={cert.studentName} />
//               <InfoRow label="Internship Track" value={cert.internshipTrack} />
//               <InfoRow label="College / University" value={cert.college} />
//               <InfoRow label="Duration" value={cert.duration} />
//             </Grid>
//             <Grid item xs={6} sx={{ pl: "28px" }}>
//               <InfoRow label="Enrollment ID" value={cert.enrollmentId} />
//               <InfoRow label="Evaluation Date" value={cert.evaluationDate} />
//               <InfoRow label="Mentor Name" value={cert.mentorName} />
//               <InfoRow label="Batch" value={cert.batch} />
//             </Grid>
//           </Grid>
//         </Card>

//         <Card sx={{ mb: "10px", px: "16px", py: "10px" }}>
//           <InlineSectionHeader title="Program Summary" icon={<AssignmentIcon sx={{ fontSize: 19, color: COLORS.textPrimary }} />} />
//           <Typography sx={{ fontSize: "0.76rem", color: COLORS.textPrimary, lineHeight: 1.5, fontWeight: 500 }}>
//             This report certifies that the above-mentioned student successfully participated in the Inacademic Internship Program
//             and completed the assigned learning modules, assessments, and practical tasks through the Tiiron LMS platform.
//             The evaluation has been conducted based on the student's performance, participation, consistency,
//             technical understanding, and completion of assigned work throughout the program.
//           </Typography>
//         </Card>

//         <Grid container spacing={2} sx={{ mb: "10px" }}>
//           <Grid item xs={7}>
//             <Box sx={{ border: `1px solid ${COLORS.border}`, borderRadius: "9px", overflow: "hidden" }}>
//               <PillSectionHeader title="Performance Evaluation" icon={<BarChartIcon sx={{ fontSize: 18, color: "#fff" }} />} />
//               <Box sx={{ display: "grid", gridTemplateColumns: "54px 1fr 154px", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
//                 <Box />
//                 <Typography sx={{ py: "8px", fontSize: "0.72rem", fontWeight: 900, color: COLORS.textPrimary }}>EVALUATION CRITERIA</Typography>
//                 <Typography sx={{ py: "8px", fontSize: "0.72rem", fontWeight: 900, color: COLORS.textPrimary, textAlign: "center", borderLeft: `1px solid ${COLORS.border}` }}>
//                   SCORE (OUT OF 10)
//                 </Typography>
//               </Box>
//               {cert.scores.map((row) => (
//                 <Box key={row.label} sx={{ display: "grid", gridTemplateColumns: "54px 1fr 154px", minHeight: 34, borderBottom: `1px solid ${COLORS.border}` }}>
//                   <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${COLORS.border}` }}>{row.icon}</Box>
//                   <Typography sx={{ display: "flex", alignItems: "center", px: "12px", fontSize: "0.74rem", fontWeight: 600, color: COLORS.textPrimary }}>{row.label}</Typography>
//                   <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${COLORS.border}`, fontSize: "0.78rem", fontWeight: 800, color: COLORS.textPrimary }}>
//                     {row.score}
//                   </Typography>
//                 </Box>
//               ))}
//               <Box sx={{ display: "grid", gridTemplateColumns: "1fr 154px", bgcolor: COLORS.darkNavy, alignItems: "center" }}>
//                 <Typography sx={{ py: "9px", pl: "54px", fontSize: "0.82rem", fontWeight: 900, color: "#fff !important " }}>OVERALL PERFORMANCE</Typography>
//                 <Typography sx={{ py: "8px", textAlign: "center", fontSize: "1.22rem", fontWeight: 950, color:`${COLORS.accentRed} !important`, borderLeft: `1px solid ${COLORS.border}` }}>{cert.overall}</Typography>
//               </Box>
//             </Box>
//           </Grid>

//           <Grid item xs={5}>
//             <Card sx={{ p: 0, mb: "4px", overflow: "hidden" }}>
//               <PillSectionHeader title="Skills Demonstrated" icon={<MilitaryTechIcon sx={{ fontSize: 18, color: "#fff" }} />} />
//               <Box sx={{ px: "18px", py: "8px" }}>
//                 {cert.skills.map((skill) => (
//                   <Box key={skill} sx={{ display: "flex", alignItems: "center", py: "4px" }}>
//                     <CheckCircleIcon sx={{ fontSize: 14, color: COLORS.textPrimary, mr: "9px" }} />
//                     <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: COLORS.textPrimary }}>{skill}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </Card>

//             <Card sx={{ textAlign: "center", py: "9px" }}>
//               <Typography sx={{ fontSize: "0.78rem", fontWeight: 900, color: COLORS.textPrimary, mb: "7px" }}>FINAL ASSESSMENT</Typography>
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", mb: "6px" }}>
//                 <Typography sx={{ color: COLORS.textPrimary, fontSize: "1.45rem", lineHeight: 1 }}>(</Typography>
//                 <Box sx={{ bgcolor: COLORS.accentRed, color: "#fff", px: "22px", py: "6px", borderRadius: "9px", fontWeight: 950, fontSize: "1.1rem", lineHeight: 1 }}>
//                   {cert.assessment}
//                 </Box>
//                 <Typography sx={{ color: COLORS.textPrimary, fontSize: "1.45rem", lineHeight: 1 }}>)</Typography>
//               </Box>
//               <Box sx={{ display: "flex", justifyContent: "center", color: "#1261C9", gap: "18px" }}>
//                 <StarIcon sx={{ fontSize: 14 }} />
//                 <StarIcon sx={{ fontSize: 14 }} />
//                 <StarIcon sx={{ fontSize: 14 }} />
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>

//         <Card sx={{ mb: "9px", px: "16px", py: "9px" }}>
//           <InlineSectionHeader title="Mentor Remarks" icon={<ChatBubbleOutlineIcon sx={{ fontSize: 19, color: COLORS.textPrimary }} />} />
//           <Typography sx={{ fontSize: "0.72rem", color: COLORS.textPrimary, lineHeight: 1.35, fontStyle: "italic", fontWeight: 500 }}>
//             {cert.remarks}
//           </Typography>
//         </Card>

//         <Card sx={{ display: "grid", gridTemplateColumns: "1fr 238px", alignItems: "center", gap: "16px", px: "16px", py: "9px", mb: "8px" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <WorkspacePremiumIcon sx={{ fontSize: 48, color: COLORS.textPrimary, mr: "14px" }} />
//             <Typography sx={{ fontSize: "0.78rem", color: COLORS.textPrimary, lineHeight: 1.45, fontWeight: 500 }}>
//               This student has successfully completed the assigned tasks and internal evaluation requirements of the Internship
//               Program and is eligible for the Internship Completion Certificate.
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: "center", borderLeft: `1px solid ${COLORS.border}`, pl: "16px" }}>
//             <Typography sx={{ fontSize: "0.74rem", fontWeight: 900, color: COLORS.textPrimary, mb: "5px" }}>VERIFICATION ID</Typography>
//             <Box sx={{ bgcolor: COLORS.darkNavy, color: "#fff", px: "12px", py: "6px", borderRadius: "6px", fontWeight: 900, fontSize: "0.76rem", fontFamily: "monospace" }}>
//               {cert.verificationId}
//             </Box>
//             <Typography sx={{ fontSize: "0.64rem", color: COLORS.link, mt: "5px", fontWeight: 600, lineHeight: 1.2 }}>
//               You can verify this document at https://verify.tiirontechnologies.com/
//             </Typography>
//           </Box>
//         </Card>

//         <Box sx={{ mt: "auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "end", px: "70px", pb: "4px", minHeight: 90 }}>
//           <Box sx={{ textAlign: "center" }}>
//             <Box sx={{ borderTop: `2px solid ${COLORS.textPrimary}`, pt: "5px" }}>
//               <Typography sx={{ fontSize: "0.72rem", fontWeight: 800 }}>{cert.mentorName}</Typography>
//               <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>Mentor</Typography>
//             </Box>
//           </Box>
//           <Box sx={{ textAlign: "center" }}>
//             <Box component="img" src={Mohar} alt="Official Stamp" loading="eager" decoding="sync" sx={{ width: 62, height: 62, objectFit: "contain", display: "block", mx: "auto", mb: "2px" }} />
//             <Typography sx={{ fontSize: "0.62rem", color: COLORS.textPrimary, fontWeight: 500, lineHeight: 1.2 }}>
//               This is a system generated report and does not require a signature.
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: "center" }}>
//             <Box sx={{ borderTop: `2px solid ${COLORS.textPrimary}`, pt: "5px" }}>
//               <Typography sx={{ fontSize: "0.72rem", fontWeight: 800 }}>Program Coordinator</Typography>
//               <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>Inacademic</Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", alignItems: "center", bgcolor: COLORS.darkNavy, color: "#fff", fontSize: "0.74rem", py: "9px", px: "100px 70px", gap: "18px" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}><LanguageIcon sx={{ fontSize: 16 }} />www.inacademic.com</Box>
//         <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}><EmailIcon sx={{ fontSize: 16 }} />contact@inacademic.com</Box>
//         <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}><LocationOnIcon sx={{ fontSize: 17 }} />Lucknow, Uttar Pradesh, India</Box>
//       </Box>
//     </Box>
//   );
// }

// const DownloadButton = ({ onClick, isGenerating, variant = "solid" }: { onClick: () => void; isGenerating: boolean; variant?: "solid" | "compact" }) => {
//   const compact = variant === "compact";
//   return (
//     <Button
//       startIcon={<DownloadIcon />}
//       onClick={onClick}
//       disabled={isGenerating}
//       sx={{
//         background: COLORS.primaryBlue,
//         color: "#fff",
//         textTransform: "none",
//         borderRadius: "8px",
//         fontWeight: 800,
//         fontSize: compact ? "0.85rem" : "0.95rem",
//         px: compact ? 2.5 : undefined,
//         py: compact ? 1 : 1.5,
//         width: compact ? "auto" : "100%",
//         whiteSpace: "nowrap",
//         boxShadow: "0 2px 8px rgba(8, 31, 92, 0.2)",
//         "&:hover": { background: COLORS.darkNavy },
//         "&.Mui-disabled": { opacity: 0.7, color: "#fff" },
//       }}
//     >
//       {isGenerating ? "Generating..." : compact ? "Download PDF" : "Download Report (PDF)"}
//     </Button>
//   );
// };

// const SkeletonBar = ({ width = "100%", height = 14 }: { width?: string | number; height?: number }) => (
//   <Box
//     sx={{
//       width,
//       height,
//       borderRadius: "6px",
//       background: "linear-gradient(90deg, #EEF2F6 25%, #E4E9F1 37%, #EEF2F6 63%)",
//       backgroundSize: "400% 100%",
//       animation: "shimmer 1.6s ease-in-out infinite",
//       "@keyframes shimmer": {
//         "0%": { backgroundPosition: "100% 50%" },
//         "100%": { backgroundPosition: "0 50%" },
//       },
//     }}
//   />
// );

// const CertificatePreviewCard = ({ onView }: { onView: () => void }) => (
//   <Paper
//     elevation={0}
//     onClick={onView}
//     sx={{
//       cursor: "pointer",
//       border: `1px solid ${COLORS.border}`,
//       borderRadius: "10px",
//       p: "28px",
//       bgcolor: COLORS.background,
//       boxShadow: "0 1px 3px rgba(8,31,92,0.04)",
//       "&:hover": { boxShadow: "0 4px 16px rgba(8,31,92,0.1)" },
//     }}
//   >
//     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
//       <Box component="img" src="/Inacademic_Logo.png" alt="Inacademic Logo" crossOrigin="anonymous" sx={{ height: 54, width: "auto", objectFit: "contain" }} />
//       <Box sx={{ textAlign: "center" }}>
//         <SchoolIcon sx={{ color: COLORS.primaryBlue, fontSize: 20 }} />
//         <Typography sx={{ fontWeight: 950, fontSize: "1.7rem", fontFamily: FONT_FAMILY }}>
//           <Box component="span" sx={{ color: COLORS.accentRed }}>IN</Box>
//           <Box component="span" sx={{ color: COLORS.darkNavy }}>ACADEMIC</Box>
//         </Typography>
//         <Typography sx={{ fontSize: "0.65rem", letterSpacing: "1.8px", color: COLORS.textPrimary, fontWeight: 800 }}>
//           INTERNAL EVALUATION REPORT
//         </Typography>
//       </Box>
//       <Box component="img" src="/Tiiron_Technologies_Logo.png" alt="Tiiron Technologies Logo" crossOrigin="anonymous" sx={{ height: 54, width: "auto", objectFit: "contain" }} />
//     </Box>
//     <Box sx={{ height: 1, background: COLORS.border, mb: "22px" }} />
//     <SkeletonBar height={60} />
//     <Box sx={{ height: 14 }} />
//     <SkeletonBar height={70} />
//     <Box sx={{ height: 14 }} />
//     <Grid container spacing={2}>
//       <Grid item xs={7}><SkeletonBar height={200} /></Grid>
//       <Grid item xs={5}><SkeletonBar height={200} /></Grid>
//     </Grid>
//     <Box sx={{ height: 14 }} />
//     <SkeletonBar height={60} />
//     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "22px", color: COLORS.textMuted }}>
//       <VisibilityIcon sx={{ fontSize: 16, mr: "8px" }} />
//       <Typography sx={{ fontSize: "0.78rem", fontWeight: 700 }}>Click to view full report</Typography>
//     </Box>
//   </Paper>
// );

// export default function CourseCertificate({ courseId, courseName }: CourseCertificateProps) {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
//   const [downloadAfterPreviewOpen, setDownloadAfterPreviewOpen] = useState(false);
//   const visiblePdfSourceRef = useRef<HTMLDivElement>(null);

//   const { data: userResponse, isLoading: isUserLoading, isError: isUserError } = useGetLoggedInUserQuery(undefined);
//   const userData = userResponse?.data;
//   const isAuthenticated = !isUserError && !!userData?.id;

//   const cert = useMemo(() => {
//     if (!isAuthenticated || !userData?.id) return null;
//     const studentName = `${userData.firstName ?? ""} ${userData.lastName ?? ""}`.trim() || "Student";
//     return buildCertificateData(Number(userData.id), studentName, String(courseId), courseName);
//   }, [courseId, courseName, isAuthenticated, userData?.firstName, userData?.id, userData?.lastName]);

//   const redirectToLogin = () => {
//     window.location.href = "/login";
//   };

//   const handleViewFull = () => {
//     if (!isAuthenticated) {
//       redirectToLogin();
//       return;
//     }
//     setFullPreviewOpen(true);
//   };

//   const downloadVisibleCertificate = useCallback(async () => {
//     if (!visiblePdfSourceRef.current || !cert) return;
//     await generatePDFFromNode(visiblePdfSourceRef.current, cert);
//   }, [cert]);

//   const handleDownload = async () => {
//     if (!isAuthenticated) {
//       redirectToLogin();
//       return;
//     }
//     if (!cert) return;
//     if (!fullPreviewOpen) {
//       setIsGenerating(true);
//       setDownloadAfterPreviewOpen(true);
//       setFullPreviewOpen(true);
//       return;
//     }
//     setIsGenerating(true);
//     try {
//       await downloadVisibleCertificate();
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   useEffect(() => {
//     if (!downloadAfterPreviewOpen || !fullPreviewOpen || !cert) return;
//     let cancelled = false;
//     const timer = window.setTimeout(async () => {
//       try {
//         if (!cancelled) {
//           await downloadVisibleCertificate();
//         }
//       } finally {
//         if (!cancelled) {
//           setIsGenerating(false);
//           setDownloadAfterPreviewOpen(false);
//         }
//       }
//     }, 250);

//     return () => {
//       cancelled = true;
//       window.clearTimeout(timer);
//     };
//   }, [downloadAfterPreviewOpen, fullPreviewOpen, cert, downloadVisibleCertificate]);

//   if (isUserLoading) {
//     return (
//       <Box sx={{ py: 4, px: { xs: 1.5, sm: 3 }, background: "#F1F5F9" }}>
//         <Grid container spacing={3} justifyContent="center">
//           <Grid item xs={12} lg={8}>
//             <Paper elevation={0} sx={{ p: "28px", borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
//               <SkeletonBar height={60} />
//               <Box sx={{ height: 14 }} />
//               <SkeletonBar height={120} />
//             </Paper>
//           </Grid>
//           <Grid item xs={12} lg={4}>
//             <Paper elevation={0} sx={{ p: 3, borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
//               <SkeletonBar height={100} />
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     );
//   }

//   if (fullPreviewOpen && cert) {
//     return (
//       <Box sx={{ minHeight: "100vh", background: "#EEF2F6" }}>
//         <Box sx={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", px: 4, py: 2, background: COLORS.darkNavy }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton onClick={() => setFullPreviewOpen(false)} sx={{ color: "#fff", mr: "8px", "&:hover": { background: "rgba(255,255,255,0.08)" } }}>
//               <ArrowBackIcon />
//             </IconButton>
//             <Typography sx={{ fontWeight: 800, color: "#fff !important" }}>Internal Evaluation Report - Full Screen</Typography>
//           </Box>
//           <DownloadButton onClick={handleDownload} isGenerating={isGenerating} variant="compact" />
//         </Box>

//         <Box sx={{ py: 5, px: 2, display: "flex", justifyContent: "center", overflowX: "auto" }}>
//           <Paper elevation={0} sx={{ width: CERT_WIDTH, borderRadius: "10px", overflow: "hidden", boxShadow: "0px 10px 30px rgba(8,31,92,0.12)", flexShrink: 0 }}>
//             <Box ref={visiblePdfSourceRef}>
//               <CertificateBody cert={cert} />
//             </Box>
//           </Paper>
//         </Box>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ py: 4, px: { xs: 1.5, sm: 3 }, background: "#F1F5F9" }}>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid item xs={12} lg={8}>
//           <CertificatePreviewCard onView={handleViewFull} />
//         </Grid>
//         <Grid item xs={12} lg={4}>
//           <Paper elevation={0} sx={{ p: 3, borderRadius: "10px", background: "#fff", border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 2 }}>
//             <Typography variant="subtitle2" sx={{ color: COLORS.textMuted, fontWeight: 800, textTransform: "uppercase" }}>
//               Quick Summary
//             </Typography>
//             {cert ? (
//               <>
//                 <InfoRow label="Student" value={cert.studentName} />
//                 <InfoRow label="Overall Score" value={cert.overall} />
//               </>
//             ) : (
//               <>
//                 <SkeletonBar height={14} />
//                 <SkeletonBar height={14} />
//               </>
//             )}
//             <Button variant="outlined" fullWidth startIcon={<VisibilityIcon />} onClick={handleViewFull} sx={{ mt: 2, borderColor: COLORS.primaryBlue, color: COLORS.primaryBlue, fontWeight: 800 }}>
//               View Full Certificate
//             </Button>
//             <DownloadButton onClick={handleDownload} isGenerating={isGenerating} variant="solid" />
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Box, Button, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MemoryIcon from "@mui/icons-material/Memory";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SchoolIcon from "@mui/icons-material/School";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { getEvaluationDataForUser, COURSE_CONFIG, COURSE_SKILLS } from "./data";
import Mohar from "../../../assets/Mohar.png";
import { useGetLoggedInUserQuery } from "../api/courseApi";
import { toPng } from "html-to-image";

const COLORS = {
  primaryBlue: "#081F5C",
  darkNavy: "#001529",
  accentRed: "#E4262F",
  border: "#C9D7EA",
  background: "#FFFFFF",
  textPrimary: "#06164A",
  textSecondary: "#14235A",
  textMuted: "#596780",
  link: "#0757D9",
};

const FONT_FAMILY = "Arial, Helvetica, sans-serif";
const CERT_WIDTH = 840;
const CERT_HEIGHT = 1188;

interface CourseCertificateProps {
  courseId: string;
  courseName: string;
}

interface CertificateData {
  studentName: string;
  enrollmentId: string;
  internshipTrack: string;
  college: string;
  duration: string;
  evaluationDate: string;
  mentorName: string;
  batch: string;
  scores: { label: string; score: string; icon: ReactNode }[];
  overall: string;
  assessment: string;
  verificationId: string;
  skills: string[];
  remarks: string;
}

function formatOrdinalDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const suffix = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${day}${suffix(day)} ${month} ${year}`;
}

function buildCertificateData(userId: number, studentName: string, courseId: string, courseName: string): CertificateData {
  const evalData = getEvaluationDataForUser(userId, studentName);
  const courseConfig = COURSE_CONFIG[courseId] ?? { mentorName: "Priya Mehrotra", batch: "FSWD-MAR25-B1", courseCode: "FSWD" };
  const skills = COURSE_SKILLS[courseId] ?? COURSE_SKILLS["1"];
  const iconStyle = { fontSize: 18, color: COLORS.textSecondary };
  const icons = [
    <EventNoteIcon sx={iconStyle} />,
    <AssignmentTurnedInIcon sx={iconStyle} />,
    <MemoryIcon sx={iconStyle} />,
    <LightbulbIcon sx={iconStyle} />,
    <CodeIcon sx={iconStyle} />,
    <ForumIcon sx={iconStyle} />,
    <AssignmentIcon sx={iconStyle} />,
  ];

  return {
    studentName,
    enrollmentId: `INA-${courseConfig.courseCode}-${String(userId).padStart(4, "0")}`,
    internshipTrack: courseName,
    college: "Tiiron Technologies",
    duration: "3rd March 2025 - 3rd June 2025",
    evaluationDate: formatOrdinalDate(new Date(2025, 5, 4)),
    mentorName: courseConfig.mentorName,
    batch: courseConfig.batch,
    scores: evalData.scores.map((score, index) => ({
      label: score.label,
      score: `${score.score.toFixed(1)} / 10`,
      icon: icons[index] ?? <AssignmentIcon sx={iconStyle} />,
    })),
    overall: `${evalData.overall.toFixed(1)} / 10`,
    assessment: evalData.assessment.toUpperCase(),
    verificationId: evalData.verificationId,
    skills,
    remarks: evalData.remarks,
  };
}

function waitForImages(node: HTMLElement): Promise<void> {
  const imgs = Array.from(node.querySelectorAll("img"));
  return Promise.all(
    imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
        setTimeout(resolve, 4000);
      });
    })
  ).then(() => undefined);
}

async function preloadImage(src: string) {
  const image = new Image();
  image.src = src;
  await image.decode().catch(() => undefined);
}

async function generatePDFFromNode(node: HTMLElement, cert: CertificateData) {
  await document.fonts.ready;
  await preloadImage(Mohar);
  await waitForImages(node);
  await new Promise((resolve) => requestAnimationFrame(resolve));

  const dataUrl = await toPng(node, {
    quality: 1,
    pixelRatio: 2,
    width: CERT_WIDTH,
    height: CERT_HEIGHT,
    backgroundColor: "#ffffff",
    cacheBust: true,
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: false,
  });

  pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297);
  pdf.save(
    `Evaluation_${cert.studentName.replace(/\s+/g, "_") || "Student"}.pdf`,
  );
}

const PillSectionHeader = ({ title, icon }: { title: string; icon?: ReactNode }) => (
  <Box
    sx={{
      background: COLORS.darkNavy,
      color: "#fff",
      px: "15px",
      py: "7px",
      borderRadius: "8px 8px 8px 0",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      minWidth: "214px",
      boxShadow: "0 2px 7px rgba(0, 21, 41, 0.18)",
      fontFamily: FONT_FAMILY,
      fontWeight: 800,
      fontSize: "0.78rem",
      lineHeight: 1,
      textTransform: "uppercase",
    }}
  >
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", color: "#fff", "& svg": { color: "#fff", fill: "#fff" } }}>
      {icon}
    </Box>
    <Box
      component="span"
      sx={{
        display: "inline-block",
        color: "#fff",
        fontFamily: FONT_FAMILY,
        fontWeight: 800,
        fontSize: "0.78rem",
        lineHeight: 1,
        textTransform: "uppercase",
        WebkitTextFillColor: "#fff",
      }}
    >
      {title}
    </Box>
  </Box>
);

const InlineSectionHeader = ({ title, icon }: { title: string; icon?: ReactNode }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "9px", mb: "7px" }}>
    {icon}
    <Typography sx={{ fontWeight: 900, fontSize: "0.86rem", color: COLORS.textPrimary, textTransform: "uppercase" }}>
      {title}
    </Typography>
  </Box>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "140px 14px 1fr", alignItems: "start", py: "3.5px" }}>
    <Typography sx={{ fontWeight: 800, color: COLORS.textPrimary, fontSize: "0.76rem" }}>{label}</Typography>
    <Typography sx={{ fontWeight: 800, color: COLORS.textPrimary, fontSize: "0.76rem" }}>:</Typography>
    <Typography sx={{ fontWeight: 600, color: COLORS.textSecondary, fontSize: "0.76rem", lineHeight: 1.25 }}>{value}</Typography>
  </Box>
);

const Card = ({ children, sx = {} }: { children: ReactNode; sx?: object }) => (
  <Box
    sx={{
      border: `1px solid ${COLORS.border}`,
      borderRadius: "9px",
      p: "14px",
      bgcolor: COLORS.background,
      boxShadow: "0 2px 8px rgba(8,31,92,0.035)",
      ...sx,
    }}
  >
    {children}
  </Box>
);

const CertificateHeader = () => (
  <Box sx={{ mb: "8px" }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box component="img" src="/inac_nobg.png" alt="Inacademic Logo" crossOrigin="anonymous" sx={{ height: 98, width: 170, objectFit: "contain", objectPosition: "left center" }} />
      <Box sx={{ textAlign: "center", flex: 1 }}>
        <SchoolIcon sx={{ color: COLORS.primaryBlue, fontSize: 22, mb: "-3px" }} />
        <Typography sx={{ fontWeight: 950, fontSize: "2.05rem", letterSpacing: "0.5px", lineHeight: 0.95 }}>
          <Box component="span" sx={{ color: COLORS.accentRed }}>IN</Box>
          <Box component="span" sx={{ color: COLORS.darkNavy }}>ACADEMIC</Box>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", mt: "5px" }}>
          <Box sx={{ height: 1, width: 34, bgcolor: COLORS.darkNavy }} />
          <Typography sx={{ fontSize: "0.72rem", letterSpacing: "2px", color: COLORS.textPrimary, fontWeight: 700 }}>
            INTERNAL EVALUATION REPORT
          </Typography>
          <Box sx={{ height: 1, width: 34, bgcolor: COLORS.darkNavy }} />
        </Box>
      </Box>
      <Box component="img" src="/Tiiron_Technologies_Logo.png" alt="Tiiron Technologies Logo" crossOrigin="anonymous" sx={{ height: 108, width: 170, objectFit: "contain", objectPosition: "right center" }} />
    </Box>
  </Box>
);

function CertificateBody({ cert }: { cert: CertificateData }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: CERT_WIDTH,
        height: CERT_HEIGHT,
        background: COLORS.background,
        fontFamily: FONT_FAMILY,
        color: COLORS.textPrimary,
        boxSizing: "border-box",
        overflow: "hidden",
        "& .MuiTypography-root": {
          fontFamily: FONT_FAMILY,
        },
      }}
    >
      <Box sx={{ position: "absolute", inset: "14px 10px 46px 10px", border: `4px solid ${COLORS.accentRed}`, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", left: 0, top: 0, width: 76, height: 76, bgcolor: COLORS.darkNavy, clipPath: "polygon(0 0, 72% 0, 0 72%)" }} />
      <Box sx={{ position: "absolute", right: 0, bottom: 0, width: 98, height: 98, bgcolor: COLORS.accentRed, clipPath: "polygon(100% 0, 100% 100%, 18% 100%)" }} />
      <Box sx={{ position: "absolute", right: 0, bottom: 0, width: 72, height: 72, bgcolor: COLORS.darkNavy, clipPath: "polygon(100% 0, 100% 100%, 20% 100%)" }} />

      <Box sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", px: "42px", pt: "28px", pb: "48px" }}>
        <CertificateHeader />

        <Card sx={{ p: 0, mb: "10px" }}>
          <PillSectionHeader title="Student Information" icon={<PersonOutlineIcon sx={{ fontSize: 20, color: "#fff" }} />} />
          <Grid container sx={{ px: "16px", py: "8px" }}>
            <Grid item xs={6} sx={{ borderRight: `1px solid ${COLORS.border}`, pr: "18px" }}>
              <InfoRow label="Student Name" value={cert.studentName} />
              <InfoRow label="Internship Track" value={cert.internshipTrack} />
              <InfoRow label="College / University" value={cert.college} />
              <InfoRow label="Duration" value={cert.duration} />
            </Grid>
            <Grid item xs={6} sx={{ pl: "28px" }}>
              <InfoRow label="Enrollment ID" value={cert.enrollmentId} />
              <InfoRow label="Evaluation Date" value={cert.evaluationDate} />
              <InfoRow label="Mentor Name" value={cert.mentorName} />
              <InfoRow label="Batch" value={cert.batch} />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ mb: "10px", px: "16px", py: "10px" }}>
          <InlineSectionHeader title="Program Summary" icon={<AssignmentIcon sx={{ fontSize: 19, color: COLORS.textPrimary }} />} />
          <Typography sx={{ fontSize: "0.76rem", color: COLORS.textPrimary, lineHeight: 1.5, fontWeight: 500 }}>
            This report certifies that the above-mentioned student successfully participated in the Inacademic Internship Program
            and completed the assigned learning modules, assessments, and practical tasks through the Tiiron LMS platform.
            The evaluation has been conducted based on the student's performance, participation, consistency,
            technical understanding, and completion of assigned work throughout the program.
          </Typography>
        </Card>

        <Grid container spacing={2} sx={{ mb: "10px" }}>
          <Grid item xs={7}>
            <Box sx={{ border: `1px solid ${COLORS.border}`, borderRadius: "9px", overflow: "hidden" }}>
              <PillSectionHeader title="Performance Evaluation" icon={<BarChartIcon sx={{ fontSize: 18, color: "#fff" }} />} />
              <Box sx={{ display: "grid", gridTemplateColumns: "54px 1fr 154px", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
                <Box />
                <Typography sx={{ py: "8px", fontSize: "0.72rem", fontWeight: 900, color: COLORS.textPrimary }}>EVALUATION CRITERIA</Typography>
                <Typography sx={{ py: "8px", fontSize: "0.72rem", fontWeight: 900, color: COLORS.textPrimary, textAlign: "center", borderLeft: `1px solid ${COLORS.border}` }}>
                  SCORE (OUT OF 10)
                </Typography>
              </Box>
              {cert.scores.map((row) => (
                <Box key={row.label} sx={{ display: "grid", gridTemplateColumns: "54px 1fr 154px", minHeight: 34, borderBottom: `1px solid ${COLORS.border}` }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${COLORS.border}` }}>{row.icon}</Box>
                  <Typography sx={{ display: "flex", alignItems: "center", px: "12px", fontSize: "0.74rem", fontWeight: 600, color: COLORS.textPrimary }}>{row.label}</Typography>
                  <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${COLORS.border}`, fontSize: "0.78rem", fontWeight: 800, color: COLORS.textPrimary }}>
                    {row.score}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 154px", bgcolor: COLORS.darkNavy, alignItems: "center" }}>
                <Typography sx={{ py: "9px", pl: "54px", fontSize: "0.82rem", fontWeight: 900, color: "#fff !important " }}>OVERALL PERFORMANCE</Typography>
                <Typography sx={{ py: "8px", textAlign: "center", fontSize: "1.22rem", fontWeight: 950, color:`${COLORS.accentRed} !important`, borderLeft: `1px solid ${COLORS.border}` }}>{cert.overall}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Card sx={{ p: 0, mb: "4px", overflow: "hidden" }}>
              <PillSectionHeader title="Skills Demonstrated" icon={<MilitaryTechIcon sx={{ fontSize: 18, color: "#fff" }} />} />
              <Box sx={{ px: "18px", py: "8px" }}>
                {cert.skills.map((skill) => (
                  <Box key={skill} sx={{ display: "flex", alignItems: "center", py: "4px" }}>
                    <CheckCircleIcon sx={{ fontSize: 14, color: COLORS.textPrimary, mr: "9px" }} />
                    <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: COLORS.textPrimary }}>{skill}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>

            <Card sx={{ textAlign: "center", py: "9px" }}>
              <Typography sx={{ fontSize: "0.78rem", fontWeight: 900, color: COLORS.textPrimary, mb: "7px" }}>FINAL ASSESSMENT</Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", mb: "6px" }}>
                <Typography sx={{ color: COLORS.textPrimary, fontSize: "1.45rem", lineHeight: 1 }}>(</Typography>
                <Box sx={{ bgcolor: COLORS.accentRed, color: "#fff", px: "22px", py: "6px", borderRadius: "9px", fontWeight: 950, fontSize: "1.1rem", lineHeight: 1 }}>
                  {cert.assessment}
                </Box>
                <Typography sx={{ color: COLORS.textPrimary, fontSize: "1.45rem", lineHeight: 1 }}>)</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", color: "#1261C9", gap: "18px" }}>
                <StarIcon sx={{ fontSize: 14 }} />
                <StarIcon sx={{ fontSize: 14 }} />
                <StarIcon sx={{ fontSize: 14 }} />
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mb: "9px", px: "16px", py: "9px" }}>
          <InlineSectionHeader title="Mentor Remarks" icon={<ChatBubbleOutlineIcon sx={{ fontSize: 19, color: COLORS.textPrimary }} />} />
          <Typography sx={{ fontSize: "0.72rem", color: COLORS.textPrimary, lineHeight: 1.35, fontStyle: "italic", fontWeight: 500 }}>
            {cert.remarks}
          </Typography>
        </Card>

        <Card sx={{ display: "grid", gridTemplateColumns: "1fr 238px", alignItems: "center", gap: "16px", px: "16px", py: "9px", mb: "8px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WorkspacePremiumIcon sx={{ fontSize: 48, color: COLORS.textPrimary, mr: "14px" }} />
            <Typography sx={{ fontSize: "0.78rem", color: COLORS.textPrimary, lineHeight: 1.45, fontWeight: 500 }}>
              This student has successfully completed the assigned tasks and internal evaluation requirements of the Internship
              Program and is eligible for the Internship Completion Certificate.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", borderLeft: `1px solid ${COLORS.border}`, pl: "16px" }}>
            <Typography sx={{ fontSize: "0.74rem", fontWeight: 900, color: COLORS.textPrimary, mb: "5px" }}>VERIFICATION ID</Typography>
            <Box sx={{ bgcolor: COLORS.darkNavy, color: "#fff", px: "12px", py: "6px", borderRadius: "6px", fontWeight: 900, fontSize: "0.76rem", fontFamily: "monospace" }}>
              {cert.verificationId}
            </Box>
            <Typography sx={{ fontSize: "0.64rem", color: COLORS.link, mt: "5px", fontWeight: 600, lineHeight: 1.2 }}>
              You can verify this document at https://verify.tiirontechnologies.com/
            </Typography>
          </Box>
        </Card>

        <Box sx={{ mt: "auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "end", px: "70px", pb: "4px", minHeight: 90 }}>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ borderTop: `2px solid ${COLORS.textPrimary}`, pt: "5px" }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800 }}>{cert.mentorName}</Typography>
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>Mentor</Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Box component="img" src={Mohar} alt="Official Stamp" loading="eager" decoding="sync" sx={{ width: 62, height: 62, objectFit: "contain", display: "block", mx: "auto", mb: "2px" }} />
            <Typography sx={{ fontSize: "0.62rem", color: COLORS.textPrimary, fontWeight: 500, lineHeight: 1.2 }}>
              This is a system generated report and does not require a signature.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ borderTop: `2px solid ${COLORS.textPrimary}`, pt: "5px" }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800 }}>Program Coordinator</Typography>
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>Inacademic</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", alignItems: "center", bgcolor: COLORS.darkNavy, color: "#fff", fontSize: "0.74rem", py: "9px", px: "100px 70px", gap: "18px" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><LanguageIcon sx={{ fontSize: 16 }} />www.inacademic.com</Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><EmailIcon sx={{ fontSize: 16 }} />contact@inacademic.com</Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><LocationOnIcon sx={{ fontSize: 17 }} />Lucknow, Uttar Pradesh, India</Box>
      </Box>
    </Box>
  );
}

const DownloadButton = ({ onClick, isGenerating, variant = "solid" }: { onClick: () => void; isGenerating: boolean; variant?: "solid" | "compact" }) => {
  const compact = variant === "compact";
  return (
    <Button
      startIcon={<DownloadIcon />}
      onClick={onClick}
      disabled={isGenerating}
      sx={{
        background: COLORS.primaryBlue,
        color: "#fff",
        textTransform: "none",
        borderRadius: "8px",
        fontWeight: 800,
        fontSize: compact ? "0.85rem" : "0.95rem",
        px: compact ? 2.5 : undefined,
        py: compact ? 1 : 1.5,
        width: compact ? "auto" : "100%",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(8, 31, 92, 0.2)",
        "&:hover": { background: COLORS.darkNavy },
        "&.Mui-disabled": { opacity: 0.7, color: "#fff" },
      }}
    >
      {isGenerating ? "Generating..." : compact ? "Download PDF" : "Download Report (PDF)"}
    </Button>
  );
};

const SkeletonBar = ({ width = "100%", height = 14 }: { width?: string | number; height?: number }) => (
  <Box
    sx={{
      width,
      height,
      borderRadius: "6px",
      background: "linear-gradient(90deg, #EEF2F6 25%, #E4E9F1 37%, #EEF2F6 63%)",
      backgroundSize: "400% 100%",
      animation: "shimmer 1.6s ease-in-out infinite",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0 50%" },
      },
    }}
  />
);

const CertificatePreviewCard = ({ onView }: { onView: () => void }) => (
  <Paper
    elevation={0}
    onClick={onView}
    sx={{
      cursor: "pointer",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "10px",
      p: { xs: "16px", sm: "28px" },
      bgcolor: COLORS.background,
      boxShadow: "0 1px 3px rgba(8,31,92,0.04)",
      "&:hover": { boxShadow: "0 4px 16px rgba(8,31,92,0.1)" },
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px" }}>
      <Box component="img" src="/Inacademic_Logo.png" alt="Inacademic Logo" crossOrigin="anonymous" sx={{ height: { xs: 36, sm: 54 }, width: "auto", objectFit: "contain" }} />
      <Box sx={{ textAlign: "center" }}>
        <SchoolIcon sx={{ color: COLORS.primaryBlue, fontSize: 20 }} />
        <Typography sx={{ fontWeight: 950, fontSize: { xs: "1.1rem", sm: "1.7rem" }, fontFamily: FONT_FAMILY }}>
          <Box component="span" sx={{ color: COLORS.accentRed }}>IN</Box>
          <Box component="span" sx={{ color: COLORS.darkNavy }}>ACADEMIC</Box>
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.55rem", sm: "0.65rem" }, letterSpacing: "1.8px", color: COLORS.textPrimary, fontWeight: 800 }}>
          INTERNAL EVALUATION REPORT
        </Typography>
      </Box>
      <Box component="img" src="/Tiiron_Technologies_Logo.png" alt="Tiiron Technologies Logo" crossOrigin="anonymous" sx={{ height: { xs: 36, sm: 54 }, width: "auto", objectFit: "contain" }} />
    </Box>
    <Box sx={{ height: 1, background: COLORS.border, mb: "22px" }} />
    <SkeletonBar height={60} />
    <Box sx={{ height: 14 }} />
    <SkeletonBar height={70} />
    <Box sx={{ height: 14 }} />
    <Grid container spacing={2}>
      <Grid item xs={7}><SkeletonBar height={200} /></Grid>
      <Grid item xs={5}><SkeletonBar height={200} /></Grid>
    </Grid>
    <Box sx={{ height: 14 }} />
    <SkeletonBar height={60} />
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "22px", color: COLORS.textMuted }}>
      <VisibilityIcon sx={{ fontSize: 16, mr: "8px" }} />
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700 }}>Click to view full report</Typography>
    </Box>
  </Paper>
);

export default function CourseCertificate({ courseId, courseName }: CourseCertificateProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const [isGenerating, setIsGenerating] = useState(false);
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
  const [downloadAfterPreviewOpen, setDownloadAfterPreviewOpen] = useState(false);
  const [apiEnrollmentId, setApiEnrollmentId] = useState<string | null>(null);
  const visiblePdfSourceRef = useRef<HTMLDivElement>(null);

  const { data: userResponse, isLoading: isUserLoading, isError: isUserError } = useGetLoggedInUserQuery(undefined);
  const userData = userResponse?.data;
  const isAuthenticated = !isUserError && !!userData?.id;

//   useEffect(() => {
//     if (!isAuthenticated || !userData?.id) return;
//     let cancelled = false;

//     const fetchEnrollmentId = async () => {
//       try {
//         const res = await axios.get(`
// https://tiiron-verify.onrender.com/api/certificates/search/${userData?.id}`); // 👈 apna actual endpoint yaha daal do
//         if (!cancelled) {
//           setApiEnrollmentId(res.data?.enrollmentId ?? res.data?.data?.enrollmentId ?? null);
//         }
//       } catch (err) {
//         console.error("Failed to fetch enrollmentId:", err);
//       }
//     };

//     fetchEnrollmentId();
//     return () => {
//       cancelled = true;
//     };
//   }, [isAuthenticated, userData?.id]);


useEffect(() => {
  if (!isAuthenticated || !userData?.email) return;
  let cancelled = false;

  const fetchCertificateId = async () => {
    try {
      const res = await axios.get(
        // `http://localhost:5000/api/certificates/search/${encodeURIComponent(userData?.email)}`
        `https://tiiron-verify.onrender.com/api/certificates/search/${encodeURIComponent(userData?.email)}`
      );
      if (!cancelled) {
        setApiEnrollmentId(res.data?.data?.certificateId ?? null);
      }
    } catch (err) {
      console.error("Failed to fetch certificateId:", err);
      if (!cancelled) {
        setApiEnrollmentId(null);
      }
    }
  };

  fetchCertificateId();
  return () => {
    cancelled = true;
  };
}, [isAuthenticated, userData?.email]);


  // const cert = useMemo(() => {
  //   if (!isAuthenticated || !userData?.id) return null;
  //   const studentName = `${userData.firstName ?? ""} ${userData.lastName ?? ""}`.trim() || "Student";
  //   const data = buildCertificateData(Number(userData.id), studentName, String(courseId), courseName);
  //   return apiEnrollmentId ? { ...data, enrollmentId: apiEnrollmentId } : data;
  // }, [courseId, courseName, isAuthenticated, userData?.firstName, userData?.id, userData?.lastName, apiEnrollmentId]);


  const cert = useMemo(() => {
  if (!isAuthenticated || !userData?.id) return null;
  const studentName = `${userData.firstName ?? ""} ${userData.lastName ?? ""}`.trim() || "Student";
  const data = buildCertificateData(Number(userData.id), studentName, String(courseId), courseName);
  return apiEnrollmentId
    ? { ...data, enrollmentId: apiEnrollmentId, verificationId: apiEnrollmentId }
    : data;
}, [courseId, courseName, isAuthenticated, userData?.firstName, userData?.id, userData?.lastName, apiEnrollmentId]);

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const handleViewFull = () => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
    setFullPreviewOpen(true);
  };

  const downloadVisibleCertificate = useCallback(async () => {
    if (!visiblePdfSourceRef.current || !cert) return;
    await generatePDFFromNode(visiblePdfSourceRef.current, cert);
  }, [cert]);

  const handleDownload = async () => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
    if (!cert) return;
    if (!fullPreviewOpen) {
      setIsGenerating(true);
      setDownloadAfterPreviewOpen(true);
      setFullPreviewOpen(true);
      return;
    }
    setIsGenerating(true);
    try {
      await downloadVisibleCertificate();
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!downloadAfterPreviewOpen || !fullPreviewOpen || !cert) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        if (!cancelled) {
          await downloadVisibleCertificate();
        }
      } finally {
        if (!cancelled) {
          setIsGenerating(false);
          setDownloadAfterPreviewOpen(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [downloadAfterPreviewOpen, fullPreviewOpen, cert, downloadVisibleCertificate]);

  if (isUserLoading) {
    return (
      <Box sx={{ py: 4, px: { xs: 1.5, sm: 3 }, background: "#F1F5F9" }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={{ p: "28px", borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
              <SkeletonBar height={60} />
              <Box sx={{ height: 14 }} />
              <SkeletonBar height={120} />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
              <SkeletonBar height={100} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (fullPreviewOpen && cert) {
    const scale = isMobile ? 0.42 : isTablet ? 0.65 : isLaptop ? 0.85 : 1;
    return (
      <Box sx={{ minHeight: "100vh", background: "#EEF2F6" }}>
        <Box sx={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 2, sm: 4 }, py: 2, background: COLORS.darkNavy }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setFullPreviewOpen(false)} sx={{ color: "#fff", mr: "8px", "&:hover": { background: "rgba(255,255,255,0.08)" } }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 800, color: "#fff !important", fontSize: { xs: "0.85rem", sm: "1rem" } }}>
              Internal Evaluation Report{!isMobile && " - Full Screen"}
            </Typography>
          </Box>
          <DownloadButton onClick={handleDownload} isGenerating={isGenerating} variant="compact" />
        </Box>

        <Box sx={{ py: { xs: 2, sm: 5 }, px: { xs: 1, sm: 2 }, display: "flex", justifyContent: "center", overflowX: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              width: CERT_WIDTH,
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 10px 30px rgba(8,31,92,0.12)",
              flexShrink: 0,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              mb: scale < 1 ? `-${CERT_HEIGHT * (1 - scale)}px` : 0,
            }}
          >
            <Box ref={visiblePdfSourceRef}>
              <CertificateBody cert={cert} />
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 1.5, sm: 3 }, background: "#F1F5F9" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <CertificatePreviewCard onView={handleViewFull} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: "10px", background: "#fff", border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle2" sx={{ color: COLORS.textMuted, fontWeight: 800, textTransform: "uppercase" }}>
              Quick Summary
            </Typography>
            {cert ? (
              <>
                <InfoRow label="Student" value={cert.studentName} />
                <InfoRow label="Overall Score" value={cert.overall} />
              </>
            ) : (
              <>
                <SkeletonBar height={14} />
                <SkeletonBar height={14} />
              </>
            )}
            <Button variant="outlined" fullWidth startIcon={<VisibilityIcon />} onClick={handleViewFull} sx={{ mt: 2, borderColor: COLORS.primaryBlue, color: COLORS.primaryBlue, fontWeight: 800 }}>
              View Full Certificate
            </Button>
            <DownloadButton onClick={handleDownload} isGenerating={isGenerating} variant="solid" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}