import React, { useState } from "react";

const TournamentUsersRankingApproval = () => {
  const [rankings, setRankings] = useState([
    {
      id: 1,
      rank: 1,
      name: "John Doe",
      score: 1500,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNv4QP8A-KN2oJAaeRyimIkKXz_6_-ARJuA&s",
      status: "Pending",
    },
    {
      id: 2,
      rank: 2,
      name: "Jane Smith",
      score: 1450,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRng1axjCrpjZ-SOsZDP5bpXBFBVudzACgjYA&s",
      status: "Approved",
    },
    {
      id: 3,
      rank: 3,
      name: "Michael Brown",
      score: 1400,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr8CGxbbM3Na23IriekXKwBcYDJfmAPrElgQ&s",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vVhnbTORPZGrSgOwd7WEK4LEwZ8fIoKzgw&s",
      status: "Declined",
    },
    {
      id: 4,
      rank: 4,
      name: "Emily Davis",
      score: 1350,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTodt9s5zDAmvpyoqeKhANe1iTrH-i0w9eRIQ&s",
      status: "Pending",
    },
    {
      id: 5,
      rank: 5,
      name: "Chris Wilson",
      score: 1300,
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqlEuqMoyvMCA_urQfVefbE6Do35XuXwdrdw&s",
      status: "Approved",
    },
  ]);

  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (user) => {
    setEditData(user);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditData({ ...editData, screenshot: imageUrl });
    }
  };

  const handleSave = () => {
    setRankings((prevRankings) =>
      prevRankings.map((user) => (user.id === editData.id ? editData : user))
    );
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  return (
    <div className="bg-[#B7AB95] min-h-screen p-8 flex justify-center">
      <div className="container mx-auto bg-[#232122] p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
          PUBG Rankings
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#2c2c2c] text-white rounded-lg overflow-hidden text-center">
            <thead>
              <tr className="bg-[#393939]">
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Player</th>
                <th className="py-3 px-6">Score</th>
                <th className="py-3 px-6">Screenshot</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#393939] hover:bg-[#3a3a3a] transition"
                >
                  <td className="py-3 px-6">#{user.rank}</td>
                  <td className="py-3 px-6 flex items-center justify-center space-x-4">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-[#69363f]"
                    />
                    <span>{user.name}</span>
                  </td>
                  <td className="py-3 px-6">{user.score}</td>
                  <td className="py-3 px-6">
                    <img
                      src={user.screenshot}
                      alt="screenshot"
                      className="w-12 h-12 rounded mx-auto"
                    />
                  </td>
                  <td className="py-3 px-6 text-sm font-medium text-gray-300">
                    {user.status}
                  </td>
                  <td className="py-3 px-6 space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Decline
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Edit User */}
      {isModalOpen && (
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white">
                  Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-[#393939] text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white">
                  Status
                </label>
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleChange}
                  className="w-full p-2 border-none rounded-md bg-[#393939] text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
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
    </div>
  );
};

export default TournamentUsersRankingApproval;
