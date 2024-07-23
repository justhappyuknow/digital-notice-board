const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// Route to list events
router.get('/events', calendarController.listEvents);

module.exports = router;
