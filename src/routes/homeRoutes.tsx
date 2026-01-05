import type { Route } from "types/routes";
import Layout from "../layouts/Layout";
import Landing from "../pages/Landing";
import { CourseGlossary, CheckoutPage } from "../features";
import PrivateRoute from "@layouts/PrivateRoute";
import FreeCourses from "../features/course-browse/pages/FreeCourses";

// Home routes for the landing page
export const homeRoutes: Route[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/course-glossary/:courseId", element: <CourseGlossary /> },
      { path: "/browse-course/free", element: <FreeCourses /> },
      { path: "/checkout", element: (
          <PrivateRoute >
            <CheckoutPage />
          </PrivateRoute>
        )  },
    ],
  },
];
