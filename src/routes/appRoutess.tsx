import QuestionBank from "../pages/question-bank";
import EditCourse from "../pages/EditCourse";
import EditQuestionBank from "../pages/question-bank-edit";
import type { Route } from "types/routes";
import TickInSquareIcon from "../assets/icons/TickInSquareIcon";
import DollerIcon from "../assets/icons/DollerIcon";
import BookIcon from "@icons/BookIcon";
import CheckoutPage from "@pages/Checkout";
import UploadPage from "@pages/upload-box";
import Courses from "../pages/Courses";
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
            element: <Courses />,
          },
          {
            path: "edit/:courseId",
            element: <EditCourse />,
          },
        ],
      },
      {
        label: "Question Bank",
        path: "/question-bank",
        children: [
          {
            path: "",
            element: <QuestionBank />,
          },
          {
            path: "create",
            element: <EditQuestionBank />,
          },
        ],
      },
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
  // {
  //   label: "Course Glossary",
  //   element:<CourseGlossary />,
  //   icon: <DollerIcon />,
  //   path: "/course-glossary",
  // },
  {
    label: "Checkout",
    element:<CheckoutPage />,
    icon: <DollerIcon />,
    path: "/checkout",
  },
  {
    label: "Upload Box",
    element:<UploadPage />,
    icon: <DollerIcon />,
    path: "/upload-box",
  },
];
