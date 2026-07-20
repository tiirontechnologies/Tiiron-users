import React, { useState } from "react";
import { tabs } from "./Data";
import type { TabName } from "../Types";
import CurrentlyLearningCard from "./CurrentLearningCards";
import AchievementsCard from "./AchivementCards";
import LearningJourneyCard from "./LearningJourneyCard";
import SkillsCard from "./SkillsCards";

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex gap-5 overflow-x-auto border-b border-slate-100 px-4 pt-3 text-sm sm:gap-6 sm:px-6">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap border-b-2 pb-3 font-medium transition-colors ${
              activeTab === tab
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-2">
          <CurrentlyLearningCard />
          <AchievementsCard />
          <LearningJourneyCard />
          <SkillsCard />
        </div>
      )}

      {activeTab !== "Overview" && (
        <div className="p-6 text-sm text-slate-400">{activeTab} content coming soon.</div>
      )}
    </div>
  );
};

export default TabsSection;
