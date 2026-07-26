import { EducatorProfileData } from '../types/educator.types';

// Replace this with data fetched from your API (e.g. RTK Query) —
// the whole profile renders off this single object, nothing is hardcoded
// in the components themselves.
export const mockEducatorData: EducatorProfileData = {
  name: 'Dr. John Smith',
  title: 'Senior Software Engineer @ Google',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  bannerImageUrl:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop',
  isVerified: true,
  rating: 4.9,
  reviewCount: 2431,
  learnerCount: '38.5K',
  courseCount: 42,
  yearsExperience: 18,
  tags: ['AI & ML', 'Full Stack', 'System Design'],
  quote: 'I believe anyone can code. My mission is to make complex topics simple.',
  bio: [
    'I am a Senior Software Engineer at Google with over 18 years of experience in designing and building scalable distributed systems. Previously, I have worked with Microsoft and Amazon in core engineering roles.',
    'I love teaching and simplifying complex concepts for learners. My mission is to help you gain practical skills and build real-world applications with confidence.',
  ],
  expertise: [
    'Java',
    'Spring Boot',
    'System Design',
    'AWS',
    'Docker',
    'Kubernetes',
    'Microservices',
    'Python',
    'AI & ML',
    'DevOps',
  ],
  socialLinks: [
    { label: 'LinkedIn', url: '#', platform: 'linkedin' },
    { label: 'GitHub', url: '#', platform: 'github' },
    { label: 'Website', url: '#', platform: 'website' },
    { label: 'YouTube', url: '#', platform: 'youtube' },
  ],
  microStats: [
    { label: 'Total Learners', count: '38,500' },
    { label: 'Published Courses', count: '42' },
    { label: 'Course Completion', count: '96%' },
    { label: 'Average Rating', count: '4.9 ★' },
    { label: 'Positive Feedback', count: '98%' },
    { label: 'Certificates Issued', count: '850+' },
  ],
  featuredCourses: [
    {
      id: 'c1',
      title: 'Full Stack Java Developer',
      students: '18,000+ Students',
      rating: '4.9 (1.8K)',
      color: '#1E293B',
    },
    {
      id: 'c2',
      title: 'System Design Masterclass',
      students: '12,000+ Students',
      rating: '4.9 (1.2K)',
      color: '#312E81',
    },
  ],
  reviews: [
    {
      id: 'r1',
      name: 'Rahul Sharma',
      initials: 'RS',
      rating: 5,
      comment:
        'One of the best instructors on Tiiron LMS. Concepts are explained in such a simple and practical way!',
    },
  ],
  achievements: [
    { title: 'Top Instructor', desc: 'Tiiron LMS', icon: 'trophy' },
    { title: '4.9 Rated', desc: 'By Learners', icon: 'star' },
    { title: 'Trending Educator', desc: 'Popular Courses', icon: 'fire' },
    { title: '100K+ Hours', desc: 'Content Watched', icon: 'certificate' },
  ],
};
