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
import LeaveSiteModal from "@/components/LeaveSiteModal";
import {
  isExternalUrl,
  isSafeExternalUrl,
  openInNewTab,
  parseUrl,
} from "@/lib/externalLinks";

interface ExternalLinkContextValue {
  /** Opens a destination applying the Kawi safe-link policy. */
  navigateExternal: (href: string) => void;
  pendingUrl: URL | null;
  confirmPending: () => void;
  cancelPending: () => void;
}

const ExternalLinkContext = createContext<ExternalLinkContextValue | null>(null);

const IGNORED_PROTOCOLS = ["mailto:", "tel:", "sms:", "blob:", "javascript:"];

export function ExternalLinkProvider({ children }: { children: ReactNode }) {
  const [pendingUrl, setPendingUrl] = useState<URL | null>(null);

  const navigateExternal = useCallback((href: string) => {
    const url = parseUrl(href);
    if (!url) return;
    if (isSafeExternalUrl(url)) {
      openInNewTab(url.href);
      return;
    }
    setPendingUrl(url);
  }, []);

  const confirmPending = useCallback(() => {
    setPendingUrl((current) => {
      if (current) openInNewTab(current.href);
      return null;
    });
  }, []);

  const cancelPending = useCallback(() => setPendingUrl(null), []);

  // Global guard: every anchor that leaves Kawi goes through the policy, even
  // if the component that rendered it does not know about this provider.
  useEffect(() => {
    const resolveAnchor = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return null;
      if (anchor.dataset.externalPolicy === "off") return null;

      const href = anchor.getAttribute("href") ?? "";
      if (!href || href.startsWith("#")) return null;
      if (IGNORED_PROTOCOLS.some((p) => href.toLowerCase().startsWith(p))) return null;

      const url = parseUrl(href);
      if (!url || !isExternalUrl(url)) return null;
      return url;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const url = resolveAnchor(event);
      if (!url) return;

      if (isSafeExternalUrl(url)) {
        // Trusted destination: force a new tab, keep the landing page alive.
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        openInNewTab(url.href);
        return;
      }

      event.preventDefault();
      setPendingUrl(url);
    };

    // Middle click / ctrl+click on an untrusted link must not skip the warning.
    const onAuxClick = (event: MouseEvent) => {
      if (event.button !== 1) return;
      const url = resolveAnchor(event);
      if (!url || isSafeExternalUrl(url)) return;
      event.preventDefault();
      setPendingUrl(url);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onAuxClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onAuxClick);
    };
  }, []);

  const value = useMemo<ExternalLinkContextValue>(
    () => ({ navigateExternal, pendingUrl, confirmPending, cancelPending }),
    [navigateExternal, pendingUrl, confirmPending, cancelPending],
  );

  return (
    <ExternalLinkContext.Provider value={value}>
      {children}
      <LeaveSiteModal
        url={pendingUrl}
        onConfirm={confirmPending}
        onCancel={cancelPending}
      />
    </ExternalLinkContext.Provider>
  );
}

export function useExternalLink(): ExternalLinkContextValue {
  const ctx = useContext(ExternalLinkContext);
  if (!ctx) {
    return {
      navigateExternal: (href: string) => {
        const url = parseUrl(href);
        if (url) openInNewTab(url.href);
      },
      pendingUrl: null,
      confirmPending: () => {},
      cancelPending: () => {},
    };
  }
  return ctx;
}
