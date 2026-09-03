#!/usr/bin/env node
/**
 * Jobjila site generator.
 *
 * Everything under /training/ plus the standalone pages, sitemap.xml and
 * robots.txt are generated from data/. Do not hand-edit the HTML.
 *
 *   npm run build
 */

const { site, write } = require("./lib");
const buildPages = require("./pages");
const buildTraining = require("./training");
const buildBlog = require("./blog");
const buildRedirects = require("./redirects");

/* Pages that are not generated from the course data. */
const STATIC_URLS = [
  { url: "/",               priority: "1.0", freq: "weekly" },
  { url: "/it-advisory/",   priority: "0.9", freq: "monthly" },
  { url: "/it-support/",    priority: "0.9", freq: "monthly" },
  { url: "/recruitment/",   priority: "0.9", freq: "monthly" },
  { url: "/for-candidates/", priority: "0.7", freq: "monthly" },
  { url: "/network/",       priority: "0.8", freq: "monthly" },
  { url: "/about/",         priority: "0.7", freq: "monthly" },
  { url: "/contact/",       priority: "0.7", freq: "yearly" },
  { url: "/locations/",     priority: "0.7", freq: "monthly" },
  { url: "/refund-policy/", priority: "0.5", freq: "yearly" },
  { url: "/terms/",         priority: "0.4", freq: "yearly" },
  { url: "/privacy/",       priority: "0.4", freq: "yearly" },
];

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...STATIC_URLS, ...buildTraining.urls(), ...buildBlog.urls()];

  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${site.url}${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`);

  write("robots.txt", `User-agent: *
Allow: /

# Generator sources and unrelated older prototypes are not site content
Disallow: /scripts/
Disallow: /data/
Disallow: /bookflip/
Disallow: /ecomm/
Disallow: /doctor/
Disallow: /ngo/
Disallow: /realestate/

Sitemap: ${site.url}/sitemap.xml
`);

  return urls.length;
}

/**
 * Build-time SEO guard. Titles over ~60 characters and descriptions over ~160
 * are truncated in results, which costs click-through on every impression.
 * This walks the generated HTML and fails the build rather than letting a
 * regression ship quietly — a previous version shipped 39 over-long titles.
 */
function audit() {
  const fs = require("fs");
  const path = require("path");
  const ROOT = path.join(__dirname, "..");
  const SKIP = new Set(["node_modules", ".git", "ngo", "doctor", "ecomm", "realestate", "bookflip", "docs", "assets", "courses", "become-a-trainer", "for-freelancers", "hire"]);
  const TITLE_MAX = 60;
  const DESC_MAX = 160;
  /* Compare what Google sees, not the escaped source: "&amp;" is one
     character in a result snippet, not five. */
  const unesc = (x) => x
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#8377;/g, "\u20b9").replace(/&middot;/g, "\u00b7")
    .replace(/&mdash;/g, "\u2014").replace(/&ndash;/g, "\u2013");
  const problems = [];
  const seen = { titles: new Map(), descs: new Map() };

  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name)); continue; }
      if (!e.name.endsWith(".html")) continue;
      const rel = path.relative(ROOT, path.join(dir, e.name));
      const html = fs.readFileSync(path.join(dir, e.name), "utf8");
      const title = unesc((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
      const desc = unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
      const h1s = (html.match(/<h1[\s>]/g) || []).length;

      if (!title) problems.push(`${rel}: no <title>`);
      else if (title.length > TITLE_MAX) problems.push(`${rel}: title ${title.length} chars — "${title}"`);
      if (!desc) problems.push(`${rel}: no meta description`);
      else if (desc.length > DESC_MAX) problems.push(`${rel}: description ${desc.length} chars`);
      if (h1s !== 1) problems.push(`${rel}: ${h1s} <h1> elements`);

      if (title) (seen.titles.get(title) || seen.titles.set(title, []).get(title)).push(rel);
      if (desc) (seen.descs.get(desc) || seen.descs.set(desc, []).get(desc)).push(rel);
    }
  })(ROOT);

  for (const [t, files] of seen.titles) if (files.length > 1) problems.push(`duplicate title on ${files.length} pages: "${t}"`);
  for (const [, files] of seen.descs) if (files.length > 1) problems.push(`duplicate description on ${files.length} pages: ${files[0]} …`);

  if (problems.length) {
    console.error("\nSEO audit failed:");
    problems.forEach((p) => console.error("  ! " + p));
    process.exitCode = 1;
  } else {
    console.log("\nSEO audit passed: every page has one h1, a unique title \u2264" + TITLE_MAX + " and a unique description \u2264" + DESC_MAX + ".");
  }
}

console.log("Building Jobjila\n");
const pages = buildPages();
const training = buildTraining();
const blog = buildBlog();
const redirects = buildRedirects();
const urls = buildSitemap();
audit();
console.log(`\n${pages} standalone + ${training} training + ${blog} blog = ${pages + training + blog} pages`);
console.log(`${redirects} redirect stubs for retired URLs (not in the sitemap).`);
console.log(`${urls} sitemap URLs.`);
