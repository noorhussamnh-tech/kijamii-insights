# Kijamii Consumer Insights website: project context

Read this first in any new session.

## Who and what
- **Owner:** Noor (Head of Consumer Insights, Kijamii agency).
- **What:** the commercial credentials site for Kijamii Consumer Insights & Data Studio,
  aimed at any prospective client. Copy comes from the 2026 offering deck.
- **Tone with Noor:** short and plain. Don't guess facts; say when something is unconfirmed.
  Give steps one numbered click at a time.

## How it works
- One static page, `public/index.html`, with styles and scripts inline. No build step.
- Booking link: `BOOKING_URL` in the script at the bottom of `index.html`.
- Visitor counts: `public/analytics.js` (token empty = off).
- Live at https://kijamii-insights.pages.dev (Cloudflare Pages, connected to this repo:
  branch `main`, no build command, output `public`). Every merge to `main` should deploy.
- A duplicate Worker also called `kijamii-insights` (on cis-live.workers.dev) exists in
  Noor's Cloudflare account from an earlier setup click. It is not the live site.

## Intelligence Library (`/library/`)
- https://kijamii-insights.pages.dev/library/ : industry topics (`public/library/data.js`) and the
  monthly Culture Pulse (`public/library/culture.js`, route `#/culture`). EN by default, عربي button.
- Industry, not brand: commissioned studies never name the client or show brand results.
  Culture Pulse takes only the culture, entertainment, trending-title and YouTube sections of the
  monthly Netflix pulse deck; never its Netflix deep-dive or platform-vs-platform pages.
- `sample: true` topics have made-up numbers and show in Team view only. Team view is not access control.
- Its own look (Lexend, Paytone One, Playfair) is separate from the credentials page rules below.

## Rules (never break)
1. **Site text matches the 2026 offering deck word for word**, tool names included
   (Noor approved showing them on 2026-10-27). Fonts: Impact for titles, Lexend for
   everything else. No Paytone One.
2. Case studies only state what the deck or Noor has confirmed.

## Case studies on the page
Netflix MENA (Saudi Pro League), NBA, Costa Coffee, InstaPay, an independent Saudi music
study, and the Creative Summit قمة الإبداع live dashboard (Riyadh, Oct 2026). The Creative
Summit example links to its live dashboard, which is hosted separately at
https://creative-summit-pulse.cis-live.workers.dev.
