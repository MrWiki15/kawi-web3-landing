export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "code"; language: string; code: string }
  | { type: "formula"; expression: string; caption?: string };

/**
 * Post copy supports inline markdown links: `[label](/blog/other-post)`.
 * Internal links are rendered with the router so crawlers and users follow the
 * same URL, which is what keeps the topic clusters connected.
 */
export interface BlogPost {
  slug: string;
  title: string;
  /** Optional <title> override when the headline is not the best search title. */
  seoTitle?: string;
  excerpt: string;
  /** Meta description; falls back to the excerpt. */
  metaDescription?: string;
  category: string;
  /** Topic cluster used for related posts and the cluster navigation. */
  cluster: string;
  /** True for the cluster's pillar article. */
  pillar?: boolean;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** ISO date of the last meaningful revision. */
  updated?: string;
  readingMinutes: number;
  author: string;
  authorRole: string;
  tags: string[];
  keywords: string[];
  featured?: boolean;
  /** Explicit outgoing links used for the "keep reading" block. */
  related: string[];
  content: BlogBlock[];
}
