import React, { useState } from 'react';
import {
  Box, Container, Grid, Card, CardContent, Typography, Avatar, Button,
  Tabs, Tab, Chip, Link, List, ListItem, ListItemIcon, ListItemText, Divider,
  IconButton, Rating, Stack
} from '@mui/material';
import {
  Verified, Star, People, MenuBook, BusinessCenter, CheckCircle,
  LinkedIn, GitHub, Language, YouTube, Share, Message, Add,
  School, AssignmentTurnedIn, ThumbUp, WorkspacePremium, ExpandMore,
  ChevronRight, LocalFireDepartment, EmojiEvents
} from '@mui/icons-material';

export default function EducatorProfile() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pb: 8 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        
        {/* Main Grid Structure */}
        <Grid container spacing={3}>
          
          {/* LEFT SIDEBAR */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', p: 2, mb: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" // Replace with actual image URL
                  sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                />
                <Verified color="primary" sx={{ position: 'absolute', bottom: 5, right: 5, bgcolor: 'white', borderRadius: '50%' }} />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                Dr. John Smith <Verified color="primary" fontSize="small" />
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Senior Software Engineer @ Google
              </Typography>

              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                <Chip label="AI & ML" size="small" color="primary" variant="soft" sx={{ bgcolor: '#EEF2FF', color: '#4F46E5' }} />
                <Chip label="Full Stack" size="small" variant="soft" sx={{ bgcolor: '#EEF2FF', color: '#4F46E5' }} />
                <Chip label="System Design" size="small" variant="soft" sx={{ bgcolor: '#EEF2FF', color: '#4F46E5' }} />
              </Stack>

              <Stack direction="row" justifyValues="center" spacing={3} sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: 2, mb: 3, justifyContent: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}><Star sx={{ color: '#F59E0B', fontSize: 16 }} /> 4.9</Typography>
                  <Typography variant="caption" color="text.secondary">(2,431 Reviews)</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>38.5K</Typography>
                  <Typography variant="caption" color="text.secondary">Learners</Typography>
                </Box>
              </Stack>

              <Stack spacing={1.5}>
                <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#4F46E5', borderRadius: 2, textTransform: 'none', py: 1, '&:hover': { bgcolor: '#4338CA' } }}>
                  Follow
                </Button>
                <Button variant="outlined" startIcon={<Message />} sx={{ borderColor: '#E2E8F0', color: '#4F46E5', borderRadius: 2, textTransform: 'none', py: 1 }}>
                  Message
                </Button>
              </Stack>
            </Card>

            {/* Social Links */}
            <Card sx={{ borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', p: 1, mb: 3 }}>
              <List dense>
                <Typography sx={{ px: 2, py: 1, fontWeight: 700, fontSize: 14 }}>Connect With Me</Typography>
                {[
                  { label: 'LinkedIn', icon: <LinkedIn sx={{ color: '#0077B5' }} /> },
                  { label: 'GitHub', icon: <GitHub sx={{ color: '#24292E' }} /> },
                  { label: 'Website', icon: <Language sx={{ color: '#10B981' }} /> },
                  { label: 'YouTube', icon: <YouTube sx={{ color: '#EF4444' }} /> },
                ].map((item) => (
                  <ListItem key={item.label} secondaryAction={<ChevronRight fontSize="small" color="disabled" />}>
                    <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          {/* RIGHT HERO BANNER AND TABS CONTENT */}
          <Grid item xs={12} md={9}>
            
            {/* Dark Premium Hero Banner */}
            <Card sx={{
              borderRadius: 5,
            //   background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
            backgroundImage: `
linear-gradient(
rgba(10,15,35,0.78),
rgba(10,15,35,0.82)
),
url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop")
`,
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
              color: 'white',
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              mb: 3
            }}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={8}>
                  <Chip label="Verified Educator" color="success" size="small" icon={<CheckCircle sx={{ fontSize: '14px !important' }} />} sx={{ mb: 2, bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#34D399' }} />
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Dr. John Smith</Typography>
                  <Typography variant="h6" sx={{ color: '#94A3B8', fontWeight: 400, mb: 2 }}>Senior Software Engineer @ Google</Typography>
                  <Typography variant="body1" sx={{ color: '#CBD5E1', mb: 3, maxWidth: '500px' }}>
                    18+ years of experience in building scalable systems and teaching technologies that empower the next generation.
                  </Typography>
                  
                  {/* Banner stats buttons inside image banner */}
                  <Stack direction="row" spacing={2} sx={{ bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', p: 2, borderRadius: 3, maxWidth: 'max-content' }}>
                    <Box sx={{ textAlign: 'center', px: 2 }}><Typography variant="h6" sx={{ fontWeight: 700 }}>38.5K</Typography><Typography variant="caption" color="darkgray">Learners</Typography></Box>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ textAlign: 'center', px: 2 }}><Typography variant="h6" sx={{ fontWeight: 700 }}>42</Typography><Typography variant="caption" color="darkgray">Courses</Typography></Box>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ textAlign: 'center', px: 2 }}><Typography variant="h6" sx={{ fontWeight: 700 }}>18+</Typography><Typography variant="caption" color="darkgray">Years Exp</Typography></Box>
                  </Stack>
                </Grid>
                
                {/* Floating Quote Block on Right */}
                <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right', pr: 2 }}>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#E2E8F0', opacity: 0.8 }}>
                    "I believe anyone can code. My mission is to make complex topics simple."
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            {/* Micro Stats Counter Row */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { label: 'Total Learners', count: '38,500', icon: <People color="primary" /> },
                { label: 'Published Courses', count: '42', icon: <MenuBook color="secondary" /> },
                { label: 'Course Completion', count: '96%', icon: <AssignmentTurnedIn color="success" /> },
                { label: 'Average Rating', count: '4.9 ★', icon: <Star sx={{ color: '#F59E0B' }} /> },
                { label: 'Positive Feedback', count: '98%', icon: <ThumbUp color="info" /> },
                { label: 'Certificates Issued', count: '850+', icon: <WorkspacePremium sx={{ color: '#8B5CF6' }} /> },
              ].map((stat, i) => (
                <Grid item xs={6} sm={4} md={2} key={i}>
                  <Card sx={{ borderRadius: 3, textAlign: 'center', p: 1.5, height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <Box sx={{ display: 'inline-flex', p: 1, bgcolor: '#F1F5F9', borderRadius: '50%', mb: 1 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>{stat.count}</Typography>
                    <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Navigation Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto">
                <Tab label="About" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Courses" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Experience" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Certifications" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Reviews" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Community" sx={{ textTransform: 'none', fontWeight: 600 }} />
              </Tabs>
            </Box>

            {/* Tab Panels: Content Changes here */}
            {tabValue === 0 && (
              <Grid container spacing={3}>
                {/* About & Expertise */}
                <Grid item xs={12} md={7}>
                  <Card sx={{ borderRadius: 4, p: 3, mb: 3, minHeight: '260px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>About Me</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                      I am a Senior Software Engineer at Google with over 18 years of experience in designing and building scalable distributed systems. Previously, I have worked with Microsoft and Amazon in core engineering roles.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                      I love teaching and simplifying complex concepts for learners. My mission is to help you gain practical skills and build real-world applications with confidence.
                    </Typography>
                    <Button endIcon={<ExpandMore />} sx={{ textTransform: 'none', color: '#4F46E5', p: 0, fontWeight: 600 }}>Show more</Button>
                  </Card>

                  <Card sx={{ borderRadius: 4, p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Expertise</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {['Java', 'Spring Boot', 'System Design', 'AWS', 'Docker', 'Kubernetes', 'Microservices', 'Python', 'AI & ML', 'DevOps'].map((skill) => (
                        <Chip key={skill} label={skill} variant="outlined" sx={{ borderRadius: 2, fontWeight: 500 }} />
                      ))}
                    </Box>
                  </Card>
                </Grid>

                {/* Featured Courses & Reviews Side */}
                <Grid item xs={12} md={5}>
                  <Card sx={{ borderRadius: 4, p: 3, mb: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Featured Courses</Typography>
                      <Link href="#" variant="body2" sx={{ color: '#4F46E5', underline: 'none', fontWeight: 600 }}>View all →</Link>
                    </Stack>

                    {/* Simple Course Item UI */}
                    {[
                      { title: 'Full Stack Java Developer', students: '18,000+ Students', rating: '4.9 (1.8K)', color: '#1E293B' },
                      { title: 'System Design Masterclass', students: '12,000+ Students', rating: '4.9 (1.2K)', color: '#312E81' }
                    ].map((course, idx) => (
                      <Box key={idx} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                        <Box sx={{ width: 80, height: 50, bgcolor: course.color, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 10, textAlign: 'center', p: 0.5 }}>
                          {course.title.split(' ')[0]}
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{course.title}</Typography>
                          <Typography variant="caption" color="text.secondary" display="block">{course.students}</Typography>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.3, fontWeight: 600 }}><Star sx={{ color: '#F59E0B', fontSize: 12 }} /> {course.rating}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Card>

                  {/* Top Reviews Block */}
                  <Card sx={{ borderRadius: 4, p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Top Reviews</Typography>
                      <Link href="#" variant="body2" sx={{ color: '#4F46E5', underline: 'none', fontWeight: 600 }}>View all →</Link>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <Avatar sx={{ bgcolor: '#E2E8F0', color: '#475569', fontSize: 14, fontWeight: 600 }}>RS</Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Rahul Sharma</Typography>
                        <Rating value={5} readOnly size="small" sx={{ my: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                          One of the best instructors on Tiiron LMS. Concepts are explained in such a simple and practical way!
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* BOTTOM SECTION: ACHIEVEMENTS & RECOGNITION */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Achievements & Recognition</Typography>
          <Grid container spacing={2}>
            {[
              { title: 'Top Instructor', desc: 'Tiiron LMS', icon: <EmojiEvents sx={{ color: '#F59E0B' }} /> },
              { title: '4.9 Rated', desc: 'By Learners', icon: <Star sx={{ color: '#3B82F6' }} /> },
              { title: 'Trending Educator', desc: 'Popular Courses', icon: <LocalFireDepartment sx={{ color: '#EF4444' }} /> },
              { title: '100K+ Hours', desc: 'Content Watched', icon: <WorkspacePremium sx={{ color: '#10B981' }} /> },
            ].map((badge, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                  <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, display: 'inline-flex' }}>
                    {badge.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{badge.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{badge.desc}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}

// educatorProfile