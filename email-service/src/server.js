'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sendWaitlistConfirmation } = require('./mailer');

const PORT = process.env.PORT || 3001;
const AUTH_TOKEN = process.env.AUTH_TOKEN || '';

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const app = express();

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : false,
    methods: ['POST', 'OPTIONS'],
  }),
);

app.use(express.json());

// ── Auth middleware ───────────────────────────────────────────────────────────
function requireToken(req, res, next) {
  if (!AUTH_TOKEN) {
    console.error('[auth] AUTH_TOKEN env var is not set — all requests will be rejected.');
    return res.status(500).json({ error: 'Server misconfiguration: AUTH_TOKEN is not set.' });
  }
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (token !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// ── Send waitlist confirmation ────────────────────────────────────────────────
app.post('/send-waitlist-confirmation', requireToken, async (req, res) => {
  const { name, email } = req.body || {};

  const emailStr = typeof email === 'string' ? email.trim() : '';
  if (!emailStr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const nameStr = typeof name === 'string' ? name.trim() : '';

  try {
    await sendWaitlistConfirmation({ name: nameStr, email: emailStr });
    console.log(`[waitlist] Confirmation sent to ${emailStr}`);
    res.json({ ok: true });
  } catch (err) {
    console.error(`[waitlist] Failed to send to ${emailStr}:`, err.message);
    res.status(502).json({ error: 'Failed to send email. Check server logs.' });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[email-service] Listening on port ${PORT}`);
  if (!AUTH_TOKEN) console.warn('[email-service] WARNING: AUTH_TOKEN is not set.');
  if (!process.env.SMTP_USER) console.warn('[email-service] WARNING: SMTP_USER is not set.');
  if (!process.env.SMTP_PASS) console.warn('[email-service] WARNING: SMTP_PASS is not set.');
});
