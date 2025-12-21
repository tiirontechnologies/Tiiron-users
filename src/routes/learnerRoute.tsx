import type { Route } from "types/routes";
import LocalLibraryIcon from "@icons/LocalLibraryIcon";
import AutoStoriesIcon from "@icons/AutoStoriesIcon";
import Courses from "../features/course-browse/pages/Courses";
import MyCourses from "../features/my-course/pages/Courses";
import ViewProfile from "../features/user/pages/ViewProfile";

export const userRoutes: Route[] = [
    {
        label: "Browse Courses",
        path: "/browse-courses",
        icon: <AutoStoriesIcon />,
        element: <Courses />,
    },
    {
        label: "My Courses",
        path: "/my-courses",
        icon: <LocalLibraryIcon />,
        element: <MyCourses />
    },
    {
        label: "Profile",
        path: "/profile",
        element: <ViewProfile />
    }
];
