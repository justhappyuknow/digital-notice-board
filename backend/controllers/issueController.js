const { google } = require('googleapis');
const keys = require('../credentials/sheets.json');

// Create an authenticated client using JWT
const auth = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key.replace(/\\n/g, '\n'), // Fix newline characters
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Create a Sheets API client
const sheets = google.sheets({ version: 'v4', auth });

exports.submitIssue = async (req, res) => {
  try {
    const { name, email, issue } = req.body;

    // Ensure required fields are present
    if (!name || !email || !issue) {
      return res.status(400).json({ error: 'All fields (name, email, issue) are required' });
    }

    // Your spreadsheet ID and sheet name
    const spreadsheetId = '1LprIAUdMW9AHH8bgoILVykA_5HZ3NsFNTWuYlBesgr0'; // Replace with your actual spreadsheet ID
    const sheetName = 'Sheet1'; // Replace with your actual sheet name
    const values = [[name, email, issue]]; // Data to be appended

    const resource = {
      values,
    };

    const range = `${sheetName}!A:C`;
    
    // Append data to the spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource,
    });

    res.status(200).json({ message: 'Issue submitted successfully' });
  } catch (error) {
    console.error('Error submitting issue:', error.message);
    res.status(500).json({ error: 'Failed to submit issue' });
  }
};
