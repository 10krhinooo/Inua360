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

  const controller = new AbortController();
  // 25 s — must be less than the 35 s UI cap in useWaitlistSubmit so
  // a clean error message is shown instead of the generic timeout fallback.
  const timeoutMs = 25_000;
  const tid = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error(
        'Request timed out. Check your connection, then try again. If it keeps happening, the server may be busy.',
      );
    }
    throw e;
  } finally {
    clearTimeout(tid);
  }

  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const snippet = (await res.text()).slice(0, 200);
    // HTML means the rewrite served index.html — API route not deployed
    if (snippet.startsWith('<!')) {
      throw new Error(
        'The waitlist API is not reachable. Please try again in a moment — if this persists, contact support.',
      );
    }
    throw new Error(`Unexpected server response (${res.status}). Please try again.`);
  }

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    detail?: string;
  };

  if (!res.ok) {
    const msg = [data.error, data.detail].filter(Boolean).join(' — ');
    throw new Error(msg || `Request failed (${res.status})`);
  }

  if (data.ok !== true) {
    throw new Error(
      [data.error, data.detail].filter(Boolean).join(' — ') ||
        'Unexpected server response. Please try again.',
    );
  }
}

async function submitViaFormSubmitAjax(
  notifyEmail: string,
  payload: WaitlistPayload,
): Promise<void> {
  const subject = `Inua360 waitlist — ${payload.persona} (${payload.source})`;
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 25_000);
  let res: Response;
  try {
    res = await fetch(
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
        signal: controller.signal,
      },
    );
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error('FormSubmit request timed out. Try again.');
    }
    throw e;
  } finally {
    clearTimeout(tid);
  }

  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(t || `FormSubmit error (${res.status})`);
  }
}
