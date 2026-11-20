import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/config/site";

/**
 * Consultation booking CTA. Links to the configured booking provider
 * (NEXT_PUBLIC_BOOKING_URL); until one is set it routes to the enquiry form
 * with "video call" preselected, so the button is never a dead end.
 */
export function BookingLink({
  variant = "secondary",
  size = "lg",
  label = "Book a consultation",
}: {
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "lg";
  label?: string;
}) {
  const href = site.bookingUrl ?? "/contact?contact=video-call#enquiry";
  return (
    <ButtonLink href={href} variant={variant} size={size} arrow={Boolean(site.bookingUrl)}>
      <CalendarDays aria-hidden className="size-4" strokeWidth={1.5} />
      {label}
    </ButtonLink>
  );
}

type CtaBandProps = {
  title?: string;
  description?: string;
  cta?: string;
  /** Appended to /contact, e.g. "?service=media-relations". */
  query?: string;
};

export function CtaBand({
  title = "Your Next Big Story Starts Here.",
  description = "Let's discuss how strategic communications can help your brand earn attention and build credibility.",
  cta = "Start a Conversation",
  query = "",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="shell py-24 lg:py-36">
      <Reveal>
        <div className="grid gap-x-12 gap-y-10 border-y border-ink py-14 lg:grid-cols-12 lg:py-20">
          <h2
            id="cta-title"
            className="display text-[2.75rem] sm:text-6xl lg:col-span-7 lg:text-[5rem]"
          >
            {title}
          </h2>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <p className="text-lg leading-relaxed text-ink-soft">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <ButtonLink href={`/contact${query}`} size="lg">
                {cta}
              </ButtonLink>
              <BookingLink />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
