import { Suspense } from "react";
import { redirect } from "next/navigation";
import { site } from "@/config/site";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

async function LoginGate() {
  if (await isAdmin()) redirect("/admin");

  if (!isAdminConfigured()) {
    return (
      <p className="mt-6 border-l-2 border-accent bg-accent-wash/60 px-4 py-3 text-sm leading-relaxed">
        Admin access is not configured. Set <code className="font-mono">ADMIN_PASSWORD</code>{" "}
        and <code className="font-mono">ADMIN_SESSION_SECRET</code> in the server
        environment, then restart.
      </p>
    );
  }
  return <LoginForm />;
}

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-5 py-16">
      <p className="eyebrow">{site.name} admin</p>
      <h1 className="display mt-4 text-4xl">Sign in to review leads</h1>
      <Suspense fallback={<div className="mt-8 h-40 animate-pulse bg-line/50" />}>
        <LoginGate />
      </Suspense>
    </main>
  );
}
