import NotificationsIcon from "@icons/NotificationsIcon";
import SettingsIcon from "@icons/SettingsIcon";
import { SvgIcon } from "@icons/SignOut";
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
    label: "Sign Out",
    icon: <SvgIcon />,
  },
];
