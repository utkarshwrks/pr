"use client";

import { useActionState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { login, type LoginState } from "../actions";

const initial: LoginState = { error: null };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <form action={action} className="mt-8">
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        aria-invalid={Boolean(state.error)}
        aria-describedby={state.error ? "login-error" : undefined}
        className="mt-2 block h-12 w-full border border-line-strong bg-paper px-3 text-base focus:border-ink focus:outline-none"
      />
      <p id="login-error" role="alert" className="mt-2 min-h-5 text-sm text-danger">
        {state.error}
      </p>
      <button
        type="submit"
        disabled={pending}
        className={buttonClasses("primary", "md", "mt-4 w-full")}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
