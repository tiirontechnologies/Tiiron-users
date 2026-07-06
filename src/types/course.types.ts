interface ICreateCourse {
  title: string;
  description: string;
  tags?: string[];
  image?: File;
  price: number;
}

interface ICourse {
  id: number;
  title: string;
  description: string;
  permaLink: string;

  tags?: string[];
  image: string;

  duration: number;
  price: number;

  createdAt: string;
  updatedAt: string;

  orgCode: string;
  createdBy: string;

  _count: {
    chapters: number;
  };

  totalChapters: number;

  language?: string | string[];
  level?: string;
  objective?: string[];

  averageRating?: number;
  totalRatings?: number;
  rating?: number;

  difficulty?: string;
  courseLevel?: string;
  createdByUser?:{
    profile?:{
    picture:string;
  }
}}

interface ICourseCardProps {
  id: number;
  title: string;

  thumbnailSrc?: string;
  tags?: string[];

  chapters?: number;
  instructor?: string;

  price?: number;

  // ⭐ Rating fields
  rating?: number;
  reviewCount?: number;

  progress?: number; // 0-100 percentage
  learnerRating?: number; // Rating given by learner

  variant?: "browse" | "my-course"; // Card variant
}

export type { ICreateCourse, ICourse, ICourseCardProps };