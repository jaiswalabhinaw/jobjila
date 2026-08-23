/**
 * City landing pages: /courses/<course-slug>/<city-slug>/
 *
 * These target the highest-volume commercial search pattern in India —
 * "[course] course in [city]" plus "fees", "placement" and "near me".
 *
 * Each page must be genuinely different from its siblings or Google treats
 * the set as doorway pages and drops them. The uniqueness here comes from
 * data/cities.json: a per-city intro, the city's actual tech hubs, a
 * salary note, a per-course note where one is written, and two city-specific
 * FAQs. Everything shared with the parent course page is summarised rather
 * than duplicated, and each page links back to the full course.
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
  faqSection,
  ctaBand,
  shareRow,
  orgLd,
  breadcrumbLd,
  faqLd,
} = require("./lib");

const openCourses = () => courses.filter((c) => c.status === "open");

/* ---------- structured data for a city page ---------- */

function cityCourseLd(course, city) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.name} Course in ${city.name}`,
    description: `${course.name} training for learners in ${city.name}. ${course.duration}, live online, ${inr(course.priceINR)}.`,
    url: `${site.url}/courses/${course.slug}/${city.slug}/`,
    provider: { "@id": site.url + "/#organization" },
    educationalLevel: course.level,
    inLanguage: "en-IN",
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: course.priceINR,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/courses/${course.slug}/${city.slug}/`,
      areaServed: { "@type": "City", name: city.name },
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: course.effort,
      location: {
        "@type": "VirtualLocation",
        url: `${site.url}/courses/${course.slug}/${city.slug}/`,
      },
    },
  };
}

/* ---------- one city page ---------- */

function buildCityCoursePage(course, city) {
  const url = `/courses/${course.slug}/${city.slug}/`;
  const trail = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses/" },
    { name: course.name, url: `/courses/${course.slug}/` },
    { name: city.name, url },
  ];

  // Per-course local note where one is written; otherwise a note built from
  // this city's own hubs and employer mix, so it still differs city to city.
  const courseNote =
    (city.courseNotes && city.courseNotes[course.slug]) ||
    `${city.name} employers in ${city.hubs.slice(0, 3).join(", ")} hire across ${city.employerType}, and ${course.name.toLowerCase()} skills apply directly to that work.`;

  const cityFaqs = [
    ...city.faqs,
    {
      q: `What are the ${course.name} course fees in ${city.name}?`,
      a: `The fee is ${inr(course.priceINR)} for the full ${course.duration} programme, and it is the same wherever in India you join from — there is no separate ${city.name} pricing. That covers all live sessions, recordings and your capstone assessment. EMI options are available.`,
    },
    {
      q: `Is this ${course.name} course online or classroom-based in ${city.name}?`,
      a: `It is fully live online, so there is no travel and no ${city.name} classroom to reach. Sessions are held in the evening and every one is recorded, which is what makes it workable alongside a full-time job.`,
    },
  ];

  const waHref = wa(
    `Hi Jobjila, I am in ${city.name} and interested in the ${course.name} course (${course.duration}, ${inr(course.priceINR)}). Please share the next batch dates.`
  );

  const otherCourses = openCourses()
    .filter((c) => c.slug !== course.slug)
    .slice(0, 6);

  const otherCities = cities.filter((c) => c.slug !== city.slug);

  const html =
    head({
      title: `${course.name} Course in ${city.name} — Fees, Syllabus & Placement | Jobjila`,
      description: `${course.name} course for ${city.name} learners. ${course.duration}, live online, ${inr(course.priceINR)}. Syllabus, fees, placement support and ${city.name} job market context.`,
      canonical: url,
      ogImage: `/assets/og/${course.slug}.jpg`,
      keywords: [
        `${course.name.toLowerCase()} course in ${city.name.toLowerCase()}`,
        `${course.name.toLowerCase()} course ${city.name.toLowerCase()} fees`,
        `${course.category.toLowerCase()} training ${city.name.toLowerCase()}`,
        `${course.name.toLowerCase()} course near me`,
      ],
      extraLd: [orgLd, cityCourseLd(course, city), breadcrumbLd(trail), faqLd(cityFaqs)],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:800px;margin-top:20px">
      <div class="course-meta">
        <span class="tag">${esc(city.name)}</span>
        <span class="tag">${esc(course.category)}</span>
        <span class="tag">Live online</span>
      </div>
      <h1>${esc(course.name)} Course in ${esc(city.name)}</h1>
      <p style="font-size:1.125rem">${esc(course.tagline)} Taught live online, so ${esc(city.name)} learners join without a commute.</p>
      <div class="btn-row" style="margin-top:26px">
        <a class="btn btn--whatsapp btn--lg" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>Ask about ${esc(city.name)} batches</span></a>
        <a class="btn btn--on-dark btn--lg" href="/courses/${course.slug}/">Full syllabus</a>
      </div>
    </div>
  </div>
</section>

<div class="container section">
  <div class="course-layout">
    <div>
      <section class="section--tight" style="padding-top:0">
        <h2>The ${esc(course.name)} job market in ${esc(city.name)}</h2>
        <p>${esc(city.intro)}</p>
        <p>${esc(courseNote)}</p>
        <p><strong>Pay:</strong> ${esc(city.salaryNote)} For this skill specifically, the national band is ${esc(course.earning)}.</p>
      </section>

      <section class="section--tight">
        <h2>Where the work is in ${esc(city.name)}</h2>
        <p>${esc(city.demandLead)} The city's technology employment concentrates around these areas:</p>
        <div class="course-meta" style="margin-top:14px">
          ${city.hubs.map((h) => `<span class="tag tag--brand">${esc(h)}</span>`).join("\n          ")}
        </div>
        <p class="small muted" style="margin-top:16px">Cohorts are online, so you can live anywhere in ${esc(city.name)} and still join the same batch.</p>
      </section>

      <section class="section--tight">
        <h2>Three ways this course pays you back in ${esc(city.name)}</h2>
        <div class="grid grid--3-tight" style="margin-top:20px">
          <div class="path-tile">
            <h3>Get a job</h3>
            <p class="small muted" style="margin-bottom:0">${esc(course.paths.job)}</p>
          </div>
          <div class="path-tile path-tile--freelance">
            <h3>Freelance</h3>
            <p class="small muted" style="margin-bottom:0">${esc(course.paths.freelance)}</p>
          </div>
          <div class="path-tile path-tile--business">
            <h3>Your own business</h3>
            <p class="small muted" style="margin-bottom:0">${esc(course.paths.business)}</p>
          </div>
        </div>
      </section>

      <section class="section--tight">
        <h2>What the course covers</h2>
        <p>${course.modules.length} modules across ${esc(course.duration)}. This is the summary &mdash; the <a href="/courses/${course.slug}/">full ${esc(course.name)} syllabus</a> has the detail for each module.</p>
        <div class="syllabus" style="margin-top:20px">
          ${course.modules
            .map(
              (m) => `<article class="module">
            <h3>${esc(m.title)}</h3>
          </article>`
            )
            .join("\n          ")}
        </div>
      </section>

      <section class="section--tight">
        <h2>What you will be able to do</h2>
        <ul class="outcome-list" style="margin-top:16px">
          ${course.outcomes.map((o) => `<li>${esc(o)}</li>`).join("\n          ")}
        </ul>
      </section>

      ${faqSection(cityFaqs, `${course.name} in ${city.name} — questions`)}
      ${shareRow({
        url,
        text: `${course.name} course for ${city.name} — ${course.duration}, ${inr(course.priceINR)}. Live online with Jobjila.`,
        heading: `Know someone in ${city.name} who needs this?`,
      })}
    </div>

    <aside class="course-sidebar">
      <div class="card">
        <div class="earn-strip" style="margin-bottom:18px">${esc(course.earning)}</div>
        <ul class="fact-list">
          <li><span>Fees</span><b>${inr(course.priceINR)}</b></li>
          <li><span>Duration</span><b>${esc(course.duration)}</b></li>
          <li><span>Commitment</span><b>${esc(course.effort)}</b></li>
          <li><span>Level</span><b>${esc(course.level)}</b></li>
          <li><span>Format</span><b>Live online</b></li>
          <li><span>Serving</span><b>${esc(city.name)}</b></li>
        </ul>
        <a class="btn btn--whatsapp btn--block" style="margin-top:20px" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>Enquire on WhatsApp</span></a>
        <p class="form-note text-center" style="margin:12px 0 0">Same fee everywhere in India. No ${esc(city.name)} surcharge.</p>
      </div>

      <div class="card">
        <h3 style="font-size:1rem">Other courses for ${esc(city.name)}</h3>
        <ul class="footer-links" style="margin-top:12px">
          ${otherCourses
            .map(
              (c) =>
                `<li><a href="/courses/${c.slug}/${city.slug}/" style="color:var(--ink-600)">${esc(c.name)}</a></li>`
            )
            .join("\n          ")}
        </ul>
      </div>

      <div class="card" style="background:var(--brand-soft);border-color:var(--indigo-200)">
        <h3 style="font-size:1rem">Skill Passport</h3>
        <p class="small" style="margin-bottom:0">Finish the capstone and your verified result is recorded on your Skill Passport &mdash; the profile ${esc(city.name)} employers and clients actually check.</p>
      </div>
    </aside>
  </div>
</div>

<section class="section section--alt">
  <div class="container">
    <div class="section-head">
      <h2>${esc(course.name)} in other cities</h2>
      <p>Cohorts are online and identical wherever you join from. These pages cover the local job market in each city.</p>
    </div>
    <div class="course-meta">
      ${otherCities
        .map(
          (c) =>
            `<a class="tag tag--brand" href="/courses/${course.slug}/${c.slug}/">${esc(c.name)}</a>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${ctaBand({
      title: `Questions about joining from ${city.name}?`,
      body: "Message us on WhatsApp with your background and what you want to earn. We will tell you honestly whether this is the right course for you.",
      buttonLabel: "Ask on WhatsApp",
      whatsappMessage: `Hi Jobjila, I am in ${city.name}. I was looking at the ${course.name} course — can you help me decide if it suits me?`,
    })}
  </div>
</section>
` +
    footer();

  write(path.join("courses", course.slug, city.slug, "index.html"), html);
}

/* ---------- /locations/ hub ---------- */

function buildLocationsHub() {
  const trail = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations/" },
  ];
  const open = openCourses();

  const faqs = [
    {
      q: "Do you have physical centres in these cities?",
      a: "No. Every Jobjila cohort runs live online, which is deliberate — it means the same trainer and the same curriculum wherever you live, no commute, and evening sessions that work alongside a job. The city pages exist because the job market and pay differ by city, not because the course does.",
    },
    {
      q: "Are course fees different in different cities?",
      a: "No. Fees are identical across India — there is no metro surcharge and no tier-2 discount. What varies by city is the salary you can expect afterwards and the kind of employers hiring, which is what each city page covers.",
    },
    {
      q: "My city is not listed. Can I still join?",
      a: "Yes, absolutely. Cohorts are online and open to anyone in India. These pages cover the cities most of our learners come from, but nothing stops you joining from anywhere else — message us on WhatsApp and we will get you into the next batch.",
    },
  ];

  const html =
    head({
      title: `IT & Professional Training in ${cities.length} Indian Cities | Jobjila`,
      description: `Jobjila courses for learners in ${cities
        .slice(0, 6)
        .map((c) => c.name)
        .join(", ")} and more. Live online cohorts, same fees everywhere, with local job market context for each city.`,
      canonical: "/locations/",
      keywords: [
        "it training india cities",
        "online course bangalore hyderabad pune",
        "professional training near me",
        "it course in my city",
      ],
      extraLd: [
        orgLd,
        breadcrumbLd(trail),
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Jobjila service locations",
          itemListElement: cities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            url: `${site.url}/courses/${open[0].slug}/${c.slug}/`,
          })),
        },
      ],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:760px;margin-top:20px">
      <h1>Training for ${cities.length} cities across India</h1>
      <p style="font-size:1.125rem">Every cohort runs live online, so the course is identical wherever you join from. What changes city to city is the job market, the employers hiring, and what the skill pays &mdash; which is what these pages cover.</p>
    </div>
  </div>
</section>

<div class="container section">
  <div class="section-head">
    <span class="eyebrow">${cities.length} cities &middot; ${open.length} courses &middot; ${cities.length * open.length} local guides</span>
    <h2>Choose your city</h2>
  </div>
  <div class="grid grid--3">
    ${cities
      .map(
        (city) => `<article class="card card--link">
      <h3>${esc(city.name)}</h3>
      <p class="small muted">${esc(city.tier)}</p>
      <div class="course-meta" style="margin:14px 0">
        ${city.hubs
          .slice(0, 3)
          .map((h) => `<span class="tag">${esc(h)}</span>`)
          .join("\n        ")}
      </div>
      <ul class="footer-links">
        ${open
          .slice(0, 4)
          .map(
            (c) =>
              `<li><a href="/courses/${c.slug}/${city.slug}/" style="color:var(--ink-600)">${esc(c.name)} in ${esc(city.name)}</a></li>`
          )
          .join("\n        ")}
      </ul>
    </article>`
      )
      .join("\n    ")}
  </div>
</div>

<div class="container section" style="padding-top:0">
  ${faqSection(faqs, "Questions about locations")}
</div>

<section class="section" style="padding-top:0">
  <div class="container">
    ${ctaBand({
      title: "Not sure which course fits your city's job market?",
      body: "Tell us where you are and what you want to earn. We will tell you what is realistically hiring near you — and what is not.",
      buttonLabel: "Ask on WhatsApp",
      whatsappMessage: "Hi Jobjila, I want to know which course suits the job market in my city. My city and background:",
    })}
  </div>
</section>
` +
    footer();

  write(path.join("locations", "index.html"), html);
}

/* ---------- runner ---------- */

module.exports = function buildCityPages() {
  const open = openCourses();
  open.forEach((course) => cities.forEach((city) => buildCityCoursePage(course, city)));
  buildLocationsHub();
  return open.length * cities.length + 1;
};

module.exports.cityUrls = () => {
  const urls = openCourses().flatMap((course) =>
    cities.map((city) => ({
      url: `/courses/${course.slug}/${city.slug}/`,
      priority: "0.8",
      freq: "monthly",
    }))
  );
  urls.push({ url: "/locations/", priority: "0.8", freq: "monthly" });
  return urls;
};
