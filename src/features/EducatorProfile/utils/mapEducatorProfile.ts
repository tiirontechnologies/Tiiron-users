import { EducatorProfileData, RawApiUser, SocialLink } from '../types/educator.types';

const SOCIAL_PREFIX: Partial<Record<SocialLink['platform'], string>> = {
  linkedin: 'https://linkedin.com/in/',
  github: 'https://github.com/',
  youtube: 'https://youtube.com/@',
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/',
  twitter: 'https://twitter.com/',
  leetcode: 'https://leetcode.com/',
  hackerrank: 'https://www.hackerrank.com/',
};

function stripHtml(html: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

function buildSocialLinks(profile: RawApiUser['profile']): SocialLink[] {
  const entries: Array<[SocialLink['platform'], string | null, string]> = [
    ['website', profile.website, profile.website ?? ''],
    ['linkedin', profile.linkedin, 'LinkedIn'],
    ['github', profile.github, 'GitHub'],
    ['youtube', profile.youtube, 'YouTube'],
    ['facebook', profile.facebook, 'Facebook'],
    ['instagram', profile.instagram, 'Instagram'],
    ['twitter', profile.twitter, 'Twitter'],
    ['leetcode', profile.Leetcode, 'LeetCode'],
    ['hackerrank', profile.HackerRank, 'HackerRank'],
  ];

  return entries
    .filter(([, value]) => !!value)
    .map(([platform, value, label]) => {
      const url =
        platform === 'website'
          ? value!.startsWith('http')
            ? value!
            : `https://${value}`
          : `${SOCIAL_PREFIX[platform] ?? ''}${value}`;
      return { platform, label, url };
    });
}

export function mapApiToEducatorProfileData(apiUser: RawApiUser): EducatorProfileData {
  const profile = apiUser.profile;
  const bioText = stripHtml(profile.biography);
return {
  name: `${apiUser.firstName} ${apiUser.lastName}`.trim(),
  title: profile.headline || '',
  avatarUrl: profile.picture || '',

  bannerImageUrl: '',
  courseCount: 0,
  yearsExperience: 0,
  quote: '',

  isVerified: false,
  tags: [],
  rating: 0,
  reviewCount: 0,
  learnerCount: '',
  bio: bioText ? [bioText] : [],
  expertise: [],
  featuredCourses: [],
  reviews: [],
  microStats: [],
  achievements: [],
  socialLinks: buildSocialLinks(profile),
  address: profile.address || '',
  program: profile.program || '',
};
}
