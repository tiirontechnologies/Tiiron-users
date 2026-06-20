import type { Route } from "types/routes";
import Layout from "../layouts/Layout";
import Landing from "../pages/Landing";
import { CourseGlossary, CheckoutPage } from "../features";
import PrivateRoute from "@layouts/PrivateRoute";
import FreeCourses from "../features/course-browse/pages/FreeCourses";
import QuizDashboard from "@pages/QuizDashboard";
import Contact from "@pages/Contact";
import About from "@pages/About";
import TermsAndConditions from "@pages/Term&Con";;
import RefundPolicy from "@pages/Refund";
import PrivacyPolicy from "@pages/PrivacyPage";

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
        {path: "/privacy-policy", element: <PrivacyPolicy/> },
        {path: "/refund-policy", element: <RefundPolicy/> },
        {path: "/terms-and-conditions", element: <TermsAndConditions/> },
      { path: "/checkout", element: (
          <PrivateRoute >
            <CheckoutPage />
          </PrivateRoute>
        )  },
    ],
  },
];
