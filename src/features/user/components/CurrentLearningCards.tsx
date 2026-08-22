import React from "react";
import Card from "./Card";
import ComingSoon from "./ComingSoon";
import { useGetMyEnrollmentsQuery } from "../api/userApi";
import { useNavigate } from "react-router-dom";

// ---------- Types (same shape as MyCoursesTab) ----------
export interface EnrolledCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
  duration: string | null;
  orgCode: string;
  createdBy: string;
  _count: { chapters: number };
  averageRating: number;
  totalRatings: number;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: string;
  payment_status: string;
  createdAt: string;
  course: EnrolledCourse;
}

const CurrentlyLearningCard: React.FC = () => {
  const { data, isLoading } = useGetMyEnrollmentsQuery({
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();
  const enrollments: Enrollment[] = data?.data || [];

  // Latest active enrollment = "Currently Learning"
  const current = [...enrollments]
    .filter((e) => e.status === "active")
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];

  if (isLoading) {
    return (
      <Card title="Currently Learning" cta="View all">
        <div className="flex gap-4 animate-pulse">
          <div className="h-20 w-24 shrink-0 rounded-lg bg-slate-100 sm:w-28" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3.5 w-3/4 rounded bg-slate-100" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
            <div className="h-3 w-1/3 rounded bg-slate-100" />
          </div>
        </div>
      </Card>
    );
  }

  if (!current) {
    return (
      <Card title="Currently Learning" cta="View all">
        <ComingSoon
          title="No active course yet"
          message="Enroll in a course to see your progress here."
        />
      </Card>
    );
  }

  const { course } = current;
  const lessonCount = course._count?.chapters ?? 0;
  const isFree = current.payment_status === "free" || Number(course.price) === 0;

  return (
    <Card title="Currently Learning" cta="View all">
      <div className="flex gap-4">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="h-20 w-24 shrink-0 rounded-lg object-cover sm:w-28"
          />
        ) : (
          <div className="flex h-20 w-24 shrink-0 flex-col justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 text-center text-[10px] font-bold uppercase leading-tight text-white sm:w-28">
            {course.title}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">{course.title}</p>
          <p className="truncate text-xs text-slate-500">
            By {course.createdBy || "Instructor"}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">
              {lessonCount} lesson{lessonCount === 1 ? "" : "s"}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 font-semibold ${
                isFree ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
              }`}
            >
              {isFree ? "Free" : `₹${course.price}`}
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Enrolled on{" "}
            {new Date(current.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={()=>navigate(`/course-practice/${course.id}`)}
        className="mt-4 w-full cursor-pointer rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Continue Learning
      </button>
    </Card>
  );
};

export default CurrentlyLearningCard;