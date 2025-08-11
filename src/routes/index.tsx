import MainLayout from "@layouts/MainLayout";
import { appRoutes } from "./appRoutess";
import { globalRoutes } from "./globalRoutes";
import { authRoutes } from "./authRoutes";
import CourseProgress from "@pages/course-progress";
import PrivateRoute from "@layouts/PrivateRoute";
import CourseGlossary from "@pages/CourseGlossary";
import DollerIcon from "@icons/DollerIcon";
export const routeConfig = [
  {
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [...appRoutes, ...globalRoutes],
  },
  {
    path: "course-progress/:courseId",
    element: <PrivateRoute><CourseProgress /></PrivateRoute>,
  },
  {
    label: "Course Glossary",
    element: <CourseGlossary />,
    icon: <DollerIcon />,
    path: "/course-glossary/:courseId",
  },
  ...authRoutes,
];