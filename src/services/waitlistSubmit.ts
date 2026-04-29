export interface WaitlistPayload {
  name: string;
  email: string;
  persona: string;
  source: string;
}

const EMAIL_SERVICE_URL = (
  (import.meta.env.VITE_EMAIL_SERVICE_URL as string | undefined) ?? ''
).replace(/\/$/, '');

const EMAIL_SERVICE_TOKEN = (
  (import.meta.env.VITE_EMAIL_SERVICE_TOKEN as string | undefined) ?? ''
).trim();

/**
 * Sends a waitlist confirmation email via the standalone email-service.
 * The service must be running and reachable at VITE_EMAIL_SERVICE_URL.
 * Requests are authenticated with a Bearer token (VITE_EMAIL_SERVICE_TOKEN).
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  if (!EMAIL_SERVICE_URL || !EMAIL_SERVICE_TOKEN) {
    throw new Error(
      'Email service is not configured. Set VITE_EMAIL_SERVICE_URL and VITE_EMAIL_SERVICE_TOKEN.',
    );
  }

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 20_000);

  let res: Response;
  try {
    res = await fetch(`${EMAIL_SERVICE_URL}/send-waitlist-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${EMAIL_SERVICE_TOKEN}`,
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        persona: payload.persona,
        source: payload.source,
      }),
      signal: controller.signal,
    });
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw e;
  } finally {
    clearTimeout(tid);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let msg = `Submission failed (${res.status}). Please try again.`;
    try {
      const parsed = JSON.parse(text) as { error?: string };
      if (parsed.error) msg = parsed.error;
    } catch {
      // non-JSON body — keep generic message
    }
    throw new Error(msg);
  }
}
