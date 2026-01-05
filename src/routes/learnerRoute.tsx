import type { Route } from "types/routes";
import LocalLibraryIcon from "@icons/LocalLibraryIcon";
import AutoStoriesIcon from "@icons/AutoStoriesIcon";
import Courses from "../features/course-browse/pages/Courses";
import MyCourses from "../features/my-course/pages/Courses";
import ViewProfile from "../features/user/pages/ViewProfile";
import PrivateRoute from "@layouts/PrivateRoute";

export const userRoutes: Route[] = [
    {
        label: "Browse Courses",
        path: "/browse-courses",
        icon: <AutoStoriesIcon />,
        element: (
          <PrivateRoute >
            <Courses />
          </PrivateRoute>
        ) ,
    },
    {
        label: "My Courses",
        path: "/my-courses",
        icon: <LocalLibraryIcon />,
        element: (
          <PrivateRoute >
            <MyCourses />
          </PrivateRoute>
        )
    },
    {
        label: "Profile",
        path: "/profile",
        element: (
          <PrivateRoute>
            <ViewProfile />
          </PrivateRoute>
        )
    }
];
