import { after, NextResponse } from "next/server";
import { isDbConfigured } from "@/lib/db";
import { countRecentLeads, insertLead } from "@/lib/leads";
import {
  budgetOptions,
  industryOptions,
  labelFor,
  leadSchema,
  serviceOptions,
  toFieldErrors,
  type Lead,
  type LeadApiResponse,
} from "@/lib/lead-schema";
import { clientIp, hashIp, rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 20_000;
/** Durable limit: enquiries accepted per address per hour. */
const HOURLY_LIMIT = 5;

function json(body: LeadApiResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

/** Browsers send Origin on cross-site POSTs; reject anything that is not us. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser client; other checks still apply
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * Optional notification hook. Set LEAD_WEBHOOK_URL to a Slack incoming
 * webhook, Zapier/Make catch hook or CRM endpoint to be alerted to new leads.
 * Runs after the response is sent and never affects the visitor.
 */
async function notify(lead: Lead, id: string) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  const summary =
    `New PR enquiry #${id}: ${lead.name} (${lead.company}) — ` +
    `${labelFor(serviceOptions, lead.service)}, ${labelFor(budgetOptions, lead.budget)}`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: summary,
        lead: {
          id,
          name: lead.name,
          email: lead.email,
          company: lead.company,
          industry: labelFor(industryOptions, lead.industry),
          service: labelFor(serviceOptions, lead.service),
          budget: labelFor(budgetOptions, lead.budget),
          contactMethod: lead.contactMethod,
        },
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[leads] webhook notification failed:", (err as Error).message);
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, code: "bad_request", message: "Invalid request origin." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "bad_request", message: "Unsupported content type." }, 415);
  }

  const ip = clientIp(request.headers);
  const burst = rateLimit(`lead:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!burst.ok) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many attempts in a short time. Please wait a few minutes and try again.",
      },
      429,
      { "Retry-After": String(burst.retryAfterSeconds) },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, code: "bad_request", message: "Could not read the request." }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, code: "bad_request", message: "The submission is too large." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: "bad_request", message: "Malformed request." }, 400);
  }

  // Honeypot: a field real visitors never see or fill in.
  if (typeof body.fax === "string" && body.fax.trim() !== "") {
    return json({ ok: false, code: "bad_request", message: "The submission was rejected." }, 400);
  }

  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return json(
      {
        ok: false,
        code: "validation",
        message: "Please check the highlighted fields and try again.",
        fieldErrors: toFieldErrors(result.error),
      },
      422,
    );
  }

  // Never report success unless the enquiry has actually been stored.
  if (!isDbConfigured()) {
    console.error("[leads] DATABASE_URL is not set; enquiry was NOT stored.");
    return json(
      {
        ok: false,
        code: "not_configured",
        message: "Our enquiry form is not accepting submissions at the moment.",
      },
      503,
    );
  }

  try {
    const ipHash = hashIp(ip);
    if ((await countRecentLeads(ipHash, 60)) >= HOURLY_LIMIT) {
      return json(
        {
          ok: false,
          code: "rate_limited",
          message: "We have already received several enquiries from you. Please try again later.",
        },
        429,
        { "Retry-After": "3600" },
      );
    }

    const sourcePath =
      typeof body.sourcePath === "string" ? body.sourcePath.slice(0, 200) : "";
    const id = await insertLead(result.data, { ipHash, sourcePath });
    after(() => notify(result.data, id));
    return json({ ok: true }, 201);
  } catch (err) {
    console.error("[leads] failed to store enquiry:", (err as Error).message);
    return json(
      {
        ok: false,
        code: "server_error",
        message: "Something went wrong on our side and your enquiry was not sent.",
      },
      500,
    );
  }
}
