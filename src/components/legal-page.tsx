import type { ReactNode } from "react";
import { site } from "@/config/site";

/** Shared shell for the privacy policy and terms. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="shell pb-24 pt-14 sm:pt-20 lg:pb-36 lg:pt-28">
      <header className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-6 text-[2.75rem] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 text-sm text-ink-faint">Last updated: {site.legal.lastUpdated}</p>
      </header>

      {!site.legal.reviewed && (
        <p
          role="note"
          className="mt-10 max-w-3xl border-l-2 border-accent bg-accent-wash/60 px-5 py-4 text-[0.9375rem] leading-relaxed"
        >
          <strong className="font-medium">Draft pending legal review.</strong> This
          document is a working draft and will be finalised before {site.name}{" "}
          begins accepting client engagements through this website.
        </p>
      )}

      <div className="prose-legal mt-4 max-w-3xl border-t border-line pt-2 [&>h2:first-child]:mt-10">
        {children}
      </div>
    </article>
  );
}

/** How to reach the company about legal matters, using only configured details. */
export function LegalContact() {
  const { email, address } = site.contact;
  return (
    <>
      <p>
        {email ? (
          <>
            Email us at <a href={`mailto:${email}`}>{email}</a> or use
          </>
        ) : (
          "Please use"
        )}{" "}
        the <a href="/contact">enquiry form on our contact page</a> and we will
        respond as soon as we can.
      </p>
      {address && <p>Postal address: {address.join(", ")}.</p>}
    </>
  );
}
