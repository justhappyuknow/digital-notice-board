const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load client secrets from a local file
const credentials = require('../credentials/calendar.json');
const TOKEN_PATH = path.join(__dirname, '../credentials/token.json');

// Create an OAuth2 client with the given credentials
const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Function to list calendar events
const listEvents = async (req, res) => {
    try {
        // Load the token from file
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
        
        // Set the credentials using the loaded token
        oAuth2Client.setCredentials({
            access_token: token.access_token,
            refresh_token: token.refresh_token
        });

        // Fetch events from Google Calendar
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            showDeleted: false,
            singleEvents: true,
            orderBy: 'startTime',
        });

        res.json(response.data.items);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
};

// Export functions
module.exports = {
    listEvents,
};
