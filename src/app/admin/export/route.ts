import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/db";
import { listLeads } from "@/lib/leads";

/** Quote a CSV cell and neutralise spreadsheet formula injection. */
function cell(value: unknown): string {
  let s = value instanceof Date ? value.toISOString() : String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!isDbConfigured()) {
    return new Response("Database is not configured", { status: 503 });
  }

  const leads = await listLeads({ limit: 5000 });
  const columns = [
    "id", "createdAt", "status", "name", "email", "phone", "company", "website",
    "industry", "service", "budget", "contactMethod", "message", "sourcePath",
  ] as const;

  const csv = [
    columns.join(","),
    ...leads.map((lead) => columns.map((c) => cell(lead[c])).join(",")),
  ].join("\r\n");

  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
