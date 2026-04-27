/**
 * Vercel Node serverless — plain JS avoids TS parser bugs during Vercel function bundling.
 * Env: WAITLIST_NOTIFY_EMAIL, WAITLIST_GOOGLE_SCRIPT_URL (optional)
 *
 * Key design: both FormSubmit and Google Sheets are soft-fail.
 * The form will ALWAYS complete successfully — errors are logged server-side only.
 */

export default async function handler(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  function jsonResponse(data, status) {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

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

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const email =
    typeof body.email === 'string' ? body.email.trim() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: 'Valid email is required' }, 400);
  }

  const nameRaw = typeof body.name === 'string' ? body.name.trim() : '';
  const name = nameRaw || 'Subscriber';
  const persona =
    typeof body.persona === 'string' && body.persona.trim()
      ? body.persona.trim()
      : 'Unknown';
  const source =
    typeof body.source === 'string' && body.source.trim()
      ? body.source.trim()
      : 'website';

  const notifyEmail =
    typeof process.env.WAITLIST_NOTIFY_EMAIL === 'string'
      ? process.env.WAITLIST_NOTIFY_EMAIL.trim()
      : '';
  if (!notifyEmail) {
    return jsonResponse(
      { error: 'Server misconfiguration: WAITLIST_NOTIFY_EMAIL is not set' },
      500,
    );
  }

  // ── 1. Google Sheets (primary record — writes first) ──────────────────────
  const sheetsUrl =
    typeof process.env.WAITLIST_GOOGLE_SCRIPT_URL === 'string'
      ? process.env.WAITLIST_GOOGLE_SCRIPT_URL.trim()
      : '';
  if (sheetsUrl) {
    try {
      const sheetsBody = JSON.stringify({
        name,
        email,
        persona,
        source,
        submittedAt: new Date().toISOString(),
      });
      const sheetsRes = await postJsonFollowingRedirects(sheetsUrl, sheetsBody);
      if (!sheetsRes.ok) {
        console.error('[waitlist] Sheets non-OK:', sheetsRes.status);
      }
    } catch (err) {
      // Sheets failure is logged but never blocks the user
      console.error('[waitlist] Google Sheets write failed:', err?.message ?? err);
    }
  }

  // ── 2. FormSubmit email notification (soft-fail) ──────────────────────────
  // FormSubmit requires a one-time activation click per email address.
  // Until that click happens, it returns { success: false }.
  // We log this but NEVER return an error to the frontend — the form completes.
  const subject = `Inua360 waitlist — ${persona} (${source})`;
  try {
    const formSubmitRes = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          persona,
          source,
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
        }),
      },
    );

    const formSubmitText = await formSubmitRes.text().catch(() => '');

    if (!formSubmitRes.ok) {
      console.error(
        '[waitlist] FormSubmit HTTP error:',
        formSubmitRes.status,
        formSubmitText.slice(0, 300),
      );
    } else {
      try {
        const parsed = JSON.parse(formSubmitText);
        if (parsed.success === false || parsed.success === 'false') {
          // This usually means activation email not yet clicked
          console.warn(
            '[waitlist] FormSubmit activation pending for',
            notifyEmail,
            '— open Gmail inbox and click the FormSubmit confirmation link.',
          );
        }
      } catch { /* non-JSON response is fine */ }
    }
  } catch (err) {
    console.error('[waitlist] FormSubmit fetch threw:', err?.message ?? err);
  }

  // Always return success — Sheets is the real data store.
  return jsonResponse({ ok: true }, 200);
}
