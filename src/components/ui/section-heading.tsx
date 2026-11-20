import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** Heading level; visual size stays the same. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

/**
 * Editorial section opener: a mono label on a hairline, a serif headline on
 * the left and optional supporting copy offset to the right.
 */
export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 border-t border-ink pt-4">
        <span className="eyebrow !text-ink">{eyebrow}</span>
      </div>
      <div className="mt-10 grid gap-x-12 gap-y-6 lg:mt-14 lg:grid-cols-12">
        <Tag
          id={id}
          className="display text-[2.5rem] sm:text-5xl lg:col-span-7 lg:text-[3.75rem]"
        >
          {title}
        </Tag>
        {children && (
          <div className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:pt-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
};

/** Top-of-page header for interior pages. */
export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="shell pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-28">
      <p className="eyebrow animate-rise">{eyebrow}</p>
      <h1 className="display mt-6 max-w-5xl animate-rise text-[2.75rem] [animation-delay:60ms] sm:text-6xl lg:text-[5.25rem]">
        {title}
      </h1>
      {children && (
        <div className="mt-8 max-w-2xl animate-rise text-lg leading-relaxed text-ink-soft [animation-delay:140ms] lg:text-xl">
          {children}
        </div>
      )}
    </header>
  );
}
