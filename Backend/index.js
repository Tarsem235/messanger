const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path')
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const messageRoutes = require('./routes/message.route.js');
const bodyParser = require('body-parser');
const { app, server, io } = require('./SocketIO/server.js');

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const mongoURL = process.env.MONGODB_URI;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
app.use('/api/api', userRoutes);
app.use('/api/message', messageRoutes);

// *********************code for deployment*********************
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "./Frontend/dist", 'index.html'));
  });
}



// Server listening on port
const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
