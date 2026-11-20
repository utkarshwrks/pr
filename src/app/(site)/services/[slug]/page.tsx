import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { BookingLink, CtaBand } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { absoluteUrl, site } from "@/config/site";
import { getService, services, serviceSlugs } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

/**
 * Every valid slug is prerendered below and unknown slugs are rejected in
 * src/proxy.ts, so this route never needs a streaming fallback shell.
 */
export const instant = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const contactHref = `/contact?service=${service.slug}`;

  return (
    <>
      <header className="shell pb-16 pt-10 sm:pt-14 lg:pb-24">
        <Link
          href="/services"
          className="group inline-flex animate-rise items-center gap-2 text-sm text-ink-soft hover:text-ink"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            strokeWidth={1.5}
          />
          All services
        </Link>
        <div className="mt-12 grid gap-x-12 gap-y-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow animate-rise">Service {service.number}</p>
            <h1 className="display mt-6 animate-rise text-[2.75rem] [animation-delay:60ms] sm:text-6xl lg:text-[5.25rem]">
              {service.title}
            </h1>
            <p className="mt-8 max-w-2xl animate-rise text-lg leading-relaxed text-ink-soft [animation-delay:140ms] lg:text-xl">
              {service.intro}
            </p>
            <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:200ms] sm:flex-row">
              <ButtonLink href={contactHref} size="lg">
                {service.cta}
              </ButtonLink>
              <BookingLink />
            </div>
          </div>
          <aside
            aria-label="What is included"
            className="animate-rise self-end [animation-delay:240ms] lg:col-span-3 lg:col-start-10"
          >
            <h2 className="eyebrow border-t border-ink pt-4 !text-ink">Includes</h2>
            <ul className="mt-2">
              {service.deliverables.map((d) => (
                <li key={d} className="border-b border-line py-3.5 text-[0.9375rem]">
                  {d}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </header>

      <section aria-labelledby="scope-title" className="bg-paper-deep py-20 lg:py-32">
        <div className="shell grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="scope-title" className="display text-[2.25rem] sm:text-5xl lg:sticky lg:top-32">
              What this covers
            </h2>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {service.scope.map((item, i) => (
              <li key={item.title} className="border-t border-line-strong last:border-b">
                <Reveal className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-8 sm:grid-cols-[4rem_1fr]">
                  <span className="eyebrow pt-2 !text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="display text-[1.75rem] leading-tight">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="fit-title" className="shell py-20 lg:py-32">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="fit-title" className="eyebrow border-t border-ink pt-4 !text-ink">
              When it is the right fit
            </h2>
            <ul className="mt-8 space-y-6">
              {service.fit.map((f) => (
                <li key={f} className="display text-2xl leading-snug sm:text-[1.75rem]">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="eyebrow border-t border-ink pt-4 !text-ink">Common questions</h2>
            <dl className="mt-2">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="border-b border-line py-7">
                  <dt className="text-lg font-medium leading-snug">{faq.q}</dt>
                  <dd className="mt-3 leading-relaxed text-ink-soft">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="related-title" className="shell border-t border-line py-20 lg:py-24">
        <h2 id="related-title" className="eyebrow !text-ink">
          Often combined with
        </h2>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} className="border-t border-line-strong">
              <Link href={`/services/${s.slug}`} className="group flex h-full flex-col py-6">
                <span className="flex items-start justify-between gap-4">
                  <span className="display text-2xl leading-tight transition-colors group-hover:text-accent">
                    {s.title}
                  </span>
                  <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0" strokeWidth={1.5} />
                </span>
                <span className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {s.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand cta={service.cta} query={`?service=${service.slug}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.seo.description,
          provider: {
            "@type": "Organization",
            name: site.name,
            ...(site.url && { url: site.url }),
          },
          ...(site.url && { url: absoluteUrl(`/services/${service.slug}`) }),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
