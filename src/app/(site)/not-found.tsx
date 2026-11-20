import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-6 max-w-3xl text-[2.75rem] sm:text-6xl lg:text-7xl">
        This page did not make the final edit.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        The page you are looking for has moved or no longer exists.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/services" size="lg" variant="secondary" arrow={false}>
          Explore our services
        </ButtonLink>
      </div>
    </section>
  );
}
