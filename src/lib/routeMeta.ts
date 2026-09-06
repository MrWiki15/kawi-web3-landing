import { legalPages, type LegalPageKind } from "@/data/legalPages";
import { sortedPosts } from "@/data/blogPosts";
import {
  aboutPageJsonLd,
  breadcrumbJsonLd,
  homeFaqJsonLd,
  organizationJsonLd,
  serviceJsonLd,
  websiteJsonLd,
  type JsonLd,
} from "@/lib/schema";
import { absoluteUrl, BLOG_URL } from "@/lib/links";

/**
 * One source of truth for every indexable route's metadata.
 *
 * The React pages read it so the runtime head is correct, and the prerender
 * step reads it so the static HTML a non-JS crawler sees says the same thing.
 * Anything that only exists in one of the two will drift, so it belongs here.
 */

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  jsonLd: JsonLd[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  /** Sitemap hints; also used to order the prerender output. */
  changefreq: string;
  priority: string;
  lastmod?: string;
  /** Keeps the page out of the index (used by the 404). */
  noIndex?: boolean;
}

const crumb = (...items: Array<{ name: string; path: string }>) =>
  breadcrumbJsonLd([{ name: "Home", path: "/" }, ...items]);

export const homeMeta: RouteMeta = {
  path: "/",
  title: "Kawi | Hybrid BRL to USDC Settlement Engine for Latin America",
  description:
    "Kawi runs a hybrid settlement engine: PIX and local fiat rails for access, Solana and USDC for movement, in one programmable, auditable operation.",
  keywords: [
    "Kawi",
    "Kawi Services",
    "Kawi settlement",
    "BRL to USDC",
    "hybrid settlement engine",
    "programmable settlement",
    "fiat to stablecoin",
    "PIX to USDC",
    "stablecoin settlement Brazil",
    "cross-border payments latam",
    "motor de liquidacion hibrida",
    "liquidacao BRL USDC",
  ],
  jsonLd: [organizationJsonLd, websiteJsonLd, serviceJsonLd, homeFaqJsonLd],
  changefreq: "weekly",
  priority: "1.0",
};

export const aboutMeta: RouteMeta = {
  path: "/about",
  title: "About Kawi | Hybrid Settlement Infrastructure",
  description:
    "Who Kawi is: a regulated Brazilian company building hybrid settlement infrastructure that moves value across Latin America in minutes, not days.",
  keywords: [
    "about Kawi",
    "who is Kawi",
    "what is Kawi",
    "Kawi company",
    "hybrid settlement company",
    "cross-border settlement Brazil",
    "stablecoin settlement infrastructure latam",
  ],
  jsonLd: [
    organizationJsonLd,
    websiteJsonLd,
    aboutPageJsonLd("/about"),
    crumb({ name: "About", path: "/about" }),
  ],
  changefreq: "monthly",
  priority: "0.9",
};

export const blogMeta: RouteMeta = {
  path: BLOG_URL,
  title: "Blog | Hybrid Settlement, Solana and Payment Economics | Kawi",
  description:
    "Notes from the Kawi team on hybrid settlement infrastructure, Solana as a settlement layer, the economics of prefunding, and agentic payments.",
  keywords: [
    "Kawi blog",
    "Kawi research",
    "hybrid settlement blog",
    "cross-border payment infrastructure",
    "Solana settlement",
    "prefunding strategy",
    "agentic payments",
    "stablecoin remittances",
  ],
  jsonLd: [
    organizationJsonLd,
    websiteJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${absoluteUrl(BLOG_URL)}#blog`,
      name: "Kawi Blog",
      url: absoluteUrl(BLOG_URL),
      description:
        "Research from the Kawi team on hybrid settlement infrastructure, Solana, payment economics and agentic payments.",
      publisher: { "@id": `${absoluteUrl("/")}/#organization` },
      blogPost: sortedPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        url: absoluteUrl(`${BLOG_URL}/${post.slug}`),
        author: { "@type": "Organization", name: post.author },
      })),
    },
    crumb({ name: "Blog", path: BLOG_URL }),
  ],
  changefreq: "weekly",
  priority: "0.9",
};

const LEGAL_PRIORITY: Record<LegalPageKind, string> = {
  regulation: "0.7",
  privacy: "0.3",
  cookies: "0.3",
  "account-deletion": "0.3",
  "data-deletion": "0.3",
};

export const legalMeta = (kind: LegalPageKind): RouteMeta => {
  const page = legalPages[kind];
  const path = `/${kind}`;
  return {
    path,
    title: `${page.seoTitle ?? page.title} | Kawi`,
    description: page.description,
    keywords: page.keywords ?? [],
    jsonLd: [
      organizationJsonLd,
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: `${page.title} | Kawi`,
        description: page.description,
        isPartOf: { "@id": `${absoluteUrl("/")}/#website` },
        about: { "@id": `${absoluteUrl("/")}/#organization` },
      },
      crumb({ name: page.title, path }),
    ],
    changefreq: kind === "regulation" ? "monthly" : "yearly",
    priority: LEGAL_PRIORITY[kind],
  };
};

export const postMeta = (slug: string): RouteMeta | null => {
  const post = sortedPosts.find((entry) => entry.slug === slug);
  if (!post) return null;
  const path = `${BLOG_URL}/${post.slug}`;
  const wordCount = post.content.reduce(
    (total, block) =>
      total +
      (block.type === "list"
        ? block.items.join(" ").split(/\s+/).length
        : block.type === "code"
          ? 0
          : block.type === "formula"
            ? (block.caption ?? "").split(/\s+/).length
            : block.text.split(/\s+/).length),
    0,
  );

  return {
    path,
    title: `${post.seoTitle ?? post.title} | Kawi`,
    description: post.metaDescription ?? post.excerpt,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    section: post.category,
    tags: post.tags,
    jsonLd: [
      organizationJsonLd,
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(path)}#article`,
        headline: post.seoTitle ?? post.title,
        alternativeHeadline: post.title,
        description: post.metaDescription ?? post.excerpt,
        url: absoluteUrl(path),
        mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        keywords: post.keywords.join(", "),
        articleSection: post.category,
        wordCount,
        timeRequired: `PT${post.readingMinutes}M`,
        inLanguage: "en",
        isPartOf: { "@id": `${absoluteUrl(BLOG_URL)}#blog` },
        author: {
          "@type": "Organization",
          name: post.author,
          url: absoluteUrl("/"),
        },
        publisher: { "@id": `${absoluteUrl("/")}/#organization` },
        image: `${absoluteUrl("/")}/logo512.png`,
      },
      crumb({ name: "Blog", path: BLOG_URL }, { name: post.title, path }),
    ],
    changefreq: "monthly",
    priority: post.pillar ? "0.8" : "0.6",
    lastmod: post.updated ?? post.date,
  };
};

const LEGAL_KINDS: LegalPageKind[] = [
  "regulation",
  "privacy",
  "cookies",
  "account-deletion",
  "data-deletion",
];

/**
 * The 404 page. Not part of allRoutes (kept out of the sitemap), but prerendered
 * to dist/404.html so Vercel serves a branded, noindexed not-found page with a
 * real 404 status instead of its own default error page.
 */
export const notFoundMeta: RouteMeta = {
  path: "/404",
  title: "Page not found | Kawi",
  description:
    "This Kawi page does not exist. Head back to the hybrid settlement engine, the blog or the company page.",
  keywords: [],
  jsonLd: [organizationJsonLd, websiteJsonLd],
  changefreq: "yearly",
  priority: "0.0",
  noIndex: true,
};

/** Every indexable route, in sitemap order. */
export const allRoutes = (): RouteMeta[] => [
  homeMeta,
  aboutMeta,
  blogMeta,
  ...LEGAL_KINDS.map(legalMeta),
  ...sortedPosts
    .map((post) => postMeta(post.slug))
    .filter((meta): meta is RouteMeta => Boolean(meta)),
];
