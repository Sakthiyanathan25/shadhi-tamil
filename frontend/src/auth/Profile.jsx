import React from "react";
import Home from "../pages/profile/Home";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/user/Sidebar";

const Profile = () => {
  return (
    <main className="w-full h-full flex py-20 px-[10%] gap-10">
      <aside className="w-[30%] py-10 px-5 h-fit shadow border-[1px] border-gray-200 rounded-md">
        <Sidebar />
      </aside>
      <section className="w-[70%]">
        {location.pathname === "/profile" ? (
          <>
            <Home />
          </>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </section>
    </main>
  );
};

export default Profile;
