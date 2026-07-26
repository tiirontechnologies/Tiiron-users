// import React from "react";
// import Card from "./Card";

// const CurrentlyLearningCard: React.FC = () => {
//   return (
//     <Card title="Currently Learning" cta="View all">
//       <div className="flex gap-4">
//         <div className="flex h-20 w-24 shrink-0 flex-col justify-between rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 text-[10px] font-bold text-white sm:w-28">
//           FULL STACK
//           <br />
//           WEB DEV
//         </div>
//         <div className="min-w-0 flex-1">
//           <p className="truncate text-sm font-bold text-slate-900">Full Stack Web Development</p>
//           <p className="text-xs text-slate-500">By John Smith</p>
//           <div className="mt-2 flex items-center gap-2">
//             <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
//               <div className="h-full w-[65%] rounded-full bg-indigo-600" />
//             </div>
//             <span className="text-xs font-semibold text-slate-600">65%</span>
//           </div>
//           <p className="mt-1 text-[11px] text-slate-400">24 of 36 lessons completed</p>
//         </div>
//       </div>
//       <button
//         type="button"
//         className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
//       >
//         Continue Learning
//       </button>
//     </Card>
//   );
// };

// export default CurrentlyLearningCard;


import React from "react";
import Card from "./Card";
import ComingSoon from "./ComingSoon";

const CurrentlyLearningCard: React.FC = () => {
  return (
    <Card title="Currently Learning" cta="View all">
      <ComingSoon title="Course progress coming soon" message="We're wiring this up to your enrolled courses." />
    </Card>
  );
};

export default CurrentlyLearningCard;