import { Helmet } from "react-helmet-async";
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
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageDetectModal from "@/components/LanguageDetectModal";
import { WEB_APP_URL } from "@/lib/links";

const seoTitle = "Kawi | Motor de liquidacion hibrida BRL a USDC";
const seoDescription =
  "Kawi automatiza la liquidacion BRL -> USDC con un motor hibrido fiat-blockchain, programable por API para convertir pagos locales en liquidez stablecoin.";
const seoKeywords =
  "BRL a USDC, motor de liquidacion hibrida, liquidacion programable, fiat to stablecoin, API BRL USDC, stablecoin settlement, Pix to USDC, Kawi";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Kawi BRL to USDC Settlement Engine",
  url: WEB_APP_URL,
  serviceType: "Hybrid fiat-blockchain settlement engine",
  description:
    "Kawi provides a programmable hybrid settlement engine for automatically liquidating BRL into USDC through fiat and blockchain infrastructure.",
  provider: {
    "@type": "Organization",
    name: "Kawi",
    url: WEB_APP_URL,
  },
  areaServed: ["BR", "Global"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Que hace el motor de liquidacion hibrida de Kawi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kawi conecta infraestructura fiat y blockchain para automatizar la liquidacion de pagos en BRL hacia liquidez en USDC.",
      },
    },
    {
      "@type": "Question",
      name: "Que corredor de liquidacion destaca Kawi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La landing se enfoca en la liquidacion BRL -> USDC, pensada para convertir pagos locales en Brasil en stablecoin de forma automatica.",
      },
    },
    {
      "@type": "Question",
      name: "Se puede integrar por API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si. Kawi esta pensado como infraestructura programable para que productos, plataformas y operaciones financieras puedan iniciar y monitorear liquidaciones BRL -> USDC.",
      },
    },
    {
      "@type": "Question",
      name: "Por que usar USDC como activo de liquidacion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "USDC permite representar liquidez digital en una stablecoin ampliamente utilizada, facilitando operaciones programables, trazables y conectadas a infraestructura blockchain.",
      },
    },
    {
      "@type": "Question",
      name: "Que significa liquidacion automatica y programable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Significa que el flujo de entrada en BRL, conversion y salida en USDC puede coordinarse mediante reglas, API y eventos operativos sin depender de procesos manuales en cada paso.",
      },
    },
  ],
};

const Index = () => {
  useRedirectReturningUser();

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <LanguageDetectModal />
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={seoKeywords} />
          <link rel="canonical" href={WEB_APP_URL} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:url" content={WEB_APP_URL} />
          <meta property="og:image" content="/logo512.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
          <meta name="twitter:image" content="/logo512.png" />
          <script type="application/ld+json">
            {JSON.stringify(serviceJsonLd)}
          </script>
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        </Helmet>
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
    </LanguageProvider>
  );
};

export default Index;
