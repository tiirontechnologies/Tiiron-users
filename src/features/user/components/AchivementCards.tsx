import React from "react";
import Card from "./Card";
import ComingSoon from "./ComingSoon";
import { useGetMyEnrollmentsQuery, type Enrollment } from "../api/userApi";
import {
  Rocket,
  BookMarked,
  Gift,
  Globe2,
  Flame,
  type LucideIcon,
} from "lucide-react";

interface Milestone {
  title: string;
  desc: string;
  achieved: boolean;
  icon: LucideIcon;
  bg: string;
  fg: string;
}

const AchievementsCard: React.FC = () => {
  const { data, isLoading } = useGetMyEnrollmentsQuery({ page: 1, limit: 50 });
  const enrollments: Enrollment[] = data?.data || [];

  if (isLoading) {
    return (
      <Card title="Recent Activities " cta="View All">
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-slate-100" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-2/3 rounded bg-slate-100" />
                <div className="h-2.5 w-1/2 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!enrollments.length) {
    return (
      <Card title="Recent Achievements" cta="View All">
        <ComingSoon
          title="No achievements yet"
          message="Enroll in a course to start unlocking milestones."
        />
      </Card>
    );
  }

  const totalEnrolled = enrollments.length;
  const freeCount = enrollments.filter(
    (e) => e.payment_status === "free" || Number(e.course.price) === 0,
  ).length;
  const uniqueInstructors = new Set(enrollments.map((e) => e.course.createdBy)).size;
  const totalChapters = enrollments.reduce(
    (sum, e) => sum + (e.course._count?.chapters ?? 0),
    0,
  );
  const latest = [...enrollments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];

  const milestones: Milestone[] = [
    {
      title: "Getting Started",
      desc: "Enrolled in your first course",
      achieved: totalEnrolled >= 1,
      icon: Rocket,
      bg: "bg-indigo-50",
      fg: "text-indigo-600",
    },
    {
      title: "Course Collector",
      desc: `Enrolled in ${totalEnrolled} course${totalEnrolled === 1 ? "" : "s"}`,
      achieved: totalEnrolled >= 5,
      icon: BookMarked,
      bg: "bg-sky-50",
      fg: "text-sky-600",
    },
    {
      title: "Free Explorer",
      desc: `Picked up ${freeCount} free course${freeCount === 1 ? "" : "s"}`,
      achieved: freeCount >= 1,
      icon: Gift,
      bg: "bg-emerald-50",
      fg: "text-emerald-600",
    },
    {
      title: "Diverse Learner",
      desc: `Learning from ${uniqueInstructors} different instructor${uniqueInstructors === 1 ? "" : "s"}`,
      achieved: uniqueInstructors >= 3,
      icon: Globe2,
      bg: "bg-violet-50",
      fg: "text-violet-600",
    },
    {
      title: "Deep Diver",
      desc: `${totalChapters} lessons lined up across your courses`,
      achieved: totalChapters >= 20,
      icon: Flame,
      bg: "bg-amber-50",
      fg: "text-amber-600",
    },
  ].filter((m) => m.achieved);

  return (
    <Card title="Recent Activities" cta="View All">
      <div className="space-y-3">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${m.bg}`}
            >
              <m.icon size={17} className={m.fg} strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{m.title}</p>
              <p className="truncate text-xs text-slate-500">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {latest && (
        <p className="mt-3 text-[11px] text-slate-400">
          Last enrolled{" "}
          {new Date(latest.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}
    </Card>
  );
};

export default AchievementsCard;