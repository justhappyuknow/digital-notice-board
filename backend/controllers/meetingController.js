const { google } = require('googleapis');
const credentials = require('../credentials/calendar.json');
const fs = require('fs');
const path = require('path');

const TOKEN_PATH = path.join(__dirname, '../credentials/token.json');

const getAuthClient = () => {
    const { client_id, client_secret, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Load the token from file
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);

    return oAuth2Client;
};

const listMeetings = async (req, res) => {
    try {
        const auth = getAuthClient();
        const calendar = google.calendar({ version: 'v3', auth });

        const response = await calendar.events.list({
            calendarId: 'primary', // Use 'primary' for the authenticated user's primary calendar
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items.map(event => ({
            id: event.id,
            summary: event.summary,
            start: event.start.dateTime || event.start.date, // Handle both date and dateTime formats
            end: event.end.dateTime || event.end.date, // Handle both date and dateTime formats
            joinLink: event.hangoutLink || 'No link available', // Fallback message if no link is available
        }));

        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).send('Error fetching meetings');
    }
};

module.exports = { listMeetings };
