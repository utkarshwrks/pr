import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-colors duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-accent-deep",
  secondary:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-ink hover:bg-accent-wash",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

function Arrow({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden
      className="size-4 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-0.5"
      strokeWidth={1.75}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

/** Link styled as a button. External URLs open in a new tab. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
}: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  const classes = buttonClasses(variant, size, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow && <Arrow external />}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/** Quiet text link with an arrow, for secondary actions inside content. */
export function TextLink({
  href,
  children,
  className = "",
  ...rest
}: ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`group/btn inline-flex items-center gap-2 text-sm font-medium text-ink ${className}`}
      {...rest}
    >
      <span className="link-underline">{children}</span>
      <Arrow />
    </Link>
  );
}
