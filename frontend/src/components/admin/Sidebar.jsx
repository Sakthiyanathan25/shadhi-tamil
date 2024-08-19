import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getTimeOfDay } from "../../utils/greeting";

import { FaCircleUser } from "react-icons/fa6";
import { MdEditDocument } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaHandshakeSimple } from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const greet = getTimeOfDay();
  const navigate = useNavigate();
  const userId = user._id;

  const getDisplayName = (user) => {
    if (user.name) {
      return user.name;
    } else if (user.email) {
      let splitName = user.email.split("@")[0];
      return splitName.charAt(0).toUpperCase() + splitName.slice(1);
    }
    return "";
  };
  const sideMenu = [
    {
      id: 1,
      name: "Users",
      path: `/admin/users`,
      icon: <MdEditDocument />,
    },
    {
      id: 2,
      name: "Analytics",
      path: "/admin/analytics",
      icon: <FaUserEdit />,
    },
    {
      id: 4,
      name: "Settings",
      path: "/admin/settings",
      icon: <IoSettings />,
    },
  ];

  return (
    <main className="shadow h-[100vh]">
      <div className="py-2">
        {sideMenu.map(({ id, name, icon, path }) => (
          <div
            key={id}
            className="flex items-center gap-3 hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer transition-all duration-700 "
            onClick={() => navigate(`${path}`)}
          >
            <span className="cursor-pointer bg-pink-200 h-10 w-10 my-1 flex items-center justify-center rounded-full text-xl text-pink-500 shadow-pink-200 shadow-md hover:bg-pink-500 hover:text-white hover:scale(1.1) transition-all duration-700">
              {icon}
            </span>
            <p className="text-pink-500 transition-all duration-700">{name}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Sidebar;
