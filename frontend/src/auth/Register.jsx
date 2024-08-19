import React, { useContext, useState } from "react";
import bg from "../assets/form-bg.jpg";
import curved from "../assets/home/curved.svg";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const { formData, isLoading, registerError, registerUser, updateFormData } =
    useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailErr = "";
    let passwordErr = "";
    let nameErr = "";
    let phoneErr = "";

    if (!formData.email) {
      emailErr = "Email is required";
    }
    if (!formData.password) {
      passwordErr = "Password is required";
    }
    if (!formData.name) {
      nameErr = "Username is required";
    } else if (/\d/.test(formData.name)) {
      nameErr = "Name doesn't contain numbers";
    }
    if (!formData.phone) {
      phoneErr = "Phone number is required";
    } else if (/[a-zA-Z]/.test(formData.phone)) {
      phoneErr = "Phone number doesn't contain letters";
    }

    if (emailErr || passwordErr || nameErr || phoneErr) {
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      setNameError(nameErr);
      setPhoneError(phoneErr);
      return;
    }

    await registerUser(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(value ? "" : "Email is required");
    } else if (name === "password") {
      setPasswordError(value ? "" : "Password is required");
    } else if (name === "name") {
      if (!value) {
        setNameError("Name is required");
      } else if (/\d/.test(value)) {
        setNameError("Name doesn't contain numbers");
      } else {
        setNameError("");
      }
    } else if (name === "phone") {
      if (!value) {
        setPhoneError("Phone number is required");
      } else if (/[a-zA-Z]/.test(value)) {
        setPhoneError("Phone number doesn't contain letters");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleKeyDown = (e) => {
    const { name, value } = e.target;

    if (e.key === "Backspace") {
      if (name === "email") {
        setEmailError(formData.email ? "" : "Email is required");
      } else if (name === "password") {
        setPasswordError(formData.password ? "" : "Password is required");
      } else if (name === "name") {
        if (!formData.name) {
          setNameError("Name is required");
        } else if (/\d/.test(formData.name)) {
          setNameError("Name doesn't contain numbers");
        } else {
          setNameError("");
        }
      } else if (name === "phone") {
        if (!formData.phone) {
          setPhoneError("Phone number is required");
        } else if (/[a-zA-Z]/.test(formData.phone)) {
          setPhoneError("Phone number doesn't contain letters");
        } else {
          setPhoneError("");
        }
      }
    }
  };

  return (
    <>
      <main
        className="w-full min-h-[120vh] overflow-hidden mt-[-10%] flex items-center justify-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <form
          className="bg-white p-6 px- rounded-lg shadow-lg w-full flex flex-col items-center justify-center max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold text-pink-500 mt-5">
            Welcome to ShaadiTamil.com
          </h1>
          <h3 className="text-xl text-pink-400 mb-4 text-center mt-2">
            Register your account
          </h3>
          {/* need to set floating label later */}
          <div className="w-full">
            <div className="mb-4">
              <input
                type="text"
                placeholder="username"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                autoComplete="off"
              />
              {nameError && (
                <p className="text-red-500 bg-transparent text-left text-xs py-2 ">
                  {nameError}
                </p>
              )}
            </div>
            <div className="flex mb-4 gap-3">
              <div className="w-2/4">
                <input
                  type="text"
                  placeholder="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                  autoComplete="off"
                />
                {phoneError && (
                  <p className="text-red-500 bg-transparent text-left text-xs py-2 ">
                    {phoneError}
                  </p>
                )}
              </div>
              <div className="w-2/4">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                  autoComplete="off"
                />
                {emailError && (
                  <p className="text-red-500 bg-transparent text-left text-xs py-2 ">
                    {emailError}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                autoComplete="off"
              />
              {passwordError && (
                <p className="text-red-500 bg-transparent text-left text-xs py-2 ">
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
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
          {registerError && registerError === "User already exists" ? (
            <p className="text-red-500 bg-transparent text-center py-3">
              {registerError}{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login here
              </Link>
            </p>
          ) : (
            <p className="text-red-500 bg-transparent text-center py-3">
              {registerError}
            </p>
          )}
          <div className="border-b-[1px] border-gray-300 w-[80%] my-3 "></div>
          <div className="my-5">
            <Link to={"/login"}>
              Already have an account?{" "}
              <span
                className="underline cursor-pointer text-blue-400"
              >
                Sign In
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

export default Register;
