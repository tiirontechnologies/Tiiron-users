import MyCourses from "../pages/my-courses";
import EditCourse from "../pages/edit-course";
import type { Route } from "types/routes";
import TickInSquareIcon from "../assets/icons/TickInSquareIcon";
import DollerIcon from "../assets/icons/DollerIcon";
import BookIcon from "@icons/BookIcon";
import CourseGlossary from "@pages/CourseGlossary";
import CheckoutPage from "@pages/Checkout";
export const appRoutes: Route[] = [
  {
    label: "Learning",
    icon: <BookIcon />,
    children: [
      {
        label: "My Courses",
        path: "/courses",
        children: [
          {
            path: "",
            element: <MyCourses />,
          },
          {
            path: "edit",
            element: <EditCourse />,
          },
        ],
      },
      { label: "Question Bank", path: "/settings/account" },
    ],
  },
  {
    label: "Knowledge",
    icon: <TickInSquareIcon />,
    path: "/knowledge",
  },
  {
    label: "Reports",
    icon: <DollerIcon />,
    path: "/reports",
  },
  {
    label: "Course Glossary",
    element:<CourseGlossary />,
    icon: <DollerIcon />,
    path: "/course-glossary",
  },
  {
    label: "Checkout",
    element:<CheckoutPage />,
    icon: <DollerIcon />,
    path: "/checkout",
  },
];
