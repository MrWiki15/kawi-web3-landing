"use client";

import { ArrowUpRight } from "lucide-react";
import kawiLogo from "@/assets/kawi-logo.png";
import { AnimatedWave } from "@/components/ui/animated-wave";
import { useT } from "@/contexts/LanguageContext";
import { DOCS_URL } from "@/lib/links";

const Footer = () => {
  const t = useT();

  const navigationLinks = [
    { name: t.footer.nav.webApp, href: DOCS_URL },
    { name: t.footer.nav.mobile, href: DOCS_URL },
    { name: t.footer.nav.widgets, href: DOCS_URL },
    { name: t.footer.nav.api, href: DOCS_URL },
    { name: t.footer.nav.docs, href: DOCS_URL },
    {
      name: t.footer.nav.presentation,
      href: DOCS_URL,
    },
  ];

  const communityLinks = [
    { name: t.footer.communityLinks.blog, href: DOCS_URL },
    {
      name: t.footer.communityLinks.whatsapp1,
      href: DOCS_URL,
    },
    {
      name: t.footer.communityLinks.whatsapp2,
      href: DOCS_URL,
    },
    {
      name: t.footer.communityLinks.solana,
      href: DOCS_URL,
      badge: t.footer.communityLinks.accelerated,
    },
  ];

  const legalLinks = [
    { name: t.footer.legalLinks.privacy, href: DOCS_URL },
    { name: t.footer.legalLinks.regulation, href: DOCS_URL },
    { name: t.footer.legalLinks.collabs, href: DOCS_URL },
    { name: t.footer.legalLinks.deleteAccount, href: DOCS_URL },
    { name: t.footer.legalLinks.deleteData, href: DOCS_URL },
  ];

  const renderLink = (link: { name: string; href: string; badge?: string }) => {
    const commonClasses =
      "text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-2";

    return (
      <a href={link.href} className={`${commonClasses} group`}>
        {link.name}
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        {link.badge && (
          <span className="text-[10px] px-2 py-0.5 bg-primary-foreground text-foreground rounded-full font-semibold">
            {link.badge}
          </span>
        )}
      </a>
    );
  };

  return (
    <footer className="relative border-t border-primary-foreground/10 bg-foreground text-primary-foreground overflow-hidden">
      {/* Patrón de líneas diagonales */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              currentColor 40px,
              currentColor 41px
            )`,
          }}
        />
      </div>

      {/* Fondo animado con ondas */}
      <div className="absolute inset-0 h-full opacity-20 pointer-events-none ">
        <AnimatedWave />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Marca */}
            <div className="col-span-2">
              <a href={DOCS_URL} className="inline-flex items-center gap-3 mb-6">
                <img src={kawiLogo} alt="Kawi Remesas" className="h-10 w-10 object-contain" />
                <span className="text-2xl font-display font-bold">Kawi</span>
              </a>
              <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-xs">{t.footer.description}</p>
              <div className="flex gap-6">
                <a
                  href={DOCS_URL}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group"
                >
                  Twitter
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
                <a
                  href={DOCS_URL}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group"
                >
                  Facebook
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Navegación */}
            <div>
              <h3 className="text-sm font-medium mb-6 text-primary-foreground">{t.footer.navigation}</h3>
              <ul className="space-y-4">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comunidad */}
            <div>
              <h3 className="text-sm font-medium mb-6 text-primary-foreground">{t.footer.community}</h3>
              <ul className="space-y-4">
                {communityLinks.map((link) => (
                  <li key={link.name}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-medium mb-6 text-primary-foreground">{t.footer.legal}</h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="py-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Kawi Services. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.footer.active}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
