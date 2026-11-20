import "server-only";
import { query } from "./db";
import type { Lead } from "./lead-schema";

export const leadStatuses = ["new", "contacted", "qualified", "won", "closed"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type LeadRecord = {
  id: string;
  createdAt: Date;
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
  status: LeadStatus;
  sourcePath: string;
};

const COLUMNS = `
  id::text            AS "id",
  created_at          AS "createdAt",
  name, email, company, website, industry, service, budget, message,
  contact_method      AS "contactMethod",
  phone, status,
  source_path         AS "sourcePath"
`;

export async function insertLead(
  lead: Lead,
  meta: { ipHash: string; sourcePath: string },
): Promise<string> {
  const rows = await query<{ id: string }>(
    `INSERT INTO leads
       (name, email, company, website, industry, service, budget, message,
        contact_method, phone, source_path, ip_hash)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING id::text AS id`,
    [
      lead.name,
      lead.email,
      lead.company,
      lead.website,
      lead.industry,
      lead.service,
      lead.budget,
      lead.message,
      lead.contactMethod,
      lead.phone,
      meta.sourcePath,
      meta.ipHash,
    ],
  );
  return rows[0].id;
}

/** Submissions from one (hashed) address within the window; for rate limiting. */
export async function countRecentLeads(
  ipHash: string,
  windowMinutes: number,
): Promise<number> {
  const rows = await query<{ count: string }>(
    `SELECT count(*)::text AS count FROM leads
      WHERE ip_hash = $1 AND created_at > now() - make_interval(mins => $2)`,
    [ipHash, windowMinutes],
  );
  return Number(rows[0]?.count ?? 0);
}

export async function listLeads(opts: {
  status?: LeadStatus;
  limit?: number;
} = {}): Promise<LeadRecord[]> {
  const limit = Math.min(opts.limit ?? 200, 5000);
  if (opts.status) {
    return query<LeadRecord>(
      `SELECT ${COLUMNS} FROM leads WHERE status = $1
        ORDER BY created_at DESC LIMIT $2`,
      [opts.status, limit],
    );
  }
  return query<LeadRecord>(
    `SELECT ${COLUMNS} FROM leads ORDER BY created_at DESC LIMIT $1`,
    [limit],
  );
}

export async function countLeadsByStatus(): Promise<Record<string, number>> {
  const rows = await query<{ status: string; count: string }>(
    `SELECT status, count(*)::text AS count FROM leads GROUP BY status`,
  );
  return Object.fromEntries(rows.map((r) => [r.status, Number(r.count)]));
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await query(`UPDATE leads SET status = $2 WHERE id = $1::bigint`, [id, status]);
}

export async function deleteLead(id: string) {
  await query(`DELETE FROM leads WHERE id = $1::bigint`, [id]);
}
