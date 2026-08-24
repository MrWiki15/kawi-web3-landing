"use client";

import { useEffect, useRef, useState } from "react";
import "@lottiefiles/dotlottie-wc";
import { useT } from "@/contexts/LanguageContext";
import { API_SERVICES_URL } from "@/lib/links";

const InfrastructureSection = () => {
  const t = useT();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const animations = [
    "https://lottie.host/38c94920-6bfa-4117-908b-77f60d3b2009/ISjj4ODzTy.lottie",
    "https://lottie.host/9ececa27-45c2-4829-b61e-724334ba6505/BSpiZixPTA.lottie",
    "https://lottie.host/a4731cc6-1684-4a3c-b22b-70f06ce80a74/AvHWHE7slm.lottie",
    "https://lottie.host/5e5be026-af93-433f-bd8e-15b646878e83/iSM7VYA0e2.lottie",
    "https://lottie.host/7f2a813a-5d8e-4864-b3fa-21e09696041c/DV3jPcHpRN.lottie",
  ];

  const items = t.infra.items.map((it, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    animation: animations[idx],
    title: it.title,
    desc: it.desc,
    tag: it.tag,
    cta: it.cta,
    href: API_SERVICES_URL,
  }));


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

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-secondary" />
            {t.infra.eyebrow}
          </span>

          <div className="flex sm:w-[50%] w-[80%]">
            <h2
              className={`text-3xl sm:text-3xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {t.infra.titleStart}{" "}
              <span className="text-secondary">{t.infra.titleEnd}</span>
            </h2>
          </div>

          <p
            className={`mt-6 text-lg text-muted-foreground max-w-2xl transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {t.infra.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div>
          {items.map((item, index) => (
            <InfrastructureCard key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

function InfrastructureCard({
  item,
  index,
}: {
  item: {
    number: string;
    animation: string;
    title: string;
    desc: string;
    tag?: string;
    cta: string;
    href: string;
  };
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const DotLottie = "dotlottie-wc" as any;

  return (
    <div
      ref={cardRef}
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        {/* Number + Tag */}
        <div className="shrink-0 flex items-start gap-4">
          <span className="font-mono text-sm text-muted-foreground">
            {item.number}
          </span>

          {item.tag && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider  text-secondary-foreground">
              {item.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500 flex items-center gap-4">
              <span>{item.title}</span>

              {/* Small animated icon */}
              {/* <Icon className="w-8 h-8 text-secondary opacity-80 group-hover:opacity-100 transition-opacity" /> */}
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>

          {/* Large animated visual */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <DotLottie
              src={item.animation}
              style={{
                width: "240px",
                height: "240px",
                opacity: 0.9,
              }}
              autoplay
              loop
            ></DotLottie>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfrastructureSection;
