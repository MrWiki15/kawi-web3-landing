"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";
import { WEB_APP_URL } from "@/lib/links";
import {
  fetchLandingMetrics,
  getFallbackLandingMetrics,
  type LandingMetric,
} from "@/lib/motorStats";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  formatter = "number",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  formatter?: LandingMetric["formatter"];
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(eased * end));

            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-5xl lg:text-7xl font-display tracking-tight">
      {formatMetricValue(count, formatter, prefix, suffix)}
    </div>
  );
}

function formatMetricValue(
  value: number,
  formatter: LandingMetric["formatter"] = "number",
  prefix = "",
  suffix = "",
) {
  if (formatter === "brl") return `R$ ${value.toLocaleString("en-US")}`;
  if (formatter === "percent") return `${value.toLocaleString("en-US")}%`;
  if (formatter === "months") return `${value.toLocaleString("en-US")}${suffix}`;
  return `${prefix}${value.toLocaleString("en-US")}${suffix}`;
}


export default function RaaS() {
  const t = useT();
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [metricValues, setMetricValues] = useState<LandingMetric[]>(
    getFallbackLandingMetrics(),
  );
  const sectionRef = useRef<HTMLElement>(null);

  const metrics = metricValues.map((m, i) => ({
    ...m,
    suffix: m.formatter === "months" ? t.raas.monthsSuffix : m.suffix,
    label: t.raas.metrics[i],
  }));

  const columns = 2;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const refreshMetrics = () => {
      fetchLandingMetrics(controller.signal)
        .then(setMetricValues)
        .catch(() => setMetricValues(getFallbackLandingMetrics()));
    };

    refreshMetrics();
    const interval = setInterval(refreshMetrics, 60000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

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

  const getBorders = (index: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    return `
      ${row > 0 ? "border-t" : ""}
      ${col > 0 ? "border-l" : ""}
    `;
  };

  return (
    <section
      id="mision"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-y border-foreground/10 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-secondary" />
              {t.raas.eyebrow}
            </span>

            <h2
              className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {t.raas.titleLine1}
              <br />
              <span className="text-primary">{t.raas.titleLine2}</span>
            </h2>

            <p
              className={`mt-6 text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {t.raas.description}
            </p>
          </div>

          {/* Live clock */}
          <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.raas.live}
            </span>

            <span className="text-foreground/30">|</span>

            <span>{time.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`p-8 lg:p-12 border-foreground/10 transition-all duration-700 ${getBorders(
                index,
              )} ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter
                end={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                formatter={metric.formatter}
              />

              <div className="mt-4 text-lg text-muted-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
          >
            <ArrowRight className="w-4 h-4" />
            {t.raas.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
