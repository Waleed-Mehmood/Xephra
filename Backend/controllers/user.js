const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
const Events = require("../models/Events");
const { default: mongoose } = require("mongoose");
const Participant = require("../models/Participant");
const ChatGroup = require("../models/ChatGroup");
const MessageModel = require("../models/Message");
const AdminChat = require("../models/AdminChatGroup");
const AdminMessageModel = require("../models/AdminMessage");

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
    favoriteGames,
  } = req.body;

  const profileImage = req.file ? `uploads/${req.file.filename}` : null;

  try {
    // Validate required fields
    if (!userId || !username || !email) {
      return res
        .status(400)
        .json({ message: "userId, username, and email are required" });
    }

    // Fetch user details by userId
    const user = await User.findOne({ userId }); // Using userId to find the user
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with the given userId" });
    }

    // Check if profile already exists
    const existingProfile = await UserProfile.findOne({ userId });
    if (existingProfile) {
      return res
        .status(409)
        .json({ message: "Profile already exists for this user" });
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
      role,
    });

    await newProfile.save();
    res.status(201).json({
      message: "Profile created successfully",
      userprofile: newProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating profile" });
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
    console.error(
      "Error fetching profile for userId:",
      userId,
      "Error:",
      error
    );
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    username,
    fullName,
    bio,
    email,
    locationCity,
    locationCountry,
    phoneNumber,
    address,
    age,
    favoriteGames,
  } = req.body;
  // const profileImage = req.file ? req.file.path : null;
  const profileImage = req.file ? `uploads/${req.file.filename}` : null;

  try {
    // Find the profile by userId
    const profile = await UserProfile.findOne({ userId });
    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found for this user" });
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
    if (profileImage) profile.profileImage = profileImage; // Update profile image if provided

    // Save the updated profile
    await profile.save();

    res
      .status(200)
      .json({ message: "Profile updated successfully", userprofile: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating profile" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password -resetPasswordExpires -resetPasswordToken")
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndDelete({ userId: userId });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "User deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    user.isSuspended = !user.isSuspended;
    await user.save();
    res.status(200).json({
      mesage: user.isSuspended
        ? "User suspended successfully"
        : "User unsuspended successfully",
      isSuspended: user.isSuspended,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserProfile.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        message: "User profile not found!",
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while retrieving the user profile",
      error,
    });
  }
};

exports.upcomingEvents = async (req, res) => {
  try {
    const events = await Events.find();
    res.status(200).json({ events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.joinEvent = async (req, res) => {
//   try {
//     const { userId, eventId } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(eventId)) {
//       return res.status(400).json({
//         message: "Invalid eventId format",
//       });
//     }

//     const existingParticipant = await Participant.findOne({
//       userId,
//       eventId,
//     });

//     if (existingParticipant) {
//       return res.status(400).json({
//         message: "User already registered for this event!",
//       });
//     }

//     const participant = new Participant({ userId, eventId });
//     await participant.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       participant,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error,
//     });
//   }
// };

exports.joinEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        message: "Invalid eventId format",
      });
    }

    const existingParticipant = await Participant.findOne({
      userId,
      eventId,
    });

    if (existingParticipant) {
      return res.status(400).json({
        message: "User already registered for this event!",
      });
    }

    const participant = new Participant({ userId, eventId });
    await participant.save();
    const event = await Events.findById(eventId);
    console.log(event);
    if (!event || !event.chatGroupId) {
      console.error(`Event not found or no chatGroupId for event: ${eventId}`);
      return res
        .status(500)
        .json({ message: "Chat group information not found!" });
    }
    const chatGroup = await ChatGroup.findById(event.chatGroupId);

    if (!chatGroup) {
      console.error(`Chat group not found with ID: ${event.chatGroupId}`);
      return res.status(500).json({ message: "Chat group not found!" });
    }

    // Convert IDs to strings for consistent comparison
    const userIdStr = userId.toString();
    const chatGroupUserIds = chatGroup.users.map((id) => id.toString());

    // Add user to chat group if not already a member
    if (!chatGroupUserIds.includes(userIdStr)) {
      chatGroup.users.push(userId);
      await chatGroup.save();
    }

    res.status(201).json({
      message: "User registered successfully and added to chat group",
      participant,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chatGroupId } = req.params;

    const messages = await MessageModel.find({
      chatGroupId: new mongoose.Types.ObjectId(chatGroupId),
    })
      .sort({ createdAt: 1 }) // Oldest messages first for proper chronological display
      .limit(100); // Limit to prevent overwhelming the client

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Add endpoint to fetch older messages (for pagination)
exports.getOlderMessages = async (req, res) => {
  try {
    const { chatGroupId } = req.params;
    const { before } = req.query; // timestamp or message ID to get messages before

    let query = { chatGroupId: new mongoose.Types.ObjectId(chatGroupId) };

    // If 'before' parameter is provided, add it to the query
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    const messages = await MessageModel.find(query)
      .sort({ createdAt: -1 }) // Latest first
      .limit(20) // Fetch 20 messages per request
      .sort({ createdAt: 1 }); // Then sort back to oldest first for client display

    const hasMore = messages.length === 20;

    res.status(200).json({ messages, hasMore });
  } catch (error) {
    console.error("Error fetching older messages:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getAdminUserChatGroups = async (req, res) => {
  try {
    const { userId } = req.query;  

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find chat group where the admin has the given userId
    const privateChat = await AdminChat.findOne({ userId: userId });  // ✅ Await the query

    if (!privateChat) {
      return res.status(404).json({ message: "Chat group not found" });
    }

    return res.status(200).json({ privateChat, message: "Chat groups fetched successfully" });
  } catch (error) {
    console.error("Error fetching user chat groups:", error);
    return res.status(500).json({ message: "Failed to fetch chat groups", error: error.message });
  }
};


exports.getUserChatGroups = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // Find all participants entries for this user
    const participants = await Participant.find({ userId });

    if (!participants.length) {
      return res.status(200).json({
        chatGroups: [],
        message: "User is not participating in any events",
      });
    }

    // Get all event IDs the user is participating in
    const eventIds = participants.map((participant) => participant.eventId);

    // Find all events with these IDs to get their chat group IDs
    const events = await Events.find({ _id: { $in: eventIds } });

    const chatGroupIds = events
      .filter((event) => event.chatGroupId)
      .map((event) => event.chatGroupId);

    // Find all chat groups
    const chatGroups = await ChatGroup.find({ _id: { $in: chatGroupIds } });

    return res.status(200).json({
      chatGroups,
      message: "Chat groups fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user chat groups:", error);
    return res.status(500).json({
      message: "Failed to fetch chat groups",
      error: error.message,
    });
  }
};
exports.getEvents = async (req, res) => {
  try {
    const { userId } = req.body;
    const events = await Participant.find({ userId }).populate("eventId");
    res.status(200).json({
      events,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get only hosted events
exports.getHostedEvents = async (req, res) => {
  try {
    const hostedEvents = await Events.find({ hosted: true });
    res.status(200).json(hostedEvents);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getProfileExisting = async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await UserProfile.findOne({ userId });

    if (userProfile) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
