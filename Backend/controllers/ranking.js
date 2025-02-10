const express = require("express");
const UserSubmission = require("../models/UserSubmission");

exports.postRankingApproval = async (req, res) => {
  try {
    const { eventId, userId, rank, score } = req.body;
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
