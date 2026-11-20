/**
 * Single source of truth for brand, contact and legal details.
 *
 * Everything a visitor can see about the company comes from here. Values left
 * as `null` are simply not rendered — the site never shows an invented email
 * address, phone number, office address or social profile.
 *
 * Before launch: replace the placeholder brand name, fill in the verified
 * details below, and set NEXT_PUBLIC_SITE_URL (see .env.example).
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || null;
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || null;

export const site = {
  /** Company name, used in copy, page titles and structured data. */
  name: "Cybokrafts",
  /** Wordmark shown in the header, footer and social image. */
  wordmark: "Cybokrafts PR",
  /** Used in the wordmark next to the name and in page titles. */
  descriptor: "Strategic Communications",
  /** Registered legal entity, shown in the footer and legal pages when set. */
  legalName: "Cybokrafts Private Limited" as string | null,

  tagline: "PR and strategic communications for ambitious brands.",
  description:
    "A PR and strategic communications partner helping startups, founders and growing businesses build visibility, credibility and a meaningful media presence.",

  /** Canonical origin, e.g. https://example.com. Null until the domain is live. */
  url: siteUrl,
  locale: "en_IN",

  contact: {
    email: null as string | null,
    phone: null as string | null,
    /** Multi-line postal address; one array entry per line. */
    address: null as string[] | null,
    /** Shown on the contact page, e.g. "Monday to Friday, 10am – 6pm IST". */
    hours: null as string | null,
  },

  /** Only profiles with a real URL are rendered. */
  social: {
    linkedin: null as string | null,
    x: null as string | null,
    instagram: null as string | null,
  },

  /**
   * Consultation booking link (Calendly, Cal.com, Google appointment schedule…).
   * When null, booking CTAs route to the enquiry form instead.
   */
  bookingUrl,

  legal: {
    /**
     * The privacy policy and terms are a sensible starting draft, not legal
     * advice. Flip to `true` once they have been reviewed for your entity and
     * jurisdiction — this removes the "draft" notice from both pages.
     */
    reviewed: false,
    lastUpdated: "November 2026",
    /** Governing-law jurisdiction for the terms, e.g. "Mumbai, India". */
    jurisdiction: null as string | null,
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = (
  [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "X", href: site.social.x },
    { label: "Instagram", href: site.social.instagram },
  ] as const
).filter((s): s is { label: typeof s.label; href: string } => Boolean(s.href));

export const hasContactDetails = Boolean(
  site.contact.email || site.contact.phone || site.contact.address,
);

/** Absolute URL for a path, or null when the domain is not configured yet. */
export function absoluteUrl(path = "/"): string | null {
  return site.url ? `${site.url}${path === "/" ? "" : path}` : null;
}
