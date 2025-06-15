import NotificationsIcon from "@icons/NotificationsIcon";
import SettingsIcon from "@icons/SettingsIcon";
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
];
