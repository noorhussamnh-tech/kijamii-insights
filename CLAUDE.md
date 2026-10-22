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
- Not yet deployed. `wrangler.jsonc` is ready for Cloudflare Workers static assets.

## Rules (never break)
1. **Never name the listening tool or any data-source tool** on the site. Tool names from
   the deck are left out on purpose.
2. Case studies only state what the deck or Noor has confirmed.

## Case studies on the page
Netflix MENA (Saudi Pro League), NBA, Costa Coffee, InstaPay, an independent Saudi music
study, and the Creative Summit قمة الإبداع live dashboard (Riyadh, Oct 2026). The Creative
Summit example links to its live dashboard, which is hosted separately at
https://creative-summit-pulse.cis-live.workers.dev.
