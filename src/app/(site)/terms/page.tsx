import Link from "next/link";
import { LegalContact, LegalPage } from "@/components/legal-page";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms that apply to your use of the ${site.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  const entity = site.legalName ?? site.name;

  return (
    <LegalPage title="Terms & Conditions">
      <h2>1. About these terms</h2>
      <p>
        These terms apply to your use of this website, which is operated by{" "}
        {entity} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
        By using the website you agree to them. If you do not agree, please do
        not use the website.
      </p>

      <h2>2. Information on this website</h2>
      <p>
        The content on this website is provided for general information about
        our services. It is not professional advice and should not be relied on
        as such. We aim to keep the content accurate and current but do not
        guarantee that it is complete or free from error.
      </p>

      <h2>3. Our services</h2>
      <p>
        Descriptions of services on this website are not an offer capable of
        acceptance. Any engagement is governed by a separate written agreement
        between you and us, which sets out the scope, deliverables, fees and
        terms for that work.
      </p>
      <p>
        Public relations outcomes depend on the independent editorial decisions
        of journalists, editors and publications. Nothing on this website is a
        guarantee of media coverage, of coverage in any particular publication,
        or of any specific commercial result.
      </p>

      <h2>4. Enquiries</h2>
      <p>
        When you submit an enquiry you confirm that the information you provide
        is accurate and that you are entitled to share it. Submitting an
        enquiry does not create a client relationship. We handle the personal
        information you send in line with our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the website for any unlawful purpose;</li>
        <li>submit false, misleading or automated enquiries;</li>
        <li>attempt to gain unauthorised access to the website or its systems;</li>
        <li>interfere with the proper working of the website.</li>
      </ul>

      <h2>6. Intellectual property</h2>
      <p>
        Unless stated otherwise, the content, design and branding of this
        website belong to {site.name}. You may view and share pages for your
        own reference. You may not reproduce or republish the content for
        commercial purposes without our written permission.
      </p>

      <h2>7. Third-party links</h2>
      <p>
        The website may contain links to websites operated by others. We are not
        responsible for their content or practices.
      </p>

      <h2>8. Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for any loss or damage
        arising from your use of, or reliance on, this website. Nothing in these
        terms excludes liability that cannot be excluded under applicable law.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of India.
        {site.legal.jurisdiction &&
          ` The courts of ${site.legal.jurisdiction} have exclusive jurisdiction over any dispute arising from them.`}
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may revise these terms from time to time. The date at the top of the
        page shows when they were last updated, and continued use of the website
        means you accept the revised terms.
      </p>

      <h2>11. Contact</h2>
      <p>If you have questions about these terms:</p>
      <LegalContact />
    </LegalPage>
  );
}
