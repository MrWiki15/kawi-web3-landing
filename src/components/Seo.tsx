import { Helmet } from "react-helmet-async";
import { absoluteUrl, SITE_URL } from "@/lib/links";

type JsonLd = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/blog/why-solana-for-settlement". */
  path: string;
  keywords?: string[];
  /** "website" for pages, "article" for blog posts. */
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  jsonLd?: JsonLd[];
  locale?: string;
}

const DEFAULT_IMAGE = "/logo512.png";

/**
 * Single source of truth for per-page metadata. Every route renders exactly one
 * of these so canonical, Open Graph, Twitter and structured data never drift.
 */
const Seo = ({
  title,
  description,
  path,
  keywords,
  type = "website",
  image = DEFAULT_IMAGE,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noIndex,
  jsonLd = [],
  locale = "en_US",
}: SeoProps) => {
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />

      <meta property="og:site_name" content="Kawi" />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      {type === "article" &&
        tags?.map((tag) => <meta property="article:tag" content={tag} key={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@KawiServices" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd.map((schema, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;

/** Shared organisation node so every page references the same entity. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Kawi",
  legalName: "Kawi Services",
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  description:
    "Kawi is a hybrid settlement infrastructure connecting banking rails and blockchain to move value across Latin America quickly, securely and programmatically.",
  email: "company@kawiservices.com",
  areaServed: ["BR", "Latin America"],
  sameAs: [
    "https://x.com/KawiServices",
    "https://www.facebook.com/kawiservicess/",
    "https://www.trustpilot.com/review/kawi.life",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Kawi",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const breadcrumbJsonLd = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
