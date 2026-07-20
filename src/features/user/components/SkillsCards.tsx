import React from "react";
import Card from "./Card";
import { skills } from "./Data";

const SkillsCard: React.FC = () => {
  return (
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
  );
};

export default SkillsCard;