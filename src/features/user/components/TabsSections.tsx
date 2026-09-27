import React from "react";
import { tabs } from "./Data";
import { useTabContext } from "./TabContext";
import CurrentlyLearningCard from "./CurrentLearningCards";
import AchievementsCard from "./AchivementCards";
import LearningJourneyCard from "./LearningJourneyCard";
import SkillsCard from "./SkillsCards";
import ComingSoon from "./CoomingSoon";
import MyCoursesTab from "./CoursesTab";
import CertificatesTab from "./CertificatesTab";
import WishlistTab from "./WishlistTab";
import ActivityTab from "./ActivityTab";

const TabsSection: React.FC = () => {
  const { activeTab, setActiveTab } = useTabContext();

  return (
    <div className="space-y-4">
      {/* Tabs nav — apna alag hi bar, sirf bottom line */}
      <div className="border-b border-slate-200">
        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto text-sm [scrollbar-width:none] sm:gap-10 sm:text-[15px] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Profile sections"
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`snap-start cursor-pointer whitespace-nowrap border-b-2 px-0.5 pb-3 font-semibold transition-colors ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-700 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content — apna alag container */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.85fr)]">
            <CurrentlyLearningCard />
            <AchievementsCard />
            <div className="flex flex-col gap-5 lg:col-span-1">
              <LearningJourneyCard />
              <SkillsCard />
            </div>
          </div>
        )}

        {activeTab === "My Courses" && <MyCoursesTab />}
        {activeTab === "Certificates" && <CertificatesTab />}
        {activeTab === "Wishlist" && <WishlistTab />}
        {activeTab === "Activity" && <ActivityTab />}

        {activeTab !== "Overview" &&
          activeTab !== "My Courses" &&
          activeTab !== "Certificates" &&
          activeTab !== "Wishlist" &&
          activeTab !== "Activity" && <ComingSoon />}
      </div>
    </div>
  );
};

export default TabsSection;