import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] max-w-7xl mx-auto px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
