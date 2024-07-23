const { google } = require('googleapis');
const path = require('path');

// Load the service account credentials
const KEYFILEPATH = path.join(__dirname, '../credentials/gmeet.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar']; // Adjust scopes as necessary

// Create a JWT client
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const calendar = google.calendar({ version: 'v3', auth });

const createMeeting = async (req, res) => {
  const { summary, startTime, endTime } = req.body;

  const event = {
    summary: summary || 'Google Meet Meeting',
    start: {
      dateTime: startTime,
      timeZone: 'America/Los_Angeles', // Adjust as necessary
    },
    end: {
      dateTime: endTime,
      timeZone: 'America/Los_Angeles', // Adjust as necessary
    },
    conferenceData: {
      createRequest: {
        requestId: 'some-random-string', // Generate a unique request ID
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    res.status(201).json({
      meetingLink: response.data.hangoutLink,
      meetingId: response.data.id,
      startTime: response.data.start.dateTime,
    });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMeetingDetails = async (req, res) => {
  const { meetingId } = req.params;

  try {
    const response = await calendar.events.get({
      calendarId: 'primary',
      eventId: meetingId,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching meeting details:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMeeting,
  getMeetingDetails,
};