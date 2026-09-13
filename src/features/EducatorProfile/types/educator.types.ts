// Shared types for the Educator Profile module (viewer-facing)

// export interface SocialLink {
//   label: string;
//   url: string;
//   platform: 'linkedin' | 'github' | 'website' | 'youtube';
// }

// export interface StatItem {
//   label: string;
//   count: string;
// }

// export interface FeaturedCourse {
//   id: string;
//   title: string;
//   students: string;
//   rating: string;
//   color: string;
// }

// export interface Review {
//   id: string;
//   name: string;
//   initials: string;
//   rating: number;
//   comment: string;
// }

// export interface Achievement {
//   title: string;
//   desc: string;
//   icon: 'trophy' | 'star' | 'fire' | 'certificate';
// }

// export interface EducatorProfileData {
//   name: string;
//   title: string;
//   avatarUrl: string;
//   bannerImageUrl: string;
//   isVerified: boolean;
//   rating: number;
//   reviewCount: number;
//   learnerCount: string;
//   courseCount: number;
//   yearsExperience: number;
//   tags: string[];
//   quote: string;
//   bio: string[];
//   expertise: string[];
//   socialLinks: SocialLink[];
//   microStats: StatItem[];
//   featuredCourses: FeaturedCourse[];
//   reviews: Review[];
//   achievements: Achievement[];
// }



// export interface RawApiProfile {
//   id: number;
//   userId: number;
//   headline: string | null;
//   biography: string | null;
//   language: string | null;
//   website: string | null;
//   facebook: string | null;
//   instagram: string | null;
//   linkedin: string | null;
//   twitter: string | null;
//   youtube: string | null;
//   github: string | null;
//   Leetcode: string | null;
//   HackerRank: string | null;
//   picture: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface RawApiUser {
//   id: number;
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   roleId: string;
//   createdAt: string;
//   profile: RawApiProfile;
// }

// // extend SocialLink platform union to cover all fields the API sends
// export interface SocialLink {
//   platform: 'linkedin' | 'github' | 'website' | 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'leetcode' | 'hackerrank';
//   label: string;
//   url: string;
// }


// Shared types for the Educator Profile module (viewer-facing)

import type { ComponentType } from "react";

export interface IconProps {
  size?: number;
  className?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  platform: 'linkedin' | 'github' | 'website' | 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'leetcode' | 'hackerrank';
}

export interface StatItem {
  label: string;
  count: string;
}

export interface FeaturedCourse {
  id: string;
  title: string;
  students: string;
  rating: string;
  color: string;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
  rating: number;
  comment: string;
}

export interface Achievement {
  title: string;
  desc: string;
  icon: 'trophy' | 'star' | 'fire' | 'certificate';
}

export interface EducatorProfileData {
  name: string;
  title: string;
  avatarUrl: string;
  bannerImageUrl: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  learnerCount: string;
  courseCount: number;
  yearsExperience: number;
  tags: string[];
  quote: string;
  bio: string[];
  expertise: string[];
  socialLinks: SocialLink[];
  microStats: StatItem[];
  featuredCourses: FeaturedCourse[];
  reviews: Review[];
  achievements: Achievement[];
}

export interface RawApiProfile {
  id: number;
  userId: number;
  headline: string | null;
  biography: string | null;
  language: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  youtube: string | null;
  github: string | null;
  Leetcode: string | null;
  HackerRank: string | null;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RawApiUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  createdAt: string;
  profile: RawApiProfile;
  _count?: {
    subscribers?: number;
  };
}
export type LucideIcon = ComponentType<IconProps>;