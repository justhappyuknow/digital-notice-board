let pollData = {
  question: 'What is your favorite programming language?',
  options: [
      { option: 'JavaScript', votes: 0 },
      { option: 'Python', votes: 0 },
      { option: 'Java', votes: 0 },
      { option: 'C++', votes: 0 }
  ]
};

exports.getPollData = (req, res) => {
  res.json(pollData);
};

exports.vote = (req, res) => {
  const { optionIndex } = req.body;
  if (optionIndex >= 0 && optionIndex < pollData.options.length) {
      pollData.options[optionIndex].votes += 1;
      res.status(200).json(pollData);
  } else {
      res.status(400).json({ error: 'Invalid option index' });
  }
};

exports.updatePoll = (req, res) => {
  const { question, options } = req.body;
  if (question && Array.isArray(options) && options.length > 0) {
      pollData = { question, options: options.map(option => ({ option, votes: 0 })) };
      res.status(200).json(pollData);
  } else {
      res.status(400).json({ error: 'Invalid data' });
  }
};
