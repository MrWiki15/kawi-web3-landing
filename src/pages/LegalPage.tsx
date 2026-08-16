import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { COMPANY_EMAIL } from "@/lib/links";

type LegalPageKind = "privacy" | "regulation" | "account-deletion" | "data-deletion";

type LegalPageContent = {
  title: string;
  eyebrow: string;
  description: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

const content: Record<LegalPageKind, LegalPageContent> = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy",
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
    title: "Regulation and Cuba Expansion",
    description:
      "Kawi is proud to operate with a license and special permission to work with cryptocurrency infrastructure in Cuba.",
    sections: [
      {
        title: "A private banking milestone",
        body: [
          "Kawi is proud to be the first private bank of the Republic of Cuba with a license and special permission already granted to operate with cryptocurrencies inside the country.",
          "This milestone gives us the responsibility to build financial infrastructure with discipline, transparency and a long-term commitment to real adoption.",
        ],
      },
      {
        title: "Decentralized solutions for all Cuba",
        body: [
          "Our mission is to bring decentralized financial solutions across Cuba, connecting local needs with modern settlement rails that can move value faster and with better traceability.",
          "Kawi's hybrid settlement engine is the source of that path: fiat access where users already are, blockchain settlement where speed, programmability and transparency matter most.",
        ],
      },
      {
        title: "Education and Latam adoption",
        body: [
          "We are already speaking with the Universidad de Oriente in Santiago de Cuba to create an inauguration event that introduces this infrastructure to students, builders, institutions and the broader community.",
          "Cuba can become a meaningful starting point for broader adoption across Latam by showing how hybrid settlement, responsible crypto operations and local education can work together.",
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
  "data-deletion": {
    eyebrow: "Legal",
    title: "Data Deletion",
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

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{page.title} | Kawi</title>
          <meta name="description" content={page.description} />
        </Helmet>
        <Navbar />
        <main className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-secondary" />
              {page.eyebrow}
            </span>
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
    </LanguageProvider>
  );
}
