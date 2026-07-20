import type { ComponentType } from "react";

export interface IconProps {
  size?: number;
  className?: string;
}

export type LucideIcon = ComponentType<IconProps>;

export interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  bg: string;
  fg: string;
}

export interface WeekDay {
  d: string;
  done: boolean;
}

export interface AchievementItem {
  title: string;
  desc: string;
  time: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  pct: number;
  color: string;
}

export interface JourneyPoint {
  week: string;
  hrs: number;
}

export interface QuickLink {
  icon: LucideIcon;
  label: string;
}

export type TabName =
  | "Overview"
  | "My Courses"
  | "Certificates"
  | "Quiz History"
  | "Achievements"
  | "Wishlist"
  | "Activity";