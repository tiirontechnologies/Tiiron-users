import React from "react";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  cta: string;
  ctaIcon?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, cta, ctaIcon, children }) => (
  <div className="rounded-xl border border-slate-100 p-4">
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <button
        type="button"
        className="flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
      >
        {cta} {ctaIcon && <ArrowRight size={12} />}
      </button>
    </div>
    {children}
  </div>
);

export default Card;
