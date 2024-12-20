import React from 'react';

const TournamentCard = ({ title, game, date, description, image, prizePool }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <img className="w-full h-56 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 mt-1">{game}</p>
        <p className="text-sm text-gray-400">{date}</p>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">{prizePool}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Tournaments = () => {
  const tournaments = [
    {
      title: "Fortnite Battle Royale",
      game: "Fortnite",
      date: "August 5th, 2024",
      description: "Battle in the most intense Fortnite tournament with massive rewards.",
      image: "https://images8.alphacoders.com/877/thumb-1920-877849.jpg",
      prizePool: "$20,000"
    },
    {
      title: "Call of Duty: Warzone Tournament",
      game: "Call of Duty: Warzone",
      date: "October 15th, 2024",
      description: "Join the action in the epic Warzone tournament with adrenaline-pumping battles.",
      image: "https://i.ytimg.com/vi/TidXGyzxT8c/maxresdefault.jpg",
      prizePool: "$15,000"
    },
    {
      title: "Apex Legends Championship",
      game: "Apex Legends",
      date: "November 20th, 2024",
      description: "Team up and conquer the arena in this fast-paced Apex Legends tournament.",
      image: "https://ineqe.com/wp-content/uploads/2022/05/apex-media-news-saviors-patch-keyart.jpg.adapt_.crop16x9.431p.jpg",
      prizePool: "$12,000"
    },
   
    {
      title: "PUBG Mobile Global Championship",
      game: "PUBG Mobile",
      date: "December 5th, 2024",
      description: "Survive and dominate in the biggest PUBG Mobile tournament.",
      image: "https://via.placeholder.com/400",
      prizePool: "$18,000"
    },
    {
      title: "League of Legends World Cup",
      game: "League of Legends",
      date: "January 10th, 2025",
      description: "Join the legendary League of Legends World Cup and compete for the ultimate title.",
      image: "https://via.placeholder.com/400",
      prizePool: "$25,000"
    },
    {
      title: "Minecraft Building Championship",
      game: "Minecraft",
      date: "March 5th, 2025",
      description: "Unleash your creativity in the Minecraft Building Championship and build your way to victory.",
      image: "https://via.placeholder.com/400",
      prizePool: "$8,000"
    }

  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Upcoming Tournaments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tournaments.map((tournament, index) => (
          <TournamentCard key={index} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
