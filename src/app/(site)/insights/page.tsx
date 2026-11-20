import { CtaBand } from "@/components/sections/cta";
import { InsightCard } from "@/components/sections/home-sections";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/section-heading";
import {
  hasPublishedInsights,
  insightCategories,
  insights,
} from "@/content/site-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights on PR & Communications",
  description:
    "Perspectives on PR strategy, media relations, startup PR, founder branding and brand reputation.",
  path: "/insights",
  // Kept out of search results until there is a published article to find.
  noindex: !hasPublishedInsights,
});

export default function InsightsPage() {
  const [lead, ...rest] = insights;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={
          <>
            Notes on PR, media and{" "}
            <em className="text-accent">reputation</em>.
          </>
        }
      >
        <p>
          Practical thinking on how brands earn attention and keep trust,
          written for founders and communications leaders.
        </p>
      </PageHeader>

      <section aria-label="Articles" className="shell pb-24 lg:pb-36">
        {!hasPublishedInsights && (
          <p
            role="note"
            className="mb-12 border-l-2 border-accent bg-accent-wash/60 px-5 py-4 text-[0.9375rem] leading-relaxed text-ink"
          >
            <strong className="font-medium">Our first articles are in progress.</strong>{" "}
            The pieces below are working drafts shown as a preview of what we
            will be publishing here. They are not yet available to read.
          </p>
        )}

        <ul aria-label="Topics" className="flex flex-wrap gap-2 border-y border-line py-5">
          {insightCategories.map((c) => (
            <li
              key={c}
              className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-ink-soft"
            >
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-x-12 gap-y-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-12">
            <div className="lg:w-2/3">
              <InsightCard insight={lead} large />
            </div>
          </Reveal>
          {rest.map((insight, i) => (
            <Reveal
              key={insight.slug}
              delay={(i % 3) * 0.06}
              className="sm:col-span-6 lg:col-span-4"
            >
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
