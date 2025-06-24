const {Server}= require('socket.io')
const http = require('http');
const express = require('express');
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server , {
  cors: {
    origin: "https://messanger-v0g3.onrender.com",
    methods: ["GET", "POST"],
  }
});
const users = {};
function getReceiverSocketId(receiverId) {
  return users[receiverId]; 
}
io.on("connection", (socket) => {
  console.log("A new User connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Users currently connected:", users);
  }
  io.emit("getOnlineUsers", Object.keys(users));
  socket.on("disconnect", () => {
    console.log('Client disconnected, socket id:', socket.id);

    delete users[userId];
    io.emit("getOnlineUsers",Object.keys(users));
  });
});

module.exports = { app, io, server,getReceiverSocketId}
