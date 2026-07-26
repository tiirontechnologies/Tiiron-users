import React from "react";
import type { LucideIcon } from "../Types";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2.5">
    <Icon size={15} className="mt-0.5 shrink-0 text-slate-400" />
    <div className="min-w-0">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="truncate text-xs font-medium text-slate-700">{value}</p>
    </div>
  </div>
);

export default InfoRow;