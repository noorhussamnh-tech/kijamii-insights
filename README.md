# Kijamii Consumer Insights & Data Studio

The credentials website for Kijamii Consumer Insights & Data Studio: who we are, the work
we've done, our services and approaches, and how to book a call. It is written for any
prospective client.

It is a plain static site in `public/`, with no build step and no server.

## What's in it

| Path | What it is |
|---|---|
| `public/index.html` | The whole site: one page, with all styles and scripts inside it |
| `public/img/` | Client logos, case images and the Kijamii logo |
| `public/assets/favicon.png` | Browser tab icon |
| `public/analytics.js` | Visitor counts (Cloudflare Web Analytics). Off until a token is added |
| `public/robots.txt` | Asks search engines not to list the site (the page also has `noindex`) |
| `wrangler.jsonc` | Cloudflare settings: serve `public/` as a static site |

## Common edits

- **Booking link:** near the bottom of `public/index.html`, change `BOOKING_URL`.
  Leave it empty and the "Book a call" button opens an email instead.
- **Contact person and email:** the `contact` section near the bottom of `public/index.html`.
- **Visitor counts:** paste the site token from Cloudflare → Web Analytics into `TOKEN`
  in `public/analytics.js`.
- **Letting search engines list the site:** remove the `noindex` line in the page head and
  change `robots.txt` to `Disallow:` (empty).

## Run it locally

`python3 -m http.server` inside `public/`, then open http://localhost:8000.

## Hosting

Any free static host works. On Cloudflare, connect this repo and leave the build command
empty; `wrangler.jsonc` points it at `public/`.
