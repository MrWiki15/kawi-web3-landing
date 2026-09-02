import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./AnimatedSphere";
import { useT } from "@/contexts/LanguageContext";
import { WEB_APP_URL } from "@/lib/links";

const HeroSection = () => {
  const t = useT();
  const rotatingWords = t.hero.rotating;
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const baseTransition =
    "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}

        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div
          className={`${baseTransition} ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-secondary" />
            {t.hero.eyebrow}
          </span>
        </div>

        <div className="mt-8 mb-12">
          <h1
            className={`${baseTransition} text-[36px] sm:text-[48px] md:text-[60px] lg:text-[80px] font-display leading-[0.9] tracking-tight ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block mb-4">{t.hero.titleLine1}</span>

            <span className="block">
              <span className="relative inline-block">
                {t.hero.titleLine2}
                <span key={wordIndex} className="inline-flex text-secondary">
                  {rotatingWords[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-secondary/40" />
              </span>
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end mt-14">
          <p
            className={`${baseTransition} text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {t.hero.description}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "16px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0px)" : "translateY(24px)",
              transition:
                "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "opacity, transform",
            }}
          >
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 h-14 text-base rounded-full font-semibold inline-flex items-center justify-center shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1"
            >
              {t.hero.ctaStart}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#servicios"
              className="border border-border text-foreground px-8 h-14 text-base rounded-full font-semibold inline-flex items-center justify-center transition-all hover:-translate-y-1 hover:bg-muted/30"
            >
              {t.hero.ctaExplore}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
