/**
 * Redirect stubs for URLs that used to exist.
 *
 * The site was repositioned in August 2026 and 110 URLs disappeared — the old
 * /courses/<slug>/<city>/ tree across twelve cities, plus a few standalone
 * pages. Anything Google had crawled at those addresses was returning a hard
 * 404, which throws away the crawl equity instead of passing it on.
 *
 * GitHub Pages serves static files and cannot issue a 301, so each old URL
 * gets a stub carrying rel=canonical to its replacement plus a zero-delay meta
 * refresh. Google treats that combination as a redirect. It is weaker than a
 * real 301 — if the site ever moves to a host that can issue one, replace
 * these with server rules and delete this file.
 *
 * These stubs are deliberately NOT in sitemap.xml: they are for Google
 * re-crawling old addresses, not pages we want indexed.
 */

const path = require("path");
const { site, esc, write } = require("./lib");

/* Old course slug -> where that audience should land now. Courses with no
   equivalent (digital marketing, HR payroll, spoken English, web design) go to
   the training hub rather than to a course that would mislead. */
const COURSE_MAP = {
  "ai-prompt-engineering": "/training/ai-automation-for-it/",
  "cloud-computing": "/training/aws-cloud/",
  "data-analytics": "/training/data-analytics-power-bi/",
  "it-infrastructure": "/training/it-infrastructure/",
  "presales-consulting": "/training/presales-consulting/",
  "freelancing-bootcamp": "/network/",
  "digital-marketing": "/training/",
  "hr-payroll": "/training/",
  "spoken-english-interview": "/training/",
  "web-design": "/training/",
};

/* Cities we still publish pages for. An old city URL for one of these keeps
   its local intent; the other nine land on the course page instead. */
const LIVE_CITIES = new Set(["noida", "greater-noida", "delhi"]);

const OLD_CITIES = [
  "ahmedabad", "bangalore", "chennai", "delhi", "gurgaon", "hyderabad",
  "indore", "kolkata", "lucknow", "mumbai", "noida", "pune",
];

const STANDALONE = {
  "/courses/": "/training/",
  "/become-a-trainer/": "/network/",
  "/for-freelancers/": "/network/",
  "/hire/": "/contact/",
};

function buildMap() {
  const map = { ...STANDALONE };

  Object.entries(COURSE_MAP).forEach(([oldSlug, target]) => {
    map[`/courses/${oldSlug}/`] = target;

    OLD_CITIES.forEach((city) => {
      const isCourse = target.startsWith("/training/") && target !== "/training/";
      map[`/courses/${oldSlug}/${city}/`] =
        isCourse && LIVE_CITIES.has(city) ? `${target}${city}/` : target;
    });
  });

  return map;
}

function stub(from, to) {
  const target = site.url + to;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Moved — ${esc(site.name)}</title>
<link rel="canonical" href="${esc(target)}">
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<meta name="description" content="This page has moved. You are being sent to ${esc(target)}.">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/theme.css">
</head>
<body>
<main id="main">
  <section class="page-hero">
    <div class="wrap">
      <span class="eyebrow">Page moved</span>
      <h1>This page has a new address</h1>
      <p><code>${esc(from)}</code> moved when we reorganised the site. You are being redirected &mdash; if nothing happens, follow the link below.</p>
      <div class="btns">
        <a class="btn btn-ondark btn-lg" href="${esc(to)}">Continue to the new page</a>
      </div>
    </div>
  </section>
</main>
<script>location.replace(${JSON.stringify(to)});</script>
</body>
</html>
`;
}

module.exports = function buildRedirects() {
  const map = buildMap();
  Object.entries(map).forEach(([from, to]) =>
    write(path.join(from.replace(/^\/|\/$/g, ""), "index.html"), stub(from, to)));
  return Object.keys(map).length;
};

module.exports.map = buildMap;
