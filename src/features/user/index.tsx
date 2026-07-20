import React from "react";
import { ChevronRight } from "lucide-react";
import ProfileSidebar from "./components/ProfileSidebar";
import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsCard";
import TabsSection from "./components/TabsSections";

const StudentProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
          <span className="cursor-pointer hover:text-indigo-600">Home</span>
          <ChevronRight size={14} />
          <span className="font-medium text-slate-700">My Profile</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          <ProfileSidebar />

          <main className="space-y-6">
            <HeroSection />
            <StatsBar />
            <TabsSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;