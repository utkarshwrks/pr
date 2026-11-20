import Link from "next/link";
import { site } from "@/config/site";

/** Typographic wordmark. Swap for an SVG logo once the identity is final. */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className="group inline-flex items-baseline gap-2.5"
    >
      <span className="display whitespace-nowrap text-2xl leading-none tracking-[-0.03em] sm:text-[1.75rem]">
        {site.wordmark}
        <span className="text-accent" aria-hidden>
          .
        </span>
      </span>
      <span
        className={`eyebrow hidden !text-[0.625rem] xl:inline ${inverse ? "!text-paper/60" : ""}`}
      >
        {site.descriptor}
      </span>
    </Link>
  );
}
