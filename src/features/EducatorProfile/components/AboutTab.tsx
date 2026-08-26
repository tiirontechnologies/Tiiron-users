import React, { useMemo } from 'react';
import { Box, Grid, Card, Typography, Stack, Chip, Skeleton, Avatar } from '@mui/material';
import { Star, MenuBook, School, AutoAwesome, LocalOffer, Groups } from '@mui/icons-material';
import { EducatorProfileData } from '../types/educator.types';

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

const LIST_LIMIT = 3;
const STATIC_SUBSCRIBERS = 0;

function TypeBadge({ course }: { course: RawCourse }) {
  const free = course.isFree || Number(course.price) === 0;
  return (
    <Chip
      size="small"
      label={free ? 'Free' : `₹${course.price ?? 0}`}
      sx={{
        height: 17,
        fontSize: 9,
        fontWeight: 700,
        bgcolor: free ? '#ECFDF5' : '#EEF2FF',
        color: free ? '#059669' : '#4338CA',
      }}
    />
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ py: 2, textAlign: 'center', fontSize: 12.5, fontWeight: 500 }}
    >
      {message}
    </Typography>
  );
}

function CourseRowSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 0.9 }}>
      <Skeleton variant="rounded" width={64} height={48} sx={{ borderRadius: 1.5, flexShrink: 0 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
      </Box>
    </Box>
  );
}

function CourseRow({
  course,
  variant,ḥ
}: {
  course: RawCourse;
  variant: 'recent' | 'top';
}) {
  const rating = Number(course.averageRating ?? 0);
  const lessonCount = course.totalChapters ?? 0;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        p: 0.9,
        borderRadius: 2.5,
        border: '1px solid #EEF2F7',
        bgcolor: '#fff',
        transition: 'all .2s',
        '&:hover': {
          borderColor: variant === 'recent' ? '#C7D2FE' : '#FDE68A',
          boxShadow:
            variant === 'recent'
              ? '0 6px 16px rgba(79,70,229,.10)'
              : '0 6px 16px rgba(245,158,11,.12)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 48,
          flexShrink: 0,
          borderRadius: 1.5,
          overflow: 'hidden',
          bgcolor: '#EEF2FF',
        }}
      >
        <Box
          component="img"
          src={course.image || '/Tiiron_logo.png'}
          alt={course.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box minWidth={0} flex={1}>
        <Typography fontWeight={700} fontSize={12.5} noWrap>
          {course.title}
        </Typography>
        <Stack direction="row" spacing={0.6} alignItems="center" mt={0.3} flexWrap="wrap">
          {variant === 'top' ? (
            <>
              <Star sx={{ color: '#F59E0B', fontSize: 13 }} />
              <Typography variant="caption" fontWeight={700} fontSize={11}>
                {rating ? rating.toFixed(1) : 'New'}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontSize={11}>
                ({course.totalRatings ?? 0})
              </Typography>
            </>
          ) : (
            <Typography variant="caption" color="text.secondary" fontSize={11}>
              {course.createdAt
                ? new Date(course.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  })
                : '—'}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            • {lessonCount} lesson{lessonCount === 1 ? '' : 's'}
          </Typography>
        </Stack>
        <Box mt={0.5}>
          <TypeBadge course={course} />
        </Box>
      </Box>
    </Box>
  );
}

function StatTile({
  icon,
  value,
  label,
  bg,
  color,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bg: string;
  color: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        borderRadius: 2.5,
        p: 1.1,
        bgcolor: '#F8FAFC',
        transition: 'all .2s',
        '&:hover': { bgcolor: '#F1F5F9' },
      }}
    >
      <Avatar sx={{ width: 34, height: 34, bgcolor: bg, color, flexShrink: 0 }}>{icon}</Avatar>
      <Box minWidth={0}>
        <Typography fontWeight={800} fontSize={15} color="#1E293B" lineHeight={1.2}>
          {value}
        </Typography>
        <Typography fontSize={10.5} color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export default function AboutTab({ data, courses = [], isCoursesLoading = false }: AboutTabProps) {
  const { recentCourses, topCourses } = useMemo(() => {
    if (!courses.length) return { recentCourses: [], topCourses: [] };

    const top = [...courses]
      .filter((c) => Number(c.averageRating ?? 0) > 0)
      .sort((a, b) => Number(b.averageRating ?? 0) - Number(a.averageRating ?? 0))
      .slice(0, LIST_LIMIT);

    const topIds = new Set(top.map((c) => c.id));

    const recent = [...courses]
      .filter((c) => !topIds.has(c.id))
      .sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      )
      .slice(0, LIST_LIMIT);

    return { recentCourses: recent, topCourses: top };
  }, [courses]);

  const totalCourses = courses.length;
  const ratedCourses = courses.filter((c) => Number(c.averageRating ?? 0) > 0);
  const avgRating = ratedCourses.length
    ? (
        ratedCourses.reduce((sum, c) => sum + Number(c.averageRating ?? 0), 0) /
        ratedCourses.length
      ).toFixed(1)
    : '—';
  const totalLessons = courses.reduce((sum, c) => sum + Number(c.totalChapters ?? 0), 0);
  const freeCourses = courses.filter((c) => c.isFree || Number(c.price) === 0).length;

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      sx={{ width: '100%', maxWidth: '100%', m: 0, minWidth: 0, overflowX: 'clip' }}
    >
      {/* Left — Recent + Top, side by side columns */}
      <Grid item xs={12} md={8} sx={{ minWidth: 0 }}>
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,.06)',
                p: { xs: 1.5, sm: 2.25 },
                height: '100%',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={1.25}>
                <MenuBook sx={{ fontSize: 19, color: '#4F46E5' }} />
                <Typography variant="subtitle1" fontWeight={700} fontSize={15}>
                  Recent Courses
                </Typography>
              </Stack>
              {isCoursesLoading ? (
                <Stack spacing={1}>
                  <CourseRowSkeleton />
                  <CourseRowSkeleton />
                </Stack>
              ) : recentCourses.length ? (
                <Stack spacing={1}>
                  {recentCourses.map((c) => (
                    <CourseRow key={c.id} course={c} variant="recent" />
                  ))}
                </Stack>
              ) : (
                <EmptyState message="Create your first course to see it here." />
              )}
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,.06)',
                p: { xs: 1.5, sm: 2.25 },
                height: '100%',
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 100%)',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={1.25}>
                <Star sx={{ fontSize: 19, color: '#F59E0B' }} />
                <Typography variant="subtitle1" fontWeight={700} fontSize={15}>
                  Top Courses
                </Typography>
              </Stack>
              {isCoursesLoading ? (
                <Stack spacing={1}>
                  <CourseRowSkeleton />
                  <CourseRowSkeleton />
                </Stack>
              ) : topCourses.length ? (
                <Stack spacing={1}>
                  {topCourses.map((c) => (
                    <CourseRow key={c.id} course={c} variant="top" />
                  ))}
                </Stack>
              ) : (
                <EmptyState message="No top rated course yet." />
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Right — Educator Snapshot */}
      <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,.06)',
            p: { xs: 1.75, sm: 2.5 },
            height: '100%',
            background: 'linear-gradient(150deg, #FFFFFF 0%, #F5F3FF 100%)',
            border: '1px solid #EEF2FF',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={0.4}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                bgcolor: '#EEF2FF',
                color: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AutoAwesome sx={{ fontSize: 16 }} />
            </Box>
            <Typography variant="subtitle1" fontWeight={700} fontSize={15}>
              Educator Snapshot
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.5, fontSize: 12.5 }}
          >
            A quick look at your teaching journey on Tiiron.
          </Typography>

          <Stack spacing={1}>
            <StatTile
              icon={<School sx={{ fontSize: 17 }} />}
              value={isCoursesLoading ? '…' : totalCourses}
              label="Total Courses"
              bg="#EEF2FF"
              color="#4F46E5"
            />
            {/* <StatTile
              icon={<MenuBook sx={{ fontSize: 17 }} />}
              value={isCoursesLoading ? '…' : totalLessons}
              label="Lessons Delivered"
              bg="#ECFDF5"
              color="#059669"
            /> */}
            <StatTile
              icon={<Star sx={{ fontSize: 17 }} />}
              value={isCoursesLoading ? '…' : avgRating}
              label="Average Rating"
              bg="#FEF3C7"
              color="#B45309"
            />
            <StatTile
              icon={<LocalOffer sx={{ fontSize: 17 }} />}
              value={isCoursesLoading ? '…' : freeCourses}
              label="Free Courses"
              bg="#EFF6FF"
              color="#2563EB"
            />
            <StatTile
              icon={<Groups sx={{ fontSize: 17 }} />}
              value={STATIC_SUBSCRIBERS}
              label="Subscribers"
              bg="#FDF2F8"
              color="#DB2777"
            />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}