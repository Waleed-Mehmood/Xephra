const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chatGroupId: {
    type: String,
    //ref: "ChatGroup", // Reference to a Chat Group (if you have one)
    required: true,
  },
  senderId: {
    type: String,
    //ref: "User", // Reference to User
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
