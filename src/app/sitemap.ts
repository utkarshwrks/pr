import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { serviceSlugs } from "@/content/services";
import { hasPublishedInsights } from "@/content/site-content";

/**
 * Sitemap URLs must be absolute. Until NEXT_PUBLIC_SITE_URL is set this falls
 * back to localhost, which is only meaningful in development.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url ?? "http://localhost:3000";

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...serviceSlugs.map((slug) => ({ path: `/services/${slug}`, priority: 0.8 })),
    { path: "/industries", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    ...(hasPublishedInsights ? [{ path: "/insights", priority: 0.6 }] : []),
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
