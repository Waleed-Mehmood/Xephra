import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventById,
  fetchEventUsers,
} from "../../redux/features/eventsSlice";
import { getUser } from "../../redux/features/profileSlice";
import Modal from "./Modal";
import Loading from "../../utils/Loading/Loading";

const TournamentRanking = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { eventId } = useParams();
  const { event, participants, loading } = useSelector((state) => state.events);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
      dispatch(fetchEventUsers(eventId));
    }
  }, [dispatch, eventId]);

  if (loading) {
      return <Loading />;
    }

  const handleProfileView = (userId) => {
    dispatch(getUser(userId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!event) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-2xl md:text-3xl font-bold">Event Not Found</h1>
        <Link to="/dashboard" className="text-[#69363f] mt-4 block text-sm md:text-base">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#B7AB95] min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <div className="bg-[#854951] rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
            {event?.title}
          </h1>
          <p className="text-sm md:text-lg text-white text-center">
            Compete for the prize pool of{" "}
            <span className="text-[#B6A99A]">{event?.prizePool}</span>
          </p>
        </div>
        <div className="bg-[#232122] rounded-lg p-6 shadow-lg">
          {participants.length > 0 ? (
            <ul className="divide-y divide-[#393939]">
              {participants.map((user, index) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-[#2c2c2c] rounded-lg transition"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h2 className="text-sm md:text-lg font-semibold text-[#b6a99a]">
                        {index + 1}. {user.name}
                      </h2>
                      <p className="text-xs md:text-sm text-gray-400">
                        Score: 1500
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleProfileView(user?.userId)}
                      className="bg-[#854951] text-white px-3 py-1 text-xs md:text-sm rounded-md hover:bg-[#6a3c42] transition"
                    >
                      View Profile
                    </button>
                    <span className="text-xs md:text-sm font-medium text-gray-300">
                      #{index + 1}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-300 text-lg py-4">
              No participants have joined this event yet.
            </p>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} profile={profile} />
      </div>
    </div>
  );
};

export default TournamentRanking;
