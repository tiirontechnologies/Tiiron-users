import MyCourses from "../pages/my-courses";
import QuestionBank from "../pages/question-bank";
import EditCourse from "../pages/edit-course";
import EditQuestionBank from "../pages/question-bank-edit";
import type { Route } from "types/routes";
import TickInSquareIcon from "../assets/icons/TickInSquareIcon";
import DollerIcon from "../assets/icons/DollerIcon";
import BookIcon from "@icons/BookIcon";
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
      {
        label: "Question Bank",
        path: "/question-bank",
        children: [
          {
            path: "",
            element: <QuestionBank />,
          },
          {
            path: "edit",
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
];
