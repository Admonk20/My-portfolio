# Lumen — Ethereal AI Automation Portfolio

A Next.js + Tailwind + Framer Motion portfolio for AI automation services.
Projects are stored in **Airtable** — you edit them in a familiar spreadsheet
grid, and the site refreshes on its own.

The site blends four ethereal moods — celestial, misty pastels, moonlit dark,
and airy/angelic — into a single dreamscape: animated starfield, drifting
aurora gradients, frosted glass cards, and soft glows.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fadmonk20%2Fmy-portfolio&project-name=lumen-portfolio&repository-name=lumen-portfolio&env=AIRTABLE_PERSONAL_ACCESS_TOKEN,AIRTABLE_BASE_ID,NEXT_PUBLIC_CONTACT_EMAIL,NEXT_PUBLIC_CALENDLY_URL,NEXT_PUBLIC_SOCIAL_X,NEXT_PUBLIC_SOCIAL_LINKEDIN,NEXT_PUBLIC_SOCIAL_GITHUB&envDescription=Airtable%20credentials%20and%20your%20contact%20links.%20See%20the%20README%20for%20how%20to%20get%20each%20value.&envLink=https%3A%2F%2Fgithub.com%2Fadmonk20%2Fmy-portfolio%23environment-variables)

Build your Airtable base first (below), then click the button. It prompts
for every variable in one flow.

## Features

- Single-page site: Hero · Services · About · Portfolio · Contact
- Animated starfield canvas + aurora blob background
  (respects `prefers-reduced-motion`)
- **Portfolio driven by Airtable** — edit the grid, site updates on its own
- Contact form saves to a second Airtable table (alongside mailto + Calendly)
- Vercel-ready, no database to manage

## 1. Airtable setup

### Create a base

1. Sign in at [airtable.com](https://airtable.com) (free plan is enough).
2. **+ Create a base** → **Start from scratch** → name it `Portfolio`.
3. Rename the default table to **Projects**. Add these fields
   (spelling and capitalization matter — the code looks for exactly these
   names):

   | Field name | Field type | Notes |
   |---|---|---|
   | `Title` | Single line text | |
   | `Slug` | Single line text | URL-safe, e.g. `aurora-inbox`. Leave blank and we'll auto-generate from the title. |
   | `Summary` | Single line text | One-line pitch on the card |
   | `Description` | Long text | Long-form shown in the project modal |
   | `Cover Image URL` | URL | Any public HTTPS image URL |
   | `Tags` | Multiple select | Add any tags you want as options |
   | `Live URL` | URL | Optional |
   | `Featured` | Checkbox | Surfaces this project at the top of the grid |

4. Add a second table (`+` next to the tab bar) named **Messages** with:

   | Field name | Field type |
   |---|---|
   | `Name` | Single line text |
   | `Email` | Email |
   | `Message` | Long text |

   (Airtable automatically records a "Created time" on every row, so we
   don't need a timestamp field.)

5. Add a couple of sample rows to **Projects** — title + summary is enough
   to see the site light up.

### Create a personal access token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens).
2. **+ Create new token** → name it anything (`portfolio-site` is fine).
3. **Scopes**: tick `data.records:read` and `data.records:write`.
4. **Access**: click **+ Add a base** and pick your `Portfolio` base.
5. **Create token** → copy it immediately (it's shown only once).

### Grab your base ID

Open your base on airtable.com. The URL looks like:

```
https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY/...
```

The `appXXXXXXXXXXXXXX` part is your **Base ID**.

## 2. Local development

```bash
npm install
cp .env.local.example .env.local
# then paste your Airtable token + base ID into .env.local
npm run dev
```

Visit `http://localhost:3000`.

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `AIRTABLE_PERSONAL_ACCESS_TOKEN` | ✅ | The token you just created. |
| `AIRTABLE_BASE_ID` | ✅ | Your `appXXXXXXXXXXXXXX` base ID. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ✅ | `mailto:` address in the contact section. |
| `NEXT_PUBLIC_CALENDLY_URL` | optional | Hides the booking card if blank. |
| `NEXT_PUBLIC_SOCIAL_X` | optional | X (Twitter) profile URL. |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | optional | LinkedIn profile URL. |
| `NEXT_PUBLIC_SOCIAL_GITHUB` | optional | GitHub profile URL. |

## 3. Deploying to Vercel

Use the [button at the top](#deploy) — it prompts for each env var and
deploys in one go. Or manually:

1. Push this repo to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new).
3. Add every variable from the [Environment variables](#environment-variables)
   table to **Project → Settings → Environment Variables** (Production,
   Preview, and Development).
4. Deploy. Check the `*.vercel.app` URL, then add a custom domain under
   **Project → Domains** if desired.

## Editing your portfolio

There's no admin panel — **Airtable is your admin**.

- Open your base on airtable.com.
- Add, edit, or delete rows in the **Projects** table.
- Tick **Featured** to float a project to the top of the grid.
- Changes appear on the live site within about 60 seconds (ISR). For an
  instant refresh, redeploy from the Vercel dashboard, or wire up a
  webhook-triggered revalidation if you want it faster.

Messages submitted via the contact form land in the **Messages** table.

## Tech

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + custom CSS animations
- **Motion:** Framer Motion (scroll-reveal, modal, hover lift)
- **Data:** Airtable REST API over plain `fetch` (no SDK), cached via
  Next.js ISR with a 60-second revalidation window

## File map

```
app/
  layout.tsx, page.tsx, globals.css
  api/contact/route.ts      # POST → Airtable Messages
components/
  Navbar, Hero, Services, About, Portfolio, PortfolioGrid,
  Contact, Footer, Starfield, Aurora, GlassCard
lib/
  airtable.ts               # tiny REST client
  projects.ts               # reads the Projects table, maps to UI types
```

## Customizing

- **Brand name** — it's "Lumen" throughout. Search & replace in
  `components/Navbar.tsx`, `components/Footer.tsx`, and `app/layout.tsx`
  (metadata).
- **Your name** — `components/About.tsx` ("Your Name" placeholder).
- **Portrait** — `components/About.tsx` has a placeholder card; replace
  with an `<Image>` or a public image URL.
- **Colors** — `tailwind.config.ts` (`ink`, `mist`, `moon` palettes) and
  CSS variables in `app/globals.css`.
- **Hero copy** — `components/Hero.tsx`.
- **Services** — the six cards live in the `services` array in
  `components/Services.tsx`.

## License

Personal use. Crafted quietly in the small hours.
