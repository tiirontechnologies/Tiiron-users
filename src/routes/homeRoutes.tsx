import type { Route } from "types/routes";
import Layout from "../layouts/Layout";
import Landing from "../pages/Landing";
import { CourseGlossary, CheckoutPage } from "../features";

// Home routes for the landing page
export const homeRoutes: Route[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/course-glossary/:courseId", element: <CourseGlossary /> },
      { path: "/checkout", element: <CheckoutPage /> },
    ],
  },
];
