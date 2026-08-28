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

/* Pages that are not generated from the course data. */
const STATIC_URLS = [
  { url: "/",               priority: "1.0", freq: "weekly" },
  { url: "/it-advisory/",   priority: "0.9", freq: "monthly" },
  { url: "/it-support/",    priority: "0.9", freq: "monthly" },
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
  const urls = [...STATIC_URLS, ...buildTraining.urls()];

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

console.log("Building Jobjila\n");
const pages = buildPages();
const training = buildTraining();
const urls = buildSitemap();
console.log(`\n${pages} standalone + ${training} training = ${pages + training} pages, ${urls} sitemap URLs.`);
