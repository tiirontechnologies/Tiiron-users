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
    <div className="min-w-0 w-full space-y-4">
      {/* Tabs nav — apna alag hi bar, sirf bottom line */}
      <div className="border-b border-slate-200">
        <div
          className="flex w-full flex-row flex-nowrap items-center snap-x snap-mandatory gap-4 overflow-x-auto text-sm [scrollbar-width:none] sm:gap-10 sm:text-[15px] [&::-webkit-scrollbar]:hidden"
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
      {/* ============================================================
          CONTENT AREA — same padding for every tab
      ============================================================ */}

      <div className="min-h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:min-h-[640px]">
        <div className="p-4 sm:p-5 lg:p-6">

          {/* ======================================================
              OVERVIEW TAB
          ======================================================= */}
          {activeTab === "Overview" && (
            <div>
              {/* TOP ROW: Currently Learning + Recent Activities */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
                <div className="min-w-0">
                  <CurrentlyLearningCard />
                </div>
                <div className="min-w-0">
                  <AchievementsCard />
                </div>
              </div>

              {/* BOTTOM ROW: Learning Journey + Course Coverage */}
              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
                <div className="min-w-0">
                  <LearningJourneyCard />
                </div>
                <div className="min-w-0">
                  <SkillsCard />
                </div>
              </div>
            </div>
          )}

          {/* ====================================================== */}
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
    </div>
  );
};

export default TabsSection;
