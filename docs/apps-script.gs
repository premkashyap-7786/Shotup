/**
 * Shotup.in — Contact Form → Google Sheets + Email Notification
 *
 * SETUP INSTRUCTIONS (one-time, done under the client's Google account):
 *
 * 1. Create a new Google Sheet (e.g. "Shotup Inquiries") under the account
 *    that should receive notifications (premkashyap7786@gmail.com).
 * 2. Add a header row to the first sheet/tab:
 *      Timestamp | Name | Email | Message
 * 3. Open Extensions → Apps Script from the Sheet's menu.
 * 4. Delete any boilerplate code and paste this entire file's contents in.
 * 5. Update NOTIFY_EMAIL below if a different inbox should receive alerts.
 * 6. Click Deploy → New deployment.
 *      - Select type: "Web app"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 * 7. Authorize the requested permissions (Sheets + Gmail access) when prompted.
 * 8. Copy the resulting Web App URL (ends in /exec) — this is the value for
 *    VITE_CONTACT_FORM_ENDPOINT in the website's .env file.
 * 9. Test by sending a POST request to that URL (see TESTING section below)
 *    before wiring it into the live site.
 *
 * MAINTENANCE NOTE: If this script is ever edited and re-deployed, you must
 * create a "New deployment" (or manage versions) for changes to take effect
 * on the existing URL — saving alone does not update a live deployment.
 */

const NOTIFY_EMAIL = 'premkashyap7786@gmail.com';

function doPost(e) {
  try {
    const data = parseRequestData(e);

    const name = (data.name || '').toString().trim();
    const email = (data.email || '').toString().trim();
    const message = (data.message || '').toString().trim();

    if (!name || !email || !message) {
      return jsonResponse({ success: false, error: 'Missing required fields.' });
    }

    appendToSheet(name, email, message);
    sendNotificationEmail(name, email, message);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function parseRequestData(e) {
  // Supports both JSON body (fetch with Content-Type: application/json / text-plain)
  // and traditional form-encoded POST (e.parameter).
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // Fall through to form params if body wasn't valid JSON.
    }
  }
  return e.parameter || {};
}

function appendToSheet(name, email, message) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), name, email, message]);
}

function sendNotificationEmail(name, email, message) {
  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const subject = 'New Inquiry from ' + name + ' — Shotup.in';

  const htmlBody =
    '<div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 10px; overflow: hidden;">' +
      '<div style="background: #111111; padding: 24px 28px; border-bottom: 3px solid #df1c1c;">' +
        '<span style="font-size: 20px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">SHOTUP</span>' +
        '<span style="display:inline-block; width:8px; height:8px; background:#df1c1c; margin-left:6px; vertical-align:middle;"></span>' +
        '<div style="font-size: 11px; color: #9ca3af; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px;">New Website Inquiry</div>' +
      '</div>' +
      '<div style="padding: 28px;">' +
        '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
          '<tr>' +
            '<td style="padding: 8px 0; color: #9ca3af; width: 90px; vertical-align: top;">Name</td>' +
            '<td style="padding: 8px 0; color: #ffffff; font-weight: 600;">' + escapeHtml(name) + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 8px 0; color: #9ca3af; vertical-align: top;">Email</td>' +
            '<td style="padding: 8px 0;"><a href="mailto:' + encodeURIComponent(email) + '" style="color: #df1c1c; text-decoration: none;">' + escapeHtml(email) + '</a></td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 8px 0; color: #9ca3af; vertical-align: top;">Message</td>' +
            '<td style="padding: 8px 0; color: #ffffff; white-space: pre-wrap;">' + escapeHtml(message) + '</td>' +
          '</tr>' +
        '</table>' +
        '<div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #262626;">' +
          '<a href="' + sheetUrl + '" style="display: inline-block; background: #ffffff; color: #0a0a0a; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 12px 20px; border-radius: 4px;">View All Inquiries →</a>' +
        '</div>' +
      '</div>' +
    '</div>';

  const plainBody =
    'New inquiry from ' + name + ' via shotup.in\n\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Message:\n' + message + '\n\n' +
    'View all inquiries: ' + sheetUrl;

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * TESTING:
 * After deployment, test with curl (replace YOUR_EXEC_URL):
 *
 *   curl -X POST "YOUR_EXEC_URL" \
 *     -H "Content-Type: text/plain;charset=utf-8" \
 *     -d '{"name":"Test User","email":"test@example.com","message":"Hello, this is a test."}'
 *
 * Note: Apps Script Web Apps often require Content-Type "text/plain" from
 * cross-origin fetch calls to avoid CORS preflight issues — the frontend
 * fetch call should match this (see src/pages/Contact.tsx).
 *
 * Expected result: a new row appears in the Sheet, and an email arrives at
 * premkashyap7786@gmail.com.
 */
