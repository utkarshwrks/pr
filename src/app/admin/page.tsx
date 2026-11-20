import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, LogOut } from "lucide-react";
import { site } from "@/config/site";
import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/db";
import {
  countLeadsByStatus,
  leadStatuses,
  listLeads,
  type LeadRecord,
  type LeadStatus,
} from "@/lib/leads";
import {
  budgetOptions,
  contactMethodOptions,
  industryOptions,
  labelFor,
  serviceOptions,
} from "@/lib/lead-schema";
import { logout, removeLead, setLeadStatus } from "./actions";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-10 border-l-2 border-accent bg-accent-wash/60 px-5 py-4 leading-relaxed">
      {children}
    </p>
  );
}

function LeadCard({ lead }: { lead: LeadRecord }) {
  const details: [string, React.ReactNode][] = [
    ["Email", <a key="e" href={`mailto:${lead.email}`} className="underline underline-offset-2">{lead.email}</a>],
    ["Phone", lead.phone || "—"],
    ["Prefers", labelFor(contactMethodOptions, lead.contactMethod)],
    ["Website", lead.website ? (
      <a key="w" href={lead.website} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
        {lead.website.replace(/^https?:\/\//, "")}
      </a>
    ) : "—"],
    ["Industry", labelFor(industryOptions, lead.industry)],
    ["Service", labelFor(serviceOptions, lead.service)],
    ["Budget", labelFor(budgetOptions, lead.budget)],
    ["Sent from", lead.sourcePath || "—"],
  ];

  return (
    <li className="border border-line bg-paper p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="display text-2xl leading-tight">
            {lead.name} <span className="text-ink-faint">· {lead.company}</span>
          </h2>
          <p className="mt-1 text-sm text-ink-faint">
            #{lead.id} · {dateFormat.format(lead.createdAt)} IST
          </p>
        </div>
        <form action={setLeadStatus} className="flex items-center gap-2">
          <input type="hidden" name="id" value={lead.id} />
          <label htmlFor={`status-${lead.id}`} className="sr-only">
            Status for {lead.name}
          </label>
          <select
            id={`status-${lead.id}`}
            name="status"
            defaultValue={lead.status}
            className="h-9 border border-line-strong bg-paper px-2 text-sm capitalize"
          >
            {leadStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="submit" className="h-9 border border-ink px-3 text-sm hover:bg-ink hover:text-paper">
            Save
          </button>
        </form>
      </div>

      <dl className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {details.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-ink-faint">{label}</dt>
            <dd className="break-words">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 whitespace-pre-wrap border-t border-line pt-4 leading-relaxed text-ink-soft">
        {lead.message}
      </p>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-ink-faint hover:text-danger">Delete this lead</summary>
        <form action={removeLead} className="mt-3 flex items-center gap-3">
          <input type="hidden" name="id" value={lead.id} />
          <span className="text-ink-soft">This permanently removes the enquiry.</span>
          <button type="submit" className="h-8 border border-danger px-3 text-danger hover:bg-danger hover:text-paper">
            Delete permanently
          </button>
        </form>
      </details>
    </li>
  );
}

async function Leads({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  if (!(await isAdmin())) redirect("/admin/login");

  if (!isDbConfigured()) {
    return (
      <Notice>
        <strong className="font-medium">No database is configured.</strong> Set{" "}
        <code className="font-mono">DATABASE_URL</code> in the server environment. Until
        then the enquiry form tells visitors it is unavailable and stores nothing.
      </Notice>
    );
  }

  const raw = (await searchParams).status;
  const status = leadStatuses.find((s) => s === raw) as LeadStatus | undefined;

  let leads: LeadRecord[];
  let counts: Record<string, number>;
  try {
    [leads, counts] = await Promise.all([listLeads({ status }), countLeadsByStatus()]);
  } catch (err) {
    console.error("[admin] failed to load leads:", (err as Error).message);
    return (
      <Notice>
        <strong className="font-medium">Could not reach the database.</strong> Check{" "}
        <code className="font-mono">DATABASE_URL</code> and that the database is running,
        then reload.
      </Notice>
    );
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const tabs = [
    { label: "All", href: "/admin", count: total, active: !status },
    ...leadStatuses.map((s) => ({
      label: s,
      href: `/admin?status=${s}`,
      count: counts[s] ?? 0,
      active: status === s,
    })),
  ];

  return (
    <>
      <nav aria-label="Filter by status" className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            aria-current={t.active ? "page" : undefined}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize ${
              t.active ? "border-ink bg-ink text-paper" : "border-line-strong hover:border-ink"
            }`}
          >
            {t.label} <span className="opacity-60">{t.count}</span>
          </Link>
        ))}
      </nav>

      {leads.length === 0 ? (
        <p className="mt-12 text-ink-soft">
          {status ? `No leads marked “${status}”.` : "No enquiries yet. New submissions will appear here."}
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </ul>
      )}
    </>
  );
}

export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-6">
        <div>
          <p className="eyebrow">{site.name} admin</p>
          <h1 className="display mt-3 text-4xl">Enquiries</h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/admin/export"
            className="inline-flex h-9 items-center gap-2 border border-line-strong px-3 text-sm hover:border-ink"
          >
            <Download aria-hidden className="size-4" strokeWidth={1.5} />
            Export CSV
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-2 border border-line-strong px-3 text-sm hover:border-ink"
            >
              <LogOut aria-hidden className="size-4" strokeWidth={1.5} />
              Sign out
            </button>
          </form>
        </div>
      </header>

      <Suspense fallback={<div className="mt-10 h-64 animate-pulse bg-line/40" role="status" aria-label="Loading leads" />}>
        <Leads searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
