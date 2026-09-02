import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo, { breadcrumbJsonLd, organizationJsonLd } from "@/components/Seo";
import { COMPANY_EMAIL } from "@/lib/links";

type LegalPageKind =
  | "privacy"
  | "regulation"
  | "account-deletion"
  | "data-deletion"
  | "cookies";

type LegalPageContent = {
  title: string;
  eyebrow: string;
  description: string;
  seoTitle?: string;
  keywords?: string[];
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

const content: Record<LegalPageKind, LegalPageContent> = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy",
    seoTitle: "Privacy Policy",
    keywords: ["Kawi privacy policy", "payment data privacy", "personal data settlement"],
    description:
      "Kawi protects user privacy and does not collect personal information without requesting authorization first.",
    sections: [
      {
        title: "User authorization first",
        body: [
          "Kawi does not collect personal information from users without first asking for clear authorization. When a product flow requires identity, contact, payment, compliance or support data, the request is shown in context so the user understands why the information is needed.",
          "We only request the data required to provide the selected service, operate the account, complete a transaction, prevent fraud, comply with applicable obligations or respond to a direct support request.",
        ],
      },
      {
        title: "Operational data",
        body: [
          "Kawi may process transaction status, timestamps, network references, provider responses and similar operational records to keep payments, settlements, remittances, widgets and API services working correctly.",
          "Access to operational records is limited to authorized team members and systems that need it to operate, secure or support the platform.",
        ],
      },
      {
        title: "User control",
        body: [
          `Users can contact ${COMPANY_EMAIL} to ask about privacy, access requests or deletion requests related to their account or data.`,
        ],
      },
    ],
  },
  regulation: {
    eyebrow: "Regulation",
    title: "Regulation and Compliance",
    seoTitle: "Regulation and Compliance: Regulated in Brazil",
    keywords: [
      "Kawi regulation",
      "regulated payments Brazil",
      "digital asset regulatory framework",
      "compliant stablecoin settlement",
    ],
    description:
      "Kawi is a regulated company in Brazil and is actively strengthening its regulatory framework for digital assets.",
    sections: [
      {
        title: "Regulated in Brazil",
        body: [
          "Kawi is a regulated company in Brazil. Our operations run inside the Brazilian financial and payments framework, which is where the settlement engine handles local capture, conversion and payout.",
          "Operating under Brazilian regulation shapes how the product is built: identity and onboarding checks, transaction monitoring, record keeping and reporting are part of the engine itself rather than a layer added at the end.",
        ],
      },
      {
        title: "Strengthening our digital asset framework",
        body: [
          "We are in the process of expanding and strengthening our regulatory framework for digital assets, so that the stablecoin and blockchain side of the engine is covered by the same standard of authorization, controls and supervision as the fiat side.",
          "This work is ongoing and deliberate. We prefer to advance the regulatory perimeter before scaling a capability rather than after, because infrastructure that cannot be supervised cannot be trusted with other people's money.",
        ],
      },
      {
        title: "Compliance built into the engine",
        body: [
          "Every operation carries a single identifier from the first quote to the final payout, and each leg attaches its own record: bank references, conversion details and on-chain signatures.",
          "That structure is what makes an operation auditable. It can be reconstructed, reconciled and reviewed without depending on anyone's memory, and the on-chain leg can be verified independently by a third party.",
        ],
      },
      {
        title: "Expansion across Latin America",
        body: [
          "Brazil is our live corridor and the base from which the engine expands. Additional Latin American corridors are in testing, and each one is opened only when the local regulatory and operational requirements are met.",
          "The same principle applies everywhere we go: local rails where users already are, blockchain settlement where speed and traceability matter, and a compliance perimeter defined before volume arrives.",
        ],
      },
      {
        title: "Investors and accelerators",
        body: [
          `Any investor or accelerator that wants to help Kawi fulfill its mission can contact us at ${COMPANY_EMAIL}. We will privately send the company documents needed to verify us.`,
        ],
      },
    ],
  },
  "account-deletion": {
    eyebrow: "Legal",
    title: "Account Deletion",
    seoTitle: "Account Deletion Requests",
    keywords: ["delete Kawi account", "account deletion request"],
    description:
      "Users can request account deletion and Kawi will guide the process according to security, compliance and operational requirements.",
    sections: [
      {
        title: "How to request deletion",
        body: [
          `To request account deletion, email ${COMPANY_EMAIL} from the email address associated with your Kawi account and include the subject "Account deletion request".`,
          "We may ask for verification before deleting an account so that no one can delete an account without authorization.",
        ],
      },
      {
        title: "What deletion means",
        body: [
          "After verification, Kawi will disable or remove the account information that is no longer required to provide services.",
          "Some transaction, accounting, security or compliance records may need to be retained when required by law, fraud prevention, dispute handling or financial audit obligations.",
        ],
      },
      {
        title: "Timing",
        body: [
          "We aim to process valid account deletion requests as quickly as possible once identity and ownership are confirmed.",
        ],
      },
    ],
  },
  cookies: {
    eyebrow: "Legal",
    title: "Cookies Policy",
    seoTitle: "Cookies Policy",
    keywords: ["Kawi cookies policy", "cookie consent", "browser storage policy"],
    description:
      "Kawi uses cookies and browser storage to keep the site working, remember your preferences and understand how the platform is used.",
    sections: [
      {
        title: "What cookies are",
        body: [
          "Cookies are small files a site stores in your browser. Together with similar technologies such as localStorage and sessionStorage, they let a site recognise your browser between visits and keep information that would otherwise be lost when the page reloads.",
          "By continuing to browse Kawi after accepting the cookie notice, you agree to the use described on this page. If you decline the notice, the page is reloaded and the notice is shown again, because the site is not designed to run without this storage.",
        ],
      },
      {
        title: "Essential cookies and storage",
        body: [
          "These are required for the site to work and cannot be switched off from inside the page. They keep your session safe, protect forms against abuse, remember that you already answered the cookie notice and let the settlement flows complete without losing state.",
          "Kawi stores the following keys in your browser: `kawi:cookies-consent` (your answer to the cookie notice), `kawi:lang` (the language you chose) and `kawi:lang:suggestion-dismissed` (whether the language suggestion was already shown).",
        ],
      },
      {
        title: "Preference cookies",
        body: [
          "Preference storage remembers choices such as the interface language detected from your timezone or browser, so the site does not ask again on every visit.",
          "This information stays in your browser and is not used to build advertising profiles.",
        ],
      },
      {
        title: "Analytics and performance",
        body: [
          "Kawi may use aggregated analytics to understand which sections are visited, how the site performs and where users find friction. These measurements are used to improve the product and the infrastructure documentation.",
          "Analytics data is treated in an aggregated way and is not used to identify individual visitors.",
        ],
      },
      {
        title: "Third party destinations",
        body: [
          "Some links take you to services that are not operated by Kawi, such as WhatsApp, X, Facebook, Trustpilot or the Google Play Store. Before leaving Kawi, the site shows a confirmation with the exact destination address.",
          "Once you continue, the destination site applies its own cookie and privacy policy. Kawi does not control the cookies those services set.",
        ],
      },
      {
        title: "Managing cookies",
        body: [
          "You can delete or block cookies and site storage from your browser settings at any time. Removing the stored keys makes the cookie notice appear again on your next visit.",
          "Blocking essential storage may break parts of the site, such as keeping the selected language or completing an operation.",
        ],
      },
      {
        title: "Contact",
        body: [
          `If you have questions about this Cookies Policy, or want to know exactly what is stored about your browsing, write to ${COMPANY_EMAIL}.`,
        ],
      },
    ],
  },
  "data-deletion": {
    eyebrow: "Legal",
    title: "Data Deletion",
    seoTitle: "Data Deletion Requests",
    keywords: ["delete personal data Kawi", "data deletion request"],
    description:
      "Users can request deletion of personal data that Kawi no longer needs to provide, secure or legally maintain the service.",
    sections: [
      {
        title: "How to request data deletion",
        body: [
          `To request data deletion, contact ${COMPANY_EMAIL} and describe the data you want deleted. If the request relates to an account, use the email attached to that account.`,
          "Kawi will review the request and may ask for extra verification before changing or deleting personal data.",
        ],
      },
      {
        title: "Data we may retain",
        body: [
          "Some data may be retained when it is required for transaction records, security, fraud prevention, compliance, accounting, dispute resolution or legal obligations.",
          "When full deletion is not possible, Kawi will limit use of retained data to the reason it must be kept.",
        ],
      },
      {
        title: "Service data",
        body: [
          "Operational records such as transaction status, timestamps, settlement references and provider confirmations may remain in the system when needed to preserve financial integrity and auditability.",
        ],
      },
    ],
  },
};

export default function LegalPage({ kind }: { kind: LegalPageKind }) {
  const page = content[kind];
  const path = `/${kind}`;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${page.seoTitle ?? page.title} | Kawi`}
        description={page.description}
        path={path}
        keywords={page.keywords}
        jsonLd={[
          organizationJsonLd,
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page.title,
            description: page.description,
            publisher: { "@id": "https://kawiservices.com.br/#organization" },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.title, path },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{page.eyebrow}</li>
            </ol>
          </nav>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            {page.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-14">
            {page.description}
          </p>

          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.title} className="border-t border-foreground/10 pt-8">
                <h2 className="text-2xl lg:text-3xl font-display mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
