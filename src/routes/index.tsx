import MainLayout from "@layouts/MainLayout";
import { appRoutes } from "./appRoutess";
import { globalRoutes } from "./globalRoutes";
import { authRoutes } from "./authRoutes";
import { homeRoutes } from "./homeRoutes";
import { CourseProgress, CodeEditorPage } from "../features";
import NotFound from "../pages/NotFound";
import { userRoutes } from "./learnerRoute";
import UserLayout from "@layouts/UserLayout";
import SearchResults from "../pages/SearchResults";
import PrivateRoute from "@layouts/PrivateRoute";
import CodeTestPage from "../pages/CodeTestPage";

export const routeConfig = [
  {
    element: <MainLayout />,
    children: [
      ...appRoutes,
      ...globalRoutes,
      {
        path: "/search",
        element: <SearchResults />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [...userRoutes]
  },
  {
    path: "/course-practice/:courseId",
    element: <CourseProgress />,
  },
  {
    path: "/code-editor/:courseId/:questionId",
    element: <CodeEditorPage />,
  },
  {
    path: "/code-test",
    element: <CodeTestPage />,
  },
  ...homeRoutes,
  ...authRoutes,
  {
    path: "*", // Catch-all for unmatched routes
    element: <NotFound />, // Render 404 page
  }
];
