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