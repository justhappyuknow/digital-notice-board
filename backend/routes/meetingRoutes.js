// routes/meetingsRoutes.js
const express = require('express');
const { listMeetings } = require('../controllers/meetingsController');

const router = express.Router();

router.get('/meetings', listMeetings);

module.exports = router;
