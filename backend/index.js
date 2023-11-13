const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
// const soccerData = require("./scrape/soccer");

const app = express();

const server = http.createServer(app);
// const server = 'https://ba43-188-43-253-77.ngrok-free.app/'
const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:3000", // Replace with the actual domain of your frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json()); // Add body parsing middleware

// receive data from circket script using ajax
app.post('/cricketdata', (req, res) => {
  const reqdata = req.body;
  console.log("cricket realtime-data >>> ", reqdata);
  // Define your socket.io event handlers
  io.emit("cricket-receive-data", reqdata); // Emit data to the client

});

// receive data from soccer script using ajax
app.post('/soccerdata', (req, res) => {
  const reqdata = req.body;
  console.log("soccer realtime-data >>> ", reqdata);
  // Define your socket.io event handlers
  io.emit("soccer-receive-data", reqdata); // Emit data to the client

});

// receive data from tennis script using ajax
app.post('/tennisdata', (req, res) => {
  const reqdata = req.body;
  console.log("tennis realtime-data >>> ", reqdata);
  // Define your socket.io event handlers
  io.emit("tennis-receive-data", reqdata); // Emit data to the client

});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Define your API route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log("username >>> ", username);
  console.log("password >>> ", password);
  res.send({ data: username });
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
