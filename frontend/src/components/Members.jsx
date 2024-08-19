import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";

import boy3 from "../assets/home/boy-4.jpg";
import boy4 from "../assets/home/boy-5.jpg";
import boy6 from "../assets/home/boy-7.jpg";

const Members = () => {
  const [active, setActive] = useState(1);
  let buttons = [
    { id: 1, btn: "All", icon: <FaStar fontSize={25} />, active: "true" },
    { id: 2, btn: "Man", icon: <IoMdMale fontSize={25} />, active: "false" },
    {
      id: 3,
      btn: "Woman",
      icon: <IoMdFemale fontSize={25} />,
      active: "false",
    },
  ];

  let gallery = [
    { id: 1, img: boy3, alt: "dp" },
    { id: 2, img: boy6, alt: "dp" },
    { id: 3, img: boy4, alt: "dp" },
  ];
  const handleActive = (id) => {
    setActive(id);
  };

  return (
    <main className="w-full relative h-full p-10 py-20 flex flex-col items-center gap-5 justify-center">
      <h3 className="text-2xl text-white">Our Members</h3>
      <h1 className="text-4xl text-white">Start Looking For You Partner</h1>
      <p className="text-md w-[50%] text-white/80 text-center">
        The beginning of a beautiful relationship is here. The ShaadiTamil is a
        great place to find potential matches. Why not start looking for your
        ideal partner online right away?
      </p>
      <div className="flex gap-3 w-full justify-center">
        {buttons.map((btn) => (
          <button
            onClick={() => handleActive(btn.id)}
            key={btn.id}
            className={`${
              active === btn.id
                ? "bg-white text-[#ee3a6a]"
                : "border-2 border-white text-white"
            } w-[120px] py-3 px-2 text-base text-center rounded-md flex items-center justify-center gap-1 transition-all duration-500`}
          >
            {btn.icon}
            {btn.btn}
          </button>
        ))}
      </div>
      <div className="grid gap-4 items-center justify-center grid-cols-3 my-10">
        {gallery.map((pic) => (
          <img
            key={pic.id}
            src={pic.img}
            className="w-[350px] object-contain rounded-md cursor-pointer hover:-translate-y-10 transition-all duration-700"
          />
        ))}
      </div>
      <button className="border-white hover:bg-white hover:text-[#ee3a6a] transition-all duration-700 border-2 px-3 py-2 w-[20%] text-white rounded-md">
        View more members
      </button>
    </main>
  );
};

export default Members;
