import MainLayout from "@layouts/MainLayout";
import { appRoutes } from "./appRoutess";
import { globalRoutes } from "./globalRoutes";
import { authRoutes } from "./authRoutes";
import { homeRoutes } from "./homeRoutes";
import { CourseProgress } from "../features";
import { CourseGlossary } from "../features";
import NotFound from "../pages/NotFound";
import DollerIcon from "../assets/icons/DollerIcon";
import { CheckoutPage } from "../features";
import { userRoutes } from "./learnerRoute";
import UserLayout from "@layouts/UserLayout";

export const routeConfig = [
  {
    element: <MainLayout />,
    children: [...appRoutes, ...globalRoutes],
  },
  {
    path: "/learner",
    element: <UserLayout />,
    children: [...userRoutes]
  },
  {
    path: "/course-practice/:courseId",
    element: <CourseProgress />,
  },
  {
    label: "Course Glossary",
    element: <CourseGlossary />,
    icon: <DollerIcon />,
    path: "/course-glossary/:courseId",
  },
  {
    label: "Checkout",
    icon: <DollerIcon />,
    path: "/checkout",
    element: <CheckoutPage />,
  },
  ...homeRoutes,
  ...authRoutes,
  {
    path: "*", // Catch-all for unmatched routes
    element: <NotFound />, // Render 404 page
  }
];
