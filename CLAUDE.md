# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server with HMR (port 5173)
npm run build        # Type-check (tsc -b) then bundle (vite build)
npm run lint         # ESLint across all source files
npm run preview      # Serve the production build locally
npm run verify:waitlist  # Test the deployed waitlist endpoint post-deploy
```

## Architecture

**Inua360** is an AI co-pilot for Kenyan SMEs and lenders. It is a React 19 + TypeScript SPA (not Next.js) built with Vite, styled with Tailwind CSS v4, and routed via React Router v7.

### Route structure

Two logical sections share the same SPA:

- **Public / marketing** (`/`, `/lenders`) — landing pages with a waitlist form
- **Authenticated product** (`/dashboard/*`, `/onboarding`) — gated by `ProtectedRoute`

`ProtectedRoute` (`src/components/ProtectedRoute.tsx`) hits `/auth/user/` on every render. If the user is not authenticated it redirects to `/login`; if `is_onboarded=false` it redirects to `/onboarding` instead of the requested route.

### API layer

`src/services/api.ts` exports an Axios instance (`apiClient`) configured with:
- `baseURL` from `VITE_API_BASE_URL` (default `http://localhost:8000/api/v1`)
- `withCredentials: true` (cookie-based Django session auth)
- A response interceptor that auto-retries on 401 via `/auth/token/refresh/`

`src/services/mockApi.ts` provides static fake data. Some dashboard pages (HealthReport, Funding) currently import from `mockApi` instead of `apiClient` — swap imports when the real backend is available.

### Waitlist / email flow

When a user submits the waitlist form, two things happen:

1. `src/services/waitlistSubmit.ts` POSTs to `POST /send-waitlist-confirmation` on the **email-service** (see `email-service/`), authenticated with a Bearer token.
2. The email-service sends a branded HTML confirmation email directly to the user via Gmail SMTP (Nodemailer).

`src/hooks/useWaitlistSubmit.ts` wraps the fetch call with a 35 s UI timeout and surfaces errors as toasts. `WaitlistSection` in `src/components/Landing/` consumes this hook.

The legacy `api/waitlist.js` Vercel function (FormSubmit proxy) is no longer used by the frontend but is kept for reference.

### Email service (`email-service/`)

A standalone Express server — deployed separately from the Vercel frontend.

| File | Purpose |
|---|---|
| `src/server.js` | Express app, Bearer token auth middleware, `/health` + `/send-waitlist-confirmation` routes |
| `src/mailer.js` | Nodemailer transport (Gmail SMTP, port 587 STARTTLS) |
| `src/templates/waitlistConfirmation.js` | HTML + plain-text email template (Inua360 brand colors) |

**Running locally:**
```bash
cd email-service
npm install
cp .env.example .env   # fill in AUTH_TOKEN, SMTP_USER, SMTP_PASS
npm run dev            # starts on port 3001 with --watch
```

**Social media links** in the email template are placeholders (`href="#"`). Replace them in `src/templates/waitlistConfirmation.js` when real URLs are ready.

### Global state

| Provider | File | What it holds |
|---|---|---|
| `ThemeProvider` | `src/context/ThemeContext.tsx` | `light` \| `dark`, persisted to `localStorage` |
| `ToastProvider` | `src/context/ToastContext.tsx` | success / error / warning / info toasts |

Both are mounted in `src/main.tsx` around the router.

### Deployment

Vercel. `vercel.json` rewrites all non-`/api/` paths to `/index.html` for SPA navigation. The `api/` directory is served as Vercel serverless functions.

## Environment variables

### Frontend (`/.env`)

| Variable | Default | Purpose |
|---|---|---|
| `VITE_EMAIL_SERVICE_URL` | — | URL of the running email-service (required for waitlist) |
| `VITE_EMAIL_SERVICE_TOKEN` | — | Bearer token — must match `AUTH_TOKEN` in email-service |
| `VITE_API_BASE_URL` | `http://localhost:8000/api/v1` | Django backend URL |
| `VITE_GOOGLE_CLIENT_ID` | *(unset)* | Google OAuth (optional) |

### Email service (`/email-service/.env`)

| Variable | Purpose |
|---|---|
| `AUTH_TOKEN` | Secret token checked on every inbound request |
| `SMTP_USER` | Gmail address that sends the emails |
| `SMTP_PASS` | Gmail App Password (not your login password) |
| `SMTP_FROM_NAME` | Display name in From field (default: `Inua360`) |
| `PORT` | Server port (default: `3001`) |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |

## Notes

- **Auth is not yet live.** `/login` and `/register` render waitlist forms. The Django backend endpoints (`/auth/user/`, `/auth/token/refresh/`) are expected but not deployed in the current environment.
- TypeScript is configured with `strict: true`. Vite does not type-check at dev-server time (`noEmit` is set); type errors only surface during `npm run build`.
- ESLint uses the flat config format (`eslint.config.js`); there is no `.eslintrc` file.
