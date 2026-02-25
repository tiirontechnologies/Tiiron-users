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
} from '../features/course-browse/api/courseApi';

import { ICourse } from 'types/course.types';
import Loader from '@components/ui/Spinner';
import { useAuth } from '../hooks/useAuth';

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
    { value: '5K+', label: 'Active Learners' },
    { value: '12+', label: 'Expert Courses' },
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
      {/* -------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------- */}
      <Box component="section" sx={{ bgcolor: '#f6f8ff', py: { xs: 6, md: 8 } }}>
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

            {/* RIGHT */}
            <Grid item xs={12} md={5}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
                  {/* Header */}
                  <Box sx={{ mb: 3 }}>
                    <Chip
                      label="AI Mentor"
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        mb: 1.5,
                        height: 24,
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: '#0f1724',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      Practice Mode Active
                    </Typography>
                  </Box>

                  {/* Features List */}
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    {[
                      'Personalized quizzes',
                      'Analytics dashboard',
                      'Progress tracking',
                    ].map((feature, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              color: '#ffffff',
                              fontSize: 14,
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: '#1e293b',
                            fontSize: '0.9375rem',
                          }}
                        >
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  {/* Success Metric */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '2rem',
                          fontWeight: 800,
                          color: theme.palette.primary.main,
                          lineHeight: 1,
                        }}
                      >
                        98%
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: '#556080',
                          mt: 0.5,
                        }}
                      >
                        Success Rate
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                      }}
                    >
                      <CheckCircleIcon sx={{ color: '#ffffff', fontSize: 28 }} />
                    </Box>
                  </Box>
                </Box>
              </Card>

              {/* Floating Action Buttons */}
              {/* <Box
                sx={{
                  position: 'fixed',
                  right: 20,
                  bottom: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  zIndex: 2000,
                }}
              >
                <Fab variant="extended" sx={{ bgcolor: '#5b3cff', color: '#fff' }}>
                  <FlashOnIcon sx={{ mr: 1 }} /> Quiz
                </Fab>

                <Fab size="small" sx={{ bgcolor: '#fff', boxShadow: 3 }}>
                  <SearchIcon />
                </Fab>
              </Box> */}
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
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Loader />
            </Box>
          ) : errorBrowse ? (
            <Typography sx={{ textAlign: 'center', color: 'error.main', py: 8 }}>
              Failed to load courses.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {featuredCoursesData?.map((course) => {
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
                      rating={4.7}
                      reviewCount={1200}
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

                <Stack spacing={2.5}>
                  {(featuredCoursesData?.slice(0, 3) || []).map((course) => (
                    <Card
                      key={course.id}
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
                                color: theme.palette.text.secondary,
                                fontSize: '0.75rem',
                              }}
                            >
                              No Image
                            </Box>
                          )}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            sx={{ mb: 0.5 }}
                          >
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.625rem',
                                color: '#ffffff',
                                fontWeight: 700,
                              }}
                            >
                              {course.createdBy?.[0]?.toUpperCase() || 'T'}
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
                              {course.createdBy || 'Tiiron'}
                            </Typography>
                          </Stack>

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
                            {course.title}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: '#556080',
                              fontSize: '0.6875rem',
                              mb: 0.5,
                            }}
                          >
                            {course.tags?.[0] || 'Course'}
                          </Typography>

                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Rating
                              value={4.8}
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
                              4.8
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
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
                  {(featuredCoursesData?.slice(1, 4) || []).map((course, index) => (
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
                                color: theme.palette.text.secondary,
                                fontSize: '0.75rem',
                              }}
                            >
                              No Image
                            </Box>
                          )}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            sx={{ mb: 0.5 }}
                          >
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: theme.palette.secondary?.main || theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.625rem',
                                color: '#ffffff',
                                fontWeight: 700,
                              }}
                            >
                              {course.createdBy?.[0]?.toUpperCase() || 'T'}
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
                              {course.createdBy || 'Tiiron'}
                            </Typography>
                          </Stack>

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
                            {course.title}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: '#556080',
                              fontSize: '0.6875rem',
                              mb: 0.5,
                            }}
                          >
                            {course.tags?.[0] || 'Course'}
                          </Typography>

                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Rating
                              value={4.7}
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
                              4.7
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Card>
                  ))}
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
                    // Filter for AI-related courses if available, otherwise show first 3
                    const aiCourses = featuredCoursesData?.filter(
                      (c) =>
                        c.title?.toLowerCase().includes('ai') ||
                        c.title?.toLowerCase().includes('artificial intelligence') ||
                        c.tags?.some((tag) => tag?.toLowerCase().includes('ai'))
                    ) || [];

                    const displayCourses = aiCourses.length >= 3
                      ? aiCourses.slice(0, 3)
                      : [...(aiCourses || []), ...(featuredCoursesData?.slice(0, 3 - (aiCourses?.length || 0)) || [])];

                    return displayCourses.slice(0, 3).map((displayCourse, index) => {
                      if (!displayCourse) return null;
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
                              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                              transform: 'translateY(-2px)',
                            },
                          }}
                          onClick={() => navigate(`/course-glossary/${displayCourse.id}`)}
                        >
                          <Stack direction="row" spacing={2} sx={{ p: 1.5 }}>
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

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                                sx={{ mb: 0.5 }}
                              >
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

                              <Stack direction="row" alignItems="center" spacing={0.5}>
                                <Rating
                                  value={4.8}
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
                                  4.8
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
                  <Button variant="contained" size="small" sx={{ mt: 2 }}>
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
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" fontWeight={700}>Trusted by learners like you</Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography>"{t.text}"</Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>{t.name[0]}</Avatar>
                    <Box>
                      <Typography fontWeight={700}>{t.name}</Typography>
                      <Typography variant="caption">{t.tag}</Typography>
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
