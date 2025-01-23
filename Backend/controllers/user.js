const express = require("express");
const User = require("../models/User");
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
