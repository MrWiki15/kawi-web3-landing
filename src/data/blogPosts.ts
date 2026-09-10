import { agenticPosts } from "./posts/agentic";
import { economicsPosts } from "./posts/economics";
import { expansionPosts } from "./posts/expansion";
import { moreAgenticPosts } from "./posts/more-agentic";
import { moreEconomicsPosts } from "./posts/more-economics";
import { moreInfrastructurePosts } from "./posts/more-infrastructure";
import { moreSolanaPosts } from "./posts/more-solana";
import { regulationPosts } from "./posts/regulation";
import { infrastructurePosts } from "./posts/infrastructure";
import { platformPosts } from "./posts/platform";
import { solanaPosts } from "./posts/solana";
import type { BlogBlock, BlogPost } from "./posts/types";

export type { BlogBlock, BlogPost };

export const blogPosts: BlogPost[] = [
  ...expansionPosts,
  ...regulationPosts,
  ...infrastructurePosts,
  ...moreInfrastructurePosts,
  ...solanaPosts,
  ...moreSolanaPosts,
  ...economicsPosts,
  ...moreEconomicsPosts,
  ...agenticPosts,
  ...moreAgenticPosts,
  ...platformPosts,
];

const bySlug = new Map(blogPosts.map((post) => [post.slug, post]));

if (import.meta.env.DEV && bySlug.size !== blogPosts.length) {
  const seen = new Set<string>();
  const duplicates = blogPosts
    .map((post) => post.slug)
    .filter((slug) => (seen.has(slug) ? true : (seen.add(slug), false)));
  console.error("Duplicate blog slugs:", duplicates);
}

export const sortedPosts: BlogPost[] = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
).sort();

export const blogClusters = Array.from(new Set(blogPosts.map((post) => post.cluster)));

export const getPostBySlug = (slug: string): BlogPost | undefined => bySlug.get(slug);

export const getPillarForCluster = (cluster: string): BlogPost | undefined =>
  blogPosts.find((post) => post.cluster === cluster && post.pillar);

export const getClusterPosts = (cluster: string): BlogPost[] =>
  sortedPosts.filter((post) => post.cluster === cluster);

/** Slugs this post links to from inside its body copy. */
const INLINE_LINK = /\]\(\/blog\/([a-z0-9-]+)\)/g;

const outgoingLinks = new Map<string, string[]>();
const incomingLinks = new Map<string, string[]>();

for (const post of blogPosts) {
  const targets = new Set<string>();
  for (const block of post.content) {
    const texts =
      block.type === "list"
        ? block.items
        : block.type === "code" || block.type === "formula"
          ? []
          : [block.text];
    for (const text of texts) {
      for (const match of text.matchAll(INLINE_LINK)) {
        if (match[1] !== post.slug) targets.add(match[1]);
      }
    }
  }
  outgoingLinks.set(post.slug, [...targets]);
  for (const target of targets) {
    incomingLinks.set(target, [...(incomingLinks.get(target) ?? []), post.slug]);
  }
}

if (import.meta.env.DEV) {
  for (const [slug, targets] of outgoingLinks) {
    const broken = targets.filter((target) => !bySlug.has(target));
    if (broken.length) console.error(`Broken blog links in ${slug}:`, broken);
  }
}

/** Posts that link to this one. Used to surface the cluster from both directions. */
export const getIncomingLinks = (slug: string): BlogPost[] =>
  (incomingLinks.get(slug) ?? [])
    .map((s) => bySlug.get(s))
    .filter((p): p is BlogPost => Boolean(p));

/**
 * Related posts, in priority order: the curated list first, then the cluster
 * pillar, then the rest of the cluster, then anything sharing tags.
 */
export const getRelatedPosts = (post: BlogPost, limit = 3): BlogPost[] => {
  const picked: BlogPost[] = [];
  const push = (candidate?: BlogPost) => {
    if (!candidate) return;
    if (candidate.slug === post.slug) return;
    if (picked.some((p) => p.slug === candidate.slug)) return;
    picked.push(candidate);
  };

  post.related.forEach((slug) => push(bySlug.get(slug)));
  if (!post.pillar) push(getPillarForCluster(post.cluster));
  getClusterPosts(post.cluster).forEach(push);
  sortedPosts
    .filter((candidate) => candidate.tags.some((tag) => post.tags.includes(tag)))
    .forEach(push);

  return picked.slice(0, limit);
};

/** Parse as a local date so the day does not shift by timezone. */
export const formatPostDate = (iso: string, locale = "en-US"): string => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
