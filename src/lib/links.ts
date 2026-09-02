/** Canonical origin of this marketing site. Used for canonicals, OG and sitemap. */
export const SITE_URL = "https://kawiservices.com.br";

export const WEB_APP_URL = "https://kawiservices.com.br";
export const KAWI_COM_URL = "https://kawiservices.com";
export const PORTAL_URL = "https://portal.kawiservices.com";
export const MOBILE_APP_URL =
  "https://play.google.com/store/apps/details?id=com.kawiremesas.life";
export const WIDGETS_URL =
  "https://docs.kawiservices.com/sdk/functions/mount-raas-widget";
export const API_SERVICES_URL = "https://docs.kawiservices.com/";
export const DOCS_URL = "https://docs.kawiservices.com/";
export const PRESENTATION_URL =
  "https://x.com/KawiServices/status/2069839552357765365?s=20";
export const TWITTER_URL = "https://x.com/KawiServices";
export const FACEBOOK_URL = "https://www.facebook.com/kawiservicess/";
export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/kawi.life";
export const WHATSAPP_1_URL = "https://chat.whatsapp.com/K2FefQ5n7pvFynLLctMlz4";
export const WHATSAPP_2_URL = "https://chat.whatsapp.com/BDBqzUta0HDKsopaC7TZ6F";
export const WHATSAPP_3_URL = "https://chat.whatsapp.com/EDjLz2c8bVK39OZOmNOZQT";
export const WHATSAPP_4_URL =
  "https://chat.whatsapp.com/HiCFaSKPAVY9wHA7pVxEIu?s=cl&p=a&mlu=4";
export const SOLANA_FOUNDATION_URL =
  "https://x.com/waylearnlatam/status/2094816117919490469?s=20";
export const COMPANY_EMAIL = "company@kawiservices.com";
export const COLLABORATIONS_MAILTO = `mailto:${COMPANY_EMAIL}`;
export const MOTOR_BASE_URL =
  import.meta.env.VITE_KAWI_MOTOR_BASE_URL || "https://mainnet.kawiservices.com";

/** Internal routes. */
export const ABOUT_URL = "/about";
export const BLOG_URL = "/blog";
export const COOKIES_URL = "/cookies";
export const PRIVACY_URL = "/privacy";
export const REGULATION_URL = "/regulation";

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || SITE_URL;
