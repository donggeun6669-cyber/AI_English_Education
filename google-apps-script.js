/**
 * Help Animals Find Their Way Home! - Game Results Logger
 * Google Apps Script for saving game play statistics to Google Sheets.
 *
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1au5zCSvTkoKKlQ456FVSngFM6o2yXJmpxKEobUFUoqo/edit?usp=sharing
 * Target Sheet: First sheet ("시트1")
 * Columns (Row 1):
 *   A: timestamp
 *   B: nickname
 *   C: play_count
 *   D: correct_count
 *   E: wrong_count
 */

const SPREADSHEET_ID = "1au5zCSvTkoKKlQ456FVSngFM6o2yXJmpxKEobUFUoqo";
const SHEET_NAME = "시트1";

function doPost(e) {
  try {
    // 1. Validate postData
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No post data received"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Parse JSON payload
    var data = JSON.parse(e.postData.contents);

    // 3. Open Spreadsheet and target sheet (works both bound to container or standalone)
    var spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (err) {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    }

    var sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];

    // 4. Ensure header row exists if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["timestamp", "nickname", "play_count", "correct_count", "wrong_count"]);
    }

    // 5. Prepare values
    var timestamp = data.timestamp;
    if (!timestamp) {
      var now = new Date();
      timestamp = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    }

    var nickname = (data.nickname !== undefined && data.nickname !== null)
      ? String(data.nickname).trim().slice(0, 20)
      : "Guest";
    if (!nickname) {
      nickname = "Guest";
    }

    var playCount = (data.play_count !== undefined && data.play_count !== null) ? Number(data.play_count) : 1;
    var correctCount = (data.correct_count !== undefined && data.correct_count !== null) ? Number(data.correct_count) : 0;
    var wrongCount = (data.wrong_count !== undefined && data.wrong_count !== null) ? Number(data.wrong_count) : 0;

    // 6. Append single row (nickname is column B)
    sheet.appendRow([
      timestamp,
      nickname,
      playCount,
      correctCount,
      wrongCount
    ]);

    // 7. Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row appended successfully",
      saved: {
        timestamp: timestamp,
        nickname: nickname,
        play_count: playCount,
        correct_count: correctCount,
        wrong_count: wrongCount
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function to verify sheet connection and append a row directly from Apps Script editor
 */
function testAppend() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss"),
        nickname: "BlueTiger",
        play_count: 1,
        correct_count: 8,
        wrong_count: 2
      })
    }
  };
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
