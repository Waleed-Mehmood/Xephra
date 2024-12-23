import React from 'react';
import bgImage from '../assets/signupbg.png';

const Signup = () => {
  return (
    <div className=" h-screen bg-cover bg-center flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-black text-white"
    style={{
      backgroundImage: `url(${bgImage})`
    }}>
      <div className="w-full max-w-sm md:max-w-md p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 bg-[#6e6161]  border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 bg-[#6e6161] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 bg-[#6e6161] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
            />
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

        <button
          className="w-full bg-white text-gray-900 font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-[#ef964e] hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;