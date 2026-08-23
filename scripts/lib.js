/**
 * Shared building blocks for the Jobjila static site generator.
 * Every page on the site is rendered through these helpers so that
 * navigation, footer and SEO tags can never drift between pages.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "courses.json"), "utf8"));
const { site, courses } = data;
const { cities } = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "cities.json"), "utf8"));

/* ---------- small utilities ---------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const inr = (n) => "\u20b9" + Number(n).toLocaleString("en-IN");

/**
 * WhatsApp click-to-chat link.
 * A static site has no backend to receive a form, and in India WhatsApp
 * converts far better than a form anyway \u2014 so every primary call to action
 * opens a chat with the message already written. The pre-filled text tells
 * us which page the enquiry came from, which a plain form would not.
 */
const wa = (message) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

const WA_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z"/></svg>`;

const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function write(relPath, contents) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, "utf8");
  console.log("  wrote", relPath);
}

/* ---------- structured data ---------- */

const orgLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": site.url + "/#organization",
  name: site.name,
  alternateName: "Jobjila Skills",
  url: site.url,
  description: site.description,
  email: site.email,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: cities.map((c) => ({
    "@type": "City",
    name: c.name,
    containedInPlace: { "@type": "AdministrativeArea", name: c.region },
  })),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": site.url + "/#website",
  url: site.url,
  name: site.name,
  description: site.description,
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

const courseLd = (c) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: c.name,
  description: c.metaDescription,
  url: `${site.url}/courses/${c.slug}/`,
  provider: { "@id": site.url + "/#organization" },
  educationalLevel: c.level,
  teaches: c.outcomes.length ? c.outcomes : undefined,
  inLanguage: "en-IN",
  offers: {
    "@type": "Offer",
    category: "Paid",
    price: c.priceINR,
    priceCurrency: "INR",
    availability:
      c.status === "open" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    url: `${site.url}/courses/${c.slug}/`,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: c.effort,
    location: { "@type": "VirtualLocation", url: `${site.url}/courses/${c.slug}/` },
  },
});

/* ---------- page chrome ---------- */

const NAV = [
  { href: "/courses/", label: "Courses" },
  { href: "/for-freelancers/", label: "For Freelancers" },
  { href: "/hire/", label: "Hire Talent" },
  { href: "/become-a-trainer/", label: "Become a Trainer" },
  { href: "/blog/", label: "Blog" },
];

function head({ title, description, canonical, extraLd = [], keywords = [] }) {
  const url = site.url + canonical;
  const kw = keywords.length
    ? `<meta name="keywords" content="${esc(keywords.join(", "))}">\n`
    : "";
  return `<!doctype html>
<html lang="en">
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

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/theme.css">
${extraLd.map(jsonLd).join("\n")}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/"><span class="brand-mark" aria-hidden="true">J</span>Jobjila</a>
    <nav class="site-nav" aria-label="Main navigation">
      ${NAV.map((n) => `<a href="${n.href}"${canonical === n.href ? ' aria-current="page"' : ""}>${n.label}</a>`).join("\n      ")}
    </nav>
    <div class="header-actions">
      <a class="btn btn--ghost" href="/courses/">Courses</a>
      <a class="btn btn--whatsapp" href="${wa("Hi Jobjila, I would like to know more about your courses.")}" target="_blank" rel="noopener">${WA_ICON}<span>WhatsApp</span></a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"><span></span></button>
    </div>
  </div>
  <div class="container">
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
      ${NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join("\n      ")}
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
    </nav>
  </div>
</header>
<main id="main">`;
}

function footer() {
  const live = courses.filter((c) => c.status === "open");
  return `</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/"><span class="brand-mark" aria-hidden="true">J</span>Jobjila</a>
        <p style="margin-top:14px;max-width:34ch">${esc(site.description)}</p>
      </div>
      <div>
        <h4>Courses</h4>
        <ul class="footer-links">
          ${live.map((c) => `<li><a href="/courses/${c.slug}/">${esc(c.name)}</a></li>`).join("\n          ")}
        </ul>
      </div>
      <div>
        <h4>Platform</h4>
        <ul class="footer-links">
          <li><a href="/courses/">All Courses</a></li>
          <li><a href="/for-freelancers/">For Freelancers</a></li>
          <li><a href="/hire/">Hire Talent</a></li>
          <li><a href="/become-a-trainer/">Become a Trainer</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="/locations/">Locations</a></li>
          <li><a href="/about/">About Us</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} ${esc(site.name)}. All rights reserved.</span>
      <span><a href="/locations/">Serving ${cities.length} cities across India</a></span>
    </div>
  </div>
</footer>

<a class="wa-float" href="${wa("Hi Jobjila, I have a question.")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
  ${WA_ICON}
  <span class="wa-float__label">Chat with us</span>
</a>

<script src="/js/main.js" defer></script>
</body>
</html>`;
}

/* ---------- reusable blocks ---------- */

function breadcrumbNav(trail) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    ${trail
      .map((t, i) =>
        i === trail.length - 1
          ? `<li><span aria-current="page">${esc(t.name)}</span></li>`
          : `<li><a href="${t.url}">${esc(t.name)}</a></li>`
      )
      .join("\n    ")}
  </ol>
</nav>`;
}

function courseCard(c) {
  const soon = c.status === "soon";
  const bannerMod = c.accent === "brand" ? "" : ` course-card__banner--${c.accent}`;
  return `<article class="course-card">
  <div class="course-card__banner${bannerMod}"></div>
  <div class="course-card__body">
    <div class="course-meta">
      <span class="tag tag--brand">${esc(c.category)}</span>
      ${c.trending ? `<span class="tag tag--accent">Trending</span>` : ""}
      ${soon ? `<span class="tag tag--soon">Coming soon</span>` : ""}
    </div>
    <h3><a href="/courses/${c.slug}/">${esc(c.name)}</a></h3>
    <p class="course-card__desc">${esc(c.tagline)}</p>
    <div class="earn-strip">${esc(c.earning)}</div>
    <ul class="fact-list" style="margin-bottom:18px">
      <li><span>Duration</span><b>${esc(c.duration)}</b></li>
      <li><span>Fees</span><b>${soon ? "TBA" : inr(c.priceINR)}</b></li>
    </ul>
    <a class="btn ${soon ? "btn--ghost" : "btn--primary"} btn--block" href="/courses/${c.slug}/">${soon ? "Join the waitlist" : "View syllabus &amp; fees"}</a>
  </div>
</article>`;
}

function faqSection(faqs, heading = "Frequently asked questions") {
  if (!faqs.length) return "";
  return `<section class="section--tight" aria-labelledby="faq-heading">
  <h2 id="faq-heading">${esc(heading)}</h2>
  ${faqs
    .map(
      (f) => `<details class="faq-item">
    <summary>${esc(f.q)}</summary>
    <div class="faq-body"><p>${esc(f.a)}</p></div>
  </details>`
    )
    .join("\n  ")}
</section>`;
}

/**
 * @param {string} [opts.whatsappMessage] when given, the button opens a
 *        pre-filled WhatsApp chat instead of navigating to a page.
 */
function ctaBand({ title, body, buttonLabel, buttonHref, whatsappMessage }) {
  const isWa = Boolean(whatsappMessage);
  const href = isWa ? wa(whatsappMessage) : buttonHref;
  const attrs = isWa ? ' target="_blank" rel="noopener"' : "";
  return `<div class="cta-band">
  <div>
    <h2>${esc(title)}</h2>
    <p>${esc(body)}</p>
  </div>
  <a class="btn ${isWa ? "btn--whatsapp" : "btn--accent"} btn--lg" href="${href}"${attrs}>${isWa ? WA_ICON : ""}<span>${esc(buttonLabel)}</span></a>
</div>`;
}

module.exports = {
  ROOT,
  site,
  courses,
  cities,
  esc,
  inr,
  wa,
  WA_ICON,
  write,
  head,
  footer,
  breadcrumbNav,
  courseCard,
  faqSection,
  ctaBand,
  orgLd,
  websiteLd,
  breadcrumbLd,
  faqLd,
  courseLd,
};
