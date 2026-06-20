
// import { useState, useEffect } from "react";
// import { Box, Typography, Button, Skeleton, Chip, Grid, Paper, Divider } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import SchoolIcon from "@mui/icons-material/School";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import StarIcon from "@mui/icons-material/Star";
// import EmailIcon from "@mui/icons-material/Email";
// import LanguageIcon from "@mui/icons-material/Language";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"; 
// import jsPDF from "jspdf";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface CertificateData {
//   studentName: string;
//   enrollmentId: string;
//   internshipTrack: string;
//   college: string;
//   duration: string;
//   evaluationDate: string;
//   mentorName: string;
//   batch: string;
//   scores: { label: string; score: string }[];
//   overall: string;
//   assessment: string;
//   verificationId: string;
//   skills: string[];
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const MOCK_CERT: CertificateData = {
//   studentName: "Rahul Sharma",
//   enrollmentId: "INA-FSWD-250318",
//   internshipTrack: "Full Stack Web Development",
//   college: "ABC Institute of Technology",
//   duration: "3rd March 2025 – 3rd June 2025",
//   evaluationDate: "4th June 2025",
//   mentorName: "Priya Mehrotra",
//   batch: "FSWD-MAR25-B1",
//   scores: [
//     { label: "Attendance & Consistency", score: "9.0 / 10" },
//     { label: "Task Completion", score: "9.5 / 10" },
//     { label: "Technical Knowledge", score: "8.5 / 10" },
//     { label: "Problem Solving Ability", score: "8.5 / 10" },
//     { label: "Code Quality / Deliverables", score: "9.0 / 10" },
//     { label: "Communication & Collaboration", score: "8.5 / 10" },
//     { label: "Learning Attitude", score: "9.0 / 10" },
//   ],
//   overall: "8.9 / 10",
//   assessment: "EXCELLENT",
//   verificationId: "INA-EVAL-2025-00125",
//   skills: [
//     "Technical Skills",
//     "Problem Solving",
//     "Team Collaboration",
//     "Communication",
//     "Time Management",
//     "Professional Conduct",
//     "Product Development Understanding",
//   ],
// };

// // 2. generateEvaluationPDF function add kar component se bahar
// function generateEvaluationPDF(cert: CertificateData) {
//   const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//   const W = 210;
//   const H = 297;
//   const pad = 16;
//   let y = 0;

//   doc.setFillColor(26, 43, 74);
//   doc.rect(0, 0, W, 28, "F");
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bold");
//   doc.text("INACADEMIC", W / 2, 11, { align: "center" });
//   doc.setFontSize(8);
//   doc.setFont("helvetica", "normal");
//   doc.text("INTERNSHIP PROGRAM", W / 2, 17, { align: "center" });
//   doc.setFontSize(7);
//   doc.text("Tiiron Technologies Pvt. Ltd.", W - pad, 11, { align: "right" });
//   doc.text("www.inacademic.in", W - pad, 16, { align: "right" });

//   y = 38;
//   doc.setTextColor(26, 43, 74);
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("INTERNAL EVALUATION REPORT", W / 2, y, { align: "center" });
//   doc.setDrawColor(214, 59, 31);
//   doc.setLineWidth(0.8);
//   doc.line(pad, y + 4, W - pad, y + 4);

//   y = 52;
//   doc.setFillColor(26, 43, 74);
//   doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(9);
//   doc.setFont("helvetica", "bold");
//   doc.text("STUDENT INFORMATION", pad + 4, y + 5.5);

//   y += 12;
//   const infoLeft: [string, string][] = [
//     ["Student Name", cert.studentName],
//     ["Internship Track", cert.internshipTrack],
//     ["College / University", cert.college],
//     ["Duration", cert.duration],
//   ];
//   const infoRight: [string, string][] = [
//     ["Enrollment ID", cert.enrollmentId],
//     ["Evaluation Date", cert.evaluationDate],
//     ["Mentor Name", cert.mentorName],
//     ["Batch", cert.batch],
//   ];

//   doc.setFontSize(8.5);
//   infoLeft.forEach(([label, value], i) => {
//     const rowY = y + i * 8;
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(80, 80, 80);
//     doc.text(label, pad + 2, rowY);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(30, 30, 30);
//     doc.text(`: ${value}`, pad + 38, rowY);
//   });
//   infoRight.forEach(([label, value], i) => {
//     const rowY = y + i * 8;
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(80, 80, 80);
//     doc.text(label, W / 2 + 4, rowY);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(30, 30, 30);
//     doc.text(`: ${value}`, W / 2 + 34, rowY);
//   });

//   y += 38;
//   doc.setFillColor(26, 43, 74);
//   doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(9);
//   doc.setFont("helvetica", "bold");
//   doc.text("PERFORMANCE EVALUATION", pad + 4, y + 5.5);

//   y += 12;
//   doc.setFillColor(240, 242, 245);
//   doc.rect(pad, y, W / 2 - pad - 4, 6, "F");
//   doc.setTextColor(26, 43, 74);
//   doc.setFontSize(8);
//   doc.setFont("helvetica", "bold");
//   doc.text("EVALUATION CRITERIA", pad + 2, y + 4);
//   doc.text("SCORE", pad + (W / 2 - pad - 4) - 18, y + 4);
//   y += 6;

//   cert.scores.forEach(({ label, score }, i) => {
//     const rowY = y + i * 8;
//     if (i % 2 === 1) {
//       doc.setFillColor(248, 249, 251);
//       doc.rect(pad, rowY, W / 2 - pad - 4, 8, "F");
//     }
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(50, 50, 50);
//     doc.setFontSize(8);
//     doc.text(label, pad + 2, rowY + 5);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(214, 59, 31);
//     doc.text(score, pad + (W / 2 - pad - 4) - 20, rowY + 5);
//   });

//   y += cert.scores.length * 8;
//   doc.setFillColor(26, 43, 74);
//   doc.rect(pad, y, W / 2 - pad - 4, 9, "F");
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(9);
//   doc.setTextColor(255, 255, 255);
//   doc.text("OVERALL PERFORMANCE", pad + 2, y + 6);
//   doc.setTextColor(255, 255, 255);
//   doc.text(cert.overall, pad + (W / 2 - pad - 4) - 24, y + 6);

//   // Skills (right side)
//   const assessX = W / 2 + 4;
//   const assessW = W / 2 - pad - 4;
//   let ay = y - cert.scores.length * 8 - 18;

//   doc.setFillColor(26, 43, 74);
//   doc.roundedRect(assessX, ay, assessW, 8, 2, 2, "F");
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(9);
//   doc.setFont("helvetica", "bold");
//   doc.text("SKILLS DEMONSTRATED", assessX + 4, ay + 5.5);
//   ay += 12;
//   doc.setFontSize(8);
//   doc.setFont("helvetica", "normal");
//   cert.skills.forEach((skill, i) => {
//     doc.setTextColor(214, 59, 31);
//     doc.text("✓", assessX + 4, ay + i * 7);
//     doc.setTextColor(50, 50, 50);
//     doc.text(skill, assessX + 10, ay + i * 7);
//   });

//   // Final Assessment badge
//   ay += cert.skills.length * 7 + 6;
//   doc.setFillColor(214, 59, 31);
//   doc.roundedRect(assessX + 6, ay, assessW - 12, 14, 4, 4, "F");
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(14);
//   doc.setFont("helvetica", "bold");
//   doc.text(cert.assessment, assessX + assessW / 2, ay + 10, { align: "center" });

//   // Mentor Remarks
//   y += 18;
//   doc.setFillColor(26, 43, 74);
//   doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(9);
//   doc.setFont("helvetica", "bold");
//   doc.text("MENTOR REMARKS", pad + 4, y + 5.5);
//   y += 12;
//   doc.setFontSize(8);
//   doc.setFont("helvetica", "italic");
//   doc.setTextColor(50, 50, 50);
//   const remarks = doc.splitTextToSize(
//     `${cert.studentName} has shown excellent consistency and dedication throughout the program. He completed all assigned tasks on time with high quality and demonstrated a strong understanding of full stack development concepts. His problem-solving approach and eagerness to learn are truly commendable.`,
//     W - pad * 2 - 4
//   );
//   doc.text(remarks, pad + 2, y);
//   y += remarks.length * 4.5 + 6;

//   // Verification
//   doc.setFillColor(248, 249, 251);
//   doc.roundedRect(pad, y, W - pad * 2, 22, 3, 3, "F");
//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.3);
//   doc.roundedRect(pad, y, W - pad * 2, 22, 3, 3, "S");
//   const verText = doc.splitTextToSize(
//     `This student has successfully completed the assigned tasks and internal evaluation requirements of the Internship Program and is eligible for the Internship Completion Certificate.`,
//     W - pad * 2 - 60
//   );
//   doc.setFontSize(8);
//   doc.setFont("helvetica", "normal");
//   doc.setTextColor(50, 50, 50);
//   doc.text(verText, pad + 4, y + 7);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(26, 43, 74);
//   doc.text("VERIFICATION ID", W - pad - 40, y + 6);
//   doc.setTextColor(214, 59, 31);
//   doc.setFontSize(9);
//   doc.text(cert.verificationId, W - pad - 40, y + 12);
//   doc.setFontSize(7);
//   doc.setTextColor(80, 80, 80);
//   doc.setFont("helvetica", "normal");
//   doc.text("www.inacademic.in/verify", W - pad - 40, y + 17);

//   // Footer
//   doc.setFillColor(26, 43, 74);
//   doc.rect(0, H - 14, W, 14, "F");
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(7.5);
//   doc.setFont("helvetica", "normal");
//   doc.text("www.inacademic.in", pad, H - 6);
//   doc.text("contact@inacademic.com", W / 2, H - 6, { align: "center" });
//   doc.text("Tiiron Technologies Pvt. Ltd., India", W - pad, H - 6, { align: "right" });

//   doc.save(`Evaluation_${cert.studentName.replace(" ", "_")}_${cert.enrollmentId}.pdf`);
// }

// export default function CourseCertificate() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isGenerating, setIsGenerating] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setIsLoading(false), 1200);
//     return () => clearTimeout(t);
//   }, []);


// const handleGenerate = async () => {
//   setIsGenerating(true);
//   await new Promise((r) => setTimeout(r, 400));
//   generateEvaluationPDF(MOCK_CERT); // ← yahi missing tha
//   setIsGenerating(false);
// };

//   const SectionHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
//     <Box
//       sx={{
//         background: "#0A2B5C",
//         color: "#fff",
//         px: 2,
//         py: 0.8,
//         borderRadius: "4px 4px 0 0",
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         mb: 2,
//       }}
//     >
//       {icon}
//       <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: 0.5 }}>
//         {title}
//       </Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ py: 4, px: { xs: 2, md: 4 }, background: "#F1F5F9", minHeight: "100vh" }}>
//       <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
        
//         {/* ─── LEFT SIDE: PREVIEW DESIGN ─── */}
//         <Grid item xs={12} lg={8.5}>
//           {isLoading ? (
//             <Skeleton variant="rectangular" height={900} sx={{ borderRadius: 2 }} animation="wave" />
//           ) : (
//             <Paper
//               elevation={4}
//               sx={{
//                 background: "#fff",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 border: "1px solid #E2E8F0",
//                 position: "relative",
//                 p: { xs: 2, sm: 4 },
//                 fontFamily: "Inter, sans-serif",
//               }}
//             >
//               {/* Top Red-Accent Border Line */}
//               <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#D63B1F" }} />

//               {/* Branding Logos Header (Using Image Logos) */}
//        <Box
//   sx={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     mt: 2,
//     mb: 4,
//   }}
// >
//   {/* Left: Inacademic Logo */}
//   <Box
//     component="img"
//     src="/Inacademic_Logo.png"
//     alt="Inacademic Logo"
//     sx={{
//       width: 130,       // fixed width, height auto hogi
//       height: "auto",   // aspect ratio maintain hoga
//       display: "block",
//     }}
//   />

//   {/* Center: Title */}
//   <Box sx={{ textAlign: "center", lineHeight: 1 }}>
//     <Typography
//       sx={{
//         fontWeight: 900,
//         color: "rgb(11, 85, 196)",
//         fontSize: "2.1rem",
//         letterSpacing: 2,
//         lineHeight: 1.2,
//       }}
//     >
//       INACADEMIC
//     </Typography>

//     {/* Decorative lines around subtitle */}
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         mt: 0.5,
//       }}
//     >
//       <Box sx={{ height: "1px", width: 28, background: "#94A3B8" }} />
//       <Typography
//         sx={{
//           fontSize: "1rem",
//           letterSpacing: 3,
//           color: "#64748B",
//           fontWeight: 700,
//           whiteSpace: "nowrap",
//         }}
//       >
//         INTERNSHIP PROGRAM
//       </Typography>
//       <Box sx={{ height: "1px", width: 28, background: "#94A3B8" }} />
//     </Box>
//   </Box>

//   {/* Right: Tiiron Logo */}
//   <Box
//     component="img"
//     src="/Tiiron_Technologies_Logo.png"
//     alt="Tiiron Logo"
//     sx={{
//       width: 130,
//       height: "auto",
//       display: "block",
//     }}
//   />
// </Box>

//               {/* Title Section */}
//               <Box sx={{ textAlign: "center", mb: 4 }}>
//                 <Typography variant="h5" sx={{ fontWeight: 800, color: "#0A2B5C", letterSpacing: 1 }}>
//                   INTERNAL EVALUATION REPORT
//                 </Typography>
//                 <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, color: "#D63B1F" }}>
//                   <StarIcon fontSize="small" />
//                   <StarIcon fontSize="small" />
//                   <StarIcon fontSize="small" />
//                 </Box>
//               </Box>

//               {/* Student Information Section */}
//               <Box sx={{ mb: 4, border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden" }}>
//                 <SectionHeader title="STUDENT INFORMATION" icon={<SchoolIcon sx={{ fontSize: 18 }} />} />
//                 <Grid container spacing={2} sx={{ p: 2, pt: 1 }}>
//                   {[
//                     { label: "Student Name", value: MOCK_CERT.studentName },
//                     { label: "Enrollment ID", value: MOCK_CERT.enrollmentId },
//                     { label: "Internship Track", value: MOCK_CERT.internshipTrack },
//                     { label: "Evaluation Date", value: MOCK_CERT.evaluationDate },
//                     { label: "College / University", value: MOCK_CERT.college },
//                     { label: "Mentor Name", value: MOCK_CERT.mentorName },
//                     { label: "Duration", value: MOCK_CERT.duration },
//                     { label: "Batch", value: MOCK_CERT.batch },
//                   ].map((item, idx) => (
//                     <Grid item xs={12} sm={6} key={idx} sx={{ display: "flex", alignItems: "baseline" }}>
//                       <Typography sx={{ width: "160px", color: "#64748B", fontWeight: 600, fontSize: "0.85rem" }}>
//                         {item.label}
//                       </Typography>
//                       <Typography sx={{ color: "#0F172A", fontWeight: 500, fontSize: "0.85rem", flex: 1 }}>
//                         : &nbsp;{item.value}
//                       </Typography>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>

//               {/* Program Summary Section */}
//               <Box sx={{ mb: 4, border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden" }}>
//                 <SectionHeader title="PROGRAM SUMMARY" icon={<AssignmentTurnedInIcon sx={{ fontSize: 18 }} />} />
//                 <Typography sx={{ p: 2, pt: 1, color: "#334155", fontSize: "0.85rem", lineHeight: 1.6 }}>
//                   This report certifies that the above-mentioned student successfully participated in the Inacademic Internship Program 
//                   and completed the assigned learning modules, assessments, and practical tasks through the Tiiron LMS platform. 
//                   The evaluation has been conducted based on the student's performance, participation, consistency, 
//                   technical understanding, and completion of assigned work throughout the program.
//                 </Typography>
//               </Box>

//               {/* Split Sections: Performance Table vs Skills / Assessment */}
//               <Grid container spacing={3} sx={{ mb: 4 }}>
//                 {/* Performance Evaluation Left Column */}
//                 <Grid item xs={12} md={6}>
//                   <Box sx={{ border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden", height: "100%" }}>
//                     <SectionHeader title="PERFORMANCE EVALUATION" />
                    
//                     <Box sx={{ display: "flex", justifyContent: "space-between", bg: "#F8FAFC", px: 2, py: 1, borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
//                       <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>EVALUATION CRITERIA</Typography>
//                       <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>SCORE (OUT OF 10)</Typography>
//                     </Box>

//                     {MOCK_CERT.scores.map((row, idx) => (
//                       <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1, borderBottom: "1px solid #F1F5F9" }}>
//                         <Typography sx={{ fontSize: "0.8rem", color: "#334155", fontWeight: 500 }}>{row.label}</Typography>
//                         <Typography sx={{ fontSize: "0.8rem", color: "#0F172A", fontWeight: 700 }}>{row.score}</Typography>
//                       </Box>
//                     ))}

//                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0A2B5C", color: "#FFFFFF", px: 2, py: 1.5, mt: "auto" }}>
//   <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF !important " }}>OVERALL PERFORMANCE</Typography>
//   <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFF !important " }}>{MOCK_CERT.overall}</Typography>
// </Box>
//                   </Box>
//                 </Grid>

//                 {/* Skills & Final Assessment Right Column */}
//                 <Grid item xs={12} md={6}>
//                   <Box sx={{ border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
//                     <SectionHeader title="SKILLS DEMONSTRATED" />
                    
//                     {/* Skills List with Certified Badge Overlay Option */}
//                     <Box sx={{ px: 2, flex: 1, position: "relative" }}>
//                       {MOCK_CERT.skills.map((skill, idx) => (
//                         <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
//                           <CheckCircleIcon sx={{ fontSize: 16, color: "#0A2B5C" }} />
//                           <Typography sx={{ fontSize: "0.82rem", color: "#334155", fontWeight: 500 }}>{skill}</Typography>
//                         </Box>
//                       ))}

//                       {/* Golden Ribbon Badge (Certified Student Image Integration) */}
//                       <Box sx={{ position: "absolute", bottom: 10, right: 15, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
//                         <Box component="img" src="/assets/gold_certified_badge.png" alt="Certified Badge" sx={{ width: 65, height: 65, mb: 0.5, objectFit: "contain" }} />
//                         <Typography sx={{ fontSize: "0.75rem", fontWeight: 900, color: "#1E293B", lineHeight: 1.1 }}>
//                           CERTIFIED<br/>STUDENT
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Final Assessment Red Badge Area */}
//                     <Box sx={{ p: 2, borderTop: "1px solid #E2E8F0", textAlign: "center", bg: "#FFF" }}>
//                       <Typography variant="caption" sx={{ fontWeight: 800, color: "#475569", display: "block", mb: 1, letterSpacing: 0.5 }}>
//                         FINAL ASSESSMENT
//                       </Typography>
//                       <Box
//                         sx={{
//                           background: "#D63B1F",
//                           color: "#fff",
//                           py: 1,
//                           px: 3,
//                           borderRadius: "4px",
//                           fontWeight: 900,
//                           fontSize: "1.2rem",
//                           display: "inline-block",
//                           letterSpacing: 1,
//                           boxShadow: "0 2px 8px rgba(214,59,31,0.3)",
//                         }}
//                       >
//                         {MOCK_CERT.assessment}
//                       </Box>
//                       <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mt: 1, color: "#0A2B5C" }}>
//                         <StarIcon fontSize="inherit" />
//                         <StarIcon fontSize="inherit" />
//                         <StarIcon fontSize="inherit" />
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Grid>
//               </Grid>

//               {/* Mentor Remarks Section with Seal */}
//               <Box sx={{ mb: 4, border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
//                 <SectionHeader title="MENTOR REMARKS" />
//                 <Box sx={{ p: 2, pt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Typography sx={{ color: "#475569", fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.6, pr: 8 }}>
//                     "{MOCK_CERT.studentName} has shown excellent consistency and dedication throughout the program. He completed all assigned tasks 
//                     on time with high quality and demonstrated a strong understanding of full stack development concepts. 
//                     His problem-solving approach and eagerness to learn are truly commendable."
//                   </Typography>
                  
//                   {/* Tiiron Seal Image on Right side of Mentor Remarks */}
//                   <Box component="img" src="/assets/tiiron_seal.png" alt="Tiiron Seal" sx={{ width: 60, height: 60, objectFit: "contain", opacity: 0.8 }} />
//                 </Box>
//               </Box>

//               {/* Verification Section Box with BLACK Verification Icon */}
//               <Box sx={{ border: "1px solid #CBD5E1", borderRadius: "6px", p: 2, background: "#F8FAFC", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 5 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, minWidth: "280px" }}>
//                   {/* Black Ribbon / Verification Icon Added Here */}
//                   <WorkspacePremiumIcon sx={{ fontSize: 42, color: "#0F172A" }} />
//                   <Typography sx={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.5 }}>
//                     This student has successfully completed the assigned tasks and internal evaluation requirements of the Internship Program and is eligible for the Internship Completion Certificate.
//                   </Typography>
//                 </Box>
//                 <Box sx={{ textAlign: { xs: "left", sm: "right" }, borderLeft: { sm: "2px solid #E2E8F0" }, pl: { sm: 3 } }}>
//                   <Typography variant="caption" sx={{ fontWeight: 700, color: "#64748B", display: "block" }}>VERIFICATION ID</Typography>
//                   <Typography sx={{ fontWeight: 800, color: "#D63B1F", fontSize: "1rem", my: 0.2 }}>{MOCK_CERT.verificationId}</Typography>
//                   <Typography variant="caption" sx={{ color: "#0A2B5C", textDecoration: "underline", cursor: "pointer" }}>www.inacademic.in/verify</Typography>
//                 </Box>
//               </Box>

//               {/* Signatures Row */}
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mb: 4, mt: 2 }}>
//                 <Box sx={{ textAlign: "center" }}>
//                   <Typography sx={{ fontFamily: "cursive", color: "#475569", fontSize: "1.1rem", mb: 0.5 }}>Priya M.</Typography>
//                   <Divider sx={{ width: "140px", mb: 0.5 }} />
//                   <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#0F172A" }}>Priya Mehrotra</Typography>
//                   <Typography sx={{ fontSize: "0.7rem", color: "#64748B" }}>Mentor</Typography>
//                 </Box>
                
//                 {/* Lower Branding Seal/Footer Element */}
//                 <Box component="img" src="/assets/tiiron_seal.png" alt="Official Seal" sx={{ width: 55, height: 55, objectFit: "contain" }} />

//                 <Box sx={{ textAlign: "center" }}>
//                   <Typography sx={{ fontFamily: "cursive", color: "#475569", fontSize: "1.1rem", mb: 0.5 }}>Coordinator</Typography>
//                   <Divider sx={{ width: "140px", mb: 0.5 }} />
//                   <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#0F172A" }}>Program Coordinator</Typography>
//                   <Typography sx={{ fontSize: "0.7rem", color: "#64748B" }}>Inacademic</Typography>
//                 </Box>
//               </Box>

//               {/* Bottom Navy Footer strip */}
//               <Box
//                 sx={{
//                   background: "#0A2B5C",
//                   color: "#fff",
//                   mx: { xs: -2, sm: -4 },
//                   mb: { xs: -2, sm: -4 },
//                   p: 1.5,
//                   display: "flex",
//                   flexWrap: "wrap",
//                   justifyContent: "space-around",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.75rem" }}><LanguageIcon fontSize="inherit"/> www.inacademic.in</Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.75rem" }}><EmailIcon fontSize="inherit"/> contact@inacademic.com</Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.75rem" }}><LocationOnIcon fontSize="inherit"/> Tiiron Technologies Pvt. Ltd. India</Box>
//               </Box>
//             </Paper>
//           )}
//         </Grid>

//         {/* ─── RIGHT SIDE: CONTROL PANEL ─── */}
//         <Grid item xs={12} lg={3.5}>
//           <Box sx={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 3 }}>
//             {!isLoading && (
//               <>
//                 <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, background: "#FFF", border: "1px solid #E2E8F0" }}>
//                   <Typography variant="subtitle2" sx={{ color: "#64748B", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", mb: 2 }}>
//                     Quick Summary
//                   </Typography>

//                   {[
//                     { label: "Student", value: MOCK_CERT.studentName },
//                     { label: "Enrollment ID", value: MOCK_CERT.enrollmentId },
//                     { label: "Track", value: MOCK_CERT.internshipTrack },
//                     { label: "Overall Score", value: MOCK_CERT.overall },
//                   ].map(({ label, value }) => (
//                     <Box key={label} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #F1F5F9" }}>
//                       <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 500 }}>{label}</Typography>
//                       <Typography variant="caption" sx={{ fontWeight: 700, color: "#0F172A", textAlign: "right", maxWidth: "65%" }}>
//                         {value}
//                       </Typography>
//                     </Box>
//                   ))}

//                   <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//                     <Chip
//                       label={MOCK_CERT.assessment}
//                       size="medium"
//                       icon={<VerifiedIcon style={{ color: "#fff" }} />}
//                       sx={{ background: "#D63B1F", color: "#fff", fontWeight: 800, px: 1 }}
//                     />
//                   </Box>
//                 </Paper>

//                 <Button
//                   variant="contained"
//                   fullWidth
//                   size="large"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleGenerate}
//                   disabled={isGenerating}
//                   sx={{
//                     background: "#0A2B5C",
//                     borderRadius: "8px",
//                     textTransform: "none",
//                     fontWeight: 700,
//                     py: 1.8,
//                     fontSize: "0.95rem",
//                     boxShadow: "0 4px 12px rgba(10,43,92,0.2)",
//                     "&:hover": { background: "#061B3A" },
//                   }}
//                 >
//                   {isGenerating ? "Generating Document..." : "Download Official Report"}
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Grid>

//       </Grid>
//     </Box>
//   );
// }



// // import { useState, useEffect } from "react";
// // import {
// //   Box, Typography, Button, Skeleton, Chip, Grid, Paper,
// //   Divider, Card, CardContent, CardActions, IconButton,
// // } from "@mui/material";
// // import DownloadIcon from "@mui/icons-material/Download";
// // import VerifiedIcon from "@mui/icons-material/Verified";
// // import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // import SchoolIcon from "@mui/icons-material/School";
// // import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// // import StarIcon from "@mui/icons-material/Star";
// // import EmailIcon from "@mui/icons-material/Email";
// // import LanguageIcon from "@mui/icons-material/Language";
// // import LocationOnIcon from "@mui/icons-material/LocationOn";
// // import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// // import jsPDF from "jspdf";

// // // ─── Types ────────────────────────────────────────────────────────────────────
// // interface CertificateData {
// //   id: string;
// //   courseName: string;
// //   studentName: string;
// //   enrollmentId: string;
// //   internshipTrack: string;
// //   college: string;
// //   duration: string;
// //   evaluationDate: string;
// //   mentorName: string;
// //   batch: string;
// //   scores: { label: string; score: string }[];
// //   overall: string;
// //   assessment: string;
// //   verificationId: string;
// //   skills: string[];
// //   status: "completed" | "in-progress";
// // }

// // // ─── Mock Data (multiple certificates) ───────────────────────────────────────
// // const MOCK_CERTIFICATES: CertificateData[] = [
// //   {
// //     id: "cert-1",
// //     courseName: "Full Stack Web Development",
// //     studentName: "Rahul Sharma",
// //     enrollmentId: "INA-FSWD-250318",
// //     internshipTrack: "Full Stack Web Development",
// //     college: "ABC Institute of Technology",
// //     duration: "3rd March 2025 – 3rd June 2025",
// //     evaluationDate: "4th June 2025",
// //     mentorName: "Priya Mehrotra",
// //     batch: "FSWD-MAR25-B1",
// //     scores: [
// //       { label: "Attendance & Consistency", score: "9.0 / 10" },
// //       { label: "Task Completion", score: "9.5 / 10" },
// //       { label: "Technical Knowledge", score: "8.5 / 10" },
// //       { label: "Problem Solving Ability", score: "8.5 / 10" },
// //       { label: "Code Quality / Deliverables", score: "9.0 / 10" },
// //       { label: "Communication & Collaboration", score: "8.5 / 10" },
// //       { label: "Learning Attitude", score: "9.0 / 10" },
// //     ],
// //     overall: "8.9 / 10",
// //     assessment: "EXCELLENT",
// //     verificationId: "INA-EVAL-2025-00125",
// //     skills: [
// //       "Technical Skills", "Problem Solving", "Team Collaboration",
// //       "Communication", "Time Management", "Professional Conduct",
// //       "Product Development Understanding",
// //     ],
// //     status: "completed",
// //   },
// //   {
// //     id: "cert-2",
// //     courseName: "UI/UX Design Fundamentals",
// //     studentName: "Rahul Sharma",
// //     enrollmentId: "INA-UIUX-250412",
// //     internshipTrack: "UI/UX Design",
// //     college: "ABC Institute of Technology",
// //     duration: "1st April 2025 – 30th June 2025",
// //     evaluationDate: "30th June 2025",
// //     mentorName: "Ankit Verma",
// //     batch: "UIUX-APR25-B2",
// //     scores: [
// //       { label: "Attendance & Consistency", score: "8.5 / 10" },
// //       { label: "Task Completion", score: "9.0 / 10" },
// //       { label: "Design Quality", score: "9.5 / 10" },
// //       { label: "Problem Solving Ability", score: "8.0 / 10" },
// //       { label: "Prototype Deliverables", score: "9.0 / 10" },
// //       { label: "Communication & Collaboration", score: "8.5 / 10" },
// //       { label: "Learning Attitude", score: "9.0 / 10" },
// //     ],
// //     overall: "8.8 / 10",
// //     assessment: "EXCELLENT",
// //     verificationId: "INA-EVAL-2025-00198",
// //     skills: [
// //       "Figma & Prototyping", "User Research", "Wireframing",
// //       "Visual Design", "Usability Testing", "Design Thinking",
// //       "Cross-functional Collaboration",
// //     ],
// //     status: "completed",
// //   },
// //   {
// //     id: "cert-3",
// //     courseName: "Data Science & ML Basics",
// //     studentName: "Rahul Sharma",
// //     enrollmentId: "INA-DS-250501",
// //     internshipTrack: "Data Science",
// //     college: "ABC Institute of Technology",
// //     duration: "1st May 2025 – Ongoing",
// //     evaluationDate: "—",
// //     mentorName: "Sneha Kapoor",
// //     batch: "DS-MAY25-B1",
// //     scores: [],
// //     overall: "—",
// //     assessment: "IN PROGRESS",
// //     verificationId: "—",
// //     skills: [],
// //     status: "in-progress",
// //   },
// // ];

// // // ─── PDF Generator ────────────────────────────────────────────────────────────
// // function generateEvaluationPDF(cert: CertificateData) {
// //   const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
// //   const W = 210;
// //   const H = 297;
// //   const pad = 16;
// //   let y = 0;

// //   doc.setFillColor(26, 43, 74);
// //   doc.rect(0, 0, W, 28, "F");
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(18);
// //   doc.setFont("helvetica", "bold");
// //   doc.text("INACADEMIC", W / 2, 11, { align: "center" });
// //   doc.setFontSize(8);
// //   doc.setFont("helvetica", "normal");
// //   doc.text("INTERNSHIP PROGRAM", W / 2, 17, { align: "center" });
// //   doc.setFontSize(7);
// //   doc.text("Tiiron Technologies Pvt. Ltd.", W - pad, 11, { align: "right" });
// //   doc.text("www.inacademic.in", W - pad, 16, { align: "right" });

// //   y = 38;
// //   doc.setTextColor(26, 43, 74);
// //   doc.setFontSize(16);
// //   doc.setFont("helvetica", "bold");
// //   doc.text("INTERNAL EVALUATION REPORT", W / 2, y, { align: "center" });
// //   doc.setDrawColor(214, 59, 31);
// //   doc.setLineWidth(0.8);
// //   doc.line(pad, y + 4, W - pad, y + 4);

// //   y = 52;
// //   doc.setFillColor(26, 43, 74);
// //   doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(9);
// //   doc.setFont("helvetica", "bold");
// //   doc.text("STUDENT INFORMATION", pad + 4, y + 5.5);

// //   y += 12;
// //   const infoLeft: [string, string][] = [
// //     ["Student Name", cert.studentName],
// //     ["Internship Track", cert.internshipTrack],
// //     ["College / University", cert.college],
// //     ["Duration", cert.duration],
// //   ];
// //   const infoRight: [string, string][] = [
// //     ["Enrollment ID", cert.enrollmentId],
// //     ["Evaluation Date", cert.evaluationDate],
// //     ["Mentor Name", cert.mentorName],
// //     ["Batch", cert.batch],
// //   ];

// //   doc.setFontSize(8.5);
// //   infoLeft.forEach(([label, value], i) => {
// //     const rowY = y + i * 8;
// //     doc.setFont("helvetica", "bold");
// //     doc.setTextColor(80, 80, 80);
// //     doc.text(label, pad + 2, rowY);
// //     doc.setFont("helvetica", "normal");
// //     doc.setTextColor(30, 30, 30);
// //     doc.text(`: ${value}`, pad + 38, rowY);
// //   });
// //   infoRight.forEach(([label, value], i) => {
// //     const rowY = y + i * 8;
// //     doc.setFont("helvetica", "bold");
// //     doc.setTextColor(80, 80, 80);
// //     doc.text(label, W / 2 + 4, rowY);
// //     doc.setFont("helvetica", "normal");
// //     doc.setTextColor(30, 30, 30);
// //     doc.text(`: ${value}`, W / 2 + 34, rowY);
// //   });

// //   y += 38;
// //   doc.setFillColor(26, 43, 74);
// //   doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(9);
// //   doc.setFont("helvetica", "bold");
// //   doc.text("PERFORMANCE EVALUATION", pad + 4, y + 5.5);

// //   y += 12;
// //   doc.setFillColor(240, 242, 245);
// //   doc.rect(pad, y, W / 2 - pad - 4, 6, "F");
// //   doc.setTextColor(26, 43, 74);
// //   doc.setFontSize(8);
// //   doc.setFont("helvetica", "bold");
// //   doc.text("EVALUATION CRITERIA", pad + 2, y + 4);
// //   doc.text("SCORE", pad + (W / 2 - pad - 4) - 18, y + 4);
// //   y += 6;

// //   cert.scores.forEach(({ label, score }, i) => {
// //     const rowY = y + i * 8;
// //     if (i % 2 === 1) {
// //       doc.setFillColor(248, 249, 251);
// //       doc.rect(pad, rowY, W / 2 - pad - 4, 8, "F");
// //     }
// //     doc.setFont("helvetica", "normal");
// //     doc.setTextColor(50, 50, 50);
// //     doc.setFontSize(8);
// //     doc.text(label, pad + 2, rowY + 5);
// //     doc.setFont("helvetica", "bold");
// //     doc.setTextColor(214, 59, 31);
// //     doc.text(score, pad + (W / 2 - pad - 4) - 20, rowY + 5);
// //   });

// //   y += cert.scores.length * 8;
// //   doc.setFillColor(26, 43, 74);
// //   doc.rect(pad, y, W / 2 - pad - 4, 9, "F");
// //   doc.setFont("helvetica", "bold");
// //   doc.setFontSize(9);
// //   doc.setTextColor(255, 255, 255);
// //   doc.text("OVERALL PERFORMANCE", pad + 2, y + 6);
// //   doc.text(cert.overall, pad + (W / 2 - pad - 4) - 24, y + 6);

// //   const assessX = W / 2 + 4;
// //   const assessW = W / 2 - pad - 4;
// //   let ay = y - cert.scores.length * 8 - 18;

// //   doc.setFillColor(26, 43, 74);
// //   doc.roundedRect(assessX, ay, assessW, 8, 2, 2, "F");
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(9);
// //   doc.setFont("helvetica", "bold");
// //   doc.text("SKILLS DEMONSTRATED", assessX + 4, ay + 5.5);
// //   ay += 12;
// //   doc.setFontSize(8);
// //   doc.setFont("helvetica", "normal");
// //   cert.skills.forEach((skill, i) => {
// //     doc.setTextColor(214, 59, 31);
// //     doc.text("✓", assessX + 4, ay + i * 7);
// //     doc.setTextColor(50, 50, 50);
// //     doc.text(skill, assessX + 10, ay + i * 7);
// //   });

// //   ay += cert.skills.length * 7 + 6;
// //   doc.setFillColor(214, 59, 31);
// //   doc.roundedRect(assessX + 6, ay, assessW - 12, 14, 4, 4, "F");
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(14);
// //   doc.setFont("helvetica", "bold");
// //   doc.text(cert.assessment, assessX + assessW / 2, ay + 10, { align: "center" });

// //   y += 18;
// //   doc.setFillColor(26, 43, 74);
// //   doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(9);
// //   doc.setFont("helvetica", "bold");
// //   doc.text("MENTOR REMARKS", pad + 4, y + 5.5);
// //   y += 12;
// //   doc.setFontSize(8);
// //   doc.setFont("helvetica", "italic");
// //   doc.setTextColor(50, 50, 50);
// //   const remarks = doc.splitTextToSize(
// //     `${cert.studentName} has shown excellent consistency and dedication throughout the program.`,
// //     W - pad * 2 - 4
// //   );
// //   doc.text(remarks, pad + 2, y);
// //   y += remarks.length * 4.5 + 6;

// //   doc.setFillColor(248, 249, 251);
// //   doc.roundedRect(pad, y, W - pad * 2, 22, 3, 3, "F");
// //   doc.setDrawColor(200, 200, 200);
// //   doc.setLineWidth(0.3);
// //   doc.roundedRect(pad, y, W - pad * 2, 22, 3, 3, "S");
// //   const verText = doc.splitTextToSize(
// //     `This student has successfully completed the assigned tasks and internal evaluation requirements.`,
// //     W - pad * 2 - 60
// //   );
// //   doc.setFontSize(8);
// //   doc.setFont("helvetica", "normal");
// //   doc.setTextColor(50, 50, 50);
// //   doc.text(verText, pad + 4, y + 7);
// //   doc.setFont("helvetica", "bold");
// //   doc.setTextColor(26, 43, 74);
// //   doc.text("VERIFICATION ID", W - pad - 40, y + 6);
// //   doc.setTextColor(214, 59, 31);
// //   doc.setFontSize(9);
// //   doc.text(cert.verificationId, W - pad - 40, y + 12);
// //   doc.setFontSize(7);
// //   doc.setTextColor(80, 80, 80);
// //   doc.setFont("helvetica", "normal");
// //   doc.text("www.inacademic.in/verify", W - pad - 40, y + 17);

// //   doc.setFillColor(26, 43, 74);
// //   doc.rect(0, H - 14, W, 14, "F");
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(7.5);
// //   doc.setFont("helvetica", "normal");
// //   doc.text("www.inacademic.in", pad, H - 6);
// //   doc.text("contact@inacademic.com", W / 2, H - 6, { align: "center" });
// //   doc.text("Tiiron Technologies Pvt. Ltd., India", W - pad, H - 6, { align: "right" });

// //   doc.save(`Evaluation_${cert.studentName.replace(" ", "_")}_${cert.enrollmentId}.pdf`);
// // }

// // // ─── Certificate Card ─────────────────────────────────────────────────────────
// // function CertificateCard({
// //   cert,
// //   onView,
// // }: {
// //   cert: CertificateData;
// //   onView: (cert: CertificateData) => void;
// // }) {
// //   const isCompleted = cert.status === "completed";

// //   return (
// //     <Card
// //       elevation={2}
// //       sx={{
// //         borderRadius: 3,
// //         border: "1px solid #E2E8F0",
// //         overflow: "hidden",
// //         transition: "transform 0.2s, box-shadow 0.2s",
// //         "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" },
// //       }}
// //     >
// //       {/* Card top accent */}
// //       <Box sx={{ height: 5, background: isCompleted ? "#0A2B5C" : "#94A3B8" }} />

// //       <CardContent sx={{ p: 2.5 }}>
// //         {/* Icon + Status */}
// //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
// //           <Box
// //             sx={{
// //               width: 44, height: 44, borderRadius: 2,
// //               background: isCompleted ? "#EEF2FF" : "#F1F5F9",
// //               display: "flex", alignItems: "center", justifyContent: "center",
// //             }}
// //           >
// //             <EmojiEventsIcon sx={{ color: isCompleted ? "#0A2B5C" : "#94A3B8", fontSize: 24 }} />
// //           </Box>
// //           <Chip
// //             label={isCompleted ? "Completed" : "In Progress"}
// //             size="small"
// //             sx={{
// //               background: isCompleted ? "#DCFCE7" : "#FEF9C3",
// //               color: isCompleted ? "#166534" : "#854D0E",
// //               fontWeight: 700,
// //               fontSize: "0.7rem",
// //             }}
// //           />
// //         </Box>

// //         {/* Course Name */}
// //         <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem", mb: 0.5, lineHeight: 1.3 }}>
// //           {cert.courseName}
// //         </Typography>

// //         <Typography variant="caption" sx={{ color: "#64748B", display: "block", mb: 1.5 }}>
// //           {cert.batch} · {cert.mentorName}
// //         </Typography>

// //         <Divider sx={{ mb: 1.5 }} />

// //         {/* Score Row */}
// //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //           <Typography variant="caption" sx={{ color: "#64748B" }}>Overall Score</Typography>
// //           <Typography sx={{ fontWeight: 800, color: isCompleted ? "#D63B1F" : "#94A3B8", fontSize: "0.9rem" }}>
// //             {cert.overall}
// //           </Typography>
// //         </Box>

// //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
// //           <Typography variant="caption" sx={{ color: "#64748B" }}>Assessment</Typography>
// //           <Typography sx={{ fontWeight: 700, color: isCompleted ? "#0A2B5C" : "#94A3B8", fontSize: "0.8rem" }}>
// //             {cert.assessment}
// //           </Typography>
// //         </Box>
// //       </CardContent>

// //       <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0, gap: 1 }}>
// //         <Button
// //           fullWidth
// //           variant="contained"
// //           size="small"
// //           disabled={!isCompleted}
// //           onClick={() => onView(cert)}
// //           sx={{
// //             background: "#0A2B5C",
// //             borderRadius: 2,
// //             textTransform: "none",
// //             fontWeight: 600,
// //             fontSize: "0.8rem",
// //             "&:hover": { background: "#061B3A" },
// //           }}
// //         >
// //           View Certificate
// //         </Button>
// //         <Button
// //           fullWidth
// //           variant="outlined"
// //           size="small"
// //           disabled={!isCompleted}
// //           startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
// //           onClick={() => generateEvaluationPDF(cert)}
// //           sx={{
// //             borderColor: "#0A2B5C",
// //             color: "#0A2B5C",
// //             borderRadius: 2,
// //             textTransform: "none",
// //             fontWeight: 600,
// //             fontSize: "0.8rem",
// //             "&:hover": { background: "#EEF2FF" },
// //           }}
// //         >
// //           Download
// //         </Button>
// //       </CardActions>
// //     </Card>
// //   );
// // }

// // // ─── Section Header ───────────────────────────────────────────────────────────
// // function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
// //   return (
// //     <Box
// //       sx={{
// //         background: "#0A2B5C", color: "#fff", px: 2, py: 0.8,
// //         borderRadius: "4px 4px 0 0",
// //         display: "flex", alignItems: "center", gap: 1, mb: 2,
// //       }}
// //     >
// //       {icon}
// //       <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: 0.5 }}>
// //         {title}
// //       </Typography>
// //     </Box>
// //   );
// // }

// // // ─── Main Component ───────────────────────────────────────────────────────────
// // export default function CourseCertificate() {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isGenerating, setIsGenerating] = useState(false);
// //   // null = list view, CertificateData = detail view
// //   const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);

// //   useEffect(() => {
// //     const t = setTimeout(() => setIsLoading(false), 1200);
// //     return () => clearTimeout(t);
// //   }, []);

// //   const handleGenerate = async (cert: CertificateData) => {
// //     setIsGenerating(true);
// //     await new Promise((r) => setTimeout(r, 400));
// //     generateEvaluationPDF(cert);
// //     setIsGenerating(false);
// //   };

// //   // ── LIST VIEW ──────────────────────────────────────────────────────────────
// //   if (!selectedCert) {
// //     return (
// //       <Box sx={{ py: 4, px: { xs: 2, md: 4 }, background: "#F1F5F9", minHeight: "100vh" }}>
// //         {/* Header */}
// //         <Box sx={{ mb: 4 }}>
// //           <Typography variant="h5" sx={{ fontWeight: 800, color: "#0A2B5C" }}>
// //             My Certificates
// //           </Typography>
// //           <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
// //             {MOCK_CERTIFICATES.filter((c) => c.status === "completed").length} completed ·{" "}
// //             {MOCK_CERTIFICATES.filter((c) => c.status === "in-progress").length} in progress
// //           </Typography>
// //         </Box>

// //         {/* Cards Grid */}
// //         {isLoading ? (
// //           <Grid container spacing={3}>
// //             {[1, 2, 3].map((i) => (
// //               <Grid item xs={12} sm={6} lg={4} key={i}>
// //                 <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 3 }} animation="wave" />
// //               </Grid>
// //             ))}
// //           </Grid>
// //         ) : (
// //           <Grid container spacing={3}>
// //             {MOCK_CERTIFICATES.map((cert) => (
// //               <Grid item xs={12} sm={6} lg={4} key={cert.id}>
// //                 <CertificateCard cert={cert} onView={(c) => setSelectedCert(c)} />
// //               </Grid>
// //             ))}
// //           </Grid>
// //         )}
// //       </Box>
// //     );
// //   }

// //   // ── DETAIL VIEW ────────────────────────────────────────────────────────────
// //   return (
// //     <Box sx={{ py: 4, px: { xs: 2, md: 4 }, background: "#F1F5F9", minHeight: "100vh" }}>
// //       {/* Back Button */}
// //       <Button
// //         startIcon={<ArrowBackIcon />}
// //         onClick={() => setSelectedCert(null)}
// //         sx={{
// //           mb: 3, color: "#0A2B5C", textTransform: "none", fontWeight: 600,
// //           "&:hover": { background: "#E2E8F0" },
// //         }}
// //       >
// //         Back to Certificates
// //       </Button>

// //       <Grid container spacing={4} justifyContent="center" alignItems="flex-start">

// //         {/* ── LEFT: Certificate Preview ── */}
// //         <Grid item xs={12} lg={8.5}>
// //           <Paper
// //             elevation={4}
// //             sx={{
// //               background: "#fff", borderRadius: "8px", overflow: "hidden",
// //               border: "1px solid #E2E8F0", position: "relative",
// //               p: { xs: 2, sm: 4 }, fontFamily: "Inter, sans-serif",
// //             }}
// //           >
// //             <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#D63B1F" }} />

// //             {/* Logos */}
// //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 4 }}>
// //               <Box component="img" src="/Inacademic_Logo.png" alt="Inacademic Logo" sx={{ width: 130, height: "auto", display: "block" }} />
// //               <Box sx={{ textAlign: "center", lineHeight: 1 }}>
// //                 <Typography sx={{ fontWeight: 900, color: "rgb(11, 85, 196)", fontSize: "2.1rem", letterSpacing: 2, lineHeight: 1.2 }}>
// //                   INACADEMIC
// //                 </Typography>
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
// //                   <Box sx={{ height: "1px", width: 28, background: "#94A3B8" }} />
// //                   <Typography sx={{ fontSize: "1rem", letterSpacing: 3, color: "#64748B", fontWeight: 700, whiteSpace: "nowrap" }}>
// //                     INTERNSHIP PROGRAM
// //                   </Typography>
// //                   <Box sx={{ height: "1px", width: 28, background: "#94A3B8" }} />
// //                 </Box>
// //               </Box>
// //               <Box component="img" src="/Tiiron_Technologies_Logo.png" alt="Tiiron Logo" sx={{ width: 130, height: "auto", display: "block" }} />
// //             </Box>

// //             {/* Title */}
// //             <Box sx={{ textAlign: "center", mb: 4 }}>
// //               <Typography variant="h5" sx={{ fontWeight: 800, color: "#0A2B5C", letterSpacing: 1 }}>
// //                 INTERNAL EVALUATION REPORT
// //               </Typography>
// //               <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, color: "#D63B1F" }}>
// //                 <StarIcon fontSize="small" /><StarIcon fontSize="small" /><StarIcon fontSize="small" />
// //               </Box>
// //             </Box>

// //             {/* Student Info */}
// //             <Box sx={{ mb: 4, border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden" }}>
// //               <SectionHeader title="STUDENT INFORMATION" icon={<SchoolIcon sx={{ fontSize: 18 }} />} />
// //               <Grid container spacing={2} sx={{ p: 2, pt: 1 }}>
// //                 {[
// //                   { label: "Student Name", value: selectedCert.studentName },
// //                   { label: "Enrollment ID", value: selectedCert.enrollmentId },
// //                   { label: "Internship Track", value: selectedCert.internshipTrack },
// //                   { label: "Evaluation Date", value: selectedCert.evaluationDate },
// //                   { label: "College / University", value: selectedCert.college },
// //                   { label: "Mentor Name", value: selectedCert.mentorName },
// //                   { label: "Duration", value: selectedCert.duration },
// //                   { label: "Batch", value: selectedCert.batch },
// //                 ].map((item, idx) => (
// //                   <Grid item xs={12} sm={6} key={idx} sx={{ display: "flex", alignItems: "baseline" }}>
// //                     <Typography sx={{ width: "160px", color: "#64748B", fontWeight: 600, fontSize: "0.85rem" }}>
// //                       {item.label}
// //                     </Typography>
// //                     <Typography sx={{ color: "#0F172A", fontWeight: 500, fontSize: "0.85rem", flex: 1 }}>
// //                       : &nbsp;{item.value}
// //                     </Typography>
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             </Box>

// //             {/* Program Summary */}
// //             <Box sx={{ mb: 4, border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden" }}>
// //               <SectionHeader title="PROGRAM SUMMARY" icon={<AssignmentTurnedInIcon sx={{ fontSize: 18 }} />} />
// //               <Typography sx={{ p: 2, pt: 1, color: "#334155", fontSize: "0.85rem", lineHeight: 1.6 }}>
// //                 This report certifies that the above-mentioned student successfully participated in the Inacademic Internship Program
// //                 and completed the assigned learning modules, assessments, and practical tasks through the Tiiron LMS platform.
// //                 The evaluation has been conducted based on the student's performance, participation, consistency,
// //                 technical understanding, and completion of assigned work throughout the program.
// //               </Typography>
// //             </Box>

// //             {/* Performance + Skills */}
// //             <Grid container spacing={3} sx={{ mb: 4 }}>
// //               <Grid item xs={12} md={6}>
// //                 <Box sx={{ border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden", height: "100%" }}>
// //                   <SectionHeader title="PERFORMANCE EVALUATION" />
// //                   <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1, borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
// //                     <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>EVALUATION CRITERIA</Typography>
// //                     <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>SCORE (OUT OF 10)</Typography>
// //                   </Box>
// //                   {selectedCert.scores.map((row, idx) => (
// //                     <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1, borderBottom: "1px solid #F1F5F9" }}>
// //                       <Typography sx={{ fontSize: "0.8rem", color: "#334155", fontWeight: 500 }}>{row.label}</Typography>
// //                       <Typography sx={{ fontSize: "0.8rem", color: "#0F172A", fontWeight: 700 }}>{row.score}</Typography>
// //                     </Box>
// //                   ))}
// //                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0A2B5C", px: 2, py: 1.5 }}>
// //                     <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF !important" }}>OVERALL PERFORMANCE</Typography>
// //                     <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF !important" }}>{selectedCert.overall}</Typography>
// //                   </Box>
// //                 </Box>
// //               </Grid>

// //               <Grid item xs={12} md={6}>
// //                 <Box sx={{ border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
// //                   <SectionHeader title="SKILLS DEMONSTRATED" />
// //                   <Box sx={{ px: 2, flex: 1, position: "relative" }}>
// //                     {selectedCert.skills.map((skill, idx) => (
// //                       <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
// //                         <CheckCircleIcon sx={{ fontSize: 16, color: "#0A2B5C" }} />
// //                         <Typography sx={{ fontSize: "0.82rem", color: "#334155", fontWeight: 500 }}>{skill}</Typography>
// //                       </Box>
// //                     ))}
// //                     <Box sx={{ position: "absolute", bottom: 10, right: 15, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
// //                       <Box component="img" src="/assets/gold_certified_badge.png" alt="Certified Badge" sx={{ width: 65, height: 65, mb: 0.5, objectFit: "contain" }} />
// //                       <Typography sx={{ fontSize: "0.75rem", fontWeight: 900, color: "#1E293B", lineHeight: 1.1 }}>
// //                         CERTIFIED<br />STUDENT
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   <Box sx={{ p: 2, borderTop: "1px solid #E2E8F0", textAlign: "center" }}>
// //                     <Typography variant="caption" sx={{ fontWeight: 800, color: "#475569", display: "block", mb: 1, letterSpacing: 0.5 }}>
// //                       FINAL ASSESSMENT
// //                     </Typography>
// //                     <Box sx={{ background: "#D63B1F", color: "#fff", py: 1, px: 3, borderRadius: "4px", fontWeight: 900, fontSize: "1.2rem", display: "inline-block", letterSpacing: 1, boxShadow: "0 2px 8px rgba(214,59,31,0.3)" }}>
// //                       {selectedCert.assessment}
// //                     </Box>
// //                     <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mt: 1, color: "#0A2B5C" }}>
// //                       <StarIcon fontSize="inherit" /><StarIcon fontSize="inherit" /><StarIcon fontSize="inherit" />
// //                     </Box>
// //                   </Box>
// //                 </Box>
// //               </Grid>
// //             </Grid>

// //             {/* Mentor Remarks */}
// //             <Box sx={{ mb: 4, border: "1px solid #E2E8F0", borderRadius: "6px", overflow: "hidden" }}>
// //               <SectionHeader title="MENTOR REMARKS" />
// //               <Box sx={{ p: 2, pt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                 <Typography sx={{ color: "#475569", fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.6, pr: 8 }}>
// //                   "{selectedCert.studentName} has shown excellent consistency and dedication throughout the program. He completed all assigned tasks
// //                   on time with high quality and demonstrated a strong understanding of full stack development concepts.
// //                   His problem-solving approach and eagerness to learn are truly commendable."
// //                 </Typography>
// //                 <Box component="img" src="/assets/tiiron_seal.png" alt="Tiiron Seal" sx={{ width: 60, height: 60, objectFit: "contain", opacity: 0.8 }} />
// //               </Box>
// //             </Box>

// //             {/* Verification */}
// //             <Box sx={{ border: "1px solid #CBD5E1", borderRadius: "6px", p: 2, background: "#F8FAFC", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 5 }}>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, minWidth: "280px" }}>
// //                 <WorkspacePremiumIcon sx={{ fontSize: 42, color: "#0F172A" }} />
// //                 <Typography sx={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.5 }}>
// //                   This student has successfully completed the assigned tasks and internal evaluation requirements of the Internship Program and is eligible for the Internship Completion Certificate.
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ textAlign: { xs: "left", sm: "right" }, borderLeft: { sm: "2px solid #E2E8F0" }, pl: { sm: 3 } }}>
// //                 <Typography variant="caption" sx={{ fontWeight: 700, color: "#64748B", display: "block" }}>VERIFICATION ID</Typography>
// //                 <Typography sx={{ fontWeight: 800, color: "#D63B1F", fontSize: "1rem", my: 0.2 }}>{selectedCert.verificationId}</Typography>
// //                 <Typography variant="caption" sx={{ color: "#0A2B5C", textDecoration: "underline", cursor: "pointer" }}>www.inacademic.in/verify</Typography>
// //               </Box>
// //             </Box>

// //             {/* Signatures */}
// //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mb: 4, mt: 2 }}>
// //               <Box sx={{ textAlign: "center" }}>
// //                 <Typography sx={{ fontFamily: "cursive", color: "#475569", fontSize: "1.1rem", mb: 0.5 }}>Priya M.</Typography>
// //                 <Divider sx={{ width: "140px", mb: 0.5 }} />
// //                 <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#0F172A" }}>{selectedCert.mentorName}</Typography>
// //                 <Typography sx={{ fontSize: "0.7rem", color: "#64748B" }}>Mentor</Typography>
// //               </Box>
// //               <Box component="img" src="/assets/tiiron_seal.png" alt="Official Seal" sx={{ width: 55, height: 55, objectFit: "contain" }} />
// //               <Box sx={{ textAlign: "center" }}>
// //                 <Typography sx={{ fontFamily: "cursive", color: "#475569", fontSize: "1.1rem", mb: 0.5 }}>Coordinator</Typography>
// //                 <Divider sx={{ width: "140px", mb: 0.5 }} />
// //                 <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#0F172A" }}>Program Coordinator</Typography>
// //                 <Typography sx={{ fontSize: "0.7rem", color: "#64748B" }}>Inacademic</Typography>
// //               </Box>
// //             </Box>

// //             {/* Footer */}
// //             <Box sx={{ background: "#0A2B5C", color: "#fff", mx: { xs: -2, sm: -4 }, mb: { xs: -2, sm: -4 }, p: 1.5, display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", gap: 1 }}>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.75rem" }}><LanguageIcon fontSize="inherit" /> www.inacademic.in</Box>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.75rem" }}><EmailIcon fontSize="inherit" /> contact@inacademic.com</Box>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.75rem" }}><LocationOnIcon fontSize="inherit" /> Tiiron Technologies Pvt. Ltd. India</Box>
// //             </Box>
// //           </Paper>
// //         </Grid>

// //         {/* ── RIGHT: Control Panel ── */}
// //         <Grid item xs={12} lg={3.5}>
// //           <Box sx={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 3 }}>
// //             <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, background: "#FFF", border: "1px solid #E2E8F0" }}>
// //               <Typography variant="subtitle2" sx={{ color: "#64748B", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", mb: 2 }}>
// //                 Quick Summary
// //               </Typography>
// //               {[
// //                 { label: "Student", value: selectedCert.studentName },
// //                 { label: "Enrollment ID", value: selectedCert.enrollmentId },
// //                 { label: "Track", value: selectedCert.internshipTrack },
// //                 { label: "Overall Score", value: selectedCert.overall },
// //               ].map(({ label, value }) => (
// //                 <Box key={label} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #F1F5F9" }}>
// //                   <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 500 }}>{label}</Typography>
// //                   <Typography variant="caption" sx={{ fontWeight: 700, color: "#0F172A", textAlign: "right", maxWidth: "65%" }}>{value}</Typography>
// //                 </Box>
// //               ))}
// //               <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
// //                 <Chip
// //                   label={selectedCert.assessment}
// //                   size="medium"
// //                   icon={<VerifiedIcon style={{ color: "#fff" }} />}
// //                   sx={{ background: "#D63B1F", color: "#fff", fontWeight: 800, px: 1 }}
// //                 />
// //               </Box>
// //             </Paper>

// //             <Button
// //               variant="contained"
// //               fullWidth
// //               size="large"
// //               startIcon={<DownloadIcon />}
// //               onClick={() => handleGenerate(selectedCert)}
// //               disabled={isGenerating}
// //               sx={{
// //                 background: "#0A2B5C", borderRadius: "8px", textTransform: "none",
// //                 fontWeight: 700, py: 1.8, fontSize: "0.95rem",
// //                 boxShadow: "0 4px 12px rgba(10,43,92,0.2)",
// //                 "&:hover": { background: "#061B3A" },
// //               }}
// //             >
// //               {isGenerating ? "Generating Document..." : "Download Official Report"}
// //             </Button>

// //             <Button
// //               variant="outlined"
// //               fullWidth
// //               startIcon={<ArrowBackIcon />}
// //               onClick={() => setSelectedCert(null)}
// //               sx={{
// //                 borderColor: "#0A2B5C", color: "#0A2B5C", borderRadius: "8px",
// //                 textTransform: "none", fontWeight: 600,
// //                 "&:hover": { background: "#EEF2FF" },
// //               }}
// //             >
// //               All Certificates
// //             </Button>
// //           </Box>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // }




import { useState, useEffect } from "react";
import { Box, Typography, Button, Skeleton, Chip, Grid, Paper, Divider, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import StarIcon from "@mui/icons-material/Star";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"; 
import LockIcon from "@mui/icons-material/Lock";
import jsPDF from "jspdf";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CertificateData {
  studentName: string;
  enrollmentId: string;
  internshipTrack: string;
  college: string;
  duration: string;
  evaluationDate: string;
  mentorName: string;
  batch: string;
  scores: { label: string; score: string }[];
  overall: string;
  assessment: string;
  verificationId: string;
  skills: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MOCK_CERT: CertificateData = {
  studentName: "Rahul Sharma",
  enrollmentId: "INA-FSWD-250318",
  internshipTrack: "Full Stack Web Development",
  college: "ABC Institute of Technology",
  duration: "3rd March 2025 – 3rd June 2025",
  evaluationDate: "4th June 2025",
  mentorName: "Priya Mehrotra",
  batch: "FSWD-MAR25-B1",
  scores: [
    { label: "Attendance & Consistency", score: "9.0 / 10" },
    { label: "Task Completion", score: "9.5 / 10" },
    { label: "Technical Knowledge", score: "8.5 / 10" },
    { label: "Problem Solving Ability", score: "8.5 / 10" },
    { label: "Code Quality / Deliverables", score: "9.0 / 10" },
    { label: "Communication & Collaboration", score: "8.5 / 10" },
    { label: "Learning Attitude", score: "9.0 / 10" },
  ],
  overall: "8.9 / 10",
  assessment: "EXCELLENT",
  verificationId: "INA-EVAL-2025-00125",
  skills: [
    "Technical Skills",
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Time Management",
    "Professional Conduct",
    "Product Development Understanding",
  ],
};

// 2. generateEvaluationPDF function add kar component se bahar
function generateEvaluationPDF(cert: CertificateData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const pad = 16;
  let y = 0;

  doc.setFillColor(26, 43, 74);
  doc.rect(0, 0, W, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INACADEMIC", W / 2, 11, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("INTERNSHIP PROGRAM", W / 2, 17, { align: "center" });
  doc.setFontSize(7);
  doc.text("Tiiron Technologies Pvt. Ltd.", W - pad, 11, { align: "right" });
  doc.text("www.inacademic.in", W - pad, 16, { align: "right" });

  y = 38;
  doc.setTextColor(26, 43, 74);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("INTERNAL EVALUATION REPORT", W / 2, y, { align: "center" });
  doc.setDrawColor(214, 59, 31);
  doc.setLineWidth(0.8);
  doc.line(pad, y + 4, W - pad, y + 4);

  y = 52;
  doc.setFillColor(26, 43, 74);
  doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("STUDENT INFORMATION", pad + 4, y + 5.5);

  y += 12;
  const infoLeft: [string, string][] = [
    ["Student Name", cert.studentName],
    ["Internship Track", cert.internshipTrack],
    ["College / University", cert.college],
    ["Duration", cert.duration],
  ];
  const infoRight: [string, string][] = [
    ["Enrollment ID", cert.enrollmentId],
    ["Evaluation Date", cert.evaluationDate],
    ["Mentor Name", cert.mentorName],
    ["Batch", cert.batch],
  ];

  doc.setFontSize(8.5);
  infoLeft.forEach(([label, value], i) => {
    const rowY = y + i * 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(label, pad + 2, rowY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    doc.text(`: ${value}`, pad + 38, rowY);
  });
  infoRight.forEach(([label, value], i) => {
    const rowY = y + i * 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(label, W / 2 + 4, rowY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    doc.text(`: ${value}`, W / 2 + 34, rowY);
  });

  y += 38;
  doc.setFillColor(26, 43, 74);
  doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("PERFORMANCE EVALUATION", pad + 4, y + 5.5);

  y += 12;
  doc.setFillColor(240, 242, 245);
  doc.rect(pad, y, W / 2 - pad - 4, 6, "F");
  doc.setTextColor(26, 43, 74);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("EVALUATION CRITERIA", pad + 2, y + 4);
  doc.text("SCORE", pad + (W / 2 - pad - 4) - 18, y + 4);
  y += 6;

  cert.scores.forEach(({ label, score }, i) => {
    const rowY = y + i * 8;
    if (i % 2 === 1) {
      doc.setFillColor(248, 249, 251);
      doc.rect(pad, rowY, W / 2 - pad - 4, 8, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(8);
    doc.text(label, pad + 2, rowY + 5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(214, 59, 31);
    doc.text(score, pad + (W / 2 - pad - 4) - 20, rowY + 5);
  });

  y += cert.scores.length * 8;
  doc.setFillColor(26, 43, 74);
  doc.rect(pad, y, W / 2 - pad - 4, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("OVERALL PERFORMANCE", pad + 2, y + 6);
  doc.setTextColor(255, 255, 255);
  doc.text(cert.overall, pad + (W / 2 - pad - 4) - 24, y + 6);

  // Skills (right side)
  const assessX = W / 2 + 4;
  const assessW = W / 2 - pad - 4;
  let ay = y - cert.scores.length * 8 - 18;

  doc.setFillColor(26, 43, 74);
  doc.roundedRect(assessX, ay, assessW, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("SKILLS DEMONSTRATED", assessX + 4, ay + 5.5);
  ay += 12;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  cert.skills.forEach((skill, i) => {
    doc.setTextColor(214, 59, 31);
    doc.text("✓", assessX + 4, ay + i * 7);
    doc.setTextColor(50, 50, 50);
    doc.text(skill, assessX + 10, ay + i * 7);
  });

  // Final Assessment badge
  ay += cert.skills.length * 7 + 6;
  doc.setFillColor(214, 59, 31);
  doc.roundedRect(assessX + 6, ay, assessW - 12, 14, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(cert.assessment, assessX + assessW / 2, ay + 10, { align: "center" });

  // Mentor Remarks
  y += 18;
  doc.setFillColor(26, 43, 74);
  doc.roundedRect(pad, y, W - pad * 2, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("MENTOR REMARKS", pad + 4, y + 5.5);
  y += 12;
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(50, 50, 50);
  const remarks = doc.splitTextToSize(
    `${cert.studentName} has shown excellent consistency and dedication throughout the program. He completed all assigned tasks on time with high quality and demonstrated a strong understanding of full stack development concepts. His problem-solving approach and eagerness to learn are truly commendable.`,
    W - pad * 2 - 4
  );
  doc.text(remarks, pad + 2, y);
  y += remarks.length * 4.5 + 6;

  // Verification
  doc.setFillColor(248, 249, 251);
  doc.roundedRect(pad, y, W - pad * 2, 22, 3, 3, "F");
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.roundedRect(pad, y, W - pad * 2, 22, 3, 3, "S");
  const verText = doc.splitTextToSize(
    `This student has successfully completed the assigned tasks and internal evaluation requirements of the Internship Program and is eligible for the Internship Completion Certificate.`,
    W - pad * 2 - 60
  );
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  doc.text(verText, pad + 4, y + 7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 43, 74);
  doc.text("VERIFICATION ID", W - pad - 40, y + 6);
  doc.setTextColor(214, 59, 31);
  doc.setFontSize(9);
  doc.text(cert.verificationId, W - pad - 40, y + 12);
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  doc.text("www.inacademic.in/verify", W - pad - 40, y + 17);

  // Footer
  doc.setFillColor(26, 43, 74);
  doc.rect(0, H - 14, W, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text("www.inacademic.in", pad, H - 6);
  doc.text("contact@inacademic.com", W / 2, H - 6, { align: "center" });
  doc.text("Tiiron Technologies Pvt. Ltd., India", W - pad, H - 6, { align: "right" });

  doc.save(`Evaluation_${cert.studentName.replace(" ", "_")}_${cert.enrollmentId}.pdf`);
}

export default function CourseCertificate() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 400));
    generateEvaluationPDF(MOCK_CERT);
    setIsGenerating(false);
  };

  const SectionHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
    <Box
      sx={{
        background: "#0A2B5C",
        color: "#fff",
        px: 2,
        py: 0.8,
        borderRadius: "4px 4px 0 0",
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
      }}
    >
      {icon}
      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: 0.5 }}>
        {title}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, background: "#F1F5F9", minHeight: "60vh" }}>
      <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
        
        {/* ─── LEFT SIDE: PREVIEW DESIGN ─── */}
        <Grid item xs={12} lg={8.5}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={450} sx={{ borderRadius: 2 }} animation="wave" />
          ) : (
            <Box sx={{ position: "relative" }}>
              {/* Preview Overlay with Gradient Blur */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0.35) 100%)",
                  borderRadius: "8px",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              
              {/* Preview Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 16,
                  background: "#0A2B5C",
                  color: "#fff",
                  px: 2.5,
                  py: 0.6,
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                }}
              >
                <LockIcon sx={{ fontSize: 14 }} />
                PREVIEW
              </Box>

              <Paper
                elevation={4}
                sx={{
                  background: "#fff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                  position: "relative",
                  p: { xs: 2, sm: 4 },
                  fontFamily: "Inter, sans-serif",
                  height: "450px",
                  maxHeight: "4500px",
                  overflowY: "hidden",
                }}
              >
                {/* Top Red-Accent Border Line */}
                <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#D63B1F" }} />

                {/* Branding Logos Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                    mb: 4,
                  }}
                >
                  {/* Left: Inacademic Logo */}
                  <Box
                    component="img"
                    src="/Inacademic_Logo.png"
                    alt="Inacademic Logo"
                    sx={{
                      width: 130,
                      height: "auto",
                      display: "block",
                    }}
                  />

                  {/* Center: Title */}
                  <Box sx={{ textAlign: "center", lineHeight: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        color: "rgb(11, 85, 196)",
                        fontSize: "2.1rem",
                        letterSpacing: 2,
                        lineHeight: 1.2,
                      }}
                    >
                      INACADEMIC
                    </Typography>

                    {/* Decorative lines around subtitle */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.5,
                      }}
                    >
                      <Box sx={{ height: "1px", width: 28, background: "#94A3B8" }} />
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          letterSpacing: 3,
                          color: "#64748B",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        INTERNSHIP PROGRAM
                      </Typography>
                      <Box sx={{ height: "1px", width: 28, background: "#94A3B8" }} />
                    </Box>
                  </Box>

                  {/* Right: Tiiron Logo */}
                  <Box
                    component="img"
                    src="/Tiiron_Technologies_Logo.png"
                    alt="Tiiron Logo"
                    sx={{
                      width: 130,
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Box>

                {/* Title Section */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#0A2B5C", letterSpacing: 1 }}>
                    INTERNAL EVALUATION REPORT
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, color: "#D63B1F" }}>
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
        </Grid>

        {/* ─── RIGHT SIDE: CONTROL PANEL ─── */}
        <Grid item xs={12} lg={3.5}>
          <Box sx={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 3 }}>
            {!isLoading && (
              <>
                <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, background: "#FFF", border: "1px solid #E2E8F0" }}>
                  <Typography variant="subtitle2" sx={{ color: "#64748B", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", mb: 2 }}>
                    Quick Summary
                  </Typography>

                  {[
                    { label: "Student", value: MOCK_CERT.studentName },
                    { label: "Enrollment ID", value: MOCK_CERT.enrollmentId },
                    { label: "Track", value: MOCK_CERT.internshipTrack },
                    { label: "Overall Score", value: MOCK_CERT.overall },
                  ].map(({ label, value }) => (
                    <Box key={label} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #F1F5F9" }}>
                      <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 500 }}>{label}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "#0F172A", textAlign: "right", maxWidth: "65%" }}>
                        {value}
                      </Typography>
                    </Box>
                  ))}

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <Chip
                      label={MOCK_CERT.assessment}
                      size="medium"
                      icon={<VerifiedIcon style={{ color: "#fff" }} />}
                      sx={{ background: "#D63B1F", color: "#fff", fontWeight: 800, px: 1 }}
                    />
                  </Box>
                </Paper>

                <Tooltip title="Complete the course to download certificate" arrow>
                  <Box>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<LockIcon />}
                      disabled
                      sx={{
                        background: "#CBD5E1",
                        color: "#64748B",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 700,
                        py: 1.8,
                        fontSize: "0.95rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        cursor: "not-allowed",
                        "&:hover": { background: "#CBD5E1" },
                      }}
                    >
                      Download Official Report
                    </Button>
                  </Box>
                </Tooltip>

                {/* Info Text */}
                <Paper elevation={0} sx={{ p: 2, background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 2 }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#92400E", lineHeight: 1.5 }}>
                    📌 <strong>Complete the course</strong> to unlock and download your official evaluation certificate.
                  </Typography>
                </Paper>
              </>
            )}
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}