const express = require('express');
const { getPollData, vote, updatePoll } = require('../controllers/pollController');
const router = express.Router();

router.get('/', getPollData);
router.post('/vote', vote);
router.post('/update', updatePoll); // New route for updating poll

module.exports = router;

