const express = require("express");
const Events = require("../models/Events");
const path = require("path");
 const Profile = require("../models/AdminProfile");
 const User = require("../models/User");

 
exports.newEvent = async (req, res) => {
  try {
    const { title, game, date, time, description, prizePool, rules } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

    if (
      !title ||
      !game ||
      !date ||
      !time ||
      !description ||
      !image ||
      !prizePool ||
      !rules
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = new Events({
      title,
      game,
      date,
      time,
      description,
      image,
      prizePool,
      rules,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postedEvents = async (req, res) => {
  try {
    const events = await Events.find();
    res.status(200).json({ events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Events.findByIdAndDelete(id);
    if (!deletedEvent) {
      re.status(404).json({
        message: "Event not found!",
      });
    }
    res
      .status(200)
      .json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



 
 // POST: Create a new admin profile
 exports.createProfile = async (req, res) => {
   const {
     userId,
     username,
     fullName,
     bio,
     email,
     locationCity,
     locationCountry,
     phoneNumber,
     address,
   } = req.body;
 
   const profileImage = req.file ? `uploads/${req.file.filename}` : null;
 
   try {
     // Validate required fields
     if (!userId || !username || !email) {
       return res.status(400).json({ message: "userId, username, and email are required" });
     }
 
     // Fetch user details by userId
     const user = await User.findOne({userId}); // Using userId to find the user
     if (!user) {
       return res.status(404).json({ message: "User not found with the given userId" });
     }
 
     // Check if profile already exists
     const existingProfile = await Profile.findOne({ userId });
     if (existingProfile) {
       return res.status(409).json({ message: "Profile already exists for this user" });
     }
 
     // Fetch the user-related data you want to store in the profile schema
     const { role: role } = user;
 
     const newProfile = new Profile({
       username,
       fullName,
       bio,
       email,
       locationCity,
       locationCountry,
       phoneNumber,
       address,
       profileImage,
       userId,
       role
     });
 
     await newProfile.save();
     res.status(201).json({ message: 'Profile created successfully', adminprofile: newProfile });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Error creating profile' });
   }
 };
 
 
 // Get profile details
 exports.getProfile = async (req, res) => {
   try {
     const { userId } = req.params;
 
     // Validate if userId exists
     if (!userId) {
       return res.status(400).json({ message: "User ID is required" });
     }
 
     // Fetch the profile using the userId
     const profile = await Profile.findOne({ userId });
 
     // Check if profile exists
     if (!profile) {
       return res.status(404).json({ message: "Profile not found" });
     }
 
     // Return the profile data
     res.status(200).json(profile);
   } catch (error) {
     console.error("Error fetching profile for userId:", userId, "Error:", error);
     res.status(500).json({ message: "Server error" });
   }
 };
 
 
 
 // Example backend code for updating profile
 exports.updateProfile = async (req, res) => {
   const { userId } = req.params;
   const { username, fullName, bio, email, locationCity, locationCountry, phoneNumber, address } = req.body;
  //  const profileImage = req.file ? req.file.path : null;
   const profileImage = req.file ? `uploads/${req.file.filename}` : null;
   try {
     // Find the profile by userId
     const profile = await Profile.findOne({ userId });
     if (!profile) {
       return res.status(404).json({ message: "Profile not found for this user" });
     }
 
     // Update the profile fields
     if (username) profile.username = username;
     if (fullName) profile.fullName = fullName;
     if (bio) profile.bio = bio;
     if (email) profile.email = email;
     if (locationCity) profile.locationCity = locationCity;
     if (locationCountry) profile.locationCountry = locationCountry;
     if (phoneNumber) profile.phoneNumber = phoneNumber;
     if (address) profile.address = address;
     if (profileImage) profile.profileImage = profileImage;  // Update profile image if provided
 
     // Save the updated profile
     await profile.save();
 
     res.status(200).json({ message: 'Profile updated successfully', adminprofile: profile });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Error updating profile' });
   }
 };
 