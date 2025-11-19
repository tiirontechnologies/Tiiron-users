import { QuestionBankComponent } from "../features";
import EditCourse from "../features/course/pages/course-management";
import { QuestionBankEdit } from "../features";
import { CourseContentEdit } from "../features";
import type { Route } from "types/routes";
import TickInSquareIcon from "../assets/icons/TickInSquareIcon";
import DollerIcon from "../assets/icons/DollerIcon";
import BookIcon from "@icons/BookIcon";
import LocalLibraryIcon from "@icons/LocalLibraryIcon";
import AutoStoriesIcon from "@icons/AutoStoriesIcon";
import Courses from "../features/course/pages/Courses";
import NotificationsIcon from "@icons/NotificationsIcon";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Dashboard from "../features/dashboard/pages/Dashboard";
export const appRoutes: Route[] = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    label: "Learning",
    icon: <BookIcon />,
    children: [
      {
        label: "My Courses",
        path: "/courses",
        icon: <LocalLibraryIcon />,
        children: [
          {
            path: "",
            element: <Courses />,
          },
          {
            path: "edit/:courseId",
            element: <EditCourse />,
          },
          {
            path: "edit/:courseId/:unitId/questions",
            element: <CourseContentEdit />,
          },
        ],
      },
      {
        label: "Question Bank",
        path: "/question-bank",
        icon: <AutoStoriesIcon />,
        children: [
          {
            path: "",
            element: <QuestionBankComponent />,
          },
          {
            path: "create",
            element: <QuestionBankEdit />,
          },
          {
            path: ":questionBankId/questions",
            element: <QuestionBankEdit />,
          },
        ],
      },
    ],
  },
  {
    label: "Knowledge",
    icon: <TickInSquareIcon />,
    path: "/knowledge",
  },
  {
    label: "Reports",
    icon: <DollerIcon />,
    path: "/reports",
  },
  {
    label: "Notification",
    icon: <NotificationsIcon />,
  },
];
