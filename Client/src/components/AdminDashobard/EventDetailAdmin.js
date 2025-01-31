import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../../redux/features/eventsSlice";
import { getUser } from "../../redux/features/profileSlice";
import Loading from "../../utils/Loading/Loading";
import { FiArrowLeft } from "react-icons/fi";  // Importing a back arrow icon from react-icons
import Modal from "./Modal";

const EventDetailAdmin = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { eventId } = useParams();
  const { event, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    }
  }, [dispatch, eventId]);

  const handleProfileView = (userId) => {
        dispatch(getUser(userId));
        setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Dummy users array
  const dummyUsers = [
    { name: "John Doe" , userId: 0 },
    { name: "Jane Smith", userId: 1 },
    { name: "Sam Wilson", userId: 2 },
    { name: "Lucy Brown", userId: 3 },
  ];

  if (!event) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link to="/dashboard" className="text-[#69363f] mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log("error is", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e2a36] to-[#2a3d54] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Button inside Event Details Section */}
        <div className="text-left mb-8">
          <Link
            to="/dashboard"
            className="flex items-center text-[#f1b500] transition-all duration-300 ease-in-out"
          >
            <FiArrowLeft className="mr-2 text-2xl" /> {/* Back arrow icon */}
            Back to Events
          </Link>
        </div>

        {/* Event Details Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          {/* Left Side - Event Details */}
          <div className="lg:w-2/3 space-y-6">
            <h2 className="text-4xl font-bold text-[#f1b500]">Tournament: {event?.title}</h2>
            <p className="text-xl text-[#f0f0f0]">Game : {event?.game}</p>
            <p className="text-lg text-[#f0f0f0] mt-4">Description : {event?.description}</p>
            <p className="text-2xl text-[#f1b500] font-semibold mt-6">
              Prize Pool: {event?.prizePool}
            </p>
            <p className="text-lg text-[#f0f0f0] mt-2">
              Date & Time: {event?.date} • {event?.time}
            </p>

            {/* Rules Section inside Event Details */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-[#f1b500]">Rules</h3>
              <p className="text-lg text-[#e0e0e0] mt-2">{event?.rules}</p>
            </div>
          </div>

          {/* Right Side - Event Image */}
          <div className="lg:w-1/3">
            <img
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              src={`${process.env.REACT_APP_BACKEND}/${event?.image}`}
              alt={event?.title}
            />
          </div>
        </div>

        {/* Participants Section */}
        <div>
          <h2 className="text-4xl font-bold text-[#f1b500] mb-6">Participants</h2>
          <div className="bg-[#36474f] p-8 rounded-lg shadow-lg">
            <p className="text-[#a1a1a1] font-semibold mb-4">
              Total Participants: {dummyUsers.length}
            </p>
            <ul className="space-y-4">
              {dummyUsers.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-[#e0e0e0] text-lg"
                >
                  <span className="font-semibold text-[#f1b500]">
                    {index + 1}. {user.name}
                  </span>
                  <div className="flex items-center">
                    <Link
                      onClick={()=>handleProfileView(user?.userId)}
                      className="bg-[#f1b500] text-[#232122] py-1 px-4 rounded-lg transition-all duration-300"
                    >
                      View Profile
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} profile={dummyUsers} />
    </div>
  );
};

export default EventDetailAdmin;
