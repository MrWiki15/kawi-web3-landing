import { COMPANY_EMAIL, MOBILE_APP_URL, SITE_URL, absoluteUrl } from "@/lib/links";

/**
 * Structured data shared by every route. Kept free of React so the prerender
 * step can emit the same graph into static HTML that the app emits at runtime.
 *
 * Everything hangs off two stable @id nodes, #organization and #website, so
 * search engines resolve one Kawi entity rather than one per page.
 */

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  "@id": ORGANIZATION_ID,
  name: "Kawi",
  alternateName: ["Kawi Services", "Kawi Settlement", "Kawi Brasil"],
  legalName: "Kawi Services",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/logo512.png`,
  slogan: "Fiat to enter. Blockchain to settle.",
  description:
    "Kawi is a regulated Brazilian company that runs a hybrid settlement engine, connecting local fiat rails such as PIX with Solana and USDC to move value across Latin America as one auditable operation.",
  foundingDate: "2025-12",
  email: COMPANY_EMAIL,
  areaServed: ["BR", "Latin America"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "business",
      email: COMPANY_EMAIL,
      areaServed: ["BR", "Latin America"],
      availableLanguage: ["en", "pt", "es"],
    },
  ],
  knowsAbout: [
    "hybrid settlement infrastructure",
    "cross-border payments",
    "stablecoin settlement",
    "BRL to USDC settlement",
    "PIX",
    "Solana",
    "USDC",
    "remittances in Latin America",
    "agentic payments",
  ],
  sameAs: [
    "https://x.com/KawiServices",
    "https://www.facebook.com/kawiservicess/",
    "https://www.trustpilot.com/review/kawi.life",
    MOBILE_APP_URL,
  ],
};

export const websiteJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Kawi",
  alternateName: "Kawi Services",
  description:
    "Kawi runs a hybrid settlement engine: PIX and local fiat rails for access, Solana and USDC for movement, in one programmable, auditable operation.",
  inLanguage: "en",
  publisher: { "@id": ORGANIZATION_ID },
};

export const breadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>,
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/** Marks a page as the canonical description of the Kawi entity itself. */
export const aboutPageJsonLd = (path: string): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${absoluteUrl(path)}#aboutpage`,
  url: absoluteUrl(path),
  name: "About Kawi",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": ORGANIZATION_ID },
});

export const serviceJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "Kawi BRL to USDC Settlement Engine",
  url: SITE_URL,
  serviceType: "Hybrid fiat-blockchain settlement engine",
  description:
    "Kawi provides a programmable hybrid settlement engine that turns local BRL payments into USDC liquidity using fiat and blockchain infrastructure.",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: ["BR", "Latin America"],
  audience: {
    "@type": "Audience",
    audienceType: "Platforms, marketplaces and remittance operators",
  },
};

/**
 * Answers to the questions a brand search for Kawi actually asks. Rendered
 * on the homepage and reused as FAQPage markup, because schema whose answers
 * are not visible on the page is against Google's structured data guidelines.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}

export const homeFaq: FaqEntry[] = [
  {
    question: "What is Kawi?",
    answer:
      "Kawi is a regulated Brazilian company that runs a hybrid settlement engine for cross-border payments. Money enters through local fiat rails such as PIX, settles on Solana as USDC, and is delivered in the destination currency as a single auditable operation.",
  },
  {
    question: "What does Kawi's hybrid settlement engine do?",
    answer:
      "Kawi connects fiat and blockchain infrastructure to automate the settlement of BRL payments into USDC liquidity, coordinating capture, conversion, on-chain settlement and delivery as a single auditable operation.",
  },
  {
    question: "Which settlement corridor is live today?",
    answer:
      "Brazil is Kawi's live corridor, focused on turning local PIX and bank payments into USDC. Additional Latin American corridors are in testing.",
  },
  {
    question: "Is Kawi regulated?",
    answer:
      "Kawi is a regulated company in Brazil and is in the process of strengthening its regulatory framework for digital assets, so the stablecoin side of the engine is covered by the same standard of authorization and supervision as the fiat side.",
  },
  {
    question: "Can Kawi be integrated through an API?",
    answer:
      "Yes. Kawi is programmable infrastructure: platforms can start, monitor and reconcile BRL to USDC settlements through the API, or embed the widget directly in their product.",
  },
  {
    question: "Why does Kawi settle on Solana with USDC?",
    answer:
      "The blockchain leg needs fast confirmation, fees low enough not to distort small tickets, and deep stablecoin liquidity. Solana with native USDC satisfies all three, which keeps end-to-end settlement close to one minute.",
  },
  {
    question: "How long does a settlement take?",
    answer:
      "Typical end-to-end settlement is around one minute, with the fiat legs rather than the blockchain leg accounting for most of that time.",
  },
];

export const homeFaqJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: homeFaq.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: { "@type": "Answer", text: entry.answer },
  })),
};

export const ORGANIZATION_REF = { "@id": ORGANIZATION_ID };
export const WEBSITE_REF = { "@id": WEBSITE_ID };
