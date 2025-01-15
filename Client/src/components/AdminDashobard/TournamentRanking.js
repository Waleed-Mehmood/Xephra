import React from "react";
import { Link, useParams } from "react-router-dom";

const TournamentRanking = () => {
  const { eventId } = useParams();

  const tournaments = [
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
  ];

  const tournament = tournaments.find((t) => t.id === parseInt(eventId));

  if (!tournament) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-2xl md:text-3xl font-bold">Tournament Not Found</h1>
        <Link to="/dashboard" className="text-[#69363f] mt-4 block text-sm md:text-base">
          Back to Home
        </Link>
      </div>
    );
  }

  const dummyRankings = [
    {
      id: 1,
      name: "John Doe",
      score: 1500,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      score: 1450,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Michael Brown",
      score: 1400,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Emily Davis",
      score: 1350,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Chris Wilson",
      score: 1300,
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  return (
    <div className="bg-[#B7AB95]">
    <div className="container mx-auto py-16 px-4">
    <div className="bg-[#854951] rounded-lg shadow-lg p-8 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
        {tournament.title}
      </h1>
      <p className="text-sm md:text-lg text-white text-center">
        Compete for the prize pool of{" "}
        <span className="text-[#B6A99A]">{tournament.prizePool}</span>
      </p>
      </div>
      <div className="bg-[#232122] rounded-lg p-6 shadow-lg">
        <ul className="divide-y divide-[#393939]">
          {dummyRankings.map((user, index) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 hover:bg-[#2c2c2c] rounded-lg transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-[#69363f]"
                />
                <div>
                  <h2 className="text-sm md:text-lg font-semibold text-[#b6a99a]">
                    {index + 1}. {user.name}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400">
                    Score: {user.score}
                  </p>
                </div>
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-300">
                #{index + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default TournamentRanking;
