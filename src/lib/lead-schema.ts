import { z } from "zod";
import { services } from "@/content/services";

/**
 * Enquiry form contract, shared by the browser form and the API route so the
 * two can never drift apart. The server always re-validates.
 */

export const industryOptions = [
  { value: "startup", label: "Startup" },
  { value: "technology-saas", label: "Technology & SaaS" },
  { value: "consumer-d2c", label: "Consumer & D2C" },
  { value: "msme", label: "MSME" },
  { value: "corporate", label: "Corporate organization" },
  { value: "personal-brand", label: "Founder / executive / personal brand" },
  { value: "other", label: "Other" },
] as const;

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.shortTitle })),
  { value: "not-sure", label: "Not sure yet — help me decide" },
];

/** Indicative ranges only; adjust to match how engagements are priced. */
export const budgetOptions = [
  { value: "under-1l", label: "Under ₹1 lakh" },
  { value: "1l-3l", label: "₹1 – 3 lakh" },
  { value: "3l-7l", label: "₹3 – 7 lakh" },
  { value: "7l-15l", label: "₹7 – 15 lakh" },
  { value: "15l-plus", label: "₹15 lakh and above" },
  { value: "undecided", label: "Not decided yet" },
] as const;

export const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "video-call", label: "Video call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const text = (max: number) =>
  z.string("This field is required.").trim().max(max, `Please keep this under ${max} characters.`);

export const leadSchema = z
  .object({
    name: text(120).min(2, "Please enter your full name."),
    email: z
      .string("Please enter a valid work email address.")
      .trim()
      .toLowerCase()
      .max(254, "That email address is too long.")
      .pipe(z.email("Please enter a valid work email address.")),
    company: text(160).min(1, "Please enter your company name."),
    website: text(300)
      .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v))
      .refine(
        (v) => v === "" || (URL.canParse(v) && new URL(v).hostname.includes(".")),
        "Please enter a valid website, e.g. example.com.",
      )
      .optional()
      .default(""),
    industry: z.enum(values(industryOptions), "Please select your industry."),
    service: z.enum(
      serviceOptions.map((o) => o.value) as [string, ...string[]],
      "Please select the service you are interested in.",
    ),
    budget: z.enum(values(budgetOptions), "Please select an approximate budget."),
    message: text(4000).min(
      20,
      "Please tell us a little more about the project (at least 20 characters).",
    ),
    contactMethod: z.enum(
      values(contactMethodOptions),
      "Please choose how you would like us to contact you.",
    ),
    phone: text(30).optional().default(""),
    consent: z.literal(true, "Please confirm you agree before sending."),
  })
  .superRefine((data, ctx) => {
    const needsPhone =
      data.contactMethod === "phone" || data.contactMethod === "whatsapp";
    const digits = data.phone.replace(/\D/g, "");
    if (needsPhone && digits.length < 7) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Please add a phone number so we can reach you this way.",
      });
    } else if (data.phone && !/^[+\d][\d\s().-]{5,}$/.test(data.phone)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Please enter a valid phone number.",
      });
    }
  });

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type LeadField = keyof LeadInput;
export type FieldErrors = Partial<Record<LeadField, string>>;

/** First error message per field, in a shape the form can render directly. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as LeadField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/** Response body of POST /api/leads. */
export type LeadApiResponse =
  | { ok: true }
  | {
      ok: false;
      code:
        | "validation"
        | "rate_limited"
        | "not_configured"
        | "bad_request"
        | "server_error";
      message: string;
      fieldErrors?: FieldErrors;
    };
