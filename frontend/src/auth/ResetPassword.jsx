import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email, otp, password);
    navigate("/login");
  };

  return (
    <main className="min-h-[100vh]">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-[2px] border-pink-300 my-10 p-6 px-7 rounded-lg shadow-lg w-full flex flex-col items-center justify-center max-w-md"
        >
          <h1 className="text-2xl font-semibold text-pink-500 mt-5">
            Reset Password
          </h1>
          <h3 className="text-xl text-pink-400 mb-4 text-center mt-2">
            Enter the OTP sent to your email
          </h3>
          <div className="flex gap-2 justify-between items-center w-full my-2">
            <label className="text-base text-gray-800">Email</label>
            <input
              type="email"
              className="border-[2px] outline-none focus:border-pink-200 rounded-md border-gray-100 px-2 py-1"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-between items-center w-full my-2">
            <label className="text-base text-gray-800">OTP</label>
            <input
              type="text"
              className="border-[2px] outline-none focus:border-pink-200 rounded-md border-gray-100 px-2 py-1"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-between items-center w-full my-2">
            <label className="text-base text-gray-800">New Password</label>
            <input
              type="password"
              className="border-[2px] outline-none focus:border-pink-200 rounded-md border-gray-100 px-2 py-1"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="my-4 bg-pink-200 w-96 px-2 py-2 rounded-md text-pink-500 transition-all duration-500 hover:bg-pink-500 hover:text-white "
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
