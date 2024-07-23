const express = require('express');
const { getPollData, vote } = require('../controllers/pollController');
const router = express.Router();

router.get('/', getPollData);
router.post('/vote', vote);

module.exports = router;
