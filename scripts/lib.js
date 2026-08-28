/**
 * Shared building blocks for the Jobjila site generator.
 * Every page renders through these helpers so navigation, footer and SEO
 * tags can never drift apart between pages.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, "data", f), "utf8"));

const site = read("site.json");
const { courses } = read("courses.json");
const { cities } = read("cities.json");

const openCourses = courses.filter((c) => c.status === "open");
const trackOf = (id) => site.tracks.find((t) => t.id === id) || { name: id };

/* ---------- utilities ---------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const inr = (n) => "\u20b9" + Number(n).toLocaleString("en-IN");

const wa = (message) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

const WA_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z"/></svg>`;

const jsonLd = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

function write(rel, contents) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, "utf8");
  console.log("  " + rel);
}

/* ---------- structured data ---------- */

const orgLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  "@id": site.url + "/#organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: "+" + site.whatsapp,
  slogan: site.tagline,
  founder: { "@type": "Person", name: site.founder.name },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": site.url + "/#website",
  url: site.url,
  name: site.name,
  publisher: { "@id": site.url + "/#organization" },
  inLanguage: "en-IN",
};

const breadcrumbLd = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: site.url + t.url,
  })),
});

const faqLd = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const courseLd = (c, city) => {
  const url = `${site.url}/training/${c.slug}/${city ? city.slug + "/" : ""}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: city ? `${c.name} Training in ${city.name}` : `${c.name} Training`,
    description: c.metaDescription,
    url,
    provider: { "@id": site.url + "/#organization" },
    educationalLevel: c.level,
    teaches: c.outcomes,
    inLanguage: "en-IN",
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: c.priceINR,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: c.effort,
      location: { "@type": "VirtualLocation", url },
    },
  };
};

const serviceLd = (name, description, url) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: site.url + url,
  provider: { "@id": site.url + "/#organization" },
  areaServed: { "@type": "Country", name: "India" },
});

/* ---------- chrome ---------- */

const NAV = [
  { href: "/it-advisory/", label: "IT Advisory" },
  { href: "/it-support/", label: "IT Support" },
  { href: "/training/", label: "Training" },
  { href: "/network/", label: "Network" },
  { href: "/about/", label: "About" },
];

function head({ title, description, canonical, keywords = [], extraLd = [], ogImage, track }) {
  const url = site.url + canonical;
  const image = site.url + (ogImage || "/assets/og/default.jpg");
  const kw = keywords.length ? `<meta name="keywords" content="${esc(keywords.join(", "))}">\n` : "";
  return `<!doctype html>
<html lang="en"${track ? ` data-track="${track}"` : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${kw}<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="en_IN">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400&display=swap">
<link rel="stylesheet" href="/css/theme.css">
${extraLd.map(jsonLd).join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="logo" href="/"><em>Job<b>jila</b></em> <span>IT Services</span></a>
    <nav class="site-nav" aria-label="Main">
      ${NAV.map((n) => `<a href="${n.href}"${canonical === n.href ? ' aria-current="page"' : ""}>${n.label}</a>`).join("\n      ")}
    </nav>
    <div class="bar-actions">
      <a class="btn btn-wa" href="${wa("Hi Jobjila, I would like to know more.")}" target="_blank" rel="noopener">${WA_ICON}<span>WhatsApp</span></a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"><i></i></button>
    </div>
  </div>
  <div class="wrap">
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile">
      ${NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join("\n      ")}
      <a href="/contact/">Contact</a>
    </nav>
  </div>
</header>
<main id="main">`;
}

function footer() {
  return `</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="fgrid">
      <div>
        <a class="logo" href="/"><em>Job<b>jila</b></em></a>
        <p class="fine" style="margin-top:.875rem">${esc(site.description)}</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul class="flist">
          <li><a href="/it-advisory/">IT Advisory</a></li>
          <li><a href="/it-support/">IT Support</a></li>
          <li><a href="/training/">Training</a></li>
          <li><a href="/network/">Consultant Network</a></li>
        </ul>
      </div>
      <div>
        <h4>Training</h4>
        <ul class="flist">
          ${openCourses.slice(0, 6).map((c) => `<li><a href="/training/${c.slug}/">${esc(c.short)}</a></li>`).join("\n          ")}
          <li><a href="/training/">All courses</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul class="flist">
          <li><a href="/about/">About</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/locations/">Locations</a></li>
          <li><a href="/refund-policy/">Refund Policy</a></li>
          <li><a href="/terms/">Terms</a></li>
          <li><a href="/privacy/">Privacy</a></li>
        </ul>
      </div>
    </div>
    <div class="fbot">
      <p class="fine"><strong>Jobjila does not offer employment, recruitment or placement guarantees, and never charges any candidate a fee for a job.</strong> We are paid for training and for consulting work only. Salary figures anywhere on this site are market observations, not commitments. Training fees are refundable as set out in our <a href="/refund-policy/">Refund Policy</a>.</p>
      <p class="fine">&copy; ${new Date().getFullYear()} ${esc(site.legalName)} &middot; ${esc(site.locality)}, ${esc(site.region)}, India &middot; <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
    </div>
  </div>
</footer>
<a class="wa-float" href="${wa("Hi Jobjila, I have a question.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_ICON}<span>Chat with us</span></a>
<script src="/js/main.js" defer></script>
</body>
</html>`;
}

/* ---------- blocks ---------- */

function crumb(trail) {
  return `<nav class="crumb" aria-label="Breadcrumb"><ol>
  ${trail.map((t, i) => (i === trail.length - 1
    ? `<li><span aria-current="page">${esc(t.name)}</span></li>`
    : `<li><a href="${t.url}">${esc(t.name)}</a></li>`)).join("\n  ")}
</ol></nav>`;
}

function courseCard(c) {
  return `<a class="course-card" href="/training/${c.slug}/" data-track="${c.track}">
  <span class="strip"></span>
  <span class="body">
    <span class="chips"><span class="chip">${esc(trackOf(c.track).name)}</span></span>
    <h3>${esc(c.name)}</h3>
    <span class="desc">${esc(c.tagline)}</span>
    <span class="foot">
      <span class="fee">${inr(c.priceINR)}</span>
      <span class="dur">${esc(c.duration)}</span>
    </span>
  </span>
</a>`;
}

function faqBlock(faqs, heading = "Questions") {
  if (!faqs.length) return "";
  return `<section class="stack" style="margin-top:3rem">
  <h2>${esc(heading)}</h2>
  <div class="faq">
    ${faqs.map((f) => `<details>
      <summary>${esc(f.q)}</summary>
      <div class="ans"><p>${esc(f.a)}</p></div>
    </details>`).join("\n    ")}
  </div>
</section>`;
}

function band({ title, body, label, message }) {
  return `<div class="band">
  <div>
    <h2>${esc(title)}</h2>
    <p>${esc(body)}</p>
  </div>
  <a class="btn btn-wa btn-lg" href="${wa(message)}" target="_blank" rel="noopener">${WA_ICON}<span>${esc(label)}</span></a>
</div>`;
}

function shareRow({ url, text, heading = "Know someone this would help?" }) {
  const full = site.url + url;
  return `<section class="share" data-share data-share-url="${esc(full)}" data-share-title="${esc(text)}">
  <div>
    <h2>${esc(heading)}</h2>
    <p>The link opens with the course name, fee and duration in the preview.</p>
  </div>
  <div class="btns">
    <a class="btn btn-wa" data-share-wa href="https://wa.me/?text=${encodeURIComponent(text + " " + full)}" target="_blank" rel="noopener">${WA_ICON}<span data-share-label>Share</span></a>
    <button class="btn btn-line" type="button" data-share-copy data-copy="${esc(full)}"><span>Copy link</span></button>
    <a class="btn btn-line" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(full)}" target="_blank" rel="noopener"><span>LinkedIn</span></a>
  </div>
</section>`;
}

/** The trust ladder — the site's central promise, reused on several pages. */
function ladder() {
  const p = site.pricing;
  return `<div class="ladder">
  <div class="rung">
    <div class="amt">${inr(0)}<small>First class</small></div>
    <div>
      <h3>Attend the first class free</h3>
      <p>Any course. No payment, no card details, no registration form. Message us and we send the joining link.</p>
    </div>
  </div>
  <div class="rung">
    <div class="amt">${inr(p.bookingAmount)}<small>Refundable</small></div>
    <div>
      <h3>Book your seat, only if you want to continue</h3>
      <p>Held against your fee. Decide it is not for you and the full ${inr(p.bookingAmount)} comes back &mdash; no explanation needed.</p>
    </div>
  </div>
  <div class="rung">
    <div class="amt">Bal.<small>Before class ${p.payBeforeSession}</small></div>
    <div>
      <h3>Pay the balance once you are sure</h3>
      <p>By then you have attended two full sessions and met your trainer. Every fee is published &mdash; no negotiation, no hidden charges.</p>
    </div>
  </div>
  <div class="rung">
    <div class="amt">${p.refundDays}d<small>Refund window</small></div>
    <div>
      <h3>Still refundable for ${p.refundDays} days</h3>
      <p>Attended ${p.refundMaxSessions} sessions or fewer, within ${p.refundDays} days of your batch starting? Ask, and we refund in full within ${p.refundDays} working days.</p>
    </div>
  </div>
</div>`;
}

/** The five things we refuse to promise. This is the page's credibility thesis. */
function honestBlock() {
  const items = [
    ["We do not guarantee a job.", "We provide training, an assessed project, resume review and interview practice. Nobody can guarantee employment, and any institute that does is selling you something else."],
    ["We do not guarantee income.", "Salary and freelance figures anywhere on this site are market observations, not commitments to you."],
    ["We do not charge for a job, an interview or a placement.", "You pay for training or for consulting work. Nothing else. Anyone asking you for a registration, security deposit or laptop fee is not us."],
    ["We do not hide the price.", "Every fee is published on this site. You will never have to message us to find out what something costs."],
    ["We do not pressure you with deadlines.", "No countdown timers, no \u201ctwo seats left\u201d. If a batch is full, we tell you the next date."],
  ];
  return `<section class="honest">
  <div class="wrap">
    <span class="eyebrow">Read this before you pay anyone</span>
    <h2>What we do not promise</h2>
    <p>Training companies in India routinely promise things they cannot deliver. Here is what we will not tell you, so you can hold us to it.</p>
    <div class="list">
      ${items.map(([b, p], i) => `<div>
        <span class="mark">${String(i + 1).padStart(2, "0")}</span>
        <div><b>${esc(b)}</b><p>${esc(p)}</p></div>
      </div>`).join("\n      ")}
    </div>
  </div>
</section>`;
}

module.exports = {
  ROOT, site, courses, openCourses, cities, trackOf,
  esc, inr, wa, WA_ICON, write,
  head, footer, crumb, courseCard, faqBlock, band, shareRow, ladder, honestBlock,
  orgLd, websiteLd, breadcrumbLd, faqLd, courseLd, serviceLd,
};
