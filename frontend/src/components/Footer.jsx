import React from "react";

import Logo from "../assets/Logo.png";
import bgImage from "../assets/footer.svg";
import { NavLink } from "react-router-dom";

import { GrSend } from "react-icons/gr";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  let navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Members", path: "/members" },
    { id: 3, name: "Contact", path: "/contact" },
  ];

  let socialLinks = [
    {
      id: 1,
      name: (
        <FaFacebookF
          color="#fff"
          className="p-1  rounded-full border-2 border-white bg-[#ff5a60] hover:scale-110 hover:shadow-md transition-all duration-500"
        />
      ),
      path: "/",
    },
    {
      id: 2,
      name: (
        <FaInstagram
          color="#fff"
          className="p-1 rounded-full border-2 border-white bg-[#ff5a60] hover:scale-110 hover:shadow-md transition-all duration-500"
        />
      ),
      path: "/",
    },
    {
      id: 3,
      name: (
        <FaYoutube
          color="#fff"
          className=" p-1 rounded-full border-2 border-white bg-[#ff5a60] hover:scale-110 hover:shadow-md transition-all duration-500"
        />
      ),
      path: "/",
    },
  ];

  let currentYear = new Date().getFullYear();

  return (
    // style={{ backgroundImage: `url(${bgImage})` }}
    <footer className="bottom-0 w-full h-auto z-50">
      <img src={bgImage} />
      <div className="flex flex-col w-full h-auto items-center p-5 px-[20%] bg-[#7c3c4e]">
        <div className="flex w-full items-center">
          <div>
            <img src={Logo} className="w-64" />
            <p className=" w-72 text-white text-[15px]">
              ShaadiTamil helps you find your perfect soulmate. Join today and
              start searching for your partner right away.
            </p>
            <ul className="flex items-center gap-2 my-2">
              {socialLinks.map((socialLink) => (
                <NavLink
                  key={socialLink.id}
                  to={socialLink.path}
                  className="mx-[2px]"
                >
                  <li className="text-3xl">{socialLink.name}</li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="flex ml-[50px] justify-between w-full">
            <ul className="flex flex-col w-56 mr-20">
              <h1 className="text-2xl text-white font-semibold">
                Useful Links
              </h1>
              {navLinks.map((navLink) => (
                <NavLink
                  key={navLink.id}
                  to={navLink.path}
                  className="text-white my-1"
                >
                  {navLink.name}
                </NavLink>
              ))}
            </ul>
            <div className="flex flex-col justify-between">
              <h1 className="text-3xl font-bold text-white">Subscribe Now</h1>
              <h3 className="mt-2 text-white">
                Be the first one to know about out new features, updates and
                many more.
              </h3>
              <div className="flex w-full items-center my-2">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="px-2 py-3 w-96 text-white rounded-md shadow bg-transparent border-[1px] outline-none placeholder:text-[#dc6f72] border-white"
                />
                <button className="bg-white hover:bg-[#ee3a6a] hover:text-white my-2 shadow-md shadow-slate-200 hover:shadow-[#fd94b0cb] w-auto p-3 py-3 rounded-md -ml-5 transition-all duration-500">
                  <GrSend
                    fontSize={10}
                    className="w-7 h-7 hover:text-white text-[#ee3a6a] transition-all duration-500"
                  />
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="border-t-2 mt-10 w-[80%] border-[#e5bfbfc6] flex items-center" />
        <p className="text-white my-4">
          Copyright &copy; {currentYear} ShaadiTamil | Powered by SayIT
        </p>
      </div>
    </footer>
  );
};

export default Footer;
