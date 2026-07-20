import React from "react";
import { Flame } from "lucide-react";
import { weekDays } from "./Data";

const StreakCard: React.FC = () => {
  return (
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
  );
};

export default StreakCard;