/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
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
} from '@mui/material';

import {
  Search as SearchIcon,
  PlayArrow as PlayArrowIcon,
  ChevronRight as ChevronRightIcon,
  FlashOn as FlashOnIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import CourseCardWrapper from '@components/ui/card/CourseCardWrapper';


import {
  useGetCourseForFeedQuery,
  useGetCartQuery,
  useAddToCartServerMutation,
  useGetCourseRatingQuery
} from '../features/course-browse/api/courseApi';

import { ICourse } from 'types/course.types';
import Loader from '@components/ui/Spinner';
import { useAuth } from '../hooks/useAuth';
import Skeleton from '@mui/material/Skeleton';
import heroSetion from "../assets/images/heroSetion.png"

// Swiper React Components इम्पोर्ट करें
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper Modules (Autoplay और Pagination के लिए)
import { Autoplay, Pagination } from 'swiper/modules';

// Swiper के ज़रूरी CSS Styles
import 'swiper/css';
import 'swiper/css/pagination';

// semer efeecrt components for feature 
const CourseCardSkeleton = () => (
  <Card elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
    <Skeleton variant="rectangular" height={160} animation="wave" />
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width="60%" height={20} animation="wave" />
      <Skeleton variant="text" width="90%" height={16} animation="wave" sx={{ mt: 1 }} />
      <Skeleton variant="text" width="40%" height={16} animation="wave" sx={{ mt: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
  const [query, setQuery] = useState('');

  // 🔹 Featured courses
  const { data: browseData, isFetching: fetchingBrowse, isError: errorBrowse } =
    useGetCourseForFeedQuery({ limit: 4, page: 1 });

  const featuredCoursesData: ICourse[] =
    (browseData as any)?.data?.courses || [];


  const courseIds = featuredCoursesData.map((c) => c.id);

  const rating1 = useGetCourseRatingQuery(courseIds[0], { skip: !courseIds[0] });
  const rating2 = useGetCourseRatingQuery(courseIds[1], { skip: !courseIds[1] });
  const rating3 = useGetCourseRatingQuery(courseIds[2], { skip: !courseIds[2] });
  const rating4 = useGetCourseRatingQuery(courseIds[3], { skip: !courseIds[3] });

  const ratings = [
    rating1?.data?.data,
    rating2?.data?.data,
    rating3?.data?.data,
    rating4?.data?.data,
  ];
  // 🔹 Cart Data
  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
    skip: !isLoggedIn,
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  // 🔹 Categories
  const CATEGORIES = [
    { id: 'data-science', title: 'Data Science', count: 3 },
    { id: 'web-dev', title: 'Web Development', count: 5 },
    { id: 'ai', title: 'AI & Machine Learning', count: 2 },
    { id: 'design', title: 'Design', count: 1 },
  ];

  // 🔹 Learning Paths
  const paths = [
    { title: 'Become a Data Scientist', courses: 2, time: '8 months', level: 'Beginner → Advanced' },
    { title: 'Master Full-Stack Development', courses: 5, time: '9 months', level: 'Intermediate' },
    { title: 'AI Engineering Track', courses: 2, time: '8 months', level: 'Advanced' },
  ];

  // 🔹 Testimonials
  const testimonials = [
    { name: 'Aman', text: 'I improved my interview performance and landed a job in 3 months.', tag: 'Data Scientist' },
    { name: 'Priya', text: 'The AI quizzes made studying focused and efficient.', tag: 'Frontend Dev' },
    { name: 'Rohit', text: 'Clear paths and project-based tasks helped me build a portfolio.', tag: 'Full-stack' },
  ];

  const stats = [
    { value: '1K+', label: 'Active Learners' },
    { value: '15+', label: 'Expert Courses' },
    // { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'AI Support' },
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
    if (!isLoggedIn) return navigate('/sign-up');
    try {
      await addToCartServer({ courseId }).unwrap();
    } catch (error) {
      console.error('Failed to add course to cart:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, ${alpha(
          theme.palette.grey[50],
          1
        )}, ${alpha(theme.palette.common.white, 1)})`,
      }}
    >
      {/* HERO SECTION */}
      <Box component="section" sx={{ bgcolor: 'rgb(229, 233, 247)', py: { xs: 6, md: 8 } }}>
  <Container maxWidth="lg">
    <Grid container spacing={4} alignItems="center">
      {/* LEFT */}
      <Grid item xs={12} md={7}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            lineHeight: 1.02,
            fontSize: { xs: '2rem', sm: '2.6rem', md: '3.25rem' },
            color: '#0f1724',
          }}
        >
          Master skills faster with
          <Box component="span" display="block" sx={{ color: '#0b56ff' }}>
            AI-powered learning
          </Box>
        </Typography>

        <Typography sx={{ mt: 2, color: '#556080', maxWidth: 620 }}>
          Personalized courses, smart quizzes, and real-time practice that help you learn by doing — not by memorizing.
        </Typography>

        <Stack direction="row" spacing={2} mt={4}>
          <Button variant="contained" size="large" sx={{ bgcolor: '#5b3cff' }} onClick={() => navigate('/browse-course/free')}>
            Start Learning Free
          </Button>

          <Button variant="outlined" size="large" onClick={() => navigate('/browse-courses')}>
            Explore Courses
          </Button>
        </Stack>

        {/* Search */}
        <Paper component="form" onSubmit={(e) => { e.preventDefault(); onSearch(query); }} sx={{ mt: 3, p: '6px 10px', display: 'flex', alignItems: 'center', width: { xs: '100%', sm: 520 } }}>
          <IconButton type="submit" sx={{ p: '10px' }}><SearchIcon /></IconButton>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search courses, skills, topics..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button onClick={() => onSearch(query)} variant="contained" size="small">Search</Button>
        </Paper>

        {/* Hero Stats */}
        <Box sx={{ mt: 3, display: 'flex', gap: 3, flexWrap: 'wrap', color: 'text.secondary' }}>
          {stats.map((s, i) => (
            <Typography key={i} variant="body2">
              <strong style={{ color: theme.palette.primary.main }}>{s.value}</strong> {s.label}
            </Typography>
          ))}
        </Box>
      </Grid>

      {/* RIGHT - Image Section */}
<Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Box
    component="img"
    src="/heroSetion.png"
    alt="AI Learning"
    sx={{
      width: '100%',
      maxWidth: '700px',
      mixBlendMode: 'multiply',   // ← yeh magic hai
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
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 3 },
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
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={{ xs: 2, sm: 0 }}
            sx={{ mb: 6 }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  color: '#0f1724',
                  mb: 0.5,
                }}
              >
                Featured Courses
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#556080',
                  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
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
                    fontSize: '1.25rem',
                    transition: 'transform 0.3s ease',
                  }}
                />
              }
              onClick={() => navigate('/browse-courses')}
              sx={{
                px: { xs: 3, sm: 4 },
                py: 1.5,
                borderRadius: 2,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: '0.9375rem',
                textTransform: 'none',
                minWidth: { xs: '100%', sm: 'auto' },
                whiteSpace: 'nowrap',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.main,
                  color: '#ffffff',
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '& .MuiButton-endIcon': {
                    transform: 'translateX(4px)',
                  },
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              View All Courses
            </Button>
          </Stack>

          {fetchingBrowse ? (
            // <Box sx={{ textAlign: 'center', py: 8 }}>
            //   <Loader />
            // </Box>
              <Grid container spacing={2}>
              {[...Array(4)].map((_, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <CourseCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : errorBrowse ? (
            <Typography sx={{ textAlign: 'center', color: 'error.main', py: 8 }}>
              Failed to load courses.
            </Typography>
          ) : (

            // <Grid container spacing={2}>
            //   {featuredCoursesData?.map((course, index) => {

            //     const rating = ratings[index]?.averageRating || 0;
            //     const reviewCount = ratings[index]?.totalRatings || 0;

            //     const isCourseInCart =
            //       cartData?.data?.items?.some(
            //         (item) => item.courseId === Number(course.id)
            //       ) || false;

            //     return (
            //       <Grid item xs={12} sm={6} md={3} key={course.id}>
            //         <CourseCardWrapper
            //           id={course.id}
            //           thumbnailSrc={course.image}
            //           tags={course.tags}
            //           title={course.title}
            //           chapters={course.totalChapters}
            //           rating={rating}
            //           reviewCount={reviewCount}
            //           instructor={course.createdBy}
            //           price={course.price}
            //           navigatePath={(id) => `/course-glossary/${id}`}
            //           isCourseInCart={isCourseInCart}
            //           onAddToCart={handleAddToCart}
            //           isLoadingCart={isAddingToCart}
            //         />
            //       </Grid>
            //     );
            //   })}
            // </Grid>

  <Grid container spacing={2}>
    {featuredCoursesData
      ?.map((course, index) => ({
        course,
        rating: ratings[index]?.averageRating || 0,
        reviewCount: ratings[index]?.totalRatings || 0,
      }))
      .sort((a, b) => b.rating - a.rating)
      .map(({ course, rating, reviewCount }) => {

        const isCourseInCart =
          cartData?.data?.items?.some(
            (item) => item.courseId === Number(course.id)
          ) || false;

        return (
          <Grid item xs={12} sm={6} md={3} key={course.id}>
            <CourseCardWrapper
              id={course.id}
              thumbnailSrc={course.image}
              tags={course.tags}
              title={course.title}
              chapters={course.totalChapters}
              rating={rating}
              reviewCount={reviewCount}
              instructor={course.createdBy}
              price={course.price}
              navigatePath={(id) => `/course-glossary/${id}`}
              isCourseInCart={isCourseInCart}
              onAddToCart={handleAddToCart}
              isLoadingCart={isAddingToCart}
            />
          </Grid>
        );
      })}
  </Grid>

          )}
        </Container>
      </Box>

      {/* -------------------------------------- */}
      {/* TRENDING COURSES */}
      {/* -------------------------------------- */}
      <Box component="section" sx={{ py: 6, bgcolor: alpha(theme.palette.grey[50], 0.5) }}>
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              color: '#0f1724',
              mb: 4,
            }}
          >
            Trending courses
          </Typography>

          <Grid container spacing={3}>
            {/* Most Popular Column */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: '#0f1724', fontSize: '1.125rem' }}
                  >
                    Most popular
                  </Typography>
                  <ArrowForwardIcon
                    sx={{
                      fontSize: '1.25rem',
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      '&:hover': { transform: 'translateX(4px)' },
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Stack>
                {(featuredCoursesData?.slice(0, 3) || []).map((course) => {
                  const rating = Number(course.rating || course.averageRating) || 0;

                  return (
                    <Card
                      key={course.id}
                      elevation={0}
                      sx={{
                        bgcolor: '#ffffff',
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                         mb: 2, 
                        transition: 'all 0.3s ease',
                        border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                        '&:hover': {
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                          transform: 'translateY(-2px)',
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
                            overflow: 'hidden',
                            flexShrink: 0,
                            bgcolor: theme.palette.grey[200],
                          }}
                        >
                          {course.image ? (
                            <CardMedia
                              component="img"
                              image={course.image}
                              alt={course.title}
                              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                              No Image
                            </Box>
                          )}
                        </Box>

                        {/* CONTENT */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>

                          {/* TITLE */}
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            {course.title}
                          </Typography>

                          {/* TAG */}
                          <Typography variant="caption">
                            {course.tags?.[0] || 'Course'}
                          </Typography>

                          {/* ✅ DYNAMIC RATING */}
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Rating
                              value={rating}
                              precision={0.1}
                              readOnly
                              size="small"
                            />
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                              {rating.toFixed(1)}
                            </Typography>
                          </Stack>

                        </Box>
                      </Stack>
                    </Card>
                  );
                })}
              </Box>
            </Grid>

            {/* Weekly Spotlight Column */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: '#0f1724', fontSize: '1.125rem' }}
                  >
                    Weekly spotlight
                  </Typography>
                  <ArrowForwardIcon
                    sx={{
                      fontSize: '1.25rem',
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      '&:hover': { transform: 'translateX(4px)' },
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Stack>

                <Stack spacing={2.5}>
                  {(featuredCoursesData?.slice(1, 4) || []).map((course, index) => {
                    const rating = Number(course.rating || course.averageRating) || 0;

                    return (
                      <Card
                        key={course.id || `spotlight-${index}`}
                        elevation={0}
                        sx={{
                          bgcolor: '#ffffff',
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                          '&:hover': {
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                            transform: 'translateY(-2px)',
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
                              overflow: 'hidden',
                              flexShrink: 0,
                              bgcolor: theme.palette.grey[200],
                            }}
                          >
                            {course.image ? (
                              <CardMedia
                                component="img"
                                image={course.image}
                                alt={course.title}
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                No Image
                              </Box>
                            )}
                          </Box>

                          {/* CONTENT */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>

                            {/* AUTHOR */}
                            <Typography variant="caption">
                              {course.createdBy || 'Tiiron'}
                            </Typography>

                            {/* TITLE */}
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                mb: 0.5,
                              }}
                            >
                              {course.title}
                            </Typography>

                            {/* TAG */}
                            <Typography variant="caption">
                              {course.tags?.[0] || 'Course'}
                            </Typography>

                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <Rating
                                value={rating}
                                precision={0.1}
                                readOnly
                                size="small"
                              />
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {rating.toFixed(1)}
                              </Typography>
                            </Stack>

                          </Box>
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              </Box>
            </Grid>

            {/* In-demand AI skills Column */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: '#0f1724', fontSize: '1.125rem' }}
                  >
                    In-demand AI skills
                  </Typography>
                  <ArrowForwardIcon
                    sx={{
                      fontSize: '1.25rem',
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      '&:hover': { transform: 'translateX(4px)' },
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Stack>

                <Stack spacing={2.5}>
                  {(() => {
                    const aiCourses =
                      featuredCoursesData?.filter(
                        (c) =>
                          c.title?.toLowerCase().includes('ai') ||
                          c.title?.toLowerCase().includes('artificial intelligence') ||
                          c.tags?.some((tag) => tag?.toLowerCase().includes('ai'))
                      ) || [];

                    const displayCourses =
                      aiCourses.length >= 3
                        ? aiCourses.slice(0, 3)
                        : [
                          ...aiCourses,
                          ...(featuredCoursesData?.slice(0, 3 - aiCourses.length) || []),
                        ];

                    return displayCourses.slice(0, 3).map((displayCourse, index) => {
                      if (!displayCourse) return null;

                      // ✅ Dynamic rating
                      const rating =
                        Number(displayCourse.rating || displayCourse.averageRating) || 0;

                      return (
                        <Card
                          key={displayCourse.id || `ai-${index}`}
                          elevation={0}
                          sx={{
                            bgcolor: '#ffffff',
                            borderRadius: 2,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                            '&:hover': {
                              boxShadow: `0 4px 12px ${alpha(
                                theme.palette.primary.main,
                                0.15
                              )}`,
                              transform: 'translateY(-2px)',
                            },
                          }}
                          onClick={() =>
                            navigate(`/course-glossary/${displayCourse.id}`)
                          }
                        >
                          <Stack direction="row" spacing={2} sx={{ p: 1.5 }}>

                            {/* IMAGE */}
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 1.5,
                                overflow: 'hidden',
                                flexShrink: 0,
                                bgcolor: theme.palette.grey[200],
                              }}
                            >
                              {displayCourse.image ? (
                                <CardMedia
                                  component="img"
                                  image={displayCourse.image}
                                  alt={displayCourse.title}
                                  sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                />
                              ) : (
                                <Box
                                  sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  No Image
                                </Box>
                              )}
                            </Box>

                            {/* CONTENT */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>

                              {/* AUTHOR */}
                              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                                <Box
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    bgcolor: '#9333EA',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.625rem',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                  }}
                                >
                                  {displayCourse.createdBy?.[0]?.toUpperCase() || 'A'}
                                </Box>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#556080',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {displayCourse.createdBy || 'Tiiron'}
                                </Typography>
                              </Stack>

                              {/* TITLE */}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  color: '#0f1724',
                                  fontSize: '0.875rem',
                                  mb: 0.5,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  lineHeight: 1.3,
                                }}
                              >
                                {displayCourse.title}
                              </Typography>

                              {/* TAG */}
                              <Typography
                                variant="caption"
                                sx={{
                                  color: '#556080',
                                  fontSize: '0.6875rem',
                                  mb: 0.5,
                                }}
                              >
                                {displayCourse.tags?.[0] || 'AI Course'}
                              </Typography>

                              {/* ✅ DYNAMIC RATING */}
                              <Stack direction="row" alignItems="center" spacing={0.5}>
                                <Rating
                                  value={rating}
                                  precision={0.1}
                                  readOnly
                                  size="small"
                                  sx={{
                                    '& .MuiRating-iconFilled': {
                                      color: '#FFB400',
                                    },
                                    '& .MuiRating-iconEmpty': {
                                      color: '#E2E8F0',
                                    },
                                    '& .MuiRating-icon': {
                                      fontSize: '0.875rem',
                                    },
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#556080',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                  }}
                                >
                                  {rating.toFixed(1)}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </Card>
                      );
                    });
                  })()}
                </Stack>
              </Box>
            </Grid>
          </Grid>
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
                  <Typography variant="body2">{p.courses} courses • {p.time}</Typography>
                  <Button 
                  onClick={()=>navigate('/browse-courses')}
                  variant="contained" size="small" sx={{ mt: 2 }}>
                    Start Path
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* -------------------------------------- */}
      {/* TESTIMONIALS */}
      {/* -------------------------------------- */}
     

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
        <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb" }} />
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
        sx={{ color: "#64748b", fontSize: "0.95rem", mt: 1.2, maxWidth: 420, mx: "auto" }}
      >
        Real stories from students who levelled up — no filters, no scripts.
      </Typography>
    </Box>

    {/* ── Cards Grid ── */}
    <Grid container spacing={2.5}>
      {testimonials.map((t, i) => (
        <Grid item xs={12} md={4} key={i}>
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
                    sx={{ fontSize: "13px", color: "#f59e0b", lineHeight: 1 }}
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
              <Box sx={{ height: "1px", background: "#e2e8f0", mb: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
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
                    sx={{ fontSize: "0.87rem", color: "#0f172a", lineHeight: 1.2 }}
                  >
                    {t.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#64748b", fontWeight: 500, mt: "2px", display: "block" }}
                  >
                    {t.tag}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>

  </Container>
</Box>



      {/* -------------------------------------- */}
      {/* CTA */}
      {/* -------------------------------------- */}
      <Container maxWidth="lg" sx={{ pt: 5, pb: 6 }}>
        <Card
          sx={{
            p: 4,
            textAlign: 'center',
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

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
            onClick={()=>navigate("/browse-course/free")}
              variant="contained"
              sx={{
                px: 5,
                py: 1,
                borderRadius: 3,
                fontSize: '1.1rem',
              }}
            >
              Start Free Trial
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/browse-courses')}
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
