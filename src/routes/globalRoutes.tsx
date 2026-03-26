import SettingsIcon from "@icons/SettingsIcon";
import { Signout } from "@icons/SignOut";
import type { Route } from "types/routes";

export const globalRoutes: Route[] = [
  {
    label: "Settings",
    icon: <SettingsIcon />,
  },
  {
    onClick: async () => {
      try {
        // Direct fetch since we're in a static config file (no hooks)
        await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_MODE == "Dev" ? "/v1" : "/api/v1"}/auth/signout/user`, { 
          method: 'POST', 
          credentials: 'include' 
        });
      } catch (error) {
        console.error("Signout error:", error);
      }
      localStorage.clear();
      window.location.href = "/login";
    },
    label: "Sign Out",
    icon: <Signout />,
  },
];
