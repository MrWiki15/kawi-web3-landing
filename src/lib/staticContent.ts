import { sortedPosts, type BlogBlock } from "@/data/blogPosts";
import { legalPages, type LegalPageKind } from "@/data/legalPages";
import { homeFaq } from "@/lib/schema";
import { BLOG_URL } from "@/lib/links";

/**
 * Server-rendered body copy for the prerender step.
 *
 * The app renders with createRoot, which replaces the contents of #root on
 * mount, so anything we put inside #root here is seen only by clients that do
 * NOT run JavaScript — which is exactly every AI answer engine and most social
 * and secondary crawlers (GPTBot, PerplexityBot, ClaudeBot, Bingbot's text
 * fetch, etc.). Without this they would index the metadata but none of the
 * actual article text, so they could name Kawi but never quote it.
 *
 * This is deliberately plain, semantic HTML built from the same data the React
 * components render, so the static text and the interactive page never diverge.
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Render inline `[label](/blog/slug)` markdown as anchors, escaping the rest. */
const inline = (text: string): string => {
  let out = "";
  let cursor = 0;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    out += esc(text.slice(cursor, match.index));
    out += `<a href="${esc(match[2])}">${esc(match[1])}</a>`;
    cursor = match.index + match[0].length;
  }
  out += esc(text.slice(cursor));
  return out;
};

const renderBlock = (block: BlockLike): string => {
  switch (block.type) {
    case "heading":
      return `<h2>${esc(block.text)}</h2>`;
    case "list":
      return `<ul>${block.items.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`;
    case "quote":
      return `<blockquote><p>${esc(block.text)}</p>${
        block.author ? `<cite>${esc(block.author)}</cite>` : ""
      }</blockquote>`;
    case "code":
      return `<pre><code>${esc(block.code)}</code></pre>`;
    case "formula":
      return `<pre>${esc(block.expression)}</pre>${
        block.caption ? `<p>${esc(block.caption)}</p>` : ""
      }`;
    default:
      return `<p>${inline(block.text)}</p>`;
  }
};

type BlockLike = BlogBlock;

const article = (parts: string[]): string =>
  `<main><article>${parts.join("")}</article></main>`;

const postBody = (slug: string): string | null => {
  const post = sortedPosts.find((entry) => entry.slug === slug);
  if (!post) return null;
  return article([
    `<nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="${BLOG_URL}">Blog</a> / <span>${esc(post.category)}</span></nav>`,
    `<h1>${esc(post.title)}</h1>`,
    `<p>${esc(post.excerpt)}</p>`,
    `<p>By ${esc(post.author)}, ${esc(post.authorRole)}. ${post.readingMinutes} min read.</p>`,
    ...post.content.map(renderBlock),
  ]);
};

const blogIndexBody = (): string =>
  article([
    "<h1>Kawi Blog</h1>",
    "<p>Research from the Kawi team on hybrid settlement infrastructure, Solana as a settlement layer, the economics of cross-border payments and the agentic payment layer.</p>",
    `<ul>${sortedPosts
      .map(
        (post) =>
          `<li><a href="${BLOG_URL}/${post.slug}">${esc(
            post.seoTitle ?? post.title,
          )}</a> — ${esc(post.excerpt)}</li>`,
      )
      .join("")}</ul>`,
  ]);

const legalBody = (kind: LegalPageKind): string => {
  const page = legalPages[kind];
  return article([
    `<h1>${esc(page.title)}</h1>`,
    `<p>${esc(page.description)}</p>`,
    ...page.sections.flatMap((section) => [
      `<h2>${esc(section.title)}</h2>`,
      ...section.body.map((paragraph) => `<p>${esc(paragraph)}</p>`),
    ]),
  ]);
};

const homeBody = (): string =>
  article([
    "<h1>Kawi — Hybrid BRL to USDC Settlement Engine</h1>",
    "<p>Kawi is a regulated Brazilian company that runs a hybrid settlement engine for cross-border payments. Value enters through local fiat rails such as PIX, settles on Solana as USDC, and is delivered in the destination currency as a single, programmable, auditable operation. Fiat to enter, blockchain to settle.</p>",
    "<p>Kawi connects banking and blockchain infrastructure to move value between countries quickly, transparently and globally. It exposes the whole flow as one operation that platforms, marketplaces and remittance operators can start, monitor and reconcile through an API or an embeddable widget.</p>",
    "<h2>Frequently asked questions about Kawi</h2>",
    ...homeFaq.flatMap((entry) => [
      `<h3>${esc(entry.question)}</h3>`,
      `<p>${esc(entry.answer)}</p>`,
    ]),
  ]);

const aboutBody = (): string =>
  article([
    "<h1>About Kawi</h1>",
    "<p>Kawi connects banking infrastructure with blockchain settlement so money can move between countries in minutes instead of days, with a record that anyone involved can verify. It is a regulated Brazilian company building hybrid settlement infrastructure for Latin America.</p>",
    "<h2>Timeline</h2>",
    "<ul>",
    "<li>December 2025: Kawi is founded, built around turning local BRL payments into usable global liquidity without waiting days for intermediaries.</li>",
    "<li>January 2026: the product enters beta, testing the engine against real money, real timings and real failure cases.</li>",
    "<li>March 2026: Kawi becomes a regulated company in Brazil, with compliance, monitoring and reporting built into the engine.</li>",
    "<li>Now: expanding the same programmable engine across more Latin American countries, one corridor at a time.</li>",
    "</ul>",
    "<h2>What Kawi builds</h2>",
    "<ul>",
    "<li>Fiat access through the rails people already use, such as PIX and bank transfers.</li>",
    "<li>Blockchain settlement on Solana with USDC for fast finality, low cost and a public, auditable trail.</li>",
    "<li>Compliance and traceability as part of the engine rather than a layer added at the end.</li>",
    "<li>A Latam-first footprint that extends the same engine to every corridor that clears its regulatory and operational bar.</li>",
    "</ul>",
  ]);

const notFoundBody = (): string =>
  article([
    "<h1>This page is not part of Kawi</h1>",
    "<p>The address you followed does not match anything on the site. It may have been moved, or the link may have been mistyped.</p>",
    "<ul>",
    '<li><a href="/">Back to the homepage</a></li>',
    `<li><a href="${BLOG_URL}">Read the Kawi blog</a></li>`,
    '<li><a href="/about">About Kawi</a></li>',
    "</ul>",
  ]);

/** HTML injected into #root for a given route path, or null when there is none. */
export const staticBodyForPath = (path: string): string | null => {
  if (path === "/") return homeBody();
  if (path === "/404") return notFoundBody();
  if (path === "/about") return aboutBody();
  if (path === BLOG_URL) return blogIndexBody();
  if (path.startsWith(`${BLOG_URL}/`)) return postBody(path.slice(BLOG_URL.length + 1));

  const kind = path.slice(1) as LegalPageKind;
  if (kind in legalPages) return legalBody(kind);

  return null;
};
