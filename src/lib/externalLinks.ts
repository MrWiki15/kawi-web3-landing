/**
 * Rules that decide which destinations are "Kawi safe" and can therefore be
 * opened without asking the user for confirmation first.
 *
 * Everything else that leaves kawi is considered untrusted: the app shows a
 * blurred confirmation modal with the exact destination before navigating.
 */

type SafeRule = {
  /** Registrable host. Subdomains are always accepted (`docs.` , `portal.`, `www.`). */
  host: string;
  /** Optional path prefix (case insensitive). Matched on a path-segment boundary. */
  pathPrefix?: string;
};

const SAFE_RULES: SafeRule[] = [
  // WhatsApp (every community group / direct chat link).
  { host: "whatsapp.com" },
  { host: "wa.me" },

  // Kawi owned domains (includes portal.* , docs.* , mainnet.* , www.*).
  { host: "kawiservices.com" },
  { host: "kawiservices.com.br" },
  { host: "kawi.life" },

  // Official social accounts.
  { host: "x.com", pathPrefix: "/KawiServices" },
  { host: "twitter.com", pathPrefix: "/KawiServices" },
  { host: "x.com", pathPrefix: "/waylearnlatam/status/2094816117919490469" },
  { host: "twitter.com", pathPrefix: "/waylearnlatam/status/2094816117919490469" },
  { host: "facebook.com", pathPrefix: "/kawiservicess" },

  // Public review profile.
  { host: "trustpilot.com", pathPrefix: "/review/kawi.life" },
];

const hostMatches = (host: string, ruleHost: string) =>
  host === ruleHost || host.endsWith(`.${ruleHost}`);

const pathMatches = (path: string, prefix: string) => {
  const p = path.toLowerCase();
  const target = prefix.toLowerCase();
  if (!p.startsWith(target)) return false;
  const next = p.charAt(target.length);
  return next === "" || next === "/";
};

export const parseUrl = (rawHref: string): URL | null => {
  if (!rawHref) return null;
  try {
    const base =
      typeof window === "undefined" ? "https://kawiservices.com" : window.location.href;
    return new URL(rawHref, base);
  } catch {
    return null;
  }
};

/** True when the destination leaves the current site over http(s). */
export const isExternalUrl = (url: URL): boolean => {
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  if (typeof window === "undefined") return true;
  return url.host !== window.location.host;
};

/** True when the destination belongs to the Kawi trusted allow-list. */
export const isSafeExternalUrl = (url: URL): boolean => {
  if (url.protocol !== "http:" && url.protocol !== "https:") return true;
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  return SAFE_RULES.some(
    (rule) =>
      hostMatches(host, rule.host) &&
      (!rule.pathPrefix || pathMatches(url.pathname, rule.pathPrefix)),
  );
};

/** Human readable destination shown in the confirmation modal. */
export const describeUrl = (url: URL): string => url.hostname.replace(/^www\./, "");

export const openInNewTab = (href: string) => {
  const win = window.open(href, "_blank", "noopener,noreferrer");
  if (win) win.opener = null;
};
