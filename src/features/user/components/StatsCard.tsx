import React from "react";
import { stats } from "./Data";

const StatsBar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
            <s.icon size={17} className={s.fg} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold leading-tight text-slate-900">{s.value}</p>
            <p className="truncate text-[11px] leading-tight text-slate-500">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;

// import React from "react";
// import { Sparkles } from "lucide-react";

// const statLabels = [
//   "Enrolled Courses",
//   "Courses Completed",
//   "Certificates Earned",
//   "Total XP",
//   "Average Score",
//   "Quizzes Attempted",
// ];

// const StatsBar: React.FC = () => {
//   return (
//     <div className="grid grid-cols-2 gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-5 sm:grid-cols-3 lg:grid-cols-6">
//       {statLabels.map((label) => (
//         <div key={label} className="flex items-center gap-2.5">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
//             <Sparkles size={15} className="text-indigo-300" />
//           </div>
//           <div className="min-w-0">
//             <p className="truncate text-sm font-semibold text-slate-400">Soon</p>
//             <p className="truncate text-[11px] leading-tight text-slate-400">{label}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsBar;