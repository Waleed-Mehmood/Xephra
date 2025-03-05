  const { Server } = require("socket.io");
  const MessageModel = require("../models/Message");

  const socketSetup = (server) => {
    const io = new Server(server, {
      cors: {
        origin: "https://xephra.net", // Update with your frontend URL
        methods: ["GET", "POST"],
        credentials: true
      },
    });

    // Keep track of online users
    const activeUsers = new Map();
    const userSockets = new Map();

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Handle sending messages
      socket.on("sendMessage", async ({ chatGroupId, message }) => {
        try {
          console.log("Received message for chat:", chatGroupId);
          
          // Save message in MongoDB
          const newMessage = new MessageModel({
            chatGroupId,
            senderId: message.senderId,
            text: message.text,
            time: message.time,
          });
          
          const savedMessage = await newMessage.save();
          console.log("Message saved:", savedMessage._id);
          
          // Add chatGroupId to the message for proper routing
          const messageToSend = {
            ...message,
            chatGroupId,
            _id: savedMessage._id
          };
          
          // Broadcast message to all users in the chat group including sender
          io.to(chatGroupId).emit("receiveMessage", messageToSend);
        } catch (error) {
          console.error("Error handling message:", error);
          // Send error back to the client
          socket.emit("messageError", { error: "Failed to save message" });
        }
      });

      // Handle joining chat groups
      socket.on("joinChat", (chatGroupId) => {
        if (!chatGroupId) {
          console.error("Invalid chatGroupId");
          return;
        }
        
        // Leave previous rooms (optional, depends on your app's requirements)
        socket.rooms.forEach(room => {
          if (room !== socket.id) {
            socket.leave(room);
          }
        });
        
        // Join the new chat room
        socket.join(chatGroupId);
        console.log(`User ${socket.id} joined chat: ${chatGroupId}`);
      });

      // Handle user disconnection
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        
        // Clean up when user disconnects
        if (userSockets.has(socket.id)) {
          const userId = userSockets.get(socket.id);
          activeUsers.delete(userId);
          userSockets.delete(socket.id);
        }
      });
    });

    return io;
  };

  module.exports = socketSetup;