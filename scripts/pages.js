/**
 * Standalone (non-course) pages for Jobjila.
 * Each returns a full HTML document built from the shared chrome in lib.js.
 */

const path = require("path");
const {
  site,
  courses,
  cities,
  esc,
  wa,
  WA_ICON,
  write,
  head,
  footer,
  breadcrumbNav,
  courseCard,
  faqSection,
  ctaBand,
  shareRow,
  orgLd,
  websiteLd,
  breadcrumbLd,
  faqLd,
} = require("./lib");

const crumb = (name, url) => [
  { name: "Home", url: "/" },
  { name, url },
];

/* ============================ HOME ============================ */

function home() {
  const open = courses.filter((c) => c.status === "open");
  const trending = open.filter((c) => c.trending).slice(0, 6);

  const faqs = [
    {
      q: "What exactly is Jobjila?",
      a: "Jobjila is a skill-to-income platform. You learn a trending IT or professional skill from a practising trainer, prove that you can actually do it through a verified capstone project, and then use that verified profile to get a job, win freelance clients, or start your own service business.",
    },
    {
      q: "How is this different from a normal online course platform?",
      a: "Most platforms end at the certificate. Jobjila is built around what happens next — your verified Skill Passport feeds directly into freelance project matching and into our hiring partners. Training, freelancing and placement are one connected pipeline rather than three separate products.",
    },
    {
      q: "Do you only teach IT courses?",
      a: "No. IT, cloud and AI are where we started because demand is highest, but the platform is built for any skill that leads to income — marketing, design, data, business consulting and career skills, with more categories opening as trainers join.",
    },
    {
      q: "What does a course cost?",
      a: "Between ₹6,500 and ₹21,000 depending on length and cohort size. Every course page states its exact fee, duration and expected earning range up front. EMI options are available on courses above ₹10,000.",
    },
    {
      q: "Can I earn while I am still learning?",
      a: "That is the intention. Freelance-friendly courses such as digital marketing and web design put deliverable skills in your hands by around week five, and the Freelancing Bootcamp teaches you how to find and price your first client while you are still in a cohort.",
    },
    {
      q: "Who teaches on Jobjila?",
      a: "Practising professionals, not full-time lecturers — people currently working in the field they teach. Every trainer passes a recorded demo review before their first cohort, and their rating stays visible on their profile afterwards.",
    },
  ];

  return (
    head({
      title: "Jobjila — Learn a Skill, Get Verified, Start Earning | IT, AI & Career Training",
      description:
        "Jobjila is India's skill-to-income platform. Learn cloud, AI, IT infrastructure, presales, digital marketing or web design from working professionals, get your skills verified, and turn them into a job, freelance work or your own business.",
      canonical: "/",
      keywords: [
        "online training india",
        "it courses with placement",
        "freelancing platform india",
        "ai and cloud training",
        "skill development courses",
      ],
      extraLd: [
        orgLd,
        websiteLd,
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Trending courses at Jobjila",
          itemListElement: trending.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            url: `${site.url}/courses/${c.slug}/`,
          })),
        },
      ],
    }) +
    `
<section class="hero">
  <div class="container hero-grid">
    <div>
      <span class="hero-pill"><span class="dot" aria-hidden="true"></span> ${open.length} courses open for enrolment</span>
      <h1>Learn a skill.<br>Get verified.<br>Start earning.</h1>
      <p class="hero-lead">Most courses hand you a certificate and wish you luck. Jobjila takes you all the way to income &mdash; through a job, freelance clients, or a business of your own.</p>
      <div class="btn-row" style="margin-top:28px">
        <a class="btn btn--accent btn--lg" href="/courses/">Explore courses</a>
        <a class="btn btn--whatsapp btn--lg" href="${wa('Hi Jobjila, I would like to know which course suits me. My background is:')}" target="_blank" rel="noopener">${WA_ICON}<span>Ask on WhatsApp</span></a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><strong>${open.length}</strong><span>Live courses</span></div>
        <div class="hero-stat"><strong>3</strong><span>Ways to earn</span></div>
        <div class="hero-stat"><strong>100%</strong><span>Live, not pre-recorded</span></div>
        <div class="hero-stat"><strong>48 hrs</strong><span>Doubt reply promise</span></div>
      </div>
    </div>

    <div class="path-card">
      <h2>Where do you want to end up?</h2>
      <p>Pick one and we will show you the shortest route.</p>
      <a class="path-option" href="/courses/">
        <span class="ico" aria-hidden="true">&#128188;</span>
        <span><b>I want a job</b><em>Structured training plus interview prep</em></span>
      </a>
      <a class="path-option" href="/for-freelancers/">
        <span class="ico" aria-hidden="true">&#128187;</span>
        <span><b>I want to freelance</b><em>Skills, portfolio and your first client</em></span>
      </a>
      <a class="path-option" href="/courses/freelancing-bootcamp/">
        <span class="ico" aria-hidden="true">&#128640;</span>
        <span><b>I want my own business</b><em>Turn a skill into a service you sell</em></span>
      </a>
      <a class="path-option" href="/hire/">
        <span class="ico" aria-hidden="true">&#129309;</span>
        <span><b>I want to hire talent</b><em>Verified freelancers and staffing</em></span>
      </a>
    </div>
  </div>
</section>

<div class="ticker" aria-label="What Jobjila offers">
  <div class="ticker__track">
    <span>${open.length} courses open for enrolment</span>
    <span>Every cohort live online, every session recorded</span>
    <span>Trainer applications open &mdash; 60&ndash;70% revenue share</span>
    <span>Same fees in every city, no metro surcharge</span>
    <span>Doubts answered by your trainer within 48 hours</span>
    <span>${open.length} courses open for enrolment</span>
    <span>Every cohort live online, every session recorded</span>
    <span>Trainer applications open &mdash; 60&ndash;70% revenue share</span>
    <span>Same fees in every city, no metro surcharge</span>
    <span>Doubts answered by your trainer within 48 hours</span>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">Trending right now</span>
      <h2>The skills companies are hiring for this quarter</h2>
      <p>Every card shows the real fee, the real duration, and what the skill actually pays. No "contact us for pricing".</p>
    </div>
    <div class="grid grid--3">
      ${trending.map(courseCard).join("\n      ")}
    </div>
    <div class="text-center" style="margin-top:32px">
      <a class="btn btn--ghost btn--lg" href="/courses/">See all ${courses.length} courses</a>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">How it works</span>
      <h2>Three steps from where you are to getting paid</h2>
    </div>
    <div class="grid grid--3 steps">
      <div class="step">
        <h3>Learn</h3>
        <p>Live cohorts taught by people who do the work for a living. Small groups, recorded sessions, and a doubt thread where your trainer answers within 48 hours.</p>
      </div>
      <div class="step">
        <h3>Get verified</h3>
        <p>Finish a real capstone project and it is assessed, scored and recorded on your Skill Passport. Proof of work beats a printed certificate every time.</p>
      </div>
      <div class="step">
        <h3>Earn</h3>
        <p>Your verified profile feeds straight into freelance project matching and our hiring partners &mdash; or into your own client pipeline if you would rather work for yourself.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">Three earning paths</span>
      <h2>A skill is only worth what you can do with it</h2>
      <p>Job boards only serve one of these. Freelance marketplaces only serve another. We think you should be able to choose.</p>
    </div>
    <div class="grid grid--3">
      <div class="path-tile">
        <h3>Get a job</h3>
        <p class="small muted">For people who want stability, a team and a title.</p>
        <ul>
          <li>Interview-focused capstone projects</li>
          <li>Resume and LinkedIn review</li>
          <li>Mock technical interviews</li>
          <li>Introductions to hiring partners</li>
        </ul>
      </div>
      <div class="path-tile path-tile--freelance">
        <h3>Freelance</h3>
        <p class="small muted">For people who want flexibility and multiple clients.</p>
        <ul>
          <li>Portfolio built from real project work</li>
          <li>Pricing, proposals and contracts</li>
          <li>Matched to projects posted on Jobjila</li>
          <li>Work alongside a full-time job</li>
        </ul>
      </div>
      <div class="path-tile path-tile--business">
        <h3>Build your own</h3>
        <p class="small muted">For people who want to own the client relationship.</p>
        <ul>
          <li>Package a skill into a sellable service</li>
          <li>Find and keep local clients</li>
          <li>Retainers instead of one-off jobs</li>
          <li>The path nobody else supports</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="grid grid--2" style="align-items:center;gap:48px">
      <div>
        <span class="eyebrow">Skill Passport</span>
        <h2>A certificate says you attended. This says you can do it.</h2>
        <p>Anyone can buy a certificate. Your Jobjila Skill Passport records what you actually built: the capstone you shipped, how it was scored, your trainer's endorsement, and the ratings from real clients once you start working.</p>
        <p>It is one profile that follows you across all three earning paths &mdash; the same proof convinces an employer, a freelance client and a customer of your own business.</p>
        <div class="btn-row" style="margin-top:24px">
          <a class="btn btn--primary" href="/courses/">Start earning one</a>
        </div>
      </div>
      <div class="grid" style="gap:16px">
        <div class="card">
          <div class="card-icon card-icon--success" aria-hidden="true">&#10003;</div>
          <h3>Verified project work</h3>
          <p class="small">Assessed capstones, not attendance records.</p>
        </div>
        <div class="card">
          <div class="card-icon" aria-hidden="true">&#9733;</div>
          <h3>Trainer endorsement</h3>
          <p class="small">A named professional putting their reputation behind you.</p>
        </div>
        <div class="card">
          <div class="card-icon card-icon--accent" aria-hidden="true">&#128200;</div>
          <h3>Live client ratings</h3>
          <p class="small">Every project you deliver through Jobjila adds to your record.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">What we commit to</span>
      <h2>No invented testimonials on this page</h2>
      <p>Jobjila is new. Plenty of training sites fill this section with quotes from people who do not exist &mdash; we would rather tell you what we are actually promising, and publish real learner outcomes here once there are some, with names and permission.</p>
    </div>
    <div class="grid grid--3">
      <div class="card">
        <div class="card-icon" aria-hidden="true">&#9200;</div>
        <h3>Your doubts answered in 48 hours</h3>
        <p class="small">Not a forum where questions go unanswered. Your trainer replies on the course thread within two days, and the answer stays visible to the whole cohort.</p>
      </div>
      <div class="card">
        <div class="card-icon card-icon--success" aria-hidden="true">&#10003;</div>
        <h3>A capstone that is actually assessed</h3>
        <p class="small">You finish with a project that has been reviewed and scored by a practitioner &mdash; something to show an employer, not a certificate of attendance.</p>
      </div>
      <div class="card">
        <div class="card-icon card-icon--accent" aria-hidden="true">&#128172;</div>
        <h3>Honest counselling before you pay</h3>
        <p class="small">If a cheaper course, a shorter one, or no course at all would serve you better, we will say so. Message us on WhatsApp and test it.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="grid grid--2" style="gap:24px">
      <div class="card">
        <div class="card-icon" aria-hidden="true">&#127891;</div>
        <h3>Teach what you already know</h3>
        <p>Revenue share, no upfront cost, and we handle enrolment, payments and marketing. If you are already training offline or consulting, this is additional income from work you are doing anyway.</p>
        <a class="btn btn--ghost" href="/become-a-trainer/">Become a trainer</a>
      </div>
      <div class="card">
        <div class="card-icon card-icon--accent" aria-hidden="true">&#128188;</div>
        <h3>Hire verified talent</h3>
        <p>Freelancers for a project, or permanent staff through our HR services. Everyone you see has assessed project work behind their profile, not just a claimed skill list.</p>
        <a class="btn btn--ghost" href="/hire/">Hire from Jobjila</a>
      </div>
    </div>
  </div>
</section>

<div class="container section">
  ${faqSection(faqs, "Common questions")}
  ${shareRow({
    url: "/",
    text: "Jobjila — learn a skill, get verified, and turn it into a job, freelance work or your own business.",
    heading: "Know someone looking for a career change?",
  })}
</div>

<section class="section" style="padding-top:0">
  <div class="container">
    ${ctaBand({
      title: "Not sure which skill fits you?",
      body: "Tell us your background and what you want to earn. We will recommend a track honestly — including telling you when now is not the right time to spend money on a course.",
      buttonLabel: "Ask on WhatsApp",
      whatsappMessage: "Hi Jobjila, I am not sure which course fits me. My background is:",
    })}
  </div>
</section>
` +
    footer()
  );
}

/* ====================== FOR FREELANCERS ====================== */

function forFreelancers() {
  const trail = crumb("For Freelancers", "/for-freelancers/");
  const faqs = [
    {
      q: "Does it cost anything to join as a freelancer?",
      a: "Creating a profile and applying to projects is free. Jobjila takes a commission on projects delivered through the platform, so we only earn when you do. Training courses are paid separately and are entirely optional.",
    },
    {
      q: "How do I get matched to projects?",
      a: "Clients post a brief and we shortlist from freelancers whose Skill Passport shows verified work in that area. A completed capstone or a delivered project moves you up the list far more than a long list of claimed skills.",
    },
    {
      q: "How do payments work?",
      a: "Projects run on milestones with funds confirmed before work begins, released as each milestone is approved. This protects both sides — you are not chasing an invoice, and the client is not paying for work they have not seen.",
    },
    {
      q: "I have never freelanced before. Where do I start?",
      a: "Start with the Freelancing Bootcamp. It covers finding clients, pricing, proposals, contracts and getting paid — the business half that most skilled people never get taught, and the reason most freelance attempts stall.",
    },
  ];

  return (
    head({
      title: "For Freelancers — Find Verified Work & Get Paid On Time | Jobjila",
      description:
        "Join Jobjila as a freelancer: build a verified Skill Passport, get matched to real client projects, and use milestone-based payments so you always get paid. Free to join.",
      canonical: "/for-freelancers/",
      keywords: ["freelance work india", "freelancing platform", "find freelance clients", "freelance projects online"],
      extraLd: [orgLd, breadcrumbLd(trail), faqLd(faqs)],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:720px;margin-top:20px">
      <h1>Freelance work that does not start with a race to the bottom</h1>
      <p style="font-size:1.125rem">On most marketplaces you compete on price against a thousand identical profiles. Here, clients see verified project work &mdash; so you compete on proof instead.</p>
      <div class="btn-row" style="margin-top:26px">
        <a class="btn btn--whatsapp btn--lg" href="${wa('Hi Jobjila, I want to join as a freelancer. My skill is:')}" target="_blank" rel="noopener">${WA_ICON}<span>Join on WhatsApp</span></a>
        <a class="btn btn--on-dark btn--lg" href="/courses/freelancing-bootcamp/">Freelancing Bootcamp</a>
      </div>
    </div>
  </div>
</section>

<div class="container section">
  <div class="section-head section-head--center">
    <span class="eyebrow">Why freelancers stay</span>
    <h2>The three things that actually decide whether freelancing works</h2>
  </div>
  <div class="grid grid--3">
    <div class="card">
      <div class="card-icon" aria-hidden="true">&#128269;</div>
      <h3>Being found</h3>
      <p>A verified Skill Passport puts assessed project work in front of clients instead of a self-declared skill list. New freelancers get a fair shot because the proof is standardised.</p>
    </div>
    <div class="card">
      <div class="card-icon card-icon--accent" aria-hidden="true">&#128176;</div>
      <h3>Pricing properly</h3>
      <p>Underquoting is the single most common reason freelancers burn out and quit. The Freelancing Bootcamp teaches you to scope, quote and hold your number.</p>
    </div>
    <div class="card">
      <div class="card-icon card-icon--success" aria-hidden="true">&#128179;</div>
      <h3>Getting paid</h3>
      <p>Milestone-based payments with funds confirmed before work starts. No three-month follow-up emails, no disappearing clients.</p>
    </div>
  </div>
</div>

<section class="section section--alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Build the skill first</span>
      <h2>Courses with the strongest freelance demand</h2>
      <p>These three produce deliverable client work fastest, and all of them pair well with the Freelancing Bootcamp.</p>
    </div>
    <div class="grid grid--3">
      ${courses
        .filter((c) => ["digital-marketing", "web-design", "ai-prompt-engineering"].includes(c.slug))
        .map(courseCard)
        .join("\n      ")}
    </div>
  </div>
</section>

<div class="container section">
  ${faqSection(faqs, "Freelancer questions")}
</div>

<section class="section" style="padding-top:0">
  <div class="container">
    ${ctaBand({
      title: "Ready to take on your first client?",
      body: "Create a profile, complete a verification project, and start appearing in client shortlists. It costs nothing until you are earning.",
      buttonLabel: "Join on WhatsApp",
      whatsappMessage: "Hi Jobjila, I want to join as a freelancer. My skill is:",
    })}
  </div>
</section>
` +
    footer()
  );
}

/* =========================== HIRE =========================== */

function hire() {
  const trail = crumb("Hire Talent", "/hire/");
  const faqs = [
    {
      q: "What does it cost to hire a freelancer through Jobjila?",
      a: "Posting a project and receiving a shortlist is free. You agree a project value directly with the freelancer, and our commission is included in that figure — there is no separate platform fee added to your invoice.",
    },
    {
      q: "How are freelancers verified?",
      a: "Every profile carries a Skill Passport: assessed capstone projects, trainer endorsement, and ratings from previous work delivered through the platform. You are seeing evidence of completed work, not a self-reported skill list.",
    },
    {
      q: "Do you also help with permanent hiring?",
      a: "Yes. Our HR services cover permanent and contract recruitment, particularly for IT, infrastructure, marketing and support roles. Because many candidates are trained on our own platform, we can vouch for their skills first-hand.",
    },
    {
      q: "What if the work delivered is not up to standard?",
      a: "Milestone-based payment means you approve each stage before funds are released. If a milestone is not met, work continues until it is or the engagement ends without further payment. We step in directly if a dispute is not resolving.",
    },
    {
      q: "How quickly can I get a shortlist?",
      a: "For common skills — web development, digital marketing, cloud support, data reporting — expect a shortlist within two to three working days. Specialist requirements take longer, and we will tell you honestly if we cannot fill a brief.",
    },
  ];

  return (
    head({
      title: "Hire Verified Freelancers & IT Talent in India | Jobjila HR Services",
      description:
        "Hire verified freelancers for projects or permanent IT, marketing and support staff through Jobjila HR services. Every candidate carries assessed project work. Free to post a brief.",
      canonical: "/hire/",
      keywords: ["hire freelancers india", "it staffing services", "hr services india", "hire web developer", "recruitment services"],
      extraLd: [
        orgLd,
        breadcrumbLd(trail),
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Talent hiring and HR services",
          provider: { "@id": site.url + "/#organization" },
          areaServed: { "@type": "Country", name: "India" },
          serviceType: "Freelance staffing and permanent recruitment",
        },
      ],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:720px;margin-top:20px">
      <h1>Hire people whose skills have actually been checked</h1>
      <p style="font-size:1.125rem">Freelancers for a project, or permanent staff through our HR services. Either way you see assessed project work before you commit &mdash; not a CV full of claims.</p>
      <div class="btn-row" style="margin-top:26px">
        <a class="btn btn--whatsapp btn--lg" href="${wa('Hi Jobjila, I want to hire. The role or project I need filled is:')}" target="_blank" rel="noopener">${WA_ICON}<span>Send brief on WhatsApp</span></a>
        <a class="btn btn--on-dark btn--lg" href="#services">See what we cover</a>
      </div>
    </div>
  </div>
</section>

<div class="container section" id="services">
  <div class="section-head section-head--center">
    <span class="eyebrow">Two ways to hire</span>
    <h2>Project work or permanent staff</h2>
  </div>
  <div class="grid grid--2">
    <div class="card">
      <div class="card-icon" aria-hidden="true">&#128736;</div>
      <h3>Freelance projects</h3>
      <p>Website builds, digital marketing retainers, cloud migrations, data dashboards, AI automations and technical interview support.</p>
      <ul class="outcome-list" style="margin-top:16px">
        <li>Shortlist in 2&ndash;3 working days for common skills</li>
        <li>Milestone payments, approved by you at each stage</li>
        <li>No platform fee added on top of the agreed price</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-icon card-icon--accent" aria-hidden="true">&#128203;</div>
      <h3>HR &amp; permanent hiring</h3>
      <p>Contract and permanent recruitment for IT support, infrastructure, cloud, marketing, data and presales roles.</p>
      <ul class="outcome-list" style="margin-top:16px">
        <li>Candidates often trained and assessed by us directly</li>
        <li>Technical screening included before you interview</li>
        <li>Replacement guarantee within the agreed period</li>
      </ul>
    </div>
  </div>
</div>

<section class="section section--alt">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">How it works</span>
      <h2>From brief to hire in four steps</h2>
    </div>
    <div class="grid grid--4 steps">
      <div class="step"><h3>Send the brief</h3><p>Tell us the outcome you need, your budget range and your timeline.</p></div>
      <div class="step"><h3>Get a shortlist</h3><p>Three to five verified profiles with the relevant project work attached.</p></div>
      <div class="step"><h3>Talk to them</h3><p>Interview or trial the shortlist directly. No pressure to pick from the first batch.</p></div>
      <div class="step"><h3>Start safely</h3><p>Milestones for project work, or a standard offer process for permanent roles.</p></div>
    </div>
  </div>
</section>

<div class="container section">
  ${faqSection(faqs, "Client questions")}
</div>

<section class="section" style="padding-top:0">
  <div class="container">
    ${ctaBand({
      title: "Tell us what you need built or filled",
      body: "Posting a brief is free and takes about two minutes. If we cannot fill it well, we will say so rather than sending you a weak shortlist.",
      buttonLabel: "Send brief on WhatsApp",
      whatsappMessage: "Hi Jobjila, I want to hire. The role or project I need filled is:",
    })}
  </div>
</section>
` +
    footer()
  );
}

/* ====================== BECOME A TRAINER ====================== */

function becomeATrainer() {
  const trail = crumb("Become a Trainer", "/become-a-trainer/");
  const faqs = [
    {
      q: "How much do trainers earn on Jobjila?",
      a: "Trainers keep 60–70% of every enrolment in their cohort. On a ₹15,000 course with 20 learners, that is ₹1.8–2.1 lakh for one cohort. There is no upfront cost and no fee to list a course.",
    },
    {
      q: "Do I need to create the course content myself?",
      a: "You own the curriculum, because you are the practitioner. We help you structure it into modules, review it against what the market is hiring for, and handle everything else — enrolment, payments, scheduling, learner support and marketing.",
    },
    {
      q: "I already teach offline. Does that work here?",
      a: "It works particularly well. Most of our trainers already run offline batches or consult. Listing online adds a second income stream from material you have already built, without giving up your existing work.",
    },
    {
      q: "What is the approval process?",
      a: "You apply, we discuss your subject and market demand, and you record a 15-minute demo session which we review. If it is approved you get a Verified Trainer badge and we schedule your first cohort. The whole process usually takes one to two weeks.",
    },
    {
      q: "How much time does teaching a cohort take?",
      a: "Typically four to six hours a week — two live sessions plus doubt replies. Cohorts run for four to ten weeks depending on the course. You set the days and times that suit you.",
    },
    {
      q: "What happens if my cohort does not fill?",
      a: "We tell you before it starts and either extend enrolment or reschedule. You are never asked to teach an uneconomic batch, and because there is no upfront cost to you, an unfilled cohort costs you nothing but time.",
    },
  ];

  return (
    head({
      title: "Become a Trainer — Teach Online & Keep 60–70% Revenue | Jobjila",
      description:
        "Teach on Jobjila with no upfront cost. Keep 60–70% of every enrolment while we handle students, payments, scheduling and marketing. Apply to become a verified trainer.",
      canonical: "/become-a-trainer/",
      keywords: ["become an online trainer", "teach online india", "online trainer jobs", "revenue share teaching platform"],
      extraLd: [orgLd, breadcrumbLd(trail), faqLd(faqs)],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:720px;margin-top:20px">
      <h1>You already know it. Get paid to teach it.</h1>
      <p style="font-size:1.125rem">No upfront cost, no platform fee. Keep 60&ndash;70% of every enrolment while we bring the students and run everything that is not teaching.</p>
      <div class="btn-row" style="margin-top:26px">
        <a class="btn btn--whatsapp btn--lg" href="${wa('Hi Jobjila, I want to teach on your platform. My subject and experience:')}" target="_blank" rel="noopener">${WA_ICON}<span>Apply on WhatsApp</span></a>
        <a class="btn btn--on-dark btn--lg" href="#how">How the revenue share works</a>
      </div>
    </div>
  </div>
</section>

<div class="container section" id="how">
  <div class="section-head section-head--center">
    <span class="eyebrow">The deal</span>
    <h2>You bring the subject. We bring everything else.</h2>
  </div>
  <div class="grid grid--2" style="gap:24px">
    <div class="card">
      <h3>What you do</h3>
      <ul class="outcome-list" style="margin-top:14px">
        <li>Own the curriculum for your subject</li>
        <li>Run two live sessions a week</li>
        <li>Reply to cohort doubts within 48 hours</li>
        <li>Assess the capstone projects</li>
      </ul>
    </div>
    <div class="card">
      <h3>What we do</h3>
      <ul class="outcome-list" style="margin-top:14px">
        <li>Find and enrol the students</li>
        <li>Handle payments, invoicing and refunds</li>
        <li>Run the platform, scheduling and recordings</li>
        <li>Market your cohort and your trainer profile</li>
      </ul>
    </div>
  </div>

  <div class="card" style="margin-top:24px;background:var(--brand-soft);border-color:var(--indigo-200)">
    <h3>What a cohort is worth</h3>
    <p>A ₹15,000 course with 20 learners generates ₹3,00,000. At a 65% share, that is <strong>₹1,95,000 to you for one cohort</strong> of roughly six weeks at four to six hours a week. Run three cohorts a year in a subject you already know and it becomes a serious second income.</p>
    <p class="small muted" style="margin-bottom:0">Illustrative figures based on our standard revenue share. Actual earnings depend on your course fee and cohort size.</p>
  </div>
</div>

<section class="section section--alt">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">Who teaches here</span>
      <h2>We are looking for practitioners, not lecturers</h2>
    </div>
    <div class="grid grid--4">
      <div class="card"><h3 style="font-size:1rem">Working professionals</h3><p class="small">Currently doing the job you would be teaching.</p></div>
      <div class="card"><h3 style="font-size:1rem">Offline trainers</h3><p class="small">Already running batches locally and ready to add an online stream.</p></div>
      <div class="card"><h3 style="font-size:1rem">Consultants</h3><p class="small">Independent experts who want a predictable second income.</p></div>
      <div class="card"><h3 style="font-size:1rem">Creators</h3><p class="small">Already teaching on social platforms without a way to monetise it properly.</p></div>
    </div>
  </div>
</section>

<div class="container section">
  <div class="section-head section-head--center">
    <span class="eyebrow">Getting started</span>
    <h2>Four steps to your first cohort</h2>
  </div>
  <div class="grid grid--4 steps">
    <div class="step"><h3>Apply</h3><p>Tell us your subject and your experience. Two minutes.</p></div>
    <div class="step"><h3>Plan the course</h3><p>We review demand together and shape your curriculum into modules.</p></div>
    <div class="step"><h3>Record a demo</h3><p>A 15-minute session we review. Pass it and you get the Verified Trainer badge.</p></div>
    <div class="step"><h3>Teach and earn</h3><p>We fill the cohort, you teach it, and payouts follow each milestone.</p></div>
  </div>
</div>

<section class="section section--alt" id="apply">
  <div class="container" style="max-width:720px">
    <div class="section-head section-head--center">
      <span class="eyebrow">Apply</span>
      <h2>Tell us what you can teach</h2>
      <p>We read every application. If your subject does not have enough demand yet, we will tell you honestly rather than leaving you waiting.</p>
    </div>
    <div class="card contact-card">
      <h3>Send us one WhatsApp message</h3>
      <p>No forms, no sign-up. Message us with these four things and we will take it from there:</p>
      <ul class="outcome-list" style="margin:18px 0 24px">
        <li>Your name and city</li>
        <li>The subject you want to teach</li>
        <li>Years of hands-on experience in it</li>
        <li>Whether you already train, online or offline</li>
      </ul>
      <a class="btn btn--whatsapp btn--block btn--lg" href="${wa('Hi Jobjila, I want to teach on your platform.\n\nName:\nCity:\nSubject I can teach:\nYears of experience:\nDo I already train:')}" target="_blank" rel="noopener">${WA_ICON}<span>Apply on WhatsApp</span></a>
      <p class="form-note text-center" style="margin:14px 0 0">The message opens already written &mdash; just fill in your details and send.</p>
      <p class="form-note text-center" style="margin:6px 0 0">Prefer email? Write to <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>. We reply to every application within three working days.</p>
    </div>
  </div>
</section>

<div class="container section">
  ${faqSection(faqs, "Trainer questions")}
</div>
` +
    footer()
  );
}

/* =========================== BLOG =========================== */

function blog() {
  const trail = crumb("Blog", "/blog/");
  const posts = [
    {
      title: "What salary can you expect after a cloud computing course in India?",
      excerpt:
        "Honest salary bands for cloud associate and support roles, what actually moves you up a band, and the certifications that are worth paying for.",
      cat: "Careers",
      read: "8 min read",
    },
    {
      title: "Digital marketing course fees in India: what you should and should not pay",
      excerpt:
        "A breakdown of what goes into course pricing, which inclusions matter, and the warning signs of a course selling certificates rather than skills.",
      cat: "Marketing",
      read: "6 min read",
    },
    {
      title: "How to get your first freelance client when you have no portfolio",
      excerpt:
        "Four channels that work in the Indian market, the outreach message that gets replies, and how to build credible proof before anyone has paid you.",
      cat: "Freelancing",
      read: "10 min read",
    },
    {
      title: "Is presales a good career move for a developer?",
      excerpt:
        "What presales consultants actually do all day, the salary jump to expect, and the specific skills that decide whether you will enjoy the switch.",
      cat: "Careers",
      read: "7 min read",
    },
    {
      title: "AI will not take your job, but someone using it might",
      excerpt:
        "A practical look at which tasks AI genuinely automates today, and how to position yourself on the right side of that line without becoming an engineer.",
      cat: "AI",
      read: "9 min read",
    },
    {
      title: "Do you need a degree to work in IT? What hiring managers actually check",
      excerpt:
        "What replaces a degree in entry-level IT hiring, how far certifications get you, and why project evidence outperforms both.",
      cat: "Careers",
      read: "6 min read",
    },
  ];

  return (
    head({
      title: "Blog — Careers, Skills, Freelancing & Salary Guides | Jobjila",
      description:
        "Practical guides on IT careers, course fees, salaries, freelancing and skill choices in India. Written by the practitioners who teach on Jobjila.",
      canonical: "/blog/",
      keywords: ["it career guide india", "course fees guide", "freelancing tips india", "salary after course"],
      extraLd: [
        orgLd,
        breadcrumbLd(trail),
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Jobjila Blog",
          url: site.url + "/blog/",
          publisher: { "@id": site.url + "/#organization" },
        },
      ],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:720px;margin-top:20px">
      <h1>Straight answers about skills, salaries and getting paid</h1>
      <p style="font-size:1.125rem">Written by the people who teach here &mdash; practitioners describing the market as it actually is, including when the honest answer is "do not spend money on this yet".</p>
    </div>
  </div>
</section>

<div class="container section">
  <div class="section-head">
    <span class="eyebrow">Coming soon</span>
    <h2>Our first articles are being written now</h2>
    <p>These are the guides our trainers are drafting. Want to be told when they publish? <a href="/contact/">Leave us your email</a>.</p>
  </div>
  <div class="post-list">
    ${posts
      .map(
        (p) => `<article class="post-item">
      <div class="post-meta">${esc(p.cat)} &middot; ${esc(p.read)} &middot; Coming soon</div>
      <h3>${esc(p.title)}</h3>
      <p style="margin-bottom:0">${esc(p.excerpt)}</p>
    </article>`
      )
      .join("\n    ")}
  </div>
</div>

<section class="section" style="padding-top:0">
  <div class="container">
    ${ctaBand({
      title: "Are you a trainer who writes?",
      body: "Trainers who publish here get their profile in front of every reader, and it is the fastest way to fill your own cohorts. Bring us a subject you can write about with authority.",
      buttonLabel: "Apply on WhatsApp",
      whatsappMessage: "Hi Jobjila, I would like to write and teach on your platform. My subject is:",
    })}
  </div>
</section>
` +
    footer()
  );
}

/* =========================== ABOUT =========================== */

function about() {
  const trail = crumb("About", "/about/");
  return (
    head({
      title: "About Jobjila — India's Skill-to-Income Platform",
      description:
        "Jobjila connects training, verification and earning into one pipeline. Learn why we built a platform where a course ends in a job, freelance work or your own business.",
      canonical: "/about/",
      keywords: ["about jobjila", "skill development platform india", "training and placement company"],
      extraLd: [orgLd, breadcrumbLd(trail)],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:720px;margin-top:20px">
      <h1>Training should end in income, not a PDF</h1>
      <p style="font-size:1.125rem">We built Jobjila because the gap between finishing a course and earning money from it is where almost everybody gets stuck.</p>
    </div>
  </div>
</section>

<div class="container section">
  <div class="prose">
    <h2>The problem we kept seeing</h2>
    <p>India produces an enormous number of certified people and a much smaller number of employed ones. The reason is rarely ability. It is that the three things a person needs &mdash; a skill, credible proof of that skill, and access to someone willing to pay for it &mdash; are sold by three different industries that do not talk to each other.</p>
    <p>Course platforms hand over a certificate and stop. Job boards assume you already have proof. Freelance marketplaces assume you already know how to find and price clients. Each one is complete on its own terms and useless on its own.</p>

    <h2>What we do differently</h2>
    <p>Jobjila runs all three as one pipeline. You learn from a practitioner in a live cohort. You prove the skill through an assessed capstone that becomes part of a verified Skill Passport. That passport then feeds directly into freelance project matching and into hiring partners through our HR services.</p>
    <p>The part we care most about is the third earning path. Job boards serve employment. Marketplaces serve freelancing. Almost nobody helps a skilled person build their own client base &mdash; which, for a large number of Indian learners, is the most realistic route to a good income.</p>

    <h2>How we choose what to teach</h2>
    <p>A course goes live when two things are true: employers or clients are visibly paying for the skill, and we have found a practitioner who is genuinely good at it and willing to teach. We would rather run seven courses we can stand behind than list seventy we cannot.</p>

    <h2>What we will not do</h2>
    <ul>
      <li>Promise a job. We promise preparation, verification and honest introductions.</li>
      <li>Hide fees. Every course page states the price and duration up front.</li>
      <li>Invent outcome statistics. We publish learner results as they actually happen.</li>
      <li>Sell you a course you do not need. If now is the wrong time, we will say so.</li>
    </ul>
  </div>
</div>

<section class="section section--alt">
  <div class="container">
    ${ctaBand({
      title: "Come and build this with us",
      body: "Whether you want to learn, teach, freelance or hire — the platform only works if all four sides show up. Start wherever you fit.",
      buttonLabel: "Explore courses",
      buttonHref: "/courses/",
    })}
  </div>
</section>
` +
    footer()
  );
}

/* ========================== CONTACT ========================== */

function contact() {
  const trail = crumb("Contact", "/contact/");
  const open = courses.filter((c) => c.status === "open");
  const soon = courses.filter((c) => c.status === "soon");

  return (
    head({
      title: "Contact Jobjila — Talk to a Course Counsellor",
      description:
        "Get in touch with Jobjila about courses, freelance work, hiring or teaching. Tell us your background and we will recommend the right track honestly.",
      canonical: "/contact/",
      keywords: ["contact jobjila", "course counselling", "course enquiry"],
      extraLd: [
        orgLd,
        breadcrumbLd(trail),
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: site.url + "/contact/",
          about: { "@id": site.url + "/#organization" },
        },
      ],
    }) +
    `
<section class="course-hero">
  <div class="container">
    ${breadcrumbNav(trail)}
    <div style="max-width:720px;margin-top:20px">
      <h1>Tell us where you are and where you want to get to</h1>
      <p style="font-size:1.125rem">Course questions, freelance work, hiring or teaching &mdash; one WhatsApp message is enough. We reply the same working day.</p>
    </div>
  </div>
</section>

<div class="container section">
  <div class="course-layout">
    <div class="card contact-card">
      <h2 style="font-size:1.25rem">Message us on WhatsApp</h2>
      <p>We do not make you fill a form. Tap below and a message opens already written &mdash; add your details and send. We reply the same working day.</p>

      <div class="wa-options">
        <a class="wa-option" href="${wa('Hi Jobjila, I want to know about a course.\n\nName:\nCity:\nCourse I am interested in:\nMy background:')}" target="_blank" rel="noopener">
          <span class="wa-option__ico" aria-hidden="true">&#127891;</span>
          <span><b>I want to join a course</b><em>Fees, batch dates and which course suits you</em></span>
        </a>
        <a class="wa-option" href="${wa('Hi Jobjila, I want to join as a freelancer.\n\nName:\nCity:\nMy skill:\nExperience:')}" target="_blank" rel="noopener">
          <span class="wa-option__ico" aria-hidden="true">&#128187;</span>
          <span><b>I want freelance work</b><em>Join the talent pool and get matched to projects</em></span>
        </a>
        <a class="wa-option" href="${wa('Hi Jobjila, I want to hire.\n\nCompany:\nCity:\nRole or project:\nBudget range:\nTimeline:')}" target="_blank" rel="noopener">
          <span class="wa-option__ico" aria-hidden="true">&#129309;</span>
          <span><b>I want to hire talent</b><em>Freelancers for a project, or permanent staff</em></span>
        </a>
        <a class="wa-option" href="${wa('Hi Jobjila, I want to teach on your platform.\n\nName:\nCity:\nSubject I can teach:\nYears of experience:')}" target="_blank" rel="noopener">
          <span class="wa-option__ico" aria-hidden="true">&#128218;</span>
          <span><b>I want to teach</b><em>Revenue share, no upfront cost</em></span>
        </a>
      </div>

      <p class="form-note" style="margin:20px 0 0">Prefer email? Write to <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> and we will reply the same way.</p>
    </div>

    <aside class="course-sidebar">
      <div class="card">
        <h3 style="font-size:1rem">Where we operate</h3>
        <p class="small">Every cohort runs live online, so you can join from anywhere in India &mdash; the fee and the curriculum are the same wherever you are. We publish <a href="/locations/">local job-market guides for ${cities.length} cities</a>, covering what each skill pays and who is hiring there.</p>
      </div>
      <div class="card">
        <h3 style="font-size:1rem">Prefer to email?</h3>
        <p class="small" style="margin-bottom:0">Write to us directly at <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> and we will pick it up the same way.</p>
      </div>
      <div class="card" style="background:var(--brand-soft);border-color:var(--indigo-200)">
        <h3 style="font-size:1rem">Not sure which course?</h3>
        <p class="small" style="margin-bottom:0">Tell us your background and target income on WhatsApp. We will suggest a track &mdash; including telling you if a cheaper or shorter course would get you there faster.</p>
      </div>
      <div class="card">
        <h3 style="font-size:1rem">Want to teach?</h3>
        <p class="small">Trainers keep 60&ndash;70% of every enrolment with no upfront cost.</p>
        <a class="btn btn--ghost btn--block" href="/become-a-trainer/">Become a trainer</a>
      </div>
    </aside>
  </div>
</div>
` +
    footer()
  );
}

/* ---------- writer ---------- */

module.exports = function buildStaticPages() {
  write("index.html", home());
  write(path.join("for-freelancers", "index.html"), forFreelancers());
  write(path.join("hire", "index.html"), hire());
  write(path.join("become-a-trainer", "index.html"), becomeATrainer());
  write(path.join("blog", "index.html"), blog());
  write(path.join("about", "index.html"), about());
  write(path.join("contact", "index.html"), contact());
};
