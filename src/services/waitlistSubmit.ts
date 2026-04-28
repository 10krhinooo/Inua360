export interface WaitlistPayload {
  name: string;
  email: string;
  persona: string;
  source: string;
}

// Notification inbox — env var allows overriding without a code change.
const NOTIFY_EMAIL =
  ((import.meta.env.VITE_WAITLIST_NOTIFY_EMAIL as string | undefined) ?? '').trim() ||
  'hello.inua360@gmail.com';

/**
 * Submits directly to FormSubmit's AJAX API from the browser.
 *
 * First-time setup (one-time per email address):
 *   After the very first submission FormSubmit sends an activation email to
 *   hello.inua360@gmail.com — click the link (check spam folder).
 *   Every submission after that is delivered automatically.
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  const subject = `Inua360 waitlist — ${payload.persona} (${payload.source})`;
  const messageBody =
    `New waitlist signup\n\n` +
    `Name: ${payload.name}\n` +
    `Email: ${payload.email}\n` +
    `Persona: ${payload.persona}\n` +
    `Source: ${payload.source}`;

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 20_000);

  let res: Response;
  try {
    res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`,
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
          message: messageBody,
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: controller.signal,
      },
    );
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw e;
  } finally {
    clearTimeout(tid);
  }

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status}). Please try again.`);
  }

  const text = await res.text().catch(() => '');
  try {
    const parsed = JSON.parse(text) as { success?: boolean | string };
    if (parsed.success === false || parsed.success === 'false') {
      // FormSubmit not yet activated — it will have sent an activation email.
      throw new Error(
        'Check hello.inua360@gmail.com (including spam) for a confirmation email from FormSubmit and click the link, then try submitting again.',
      );
    }
  } catch (parseErr) {
    if (!(parseErr instanceof SyntaxError)) {
      throw parseErr;
    }
    // Non-JSON but status ok — treat as success
  }
}
