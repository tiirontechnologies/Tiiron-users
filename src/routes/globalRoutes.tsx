import SettingsIcon from "@icons/SettingsIcon";
import { Signout } from "@icons/SignOut";
import type { Route } from "types/routes";

export const globalRoutes: Route[] = [
  {
    label: "Settings",
    icon: <SettingsIcon />,
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
