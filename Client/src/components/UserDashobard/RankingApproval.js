import React, { useState } from "react";

const RankingApproval = ({dark}) => {
  const [games, setGames] = useState([]);

  // Add a new game row
  const handleAddGame = () => {
    setGames([
      ...games,
      {
        id: Date.now(),
        game: "",
        rank: "",
        score: "",
        status: "-",
        screenshot: null,
      },
    ]);
  };

  // Update game details
  const handleInputChange = (id, field, value) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, [field]: value } : game
      )
    );
  };

  // Handle screenshot upload
  const handleScreenshotUpload = (id, file) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, screenshot: file } : game
      )
    );
  };

  // Submit game details
  const handleSubmit = (id) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, status: "Pending" } : game
      )
    );
    alert("Details submitted successfully!");
  };

  // Delete a row
  const handleDelete = (id) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  };

  return (
    <div className="bg-[#f7e8e8] border border-gray-300 rounded-lg p-6 mx-auto text-center">
      <h1 className={`text-2xl font-bold mb-6 font-['Press_Start_2P'] ${dark ? "text-[#69363F]" : "text-[#232122]"}`}>
        User Game Entry
      </h1>
      <button
        onClick={handleAddGame}
        className={`text-white px-4 py-2 rounded-md transition mb-6 ${dark ? "bg-[#854951] hover:bg-[#A15D66]" : "bg-[#302B27] hover:bg-[#49413C]"}`}
      >
        Add New Game
      </button>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`text-white py-3 px-4 border border-gray-300 ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
                Game Name
              </th>
              <th className={`text-white py-3 px-4 border border-gray-300 ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
                Rank
              </th>
              <th className={`text-white py-3 px-4 border border-gray-300 ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
                Score
              </th>
              <th className={`text-white py-3 px-4 border border-gray-300 ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
                Screenshot
              </th>
              <th className={`text-white py-3 px-4 border border-gray-300 ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
                Status
              </th>
              <th className={`text-white py-3 px-4 border border-gray-300 ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="bg-white hover:bg-[#f1dcdc] transition">
                <td className="py-3 px-4 border border-gray-300">
                  <input
                    type="text"
                    value={game.game}
                    onChange={(e) =>
                      handleInputChange(game.id, "game", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 placeholder-[#6a5e5e]"
                    placeholder="Enter game name"
                    disabled={game.status !== "-"}
                  />
                </td>
                <td className="py-3 px-4 border border-gray-300">
                  <input
                    type="number"
                    value={game.rank}
                    onChange={(e) =>
                      handleInputChange(game.id, "rank", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 placeholder-[#6a5e5e]"
                    placeholder="Enter rank"
                    disabled={game.status !== "-"}
                  />
                </td>
                <td className="py-3 px-4 border border-gray-300">
                  <input
                    type="number"
                    value={game.score}
                    onChange={(e) =>
                      handleInputChange(game.id, "score", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 placeholder-[#6a5e5e]"
                    placeholder="Enter score"
                    disabled={game.status !== "-"}
                  />
                </td>
                <td className="py-3 px-4 border border-gray-300">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleScreenshotUpload(game.id, e.target.files[0])
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 placeholder-[#6a5e5e]"
                    disabled={game.status !== "-"}
                  />
                  {game.screenshot && (
                    <img
                      src={URL.createObjectURL(game.screenshot)}
                      alt="Screenshot Preview"
                      className="mt-2 w-20 h-20 object-cover border border-gray-300 rounded"
                    />
                  )}
                </td>
                <td className="py-3 px-4 border border-gray-300 text-center">
                  <span
                    className={`${
                      game.status === "Pending" ? "text-yellow-600" : "text-gray-500"
                    } font-bold`}
                  >
                    {game.status}
                  </span>
                </td>
                <td className="py-3 px-4 border border-gray-300 text-center flex justify-center gap-2 items-center">
                  {game.status === "-" ? (
                    <button
                      onClick={() => handleSubmit(game.id)}
                      className="bg-[#5C2D33] text-white px-4 py-2 rounded-md hover:bg-[#854951] transition"
                    >
                      Submit
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold">Submitted</span>
                  )}
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
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
  );
};

export default RankingApproval;
