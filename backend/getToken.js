const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Load client secrets from a local file
const credentialsPath = path.join(__dirname, 'credentials/announcements.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

if (!credentials || !credentials.web) {
  console.error('Credentials are not loaded correctly.');
  process.exit(1);
}

const { client_secret, client_id, redirect_uris } = credentials.web;

if (!redirect_uris || redirect_uris.length === 0) {
  console.error('Redirect URIs are not defined in the credentials.');
  process.exit(1);
}

// Configure OAuth2 client
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Generate an authentication URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);

// After visiting the URL and granting access, you will receive an authorization code
// Replace `YOUR_NEW_AUTH_CODE` with the code you received
const code = '4/0AcvDMrCUE9HiMx16drSdQVvp1pWWKCWRFvtOtZG8fQmf7uy6SC8SFxqpw7QHjojsIWJrzA';  // <-- Replace this line

async function getAccessToken() {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    // Save tokens to a file
    const tokenPath = path.join(__dirname, 'credentials/token2.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));
    console.log(`Tokens saved to ${tokenPath}`);
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
}

getAccessToken();
