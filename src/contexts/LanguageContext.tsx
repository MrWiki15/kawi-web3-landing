"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translations } from "@/i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  /** Suggested language detected from the user's browser/timezone, if any. */
  suggested: Lang | null;
  dismissSuggestion: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "kawi:lang";
const SUGGESTED_DISMISS_KEY = "kawi:lang:suggestion-dismissed";

// Timezones that map to Portuguese (Brazil only).
const PT_TIMEZONES = new Set([
  "America/Sao_Paulo",
  "America/Bahia",
  "America/Fortaleza",
  "America/Recife",
  "America/Maceio",
  "America/Belem",
  "America/Manaus",
  "America/Cuiaba",
  "America/Campo_Grande",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Rio_Branco",
  "America/Eirunepe",
  "America/Noronha",
  "America/Santarem",
  "America/Araguaina",
]);

// Timezones that map to Spanish-speaking countries.
const ES_TIMEZONES = new Set([
  "America/Havana",
  "America/Mexico_City",
  "America/Cancun",
  "America/Merida",
  "America/Monterrey",
  "America/Tijuana",
  "America/Hermosillo",
  "America/Mazatlan",
  "America/Chihuahua",
  "America/Bogota",
  "America/Lima",
  "America/Caracas",
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Cordoba",
  "America/Argentina/Mendoza",
  "America/Argentina/Salta",
  "America/Argentina/Tucuman",
  "America/Argentina/Ushuaia",
  "America/Santiago",
  "America/Asuncion",
  "America/Montevideo",
  "America/La_Paz",
  "America/Guayaquil",
  "America/Guatemala",
  "America/Tegucigalpa",
  "America/Managua",
  "America/Costa_Rica",
  "America/Panama",
  "America/El_Salvador",
  "America/Santo_Domingo",
  "America/Puerto_Rico",
  "Atlantic/Canary",
  "Europe/Madrid",
]);

function detectSuggestedLang(): Lang | null {
  if (typeof window === "undefined") return null;

  // 1) Timezone is the strongest signal (does not change with language settings).
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (PT_TIMEZONES.has(tz)) return "pt";
    if (ES_TIMEZONES.has(tz)) return "es";
  } catch {
    /* ignore */
  }

  // 2) Browser language as a fallback.
  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const l of langs) {
    const lower = (l || "").toLowerCase();
    if (lower.startsWith("pt")) return "pt";
    if (lower.startsWith("es")) return "es";
  }
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [suggested, setSuggested] = useState<Lang | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "es" || saved === "pt") {
        setLangState(saved);
        return;
      }
    } catch {
      /* ignore */
    }
    // No saved preference → detect and possibly suggest.
    const dismissed = (() => {
      try {
        return localStorage.getItem(SUGGESTED_DISMISS_KEY) === "1";
      } catch {
        return false;
      }
    })();
    if (dismissed) return;
    const detected = detectSuggestedLang();
    if (detected && detected !== "en") setSuggested(detected);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setSuggested(null);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      localStorage.setItem(SUGGESTED_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const dismissSuggestion = useCallback(() => {
    setSuggested(null);
    try {
      localStorage.setItem(SUGGESTED_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: translations[lang],
      suggested,
      dismissSuggestion,
    }),
    [lang, setLang, suggested, dismissSuggestion],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback when used outside provider (e.g. non-landing pages).
    return {
      lang: "en",
      setLang: () => {},
      t: translations.en,
      suggested: null,
      dismissSuggestion: () => {},
    };
  }
  return ctx;
}

export function useT(): Translations {
  return useLanguage().t;
}
