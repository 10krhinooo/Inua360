'use strict';

const nodemailer = require('nodemailer');
const { waitlistConfirmationHtml, waitlistConfirmationText } = require('./templates/waitlistConfirmation');

let transport;

function getTransport() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS on 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transport;
}

/**
 * Sends the waitlist confirmation email to the person who just signed up.
 * @param {{ name: string, email: string }} options
 */
async function sendWaitlistConfirmation({ name, email }) {
  const fromName = process.env.SMTP_FROM_NAME || 'Inua360';
  const fromAddress = process.env.SMTP_USER;

  await getTransport().sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to: email,
    subject: "You're on the Inua360 waitlist!",
    text: waitlistConfirmationText({ name }),
    html: waitlistConfirmationHtml({ name }),
  });
}

module.exports = { sendWaitlistConfirmation };
