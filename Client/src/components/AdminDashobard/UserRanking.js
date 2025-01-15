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

const UserRanking = ({dark}) => {
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
        backgroundColor: [
          "#4ade80",
          "#60a5fa",
          "#f87171",
          "#facc15",
          "#a78bfa",
          "#fb923c",
          "#6ee7b7",
          "#93c5fd",
          "#fcd34d",
          "#d1d5db",
        ],
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
    <div className={`min-h-screen p-8 rounded-lg ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-[#b6a99a]">
        User Rankings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Players Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Top Players</h2>
          <div>
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#F7E8E8] rounded-full">
                    <span className="text-base lg:text-lg font-semibold text-[#854951]">
                      #{user.rank}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-lg font-medium">
                      {user.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-500">
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
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-center">
            Scores Overview
          </h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UserRanking;
