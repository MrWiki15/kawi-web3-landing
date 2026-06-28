import { useEffect, useState, useRef } from "react";
import { useT } from "@/contexts/LanguageContext";


const integrations = [
  { name: "PIX", category: "Fiat Rail" },
  { name: "USDC", category: "Settlement Asset" },
  { name: "USDT", category: "Settlement Asset" },
  { name: "Bitcoin", category: "Blockchain Rail" },
  { name: "Solana", category: "Blockchain Rail" },
  { name: "BNB Chain", category: "Blockchain Rail" },
  { name: "CUP", category: "Fiat Rail" },
  { name: "MLC", category: "Fiat Rail" },
  { name: "Classic", category: "Fiat Rail" },
  { name: "Jupiter", category: "Swap Engine" },
  { name: "Mercado Bitcoin", category: "Exchange Layer" },
  { name: "Binance", category: "Exchange Layer" },
  { name: "WhatsApp", category: "Notifications" },
  { name: "Telegram", category: "Notifications" },
  { name: "Gmail", category: "Notifications" },
];

export default function IntegrationsSection() {
  const t = useT();
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="valores"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-4xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-secondary" />
            {t.integrations.eyebrow}
            <span className="w-8 h-px bg-secondary" />
          </span>

          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            {t.integrations.titleLine1}
            <br />
            <span>
              {t.integrations.titleLine2Start}{" "}
              <b className="text-secondary">{t.integrations.titleLine2Em}</b>
            </span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {t.integrations.description}
          </p>
        </div>
      </div>

      {/* Row 1 */}
      <div className="w-full overflow-hidden mb-6">
        <div
          className="flex gap-6 w-max"
          style={{
            animation: "scrollLeft 30s linear infinite",
          }}
        >
          {[...integrations, ...integrations].map((integration, index) => (
            <div
              key={`${integration.name}-${index}`}
              className="shrink-0 px-8 py-6 border border-foreground/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group min-w-[220px]"
            >
              <div className="text-lg font-medium text-foreground group-hover:translate-x-1 transition-transform">
                {integration.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {integration.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-6 w-max"
          style={{
            animation: "scrollRight 30s linear infinite",
          }}
        >
          {[...integrations.reverse(), ...integrations.reverse()].map(
            (integration, index) => (
              <div
                key={`${integration.name}-reverse-${index}`}
                className="shrink-0 px-8 py-6 border border-foreground/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group min-w-[220px]"
              >
                <div className="text-lg font-medium text-foreground group-hover:translate-x-1 transition-transform">
                  {integration.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {integration.category}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
}
