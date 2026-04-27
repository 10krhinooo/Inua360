export interface WaitlistPayload {
  name: string;
  email: string;
  persona: string;
  source: string;
}

function getDevNotifyEmail(): string | undefined {
  const v = import.meta.env.VITE_WAITLIST_NOTIFY_EMAIL;
  return typeof v === 'string' && v.trim() ? v.trim() : undefined;
}

/**
 * Submissions in production go to `/api/waitlist` (Vercel Node serverless).
 * For local `npm run dev`, set `VITE_WAITLIST_NOTIFY_EMAIL` in `.env.local` to your FormSubmit address
 * or run `vercel dev` to use the real API route.
 * See repository `.env.example` for Vercel + FormSubmit setup and `npm run verify:waitlist`.
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  const devEmail = getDevNotifyEmail();

  if (import.meta.env.DEV) {
    if (devEmail) {
      await submitViaFormSubmitAjax(devEmail, payload);
      return;
    }
    throw new Error(
      'Local waitlist: add VITE_WAITLIST_NOTIFY_EMAIL to .env.local (your FormSubmit email), or run `vercel dev`.',
    );
  }

  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    detail?: string;
  };

  if (!res.ok) {
    const msg = [data.error, data.detail].filter(Boolean).join(' — ');
    throw new Error(msg || `Request failed (${res.status})`);
  }
}

async function submitViaFormSubmitAjax(
  notifyEmail: string,
  payload: WaitlistPayload,
): Promise<void> {
  const subject = `Inua360 waitlist — ${payload.persona} (${payload.source})`;
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        persona: payload.persona,
        source: payload.source,
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
      }),
    },
  );

  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(t || `FormSubmit error (${res.status})`);
  }
}
