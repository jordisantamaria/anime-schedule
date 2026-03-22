# PaoPaoAnime

今期アニメ、いつ・どこで配信？パオパオでかんたん確認。

Check which platforms stream this season's anime in Japan, with schedule times for DMM TV, U-NEXT, dアニメストア, ABEMA, Netflix, Disney+, and Amazon Prime Video.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v4
- **Auth** — Auth.js v5 (Google OAuth, JWT strategy)
- **Database** — Neon PostgreSQL + Drizzle ORM
- **Deploy** — Vercel

## Quick Start

```bash
# Clone
git clone https://github.com/user/paopaoanime.git
cd paopaoanime

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup Guide

### 1. Neon Database

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project (e.g., `paopaoanime`)
3. Copy the connection string and paste it as `DATABASE_URL` in `.env.local`
4. Create the `dropped_anime` table:

```sql
CREATE TABLE dropped_anime (
  user_id TEXT NOT NULL,
  anime_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, anime_slug)
);
```

You can run this SQL in the Neon Console's **SQL Editor**, or use any PostgreSQL client with your connection string.

### 2. Auth Secret

Generate a random secret for Auth.js:

```bash
openssl rand -base64 33
```

Paste the output as `AUTH_SECRET` in `.env.local`.

### 3. Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Application type: **Web application**
6. Add authorized redirect URIs:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy the **Client ID** and **Client Secret**
8. Paste them as `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env.local`

> If prompted to configure the OAuth consent screen first:
> - User type: **External**
> - App name: `PaoPaoAnime`
> - User support email: your email
> - Scopes: just the defaults (email, profile, openid)
> - Test users: add your own email while in "Testing" mode

### 4. Verify

```bash
pnpm build    # Should complete with 0 errors
pnpm dev      # Open http://localhost:3000, click login
```

## Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string | [Neon Console](https://console.neon.tech) |
| `AUTH_SECRET` | Random string for signing JWTs | `openssl rand -base64 33` |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret | Same as above |

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Project Structure

```
src/
  app/
    page.tsx                    # Home (latest episodes + latest anime)
    anime/[slug]/page.tsx       # Anime detail page
    drops/page.tsx              # Dropped anime management
    schedule/page.tsx           # Weekly schedule
    search/page.tsx             # Search
    api/auth/[...nextauth]/     # Auth API routes
  components/
    header.tsx                  # Navigation header
    auth-button.tsx             # Login / avatar dropdown
    home-content.tsx            # Home page client component
    drop-button-wrapper.tsx     # Drop toggle for detail pages
    drops-content.tsx           # Drops management list
    ...
  lib/
    auth.ts                     # Auth.js config
    db.ts                       # Drizzle + Neon connection
    schema.ts                   # Database schema
    data.ts                     # Anime data loader
    ...
  actions/
    drops.ts                    # Server actions for drop/undrop
```

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add the 4 environment variables from the table above
4. Make sure to update the Google OAuth redirect URI to your production domain

## License

MIT
