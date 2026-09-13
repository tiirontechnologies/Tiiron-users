// import React, { useState } from "react";
// import { tabs } from "./Data";
// import type { TabName } from "../Types";
// import CurrentlyLearningCard from "./CurrentLearningCards";
// import AchievementsCard from "./AchivementCards";
// import LearningJourneyCard from "./LearningJourneyCard";
// import SkillsCard from "./SkillsCards";
// import ComingSoon from "./CoomingSoon";
// import MyCoursesTab from "./CoursesTab";
// import CertificatesTab from "./CertificatesTab";

// const TabsSection: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabName>("Overview");

//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//       <div
//         className="flex snap-x snap-mandatory gap-2 overflow-x-auto border-b border-slate-100 px-3 pt-3 text-sm [scrollbar-width:none] sm:gap-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
//         role="tablist"
//         aria-label="Profile sections"
//       >
//         {tabs.map((tab) => (
//           <button
//             type="button"
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             role="tab"
//             aria-selected={activeTab === tab}
//             className={`snap-start whitespace-nowrap border-b-2 px-1.5 cursor-pointer pb-3 font-medium transition-colors sm:px-0 ${
//               activeTab === tab
//                 ? "border-indigo-600 text-indigo-600"
//                 : "border-transparent text-slate-500 hover:text-slate-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* {activeTab === "Overview" && (
//         <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-2">
//           <CurrentlyLearningCard />
//           <AchievementsCard />
//           <LearningJourneyCard />
//           <SkillsCard />
//         </div>
//       )}

//       {activeTab == "MyCourses" && (
//         // <div className="p-6 text-sm text-slate-400">{activeTab} content coming soon.</div>
//         <MyCoursesTab/>
//       )}
//       {activeTab !== "Overview"  && (
//         // <div className="p-6 text-sm text-slate-400">{activeTab} content coming soon.</div>
//         <ComingSoon/>
//       )} */}


//       {activeTab === "Overview" && (
//   <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-2 cursor-pointer">
//     <CurrentlyLearningCard />
//     <AchievementsCard />
//     <LearningJourneyCard />
//     <SkillsCard />
//   </div>
// )}

// {activeTab === "My Courses" && <MyCoursesTab />}

// {activeTab === "Certificates" && <CertificatesTab />}

// {activeTab !== "Overview" && activeTab !== "My Courses" && activeTab !== "Certificates" && (
//   <ComingSoon />
// )}
//     </div>
//   );
// };

// export default TabsSection;


import React, { useState } from "react";
import { tabs } from "./Data";
import type { TabName } from "../Types";
import CurrentlyLearningCard from "./CurrentLearningCards";
import AchievementsCard from "./AchivementCards";
import LearningJourneyCard from "./LearningJourneyCard";
import SkillsCard from "./SkillsCards";
import ComingSoon from "./CoomingSoon";
import MyCoursesTab from "./CoursesTab";
import CertificatesTab from "./CertificatesTab";

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto border-b border-slate-100 px-3 pt-3 text-sm [scrollbar-width:none] sm:gap-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
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
            className={`snap-start whitespace-nowrap border-b-2 px-1.5 cursor-pointer pb-3 font-medium transition-colors sm:px-0 ${
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
        // Screenshot-style 3-column layout: two equal-ish content columns
        // + a narrower "snapshot"-style side column on larger screens.
        // Falls back to a single stacked column on mobile.
        <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.85fr)] cursor-pointer">
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

      {activeTab !== "Overview" &&
        activeTab !== "My Courses" &&
        activeTab !== "Certificates" && <ComingSoon />}
    </div>
  );
};

export default TabsSection;