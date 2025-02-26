import { React, useState, useEffect } from "react";
import bgLoginImage from "../assets/loginbg.webp";
import { LoginUser } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../utils/Loading/Loading";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loading, error, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData)).then((action) => {
      if (LoginUser.fulfilled.match(action)) {
        if (action?.payload?.user?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/userdashboard");
        }
      }
    });
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };


  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white"
      style={{
        backgroundImage: `url(${bgLoginImage})`,
      }}
    >
      <div className="w-full max-w-sm p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg" style={{ margin: "0 20px" }}>
        <h2 className="text-2xl font-bold text-center mb-6 font-playfair">Login</h2>
        <form className="space-y-4" onSubmit={HandleFormSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full font-montserrat bg-[#e1a257b8] hover:bg-[#b58954b8] text-white font-bold py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error?.error}</p>}
        <div className="flex items-center my-4">
          <div className="border-t border-gray-700 flex-grow"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="border-t border-gray-700 flex-grow"></div>
        </div>
        <button onClick={handleGoogleLogin} className="w-full font-montserrat bg-white text-gray-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
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
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#ef964e] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
