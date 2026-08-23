# Jobjila

**Learn. Get Verified. Earn.** — the marketing site for jobjila.com.

A static site (GitHub Pages, custom domain via `CNAME`) generated from a single
data file, so adding a course never means hand-editing HTML.

## How it works

Everything under `/courses/` plus the marketing pages, `sitemap.xml` and
`robots.txt` are **generated**. Do not edit those HTML files directly — your
changes will be overwritten on the next build.

```
data/courses.json      <- courses, site details, WhatsApp number
data/cities.json       <- city landing pages (one per course, per city)
scripts/lib.js         <- shared chrome: <head>, header, footer, SEO tags, cards
scripts/pages.js       <- the standalone pages (home, hire, trainer, blog, ...)
scripts/cities.js      <- city landing pages + the /locations/ hub
scripts/build.js       <- orchestrates everything, writes sitemap + robots
scripts/og-images.js   <- share preview images (run separately, see below)
css/theme.css          <- the design system (hand-written)
js/main.js             <- mobile nav + floating button behaviour (hand-written)
```

## Commands

```bash
npm install       # once
npm run build     # regenerate every page + sitemap.xml + robots.txt
npm start         # build, then serve at http://localhost:5500
```

**Always run `npm run build` and commit the generated files** — GitHub Pages
serves what is in the repo, it does not run the build for you.

## Adding a course

Append an object to `courses` in `data/courses.json` and run `npm run build`.
A new page, its sitemap entry, its schema markup and its links from the hub,
footer and related-course rows all appear automatically.

Required fields:

| Field | Purpose |
|---|---|
| `slug` | URL segment — becomes `/courses/<slug>/` |
| `name` | Course title (H1) |
| `seoTitle` | The `<title>` tag. Put the money keyword first |
| `metaDescription` | 150–160 chars, written to be clicked |
| `keywords` | Target search terms for this page |
| `tagline`, `intro` | Opening copy |
| `category`, `accent` | `accent` is `brand`, `accent` or `success` (card colour) |
| `status` | `open` (live) or `soon` (waitlist page) |
| `trending` | `true` puts it on the homepage rail |
| `duration`, `effort`, `level`, `mode` | Shown in the sidebar fact list |
| `priceINR` | Number, no symbol — formatted and put into schema |
| `earning` | The green strip. Always state real money |
| `paths` | `{ job, freelance, business }` — the three earning routes |
| `modules[]` | `{ title, detail }` — leave `[]` for a coming-soon course |
| `outcomes[]`, `tools[]` | Bullet lists |
| `faqs[]` | `{ q, a }` — these become FAQ schema, so write real questions |

A `soon` course only needs the fields above `modules`; empty arrays render the
waitlist variant of the page.

## SEO notes

Already in place on every generated page:

- Unique `<title>`, meta description and `rel="canonical"`
- Open Graph + Twitter card tags
- JSON-LD: `EducationalOrganization`, `WebSite`, `Course`, `BreadcrumbList`,
  `FAQPage`, `ItemList` — validate at <https://validator.schema.org>
- One `<h1>` per page, semantic headings below it
- `sitemap.xml` and `robots.txt` regenerated on every build

Still to do (in priority order):

1. Submit `sitemap.xml` in Google Search Console and verify the domain.
2. Create and populate a Google Business Profile — for training providers in
   India this often outperforms the website itself.
3. Write the blog posts listed on `/blog/` and link each one to its course page.
4. Add city landing pages (`/courses/<slug>/<city>/`) for Delhi, Noida and
   Lucknow — this is the biggest remaining SEO win, since `[course] + [city]`
   is the highest-volume commercial search pattern in India. Only build them
   once there is genuinely local content to put on each: local fee range,
   local trainer names, local hiring companies. City pages that just swap the
   city name are treated as duplicates and get ignored.

## Setting your WhatsApp number (do this first)

Every call to action on the site opens a pre-filled WhatsApp chat. There are
no forms anywhere — a static site has no backend to receive one, and in India
WhatsApp converts better regardless.

Open `data/courses.json` and replace the placeholder:

```json
"whatsapp": "919876543210",
```

Use country code + number, digits only, no `+` or spaces (e.g. `919876543210`).
Then run `npm run build`. That single value drives all 80 WhatsApp links on the
site — the header button, the floating chat button, every course page, and the
four routes on `/contact/`.

**The site will not work correctly until this is changed.** The placeholder is
not a real number.

### Why pre-filled messages matter

Each button opens WhatsApp with the message already written, including which
course or page the person came from:

> Hi Jobjila, I am interested in the Cloud Computing with AWS & Azure course
> (10 weeks, ₹18,500). Please share the next batch dates.

So you know the source of every enquiry without asking — something a plain
contact form would not tell you.

## City landing pages

`data/cities.json` generates one page per open course per city, at
`/courses/<course>/<city>/`, plus the `/locations/` hub. Twelve cities x eight
open courses is currently 96 pages.

These target the highest-volume commercial search pattern in India:
`[course] course in [city]`, plus "fees", "placement" and "near me".

**The rule that makes or breaks them:** Google drops near-identical pages as
doorway pages. So every city entry must carry genuinely local content — that
is what the required fields are for:

| Field | Why it exists |
|---|---|
| `hubs` | The city's actual tech areas (Electronic City, HITEC City, Hinjewadi...) |
| `intro` | 2–3 sentences on that city's real job market character |
| `employerType` | Who actually hires there |
| `salaryNote` | How local pay compares, and what it costs to live there |
| `demandLead` | Which skills lead demand in that city |
| `courseNotes` | Per-course local note. Written for the courses that matter most in that city; others fall back to a note built from `hubs` and `employerType` |
| `faqs` | Two questions specific to that city |

Current state, measured by `scripts/build.js` output: city pages for the same
course share about 44% of their text, so roughly half of each page is unique.
The shared half is the syllabus and outcomes, which legitimately are the same
course. **If you add a city with thin or copied content, that ratio drops and
the whole set is at risk — not just the new page.**

Adding a city is one JSON entry and a rebuild. Do not add one you cannot write
real local detail for.

## Share preview images (og:image)

`assets/og/*.jpg` are the pictures WhatsApp, LinkedIn and Telegram show when
someone shares a link. Without them a shared link is a bare blue URL, which is
the main reason shared links do not get tapped.

They are **committed to the repo** and `npm run build` does not regenerate
them — that would make Playwright a required dependency for every build.
Regenerate only when a course name, fee or the branding changes:

```bash
npm install --no-save playwright-core
npm run og
```

After changing an image, ask the platform to re-read it — they cache
aggressively:

- WhatsApp: append `?v=2` to the URL when testing
- LinkedIn: <https://www.linkedin.com/post-inspector/>
- Facebook: <https://developers.facebook.com/tools/debug/>

## Sharing

Every course page, city page, the course hub and the homepage carry a share
row. Note the difference between the two kinds of WhatsApp link on the site:

| Link | Goes to | Purpose |
|---|---|---|
| `wa.me/<site.whatsapp>?text=...` | Your inbox | Visitor enquires |
| `wa.me/?text=<page url>` | Their contacts | Visitor shares the page |

On phones the first share button uses the **native share sheet**
(`navigator.share`), so one tap reaches WhatsApp, Instagram, Telegram and SMS.
`js/main.js` swaps the label to "Share" when the browser supports it; without
JavaScript it stays a plain working WhatsApp link.

## Other directories

`ngo/`, `doctor/`, `ecomm/`, `realestate/`, `bookflip/` are unrelated earlier
prototypes kept in this repo. They are excluded in `robots.txt` so they cannot
dilute the main site in search results.
