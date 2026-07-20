import React from "react";
import { ChevronRight } from "lucide-react";
import { quickLinks } from "./Data";

const QuickLinksCard: React.FC = () => {
  return (
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
  );
};

export default QuickLinksCard;