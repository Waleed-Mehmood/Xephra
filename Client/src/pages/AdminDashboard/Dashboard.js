import React, { useState } from "react";
import Header from "../../components/AdminDashobard/Header";
import { menuItems } from "../../components/AdminDashobard/AdminMenus";
import PostedEvents from "../../components/AdminDashobard/PostedEvents";
import NewEvents from "../../components/AdminDashobard/NewEvents";
import UserRanking from "../../components/AdminDashobard/UserRanking";
import RankingApproval from "../../components/AdminDashobard/RankingApproval";
import Dashboardadmin from "../../components/AdminDashobard/Dashboardadmin";
import logo from "../../assets/logo.png";

// Sidebar component
function Sidebar({ onMenuClick, dark }) {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ms-5">
        <img src={logo} className="h-10 w-20 " alt="Flowbite Logo" />
      </a>
      <ul className="mt-6">
        {menuItems.map((item, index) => (
          <li
            key={item.key}
            className="relative px-6 py-3 cursor-pointer bg-transparent hover:bg-[#a39c879c]"
            onClick={() => onMenuClick(item.key)}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1
              }`}
              aria-hidden="true"
            />
            <a className={`inline-flex items-center w-full text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}  transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100`}>
              {item.icon}
              <span className="ml-4">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="px-6 my-6">
        <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
          Chat System
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
      } ${dark ? "bg-gray-800" : "bg-white"} md:hidden`}
    >
      <Sidebar dark={dark} onMenuClick={(key) => { 
        onMenuClick(key); 
        toggleSideMenu(); // Close sidebar after clicking an item
      }} />
    </div>
  );
}

// Main Dashboard component
function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const toggleTheme = () => setDark(!dark);

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboardadmin />;
      case "postedEvents":
        return <PostedEvents setActiveMenu={setActiveMenu} />;
      case "newEvents":
        return <NewEvents />;
      case "userRanking":
        return <UserRanking />;
      case "rankingApproval":
        return <RankingApproval />;
      default:
        return <Dashboardadmin />;
    }
  };

  return (
    <div
      className={`flex h-full ${dark ? "bg-[#b7ab95]" : "bg-gray-50"} ${
        isSideMenuOpen ? "overflow-hidden" : ""
      }`}
    >
      {/* Sidebar for larger screens */}
      <aside
        className={`z-20 w-64 overflow-y-auto ${
          dark ? "bg-[#5c2d33]" : "bg-white"
        } hidden md:block flex-shrink-0`}
      >
        <Sidebar
          dark={dark}
          onMenuClick={setActiveMenu}
        />
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
      <div className="flex flex-col flex-1 w-full">
        <Header
          dark={dark}
          toggleSideMenu={toggleSideMenu}
          toggleTheme={toggleTheme}
        />

        <main className="flex-1 p-6 min-h-screen">{renderContent()}</main>
      </div>
    </div>
  );
}

export default Dashboard;