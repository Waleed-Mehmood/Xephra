import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/AdminDashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<ForgetPassword  />} />
        <Route path="/reset" element={<ResetPassword  />} />
        <Route path="/dashboard" element={<Dashboard  />} />
      </Routes>
    </BrowserRouter>
  );
}
