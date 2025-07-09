import MainLayout from "@layouts/MainLayout";
import { appRoutes } from "./appRoutess";
import { globalRoutes } from "./globalRoutes";
import { authRoutes } from "./authRoutes";
import CourseProgress from "@pages/course-progress";
export const routeConfig = [
  {
    element: <MainLayout />,
    children: [...appRoutes, ...globalRoutes],
  },
  {
    path: "course-progress/:courseId",
    element: <CourseProgress />,
  },
  ...authRoutes,
];
console.log(routeConfig, "routeConfig");
