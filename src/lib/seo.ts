import type { Metadata } from "next";
import { absoluteUrl, site, socialLinks } from "@/config/site";

type PageMeta = {
  /** Page title without the brand suffix. */
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical URL. */
  path: string;
  noindex?: boolean;
};

/**
 * Per-page metadata. Canonical and og:url are only emitted once
 * NEXT_PUBLIC_SITE_URL is configured, so no placeholder domain is published.
 */
export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: url ?? undefined,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

/**
 * Organization structured data built strictly from configured, verified
 * details — unset fields are omitted rather than guessed.
 */
export function organizationJsonLd() {
  const { email, phone, address } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    ...(site.legalName && { legalName: site.legalName }),
    description: site.description,
    ...(site.url && { url: site.url }),
    ...(email && { email }),
    ...(phone && { telephone: phone }),
    ...(address && {
      address: { "@type": "PostalAddress", streetAddress: address.join(", ") },
    }),
    ...(socialLinks.length > 0 && { sameAs: socialLinks.map((s) => s.href) }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  if (!site.url) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
