
import React, { useState } from 'react';
import { Box, Grid, Card, Typography, Chip, Link, Avatar, Rating, Stack, Button } from '@mui/material';
import { ExpandMore, Star } from '@mui/icons-material';
import { EducatorProfileData } from '../types/educator.types';

interface AboutTabProps {
  data: EducatorProfileData;
}

export default function AboutTab({ data }: AboutTabProps) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = expanded ? data.bio : data.bio.slice(0, 1);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card sx={{ borderRadius: 4, p: 3, mb: 3, minHeight: '260px' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            About Me
          </Typography>
          {data.bio.length > 0 ? (
            <>
              {paragraphs.map((para, idx) => (
                <Typography key={idx} variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                  {para}
                </Typography>
              ))}
              {data.bio.length > 1 && (
                <Button
                  endIcon={<ExpandMore sx={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />}
                  onClick={() => setExpanded((prev) => !prev)}
                  sx={{ textTransform: 'none', color: '#4F46E5', p: 0, fontWeight: 600 }}
                >
                  {expanded ? 'Show less' : 'Show more'}
                </Button>
              )}
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Coming soon
            </Typography>
          )}
        </Card>

        {/* <Card sx={{ borderRadius: 4, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Expertise
          </Typography>
          {data.expertise.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {data.expertise.map((skill) => (
                <Chip key={skill} label={skill} variant="outlined" sx={{ borderRadius: 2, fontWeight: 500 }} />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Coming soon
            </Typography>
          )}
        </Card> */}
      </Grid>

      <Grid item xs={12} md={5}>
        <Card sx={{ borderRadius: 4, p: 3, mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Featured Courses
            </Typography>
            {data.featuredCourses.length > 0 && (
              <Link href="#" variant="body2" sx={{ color: '#4F46E5', fontWeight: 600 }}>
                View all →
              </Link>
            )}
          </Stack>

          {data.featuredCourses.length > 0 ? (
            data.featuredCourses.map((course) => (
              <Box key={course.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 50,
                    bgcolor: course.color,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 10,
                    textAlign: 'center',
                    p: 0.5,
                  }}
                >
                  {course.title.split(' ')[0]}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {course.students}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.3, fontWeight: 600 }}>
                    <Star sx={{ color: '#F59E0B', fontSize: 12 }} /> {course.rating}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Coming soon
            </Typography>
          )}
        </Card>

        <Card sx={{ borderRadius: 4, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Top Reviews
            </Typography>
            {data.reviews.length > 0 && (
              <Link href="#" variant="body2" sx={{ color: '#4F46E5', fontWeight: 600 }}>
                View all →
              </Link>
            )}
          </Stack>

          {data.reviews.length > 0 ? (
            data.reviews.map((review) => (
              <Stack key={review.id} direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
                <Avatar sx={{ bgcolor: '#E2E8F0', color: '#475569', fontSize: 14, fontWeight: 600 }}>
                  {review.initials}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {review.name}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" sx={{ my: 0.5 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                    {review.comment}
                  </Typography>
                </Box>
              </Stack>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Coming soon
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}