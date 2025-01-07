import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EventDetail = () => {
  const { eventId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tournaments = [
    {
      id: 1,
      title: "Fortnite Battle Royale",
      game: "Fortnite",
      date: "August 5th, 2024",
      time: "6:00 PM",
      description:
        "Battle in the most intense Fortnite tournament with massive rewards.",
      image: "https://images8.alphacoders.com/877/thumb-1920-877849.jpg",
      prizePool: "$20,000",
      rules: "1. No cheating or hacks. 2. Teaming is prohibited. 3. Be respectful to all players.",
      registerPrice: "$10",
    },
    {
      id: 2,
      title: "Call of Duty: Warzone Tournament",
      game: "Call of Duty: Warzone",
      date: "October 15th, 2024",
      time: "8:00 PM",
      description:
        "Join the action in the epic Warzone tournament with adrenaline-pumping battles.",
      image: "https://i.ytimg.com/vi/TidXGyzxT8c/maxresdefault.jpg",
      prizePool: "$15,000",
      rules: "1. Use official game servers. 2. No foul language. 3. Play fair and square.",
      registerPrice: "$15",
    },
    // Add other tournaments here
  ];

  const tournament = tournaments.find((t) => t.id === parseInt(eventId));

  if (!tournament) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link to="/" className="text-[#69363f] mt-4 block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#232122] text-[#b6a99a] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#202938] rounded-lg overflow-hidden shadow-lg">
        <img
          className="w-full h-64 object-cover"
          src={tournament.image}
          alt={tournament.title}
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#b8a896]">
            {tournament.title}
          </h1>
          <p className="text-[#69363f] font-bold mt-2">{tournament.game}</p>
          <p className="text-sm text-gray-400 mt-1">
            {tournament.date} • {tournament.time}
          </p>
          <p className="text-gray-300 mt-4">{tournament.description}</p>
          <p className="mt-6 text-lg text-white font-bold">
            Prize Pool: {tournament.prizePool}
          </p>
          <p className="mt-2 text-lg text-[#b6a99a]">
            Registration Fee:{" "}
            <span className="text-[#fff] font-bold">
              {tournament.registerPrice}
            </span>
          </p>
          <div className="mt-6">
            <h2 className="text-xl text-[#b8a896] font-bold">Rules</h2>
            <p className="text-gray-300 mt-2">{tournament.rules}</p>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/"
              className="bg-[#69363f] text-white px-6 py-3 rounded-md hover:bg-[#8f404f] transition"
            >
              Back to Events
            </Link>
            <button
              className="bg-[#8f404f] text-white px-6 py-3 rounded-md hover:bg-[#a34c5a] transition"
              onClick={() => alert("You have joined the event!")}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
