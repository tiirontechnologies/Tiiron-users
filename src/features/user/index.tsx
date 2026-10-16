import React from "react";
import { ChevronRight } from "lucide-react";
import ProfileSidebar from "./components/ProfileSidebar";
import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsCard";
import TabsSection from "./components/TabsSections";

import { TabProvider } from "./components/TabContext";


const StudentProfile: React.FC = () => {
  return (
    <TabProvider>
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="mx-auto max-w-[1400px] px-4 pb-6 pt-10 sm:px-6 sm:py-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
          <span className="cursor-pointer hover:text-indigo-600">Home</span>
          <ChevronRight size={14} />
          <span className="font-medium text-slate-700">My Profile</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          <main className="order-1 lg:col-start-2 lg:row-start-1">
            <HeroSection />
          </main>
          <div className="order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <ProfileSidebar />
          </div>
          <section className="order-3 min-w-0 lg:col-start-2">
            {/* <StatsBar /> */}
            <TabsSection />
          </section>
        </div>
      </div>
    </div>
    </TabProvider>
  );
};

export default StudentProfile;
