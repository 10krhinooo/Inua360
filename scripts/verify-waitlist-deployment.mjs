/**
 * POSTs a test payload to the deployed /api/waitlist route.
 * Run: npm run verify:waitlist
 * Optional: WAITLIST_SMOKE_ORIGIN=https://your-preview.vercel.app
 */
const origin = (process.env.WAITLIST_SMOKE_ORIGIN || 'https://inua360.vercel.app').replace(
  /\/$/,
  '',
);
const url = `${origin}/api/waitlist`;

const body = JSON.stringify({
  email: 'verify-script@example.com',
  name: 'Deployment check',
  persona: 'SME',
  source: 'npm-verify-waitlist',
});

async function main() {
  console.log(`POST ${url}`);
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
    });
  } catch (e) {
    console.error('Network error:', e instanceof Error ? e.message : e);
    process.exit(1);
  }

  const text = await res.text();
  let json = {};
  try {
    json = JSON.parse(text);
  } catch {
    /* plain text body */
  }

  console.log(`HTTP ${res.status}`, json.error ? json : text.slice(0, 200));

  if (res.status === 404) {
    console.error(`
/api/waitlist returned 404. Usually:
  • Redeploy this branch so Vercel picks up the root api/waitlist.ts Edge function.
  • Or point WAITLIST_SMOKE_ORIGIN at a preview URL that includes the latest deploy.
`);
    process.exit(1);
  }

  if (res.status === 500 && String(json.error || '').includes('WAITLIST_NOTIFY_EMAIL')) {
    console.error(`
Set WAITLIST_NOTIFY_EMAIL in Vercel → Project → Settings → Environment Variables (Production / Preview).
Then redeploy or wait for the next production build.
`);
    process.exit(1);
  }

  if (res.status === 502) {
    console.error(`
FormSubmit rejected the relay. Activate that inbox at formsubmit.co (check spam for first-time confirmation).
`);
    process.exit(1);
  }

  if (!res.ok) {
    process.exit(1);
  }

  console.log('OK — Edge route responded; check inbox for FormSubmit delivery when using a real address.');
  process.exit(0);
}

main();
