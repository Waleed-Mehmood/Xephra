import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const PostedEvents = ({ setActiveMenu }) => {
  const isAdmin = true; // Replace this with actual admin-check logic

  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      title: "Fortnite Battle Royale",
      game: "Fortnite",
      date: "August 5th, 2024",
      time: "6:00 PM",
      description: "Battle in the most intense Fortnite tournament with massive rewards.",
      image: "https://images8.alphacoders.com/877/thumb-1920-877849.jpg",
      prizePool: "$20,000",
    },
    {
      id: 2,
      title: "Call of Duty: Warzone Tournament",
      game: "Call of Duty: Warzone",
      date: "October 15th, 2024",
      time: "8:00 PM",
      description: "Join the action in the epic Warzone tournament with adrenaline-pumping battles.",
      image: "https://i.ytimg.com/vi/TidXGyzxT8c/maxresdefault.jpg",
      prizePool: "$15,000",
    },
    {
      id: 3,
      title: "Apex Legends Championship",
      game: "Apex Legends",
      date: "November 20th, 2024",
      time: "5:30 PM",
      description: "Team up and conquer the arena in this fast-paced Apex Legends tournament.",
      image: "https://ineqe.com/wp-content/uploads/2022/05/apex-media-news-saviors-patch-keyart.jpg.adapt_.crop16x9.431p.jpg",
      prizePool: "$12,000",
    },
    {
      id: 4,
      title: "PUBG Mobile Global Championship",
      game: "PUBG Mobile",
      date: "December 5th, 2024",
      time: "7:00 PM",
      description: "Survive and dominate in the biggest PUBG Mobile tournament.",
      image: "https://i.haberglobal.com.tr/rcman/Cw1230h692q95gm/storage/files/images/2024/08/13/pubg-nedir-pubg-kapaniyor-mu-robloxtan-sonra-sira-pubg-mobileda-mi-omv6.jpg",
      prizePool: "$18,000",
    },
    {
      id: 5,
      title: "League of Legends World Cup",
      game: "League of Legends",
      date: "January 10th, 2025",
      time: "9:00 PM",
      description: "Join the legendary League of Legends World Cup and compete for the ultimate title.",
      image: "https://cdn.wccftech.com/wp-content/uploads/2019/05/LoL-1030x579.jpg",
      prizePool: "$25,000",
    },
    {
      id: 6,
      title: "Minecraft Building Championship",
      game: "Minecraft",
      date: "March 5th, 2025",
      time: "3:00 PM",
      description: "Unleash your creativity in the Minecraft Building Championship and build your way to victory.",
      image: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a",
      prizePool: "$8,000",
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const changeMenu = () => {
    setActiveMenu("newEvents");
  };

  const onDelete = (tournament) => {
    setSelectedTournament(tournament);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setTournaments((prev) => prev.filter((t) => t.id !== selectedTournament.id));
    setShowDeleteModal(false);
    setSelectedTournament(null);
  };

  const onEdit = (tournament) => {
    setSelectedTournament(tournament);
    setShowEditModal(true);
  };

  const saveEdit = (updatedTournament) => {
    setTournaments((prev) =>
      prev.map((t) => (t.id === updatedTournament.id ? updatedTournament : t))
    );
    setShowEditModal(false);
    setSelectedTournament(null);
  };

  const TournamentCard = ({ id, title, game, date, time, description, image, prizePool, onDelete, onEdit }) => {
    return (
      <div className="bg-[#202938] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        <Link to={`/event/${id}`}>
          <img className="w-full h-56 object-cover" src={image} alt={title} />
        </Link>
        <div className="p-4">
          <Link to={`/event/${id}`}>
            <h3 className="text-xl font-bold text-[#b8a896]">{title}</h3>
          </Link>
          <p className="text-[#69363f] font-bold mt-1">{game}</p>
          <p className="text-sm text-gray-400">{date} • {time}</p>
          <p className="text-gray-300 mt-2">{description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-white">{prizePool}</span>
            {isAdmin && (
              <div className="flex space-x-2">
                <button onClick={() => onEdit({ id, title, game, date, time, description, image, prizePool })} className="text-[#b8a896] hover:text-[#8f404f]">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete({ id, title })} className="text-[#b8a896] hover:text-[#8f404f]">
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
    <div className="mx-auto py-16 px-4 bg-[#232122] rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#b6a99a]">POSTED EVENTS</h2>
        {isAdmin && (
          <Link onClick={changeMenu}>
            <button className="flex items-center bg-[#69363f] text-white px-2 sm:px-6 py-2 rounded-md hover:bg-[#8f404f] transition text-sm sm:text-base">
              <FaPlus className="mr-2" /> New Event
            </button>
          </Link>
        )}
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tournaments.map((tournament, index) => (
          <TournamentCard
            key={index}
            {...tournament}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete "{selectedTournament.title}"?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#5C2D33] p-6 rounded-lg shadow-lg w-[90%] max-w-lg overflow-y-scroll sm:overflow-y-auto max-h-[80%] sm:max-h-[none]">
            <h2 className="text-lg font-bold mb-4 text-[#B6A99A]">Edit Tournament</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEdit(selectedTournament);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">Title</label>
                <input
                  type="text"
                  value={selectedTournament.title}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">Game</label>
                <input
                  type="text"
                  value={selectedTournament.game}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({ ...prev, game: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">Date</label>
                <input
                  type="date"
                  value={selectedTournament.date}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">Time</label>
                <input
                  type="time"
                  value={selectedTournament.time}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#B6A99A]">Description</label>
                <textarea
                  value={selectedTournament.description}
                  onChange={(e) =>
                    setSelectedTournament((prev) => ({ ...prev, description: e.target.value }))
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
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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



