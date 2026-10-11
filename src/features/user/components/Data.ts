import {
  Users,
  ShieldCheck,
  FileEdit,
  Star,
  ClipboardCheck,
  Boxes,
  BookOpen,
  Heart,
  Activity,
} from "lucide-react";
import type {
  StatItem,
  TabName,
  WeekDay,
  AchievementItem,
  SkillItem,
  JourneyPoint,
  QuickLink,
} from "../Types";

export const stats: StatItem[] = [
  { label: "Enrolled Courses", value: 12, icon: Users, bg: "bg-indigo-50", fg: "text-indigo-600" },
  { label: "Courses Completed", value: 6, icon: ShieldCheck, bg: "bg-emerald-50", fg: "text-emerald-600" },
  { label: "Certificates Earned", value: 18, icon: FileEdit, bg: "bg-amber-50", fg: "text-amber-600" },
  { label: "Total XP", value: 2450, icon: Star, bg: "bg-sky-50", fg: "text-sky-600" },
  { label: "Average Score", value: "85%", icon: ClipboardCheck, bg: "bg-rose-50", fg: "text-rose-600" },
  { label: "Quizzes Attempted", value: 45, icon: Boxes, bg: "bg-violet-50", fg: "text-violet-600" },
];

export const tabs: TabName[] = [
  "Overview",
  "My Courses",
  "Certificates",
  "Quiz History",
  "Wishlist",
  "Activity",
];

export const weekDays: WeekDay[] = [
  { d: "M", done: true },
  { d: "T", done: true },
  { d: "W", done: true },
  { d: "T", done: true },
  { d: "F", done: true },
  { d: "S", done: true },
  { d: "S", done: false },
];

export const achievements: AchievementItem[] = [
  { title: "Quiz Master", desc: "Scored 100% in 5 quizzes", time: "2 days ago", icon: "🎯" },
  { title: "Consistent Learner", desc: "Maintained a 14-day learning streak", time: "1 week ago", icon: "🔥" },
  { title: "Problem Solver", desc: "Solved 50 coding challenges", time: "2 weeks ago", icon: "🏆" },
];

export const skills: SkillItem[] = [
  { name: "HTML", pct: 90, color: "bg-orange-500" },
  { name: "CSS", pct: 85, color: "bg-blue-500" },
  { name: "JavaScript", pct: 70, color: "bg-yellow-400" },
  { name: "React", pct: 65, color: "bg-cyan-400" },
];

export const journey: JourneyPoint[] = [
  { week: "May 6", hrs: 0.6 },
  { week: "May 13", hrs: 1.4 },
  { week: "May 20", hrs: 1.0 },
  { week: "May 27", hrs: 2.1 },
  { week: "Jun 3", hrs: 2.75 },
];

export const quickLinks: QuickLink[] = [
  { icon: BookOpen, label: "My Courses" },
  { icon: FileEdit, label: "Certificates" },
  { icon: ClipboardCheck, label: "My Quiz History" },
  { icon: Heart, label: "Wishlist" },
  { icon: Activity, label: "Activity" },
];
