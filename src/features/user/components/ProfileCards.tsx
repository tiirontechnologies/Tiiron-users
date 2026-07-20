import React from "react";
import { Camera, MapPin, Mail, Calendar, Globe, Star, BadgeCheck } from "lucide-react";
import InfoRow from "./InfoRow";

const ProfileCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="relative mx-auto w-fit">
        <img
          src="https://i.pravatar.cc/160?img=12"
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover ring-4 ring-white sm:h-28 sm:w-28"
        />
        <button
          type="button"
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
        >
          <Camera size={14} />
        </button>
      </div>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <h2 className="text-lg font-bold text-slate-900">Rishabh Singh</h2>
          <BadgeCheck size={18} className="text-indigo-600" />
        </div>
        <p className="mt-0.5 text-sm text-slate-500">Frontend Developer&nbsp;|&nbsp;Learner</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          Level 4 Learner
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
          <Star size={13} className="text-amber-400" fill="currentColor" />
          2,450 XP
        </span>
      </div>

      <div className="mt-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[61%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">2,450 / 4,000 XP to Level 5</p>
      </div>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
        <InfoRow icon={MapPin} label="Location" value="Lucknow, India" />
        <InfoRow icon={Mail} label="Email" value="rishabh.singh@email.com" />
        <InfoRow icon={Calendar} label="Member Since" value="Jan 2024" />
        <InfoRow icon={Globe} label="Language" value="English (US)" />
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-lg border border-indigo-200 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;