import { Suspense } from "react";
import { ContactForm, ContactFormFallback } from "@/components/forms/contact-form";
import { BookingLink } from "@/components/sections/cta";
import { PageHeader } from "@/components/ui/section-heading";
import { site, socialLinks } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Discuss Your PR Strategy",
  description:
    "Tell us about your business and what you want PR to achieve. Send an enquiry or book a consultation to discuss your PR strategy.",
  path: "/contact",
});

const nextSteps = [
  {
    title: "We read your enquiry",
    body: "We review what you have sent and consider how we can best help.",
  },
  {
    title: "We have a first conversation",
    body: "A short call to understand your business, objectives and timelines. No obligation.",
  },
  {
    title: "You receive a proposal",
    body: "A tailored plan with scope, deliverables, timeline and cost, for you to consider.",
  },
];

export default function ContactPage() {
  const { email, phone, address, hours } = site.contact;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s talk about your <em className="text-accent">story</em>.
          </>
        }
      >
        <p>
          Tell us where your business is and what you would like PR to achieve.
          The more context you share, the more useful our first conversation
          will be.
        </p>
      </PageHeader>

      <div className="shell grid gap-x-16 gap-y-16 border-t border-line pb-24 pt-14 lg:grid-cols-12 lg:pb-36 lg:pt-20">
        <section id="enquiry" aria-labelledby="enquiry-title" className="lg:col-span-7">
          <h2 id="enquiry-title" className="display text-4xl sm:text-[2.75rem]">
            Send an enquiry
          </h2>
          <div className="mt-6">
            <Suspense fallback={<ContactFormFallback />}>
              <ContactForm />
            </Suspense>
          </div>
        </section>

        <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
          <section aria-labelledby="book-title" className="bg-ink p-8 text-paper">
            <h2 id="book-title" className="display text-[1.75rem] leading-tight">
              Prefer to talk it through?
            </h2>
            <p className="mt-3 leading-relaxed text-paper/70">
              {site.bookingUrl
                ? "Book a consultation at a time that suits you. We will come prepared."
                : "Choose “Video call” as your preferred contact method and we will arrange a time that suits you."}
            </p>
            <div className="mt-6">
              <BookingLink variant="inverse" size="md" />
            </div>
          </section>

          <section aria-labelledby="next-title">
            <h2 id="next-title" className="eyebrow border-t border-ink pt-4 !text-ink">
              What happens next
            </h2>
            <ol className="mt-2">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-b border-line py-5">
                  <span className="eyebrow pt-1.5 !text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {(email || phone || address || socialLinks.length > 0) && (
            <section aria-labelledby="direct-title">
              <h2 id="direct-title" className="eyebrow border-t border-ink pt-4 !text-ink">
                Reach us directly
              </h2>
              <dl className="mt-5 space-y-4 text-[0.9375rem]">
                {email && (
                  <div>
                    <dt className="text-ink-faint">Email</dt>
                    <dd>
                      <a href={`mailto:${email}`} className="link-underline">
                        {email}
                      </a>
                    </dd>
                  </div>
                )}
                {phone && (
                  <div>
                    <dt className="text-ink-faint">Phone</dt>
                    <dd>
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="link-underline">
                        {phone}
                      </a>
                    </dd>
                  </div>
                )}
                {address && (
                  <div>
                    <dt className="text-ink-faint">Office</dt>
                    <dd>
                      <address className="not-italic leading-relaxed">
                        {address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </dd>
                  </div>
                )}
                {hours && (
                  <div>
                    <dt className="text-ink-faint">Hours</dt>
                    <dd>{hours}</dd>
                  </div>
                )}
                {socialLinks.length > 0 && (
                  <div>
                    <dt className="text-ink-faint">Elsewhere</dt>
                    <dd className="flex flex-wrap gap-x-5">
                      {socialLinks.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline"
                        >
                          {s.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
