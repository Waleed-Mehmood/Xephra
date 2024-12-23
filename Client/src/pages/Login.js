// import React from 'react';
// import bgLoginImage from '../assets/loginbg.webp';

// const Login = () => {
//   return (
//     <div className="h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white"
//     style={{
//           backgroundImage: `url(${bgLoginImage})`
//         }}>
//       <div className="w-full max-w-sm p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <form className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               className="w-full p-3 text-gray-900 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               className="w-full p-3 text-gray-900 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#e1a257b8] hover:bg-[#b58954b8] text-white font-bold py-3 rounded-lg transition-colors"
//           >
//             Login
//           </button>
//         </form>
//         <div className="flex items-center my-4">
//           <div className="border-t border-gray-700 flex-grow"></div>
//           <span className="px-3 text-gray-400 text-sm">OR</span>
//           <div className="border-t border-gray-700 flex-grow"></div>
//         </div>
//         <button
//           className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
//         >
//           <img
//             src="https://www.svgrepo.com/show/355037/google.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />
//           Continue with Google
//         </button>
//         <p className="text-sm text-center text-gray-400 mt-4">
//           Don’t have an account?{' '}
//           <a href="/signup" className="text-[#ef964e] hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React from 'react';
import bgLoginImage from '../assets/loginbg.webp';

const Login = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white"
      style={{
        backgroundImage: `url(${bgLoginImage})`,
      }}
    >
      <div className="w-full max-w-sm p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 text-gray-900 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 text-gray-900 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#e1a257b8] hover:bg-[#b58954b8] text-white font-bold py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="border-t border-gray-700 flex-grow"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="border-t border-gray-700 flex-grow"></div>
        </div>
        <button
          className="w-full bg-white text-gray-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>
        <p className="text-sm text-center text-gray-400 mt-4">
          <a href="/forget" className="text-[#ef964e] hover:underline">
            Forgot Password?
          </a>
        </p>
        <p className="text-sm text-center text-gray-400 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#ef964e] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
