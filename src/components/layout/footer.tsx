import Link from "next/link";
import { cacheLife } from "next/cache";
import { hasContactDetails, mainNav, site, socialLinks } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "./logo";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow !text-paper/50">{children}</h2>;
}

const linkClass =
  "text-[0.9375rem] text-paper/80 transition-colors duration-200 hover:text-paper";

export async function Footer() {
  const year = await currentYear();
  const { email, phone, address } = site.contact;

  return (
    <footer className="bg-ink text-paper">
      <div className="shell pb-10 pt-16 lg:pt-24">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverse />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-paper/70">
              {site.description}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <FooterHeading>Company</FooterHeading>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-5 space-y-3">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
                    {phone}
                  </a>
                </li>
              )}
              {address && (
                <li>
                  <address className="text-[0.9375rem] not-italic leading-relaxed text-paper/80">
                    {address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              )}
              <li>
                <Link href="/contact" className={linkClass}>
                  {hasContactDetails ? "Send an enquiry" : "Enquiry form"}
                </Link>
              </li>
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-8 text-sm text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName ?? site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="hover:text-paper">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-paper">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
