/**
 * Vercel Node serverless — waitlist via FormSubmit.
 * Env: WAITLIST_NOTIFY_EMAIL (required)
 *
 * UX: always return { ok: true } for valid submissions so the app can show success.
 * Email delivery issues are logged on the server — check Vercel Function logs + FormSubmit activation.
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
    return jsonResponse(
      {
        error: 'Server misconfiguration: WAITLIST_NOTIFY_EMAIL is not set',
      },
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
            '[waitlist] FormSubmit has not activated yet for',
            notifyEmail,
            '— click the confirmation email from FormSubmit (check spam).',
          );
        } else {
          console.log('[waitlist] FormSubmit OK:', formSubmitText.slice(0, 200));
        }
      } catch {
        console.log('[waitlist] FormSubmit response (non-JSON):', formSubmitText.slice(0, 200));
      }
    }
  } catch (err) {
    console.error('[waitlist] FormSubmit fetch failed:', err?.message ?? err);
  }

  return jsonResponse({ ok: true }, 200);
}
