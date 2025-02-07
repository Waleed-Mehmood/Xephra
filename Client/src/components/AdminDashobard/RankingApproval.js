import React from "react";
import { Link } from "react-router-dom";

const events = [
  { id: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNv4QP8A-KN2oJAaeRyimIkKXz_6_-ARJuA&s", title: "Event 1" },
  { id: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRng1axjCrpjZ-SOsZDP5bpXBFBVudzACgjYA&s", title: "Event 2" },
  { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr8CGxbbM3Na23IriekXKwBcYDJfmAPrElgQ&s", title: "Free Fire Golden" },
  { id: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTodt9s5zDAmvpyoqeKhANe1iTrH-i0w9eRIQ&s", title: "Event 4" },
  { id: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqlEuqMoyvMCA_urQfVefbE6Do35XuXwdrdw&s", title: "Event 5" },
  { id: 6, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkCcLSSh9MEHCzZFvyXu_j-d7b15yutEPww&s", title: "Event 6" },
  { id: 7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vVhnbTORPZGrSgOwd7WEK4LEwZ8fIoKzgw&s", title: "Event 7" },
  { id: 8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HU1Ig1A5auwp3Ne9WTvPRijHQh_dO2NcBg&s", title: "Event 8" },
  { id: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ-4oakAZx7xEjJVWo0yvsnygs5ySyQ6aG1Q&s", title: "Event 9" },
];

const RankingApproval = () => {
  return (
    <div 
      className="p-5 bg-cover bg-center min-h-screen rounded-xl bg-[#69363F]"
    >
      <h1 className="text-2xl font-bold mb-4 text-center text-[#b6a99a]">Admin Approval Panel</h1>
      <Link to="/dashboard/tournamentrankingapproval">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-32 object-cover transform group-hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-semibold truncate w-6/7 text-center">{event.title}</h2>
            </div>
          </div>
        ))}
      </div>
      </Link>
    </div>
  );
};

export default RankingApproval;