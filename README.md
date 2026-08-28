# Jobjila IT Services

**IT advisory, support and training.** Marketing site for jobjila.com.

A static site (GitHub Pages, custom domain via `CNAME`) generated from data files,
so adding a course or a city never means hand-editing HTML.

## How it works

Everything under `/training/`, the standalone pages, `sitemap.xml` and
`robots.txt` are **generated**. Do not edit those HTML files — they are
overwritten on the next build.

```
data/site.json        brand, contact, founder, pricing rules, tracks
data/courses.json     one entry per course
data/cities.json      one entry per city (generates local pages)
scripts/lib.js        shared <head>, header, footer, SEO tags, blocks
scripts/pages.js      home, advisory, support, network, about, contact, legal
scripts/training.js   course hub, course pages, city pages
scripts/build.js      orchestration, sitemap, robots
scripts/og-images.js  social share images (run separately — see below)
css/theme.css         design system (hand-written)
js/main.js            mobile nav, share buttons (hand-written)
```

## Commands

```bash
npm install       # once
npm run build     # regenerate every page + sitemap.xml + robots.txt
npm start         # build, then serve at http://localhost:5500
npm run og        # regenerate share images (needs playwright-core)
```

**Always run `npm run build` and commit the generated files** — GitHub Pages
serves what is in the repo; it does not run the build.

## The trust model

The site is built around one commitment, and the wording appears in several
places generated from `site.pricing`:

| Step | Amount | Rule |
|---|---|---|
| First class | ₹0 | Free, no payment or card details |
| Booking | ₹500 | Fully refundable |
| Balance | course fee | Due before session 3 |
| Refund window | — | 7 days, if ≤3 sessions attended |

Change any of those numbers in `data/site.json` and every page, plus the
Refund Policy and Terms, updates on the next build.

**Do not remove the "What we do not promise" block.** It states plainly that
we do not guarantee jobs or income and never charge candidates a fee. That is
both legally protective and the single strongest credibility signal on a new
training site.

## Adding a course

Append to `courses` in `data/courses.json` and run `npm run build`. The course
page, its city pages, sitemap entries, schema markup and every internal link
appear automatically.

| Field | Purpose |
|---|---|
| `slug` | URL segment — becomes `/training/<slug>/` |
| `name`, `short` | Full title, and the short label used in lists |
| `track` | One of the ids in `site.tracks` — sets the accent colour |
| `seoTitle` | The `<title>`. Money keyword first |
| `metaDescription` | 150–160 chars, written to be clicked |
| `tagline`, `intro` | Opening copy |
| `duration`, `effort`, `level`, `priceINR` | Sidebar facts and schema |
| `certification` | External exam it prepares for, or "No external certification" |
| `roles` | Job titles — always framed as market observations |
| `modules[]` | `{ title, detail }` |
| `outcomes[]`, `tools[]`, `faqs[]` | Lists; `faqs` becomes FAQ schema |

After changing a course name or fee, run `npm run og` so its share image matches.

## Adding a city

`data/cities.json` generates one page per open course per city at
`/training/<course>/<city>/`, targeting `[course] training in [city]`.

**Google drops near-identical pages as doorway pages.** Every city must
therefore carry genuinely local content: `hubs` (real local tech areas),
`intro`, `employerType`, `salaryNote`, `demandLead`, per-course `courseNotes`
and two city-specific `faqs`. Do not add a city you cannot write real local
detail for — thin city pages put the whole set at risk, not just the new page.

## Share preview images

`assets/og/*.jpg` are what WhatsApp, LinkedIn and Telegram show when a link is
shared. They are committed, and `npm run build` does not regenerate them —
that would make Playwright a required dependency for every build.

```bash
npm install --no-save playwright-core
npm run og
```

Platforms cache previews hard. After changing one, force a re-read via
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Contact links

There are no forms — a static site has no backend to receive one, and WhatsApp
converts better in this market. `site.whatsapp` drives every link. Note the
two distinct kinds:

| Link | Goes to | Purpose |
|---|---|---|
| `wa.me/<site.whatsapp>?text=…` | Our inbox | Visitor enquires |
| `wa.me/?text=<page url>` | Their contacts | Visitor shares the page |

## SEO

On every generated page: unique title, meta description and canonical; Open
Graph and Twitter tags with a real image; and JSON-LD for `Organization`,
`WebSite`, `Course`, `Service`, `BreadcrumbList` and `FAQPage`.

Still to do:

1. Submit `sitemap.xml` in Google Search Console.
2. Create a Google Business Profile — for training and IT service providers in
   India this often outperforms the website itself.
3. Add `founder.linkedin` in `data/site.json` once available; the About page
   links it and it is a meaningful trust signal for a new business.

## Other directories

`ngo/`, `doctor/`, `ecomm/`, `realestate/`, `bookflip/` are unrelated earlier
prototypes kept in this repo. They are excluded in `robots.txt`.
