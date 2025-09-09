import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import bot2 from "/page-photos/robot-2.png";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";
import Button from "../components/shared/Button";

import { useAuth } from "../context/context";

// Axios defaults
axios.defaults.baseURL = "https://chatbot-mern-env.up.railway.app/api";
axios.defaults.withCredentials = true; // Enable sending credentials

const Login = () => {
  const [buttonName, setButtonName] = useState("Login");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setButtonName("Loading ...");
      toast.loading("Signing in ..", { id: "login" });
      await auth?.login(email, password);
      setButtonName("Login");
      toast.success("Signed in successfully", { id: "login" });
      navigate("/chat");
    } catch (error) {
      setButtonName("Login");
      toast.error(error.message, { id: "login" });
      console.log(error, "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 bg-gray-50 space-y-6 md:space-y-0 md:space-x-12">
      <div className="w-full md:w-1/2 flex justify-center">
        <PageImage
          src={bot2}
          alt="login chat bot image"
          className="w-72 h-auto md:w-96"
        />
      </div>

      <div className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Log Into Your Account
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <FormLabel
            htmlFor="email"
            id="email"
            name="email"
            type="text"
            required
            maxLength={20}
            minLength={5}
            label="E-Mail"
            inputPH="name@example.com"
            className="w-full"
          />

          <FormLabel
            htmlFor="password"
            id="password"
            name="password"
            type="password"
            required
            maxLength={16}
            minLength={8}
            label="Password"
            inputPH="Password"
            className="w-full"
          />

          <Button
            buttonLabel={buttonName}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          />
        </form>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create One
          </Link>{" "}
          now
        </p>
      </div>
    </div>
  );
};

export default Login;
