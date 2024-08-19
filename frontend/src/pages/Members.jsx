import React from "react";
import { BsSearchHeart } from "react-icons/bs";

import cover from "../assets/members/cover.jpg";
import shape from "../assets/home/curved.svg";

import boy1 from "../assets/members/boy-2.jpg";
import boy3 from "../assets/members/boy-4.jpg";
import boy4 from "../assets/members/boy-5.jpg";
import boy5 from "../assets/members/boy-6.jpg";
import boy6 from "../assets/members/boy-7.jpg";
import boy7 from "../assets/members/girl-1.jpg";

const Members = () => {
  let gallery = [
    { id: 1, img: boy1, alt: "dp" },
    { id: 3, img: boy3, alt: "dp" },
    { id: 4, img: boy4, alt: "dp" },
    { id: 5, img: boy5, alt: "dp" },
    { id: 6, img: boy6, alt: "dp" },
    { id: 7, img: boy7, alt: "dp" },
  ];
  return (
    <>
      <section>
        <main
          className="main-container relative w-full min-h-[120vh] overflow-hidden -z-10 mt-[-20%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div className="overlay"></div>
          <img
            src={shape}
            className="w-full bg-cover bg-no-repeat absolute mt-[52.7%] z-10 -pl-5"
          />
        </main>
        <div className="absolute top-[30%] mx-32 flex justify-center items-center">
          {/* border-pink-300 border-2*/}
          <div className=" backdrop-blur-sm w-full gap-3 p-16 rounded-md duration-75 mb-5 flex justify-center items-center flex-col">
            <h4 className="text-2xl font-semibold text-white">Our Members</h4>
            <h className="text-5xl text-white uppercase font-bold">
              start looking for your partner
            </h>
            <p className="text-base text-white w-[50%] text-center mt-2">
              Our Members Search your match based on your interests and don’t
              hesitate to approach them first. Interact with as many people as
              possible.
            </p>
          </div>
        </div>
      </section>
      <section className="px-32 w-full">
        <div className="flex items-center justify-center gap-3 my-10">
          <input placeholder="Search your match..." type="text" className=" bg-white rounded-md focus:bg-[#d8608090] border-[1px] border-gray-300 outline-none focus:border-[#ee3a6a] px-3 py-2 w-[50%]" />
          <button className="bg-[#ee3a6a] p-3 rounded-md text-center">
            <BsSearchHeart fontSize={20} className="text-md text-white" />
          </button>
        </div>
      </section>
      <section className="bg-[#ffffff] min-h-[120vh] flex flex-col justify-center items-center px-20 mb-10">
        <div className="grid grid-cols-3 items-center justify-center gap-2 p-10">
          {gallery.map((pic) => (
            <img
              key={pic.id}
              src={pic.img}
              className="w-full object-cover rounded-lg cursor-pointer hover:-translate-y-10 transition-all duration-700"
            />
          ))}
        </div>
        <button className="border-[#ee3a6a] hover:bg-[#ee3a6a] hover:text-white transition-all duration-700 border-[1px] px-3 py-2 w-[20%] text-[#ee3a6a] rounded-md">
          View more members
        </button>
      </section>
    </>
  );
};

export default Members;
