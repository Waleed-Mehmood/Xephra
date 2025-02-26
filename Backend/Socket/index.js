const { Server } = require("socket.io");
const MessageModel = require("../models/Message");

const socketSetup = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", async ({ chatGroupId, message }) => {
        console.log("Received message:", message);
    
        // Save message in MongoDB
        // const newMessage = new MessageModel({
        //   chatGroupId,
        //   senderId: message.senderId,
        //   text: message.text,
        //   time: message.time,
        // });
        // await newMessage.save();
    
        // Broadcast message to all users in the group
        io.to(chatGroupId).emit("receiveMessage", message);
      });


      socket.on("joinChat", (chatGroupId) => {
        socket.join(chatGroupId);
        console.log(`User joined chat: ${chatGroupId}`);
      });
      
    

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketSetup; 
