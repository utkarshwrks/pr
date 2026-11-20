"use client";

import { useEffect } from "react";
import { buttonClasses } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display mt-6 max-w-3xl text-[2.75rem] sm:text-6xl">
        We could not load this page.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        This is a problem on our side. Please try again in a moment.
      </p>
      <div className="mt-10">
        <button type="button" onClick={reset} className={buttonClasses("primary", "lg")}>
          Try again
        </button>
      </div>
    </section>
  );
}
