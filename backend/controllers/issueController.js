const { google } = require('googleapis');
const keys = require('../credentials/sheets.json');

const auth = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key.replace(/\\n/g, '\n'), // Fix newline characters
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

exports.submitIssue = async (req, res) => {
  try {
    const { name, email, issue } = req.body;
    const spreadsheetId = '1LprIAUdMW9AHH8bgoILVykA_5HZ3NsFNTWuYlBesgr0'; // Your spreadsheet ID
    const sheetName = 'Sheet1'; // Sheet name
    const values = [[name, email, issue]]; // Data to be appended

    const resource = {
      values,
    };

    const range = `${sheetName}!A:C`;
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource,
    });

    res.status(200).json({ message: 'Issue submitted successfully' });
  } catch (error) {
    console.error('Error submitting issue:', error);
    res.status(500).json({ error: 'Failed to submit issue' });
  }
};
