import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventById,
  fetchEventUsers,
} from "../../redux/features/eventsSlice";
import {
  fetchRegisteredUsersAndRankings,
  assignEventRanking,
} from "../../redux/features/rankingSlice";
import { getUser } from "../../redux/features/profileSlice";
import Modal from "./Modal";
import Loading from "../../utils/Loading/Loading";

const TournamentRanking = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { eventId } = useParams();
  const { event } = useSelector((state) => state.events);
  const { users, loading } = useSelector((state) => state.ranking);
  const [editData, setEditData] = useState(null);
  const [loadAfterSave, setloadAfterSave] = useState(null);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchRegisteredUsersAndRankings(eventId));
    }
  }, [dispatch, eventId, loadAfterSave]);

  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    }
  }, [dispatch, eventId ]);

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

  const handleEdit = (user) => {
    setEditData(user);
    setIsEditModalOpen(true);
  };
  // console.log("edit data", editData)

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (user) => {
    setIsEditModalOpen(false);
    setEditData(null);
    const rankingData = {
      userId: user.userId,
      eventId: eventId,
      newRank: Number(user.rank),
      score: user.score,
    };
    dispatch(assignEventRanking(rankingData));
    setloadAfterSave(!loadAfterSave)
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };

  if (!event) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-2xl md:text-3xl font-bold">Event Not Found</h1>
        <Link
          to="/dashboard"
          className="text-[#69363f] mt-4 block text-sm md:text-base"
        >
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
          {users.length > 0 ? (
            <ul className="divide-y divide-[#393939]">
              {users.map((user, index) => (
                <li
                  key={user.userId}
                  className="flex items-center justify-between p-4 hover:bg-[#2c2c2c] rounded-lg transition"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex flex-row items-center">
                        <h2 className="text-sm md:text-lg font-semibold text-[#b6a99a]">
                          {user.rank !== null ? user?.rank : "no rank"}:
                        </h2>
                        <img
                          src={
                            `${process.env.REACT_APP_BACKEND}/${user?.image}` ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZckmT7vNz82FTBKW6y5ptouwWa3-OURdpaw&s"
                          }
                          alt={user?.fullName || "Unknown"}
                          className="w-8 h-8 mx-1 rounded-full border-2 border-[#69363f]"
                        />

                        <h2 className="text-sm md:text-lg font-semibold text-[#b6a99a]">
                          {user?.name}
                        </h2>
                      </div>

                      <p className="text-xs md:text-sm text-gray-400">
                        Score: {user?.score}
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
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <span className="text-xs md:text-sm font-medium text-gray-300">
                      #{user?.rank}
                    </span>
                  </div>
                  {/* Modal for Edit User */}
                  {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
                      <div className="bg-[#232122] p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-full overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-bold mb-4 text-white text-center">
                          Edit Player
                        </h2>
                        <form>
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-white">
                              Rank
                            </label>
                            <input
                              type="number"
                              name="rank"
                              value={editData.rank}
                              onChange={handleChange}
                              className="w-full p-2 border-none rounded-md bg-[#393939] text-white"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-white">
                              Score
                            </label>
                            <input
                              type="number"
                              name="score"
                              value={editData.score}
                              onChange={handleChange}
                              className="w-full p-2 border-none rounded-md bg-[#393939] text-white"
                            />
                          </div>

                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => handleSave(editData)}
                              className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={handleCloseModal}
                              className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
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
