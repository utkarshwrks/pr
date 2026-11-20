import { CtaBand } from "@/components/sections/cta";
import { Approach, ServicesIndex } from "@/components/sections/home-sections";
import { PageHeader } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PR & Communications Services",
  description:
    "Public relations services for startups and growing businesses: media relations, press release distribution, founder PR, corporate communications, reputation management and product launch PR.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Public relations, planned as carefully as the rest of your{" "}
            <em className="text-accent">business</em>.
          </>
        }
      >
        <p>
          Six areas of practice that work on their own or together. We start
          with what you need to achieve and recommend only what serves it.
        </p>
      </PageHeader>

      <div className="pb-24 lg:pb-36">
        <ServicesIndex heading={false} />
      </div>

      <Approach />
      <CtaBand
        title="Not sure which service you need?"
        description="Most engagements combine two or three. Tell us what you want to achieve and we will recommend where to start."
        cta="Discuss Your PR Strategy"
        query="?service=not-sure"
      />
    </>
  );
}
