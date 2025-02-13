import React, { useState, useEffect } from "react";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaCity,
  FaGamepad,
  FaPhone,
  FaMapMarkedAlt,
} from "react-icons/fa";
import styles from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  createProfile,
  getProfile,
} from "../../redux/features/userSlice";
import Loading from "../../utils/Loading/Loading";

const UserProfile = ({ dark, profile }) => {
  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.UserId;

  const [profileData, setProfileData] = useState({
    userId: userId,
    profileImage: null,
    username: "",
    fullName: "",
    bio: "",
    email: "",
    phoneNumber: "",
    address: "",
    age: "",
    locationCity: "",
    locationCountry: "",
    favoriteGames: [], // Changed this to an array
  });
  const [profileImageView, setProfileImageView] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState(null); // Track initial profile data
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(""); // For displaying the message

  const [newGame, setNewGame] = useState(""); // Input field for new game

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId)); // Fetch the profile if userId exists
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Update profileData when profile state changes
    if (profile) {
      setProfileData((prevState) => ({
        ...prevState,
        ...profile,
        profileImage: profile.profileImage || prevState.profileImage, // Keep the current image if not provided
      }));

      setInitialProfileData(profile); // Set the initial profile data
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profileImage: URL.createObjectURL(file) });
    setSelectedFile(file);
    const profileImage = URL.createObjectURL(file);
    setProfileImageView(profileImage);
  };

  const handleGameChange = (e) => {
    setNewGame(e.target.value);
  };

  const handleCreate = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profileImage", selectedFile); // Append profileImage if there's a new file
    }
    formData.append("userId", profileData.userId);
    formData.append("username", profileData.username);
    formData.append("fullName", profileData.fullName);
    formData.append("bio", profileData.bio);
    formData.append("email", profileData.email);
    formData.append("locationCity", profileData.locationCity);
    formData.append("locationCountry", profileData.locationCountry);
    formData.append("phoneNumber", profileData.phoneNumber);
    formData.append("address", profileData.address);
    formData.append("age", profileData.age);
    // formData.append("favoriteGames", profileData.favoriteGames);
    formData.append("favoriteGames", JSON.stringify(profileData.favoriteGames));

    dispatch(createProfile(formData)).then(() => {
      dispatch(getProfile(userId)); // Re-fetch the profile after creating it
    });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    console.log("selected file", selectedFile);
    if (selectedFile) {
      formData.append("profileImage", selectedFile); // Append profileImage if there's a new file
    }
    formData.append("userId", profileData.userId);
    formData.append("username", profileData.username);
    formData.append("fullName", profileData.fullName);
    formData.append("bio", profileData.bio);
    formData.append("email", profileData.email);
    formData.append("locationCity", profileData.locationCity);
    formData.append("locationCountry", profileData.locationCountry);
    formData.append("phoneNumber", profileData.phoneNumber);
    formData.append("address", profileData.address);
    formData.append("age", profileData.age);
    // formData.append("favoriteGames", profileData.favoriteGames);
    formData.append("favoriteGames", JSON.stringify(profileData.favoriteGames));

    dispatch(updateProfile({ userId: profileData.userId, formData })).then(
      () => {
        dispatch(getProfile(userId)); // Re-fetch the profile after updating it
      }
    );
  };

  const isProfileChanged = () => {
    return (
      initialProfileData?.username !== profileData.username ||
      initialProfileData?.fullName !== profileData.fullName ||
      initialProfileData?.bio !== profileData.bio ||
      initialProfileData?.email !== profileData.email ||
      initialProfileData?.phoneNumber !== profileData.phoneNumber ||
      initialProfileData?.address !== profileData.address ||
      initialProfileData?.age !== profileData.age ||
      initialProfileData?.favoriteGames !== profileData.favoriteGames ||
      initialProfileData?.locationCity !== profileData.locationCity ||
      initialProfileData?.locationCountry !== profileData.locationCountry ||
      initialProfileData?.profileImage !== profileData.profileImage
    );
  };

  const handleProfileUpdateClick = () => {
    if (!isProfileChanged()) {
      setMessage("No changes detected. Please modify some fields to update.");
    } else {
      setMessage(""); // Reset message
      handleUpdate();
    }
  };

  const handleAddGame = () => {
    if (newGame.trim() !== "" && !profileData.favoriteGames.includes(newGame)) {
      setProfileData((prevProfile) => ({
        ...prevProfile,
        favoriteGames: [...prevProfile.favoriteGames, newGame.trim()],
      }));
      setNewGame(""); // Clear input field after adding
    }
  };

  const handleRemoveGame = (gameToRemove) => {
    setProfileData((prevProfile) => ({
      ...prevProfile,
      favoriteGames: prevProfile.favoriteGames.filter(
        (game) => game !== gameToRemove
      ),
    }));
  };

  if (loading) return <Loading />;

  return (
    <>
    
      <div>
        <div className={dark ? "bg-gradient-to-r from-[#3e2027] to-[#2e1c20] p-4 rounded-2xl gap-4 shadow-lg mb-2 sm:m-4" : "bg-[#232122] p-4 rounded-2xl gap-4 shadow-lg mb-2 sm:m-4"}>
          <div className="flex flex-col items-end gap-0">
            <h1 className="text-xl text-[#D4AD66]">Rank : 12</h1>
            <h2 className=" text-[#D4AD66]">Score: 12</h2>
          </div>

          <div className={styles.profileImageContainer}>
            <div className={styles.profileImageWrapper}>
              <img
                src={
                  profileImageView
                    ? profileImageView
                    : profileData?.profileImage
                    ? `http://localhost:5000/${profile?.profileImage}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
                }
                alt="Profile"
                className={styles.avatar}
              />
              <label
                htmlFor="profileImage"
                className={styles.cameraIconWrapper}
              >
                <FaCamera className={styles.cameraIcon} />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className=" text-[#D4AD66] text-3xl ml-10">{profileData.username}</label>
              <label className="text-[#D4AD66] text-xl ml-10">{profileData.bio}</label>
            </div>
          </div>
        </div>

        <div className={styles.profileForm}>
  <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 sm:ml-4">
    {/* Username */}
    <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
      <label className="text-[#D4AD66] flex items-center gap-2">
        <FaUser /> Username
      </label>
      <input
        type="text"
        name="username"
        value={profileData?.username || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>

    {/* Full Name */}
    <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
      <label className="text-[#D4AD66] flex items-center gap-2">
        <FaUser /> Full Name
      </label>
      <input
        type="text"
        name="fullName"
        value={profileData?.fullName || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>
  </div>

  <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 sm:ml-4">
    {/* Email */}
    <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
      <label className=" text-[#D4AD66] flex items-center gap-2">
        <FaEnvelope /> Email
      </label>
      <input
        type="email"
        name="email"
        value={profileData?.email || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>

    {/* Phone Number */}
    <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
      <label className="text-[#D4AD66] flex items-center gap-2">
        <FaPhone /> Phone Number
      </label>
      <input
        type="text"
        name="phoneNumber"
        value={profileData?.phoneNumber || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>
  </div>

  {/* Address Field */}
  <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 sm:ml-4">
    <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
      <label className="text-[#D4AD66] flex items-center gap-2">
        <FaMapMarkedAlt /> Address
      </label>
      <input
        type="text"
        name="address"
        value={profileData?.address || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>

    {/* Age Field */}
    <div className="grid grid-cols-1 w-full lg:w-90 gap-2">
      <label className="text-[#D4AD66] flex items-center gap-2">
        <FaCalendarAlt /> Age
      </label>
      <input
        type="number"
        name="age"
        value={profileData?.age || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>
  </div>

  <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 sm:ml-4">
    {/* City Field */}
    <div className="grid grid-cols-1 w-full lg:w-90 gap-2">
      <label className="text-[#D4AD66] flex items-center gap-2">
        <FaCity /> City
      </label>
      <input
        type="text"
        name="locationCity"
        value={profileData?.locationCity || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>

    {/* Country Field */}
    <div className="grid grid-cols-1 w-full lg:w-90 gap-2">
      <label className="text-[#D4AD66] flex items-center gap-2">
        <FaCity /> Country
      </label>
      <input
        type="text"
        name="locationCountry"
        value={profileData?.locationCountry || ""}
        onChange={handleChange}
        className={`${styles.userProfileInput} p-2 rounded border w-full`}
      />
    </div>
  </div>

  <label className="text-[#D4AD66] sm:ml-4">
    <FaEnvelope /> Bio/About
  </label>
  <textarea
    name="bio"
    value={profileData?.bio || ""}
    onChange={handleChange}
    className={`${styles.userProfiletextarea} p-2 rounded border h-32 sm:ml-4`}
  ></textarea>

  <label className="text-[#D4AD66] sm:ml-4">
    <FaGamepad /> Favourite Games
  </label>
  <div className="flex flex-col space-y-2 sm:ml-4">
    <div className="flex space-x-2">
      <input
        type="text"
        value={newGame}
        onChange={handleGameChange}
        className={`${styles.userProfileInput} p-2 rounded border flex-1`}
      />
        
      <button
        type="button"
        onClick={handleAddGame}
        className={`p-2 text-white rounded ${
          dark
            ? "bg-[#302B27] hover:bg-[#49413C]"
            : "bg-[#854951] hover:bg-[rgb(161,93,102)]"
        }`}
      >
        Add Game
      </button>
    </div>



            <ol className="list-decimal space-y-1">
              {profileData.favoriteGames.length > 0 ? (
                profileData.favoriteGames.map((game, index) => (
                  <li key={index} className="flex items-center ml-2">
                    <span className="text-[#B6A99A] text-md font-bold">
                     {game}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGame(game)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No favorite games added yet.</p>
              )}
            </ol>
          </div>

          {/* Show message if no changes are detected */}
          {message && <div className={styles.message}>{message}</div>}

          {/* Conditionally render the button */}
          {profile ? (
            
            <button
              className={`${styles.uploadBtn} ${
                dark
                  ? "bg-[#302B27] hover:bg-[#49413C]"
                  : "bg-[#302B27] hover:bg-[#A15D66]"
              }`}
              onClick={handleProfileUpdateClick} // Handle update button click
            >
              Update
            </button>
           
          ) : (
          
            <button
              className={`text-[#C9B796] rounded-md font-bold border-[#C9B796] border-[1px] px-10 py-2   ${
                dark
                 ? "bg-[#302B27] hover:bg-[#49413C]"
                  : "bg-[#302B27] hover:bg-[#A15D66]"
              }`}
              onClick={handleCreate} // Create the profile if it doesn't exist
            >
              Create Profile
            </button>

          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
