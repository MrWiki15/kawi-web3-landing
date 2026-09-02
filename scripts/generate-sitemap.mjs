/**
 * Generates public/sitemap.xml from the static routes and the blog post data.
 * Runs on `npm run build` so the sitemap can never drift from the posts.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const postsDir = join(root, "src", "data", "posts");

const SITE_URL = "https://kawiservices.com.br";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  { path: "/regulation", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
  { path: "/account-deletion", changefreq: "yearly", priority: "0.3" },
  { path: "/data-deletion", changefreq: "yearly", priority: "0.3" },
];

/** Pull slug / date / updated / pillar out of the post data files. */
function readPosts() {
  const posts = [];
  for (const file of readdirSync(postsDir)) {
    if (!file.endsWith(".ts") || file === "types.ts") continue;
    const source = readFileSync(join(postsDir, file), "utf8");
    const entries = source.split(/\n {4}slug: "/).slice(1);
    for (const entry of entries) {
      const slug = entry.slice(0, entry.indexOf('"'));
      const date = entry.match(/\n {4}date: "([\d-]+)"/)?.[1];
      const updated = entry.match(/\n {4}updated: "([\d-]+)"/)?.[1];
      const pillar = /\n {4}pillar: true/.test(entry);
      if (slug && date) posts.push({ slug, lastmod: updated ?? date, pillar });
    }
  }
  return posts;
}

const posts = readPosts();
if (posts.length === 0) {
  console.error("generate-sitemap: no blog posts found, aborting");
  process.exit(1);
}

const urls = [
  ...STATIC_ROUTES.map((route) => ({ ...route, loc: `${SITE_URL}${route.path}` })),
  ...posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.lastmod,
    changefreq: "monthly",
    priority: post.pillar ? "0.8" : "0.6",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) =>
    [
      "  <url>",
      `    <loc>${url.loc.replace(/\/$/, "") || SITE_URL}</loc>`,
      url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : null,
      `    <changefreq>${url.changefreq}</changefreq>`,
      `    <priority>${url.priority}</priority>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");
console.log(`generate-sitemap: wrote ${urls.length} urls (${posts.length} posts)`);
