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
data/articles.json    one entry per guide (generates /blog/)
scripts/lib.js        shared <head>, header, footer, SEO tags, blocks
scripts/pages.js      home, advisory, support, network, about, contact, legal, 404
scripts/training.js   course hub, course pages, city pages
scripts/blog.js       guides index and article pages
scripts/redirects.js  stubs for URLs retired in the Aug 2026 repositioning
scripts/build.js      orchestration, sitemap, robots, SEO audit
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

`npm run build` ends with an SEO audit that **fails the build** if any page has
a missing or duplicate title or description, a title over 60 characters, a
description over 160, or anything other than exactly one `<h1>`. Those limits
are where Google truncates. Do not weaken the audit to make a page pass —
shorten the page's title or description instead.

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

## Adding a guide

Append to `articles` in `data/articles.json` and run `npm run build`, then
`npm run og` for its two images.

Guides exist because everything under `/training/` targets a transactional
query ("aws training fees"), which a domain with no backlinks cannot win
quickly. Guides target the questions asked *before* anyone is ready to buy,
which is where a new site can realistically rank.

| Field | Purpose |
|---|---|
| `slug` | URL segment — becomes `/blog/<slug>/` |
| `seoTitle` | Keep ≤48 chars so `seoTitle \| Jobjila` clears the 60-char cut |
| `metaDescription` | ≤158 chars |
| `title`, `excerpt`, `intro` | H1, standfirst, opening paragraph |
| `track` | One of the ids in `site.tracks` — sets the accent colour |
| `relatedCourses` | Course slugs — creates links in both directions |
| `cardLabel` | Short subject shown inside the on-page image. **Must not repeat the headline or the track name** — those already sit beside it |
| `sections[]` | `{ h, p[], list[], table{caption,head,rows}, p2[], note }`, rendered in that order |
| `faqs[]`, `takeaways[]` | FAQ schema, and the "In short" block |

Every guide is authored by `site.founder` in `BlogPosting` schema. That named
author is currently the site's only real E-E-A-T signal, so do not publish a
guide without one.

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

## Analytics

Off by default. Paste a GA4 Measurement ID into `data/site.json` and run
`npm run build`:

```json
"analytics": { "ga4": "G-XXXXXXXXXX" }
```

That single field drives **both** the tag and the Privacy Policy's measurement
section, so the policy can never claim "no analytics" while analytics is
running. Empty means no script, no requests to Google, and a policy that says
so. Do not add the tag by hand anywhere.

**Keep Google Signals OFF** in the GA4 property. With it on, Google may use the
data for advertising personalisation, which would make the policy's "no
advertising or cross-site tracking pixels" claim untrue.

### Conversion events

There are no forms, so a WhatsApp click *is* the conversion. `js/main.js` sends:

| Event | Fires on | Tells you |
|---|---|---|
| `contact_whatsapp` | any `wa.me/<number>` link | which page produced an enquiry |
| `share` (`whatsapp` / `linkedin` / `copy_link`) | the share row | what people pass on |
| `contact_email` | any `mailto:` link | — |

`contact_whatsapp` is the one to mark as a **Key event** in GA4. Without it,
analytics shows page views and never tells you which page actually works.

## Retired URLs

`scripts/redirects.js` generates a stub at every URL the August 2026
repositioning deleted — 110 of them, mostly the old `/courses/<slug>/<city>/`
tree across twelve cities. Each stub carries `rel=canonical` to its replacement
plus a zero-delay meta refresh, which Google treats as a redirect.

GitHub Pages cannot issue a 301. **If the site ever moves to a host that can,
replace these with server rules and delete the file.** The stubs are
deliberately absent from `sitemap.xml` and deliberately *not* blocked in
`robots.txt` — Google has to be able to crawl them to see the canonical.

`404.html` catches everything the stubs do not.

## Share preview images

Two images per guide, one per course, plus `assets/logo.png`:

| File | Where it is used | Contains the title? |
|---|---|---|
| `assets/og/<course>.jpg` | og:image for a course | Yes |
| `assets/blog/<slug>.jpg` | og:image for a guide | Yes |
| `assets/blog/<slug>-card.jpg` | the `<img>` on the page itself | **No** |
| `assets/logo.png` | `Organization.logo` in schema, footer | — |

The on-page card carries `cardLabel`, not the headline. Social platforms render
og:title next to og:image, and the page renders its own `<h1>` right above the
figure, so a title inside the picture is always a duplicate. Keep it that way.

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

On every generated page: unique title (≤60) and description (≤160), a
canonical, Open Graph and Twitter tags with a real image, and JSON-LD for
`Organization`, `Person`, `WebSite`, `Course`, `BlogPosting`, `Blog`,
`Service`, `AboutPage`, `ContactPage`, `BreadcrumbList`, `FAQPage` and
`ItemList`.

Two rules that are easy to break by accident:

- **City pages.** `city.faqs` is a *pool*; `scripts/training.js` picks two per
  course by rotation. Using the whole pool on every page pushed same-city
  overlap to 49%, which is doorway-page territory. It is now 36%. Every open
  course also needs an entry in that city's `courseNotes`, or its page falls
  back to a sentence identical to every other city's.
- **`sameAs` and `founder.linkedin`** are only emitted when non-empty. An empty
  `sameAs` array is a worse signal than no property at all.

### Still to do — these need you, not the code

1. **Re-submit `sitemap.xml` in Google Search Console.** URLs moved from
   `/courses/…` to `/training/…`; the stubs handle the old ones, but Search
   Console needs the new sitemap.
2. **Create a Google Business Profile.** For training and IT service providers
   in India this often outperforms the website itself.
3. **Add `founder.linkedin`** in `data/site.json`. The About page links it, the
   `Person` schema uses it as `sameAs`, and it is the cheapest available
   credibility signal for a new business.
4. **Confirm the course fees.** The figures in `data/courses.json` are
   estimates, and they are live on the site.
5. **Get backlinks.** No amount of on-page work substitutes for this, and it is
   the single largest remaining gap.

## Other directories

`ngo/`, `doctor/`, `ecomm/`, `realestate/`, `bookflip/` are unrelated earlier
prototypes kept in this repo. They are excluded in `robots.txt`.
