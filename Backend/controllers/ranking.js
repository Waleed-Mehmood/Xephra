const express = require("express");
const UserSubmission = require("../models/UserSubmission");
const eventRankingBoard = require("../models/EventRankingBoard");

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

    if(!event){
      event = new eventRankingBoard({
        eventId,
        ranking: [],
      });
    };

    const existingRank = event.rankings.find((r)=> r.rank === newRank);
    if(existingRank){
      return res.status(200).json({
        message: "rank found same"
      })
    }

    
    res.status(200).json({
      message:"event not found same"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
