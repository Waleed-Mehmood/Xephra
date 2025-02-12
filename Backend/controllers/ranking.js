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
        ranking: [],
      });
    }

    let points = 0;
    if (newRank === 1) points = 100;
    else if (newRank === 2) points = 80;
    else if (newRank === 3) points = 60;
    else points = 40;

    const existingRank = event.rankings.find((r) => r.rank === newRank);
    if (existingRank) {
      event.rankings = event.rankings.map((r) =>
        r.rank >= newRank ? { ...r, rank: r.rank + 1 } : r
      );
    }

    const userIndex = event.rankings.findIndex(
      (r) => r.userId.toString() === userId
    );
    if (userIndex >= 0) {
      event.rankings[userIndex] = { userId, rank: newRank, score };
    } else {
      event.rankings.push({
        userId,
        rank: newRank,
        score,
      });
    }
    event.rankings.sort((a, b) => a.rank - b.rank);

    await event.save();

    let userStats = await UserEventStats.findOne({ userId });

    if (!userStats) {
      userStats = new UserEventStats({
        userId,
        totalPoints: points,
        totalEvents: 1,
        averagePoints: points,
        weightedScore: points + 5 * 1,
      });
    } else {
      userStats.totalPoints += points;
      userStats.totalEvents += 1;
      userStats.weightedScore = userStats.totalPoints + (5* userStats.totalEvents);
      userStats.averagePoints = (
        userStats.totalPoints / userStats.totalEvents
      ).toFixed(2);
    }

    await userStats.save();

    res.status(200).json({
      message: "Rank Assigned and Stats Updated Successfully",
      data: event,
      userStats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
