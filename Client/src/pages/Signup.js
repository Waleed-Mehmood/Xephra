import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bgImage from "../assets/signupbg.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-black text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-sm md:max-w-md p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692] pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-gray-500" />
              ) : (
                <AiFillEye className="text-gray-500" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#e1a257b8] hover:bg-[#b58954b8] rounded font-bold focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="border-t border-gray-700 w-1/4"></span>
          <span className="mx-2 text-sm">OR</span>
          <span className="border-t border-gray-700 w-1/4"></span>
        </div>

        <button className="w-full py-2 px-4 flex items-center justify-center bg-[#9b6d49] hover:bg-[#bf9c74] rounded font-bold focus:outline-none focus:ring-2 focus:ring-[#B7A692]">
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.64 12.204c0-.638-.057-1.252-.164-1.843H12v3.492h6.64c-.287 1.54-1.12 2.84-2.385 3.704v3.084h3.865c2.265-2.085 3.56-5.155 3.56-8.437z" />
            <path d="M12 24c3.24 0 5.96-1.08 7.946-2.92l-3.866-3.084c-1.08.72-2.47 1.145-4.08 1.145-3.14 0-5.8-2.12-6.76-4.97H1.34v3.11C3.32 21.51 7.32 24 12 24z" />
            <path d="M5.24 14.01A7.34 7.34 0 0 1 4.91 12c0-.7.12-1.38.32-2.01V6.89H1.34A11.99 11.99 0 0 0 0 12c0 1.88.44 3.66 1.23 5.11l3.99-3.1z" />
            <path d="M12 4.8c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.96 1.28 15.24 0 12 0 7.32 0 3.32 2.49 1.34 6.89l3.91 3.11C6.2 7.92 8.86 4.8 12 4.8z" />
          </svg>
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#ef964e] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
