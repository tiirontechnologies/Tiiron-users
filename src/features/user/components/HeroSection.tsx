// import React, { useState } from "react";
// import { Share2, MoreVertical, Code2, MapPin, BookOpen, Check } from "lucide-react";
// import Tag from "../components/Tag";
// import { useGetProfilesQuery } from "../api/userApi.ts";
// // ^ adjust this import path to wherever userApi.slice.ts actually lives in your project

// // Replace this with your actual asset import, e.g.:
// import ProfileBanner from "../../../assets/ProfileBanner.png";

// const HeroSection: React.FC = () => {
//   const { data, isLoading } = useGetProfilesQuery();
//   const [copied, setCopied] = useState(false);

//   const profile = data?.data?.profile;
//   const firstName = data?.data?.firstName ?? "";
//   const lastName = data?.data?.lastName ?? "";
//   const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

//   const handleShare = async () => {
//     const shareUrl = window.location.href;
//     const shareData = {
//       title: `${fullName}'s Profile`,
//       text: `Check out ${fullName}'s profile`,
//       url: shareUrl,
//     };

//     // Mobile / supported browsers: native share sheet
//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         // user cancelled share — ignore
//       }
//       return;
//     }

//     // Fallback: copy link to clipboard
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy link:", err);
//     }
//   };

//   return (
//     <div
//       className="relative overflow-hidden rounded-2xl px-5 pb-8 pt-16 text-white shadow-sm sm:px-8 sm:py-9"
//       style={{
//         backgroundImage: `url(${ProfileBanner})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
//         <button
//           type="button"
//           onClick={handleShare}
//           className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/20 sm:px-3"
//         >
//           {copied ? <Check size={13} /> : <Share2 size={13} />}
//           <span className="hidden sm:inline">{copied ? "Link Copied!" : "Share Profile"}</span>
//         </button>
//         <button
//           type="button"
//           className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-2.5 py-1.5 backdrop-blur hover:bg-white/20"
//         >
//           <MoreVertical size={14} />
//         </button>
//       </div>

//       <p className="text-sm text-slate-200">Hi, I'm</p>
//       <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
//         {isLoading ? "..." : fullName}
//       </h1>

//       {profile?.biography ? (
//         <div
//           className="mt-3 max-w-md text-sm text-slate-200"
//           dangerouslySetInnerHTML={{ __html: profile.biography }}
//         />
//       ) : (
//         <p className="mt-3 max-w-md text-sm text-slate-200">
//           Passionate about learning new technologies and building real-world projects.
//         </p>
//       )}

//       <div className="mt-5 flex flex-wrap gap-2.5">
//         <Tag icon={Code2} text={profile?.headline || "Frontend Developer"} />
//         {/* <Tag icon={MapPin} text="Lucknow, India" />
//         <Tag icon={BookOpen} text="Computer Science Student" /> */}
//   <Tag icon={Code2} text={profile?.headline || "Frontend Developer"} />
//   <Tag icon={MapPin} text={profile?.address || "Location not set"} />
//   <Tag icon={BookOpen} text={profile?.program || "Program not set"} />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import React, { useState } from "react";
import { Share2, MoreVertical, Code2, MapPin, BookOpen, Check } from "lucide-react";
import Tag from "../components/Tag";
import { useGetProfilesQuery } from "../api/userApi.ts";
// ^ adjust this import path to wherever userApi.slice.ts actually lives in your project

// Replace this with your actual asset import, e.g.:
import ProfileBanner from "../../../assets/ProfileBanner.png";

const HeroSection: React.FC = () => {
  const { data, isLoading } = useGetProfilesQuery();
  const [copied, setCopied] = useState(false);

  const profile = data?.data?.profile;
  const firstName = data?.data?.firstName ?? "";
  const lastName = data?.data?.lastName ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${fullName}'s Profile`,
      text: `Check out ${fullName}'s profile`,
      url: shareUrl,
    };

    // Mobile / supported browsers: native share sheet
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled share — ignore
      }
      return;
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl px-5 pb-8 pt-16 text-white shadow-sm sm:px-8 sm:py-9"
      style={{
        backgroundImage: `url(${ProfileBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={handleShare}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/20 sm:px-3"
        >
          {copied ? <Check size={13} /> : <Share2 size={13} />}
          <span className="hidden sm:inline">{copied ? "Link Copied!" : "Share Profile"}</span>
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
        {isLoading ? "..." : fullName}
      </h1>

      {profile?.biography ? (
        <div
          className="mt-3 max-w-md text-sm text-slate-200"
          dangerouslySetInnerHTML={{ __html: profile.biography }}
        />
      ) : (
        <p className="mt-3 max-w-md text-sm text-slate-200">
          Passionate about learning new technologies and building real-world projects.
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2.5">
        <Tag icon={Code2} text={profile?.headline || "Frontend Developer"} />
        <Tag icon={MapPin} text={profile?.address || "Location not set"} />
        <Tag icon={BookOpen} text={profile?.Program || "Program not set"} />
      </div>
    </div>
  );
};

export default HeroSection;