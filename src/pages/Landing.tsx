/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  InputBase,
  IconButton,
  Card,
  Stack,
  Chip,
  Avatar,
  Fab,
  useTheme,
  alpha,
  Paper,
  Rating,
  CardMedia,
} from "@mui/material";

import {
  Search as SearchIcon,
  PlayArrow as PlayArrowIcon,
  ChevronRight as ChevronRightIcon,
  FlashOn as FlashOnIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";

import {
  useGetCourseForFeedQuery,
  useGetCartQuery,
  useAddToCartServerMutation,
  useGetCourseRatingQuery,
} from "../features/course-browse/api/courseApi";

import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";
import { useAuth } from "../hooks/useAuth";
import Skeleton from "@mui/material/Skeleton";
import heroSetion from "../assets/images/heroSetion.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// student profiles
import Alok from "../assets/students_images/Alok.jpg";
import keniisha_Thakur from "../assets/students_images/Keniisha_Thakur.png";
import deepak_k from "../assets/students_images/deepak_k.png";
import DilpreetKaur from "../assets/students_images/DilpreetKaur.png";
import defaultI from "../assets/students_images/defaultI.png";
import ishika from "../assets/students_images/ishika.png";
import Mani from "../assets/students_images/Mani.png";
import Manveer from "../assets/students_images/Manveer.jpeg";
import RajeshRajM from "../assets/students_images/RajeshRajM.jpg";
import Ranjan from "../assets/students_images/Ranjan.jpg";
// import srishti from "../assets/students_images/srishti.jpg";
// import srishti from "../assets/students_images/srishti.jpg";

import ShahilGulati from "../assets/students_images/ShahilGulati.png";
import SawanPandit from "../assets/students_images/SawanPandit.png";

// semer efeecrt components for feature
const CourseCardSkeleton = () => (
  <Card
    elevation={0}
    sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #e0e0e0" }}
  >
    <Skeleton variant="rectangular" height={160} animation="wave" />
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width="60%" height={20} animation="wave" />
      <Skeleton
        variant="text"
        width="90%"
        height={16}
        animation="wave"
        sx={{ mt: 1 }}
      />
      <Skeleton
        variant="text"
        width="40%"
        height={16}
        animation="wave"
        sx={{ mt: 1 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton variant="rounded" width={80} height={32} />
      </Box>
    </Box>
  </Card>
);

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [query, setQuery] = useState("");

  // 🔹 Featured courses
  const {
    data: browseData,
    isFetching: fetchingBrowse,
    isError: errorBrowse,
  } = useGetCourseForFeedQuery({ limit: 10, page: 1 });

  const featuredCoursesData: ICourse[] =
    (browseData as any)?.data?.courses || [];

  const sortedFeaturedCourses = [...featuredCoursesData].sort(
    (a, b) =>
      (Number(b.rating || b.averageRating) || 0) -
      (Number(a.rating || a.averageRating) || 0),
  );

  // 🔹 Cart Data
  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
    skip: !isLoggedIn,
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  // 🔹 Categories  "AI/ML", "Web Development", "Data Science", "More Skills"
  const CATEGORIES = [
    { id: "DataScience", title: "Data Science", count: 3 },
    { id: "WebDevelopment", title: "Web Development", count: 5 },
    { id: "AI/ML", title: "AI & Machine Learning", count: 2 },
    { id: "MoreSkills", title: "More Skills ", count: 1 },
  ];

  // 🔹 Learning Paths
  const paths = [
    {
      title: "Become a Data Scientist",
      courses: 2,
      time: "8 months",
      level: "Beginner → Advanced",
    },
    {
      title: "Master Full-Stack Development",
      courses: 5,
      time: "9 months",
      level: "Intermediate",
    },
    {
      title: "AI Engineering Track",
      courses: 2,
      time: "8 months",
      level: "Advanced",
    },
  ];

  const testimonials = [
    {
      name: "Alok Thakur",
      text: "It was a highly productive internship experience where I learned industry standards and developed a solid understanding of Frontend technologies.",
      tag: "Frontend Development",
    },
    {
      name: "Divyam Shrivastav",
      text: "I learned Python fundamentals, improved my coding skills, and gained practical experience. This internship was very helpful for my learning and confidence.",
      tag: "Python Development",
      image: defaultI,
    },
    {
      name: "Raj Shekhar Sah",
      text: "I learned the industry-level work and its actual use after college. It is highly recommended for students to understand and get real industry exposure.",
      tag: "Python Development",
    },
    {
      name: "Kenisha Thakur",
      text: "It was a great learning experience. I improved my Python fundamentals, polished my concepts, and gained valuable hands-on backend development skills.",
      tag: "Python Development",
      image: keniisha_Thakur,
    },
    {
      name: "Srishti",
      text: "The learning content was decent. Gained some good initial insights into the track, though more active live mentorship sessions would make it even better.",
      tag: "Python Development",
      // image: srishti
    },
    {
      name: "Dilpreet Kaur",
      text: "This Python internship gave me practical experience that went beyond theory. I improved my programming, debugging, and problem-solving skills on real tasks.",
      tag: "Python Development",
      image: DilpreetKaur,
    },
    {
      name: "Harmanpreet Singh",
      text: "This internship helped me learn new skills, improve my self-confidence, and understand how tasks are executed professionally in a corporate environment.",
      tag: "Python Development",
    },
    {
      name: "Vishal mani",
      text: "Gained basic familiarity with Python concepts and standard modules. It was a decent learning path to start my programming journey.",
      tag: "Python Development",
    },
    {
      name: "Aalok jha",
      text: "Improved my technical skills, communication, and teamwork. I gained practical experience  on real tasks, and the mentor was supportive throughout.",
      tag: "Python Development",
      image: Alok,
    },
    {
      name: "Rajesh Mehta",
      text: "I got to learn many new things from the Python classes. Thank you for setting up such a structured and helpful curriculum for our career growth.",
      tag: "Python Development",
      image: RajeshRajM,
    },
    {
      name: "Sanvi",
      text: "The practical approach here is excellent. I ended up learning and implementing more skills in this internship than I did in an entire college semester.",
      tag: "Python Development",
    },
    {
      name: "Khushi Ahuja",
      text: "It was a highly rewarding program that helped me learn coding concepts practically. Working on real tasks made the concepts much easier to understand.",
      tag: "Python Development",
    },
    {
      name: "Ranjan Kumar Mahato",
      text: "I got valuable practical experience in developing real-world projects from scratch, which greatly helped me build confidence in my coding skills.",
      tag: "Python Development",
      image: Ranjan,
    },
    {
      name: "Mani",
      text: "This internship was incredibly insightful. I managed to learn more practical frontend skills here than during my entire previous college semester.",
      tag: "Frontend Development",
      image: Mani,
    },
    {
      name: "Ishika",
      text: "The structured tasks along with highly cooperative and supportive mentors made this internship a smooth and enriching learning experience for me.",
      tag: "Python Development",
      image: ishika,
    },
    {
      name: "Manveer kaur",
      text: "This internship helped me learn essential industry-level practical skills and apply my knowledge directly by working on real-world projects.",
      tag: "Frontend Development",
      image: Manveer,
    },
    {
      name: "Shahil Gulati",
      text: "This internship gave me hands-on experience with real frontend projects. I improved my UI development skills and learned to write clean, maintainable code.",
      tag: "Frontend Development",
      image: ShahilGulati,
    },
    {
      name: "Sawan Pandit",
      text: "Working on real datasets during this internship helped me strengthen my data analysis skills and understand how insights are used to drive decisions.",
      tag: "Data Analyst",
      image: SawanPandit,
    },
  ];

  const stats = [
    { value: "1K+", label: "Active Learners" },
    { value: "15+", label: "Expert Courses" },
    // { value: '98%', label: 'Success Rate' },
    { value: "24/7", label: "AI Support" },
  ];

  // Handlers
  const onSearch = (query?: string) => {
    if (!query.trim()) return;
    navigate(`/browse-courses?search=${encodeURIComponent(query)}`);
  };

  const onPickCategory = (categoryId: string) => {
    navigate(`/browse-courses?category=${categoryId}`);
  };

  const handleAddToCart = async (courseId: number) => {
    if (!isLoggedIn) return navigate("/sign-up");
    try {
      await addToCartServer({ courseId }).unwrap();
    } catch (error) {
      console.error("Failed to add course to cart:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(to bottom, ${alpha(
          theme.palette.grey[50],
          1,
        )}, ${alpha(theme.palette.common.white, 1)})`,
      }}
    >
      {/* HERO SECTION */}
      <Box
        component="section"
        sx={{ bgcolor: "rgb(229, 233, 247)", py: { xs: 6, md: 8 } }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* LEFT */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.02,
                  fontSize: { xs: "2rem", sm: "2.6rem", md: "3.25rem" },
                  color: "#0f1724",
                }}
              >
                Master skills faster with
                <Box component="span" display="block" sx={{ color: "#0b56ff" }}>
                  AI-powered learning
                </Box>
              </Typography>

              <Typography sx={{ mt: 2, color: "#556080", maxWidth: 620 }}>
                Personalized courses, smart quizzes, and real-time practice that
                help you learn by doing — not by memorizing.
              </Typography>

              <Stack direction="row" spacing={2} mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: "#5b3cff" }}
                  onClick={() => navigate("/browse-course/free")}
                >
                  Start Learning Free
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/browse-courses")}
                >
                  Explore Courses
                </Button>
              </Stack>

              {/* Search */}
              <Paper
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearch(query);
                }}
                sx={{
                  mt: 3,
                  p: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                  width: { xs: "100%", sm: 520 },
                }}
              >
                <IconButton type="submit" sx={{ p: "10px" }}>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search courses, skills, topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  onClick={() => onSearch(query)}
                  variant="contained"
                  size="small"
                >
                  Search
                </Button>
              </Paper>

              {/* Hero Stats */}
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  color: "text.secondary",
                }}
              >
                {stats.map((s, i) => (
                  <Typography key={i} variant="body2">
                    <strong style={{ color: theme.palette.primary.main }}>
                      {s.value}
                    </strong>{" "}
                    {s.label}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* RIGHT - Image Section */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="/heroSetion.png"
                alt="AI Learning"
                sx={{
                  width: "100%",
                  maxWidth: "700px",
                  mixBlendMode: "multiply", // ← yeh magic hai
                  // borderRadius, boxShadow — hata diya
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* -------------------------------------- */}
      {/* CATEGORIES */}
      {/* -------------------------------------- */}
      <Box component="section" sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" fontWeight={700}>
            Explore by Category
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {CATEGORIES.map((c) => (
              <Grid item xs={12} sm={6} md={3} key={c.id}>
                <Card
                  variant="outlined"
                  onClick={() => onPickCategory(c.id)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    "&:hover": { boxShadow: 3 },
                  }}
                >
                  <Typography fontWeight={600}>{c.title}</Typography>
                  <Typography variant="caption">{c.count} courses</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* -------------------------------------- */}
      {/* FEATURED COURSES */}
      {/* -------------------------------------- */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={{ xs: 2, sm: 0 }}
            sx={{ mb: 6 }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  color: "#0f1724",
                  mb: 0.5,
                }}
              >
                Featured Courses
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#556080",
                  fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                }}
              >
                Top-rated courses chosen by our AI
              </Typography>
            </Box>

            <Button
              variant="outlined"
              endIcon={
                <ChevronRightIcon
                  sx={{
                    fontSize: "1.25rem",
                    transition: "transform 0.3s ease",
                  }}
                />
              }
              onClick={() => navigate("/browse-courses")}
              sx={{
                px: { xs: 3, sm: 4 },
                py: 1.5,
                borderRadius: 2,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "0.9375rem",
                textTransform: "none",
                minWidth: { xs: "100%", sm: "auto" },
                whiteSpace: "nowrap",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.main,
                  color: "#ffffff",
                  transform: "translateY(-2px)",
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  "& .MuiButton-endIcon": {
                    transform: "translateX(4px)",
                  },
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              View All Courses
            </Button>
          </Stack>

          {fetchingBrowse ? (
            <Grid container spacing={2}>
              {[...Array(4)].map((_, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <CourseCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : errorBrowse ? (
            <Typography
              sx={{ textAlign: "center", color: "error.main", py: 8 }}
            >
              Failed to load courses.
            </Typography>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.15}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                480: { slidesPerView: 1.5, spaceBetween: 16 },
                640: { slidesPerView: 2.2, spaceBetween: 16 },
                960: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
              style={{ paddingBottom: 40 }}
            >
           {sortedFeaturedCourses?.map((course) => {
  const rating = Number(course.averageRating) || 0;
  const reviewCount = Number(course.totalRatings) || 0;

  const isCourseInCart =
    cartData?.data?.items?.some(
      (item) => item.courseId === Number(course.id),
    ) || false;

const rawOrgName =
  course.createdBy?.trim() ||
  `${course.createdByUser?.firstName || ""} ${course.createdByUser?.lastName || ""}`.trim() ||
  "Organization";

const orgName = rawOrgName.replace(/^./, (c) => c.toUpperCase());



  // ORG | INSTRUCTOR
  const orgWithInstructor = `${course.instructor?.trim() || "Instructor"} | ${orgName}`;

  console.log(orgWithInstructor)
  return (
    <SwiperSlide key={course.id}>
      <CourseCardWrapper
        id={course.id}
        thumbnailSrc={course.image}
        tags={course.tags}
        title={course.title}
        chapters={course.totalChapters}
        rating={rating}
        reviewCount={reviewCount}
        instructor={orgWithInstructor}
        categories={course.categories}
        price={course.price}
        navigatePath={(id) => `/course-glossary/${id}`}
        isCourseInCart={isCourseInCart}
        onAddToCart={handleAddToCart}
        isLoadingCart={isAddingToCart}
      />
    </SwiperSlide>
  );
})}
            </Swiper>
          )}
        </Container>
      </Box>

      {/* ================= TRENDING COURSES SECTION ================= */}
  <Box
  component="section"
  sx={{ py: 6, bgcolor: alpha(theme.palette.grey[50], 0.5) }}
>
  <Container maxWidth="lg">
    <Typography
      variant="h5"
      fontWeight={700}
      sx={{
        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
        color: "#0f1724",
        mb: 4,
      }}
    >
      Trending courses
    </Typography>

    {(() => {
      const allCourses = featuredCoursesData || [];

      const getOrgName = (course) => {
        const u = course.createdByUser;
        if (u && (u.firstName || u.lastName)) {
          return `${u.firstName || ""} ${u.lastName || ""}`.trim();
        }
        return course.createdBy || "Tiiron";
      };

      const getOrgPicture = (course) =>
        course.createdByUser?.profile?.picture || null;

      const getRating = (course) =>
        Number(course.averageRating ?? course.rating) || 0;

      // ----- Most popular ->
      const mostPopular = [...allCourses]
        .sort((a, b) => getRating(b) - getRating(a))
        .slice(0, 3);

      // ----- Weekly spotlight -> 
   const weeklySpotlight = [...allCourses]
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  .slice(0, 3);

      // ----- In-demand AI skills ->
      const isAIRelated = (course) => {
        const haystack = [
          course.categories,
          course.instructor,
          ...(course.tags || []),
          course.title,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return (
          haystack.includes("ai") ||
          haystack.includes("ml") ||
          haystack.includes("artificial intelligence") ||
          haystack.includes("machine learning")
        );
      };

      const inDemandAI = allCourses.filter(isAIRelated).slice(0, 3);

      // ---------- reusable card ----------
      const CourseCard = ({ course, badgeColor }) => {
        const rating = getRating(course);
        const orgName = getOrgName(course);
        const orgPicture = getOrgPicture(course);

        return (
          <Card
            key={course.id}
            elevation={0}
            sx={{
              bgcolor: "#ffffff",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              mb: 2,
              transition: "all 0.3s ease",
              border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
              "&:hover": {
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                transform: "translateY(-2px)",
              },
            }}
            onClick={() => navigate(`/course-glossary/${course.id}`)}
          >
            <Stack direction="row" spacing={2} sx={{ p: 1.5 }}>
              {/* IMAGE */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1.5,
                  overflow: "hidden",
                  flexShrink: 0,
                  bgcolor: theme.palette.grey[200],
                }}
              >
                {course.image ? (
                  <CardMedia
                    component="img"
                    image={course.image}
                    alt={course.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme.palette.text.secondary,
                      fontSize: "0.75rem",
                    }}
                  >
                    No Image
                  </Box>
                )}
              </Box>

              {/* CONTENT */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* ORG NAME */}
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                  {orgPicture ? (
                    <Box
                      component="img"
                      src={orgPicture}
                      alt={orgName}
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        bgcolor: badgeColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.625rem",
                        color: "#ffffff",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {orgName?.[0]?.toUpperCase() || "T"}
                    </Box>
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#556080",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {orgName}
                  </Typography>
                </Stack>

                {/* TITLE */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#0f1724",
                    fontSize: "0.875rem",
                    mb: 0.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#556080", fontSize: "0.6875rem", mb: 0.5, display: "block" }}
                >
                  {course.instructor?.trim() || "Instructor"}
                </Typography>

                {/* CATEGORY */}
                <Typography
                  variant="caption"
                  sx={{ color: "#556080", fontSize: "0.6875rem", mb: 0.5, display: "block" }}
                >
                  {course.categories || course.tags?.[0] || "More Skills "}
                </Typography>

                {/* RATING */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Rating
                    value={rating}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": { color: "#FFB400" },
                      "& .MuiRating-iconEmpty": { color: "#E2E8F0" },
                      "& .MuiRating-icon": { fontSize: "0.875rem" },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "#556080", fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    {rating.toFixed(1)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>
        );
      };

      const ColumnBox = ({ title, courses, badgeColor }) => (
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              borderRadius: 3,
              p: 3,
              height: "100%",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: "#0f1724", fontSize: "1.125rem" }}>
                {title}
              </Typography>
              <ArrowForwardIcon
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                  "&:hover": { transform: "translateX(4px)" },
                  transition: "transform 0.3s ease",
                }}
              />
            </Stack>

            {courses.length === 0 ? (
              <Typography variant="caption" color="text.secondary">
                No courses available
              </Typography>
            ) : (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} badgeColor={badgeColor} />
              ))
            )}
          </Box>
        </Grid>
      );

      return (
        <Grid container spacing={3}>
          <ColumnBox title="Most popular" courses={mostPopular} badgeColor="#2563EB" />
          <ColumnBox title="Weekly spotlight" courses={weeklySpotlight} badgeColor="#16A34A" />
          <ColumnBox title="In-demand AI skills" courses={inDemandAI} badgeColor="#9333EA" />
        </Grid>
      );
    })()}
  </Container>
</Box>

      {/* -------------------------------------- */}
      {/* LEARNING PATHS */}
      {/* -------------------------------------- */}
      <Box component="section" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" fontWeight={700}>
            Structured Learning Paths
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {paths.map((p, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="caption">{p.level}</Typography>
                  <Typography variant="h6">{p.title}</Typography>
                  <Typography variant="body2">
                    {p.courses} courses • {p.time}
                  </Typography>
                  <Button
                    onClick={() => navigate("/browse-courses")}
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    Start Path
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIALS */}

      <Box sx={{ py: 8, background: "#f8fafc" }}>
        <Container maxWidth="lg">
          {/* ── Heading ── */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "100px",
                px: 1.8,
                py: "5px",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: "auto",
                  height: 6,
                  borderRadius: "50%",
                  background: "#2563eb",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#1e40af",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Student Reviews
              </Typography>
            </Box>

            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                letterSpacing: "-0.02em",
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              Trusted by{" "}
              <Box component="span" sx={{ color: "#0841be" }}>
                learners like you
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "0.95rem",
                mt: 1.2,
                maxWidth: 650,
                mx: "auto",
              }}
            >
              Real stories from students who levelled up — no filters, no
              scripts.
            </Typography>
          </Box>

          {/* ── Carousel ── */}
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={false}
            loop={testimonials.length > 3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            pagination={{ clickable: true }}
            breakpoints={{
              600: { slidesPerView: 1.5, spaceBetween: 20 },
              900: { slidesPerView: 2.2, spaceBetween: 24 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            }}
            style={{ paddingBottom: 44 }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <Card
                  elevation={0}
                  sx={{
                    p: "26px 24px 20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "16px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    transition:
                      "transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s ease, border-color 0.28s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "#2563eb",
                      boxShadow: "0 16px 32px -10px rgba(37,99,235,0.14)",
                    },
                  }}
                >
                  {/* Top section */}
                  <Box>
                    {/* Blue accent bar */}
                    <Box
                      sx={{
                        width: 28,
                        height: 3,
                        background: "#2563eb",
                        borderRadius: "2px",
                        mb: 2,
                      }}
                    />

                    {/* Stars */}
                    <Box sx={{ display: "flex", gap: "3px", mb: 1.8 }}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Box
                          key={s}
                          component="span"
                          sx={{
                            fontSize: "13px",
                            color: "#f59e0b",
                            lineHeight: 1,
                          }}
                        >
                          ★
                        </Box>
                      ))}
                    </Box>

                    {/* Quote */}
                    <Typography
                      sx={{
                        color: "#475569",
                        fontSize: "0.92rem",
                        lineHeight: 1.7,
                        fontWeight: 400,
                        mb: 3,
                      }}
                    >
                      &ldquo;{t.text}&rdquo;
                    </Typography>
                  </Box>

                  {/* Bottom: divider + profile */}
                  <Box>
                    <Box sx={{ height: "1px", background: "#e2e8f0", mb: 1 }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={t.image}
                        sx={{
                          width: 40,
                          height: 40,
                          background:
                            "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          boxShadow: "0 3px 8px rgba(37,99,235,0.2)",
                        }}
                      >
                        {t.name[0]}
                      </Avatar>
                      <Box>
                        <Typography
                          fontWeight={700}
                          sx={{
                            fontSize: "0.87rem",
                            color: "#0f172a",
                            lineHeight: 1.2,
                          }}
                        >
                          {t.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748b",
                            fontWeight: 500,
                            mt: "2px",
                            display: "block",
                          }}
                        >
                          {t.tag}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      {/* CTA */}

      <Container maxWidth="lg" sx={{ pt: 5, pb: 6 }}>
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 6,
            background: alpha(theme.palette.primary.main, 0.08),
          }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            Ready to Start Your Journey?
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Join thousands of learners transforming curiosity into mastery.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              onClick={() => navigate("/browse-course/free")}
              variant="contained"
              sx={{
                px: 5,
                py: 1,
                borderRadius: 3,
                fontSize: "1.1rem",
              }}
            >
              Start Free Trial
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/browse-courses")}
              sx={{
                px: 5,
                py: 1,
                borderRadius: 3,
              }}
            >
              Explore Courses
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default Landing;
