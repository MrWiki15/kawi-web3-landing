"use client";

import { useEffect, useState, useRef } from "react";
import { useT } from "@/contexts/LanguageContext";

export default function KawiExpansionSection() {
  const t = useT();
  const countries = t.expansion.countries;
  const [isVisible, setIsVisible] = useState(false);
  const [activeCountry, setActiveCountry] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCountry((prev) => (prev + 1) % countries.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [countries.length]);

  return (
    <section
      id="expansion"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-secondary" />
              {t.expansion.eyebrow}
            </span>

            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              {t.expansion.titleStart}{" "}
              <b className="text-secondary">{t.expansion.titleEm}</b>{" "}
              {t.expansion.titleEnd}
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              {t.expansion.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {t.expansion.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl lg:text-5xl font-display mb-2">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">
                  {t.expansion.corridors}
                </span>

                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {t.expansion.expanding}
                </span>
              </div>

              {/* Countries */}
              <div>
                {countries.map((country, index) => (
                  <div
                    key={country.country}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeCountry === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeCountry === index
                            ? "bg-foreground"
                            : "bg-foreground/20"
                        }`}
                      />

                      <div>
                        <div className="font-medium">{country.country}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.region}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-sm ${
                        country.status === "Live"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {country.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
