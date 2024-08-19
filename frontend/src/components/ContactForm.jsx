import React, { useState } from "react";
import formBg from "../assets/contact-form-cover.png";
import { baseurl } from "../utils/services";
import axios from "axios";
const ContactForm = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(value ? null : "Email is missing");
    }
    if (name === "name") {
      setNameError(value ? null : "Name is missing");
    }
    if (name === "subject") {
      setSubjectError(value ? null : "Subject is missing");
    }
    if (name === "message") {
      setMessageError(value ? null : "Message is required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !nameError && !subjectError && !messageError) {
      console.log("no errors found");
      try {
        const response = await axios.post(`${baseurl}/contact`, {
          contactData,
        });

        if (response.error) {
          console.log(response.data);
        } else {
          setContactData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("error found");
    }
  };

  return (
    <form
      className="w-[90%] bg-cover bg-center border-[1px] border-pink-100  bg-no-repeat h-[100vh] flex flex-col gap-5 p-10 shadow-lg shadow-pink-100 rounded-md"
      style={{ backgroundImage: `url(${formBg})` }}
      onSubmit={handleSubmit}
    >
      <h3 className="text-3xl font-semibold text-black/80">
        Let's Have A Chat
      </h3>
      <div className="flex flex-col">
        <label className=" font-semibold text-black/70">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="your name goes here"
          className="bg-white/40 px-3 py-2 border-[1px] border-pink-200 rounded-md mt-2 outline-none focus:bg-pink-100"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col">
        <label className=" font-semibold text-black/70">
          Your Email <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="your email goes here"
          className="bg-white/40 px-3 py-2 border-[1px] border-pink-200 rounded-md mt-2 outline-none focus:bg-pink-100"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col">
        <label className=" font-semibold text-black/70">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="your subject goes here"
          className="bg-white/40 px-3 py-2 border-[1px] border-pink-200 rounded-md mt-2 outline-none focus:bg-pink-100"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col">
        <label className=" font-semibold text-black/70">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          type="text"
          placeholder="Message..."
          rows={5}
          className="bg-white/40 px-3 py-2 border-[1px] border-pink-200 rounded-md mt-2 outline-none focus:bg-pink-100"
          onChange={handleInputChange}
        />
      </div>
      <button className="border-[#ee3a6a] hover:bg-[#ee3a6a] hover:text-white transition-all duration-700 border-[1px] px-3 py-2 w-[40%] text-[#ee3a6a] rounded-md">
        Send message
      </button>
    </form>
  );
};

export default ContactForm;
