import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import UserDashboard from "./pages/UserDashboard/Dashboard";
import Login from "./pages/Login";
import UserProfile from "./components/UserDashobard/UserProfile";
import EventDetail from "./components/UserDashobard/EventDetail";
import Users from "./components/AdminDashobard/Users";
import TournamentRanking from "./components/AdminDashobard/TournamentRanking";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="/forget" element={<ForgetPassword  />} />
        <Route path="/reset" element={<ResetPassword  />} />
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="/userdashboard" element={<UserDashboard  />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/tournamentrankings/:eventId" element={<TournamentRanking />} />
      </Routes>
    </BrowserRouter>
  );
}
