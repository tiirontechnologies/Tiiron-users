
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import LockIcon from "@mui/icons-material/Lock";
import jsPDF from "jspdf";
import CertificateUnavailableState from "./CertificateUnavailableState";
import CertificateLoadingState from "./CertificateLoadingState";
import {
  useGetCourseByIdQuery,
  useGetLoggedInUserQuery,
  useGetCourseProgressQuery,
} from "@features/course-glossary/api/courseApi";
import {
  useGenerateCourseCertificateMutation,
  useGetCourseCertificateTemplateQuery,
  useGetGeneratedCourseCertificateQuery,
} from "../api/certificateApi";
import type { CertificateTemplate, CourseCertificateProps, GeneratedCertificate } from "../types/certificate.types";
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
const STATIC_SKILLS = [
  "Technical Skills",
  "UI Implementation",
  "Responsive Design",
  "Component Architecture",
  "Problem Solving",
  "Team Collaboration",
  "Communication",
];

interface CertificateData {
  studentName: string;
  enrollmentId: string;
  internshipTrack: string;
  college: string;
  duration: string;
  evaluationDate: string;
  mentorName: string;
  mentorSignature?: string;
  directorSignature?: string;
  stamp?: string;
  email?: string;
  website?: string;
  address?: string;
  organizationName?: string;
  organizationLogo?: string;
  batch: string;
  scores: { label: string; score: string; icon: ReactNode }[];
  overall: string;
  assessment: string;
  verificationId: string;
  skills: string[];
  remarks: string;
  programSummary: string;
}

function formatOrdinalDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// 🆕 Enrollment ID ab locally generate hoti hai — backend ke certificateId (TTINT...) se
// koi lena dena nahi. Format: TT + courseCode + year + zero-padded userId
// e.g. TTFSWD2026000123
function scoreLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function getAssessment(overallScore: string) {
  const score = Number(overallScore);
  if (!Number.isFinite(score)) return { label: "", stars: 0 };
  if (score >= 8.5) return { label: "EXCELLENT", stars: 5 };
  if (score >= 7) return { label: "VERY GOOD", stars: 3 };
  return { label: "GOOD", stars: 2 };
}

function getApiErrorStatus(error: unknown): number | undefined {
  return typeof error === "object" && error !== null && "status" in error && typeof error.status === "number"
    ? error.status
    : undefined;
}

function formatEnrollmentId(record: GeneratedCertificate): string {
  const organization = record.course?.createdBy?.trim() || record.course?.orgCode?.trim() || record.student?.orgCode?.trim();
  const courseTitle = record.course?.title?.trim();
  const enrollmentId = record.enrollmentId;

  if (!organization || !courseTitle || enrollmentId === undefined || enrollmentId === null) return "";

  return `${organization.slice(0, 3).toUpperCase()}-${courseTitle.slice(0, 2).toUpperCase()}-${String(enrollmentId).padStart(4, "0")}`;
}

function buildLockedPreview(template: CertificateTemplate, course: any): CertificateData {
  const duration = template.startDate && template.endDate
    ? `${formatOrdinalDate(new Date(template.startDate))} - ${formatOrdinalDate(new Date(template.endDate))}`
    : "";
  const previewScores = [
    ["Technical Skills", "8.5"],
    ["UI Implementation", "8.0"],
    ["Responsive Design", "8.5"],
    ["Component Architecture", "8.0"],
    ["Problem Solving", "9.0"],
    ["Team Collaboration", "8.5"],
    ["Communication", "8.0"],
  ];
  return {
    studentName: "", enrollmentId: "", internshipTrack: course?.title?.toLocaleUpperCase() ?? "",
    college: "", duration, evaluationDate: "", mentorName: course?.instructor ?? "",
    mentorSignature: template.mentorSignature ?? undefined,
    directorSignature: template.directorSignature ?? undefined,
    stamp: template.stamp ?? undefined,
    email: template.email ?? undefined, website: template.website ?? undefined,
    address: template.address ?? undefined, batch: template.batchId ?? "",
    scores: previewScores.map(([label, score]) => ({ label, score, icon: <AssignmentIcon sx={{ fontSize: 18, color: COLORS.textSecondary }} /> })),
    overall: "8.4", assessment: "VERY GOOD", verificationId: "",
    skills: STATIC_SKILLS,
    remarks: template.mentorRemark ?? "", programSummary: template.programSummary ?? "",
    organizationName: course?.createdBy?.trim() || undefined,
    organizationLogo: course?.createdByUser?.profile?.picture || undefined,
  };
}

function buildCertificateData(record: GeneratedCertificate): CertificateData {
  const template = record.templateDetails ?? record.template;
  const student = record.studentDetails ?? record.student;

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

  // duration ab API ke startDate/endDate se, warna fallback static
  const duration = template?.startDate && template?.endDate
    ? `${formatOrdinalDate(new Date(template.startDate))} - ${formatOrdinalDate(new Date(template.endDate))}`
    : "";
  const scoreEntries = Object.entries(record.scorecard ?? {});

  // evaluation date hamesha aaj ki date (now)
  // 🆕 enrollment ID ka year: agar apiCert hai to uske startDate ka year, warna current year
  return {
    studentName: `${student?.firstName ?? ""} ${student?.lastName ?? ""}`.trim(),
    // 🆕 enrollmentId ab locally generated — backend certificateId isse touch nahi karta
    enrollmentId: formatEnrollmentId(record),
    internshipTrack: record.course?.title?.toLocaleUpperCase() ?? "",
    college: record.studentDetails?.collegeName ?? record.student?.profile?.collage ?? "",
    duration,
    evaluationDate: record.issuedAt ? formatOrdinalDate(new Date(record.issuedAt)) : "",
    mentorName: record.course?.instructor ?? "",
    mentorSignature: template?.mentorSignature ?? undefined,
    directorSignature: template?.directorSignature ?? undefined,
    stamp: template?.stamp ?? undefined,
    email: template?.email || undefined,
    website: template?.website || undefined,
    address: template?.address || undefined,
    organizationName: record.course?.createdBy?.trim() || undefined,
    organizationLogo: record.course?.organizationLogo || record.course?.orgLogo || undefined,
    batch: template?.batchId ?? "",
    scores: scoreEntries.map(([label, score], index) => ({
      label: scoreLabel(label),
      score: score === null ? "" : String(score),
      icon: icons[index] ?? <AssignmentIcon sx={iconStyle} />,
    })),
    overall: record.overallScore === undefined ? "" : String(record.overallScore),
    assessment: record.grade ?? "",
    // verificationId hamesha backend ke certificateId se hi aata hai — ye untouched hai
    verificationId: record.verificationId ?? "",
    skills: STATIC_SKILLS,
    remarks: template?.mentorRemark ?? "",
    programSummary: template?.programSummary ?? "",
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
    }),
  ).then(() => undefined);
}

async function preloadImage(src: string) {
  const image = new Image();
  image.src = src;
  await image.decode().catch(() => undefined);
}

async function generatePDFFromNode(node: HTMLElement, cert: CertificateData) {
  await document.fonts.ready;
  await Promise.all(
    [cert.mentorSignature, cert.directorSignature, cert.stamp]
      .filter((src): src is string => Boolean(src))
      .map(preloadImage),
  );
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

const PillSectionHeader = ({
  title,
  icon,
}: {
  title: string;
  icon?: ReactNode;
}) => (
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
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        color: "#fff",
        "& svg": { color: "#fff", fill: "#fff" },
      }}
    >
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

const InlineSectionHeader = ({
  title,
  icon,
}: {
  title: string;
  icon?: ReactNode;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "9px", mb: "7px" }}>
    {icon}
    <Typography
      sx={{
        fontWeight: 900,
        fontSize: "0.86rem",
        color: COLORS.textPrimary,
        textTransform: "uppercase",
      }}
    >
      {title}
    </Typography>
  </Box>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "140px 14px 1fr",
      alignItems: "start",
      py: "3.5px",
    }}
  >
    <Typography
      sx={{ fontWeight: 800, color: COLORS.textPrimary, fontSize: "0.76rem" }}
    >
      {label}
    </Typography>
    <Typography
      sx={{ fontWeight: 800, color: COLORS.textPrimary, fontSize: "0.76rem" }}
    >
      :
    </Typography>
    <Typography
      sx={{
        fontWeight: 600,
        color: COLORS.textSecondary,
        fontSize: "0.76rem",
        lineHeight: 1.25,
      }}
    >
      {value}
    </Typography>
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

const CertificateHeader = ({ cert }: { cert: CertificateData }) => (
  <Box sx={{ mb: "8px" }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Box sx={{ height: 80, width: 160, flexShrink: 0 }}>
        {cert.organizationLogo && <Box component="img" src={cert.organizationLogo} alt={`${cert.organizationName ?? "Organization"} Logo`} crossOrigin="anonymous" sx={{ height: 82, width: 150, objectFit: "contain", objectPosition: "left center" }} />}
      </Box>
      <Box sx={{ textAlign: "center", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <SchoolIcon
          sx={{ color: COLORS.primaryBlue, fontSize: 18, mb: "2px" }}
        />
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: "1.35rem",
            letterSpacing: "0.22px",
            lineHeight: 0.98,
            color: `${COLORS.primaryBlue} !important`,
            WebkitTextFillColor: COLORS.primaryBlue,
            maxWidth: "420px",
            wordBreak: "break-word",
            textTransform: "uppercase",
            m: 0,
          }}
        >
          <Box component="span" sx={{ display: "block" }}>
            Internal
          </Box>
          <Box component="span" sx={{ display: "block" }}>
            Evaluation Report
          </Box>
        </Typography>
      </Box>
      <Box component="img" src="/Tiiron_logo.png" alt="Tiiron LMS Logo" crossOrigin="anonymous" 
      sx={{ height: 80, width: 160, objectFit: "contain", objectPosition: "right center", flexShrink: 0 }} />
    </Box>
  </Box>
);

function CertificateBody({ cert }: { cert: CertificateData }) {

  const mentorSignature = cert.mentorSignature;
  const officialStamp = cert.stamp;
  const directorSignature = cert.directorSignature;
  const assessment = getAssessment(cert.overall);
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
      <Box
        sx={{
          position: "absolute",
          inset: "14px 10px 46px 10px",
          border: `4px solid ${COLORS.accentRed}`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 76,
          height: 76,
          bgcolor: COLORS.darkNavy,
          clipPath: "polygon(0 0, 72% 0, 0 72%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 98,
          height: 98,
          bgcolor: COLORS.accentRed,
          clipPath: "polygon(100% 0, 100% 100%, 18% 100%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 72,
          height: 72,
          bgcolor: COLORS.darkNavy,
          clipPath: "polygon(100% 0, 100% 100%, 20% 100%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          px: "42px",
          pt: "28px",
          pb: "48px",
        }}
      >
        <CertificateHeader cert={cert} />

        <Card sx={{ p: 0, mb: "10px" }}>
          <PillSectionHeader
            title="Student Information"
            icon={<PersonOutlineIcon sx={{ fontSize: 20, color: "#fff" }} />}
          />
          <Grid container sx={{ px: "16px", py: "8px" }}>
            <Grid
              item
              xs={6}
              sx={{ borderRight: `1px solid ${COLORS.border}`, pr: "18px" }}
            >
              <InfoRow label="Student Name" value={cert.studentName} />
              <InfoRow label="Training Program" value={cert.internshipTrack} />
              <InfoRow label="College / University" value={cert.college  || "N/A"}  />
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
          <InlineSectionHeader
            title="Program Summary"
            icon={
              <AssignmentIcon
                sx={{ fontSize: 19, color: COLORS.textPrimary }}
              />
            }
          />
          <Typography
            sx={{
              fontSize: "0.76rem",
              color: COLORS.textPrimary,
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            {cert.programSummary}
          </Typography>
        </Card>

        <Grid container spacing={2} sx={{ mb: "10px" }}>
          <Grid item xs={7}>
            <Box
              sx={{
                border: `1px solid ${COLORS.border}`,
                borderRadius: "9px",
                overflow: "hidden",
              }}
            >
              <PillSectionHeader
                title="Performance Evaluation"
                icon={<BarChartIcon sx={{ fontSize: 18, color: "#fff" }} />}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "54px 1fr 154px",
                  borderTop: `1px solid ${COLORS.border}`,
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <Box />
                <Typography
                  sx={{
                    py: "8px",
                    fontSize: "0.72rem",
                    fontWeight: 900,
                    color: COLORS.textPrimary,
                  }}
                >
                  EVALUATION CRITERIA
                </Typography>
                <Typography
                  sx={{
                    py: "8px",
                    fontSize: "0.72rem",
                    fontWeight: 900,
                    color: COLORS.textPrimary,
                    textAlign: "center",
                    borderLeft: `1px solid ${COLORS.border}`,
                  }}
                >
                  SCORE (OUT OF 10)
                </Typography>
              </Box>
              {cert.scores.map((row) => (
                <Box
                  key={row.label}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "54px 1fr 154px",
                    minHeight: 34,
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: `1px solid ${COLORS.border}`,
                    }}
                  >
                    {row.icon}
                  </Box>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: "12px",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {row.label}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderLeft: `1px solid ${COLORS.border}`,
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {row.score}
                  </Typography>
                </Box>
              ))}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 154px",
                  bgcolor: COLORS.darkNavy,
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    py: "9px",
                    pl: "54px",
                    fontSize: "0.82rem",
                    fontWeight: 900,
                    color: "#fff !important ",
                  }}
                >
                  OVERALL PERFORMANCE
                </Typography>
                <Typography
                  sx={{
                    py: "8px",
                    textAlign: "center",
                    fontSize: "1.22rem",
                    fontWeight: 950,
                    color: `${COLORS.accentRed} !important`,
                    borderLeft: `1px solid ${COLORS.border}`,
                  }}
                >
                  {cert.overall}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Card sx={{ p: 0, mb: "4px", overflow: "hidden" }}>
              <PillSectionHeader
                title="Skills Demonstrated"
                icon={<MilitaryTechIcon sx={{ fontSize: 18, color: "#fff" }} />}
              />
              <Box sx={{ px: "18px", py: "8px" }}>
                {cert.skills.map((skill) => (
                  <Box
                    key={skill}
                    sx={{ display: "flex", alignItems: "center", py: "4px" }}
                  >
                    <CheckCircleIcon
                      sx={{
                        fontSize: 14,
                        color: COLORS.textPrimary,
                        mr: "9px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: COLORS.textPrimary,
                      }}
                    >
                      {skill}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>

            <Card sx={{ textAlign: "center", py: "9px" }}>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  color: COLORS.textPrimary,
                  mb: "7px",
                }}
              >
                FINAL ASSESSMENT
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  mb: "6px",
                }}
              >
                <Typography
                  sx={{
                    color: COLORS.textPrimary,
                    fontSize: "1.45rem",
                    lineHeight: 1,
                  }}
                >
                  (
                </Typography>
                <Box
                  sx={{
                    bgcolor: COLORS.accentRed,
                    color: "#fff",
                    px: "22px",
                    py: "6px",
                    borderRadius: "9px",
                    fontWeight: 950,
                    fontSize: "1.1rem",
                    lineHeight: 1,
                  }}
                >
                  {assessment.label}
                </Box>
                <Typography
                  sx={{
                    color: COLORS.textPrimary,
                    fontSize: "1.45rem",
                    lineHeight: 1,
                  }}
                >
                  )
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#1261C9",
                  gap: "18px",
                }}
              >
                {Array.from({ length: assessment.stars }, (_, index) => (
                  <StarIcon key={index} sx={{ fontSize: 14, color: "#FACC15" }} />
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mb: "9px", px: "16px", py: "9px" }}>
          <InlineSectionHeader
            title="Mentor Remarks"
            icon={
              <ChatBubbleOutlineIcon
                sx={{ fontSize: 19, color: COLORS.textPrimary }}
              />
            }
          />
          <Typography
            sx={{
              fontSize: "0.72rem",
              color: COLORS.textPrimary,
              lineHeight: 1.35,
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            {cert.remarks}
          </Typography>
        </Card>

        <Card
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 238px",
            alignItems: "center",
            gap: "16px",
            px: "16px",
            py: "9px",
            mb: "8px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WorkspacePremiumIcon
              sx={{ fontSize: 48, color: COLORS.textPrimary, mr: "14px" }}
            />
            <Typography
              sx={{
                fontSize: "0.78rem",
                color: COLORS.textPrimary,
                lineHeight: 1.45,
                fontWeight: 500,
              }}
            >
              This student has successfully completed the assigned tasks and
              internal evaluation requirements of the Internship Program and is
              eligible for the Internship Completion Certificate.
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              borderLeft: `1px solid ${COLORS.border}`,
              pl: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.74rem",
                fontWeight: 900,
                color: COLORS.textPrimary,
                mb: "5px",
              }}
            >
              VERIFICATION ID
            </Typography>
            <Box
              sx={{
                bgcolor: COLORS.darkNavy,
                color: "#fff",
                px: "12px",
                py: "6px",
                borderRadius: "6px",
                fontWeight: 900,
                fontSize: "0.76rem",
                fontFamily: "monospace",
              }}
            >
              {cert.verificationId}
            </Box>
            <Typography
              sx={{
                fontSize: "0.64rem",
                color: COLORS.link,
                mt: "5px",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              You can verify this document at
              https://verify.tiirontechnologies.com/
            </Typography>
          </Box>
        </Card>

        <Box
          sx={{
            mt: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "end",
            px: "70px",
            pb: "4px",
            minHeight: 90,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              {mentorSignature && (
                <Box
                  component="img"
                  src={mentorSignature}
                  crossOrigin="anonymous"
                  alt={`${cert.mentorName} Signature`}
                  sx={{ height: 62, width: "auto", maxWidth: 150, objectFit: "contain", mx: "auto", mb: "-6px" }}
                />
              )}
              <Box sx={{ borderTop: `2px solid ${COLORS.textPrimary}`, pt: "5px" }}>
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 800 }}>{cert.mentorName}</Typography>
                <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>Mentor</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {officialStamp && (
              <Box
                component="img"
                src={officialStamp}
                crossOrigin="anonymous"
                alt="Official Stamp"
                loading="eager"
                decoding="sync"
                sx={{
                  width: 62,
                  height: 62,
                  objectFit: "contain",
                  display: "block",
                  mx: "auto",
                  mb: "2px",
                }}
              />
            )}
            <Typography
              sx={{
                fontSize: "0.62rem",
                color: COLORS.textPrimary,
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              This is a system generated report.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {directorSignature && (
              <Box
                component="img"
                src={directorSignature}
                crossOrigin="anonymous"
                alt="Director Signature"
                sx={{ height: 62, width: "auto", maxWidth: 150, objectFit: "contain", mx: "auto", mb: "-6px" }}
              />
            )}
            <Box sx={{ borderTop: `2px solid ${COLORS.textPrimary}`, pt: "5px" }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800 }}>Academic Director</Typography>
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>{cert.organizationName ?? ""}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.3fr",
          alignItems: "center",
          bgcolor: COLORS.darkNavy,
          color: "#fff",
          fontSize: "0.74rem",
          py: "9px",
          px: "100px 70px",
          gap: "18px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {cert.website && <><LanguageIcon sx={{ fontSize: 16 }} />{cert.website}</>}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {cert.email && <><EmailIcon sx={{ fontSize: 16 }} />{cert.email}</>}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {cert.address && <><LocationOnIcon sx={{ fontSize: 17 }} />{cert.address}</>}
        </Box>
      </Box>
    </Box>
  );
}

const DownloadButton = ({
  onClick,
  isGenerating,
  variant = "solid",
  disabled = false,
}: {
  onClick: () => void;
  isGenerating: boolean;
  variant?: "solid" | "compact";
  disabled?: boolean;
}) => {
  const compact = variant === "compact";
  return (
    <Button
      startIcon={disabled ? <LockIcon /> : <DownloadIcon />}
      onClick={onClick}
      disabled={isGenerating || disabled}
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
      {isGenerating
        ? "Generating..."
        : disabled
          ? "Locked"
          : compact
            ? "Download PDF"
            : "Download Report (PDF)"}
    </Button>
  );
};

const SkeletonBar = ({
  width = "100%",
  height = 14,
}: {
  width?: string | number;
  height?: number;
}) => (
  <Box
    sx={{
      width,
      height,
      borderRadius: "6px",
      background:
        "linear-gradient(90deg, #EEF2F6 25%, #E4E9F1 37%, #EEF2F6 63%)",
      backgroundSize: "400% 100%",
      animation: "shimmer 1.6s ease-in-out infinite",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0 50%" },
      },
    }}
  />
);

const CertificatePreviewCard = ({
  cert,
  onView,
  locked = false,
}: {
  cert: CertificateData;
  onView: () => void;
  locked?: boolean;
}) => (
  <Paper
    elevation={0}
    onClick={onView}
    sx={{
      cursor: "pointer",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "10px",
      p: { xs: "10px", sm: "16px" },
      bgcolor: COLORS.background,
      boxShadow: "0 1px 3px rgba(8,31,92,0.04)",
      "&:hover": { boxShadow: "0 4px 16px rgba(8,31,92,0.1)" },
    }}
  >
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: 180, sm: 220, md: 260, lg: 300 },
          height: { xs: 255, sm: 311, md: 368, lg: 424 },
          overflow: "hidden",
          borderRadius: "8px",
          border: `1px solid ${COLORS.border}`,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CERT_WIDTH,
            transformOrigin: "top left",
            pointerEvents: "none",
            filter: locked ? "blur(2.5px)" : "none",
            transform: {
              xs: "scale(0.2143)",
              sm: "scale(0.2619)",
              md: "scale(0.3095)",
              lg: "scale(0.3571)",
            },
          }}
        >
          <CertificateBody cert={cert} />
        </Box>
        {locked && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(255,255,255,0.55)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: "16px",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: "rgba(8,31,92,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: "8px",
              }}
            >
              <LockIcon sx={{ fontSize: 18, color: "#fff" }} />
            </Box>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: COLORS.textPrimary,
                lineHeight: 1.4,
              }}
            >
              Complete your course to unlock this report
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "16px",
        color: COLORS.textMuted,
      }}
    >
      <VisibilityIcon sx={{ fontSize: 16, mr: "8px" }} />
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700 }}>
        {locked ? "Preview only — complete your course first" : "Click to view full report"}
      </Typography>
    </Box>
  </Paper>
);
export default function CourseCertificate({
  courseId,
  courseName,
}: CourseCertificateProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const [isGenerating, setIsGenerating] = useState(false);
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
  const [downloadAfterPreviewOpen, setDownloadAfterPreviewOpen] =
    useState(false);
  const visiblePdfSourceRef = useRef<HTMLDivElement>(null);
  const generatedForRef = useRef<string | null>(null);

  const {
    data: userResponse,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetLoggedInUserQuery(undefined);
  const userData = userResponse?.data;
  const isAuthenticated = !isUserError && !!(userData?.profile?.userId ?? userData?.profile?.id);
  const { data: courseResponse } = useGetCourseByIdQuery(
    { id: Number(courseId) },
    { skip: !courseId },
  );
  const courseData = courseResponse?.data;
  const {
    data: templateResponse,
    isLoading: isTemplateLoading,
  } = useGetCourseCertificateTemplateQuery(Number(courseId), {
    skip: !courseId,
  });
  const certificateTemplate =
    templateResponse?.data ?? templateResponse?.certificate ?? null;
  const isTemplateAvailable = Boolean(certificateTemplate);

  // 🆕 Progress decides whether the certificate is unlocked (100% required)
  const {
    data: progressResponse,
    isLoading: isProgressLoading,
    isFetching: isProgressFetching,
    isError: isProgressError,
  } = useGetCourseProgressQuery(Number(courseId), {
    skip: !isAuthenticated || !courseId,
  });

  // API response shape: { success, data: { courseId, progress: { totalUnits, completedUnits, percentage }, score, units } }
  const progressPercent: number = progressResponse?.data?.progress?.percentage ?? 0;

  const isProgressResolved = !isProgressLoading && !isProgressFetching;
  const isCourseCompleted =
    isProgressResolved && !isProgressError && progressPercent >= 100;
  const isCourseLocked =
    !isAuthenticated || (isAuthenticated && isProgressResolved && (isProgressError || !isCourseCompleted));

  const {
    data: certResponse,
    error: certificateError,
    isLoading: isCertificateLoading,
    isFetching: isCertificateFetching,
  } = useGetGeneratedCourseCertificateQuery(Number(courseId), {
    skip: !isAuthenticated || !isTemplateAvailable || !isCourseCompleted || !courseId,
  });
  const [generateCourseCertificate, {
    data: generatedCertificateResponse,
    isError: isGenerateCertificateError,
  }] = useGenerateCourseCertificateMutation();
  const certificateRecord = generatedCertificateResponse?.data ?? certResponse?.data ?? null;
  const certificateErrorStatus = getApiErrorStatus(certificateError);
  const isNotEnrolled = certificateErrorStatus === 400;
  const isGeneratedCertificateMissing = certificateErrorStatus === 404;
  const isWaitingForGeneration = isGeneratedCertificateMissing && !certificateRecord && !isGenerateCertificateError;
  const isCertificateUnavailable =
    isAuthenticated && isCourseCompleted && !isCertificateLoading && !isCertificateFetching &&
    !isWaitingForGeneration && isTemplateAvailable && !certificateRecord;

  // If no issued certificate exists, create it once for the logged-in student.
  useEffect(() => {
    const generationKey = `${userData?.profile?.userId ?? userData?.profile?.id ?? ""}:${courseId}`;
    if (
      !isAuthenticated ||
      !isTemplateAvailable ||
      !isCourseCompleted ||
      !isGeneratedCertificateMissing ||
      generatedForRef.current === generationKey
    ) {
      return;
    }

    generatedForRef.current = generationKey;
    void generateCourseCertificate(Number(courseId));
  }, [
    courseId,
    generateCourseCertificate,
    isAuthenticated,
    isCourseCompleted,
    isGeneratedCertificateMissing,
    isTemplateAvailable,
    userData?.profile?.id,
    userData?.profile?.userId,
  ]);

  const cert = useMemo(() => {
    if (!certificateRecord) return null;
    const data = buildCertificateData(certificateRecord);
    return {
      ...data,
      organizationName: courseData?.createdBy?.trim() || data.organizationName,
      organizationLogo: courseData?.createdByUser?.profile?.picture || data.organizationLogo,
    };
  }, [
    certificateRecord,
    courseData?.createdBy,
    courseData?.createdByUser?.profile?.picture,
  ]);
  const previewCert = useMemo(() => {
    if (!certificateTemplate) return null;
    return buildLockedPreview(certificateTemplate, courseData);
  }, [certificateTemplate, courseData]);
  const displayCert = cert ?? previewCert;

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const handleViewFull = () => {
    if (!isAuthenticated) {
      setFullPreviewOpen(true);
      return;
    }
    // Locked hone par bhi preview dikhne do — sirf download block hai
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
    if (isCourseLocked) return;
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
  }, [
    downloadAfterPreviewOpen,
    fullPreviewOpen,
    cert,
    downloadVisibleCertificate,
  ]);

  if (
    isUserLoading ||
    isTemplateLoading ||
    (isAuthenticated && !isProgressResolved) ||
    (isAuthenticated && isCourseCompleted && isCertificateLoading) ||
    isWaitingForGeneration
  ) {
    return <CertificateLoadingState />;
  }

  if (isNotEnrolled) {
    return <CertificateUnavailableState courseName={courseName} title="You are not enrolled in this course" description="Enroll in this course and complete its practice to unlock your certificate." />;
  }

  if (isCertificateUnavailable || !displayCert) {
    return <CertificateUnavailableState courseName={courseName} />;
  }

  if (fullPreviewOpen && displayCert) {
    const scale = isMobile ? 0.42 : isTablet ? 0.65 : isLaptop ? 0.85 : 1;
    return (
      <Box sx={{ minHeight: "100vh", background: "#EEF2F6" }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            py: 2,
            background: COLORS.darkNavy,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setFullPreviewOpen(false)}
              sx={{
                color: "#fff",
                mr: "8px",
                "&:hover": { background: "rgba(255,255,255,0.08)" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              sx={{
                fontWeight: 800,
                color: "#fff !important",
                fontSize: { xs: "0.85rem", sm: "1rem" },
              }}
            >
              Internal Evaluation Report{!isMobile && " - Full Screen"}
            </Typography>
          </Box>
          <DownloadButton
            onClick={handleDownload}
            isGenerating={isGenerating}
            variant="compact"
            disabled={isCourseLocked}
          />
        </Box>

        {isCourseLocked && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              py: "10px",
              px: 2,
              bgcolor: "#FFF4E5",
              color: "#7A4A00",
              textAlign: "center",
            }}
          >
            <LockIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: "0.8rem", fontWeight: 700 }}>
              This is just a preview — complete your course 100% to unlock and download your real report.
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            py: { xs: 2, sm: 5 },
            px: { xs: 1, sm: 2 },
            display: "flex",
            justifyContent: "center",
            overflowX: "auto",
          }}
        >
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
              filter: isCourseLocked ? "blur(2.5px)" : "none",
              pointerEvents: isCourseLocked ? "none" : "auto",
            }}
          >
            <Box ref={visiblePdfSourceRef}>
              <CertificateBody cert={displayCert} />
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
          <CertificatePreviewCard
            cert={displayCert}
            onView={handleViewFull}
            locked={isCourseLocked}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "10px",
              background: "#fff",
              border: `1px solid ${COLORS.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: COLORS.textMuted,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Quick Summary
            </Typography>
            {isCourseLocked ? (
              <Typography sx={{ fontSize: "0.8rem", color: COLORS.textMuted, lineHeight: 1.5 }}>
                {isAuthenticated ? "Evaluation certificate locked. Complete your course to unlock your certificate." : "Log in to generate and unlock your certificate."}
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "0.8rem", color: COLORS.textMuted, lineHeight: 1.5 }}>
                Your issued certificate is ready to view and download.
              </Typography>
            )}
            <Button
              variant="outlined"
              fullWidth
              startIcon={<VisibilityIcon />}
              onClick={handleViewFull}
              sx={{
                mt: 2,
                borderColor: COLORS.primaryBlue,
                color: COLORS.primaryBlue,
                fontWeight: 800,
              }}
            >
              {isCourseLocked ? "Preview Certificate" : "View Full Certificate"}
            </Button>
            <DownloadButton
              onClick={handleDownload}
              isGenerating={isGenerating}
              variant="solid"
              disabled={isCourseLocked}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
