const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const issueRoutes = require('./routes/issueRoutes');
const pollRoutes = require('./routes/pollRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

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

let announcements = []; // Store announcements in memory (replace with DB in production)

// Route for posting announcements
app.post('/announce', (req, res) => {
    const { text } = req.body; // Destructure text from request body
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' }); // Send error response if text is missing
    }

    const announcement = {
        id: Date.now().toString(), // Generate a unique ID based on timestamp
        text,
        timestamp: new Date()
    };
    announcements.push(announcement);
    io.emit('announcement', announcement); // Send the new announcement to all connected clients
    res.status(201).json(announcement); // Send the created announcement in response
});

// Socket.io connection handling
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

  // Emit existing announcements to new connections
  socket.emit('initialAnnouncements', announcements);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
server.listen(4000, () => {
  console.log('listening on: 4000');
});
