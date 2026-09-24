import React, { useEffect, useRef, useState, type ComponentType, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Camera,
  X,
  Globe,
  Link2,
  Calendar,
  BadgeCheck,
  Github,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Code2,
  Terminal,
  Loader2,
  Pencil,
  MapPin,
  BookOpen,
} from "lucide-react";
import InfoRow from "./InfoRow";
import {
  useGetProfilesQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation,
  type UpdateProfileRequest,
} from "../api/userApi.ts";
// ^ adjust this import path to wherever userApi.slice.ts actually lives in your project

interface IconProps {
  size?: number;
  className?: string;
}
type LucideIconType = ComponentType<IconProps>;

interface SocialFieldDef {
  key: "github" | "instagram" | "linkedin" | "facebook" | "twitter" | "leetcode" | "hackerrank";
  icon: LucideIconType;
  label: string;
  baseUrl: string;
  placeholder: string;
}

// Ab saare 7 social accounts cover ho rahe hain (pehle facebook/twitter list mein the hi nahi)
const socialFieldDefs: SocialFieldDef[] = [
  { key: "github", icon: Github, label: "GitHub", baseUrl: "https://github.com/", placeholder: "username" },
  { key: "instagram", icon: Instagram, label: "Instagram", baseUrl: "https://instagram.com/", placeholder: "username" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn", baseUrl: "https://linkedin.com/in/", placeholder: "username" },
  { key: "facebook", icon: Facebook, label: "Facebook", baseUrl: "https://facebook.com/", placeholder: "username" },
  { key: "twitter", icon: Twitter, label: "Twitter", baseUrl: "https://twitter.com/", placeholder: "username" },
  { key: "leetcode", icon: Code2, label: "LeetCode", baseUrl: "https://leetcode.com/", placeholder: "username" },
  { key: "hackerrank", icon: Terminal, label: "HackerRank", baseUrl: "https://hackerrank.com/", placeholder: "username" },
];

function toFullUrl(value: string, baseUrl: string): string {
  if (!value) return "#";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${baseUrl}${value}`;
}

// Backend "Leetcode" / "HackerRank" (capital) bhejta hai jabki frontend "leetcode" / "hackerrank"
// (lowercase) use karta hai — case-sensitive JS keys ki wajah se ye 2 fields hamesha
// undefined dikh rahe the. Yahan normalize kar diya taaki poore component mein
// hamesha lowercase keys hi use ho.
function normalizeProfile<T extends Record<string, any>>(raw: T | undefined) {
  if (!raw) return raw;
  return {
    ...raw,
    leetcode: raw.leetcode ?? raw.Leetcode ?? "",
    hackerrank: raw.hackerrank ?? raw.HackerRank ?? "",
  };
}

interface EditFormValues {
  firstName: string;
  lastName: string;
  headline: string;
  biography: string;
  website: string;
  collage: string;
  address: string;
  program: string;
  github: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  leetcode: string;
  hackerrank: string;
}

const AVATAR_COLORS = [
  "#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626",
  "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#2563eb",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface AvatarProps {
  picture?: string | null;
  name: string;
  size?: "sm" | "lg";
}

const ProfileAvatar: React.FC<AvatarProps> = ({ picture, name, size = "lg" }) => {
  const [imgError, setImgError] = useState(false);
  const initial = name?.trim()?.[0]?.toUpperCase() || "?";
  const color = useMemo(() => getAvatarColor(name || "user"), [name]);
  const dim = size === "lg" ? "h-20 w-20 sm:h-28 sm:w-28" : "h-16 w-16";
  const fontSize = size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl";

  if (picture && !imgError) {
    return (
      <img
        src={picture}
        alt="Profile"
        onError={() => setImgError(true)}
        className={`${dim} rounded-full object-cover ring-4 ring-white`}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full ring-4 ring-white flex items-center justify-center font-bold text-white`}
      style={{ backgroundColor: color }}
    >
      <span className={fontSize}>{initial}</span>
    </div>
  );
};

const ProfileCard: React.FC = () => {
  const { data, isLoading, isError } = useGetProfilesQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadProfileImageMutation();
  const [removeImage, { isLoading: isRemoving }] = useRemoveProfileImageMutation();

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profile = normalizeProfile(data?.data?.profile);
  const firstName = data?.data?.firstName ?? "";
  const lastName = data?.data?.lastName ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  const { register, handleSubmit, reset } = useForm<EditFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      headline: "",
      biography: "",
      website: "",
      collage: "",
      address: "",
      Program: "",
      github: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      leetcode: "",
      hackerrank: "",
    },
  });

  // Populate the form whenever fresh profile data arrives
  useEffect(() => {
    if (data?.data) {
      reset({
        firstName: data.data.firstName ?? "",
        lastName: data.data.lastName ?? "",
        headline: profile?.headline ?? "",
        biography: profile?.biography ?? "",
        website: profile?.website ?? "",
        collage: profile?.collage ?? "",
        address: profile?.address ?? "",
        Program: profile?.program ?? "",
        github: profile?.github ?? "",
        instagram: profile?.instagram ?? "",
        linkedin: profile?.linkedin ?? "",
        facebook: profile?.facebook ?? "",
        twitter: profile?.twitter ?? "",
        leetcode: profile?.leetcode ?? "",
        hackerrank: profile?.hackerrank ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSave = async (values: EditFormValues) => {
    const payload: UpdateProfileRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      headline: values.headline,
      biography: values.biography,
      website: values.website,
      collage: values.collage,
      address: values.address,
      Program: values.program,
      github: values.github,
      instagram: values.instagram,
      linkedin: values.linkedin,
      facebook: values.facebook,
      twitter: values.twitter,
      leetcode: values.leetcode,
      hackerrank: values.hackerrank,
    };
    try {
      await updateProfile(payload).unwrap();
      setIsEditing(false);
    } catch (err) {
      // Surface this with your toast/notification system
      console.error("Failed to update profile:", err);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadImage(formData).unwrap();
    } catch (err) {
      console.error("Failed to upload image:", err);
    } finally {
      e.target.value = "";
    }
  };

  const handleRemoveImage = async () => {
    try {
      await removeImage().unwrap();
    } catch (err) {
      console.error("Failed to remove image:", err);
    }
  };

  const activeSocialLinks = socialFieldDefs.filter((s) => !!profile?.[s.key]);

  if (isLoading) {
    return (
      <div className="w-full max-w-full animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-slate-100 sm:h-28 sm:w-28" />
        <div className="mx-auto mt-4 h-4 w-32 rounded bg-slate-100" />
        <div className="mx-auto mt-2 h-3 w-24 rounded bg-slate-100" />
        <div className="mt-6 space-y-3">
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-3/4 rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-red-500 shadow-sm">
        Couldn't load profile. Please refresh.
      </div>
    );
  }

  // ------------------------------ EDIT MODE ------------------------------
  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit(onSave)}
        className="w-full max-w-full cursor-pointer  overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <div className="relative mx-auto w-fit">
          <ProfileAvatar picture={profile?.picture} name={fullName} />
          <button
            type="button"
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 disabled:opacity-60 sm:h-8 sm:w-8"
          >
            {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
          </button>
          {profile?.picture && (
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isRemoving}
              className="absolute bottom-0 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 disabled:opacity-60 sm:h-8 sm:w-8"
              title="Remove photo"
            >
              <X size={14} />
            </button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="First Name" {...register("firstName")} />
          <Field label="Last Name" {...register("lastName")} />
        </div>

        <div className="mt-3">
          <Field label="Headline" placeholder="e.g. Frontend Developer" {...register("headline")} />
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-[11px] font-medium text-slate-500">Biography</label>
          <textarea
            rows={3}
            placeholder="A short line about yourself"
            className="w-full max-w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400"
            {...register("biography")}
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Website" placeholder="https://yourwebsite.com" {...register("website")} />
          <Field label="Collage" placeholder="collage " {...register("collage")} />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Address" placeholder="e.g. Lucknow, India" {...register("address")} />
          <Field label="Program" placeholder="e.g. Computer Science" {...register("Program")} />
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Social Accounts</p>
          <div className="space-y-2.5">
            {socialFieldDefs.map((s) => (
              <div key={s.key} className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                  <s.icon size={16} />
                </span>
                <input
                  placeholder={`${s.label} ${s.placeholder}`}
                  className="w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400"
                  {...register(s.key)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              reset();
            }}
            className="w-full rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSaving && <Loader2 size={14} className="animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    );
  }

  // ------------------------------ VIEW MODE ------------------------------
  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="relative mx-auto w-fit">
        <ProfileAvatar picture={profile?.picture} name={fullName} />
        <button
          type="button"
          onClick={handleAvatarClick}
          disabled={isUploading}
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 disabled:opacity-60 sm:h-8 sm:w-8"
        >
          {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      <div className="mt-4 min-w-0 text-center">
        <div className="flex min-w-0 items-center justify-center gap-1.5">
          <h2 className="min-w-0 break-words text-lg font-bold text-slate-900">{fullName}</h2>
          <BadgeCheck size={18} className="shrink-0 text-indigo-600" />
        </div>
        {profile?.headline && (
          <p className="mt-0.5 break-words text-sm text-slate-500">{profile.headline}</p>
        )}
        {profile?.biography && (
          <p
            className="mt-2 max-w-full whitespace-pre-line break-words text-xs italic text-slate-400 [overflow-wrap:anywhere]"
            dangerouslySetInnerHTML={{ __html: profile.biography }}
          />
        )}
      </div>

      <div className="mt-5 min-w-0 space-y-3 border-t border-slate-100 pt-4 text-sm">
        {profile?.website && <InfoRow icon={Link2} label="Website" value={profile.website} />}
        <InfoRow icon={Globe} label="Collage" value={profile?.collage || "Enter Your Collage"} />
        {/* <InfoRow icon={MapPin} label="Address" value={profile?.address || "Enter Your Address"} /> */}
        {/* <InfoRow icon={BookOpen} label="Program" value={profile?.program || "Enter Your Program"} /> */}
        <InfoRow
          icon={Calendar}
          label="Member Since"
          value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
        />
      </div>

      {/* Social links — only renders platforms the user has actually connected */}
      {activeSocialLinks.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2 border-t border-slate-100 pt-4">
          {activeSocialLinks.map((s) => {
            const value = profile?.[s.key] as string;
            return (
              <a
                key={s.key}
                href={toFullUrl(value, s.baseUrl)}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <s.icon size={16} />
              </a>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-indigo-200 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
      >
        <Pencil size={14} />
        Edit Profile
      </button>
    </div>
  );
};

// Small labeled input used in edit mode
const Field = React.forwardRef<
  HTMLInputElement,
  { label: string; placeholder?: string } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, ...rest }, ref) => (
  <div className="min-w-0">
    <label className="mb-1 block text-[11px] font-medium text-slate-500">{label}</label>
    <input
      ref={ref}
      className="w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400"
      {...rest}
    />
  </div>
));
Field.displayName = "Field";

export default ProfileCard;