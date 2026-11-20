export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Short label used in navigation and form options. */
  shortTitle: string;
  /** One-sentence summary for cards and meta descriptions. */
  summary: string;
  /** Opening paragraph on the service page. */
  intro: string;
  deliverables: string[];
  cta: string;
  seo: { title: string; description: string };
  /** "What this covers" blocks on the detail page. */
  scope: { title: string; body: string }[];
  /** Situations where this service is usually the right call. */
  fit: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "media-relations",
    number: "01",
    title: "Media Relations",
    shortTitle: "Media Relations",
    summary:
      "Considered outreach that puts the right story in front of the right journalists and editors, at the right moment.",
    intro:
      "Coverage starts with a story worth telling and a reason to tell it now. We shape your news into angles editors can use, identify the publications your audience actually reads, and manage outreach from the first pitch to the final follow-up.",
    deliverables: [
      "Media outreach",
      "Journalist engagement",
      "Interview opportunities",
      "Editorial opportunities",
    ],
    cta: "Plan your media outreach",
    seo: {
      title: "Media Relations Services",
      description:
        "Media relations for startups and growing businesses: story angles, targeted media outreach, journalist engagement, and interview and editorial opportunities.",
    },
    scope: [
      {
        title: "Story and angle development",
        body: "We find what is genuinely newsworthy in your business — data, a point of view, a milestone, a founder story — and frame it the way an editor would.",
      },
      {
        title: "Targeted media outreach",
        body: "Each campaign gets its own target list, built around the publications, beats and formats that match the story and the audience you want to reach.",
      },
      {
        title: "Interview and editorial opportunities",
        body: "We pursue interviews, expert comment, contributed articles and features, and prepare your spokespeople so every conversation lands well.",
      },
      {
        title: "Coordination and follow-through",
        body: "One point of contact handles pitching, follow-ups, journalist requests and scheduling, and keeps you updated on where each conversation stands.",
      },
    ],
    fit: [
      "You have news, data or a point of view, and need it to reach the right publications.",
      "Your brand is known to customers but rarely appears in the conversations that shape your category.",
      "You want sustained media presence rather than a single announcement.",
    ],
    faqs: [
      {
        q: "Can you guarantee coverage in a specific publication?",
        a: "No, and we would be cautious of anyone who does. Editorial coverage is decided by journalists and editors. What we commit to is the work: a clear strategy, well-built stories, targeted outreach and transparent reporting on every agreed deliverable.",
      },
      {
        q: "How do you decide which media to approach?",
        a: "We start with your audience and objectives, then build a target list for each story — national business media, trade publications, regional press, podcasts or newsletters — and agree it with you before outreach begins.",
      },
      {
        q: "Who carries out the outreach?",
        a: "We lead the strategy, messaging and client relationship. Where a campaign benefits from specialist reach — a particular sector, region or format — we bring in vetted media partners and manage their work, so you have one accountable team throughout.",
      },
    ],
  },
  {
    slug: "press-release",
    number: "02",
    title: "Press Release & Distribution",
    shortTitle: "Press Release & Distribution",
    summary:
      "Announcements written to newsroom standards and distributed through channels suited to the story.",
    intro:
      "A press release is only useful if it is clear, credible and reaches people who can act on it. We write releases the way journalists prefer to receive them, and coordinate distribution to match the scale and audience of each announcement.",
    deliverables: [
      "Press release writing",
      "Distribution coordination",
      "Product announcements",
      "Company milestones",
    ],
    cta: "Announce your news",
    seo: {
      title: "Press Release Writing & Distribution",
      description:
        "Press release writing and distribution coordination for product announcements, funding news and company milestones — written to newsroom standards.",
    },
    scope: [
      {
        title: "Newsroom-standard writing",
        body: "A strong headline, the essential facts up front, usable quotes and a clean boilerplate — structured so a journalist can lift what they need in seconds.",
      },
      {
        title: "Distribution planning",
        body: "We recommend the right route for each announcement — direct outreach, wire distribution, or both — and explain what each option realistically delivers.",
      },
      {
        title: "Distribution coordination",
        body: "We manage timing, embargoes, approvals and the distribution partners involved, then confirm what was sent, where, and when.",
      },
      {
        title: "Announcement support",
        body: "Supporting assets where they help: a media note, founder quotes, FAQs, and a short version for your website and social channels.",
      },
    ],
    fit: [
      "You are announcing a product, funding round, partnership, senior hire or company milestone.",
      "You need a release that reads like news, not like marketing copy.",
      "You want clarity on where your announcement was distributed and what came of it.",
    ],
    faqs: [
      {
        q: "Is a press release the same as media coverage?",
        a: "No. A release is a tool for sharing news; whether and how a publication covers it is an editorial decision. We are clear about the difference between distribution, syndication and earned coverage before any campaign begins.",
      },
      {
        q: "Can you work from our existing draft?",
        a: "Yes. We can edit and sharpen an existing draft, or write from a briefing call and your source material. Either way you approve the final release before anything is sent.",
      },
      {
        q: "How far in advance should we get in touch?",
        a: "Ideally two to three weeks before the announcement date, which allows time for drafting, approvals and embargoed outreach. Shorter timelines are often possible — tell us your date and we will be straightforward about what is achievable.",
      },
    ],
  },
  {
    slug: "founder-pr",
    number: "03",
    title: "Founder & Executive PR",
    shortTitle: "Founder & Executive PR",
    summary:
      "Positioning for founders and leaders whose expertise deserves a wider, more relevant audience.",
    intro:
      "People trust people before they trust companies. We help founders and executives define what they stand for, turn their experience into a credible point of view, and build a visible profile in the places their peers, customers and investors pay attention to.",
    deliverables: [
      "Founder positioning",
      "Thought leadership",
      "Executive profiling",
      "Personal brand visibility",
    ],
    cta: "Build your leadership profile",
    seo: {
      title: "Founder PR & Executive Personal Branding",
      description:
        "Founder and executive PR: positioning, thought leadership, executive profiling and personal brand visibility for leaders of startups and growing companies.",
    },
    scope: [
      {
        title: "Founder positioning",
        body: "We define the two or three themes you should be known for, grounded in your real experience and aligned with where the business is going.",
      },
      {
        title: "Thought leadership",
        body: "Contributed articles, expert commentary and long-form pieces developed with you — in your voice, with a perspective that is actually yours.",
      },
      {
        title: "Executive profiling",
        body: "We pursue profile interviews, podcast conversations and speaking opportunities that suit your expertise, and help you prepare for each one.",
      },
      {
        title: "Personal brand visibility",
        body: "A consistent presence across earned media and your own channels, including LinkedIn, so your profile builds on itself over time.",
      },
    ],
    fit: [
      "Your company's credibility is closely tied to its founder or leadership team.",
      "You are raising capital, hiring senior talent or entering a new market.",
      "You have real expertise but no time to turn it into articles, commentary and conversations.",
    ],
    faqs: [
      {
        q: "Will the content sound like me?",
        a: "It should, or it is not worth publishing. We work from conversations with you, draft in your voice and refine until it reads as your own thinking. Nothing goes out without your approval.",
      },
      {
        q: "How much of my time does this need?",
        a: "Typically a focused onboarding session, then a short recurring conversation to capture your views on what is happening in your sector, plus time to review drafts and take interviews.",
      },
      {
        q: "Is this separate from PR for the company?",
        a: "It can run on its own or alongside company PR. The two work best together: the founder's profile opens doors for the business, and company news gives the founder timely reasons to speak.",
      },
    ],
  },
  {
    slug: "corporate-communications",
    number: "04",
    title: "Corporate Communications",
    shortTitle: "Corporate Communications",
    summary:
      "Clear, consistent messaging for the audiences your business depends on, inside and outside the company.",
    intro:
      "As a business grows, more people need to understand it: customers, employees, partners, investors, regulators. We build the narrative and the working materials that keep what you say consistent across all of them.",
    deliverables: [
      "Corporate announcements",
      "Brand narratives",
      "Stakeholder communication",
    ],
    cta: "Sharpen your corporate narrative",
    seo: {
      title: "Corporate Communications & Corporate PR Services",
      description:
        "Corporate PR and communications: brand narratives, corporate announcements and stakeholder communication for growing and established organisations.",
    },
    scope: [
      {
        title: "Brand narrative and messaging",
        body: "A clear account of who you are, what you do and why it matters, with a messaging framework your whole team can use.",
      },
      {
        title: "Corporate announcements",
        body: "Planning and writing for funding, partnerships, leadership changes, expansions and results — sequenced for each audience.",
      },
      {
        title: "Stakeholder communication",
        body: "Communication tailored for employees, partners, investors and customers, so each group hears the news properly and in the right order.",
      },
    ],
    fit: [
      "Different parts of the business describe the company in different ways.",
      "You are heading into a period of change: growth, funding, restructuring or a new market.",
      "You need a reliable communications function without building a full in-house team.",
    ],
    faqs: [
      {
        q: "Do you work alongside in-house marketing or communications teams?",
        a: "Yes. We are set up to work as an extension of an existing team, taking on the narrative, writing and announcement planning while your team keeps ownership of the channels.",
      },
      {
        q: "What does a messaging framework include?",
        a: "Usually a core narrative, positioning statement, key messages by audience, proof points, a boilerplate and guidance on tone — a practical document, not a brand book that sits on a shelf.",
      },
    ],
  },
  {
    slug: "reputation-management",
    number: "05",
    title: "Reputation Management",
    shortTitle: "Reputation Management",
    summary:
      "A steady, prepared approach to how your brand is perceived, and a calm one when it is tested.",
    intro:
      "Reputation is built slowly and questioned quickly. We help you understand how your brand is currently seen, strengthen it deliberately, and prepare for the moments when a clear, timely response matters most.",
    deliverables: [
      "Brand monitoring",
      "Reputation strategy",
      "Crisis communication support",
    ],
    cta: "Protect your reputation",
    seo: {
      title: "Reputation Management & Crisis Communication",
      description:
        "Reputation management for brands and leaders: brand monitoring, reputation strategy and crisis communication support.",
    },
    scope: [
      {
        title: "Brand monitoring",
        body: "Ongoing tracking of how your brand and leadership are discussed in media and online, with regular summaries of what matters and what does not.",
      },
      {
        title: "Reputation strategy",
        body: "A plan to close the gap between how you are seen and how you want to be seen, through sustained, credible communication.",
      },
      {
        title: "Crisis communication support",
        body: "Scenario planning, holding statements and response protocols prepared in advance, and hands-on communication support if an issue arises.",
      },
    ],
    fit: [
      "You want to know what people find when they look your company up.",
      "Your sector is sensitive, regulated or closely watched.",
      "You are facing an issue now and need a measured communication response.",
    ],
    faqs: [
      {
        q: "Can you remove negative articles or reviews?",
        a: "No. We do not offer removal or suppression of legitimate coverage, and we would advise against anyone who promises it. Our work focuses on accurate, constructive communication and on building a body of credible coverage over time.",
      },
      {
        q: "We have an urgent situation. How quickly can you help?",
        a: "Tell us it is urgent when you get in touch and share what you can. We will respond as quickly as we are able and be clear about what support we can provide.",
      },
    ],
  },
  {
    slug: "product-launch-pr",
    number: "06",
    title: "Product Launch PR",
    shortTitle: "Product Launch PR",
    summary:
      "Launch communications planned backwards from the day that matters, so your product arrives with a story.",
    intro:
      "A launch is one of the few moments when the market is ready to listen. We build the plan around it: the narrative, the announcement, the media outreach and the weeks that follow, so attention turns into momentum.",
    deliverables: [
      "Launch strategy",
      "Announcement campaigns",
      "Media outreach",
    ],
    cta: "Plan your launch",
    seo: {
      title: "Product Launch PR Services",
      description:
        "Product launch PR for startups and brands: launch strategy, announcement campaigns and media outreach planned around your launch date.",
    },
    scope: [
      {
        title: "Launch strategy",
        body: "Positioning, key messages, audiences and a phased timeline covering pre-launch, launch day and the follow-through.",
      },
      {
        title: "Announcement campaign",
        body: "The press release, media kit, founder quotes and supporting material, prepared and approved well before launch day.",
      },
      {
        title: "Media outreach",
        body: "Embargoed briefings and targeted outreach to relevant publications and reviewers, coordinated around your launch timing.",
      },
    ],
    fit: [
      "You are launching a new product, feature, brand or market entry.",
      "You have a fixed date and need communications ready ahead of it.",
      "A previous launch passed without the attention it deserved.",
    ],
    faqs: [
      {
        q: "When should launch PR planning start?",
        a: "Four to six weeks before launch is comfortable. It leaves room for positioning, materials and embargoed outreach. If your date is closer, we can scope a focused plan around the time available.",
      },
      {
        q: "What happens after launch day?",
        a: "We plan follow-on stories — early traction, customer use cases, founder commentary — so coverage does not stop with the announcement, and report against the deliverables agreed at the start.",
      },
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
