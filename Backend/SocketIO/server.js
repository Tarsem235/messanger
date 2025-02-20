const {Server}= require('socket.io')
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server , {
  cors: {
    origin: "http://localhost:4001", // Your client-side URL
    methods: ["GET", "POST"],
  }
});


// Object to keep track of users and their socket ids
const users = {};

// Function to get the socket ID for a receiver user
function getReceiverSocketId(receiverId) {
  return users[receiverId];  // Return the socket ID for the receiver
}

io.on("connection", (socket) => {
  console.log("A new User connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    // Add the userId and their socket id to the users object
    users[userId] = socket.id;
    console.log("Users currently connected:", users);
  }
  io.emit("getOnlineUsers", Object.keys(users));

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log('Client disconnected, socket id:', socket.id);

    delete users[userId];
    io.emit("getOnlineUsers",Object.keys(users));
  });
});

module.exports = { app, io, server,getReceiverSocketId}
