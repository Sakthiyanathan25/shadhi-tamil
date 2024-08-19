import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { requestOTP } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestOTP(email);
    navigate("/reset-password");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(""); // Clear the email error when user starts typing
    }
  };

  return (
    <main className="min-h-[100vh]">
      <div className="flex items-center justify-center">
        <form
          className="bg-white h-[40vh] border-[2px] border-pink-300 p-6 px-7 rounded-lg shadow-lg w-full flex flex-col items-center justify-center max-w-md mt-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold text-pink-500 mt-5">
            Forgot Password
          </h1>
          <h3 className="text-xl text-gray-400 mb-4 text-center mt-2">
            one step to reset your password
          </h3>
          <div className="flex gap-2 justify-between items-center w-64">
            <label className="text-xl text-gray-800">Email</label>
            <input
              className="border-[2px] outline-none focus:border-pink-200 rounded-md border-gray-100 px-2 py-1"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          {emailError && <p className="text-red-500">{emailError}</p>}
          <button
            type="submit"
            className="my-4 bg-pink-200 w-96 px-2 py-2 rounded-md text-pink-500 transition-all duration-500 hover:bg-pink-500 hover:text-white"
          >
            Send OTP
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
