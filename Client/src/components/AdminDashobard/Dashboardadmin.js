import React from "react";
import Slider from "react-slick";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAdmin = ({ setActiveMenu,dark }) => {
  const rankings = [
    {
      id: 1,
      name: "Player 1",
      rank: 90,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQklBSe2monSAS1cBms7tDarsAdheQa0J-9Ow&s",
    },
    {
      id: 2,
      name: "Player 2",
      rank: 80,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFH9aDM4CsWt5f1we4gCSHvQQzDKcs924yZ8IhkCVldVQI3Lt6vAWDDOlerW3SswqIBrI&usqp=CAU",
    },
    {
      id: 3,
      name: "Player 3",
      rank: 70,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXcLBAnNaG9u_juSWT6vyOeW1Q3N3xh0QWA&s",
    },
    {
      id: 4,
      name: "Player 4",
      rank: 65,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/005/076/598/small/cool-boy-mask-mascot-esports-logo-illustration-free-vector.jpg",
    },
    {
      id: 5,
      name: "Player 5",
      rank: 60,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-o_mCwda3jaLH9vAcEJFNm7HV0dZTuFifMA&s",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Fortnite Battle Royale Championship",
      image: "https://images8.alphacoders.com/877/thumb-1920-877849.jpg",
    },
    {
      id: 2,
      title: "Call of Duty: Warzone Tournament Finals",
      image: "https://i.ytimg.com/vi/TidXGyzxT8c/maxresdefault.jpg",
    },
    {
      id: 3,
      title: "Apex Legends Championship Series",
      image:
        "https://ineqe.com/wp-content/uploads/2022/05/apex-media-news-saviors-patch-keyart.jpg.adapt_.crop16x9.431p.jpg",
    },
    {
      id: 4,
      title: "PUBG Mobile Global Championship 2024",
      image:
        "https://i.haberglobal.com.tr/rcman/Cw1230h692q95gm/storage/files/images/2024/08/13/pubg-nedir-pubg-kapaniyor-mu-robloxtan-sonra-sira-pubg-mobileda-mi-omv6.jpg",
    },
  ];

  const RegisteredEvents = [
    {
      id: 1,
      title: "League of Legends World Cup",
      image:
        "https://cdn.wccftech.com/wp-content/uploads/2019/05/LoL-1030x579.jpg",
    },
    {
      id: 2,
      title: "Minecraft Building Championship",
      image:
        "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a",
    },
    {
      id: 3,
      title: "Apex Legends Championship Series",
      image:
        "https://ineqe.com/wp-content/uploads/2022/05/apex-media-news-saviors-patch-keyart.jpg.adapt_.crop16x9.431p.jpg",
    },
    {
      id: 4,
      title: "PUBG Mobile Global Championship 2024",
      image:
        "https://i.haberglobal.com.tr/rcman/Cw1230h692q95gm/storage/files/images/2024/08/13/pubg-nedir-pubg-kapaniyor-mu-robloxtan-sonra-sira-pubg-mobileda-mi-omv6.jpg",
    },
  ];

  const users = [
    { id: 1, name: "User 1", email: "user1@example.com", role: "User" },
    { id: 2, name: "User 2", email: "user2@example.com", role: "Admin" },
    { id: 3, name: "User 3", email: "user3@example.com", role: "User" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const changeMenu = () => {
    setActiveMenu("userRanking");
  };

  const handleAction = (action, userId) => {
    console.log(action, userId);
    // Implement actions such as suspend, delete, promote here
  };

  // Chart data for Analytics & Stats
  const analyticsData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Total Events",
        data: [5, 7, 8, 9, 10, 11],
        borderColor: "#A15D66",
        backgroundColor: "#bfad9f",
        fill: true,
      },
      {
        label: "Active Users",
        data: [50, 55, 60, 65, 70, 75],
        borderColor: "#69363F",
        backgroundColor: "#c39ea5",
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section for Admin */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/teenage-girl-wearing-headset-gaming-home-using-dual-computer-screens-teenage-girl-wearing-headset-gaming-home-using-dual-166580706.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-2xl lg:text-4xl md:text-3xl sm:text-2xl font-bold">
            Welcome, Admin!
          </h1>
          <p className="mt-2 md:text-lg sm:text-base">
            Manage and monitor all the gaming events and rankings efficiently.
          </p>
        </div>
      </div>

      {/* Analytics & Stats Dashboard Section */}
      <div className={`${dark ? "bg-[#69363F]" : "bg-[#232122]"} p-4 mt-8 rounded shadow`}>
        <h2 className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${dark ? "text-[#B7A692]" : "text-white"}`}>
          Analytics & Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">Performance Overview</h3>
            <Line data={analyticsData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">Total Events & Active Users</h3>
            <Line data={analyticsData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* Events Section */}
        <div className={`col-span-12 lg:col-span-9 p-4 rounded shadow ${dark ? "bg-[#69363F]" : "bg-[#232122]"} `}>
          <h2 className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${dark ? "text-[#B7A692]" : "text-white"} `}>
            Posted Events
          </h2>
          <Slider {...settings}>
            {events.map((event) => (
              <div
                key={event.id}
                className="flex-none bg-white rounded shadow p-4 flex flex-col h-full min-h-[200px]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-32 w-full object-cover rounded"
                />
                <h3 className="lg:text-lg sm:text-base font-bold mt-2 flex-grow text-center">
                  {event.title}
                </h3>
              </div>
            ))}
          </Slider>

          <h2 className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 mt-8 ${dark ? "text-[#B7A692]" : "text-white"} `}>
            Registered Events
          </h2>
          <Slider {...settings}>
            {RegisteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex-none bg-white rounded shadow p-4 flex flex-col h-full min-h-[200px]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-32 w-full object-cover rounded"
                />
                <h3 className="lg:text-lg sm:text-base font-bold mt-2 flex-grow text-center">
                  {event.title}
                </h3>
              </div>
            ))}
          </Slider>
        </div>


        {/* Rankings Section */}
        <div className={`col-span-12 lg:col-span-3 p-4 rounded shadow  ${dark ? "bg-[#69363F]" : "bg-[#232122]"} `}>
          <h2 className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${dark ? "text-[#B7A692]" : "text-white"} `}>
            User Rankings
          </h2>
          <ul>
            {rankings.slice(0, 5).map((user) => (
              <li key={user.id} className="flex items-center mb-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <p className={`font-bold lg:text-lg sm:text-base ${dark ? "text-[#B7A692]" : "text-white"} `}>
                    {user.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className={`text-sm ${dark ? "text-[#B9AC9B]" : "text-[#D3D3D3]"} `}>Rank: {user.rank}</p>
                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className={`h-2 rounded ${dark ? "bg-[#A15D66]" : "bg-[#A15D66]"} `}
                        style={{ width: `${user.rank}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            onClick={changeMenu}
            className={`text-white font-semibold py-2 px-4 rounded mt-4 block text-center ${dark ? "bg-[#302B27] hover:bg-[#8b796b]" : "bg-[#854951] hover:bg-[#A15D66]"}  `}
          >
            See All
          </Link>
        </div>
      </div>

      {/* User Management Section */}
      <div className={`p-4 mt-8 rounded shadow ${dark ? "bg-[#69363F]" : "bg-[#232122]"} `}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`lg:text-2xl md:text-xl sm:text-lg font-bold ${dark ? "text-[#B7A692]" : "text-white"}`}>
            Manage Users
          </h2>
          <a href="/users" className={`hover:underline text-sm ${dark ? "text-[#B7A692]" : "text-white"}`}>
            See All
          </a>
        </div>
        <div className="overflow-x-auto sm:overflow-x-hidden">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">
                    <button
                      className="bg-[#854951] hover:bg-[#A15D66] text-white py-1 px-4 rounded mr-2"
                      onClick={() => handleAction("suspend", user.id)}
                    >
                      Suspend
                    </button>
                    <button
                      className="bg-[#302B27] text-white py-1 px-4 rounded"
                      onClick={() => handleAction("delete", user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardAdmin;
