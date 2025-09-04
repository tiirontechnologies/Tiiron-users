import QuestionBank from "@pages/QuestionBank";
import EditCourse from "../pages/EditCourse";
import EditQuestionBank from "@pages/QuestionBankEdit";
import type { Route } from "types/routes";
import TickInSquareIcon from "../assets/icons/TickInSquareIcon";
import DollerIcon from "../assets/icons/DollerIcon";
import BookIcon from "@icons/BookIcon";
import Courses from "../pages/Courses";
import NotificationsIcon from "@icons/NotificationsIcon";
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
          {
            path: ":questionBankId/questions",
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
  {
    label: "Notification",
    icon: <NotificationsIcon />,
  },
];
