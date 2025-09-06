import type { Route } from "types/routes";

import Layout from "../layouts/Layout";
import Home from "@pages/home/Home";
import Features from "@pages/home/Features";
import About from "@pages/home/About";
import Product from "@pages/home/Product";
import Pricing from "@pages/home/Pricing";
import Contact from "@pages/home/Contact";
import NotFound from "@pages/home/NotFound";
import LoginSignup from "@pages/home/LoginSignup";

import WhyTiiron from "@pages/home/Explore/WhyTiiron";
import OurPlatform from "@pages/home/Explore/OurPlatform";
import WhomFor from "@pages/home/Explore/WhomFor";

export const homeRoutes: Route[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/features", element: <Features /> },
      { path: "/product", element: <Product /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/loginsignup", element: <LoginSignup /> },

      // Explore Dropdown routes
      { path: "/whytiiron", element: <WhyTiiron /> },
      { path: "/whomfor", element: <WhomFor/> },
      { path: "/ourplatform", element: <OurPlatform /> },
    ],
  },
  // Fallback
  { path: "*", element: <NotFound /> },
];
