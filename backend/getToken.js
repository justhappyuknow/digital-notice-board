const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// Load client secrets from a local file.
const credentials = require('./credentials/calendar.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = './credentials/token.json';

// Extract the client secret, client ID, and redirect URI from the credentials
const { client_secret, client_id, redirect_uris } = credentials.web;
const redirect_uri = redirect_uris[0];  // Use the first redirect URI from the credentials

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

// Generate the URL that will be used for authorization
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return;
        }
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to', TOKEN_PATH);
    });
});
