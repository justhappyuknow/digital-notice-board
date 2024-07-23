const express = require('express');
const { submitIssue } = require('../controllers/issueController');
const router = express.Router();

router.post('/submit', submitIssue);

module.exports = router;
