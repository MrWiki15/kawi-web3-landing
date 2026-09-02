"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/contexts/LanguageContext";
import { API_SERVICES_URL, WIDGETS_URL } from "@/lib/links";

const stepCode = [
  `import { mountKawiRaasWidget } from "@kawiservices/sdk/widget";

mountKawiRaasWidget("#kawi-widget", {
  baseUrl: "https://mainnet.kawiservices.com",
  appId: "YOUR_APP_ID",
});`,
  `curl https://mainnet.kawiservices.com/api/platform/stats \\
  -H "x-api-key: $KAWI_API_KEY"`,
];

const stepHrefs = [WIDGETS_URL, API_SERVICES_URL];
const stepNumbers = ["I", "II"];

export default function KawiIntegrationsSection() {
  const t = useT();
  const steps = t.store.steps.map((s, i) => ({
    number: stepNumbers[i],
    title: s.title,
    description: s.description,
    code: stepCode[i],
    cta: s.cta,
    href: stepHrefs[i],
  }));

  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section
      id="integrations"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[hsl(155_55%_14%)] text-background overflow-hidden"
    >
      {/* Background pattern */}
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            {t.store.eyebrow}
          </span>

          <h2
            className={`text-3xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {t.store.titleLine1}
            <br />
            <span className="text-primary">
              {t.store.fiat}
              <b className="text-white"> ↔ </b>
              <b className="text-secondary">{t.store.crypto}</b>
            </span>
            <br />
            <b className="text-secondary">{t.store.crypto}</b>
            <b className="text-white"> ↔ </b>
            <span className="text-primary"> {t.store.fiat} </span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-6 lg:py-8 border-b border-background/10 transition-all duration-500 group ${
                  activeStep === index
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-4 lg:gap-6">
                  <span className="font-display text-2xl lg:text-3xl text-background/30">
                    {step.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl lg:text-3xl font-display mb-2 lg:mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>

                    <p className="text-background/60 text-sm lg:text-base leading-relaxed">
                      {step.description}
                    </p>

                    {activeStep === index && (
                      <div className="mt-4 h-px bg-background/20 overflow-hidden">
                        <div
                          className="h-full bg-background w-0"
                          style={{
                            animation: "progress 5s linear forwards",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="lg:sticky lg:top-32 self-start w-full max-w-full">
            <div className="border border-background/10 overflow-hidden max-w-[calc(100vw-2rem)] sm:max-w-full">
              {/* Window header */}
              <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-background/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-background/20" />
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-background/20" />
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-background/20" />
                </div>

                <span className="text-xs font-mono text-background/40">kawi.ts</span>
              </div>

              {/* Code */}
              <div className="p-4 lg:p-8 font-mono text-xs lg:text-sm min-h-[200px] lg:min-h-[280px] overflow-x-auto">
                <pre className="text-background/70 whitespace-pre-wrap break-all">
                  {steps[activeStep].code.split("\n").map((line, lineIndex) => (
                    <div
                      key={`${activeStep}-${lineIndex}`}
                      className="leading-loose code-line-reveal"
                      style={{
                        animationDelay: `${lineIndex * 80}ms`,
                      }}
                    >
                      <span className="text-background/20 select-none w-6 lg:w-8 inline-block">
                        {lineIndex + 1}
                      </span>

                      <span className="inline-flex">
                        {line.split("").map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Footer */}
              <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-background/10 flex items-center justify-between">
                <span className="text-xs font-mono text-background/40">
                  {activeStep + 1} / {steps.length}
                </span>

                <a
                  href={steps[activeStep].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-background hover:opacity-70 transition-opacity"
                >
                  {steps[activeStep].cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
