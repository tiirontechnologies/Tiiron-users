import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "./Card";
import ComingSoon from "./ComingSoon";
import { useGetMyEnrollmentsQuery, type Enrollment } from "../api/userApi";

const LearningJourneyCard: React.FC = () => {
  const { data, isLoading } = useGetMyEnrollmentsQuery({ page: 1, limit: 100 });
  const enrollments: Enrollment[] = data?.data || [];

  if (isLoading) {
    return (
      <Card title="My Learning Journey" cta="View full journey" ctaIcon>
        <div className="h-48 w-full animate-pulse rounded-lg bg-slate-100" />
      </Card>
    );
  }

  if (!enrollments.length) {
    return (
      <Card title="My Learning Journey" cta="View full journey" ctaIcon>
        <ComingSoon
          title="No journey yet"
          message="Your enrollment activity will be charted here."
        />
      </Card>
    );
  }

  // Build last 6 months buckets (oldest → newest) from real enrollment dates
  const now = new Date();
  const months = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString("en-IN", { month: "short" }),
      count: 0,
    };
  });

  enrollments.forEach((e) => {
    const d = new Date(e.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.count += 1;
  });

  const thisMonthCount = months[months.length - 1].count;

  return (
    <Card title="My Learning Journey" cta="View full journey" ctaIcon>
      <p className="text-xs font-medium text-slate-400">This Month</p>
      <p className="text-2xl font-extrabold text-slate-900">
        {thisMonthCount} course{thisMonthCount === 1 ? "" : "s"}
      </p>
      <p className="text-xs text-slate-400">New Enrollments</p>
      <div className="mt-3 h-40 w-full sm:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={months} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#4f46e5" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default LearningJourneyCard;