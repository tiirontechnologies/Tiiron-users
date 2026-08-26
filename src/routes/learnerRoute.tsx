import type { Route } from "types/routes";
import LocalLibraryIcon from "@icons/LocalLibraryIcon";
// import AutoStoriesIcon from "@icons/AutoStoriesIcon";
// import Courses from "../features/course-browse/pages/Courses";
import MyCourses from "../features/my-course/pages/Courses";
// import ViewProfile from "../features/user/pages/ViewProfile";
import PrivateRoute from "@layouts/PrivateRoute";
import ContactForm from "@pages/Contact";
import EducatorProfile from "@features/EducatorProfile";

import StudentProfile from "@features/user";

export const userRoutes: Route[] = [
    // {
    //     label: "Browse Courses",
    //     path: "/browse-courses",
    //     icon: <AutoStoriesIcon />,
    //     element: (
    //       <PrivateRoute >
    //         <Courses />
    //       </PrivateRoute>
    //     ) ,
    // },
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
    // {
    //     label: "Profile",
    //     path: "/profile",
    //     element: (
    //       <PrivateRoute>
    //         <ViewProfile />
    //       </PrivateRoute>
    //     )
    // },
    {
        label: "Instructor",
        path: "/instructor/:username",
        element: (
          <PrivateRoute>
            <EducatorProfile/>
          </PrivateRoute>
        )
    },
       {
        label: "Profile",
        path: "/profile",
        element: (
          <PrivateRoute>
            <StudentProfile/>
          </PrivateRoute>
          
        )
    },
    {
        label: "Help and Support",
        path: "/help-support",
        element: (
          <PrivateRoute>
            <ContactForm/>
          </PrivateRoute>
        )
    }
];
