import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/services";
import {
  approach,
  hasPublishedInsights,
  industries,
  insights,
  principles,
  reasons,
} from "@/content/site-content";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section className="shell grid items-center gap-x-10 gap-y-16 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:pb-28 lg:pt-20">
      <div className="lg:col-span-7">
        <p className="eyebrow animate-rise">
          Public Relations &amp; Strategic Communications
        </p>
        <h1 className="display mt-7 animate-rise text-[3.25rem] [animation-delay:70ms] sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
          Make Your Brand <em className="text-accent">Impossible</em> to Ignore.
        </h1>
        <p className="display mt-8 max-w-2xl animate-rise text-2xl leading-snug text-ink [animation-delay:150ms] sm:text-[1.75rem]">
          Strategic PR and communications that turn your brand story into
          meaningful visibility.
        </p>
        <p className="mt-5 max-w-xl animate-rise text-[1.0625rem] leading-relaxed text-ink-soft [animation-delay:210ms]">
          We help ambitious businesses shape their narratives, strengthen their
          reputation, and connect with the audiences that matter.
        </p>
        <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:280ms] sm:flex-row sm:items-center">
          <ButtonLink href="/contact" size="lg">
            Discuss Your PR Strategy
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="secondary" arrow={false}>
            Explore Our Services
          </ButtonLink>
        </div>
      </div>
      <div className="lg:col-span-5">
        <HeroVisual />
      </div>
    </section>
  );
}

export function ServiceTicker() {
  return (
    <div className="border-y border-line">
      <ul className="shell flex flex-wrap items-center gap-x-8 gap-y-2 py-5">
        <li className="eyebrow !text-ink">What we do</li>
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {s.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="shell py-24 lg:py-36">
      <SectionHeading
        eyebrow="Our belief"
        id="principles-title"
        title={
          <>
            Visibility Is Earned.
            <br />
            Credibility Is Built.
          </>
        }
      >
        <p>
          Attention can be bought for a day. Trust is built story by story. Our
          work rests on three principles.
        </p>
      </SectionHeading>

      <ol className="mt-16 grid gap-x-10 lg:mt-24 lg:grid-cols-3">
        {principles.map((p, i) => (
          <li key={p.title} className="border-t border-line py-8 lg:py-10">
            <Reveal delay={i * 0.08}>
              <span className="display text-xl italic text-accent">
                {p.number}
              </span>
              <h3 className="display mt-6 text-[2rem] leading-tight">
                {p.title}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Editorial index of services: each row links to its own page. */
export function ServicesIndex({ heading = true }: { heading?: boolean }) {
  // Without its own section heading, rows sit directly under the page <h1>.
  const Title = heading ? "h3" : "h2";
  return (
    <section
      aria-labelledby={heading ? "services-title" : undefined}
      aria-label={heading ? undefined : "Services"}
      className={heading ? "bg-paper-deep py-24 lg:py-36" : ""}
    >
      <div className="shell">
        {heading && (
          <SectionHeading
            eyebrow="Services"
            id="services-title"
            title="Communications built around what your business needs next."
          >
            <p>
              Six areas of practice, combined into a plan that fits your
              objectives rather than a fixed package.
            </p>
            <div className="mt-6">
              <TextLink href="/services">View all services</TextLink>
            </div>
          </SectionHeading>
        )}

        <ul className={heading ? "mt-16 lg:mt-24" : ""}>
          {services.map((s) => (
            <li key={s.slug} className="border-t border-line-strong last:border-b">
              <Reveal>
                <article className="group relative grid gap-x-10 gap-y-5 py-9 lg:grid-cols-12 lg:py-12">
                  <span className="eyebrow lg:col-span-1 lg:pt-3">{s.number}</span>
                  <div className="lg:col-span-5">
                    <Title className="display text-[2rem] leading-[1.1] transition-colors duration-300 group-hover:text-accent sm:text-[2.5rem]">
                      <Link
                        href={`/services/${s.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {s.title}
                      </Link>
                    </Title>
                    <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                      {s.summary}
                    </p>
                  </div>
                  <ul className="grid content-start gap-y-2.5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:pt-3">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-baseline gap-3 text-[0.9375rem] text-ink"
                      >
                        <span aria-hidden className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start lg:col-span-3 lg:justify-end lg:pt-2">
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <span className="whitespace-nowrap lg:sr-only xl:not-sr-only">{s.cta}</span>
                      <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                        <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
                      </span>
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function IndustriesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind, i) => (
        <li key={ind.slug} id={ind.slug} className="border-b border-r border-line">
          <Reveal delay={(i % 3) * 0.06} className="flex h-full flex-col p-7 lg:p-9">
            <span className="eyebrow">0{i + 1}</span>
            <h3 className="display mt-10 text-[1.75rem] leading-tight lg:mt-14">
              {ind.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{ind.summary}</p>
            {detailed && (
              <ul className="mt-6 space-y-2 border-t border-line pt-5">
                {ind.needs.map((n) => (
                  <li key={n} className="flex items-baseline gap-3 text-[0.9375rem]">
                    <span aria-hidden className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-accent" />
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function WhoWeWorkWith() {
  return (
    <section aria-labelledby="industries-title" className="shell py-24 lg:py-36">
      <SectionHeading
        eyebrow="Who we work with"
        id="industries-title"
        title="For businesses with something worth saying."
      >
        <p>
          We work with companies and leaders at the point where being better
          known starts to matter commercially.
        </p>
        <div className="mt-6">
          <TextLink href="/industries">Explore industries</TextLink>
        </div>
      </SectionHeading>
      <div className="mt-16 lg:mt-24">
        <IndustriesGrid />
      </div>
    </section>
  );
}

export function Approach({ detailed = false }: { detailed?: boolean }) {
  return (
    <section aria-labelledby="approach-title" className="bg-ink py-24 text-paper lg:py-36">
      <div className="shell grid gap-x-12 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow !text-paper/55">Our approach</p>
            <h2
              id="approach-title"
              className="display mt-8 text-[2.5rem] sm:text-5xl lg:text-[3.5rem]"
            >
              Five steps, from first conversation to measured result.
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-paper/65">
              A clear process means you always know what is happening, what
              comes next and what it is meant to achieve.
            </p>
          </div>
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {approach.map((step) => (
            <li key={step.number} className="border-t border-paper/20 last:border-b">
              <Reveal className="grid grid-cols-[3.5rem_1fr] gap-x-4 py-8 sm:grid-cols-[6rem_1fr] lg:py-10">
                <span className="display text-3xl text-[#e0795c] sm:text-4xl">
                  {step.number}
                </span>
                <div>
                  <h3 className="display text-3xl sm:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-lg text-[1.0625rem] leading-relaxed text-paper/75">
                    {step.body}
                  </p>
                  {detailed && (
                    <p className="mt-3 max-w-lg leading-relaxed text-paper/55">
                      {step.detail}
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="shell py-24 lg:py-36">
      <SectionHeading
        eyebrow="Why work with us"
        id="why-title"
        title="A communications partner you can hold to account."
      >
        <p>
          We would rather be clear than impressive. Here is what you can expect
          from working with us.
        </p>
      </SectionHeading>
      <dl className="mt-16 grid gap-x-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={(i % 3) * 0.06} className="border-t border-line py-8">
            <dt className="flex items-baseline gap-4">
              <span className="eyebrow !text-accent">0{i + 1}</span>
              <span className="display text-2xl leading-tight">{r.title}</span>
            </dt>
            <dd className="mt-3 pl-9 leading-relaxed text-ink-soft">{r.body}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

export function InsightCard({
  insight,
  large = false,
}: {
  insight: (typeof insights)[number];
  large?: boolean;
}) {
  const draft = insight.status === "draft";
  return (
    <article className="flex h-full flex-col border-t border-ink pt-5">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow !text-ink">{insight.category}</span>
        {draft && (
          <span
            title="Draft — not yet published"
            className="shrink-0 rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint"
          >
            Draft<span className="sr-only">, not yet published</span>
          </span>
        )}
      </div>
      <h3
        className={`display mt-8 leading-[1.12] ${large ? "text-[2rem] sm:text-[2.75rem]" : "text-[1.75rem]"}`}
      >
        {insight.title}
      </h3>
      <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
        {insight.excerpt}
      </p>
      <p className="mt-auto pt-8 text-sm text-ink-faint">{insight.readingTime}</p>
    </article>
  );
}

export function InsightsPreview() {
  const [lead, ...rest] = insights.slice(0, 3);
  return (
    <section aria-labelledby="insights-title" className="bg-paper-deep py-24 lg:py-36">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Insights</p>
            <h2
              id="insights-title"
              className="display mt-6 text-[2.5rem] sm:text-5xl lg:text-[3.75rem]"
            >
              Notes on PR and reputation.
            </h2>
            {!hasPublishedInsights && (
              <p className="mt-4 text-[0.9375rem] text-ink-soft">
                A preview of what we are writing. These pieces are drafts and
                not yet published.
              </p>
            )}
          </div>
          <TextLink href="/insights">All insights</TextLink>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <InsightCard insight={lead} large />
          </Reveal>
          {rest.map((insight, i) => (
            <Reveal key={insight.slug} delay={0.08 * (i + 1)} className="lg:col-span-3">
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
