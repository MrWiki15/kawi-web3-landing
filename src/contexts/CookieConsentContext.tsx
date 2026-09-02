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

const STORAGE_KEY = "kawi:cookies-consent";

interface CookieConsentContextValue {
  /** null while the stored answer is still being read. */
  accepted: boolean | null;
  accept: () => void;
  /** Declining is not a usable state: the page reloads and asks again. */
  decline: () => void;
  reloading: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    try {
      setAccepted(localStorage.getItem(STORAGE_KEY) === "accepted");
    } catch {
      // Storage blocked: keep asking on every visit.
      setAccepted(false);
    }
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setAccepted(true);
  }, []);

  const decline = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setReloading(true);
    setTimeout(() => window.location.reload(), 700);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({ accepted, accept, decline, reloading }),
    [accepted, accept, decline, reloading],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    return { accepted: true, accept: () => {}, decline: () => {}, reloading: false };
  }
  return ctx;
}
