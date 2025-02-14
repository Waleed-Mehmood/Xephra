import { React, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import UserDashboard from "./pages/UserDashboard/Dashboard";
import Login from "./pages/Login";
import UserProfile from "./components/UserDashobard/UserProfile";
import Users from "./components/AdminDashobard/Users";
import TournamentRanking from "./components/AdminDashobard/TournamentRanking";
import EventDetailAdmin from "./components/AdminDashobard/EventDetailAdmin";
import EventDetailUser from "./components/UserDashobard/EventDetailUser";
import TournamentUsersRankingApproval from "./components/AdminDashobard/TournamentUsersRankingApproval";
import AllUserRankingBoard from "./components/AdminDashobard/AllUserRankingBoard";
import EventDetailUserDashboard from "./components/UserDashobard/EventDetailUserDashboard";
import TournamentRankings from "./components/UserDashobard/TournamentRankings";
import AllUserRankingUser from "./components/UserDashobard/AllUserRankingUser";

export default function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <PrivateRoute>
              <UserDashboard />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/eventadmin/:eventId" element={<EventDetailAdmin />} />
        <Route path="/eventuser/:eventId" element={<EventDetailUser />} />
        <Route
          path="/userdashboard/eventdetailuser/:eventId"
          element={<EventDetailUserDashboard />}
        />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/allranking" element={<AllUserRankingBoard />} />
        <Route
          path="/userdashboard/allranking"
          element={<AllUserRankingUser />}
        />
        <Route
          path="/dashboard/tournamentrankings/:eventId"
          element={<TournamentRanking />}
        />
        <Route
          path="/userdashboard/tournamentrankings/:eventId"
          element={<TournamentRankings />}
        />
        <Route
          path="/dashboard/tournamentrankingapproval/:eventId"
          element={<TournamentUsersRankingApproval />}
        />
      </Routes>
    </BrowserRouter>
  );
}
