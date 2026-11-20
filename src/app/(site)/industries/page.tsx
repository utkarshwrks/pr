import { CtaBand } from "@/components/sections/cta";
import { IndustriesGrid, ServicesIndex } from "@/components/sections/home-sections";
import { PageHeader } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Work With",
  description:
    "PR for startups, technology and SaaS companies, consumer and D2C brands, MSMEs, corporate organisations, and founders and executives.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={
          <>
            Different businesses. The same need to be{" "}
            <em className="text-accent">understood</em>.
          </>
        }
      >
        <p>
          The principles of good PR hold across sectors. The stories, audiences
          and media do not. We shape each plan around the business in front of
          us.
        </p>
      </PageHeader>

      <section aria-label="Industries" className="shell pb-24 lg:pb-36">
        <IndustriesGrid detailed />
        <p className="mt-10 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Do not see your sector here? These are the kinds of businesses we are
          set up to serve, not a boundary. If you have a story to tell, we are
          glad to talk.
        </p>
      </section>

      <ServicesIndex />
      <CtaBand />
    </>
  );
}
