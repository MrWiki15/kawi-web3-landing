"use client";

import { ArrowUpRight } from "lucide-react";
import kawiLogo from "@/assets/kawi-logo.png";
import { AnimatedWave } from "@/components/ui/animated-wave";
import { useT } from "@/contexts/LanguageContext";
import { isExternalUrl, parseUrl } from "@/lib/externalLinks";
import {
  ABOUT_URL,
  API_SERVICES_URL,
  BLOG_URL,
  COLLABORATIONS_MAILTO,
  COOKIES_URL,
  DOCS_URL,
  FACEBOOK_URL,
  MOBILE_APP_URL,
  PORTAL_URL,
  PRESENTATION_URL,
  SOLANA_FOUNDATION_URL,
  TRUSTPILOT_URL,
  TWITTER_URL,
  WEB_APP_URL,
  WHATSAPP_1_URL,
  WHATSAPP_2_URL,
  WHATSAPP_3_URL,
  WHATSAPP_4_URL,
  WIDGETS_URL,
} from "@/lib/links";

type FooterLink = { name: string; href: string; badge?: string };

/** External destinations always open in a new tab, never replacing Kawi. */
const anchorProps = (href: string) => {
  const url = parseUrl(href);
  if (!url || !isExternalUrl(url)) return {};
  return { target: "_blank", rel: "noopener noreferrer" } as const;
};

const Footer = () => {
  const t = useT();

  const navigationLinks: FooterLink[] = [
    { name: t.footer.nav.webApp, href: WEB_APP_URL },
    { name: t.footer.nav.mobile, href: MOBILE_APP_URL },
    { name: t.footer.nav.widgets, href: WIDGETS_URL },
    { name: t.footer.nav.api, href: API_SERVICES_URL },
    { name: t.footer.nav.docs, href: DOCS_URL },
    { name: t.footer.nav.presentation, href: PRESENTATION_URL },
    { name: t.footer.nav.about, href: ABOUT_URL },
    { name: t.footer.nav.blog, href: BLOG_URL },
  ];

  const communityLinks: FooterLink[] = [
    { name: t.footer.communityLinks.blog, href: BLOG_URL },
    { name: "Twitter", href: TWITTER_URL },
    { name: "Facebook", href: FACEBOOK_URL },
    { name: "Trustpilot", href: TRUSTPILOT_URL },
    { name: t.footer.communityLinks.whatsapp1, href: WHATSAPP_1_URL },
    { name: t.footer.communityLinks.whatsapp2, href: WHATSAPP_2_URL },
    { name: t.footer.communityLinks.whatsapp3, href: WHATSAPP_3_URL },
    { name: t.footer.communityLinks.whatsapp4, href: WHATSAPP_4_URL },
    {
      name: t.footer.communityLinks.solana,
      href: SOLANA_FOUNDATION_URL,
      badge: t.footer.communityLinks.accelerated,
    },
  ];

  // Every buy entry lands on the Kawi portal, where the operation is completed.
  const buyLinks: FooterLink[] = [
    { name: t.footer.buyLinks.bitcoin, href: PORTAL_URL },
    { name: t.footer.buyLinks.solana, href: PORTAL_URL },
    { name: t.footer.buyLinks.usdc, href: PORTAL_URL },
    { name: t.footer.buyLinks.brl, href: PORTAL_URL },
    { name: t.footer.buyLinks.usd, href: PORTAL_URL },
  ];

  const legalLinks: FooterLink[] = [
    { name: t.footer.legalLinks.privacy, href: "/privacy" },
    { name: t.footer.legalLinks.cookies, href: COOKIES_URL },
    { name: t.footer.legalLinks.regulation, href: "/regulation" },
    { name: t.footer.legalLinks.collabs, href: COLLABORATIONS_MAILTO },
    { name: t.footer.legalLinks.deleteAccount, href: "/account-deletion" },
    { name: t.footer.legalLinks.deleteData, href: "/data-deletion" },
  ];

  const renderLink = (link: FooterLink) => (
    <a
      href={link.href}
      {...anchorProps(link.href)}
      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-2 group"
    >
      {link.name}
      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      {link.badge && (
        <span className="text-[10px] px-2 py-0.5 bg-primary-foreground text-foreground rounded-full font-semibold">
          {link.badge}
        </span>
      )}
    </a>
  );

  const columns: Array<{ title: string; links: FooterLink[] }> = [
    { title: t.footer.navigation, links: navigationLinks },
    { title: t.footer.community, links: communityLinks },
    { title: t.footer.buy, links: buyLinks },
    { title: t.footer.legal, links: legalLinks },
  ];

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Marca */}
            <div className="col-span-2">
              <a
                href={WEB_APP_URL}
                {...anchorProps(WEB_APP_URL)}
                className="inline-flex items-center gap-3 mb-6"
              >
                <img src={kawiLogo} alt="Kawi BRL to USDC settlement engine" className="h-10 w-10 object-contain" />
                <span className="text-2xl font-display font-bold">Kawi</span>
              </a>
              <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-xs">{t.footer.description}</p>
              <div className="flex gap-6">
                <a
                  href={TWITTER_URL}
                  {...anchorProps(TWITTER_URL)}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group"
                >
                  Twitter
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  {...anchorProps(FACEBOOK_URL)}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-1 group"
                >
                  Facebook
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium mb-6 text-primary-foreground">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.name}`}>{renderLink(link)}</li>
                  ))}
                </ul>
              </div>
            ))}
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
