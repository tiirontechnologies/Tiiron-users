import React from "react";
import ProfileCard from "./ProfileCards";
// import StreakCard from "./StreakCards";
import QuickLinksCard from "./QuickLinks";

const ProfileSidebar: React.FC = () => {
  return (
    <aside className="space-y-4">
      <ProfileCard />
      {/* <StreakCard /> */}
      <QuickLinksCard />
    </aside>
  );
};

export default ProfileSidebar;
