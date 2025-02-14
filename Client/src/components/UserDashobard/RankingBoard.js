import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

// Register the required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const RankingBoard = ({ dark }) => {
  const users = [
    { name: "Player1", rank: 1, score: 920, progress: 85 },
    { name: "Player2", rank: 2, score: 870, progress: 75 },
    { name: "Player3", rank: 3, score: 810, progress: 70 },
    { name: "Player4", rank: 4, score: 750, progress: 65 },
    { name: "Player5", rank: 5, score: 700, progress: 60 },
  ];

  // Extract top 10 users or fewer
  const topUsers = users.slice(0, 10);

  const barChartData = {
    labels: topUsers.map((user) => user.name),
    datasets: [
      {
        label: "Scores",
        data: topUsers.map((user) => user.score),
        backgroundColor: "#854951",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#622D37", // Change X-axis label color
        },
      },
      y: {
        ticks: {
          color: "#622D37", // Change Y-axis label color
        },
      },
    },
  };

  const doughnutData = (progress) => ({
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ["#854951", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  });

  return (
    <div className={`min-h-screen p-8 shadow-2xl shadow-gray-950 rounded-xl backdrop-blur-sm ${
        dark
          ? "bg-[#492f3418] bg-opacity-[.06]":"bg-[#232122]"}`}>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">
        Ranking Board
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Players Section */}
        <div className="bg-gradient-to-r from-[#D19F43] via-[#B2945C] via-[#C9B796] via-[#B39867] to-[#D4AD66] shadow-md rounded-lg p-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center text-[#622D37]">
            Top Players
          </h2>
          <div>
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b py-4 border-[#854951]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#F7E8E8] rounded-full">
                    <span className="text-base lg:text-lg font-bold text-[#854951]">
                      #{user.rank}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-lg font-medium">
                      {user.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-[#622D37]">
                      Score: {user.score}
                    </p>
                  </div>
                </div>
                <div className="w-16">
                  <Doughnut
                    data={doughnutData(user.progress)}
                    options={{
                      cutout: "80%",
                      plugins: {
                        tooltip: { enabled: false },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scores Overview Section */}
        <div className="bg-gradient-to-r from-[#D19F43] via-[#B2945C] via-[#C9B796] via-[#B39867] to-[#D4AD66] shadow-md rounded-lg p-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center text-[#622D37]">
            Scores Overview
          </h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default RankingBoard;
