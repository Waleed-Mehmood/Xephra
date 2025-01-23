 const UserProfile = require("../models/UserProfile");
 const User = require("../models/User");

// POST: Create a new user profile
exports.createProfile = async (req, res) => {
  const {
    userId,
    username,
    fullName,
    bio,
    email,
    phoneNumber,
    address,
    age,
    locationCity,
    locationCountry,
    favoriteGames
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
    const existingProfile = await UserProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(409).json({ message: "Profile already exists for this user" });
    }

    // Fetch the user-related data you want to store in the profile schema
    const { role } = user;

    // Parse the favoriteGames if it's a string (sent from frontend as stringified JSON)
    let parsedFavoriteGames = favoriteGames;
    if (favoriteGames && typeof favoriteGames === "string") {
      parsedFavoriteGames = JSON.parse(favoriteGames); // Parse it back into an array
    }

    const newProfile = new UserProfile({
      username,
      fullName,
      bio,
      email,
      locationCity,
      locationCountry,
      phoneNumber,
      address,
      age,
      favoriteGames: parsedFavoriteGames, // Use parsed favoriteGames here
      profileImage,
      userId,
      role
    });

    await newProfile.save();
    res.status(201).json({ message: 'Profile created successfully', userprofile: newProfile });
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
     const profile = await UserProfile.findOne({ userId });
 
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
 

exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, fullName, bio, email, locationCity, locationCountry, phoneNumber, address, age, favoriteGames } = req.body;
  // const profileImage = req.file ? req.file.path : null;
  const profileImage = req.file ? `uploads/${req.file.filename}` : null;
  
  try {
    // Find the profile by userId
    const profile = await UserProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found for this user" });
    }

    // Parse the favoriteGames if it's a string (sent from frontend as stringified JSON)
    if (favoriteGames && typeof favoriteGames === "string") {
      profile.favoriteGames = JSON.parse(favoriteGames); // Parse it back into an array
    } else {
      profile.favoriteGames = favoriteGames; // If already an array, just assign it
    }

    // Update other profile fields
    if (username) profile.username = username;
    if (fullName) profile.fullName = fullName;
    if (bio) profile.bio = bio;
    if (email) profile.email = email;
    if (locationCity) profile.locationCity = locationCity;
    if (locationCountry) profile.locationCountry = locationCountry;
    if (phoneNumber) profile.phoneNumber = phoneNumber;
    if (address) profile.address = address;
    if (age) profile.age = age;
    if (profileImage) profile.profileImage = profileImage;  // Update profile image if provided

    // Save the updated profile
    await profile.save();

    res.status(200).json({ message: 'Profile updated successfully', userprofile: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select(
      "-password -resetPasswordExpires -resetPasswordToken"
    ).sort({createdAt: -1});

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });

  }
};
