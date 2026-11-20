import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

/**
 * Minimal single-password admin session for the lead review screen.
 *
 * The session is a signed, expiring token in an httpOnly cookie. For a team
 * with several users or audit requirements, replace this with a proper
 * identity provider — every admin entry point goes through isAdmin().
 */

const COOKIE = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 8;

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

function sign(payload: string): string {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(payload)
    .digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  // Hash first so both buffers have equal length and length is not leaked.
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(candidate, expected!);
}

export async function createSession() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `v1.${expires}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
}

export async function isAdmin(): Promise<boolean> {
  // Always wait for a real request before deciding. Without this, a build
  // made before ADMIN_PASSWORD exists would prerender a permanent "signed
  // out" result, and the expiry check below would run against build time.
  await connection();
  const token = (await cookies()).get(COOKIE)?.value;
  if (!isAdminConfigured() || !token) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return false;

  const [version, expires] = payload.split(".");
  return version === "v1" && Number(expires) > Date.now() / 1000;
}
