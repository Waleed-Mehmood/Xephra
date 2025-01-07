import React from "react";
import { Link } from "react-router-dom";

const TournamentCard = ({ id, title, game, date, time, description, image, prizePool }) => {
  return (
    <div className="bg-[#202938] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <Link to={`/event/${id}`}><img className="w-full h-56 object-cover" src={image} alt={title} /></Link>
      <div className="p-4">
      <Link to={`/event/${id}`}><h3 className="text-xl font-bold text-[#b8a896]">{title}</h3></Link>
        <p className="text-[#69363f] font-bold mt-1">{game}</p>
        <p className="text-sm text-gray-400">{date}</p>
        <p className="text-gray-300 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-white">{prizePool}</span>
        </div>
      </div>
    </div>
  );
};

const RegisteredEvents = () => {
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

  return (
    <div className="mx-auto py-16 px-4 bg-[#232122] rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#b6a99a] py-6">REGISTERED EVENTS</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tournaments.map((tournament, index) => (
          <TournamentCard key={index} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
