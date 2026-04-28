/**
 * Vercel Node serverless — waitlist via FormSubmit (email delivery only).
 * Required env var: WAITLIST_NOTIFY_EMAIL
 * Set this in Vercel → Project → Settings → Environment Variables.
 *
 * FormSubmit activation: the first submission to a new email triggers a
 * one-time confirmation email from FormSubmit. Click it (check spam) or
 * no emails will be delivered.
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
    console.error('[waitlist] WAITLIST_NOTIFY_EMAIL env var is not set — set it in Vercel → Project → Settings → Environment Variables.');
    return jsonResponse(
      { error: 'Server misconfiguration: WAITLIST_NOTIFY_EMAIL is not set. Contact the site administrator.' },
      500,
    );
  }

  const subject = `Inua360 waitlist — ${persona} (${source})`;
  const messageBody =
    `New waitlist signup\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Persona: ${persona}\n` +
    `Source: ${source}`;

  // Abort FormSubmit after 8s — stays inside Vercel's 10s free-tier limit
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 8_000);

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
          message: messageBody,
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: controller.signal,
      },
    );

    const formSubmitText = await formSubmitRes.text().catch(() => '');

    if (!formSubmitRes.ok) {
      console.error(
        '[waitlist] FormSubmit HTTP',
        formSubmitRes.status,
        formSubmitText.slice(0, 400),
      );
    } else {
      try {
        const parsed = JSON.parse(formSubmitText);
        if (parsed.success === false || parsed.success === 'false') {
          console.warn(
            '[waitlist] FormSubmit returned success:false for',
            notifyEmail,
            '— check that you clicked the activation email FormSubmit sent to that inbox (check spam).',
          );
        } else {
          console.log('[waitlist] FormSubmit delivered OK for', notifyEmail);
        }
      } catch {
        console.log('[waitlist] FormSubmit response (non-JSON):', formSubmitText.slice(0, 200));
      }
    }
  } catch (err) {
    if (err?.name === 'AbortError') {
      console.error('[waitlist] FormSubmit timed out after 8s — check Vercel function logs.');
    } else {
      console.error('[waitlist] FormSubmit fetch failed:', err?.message ?? err);
    }
  } finally {
    clearTimeout(tid);
  }

  return jsonResponse({ ok: true }, 200);
}
