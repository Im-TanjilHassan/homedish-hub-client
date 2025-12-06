import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import { AuthContext } from "../../providers/AuthProvider";
import GlobalLoader from "../../components/GlobalLoader";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <GlobalLoader />;
  }
  
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
