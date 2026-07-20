import React from "react";
import { Share2, MoreVertical, Code2, MapPin, BookOpen } from "lucide-react";
import Tag from "../components/Tag";

// Replace this with your actual asset import, e.g.:
import ProfileBanner from "../../../assets/ProfileBanner.png";
// const img3 = "/assets/img3.png";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-5 py-8 text-white shadow-sm sm:px-8 sm:py-9"
      style={{
        backgroundImage: ` url(${ProfileBanner})`,
        // backgroundImage: `linear-gradient(115deg, rgba(15,10,45,0.92) 15%, rgba(35,20,90,0.75) 60%, rgba(30,15,80,0.4) 100%), url(${ProfileBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
          className="flex  cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/20 sm:px-3"
        >
          <Share2 size={13} /> <span className="hidden sm:inline">Share Profile</span>
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-2.5 py-1.5 backdrop-blur hover:bg-white/20"
        >
          <MoreVertical size={14} />
        </button>
      </div>

      <p className="text-sm text-slate-200">Hi, I'm</p>
      <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
        Rishabh Singh 
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-200">
        "Passionate about learning new technologies and building real-world projects."
      </p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <Tag icon={Code2} text="Frontend Developer" />
        <Tag icon={MapPin} text="Lucknow, India" />
        <Tag icon={BookOpen} text="Computer Science Student" />
      </div>
    </div>
  );
};

export default HeroSection;