import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta";
import {
  Approach,
  Hero,
  InsightsPreview,
  Principles,
  ServiceTicker,
  ServicesIndex,
  WhoWeWorkWith,
  WhyUs,
} from "@/components/sections/home-sections";
import { absoluteUrl, site } from "@/config/site";

const canonical = absoluteUrl("/");

export const metadata: Metadata = {
  title: { absolute: `${site.wordmark} — Strategic Communications Agency` },
  description:
    "A PR agency for startups, founders and growing businesses in India. Media relations, press release distribution, founder PR and corporate communications built around your goals.",
  alternates: canonical ? { canonical } : undefined,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceTicker />
      <Principles />
      <ServicesIndex />
      <WhoWeWorkWith />
      <Approach />
      <WhyUs />
      <InsightsPreview />
      <CtaBand />
    </>
  );
}
