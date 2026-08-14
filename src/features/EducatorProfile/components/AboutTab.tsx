import React from 'react';
import { Box, Grid, Card, Typography, Link, Rating, Stack, Chip, Skeleton } from '@mui/material';
import { Star, TrendingUp, NewReleases, LocalFireDepartment, EmojiEvents, MenuBook } from '@mui/icons-material';
import { EducatorProfileData } from '../types/educator.types';

// Raw course shape as returned by getCoursesByUsername
export interface RawCourse {
  id: number | string;
  title: string;
  description?: string;
  language?: string[];
  level?: string;
  image?: string | null;
  isFree?: boolean;
  price?: number;
  totalChapters?: number;
  averageRating?: number;
  totalRatings?: number;
  createdAt?: string;
  createdBy?: string;
}

interface AboutTabProps {
  data: EducatorProfileData;
  courses?: RawCourse[];
  isCoursesLoading?: boolean;
}

const COLORS = ['#4F46E5', '#0EA5E9', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];
const colorForIndex = (i: number) => COLORS[i % COLORS.length];

const isRecentlyAdded = (createdAt?: string) => {
  if (!createdAt) return false;
  const days = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return days <= 14;
};

const initials = (title: string) =>
  title
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('');

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Box sx={{ color: '#CBD5E1', mb: 1 }}>{icon}</Box>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
      <Stack direction="row" alignItems="center" spacing={1.2}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#EEF2FF',
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
          {title}
        </Typography>
      </Stack>
      {action}
    </Stack>
  );
}

function CourseRow({ course, index, isNew }: { course: RawCourse; index: number; isNew?: boolean }) {
  const rating = course.averageRating ?? 0;
  const ratingsLabel =
    course.totalRatings && course.totalRatings > 0
      ? `${course.totalRatings} rating${course.totalRatings > 1 ? 's' : ''}`
      : 'No ratings yet';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        p: 1,
        borderRadius: 2.5,
        transition: 'background-color .15s ease',
        '&:hover': { bgcolor: '#F8FAFC' },
        '&:not(:last-of-type)': { mb: 0.5 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 76,
          height: 56,
          borderRadius: 2,
          overflow: 'hidden',
          flexShrink: 0,
          bgcolor: colorForIndex(index),
          backgroundImage: course.image ? `url(${course.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 800,
          fontSize: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {!course.image && initials(course.title)}
        {isNew && (
          <Chip
            label="New"
            size="small"
            sx={{
              position: 'absolute',
              top: -6,
              right: -6,
              height: 18,
              fontSize: 9,
              fontWeight: 800,
              bgcolor: '#4F46E5',
              color: 'white',
              boxShadow: '0 2px 6px rgba(79,70,229,0.4)',
            }}
          />
        )}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3 }} noWrap>
          {course.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.2 }}>
          {ratingsLabel}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.4} sx={{ mt: 0.3 }}>
          <Star sx={{ color: '#F59E0B', fontSize: 14 }} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827' }}>
            {rating.toFixed(1)}
          </Typography>
        </Stack>
      </Box>
      <Chip
        label={course.isFree ? 'Free' : `₹${course.price ?? 0}`}
        size="small"
        sx={{
          fontWeight: 700,
          fontSize: 11,
          bgcolor: course.isFree ? '#ECFDF5' : '#F1F5F9',
          color: course.isFree ? '#059669' : '#334155',
        }}
      />
    </Box>
  );
}

function CourseRowSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 1.5, alignItems: 'center' }}>
      <Skeleton variant="rounded" width={76} height={56} sx={{ borderRadius: 2, flexShrink: 0 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="30%" />
      </Box>
    </Box>
  );
}

const cardSx = {
  borderRadius: 4,
  p: { xs: 2, sm: 3 },
  border: '1px solid',
  borderColor: '#EEF0F4',
  boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
};

export default function AboutTab({ data, courses = [], isCoursesLoading = false }: AboutTabProps) {
  // Sorted by rating (highest first) — this drives "Top Courses"
  const topCourses = [...courses].sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));

  // Most reviewed → "Featured Courses"
  const featuredCourses = [...courses]
    .sort((a, b) => (b.totalRatings ?? 0) - (a.totalRatings ?? 0))
    .slice(0, 3);

  // Latest added → "Recent Courses"
  const recentCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 3);

  // Real rating data (no fabricated names/comments) → "Top Rated" panel
  const topRated = [...courses]
    .filter((c) => (c.averageRating ?? 0) > 0)
    .sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
    .slice(0, 4);

  return (
    <Grid container spacing={3} sx={{ mt: 0.5 }}>
      <Grid item xs={12} md={7}>
        <Card sx={{ ...cardSx, mb: 3, minHeight: '260px' }}>
          <SectionHeader icon={<TrendingUp sx={{ color: '#4F46E5', fontSize: 20 }} />} title="Top Courses" />

          {isCoursesLoading ? (
            <>
              <CourseRowSkeleton />
              <CourseRowSkeleton />
            </>
          ) : topCourses.length > 0 ? (
            topCourses.slice(0, 5).map((course, i) => <CourseRow key={course.id} course={course} index={i} />)
          ) : (
            <EmptyState icon={<MenuBook sx={{ fontSize: 40 }} />} text="No courses yet" />
          )}
        </Card>

        <Card sx={cardSx}>
          <SectionHeader icon={<NewReleases sx={{ color: '#4F46E5', fontSize: 20 }} />} title="Recent Courses" />

          {isCoursesLoading ? (
            <>
              <CourseRowSkeleton />
              <CourseRowSkeleton />
            </>
          ) : recentCourses.length > 0 ? (
            recentCourses.map((course, i) => (
              <CourseRow key={course.id} course={course} index={i} isNew={isRecentlyAdded(course.createdAt)} />
            ))
          ) : (
            <EmptyState icon={<NewReleases sx={{ fontSize: 40 }} />} text="No courses yet" />
          )}
        </Card>
      </Grid>

      <Grid item xs={12} md={5}>
        <Card sx={{ ...cardSx, mb: 3 }}>
          <SectionHeader
            icon={<LocalFireDepartment sx={{ color: '#F59E0B', fontSize: 20 }} />}
            title="Featured Courses"
            action={
              featuredCourses.length > 0 && (
                <Link href="#" variant="body2" sx={{ color: '#4F46E5', fontWeight: 700, fontSize: 13 }}>
                  View all →
                </Link>
              )
            }
          />

          {isCoursesLoading ? (
            <>
              <CourseRowSkeleton />
              <CourseRowSkeleton />
            </>
          ) : featuredCourses.length > 0 ? (
            featuredCourses.map((course, i) => (
              <Box
                key={course.id}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 2.5,
                  transition: 'background-color .15s ease',
                  '&:hover': { bgcolor: '#F8FAFC' },
                  '&:not(:last-of-type)': { mb: 0.5 },
                }}
              >
                <Box
                  sx={{
                    width: 68,
                    height: 48,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: colorForIndex(i),
                    backgroundImage: course.image ? `url(${course.image})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: 12,
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {!course.image && initials(course.title)}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
                    {course.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.2 }}>
                    {course.isFree ? 'Free' : `₹${course.price ?? 0}`}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.4} sx={{ mt: 0.2 }}>
                    <Star sx={{ color: '#F59E0B', fontSize: 13 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827' }}>
                      {(course.averageRating ?? 0).toFixed(1)}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            ))
          ) : (
            <EmptyState icon={<LocalFireDepartment sx={{ fontSize: 40 }} />} text="No courses yet" />
          )}
        </Card>

        <Card sx={cardSx}>
          <SectionHeader
            icon={<EmojiEvents sx={{ color: '#4F46E5', fontSize: 20 }} />}
            title="Top Rated"
            action={
              topRated.length > 0 && (
                <Link href="#" variant="body2" sx={{ color: '#4F46E5', fontWeight: 700, fontSize: 13 }}>
                  View all →
                </Link>
              )
            }
          />

          {isCoursesLoading ? (
            <>
              <CourseRowSkeleton />
              <CourseRowSkeleton />
            </>
          ) : topRated.length > 0 ? (
            <Stack spacing={1.5}>
              {topRated.map((course) => (
                <Stack
                  key={course.id}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: '#F8FAFC',
                    border: '1px solid #EEF0F4',
                  }}
                >
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
                      {course.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mt: 0.3 }}>
                      <Rating value={course.averageRating ?? 0} readOnly size="small" precision={0.5} />
                      <Typography variant="caption" color="text.secondary">
                        ({course.totalRatings ?? 0})
                      </Typography>
                    </Stack>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#F59E0B', flexShrink: 0 }}>
                    {(course.averageRating ?? 0).toFixed(1)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <EmptyState icon={<Star sx={{ fontSize: 40 }} />} text="No ratings yet" />
          )}
        </Card>
      </Grid>
    </Grid>
  );
}