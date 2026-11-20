"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { AlertCircle, Check, LoaderCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/config/site";
import {
  budgetOptions,
  contactMethodOptions,
  industryOptions,
  leadSchema,
  serviceOptions,
  toFieldErrors,
  type FieldErrors,
  type LeadApiResponse,
  type LeadField,
} from "@/lib/lead-schema";

type Values = {
  name: string;
  email: string;
  company: string;
  website: string;
  industry: string;
  service: string;
  budget: string;
  message: string;
  contactMethod: string;
  phone: string;
  consent: boolean;
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; unavailable?: boolean };

/** Order fields appear in, used to focus the first invalid one. */
const FIELD_ORDER: LeadField[] = [
  "name",
  "email",
  "company",
  "website",
  "industry",
  "service",
  "budget",
  "message",
  "contactMethod",
  "phone",
  "consent",
];

const inputClass =
  "block w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-faint/70 transition-colors duration-200 focus:border-ink focus:outline-none focus-visible:outline-none aria-invalid:border-danger";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{label}</span>
        {optional && <span className="text-xs text-ink-faint">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ink-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <AlertCircle aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const pathname = usePathname();
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Service pages and booking CTAs can preselect options via the query string.
  const preset = (key: string, options: readonly { value: string }[]) => {
    const v = params.get(key);
    return v && options.some((o) => o.value === v) ? v : "";
  };

  const [values, setValues] = useState<Values>(() => ({
    name: "",
    email: "",
    company: "",
    website: "",
    industry: "",
    service: preset("service", serviceOptions),
    budget: "",
    message: "",
    contactMethod: preset("contact", contactMethodOptions) || "email",
    phone: "",
    consent: false,
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const honeypot = useRef<HTMLInputElement>(null);

  const fid = (name: string) => `${uid}-${name}`;
  const submitting = status.state === "submitting";
  const needsPhone =
    values.contactMethod === "phone" || values.contactMethod === "whatsapp";

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function describedBy(name: LeadField, hasHint = false) {
    if (errors[name]) return `${fid(name)}-error`;
    return hasHint ? `${fid(name)}-hint` : undefined;
  }

  function focusFirstError(fieldErrors: FieldErrors) {
    const first = FIELD_ORDER.find((f) => fieldErrors[f]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus({
        state: "error",
        message: "Please check the highlighted fields and try again.",
      });
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          fax: honeypot.current?.value ?? "",
          sourcePath: `${pathname}${window.location.search}`,
        }),
      });
      const data = (await res.json().catch(() => null)) as LeadApiResponse | null;

      // Success is shown only when the server confirms the enquiry was stored.
      if (res.ok && data?.ok) {
        setStatus({ state: "success" });
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      if (data && !data.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
          focusFirstError(data.fieldErrors);
        }
        setStatus({
          state: "error",
          message: data.message,
          unavailable: data.code === "not_configured" || data.code === "server_error",
        });
        return;
      }
      throw new Error(`Unexpected response ${res.status}`);
    } catch {
      setStatus({
        state: "error",
        message:
          "We could not reach the server, so your enquiry was not sent. Please check your connection and try again.",
        unavailable: true,
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border-t border-ink pt-10 focus:outline-none"
      >
        <span className="grid size-12 place-items-center rounded-full bg-success text-paper">
          <Check aria-hidden className="size-5" strokeWidth={2} />
        </span>
        <h2 className="display mt-8 text-4xl sm:text-5xl">
          Thank you, {values.name.split(" ")[0]}. Your enquiry is with us.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
          We have received your details and will review them carefully. We will{" "}
          {
            {
              email: `reply by email at ${values.email}`,
              phone: "call you on the number you provided",
              "video-call": `email ${values.email} to arrange a video call`,
              whatsapp: "message you on WhatsApp",
            }[values.contactMethod]
          }
          .
        </p>
        <div className="mt-8">
          <Link href="/services" className={buttonClasses("secondary", "md")}>
            Explore our services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting}>
      <p className="text-sm text-ink-faint">
        All fields are required unless marked optional.
      </p>

      <fieldset disabled={submitting} className="mt-8 min-w-0 space-y-12">
        <legend className="sr-only">Enquiry details</legend>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          <Field id={fid("name")} label="Full name" error={errors.name}>
            <input
              id={fid("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className={inputClass}
            />
          </Field>

          <Field id={fid("email")} label="Work email" error={errors.email}>
            <input
              id={fid("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className={inputClass}
            />
          </Field>

          <Field id={fid("company")} label="Company name" error={errors.company}>
            <input
              id={fid("company")}
              name="company"
              type="text"
              autoComplete="organization"
              required
              value={values.company}
              onChange={(e) => set("company", e.target.value)}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy("company")}
              className={inputClass}
            />
          </Field>

          <Field id={fid("website")} label="Website" optional error={errors.website}>
            <input
              id={fid("website")}
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="example.com"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
              aria-invalid={Boolean(errors.website)}
              aria-describedby={describedBy("website")}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          <Field id={fid("industry")} label="Industry" error={errors.industry}>
            <select
              id={fid("industry")}
              name="industry"
              required
              value={values.industry}
              onChange={(e) => set("industry", e.target.value)}
              aria-invalid={Boolean(errors.industry)}
              aria-describedby={describedBy("industry")}
              className={`${inputClass} ${values.industry ? "" : "text-ink-faint"}`}
            >
              <option value="" disabled>
                Select an industry
              </option>
              {industryOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field id={fid("service")} label="Required PR service" error={errors.service}>
            <select
              id={fid("service")}
              name="service"
              required
              value={values.service}
              onChange={(e) => set("service", e.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={describedBy("service")}
              className={`${inputClass} ${values.service ? "" : "text-ink-faint"}`}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id={fid("budget")}
            label="Approximate budget"
            error={errors.budget}
            hint="A rough range for the engagement is enough."
            className="sm:col-span-2"
          >
            <select
              id={fid("budget")}
              name="budget"
              required
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={describedBy("budget", true)}
              className={`${inputClass} ${values.budget ? "" : "text-ink-faint"}`}
            >
              <option value="" disabled>
                Select a range
              </option>
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          id={fid("message")}
          label="Project description"
          error={errors.message}
          hint="What are you hoping PR will help you achieve, and by when?"
        >
          <textarea
            id={fid("message")}
            name="message"
            rows={5}
            required
            maxLength={4000}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", true)}
            className={`${inputClass} resize-y`}
          />
        </Field>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          <div
            role="radiogroup"
            aria-labelledby={fid("contact-label")}
            aria-describedby={errors.contactMethod ? `${fid("contactMethod")}-error` : undefined}
          >
            <p id={fid("contact-label")} className="text-sm font-medium text-ink">
              Preferred contact method
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {contactMethodOptions.map((o) => {
                const checked = values.contactMethod === o.value;
                return (
                  <label
                    key={o.value}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent ${
                      checked
                        ? "border-ink bg-ink text-paper"
                        : "border-line-strong text-ink hover:border-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={o.value}
                      checked={checked}
                      onChange={() => set("contactMethod", o.value)}
                      className="sr-only"
                    />
                    {o.label}
                  </label>
                );
              })}
            </div>
            {errors.contactMethod && (
              <p id={`${fid("contactMethod")}-error`} className="mt-2 text-sm text-danger">
                {errors.contactMethod}
              </p>
            )}
          </div>

          <Field
            id={fid("phone")}
            label="Phone number"
            optional={!needsPhone}
            error={errors.phone}
            hint={needsPhone ? "Include your country code." : undefined}
          >
            <input
              id={fid("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required={needsPhone}
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone", needsPhone)}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
          <label>
            Fax number
            <input ref={honeypot} type="text" name="fax" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3.5">
            <input
              type="checkbox"
              name="consent"
              required
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? `${fid("consent")}-error` : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-line-strong bg-paper-raised bg-center bg-no-repeat transition-colors checked:border-ink checked:bg-ink checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%20fill=%22none%22%20stroke=%22%23f8f5ef%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m3.5%208.5%203%203%206-7%22/%3E%3C/svg%3E')] aria-invalid:border-danger"
            />
            <span className="text-sm leading-relaxed text-ink-soft">
              I agree to {site.name} storing and using the details I have
              provided to respond to this enquiry, as described in the{" "}
              <Link href="/privacy-policy" className="text-ink underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id={`${fid("consent")}-error`} className="mt-2 flex items-start gap-1.5 pl-8 text-sm text-danger">
              <AlertCircle aria-hidden className="mt-0.5 size-3.5 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>
      </fieldset>

      <div aria-live="assertive" className="mt-8">
        {status.state === "error" && (
          <div className="flex items-start gap-3 border border-danger/30 bg-danger/5 p-4 text-sm leading-relaxed text-danger">
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            <p>
              {status.message}
              {status.unavailable && site.contact.email && (
                <>
                  {" "}
                  You can also email us directly at{" "}
                  <a href={`mailto:${site.contact.email}`} className="underline underline-offset-2">
                    {site.contact.email}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className={buttonClasses("primary", "lg", "min-w-52")}
        >
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </button>
        <p className="text-sm text-ink-faint">
          We only use your details to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}

/** Static placeholder shown while the form's client state hydrates. */
export function ContactFormFallback() {
  return (
    <div aria-hidden className="space-y-8">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-16 border-b border-line" />
      ))}
    </div>
  );
}
