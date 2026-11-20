import { CtaBand } from "@/components/sections/cta";
import { Approach, WhyUs } from "@/components/sections/home-sections";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `${site.name} is a PR and strategic communications partner for startups, founders and growing businesses. How we work, and what you can expect from us.`,
  path: "/about",
});

const commitments = [
  {
    title: "What we commit to",
    points: [
      "A written strategy with deliverables agreed before work begins.",
      "One accountable point of contact for the whole engagement.",
      "Your approval on every release, pitch and article before it is used.",
      "Regular, plain-language reporting on what was done and what resulted.",
    ],
  },
  {
    title: "What we will not promise",
    points: [
      "Guaranteed coverage in a named publication. That decision belongs to editors.",
      "Paid placements presented as earned media.",
      "Vanity metrics in place of deliverables you can verify.",
      "A fixed package where a tailored plan is needed.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A communications partner for brands that intend to be{" "}
            <em className="text-accent">taken seriously</em>.
          </>
        }
      >
        <p>
          {site.name} helps ambitious businesses build visibility, credibility
          and authority through considered public relations and strategic
          communications.
        </p>
      </PageHeader>

      <section aria-labelledby="who-title" className="shell border-t border-line py-20 lg:py-28">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <h2 id="who-title" className="eyebrow !text-ink lg:col-span-3 lg:pt-3">
            Who we are
          </h2>
          <div className="space-y-7 lg:col-span-8">
            <p className="display text-[1.75rem] leading-[1.25] sm:text-[2.25rem]">
              Good companies are often less well known than they deserve to be.
              We exist to close that gap, by helping them tell a clearer story
              to the people who matter to their growth.
            </p>
            <div className="grid gap-x-10 gap-y-6 text-[1.0625rem] leading-relaxed text-ink-soft sm:grid-cols-2">
              <p>
                We work with startups, founders, MSMEs and established brands
                at the moments when reputation starts to carry commercial
                weight: a launch, a funding round, a new market, or a leader
                stepping into public view.
              </p>
              <p>
                Our role is to understand the business, shape the narrative,
                plan the campaign and see it through. PR is treated as a
                discipline with objectives and deliverables, not as a string of
                disconnected announcements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="model-title" className="bg-paper-deep py-24 lg:py-36">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            id="model-title"
            title="One accountable team. The right specialists for each campaign."
          >
            <p>
              No single channel suits every story. Our model is built to give
              each campaign the reach it needs without handing you a list of
              vendors to manage.
            </p>
          </SectionHeading>

          <div className="mt-16 grid gap-x-10 lg:mt-24 lg:grid-cols-3">
            {[
              {
                title: "We lead the strategy",
                body: "We learn your business, define the objectives and write the plan: messaging, story angles, target media and timeline.",
              },
              {
                title: "We assemble the right execution",
                body: "Where a campaign calls for specialist reach — a sector, a region, a format — we work with carefully selected PR and media partners.",
              },
              {
                title: "We stay accountable",
                body: "You deal with one team throughout. We manage quality, approvals, communication and reporting from start to finish.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="border-t border-line-strong py-8 lg:py-10">
                <span className="eyebrow !text-accent">0{i + 1}</span>
                <h3 className="display mt-6 text-[1.875rem] leading-tight">{item.title}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="commit-title" className="shell py-24 lg:py-36">
        <SectionHeading
          eyebrow="Our standards"
          id="commit-title"
          title="Clear about what PR can do, and what it cannot."
        >
          <p>
            Trust in a PR partner starts with honest expectations. These are
            ours.
          </p>
        </SectionHeading>
        <div className="mt-16 grid gap-x-12 gap-y-12 lg:mt-24 lg:grid-cols-2">
          {commitments.map((c) => (
            <Reveal key={c.title}>
              <h3 className="display border-t border-ink pt-6 text-[1.875rem]">{c.title}</h3>
              <ul className="mt-6">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-[1.0625rem] leading-relaxed text-ink-soft"
                  >
                    <span aria-hidden className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Approach detailed />
      <WhyUs />
      <CtaBand />
    </>
  );
}
