import { Avatar, Box, Button, Container, IconButton, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useParams } from "react-router-dom";
import { useGetChaptersQuery } from "../../course/api/courseApi";
import { useGetCourseByIdQuery } from "../../course/api/courseApi";
import Loader from "@components/ui/Spinner";
import { UPLOADS } from "../../../constants/constants";
import { Navbar } from '../../website';

export default function CourseGlossary() {
  const { courseId } = useParams<{ courseId: string }>();
  console.log("CourseGlossary - courseId:", courseId);
  console.log("CourseGlossary - courseId type:", typeof courseId);
  console.log("CourseGlossary - courseId length:", courseId?.length);
  console.log("CourseGlossary - window.location:", window.location.href);
  console.log("CourseGlossary - URL pathname:", window.location.pathname);
  console.log("CourseGlossary - URL search:", window.location.search);
  console.log("CourseGlossary - All URL params:", new URLSearchParams(window.location.search));

  if (!courseId || courseId === 'undefined') {
    console.log("CourseGlossary - No courseId found in params or courseId is 'undefined'");
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">No Course Found or Invalid Course Id</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          The URL you're trying to access doesn't have a valid course ID.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Current courseId: "{courseId}"
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Expected URL format: /course-glossary/[courseId] (e.g., /course-glossary/1)
        </Typography>
      </Box>
    );
  }

  // Validate that courseId is a valid number
  const numericCourseId = Number(courseId);
  console.log("CourseGlossary - numericCourseId:", numericCourseId);
  console.log("CourseGlossary - isNaN(numericCourseId):", isNaN(numericCourseId));

  if (isNaN(numericCourseId) || numericCourseId <= 0) {
    console.log("CourseGlossary - Invalid courseId:", courseId);
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">Invalid Course ID</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          The course ID must be a valid positive number.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Current courseId: "{courseId}"
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Expected URL format: /course-glossary/[courseId] (e.g., /course-glossary/1)
        </Typography>
      </Box>
    );
  }

  const { data, isLoading, isError, error: courseError } = useGetCourseByIdQuery(
    { id: numericCourseId },
    { skip: !courseId || isNaN(numericCourseId) }
  );
  const { data: chapters, isLoading: chaptersLoading, isError: chaptersError, error: chaptersApiError } = useGetChaptersQuery(
    {
      id: numericCourseId,
      page: 1,
      limit: 100
    },
    { skip: !courseId || isNaN(numericCourseId) }
  );

  console.log("Course API - isLoading:", isLoading, "isError:", isError, "error:", courseError);
  console.log("Chapters API - isLoading:", chaptersLoading, "isError:", chaptersError, "error:", chaptersApiError);

  return (
    <Box>
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "white",
          minHeight: "100vh",
          px: { xs: 3, sm: 2, md: 4, lg: 8 },
          py: { xs: 3, sm: 2, md: 4, lg: 6 },
          boxSizing: "border-box",
        }}
      >
        {isLoading || chaptersLoading ? <Loader /> : (isError || chaptersError) ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" color="error">Some error occurred...</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {isError && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Course API Error:</Typography>
                  <Typography variant="body2" component="pre" sx={{ fontSize: '12px', overflow: 'auto' }}>
                    {JSON.stringify(courseError, null, 2)}
                  </Typography>
                </Box>
              )}
              {chaptersError && (
                <Box>
                  <Typography variant="subtitle2">Chapters API Error:</Typography>
                  <Typography variant="body2" component="pre" sx={{ fontSize: '12px', overflow: 'auto' }}>
                    {JSON.stringify(chaptersApiError, null, 2)}
                  </Typography>
                </Box>
              )}
            </Typography>
          </Box>
        ) : <Header course={data?.data} chapters={chapters?.data?.chapters} />}
        {!isLoading && !chaptersLoading && !isError && !chaptersError && (
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "1040px", xl: "1240px", "2xl": "1440px" },
              px: { xs: 0, sm: 2, md: 4, lg: 0 },
              pt: { xs: 2, md: "40px" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              boxSizing: "border-box",
              gap: { xs: 2, md: "24px" },
            }}
          >
            {/* Tabs */}
            <Box sx={{
              borderBottom: "1px solid #e0e0e0", paddingBlock: "24px", display: "grid", gridTemplateColumns: {
                xs: "repeat(2,1fr)",
                md: "repeat(3,1fr)"
              }, gap: "24px", width: "100%", boxSizing: "border-box", justifyContent: "center"
            }}>
              <Button
                disableElevation
                sx={{
                  backgroundColor: '#F1E5FF',
                  color: '#333',
                  fontSize: '14px',
                  padding: '18px 40px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#e8d7fa', // Optional softer hover
                    boxShadow: 'none',
                  },
                }}
              >
                Overview
              </Button>
              <Button
                disableElevation
                sx={{
                  backgroundColor: "transparent",
                  color: "#000",
                  fontSize: "14px",
                  padding: "18px 40px",
                  textTransform: "none",
                  border: "1px solid #e0e0e0",
                  boxShadow: "none",
                  '&:hover': {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "none",
                    borderColor: "#d5d5d5",
                  },
                }}

              >
                Lessons
              </Button>
              <Button
                disableElevation
                sx={{
                  backgroundColor: "transparent",
                  color: "#000",
                  fontSize: "14px",
                  padding: "18px 40px",
                  textTransform: "none",
                  border: "1px solid #e0e0e0",
                  boxShadow: "none",
                  '&:hover': {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "none",
                    borderColor: "#d5d5d5",
                  },

                }}
              >
                Reviews
              </Button>
            </Box>
            {/* Overview */}
            <Box
              sx={{
                borderBottom: "1px solid #e0e0e0",
                pb: { xs: 2, md: "24px" },
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography sx={{ fontSize: { xs: "18px", md: "20px", lg: "24px" }, fontWeight: "700" }}>Overview</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", md: "16px", lg: "18px" },
                  mt: 1,
                  wordBreak: "break-word",
                  width: { xs: "100%", md: "90%", lg: "80%" },
                  maxWidth: "100%",
                }}
              >
                {data?.data?.description}
              </Typography>
            </Box>
            {/* Lessons */}
            <Box
              sx={{
                borderBottom: "1px solid #e0e0e0",
                pb: { xs: 2, md: "24px" },
                display: "grid",
                gap: { xs: "8px", md: "14px" },
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography sx={{ fontSize: { xs: "18px", md: "20px", lg: "24px" }, fontWeight: "700" }}>Lessons</Typography>
              <CourseGlossaryAccordion chapters={chapters?.data?.chapters} />
            </Box>
          </Box>
        )}
        {/* Reviews Section */}
        <Box
          sx={{
            px: { xs: 0, md: "0px", lg: "0px" },
            pt: { xs: 2, md: "40px" },
            display: "grid",
            gap: { xs: "16px", md: "48px", lg: "50px" },
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography sx={{ fontSize: { xs: "18px", md: "20px", lg: "24px" }, fontWeight: "700" }}>Learner Reviews</Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: "48px", lg: "139px" }, width: "100%" }}>
            <StarRatings />
            <Box sx={{ display: "grid", gap: { xs: "8px", md: "16px" }, width: "100%" }}>
              <UserTestimonial />
              <UserTestimonial />
              <UserTestimonial />
              <UserTestimonial />
              <UserTestimonial />
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid gray",
                    backgroundColor: "white",
                    color: "black",
                    fontSize: { xs: "12px", md: "14px" },
                    padding: { xs: "8px 12px", md: "13px 24px" },
                    textTransform: "none",
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: "#f5f5f5",
                      borderColor: "black",
                    },
                  }}
                >
                  View more reviews
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

// Header component
export function Header({ course, chapters }: { course: any; chapters: any }) {
  return (
    <Box
      sx={{
        bgcolor: "#FBF8FF",
        flexDirection: { xs: "column", md: "row" },
        display: "flex",
        gap: { xs: 2, md: "24px" },
        alignItems: { xs: "center", md: "flex-start" },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          py: { xs: 2, md: "40px" },
          pb: { xs: 2, md: "93px" },
          gap: { xs: 2, md: "24px" },
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "70%", lg: "840px" },
          maxWidth: "100%",
        }}
      >
        <Typography
          variant="subtitle2"
          mb={0.5}
          sx={{
            color: "#0F172A",
            fontWeight: 700,
            fontSize: { xs: "24px", md: "40px" },
            wordBreak: "break-word",
          }}
        >
          {course?.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            fontSize: { xs: "14px", md: "16px" },
            wordBreak: "break-word",
          }}
        >
          {course?.description}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: "24px" },
          }}
        >
          <Typography
            variant="subtitle2"
            mb={0.5}
            display={"flex"}
            gap={1}
            sx={{
              color: "#0F172A",
              fontWeight: 500,
              fontSize: { xs: "12px", md: "14px" },
              wordBreak: "break-word",
            }}
          >
            4.6 {Array(5).fill(null).map((_, i) => <img key={i} src="/icons/Vector.svg" />)} (651651 rating) | 22 Total Hours. {chapters?.length}. All levels
          </Typography>
          <Typography
            variant="body1"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: { xs: "12px", md: "16px" },
              wordBreak: "break-word",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                overflow: 'hidden',
                borderRadius: '50%',
              }}
            >
              <Avatar
                alt="Lindsey Curtis"
                src="/images/avatarUser.png"
                sx={{ width: 40, height: 40 }}
              />
            </Box>
            Created by {course?.createdBy}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: { xs: "12px", md: "16px" },
              wordBreak: "break-word",
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                overflow: 'hidden',
                borderRadius: '50%',
              }}
            >
              <Avatar
                alt="Lindsey Curtis"
                src="/icons/Icon.svg"
                sx={{ width: 20, height: 20 }}
              />
            </Box>
            English, Spanish, Italian, German
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          py: { xs: 2, md: "40px" },
          width: { xs: "100%", md: "30%", lg: "400px" },
          minWidth: { xs: "100%", md: "300px", lg: "400px" },
          gap: { xs: 2, md: "24px" },
          display: "flex",
          flexDirection: "column",
          position: "relative",
          alignItems: { xs: "center", md: "flex-end" },
        }}
      >
        <Box
          sx={{
            position: { xs: "static", md: "absolute" },
            top: { md: "70px" },
            left: { sm: 20, md: -80, lg: 50 },
            width: { xs: "100%", md: "100%", lg: "400px" },
            mb: { xs: 2, md: 0 },
            maxWidth: "100%",
          }}
        >
          <ProductCard data={course} />
        </Box>
      </Box>
    </Box>
  );
}

// ProductCard component
export function ProductCard({ data }: { data?: any }) {
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", md: "400px" },
        width: { xs: "100%", md: "400px" },
        borderRadius: 2,
        border: '1px solid #d1d5db',
        p: { xs: 2, md: 3 },
        bgcolor: "white",
        mx: { xs: "auto", md: 0 },
        boxSizing: "border-box",
      }}
    >
      <Box
        component="img"
        src={UPLOADS + data?.image}
        alt="img"
        sx={{
          width: '100%',
          height: { xs: 120, md: 200 },
          objectFit: 'cover',
          borderRadius: 2,
          mb: 2,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5" fontWeight="600">
          ${data?.price}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textDecoration: 'line-through', color: "gray" }}
        >
          $99.5
        </Typography>
        <Typography variant="body1" color="green" fontWeight="600">
          50% Off
        </Typography>
      </Box>

      <Link to="/checkout" style={{ textDecoration: 'none', width: '100%' }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#6A42AB',
            color: '#fff',
            py: 1.5,
            mb: 2,
            fontSize: { xs: "12px", md: "16px" },
            '&:hover': { bgcolor: '#6A42AB' },
          }}
        >
          Checkout
        </Button>
      </Link>

      <hr />

      <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
        Share
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#6A42AB',
            '&:hover': { bgcolor: '#e0f2ff' },
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt="Lindsey Curtis"
            src="/icons/facebook.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#000',
            '&:hover': { bgcolor: '#f5f5f5' },
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt="Lindsey Curtis"
            src="/icons/Icon.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#EA4335',
            '&:hover': { bgcolor: '#fdecea' },
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt="Lindsey Curtis"
            src="/icons/google.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#000',
            '&:hover': { bgcolor: '#f5f5f5' },
            width: 40,
            height: 40,
          }}
        >
          {/* Replace this with actual X (Twitter) icon if needed */}
          <Avatar
            alt="Lindsey Curtis"
            src="/icons/MicroSoftIcon.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#f97316',
            '&:hover': { bgcolor: '#fff7ed' },
            width: 40,
            height: 40,
            p: 0.5,
          }}
        >
          <Avatar
            src="https://storage.googleapis.com/a1aa/image/ad05c61d-49ba-4271-5d7a-3a7ab66f2d01.jpg"
            alt="Microsoft logo"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

// CourseGlossaryAccordion component
export function CourseGlossaryAccordion({ chapters }: { chapters?: any[] }) {
  return (
    <div>
      {chapters?.length && chapters?.map((item, idx) => (
        <Accordion key={idx}>
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 0 },
              }}
            >
              {/* Left side: Icon + Title */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ExpandMoreIcon />
                <Typography sx={{ py: { xs: 1, md: '18px' }, fontSize: { xs: "14px", md: "16px" } }}>{item?.title}</Typography>
              </Box>
              {/* Right-aligned text */}
              <Typography sx={{ color: "gray", fontSize: { xs: "12px", md: "14px" } }} color="text.secondary">{item?.units?.length} Lessons</Typography>
            </Box>
          </AccordionSummary>
          {item?.units?.length && item?.units?.map((unit: any, idx: number) => (
            <AccordionDetails key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid lightgray',
                  borderRadius: '8px',
                  padding: { xs: '8px 12px', md: '12px 24px' },
                  backgroundColor: '#f9f9f9',
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 0 },
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography sx={{ fontSize: { xs: "13px", md: "16px" } }}>{unit?.title}</Typography>
                <Button variant="contained" color="primary" sx={{ fontSize: { xs: "12px", md: "14px" }, mt: { xs: 1, sm: 0 }, width: { xs: "100%", sm: "auto" } }}>Start</Button>
              </Box>
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </div>
  );
}

// UserTestimonial component
export function UserTestimonial() {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100%",
        bgcolor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 3 },
        boxShadow: 1,
        paddingBlock: { xs: "12px", md: "24px" },
        paddingInline: { xs: "12px", md: "22px" },
        alignItems: { xs: "flex-start", md: "center" },
        wordBreak: "break-word",
      }}
    >
      <Box sx={{ minWidth: 0, width: { xs: "100%", md: "272px" }, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src="https://storage.googleapis.com/a1aa/image/5147a9f3-030f-476c-1cb6-9f5e4c04e342.jpg"
          alt="Mark Doe"
          sx={{ width: 60, height: 60, flexShrink: 0 }}
        />
        <Typography fontWeight={600} color="text.primary" fontSize={16} lineHeight={1.5} sx={{ wordBreak: "break-word" }}>
          Mark Doe
        </Typography>
      </Box>
      {/* Review Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: { xs: 0, md: 3 }, flex: 1, width: "100%" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: '4px' }}>
            <Avatar
              alt="Lindsey Curtis"
              src="../../assets/icons/Vector.svg"
              sx={{ width: 16, height: 16 }}
            />
            <Typography fontWeight={600} sx={{ color: 'black', fontWeight: 700, fontSize: 16 }}>
              5
            </Typography>
          </Box>
          <Typography color="text.secondary" fontSize={14}>
            Reviewed on 22nd March, 2024
          </Typography>
        </Box>
        <Typography color="text.primary" fontSize={16} lineHeight={1.7} sx={{ wordBreak: "break-word" }}>
          I was initially apprehensive, having no prior design experience. But the instructor,
          John Doe, did an amazing job of breaking down complex concepts into easily digestible
          modules. The video lectures were engaging, and the real-world examples really helped
          solidify my understanding.
        </Typography>
      </Box>
    </Box>
  );
}

// StarRatings component
export function StarRatings() {
  const ratings = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 10 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];
  return (
    <Box width="100%" maxWidth={300} display="flex" flexDirection="column" gap={3}>
      {/* Top Rating Summary */}
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          alt="Lindsey Curtis"
          src="/icons/Vector.svg"
          sx={{ width: 20, height: 20 }}
        />
        <Typography fontWeight={600} fontSize={20} lineHeight={1}>
          4.6
        </Typography>
        <Typography color="text.secondary" fontSize={14} fontWeight={500} lineHeight={1}>
          146,951 reviews
        </Typography>
      </Box>

      {/* Rating Rows */}
      <Box display="flex" flexDirection="column" gap={1}>
        {ratings.map((rating, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <Box display="flex" gap={0.5} color="warning.main">
              {[...Array(5)].map((_, i) =>
                i < rating.stars ? (
                  <Avatar
                    alt="Lindsey Curtis"
                    src="/icons/Vector.svg"
                    sx={{ width: 14, height: 14 }}
                  />
                ) : (
                  <Avatar
                    alt="Lindsey Curtis"
                    src="/icons/Vector.svg"
                    sx={{ width: 14, height: 14 }}
                  />
                )
              )}
            </Box>
            <Typography fontSize={14} fontWeight={600} color="text.primary">
              {rating.percent}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}