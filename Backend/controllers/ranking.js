const express = require("express");
const UserSubmission = require("../models/UserSubmission");
const eventRankingBoard = require("../models/EventRankingBoard");
const UserEventStats = require("../models/userEventStats");

exports.postRankingApproval = async (req, res) => {
  try {
    const { eventId, userId, rank, score, gameName } = req.body;
    const screenshot = req.file ? `uploads/${req.file.filename}` : null;
    if (!eventId || !userId) {
      return res.status(400).json({
        message: "EventId and userId are required!",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Screenshot is required",
      });
    }

    const newSubmission = new UserSubmission({
      eventId,
      userId,
      gameName,
      rank: rank || null,
      score: score || null,
      screenshot,
      createdAt: Date.now(),
    });

    const savedSubmission = await newSubmission.save();

    res.status(200).json({
      message: "Submission created successfully",
      data: savedSubmission,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required!" });
    }

    const submissions = await UserSubmission.find({ userId });

    res.status(200).json({
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.userApprovalDelete = async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const result = await UserSubmission.findOneAndDelete({ userId, eventId });
    if (!result) {
      return res.status(404).json({
        message: "no submission found for the given user",
      });
    }
    res.status(200).json({
      message: "Submission deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.assignEventRanking = async (req, res) => {
  const { userId, eventId, newRank, score } = req.body;

  try {
    let event = await eventRankingBoard.findOne({ eventId });

    if (!event) {
      event = new eventRankingBoard({
        eventId,
        rankings: [],
      });
    }

    let points = calculatePoints(newRank);

    // Auto-increment ranks for existing users if the new rank conflicts
    const existingRank = event.rankings.find((r) => r.rank === newRank);
    if (existingRank) {
      event.rankings = event.rankings.map((r) =>
        r.rank >= newRank ? { ...r, rank: r.rank + 1 } : r
      );
    }

    // Check if the user already has a ranking
    const existingUserRank = event.rankings.find((r) => r.userId.toString() === userId);
    let oldPoints = 0;

    if (existingUserRank) {
      // Calculate old points before updating rank
      oldPoints = calculatePoints(existingUserRank.rank);

      // Update rank and score for the existing user
      existingUserRank.rank = newRank;
      existingUserRank.score = score;
    } else {
      // Add a new ranking entry for the user
      event.rankings.push({ userId, rank: newRank, score });
    }

    // Sort the rankings based on the new ranks
    event.rankings.sort((a, b) => a.rank - b.rank);
    await event.save();

    // Fetch or create user stats
    let userStats = await UserEventStats.findOne({ userId });

    if (!userStats) {
      // Create new stats record if none exists
      userStats = new UserEventStats({
        userId,
        totalPoints: points,
        totalEvents: 1,
        averagePoints: points,
        weightedScore: points + 5 * 1,
      });
    } else {
      // Adjust user stats with new points and remove old points
      userStats.totalPoints = userStats.totalPoints - oldPoints + points;
      userStats.weightedScore = userStats.totalPoints + 5 * userStats.totalEvents;
      userStats.averagePoints = (userStats.totalPoints / userStats.totalEvents).toFixed(2);
    }

    await userStats.save();

    res.status(200).json({
      message: "Rank Assigned and Stats Updated Successfully",
      data: event,
      userStats,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// Helper function to calculate points based on rank
function calculatePoints(rank) {
  switch (rank) {
    case 1: return 100;
    case 2: return 80;
    case 3: return 60;
    default: return 40;
  }
}

