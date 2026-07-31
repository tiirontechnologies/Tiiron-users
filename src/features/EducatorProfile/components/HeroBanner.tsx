
import React from "react";
import { Share2, MoreVertical, GraduationCap, MapPin, Star } from "lucide-react";
import Tag from "../components/Tag";
import { EducatorProfileData } from "../types/educator.types";
import ProfileBanner from "../../../assets/ProfileBanner.png"
import { Snackbar, Alert } from "@mui/material";

interface HeroBannerProps {
  data: EducatorProfileData;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ data }) => {
  const hasRating = data.reviewCount > 0;
  const hasLearners = !!data.learnerCount;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);


const handleShareProfile = async () => {
  const shareData = {
    title: `${data.name} • Educator Profile`,
    text: `Explore ${data.name}'s educator profile on Tiiron Technologies.`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar(true);
  } catch (err: any) {
    if (err?.name !== "AbortError") {
      console.error(err);
    }
  }
};

  return (
    <div
      className="relative overflow-hidden rounded-2xl px-5 py-8 text-white shadow-sm sm:px-8 sm:py-9"
      style={{
        // background:
        //   "radial-gradient(120% 140% at 15% 0%, #2c2560 0%, #1a1440 45%, #0f0c28 100%)",
            backgroundImage:`url(${ProfileBanner})`,
                backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:`url(${ProfileBanner})`,
          // backgroundImage:
          //   "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <GraduationCap
        className="pointer-events-none absolute -bottom-6 -right-6 text-white/[0.08] sm:-bottom-8 sm:-right-4"
        size={180}
        strokeWidth={1}
      />

      <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
       onClick={handleShareProfile}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/20 sm:px-3"
        >
          <Share2 size={13} /> <span className="hidden sm:inline">Share Profile</span>
        </button>
        {/* <button
          type="button"
          className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-2.5 py-1.5 backdrop-blur hover:bg-white/20"
        >
          <MoreVertical size={14} />
        </button> */}
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-300">Hi, I'm</p>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            {data.name || "Coming soon"}
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-300">
            {data.title || "Coming soon"}
          </p>
          {data.bio?.[0] && (
            <p className="mt-3 max-w-md text-sm text-slate-300">{data.bio[0]}</p>
          )}

          <div className="mt-5 flex flex-wrap gap-2.5">
            {data.tags?.length > 0 ? (
              data.tags.map((tag) => <Tag key={tag} icon={GraduationCap} text={tag} />)
            ) : (
              <Tag icon={GraduationCap} text="Software Engineer" />
            )}
            <Tag icon={MapPin} text="TiironTechnologies" />
          </div>

          <div className="mt-5 flex max-w-max gap-2 rounded-xl bg-white/5 p-3 backdrop-blur">
            {/* <div className="px-3 text-center">
              <p className="flex items-center justify-center gap-1 text-lg font-bold">
                <Star size={15} className="fill-amber-400 text-amber-400" />{" "}
                {hasRating ? data.rating : "—"}
              </p>
              <p className="text-[11px] text-slate-400">
                {hasRating ? `${data.reviewCount.toLocaleString()} reviews` : "Coming soon"}
              </p>
            </div> */}
            <div className="w-px bg-white/10" />
            {/* <div className="px-3 text-center">
              <p className="text-lg font-bold">{hasLearners ? data.learnerCount : "—"}</p>
              <p className="text-[11px] text-slate-400">
                {hasLearners ? "students" : "Coming soon"}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;