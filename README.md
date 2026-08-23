# Jobjila

**Learn. Get Verified. Earn.** — the marketing site for jobjila.com.

A static site (GitHub Pages, custom domain via `CNAME`) generated from a single
data file, so adding a course never means hand-editing HTML.

## How it works

Everything under `/courses/` plus the marketing pages, `sitemap.xml` and
`robots.txt` are **generated**. Do not edit those HTML files directly — your
changes will be overwritten on the next build.

```
data/courses.json      <- the only file you edit to add or change a course
scripts/lib.js         <- shared chrome: <head>, header, footer, SEO tags, cards
scripts/pages.js       <- the standalone pages (home, hire, trainer, blog, ...)
scripts/build.js       <- orchestrates everything, writes sitemap + robots
css/theme.css          <- the design system (hand-written)
js/main.js             <- nav, forms, query-string prefill (hand-written)
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
4. Add city landing pages (`/courses/<slug>/<city>/`) once there is genuinely
   local content to put on them — local fees, local trainers, local hiring
   companies. Duplicated city pages with swapped names get ignored by Google.

## Connecting the forms

The site is static, so the contact and trainer-application forms have no
backend. Open `js/main.js` and set:

```js
var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
```

Any handler that accepts a `POST` works — Formspree, Basin, Getform, or a
Google Apps Script web app. Until it is set, the forms tell visitors to email
`hello@jobjila.com` rather than silently failing.

## Other directories

`ngo/`, `doctor/`, `ecomm/`, `realestate/`, `bookflip/` are unrelated earlier
prototypes kept in this repo. They are excluded in `robots.txt` so they cannot
dilute the main site in search results.
