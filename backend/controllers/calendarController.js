const { google } = require('googleapis');
const keys = require('../credentials/calendar.json');

const auth = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

const calendar = google.calendar({ version: 'v3', auth });

exports.getUpcomingMeetings = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now,
      timeMax: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // next 24 hours
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items.map(event => ({
      summary: event.summary,
      start: event.start.dateTime || event.start.date,
      htmlLink: event.htmlLink,
    }));

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
};
