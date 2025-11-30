/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
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
} from '@mui/material';

import {
  Search as SearchIcon,
  PlayArrow as PlayArrowIcon,
  ChevronRight as ChevronRightIcon,
  FlashOn as FlashOnIcon,
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
  const { token } = useAuth();
  const [query, setQuery] = useState('');

  // 🔹 Featured courses
  const { data: browseData, isFetching: fetchingBrowse, isError: errorBrowse } =
    useGetCourseForFeedQuery({ limit: 4, page: 1 });

  const featuredCoursesData: ICourse[] =
    (browseData as any)?.data?.courses || [];

  // 🔹 Cart Data
  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
    skip: !token,
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  // 🔹 Categories
  const CATEGORIES = [
    { id: 'data-science', title: 'Data Science', count: 450 },
    { id: 'web-dev', title: 'Web Development', count: 380 },
    { id: 'ai', title: 'AI & Machine Learning', count: 320 },
    { id: 'design', title: 'Design', count: 140 },
  ];

  // 🔹 Learning Paths
  const paths = [
    { title: 'Become a Data Scientist', courses: 12, time: '8 months', level: 'Beginner → Advanced' },
    { title: 'Master Full-Stack Development', courses: 15, time: '9 months', level: 'Intermediate' },
    { title: 'AI Engineering Track', courses: 18, time: '10 months', level: 'Advanced' },
  ];

  // 🔹 Testimonials
  const testimonials = [
    { name: 'Aman', text: 'I improved my interview performance and landed a job in 3 months.', tag: 'Data Scientist' },
    { name: 'Priya', text: 'The AI quizzes made studying focused and efficient.', tag: 'Frontend Dev' },
    { name: 'Rohit', text: 'Clear paths and project-based tasks helped me build a portfolio.', tag: 'Full-stack' },
  ];

  const stats = [
    { value: '50K+', label: 'Active Learners' },
    { value: '1,200+', label: 'Expert Courses' },
    { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'AI Support' },
  ];

  // Handlers
  const onSearch = (query?: string) => {
    if (!query.trim()) return;
    navigate(`/learner/browse-courses?search=${encodeURIComponent(query)}`);
  };

  const onPickCategory = (categoryId: string) => {
    navigate(`/learner/browse-courses?category=${categoryId}`);
  };

  const handleAddToCart = async (courseId: number) => {
    if (!token) return navigate('/sign-up');
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
      <Box component="section" sx={{ bgcolor: '#f6f8ff', py: { xs: 6, md: 10 } }}>
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
                <Button variant="contained" size="large" sx={{ bgcolor: '#5b3cff' }}>
                  Start Learning Free
                </Button>

                <Button variant="outlined" size="large">
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
              <Card elevation={6} sx={{ borderRadius: 3 }}>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography variant="caption" sx={{ color: '#667085' }}>
                    AI Mentor
                  </Typography>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Practice Mode Active
                  </Typography>

                  <Stack spacing={1} component="ul" sx={{ pl: 2 }}>
                    <Typography component="li">Personalized quizzes</Typography>
                    <Typography component="li">Analytics dashboard</Typography>
                    <Typography component="li">Progress tracking</Typography>
                  </Stack>

                  <Chip
                    label="98% Success"
                    size="small"
                    sx={{ mt: 3, bgcolor: '#eef2ff', fontWeight: 700 }}
                  />
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
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 6 }}>
            <Box>
              <Typography variant="h2" fontWeight={700}>
                Featured Courses
              </Typography>
              <Typography>Top-rated courses chosen by our AI</Typography>
            </Box>

            <Button endIcon={<ChevronRightIcon />} onClick={() => navigate('/learner/browse-courses')}>
              View All
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
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Card
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 6,
            background: alpha(theme.palette.primary.main, 0.08),
          }}
        >
          <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
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
                py: 2,
                borderRadius: 3,
                fontSize: '1.1rem',
              }}
            >
              Start Free Trial
            </Button>

            <Button
              variant="outlined"
              sx={{
                px: 5,
                py: 2,
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
