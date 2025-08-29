// src/components/layout/Layout.jsx
import Navbar from "@components/Home/common/Navbar";
import Footer from "@components/Home/common/Footer";
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
