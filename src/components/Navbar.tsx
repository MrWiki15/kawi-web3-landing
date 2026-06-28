"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import kawiLogo from "@/assets/kawi-logo.png";
import { useT } from "@/contexts/LanguageContext";
import { DOCS_URL } from "@/lib/links";

const Navbar = () => {
  const t = useT();
  const navLinks = [
    { name: t.nav.services, href: "#servicios" },
    { name: t.nav.integrate, href: "#integrations" },
    { name: t.nav.values, href: "#valores" },
    { name: t.nav.mission, href: "#mision" },
    { name: t.nav.reviews, href: "#reviews" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaHref = DOCS_URL;
  const ctaLabel = t.nav.ctaSend;


  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-lg max-w-[1100px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <a href={DOCS_URL} className="flex items-center gap-2 group">
            <img
              src={kawiLogo}
              alt="Kawi BRL to USDC settlement engine"
              className={`object-contain transition-all duration-500 ${
                isScrolled ? "h-7 w-7" : "h-8 w-8 md:h-9 md:w-9"
              }`}
            />
            <span
              className={`font-bold font-display text-primary whitespace-nowrap transition-all duration-500 ${
                isScrolled ? "text-base" : "text-lg md:text-xl"
              }`}
            >
              Kawi
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={ctaHref}
              className={`hero-gradient text-primary-foreground rounded-full font-semibold transition-all duration-500 hover:opacity-90 shadow-md whitespace-nowrap ${
                isScrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
              }`}
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-card/95 backdrop-blur-xl z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={`flex pt-8 border-t border-border transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
            }}
          >
            <a
              href={ctaHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 hero-gradient text-primary-foreground rounded-full h-14 text-base font-semibold flex items-center justify-center shadow-md"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
