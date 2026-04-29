'use strict';

/**
 * Returns the HTML body for the waitlist confirmation email.
 * @param {{ name: string }} options
 */
function waitlistConfirmationHtml({ name }) {
  const displayName = name || 'there';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the Inua360 waitlist!</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background-color:#f8fafc;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- ── Card ── -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" role="presentation"
               style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(15,23,42,0.10);">

          <!-- ── Header ── -->
          <tr>
            <td style="background:#0f172a;padding:40px 48px 36px;text-align:center;">
              <!-- Orange accent line -->
              <div style="width:56px;height:4px;background:#F07B20;border-radius:2px;margin:0 auto 24px;"></div>
              <!-- Logo -->
              <h1 style="margin:0;font-size:30px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">
                Inua<span style="color:#F07B20;">360</span>
              </h1>
              <p style="margin:8px 0 0;font-size:11px;font-weight:600;color:#64748b;letter-spacing:2px;text-transform:uppercase;">
                AI Business Intelligence
              </p>
            </td>
          </tr>

          <!-- ── Confirmation badge ── -->
          <tr>
            <td style="background:linear-gradient(180deg,#0f172a 0%,#1e293b 100%);padding:0 48px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" border="0" role="presentation" align="center">
                <tr>
                  <td style="background:rgba(240,123,32,0.12);border:1px solid rgba(240,123,32,0.35);border-radius:100px;padding:8px 20px;">
                    <span style="font-size:13px;font-weight:600;color:#F07B20;letter-spacing:0.5px;">&#10003;&nbsp; Waitlist Confirmed</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="padding:44px 48px 32px;">

              <h2 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#0f172a;line-height:1.3;">
                You're in, ${displayName}! &#127881;
              </h2>

              <p style="margin:0 0 20px;font-size:16px;color:#334155;line-height:1.75;">
                Thank you for joining the <strong style="color:#0f172a;">Inua360</strong> waitlist.
                We're building an AI-powered co-pilot to help Kenya's SMEs understand their business
                health, stay compliant, and access the right funding opportunities — and you're among
                the first to know.
              </p>

              <p style="margin:0 0 32px;font-size:16px;color:#64748b;line-height:1.75;">
                We'll send you a personal invite as soon as early access opens. Until then, feel
                free to share Inua360 with a fellow entrepreneur who could benefit.
              </p>

              <!-- ── What's next callout ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation"
                     style="background:#fff7ed;border-left:4px solid #F07B20;border-radius:8px;margin-bottom:40px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0f172a;letter-spacing:0.5px;text-transform:uppercase;">
                      What's next
                    </p>
                    <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
                      Keep an eye on your inbox — your early access invite will come from
                      <strong style="color:#0f172a;">hello.inua360@gmail.com</strong>. Add us to your
                      contacts so we don't land in spam.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ── Divider ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                <tr>
                  <td style="border-top:1px solid #e2e8f0;padding-bottom:32px;"></td>
                </tr>
              </table>

              <!-- ── Follow us heading ── -->
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;">
                Follow our journey
              </p>

              <!-- ── Social links ── -->
              <!--
                TODO: Replace the # hrefs below with real social media URLs when they are ready.
                Example: href="https://twitter.com/inua360"
              -->
              <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                <tr>
                  <td style="padding:0 10px 10px 0;">
                    <a href="#"
                       style="display:inline-block;padding:10px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;font-weight:600;color:#0f172a;text-decoration:none;white-space:nowrap;">
                      𝕏 &nbsp;Twitter / X
                    </a>
                  </td>
                  <td style="padding:0 10px 10px 0;">
                    <a href="#"
                       style="display:inline-block;padding:10px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;font-weight:600;color:#0f172a;text-decoration:none;white-space:nowrap;">
                      in &nbsp;LinkedIn
                    </a>
                  </td>
                  <td style="padding:0 10px 10px 0;">
                    <a href="#"
                       style="display:inline-block;padding:10px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;font-weight:600;color:#0f172a;text-decoration:none;white-space:nowrap;">
                      &#x1F4F7; &nbsp;Instagram
                    </a>
                  </td>
                  <td style="padding:0 0 10px 0;">
                    <a href="#"
                       style="display:inline-block;padding:10px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;font-weight:600;color:#0f172a;text-decoration:none;white-space:nowrap;">
                      f &nbsp;Facebook
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#0f172a;padding:28px 48px;text-align:center;">
              <!-- Gradient line -->
              <div style="width:100%;height:1px;background:linear-gradient(90deg,transparent 0%,#F07B20 40%,#F59340 60%,transparent 100%);margin-bottom:24px;"></div>
              <p style="margin:0 0 6px;font-size:13px;color:#64748b;">
                Built with &#10084;&#65039; in Nairobi, Kenya &#127472;&#127466;
              </p>
              <p style="margin:0;font-size:12px;color:#475569;">
                &copy; ${new Date().getFullYear()} Inua360 &nbsp;&middot;&nbsp;
                <a href="#" style="color:#F07B20;text-decoration:none;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- ── /Card ── -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Returns a plain-text fallback for the waitlist confirmation email.
 * @param {{ name: string }} options
 */
function waitlistConfirmationText({ name }) {
  const displayName = name || 'there';
  return [
    `Hi ${displayName},`,
    '',
    "You're on the Inua360 waitlist!",
    '',
    "Thank you for joining. We're building an AI-powered co-pilot to help Kenya's SMEs",
    'understand their business health, stay compliant, and access the right funding opportunities.',
    "You'll receive a personal invite as soon as early access opens.",
    '',
    "What's next:",
    'Keep an eye on your inbox. Your early access invite will come from hello.inua360@gmail.com.',
    'Add us to your contacts so we don\'t land in spam.',
    '',
    'Follow our journey:',
    'Twitter / X   → (coming soon)',
    'LinkedIn      → (coming soon)',
    'Instagram     → (coming soon)',
    'Facebook      → (coming soon)',
    '',
    '© ' + new Date().getFullYear() + ' Inua360 · Built in Nairobi, Kenya',
  ].join('\n');
}

module.exports = { waitlistConfirmationHtml, waitlistConfirmationText };
