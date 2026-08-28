/**
 * Training pages.
 *   /training/                        course hub
 *   /training/<slug>/                 one page per course
 *   /training/<slug>/<city>/          local pages for SEO
 *
 * City pages carry genuinely local content from data/cities.json — hubs,
 * market description, pay comparison and city-specific FAQs. Near-identical
 * city pages get treated as doorway pages and dropped, so anything shared
 * with the parent course page is summarised here rather than duplicated.
 */

const path = require("path");
const {
  site, openCourses, cities, trackOf,
  esc, inr, wa, WA_ICON, write,
  head, footer, crumb, courseCard, faqBlock, band, shareRow, ladder,
  orgLd, breadcrumbLd, faqLd, courseLd,
} = require("./lib");

/* ------------------------- course hub ------------------------- */

function hub() {
  const t = [{ name: "Home", url: "/" }, { name: "Training", url: "/training/" }];
  const lo = Math.min(...openCourses.map((c) => c.priceINR));
  const hi = Math.max(...openCourses.map((c) => c.priceINR));

  const faqs = [
    { q: "How much do the courses cost?", a: `Between ${inr(lo)} and ${inr(hi)} depending on length and cohort size. Every course page states its exact fee. The first class is free, ${inr(site.pricing.bookingAmount)} holds your seat and is refundable, and the balance is due only before your third session.` },
    { q: "Are classes live or pre-recorded?", a: "Live online in the evening, taught by a practising consultant, with every session recorded so you can revisit it or catch up." },
    { q: "Are certification exam fees included?", a: "No. Where a course prepares you for an external certification — AWS, Microsoft, Oracle, PeopleCert — you book and pay that exam directly with them. We cover the syllabus and run practice tests, but we never hold your exam money." },
    { q: "Can I take a course while working full time?", a: "Most learners do. Courses run four to eight hours a week, sessions are in the evening, and everything is recorded. Tell us your schedule and we will suggest a batch." },
    { q: "Do you run training for company teams?", a: "Yes. Closed batches on any subject here, scheduled around your working hours and quoted per batch rather than per seat. Message us with the team size and subject." },
    { q: "Do you guarantee a job afterwards?", a: "No. We provide the training, an assessed capstone project, resume review and interview practice. We will not promise employment for a fee, and we would treat any institute that does with suspicion." },
  ];

  const byTrack = site.tracks
    .map((tr) => ({ tr, list: openCourses.filter((c) => c.track === tr.id) }))
    .filter((g) => g.list.length);

  return head({
    title: "IT Training Courses — Cloud, ITSM & Infrastructure | Jobjila",
    description: `Live online IT training in AWS, Azure, OCI, ITIL 4, ITSM, infrastructure, presales and Power BI. Fees from ${inr(lo)}, first class free, refundable booking.`,
    canonical: "/training/",
    keywords: ["it training courses india", "aws azure oci training", "itil 4 foundation course", "itsm training online", "it course fees"],
    extraLd: [
      orgLd, breadcrumbLd(t), faqLd(faqs),
      {
        "@context": "https://schema.org", "@type": "ItemList", name: "Jobjila training courses",
        itemListElement: openCourses.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `${site.url}/training/${c.slug}/` })),
      },
    ],
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">Training</span>
    <h1>Courses taught by people who do the work</h1>
    <p>Cloud platforms, IT service management, infrastructure and consulting skills. Live online, every session recorded, and every fee published on this page.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, I want to book a free first class.")}" target="_blank" rel="noopener">${WA_ICON}<span>Book a free first class</span></a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">All courses and fees</span>
      <h2>Everything, with the price</h2>
      <p class="muted">Fees are the same wherever in India you join from. No metro surcharge, no negotiation, no "contact us for pricing".</p>
    </div>

    <div class="scroll">
      <table>
        <caption>Open cohorts. Company batches are quoted per batch — <a href="/contact/">ask us</a>.</caption>
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Track</th>
            <th scope="col">Duration</th>
            <th scope="col">Per week</th>
            <th scope="col">Fee</th>
          </tr>
        </thead>
        <tbody>
          ${openCourses.map((c) => `<tr>
            <th scope="row"><a href="/training/${c.slug}/">${esc(c.name)}</a></th>
            <td>${esc(trackOf(c.track).name)}</td>
            <td class="num">${esc(c.duration)}</td>
            <td class="num">${esc(c.effort.replace("/week", ""))}</td>
            <td class="num">${inr(c.priceINR)}</td>
          </tr>`).join("\n          ")}
        </tbody>
      </table>
    </div>
    <p class="small muted" style="margin-top:1rem">Certification exam fees, where a course prepares you for one, are paid directly to the certifying body and are not included above.</p>
  </div>
</section>

${byTrack.map((g) => `<section class="${g.tr.id === "cloud" ? "sunk" : ""}">
  <div class="wrap" data-track="${g.tr.id}">
    <div class="head">
      <span class="eyebrow">${esc(g.tr.name)}</span>
      <h2>${esc(g.tr.name)}</h2>
    </div>
    <div class="cards">
      ${g.list.map(courseCard).join("\n      ")}
    </div>
  </div>
</section>`).join("\n")}

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">How training starts</span>
      <h2>You pay after you have seen us teach</h2>
    </div>
    ${ladder()}
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    ${faqBlock(faqs, "Questions about our training").replace('style="margin-top:3rem"', "")}
    <div style="margin-top:3rem">
      ${band({ title: "Not sure which course?", body: "Send your background and what you want to be doing in a year. We will suggest a track — including if a shorter or cheaper one gets you there faster.", label: "Ask on WhatsApp", message: "Hi Jobjila, I am not sure which course fits me. My background is:" })}
    </div>
    ${shareRow({ url: "/training/", text: `${openCourses.length} IT courses from Jobjila — cloud, ITSM and infrastructure. First class free.`, heading: "Share the course list" })}
  </div>
</section>
` + footer();
}

/* ------------------------- course page ------------------------- */

function coursePage(c) {
  const t = [
    { name: "Home", url: "/" },
    { name: "Training", url: "/training/" },
    { name: c.name, url: `/training/${c.slug}/` },
  ];
  const waHref = wa(`Hi Jobjila, I want to book the free first class for ${c.name} (${c.duration}, ${inr(c.priceINR)}).`);
  const related = openCourses.filter((x) => x.slug !== c.slug && x.track === c.track)
    .concat(openCourses.filter((x) => x.slug !== c.slug && x.track !== c.track))
    .slice(0, 3);

  return head({
    title: `${c.seoTitle} | Jobjila`,
    description: c.metaDescription,
    canonical: `/training/${c.slug}/`,
    keywords: [
      `${c.name.toLowerCase()} training`,
      `${c.name.toLowerCase()} course fees`,
      `${c.short.toLowerCase()} certification course`,
      `${c.name.toLowerCase()} course online india`,
    ],
    ogImage: `/assets/og/${c.slug}.jpg`,
    extraLd: [orgLd, courseLd(c), breadcrumbLd(t), faqLd(c.faqs)],
    track: c.track,
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">${esc(trackOf(c.track).name)}</span>
    <h1>${esc(c.name)}</h1>
    <p>${esc(c.tagline)}</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>Book the free first class</span></a>
      <a class="btn btn-ondark btn-lg" href="#syllabus">Syllabus</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="layout">
      <div>
        <p class="lede">${esc(c.intro)}</p>

        <section class="stack" style="margin-top:2.5rem" id="syllabus">
          <h2>Syllabus</h2>
          <p class="muted small">${c.modules.length} modules across ${esc(c.duration)}, at about ${esc(c.effort)}.</p>
          <div class="modules">
            ${c.modules.map((m) => `<article class="module">
              <h3>${esc(m.title)}</h3>
              <p>${esc(m.detail)}</p>
            </article>`).join("\n            ")}
          </div>
        </section>

        <section class="stack" style="margin-top:2.5rem">
          <h2>What you will be able to do</h2>
          <ul class="checks">
            ${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join("\n            ")}
          </ul>
        </section>

        <section class="stack" style="margin-top:2.5rem">
          <h2>Roles this leads to</h2>
          <p class="muted small">Common job titles for people with this skill set. These are market observations — we do not guarantee employment.</p>
          <div class="chips">
            ${c.roles.map((r) => `<span class="chip chip-line">${esc(r)}</span>`).join("\n            ")}
          </div>
        </section>

        <div class="callout" style="margin-top:2.5rem">
          <h3>Your first class is free</h3>
          <p>Attend the first live session before paying anything. If you continue, ${inr(site.pricing.bookingAmount)} holds your seat and is fully refundable, and the balance is due only before your third session. Full terms in the <a href="/refund-policy/">Refund Policy</a>.</p>
        </div>

        ${faqBlock(c.faqs, `${c.name} — questions`)}
        ${shareRow({ url: `/training/${c.slug}/`, text: `${c.name} training — ${c.duration}, ${inr(c.priceINR)}, first class free. Jobjila.` })}
      </div>

      <aside class="aside">
        <div class="panel">
          <ul class="facts">
            <li><span class="k">Fee</span><b>${inr(c.priceINR)}</b></li>
            <li><span class="k">Duration</span><b>${esc(c.duration)}</b></li>
            <li><span class="k">Commitment</span><b>${esc(c.effort)}</b></li>
            <li><span class="k">Level</span><b>${esc(c.level)}</b></li>
            <li><span class="k">Format</span><b>Live online, recorded</b></li>
            <li><span class="k">First class</span><b>Free</b></li>
          </ul>
          <a class="btn btn-wa btn-block" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>Book free first class</span></a>
          <p class="small muted" style="text-align:center;margin:0">No payment or card details to book.</p>
        </div>

        <div class="panel">
          <h3>Certification</h3>
          <p class="small muted">${esc(c.certification)}</p>
          <p class="small muted">Exam fees are paid directly to the certifying body and are not included in our fee.</p>
        </div>

        <div class="panel">
          <h3>Tools you will use</h3>
          <div class="chips">${c.tools.map((x) => `<span class="chip chip-line">${esc(x)}</span>`).join("")}</div>
        </div>

        <div class="panel">
          <h3>${esc(c.short)} in your city</h3>
          <ul class="flist">
            ${cities.map((city) => `<li><a href="/training/${c.slug}/${city.slug}/">${esc(c.short)} training in ${esc(city.name)}</a></li>`).join("\n            ")}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head"><span class="eyebrow">Also consider</span><h2>Related courses</h2></div>
    <div class="cards">${related.map(courseCard).join("\n      ")}</div>
  </div>
</section>
` + footer();
}

/* -------------------------- city page -------------------------- */

function cityPage(c, city) {
  const url = `/training/${c.slug}/${city.slug}/`;
  const t = [
    { name: "Home", url: "/" },
    { name: "Training", url: "/training/" },
    { name: c.name, url: `/training/${c.slug}/` },
    { name: city.name, url },
  ];

  const note = (city.courseNotes && city.courseNotes[c.slug])
    || `${city.name} employers around ${city.hubs.slice(0, 3).join(", ")} hire across ${city.employerType}, and ${c.name} skills apply directly to that work.`;

  const faqs = [
    ...city.faqs,
    { q: `What are the ${c.name} course fees in ${city.name}?`, a: `${inr(c.priceINR)} for the full ${c.duration} programme — the same fee wherever in India you join from, with no ${city.name} pricing. The first class is free and ${inr(site.pricing.bookingAmount)} of the booking is refundable.` },
    { q: `Is this ${c.name} training online or classroom-based in ${city.name}?`, a: `Fully live online, so there is no ${city.name} classroom to travel to. Sessions run in the evening and every one is recorded, which is what makes it workable alongside a job.` },
  ];

  const waHref = wa(`Hi Jobjila, I am in ${city.name} and want the free first class for ${c.name} (${c.duration}, ${inr(c.priceINR)}).`);

  return head({
    title: `${c.name} Training in ${city.name} — Fees & Syllabus | Jobjila`,
    description: `${c.name} training for ${city.name} learners. ${c.duration}, live online, ${inr(c.priceINR)}, first class free. Syllabus, fees and the ${city.name} hiring picture.`,
    canonical: url,
    keywords: [
      `${c.short.toLowerCase()} training in ${city.name.toLowerCase()}`,
      `${c.name.toLowerCase()} course ${city.name.toLowerCase()} fees`,
      `${c.short.toLowerCase()} course near me ${city.name.toLowerCase()}`,
      `it training ${city.name.toLowerCase()}`,
    ],
    ogImage: `/assets/og/${c.slug}.jpg`,
    extraLd: [orgLd, courseLd(c, city), breadcrumbLd(t), faqLd(faqs)],
    track: c.track,
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">${esc(city.name)} &middot; ${esc(trackOf(c.track).name)}</span>
    <h1>${esc(c.name)} Training in ${esc(city.name)}</h1>
    <p>${esc(c.tagline)} Live online, so ${esc(city.name)} learners join without a commute.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>Book the free first class</span></a>
      <a class="btn btn-ondark btn-lg" href="/training/${c.slug}/">Full syllabus</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="layout">
      <div>
        <section class="stack">
          <h2>${esc(c.short)} hiring in ${esc(city.name)}</h2>
          <p>${esc(city.intro)}</p>
          <p>${esc(note)}</p>
          <p><strong>Pay:</strong> ${esc(city.salaryNote)}</p>
        </section>

        <section class="stack" style="margin-top:2.5rem">
          <h2>Where the work is in ${esc(city.name)}</h2>
          <p class="muted">${esc(city.demandLead)} Local technology employment concentrates around these areas:</p>
          <div class="chips">${city.hubs.map((h) => `<span class="chip">${esc(h)}</span>`).join("")}</div>
          <p class="small muted">Cohorts are online, so anywhere in ${esc(city.name)} joins the same batch.</p>
        </section>

        <section class="stack" style="margin-top:2.5rem">
          <h2>What the course covers</h2>
          <p class="muted small">${c.modules.length} modules across ${esc(c.duration)}. This is the outline — the <a href="/training/${c.slug}/">full ${esc(c.name)} syllabus</a> has the detail.</p>
          <div class="modules">
            ${c.modules.map((m) => `<article class="module"><h3>${esc(m.title)}</h3></article>`).join("\n            ")}
          </div>
        </section>

        <section class="stack" style="margin-top:2.5rem">
          <h2>What you will be able to do</h2>
          <ul class="checks">${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join("\n            ")}</ul>
        </section>

        ${faqBlock(faqs, `${c.short} in ${city.name} — questions`)}
        ${shareRow({ url, text: `${c.name} training for ${city.name} — ${c.duration}, ${inr(c.priceINR)}, first class free. Jobjila.`, heading: `Know someone in ${city.name} who needs this?` })}
      </div>

      <aside class="aside">
        <div class="panel">
          <ul class="facts">
            <li><span class="k">Fee</span><b>${inr(c.priceINR)}</b></li>
            <li><span class="k">Duration</span><b>${esc(c.duration)}</b></li>
            <li><span class="k">Level</span><b>${esc(c.level)}</b></li>
            <li><span class="k">Format</span><b>Live online</b></li>
            <li><span class="k">Serving</span><b>${esc(city.name)}</b></li>
          </ul>
          <a class="btn btn-wa btn-block" href="${waHref}" target="_blank" rel="noopener">${WA_ICON}<span>Book free first class</span></a>
          <p class="small muted" style="text-align:center;margin:0">Same fee everywhere in India.</p>
        </div>
        <div class="panel">
          <h3>Other courses for ${esc(city.name)}</h3>
          <ul class="flist">
            ${openCourses.filter((x) => x.slug !== c.slug).slice(0, 6)
              .map((x) => `<li><a href="/training/${x.slug}/${city.slug}/">${esc(x.short)} in ${esc(city.name)}</a></li>`).join("\n            ")}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head"><h2>${esc(c.short)} training in other cities</h2><p class="muted">Same online cohort wherever you join from. These pages cover the local market.</p></div>
    <div class="chips">
      ${cities.filter((x) => x.slug !== city.slug).map((x) => `<a class="chip" href="/training/${c.slug}/${x.slug}/">${esc(x.name)}</a>`).join("\n      ")}
    </div>
  </div>
</section>
` + footer();
}

/* ---------------------------- runner ---------------------------- */

module.exports = function buildTraining() {
  write(path.join("training", "index.html"), hub());
  openCourses.forEach((c) => write(path.join("training", c.slug, "index.html"), coursePage(c)));
  openCourses.forEach((c) => cities.forEach((city) =>
    write(path.join("training", c.slug, city.slug, "index.html"), cityPage(c, city))));
  return 1 + openCourses.length + openCourses.length * cities.length;
};

module.exports.urls = () => [
  { url: "/training/", priority: "0.9", freq: "weekly" },
  ...openCourses.map((c) => ({ url: `/training/${c.slug}/`, priority: "0.9", freq: "monthly" })),
  ...openCourses.flatMap((c) => cities.map((city) => ({ url: `/training/${c.slug}/${city.slug}/`, priority: "0.8", freq: "monthly" }))),
];
