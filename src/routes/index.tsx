import MainLayout from "@layouts/MainLayout";
import { appRoutes } from "./appRoutess";
import { globalRoutes } from "./globalRoutes";
import { authRoutes } from "./authRoutes";
import { homeRoutes } from "./homeRoutes";
import { CourseProgress } from "../features";
import PrivateRoute from "@layouts/PrivateRoute";
import { CourseGlossary } from "../features";
import { Box } from "@mui/material";
import NotFound from "../pages/NotFound";
import DollerIcon from "../assets/icons/DollerIcon";
import { CheckoutPage } from "../features";

export const routeConfig = [
  {
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [...appRoutes, ...globalRoutes],
  },
  {
    path: "/course-practice/:courseId",
    element: <PrivateRoute><CourseProgress /></PrivateRoute>,
  },
  {
    label: "Course Glossary",
    element: <CourseGlossary />,
    icon: <DollerIcon />,
    path: "/course-glossary/:courseId",
  },
  ...homeRoutes,
  ...authRoutes,
  {
    path: "*",  // Catch-all for unmatched routes
    element: <NotFound />,  // Render 404 page
  },
  {
    label: "Checkout",
    icon: <DollerIcon />,
    path: "/checkout",
    element: <CheckoutPage />,
  },
];