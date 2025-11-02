import type { Route } from "types/routes";
import Layout from "../layouts/Layout";
import Landing from "../pages/Landing";

// Home routes for the landing page
export const homeRoutes: Route[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
    ],
  },
];
