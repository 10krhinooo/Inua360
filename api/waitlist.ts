/**
 * Vercel Edge: receives waitlist JSON and forwards to FormSubmit (email) and optionally Google Apps Script (Sheets).
 *
 * Vercel env:
 *   WAITLIST_NOTIFY_EMAIL — inbox you verified with FormSubmit (check junk for their activation link the first time).
 *   WAITLIST_GOOGLE_SCRIPT_URL — optional; deploy a Google Apps Script as Web App that accepts POST JSON and appends a row.
 *
 * Sample Apps Script (Deploy → New deployment → Web app → access: Anyone):
 *
 *   function doPost(e) {
 *     var sh = SpreadsheetApp.openById('SHEET_ID').getActiveSheet();
 *     var d = JSON.parse(e.postData.contents);
 *     sh.appendRow([new Date(), d.name, d.email, d.persona, d.source]);
 *     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 */

export const config = {
  runtime: 'edge',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
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

  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL?.trim();
  if (!notifyEmail) {
    return jsonResponse(
      { error: 'Server misconfiguration: WAITLIST_NOTIFY_EMAIL is not set' },
      500,
    );
  }

  const subject = `Inua360 waitlist — ${persona} (${source})`;

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

  if (!formSubmitRes.ok) {
    const detail = await formSubmitRes.text().catch(() => '');
    return jsonResponse(
      { error: 'Could not send notification', detail: detail.slice(0, 200) },
      502,
    );
  }

  const sheetsUrl = process.env.WAITLIST_GOOGLE_SCRIPT_URL?.trim();
  if (sheetsUrl) {
    try {
      const sheetsBody = JSON.stringify({
        name,
        email,
        persona,
        source,
        submittedAt: new Date().toISOString(),
      });
      // Google Apps Script often responds with 302; following it with fetch can upgrade
      // POST → GET and drop the body. Re-POST manually to each Location until we get a final response.
      await postJsonFollowingRedirects(sheetsUrl, sheetsBody);
    } catch {
      // Sheets is optional; email is primary
    }
  }

  return jsonResponse({ ok: true }, 200);
}

/** POST JSON and follow redirects without losing the body (fixes Google Apps Script Web App + Edge fetch). */
async function postJsonFollowingRedirects(
  startUrl: string,
  jsonBody: string,
): Promise<Response> {
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
      if (!loc) {
        return res;
      }
      url = new URL(loc, url).href;
      continue;
    }

    return res;
  }

  throw new Error('Too many redirects to Google Apps Script');
}

function jsonResponse(data: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
