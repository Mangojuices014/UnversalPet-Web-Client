import React from "react";
import { Outlet } from "react-router-dom";
import BackgroundImageSlider from "../common/BackgroundImageSlider";
import NavBar from "./NavBar";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <main>
      <div className="app-container">
        <NavBar />
        <BackgroundImageSlider />
        <div>
          <Outlet />
        </div>
        <Footer />

      </div>
    </main>
  );
};

export default RootLayout;
