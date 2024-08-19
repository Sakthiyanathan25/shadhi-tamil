import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import bg from "../assets/form-bg.jpg";
import curved from "../assets/home/curved.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { formData, loginError, isLoading, loginUser, updateFormData } =
    useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const buttons = [{ icon: <FcGoogle /> }];

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailErr = "";
    let passwordErr = "";

    if (!formData.email) {
      emailErr = "Email is required";
    }

    if (!formData.password) {
      passwordErr = "Password is required";
    }

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    await loginUser(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(value ? null : "Email is required");
    } else if (name === "password") {
      setPasswordError(value ? null : "Password is required");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.name === "email") {
      setEmailError(formData.email ? null : "Email is required");
    }
    if (e.key === "Backspace" && e.target.name === "password") {
      setPasswordError(formData.password ? null : "Password is required");
    }
  };

  return (
    <>
      <main
        className="w-full min-h-[120vh] overflow-hidden mt-[-10%] flex items-center justify-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <form
          className="bg-white p-6 px-7 rounded-lg shadow-lg w-full flex flex-col items-center justify-center max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold text-pink-500 mt-5">
            Welcome to ShaadiTamil.com
          </h1>
          <h3 className="text-xl text-pink-400 mb-4 text-center mt-2">
            Let's find your partner
          </h3>
          <div className="w-full">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {emailError && (
                <p className="text-red-500 bg-transparent text-center">
                  {emailError}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="your password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {passwordError && (
                <p className="text-red-500 bg-transparent text-center">
                  {passwordError}
                </p>
              )}
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-56 bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300"
          >
            {isLoading ? "Sign in..." : "Sign In"}
          </button>
          {loginError && loginError === "User doesn't exists..." ? (
            <p className="text-red-500 bg-transparent text-center py-3">
              {loginError}{" "}
              <Link to="/register" className="text-blue-500 underline">
                Create new account here
              </Link>
            </p>
          ) : (
            <p className="text-red-500 bg-transparent text-center py-3">
              {loginError}
            </p>
          )}
          <div className="border-b-[1px] border-gray-300 w-[80%] my-3 "></div>
          <div className="flex w-full justify-center items-center gap-4">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className="text-4xl border-[1px] border-gray-300 rounded-md p-2 "
              >
                {btn.icon}
              </button>
            ))}
          </div>

          <div className="my-5">
            <p>
              New to ShaadiTamil?{" "}
              <Link to={"/register"} className="underline cursor-pointer text-blue-400">
                Sign Up
              </Link>{" "}
            </p>
          </div>
          <div className="">
            <Link to={"/forgot-password"} className="text-center">
              <span className="underline cursor-pointer text-blue-400">
                Forgot Password?
              </span>{" "}
            </Link>
          </div>
        </form>
      </main>
      <img
        src={curved}
        className="w-full bg-cover z-10 mt-[-5%] bg-no-repeat -pl-20 hidden lg:block"
      />
    </>
  );
};

export default Login;
