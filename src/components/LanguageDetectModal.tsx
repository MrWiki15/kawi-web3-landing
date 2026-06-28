"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";

const LanguageDetectModal = () => {
  const { suggested, setLang, dismissSuggestion, t } = useLanguage();

  if (!suggested) return null;

  const copy = t.langModal[suggested];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8">
        <button
          type="button"
          onClick={dismissSuggestion}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-3xl mb-3">{suggested === "pt" ? "🇧🇷" : "🌎"}</div>
        <h2 className="text-xl font-display font-bold text-foreground mb-2">
          {copy.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">{copy.desc}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setLang(suggested)}
            className="flex-1 hero-gradient text-primary-foreground px-5 h-12 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {copy.accept}
          </button>
          <button
            type="button"
            onClick={dismissSuggestion}
            className="flex-1 border border-border text-foreground px-5 h-12 rounded-full font-semibold text-sm hover:bg-muted transition-colors"
          >
            {copy.decline}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageDetectModal;
