import React, { useContext, useEffect} from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import { AuthContext } from "../../providers/AuthProvider";
import GlobalLoader from "../../components/GlobalLoader";
import axiosPublic from "../../api/axiosPublic";
import { useQueryClient } from "@tanstack/react-query";

const MainLayout = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    axiosPublic.get("/health").catch(() => {});

    queryClient.prefetchQuery({
      queryKey: ["home-meals"],
      queryFn: () =>
        axiosPublic
          .get("/meals/home", { timeout: 60000 })
          .then((res) => res.data),
    });
  }, [queryClient]);
  
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <GlobalLoader />;
  }
  
  return (
    <div
      className="min-h-screen bg-base-100 text-base-content"
    >
      <Navbar/>
      <div className="min-h-[70vh] max-w-7xl mx-auto px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
