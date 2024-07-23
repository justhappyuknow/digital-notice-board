const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route to create a new meeting
router.post('/', meetingController.createMeeting);

// Route to get meeting details
router.get('/:meetingId', meetingController.getMeetingDetails);


module.exports = router;