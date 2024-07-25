const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Load OAuth 2.0 credentials for each service
const calendarCredentialsPath = path.join(__dirname, 'credentials/calendar.json');
const sheetsCredentialsPath = path.join(__dirname, 'credentials/sheets.json');

// Load credentials from files
const calendarCredentials = JSON.parse(fs.readFileSync(calendarCredentialsPath, 'utf-8'));
const sheetsCredentials = JSON.parse(fs.readFileSync(sheetsCredentialsPath, 'utf-8'));

// Extract OAuth 2.0 credentials for Calendar and Sheets
const { client_secret: calendarClientSecret, client_id: calendarClientId, redirect_uris: calendarRedirectUris } = calendarCredentials.web;
const { client_secret: sheetsClientSecret, client_id: sheetsClientId, redirect_uris: sheetsRedirectUris } = sheetsCredentials;

// Configure OAuth2 client with Calendar credentials
const oAuth2Client = new google.auth.OAuth2(calendarClientId, calendarClientSecret, calendarRedirectUris[0]);

// Define scopes for Calendar, Sheets, and Meet
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',   // Calendar API
  'https://www.googleapis.com/auth/spreadsheets' // Sheets API
  // Google Meet scopes are included within Calendar API
];

// Generate an authentication URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);

// After visiting the URL and granting access, you will receive an authorization code
const code = '4/0AcvDMrASVJHppsEy8jayYem8Zyy8zSqMQAjwVH302E_KkxlBwbVB0OpI3plWR9L7fdH2oQ'; // <-- Replace this line with the authorization code

async function getAccessToken() {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    // Save tokens to a file
    const tokenPath = path.join(__dirname, 'credentials/tokens.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));
    console.log(`Tokens saved to ${tokenPath}`);
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
}

getAccessToken();
