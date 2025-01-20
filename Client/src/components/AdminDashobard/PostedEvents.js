import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { useSelector, useDispatch } from "react-redux";
import { getEvents, deleteEventById } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const PostedEvents = ({ setActiveMenu, dark }) => {
  const dispatch = useDispatch();
  const { loading, error, events, message } = useSelector(
    (state) => state.events
  );
  const isAdmin = true;

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  console.log("events", events);


  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const changeMenu = () => {
    setActiveMenu("newEvents");
  };

  const DeleteEvent = (id)=>{
    dispatch(deleteEventById(id));
  }

 

  const onEdit = (tournament) => {
    setSelectedTournament(tournament);
    setShowEditModal(true);
  };

  const saveEdit = (updatedTournament) => {
    setShowEditModal(false);
    setSelectedTournament(null);
  };
  if (loading) {
    return <Loading />;
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const TournamentCard = ({
    _id,
    title,
    game,
    date,
    time,
    description,
    image,
    prizePool,
    // onDelete,
    onEdit,
  }) => {
    const imageUrl = `http://localhost:5000/${image}`;

    return (
      <div className="bg-[#202938] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        <Link to={`/event/${_id}`}>
          <img
            className="w-full h-56 object-cover"
            src={imageUrl}
            alt={title}
          />
        </Link>
        <div className="p-4">
          <Link to={`/event/${_id}`}>
            <h3 className="text-xl font-bold text-[#b8a896]">{title}</h3>
          </Link>
          <p className="text-[#69363f] font-bold mt-1">{game}</p>
          <p className="text-sm text-gray-400">
            {date} • {time}
          </p>
          <p className="text-gray-300 mt-2">{description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-white">{prizePool}</span>
            {isAdmin && (
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    onEdit({
                      _id,
                      title,
                      game,
                      date,
                      time,
                      description,
                      image,
                      prizePool,
                    })
                  }
                  className="text-[#b8a896] hover:text-[#8f404f]"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={()=>DeleteEvent(_id)}
                  className="text-[#b8a896] hover:text-[#8f404f]"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  

  return (
    <div
      className={`mx-auto py-16 px-4 rounded-lg ${
        dark ? "bg-[#69363F]" : "bg-[#232122]"
      } `}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#b6a99a]">
          POSTED EVENTS
        </h2>
        {isAdmin && (
          <Link onClick={changeMenu}>
            <button
              className={`flex items-center text-white px-2 sm:px-6 py-2 rounded-md transition text-sm sm:text-base ${
                dark
                  ? "bg-[#302B27] hover:bg-[#49413C]"
                  : "bg-[#854951] hover:bg-[#A15D66]"
              } `}
            >
              <FaPlus className="mr-2" /> New Event
            </button>
          </Link>
        )}
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents.length === 0
          ? "No events posted yet"
          : sortedEvents?.map((tournament, index) => (
              <TournamentCard
                key={index}
                {...tournament}
                // onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
      </div>

      {/* {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`p-6 rounded-lg ${
              dark ? "bg-[#69363F]" : "bg-[#232122]"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-white">
              Confirm Deletion
            </h2>
            <p className="text-white">
              Are you sure you want to delete "{selectedTournament.title}"?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete(selectedTournament._id)}
                className={`px-4 py-2 text-white rounded ${
                  dark
                    ? "bg-[#302B27] hover:bg-[#49413C]"
                    : "bg-[#854951] hover:bg-[#A15D66]"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg shadow-lg w-[90%] max-w-lg overflow-y-scroll sm:overflow-y-auto max-h-[80%] sm:max-h-[none] ${
              dark ? "bg-[#69363F]" : "bg-[#232122]"
            } `}
          >
            <h2 className="text-lg font-bold mb-4 text-[#B6A99A]">
              Edit Tournament
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEdit(selectedTournament);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">
                  Title
                </label>
                <input
                  type="text"
                  value={selectedTournament.title}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">
                  Game
                </label>
                <input
                  type="text"
                  value={selectedTournament.game}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({
                      ...prev,
                      game: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedTournament.date}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">
                  Time
                </label>
                <input
                  type="time"
                  value={selectedTournament.time}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">
                  Description
                </label>
                <textarea
                  value={selectedTournament.description}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded ${
                    dark
                      ? "bg-[#302B27] hover:bg-[#49413C]"
                      : "bg-[#854951] hover:bg-[#A15D66]"
                  } `}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedEvents;
