import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera, FaUser, FaEnvelope, FaCity } from "react-icons/fa";
import styles from "./AdminProfile.module.css";
import {
  updateProfile,
  createProfile,
  getProfile,
} from "../../redux/features/profileSlice";
import Loading from "../../utils/Loading/Loading";

const AdminProfile = ({ dark , profile}) => {
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
    locationCity: "",
    locationCountry: "",
    phoneNumber: "",
    address: "",
  });
  const [profileImageView, setProfileImageView] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState(null); // Track initial profile data
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(""); // For displaying the message

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

  if (loading) return <Loading />;
  console.log("profileData", profileData);
  return (
    <div
      className={`${styles.userProfile} ${
        dark ? "bg-[#69363F]" : "bg-[#232122]"
      }`}
    >
      <h1>Admin Profile</h1>
      <div className={styles.profileImageContainer}>
        <div className={styles.profileImageWrapper}>         
          <img
            src={
              profileImageView
                ? profileImageView
                : profileData?.profileImage
                ? `http://localhost:5000/${profile?.profileImage}`
                :  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
            }
            alt="Profile"
            className={styles.avatar}
          />
          <label htmlFor="profileImage" className={styles.cameraIconWrapper}>
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
      </div>

      <div className={styles.profileForm}>
        <label>
          <FaUser /> Username
        </label>
        <input
          type="text"
          name="username"
          value={profileData?.username || ""}
          onChange={handleChange}
        />

        <label>
          <FaUser /> Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={profileData?.fullName || ""}
          onChange={handleChange}
        />

        <label>
          <FaEnvelope /> Bio/About
        </label>
        <textarea
          name="bio"
          value={profileData?.bio || ""}
          onChange={handleChange}
        ></textarea>

        <label>
          <FaEnvelope /> Email
        </label>
        <input
          type="email"
          name="email"
          value={profileData?.email || ""}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={profileData?.phoneNumber || ""}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={profileData?.address || ""}
          onChange={handleChange}
        />

        <label>
          <FaCity /> City
        </label>
        <input
          type="text"
          name="locationCity"
          value={profileData?.locationCity || ""}
          onChange={handleChange}
        />

        <label>
          <FaCity /> Country
        </label>
        <input
          type="text"
          name="locationCountry"
          value={profileData?.locationCountry || ""}
          onChange={handleChange}
        />

        {/* Show message if no changes are detected */}
        {message && <div className={styles.message}>{message}</div>}

        {/* Conditionally render the button */}
        {profile ? (
          <button
            className={`${styles.uploadBtn} ${
              dark
                ? "bg-[#302B27] hover:bg-[#49413C]"
                : "bg-[#854951] hover:bg-[#A15D66]"
            }`}
            onClick={handleProfileUpdateClick} // Handle update button click
          >
            Update
          </button>
        ) : (
          <button
            className={`${styles.uploadBtn} ${
              dark
                ? "bg-[#302B27] hover:bg-[#49413C]"
                : "bg-[#854951] hover:bg-[#A15D66]"
            }`}
            onClick={handleCreate} // Create the profile if it doesn't exist
          >
            Create Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
