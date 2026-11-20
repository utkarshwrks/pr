"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import {
  checkPassword,
  createSession,
  destroySession,
  isAdmin,
  isAdminConfigured,
} from "@/lib/admin-auth";
import { deleteLead, leadStatuses, updateLeadStatus, type LeadStatus } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export type LoginState = { error: string | null };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "Admin access is not configured on this server." };
  }

  const ip = clientIp(await headers());
  const attempt = rateLimit(`admin-login:${ip}`, { limit: 5, windowMs: 15 * 60_000 });
  if (!attempt.ok) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password)) {
    return { error: "Incorrect password." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/** Every mutation re-checks the session: server actions are public endpoints. */
async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function setLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as LeadStatus;
  if (!/^\d+$/.test(id) || !leadStatuses.includes(status)) return;
  await updateLeadStatus(id, status);
  refresh();
}

export async function removeLead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!/^\d+$/.test(id)) return;
  await deleteLead(id);
  refresh();
}
