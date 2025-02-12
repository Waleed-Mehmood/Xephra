import React, { useState, useEffect } from "react";
import Header from "../../components/AdminDashobard/Header";
import { menuItems } from "../../components/AdminDashobard/AdminMenus";
import PostedEvents from "../../components/AdminDashobard/PostedEvents";
import NewEvents from "../../components/AdminDashobard/NewEvents";
import RankingApproval from "../../components/AdminDashobard/RankingApproval";
import Dashboardadmin from "../../components/AdminDashobard/Dashboardadmin";
import logo from "../../assets/logo.png";
import AdminProfile from "../../components/AdminDashobard/AdminProfile";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../redux/features/profileSlice";
import CompletedEvents from "../../components/AdminDashobard/CompletedEvents";
import RankingBoard from "../../components/AdminDashobard/RankingBoard";
// Sidebar component
function Sidebar({ onMenuClick, dark }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutSubmit = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="flex items-center space-x-3 rtl:space-x-reverse ms-5">
        <img src={logo} className="h-14 w-22 " alt="Flowbite Logo" />
      </a>
      <ul className="mt-6">
        {menuItems.map((item, index) => (
          <li
            key={item.key}
            className="relative px-6 py-3 cursor-pointer bg-transparent hover:bg-[#854951] text-[#D4AD66] hover:text-white"
            onClick={() => onMenuClick(item.key)}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1
              }`}
              aria-hidden="true"
            />
            <a
              className={`inline-flex items-center w-full text-sm font-semibold ${
                dark ? "" : "text-white"
              }  transition-colors duration-150 dark:hover:text-gray-200 dark:text-gray-100`}
            >
              {item.icon}
              <span className="ml-4">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="px-6 my-6">
        <button
          className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-[#C9B796] transition-colors duration-150 border-2 border-[#C9B796] rounded-lg focus:outline-none focus:shadow-outline-purple ${
            dark
              ? " active:bg-[#A15D66]"
              : "bg-[#854951] hover:bg-[#A15D66] active:bg-[#8b796b]"
          }`}
        >
          Chat System
          <span className="ml-2" aria-hidden="true"></span>
        </button>
      </div>
      <div className="px-6 my-6">
        <button
          onClick={logoutSubmit}
          className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-[#C9B796] transition-colors duration-150 border-2 border-[#C9B796] rounded-lg focus:outline-none focus:shadow-outline-purple ${
            dark
              ? "bg-[#854951] active:bg-[#A15D66]"
              : "bg-[#854951] hover:bg-[#A15D66] active:bg-[#8b796b]"
          }`}
        >
          <TbLogout2
            className="ms-2"
            style={{ fontSize: 18, marginRight: 4 }}
          />
          Log out
          <span className="ml-2" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}

// Mobile Sidebar component
function MobileSidebar({ dark, onMenuClick, toggleSideMenu, isSideMenuOpen }) {
  return (
    <div
      className={`fixed inset-y-0 z-20 w-64 mt-16 overflow-y-auto transform transition-transform ${
        isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
      } ${dark ? "bg-[#292622] bg-opacity-90" : "bg-[#232122]"} md:hidden`}
    >
      <Sidebar
        dark={dark}
        onMenuClick={(key) => {
          onMenuClick(key);
          toggleSideMenu(); // Close sidebar after clicking an item
        }}
      />
    </div>
  );
}

// Main Dashboard component
function Dashboard() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.UserId;
  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId)); // Fetch the profile if userId exists
    }
  }, [dispatch, userId]);

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const toggleTheme = () => setDark(!dark);

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboardadmin setActiveMenu={setActiveMenu} dark={dark} />;
      case "postedEvents":
        return <PostedEvents setActiveMenu={setActiveMenu} dark={dark} />;
      case "newEvents":
        return <NewEvents setActiveMenu={setActiveMenu} dark={dark} />;
      case "rankingBoard":
        return <RankingBoard dark={dark} />;
      case "CompletedEvents":
        return <CompletedEvents dark={dark} />;
      case "rankingApproval":
        return <RankingApproval dark={dark} />;
      case "adminProfile":
        return <AdminProfile dark={dark} profile={profile} />;
      default:
        return <Dashboardadmin setActiveMenu={setActiveMenu} dark={dark} />;
    }
  };

  return (
    <div
    style={{ backgroundImage: "url('https://4kwallpapers.com/images/wallpapers/arthur-morgan-red-dead-redemption-2-rockstar-games-2880x1800-9051.jpg')" }}
    className={`flex h-full bg-opacity-0 bg-cover bg-fixed relative 
      ${dark ? "bg-[#b7ab95]" : "bg-[#7C736B]"} 
      ${isSideMenuOpen ? "overflow-hidden" : ""}`}
  >
    <div className="absolute inset-x-0 bottom-0 h-full bg-[linear-gradient(180deg,rgba(105,54,63,0)_-11.96%,#69363F_43.44%,#69363F_88.04%)] z-10 pointer-events-none opacity-75"></div>
    <div className="absolute inset-0 bg-cover bg-center backdrop-blur-sm opacity-10 z-0"></div>

  
      {/* Sidebar for larger screens */}
      <aside
        className={`z-20 w-64 overflow-y-auto ${
          dark ? "bg-[#292622] bg-opacity-85" : "bg-[#232122]"
        } hidden md:block flex-shrink-0`}
      >
        <Sidebar dark={dark} onMenuClick={setActiveMenu} />
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isSideMenuOpen && (
        <div
          onClick={toggleSideMenu}
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <MobileSidebar
        dark={dark}
        isSideMenuOpen={isSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
        onMenuClick={setActiveMenu}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full z-10">
        <Header
          dark={dark}
          toggleSideMenu={toggleSideMenu}
          toggleTheme={toggleTheme}
          onMenuClick={setActiveMenu}
          profile={profile}
        />

        <main className="flex-1 p-0 md:p-6 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
