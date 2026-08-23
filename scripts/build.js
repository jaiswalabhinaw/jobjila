#!/usr/bin/env node
/**
 * Jobjila static site generator.
 *
 * Writes:
 *   /index.html                    home
 *   /courses/index.html            course hub
 *   /courses/<slug>/index.html     one page per course
 *   /for-freelancers/, /hire/, /become-a-trainer/, /blog/, /about/, /contact/
 *   /sitemap.xml                   every canonical URL
 *
 * Run with: npm run build
 */

const path = require("path");
const {
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
} = require("./lib");

const buildStaticPages = require("./pages");
const buildCityPages = require("./cities");

/* ---------- individual course page ---------- */

function buildCoursePage(c) {
  const soon = c.status === "soon";
  const trail = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses/" },
    { name: c.name, url: `/courses/${c.slug}/` },
  ];

  const ld = [orgLd, courseLd(c), breadcrumbLd(trail)];
  if (c.faqs.length) ld.push(faqLd(c.faqs));

  const related = courses.filter((x) => x.slug !== c.slug && x.status === "open").slice(0, 3);

  // Pre-filled WhatsApp text so we know which course the enquiry came from.
  const waHref = wa(
    soon
      ? `Hi Jobjila, please add me to the waitlist for the ${c.name} course.`
      : `Hi Jobjila, I am interested in the ${c.name} course (${c.duration}, ${inr(c.priceINR)}). Please share the next batch dates.`
  );
  const ctaLabel = soon ? "Join the waitlist" : "Enquire on WhatsApp";

  const syllabus = c.modules.length
    ? `<section class="section--tight" id="syllabus">
        <h2>Syllabus</h2>
        <p>${c.modules.length} modules across ${esc(c.duration)}, at roughly ${esc(c.effort)}.</p>
        <div class="syllabus" style="margin-top:20px">
          ${c.modules
            .map(
              (m) => `<article class="module">
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.detail)}</p>
          </article>`
            )
            .join("\n          ")}
        </div>
      </section>`
    : `<section class="section--tight" id="syllabus">
        <h2>Syllabus in development</h2>
        <p>We are finalising this curriculum with the trainers who will deliver it. Join the waitlist and you will receive the full syllabus, cohort dates and founding-cohort pricing before it goes public.</p>
      </section>`;

  const outcomes = c.outcomes.length
    ? `<section class="section--tight">
        <h2>What you will be able to do</h2>
        <ul class="outcome-list" style="margin-top:16px">
          ${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join("\n          ")}
        </ul>
      </section>`
    : "";

  const doubts = c.modules.length
    ? `<section class="section--tight">
        <h2>Ask your doubts, get a verified answer</h2>
        <div class="doubt-block">
          <p><strong>Every enrolled learner gets a doubt thread on this page.</strong> Your trainer replies within 48 hours, and answers stay visible to the whole cohort so nobody has to ask the same question twice.</p>
          <div class="doubt-thread">
            <p class="small muted" style="margin-bottom:10px"><em>Example of how a thread works &mdash; this course has not started yet</em></p>
            <p>&ldquo;I followed module 3 exactly but my setup fails at the last step. What am I missing?&rdquo;</p>
            <div class="doubt-reply"><span class="badge-verified">&#10003; Trainer reply</span><br>Check your permissions first &mdash; that is the cause about nine times out of ten. Full walkthrough posted in the cohort thread.</div>
          </div>
          <p class="small muted" style="margin-bottom:0">Doubt threads open the day your cohort starts.</p>
        </div>
      </section>`
    : "";

  const tools = c.tools.length
    ? `<div class="card">
        <h3 style="font-size:1rem">Tools you will use</h3>
        <div class="course-meta" style="margin:12px 0 0">
          ${c.tools.map((t) => `<span class="tag">${esc(t)}</span>`).join("\n          ")}
        </div>
      </div>`
    : "";

  const html =
    head({
      title: `${c.seoTitle} | Jobjila`,
      description: c.metaDescription,
      canonical: `/courses/${c.slug}/`,
      keywords: c.keywords,
      extraLd: ld,
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:760px;margin-top:20px">
      <div class="course-meta">
        <span class="tag">${esc(c.category)}</span>
        ${c.trending ? `<span class="tag">Trending now</span>` : ""}
        ${soon ? `<span class="tag">Coming soon</span>` : ""}
      </div>
      <h1>${esc(c.name)}</h1>
      <p style="font-size:1.125rem">${esc(c.tagline)}</p>
      <div class="btn-row" style="margin-top:26px">
        <a class="btn btn--whatsapp btn--lg" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>${ctaLabel}</span></a>
        <a class="btn btn--on-dark btn--lg" href="#syllabus">See the syllabus</a>
      </div>
    </div>
  </div>
</section>

<div class="container section">
  <div class="course-layout">
    <div>
      <p style="font-size:1.0625rem">${esc(c.intro)}</p>

      <section class="section--tight">
        <h2>Three ways this course pays you back</h2>
        <div class="grid grid--3-tight" style="margin-top:20px">
          <div class="path-tile">
            <h3>Get a job</h3>
            <p class="small muted" style="margin-bottom:0">${esc(c.paths.job)}</p>
          </div>
          <div class="path-tile path-tile--freelance">
            <h3>Freelance</h3>
            <p class="small muted" style="margin-bottom:0">${esc(c.paths.freelance)}</p>
          </div>
          <div class="path-tile path-tile--business">
            <h3>Your own business</h3>
            <p class="small muted" style="margin-bottom:0">${esc(c.paths.business)}</p>
          </div>
        </div>
      </section>

      ${syllabus}
      ${outcomes}
      ${doubts}
      ${faqSection(c.faqs)}
    </div>

    <aside class="course-sidebar">
      <div class="card">
        <div class="earn-strip" style="margin-bottom:18px">${esc(c.earning)}</div>
        <ul class="fact-list">
          <li><span>Fees</span><b>${soon ? "To be announced" : inr(c.priceINR)}</b></li>
          <li><span>Duration</span><b>${esc(c.duration)}</b></li>
          <li><span>Commitment</span><b>${esc(c.effort)}</b></li>
          <li><span>Level</span><b>${esc(c.level)}</b></li>
          <li><span>Format</span><b>${esc(c.mode)}</b></li>
        </ul>
        <a class="btn btn--whatsapp btn--block" style="margin-top:20px" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>${ctaLabel}</span></a>
        <p class="form-note text-center" style="margin:12px 0 0">Message us on WhatsApp &mdash; we reply the same day. No pressure to enrol.</p>
      </div>

      ${tools}

      <div class="card" style="background:var(--brand-soft);border-color:var(--indigo-200)">
        <h3 style="font-size:1rem">Skill Passport</h3>
        <p class="small" style="margin-bottom:0">Finish the capstone and your verified result is recorded on your Jobjila Skill Passport &mdash; the profile clients and employers actually check.</p>
      </div>
    </aside>
  </div>
</div>

${
      soon
        ? ""
        : `<section class="section section--alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Local guides</span>
      <h2>${esc(c.name)} by city</h2>
      <p>The course is the same online cohort wherever you join from. These pages cover the job market, employers and pay for this skill in each city.</p>
    </div>
    <div class="course-meta">
      ${cities
        .map(
          (city) =>
            `<a class="tag tag--brand" href="/courses/${c.slug}/${city.slug}/">${esc(c.name)} in ${esc(city.name)}</a>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>`
    }

<section class="section section--alt">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">Keep going</span>
      <h2>Courses learners pair with this one</h2>
    </div>
    <div class="grid grid--3">
      ${related.map(courseCard).join("\n      ")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${ctaBand({
      title: "Not sure this is the right course?",
      body: "Message us on WhatsApp with your background and what you want to earn. We will point you at the right track — even if that turns out to be a different course.",
      buttonLabel: "Ask on WhatsApp",
      whatsappMessage: `Hi Jobjila, I was looking at the ${c.name} course but I am not sure it is right for me. Can you help me choose?`,
    })}
  </div>
</section>
` +
    footer();

  write(path.join("courses", c.slug, "index.html"), html);
}

/* ---------- course hub ---------- */

function buildCourseHub() {
  const trail = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses/" },
  ];
  const open = courses.filter((c) => c.status === "open");
  const soon = courses.filter((c) => c.status === "soon");
  const categories = [...new Set(open.map((c) => c.category))];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Jobjila Courses",
    itemListElement: open.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${site.url}/courses/${c.slug}/`,
    })),
  };

  const hubFaqs = [
    {
      q: "How much do Jobjila courses cost?",
      a: `Course fees currently range from ${inr(Math.min(...open.map((c) => c.priceINR)))} to ${inr(Math.max(...open.map((c) => c.priceINR)))} depending on length and cohort size. Every course page states its exact fee — there are no hidden charges, and EMI options are available on courses above ₹10,000.`,
    },
    {
      q: "Are these courses live or pre-recorded?",
      a: "All courses are delivered live online by a practising professional, and every session is recorded so you can revisit it. Cohorts are deliberately small so that project work and doubts get individual attention.",
    },
    {
      q: "Do you offer placement support?",
      a: "Yes. Learners who complete a course capstone receive resume and LinkedIn review, mock interviews, and an introduction to hiring partners looking for that skill. We do not promise a job — we promise preparation and genuine introductions.",
    },
    {
      q: "Can I take a course while working full time?",
      a: "Most learners do. Courses run at four to eight hours a week, sessions are in the evening, and everything is recorded. Tell us your schedule and we will suggest a cohort that fits.",
    },
    {
      q: "What is a Skill Passport?",
      a: "It is your verified profile on Jobjila: the courses you finished, the capstone projects you shipped, your assessment scores and trainer endorsements. Clients and employers check it instead of taking a certificate at face value.",
    },
  ];

  const html =
    head({
      title: "All Courses — IT, AI, Cloud, Marketing & Career Training | Jobjila",
      description:
        "Browse every Jobjila course: cloud computing, AI and prompt engineering, IT infrastructure, presales, digital marketing, website design, data analytics and freelancing. Fees, syllabus and earning path for each.",
      canonical: "/courses/",
      keywords: [
        "online courses india",
        "it training with placement",
        "course fees and syllabus",
        "professional training courses",
      ],
      extraLd: [orgLd, breadcrumbLd(trail), itemListLd, faqLd(hubFaqs)],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:740px;margin-top:20px">
      <h1>Courses that end in income, not just a certificate</h1>
      <p style="font-size:1.125rem">Every course states plainly what it costs, how long it takes, and the three ways it can pay you back &mdash; a job, freelance work, or your own business.</p>
    </div>
  </div>
</section>

<div class="container section">
  <div class="section-head">
    <span class="eyebrow">${open.length} courses open for enrolment</span>
    <h2>Open now</h2>
    <p>${categories.map(esc).join(" &middot; ")}</p>
  </div>
  <div class="grid grid--3">
    ${open.map(courseCard).join("\n    ")}
  </div>
</div>

<section class="section section--alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">In development</span>
      <h2>Coming soon</h2>
      <p>These curricula are being built with the trainers who will deliver them. Join a waitlist to get the syllabus, dates and founding-cohort pricing first.</p>
    </div>
    <div class="grid grid--3">
      ${soon.map(courseCard).join("\n      ")}
    </div>
  </div>
</section>

<div class="container section">
  ${faqSection(hubFaqs, "Questions about our courses")}
</div>

<section class="section" style="padding-top:0">
  <div class="container">
    ${ctaBand({
      title: "Can you teach one of these?",
      body: "We onboard trainers on a revenue-share model — no upfront cost, and you keep the majority of every enrolment. Bring your subject; we bring the students, the platform and the marketing.",
      buttonLabel: "Apply on WhatsApp",
      whatsappMessage: "Hi Jobjila, I would like to teach on your platform. My subject is:",
    })}
  </div>
</section>
` +
    footer();

  write(path.join("courses", "index.html"), html);
}

/* ---------- sitemap ---------- */

const STATIC_PAGES = [
  { url: "/", priority: "1.0", freq: "weekly" },
  { url: "/courses/", priority: "0.9", freq: "weekly" },
  { url: "/for-freelancers/", priority: "0.8", freq: "monthly" },
  { url: "/hire/", priority: "0.8", freq: "monthly" },
  { url: "/become-a-trainer/", priority: "0.8", freq: "monthly" },
  { url: "/blog/", priority: "0.7", freq: "weekly" },
  { url: "/locations/", priority: "0.8", freq: "monthly" },
  { url: "/about/", priority: "0.5", freq: "yearly" },
  { url: "/contact/", priority: "0.6", freq: "yearly" },
];

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...STATIC_PAGES,
    ...courses.map((c) => ({
      url: `/courses/${c.slug}/`,
      priority: c.status === "open" ? "0.9" : "0.4",
      freq: "monthly",
    })),
    // City pages already include /locations/, which STATIC_PAGES also lists.
    ...buildCityPages.cityUrls().filter((u) => u.url !== "/locations/"),
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${site.url}${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
  );

  write(
    "robots.txt",
    `User-agent: *
Allow: /

# Working files and generator sources are not content
Disallow: /scripts/
Disallow: /data/
Disallow: /bookflip/
Disallow: /ecomm/
Disallow: /doctor/
Disallow: /ngo/
Disallow: /realestate/

Sitemap: ${site.url}/sitemap.xml
`
  );
}

/* ---------- run ---------- */

console.log("Building Jobjila...");
buildCourseHub();
courses.forEach(buildCoursePage);
buildStaticPages();
const cityPageCount = buildCityPages();
buildSitemap();
console.log(
  `\nDone. ${courses.length} course pages + hub + ${STATIC_PAGES.length - 3} standalone pages + ${cityPageCount} city pages + sitemap.`
);
