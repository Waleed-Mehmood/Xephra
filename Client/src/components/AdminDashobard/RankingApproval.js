import React, { useState } from "react";

const RankingApproval = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      game: "Chess",
      rank: 1,
      score: 1500,
      status: "Pending",
      screenshot: "https://images8.alphacoders.com/877/thumb-1920-877849.jpg",
    },
    {
      id: 2,
      game: "Football",
      rank: 2,
      score: 1400,
      status: "Pending",
      screenshot: "https://i.ytimg.com/vi/TidXGyzxT8c/maxresdefault.jpg",
    },
    {
      id: 3,
      game: "Basketball",
      rank: 3,
      score: 1300,
      status: "Pending",
      screenshot:
        "https://ineqe.com/wp-content/uploads/2022/05/apex-media-news-saviors-patch-keyart.jpg.adapt_.crop16x9.431p.jpg",
    },
  ]);

  const [editingGame, setEditingGame] = useState(null);
  const [gameToDelete, setGameToDelete] = useState(null);

  const handleApprove = (id) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, status: "Approved" } : game
      )
    );
  };

  const handleDecline = (id) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, status: "Declined" } : game
      )
    );
  };

  const handleDelete = () => {
    setGames((prevGames) =>
      prevGames.filter((game) => game.id !== gameToDelete)
    );
    setGameToDelete(null);
  };

  const openEditModal = (game) => {
    setEditingGame({ ...game });
  };

  const closeEditModal = () => {
    setEditingGame(null);
  };

  const handleEditChange = (field, value) => {
    setEditingGame((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === editingGame.id ? editingGame : game
      )
    );
    closeEditModal();
  };

  const openDeleteModal = (id) => {
    setGameToDelete(id);
  };

  const closeDeleteModal = () => {
    setGameToDelete(null);
  };

  return (
    <div className="bg-[#f7e8e8] p-6 rounded-lg min-h-screen">
      <h1 className="text-2xl font-bold text-[#5C2D33] mb-6 font-['Press_Start_2P'] text-center">
        Admin Approval Panel
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-[#5C2D33] shadow-md rounded-lg p-4 border border-gray-300"
          >
            <h2 className="text-lg font-bold text-[#B6A99A] mb-2">
              Game: {game.game || "N/A"}
            </h2>
            <p className="text-sm text-[#B6A99A]">
              <strong>Rank:</strong> {game.rank || "N/A"}
            </p>
            <p className="text-sm text-[#B6A99A]">
              <strong>Score:</strong> {game.score || "N/A"}
            </p>
            <p className="text-sm text-[#B6A99A]">
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  game.status === "Pending"
                    ? "text-yellow-600"
                    : game.status === "Approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {game.status}
              </span>
            </p>
            {game.screenshot && (
              <img
                src={game.screenshot}
                alt="Screenshot"
                className="mt-2 w-full h-32 object-cover rounded"
              />
            )}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {game.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleApprove(game.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(game.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Decline
                  </button>
                </>
              )}
              <button
                onClick={() => openEditModal(game)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(game.id)}
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {gameToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete this game?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#5C2D33] p-6 rounded-lg shadow-lg w-[90%] max-w-lg overflow-y-scroll sm:overflow-y-auto max-h-[80%] sm:max-h-[none]">
            <h2 className="text-lg font-bold mb-4 text-[#B6A99A]">Edit Game</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Game Name</label>
              <input
                type="text"
                value={editingGame.game}
                onChange={(e) => handleEditChange("game", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Rank</label>
              <input
                type="number"
                value={editingGame.rank}
                onChange={(e) => handleEditChange("rank", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Score</label>
              <input
                type="number"
                value={editingGame.score}
                onChange={(e) => handleEditChange("score", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Status</label>
              <select
                value={editingGame.status}
                onChange={(e) => handleEditChange("status", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Screenshot</label>
              <input
                type="file"
                onChange={(e) =>
                  handleEditChange("screenshot", e.target.files[0])
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeEditModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingApproval;
