import type { CSSProperties } from "react";

/**
 * Decorative editorial composition for the hero: a marked-up press release
 * proof, a story-angle card and a campaign tracker. It is an illustration of
 * the work, not a record of real coverage — every label is generic.
 */

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return (
    <span
      className={`block h-[5px] rounded-full bg-ink/12 ${className}`}
      style={{ width: w }}
    />
  );
}

const settle = (from: string, to: string, delay: string): CSSProperties =>
  ({
    "--settle-from": from,
    "--settle-to": to,
    animationDelay: delay,
  }) as CSSProperties;

export function HeroVisual() {
  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-[10/11] w-full max-w-[34rem] select-none lg:max-w-none"
    >
      {/* Registration marks, as on a printer's proof */}
      <span className="absolute left-0 top-0 h-5 w-px bg-line-strong" />
      <span className="absolute left-0 top-0 h-px w-5 bg-line-strong" />
      <span className="absolute bottom-0 right-0 h-5 w-px bg-line-strong" />
      <span className="absolute bottom-0 right-0 h-px w-5 bg-line-strong" />

      {/* Sheet 1 — the press release proof */}
      <div
        className="absolute left-[4%] top-[4%] h-[84%] w-[68%] animate-settle overflow-hidden border border-line bg-paper-raised p-[6.5%] shadow-[0_1px_0_rgba(25,24,22,0.04),0_24px_48px_-24px_rgba(25,24,22,0.18)]"
        style={settle("-3deg", "-1.5deg", "120ms")}
      >
        <div className="flex items-center justify-between border-b border-ink pb-2.5">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em]">
            Press Release
          </span>
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
            Proof 03
          </span>
        </div>
        <p className="mt-4 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-accent">
          For immediate release
        </p>
        <p className="display mt-2.5 text-[clamp(1.125rem,2.6vw,1.75rem)] leading-[1.08]">
          A clear headline that tells an editor{" "}
          <span className="relative whitespace-nowrap">
            why it matters
            <svg
              viewBox="0 0 120 8"
              preserveAspectRatio="none"
              className="absolute -bottom-1 left-0 h-1.5 w-full text-accent"
            >
              <path
                d="M1 5.5C20 2 38 6.5 60 4s40-2.5 59 1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          now
        </p>
        <div className="mt-5 hidden border-l-2 border-accent pl-3.5 sm:block">
          <p className="display text-[clamp(0.8125rem,1.5vw,1rem)] italic leading-snug text-ink-soft">
            &ldquo;A quote that sounds like a person, not a committee.&rdquo;
          </p>
        </div>
        <div className="mt-5 space-y-2">
          <Bar w="100%" />
          <Bar w="94%" />
          <Bar w="97%" />
          <Bar w="62%" />
        </div>
        <div className="mt-5 space-y-2">
          <Bar w="96%" />
          <Bar w="88%" />
          <Bar w="92%" />
          <Bar w="99%" />
          <Bar w="85%" />
          <Bar w="95%" />
          <Bar w="40%" />
        </div>
      </div>

      {/* Sheet 2 — story angles */}
      <div
        className="absolute bottom-[2%] left-0 w-[41%] animate-settle border border-line bg-paper p-[4.5%] shadow-[0_20px_40px_-22px_rgba(25,24,22,0.22)]"
        style={settle("-5deg", "-2.5deg", "440ms")}
      >
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-ink-faint">
          Story angles
        </p>
        <ol className="mt-3 space-y-2.5">
          {["The founder's why", "What the data shows", "Why this, why now"].map(
            (angle, i) => (
              <li
                key={angle}
                className="flex items-baseline gap-2.5 border-t border-line pt-2.5"
              >
                <span className="font-mono text-[0.5rem] text-accent">
                  0{i + 1}
                </span>
                <span className="display text-[clamp(0.8125rem,1.45vw,1.0625rem)] leading-tight">
                  {angle}
                </span>
              </li>
            ),
          )}
        </ol>
      </div>

      {/* Sheet 3 — campaign tracker */}
      <div
        className="absolute right-0 top-[53%] w-[57%] animate-settle overflow-hidden bg-ink p-[5%] text-paper shadow-[0_28px_48px_-24px_rgba(25,24,22,0.5)]"
        style={settle("3deg", "1.25deg", "280ms")}
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-paper/55">
            Campaign tracker
          </p>
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-paper/55">
            Illustrative
          </p>
        </div>
        <ul className="mt-3.5">
          {[
            ["Business daily", "Interview booked", true],
            ["Trade publication", "In conversation", false],
            ["Industry podcast", "Pitched", false],
            ["Regional press", "Drafting", false],
          ].map(([outlet, status, live]) => (
            <li
              key={outlet as string}
              className="flex items-center justify-between gap-3 border-t border-paper/15 py-2 text-[clamp(0.625rem,1.15vw,0.8125rem)]"
            >
              <span className="whitespace-nowrap">{outlet}</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap text-paper/60">
                <span
                  className={`size-1.5 rounded-full ${live ? "bg-[#e0795c]" : "bg-paper/30"}`}
                />
                {status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Editor's margin note */}
      <p
        className="display absolute right-0 top-[15%] hidden w-[22%] animate-settle text-[clamp(0.875rem,1.4vw,1.0625rem)] italic leading-snug text-accent sm:block"
        style={settle("6deg", "4deg", "620ms")}
      >
        Lead with the why.
        <svg
          viewBox="0 0 60 30"
          className="mt-2 h-6 w-12 -rotate-[165deg]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        >
          <path d="M3 26C14 24 38 20 54 5" />
          <path d="M44 4.5 54.5 4.5 53 15" />
        </svg>
      </p>
    </div>
  );
}
