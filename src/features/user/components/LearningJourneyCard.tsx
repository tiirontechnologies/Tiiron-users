// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import Card from "./Card";
// import { journey } from "./Data";

// const LearningJourneyCard: React.FC = () => {
//   return (
//     <Card title="My Learning Journey" cta="View full journey" ctaIcon>
//       <p className="text-xs font-medium text-slate-400">This Month</p>
//       <p className="text-2xl font-extrabold text-slate-900">2h 45m</p>
//       <p className="text-xs text-slate-400">Learning Time</p>
//       <div className="mt-3 h-40 w-full sm:h-48">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={journey} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
//             <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//             <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="h" />
//             <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
//             <Line type="monotone" dataKey="hrs" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4, fill: "#4f46e5" }} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// };

// export default LearningJourneyCard;

import React from "react";
import Card from "./Card";
import ComingSoon from "./ComingSoon.tsx";

const LearningJourneyCard: React.FC = () => {
  return (
    <Card title="My Learning Journey" cta="View full journey" ctaIcon>
      <ComingSoon title="Learning analytics coming soon" message="Your weekly learning time chart will live here." />
    </Card>
  );
};

export default LearningJourneyCard;