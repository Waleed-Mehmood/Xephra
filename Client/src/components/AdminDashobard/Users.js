import { React, useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  suspendUser,
  getUser
} from "../../redux/features/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading/Loading";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Modal from './Modal';

const Users = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { users, loading, successMessage, profile } = useSelector(
    (state) => state.profile
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage); // Display a success toast
    }
  }, [successMessage]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  if (loading) {
    return <Loading />;
  }

  const handleSuspend = (userId) => {
    dispatch(suspendUser(userId));
  };
   const handleProfileView = (userId) => {
      dispatch(getUser(userId));
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
  

  return (
    <div className="min-h-screen p-6 bg-[#B7AB95]">
      {/* Header Section */}
      <div className="bg-[#854951] rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white text-center mb-4">
          User Management
        </h1>
        <ToastContainer position="top-right" autoClose={3000} />

        <p className="text-white text-center text-sm lg:text-base">
          Easily manage and oversee all registered users within the system.
        </p>
      </div>

      {/* User Table Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        {users.length == 0 ? (
          "no user found"
        ) : (
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
                <th className="text-white font-medium text-sm lg:text-base p-4 text-left">
                  Created At
                </th>
                <th className="text-white font-medium text-sm lg:text-base p-4 text-left">
                  Profile
                </th>
                <th className="text-white font-medium text-sm lg:text-base p-4 text-center">
                  Suspension Status
                </th>
                <th className="text-white font-medium text-sm lg:text-base p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition duration-300`}
                >
                  <td className="p-4 text-gray-800 font-medium text-sm lg:text-base">
                    {user?.name}
                  </td>
                  <td className="p-4 text-gray-600 text-sm lg:text-base">
                    {user?.email}
                  </td>
                  <td className="p-4 text-gray-600 text-sm lg:text-base">
                    {user?.role}
                  </td>
                  <td className="p-4 text-gray-600 text-sm lg:text-base">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-600 text-sm lg:text-base">
                    <button  onClick={()=>handleProfileView(user?.userId)} className="bg-[#854951] hover:bg-[#A15D66] text-white py-2 px-4 rounded-lg text-xs lg:text-sm font-semibold mr-2 transition duration-300">
                      View Profile
                    </button>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleSuspend(user?.userId)}
                      className="bg-[#854951] hover:bg-[#A15D66] text-white py-2 px-4 rounded-lg text-xs lg:text-sm font-semibold mr-2 transition duration-300"
                    >
                      {user.isSuspended ? "Unsuspend" : "Suspend"}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-[#302B27] hover:bg-[#8B796B] text-white py-2 px-4 rounded-lg text-xs lg:text-sm font-semibold transition duration-300"
                      onClick={() => handleDelete(user?.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} profile={profile} />

    </div>
  );
};

export default Users;
