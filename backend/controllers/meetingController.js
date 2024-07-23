// controllers/meetingsController.js
const { google } = require('googleapis');
const credentials = require('../credentials/googleCredentials.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const calendar = google.calendar('v3');

const getAuthClient = () => {
    const { client_id, client_secret, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials({
        refresh_token: 'YOUR_REFRESH_TOKEN', // Ensure you have a valid refresh token
    });
    return oAuth2Client;
};

const listMeetings = async (req, res) => {
    try {
        const auth = getAuthClient();
        const response = await calendar.events.list({
            auth,
            calendarId: 'primary', // or the calendar ID you are targeting
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items.map(event => ({
            id: event.id,
            summary: event.summary,
            start: event.start.dateTime,
            joinLink: event.hangoutLink,
        }));

        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).send('Error fetching meetings');
    }
};

module.exports = { listMeetings };
