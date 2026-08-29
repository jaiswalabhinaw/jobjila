/**
 * Blog / guides.
 *   /blog/            index
 *   /blog/<slug>/     one page per article
 *
 * These are the site's only informational (top-of-funnel) pages. Everything
 * under /training/ targets a transactional query — "aws training fees" — which
 * a new domain cannot win quickly. These target the questions people ask
 * *before* they are ready to buy, which is where a site with no backlinks has
 * a realistic chance of ranking.
 *
 * Every article carries BlogPosting schema with a real author (site.founder),
 * so the site has a named person attached to its content rather than none.
 */

const path = require("path");
const {
  site, courses, articles, trackOf,
  esc, write, fmtDate,
  head, footer, crumb, faqBlock, band, shareRow,
  orgLd, personLd, breadcrumbLd, faqLd, articleLd,
} = require("./lib");

const bySlug = (s) => courses.find((c) => c.slug === s);
const artUrl = (a) => `/blog/${a.slug}/`;

/* Articles that link to a given course — used on course pages so the two
   halves of the site point at each other instead of being separate silos. */
function articlesForCourse(slug) {
  return articles.filter((a) => (a.relatedCourses || []).includes(slug));
}

/* ---------------------------- one section ---------------------------- */

function section(s, i) {
  const id = "s" + (i + 1);
  const paras = (arr) => (arr || []).map((t) => `<p>${esc(t)}</p>`).join("\n      ");
  const list = s.list
    ? `<ul class="checks">\n        ${s.list.map((x) => `<li>${esc(x)}</li>`).join("\n        ")}\n      </ul>`
    : "";
  const table = s.table
    ? `<div class="scroll">
        <table>
          <caption>${esc(s.table.caption)}</caption>
          <thead><tr>${s.table.head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>
            ${s.table.rows.map((r) => `<tr>${r.map((cell, ci) =>
              ci === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`).join("")}</tr>`).join("\n            ")}
          </tbody>
        </table>
      </div>`
    : "";
  const note = s.note ? `<div class="callout callout-sm"><p>${esc(s.note)}</p></div>` : "";

  return `<section class="stack article-section" id="${id}">
      <h2>${esc(s.h)}</h2>
      ${paras(s.p)}
      ${list}
      ${table}
      ${paras(s.p2)}
      ${note}
    </section>`;
}

/* ---------------------------- article page ---------------------------- */

function articlePage(a) {
  const t = [
    { name: "Home", url: "/" },
    { name: "Career Guide", url: "/blog/" },
    { name: a.title, url: artUrl(a) },
  ];
  const related = (a.relatedCourses || []).map(bySlug).filter(Boolean);
  const more = articles.filter((x) => x.slug !== a.slug && x.track === a.track).slice(0, 2)
    .concat(articles.filter((x) => x.slug !== a.slug && x.track !== a.track)).slice(0, 3);

  return head({
    title: `${a.seoTitle} | Jobjila`,
    description: a.metaDescription,
    canonical: artUrl(a),
    ogImage: `/assets/blog/${a.slug}.jpg`,
    ogType: "article",
    published: a.published,
    modified: a.updated || a.published,
    extraLd: [orgLd, personLd, articleLd(a), breadcrumbLd(t), faqLd(a.faqs)],
    track: a.track,
  }) + `
<article>
<section class="article-head">
  <div class="wrap wrap-narrow">
    ${crumb(t)}
    <span class="eyebrow">${esc(trackOf(a.track).name)}</span>
    <h1>${esc(a.title)}</h1>
    <p class="lede">${esc(a.excerpt)}</p>
    <p class="byline">
      By <a href="/about/">${esc(site.founder.name)}</a>, ${esc(site.founder.role)}
      <span aria-hidden="true">&middot;</span>
      <time datetime="${esc(a.published)}">${esc(fmtDate(a.published))}</time>
      <span aria-hidden="true">&middot;</span>
      ${a.readMins} min read
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="layout">
      <div class="prose">
        <figure class="article-figure">
          <img src="/assets/blog/${esc(a.slug)}-card.jpg" width="1200" height="630"
               alt="Jobjila guide on ${esc(trackOf(a.track).name.toLowerCase())}: ${esc(a.excerpt)}"
               fetchpriority="high" decoding="async">
        </figure>

        <p class="lede">${esc(a.intro)}</p>

        <nav class="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            ${a.sections.map((s, i) => `<li><a href="#s${i + 1}">${esc(s.h)}</a></li>`).join("\n            ")}
          </ol>
        </nav>

        ${a.sections.map(section).join("\n    ")}

        <section class="stack article-section">
          <h2>In short</h2>
          <ul class="checks">
            ${a.takeaways.map((x) => `<li>${esc(x)}</li>`).join("\n            ")}
          </ul>
        </section>

        ${faqBlock(a.faqs, "Questions people ask about this")}
        ${shareRow({ url: artUrl(a), text: `${a.title} — Jobjila`, heading: "Useful? Send it on." })}
      </div>

      <aside class="aside">
        ${related.length ? `<div class="panel">
          <h3>Courses on this</h3>
          <p class="small muted">We teach this subject. First class is free, so you can judge before paying.</p>
          <ul class="flist">
            ${related.map((c) => `<li><a href="/training/${c.slug}/">${esc(c.name)} &mdash; ${esc(c.duration)}</a></li>`).join("\n            ")}
          </ul>
        </div>` : ""}

        <div class="panel">
          <h3>Written by</h3>
          <div class="who"><h4>${esc(site.founder.name)}</h4><span class="role">${esc(site.founder.role)}, ${esc(site.name)}</span></div>
          <p class="small muted">${esc(site.founder.bio)}</p>
          <p class="small muted"><a href="/about/">About Jobjila</a></p>
        </div>

        <div class="panel">
          <h3>More guides</h3>
          <ul class="flist">
            ${more.map((x) => `<li><a href="${artUrl(x)}">${esc(x.seoTitle)}</a></li>`).join("\n            ")}
          </ul>
          <p class="small muted"><a href="/blog/">All guides</a></p>
        </div>
      </aside>
    </div>
  </div>
</section>
</article>

<section class="sunk">
  <div class="wrap">
    ${band({
      title: "Questions this did not answer?",
      body: "Send it over. We answer training and IT questions whether or not you become a customer — it costs us nothing and it is how most people first talk to us.",
      label: "Ask on WhatsApp",
      message: `Hi Jobjila, I read your guide "${a.title}" and have a question:`,
    })}
  </div>
</section>
` + footer();
}

/* ------------------------------- index ------------------------------- */

function indexPage() {
  const t = [{ name: "Home", url: "/" }, { name: "Career Guide", url: "/blog/" }];
  const groups = site.tracks
    .map((tr) => ({ tr, list: articles.filter((a) => a.track === tr.id) }))
    .filter((g) => g.list.length);

  const card = (a) => `<article class="post-card" data-track="${a.track}">
        <a class="thumb" href="${artUrl(a)}" tabindex="-1" aria-hidden="true">
          <img src="/assets/blog/${esc(a.slug)}-card.jpg" width="1200" height="630" alt="" loading="lazy" decoding="async">
        </a>
        <div class="body">
          <span class="chips"><span class="chip">${esc(trackOf(a.track).name)}</span></span>
          <h3><a href="${artUrl(a)}">${esc(a.title)}</a></h3>
          <p class="desc">${esc(a.excerpt)}</p>
          <p class="fine">${esc(fmtDate(a.published))} &middot; ${a.readMins} min read</p>
        </div>
      </article>`;

  return head({
    title: "IT Career & Certification Guides | Jobjila",
    description: "Practical guides to cloud certification, ITIL and ITSM, IT support careers and choosing a training provider in India — from the people who teach it.",
    canonical: "/blog/",
    extraLd: [
      orgLd, personLd, breadcrumbLd(t),
      {
        "@context": "https://schema.org", "@type": "Blog",
        "@id": site.url + "/blog/#blog",
        name: "Jobjila Guides",
        description: "Guides to IT certification, careers and training in India.",
        url: site.url + "/blog/",
        publisher: { "@id": site.url + "/#organization" },
        blogPost: articles.map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          url: site.url + artUrl(a),
          datePublished: a.published,
          author: { "@id": site.url + "/#founder" },
        })),
      },
    ],
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">Career Guide</span>
    <h1>Straight answers about IT certification and careers</h1>
    <p>What we would tell you on a call, written down. No affiliate links, no course sold in the middle of a paragraph, and the parts that are inconvenient for us left in.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">${articles.length} guides</span>
      <h2>Start here</h2>
      <p class="muted">Written by ${esc(site.founder.name)}, who runs the practice and teaches on it. Updated when the facts change, not on a schedule.</p>
    </div>
    <div class="posts">
      ${articles.map(card).join("\n      ")}
    </div>
  </div>
</section>

${groups.map((g, i) => `<section class="${i % 2 === 0 ? "sunk" : ""}">
  <div class="wrap" data-track="${g.tr.id}">
    <div class="head">
      <span class="eyebrow">${esc(g.tr.name)}</span>
      <h2>${esc(g.tr.name)} guides</h2>
    </div>
    <ul class="linklist">
      ${g.list.map((a) => `<li><a href="${artUrl(a)}"><b>${esc(a.title)}</b><span>${esc(a.excerpt)}</span></a></li>`).join("\n      ")}
    </ul>
  </div>
</section>`).join("\n")}

<section>
  <div class="wrap">
    ${band({
      title: "We teach the subjects we write about",
      body: "Nine live online courses in cloud, service management, infrastructure, presales and data. First class free, every fee published.",
      label: "Ask about a course",
      message: "Hi Jobjila, I read one of your guides and want to know about a course.",
    })}
  </div>
</section>
` + footer();
}

/* ------------------------------- runner ------------------------------- */

module.exports = function buildBlog() {
  write(path.join("blog", "index.html"), indexPage());
  articles.forEach((a) => write(path.join("blog", a.slug, "index.html"), articlePage(a)));
  return 1 + articles.length;
};

module.exports.urls = () => [
  { url: "/blog/", priority: "0.9", freq: "weekly" },
  ...articles.map((a) => ({ url: artUrl(a), priority: "0.8", freq: "monthly" })),
];

module.exports.articlesForCourse = articlesForCourse;
module.exports.artUrl = artUrl;
