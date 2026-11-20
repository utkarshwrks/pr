export const principles = [
  {
    number: "I",
    title: "Strategic Storytelling",
    body: "Every business has facts. Few have a story. We find the narrative that makes your work matter to people outside the company, and build every piece of communication on it.",
  },
  {
    number: "II",
    title: "Meaningful Media Visibility",
    body: "Being mentioned is not the same as being noticed. We pursue visibility in the places your customers, investors and peers actually pay attention to.",
  },
  {
    number: "III",
    title: "Long-Term Brand Reputation",
    body: "Reputation compounds. We plan beyond the next announcement, so each story adds to a consistent, credible picture of who you are.",
  },
] as const;

export const industries = [
  {
    slug: "startups",
    title: "Startups",
    summary:
      "From first announcement to funding news, PR that helps early-stage companies earn credibility with customers, talent and investors.",
    needs: [
      "Launch and funding announcements",
      "Founder positioning",
      "Building a media presence from zero",
    ],
  },
  {
    slug: "technology-saas",
    title: "Technology & SaaS",
    summary:
      "Clear communication for complex products: turning features and roadmaps into stories business and trade media can use.",
    needs: [
      "Product and feature launches",
      "Category and thought leadership",
      "Trade and business media outreach",
    ],
  },
  {
    slug: "consumer-d2c",
    title: "Consumer & D2C Brands",
    summary:
      "Brand storytelling that gives consumer businesses a reason to be talked about beyond their own advertising.",
    needs: [
      "Brand and product launches",
      "Founder and brand stories",
      "Seasonal and campaign moments",
    ],
  },
  {
    slug: "msmes",
    title: "MSMEs",
    summary:
      "Practical, right-sized PR for small and medium businesses ready to be recognised beyond their existing network.",
    needs: [
      "Regional and trade visibility",
      "Milestone announcements",
      "Flexible, campaign-based engagement",
    ],
  },
  {
    slug: "corporate",
    title: "Corporate Organizations",
    summary:
      "Structured communications support for established organisations with many audiences and little room for mixed messages.",
    needs: [
      "Corporate announcements",
      "Stakeholder communication",
      "Reputation and issues preparedness",
    ],
  },
  {
    slug: "founders-executives",
    title: "Founders & Executives",
    summary:
      "Profile-building for leaders whose expertise and point of view deserve an audience of their own.",
    needs: [
      "Personal positioning",
      "Thought leadership and commentary",
      "Interviews and speaking opportunities",
    ],
  },
] as const;

export const approach = [
  {
    number: "01",
    title: "Discover",
    body: "Understand the business, objectives, audience, and communication requirements.",
    detail:
      "We begin with a structured conversation about where the business is, where it is going and who needs to hear about it. We review your existing coverage, materials and competitors' presence.",
  },
  {
    number: "02",
    title: "Strategize",
    body: "Develop a customized PR strategy and campaign roadmap.",
    detail:
      "You receive a written plan: objectives, audiences, core messages, story angles, target media and a timeline — with deliverables you can hold us to.",
  },
  {
    number: "03",
    title: "Create",
    body: "Develop compelling stories, press releases, and communication assets.",
    detail:
      "We write the press releases, pitches, articles and briefing notes the campaign needs. Everything is reviewed and approved by you before it is used.",
  },
  {
    number: "04",
    title: "Execute",
    body: "Coordinate suitable media outreach and campaign execution.",
    detail:
      "We run the campaign, coordinating outreach directly and through specialist media partners where they add reach, while remaining your single point of contact.",
  },
  {
    number: "05",
    title: "Measure",
    body: "Track agreed deliverables, media coverage, campaign progress, and outcomes.",
    detail:
      "Regular reports show what was done, what resulted and what we recommend next, measured against the deliverables agreed at the start.",
  },
] as const;

export const reasons = [
  {
    title: "Tailored PR strategies",
    body: "No fixed packages applied to every client. Each plan is built around your objectives, your sector and the stage your business is at.",
  },
  {
    title: "Transparent communication",
    body: "You know what we are doing, why, and what has come of it. We are equally clear about what PR can and cannot promise.",
  },
  {
    title: "Flexible campaign execution",
    body: "We assemble the right mix of in-house work and specialist media partners for each campaign, rather than forcing every brief through one channel.",
  },
  {
    title: "Dedicated client coordination",
    body: "One consistent point of contact manages your account, your approvals and every party involved in delivery.",
  },
  {
    title: "Measurable deliverables",
    body: "Deliverables are agreed in writing before work begins and reported against as the campaign progresses.",
  },
  {
    title: "Business-focused approach",
    body: "We treat PR as a means to a business outcome — credibility with customers, investors, partners or talent — not as an end in itself.",
  },
] as const;

export const insightCategories = [
  "PR Strategy",
  "Media Relations",
  "Startup PR",
  "Founder Branding",
  "Brand Reputation",
  "Communications Trends",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  readingTime: string;
  /**
   * "draft" entries are placeholders: they are labelled as drafts, are not
   * linked, and keep the Insights page out of search indexes until at least
   * one article is published.
   */
  status: "draft" | "published";
};

/** PLACEHOLDER articles. Replace with real, published pieces. */
export const insights: Insight[] = [
  {
    slug: "what-makes-a-story-newsworthy",
    title: "What actually makes a company story newsworthy",
    excerpt:
      "Most announcements matter a great deal inside the company and very little outside it. A practical test for telling the difference before you pitch.",
    category: "PR Strategy",
    readingTime: "6 min read",
    status: "draft",
  },
  {
    slug: "first-ninety-days-startup-pr",
    title: "The first ninety days of PR for an early-stage startup",
    excerpt:
      "What to put in place before you ask for coverage: positioning, proof points, a founder narrative, and a realistic view of what comes first.",
    category: "Startup PR",
    readingTime: "8 min read",
    status: "draft",
  },
  {
    slug: "pitching-journalists-with-respect",
    title: "Pitching journalists: relevance, brevity and timing",
    excerpt:
      "Why most pitches go unanswered, and the small disciplines that make an editor more likely to read yours to the end.",
    category: "Media Relations",
    readingTime: "5 min read",
    status: "draft",
  },
  {
    slug: "founder-point-of-view",
    title: "A founder's point of view is a business asset",
    excerpt:
      "How to identify the handful of themes a founder should be known for, and how to build a public profile around them without it feeling like self-promotion.",
    category: "Founder Branding",
    readingTime: "7 min read",
    status: "draft",
  },
  {
    slug: "prepare-before-the-crisis",
    title: "Reputation is prepared for, not reacted to",
    excerpt:
      "The groundwork that makes a difficult week manageable: scenarios, spokespeople, holding statements and a clear line of approval.",
    category: "Brand Reputation",
    readingTime: "6 min read",
    status: "draft",
  },
  {
    slug: "press-release-still-matters",
    title: "Does the press release still matter?",
    excerpt:
      "What a release is good for today, what it was never good for, and how to decide whether your news needs one at all.",
    category: "Communications Trends",
    readingTime: "5 min read",
    status: "draft",
  },
];

export const hasPublishedInsights = insights.some(
  (i) => i.status === "published",
);
