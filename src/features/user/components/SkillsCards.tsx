import React from "react";
import Card from "./Card";
import ComingSoon from "./ComingSoon";
import { useGetMyEnrollmentsQuery, type Enrollment } from "../api/userApi";

const BAR_COLORS = ["bg-indigo-600", "bg-sky-500", "bg-amber-500", "bg-emerald-500"];

const SkillsCard: React.FC = () => {
  const { data, isLoading } = useGetMyEnrollmentsQuery({ page: 1, limit: 50 });
  const enrollments: Enrollment[] = data?.data || [];

  if (isLoading) {
    return (
      <Card title="Course Coverage" cta="View all">
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="mb-1.5 h-2.5 w-1/3 rounded bg-slate-100" />
              <div className="h-1.5 w-full rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const withChapters = enrollments.filter((e) => (e.course._count?.chapters ?? 0) > 0);

  if (!withChapters.length) {
    return (
      <Card title="Course Coverage" cta="View all">
        <ComingSoon
          title="No course data yet"
          message="Enroll in a course to see your lesson coverage here."
        />
      </Card>
    );
  }

  const top = [...withChapters]
    .sort((a, b) => (b.course._count.chapters ?? 0) - (a.course._count.chapters ?? 0))
    .slice(0, 4);
  const maxChapters = Math.max(...top.map((e) => e.course._count.chapters ?? 0));

  return (
    <Card title="Course Coverage" cta="View all">
      <div className="space-y-4">
        {top.map((e, i) => {
          const chapters = e.course._count.chapters ?? 0;
          const pct = maxChapters ? Math.round((chapters / maxChapters) * 100) : 0;
          return (
            <div key={e.id}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="truncate font-semibold text-slate-700">
                  {e.course.title}
                </span>
                <span className="shrink-0 pl-2 text-slate-400">
                  {chapters} lesson{chapters === 1 ? "" : "s"}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SkillsCard;