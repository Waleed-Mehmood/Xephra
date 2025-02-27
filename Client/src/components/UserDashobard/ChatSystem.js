import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/features/userSlice";
import { getUserChatGroups, setActiveChat, fetchMessages } from "../../redux/features/ChatsSlice";
import { IoMoonSharp } from "react-icons/io5";
import { ImBrightnessContrast } from "react-icons/im";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/xephra logo-01.png";
import { CiSearch } from "react-icons/ci";
import { TiAttachment } from "react-icons/ti";

const ChatSystem = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { chatGroups, loading, activeChat, messages, hasMore } = useSelector((state) => state.chatGroups);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.UserId;
  const navigate = useNavigate();
  console.log("messages", messages);

  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("settings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : { dark: false, isSideMenuOpen: false };
  });
  const sideMenuRef = useRef(null);
  const socket = useRef(null);

  const toggleSideMenu = () => {
    const newSettings = {
      ...settings,
      isSideMenuOpen: !settings.isSideMenuOpen,
    };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  const toggleTheme = () => {
    const newSettings = { ...settings, dark: !settings.dark };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  // Set active chat
  const handleSelectChat = (chatGroup) => {
    
    dispatch(setActiveChat(chatGroup));
    console.log(chatGroup._id) ;
    dispatch(fetchMessages(chatGroup._id)); 
    
    socket.current.emit("joinChat", chatGroup._id);
  };

  // Filter chat groups based on search term
  const filteredChatGroups = chatGroups.filter((group) =>
    group.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Socket setup and message handling
  useEffect(() => {
    socket.current = io("http://localhost:5000"); // Replace with your backend URL

    // socket.current.on("receiveMessage", (data) => {
    //   dispatch(addMessage(data)); // Dispatch to Redux when receiving a message
    // });

    return () => {
      socket.current.disconnect();
    };
  }, [dispatch]);

  // Fetch profile and chat groups on mount
  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getUserChatGroups(userId));
    }
  }, [dispatch, userId]);

  // Close side menu when clicking outside
  useEffect(() => {
    const closeSideMenu = (e) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(e.target)) {
        setSettings((prev) => ({ ...prev, isSideMenuOpen: false }));
      }
    };
    document.addEventListener("mousedown", closeSideMenu);
    return () => document.removeEventListener("mousedown", closeSideMenu);
  }, []);

  // Send message handler
  const sendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage = {
        senderId: userId,
        text: message,
        time: new Date().toLocaleTimeString(),
      };

      // Emit message to the backend
      socket.current.emit("sendMessage", {
        chatGroupId: activeChat._id,
        message: newMessage,
      });

      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <div
          className={`absolute inset-0 ${
            settings.dark
              ? "bg-[url('https://images.ctfassets.net/w5r1fvmogo3f/4UqXpuijA7dp2mMXP2vDtH/ccebdeee7f7853f2b4de8637d31c92cc/ghost_2f2b6b7fdfe84fc4b4778313255fb676.png')]"
              : "bg-[url('https://wallpapercat.com/w/full/f/b/6/1501928-3840x2160-desktop-4k-action-adventure-game-background.jpg')]"
          } bg-cover bg-center`}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className={`flex justify-between items-center mb-0 m-0 p-4`}>
          <div className="flex items-center space-x-2">
            {/* Logo - Always visible on large screens */}
            <img
              src={logo}
              className="h-13 w-44 md:block hidden"
              alt="Flowbite Logo"
            />

            {/* Menu Button - Only visible on small screens */}
            <button
              onClick={toggleSideMenu}
              className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-white text-white relative"
              aria-label="Menu"
            >
              <BsFillMenuButtonWideFill className="text-white" />{" "}
              <span className="pl-0 text-xl font-bold absolute -bottom-0 left-[23px]">
                Chats
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle Dark Mode"
            >
              {settings?.dark ? (
                <ImBrightnessContrast className="text-[#C9B796]" />
              ) : (
                <IoMoonSharp className="text-[#C9B796]" />
              )}
            </button>

            {/* Notifications Icon */}
            <button
              className="p-2 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Notifications"
            >
              <FiBell className="text-[#C9B796]" />
            </button>
            <span className="text-white font-bold">
              {userData?.name || "username"}
            </span>
            <img
              src={
                profile?.profileImage
                  ? `http://localhost:5000/${profile?.profileImage}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 space-x-4">
          {/* Sidebar */}
          <div
            ref={sideMenuRef}
            className={`fixed top-0 left-0 h-full w-72 z-50 transition-transform duration-300 ease-in-out
    ${settings.isSideMenuOpen ? "translate-x-0" : "-translate-x-full"} 
    ${settings.dark ? "bg-[#21201e52]" : "bg-[#000000]"}
    md:relative md:translate-x-0 md:block md:ml-3 ml-0`}
          >
            {/* Search */}
            <div className="relative w-[90%] m-4">
              <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-50" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 bg-[#C9B79670] text-white px-4 py-2 rounded-full focus:outline-2 focus:outline-white backdrop-blur-md`}
              />
            </div>

            {/* Groups */}
            <div className="text-white text-2xl font-bold mb-3 ml-5">
              Groups
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {loading ? (
                <div className="text-white text-center p-4">Loading chat groups...</div>
              ) : filteredChatGroups.length === 0 ? (
                <div className="text-white text-center p-4">No chat groups found</div>
              ) : (
                filteredChatGroups.map((group) => (
                  <div
                    key={group._id}
                    onClick={() => handleSelectChat(group)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer backdrop-blur-md hover:bg-neutral-700/50 ${
                      activeChat?._id === group._id ? "bg-neutral-700/70" : ""
                    }`}
                  >
                    <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">{group.name?.[0] || "G"}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#D19F43] font-medium">{group.name}</h3>
                      <p className="text-neutral-400 text-sm truncate">
                        {group.lastMessage?.text || "No messages yet"}
                      </p>
                    </div>
                    <span className="text-neutral-500 text-xs">
                      {group.lastMessage?.time || ""}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Dashboard Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
              <Link to={"/userdashboard"} className="w-full max-w-[100%]">
                <button className="w-full bg-[#69363F] p-7 border-[#C9B796] border-[1px] text-[#C9B796] py-2 rounded-lg hover:bg-neutral-700/50 transition-colors backdrop-blur-m">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`flex-1 ml-32 pr-4 ${
              settings?.dark
                ? "bg-[#69363F17] bg-opacity-[.06]"
                : "bg-[##69363F17] bg-opacity-[0.5]"
            } shadow-2xl shadow-gray-950 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm rounded-lg overflow-hidden`}
          >
            {activeChat ? (
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div
                  className="p-4 rounded-t-lg"
                  style={{
                    background:
                      "linear-gradient(92.98deg, #D19F43 12%, #B2945C 31.11%, #C9B796 45.88%, #B39867 64.16%, #D5AD66 81.74%, #D19F43 92.26%)",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">
                        {activeChat.name?.[0] || "G"}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-[#331A1F] text-3xl drop-shadow-lg font-bold">
                        {activeChat.name}
                      </h2>
                      <p className="text-[#331A1F] drop-shadow-lg text-lg font-semibold">
                        {activeChat.users?.length || 0} Members
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.senderId === userId ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-md p-3 rounded-lg ${
                          msg.senderId === userId ? "bg-[#D4AD66]" : "bg-[#C9B796]"
                        }`}
                      >
                        <p className="text-[#69363F] text-sm font-semibold mb-1">
                          {msg.senderId === userId ? "You" : msg.sender?.name || "User"}
                        </p>
                        <p className="text-[#1b1b1b]">{msg.text}</p>
                        <p className="text-[#000000] text-xs mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4">
                  <div className="flex items-center space-x-2 relative">
                    <TiAttachment className="text-white absolute left-4 text-2xl" />
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-[#333333D4] text-white px-4 pl-9 py-3 rounded-full focus:outline-none"
                    />

                    <button
                      onClick={sendMessage}
                      className="bg-[#D19F43] p-3 rounded-full"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <img
                    src={logo}
                    alt="XEPHRA"
                    className="mx-auto mb-4 w-1/3 h-auto"
                  />
                  <h2
                    className="text-4xl font-bold mb-2"
                    style={{
                      background:
                        "linear-gradient(90deg, #D19F43 4.4%, #B2945C 24.9%, #C9B796 42.9%, #B39867 55.9%, #D5AD66 89%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Select a chat to start messaging
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;