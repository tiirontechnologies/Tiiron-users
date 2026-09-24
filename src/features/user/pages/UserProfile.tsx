import React, { useState, useMemo, type ComponentType } from "react";
import {
  Camera,
  Share2,
  MoreVertical,
  MapPin,
  Mail,
  Calendar,
  Globe,
  Flame,
  Code2,
  Users,
  ShieldCheck,
  FileEdit,
  Star,
  ClipboardCheck,
  Boxes,
  BookOpen,
  Award,
  Heart,
  ChevronRight,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Replace this with your actual asset import, e.g.:
// import img3 from "../../assets/img3.png";
const img3 = "/assets/img3.png";

interface IconProps {
  size?: number;
  className?: string;
}

type LucideIcon = ComponentType<IconProps>;

interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  bg: string;
  fg: string;
}

interface WeekDay {
  d: string;
  done: boolean;
}

interface AchievementItem {
  title: string;
  desc: string;
  time: string;
  icon: string;
}

interface SkillItem {
  name: string;
  pct: number;
  color: string;
}

interface JourneyPoint {
  week: string;
  hrs: number;
}

interface QuickLink {
  icon: LucideIcon;
  label: string;
}

type TabName =
  | "Overview"
  | "My Courses"
  | "Certificates"
  | "Quiz History"
  | "Achievements"
  | "Wishlist"
  | "Activity";

const stats: StatItem[] = [
  { label: "Enrolled Courses", value: 12, icon: Users, bg: "bg-indigo-50", fg: "text-indigo-600" },
  { label: "Courses Completed", value: 6, icon: ShieldCheck, bg: "bg-emerald-50", fg: "text-emerald-600" },
  { label: "Certificates Earned", value: 18, icon: FileEdit, bg: "bg-amber-50", fg: "text-amber-600" },
  { label: "Total XP", value: 2450, icon: Star, bg: "bg-sky-50", fg: "text-sky-600" },
  { label: "Average Score", value: "85%", icon: ClipboardCheck, bg: "bg-rose-50", fg: "text-rose-600" },
  { label: "Quizzes Attempted", value: 45, icon: Boxes, bg: "bg-violet-50", fg: "text-violet-600" },
];

const tabs: TabName[] = [
  "Overview",
  "My Courses",
  "Certificates",
  "Quiz History",
  "Achievements",
  "Wishlist",
  "Activity",
];

const weekDays: WeekDay[] = [
  { d: "M", done: true },
  { d: "T", done: true },
  { d: "W", done: true },
  { d: "T", done: true },
  { d: "F", done: true },
  { d: "S", done: true },
  { d: "S", done: false },
];

const achievements: AchievementItem[] = [
  { title: "Quiz Master", desc: "Scored 100% in 5 quizzes", time: "2 days ago", icon: "🎯" },
  { title: "Consistent Learner", desc: "Maintained a 14-day learning streak", time: "1 week ago", icon: "🔥" },
  { title: "Problem Solver", desc: "Solved 50 coding challenges", time: "2 weeks ago", icon: "🏆" },
];

const skills: SkillItem[] = [
  { name: "HTML", pct: 90, color: "bg-orange-500" },
  { name: "CSS", pct: 85, color: "bg-blue-500" },
  { name: "JavaScript", pct: 70, color: "bg-yellow-400" },
  { name: "React", pct: 65, color: "bg-cyan-400" },
];

const journey: JourneyPoint[] = [
  { week: "May 6", hrs: 0.6 },
  { week: "May 13", hrs: 1.4 },
  { week: "May 20", hrs: 1.0 },
  { week: "May 27", hrs: 2.1 },
  { week: "Jun 3", hrs: 2.75 },
];

const quickLinks: QuickLink[] = [
  { icon: BookOpen, label: "My Courses" },
  { icon: FileEdit, label: "Certificates" },
  { icon: Heart, label: "Wishlist" },
  { icon: ClipboardCheck, label: "My Quiz History" },
  { icon: Award, label: "Achievements" },
];

const AVATAR_COLORS = [
  "#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626",
  "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#2563eb",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const StudentProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
          <span className="cursor-pointer hover:text-indigo-600">Home</span>
          <ChevronRight size={14} />
          <span className="font-medium text-slate-700">My Profile</span>
        </div>

        {/* items-start hi fix hai — isse sidebar bade hone pe right column niche shift nahi hota */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] items-start">
          {/* ------------------------ LEFT SIDEBAR ------------------------ */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="relative mx-auto w-fit">
                <AvatarDisplay name="Rishabh Singh" picture={null} />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <h2 className="text-lg font-bold text-slate-900">Rishabh Singh</h2>
                  <BadgeCheck size={18} className="text-indigo-600" />
                </div>
                <p className="mt-0.5 text-sm text-slate-500">Frontend Developer&nbsp;|&nbsp;Learner</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  Level 4 Learner
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                  <Star size={13} className="text-amber-400" fill="currentColor" />
                  2,450 XP
                </span>
              </div>

              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[61%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">2,450 / 4,000 XP to Level 5</p>
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                <InfoRow icon={MapPin} label="Location" value="Lucknow, India" />
                <InfoRow icon={Mail} label="Email" value="rishabh.singh@email.com" />
                <InfoRow icon={Calendar} label="Member Since" value="Jan 2024" />
                <InfoRow icon={Globe} label="Collage" value="Collage " />
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-lg border border-indigo-200 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                Edit Profile
              </button>
            </div>

            {/* Streak card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-orange-500" fill="currentColor" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Learning Streak</p>
                  <p className="text-xs text-slate-500">14 Days</p>
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-400">Keep it up! You're doing great.</p>
              <div className="mt-3 flex justify-between">
                {weekDays.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                        day.done ? "bg-emerald-500 text-white" : "border-2 border-slate-200 text-slate-300"
                      }`}
                    >
                      {day.done ? "✓" : ""}
                    </div>
                    <span className="text-[10px] text-slate-400">{day.d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-sm font-bold text-slate-900">Quick Links</p>
              {quickLinks.map((item, i) => (
                <button
                  type="button"
                  key={i}
                  className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon size={16} className="text-slate-400" />
                    {item.label}
                  </span>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>
              ))}
            </div>
          </aside>

          {/* ------------------------ RIGHT COLUMN ------------------------ */}
          <main className="space-y-6">
            {/* Hero */}
            <div
              className="relative overflow-hidden rounded-2xl px-8 py-9 text-white shadow-sm"
              style={{
                backgroundImage: `linear-gradient(115deg, rgba(15,10,45,0.92) 15%, rgba(35,20,90,0.75) 60%, rgba(30,15,80,0.4) 100%), url(${img3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute right-6 top-6 flex gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/20"
                >
                  <Share2 size={13} /> Share Profile
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg bg-white/10 px-2.5 py-1.5 backdrop-blur hover:bg-white/20"
                >
                  <MoreVertical size={14} />
                </button>
              </div>

              <p className="text-sm text-slate-200">Hi, I'm</p>
              <h1 className="mt-1 flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
                Rishabh Singh <span>👋</span>
              </h1>
              <p className="mt-3 max-w-md text-sm text-slate-200">
                "Passionate about learning new technologies and building real-world projects."
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Tag icon={Code2} text="Frontend Developer" />
                <Tag icon={MapPin} text="Lucknow, India" />
                <Tag icon={BookOpen} text="Computer Science Student" />
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                    <s.icon size={17} className={s.fg} />
                  </div>
                  <div>
                    <p className="text-base font-bold leading-tight text-slate-900">{s.value}</p>
                    <p className="text-[11px] leading-tight text-slate-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex gap-6 overflow-x-auto border-b border-slate-100 px-6 pt-3 text-sm">
                {tabs.map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap border-b-2 pb-3 font-medium transition-colors ${
                      activeTab === tab
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-2">
                {/* Currently Learning */}
                <Card title="Currently Learning" cta="View all">
                  <div className="flex gap-4">
                    <div className="flex h-20 w-28 shrink-0 flex-col justify-between rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 text-[10px] font-bold text-white">
                      FULL STACK
                      <br />
                      WEB DEV
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">Full Stack Web Development</p>
                      <p className="text-xs text-slate-500">By John Smith</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[65%] rounded-full bg-indigo-600" />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">65%</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">24 of 36 lessons completed</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Continue Learning
                  </button>
                </Card>

                {/* Recent Achievements */}
                <Card title="Recent Achievements" cta="View all">
                  <div className="space-y-3">
                    {achievements.map((a, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-base">
                          {a.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                          <p className="text-xs text-slate-500">{a.desc}</p>
                        </div>
                        <span className="text-[11px] text-slate-400">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Learning Journey */}
                <Card title="My Learning Journey" cta="View full journey" ctaIcon>
                  <p className="text-xs font-medium text-slate-400">This Month</p>
                  <p className="text-2xl font-extrabold text-slate-900">2h 45m</p>
                  <p className="text-xs text-slate-400">Learning Time</p>
                  <div className="mt-3 h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={journey} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="h" />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                        <Line type="monotone" dataKey="hrs" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4, fill: "#4f46e5" }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Top Skills */}
                <Card title="Top Skills" cta="View all">
                  <div className="space-y-4">
                    {skills.map((s, i) => (
                      <div key={i}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700">{s.name}</span>
                          <span className="text-slate-400">{s.pct}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

interface AvatarDisplayProps {
  name: string;
  picture?: string | null;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ name, picture }) => {
  const [imgError, setImgError] = useState(false);
  const initial = name?.trim()?.[0]?.toUpperCase() || "?";
  const color = useMemo(() => getAvatarColor(name || "user"), [name]);

  if (picture && !imgError) {
    return (
      <img
        src={picture}
        alt="Profile"
        onError={() => setImgError(true)}
        className="h-28 w-28 rounded-full object-cover ring-4 ring-white"
      />
    );
  }
  return (
    <div
      className="h-28 w-28 rounded-full ring-4 ring-white flex items-center justify-center font-bold text-white text-4xl"
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
};

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2.5">
    <Icon size={15} className="mt-0.5 text-slate-400" />
    <div>
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="text-xs font-medium text-slate-700">{value}</p>
    </div>
  </div>
);

interface TagProps {
  icon: LucideIcon;
  text: string;
}

const Tag: React.FC<TagProps> = ({ icon: Icon, text }) => (
  <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
    <Icon size={13} />
    {text}
  </span>
);

interface CardProps {
  title: string;
  cta: string;
  ctaIcon?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, cta, ctaIcon, children }) => (
  <div className="rounded-xl border border-slate-100 p-4">
    <div className="mb-3 flex items-center justify-between">
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <button type="button" className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline">
        {cta} {ctaIcon && <ArrowRight size={12} />}
      </button>
    </div>
    {children}
  </div>
);

export default StudentProfile;