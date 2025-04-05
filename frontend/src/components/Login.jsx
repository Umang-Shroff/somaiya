import React from "react";
import SplineModelLogin from "../utils/SplineModelLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const backToWebsite = () => {
    navigate("/");
  };
  console.log("Hi")
  return (
    <div className="flex min-h-screen bg-black/90">
      {/* Left Side - Image & Text */}
      <div className="hidden lg:flex w-1/2  relative">
        <img
          src="/login1.jpg"
          alt="Desert"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="relative z-10 p-10 text-white flex flex-col justify-end h-full">
          <h1 className="text-4xl font-semibold">Capturing Moments,</h1>
          <h1 className="text-4xl font-semibold">Creating Memories</h1>
          <div className="flex mt-4 space-x-2">
            <div className="h-2 w-6 bg-gray-500 rounded"></div>
            <div className="h-2 w-6 bg-gray-300 rounded"></div>
            <div className="h-2 w-6 bg-white rounded"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <button
            onClick={backToWebsite}
            className="absolute cursor-pointer top-4 right-4 bg-white/10 text-white px-4 py-2 rounded-lg text-sm"
          >
            Back to website →
          </button>
          <div className="">
            <SplineModelLogin />
          </div>
          <h2
            className="text-white text-4xl font-bold"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Welcome
          </h2>
          <p className="text-gray-400 mt-2">
            Don't have an account?{" "}
            <a href="/signup" className="text-white">
              Sign Up
            </a>
          </p>

          {/* Model placed above the form */}

          {/* Form Fields */}
          <div className="mt-6">
            {/* <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 bg-white/5 rounded-lg text-white outline-none"
              />
            </div> */}
            <input
              type="text"
              placeholder="Username"
              className="w-full mt-4 p-3 bg-white/5 rounded-lg text-white outline-none"
            />
            <div className="relative mt-4">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 bg-white/5 rounded-lg text-white outline-none pr-10"
              />
              <span className="absolute right-3 top-4 text-gray-400 cursor-pointer">
                👁
              </span>
            </div>
            <div className="mt-4 flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I agree to the{" "}
                <a href="#" className="text-white">
                  Terms & Conditions
                </a>
              </label>
            </div>
            <button className="w-full mt-6 bg-white text-black hover:bg-white/80 duration-300 hover:text-black py-3 rounded-lg text-lg font-bold cursor-pointer">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
