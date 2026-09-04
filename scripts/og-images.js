#!/usr/bin/env node
/**
 * Generates the social share preview images (og:image) used when a page is
 * shared on WhatsApp, LinkedIn, Telegram or Facebook.
 *
 * Without these, a shared jobjila.com link shows as a bare blue URL with no
 * picture, which is the single biggest reason shared links do not get tapped.
 *
 * Output: assets/og/<course-slug>.jpg plus assets/og/default.jpg, all 1200x630.
 * JPEG rather than PNG: the gradient background compresses far better as JPEG
 * (~70 KB vs ~360 KB), and every social platform re-encodes the image anyway.
 *
 * These images are COMMITTED to the repo — the normal `npm run build` does not
 * regenerate them, because that would make Playwright a required dependency
 * for anyone building the site. Re-run this only when course names, fees or
 * the brand change:
 *
 *   npm install playwright-core     (once, ~5 MB — the browser is separate)
 *   npm run og
 *
 * If Chromium is not installed locally, install it with:
 *   npx playwright install chromium
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const site = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "site.json"), "utf8"));
const { courses } = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "courses.json"), "utf8"));
const { articles } = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "articles.json"), "utf8"));

const OUT_DIR = path.join(ROOT, "assets", "og");
const BLOG_DIR = path.join(ROOT, "assets", "blog");
const ASSET_DIR = path.join(ROOT, "assets");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

/** Locate a usable Chromium without requiring a full playwright install. */
function findChromium() {
  const candidates = [
    process.env.CHROMIUM_PATH,
    "/opt/pw-browsers/chromium/chrome-linux/chrome",
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p));
}

function card({ eyebrow, title, meta, footnote }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px;
    font-family: "Liberation Sans", "IBM Plex Sans", Arial, sans-serif;
    color: #fff;
    background:
      radial-gradient(900px 460px at 10% -8%, rgba(15,110,92,.62), transparent 60%),
      radial-gradient(760px 400px at 95% 10%, rgba(59,78,155,.34), transparent 62%),
      linear-gradient(165deg, #0b1220 0%, #131c31 55%, #1a2547 100%);
    padding: 68px 72px;
    display: flex; flex-direction: column; justify-content: space-between;
    overflow: hidden;
  }
  .top { display: flex; align-items: center; gap: 16px; }
  .mark {
    width: 56px; height: 56px; border-radius: 15px;
    background: linear-gradient(135deg, #17a085, #0b5546);
    display: flex; align-items: center; justify-content: center;
    font-size: 30px; font-weight: 700;
  }
  .brand { font-size: 34px; font-weight: 700; letter-spacing: -1px; }
  .eyebrow {
    display: inline-block;
    font-size: 20px; font-weight: 700;
    letter-spacing: 2.4px; text-transform: uppercase;
    color: #6ed3ba;
    margin-bottom: 20px;
  }
  h1 {
    font-size: ${title.length > 46 ? 62 : title.length > 30 ? 74 : 86}px;
    font-weight: 700; line-height: 1.06; letter-spacing: -2.4px;
    max-width: 15ch;
  }
  .meta { display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
  .chip {
    font-size: 22px; font-weight: 700;
    padding: 11px 22px; border-radius: 999px;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.24);
  }
  .chip--go { background: #17a085; border-color: #17a085; color: #04201a; }
  .foot {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 24px; color: rgba(255,255,255,.66);
    border-top: 1px solid rgba(255,255,255,.16);
    padding-top: 26px;
  }
  .foot b { color: #fff; font-weight: 700; }
</style></head>
<body>
  <div class="top"><div class="mark">J</div><div class="brand">Jobjila</div></div>
  <div>
    <span class="eyebrow">${esc(eyebrow)}</span>
    <h1>${esc(title)}</h1>
    <div class="meta">${meta.map((m, i) => `<span class="chip${i === meta.length - 1 ? " chip--go" : ""}">${esc(m)}</span>`).join("")}</div>
  </div>
  <div class="foot"><span>${esc(footnote)}</span><span><b>jobjila.com</b></span></div>
</body></html>`;
}

/** Share card for a guide. Also rendered on the page itself, so it is the
    only real <img> on an article — which is what makes the site eligible for
    image results at all. */
function articleCard({ eyebrow, title, meta, footnote }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px;
    font-family: "Liberation Serif", "IBM Plex Serif", Georgia, serif;
    color: #0d1420;
    background:
      radial-gradient(720px 420px at 88% -10%, rgba(15,110,92,.16), transparent 62%),
      linear-gradient(160deg, #f6f7f5 0%, #eceee9 100%);
    padding: 68px 72px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .top { display: flex; align-items: center; gap: 16px; }
  .mark {
    width: 52px; height: 52px; border-radius: 14px;
    background: linear-gradient(135deg, #17a085, #0b5546);
    color: #fff; font-family: "Liberation Sans", Arial, sans-serif;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; font-weight: 700;
  }
  .brand { font-size: 31px; font-weight: 700; letter-spacing: -.6px;
           font-family: "Liberation Sans", Arial, sans-serif; }
  .rule { flex: 1; height: 1px; background: rgba(13,20,32,.16); }
  .kicker { font-family: "Liberation Sans", Arial, sans-serif;
            font-size: 19px; font-weight: 700; letter-spacing: 2.6px;
            text-transform: uppercase; color: #0f6e5c; }
  .eyebrow { display: block; font-family: "Liberation Sans", Arial, sans-serif;
             font-size: 20px; font-weight: 700; letter-spacing: 2.4px;
             text-transform: uppercase; color: #0f6e5c; margin-bottom: 22px; }
  h1 {
    font-size: ${title.length > 62 ? 56 : title.length > 42 ? 66 : 78}px;
    font-weight: 400; line-height: 1.1; letter-spacing: -1.4px;
    max-width: 19ch;
  }
  .meta { display: flex; gap: 26px; margin-top: 30px;
          font-family: "Liberation Sans", Arial, sans-serif;
          font-size: 22px; color: #4a5766; }
  .meta span { position: relative; }
  .meta span + span::before { content: ""; position: absolute; left: -14px; top: 12px;
    width: 4px; height: 4px; border-radius: 50%; background: #9aa6b3; }
  .foot {
    display: flex; align-items: center; justify-content: space-between;
    font-family: "Liberation Sans", Arial, sans-serif;
    font-size: 23px; color: #4a5766;
    border-top: 1px solid rgba(13,20,32,.16); padding-top: 26px;
  }
  .foot b { color: #0d1420; font-weight: 700; }
</style></head>
<body>
  <div class="top"><div class="mark">J</div><div class="brand">Jobjila</div>
    <div class="rule"></div><span class="kicker">Guide</span></div>
  <div>
    <span class="eyebrow">${esc(eyebrow)}</span>
    <h1>${esc(title)}</h1>
    <div class="meta">${meta.map((m) => `<span>${esc(m)}</span>`).join("")}</div>
  </div>
  <div class="foot"><span>${esc(footnote)}</span><span><b>jobjila.com/blog</b></span></div>
</body></html>`;
}

/**
 * On-page card for an article. Deliberately carries NO title: the headline
 * already sits directly above it on the page, and every social platform
 * renders og:title next to og:image anyway — so a title inside the picture is
 * always a duplicate. This is the topical/abstract counterpart; the
 * title-bearing version above stays as the og:image.
 *
 * The pattern is seeded from the slug so no two articles look identical.
 */
function topicCard({ accent, label, glyph, meta, seed }) {
  const rnd = (n) => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 100000;
    return (h % n);
  };
  const bars = Array.from({ length: 11 }, (_, i) =>
    `<div style="height:${18 + ((rnd(97) + i * 29) % 78)}%"></div>`).join("");
  const angle = 140 + rnd(60);
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px; position: relative; overflow: hidden;
    font-family: "Liberation Sans", Arial, sans-serif;
    background: linear-gradient(${angle}deg, ${accent.bg} 0%, #ffffff 78%);
    padding: 60px 64px; display: flex; flex-direction: column; justify-content: space-between;
  }
  .glyph {
    position: absolute; right: -70px; bottom: -190px;
    font-family: "Liberation Serif", Georgia, serif;
    font-size: 620px; line-height: .8; font-weight: 700;
    color: ${accent.ink}; opacity: .13; letter-spacing: -30px;
  }
  .bars {
    position: absolute; left: 64px; right: 64px; bottom: 128px;
    height: 132px; display: flex; align-items: flex-end; gap: 14px; opacity: .32;
  }
  .bars > div { flex: 1; background: ${accent.ink}; border-radius: 2px 2px 0 0; }
  .top { display: flex; align-items: center; gap: 15px; position: relative; }
  .mark { width: 50px; height: 50px; border-radius: 14px; background: ${accent.ink};
    color: #fff; display: flex; align-items: center; justify-content: center;
    font-size: 27px; font-weight: 700; }
  .brand { font-size: 30px; font-weight: 700; letter-spacing: -.6px; color: #0d1420; }
  .rule { flex: 1; height: 1px; background: ${accent.ink}; opacity: .28; }
  .kicker { font-size: 18px; font-weight: 700; letter-spacing: 2.6px;
            text-transform: uppercase; color: ${accent.ink}; }
  .track { position: relative; font-size: ${label.length > 14 ? 62 : 78}px; font-weight: 700;
           letter-spacing: -2px; color: #0d1420; max-width: 14ch; line-height: 1.05; }
  .foot { position: relative; display: flex; gap: 26px; align-items: center;
          font-size: 22px; color: #4a5766;
          border-top: 1px solid rgba(13,20,32,.16); padding-top: 24px; }
  .foot span + span::before { content: "·"; margin-right: 26px; color: #9aa6b3; }
  .foot b { margin-left: auto; color: #0d1420; font-weight: 700; }
</style></head>
<body>
  <div class="glyph">${esc(glyph)}</div>
  <div class="bars">${bars}</div>
  <div class="top"><div class="mark">J</div><div class="brand">Jobjila</div>
    <div class="rule"></div><span class="kicker">Guide</span></div>
  <div class="track">${esc(label)}</div>
  <div class="foot">${meta.map((m) => `<span>${esc(m)}</span>`).join("")}<b>jobjila.com/blog</b></div>
</body></html>`;
}

/* Per-track palette for the on-page cards, mirroring css/theme.css. */
const TRACK_ACCENT = {
  cloud:   { ink: "#0f6e5c", bg: "#dcede8" },
  itsm:    { ink: "#3b4e9b", bg: "#e3e8f6" },
  infra:   { ink: "#46596a", bg: "#e5eaef" },
  consult: { ink: "#a9691f", bg: "#f7ecdc" },
  data:    { ink: "#7a3e6b", bg: "#f2e7ef" },
};
const TRACK_GLYPH = { cloud: "\u2601", itsm: "\u21bb", infra: "\u25a6", consult: "\u25c6", data: "\u25e9" };

/** Square logo. Organization.logo in the schema points at this file, and the
    footer renders it — Google cannot show an organisation logo without one. */
function logoMark() {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 512px; height: 512px; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #17a085 0%, #0f6e5c 48%, #0b3f36 100%); }
  .j { font-family: "Liberation Sans", Arial, sans-serif; font-weight: 700;
       font-size: 300px; color: #fff; letter-spacing: -14px; line-height: 1;
       margin-top: -18px; }
</style></head><body><div class="j">J</div></body></html>`;
}

async function main() {
  let chromium;
  try {
    ({ chromium } = require("playwright-core"));
  } catch {
    console.error(
      "playwright-core is not installed. Run:\n  npm install --no-save playwright-core\nThe committed images in assets/og/ remain valid until course names or fees change."
    );
    process.exit(1);
  }

  const executablePath = findChromium();
  if (!executablePath) {
    console.error("No Chromium found. Install one with: npx playwright install chromium");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(BLOG_DIR, { recursive: true });
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  const jobs = [
    {
      file: "default.jpg",
      html: card({
        eyebrow: "IT Advisory · Support · Training",
        title: "IT advisory, support and training — without the guesswork",
        meta: ["Noida", "India-wide", "First class free"],
        footnote: site.url.replace("https://", ""),
      }),
    },
    ...courses.map((c) => ({
      file: `${c.slug}.jpg`,
      html: card({
        eyebrow: (site.tracks.find((t) => t.id === c.track) || {}).name || "Training",
        title: c.name,
        meta: [c.duration, "First class free"],
        footnote: "Live online · " + site.tagline,
      }),
    })),
    ...articles.map((a) => ({
      dir: BLOG_DIR,
      rel: "assets/blog/",
      file: `${a.slug}.jpg`,
      html: articleCard({
        eyebrow: (site.tracks.find((t) => t.id === a.track) || {}).name || "Guide",
        title: a.title,
        meta: [`${a.readMins} min read`, "Free to read", "No affiliate links"],
        footnote: "By " + site.founder.name + " · " + site.name,
      }),
    })),
    ...articles.map((a) => ({
      dir: BLOG_DIR,
      rel: "assets/blog/",
      file: `${a.slug}-card.jpg`,
      html: topicCard({
        accent: TRACK_ACCENT[a.track] || TRACK_ACCENT.cloud,
        label: a.cardLabel,
        glyph: TRACK_GLYPH[a.track] || "\u25cf",
        meta: [`${a.readMins} min read`, "Free to read", "No affiliate links"],
        seed: a.slug,
      }),
    })),
  ];

  for (const job of jobs) {
    await page.setContent(job.html, { waitUntil: "load" });
    await page.screenshot({
      path: path.join(job.dir || OUT_DIR, job.file),
      type: "jpeg",
      quality: 90,
    });
    console.log("  wrote " + (job.rel || "assets/og/") + job.file);
  }

  // The logo is square and flat, so PNG is both smaller and sharper here.
  const logoPage = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await logoPage.setContent(logoMark(), { waitUntil: "load" });
  await logoPage.screenshot({ path: path.join(ASSET_DIR, "logo.png"), type: "png" });
  console.log("  wrote assets/logo.png");

  await browser.close();
  console.log(`\nDone. ${jobs.length} share images + logo.png.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
