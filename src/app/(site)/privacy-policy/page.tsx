import { LegalContact, LegalPage } from "@/components/legal-page";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const entity = site.legalName ?? site.name;

  return (
    <LegalPage title="Privacy Policy">
      <h2>1. Who we are</h2>
      <p>
        This website is operated by {entity} (&ldquo;{site.name}&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy explains what personal
        information we collect through this website, why we collect it, and the
        choices you have.
      </p>

      <h2>2. Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you submit the enquiry
        form we collect your name, work email address, company name, website
        (if provided), industry, the service you are interested in, your
        approximate budget, your project description, your preferred contact
        method and, if you provide it, your phone number.
      </p>
      <p>
        <strong>Information collected automatically.</strong> When an enquiry is
        submitted we record the time, the page it was sent from, and a
        one-way hashed form of the sender&rsquo;s IP address. The hash is used
        only to prevent spam and abuse of the form; we do not store the IP
        address itself with your enquiry.
      </p>
      <p>
        This website does not use advertising or cross-site tracking cookies.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and discuss our services with you.</li>
        <li>To prepare a proposal if you ask us for one.</li>
        <li>To keep a record of our correspondence with you.</li>
        <li>To protect the website and the enquiry form against misuse.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not add you to a
        marketing list because you submitted an enquiry.
      </p>

      <h2>4. Why we are permitted to use it</h2>
      <p>
        We process enquiry information on the basis of the consent you give
        when you submit the form, and in order to take steps at your request
        before entering into an agreement with you. You may withdraw your
        consent at any time by contacting us.
      </p>

      <h2>5. Who we share it with</h2>
      <p>
        Your information is accessible to the people at {site.name} who handle
        enquiries. We use trusted service providers to host this website and
        store enquiry data; they process information only on our instructions.
      </p>
      <p>
        If you become a client, delivering a campaign may involve specialist PR
        and media partners. We share only what a partner needs for the agreed
        work, and only once an engagement with you is in place.
      </p>
      <p>
        We may disclose information where the law requires us to do so.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep enquiry information for as long as needed to respond to you and
        to maintain a reasonable record of our correspondence, after which it is
        deleted. You can ask us to delete it sooner.
      </p>

      <h2>7. How we protect it</h2>
      <p>
        Enquiries are transmitted over an encrypted connection and stored in a
        database with restricted access. No method of transmission or storage is
        completely secure, but we take reasonable technical and organisational
        measures to protect your information.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Subject to applicable law, including India&rsquo;s Digital Personal Data
        Protection Act, 2023 where it applies, you may ask us to:
      </p>
      <ul>
        <li>confirm what personal information we hold about you;</li>
        <li>correct information that is inaccurate or incomplete;</li>
        <li>delete your information;</li>
        <li>stop using your information, by withdrawing your consent.</li>
      </ul>

      <h2>9. Links to other websites</h2>
      <p>
        This website may link to third-party websites, such as a booking
        service or our social media profiles. Their handling of your
        information is governed by their own privacy policies.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of the
        page shows when it was last revised.
      </p>

      <h2>11. Contact us</h2>
      <p>For questions about this policy or to exercise your rights:</p>
      <LegalContact />
    </LegalPage>
  );
}
