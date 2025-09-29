const { google } = require("googleapis");
const sheets = google.sheets("v4");

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function appendEntry(entry) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();

  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:E",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [[
      new Date().toISOString(),
      entry.name || "",
      entry.email || "",
      entry.entryType || "",
      entry.notes || ""
    ]]},
    auth: client,
  };

  await sheets.spreadsheets.values.append(request);
}

exports.appendEntry = appendEntry;
