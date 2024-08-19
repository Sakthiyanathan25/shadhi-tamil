import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  baseurl,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/services";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(null);
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    address: "",
    dob: "",
    confirmPassword: "",
    profileDp: "",
    caste: "",
    height: "",
    weight: "",
    qualification: "",
    siblings: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    job: "",
    salary: "",
    religion: "",
    cigOrAlcohol: "",
    
  });

  const formDataLength = Object.keys(formData).length;
  // console.log("formData Length", formDataLength);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedUser = jwtDecode(storedToken);
      getUser(decodedUser);
    }
  }, []);

  const getUser = async (token) => {
    const response = await getRequest(`${baseurl}/users/${token.id}`);
    if (response.error) {
      return setError(response.message);
    }
    const dataProperties = Object.entries(response).filter(
      ([key, value]) => key !== "createdAt"
    ).length; // Exclude only createdAt
    // console.log("count", dataProperties);
    setCount(dataProperties);
    setUser(response);
  };

  const updateFormData = useCallback((info) => {
    setFormData(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      if (!formData) {
        setError("Please fill all fields");
        setIsLoading(false);
        return;
      }

      const response = await postRequest(
        `${baseurl}/users/register`,
        JSON.stringify(formData)
      );
      // console.log("register response", response);
      setIsLoading(false);

      if (response.error) {
        setRegisterError(response.message);
        console.log(response.message);
      } else {
        let user = localStorage.setItem("token", response.token);
        setUser(user);
        navigate("/profile");
      }
    },
    [formData]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      if (!formData) {
        setError("Please fill all fields");
        setIsLoading(false);
        return;
      }
      const response = await postRequest(
        `${baseurl}/users/login`,
        JSON.stringify(formData)
      );
      // console.log(response);
      toast("Successfully logged in");
      setIsLoading(false);
      if (response.error) {
        return setLoginError(response.message);
      }
      // console.log(response.token);

      // Store the token in localStorage
      localStorage.setItem("token", response.token);

      // Decode the token to get user information
      const decodedUser = jwtDecode(response.token);

      // Set the user state
      setUser(decodedUser);

      //get user details
      getUser(decodedUser);
      // Navigate to the profile page
      navigate("/profile");
    },
    [formData, navigate]
  );

  const updateUserProfile = useCallback(
    async (e, id) => {
      e.preventDefault();
      console.log(JSON.stringify(formData));
      const response = await putRequest(
        `${baseurl}/users/${id}`,
        JSON.stringify(formData)
      );
      // console.log("response", response.token);
      if (!response.error) {
        setMessage("Successfully updated!");
        toast("Successfully updated!");
        localStorage.setItem("token", response.token);
        navigate("/profile");
      }
    },
    [formData]
  );

  const logoutUser = () => {
    localStorage.removeItem("token");
    toast("You are logout...!");
    setUser(null);
    navigate("/");
  };

  const requestOTP = async (email) => {
    try {
      const response = await axios.post(`${baseurl}/users/request-reset`, {
        email,
      });
      console.log(response.data); // Log response data if needed
      return response.data; // Return response data if necessary
    } catch (error) {
      throw error; // Throw error to be caught in ForgotPassword.jsx
    }
  };

  const resetPassword = async (email, otp, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseurl}/users/reset-password`, {
        email,
        otp,
        password,
      });
      console.log(response.data); // Log response data if needed
      return response.data; // Return response data if necessary
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        formData,
        setFormData,
        formDataLength,
        count,
        isLoading,
        updateFormData,
        error,
        setError,
        loginError,
        registerError,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        requestOTP,
        authError,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
