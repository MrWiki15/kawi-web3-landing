import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InfrastructureSection from "@/components/RemittanceSection";
import KawiIntegrationsSection from "@/components/StoreSection";
import RaaS from "@/components/RaaS";
import KawiExpansionSection from "@/components/PackageSection";
import IntegrationsSection from "@/components/ValuesSection";
import TestimonialsSection from "@/components/TrustpilotSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useRedirectReturningUser } from "@/components/CompletedRemittanceModal";
import Seo, { organizationJsonLd, websiteJsonLd } from "@/components/Seo";
import { SITE_URL } from "@/lib/links";

const seoTitle =
  "Kawi | Hybrid BRL to USDC Settlement Engine for Latin America";
const seoDescription =
  "Kawi runs a hybrid settlement engine: PIX and local fiat rails for access, Solana and USDC for movement, in one programmable, auditable operation.";
const seoKeywords = [
  "BRL to USDC",
  "hybrid settlement engine",
  "programmable settlement",
  "fiat to stablecoin",
  "PIX to USDC",
  "stablecoin settlement Brazil",
  "cross-border payments latam",
  "motor de liquidacion hibrida",
  "liquidacao BRL USDC",
  "Kawi",
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "Kawi BRL to USDC Settlement Engine",
  url: SITE_URL,
  serviceType: "Hybrid fiat-blockchain settlement engine",
  description:
    "Kawi provides a programmable hybrid settlement engine that turns local BRL payments into USDC liquidity using fiat and blockchain infrastructure.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["BR", "Latin America"],
  audience: {
    "@type": "Audience",
    audienceType: "Platforms, marketplaces and remittance operators",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Kawi's hybrid settlement engine do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kawi connects fiat and blockchain infrastructure to automate the settlement of BRL payments into USDC liquidity, coordinating capture, conversion, on-chain settlement and delivery as a single auditable operation.",
      },
    },
    {
      "@type": "Question",
      name: "Which settlement corridor is live today?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brazil is Kawi's live corridor, focused on turning local PIX and bank payments into USDC. Additional Latin American corridors are in testing.",
      },
    },
    {
      "@type": "Question",
      name: "Is Kawi regulated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kawi is a regulated company in Brazil and is in the process of strengthening its regulatory framework for digital assets, so the stablecoin side of the engine is covered by the same standard of authorization and supervision as the fiat side.",
      },
    },
    {
      "@type": "Question",
      name: "Can Kawi be integrated through an API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Kawi is programmable infrastructure: platforms can start, monitor and reconcile BRL to USDC settlements through the API, or embed the widget directly in their product.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Kawi settle on Solana with USDC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The blockchain leg needs fast confirmation, fees low enough not to distort small tickets, and deep stablecoin liquidity. Solana with native USDC satisfies all three, which keeps end-to-end settlement close to one minute.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a settlement take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical end-to-end settlement is around one minute, with the fiat legs rather than the blockchain leg accounting for most of that time.",
      },
    },
  ],
};

const Index = () => {
  useRedirectReturningUser();

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/"
        keywords={seoKeywords}
        jsonLd={[organizationJsonLd, websiteJsonLd, serviceJsonLd, faqJsonLd]}
      />
      <Navbar />
      <HeroSection />
      <ScrollReveal>
        <InfrastructureSection />
      </ScrollReveal>
      <ScrollReveal>
        <KawiIntegrationsSection />
      </ScrollReveal>
      <ScrollReveal>
        <KawiExpansionSection />
      </ScrollReveal>
      <ScrollReveal>
        <RaaS />
      </ScrollReveal>
      <ScrollReveal>
        <IntegrationsSection />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;
