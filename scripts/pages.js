/** Standalone (non-training) pages. */

const path = require("path");
const {
  site, openCourses, cities, trackOf,
  esc, inr, wa, WA_ICON, write, vh, fmtDate, GA_ID,
  head, footer, crumb, courseCard, faqBlock, band, shareRow, ladder, honestBlock,
  orgLd, personLd, websiteLd, breadcrumbLd, faqLd, serviceLd,
} = require("./lib");
const { articles, artUrl } = (() => {
  const lib = require("./lib");
  const blog = require("./blog");
  return { articles: lib.articles, artUrl: blog.artUrl };
})();

const trail = (name, url) => [{ name: "Home", url: "/" }, { name, url }];

/* ============================== HOME ============================== */

function home() {
  const featured = openCourses.filter((c) => c.featured);
  const faqs = [
    { q: "What does Jobjila actually do?", a: "Four things. We advise companies on their IT — cloud architecture, migrations, cost and technology choices. We support IT infrastructure and keep it running. We train people in the same technology, live online. And we recruit for companies hiring into those roles, paid by the employer. The consulting keeps the training current, and the training keeps our screening honest." },
    { q: "Is your recruitment separate from your training?", a: "Completely. A course fee buys teaching and nothing else — not a job, not an interview, not a place on any shortlist. Employers pay us to recruit; candidates never pay us anything. If we do put a former student forward for a role, we tell the employer we trained them." },
    { q: "Is the first class really free?", a: "Yes. Any course, first live session, no payment and no card details. You message us on WhatsApp and we send the joining link. We are new and have no reviews yet, so asking you to pay on trust would be unreasonable." },
    { q: "How much do the courses cost?", a: `Between ${inr(Math.min(...openCourses.map((c) => c.priceINR)))} and ${inr(Math.max(...openCourses.map((c) => c.priceINR)))} depending on length. Every fee is published on its course page. You pay the balance only before your third session, and it stays refundable for ${site.pricing.refundDays} days after that.` },
    { q: "Are the classes live or recorded?", a: "Live online, in the evening, taught by a practising consultant — with every session recorded so you can revisit it or catch up if you miss one." },
    { q: "Do you guarantee a job after training?", a: "No, and we will not pretend otherwise. We provide the training, an assessed project, resume review and interview practice. Anyone promising a guaranteed job in exchange for a fee is doing something else." },
    { q: "Can companies book training for a team?", a: "Yes. Closed batches are run for company teams on any of our subjects, scheduled around your working hours and quoted per batch rather than per seat. Message us with the team size and subject." },
  ];

  return head({
    title: "Jobjila — IT Advisory, Support, Training & Hiring",
    description: "IT advisory, IT support, live online training and employer-paid IT recruitment — from practising consultants in Noida. First training class free.",
    canonical: "/",
    extraLd: [orgLd, personLd, websiteLd, faqLd(faqs)],
  }) + `
<div class="hero">
  <div class="wrap">
   <div class="hero-split">
    <div class="hero-copy">
    <span class="eyebrow">${esc(site.locality)}, ${esc(site.region)} &middot; serving clients across India</span>
    <h1 style="margin-top:.875rem">IT advisory, support, training and hiring — <em>without the guesswork.</em></h1>
    <p class="lede">We help companies plan and run their IT, we train the people who do that work, and we find them the people they need to hire. Every price is published on this site — including our recruitment rate. Your first training class is free.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, I want to book a free first class.")}" target="_blank" rel="noopener">${WA_ICON}<span>Book a free first class</span></a>
      <a class="btn btn-line btn-lg" href="/training/">Browse courses</a>
    </div>
    </div>

    <aside class="hero-panel" aria-label="Recruitment and talent">
      <span class="panel-tag">New &middot; Recruitment &amp; Talent</span>
      <p class="panel-lead">We hire for companies now — and the employer pays, never the candidate.</p>
      <div class="ticker">
        <ul class="ticker-track">
          <li>Permanent Recruitment</li>
          <li>Contract Hiring</li>
          <li>Freelance &amp; Project-Based Hiring</li>
          <li>IT &amp; Technology Recruitment</li>
          <li>Cloud &amp; Infrastructure Recruitment</li>
          <li>Sales &amp; Presales Recruitment</li>
          <li>Talent Sourcing</li>
          <li>Candidate Screening</li>
          <li>Specialist / Niche Hiring</li>
          <li>Startup &amp; SME Recruitment Support</li>
        </ul>
        <ul class="ticker-track" aria-hidden="true">
          <li>Permanent Recruitment</li>
          <li>Contract Hiring</li>
          <li>Freelance &amp; Project-Based Hiring</li>
          <li>IT &amp; Technology Recruitment</li>
          <li>Cloud &amp; Infrastructure Recruitment</li>
          <li>Sales &amp; Presales Recruitment</li>
          <li>Talent Sourcing</li>
          <li>Candidate Screening</li>
          <li>Specialist / Niche Hiring</li>
          <li>Startup &amp; SME Recruitment Support</li>
        </ul>
      </div>
      <dl class="panel-facts">
        <div><dt>Our fee</dt><dd>${site.recruitment.permanentPct}% of CTC</dd></div>
        <div><dt>Replacement</dt><dd>${site.recruitment.replacementDays} days</dd></div>
        <div><dt>Candidate pays</dt><dd>&#8377;0</dd></div>
      </dl>
      <a class="btn btn-line btn-block" href="/recruitment/">See how hiring works</a>
    </aside>
   </div>

    <div class="hero-stats">
      <div><b>${openCourses.length}</b><span>Courses</span></div>
      <div><b>&#8377;0</b><span>First class</span></div>
      <div><b>${site.pricing.refundDays} days</b><span>Refund window</span></div>
      <div><b>100%</b><span>Live, recorded</span></div>
    </div>

    ${vh("h2", "What Jobjila does")}
    <div class="pillars">
      <div><a href="/it-advisory/"><h3>IT Advisory</h3><p>Cloud architecture, migration planning, cost review and technology selection.</p></a></div>
      <div><a href="/it-support/"><h3>IT Support</h3><p>Infrastructure setup, networks, servers, backup and ongoing maintenance.</p></a></div>
      <div><a href="/training/"><h3>Training</h3><p>Live online cohorts in cloud, ITSM and infrastructure. Closed batches for teams.</p></a></div>
      <div><a href="/recruitment/"><h3>Recruitment</h3><p>Permanent, contract and freelance hiring for IT roles. Employers pay us; candidates never do.</p></a></div>
      <div><a href="/network/"><h3>Freelancing</h3><p>A reviewed network of independent consultants who deliver client work with us.</p></a></div>
    </div>
  </div>
</div>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">How training starts</span>
      <h2>You pay after you have seen us teach</h2>
      <p class="muted">We are new, and we have no reviews yet. This is the entire payment sequence, in order.</p>
    </div>
    ${ladder()}
    <p class="small muted" style="margin-top:1.25rem">If <em>we</em> cancel or postpone a batch, you get a 100% refund whenever that happens, or a free transfer to the next batch — your choice, not ours. Full terms in the <a href="/refund-policy/">Refund Policy</a>.</p>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Training</span>
      <h2>Courses running now</h2>
      <p class="muted">Cloud platforms, IT service management, infrastructure and consulting skills. Every course lists its full syllabus and fee.</p>
    </div>
    <div class="cards">
      ${featured.map((c, i) => courseCard(c, i)).join("\n      ")}
    </div>
    <div class="btns" style="margin-top:2rem">
      <a class="btn btn-line btn-lg" href="/training/">See all ${openCourses.length} courses and fees</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">For companies</span>
      <h2>Advisory and support, from the people who teach it</h2>
      <p class="muted">We consult on the same technology we train in. That is deliberate — the training stays current because we do the work, and the consulting has depth because we teach it.</p>
    </div>
    <div class="grid g2">
      <div class="cell" data-track="cloud">
        <span class="chips"><span class="chip">Advisory</span></span>
        <h3>Decide what to build, buy or move</h3>
        <ul>
          <li>Cloud architecture review — AWS, Azure, OCI</li>
          <li>Migration planning and risk assessment</li>
          <li>Cloud bill review and cost reduction</li>
          <li>Technology and vendor selection</li>
          <li>Presales and RFP response support</li>
        </ul>
        <a class="btn btn-line" href="/it-advisory/" style="justify-self:start">IT Advisory</a>
      </div>
      <div class="cell" data-track="infra">
        <span class="chips"><span class="chip">Support</span></span>
        <h3>Keep it running properly</h3>
        <ul>
          <li>Network and server setup</li>
          <li>Windows and Linux administration</li>
          <li>Backup and recovery, tested not assumed</li>
          <li>Security hardening and monitoring</li>
          <li>Annual maintenance contracts</li>
        </ul>
        <a class="btn btn-line" href="/it-support/" style="justify-self:start">IT Support</a>
      </div>
    </div>
  </div>
</section>

${honestBlock()}

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Recruitment &amp; Talent &middot; new</span>
      <h2>We now hire for companies too</h2>
      <p class="muted">Ten hiring services across the same technologies we advise on and teach. The employer pays our fee — a candidate has never paid us anything and never will.</p>
    </div>
    <div class="grid g5">
      <div class="cell"><h3>Permanent Recruitment</h3><p>Invoiced after joining, with a ${site.recruitment.replacementDays}-day replacement guarantee.</p></div>
      <div class="cell"><h3>Contract Hiring</h3><p>Fixed-term cover for a migration or a notice period.</p></div>
      <div class="cell"><h3>Freelance &amp; Project-Based Hiring</h3><p>Independent specialists for scoped work with a defined end.</p></div>
      <div class="cell"><h3>IT &amp; Technology Recruitment</h3><p>Engineers, admins and support across the infrastructure stack.</p></div>
      <div class="cell"><h3>Cloud &amp; Infrastructure Recruitment</h3><p>AWS, Azure and OCI — the subjects we teach.</p></div>
      <div class="cell"><h3>Sales &amp; Presales Recruitment</h3><p>Solution consultants and presales, screened by people who do it.</p></div>
      <div class="cell"><h3>Talent Sourcing</h3><p>Open market first, our network second. We tell you which.</p></div>
      <div class="cell"><h3>Candidate Screening</h3><p>A technical conversation, not a keyword match.</p></div>
      <div class="cell"><h3>Specialist / Niche Hiring</h3><p>OCI, ITSM tooling, cloud cost. We size the pool honestly.</p></div>
      <div class="cell"><h3>Startup &amp; SME Recruitment Support</h3><p>One role is normal. No minimum, no retainer.</p></div>
    </div>
    <div class="callout" style="margin-top:2rem">
      <h3>Training and hiring are separate services</h3>
      <p>Paying for a course does not buy a job, an interview, or a place on a shortlist — and we would rather say that on the homepage than bury it. Our recruitment fee is published in full on the <a href="/recruitment/">hiring page</a>, and candidates can read exactly what we do with a CV on the <a href="/for-candidates/">candidates page</a>.</p>
    </div>
    <div class="btns" style="margin-top:2rem">
      <a class="btn btn-line btn-lg" href="/recruitment/">Hiring? See the rate</a>
      <a class="btn btn-line btn-lg" href="/for-candidates/">Looking for a role?</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">For consultants and trainers</span>
      <h2>We deliver through independent specialists</h2>
      <p class="muted">Rather than a payroll bench, we route client work to reviewed independent consultants. If you consult or train in cloud, infrastructure, service management, data or presales, you can apply.</p>
    </div>
    <div class="grid g3">
      <div class="cell"><h3>Free to join</h3><p>No fee to apply and no fee to stay listed. We take a share only on work actually delivered.</p></div>
      <div class="cell"><h3>Reviewed, not open</h3><p>A short call, and a recorded demo if you want to train. That review is what makes the network worth being in.</p></div>
      <div class="cell"><h3>Not exclusive</h3><p>You keep your own clients. We route what matches, and we tell you honestly how much that is.</p></div>
    </div>
    <div class="btns" style="margin-top:2rem">
      <a class="btn btn-line btn-lg" href="/network/">How the network works</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Free to read</span>
      <h2>Guides, with the inconvenient parts left in</h2>
      <p class="muted">We write up what we would tell you on a call — certification paths, what the exams actually test, and how to check a training provider before paying anyone, including us.</p>
    </div>
    <div class="posts">
      ${articles.slice(0, 3).map((a) => `<article class="post-card" data-track="${a.track}">
        <a class="thumb" href="${artUrl(a)}" tabindex="-1" aria-hidden="true">
          <img src="/assets/blog/${esc(a.slug)}-card.jpg" width="1200" height="630" alt="" loading="lazy" decoding="async">
        </a>
        <div class="body">
          <h3><a href="${artUrl(a)}">${esc(a.title)}</a></h3>
          <p class="desc">${esc(a.excerpt)}</p>
          <p class="fine">${a.readMins} min read</p>
        </div>
      </article>`).join("\n      ")}
    </div>
    <div class="btns" style="margin-top:2rem">
      <a class="btn btn-line btn-lg" href="/blog/">All ${articles.length} guides</a>
      <a class="btn btn-line btn-lg" href="/about/">Who runs Jobjila</a>
      <a class="btn btn-line btn-lg" href="/locations/">Where we work</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Reviews on Google</span>
      <h2>What students and clients say</h2>
      <p class="muted">${site.reviews.length} verified ${site.reviews.length === 1 ? "review" : "reviews"} on our Google Business Profile, reproduced in full. Every one is public — follow the link to read them at source.</p>
    </div>
    <div class="reviews-grid">
      ${site.reviews.map((r) => `<figure class="review-card">
        <div class="review-stars" role="img" aria-label="${r.stars} out of 5 stars">${"&#9733;".repeat(r.stars)}</div>
        <blockquote class="review-text">${esc(r.text)}</blockquote>
        <figcaption class="review-author"><b>${esc(r.author)}</b><span class="muted">${esc(r.course)}</span></figcaption>
      </figure>`).join("\n      ")}
    </div>
    <div class="btns" style="margin-top:2rem">
      <a class="btn btn-line btn-lg" href="${esc(site.googleReviewUrl)}" target="_blank" rel="noopener">Read and write reviews on Google</a>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    ${faqBlock(faqs, "Common questions").replace('style="margin-top:3rem"', "")}
    <div style="margin-top:3rem">
      ${band({
        title: "Start with a free class, or a conversation",
        body: "Tell us what you want to learn, or what your company needs help with. We will tell you honestly whether we are the right fit.",
        label: "Message us on WhatsApp",
        message: "Hi Jobjila, I would like to know more. My requirement is:",
      })}
    </div>
  </div>
</section>
` + footer();
}

/* ========================== IT ADVISORY ========================== */

function itAdvisory() {
  const t = trail("IT Advisory", "/it-advisory/");
  const faqs = [
    { q: "How do you charge for advisory work?", a: "Either a fixed fee for a defined piece of work — an architecture review, a migration plan, a cost assessment — or a day rate for ongoing advisory. We scope and quote before starting, and the quote does not move unless the scope does." },
    { q: "Do you work with small companies?", a: "Yes. A great deal of useful advisory work is small: a second opinion on an architecture, a cloud bill that has crept up, a decision between two vendors. We would rather do a two-day piece of work well than sell you a retainer you do not need." },
    { q: "Are you tied to AWS, Azure or Oracle?", a: "No. We hold no reseller agreements and take no vendor commission, so our recommendation is not influenced by who pays us — nobody does except you. We train on all three clouds, which is also why we can compare them honestly." },
    { q: "What does a cloud cost review involve?", a: "We look at your actual bill and usage, identify what is over-provisioned, unused or on the wrong pricing model, and give you a prioritised list with the rupee saving against each item. You decide what to act on; we can implement it or hand it to your team." },
  ];
  return head({
    title: "IT Advisory — Cloud Architecture & Cost Review | Jobjila",
    description: "Independent IT advisory from Noida: cloud architecture review, migration planning, cost reduction and technology selection. Fixed fee or day rate.",
    canonical: "/it-advisory/",
    extraLd: [orgLd, breadcrumbLd(t), faqLd(faqs), serviceLd("IT Advisory", "Cloud architecture review, migration planning, cost optimisation and technology selection.", "/it-advisory/")],
    track: "cloud",
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">IT Advisory</span>
    <h1>Decide what to build, buy or move — and what it should cost</h1>
    <p>Independent advice on cloud and infrastructure decisions. We hold no reseller agreements and take no vendor commission, so the recommendation you get is the one we would follow ourselves.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, I need IT advisory. Our situation is:")}" target="_blank" rel="noopener">${WA_ICON}<span>Describe your requirement</span></a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">What we advise on</span>
      <h2>Five things companies most often ask us</h2>
    </div>
    <div class="grid g2">
      <div class="cell"><h3>Cloud architecture review</h3><p>An independent read of an existing or proposed AWS, Azure or OCI design — resilience, security, and whether it will survive the growth you are planning for.</p></div>
      <div class="cell"><h3>Migration planning</h3><p>What moves, in what order, with what downtime and what rollback. Delivered as a plan your own team can execute, not a dependency on us.</p></div>
      <div class="cell"><h3>Cloud cost reduction</h3><p>A line-by-line read of your bill: over-provisioning, idle resources, wrong pricing models, and reserved or savings-plan opportunities, each with the rupee figure attached.</p></div>
      <div class="cell"><h3>Technology and vendor selection</h3><p>A structured comparison against your actual requirements and constraints — including when the honest answer is that your current setup is fine.</p></div>
      <div class="cell"><h3>Presales and RFP support</h3><p>For IT services firms bidding for work: solution design, RFP response writing, effort estimation and demo preparation.</p></div>
      <div class="cell"><h3>A second opinion</h3><p>Sometimes you have a proposal in hand and need someone with no stake in it to tell you whether it is sound. That is a legitimate and often very cheap engagement.</p></div>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">How we work</span>
      <h2>Scoped and quoted before anything starts</h2>
    </div>
    <div class="grid g4">
      <div class="cell"><h3>1. Conversation</h3><p>A call to understand the actual problem. Free, and often enough to point you in the right direction.</p></div>
      <div class="cell"><h3>2. Written scope</h3><p>What we will do, what you get, how long it takes, and the fixed fee or day rate.</p></div>
      <div class="cell"><h3>3. The work</h3><p>Done by a practising consultant, with your team involved so knowledge stays with you.</p></div>
      <div class="cell"><h3>4. Handover</h3><p>A document your team can act on without us. If you want us to implement, that is quoted separately.</p></div>
    </div>
    <div class="callout" style="margin-top:2rem">
      <h3>We will tell you when you do not need us</h3>
      <p>If your setup is adequate for where you are, or the problem is smaller than an engagement, we will say so on the first call. A consultancy that only ever finds expensive problems is not one worth calling twice.</p>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    ${faqBlock(faqs, "Advisory questions").replace('style="margin-top:3rem"', "")}
    <div style="margin-top:3rem">
      ${band({ title: "Tell us the problem", body: "Describe what you are deciding or what has gone wrong. The first conversation costs nothing.", label: "Message us", message: "Hi Jobjila, I need IT advisory. Our situation is:" })}
    </div>
  </div>
</section>
` + footer();
}

/* =========================== IT SUPPORT =========================== */

function itSupport() {
  const t = trail("IT Support", "/it-support/");
  const faqs = [
    { q: "Do you offer annual maintenance contracts?", a: "Yes. An AMC covers agreed systems for a fixed monthly or annual fee, with a defined response time. We scope what is covered and what is not in writing before it starts, so there is no argument later about whether something is included." },
    { q: "Can you support us remotely?", a: "Most infrastructure work is remote, which keeps the cost down for you. On-site visits are arranged where the work genuinely needs hands on hardware, and we are based in Noida so NCR visits are straightforward." },
    { q: "We already have an IT person. Can you work alongside them?", a: "Frequently, yes. A single in-house IT person cannot be expert in everything — we commonly back them up on cloud, networking or backup design while they run day-to-day operations. We are not there to replace them." },
    { q: "What size of company do you work with?", a: "Small and mid-size organisations, typically 10 to 200 people, where there is real infrastructure but not a large IT department. That is where good support makes the most visible difference." },
  ];
  return head({
    title: "IT Support Services — Networks, Servers & AMC | Jobjila",
    description: "IT support from Noida: network and server setup, Windows and Linux administration, tested backup and recovery, security hardening and annual maintenance.",
    canonical: "/it-support/",
    extraLd: [orgLd, breadcrumbLd(t), faqLd(faqs), serviceLd("IT Support", "Network and server setup, systems administration, backup and recovery, and annual maintenance.", "/it-support/")],
    track: "infra",
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">IT Support</span>
    <h1>Infrastructure set up properly, and kept running</h1>
    <p>Networks, servers, identity, backup and security for organisations that have real infrastructure but not a large IT department. Remote where it can be, on site in NCR where it needs to be.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, we need IT support. Our setup is:")}" target="_blank" rel="noopener">${WA_ICON}<span>Describe your setup</span></a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">What we cover</span>
      <h2>The infrastructure layer, end to end</h2>
    </div>
    <div class="grid g2">
      <div class="cell"><h3>Network setup and management</h3><p>Switching, VLANs, routing, firewalls, VPN and Wi-Fi designed for the way your office actually works — then documented so it can be maintained.</p></div>
      <div class="cell"><h3>Server administration</h3><p>Windows Server and Linux: provisioning, patching, file services, scheduled jobs and performance. Cloud or on-premise.</p></div>
      <div class="cell"><h3>Identity and access</h3><p>Active Directory or Entra ID, group policy, single sign-on, and joiner-mover-leaver processes that do not leave old accounts alive.</p></div>
      <div class="cell"><h3>Backup and disaster recovery</h3><p>A backup design with stated RTO and RPO — and a restore we have actually performed, because an untested backup is not a backup.</p></div>
      <div class="cell"><h3>Security hardening</h3><p>Endpoint protection, patch discipline, firewall rules, MFA rollout and a log review that catches problems before users report them.</p></div>
      <div class="cell"><h3>Annual maintenance contracts</h3><p>Agreed systems, agreed response times, fixed monthly cost. Scope written down before it starts, so nothing is disputed later.</p></div>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="callout">
      <h3>The first thing we usually check is the backup</h3>
      <p>In most small-company IT estates the backup either has not run for months or has never been restored from. It is the cheapest problem to fix and by far the most expensive one to discover during an incident — so it is where we start, before anything more interesting.</p>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    ${faqBlock(faqs, "Support questions").replace('style="margin-top:3rem"', "")}
    <div style="margin-top:3rem">
      ${band({ title: "Tell us what you are running", body: "How many users, what servers, what is currently breaking. We will tell you what it would take to fix.", label: "Message us", message: "Hi Jobjila, we need IT support. Our setup is:" })}
    </div>
  </div>
</section>
` + footer();
}

/* ============================ NETWORK ============================ */

function network() {
  const t = trail("Network", "/network/");
  const faqs = [
    { q: "Does it cost anything to join?", a: "No. There is no fee to apply, no fee to stay listed, and no subscription. We take an agreed share only on work actually delivered through us, so we earn when you earn and not before." },
    { q: "How much work will I get?", a: "We will not promise you a volume. We are a new practice, and pretending otherwise would be exactly the kind of claim this site is built to avoid. Ask us when you apply and we will tell you honestly what is currently flowing." },
    { q: "Is this exclusive?", a: "No. You keep your own clients and your own rates elsewhere. Most of our network consult independently and take Jobjila work when it matches what they want to do." },
    { q: "What is the review process?", a: "A conversation about your actual experience, and — if you want to train rather than consult — a recorded 15-minute demo session that we review. The whole thing usually takes one to two weeks." },
    { q: "How are trainers paid?", a: "Trainers take the majority share of every enrolment in their cohort, agreed in writing before the batch is announced. There is no upfront cost to you and no charge if a cohort does not fill." },
    { q: "How are consultants paid?", a: "Project work runs on milestones agreed before it starts, with your share fixed in the engagement letter. You invoice on milestone completion." },
  ];
  return head({
    title: "Join the Consultant & Trainer Network | Jobjila",
    description: "Join Jobjila's reviewed network of independent IT consultants and trainers. Free to join, non-exclusive, paid on delivery. Cloud, infrastructure, ITSM and data.",
    canonical: "/network/",
    extraLd: [orgLd, breadcrumbLd(t), faqLd(faqs)],
    track: "consult",
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">For consultants and trainers</span>
    <h1>We deliver client work through independent specialists</h1>
    <p>Not a payroll bench and not an open marketplace. A reviewed network of people who consult or train in cloud, infrastructure, service management, data and presales — and get routed work that matches.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, I want to join the network.\n\nName:\nCity:\nSkill or subject:\nYears of experience:\nConsult, train, or both:")}" target="_blank" rel="noopener">${WA_ICON}<span>Apply on WhatsApp</span></a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid g2">
      <div class="cell">
        <h3>What you get</h3>
        <ul>
          <li>Client projects routed to you when they match your skills</li>
          <li>Milestone payments agreed before any work starts</li>
          <li>Trainers take the majority share of every enrolment</li>
          <li>No fee to apply, and no fee to stay listed</li>
          <li>Your own clients stay entirely yours</li>
        </ul>
      </div>
      <div class="cell">
        <h3>What we ask</h3>
        <ul>
          <li>Real hands-on experience in what you claim</li>
          <li>A short review call before joining</li>
          <li>A recorded 15-minute demo, if you want to train</li>
          <li>That you tell a client honestly when something is outside your depth</li>
        </ul>
      </div>
    </div>

    <div class="callout" style="margin-top:1.5rem">
      <h3>We will not promise you a volume of work</h3>
      <p>We are new. We route what we have, and when you apply we will tell you plainly how much that currently is. A network that oversells its pipeline wastes the time of the people who join it — and you would find out within a month anyway.</p>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Skills we route work for</span>
      <h2>Where we currently need people</h2>
    </div>
    <div class="grid g3">
      ${site.tracks.map((tr) => `<div class="cell" data-track="${tr.id}">
        <span class="chips"><span class="chip">${esc(tr.name)}</span></span>
        <p>${esc(openCourses.filter((c) => c.track === tr.id).map((c) => c.name).join(", "))}</p>
      </div>`).join("\n      ")}
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    ${faqBlock(faqs, "Network questions").replace('style="margin-top:3rem"', "")}
    <div style="margin-top:3rem">
      ${band({ title: "Apply to join", body: "Send your name, city, subject and years of experience. We reply to every application within three working days.", label: "Apply on WhatsApp", message: "Hi Jobjila, I want to join the network.\n\nName:\nCity:\nSkill or subject:\nYears of experience:\nConsult, train, or both:" })}
    </div>
  </div>
</section>
` + footer();
}

/* ============================= ABOUT ============================= */

function about() {
  const t = trail("About", "/about/");
  return head({
    title: "About Jobjila — Who Runs This IT Practice",
    description: `Jobjila is an IT advisory, support and training practice based in ${site.locality}, founded by ${site.founder.name}. Published prices, refundable fees, and no employment guarantees.`,
    canonical: "/about/",
    extraLd: [
      orgLd, personLd, breadcrumbLd(t),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": site.url + "/about/#page",
        url: site.url + "/about/",
        name: `About ${site.name}`,
        description: `Who runs ${site.name}, how the practice is set up, and what it refuses to promise.`,
        mainEntity: { "@id": site.url + "/#organization" },
        about: [{ "@id": site.url + "/#organization" }, { "@id": site.url + "/#founder" }],
        isPartOf: { "@id": site.url + "/#website" },
      },
    ],
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">About</span>
    <h1>A small IT practice that publishes its prices</h1>
    <p>Jobjila advises companies on their IT, supports the infrastructure they run, and trains the people who do that work — from ${esc(site.locality)}, for clients across India.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="layout">
      <div class="prose">
        <h2>Why this exists</h2>
        <p>Two problems sit next to each other in Indian IT and rarely get solved together. Small and mid-size companies make expensive infrastructure decisions without anyone independent to ask. And capable people cannot get into IT work because training either costs too much to risk on an unknown provider, or promises a job it cannot deliver.</p>
        <p>Jobjila does both sides. We consult on the same technology we teach — which keeps the training honest, because it is being delivered by people currently doing the work rather than by full-time lecturers reading from a deck.</p>

        <h2>How we are set up to be trusted</h2>
        <p>We are new, with no reviews and no track record you can look up. So instead of asking for trust, we removed the need for it:</p>
        <ul>
          <li><strong>The first class is free.</strong> You see the teaching before any money changes hands.</li>
          <li><strong>Every price is published.</strong> Fees are on the course pages. You never have to ask what something costs.</li>
          <li><strong>Fees stay refundable.</strong> ${inr(site.pricing.bookingAmount)} booking returned in full, and a ${site.pricing.refundDays}-day window after that.</li>
          <li><strong>We take no vendor commission.</strong> Nobody pays us to recommend their product, so advice is not steered.</li>
          <li><strong>We do not promise jobs.</strong> Ever, for any fee.</li>
        </ul>

        <h2>What we are not</h2>
        <p>We do recruit — but only for companies that pay us to, and only ever on the employer’s side of the invoice. We are not a job portal, and we are not the kind of “placement agency” that sells hope to candidates. Training and recruitment are run as separate services: your course fee buys teaching, not a shortlist place. If someone contacts you claiming to offer a job through Jobjila in exchange for money, it is not us — <a href="/contact/">tell us</a> and we will confirm it.</p>
      </div>

      <aside class="aside">
        <div class="person">
          <div class="who">
            <h3>${esc(site.founder.name)}</h3>
            <span class="role">${esc(site.founder.role)}</span>
          </div>
          <p class="small muted">${esc(site.founder.bio)}</p>
          <div class="btns">
            <a class="btn btn-wa" href="${wa(`Hi ${site.founder.name}, I have a question about Jobjila.`)}" target="_blank" rel="noopener">${WA_ICON}<span>Message directly</span></a>
          </div>
          ${site.founder.linkedin ? `<p class="small muted"><a href="${esc(site.founder.linkedin)}" rel="noopener" target="_blank">LinkedIn profile</a></p>` : ""}
        </div>

        <div class="panel">
          <h3>Written by ${esc(site.founder.name)}</h3>
          <p class="small muted">${articles.length} guides on certification, careers and how to check a training provider.</p>
          <ul class="flist">
            ${articles.slice(0, 5).map((a) => `<li><a href="${artUrl(a)}">${esc(a.seoTitle)}</a></li>`).join("\n            ")}
          </ul>
          <p class="small muted"><a href="/blog/">All guides</a></p>
        </div>
        <div class="panel">
          <h3>Practice details</h3>
          <ul class="facts">
            <li><span class="k">Based in</span><b>${esc(site.locality)}, ${esc(site.region)}</b></li>
            <li><span class="k">Serving</span><b>India-wide, online</b></li>
            <li><span class="k">Email</span><b><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></b></li>
            <li><span class="k">Phone</span><b><a href="tel:+${esc(site.whatsapp)}">${esc(site.phoneDisplay)}</a></b></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${honestBlock()}
` + footer();
}

/* ============================ CONTACT ============================ */

function contact() {
  const t = trail("Contact", "/contact/");
  const routes = [
    ["I want to join a course", "Fees, batch dates, and which course fits you", "Hi Jobjila, I want to know about a course.\n\nName:\nCity:\nCourse:\nMy background:"],
    ["My company needs IT help", "Advisory, support, or an AMC", "Hi Jobjila, I am enquiring for my company.\n\nCompany:\nCity:\nWhat we need:\nTeam size:"],
    ["We want training for a team", "Closed batches, quoted per batch", "Hi Jobjila, we want team training.\n\nCompany:\nSubject:\nNumber of people:\nPreferred timing:"],
    ["I want to join the network", "Consultants and trainers", "Hi Jobjila, I want to join the network.\n\nName:\nCity:\nSkill or subject:\nYears of experience:"],
  ];
  return head({
    title: "Contact Jobjila — WhatsApp, Email & Enquiries",
    description: `Contact Jobjila about IT advisory, support, training or the consultant network. WhatsApp ${site.phoneDisplay} or email ${site.email}. Same working day reply.`,
    canonical: "/contact/",
    extraLd: [orgLd, breadcrumbLd(t), { "@context": "https://schema.org", "@type": "ContactPage", url: site.url + "/contact/", about: { "@id": site.url + "/#organization" } }],
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">Contact</span>
    <h1>Ask us anything before you commit</h1>
    <p>There is no contact form to fill. Pick what applies and a WhatsApp message opens already written — add your details and send. We reply the same working day.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="layout">
      <div class="grid" style="grid-template-columns:1fr">
        ${routes.map(([h, sub, msg]) => `<a class="cell" href="${wa(msg)}" target="_blank" rel="noopener" style="text-decoration:none">
          <h3>${esc(h)}</h3>
          <p>${esc(sub)}</p>
        </a>`).join("\n        ")}
      </div>
      <aside class="aside">
        <dl class="contact" style="grid-template-columns:1fr">
          <div><dt>WhatsApp</dt><dd><a href="${wa("Hi Jobjila,")}" target="_blank" rel="noopener">${esc(site.phoneDisplay)}</a></dd></div>
          <div><dt>Call</dt><dd><a href="tel:+${esc(site.whatsapp)}">${esc(site.phoneDisplay)}</a></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>
          <div><dt>Based in</dt><dd style="font-size:var(--s-0)">${esc(site.locality)}, ${esc(site.region)}</dd></div>
        </dl>
        <div class="callout">
          <h3>Not sure which course?</h3>
          <p>Send your background and what you want to be doing in a year. We will suggest a track, including telling you if a cheaper or shorter course gets you there faster.</p>
        </div>
      </aside>
    </div>
  </div>
</section>
` + footer();
}

/* =========================== LOCATIONS =========================== */

function locations() {
  const t = trail("Locations", "/locations/");
  const faqs = [
    { q: "Do you have classrooms in these cities?", a: "No. Every cohort runs live online, which is deliberate — the same trainer and curriculum wherever you live, no commute, and evening sessions that work alongside a job. These pages exist because the local job market differs by city, not because the course does." },
    { q: "Are fees different by city?", a: "No. Fees are identical everywhere in India. There is no metro surcharge and no tier-2 discount. What varies is the local hiring market, which is what each city page covers." },
    { q: "My city is not listed. Can I still join?", a: "Yes. Cohorts are online and open to anyone in India. These pages cover the areas most of our learners come from and where we can visit on site for consulting work — nothing stops you joining from anywhere else." },
  ];
  return head({
    title: "IT Training & Support Across Delhi NCR | Jobjila",
    description: `Live online IT training and on-site consulting across ${cities.map((c) => c.name).join(", ")}. Same fees everywhere, with local hiring context for each city.`,
    canonical: "/locations/",
    extraLd: [orgLd, breadcrumbLd(t), faqLd(faqs)],
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">Locations</span>
    <h1>Based in ${esc(site.locality)}, training across India</h1>
    <p>Training runs live online, so the course is identical wherever you join from. Consulting and support work is remote, with on-site visits across Delhi NCR where the work needs hands on hardware.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">${cities.length} cities &middot; ${openCourses.length} courses &middot; ${cities.length * openCourses.length} local guides</span>
      <h2>Choose your city</h2>
    </div>
    <div class="cards">
      ${cities.map((city) => `<div class="course-card" style="cursor:default">
        <span class="strip"></span>
        <span class="body">
          <h3>${esc(city.name)}</h3>
          <span class="desc">${esc(city.tier)}</span>
          <span class="chips">${city.hubs.slice(0, 3).map((h) => `<span class="chip chip-line">${esc(h)}</span>`).join("")}</span>
          <ul class="flist" style="margin-top:.75rem">
            ${openCourses.slice(0, 5).map((c) => `<li><a href="/training/${c.slug}/${city.slug}/">${esc(c.short)} training in ${esc(city.name)}</a></li>`).join("\n            ")}
          </ul>
        </span>
      </div>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    ${faqBlock(faqs, "Questions about locations").replace('style="margin-top:3rem"', "")}
  </div>
</section>
` + footer();
}

/* ============================= LEGAL ============================= */

function legalPage({ slug, title, description, heading, blurb, body }) {
  const t = trail(heading, `/${slug}/`);
  return head({
    title: `${title} | Jobjila`,
    description,
    canonical: `/${slug}/`,
    extraLd: [orgLd, breadcrumbLd(t)],
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">Legal</span>
    <h1>${esc(heading)}</h1>
    <p>${esc(blurb)}</p>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="prose">
      ${body}
      <p class="small muted" style="margin-top:2rem">Last updated ${new Date().toISOString().slice(0, 10)}. Questions about this page: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p>
    </div>
  </div>
</section>
` + footer();
}

const refundPolicy = () => legalPage({
  slug: "refund-policy",
  title: "Refund Policy",
  description: `First class free, ${inr(site.pricing.bookingAmount)} booking fully refundable, and a ${site.pricing.refundDays}-day refund window after you pay. Full refund if we cancel a batch.`,
  heading: "Refund Policy",
  blurb: "What you can get back, when, and how long it takes. Written plainly, because a refund policy nobody can understand is not a refund policy.",
  body: `
    <h2>1. The first class is free</h2>
    <p>The first live session of any course is free to attend. No payment, no card details and no registration form are required. If you do not continue after it, you have paid nothing.</p>

    <h2>2. Booking amount — fully refundable</h2>
    <p>To hold a seat you pay ${inr(site.pricing.bookingAmount)}, which is held against your course fee. If you decide not to continue, the full ${inr(site.pricing.bookingAmount)} is returned. You do not have to give a reason.</p>

    <h2>3. Balance fee</h2>
    <p>The balance is payable before your ${ordinal(site.pricing.payBeforeSession)} session. By that point you will have attended two full sessions and met your trainer.</p>

    <h2>4. ${site.pricing.refundDays}-day refund window</h2>
    <p>After paying the balance you may still request a full refund if <strong>both</strong> apply:</p>
    <ul>
      <li>you have attended ${site.pricing.refundMaxSessions} sessions or fewer, and</li>
      <li>it is within ${site.pricing.refundDays} days of your batch start date.</li>
    </ul>
    <p>Refunds are processed within ${site.pricing.refundDays} working days to the original payment method. Request one by WhatsApp or by emailing ${site.email}.</p>

    <h2>5. After that</h2>
    <p>Beyond ${site.pricing.refundMaxSessions} attended sessions or ${site.pricing.refundDays} days from the batch start, fees are non-refundable, because the trainer's time and your cohort seat have been committed.</p>

    <h2>6. If we cancel or postpone</h2>
    <p>If Jobjila cancels or postpones a batch, you receive a <strong>100% refund regardless of how much time has passed</strong>, or a free transfer to the next batch. The choice is yours, not ours.</p>

    <h2>7. What is not included in a refund</h2>
    <p>Certification exam fees are paid by you directly to the certifying body (AWS, Microsoft, Oracle, PeopleCert and others). We never hold that money, so we cannot refund it. Their own refund rules apply.</p>

    <h2>8. Consulting engagements</h2>
    <p>Advisory and support work is governed by the written scope and payment terms agreed before the engagement begins, not by this policy. Milestones not yet delivered are not payable.</p>
  `,
});

const terms = () => legalPage({
  slug: "terms",
  title: "Terms of Service",
  description: "Jobjila terms of service covering training enrolment, consulting engagements, payments, conduct and the limits of what we promise.",
  heading: "Terms of Service",
  blurb: "The terms you agree to when you enrol on a course or engage us for consulting work.",
  body: `
    <h2>1. Who we are</h2>
    <p>${site.legalName}, based in ${site.locality}, ${site.region}, India. Contact: ${site.email}, ${site.phoneDisplay}.</p>

    <h2>2. What we provide</h2>
    <p>IT advisory, IT support services, live online training, and recruitment services for employers. We are not a job portal. Our recruitment work is engaged and paid for by the hiring company; we never charge a candidate.</p>

    <h2>3. No employment or income guarantee</h2>
    <p><strong>We do not guarantee employment, placement, freelance work or any level of income.</strong> We provide training, assessment, resume review and interview preparation. Enrolling on a course does not entitle you to a job, an interview, or consideration for any role we are recruiting for — training and recruitment are separate services. Salary or earning figures shown anywhere on this site are market observations, not commitments to you.</p>

    <h2>4. We never charge candidates for jobs</h2>
    <p>We do not charge any fee for a job, an interview, a placement, a security deposit or equipment. If anyone asks you for such a payment in our name, it is not us — please report it to ${site.email}.</p>

    <h2>5. Enrolment and payment</h2>
    <p>Course fees are as published on each course page. The first session is free; a ${inr(site.pricing.bookingAmount)} refundable booking holds your seat; the balance is due before your ${ordinal(site.pricing.payBeforeSession)} session. Refunds are governed by our <a href="/refund-policy/">Refund Policy</a>.</p>

    <h2>6. Certification exams</h2>
    <p>Where a course prepares you for an external certification, the exam is booked and paid by you directly with the certifying body. Exam fees are never included in our course fee, and passing is not guaranteed.</p>

    <h2>7. Course materials</h2>
    <p>Recordings, slides and exercises are licensed to you for your own learning. Please do not redistribute or resell them.</p>

    <h2>8. Conduct</h2>
    <p>Cohorts are small and shared. We may remove a learner without refund for conduct that disrupts a session or harasses another participant. This has never been necessary and we do not expect it to be.</p>

    <h2>9. Changes to a batch</h2>
    <p>We may reschedule a session with notice. If we cancel a batch entirely, our <a href="/refund-policy/">Refund Policy</a> applies.</p>

    <h2>10. Consulting engagements</h2>
    <p>Advisory and support work is governed by the written scope, deliverables and payment terms agreed before work begins. Those terms take precedence over this page where they differ.</p>

    <h2>11. Liability</h2>
    <p>Our liability for any engagement is limited to the fees paid for that engagement. We give advice in good faith based on the information available to us; decisions taken on that advice remain yours.</p>

    <h2>12. Governing law</h2>
    <p>These terms are governed by the laws of India, with jurisdiction in Uttar Pradesh.</p>
  `,
});

const privacy = () => legalPage({
  slug: "privacy",
  title: "Privacy Policy",
  description: "What personal data Jobjila collects, why, how long we keep it and how to have it deleted. We do not sell data and run no advertising trackers.",
  heading: "Privacy Policy",
  blurb: "What we collect, why, and how to have it removed. We do not sell your data and we do not run advertising trackers on this site.",
  body: `
    <h2>1. What we collect</h2>
    <p>Only what you send us. If you message us on WhatsApp, call, or email, we hold that conversation and whatever you chose to include in it — typically your name, city, and what you are interested in. This website has no contact form and no account system.</p>

    <h2>2. Why we hold it</h2>
    <p>To answer your enquiry, to run your enrolment if you join a course, and to meet accounting obligations on any payment you make.</p>

    <h2>3. Website measurement</h2>
    ${GA_ID ? `<p>We use Google Analytics to count visits and see which pages get read. It records the page you viewed, roughly where in the world you are, whether you are on a phone or a computer, and whether you arrived from a search or a link. It also records when someone taps a WhatsApp or share button, so we know which pages are useful.</p>
    <p>We do not use it to build advertising profiles &mdash; advertising personalisation is switched off on our account. We cannot see who you are from it, and we never combine it with the messages you send us. Google sets cookies to do this; blocking cookies for this site, or using your browser's Do Not Track or an ad blocker, stops it and costs you nothing on this site.</p>` : `<p>We run no analytics, no advertising pixels and no cross-site tracking on this website. We do not know who visits it.</p>`}

    <h2>4. What we do not do</h2>
    <ul>
      <li>We do not sell or rent your data to anyone.</li>
      <li>We do not run advertising or cross-site tracking pixels on this site.</li>
      <li>We do not send marketing messages to people who have not asked for them.</li>
    </ul>

    <h2>5. Third parties</h2>
    <p>Messages you send reach us through WhatsApp, which is operated by Meta under its own privacy policy. This site loads fonts from Google Fonts, which means Google's servers see the request.${GA_ID ? " Page views are measured with Google Analytics, as described above." : ""} It is hosted on GitHub Pages, which keeps standard server logs. We use no other third-party services on this site.</p>

    <h2>6. How long we keep it</h2>
    <p>Enquiries that do not become enrolments are deleted within 12 months. Records relating to a payment are kept as long as Indian accounting and tax rules require.</p>

    <h2>7. Your rights</h2>
    <p>Email ${site.email} and ask to see what we hold about you, to correct it, or to have it deleted. We will action it within 30 days, other than records we are legally required to retain.</p>

    <h2>8. Children</h2>
    <p>Our services are intended for people aged 18 and over. We do not knowingly collect data about children.</p>
  `,
});

function notFound() {
  return head({
    title: "Page not found — Jobjila",
    description: "That page does not exist. Links to training courses, IT advisory, IT support and guides.",
    canonical: "/404.html",
  }).replace(
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
    '<meta name="robots" content="noindex, follow">',
  ) + `
<section class="page-hero">
  <div class="wrap">
    <span class="eyebrow">404</span>
    <h1>That page is not here</h1>
    <p>It may have moved when we reorganised the site in 2026, or the address may be mistyped. Everything below still works.</p>
    <div class="btns">
      <a class="btn btn-ondark btn-lg" href="/training/">Browse courses</a>
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, I hit a broken link on your site looking for:")}" target="_blank" rel="noopener">${WA_ICON}<span>Tell us what you wanted</span></a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head"><h2>Where you probably meant to go</h2></div>
    <div class="grid g3">
      <div class="cell"><h3>Training</h3><ul>
        ${openCourses.map((c) => `<li><a href="/training/${c.slug}/">${esc(c.name)}</a></li>`).join("\n        ")}
      </ul></div>
      <div class="cell"><h3>Services</h3><ul>
        <li><a href="/it-advisory/">IT Advisory</a></li>
        <li><a href="/it-support/">IT Support</a></li>
        <li><a href="/network/">Consultant network</a></li>
        <li><a href="/locations/">Locations</a></li>
      </ul></div>
      <div class="cell"><h3>Guides</h3><ul>
        ${articles.slice(0, 5).map((a) => `<li><a href="${artUrl(a)}">${esc(a.seoTitle)}</a></li>`).join("\n        ")}
        <li><a href="/blog/">All guides</a></li>
      </ul></div>
    </div>
  </div>
</section>
` + footer();
}

function ordinal(n) {
  return n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");
}

/* ---------- writer ---------- */

/* =========================== RECRUITMENT =========================== */

function recruitment() {
  const t = trail("Hiring", "/recruitment/");
  const pct = site.recruitment.permanentPct;
  const days = site.recruitment.replacementDays;
  const faqs = [
    { q: "Who pays you?", a: "The employer, always. We are engaged and paid by the company that is hiring. We have never charged a candidate a fee for anything, and we never will — not for a job, an interview, a placement or a CV review." },
    { q: "What do you charge?", a: `${pct}% of the hire's first-year CTC for a permanent placement — roughly one month's salary. It is invoiced only after the person joins. Contract and freelance engagements are quoted per role, with our margin disclosed in writing before you agree to anything.` },
    { q: "What if the person leaves quickly?", a: `If a permanent hire leaves or is let go within ${days} days of joining, we find you a replacement at no further fee. If we cannot, we refund what you paid us. This is a replacement guarantee, not a placement guarantee — we do not promise that any given role will be filled.` },
    { q: "Do you only put forward your own students?", a: "No. We recruit from the open market, and most candidates we submit have no connection to our training. When we do put forward someone we trained, we say so in the first line of the submission, because we have an obvious interest in placing them." },
    { q: "How many people are on your bench?", a: "For contract and freelance work we draw on our consultant network, which is small and reviewed rather than large and unvetted. We will tell you honestly how many people we have for your specific skill before you brief us, rather than after." },
    { q: "Have you done this before?", a: "We are new to recruitment. We have been advising and training in these technologies for years, but our placement track record is short and we are not going to pretend otherwise. Weigh that when you decide how much of your hiring to give us." },
  ];
  return head({
    title: "Hire IT Talent — Recruitment for Employers | Jobjila",
    description: "Employer-paid IT recruitment in Noida: permanent, contract and freelance hiring for cloud, infrastructure and presales roles. Candidates never pay.",
    canonical: "/recruitment/",
    extraLd: [orgLd, breadcrumbLd(t), faqLd(faqs), serviceLd("IT Recruitment", "Permanent, contract, freelance and project-based hiring for IT, cloud, infrastructure, sales and presales roles.", "/recruitment/")],
    track: "consult",
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">Hiring</span>
    <h1>Hire IT people who have actually been assessed</h1>
    <p>Permanent, contract and freelance hiring for cloud, infrastructure, sales and presales roles. Our rate is published below, the employer pays it, and the candidate never pays us anything.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, we are hiring. The role is:\n\nRole:\nLocation:\nPermanent or contract:\nBudget range:")}" target="_blank" rel="noopener">${WA_ICON}<span>Send us a role</span></a>
      <a class="btn btn-line btn-lg" href="/for-candidates/">Looking for a job instead?</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="callout">
      <h3>The employer pays. The candidate never does.</h3>
      <p>This is the line between recruitment and the fee-harvesting that has given hiring agencies in India such a poor name. We are on the employer's side of the invoice, and we say so on every page of this site. If anyone asks a candidate for money in our name — a registration fee, a security deposit, a laptop charge — it is not us, and we would like to know about it.</p>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Recruitment &amp; Talent</span>
      <h2>What we recruit for</h2>
      <p class="muted">Ten services, all in the technologies we advise on and teach. Outside those we will tell you we are not the right agency, rather than take the brief anyway.</p>
    </div>

    <span class="eyebrow">How you hire</span>
    <div class="grid g2" style="margin-top:1rem">
      <div class="cell"><h3>Permanent Recruitment</h3><p>Full-time hires onto your payroll. Invoiced only after the person joins, at the published rate, with a ${days}-day replacement guarantee behind it.</p></div>
      <div class="cell"><h3>Contract Hiring</h3><p>Fixed-term people for a defined window — maternity or notice-period cover, a migration, a support ramp. Quoted per role with our margin stated in writing.</p></div>
      <div class="cell"><h3>Freelance &amp; Project-Based Hiring</h3><p>Independent specialists for a scoped piece of work with a defined end, drawn from our reviewed <a href="/network/">consultant network</a> rather than an open database.</p></div>
      <div class="cell"><h3>Startup &amp; SME Recruitment Support</h3><p>A single role is a normal engagement here and there is no minimum. If you have no HR function, we will also tell you what the role should pay before you commit to hiring.</p></div>
    </div>

    <span class="eyebrow" style="display:block;margin-top:2.5rem">What we hire for</span>
    <div class="grid g2" style="margin-top:1rem">
      <div class="cell"><h3>IT &amp; Technology Recruitment</h3><p>Engineers, administrators and support staff across the infrastructure and service-management stack — the roles we have spent years advising on and teaching.</p></div>
      <div class="cell"><h3>Cloud &amp; Infrastructure Recruitment</h3><p>AWS, Azure and OCI engineers and architects, plus networks, servers and backup. We teach these subjects, so we can screen on substance rather than keywords.</p></div>
      <div class="cell"><h3>Sales &amp; Presales Recruitment</h3><p>Solution consultants, presales engineers and cloud sales. We run a presales course, which means we know what competence in the role actually looks like.</p></div>
      <div class="cell"><h3>Specialist / Niche Hiring</h3><p>The genuinely hard ones — OCI, ITSM tooling, cloud cost engineering. Fewer people exist, so we tell you the realistic size of the pool before you brief us, not after.</p></div>
    </div>

    <span class="eyebrow" style="display:block;margin-top:2.5rem">How the work gets done</span>
    <div class="grid g2" style="margin-top:1rem">
      <div class="cell"><h3>Talent Sourcing</h3><p>Open market first, our own network second, and we tell you which of the two a candidate came from every single time. No charge if you hire nobody.</p></div>
      <div class="cell"><h3>Candidate Screening</h3><p>A technical conversation with someone who does the work, not a keyword match. You get our written read on each person, including what we are unsure about.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">How we work</span>
      <h2>Sourcing and screening, then a short shortlist</h2>
    </div>
    <div class="grid g4">
      <div class="cell"><h3>1. The brief</h3><p>What the role actually needs, what it pays, and what you will compromise on. Free, and often the most useful hour.</p></div>
      <div class="cell"><h3>2. Sourcing</h3><p>Open market first, our network second. We tell you where a candidate came from every time.</p></div>
      <div class="cell"><h3>3. Screening</h3><p>A technical conversation with someone who does the work, not a keyword match. You get our written read, including the doubts.</p></div>
      <div class="cell"><h3>4. Shortlist</h3><p>Three or four people we would stand behind, not forty CVs. If we only have one, we send one.</p></div>
    </div>
    <div class="callout" style="margin-top:2rem">
      <h3>When we put forward someone we trained, we tell you</h3>
      <p>We run training courses, and some of the people we place have taken them. That gives us an obvious interest in placing them — so we declare it in the first line of the submission, every time. Weigh our opinion accordingly and interview them as hard as you would anyone else. What we will not do is quietly present a former student as though we found them on the open market.</p>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">What it costs</span>
      <h2>The rate is published, like every other price on this site</h2>
      <p class="muted">Nobody in Indian recruitment publishes their rate. We publish every course fee, so it would be strange to start hiding things here.</p>
    </div>
    <div class="grid g2">
      <div class="cell"><h3>${pct}% of first-year CTC</h3><p>For a permanent placement — about one month's salary. Invoiced after the person joins, never before. No retainer, no exclusivity, no charge for a role we fail to fill.</p></div>
      <div class="cell"><h3>${days}-day replacement</h3><p>If a permanent hire leaves or is let go within ${days} days, we replace them at no further fee. If we cannot replace them, we refund what you paid.</p></div>
      <div class="cell"><h3>Contract and freelance</h3><p>Quoted per role, with our margin on the rate stated in writing before you agree. You always know what the person is being paid and what we are taking.</p></div>
      <div class="cell"><h3>What we do not charge for</h3><p>Briefing calls, sourcing, screening, rejected shortlists, and anything at all charged to a candidate.</p></div>
    </div>
  </div>
</section>

<section class="honest">
  <div class="wrap">
    <span class="eyebrow">Before you brief us</span>
    <h2>We are new at this</h2>
    <p>We have advised on and taught these technologies for years. We have been recruiting for a much shorter time, and we do not have a long list of placements or client logos to show you — so we are not going to invent one.</p>
    <div class="list">
      <div><span class="mark">01</span><div><b>We do not promise to fill your role.</b><p>Some roles cannot be filled at the budget or in the location. We would rather tell you that in week one than bill you for six weeks of searching.</p></div></div>
      <div><span class="mark">02</span><div><b>We do not send volume.</b><p>A shortlist of forty is not a shortlist. If we have three people worth your time, you get three.</p></div></div>
      <div><span class="mark">03</span><div><b>We do not post jobs that do not exist.</b><p>Fake listings to collect CVs are standard practice in this industry. Every role we advertise is a real, currently open brief from a real client.</p></div></div>
      <div><span class="mark">04</span><div><b>We do not take a role we cannot serve.</b><p>Outside cloud, infrastructure, ITSM and presales, we will say so and point you elsewhere.</p></div></div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    ${faqBlock(faqs, "Hiring questions").replace('style="margin-top:3rem"', "")}
    <div style="margin-top:3rem">
      ${band({ title: "Tell us about the role", body: "Send the role, the location, the budget range and whether it is permanent or contract. We will tell you honestly whether we can fill it.", label: "Send us a role", message: "Hi Jobjila, we are hiring. The role is:\n\nRole:\nLocation:\nPermanent or contract:\nBudget range:" })}
    </div>
  </div>
</section>
` + footer();
}

/* =========================== FOR CANDIDATES =========================== */

function forCandidates() {
  const t = trail("For Candidates", "/for-candidates/");
  const faqs = [
    { q: "Do I have to pay you anything?", a: "No. Not a registration fee, not a security deposit, not a laptop charge, not a CV rewriting fee, not a percentage of your salary. Nothing, ever, at any stage. Employers pay us. If anyone asks you for money in our name, it is not us." },
    { q: "Does taking a Jobjila course get me a job?", a: "No, and we will not imply otherwise. A course fee buys teaching. It does not buy a job, an interview, or a place on any shortlist. Training and recruitment are run as separate services here, and paying for one gives you no claim on the other." },
    { q: "So is there any advantage to having trained with you?", a: "Only this: if you trained with us, we have seen you work for several weeks, so we can describe you to an employer with more confidence than we could from a CV. That may help if a brief happens to fit you. It is not a queue, a guarantee, or something you can buy." },
    { q: "What do you do with my CV?", a: "We read it, and we keep it. We do not send it to any employer without asking you first, for that specific role, by name. We do not sell it, publish it, or add it to a database anyone else can buy access to." },
    { q: "How do I get it removed?", a: `Message or email us and say so. We delete it and confirm within three working days. You do not have to give a reason. See our <a href="/privacy/">Privacy Policy</a> for the detail.` },
    { q: "Will you help me even if there is no matching role?", a: "We will be honest rather than encouraging. If we have nothing that fits, we will say so instead of keeping you on a list and going quiet. If your CV is the problem, we will tell you what specifically is wrong with it — at no charge." },
  ];
  return head({
    title: "For Candidates — We Never Charge You a Fee | Jobjila",
    description: "How Jobjila works with candidates: employers pay us, you never do. What happens to your CV, and why a training course does not buy a job or an interview.",
    canonical: "/for-candidates/",
    extraLd: [orgLd, breadcrumbLd(t), faqLd(faqs)],
    track: "consult",
  }) + `
<section class="page-hero">
  <div class="wrap">
    ${crumb(t)}
    <span class="eyebrow">For candidates</span>
    <h1>You will never pay us a rupee</h1>
    <p>Not for a job, an interview, a placement, a CV review or a "registration". Employers pay us to fill their roles. That is the whole business model, and this page exists so you can hold us to it.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, I am looking for a role.\n\nName:\nCurrent role:\nSkills:\nNotice period:\nLocation:")}" target="_blank" rel="noopener">${WA_ICON}<span>Send us your CV</span></a>
      <a class="btn btn-line btn-lg" href="/recruitment/">Hiring instead?</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="callout">
      <h3>A training course does not buy you a job</h3>
      <p>We run courses and we recruit, and we keep the two completely separate. Your course fee buys teaching and nothing else — not a job, not an interview, not a place on a shortlist, not priority over anyone else. If we ever put a former student forward for a role, it is because an employer's brief fits them, and we tell that employer we trained them. Any training provider that sells you a course on the promise of a job at the end is selling you something other than education.</p>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">What happens to your CV</span>
      <h2>Four things we commit to</h2>
    </div>
    <div class="grid g2">
      <div class="cell"><h3>We ask before we send it</h3><p>Your CV does not go to any employer without your say-so for that specific role, named. No blanket permission, no "we will keep you posted".</p></div>
      <div class="cell"><h3>We do not sell or publish it</h3><p>It is not added to any database anyone can buy, and it is not posted anywhere. It sits with us and nowhere else.</p></div>
      <div class="cell"><h3>We tell you where it went</h3><p>You will always know which company has seen your profile, because we asked you first and told you the outcome.</p></div>
      <div class="cell"><h3>We delete it when you ask</h3><p>Message us and it is gone within three working days, with confirmation. No reason required, no retention argument.</p></div>
    </div>
  </div>
</section>

<section class="honest">
  <div class="wrap">
    <span class="eyebrow">Read this before you pay anyone, anywhere</span>
    <h2>How to tell it is not us</h2>
    <p>Recruitment fraud in India usually looks the same. If any of the following happens in Jobjila's name, it is not us — <a href="/contact/">tell us</a> and we will confirm it in writing.</p>
    <div class="list">
      <div><span class="mark">01</span><div><b>Anyone asks you for money.</b><p>Registration, processing, security deposit, training bundle, laptop, background check. All of it. We charge candidates nothing at any stage.</p></div></div>
      <div><span class="mark">02</span><div><b>Someone guarantees you a job.</b><p>Nobody can. We do not, and any agency or institute that does is selling a promise it has no ability to keep.</p></div></div>
      <div><span class="mark">03</span><div><b>An offer arrives without an interview.</b><p>Real employers interview. An offer letter that turns up after a WhatsApp chat and asks for a deposit is a fraud, whoever it claims to be from.</p></div></div>
      <div><span class="mark">04</span><div><b>The contact details do not match this site.</b><p>Our number and email are on the <a href="/contact/">contact page</a>. If a message comes from anywhere else, check with us before replying.</p></div></div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    ${faqBlock(faqs, "Candidate questions").replace('style="margin-top:3rem"', "")}
    <div style="margin-top:3rem">
      ${band({ title: "Send us your CV", body: "Tell us what you do, what you want next and your notice period. If we have nothing that fits, we will say so rather than go quiet.", label: "Message us", message: "Hi Jobjila, I am looking for a role.\n\nName:\nCurrent role:\nSkills:\nNotice period:\nLocation:" })}
    </div>
  </div>
</section>
` + footer();
}

/* ============================== RESUME SUBMIT PAGE ============================== */

function submitResume() {
  return head({
    title: "Share Your Resume — Jobjila",
    description: "Submit your resume and details for IT recruitment opportunities at Jobjila. Completely free.",
    canonical: "/submit-resume/",
    extraLd: [],
  }) + `
<div class="page-hero">
  <div class="wrap">
    <span class="eyebrow">Opportunities</span>
    <h1>Share your resume</h1>
    <p>Tell us about yourself, upload your resume, and we'll keep you in mind for matching IT roles. Completely free — no fees, no payment.</p>
  </div>
</div>

<section>
  <div class="wrap">
    <div style="max-width: 52rem; margin: 0 auto;">
      <div class="callout">
        <h3>How it works</h3>
        <p>You submit your details and resume. We review them and reach out when there's a match. No pressure, no follow-ups unless there's an opportunity.</p>
      </div>

      <div id="formWrapper" style="margin-top: 2rem;">
        <iframe id="googleForm" src="https://docs.google.com/forms/d/e/1FAIpQLSc40eS3C9MPcJUMwW202LO6xjYr3_CGse_ySfCDqBtAnTOskQ/viewform?embedded=true" width="100%" height="1200" frameborder="0" marginheight="0" marginwidth="0" style="border: none;">Loading…</iframe>
      </div>

      <script>
        (function() {
          var iframe = document.getElementById('googleForm');
          var lastHeight = iframe.offsetHeight;
          var poll = setInterval(function() {
            try {
              var currentHeight = iframe.offsetHeight;
              if (Math.abs(currentHeight - lastHeight) > 100) {
                clearInterval(poll);
                var wrapper = document.getElementById('formWrapper');
                wrapper.innerHTML = '<div style="padding: 3rem; text-align: center;"><h3 style="color: var(--signal); margin-bottom: 1rem;">Thank you!</h3><p class="muted">Your resume has been submitted successfully. Redirecting you home…</p></div>';
                setTimeout(function() { window.location.href = '/'; }, 1200);
              }
              lastHeight = currentHeight;
            } catch (e) {}
          }, 500);
        })();
      </script>

      <p class="small muted" style="margin-top: 2rem;">We'll review your submission and reach out if there's a match. Your details are kept confidential.</p>
    </div>
  </div>
</section>

<section class="sunk">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Before you apply</span>
      <h2>What we look for</h2>
      <p class="muted">We specialize in IT roles across cloud platforms, infrastructure, service management, and presales.</p>
    </div>
    <div class="grid g2">
      <div class="cell">
        <h3>Technical skills</h3>
        <p>Experience with AWS, Azure, OCI, Linux, Windows, ITSM, or presales consulting. Any hands-on IT background helps.</p>
      </div>
      <div class="cell">
        <h3>No fees for candidates</h3>
        <p>We never charge candidates. If an employer hires you through us, they pay us — not you.</p>
      </div>
      <div class="cell">
        <h3>We're selective</h3>
        <p>We only put forward candidates we think are genuinely fit. That's why our replacement guarantee works.</p>
      </div>
      <div class="cell">
        <h3>Role types</h3>
        <p>Permanent roles, contract hiring, freelance projects. Full-time, part-time, and project-based work.</p>
      </div>
    </div>
  </div>
</section>

${band({
  title: "Questions?",
  body: "If you have questions about the recruitment process or the roles we have, reach out on WhatsApp.",
  label: "WhatsApp",
  message: "Hi Jobjila, I want to know more about your recruitment process."
})}
` + footer();
}

module.exports = function buildPages() {
  write("index.html", home());
  write(path.join("it-advisory", "index.html"), itAdvisory());
  write(path.join("it-support", "index.html"), itSupport());
  write(path.join("recruitment", "index.html"), recruitment());
  write(path.join("for-candidates", "index.html"), forCandidates());
  write(path.join("network", "index.html"), network());
  write(path.join("about", "index.html"), about());
  write(path.join("contact", "index.html"), contact());
  write(path.join("locations", "index.html"), locations());
  write(path.join("submit-resume", "index.html"), submitResume());
  write(path.join("refund-policy", "index.html"), refundPolicy());
  write(path.join("terms", "index.html"), terms());
  write(path.join("privacy", "index.html"), privacy());
  write("404.html", notFound());
  return 13;
};
