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
import { DOCS_URL } from "@/lib/links";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tarda en llegar el dinero a Cuba?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Las remesas con Kawi llegan en minutos. Una vez confirmado el pago, tu familiar en Cuba recibe el dinero de forma casi instantánea.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué métodos de pago aceptan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aceptamos transferencias bancarias (PIX) y otros métodos populares en Brasil. Contáctanos por WhatsApp para conocer todas las opciones disponibles.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es seguro enviar dinero con Kawi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, la seguridad es nuestra prioridad. Todas las transacciones están protegidas y verificadas. Puedes ver nuestras reseñas en Trustpilot donde miles de clientes confirman nuestra confiabilidad.",
      },
    },
    {
      "@type": "Question",
      name: "¿Tienen algún costo adicional o comisión?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Kawi somos transparentes con nuestros precios. La tasa que ves es la tasa que aplica, sin costos ocultos ni sorpresas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo enviar dinero a cualquier provincia de Cuba?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, nuestro servicio cubre toda Cuba. Tu familiar puede recibir el dinero sin importar en qué provincia se encuentre.",
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
        <title>
          Kawi Remesas - Envío de dinero de Brasil a Cuba | Mejor tasa
        </title>
        <meta
          name="description"
          content="Kawi Remesas: envía dinero de Brasil a Cuba con la mejor tasa de cambio. Remesas rápidas, tienda online para Cuba y asesoría de residencia para cubanos en Brasil."
        />
        <link rel="canonical" href={DOCS_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Kawi Remesas - Envío de dinero de Brasil a Cuba | Mejor tasa"
        />
        <meta
          property="og:description"
          content="Kawi Remesas: envía dinero de Brasil a Cuba con la mejor tasa de cambio. Remesas rápidas, tienda online para Cuba y asesoría de residencia para cubanos en Brasil."
        />
        <meta property="og:url" content={DOCS_URL} />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/8782c547-7494-4e70-a9b9-27422718f086"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kawi Remesas - Envío de dinero de Brasil a Cuba | Mejor tasa"
        />
        <meta
          name="twitter:description"
          content="Kawi Remesas: envía dinero de Brasil a Cuba con la mejor tasa de cambio. Remesas rápidas, tienda online para Cuba y asesoría de residencia para cubanos en Brasil."
        />
        <meta
          name="twitter:image"
          content="https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/8782c547-7494-4e70-a9b9-27422718f086"
        />
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
