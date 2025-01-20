const express = require("express");
const Events = require("../models/Events");
const path = require("path");
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
    const {id} = req.params;
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
