const express = require('express');
const { listMeetings } = require('../controllers/meetingController');

const router = express.Router();

router.get('/meetings', listMeetings);

module.exports = router;
