import React, { useEffect, useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { IoHeartSharp } from "react-icons/io5";
import { FaFileLines } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { BsChatHeartFill } from "react-icons/bs";

import banner1 from "../assets/home/banner1.jpg";
import banner2 from "../assets/home/banner2.jpg";
import banner3 from "../assets/home/banner4.jpg";
import formbg from "../assets/contact.jpg";
import shape from "../assets/home/curved.svg";
import heartBanner from "../assets/home/heart banner.svg";
import couple from "../assets/home/couples.jpg";

import classNames from "classnames";
import ImageGallery from "../components/ImageGallery";
import Members from "../components/Members";

import age from "../data/age.js";

const images = [banner1, banner2, banner3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  let ulContent = [
    {
      id: 1,
      content:
        "Every user on our platform has been verified by an expert team to make sure they are real and active.",
    },
    {
      id: 2,
      content:
        "You can trust us to find your dream partner We are one of the best and most trusted matrimonial services providers.",
    },
    {
      id: 3,
      content:
        "The design of this app is sleek and user-friendly. It will make it easy for anyone to find what they need in just a few clicks.",
    },
    {
      id: 4,
      content:
        "Every user on our platform has been verified by an expert team to make sure they are real and active.",
    },
    {
      id: 5,
      content:
        "With the help of this new search tool, you can find your perfect match in no time! It has been designed to be quick and efficient.",
    },
  ];

  let process = [
    {
      id: 1,
      title: "Register",
      desc: "Register to our website, fill up your profile completely, and put a beautiful image on your profile.",
      icon: <FaFileLines />,
    },
    {
      id: 2,
      title: "Find Your Partner",
      desc: "Search your interests that you like. You'll also be recommended users based on your preferences.",
      icon: <HiUsers />,
    },
    {
      id: 3,
      title: "Connect",
      desc: "Add friends, approach them, and chat with them. Be sure to share your audio, photo, and video too.",
      icon: <BsChatHeartFill />,
    },
  ];
  return (
    <>
      <section className="w-full h-full">
        <main className="main-container relative w-full min-h-[120vh] overflow-hidden -z-10 mt-[-20%] bg-cover bg-center bg-no-repeat">
          {images.map((image, index) => (
            <div
              key={index}
              className={classNames(
                "absolute w-full h-full transition-opacity duration-1000 slide",
                {
                  "opacity-0": index !== currentIndex,
                  "opacity-100": index === currentIndex,
                }
              )}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="overlay"></div>
          <img
            src={shape}
            className="w-full bg-cover bg-no-repeat absolute mt-[52.7%] z-10 -pl-5"
          />
        </main>
        <div className="absolute  top-[30%] mx-32 ">
          {/* border-pink-300 border-2*/}
          <div className="backdrop-blur-lg p-16 rounded-md duration-75 w-[45%] mb-5">
            <h1 className="text-4xl font-semibold text-white">
              Love is <span className="text-[#ee3a6a]">Just a Click</span>
            </h1>
            <p className="w-full my-2 text-white">
              Your perfect match is closer than you think. Join now and meet
              someone who is equally eager to find a loving and lasting
              partnership.
            </p>
          </div>
          <div
            className="w-full h-full bg-left bg-cover rounded-md"
            style={{ backgroundImage: `url(${formbg})` }}
          >
            {/* <form className="p-5 flex items-center gap-4 backdrop-blur rounded-md">
              <select className="w-[25%] bg-transparent border-[1px] rounded-md border-slate-400 p-2 outline-none ">
                <option value="I am">I am</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select className="w-[25%] bg-transparent border-[1px] rounded-md border-slate-400 p-2 outline-none ">
                <option value="seeking">Seeking</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select className="w-[25%] bg-transparent border-[1px] rounded-md border-slate-400 p-2 outline-none ">
                <option value="seeking">Age From</option>
                {age.map(({ id, age }) => (
                  <option key={id} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              <select className="w-[25%] bg-transparent border-[1px] rounded-md border-slate-400 p-2 outline-none ">
                <option value="seeking">Age To</option>
                {age.map(({ id, age }) => (
                  <option key={id} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              <button className="bg-[#ee3a6a] p-3 rounded-md ">
                <BsSearchHeart fontSize={20} className="text-md text-white" />
              </button>
            </form> */}
          </div>
        </div>
      </section>
      <section className="w-full h-full my-5">
        <main className="flex gap-5 w-full">
          <div className="flex flex-wrap w-[50%] px-10 pr-30 gap-4">
            <ImageGallery />
          </div>
          <div className="flex flex-wrap w-[50%]">
            <div className="px-10">
              <h5 className="text-[#ff5a60] text-xl">Welcome to</h5>
              <h1 className="text-4xl font-semibold text-[#333] mt-1">
                ShaadiTamil.
              </h1>
              <div className=" border-b-2 w-ful my-4 w-[35%] border-[#ff5a60]"></div>
              <p className="w-[70%] text-gray-600">
                ShaadiTamil is a one-stop spot for all your matrimonial needs.
                With millions of happy couples already found their perfect match
                on our site, we’re confident that you’ll be able to find yours
                as well!
              </p>
              <div className="mt-10">
                {ulContent.map((content) => (
                  <li
                    key={content.id}
                    className="w-[80%] flex justify-start text-gray-600 items-start gap-2 mt-10"
                  >
                    <span>
                      <IoHeartSharp className="text-3xl text-[#ff5a60]" />
                    </span>
                    {content.content}
                  </li>
                ))}
              </div>
              <div className="flex justify-between mt-10 w-[80%]">
                <button className="bg-[#ff5a60] px-3 py-2 w-[25%] text-white rounded-md">
                  Let's Start
                </button>
                <button className="border-black/40 border-2 px-3 py-2 w-[25%] text-gray-500 rounded-md">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>
      <section
        className="w-full my-10"
        style={{ backgroundImage: `url(${heartBanner})` }}
      >
        <div className="w-full relative min-h-[100vh] overlay2">
          <div className="">
            <Members />
          </div>
        </div>
      </section>
      <section className="w-full h-full px-20 flex flex-col justify-center items-center bg-white">
        <h3 className="text-2xl text-[#ff5a60]">How It Works</h3>
        <div className="border-b-[1px] my-4 border-[#ff5a60] w-[20%]"></div>
        <h1 className="text-3xl text-gray-800 font-semibold">
          Find Your Partner In Just Few Steps
        </h1>
        <p className="my-5 w-[50%] text-center text-gray-500">
          ShaadiTamil will help you find your perfect match with just a few
          steps. You focus on what is most important to you, we do all the work.
        </p>
        <div className="flex flex-wrap w-full mb-6">
          {process.map(({ id, title, desc, icon }) => (
            <div
              key={id}
              className=" justify-center items-center flex flex-col gap-5 h-48 w-[33.3%]"
            >
              <span className="text-[#ee3a6a] text-6xl">{icon}</span>
              <h4 className="text-lg font-semibold text-black/90">{title}</h4>
              <p className="text-sm text-center text-gray-500 w-[50%]">
                {desc}
              </p>
            </div>
          ))}
        </div>
        <button className="bg-[#ee3a6a] px-3 py-3 my-5 w-[10%] text-white rounded-md">
          Let's Start
        </button>
      </section>
      <section className="w-full h-full bg-[#ffe9ea] px-44 py-20 mb-10 flex justify-center items-center gap-5">
        <div className="w-[50%]">
          <h4 className="text-[#ee3a6a] font-semibold text-2xl my-4">
            Find Your
          </h4>
          <h2 className="text-black/70 mb-4 font-bold uppercase text-4xl ">
            life partner with us.
          </h2>
          <p className="text-sm text-gray-600 leading-loose w-[80%]">
            Start your journey today with the WP Matrimony and find a perfect
            match. Get ready to capture all those beautiful memories for
            yourself, because these are things that will last forever! Dating
            can be fun, but it’s hard to know where you’ll end up. Have no fear!
            Join the Dating Club today and find your perfect match in less than
            24 hours who will enjoy all of these moments with you for years into
            come The time has never been better – get started on finding someone
            worth keeping around by joining this amazing new community at WP
            Matrimony right away!!
          </p>
          <button className="bg-[#ee3a6a] px-3 py-3 my-5 w-auto text-white rounded-md">
            Let's Start
          </button>
        </div>
        <div className="w-[50%]">
          <img src={couple} alt="couples" className="rounded-full w-[70%]" />
        </div>
      </section>
    </>
  );
};

export default Home;
