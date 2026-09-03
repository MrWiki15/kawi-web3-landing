import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InfrastructureSection from "@/components/RemittanceSection";
import KawiIntegrationsSection from "@/components/StoreSection";
import RaaS from "@/components/RaaS";
import KawiExpansionSection from "@/components/PackageSection";
import IntegrationsSection from "@/components/ValuesSection";
import TestimonialsSection from "@/components/TrustpilotSection";
import CTASection from "@/components/CTASection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useRedirectReturningUser } from "@/components/CompletedRemittanceModal";
import Seo from "@/components/Seo";
import { homeMeta } from "@/lib/routeMeta";

const Index = () => {
  useRedirectReturningUser();

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={homeMeta.title}
        description={homeMeta.description}
        path="/"
        keywords={homeMeta.keywords}
        jsonLd={homeMeta.jsonLd}
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
        <FaqSection />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;
