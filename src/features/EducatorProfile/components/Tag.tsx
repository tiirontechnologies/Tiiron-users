import React from "react";
import type { LucideIcon } from "../types/educator.types.ts";

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

export default Tag;