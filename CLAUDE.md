# PlatePerform — Project Context

## What is this project?
PlatePerform is an athlete's international cookbook web app with subscription access. Built with Next.js, hosted on Netlify, connected to GitHub for auto-deploys.

## Source code location
`/Users/elio/Desktop/PlatePerform Source`

## Tech stack
- **Framework**: Next.js (App Router, Turbopack) with TypeScript
- **Styling**: Tailwind CSS v4
- **Hosting**: Netlify (Next.js Runtime — NOT static export)
- **Repo**: GitHub — `eliokroes-cmd/plateperform-source`
- **Auth**: Supabase (`@supabase/supabase-js`)
- **Payments**: RevenueCat Web Billing (`@revenuecat/purchases-js`)
- **Package manager**: bun

## Environment variables (in .env.local — never commit)
- `NEXT_PUBLIC_REVENUECAT_API_KEY` = rcb_fpzaWZVQVnSEbQhTTRtGlQDOCmQO
- `NEXT_PUBLIC_SUPABASE_URL` = https://pdgxsmszffnduexlloyp.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sb_publishable_fTzI3VUwJro4UMQr2JiHMg_YJNkz1Mp
- `NEXT_PUBLIC_ADMIN_EMAIL` = eliokroes@hotmail.com

## Admin access
The email `eliokroes@hotmail.com` always bypasses the paywall and has full dashboard access. This is checked in `src/app/dashboard/layout.tsx`.

## Pricing
- Monthly: €15/month
- Annual: €150/year (€12.50/month) — shown as "Most Popular"

## Key files
- `src/app/page.tsx` — homepage
- `src/app/pricing/page.tsx` — pricing page (2 cards: Monthly + Annual, no toggle)
- `src/app/dashboard/layout.tsx` — paywall gate (checks Supabase session + RevenueCat isPro)
- `src/app/login/page.tsx` — Supabase login
- `src/app/signup/page.tsx` — Supabase signup (new users land here before paying)
- `src/contexts/RevenueCatContext.tsx` — RevenueCat SDK setup, isPro state
- `src/contexts/LanguageContext.tsx` — language switching (EN, NL, ES)
- `src/lib/supabase.ts` — Supabase client
- `src/lib/translations.ts` — all text strings for EN, NL, ES
- `src/components/Navbar.tsx` — site navigation
- `netlify.toml` — build config (`bun run build`, publish `.next`)
- `next.config.ts` — minimal config (no static export)

## Deploy flow
Push to GitHub → Netlify auto-deploys. Use:
```
git add <files> && git commit -m "message" && git push origin main
```

## Important rules
- Do NOT add `output: 'export'` to next.config.ts — breaks dynamic routes
- Do NOT commit `node_modules/` or `.next/` — they're in .gitignore
- Do NOT commit `.env.local` — it's in .gitignore
- Always use `router.push()` for navigation, not `window.location.href`
- Always wrap `localStorage` in try-catch (throws in iOS private mode)
