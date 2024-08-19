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
      name: "Edit Profile",
      path: `/profile/edit/${userId}`,
      icon: <MdEditDocument />,
    },
    {
      id: 2,
      name: "Your Preferences",
      path: "/profile/preferences/edit",
      icon: <FaUserEdit />,
    },
    // {
    //   id: 3,
    //   name: "Verify Your Profile",
    //   path: "/profile/verify",
    //   icon: <RiVerifiedBadgeFill />,
    // },
    {
      id: 4,
      name: "Settings",
      path: "/profile/settings",
      icon: <IoSettings />,
    },
    {
      id: 5,
      name: "Help",
      path: "/help",
      icon: <FaHandshakeSimple />,
    },
    // { id: 16, name: "Success Stories", path: "", icon: <GiLovers /> },
  ];

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div className="bg-pink-100 border-[1px] border-pink-500 w-fit h-fit p-2 flex items-center justify-center rounded-full">
          <FaCircleUser fontSize={30} className="text-pink-500" />
        </div>
        <div className=" bg-white/80 mt-[-25px] ml-[25px] p-1 rounded-full text-gray-500 hover:text-gray-800 cursor-pointer transition-all duration-700">
          <FaCamera />
        </div>
        <h4> {greet}!</h4>
        <h3 className=" text-2xl text-pink-600">{getDisplayName(user)}</h3>
      </div>

      <div className="flex flex-col items-center py-5 gap-2">
        <h4 className="font-semibold text-pink-500 py-2">
          Membership :{" "}
          <span className="px-3 py-1 bg-orange-200 rounded-full text-orange-500">
            Free
          </span>{" "}
        </h4>
        <span className="bg-pink-200 text-sm text-pink-500 rounded-full px-2 py-1 ">
          Become a paid member now
        </span>
        <button className="border-[1px] border-pink-400 hover:bg-pink-400 hover:text-white transition-all duration-700 text-pink-400 w-fit px-3 py-1 my-2 rounded-full"
         onClick={()=>navigate(`/pricing`)}
         >
          Upgrade
        </button>
      </div>
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
    </>
  );
};

export default Sidebar;
