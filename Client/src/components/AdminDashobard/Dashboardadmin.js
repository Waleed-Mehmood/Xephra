import { React, useEffect, useState } from "react";
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
import { getEvents } from "../../redux/features/eventsSlice";
import {
  getAllUsers,
  deleteUser,
  suspendUser,
  getUser
} from "../../redux/features/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from './Modal';

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

const DashboardAdmin = ({ setActiveMenu, dark }) => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { users, profile } = useSelector((state) => state.profile);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(getEvents());
    dispatch(getAllUsers());
  }, []);

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

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };
  const handleSuspend = (userId) => {
    dispatch(suspendUser(userId));
  };
 const handleProfileView = (userId) => {
       dispatch(getUser(userId));
       setIsModalOpen(true);
     };
     const closeModal = () => {
       setIsModalOpen(false);
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
       
      >
        <div className=" w-full absolute inset-0  bg-opacity-50 text-left text-white mt-20 ">
          <h1 className="drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#e5b967] via-[#d1a759] to-[#f9f9f9] bg-clip-text text-transparent  w-1/2 text-5xl lg:text-[3.6rem] md:text-6xl sm:text-6xl sm:w-full font-bold">
            Welcome Admin!
          </h1>
          <h2 className="drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-l from-[#8a6e3b] via-[#d1a759] to-[#ffecb2] bg-clip-text text-transparent mt-7 lg:text-2xl md:text-2xl md:text-wrap sm:text-xl">
            Manage and Monitor all the Gaming Events and Rankings Efficiently.
          </h2>
        </div>
      </div>


      {/* Analytics & Stats Dashboard Section */}
      <div
        className={`bg-[#69363f18] bg-opacity-[.02] p-4 rounded shadow-2xl shadow-gray-950  mt-8  backdrop-blur-sm`}
      >
        <h2
          className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${
            dark ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent" : "text-white"
          }`}
        >
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
        <div
          className={`col-span-12 lg:col-span-9 backdrop-blur-sm bg-[#69363f18] bg-opacity-[.02] p-4 rounded shadow-2xl shadow-gray-950 `}
        >
          <h2
            className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${
              dark ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent" : "text-white"
            } `}
          >
            Posted Events
          </h2>
          <Slider {...settings}>
            {events.map((event) => (
              <Link
                to={`/eventadmin/${event?._id}`}
                key={event._id}
                className="flex-none p-1 flex flex-col h-full  min-h-[200px]"
              >
               <div className="relative rounded-lg shadow flex flex-col h-full min-h-full">
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/${event.image}`}
                    alt={event.title}
                    className="h-60 w-full object-cover rounded"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h3 className="text-white text-lg font-bold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
                    {event.title}
                  </h3>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
          <h2
            className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-6 ${
              dark ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent" : "text-white"
            } `}
          >
            Completed Events
          </h2>
          <Slider {...settings}>
            {events.map((event) => (
              <Link
                to={`/eventadmin/${event?._id}`}
                key={event._id}
                className="flex-none p-1 flex flex-col h-full  min-h-[200px]"
              >
                <div className="relative rounded-lg shadow flex flex-col h-full min-h-full">
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/${event.image}`}
                    alt={event.title}
                    className="h-60 w-full object-cover rounded"
                  />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                 <h3 className="text-white text-lg font-bold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
                    {event.title}
                  </h3>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>

        {/* Rankings Section */}
        <div
          className={`col-span-12 lg:col-span-3 p-4 rounded shadow  ${
            dark ? "bg-[#292622e3]" : "bg-[#232122]"
          } `}
        >
          <h2
            className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${
              dark ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent" : "text-white"
            } `}
          >
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
                  <p
                    className={`font-bold lg:text-lg sm:text-base ${
                      dark ? "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent" : "text-white"
                    } `}
                  >
                    {user.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p
                      className={`text-sm ${
                        dark ? "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent" : "text-[#D3D3D3]"
                      } `}
                    >
                      Rank: {user.rank}
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className={`h-2 rounded ${
                          dark ? "bg-[#A15D66]" : "bg-[#A15D66]"
                        } `}
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
            className={`text-white font-semibold py-2 px-4 rounded mt-4 block text-center ${
              dark
                ? "bg-[#4f463f] hover:bg-[#8b796b]"
                : "bg-[#854951] hover:bg-[#A15D66]"
            }  `}
          >
            See All
          </Link>
        </div>
      </div>

      {/* User Management Section */}
      <div
        className={`mt-8 backdrop-blur-sm bg-[#69363f18] bg-opacity-[.02] p-4 rounded shadow-2xl shadow-gray-950 `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`lg:text-2xl md:text-xl sm:text-lg font-bold ${
              dark ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent" : "text-white"
            }`}
          >
            Manage Users
          </h2>
          <Link
            to="/dashboard/users"
            className={`hover:underline text-sm ${
              dark ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-[19px]" : "text-white"
            }`}
          >
            See All
          </Link>
        </div>
        <div className="overflow-x-auto sm:overflow-x-hidden">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Created At</th>
                <th className="p-2 text-left">Profile</th>
                <th className="p-2 text-left">Suspension Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 3).map((user) => (
                <tr key={user?._id}>
                  <td className="p-2">{user?.name}</td>
                  <td className="p-2">{user?.email}</td>
                  <td className="p-2">{user?.role}</td>
                  <td className="p-2">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <button
                    onClick={()=>handleProfileView(user?.userId)}
                      className="bg-[#854951] hover:bg-[#A15D66] text-white py-1 px-4 rounded mr-2"
                     
                    >
                     View Profile
                    </button>
                   
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-[#854951] hover:bg-[#A15D66] text-white py-1 px-4 rounded mr-2"
                      onClick={() => handleSuspend(user?.userId)}
                    >
                      {user.isSuspended ? "Unsuspend" : "Suspend"}
                    </button>
                  
                  </td>
                  <td className="p-2">
                    
                    <button
                      className="bg-[#302B27] text-white py-1 px-4 rounded"
                      onClick={() => handleDelete(user?.userId)}
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
      <Modal isOpen={isModalOpen} onClose={closeModal} profile={profile} />

    </div>
  );
};

export default DashboardAdmin;
