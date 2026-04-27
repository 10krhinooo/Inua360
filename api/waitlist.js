/**
 * Vercel Node serverless — FormSubmit notification email.
 * Env: WAITLIST_NOTIFY_EMAIL (required)
 *
 * If the UI succeeds but you get no email: check spam, FormSubmit activation link in inbox,
 * and Vercel logs — we only return 200 when FormSubmit accepts the submission.
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
  let accepted = formSubmitRes.ok;

  if (accepted && formSubmitText) {
    try {
      const parsed = JSON.parse(formSubmitText);
      if (parsed.success === false || parsed.success === 'false') {
        accepted = false;
      }
    } catch {
      /* non-JSON */
    }
  }

  if (!accepted) {
    console.error('[waitlist] FormSubmit rejected:', formSubmitRes.status, formSubmitText.slice(0, 500));
    return jsonResponse(
      {
        error: 'Email notification could not be sent',
        detail:
          formSubmitText.slice(0, 400) ||
          'Open your WAITLIST inbox and click the FormSubmit activation link (check spam). Then try again.',
      },
      502,
    );
  }

  console.log('[waitlist] FormSubmit OK:', formSubmitText.slice(0, 200));
  return jsonResponse({ ok: true }, 200);
}
