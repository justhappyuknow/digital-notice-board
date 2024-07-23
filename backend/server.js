const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const issueRoutes = require('./routes/issueRoutes');
const pollRoutes = require('./routes/pollRoutes');
const meetingRoutes  = require('./routes/meetingRoutes')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Define pollData globally
let pollData = {
  question: 'What is your favorite programming language?',
  options: [
    { option: 'JavaScript', votes: 0 },
    { option: 'Python', votes: 0 },
    { option: 'Java', votes: 0 },
    { option: 'C++', votes: 0 }
  ]
};

app.use(cors());
app.use(express.json()); // for parsing application/json

// Set up routes
app.use('/api/issues', issueRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/meetings', meetingRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Emit initial poll data to new connections
  socket.emit('pollData', pollData);

  // Handle votes
  socket.on('vote', (optionIndex) => {
    if (optionIndex >= 0 && optionIndex < pollData.options.length) {
      pollData.options[optionIndex].votes += 1;
      io.emit('pollData', pollData); // Send updated poll data to all clients
    } else {
      console.error('Invalid option index:', optionIndex);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('listening on: 4000');
});
