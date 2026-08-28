/** Standalone (non-training) pages. */

const path = require("path");
const {
  site, openCourses, cities, trackOf,
  esc, inr, wa, WA_ICON, write,
  head, footer, crumb, courseCard, faqBlock, band, shareRow, ladder, honestBlock,
  orgLd, websiteLd, breadcrumbLd, faqLd, serviceLd,
} = require("./lib");

const trail = (name, url) => [{ name: "Home", url: "/" }, { name, url }];

/* ============================== HOME ============================== */

function home() {
  const featured = openCourses.filter((c) => c.featured);
  const faqs = [
    { q: "What does Jobjila actually do?", a: "Three things. We advise companies on their IT — cloud architecture, migrations, cost and technology choices. We support IT infrastructure and keep it running. And we train people in the same technology, live online. The consulting keeps the training current, and the training feeds our consultant network." },
    { q: "Is the first class really free?", a: "Yes. Any course, first live session, no payment and no card details. You message us on WhatsApp and we send the joining link. We are new and have no reviews yet, so asking you to pay on trust would be unreasonable." },
    { q: "How much do the courses cost?", a: `Between ${inr(Math.min(...openCourses.map((c) => c.priceINR)))} and ${inr(Math.max(...openCourses.map((c) => c.priceINR)))} depending on length. Every fee is published on its course page. You pay the balance only before your third session, and it stays refundable for ${site.pricing.refundDays} days after that.` },
    { q: "Are the classes live or recorded?", a: "Live online, in the evening, taught by a practising consultant — with every session recorded so you can revisit it or catch up if you miss one." },
    { q: "Do you guarantee a job after training?", a: "No, and we will not pretend otherwise. We provide the training, an assessed project, resume review and interview practice. Anyone promising a guaranteed job in exchange for a fee is doing something else." },
    { q: "Can companies book training for a team?", a: "Yes. Closed batches are run for company teams on any of our subjects, scheduled around your working hours and quoted per batch rather than per seat. Message us with the team size and subject." },
  ];

  return head({
    title: "Jobjila — IT Advisory, Support & Training",
    description: site.description,
    canonical: "/",
    keywords: ["it consulting noida", "aws azure training", "itil itsm training", "it support services india", "cloud advisory"],
    extraLd: [orgLd, websiteLd, faqLd(faqs)],
  }) + `
<div class="hero">
  <div class="wrap">
    <span class="eyebrow">${esc(site.locality)}, ${esc(site.region)} &middot; serving clients across India</span>
    <h1 style="margin-top:.875rem">IT advisory, support and training — <em>without the guesswork.</em></h1>
    <p class="lede">We help companies plan and run their IT, and we train the people who do that work. Every price is published on this site. Your first training class is free, and you pay only after you have seen us teach.</p>
    <div class="btns">
      <a class="btn btn-wa btn-lg" href="${wa("Hi Jobjila, I want to book a free first class.")}" target="_blank" rel="noopener">${WA_ICON}<span>Book a free first class</span></a>
      <a class="btn btn-line btn-lg" href="/training/">Browse courses</a>
    </div>

    <div class="hero-stats">
      <div><b>${openCourses.length}</b><span>Courses</span></div>
      <div><b>&#8377;0</b><span>First class</span></div>
      <div><b>${site.pricing.refundDays} days</b><span>Refund window</span></div>
      <div><b>100%</b><span>Live, recorded</span></div>
    </div>

    <div class="pillars">
      <div><a href="/it-advisory/"><h3>IT Advisory</h3><p>Cloud architecture, migration planning, cost review and technology selection.</p></a></div>
      <div><a href="/it-support/"><h3>IT Support</h3><p>Infrastructure setup, networks, servers, backup and ongoing maintenance.</p></a></div>
      <div><a href="/training/"><h3>Training</h3><p>Live online cohorts in cloud, ITSM and infrastructure. Closed batches for teams.</p></a></div>
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
      ${featured.map(courseCard).join("\n      ")}
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
    title: "IT Advisory — Cloud Architecture, Migration & Cost Review | Jobjila",
    description: "Independent IT advisory from Noida: cloud architecture review, migration planning, cloud cost reduction, technology selection and presales support. Fixed-fee or day rate, no vendor commissions.",
    canonical: "/it-advisory/",
    keywords: ["it consulting services india", "cloud advisory noida", "aws azure architecture review", "cloud cost optimisation", "it consultant for small business"],
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
    title: "IT Support Services — Networks, Servers, Backup & AMC | Jobjila",
    description: "IT support and infrastructure services from Noida: network and server setup, Windows and Linux administration, backup and recovery, security hardening and annual maintenance contracts.",
    canonical: "/it-support/",
    keywords: ["it support services noida", "amc for it infrastructure", "server network setup company", "it support for small business india"],
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
    description: "Apply to join Jobjila's reviewed network of independent IT consultants and trainers. Free to join, non-exclusive, milestone-based payment. Cloud, infrastructure, ITSM, data and presales.",
    canonical: "/network/",
    keywords: ["freelance it consultant india", "become an online it trainer", "independent cloud consultant work", "freelance itsm consultant"],
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
    title: "About Jobjila — Who Runs This",
    description: `Jobjila is an IT advisory, support and training practice based in ${site.locality}, founded by ${site.founder.name}. Published prices, refundable fees, and no employment guarantees.`,
    canonical: "/about/",
    keywords: ["about jobjila", "it consulting company noida", "jobjila founder"],
    extraLd: [orgLd, breadcrumbLd(t)],
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
        <p>We are not a placement agency, a recruitment consultancy or a job portal. We do not collect candidate fees, and we have no relationship with anyone who does. If someone contacts you claiming to offer a job through Jobjila in exchange for money, it is not us — <a href="/contact/">tell us</a> and we will confirm it.</p>
      </div>

      <aside class="aside">
        <div class="person">
          <div class="who">
            <h3>${esc(site.founder.name)}</h3>
            <span class="role">${esc(site.founder.role)}</span>
          </div>
          <p class="small muted">${esc(site.founder.bio)}</p>
          <div class="btns">
            <a class="btn btn-wa" href="${wa("Hi Shrijan, I have a question about Jobjila.")}" target="_blank" rel="noopener">${WA_ICON}<span>Message directly</span></a>
          </div>
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
    title: "Contact Jobjila",
    description: `Contact Jobjila about IT advisory, support, training or joining our consultant network. WhatsApp ${site.phoneDisplay} or email ${site.email}. We reply the same working day.`,
    canonical: "/contact/",
    keywords: ["contact jobjila", "it consultant contact noida"],
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
    description: `Jobjila serves ${cities.map((c) => c.name).join(", ")} with live online IT training and on-site consulting across Delhi NCR. Same fees everywhere, with local job market context for each city.`,
    canonical: "/locations/",
    keywords: ["it training noida", "it training delhi ncr", "it course greater noida", "it support company ncr"],
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
  description: `Jobjila refund policy: first class free, ${inr(site.pricing.bookingAmount)} booking fully refundable, and a ${site.pricing.refundDays}-day refund window after paying. Full refund if we cancel a batch.`,
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
    <p>IT advisory, IT support services, and live online training. We are not a recruitment agency, placement service or job portal.</p>

    <h2>3. No employment or income guarantee</h2>
    <p><strong>We do not guarantee employment, placement, freelance work or any level of income.</strong> We provide training, assessment, resume review and interview preparation. Salary or earning figures shown anywhere on this site are market observations, not commitments to you.</p>

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
  description: "Jobjila privacy policy: what personal data we collect, why, how long we keep it and how to have it deleted. We do not sell data and do not run advertising trackers.",
  heading: "Privacy Policy",
  blurb: "What we collect, why, and how to have it removed. We do not sell your data and we do not run advertising trackers on this site.",
  body: `
    <h2>1. What we collect</h2>
    <p>Only what you send us. If you message us on WhatsApp, call, or email, we hold that conversation and whatever you chose to include in it — typically your name, city, and what you are interested in. This website has no contact form and no account system.</p>

    <h2>2. Why we hold it</h2>
    <p>To answer your enquiry, to run your enrolment if you join a course, and to meet accounting obligations on any payment you make.</p>

    <h2>3. What we do not do</h2>
    <ul>
      <li>We do not sell or rent your data to anyone.</li>
      <li>We do not run advertising or cross-site tracking pixels on this site.</li>
      <li>We do not send marketing messages to people who have not asked for them.</li>
    </ul>

    <h2>4. Third parties</h2>
    <p>Messages you send reach us through WhatsApp, which is operated by Meta under its own privacy policy. This site loads fonts from Google Fonts, which means Google's servers see the request. It is hosted on GitHub Pages, which keeps standard server logs. We use no other third-party services on this site.</p>

    <h2>5. How long we keep it</h2>
    <p>Enquiries that do not become enrolments are deleted within 12 months. Records relating to a payment are kept as long as Indian accounting and tax rules require.</p>

    <h2>6. Your rights</h2>
    <p>Email ${site.email} and ask to see what we hold about you, to correct it, or to have it deleted. We will action it within 30 days, other than records we are legally required to retain.</p>

    <h2>7. Children</h2>
    <p>Our services are intended for people aged 18 and over. We do not knowingly collect data about children.</p>
  `,
});

function ordinal(n) {
  return n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");
}

/* ---------- writer ---------- */

module.exports = function buildPages() {
  write("index.html", home());
  write(path.join("it-advisory", "index.html"), itAdvisory());
  write(path.join("it-support", "index.html"), itSupport());
  write(path.join("network", "index.html"), network());
  write(path.join("about", "index.html"), about());
  write(path.join("contact", "index.html"), contact());
  write(path.join("locations", "index.html"), locations());
  write(path.join("refund-policy", "index.html"), refundPolicy());
  write(path.join("terms", "index.html"), terms());
  write(path.join("privacy", "index.html"), privacy());
  return 10;
};
