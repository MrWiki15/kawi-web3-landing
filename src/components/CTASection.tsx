"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedTetrahedron } from "./ui/animated-tetrahedron";
import { useT } from "@/contexts/LanguageContext";
import { API_SERVICES_URL, WIDGETS_URL } from "@/lib/links";

const CTASection = () => {
  const t = useT();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const ctaHref = WIDGETS_URL;
  const ctaLabel = t.cta.ctaStart;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 -mt-20 lg:py-32 overflow-hidden bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground/10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(
                600px circle at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(var(--primary), 0.15),
                transparent 40%
              )`,
            }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-8">
                  <span className="text-xs font-semibold text-primary">
                    {t.cta.badge}
                  </span>
                </div>

                <h2 className="text-4xl lg:text-7xl font-display tracking-tight mb-8 leading-[0.95] text-foreground">
                  {t.cta.titleLine1}
                  <br />
                  <span className="text-secondary">{t.cta.titleLine2}</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  {t.cta.description}
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full font-semibold inline-flex items-center justify-center group shadow-lg shadow-primary/30 transition-all"
                  >
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>

                  <a
                    href={API_SERVICES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-foreground/20 text-foreground px-8 h-14 text-base rounded-full font-semibold inline-flex items-center justify-center hover:bg-foreground/5 transition-colors"
                  >
                    {t.cta.ctaDocs}
                  </a>
                </div>

                <p className="text-sm text-muted-foreground mt-8 font-mono">
                  {t.cta.badgeLine}
                </p>
              </div>

              {/* Right animation */}
              <div className="hidden lg:flex items-center justify-center w-[500px] h-[500px] -mr-16">
                <AnimatedTetrahedron />
              </div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
