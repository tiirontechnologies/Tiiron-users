import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { keyframes } from '@mui/system';
import {
  Search as SearchIcon,
  PlayArrow as PlayArrowIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  Bolt as BoltIcon,
  People as PeopleIcon,
  EmojiEvents as EmojiEventsIcon,
  ChevronRight as ChevronRightIcon,
  MenuBook as MenuBookIcon,
  GpsFixed as GpsFixedIcon,
  AutoAwesome as AutoAwesomeIcon,
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { token } = useAuth();

  // Fetch courses for Featured Courses section
  const queryArgs = { limit: 4, page: 1 };
  const {
    data: browseData,
    isFetching: fetchingBrowse,
    isError: errorBrowse,
  } = useGetCourseForFeedQuery(queryArgs);

  // Cart data for checking if course is in cart (only if logged in)
  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
    skip: !token, // Skip if not logged in
  });

  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartServerMutation();

  const typedBrowseData = browseData as { data: { courses: ICourse[] } };
  const featuredCoursesData: ICourse[] = typedBrowseData?.data?.courses || [];

  // Handler for adding to cart - check authentication first
  const handleAddToCart = async (courseId: number) => {
    if (!token) {
      // Redirect to sign-up if not logged in
      navigate('/sign-up');
      return;
    }
    try {
      await addToCartServer({ courseId }).unwrap();
    } catch (error) {
      console.error('Failed to add course to cart:', error);
    }
  };

  const pulseAnimation = keyframes`
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  `;

  const categories = [
    { name: 'Data Science', icon: '📊', courses: 450, color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
    { name: 'Web Development', icon: '💻', courses: 680, color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' },
    { name: 'AI & Machine Learning', icon: '🤖', courses: 320, color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { name: 'Design', icon: '🎨', courses: 540, color: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' },
  ];

  const learningPaths = [
    {
      title: 'Become a Data Scientist',
      duration: '6 months',
      courses: 12,
      level: 'Beginner to Advanced',
      icon: <GpsFixedIcon sx={{ fontSize: 24 }} />
    },
    {
      title: 'Master Full-Stack Development',
      duration: '8 months',
      courses: 15,
      level: 'Intermediate',
      icon: <BoltIcon sx={{ fontSize: 24 }} />
    },
    {
      title: 'AI Engineering Track',
      duration: '10 months',
      courses: 18,
      level: 'Advanced',
      icon: <PsychologyIcon sx={{ fontSize: 24 }} />
    },
  ];

  const stats = [
    { value: '50K+', label: 'Active Learners' },
    { value: '1,200+', label: 'Expert Courses' },
    { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'AI Support' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.grey[50], 1)} 0%, ${alpha(theme.palette.common.white, 1)} 100%)`,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha('#9333ea', 0.1)} 0%, ${alpha(theme.palette.common.white, 1)} 50%, ${alpha('#3b82f6', 0.1)} 100%)`,
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label="AI-Powered Learning Platform"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    width: 'fit-content',
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    color: theme.palette.grey[900],
                    lineHeight: 1.2,
                  }}
                >
                  Learn Like a{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Scientist
                  </Box>
                  <br />
                  Grow Like a{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Creator
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.grey[600],
                    lineHeight: 1.7,
                    fontWeight: 400,
                  }}
                >
                  Tiiron helps learners question, test, and refine concepts through curiosity-driven learning.
                  Form hypotheses, experiment fearlessly, and evolve with evidence.
                </Typography>

                {/* Search Bar */}
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    placeholder="What do you want to learn today?"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: theme.palette.grey[400] }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                              px: 3,
                              py: 1,
                              borderRadius: 2,
                              fontWeight: 600,
                              textTransform: 'none',
                              boxShadow: theme.shadows[4],
                              '&:hover': {
                                boxShadow: theme.shadows[8],
                                background: 'linear-gradient(135deg, #7e22ce 0%, #1d4ed8 100%)',
                              },
                            }}
                          >
                            Explore
                          </Button>
                        </InputAdornment>
                      ),
                      sx: {
                        py: 1.5,
                        pl: 3,
                        pr: 1,
                        fontSize: '1.125rem',
                        borderRadius: 3,
                        border: `2px solid ${theme.palette.grey[200]}`,
                        '&:focus-within': {
                          border: `2px solid ${theme.palette.primary.main}`,
                        },
                      },
                    }}
                  />
                </Box>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      textTransform: 'none',
                      boxShadow: theme.shadows[8],
                      '&:hover': {
                        boxShadow: theme.shadows[12],
                        transform: 'translateY(-2px)',
                        background: 'linear-gradient(135deg, #7e22ce 0%, #1d4ed8 100%)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      textTransform: 'none',
                      borderWidth: 2,
                      borderColor: theme.palette.grey[300],
                      color: theme.palette.grey[700],
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                    }}
                  >
                    Watch Demo
                  </Button>
                </Stack>

                <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
                  🎁 No credit card required • 14-day free trial • Cancel anytime
                </Typography>
              </Stack>
            </Grid>

            {/* Right Visual */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Card
                  sx={{
                    position: 'relative',
                    zIndex: 10,
                    bgcolor: theme.palette.common.white,
                    borderRadius: 4,
                    p: 3,
                    boxShadow: theme.shadows[12],
                    border: `1px solid ${theme.palette.grey[100]}`,
                  }}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderRadius: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.palette.common.white,
                          fontWeight: 700,
                          fontSize: '1.25rem',
                        }}
                      >
                        T
                      </Box>
                      <Box>
                        <Typography fontWeight={600} color={theme.palette.grey[900]}>
                          Your AI Mentor
                        </Typography>
                        <Typography variant="body2" color={theme.palette.grey[500]}>
                          Always here to guide you
                        </Typography>
                      </Box>
                    </Box>

                    {['Practice Mode Active', 'Analytics Dashboard', 'Progress Tracking'].map((feature, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: theme.palette.grey[50],
                          },
                          transition: 'background-color 0.2s',
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: theme.palette.success.main,
                            borderRadius: '50%',
                            animation: `${pulseAnimation} 2s ease-in-out infinite`,
                          }}
                        />
                        <Typography color={theme.palette.grey[700]}>{feature}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>

                {/* Floating Stats */}
                <Card
                  sx={{
                    position: 'absolute',
                    top: -24,
                    right: -24,
                    bgcolor: theme.palette.common.white,
                    borderRadius: 3,
                    p: 2,
                    boxShadow: theme.shadows[8],
                    border: `1px solid ${theme.palette.grey[100]}`,
                    zIndex: 20,
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main}>
                    98%
                  </Typography>
                  <Typography variant="body2" color={theme.palette.grey[600]}>
                    Success Rate
                  </Typography>
                </Card>

                <Card
                  sx={{
                    position: 'absolute',
                    bottom: -24,
                    left: -24,
                    bgcolor: theme.palette.common.white,
                    borderRadius: 3,
                    p: 2,
                    boxShadow: theme.shadows[8],
                    border: `1px solid ${theme.palette.grey[100]}`,
                    zIndex: 20,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PeopleIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#2563eb">
                        50K+
                      </Typography>
                      <Typography variant="caption" color={theme.palette.grey[600]}>
                        Learners
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Stats Bar */}
          <Grid container spacing={4} sx={{ mt: 5 }}>
            {stats.map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography color={theme.palette.grey[600]} sx={{ mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={700} color={theme.palette.grey[900]} sx={{ mb: 2 }}>
            Explore by Category
          </Typography>
          <Typography variant="h6" color={theme.palette.grey[600]}>
            Find the perfect learning path for your goals
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Card
                onMouseEnter={() => setHoveredCard(`cat-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  background: cat.color,
                  p: 4,
                  borderRadius: 4,
                  color: theme.palette.common.white,
                  cursor: 'pointer',
                  transform: hoveredCard === `cat-${i}` ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredCard === `cat-${i}` ? theme.shadows[12] : theme.shadows[4],
                  height: '100%',
                }}
              >
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {cat.icon}
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                  {cat.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {cat.courses} courses
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Courses */}
      <Box
        sx={{
          background: `linear-gradient(to bottom, ${theme.palette.common.white} 0%, ${alpha(theme.palette.grey[50], 1)} 100%)`,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
            <Box>
              <Typography variant="h2" fontWeight={700} color={theme.palette.grey[900]} sx={{ mb: 1 }}>
                Featured Courses
              </Typography>
              <Typography color={theme.palette.grey[600]}>Top-rated courses chosen by our AI</Typography>
            </Box>
            <Button
              endIcon={<ChevronRightIcon />}
              onClick={() => navigate('/learner/browse-courses')}
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: "#ffffff",
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                px: 2,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'none',
                },
                transition: 'background-color 0.2s ease',
              }}
            >
              View All
            </Button>
          </Stack>

          {fetchingBrowse ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <Loader />
            </Box>
          ) : errorBrowse ? (
            <Typography sx={{ width: "100%", textAlign: "center", py: 8, color: theme.palette.error.main }}>
              Failed to load courses. Please try again later.
            </Typography>
          ) : featuredCoursesData.length === 0 ? (
            <Typography sx={{ width: "100%", textAlign: "center", py: 8, color: theme.palette.grey[600] }}>
              No courses available at the moment.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {featuredCoursesData.map((course) => {
                const courseId = Number(course.id);
                const isCourseInCart =
                  cartData?.data?.items?.some(
                    (item) => item.courseId === courseId
                  ) || false;

                // Generate mock rating and review count for demo purposes
                // In production, this should come from the API
                const mockRating = (4.5 + Math.random() * 0.5).toFixed(1);
                const mockReviewCount = Math.floor(Math.random() * 15000) + 1000;

                return (
                  <Grid item xs={12} sm={6} md={3} key={course.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: { xs: '290px', md: '100%' },
                        '& > *': {
                          width: '100% !important',
                          maxWidth: '100%',
                        },
                      }}
                    >
                      <CourseCardWrapper
                        id={courseId}
                        thumbnailSrc={course.image}
                        tags={course.tags}
                        title={course.title}
                        chapters={course.totalChapters}
                        rating={parseFloat(mockRating)}
                        reviewCount={mockReviewCount}
                        instructor={course.createdBy || course.orgCode || ""}
                        price={course.price}
                        navigatePath={(id) => `/course-glossary/${id}`}
                        isCourseInCart={isCourseInCart}
                        onAddToCart={handleAddToCart}
                        isLoadingCart={isAddingToCart}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Learning Paths */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={700} color={theme.palette.grey[900]} sx={{ mb: 2 }}>
            Structured Learning Paths
          </Typography>
          <Typography variant="h6" color={theme.palette.grey[600]}>
            Follow expert-designed curricula to master your field
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {learningPaths.map((path, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                sx={{
                  bgcolor: theme.palette.common.white,
                  borderRadius: 4,
                  p: 4,
                  boxShadow: theme.shadows[4],
                  border: `2px solid ${theme.palette.grey[100]}`,
                  height: '100%',
                  '&:hover': {
                    boxShadow: theme.shadows[12],
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.common.white,
                    mb: 3,
                  }}
                >
                  {path.icon}
                </Box>
                <Typography variant="h5" fontWeight={700} color={theme.palette.grey[900]} sx={{ mb: 2 }}>
                  {path.title}
                </Typography>
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.grey[600]}>
                    <MenuBookIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">{path.courses} courses</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.grey[600]}>
                    <EmojiEventsIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">{path.level}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.grey[600]}>
                    <TrendingUpIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">{path.duration}</Typography>
                  </Stack>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      background: 'linear-gradient(135deg, #7e22ce 0%, #1d4ed8 100%)',
                    },
                  }}
                >
                  Start Path
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Philosophy Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 50%, #06b6d4 100%)',
          py: 5,
          color: theme.palette.common.white,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{
                mb: 3,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Learning That Thinks Like You
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                lineHeight: 1.7,
                opacity: 0.95,
              }}
            >
              At Tiiron, learning isn't about memorizing — it's about curiosity, experimentation, and evolution.
              Just like scientists, our learners question deeply, test boldly, and grow through reflection and evidence.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" flexWrap="wrap">
              <Typography variant="h5" fontWeight={700}>
                Think
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.5 }}>
                •
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                Experiment
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.5 }}>
                •
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                Evolve
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Card
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha('#2563eb', 0.1)} 100%)`,
            borderRadius: 6,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            color={theme.palette.grey[900]}
            sx={{
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" color={theme.palette.grey[600]} sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Join thousands of learners using Tiiron to transform curiosity into mastery
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #9333ea 0%, #2563eb 100%)',
                px: 5,
                py: 2.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.125rem',
                textTransform: 'none',
                boxShadow: theme.shadows[12],
                '&:hover': {
                  boxShadow: theme.shadows[16],
                  transform: 'translateY(-2px)',
                  background: 'linear-gradient(135deg, #7e22ce 0%, #1d4ed8 100%)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              sx={{
                bgcolor: theme.palette.common.white,
                color: theme.palette.grey[700],
                px: 5,
                py: 2.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.125rem',
                textTransform: 'none',
                borderWidth: 2,
                borderColor: theme.palette.grey[300],
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  borderWidth: 2,
                },
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