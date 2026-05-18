import type { Route } from "types/routes";
import Layout from "../layouts/Layout";
import Landing from "../pages/Landing";
import { CourseGlossary, CheckoutPage } from "../features";
import PrivateRoute from "@layouts/PrivateRoute";
import FreeCourses from "../features/course-browse/pages/FreeCourses";
import QuizDashboard from "@pages/QuizDashboard";
import Contact from "@pages/Contact";
import About from "@pages/About";

// Home routes for the landing page
export const homeRoutes: Route[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      {path: "/generate-quiz", element : <QuizDashboard/>},
      { path: "/course-glossary/:courseId", element: <CourseGlossary /> },
      { path: "/browse-course/free", element: <FreeCourses /> },
      { path: "/about", element: <About /> },
        {path: "/contact", element: <Contact/> },
      { path: "/checkout", element: (
          <PrivateRoute >
            <CheckoutPage />
          </PrivateRoute>
        )  },
    ],
  },
];
