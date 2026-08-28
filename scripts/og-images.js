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

const OUT_DIR = path.join(ROOT, "assets", "og");

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
        meta: [c.duration, inr(c.priceINR), "First class free"],
        footnote: "Live online · " + site.tagline,
      }),
    })),
  ];

  for (const job of jobs) {
    await page.setContent(job.html, { waitUntil: "load" });
    await page.screenshot({
      path: path.join(OUT_DIR, job.file),
      type: "jpeg",
      quality: 90,
    });
    console.log("  wrote assets/og/" + job.file);
  }

  await browser.close();
  console.log(`\nDone. ${jobs.length} share images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
