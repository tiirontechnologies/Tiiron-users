import NotificationsIcon from "@icons/NotificationsIcon";
import SettingsIcon from "@icons/SettingsIcon";
import { Signout } from "@icons/SignOut";
import type { Route } from "types/routes";

export const globalRoutes: Route[] = [
  {
    label: "Settings",
    icon: <SettingsIcon />,
  },
  {
    label: "Notification",
    icon: <NotificationsIcon />,
  },
  {
    onClick: () => {
      localStorage.clear();
      window.location.href = "login";
    },
    label: "Sign Out",
    icon: <Signout />,
  },
];
