import React from "react";
import Card from "./Card";
import { achievements } from "./Data";

const AchievementsCard: React.FC = () => {
  return (
    <Card title="Recent Achievements" cta="View all">
      <div className="space-y-3">
        {achievements.map((a, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-base">
              {a.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{a.title}</p>
              <p className="truncate text-xs text-slate-500">{a.desc}</p>
            </div>
            <span className="shrink-0 text-[11px] text-slate-400">{a.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AchievementsCard;