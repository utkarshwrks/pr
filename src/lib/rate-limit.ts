import "server-only";
import { createHmac } from "node:crypto";

/**
 * In-memory sliding-window limiter. It is the fast first line of defence; it
 * resets on deploy and is per-instance, so the enquiry endpoint also enforces
 * a durable, database-backed limit (see countRecentLeads).
 */

const globalForLimiter = globalThis as unknown as {
  __rateBuckets?: Map<string, number[]>;
};
const buckets: Map<string, number[]> = (globalForLimiter.__rateBuckets ??= new Map());

const MAX_KEYS = 10_000;

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)),
    };
  }

  hits.push(now);
  buckets.set(key, hits);

  // Bound memory: drop the oldest keys if a flood of unique clients arrives.
  if (buckets.size > MAX_KEYS) {
    for (const k of buckets.keys()) {
      buckets.delete(k);
      if (buckets.size <= MAX_KEYS * 0.9) break;
    }
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Best-effort client address from proxy headers. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Keyed hash of the address, so abuse can be limited without storing raw IPs.
 * Set IP_HASH_SECRET in production; without it the hash is unsalted-equivalent
 * and offers little protection against reversal.
 */
export function hashIp(ip: string): string {
  const secret =
    process.env.IP_HASH_SECRET || process.env.ADMIN_SESSION_SECRET || "dev-only-ip-salt";
  return createHmac("sha256", secret).update(ip).digest("hex").slice(0, 32);
}
