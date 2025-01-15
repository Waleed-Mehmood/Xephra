import React from "react";

const Users = () => {
  // Dummy user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
  ];

  const handleAction = (action, userId) => {
    console.log(`${action} action triggered for user ID: ${userId}`);
  };

  return (
    <div className="min-h-screen p-6 bg-[#B7AB95]">
      {/* Header Section */}
      <div className="bg-[#854951] rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white text-center mb-4">
          User Management
        </h1>
        <p className="text-white text-center text-sm lg:text-base">
          Easily manage and oversee all registered users within the system.
        </p>
      </div>

      {/* User Table Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#854951]">
            <tr>
              <th className="text-white font-medium text-sm lg:text-base p-4 text-left">
                Name
              </th>
              <th className="text-white font-medium text-sm lg:text-base p-4 text-left">
                Email
              </th>
              <th className="text-white font-medium text-sm lg:text-base p-4 text-left">
                Role
              </th>
              <th className="text-white font-medium text-sm lg:text-base p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition duration-300`}
              >
                <td className="p-4 text-gray-800 font-medium text-sm lg:text-base">
                  {user.name}
                </td>
                <td className="p-4 text-gray-600 text-sm lg:text-base">
                  {user.email}
                </td>
                <td className="p-4 text-gray-600 text-sm lg:text-base">
                  {user.role}
                </td>
                <td className="p-4 text-center">
                  <button
                    className="bg-[#854951] hover:bg-[#A15D66] text-white py-2 px-4 rounded-lg text-xs lg:text-sm font-semibold mr-2 transition duration-300"
                    onClick={() => handleAction("suspend", user.id)}
                  >
                    Suspend
                  </button>
                  <button
                    className="bg-[#302B27] hover:bg-[#8B796B] text-white py-2 px-4 rounded-lg text-xs lg:text-sm font-semibold transition duration-300"
                    onClick={() => handleAction("delete", user.id)}
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

export default Users;
