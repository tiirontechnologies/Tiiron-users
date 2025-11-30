import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import { ICourse } from "../../../types/course.types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";

interface CourseOverviewProps {
  course: ICourse | undefined;
}

export default function CourseOverview({ course }: CourseOverviewProps) {
  const description = course?.description || "No description available for this course.";

  // Split description into paragraphs for better readability
  const paragraphs = description.split("\n").filter((p) => p.trim().length > 0);

  return (
    <Box
      id="course-overview"
      sx={{
        width: "100%",
        pt: { xs: 3, md: 4 },
      }}
    >
      {/* Course Description */}
      <Box
        sx={{
          mb: { xs: 4, md: 5 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "18px", md: "20px", lg: "22px" },
            fontWeight: 600,
            color: "#0F172A",
            mb: 3,
          }}
        >
          About this course
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  fontSize: { xs: "15px", md: "16px", lg: "17px" },
                  color: "#475569",
                  lineHeight: 1.8,
                  wordBreak: "break-word",
                  textAlign: "justify",
                }}
              >
                {paragraph.trim()}
              </Typography>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", md: "16px", lg: "17px" },
                color: "#475569",
                lineHeight: 1.8,
                wordBreak: "break-word",
                textAlign: "justify",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: { xs: 4, md: 5 } }} />

      {/* Course Highlights */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "18px", md: "20px", lg: "22px" },
            fontWeight: 600,
            color: "#0F172A",
            mb: 3,
          }}
        >
          What you'll learn
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2, md: 3 },
          }}
        >
          {[
            "Master the fundamentals and advanced concepts",
            "Build real-world projects and applications",
            "Learn from industry experts with years of experience",
            "Get lifetime access to course materials and updates",
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 2,
                borderRadius: 2,
                bgcolor: "#FBF8FF",
                border: "1px solid #F1E5FF",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#F1E5FF",
                  borderColor: "#4F39F6",
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: "#4F39F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: 0.25,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "white",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "15px" },
                  color: "#1E293B",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: { xs: 4, md: 5 } }} />

      {/* Course Information Cards */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "18px", md: "20px", lg: "22px" },
            fontWeight: 600,
            color: "#0F172A",
            mb: 3,
          }}
        >
          Course details
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon sx={{ fontSize: 20, color: "#4F39F6" }} />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Duration
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                color: "#0F172A",
                fontWeight: 600,
              }}
            >
              22 Hours
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SchoolIcon sx={{ fontSize: 20, color: "#4F39F6" }} />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Level
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                color: "#0F172A",
                fontWeight: 600,
              }}
            >
              All Levels
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LanguageIcon sx={{ fontSize: 20, color: "#4F39F6" }} />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Language
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                color: "#0F172A",
                fontWeight: 600,
              }}
            >
              English
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StarIcon sx={{ fontSize: 20, color: "#4F39F6" }} />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Rating
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                color: "#0F172A",
                fontWeight: 600,
              }}
            >
              4.6 / 5.0
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tags Section */}
      {course?.tags && course.tags.length > 0 && (
        <>
          <Divider sx={{ my: { xs: 4, md: 5 } }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "18px", md: "20px", lg: "22px" },
                fontWeight: 600,
                color: "#0F172A",
                mb: 2.5,
              }}
            >
              Topics covered
            </Typography>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              {course.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    bgcolor: "#F1E5FF",
                    color: "#4F39F6",
                    fontWeight: 500,
                    fontSize: "13px",
                    height: 32,
                    "&:hover": {
                      bgcolor: "#E8D7FA",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
}

