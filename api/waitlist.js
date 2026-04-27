/**
 * Vercel Node.js Serverless Function
 * Modern Web Standard export format: export default { async fetch(request) {} }
 * Env vars: WAITLIST_NOTIFY_EMAIL, WAITLIST_GOOGLE_SCRIPT_URL (optional)
 *
 * Design: FormSubmit is soft-fail. Google Sheets is primary record.
 * The form always completes — errors are only logged server-side.
 */

async function postJsonFollowingRedirects(startUrl, jsonBody) {
  const headers = { 'Content-Type': 'application/json' };
  let url = startUrl;
  for (let hop = 0; hop < 8; hop++) {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: jsonBody,
      redirect: 'manual',
    });

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('Location');
      if (!loc) return res;
      url = new URL(loc, url).href;
      continue;
    }

    return res;
  }

  throw new Error('Too many redirects to Google Apps Script');
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    // Validate email
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: 'Valid email is required' }, 400);
    }

    const name    = (typeof body.name    === 'string' && body.name.trim())    ? body.name.trim()    : 'Subscriber';
    const persona = (typeof body.persona === 'string' && body.persona.trim()) ? body.persona.trim() : 'Unknown';
    const source  = (typeof body.source  === 'string' && body.source.trim())  ? body.source.trim()  : 'website';

    // Require notification email env var
    const notifyEmail = (typeof process.env.WAITLIST_NOTIFY_EMAIL === 'string')
      ? process.env.WAITLIST_NOTIFY_EMAIL.trim()
      : '';
    if (!notifyEmail) {
      return jsonResponse({ error: 'Server misconfiguration: WAITLIST_NOTIFY_EMAIL not set' }, 500);
    }

    // ── 1. Google Sheets — primary data store ─────────────────────────────
    const sheetsUrl = (typeof process.env.WAITLIST_GOOGLE_SCRIPT_URL === 'string')
      ? process.env.WAITLIST_GOOGLE_SCRIPT_URL.trim()
      : '';

    if (sheetsUrl) {
      try {
        await postJsonFollowingRedirects(sheetsUrl, JSON.stringify({
          name, email, persona, source,
          submittedAt: new Date().toISOString(),
        }));
      } catch (err) {
        console.error('[waitlist] Sheets write failed:', err?.message ?? err);
      }
    }

    // ── 2. FormSubmit email — soft-fail, never blocks the user ────────────
    const subject = `Inua360 waitlist — ${persona} (${source})`;
    try {
      const fsRes = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name, email, persona, source,
            _subject: subject,
            _template: 'table',
            _captcha: 'false',
          }),
        },
      );
      const fsText = await fsRes.text().catch(() => '');
      if (!fsRes.ok) {
        console.error('[waitlist] FormSubmit error:', fsRes.status, fsText.slice(0, 200));
      } else {
        try {
          const parsed = JSON.parse(fsText);
          if (parsed.success === false || parsed.success === 'false') {
            console.warn('[waitlist] FormSubmit activation pending for', notifyEmail,
              '— check Gmail inbox and click the FormSubmit confirmation link.');
          }
        } catch { /* non-JSON is fine */ }
      }
    } catch (err) {
      console.error('[waitlist] FormSubmit fetch failed:', err?.message ?? err);
    }

    // Always return success
    return jsonResponse({ ok: true }, 200);
  },
};
