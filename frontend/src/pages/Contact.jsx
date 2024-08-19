import React from "react";
import cover from "../assets/contact-cover.jpg";
import shape from "../assets/home/curved.svg";
import divBg from "../assets/contact.jpg";

import { FaPhone } from "react-icons/fa6";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import ContactForm from "../components/ContactForm";
const Contact = () => {
  let contactDetails = [
    { id: 1, content: "+123-456-7890", icon: <FaPhone /> },
    { id: 2, content: "shaaditamil@gmail.com", icon: <FaEnvelope /> },
    {
      id: 3,
      content: "No:123, Main street, Chennai-600028",
      icon: <RiMapPin2Fill />,
    },
  ];
  let socialLinks = [
    { id: 1, icon: <FaFacebook /> },
    { id: 2, icon: <FaInstagram /> },
    { id: 3, icon: <FaSquareXTwitter /> },
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
            <h4 className="text-2xl font-semibold text-white">
              Feel free to contact with us
            </h4>
            <h2 className="text-5xl text-white uppercase font-bold">
              let's chat and connect
            </h2>
            <p className="text-base text-white w-[50%] text-center mt-2">
              Our Members Search your match based on your interests and don’t
              hesitate to approach them first. Interact with as many people as
              possible.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center px-32 py-10 min-h-[100vh] bg-white/20">
        <div className="py-10 w-[50%]">
          <ContactForm />
        </div>
        <div className="w-[40%] mt-20">
          <div
            className="w-full h-[35%] shadow-md p-10 shadow-pink-200 rounded-md bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${divBg})` }}
          >
            <ul className="flex flex-col gap-3">
              {contactDetails.map(({ id, content, icon }) => (
                <li key={id} className="flex gap-3 text-black/70 font-semibold">
                  {" "}
                  <span className="text-[#ee3a6a] text-xl">{icon}</span>{" "}
                  {content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full px-32 mt-5 mb-20">
        <h3 className="flex items-center animate-bounce justify-center gap-2 text-4xl text-[#ee3a6a]">
          Get more closer with our{" "}
          {socialLinks.map(({ id, icon }) => (
            <span key={id} className="cursor-pointer">{icon}</span>
          ))}{" "}
        </h3>
      </section>
    </>
  );
};

export default Contact;
