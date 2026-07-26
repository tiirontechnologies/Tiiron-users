import React from "react";
import { Sparkles } from "lucide-react";

interface ComingSoonProps {
  title: string;
  message?: string;
}

/**
 * Professional placeholder for sections whose API isn't ready yet.
 * Swap the parent card's contents for the real UI once the endpoint lands —
 * keeps the layout and card chrome intact so nothing shifts later.
 */
const ComingSoon: React.FC<ComingSoonProps> = ({ title, message = "This feature is on its way." }) => (
  <div className="flex min-h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center">
    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
      <Sparkles size={16} className="text-indigo-400" />
    </div>
    <p className="text-sm font-semibold text-slate-600">{title}</p>
    <p className="mt-1 text-xs text-slate-400">{message}</p>
  </div>
);

export default ComingSoon;