// src/components/layout/Layout.jsx
import { Navbar, Footer } from "../features";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Page content goes here */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
