"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { useT } from "@/contexts/LanguageContext";
import { COOKIES_URL } from "@/lib/links";

const CookieConsentBanner = () => {
  const t = useT();
  const { accepted, accept, decline, reloading } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  // Small delay so the notice does not fight with the first paint.
  useEffect(() => {
    if (accepted !== false) return;
    const timer = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(timer);
  }, [accepted]);

  if (accepted !== false || !mounted) return null;

  const copy = t.cookieBanner;

  return (
    <div
      role="region"
      aria-label={copy.title}
      className="fixed inset-x-0 bottom-0 z-[150] p-4 sm:p-6 animate-in slide-in-from-bottom duration-500"
    >
      <div className="max-w-[1100px] mx-auto rounded-3xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="flex items-start gap-4 flex-1">
            <div className="shrink-0 w-11 h-11 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground mb-1">
                {copy.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {copy.description}{" "}
                <a
                  href={COOKIES_URL}
                  className="underline underline-offset-4 text-foreground hover:text-primary transition-colors"
                >
                  {copy.policy}
                </a>
              </p>
              {reloading && (
                <p className="mt-2 text-xs font-mono text-muted-foreground">
                  {copy.reloading}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
            <button
              type="button"
              onClick={decline}
              disabled={reloading}
              className="border border-border text-foreground px-6 h-12 rounded-full font-semibold text-sm hover:bg-muted transition-colors disabled:opacity-60"
            >
              {copy.decline}
            </button>
            <button
              type="button"
              onClick={accept}
              disabled={reloading}
              className="hero-gradient text-primary-foreground px-6 h-12 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {copy.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
