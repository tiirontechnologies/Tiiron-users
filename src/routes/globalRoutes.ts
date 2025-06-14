import NotificationsIcon from "@icons/NotificationsIcon";
import SettingsIcon from "@icons/SettingsIcon";
import { createIcon } from "@utils/createIcon";
import type { Route } from "types/routes";

export const globalRoutes: Route[] = [
  {
    label: "Settings",
    icon: createIcon(SettingsIcon),
  },
  {
    label: "Notification",
    icon: createIcon(NotificationsIcon),
  },
];
