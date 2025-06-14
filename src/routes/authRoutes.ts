import NotificationsIcon from "@icons/NotificationsIcon";
import SettingsIcon from "@icons/SettingsIcon";
import { createIcon } from "@utils/createIcon";
import type { Route } from "types/routes";
import { Navigate } from "react-router-dom";
import React from "react";
export const authRoutes: Route[] = [
  {
    label: "/",
    element: React.createElement(Navigate, { to: "/login", replace: true }),
  },
  {
    label: "Notification",
    icon: createIcon(NotificationsIcon),
  },
];
