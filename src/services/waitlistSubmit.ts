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

  // #region agent log
  fetch('http://127.0.0.1:7503/ingest/77225821-8b3d-4f71-9c83-f56c703a1f2d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'61712c'},body:JSON.stringify({sessionId:'61712c',hypothesisId:'H-A,H-B,H-C',location:'waitlistSubmit.ts:entry',message:'submitWaitlist called',data:{isDev:import.meta.env.DEV,hasDevEmail:!!devEmail,payloadKeys:Object.keys(payload)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  if (import.meta.env.DEV) {
    if (devEmail) {
      try {
        await submitViaFormSubmitAjax(devEmail, payload);
      } catch (e) {
        console.warn('[waitlist dev] FormSubmit:', e);
      }
      return;
    }
    // #region agent log
    fetch('http://127.0.0.1:7503/ingest/77225821-8b3d-4f71-9c83-f56c703a1f2d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'61712c'},body:JSON.stringify({sessionId:'61712c',hypothesisId:'H-C',location:'waitlistSubmit.ts:dev-no-email',message:'DEV mode: no VITE_WAITLIST_NOTIFY_EMAIL — throwing immediately',data:{},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    throw new Error(
      'Local waitlist: add VITE_WAITLIST_NOTIFY_EMAIL to .env.local (your FormSubmit email), or run `vercel dev`.',
    );
  }

  const controller = new AbortController();
  // Under 35s UI cap in useWaitlistSubmit
  const timeoutMs = 30_000;
  const tid = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    // #region agent log
    fetch('http://127.0.0.1:7503/ingest/77225821-8b3d-4f71-9c83-f56c703a1f2d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'61712c'},body:JSON.stringify({sessionId:'61712c',hypothesisId:'H-A,H-B,H-E',location:'waitlistSubmit.ts:fetch-done',message:'API fetch completed',data:{status:res.status,ok:res.ok,contentType:res.headers.get('content-type')},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  } catch (e) {
    // #region agent log
    fetch('http://127.0.0.1:7503/ingest/77225821-8b3d-4f71-9c83-f56c703a1f2d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'61712c'},body:JSON.stringify({sessionId:'61712c',hypothesisId:'H-E',location:'waitlistSubmit.ts:fetch-error',message:'API fetch threw',data:{name:e instanceof Error?e.name:'unknown',msg:e instanceof Error?e.message:String(e)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
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
    // #region agent log
    fetch('http://127.0.0.1:7503/ingest/77225821-8b3d-4f71-9c83-f56c703a1f2d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'61712c'},body:JSON.stringify({sessionId:'61712c',hypothesisId:'H-B',location:'waitlistSubmit.ts:non-json',message:'Response is not JSON',data:{ct,snippetStart:snippet.slice(0,80)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
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

  // #region agent log
  fetch('http://127.0.0.1:7503/ingest/77225821-8b3d-4f71-9c83-f56c703a1f2d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'61712c'},body:JSON.stringify({sessionId:'61712c',hypothesisId:'H-A,H-D',location:'waitlistSubmit.ts:json-parsed',message:'API JSON response parsed',data:{status:res.status,resOk:res.ok,dataOk:data.ok,dataError:data.error,dataDetail:data.detail},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

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
  const messageBody =
    `New waitlist signup\n\n` +
    `Name: ${payload.name}\n` +
    `Email: ${payload.email}\n` +
    `Persona: ${payload.persona}\n` +
    `Source: ${payload.source}`;
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 30_000);
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
      throw new Error('FormSubmit request timed out. Try again.');
    }
    throw e;
  } finally {
    clearTimeout(tid);
  }

  const text = await res.text().catch(() => '');
  let accepted = res.ok;
  if (accepted && text) {
    try {
      const parsed = JSON.parse(text) as { success?: boolean | string };
      if (parsed.success === false || parsed.success === 'false') {
        accepted = false;
      }
    } catch {
      /* ignore */
    }
  }
  if (!accepted) {
    throw new Error(
      text ||
        `FormSubmit error (${res.status}). Activate this email at formsubmit.co if you have not clicked the inbox link yet.`,
    );
  }
}
