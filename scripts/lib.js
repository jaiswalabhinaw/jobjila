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

/* ---------- small utilities ---------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const inr = (n) => "\u20b9" + Number(n).toLocaleString("en-IN");

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
  areaServed: { "@type": "Country", name: "India" },
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
      <a class="btn btn--ghost" href="/hire/">Post a Project</a>
      <a class="btn btn--primary" href="/courses/">Explore Courses</a>
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
          <li><a href="/about/">About Us</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} ${esc(site.name)}. All rights reserved.</span>
      <span>${esc(site.locality)}, ${esc(site.region)}, India</span>
    </div>
  </div>
</footer>
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

function ctaBand({ title, body, buttonLabel, buttonHref }) {
  return `<div class="cta-band">
  <div>
    <h2>${esc(title)}</h2>
    <p>${esc(body)}</p>
  </div>
  <a class="btn btn--accent btn--lg" href="${buttonHref}">${esc(buttonLabel)}</a>
</div>`;
}

module.exports = {
  ROOT,
  site,
  courses,
  esc,
  inr,
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
