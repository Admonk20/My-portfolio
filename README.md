# Lumen — Ethereal AI Automation Portfolio

A Next.js + Tailwind + Framer Motion portfolio for AI automation services,
with a password-gated admin panel to manage portfolio projects.

The site blends four ethereal moods — celestial, misty pastels, moonlit dark,
and airy/angelic — into a single dreamscape: animated starfield, drifting
aurora gradients, frosted glass cards, and soft glows.

## Features

- Single-page site: Hero · Services · About · Portfolio · Contact
- Animated starfield canvas + aurora blob background (respects
  `prefers-reduced-motion`)
- Portfolio driven by Supabase — projects load on the server and revalidate
- Contact form posts to Supabase + mailto fallback + Calendly embed + socials
- Admin panel at `/admin` with full CRUD over projects
- Session auth via a single `ADMIN_PASSWORD` and signed HTTP-only cookie
- Vercel-ready (no filesystem writes)

## Setup

### 1. Install

```bash
npm install
```

### 2. Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the **SQL editor** and paste the contents of
   [`supabase/schema.sql`](./supabase/schema.sql), then run it. This creates
   the `projects` and `messages` tables, enables RLS, and seeds three sample
   projects.
3. Open **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Then fill in the values. Notably:

- `ADMIN_PASSWORD` — any long string you'll remember.
- `SESSION_SECRET` — random 64-hex string. Generate one with
  `openssl rand -hex 32`.
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CALENDLY_URL`, and the socials.

### 4. Run

```bash
npm run dev
```

Visit:
- `http://localhost:3000` — the site
- `http://localhost:3000/admin` — the admin (redirects to login)

## Admin

- Go to `/admin` and enter the password from `ADMIN_PASSWORD`.
- You can create, edit, and delete projects.
- Changes appear on the homepage within 60 seconds (ISR) or on a hard refresh.
- Projects have: title, slug, one-line summary, long description, cover image
  URL, comma-separated tags, live URL, and a **Feature** toggle to surface
  them at the top of the grid.

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add all env vars from `.env.local.example` to **Project → Settings →
   Environment Variables**. Be sure to set `NODE_ENV=production` (Vercel sets
   this automatically) so the session cookie is marked `Secure`.
4. Deploy.

## Tech

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + custom CSS animations
- **Motion:** Framer Motion (scroll-reveal, modal, hover lift)
- **Database:** Supabase (Postgres)
- **Auth:** Single admin password, signed HTTP-only cookie (HMAC-SHA256),
  7-day TTL. Verified in middleware (Edge-compatible Web Crypto) and API
  routes (Node crypto).

## File map

```
app/
  layout.tsx, page.tsx, globals.css
  admin/
    login/page.tsx
    (dashboard)/layout.tsx, page.tsx, AdminClient.tsx
  api/
    auth/login/route.ts
    auth/logout/route.ts
    projects/route.ts
    projects/[id]/route.ts
    contact/route.ts
components/
  Navbar, Hero, Services, About, Portfolio, PortfolioGrid,
  Contact, Footer, Starfield, Aurora, GlassCard
lib/
  supabase.ts, projects.ts, projectValidation.ts,
  auth.ts, authEdge.ts, authConstants.ts
middleware.ts
supabase/schema.sql
```

## Customizing

- **Brand name** — it's "Lumen" throughout. Search & replace `Lumen` in
  `components/Navbar.tsx`, `components/Footer.tsx`, and
  `app/layout.tsx` (metadata).
- **Your name** — in `components/About.tsx` ("Your Name").
- **Portrait** — `components/About.tsx` has a placeholder card; drop an
  `<Image>` in there pointing at a public image URL, or import a local file
  from `public/`.
- **Colors** — the palette lives in `tailwind.config.ts` (`ink`, `mist`,
  `moon`) and CSS variables in `app/globals.css`.
- **Hero copy** — `components/Hero.tsx`.
- **Services** — the six cards live in the `services` array in
  `components/Services.tsx`.

## License

Personal use. Crafted quietly in the small hours.
