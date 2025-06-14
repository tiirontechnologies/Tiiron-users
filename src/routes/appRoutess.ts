import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import MyCourses from "../pages/my-courses";
import type { Route } from "types/routes";
// import TickInSquareIcon from "assets/icons/TickInSquareIcon";
import TickInSquareIcon from "../assets/icons/TickInSquareIcon";
import DollerIcon from "../assets/icons/DollerIcon";
import React from "react";
import { createIcon } from "@utils/createIcon";
import BookIcon from "@icons/BookIcon";
export const appRoutes: Route[] = [
  {
    label: "Learning",
    icon: createIcon(BookIcon),
    children: [
      {
        label: "My Courses",
        path: "/settings/profile",
        element: React.createElement(MyCourses),
      },
      { label: "Question Bank", path: "/settings/account" },
    ],
  },
  {
    label: "Knowledge",
    icon: createIcon(TickInSquareIcon),
    path: "/knowledge",
  },
  {
    label: "Reports",
    icon: createIcon(DollerIcon),
  },
];
