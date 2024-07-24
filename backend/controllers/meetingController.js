// controllers/meetingsController.js
const { google } = require('googleapis');
const credentials = require('../credentials/calender.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const calendar = google.calendar('v3');

const getAuthClient = () => {
    const { client_id, client_secret, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials({
        refresh_token: '1//0gHMFQaDwK8F3CgYIARAAGBASNwF-L9IrkX2hHiwTku2cvfZ5dsFzjwqSEO6XIW3CHv4Xhqr8i9HIL1PCC7lkDNA_s3Fsi0XBMMk', // Ensure you have a valid refresh token
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
        console.log('Fetched events:', events); 
        const events = response.data.items.map(event => ({
            id: event.id,
            summary: event.summary,
            start: event.start.dateTime,
            joinLink: event.hangoutLink,
        }));
        console.error('Error fetching meetings:', error);
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).send('Error fetching meetings');
    }
};

module.exports = { listMeetings };
