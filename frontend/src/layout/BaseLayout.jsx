import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Home from "../pages/Home";

import { Outlet, useLocation } from "react-router-dom";

const BaseLayout = () => {
  const location = useLocation();
  return (
    <>
      <main className="w-full h-full">
        <Header />
        <div className="w-full h-full">
          {location.pathname === "/" || location.pathname === "/home" ? (
            <Home />
          ) : (
            <Outlet />
          )}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default BaseLayout;
