
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