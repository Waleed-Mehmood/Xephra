import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCamera, FaUser, FaEnvelope, FaCalendarAlt, FaCity, FaGamepad } from "react-icons/fa";
import styles from "./UserProfile.module.css"; 

const UserProfile = () => {
  const [profile, setProfile] = useState({
    profileImage: "",
    username: "",
    fullName: "",
    bio: "",
    email: "",
    age: "",
    dob: "",
    locationCity: "",
    locationCountry: "",
    favoriteGames: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user/profile")
      .then((response) => {
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profileImage: URL.createObjectURL(file) });
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    axios
      .put("/api/user/profile", profile)
      .then(() => {
        alert("Profile updated successfully!");
        setIsUpdating(false);
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        setIsUpdating(false);
      });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.userProfile}>
      <h1>User Profile</h1>
      <div className={styles.profileImageContainer}>
        <div className={styles.profileImageWrapper}>
          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/150"
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
        <label><FaUser /> Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
        />

        <label><FaUser /> Full Name</label>
        <input
          type="text"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
        />

        <label><FaEnvelope /> Bio/About</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
        ></textarea>

        <label><FaEnvelope /> Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />

        <label><FaCalendarAlt /> Age</label>
        <input
          type="number"
          name="age"
          value={profile.age}
          onChange={handleChange}
        />

        <label><FaCalendarAlt /> Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
        />

        <label><FaCity /> City</label>
        <input
          type="text"
          name="locationCity"
          value={profile.locationCity}
          onChange={handleChange}
        />

        <label><FaCity /> Country</label>
        <input
          type="text"
          name="locationCountry"
          value={profile.locationCountry}
          onChange={handleChange}
        />

        <label><FaGamepad /> Favourite Games</label>
        <input
          type="text"
          name="favoriteGames"
          value={profile.favoriteGames}
          onChange={handleChange}
        />

        <button className={styles.uploadBtn} onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
