/**
 * Post-build SEO step.
 *
 * The app is a single-page bundle, so without this every URL served the same
 * index.html: one title, one description, and a canonical pointing at the
 * homepage. Googlebot renders the JS and recovers, but Bing, the social
 * scrapers behind WhatsApp / X / Facebook previews, and most AI crawlers do
 * not, so 41 of 42 routes were describing themselves as the homepage.
 *
 * Here we write a real HTML file per route with its own head, and generate the
 * sitemap from the same route table, so the two cannot drift.
 */
import { build } from "esbuild";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dist = join(root, "dist");

const SITE_URL = "https://kawiservices.com.br";
const START = "<!-- seo:start -->";
const END = "<!-- seo:end -->";

/** Bundle the TS route table so this Node script can read the same source. */
async function loadRoutes() {
  const out = join(root, "node_modules", ".cache", "kawi-routes.js");
  mkdirSync(dirname(out), { recursive: true });
  await build({
    absWorkingDir: root,
    entryPoints: { "kawi-routes": "src/lib/routeMeta.ts", "kawi-body": "src/lib/staticContent.ts" },
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "warning",
    alias: { "@": join(root, "src") },
    define: { "import.meta.env": "{}" },
    outdir: dirname(out),
  });
  return dirname(out);
}

const escape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** JSON-LD sits in a script element, so only the closing tag is dangerous. */
const escapeJson = (value) =>
  JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

function headFor(route) {
  const canonical = route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`;
  const image = `${SITE_URL}/logo512.png`;
  const rh = 'data-rh="true"';
  const lines = [
    `    <title ${rh}>${escape(route.title)}</title>`,
    `    <meta ${rh} name="description" content="${escape(route.description)}" />`,
    `    <meta ${rh} name="author" content="Kawi" />`,
  ];

  if (route.keywords?.length) {
    lines.push(
      `    <meta ${rh} name="keywords" content="${escape(route.keywords.join(", "))}" />`,
    );
  }

  lines.push(
    `    <meta ${rh} name="robots" content="index, follow, max-image-preview:large" />`,
    `    <link ${rh} rel="canonical" href="${escape(canonical)}" />`,
    `    <meta ${rh} property="og:site_name" content="Kawi" />`,
    `    <meta ${rh} property="og:locale" content="en_US" />`,
    `    <meta ${rh} property="og:type" content="${route.type ?? "website"}" />`,
    `    <meta ${rh} property="og:title" content="${escape(route.title)}" />`,
    `    <meta ${rh} property="og:description" content="${escape(route.description)}" />`,
    `    <meta ${rh} property="og:url" content="${escape(canonical)}" />`,
    `    <meta ${rh} property="og:image" content="${image}" />`,
  );

  if (route.type === "article") {
    if (route.publishedTime) {
      lines.push(
        `    <meta ${rh} property="article:published_time" content="${route.publishedTime}" />`,
      );
    }
    if (route.modifiedTime) {
      lines.push(
        `    <meta ${rh} property="article:modified_time" content="${route.modifiedTime}" />`,
      );
    }
    if (route.section) {
      lines.push(
        `    <meta ${rh} property="article:section" content="${escape(route.section)}" />`,
      );
    }
    for (const tag of route.tags ?? []) {
      lines.push(`    <meta ${rh} property="article:tag" content="${escape(tag)}" />`);
    }
  }

  lines.push(
    `    <meta ${rh} name="twitter:card" content="summary_large_image" />`,
    `    <meta ${rh} name="twitter:site" content="@KawiServices" />`,
    `    <meta ${rh} name="twitter:title" content="${escape(route.title)}" />`,
    `    <meta ${rh} name="twitter:description" content="${escape(route.description)}" />`,
    `    <meta ${rh} name="twitter:image" content="${image}" />`,
  );

  for (const schema of route.jsonLd ?? []) {
    lines.push(
      `    <script ${rh} type="application/ld+json">${escapeJson(schema)}</script>`,
    );
  }

  return lines.join("\n");
}

function sitemapFor(routes) {
  const urls = routes
    .map((route) => {
      const loc = route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : null,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}


/**
 * llms.txt — an emerging convention (llmstxt.org) that gives AI crawlers a
 * clean, plain-text map of the site: what Kawi is, plus every page with a
 * one-line description. It costs nothing and is read by several AI indexers.
 */
function llmsTxtFor(routes) {
  const line = (r) => `- [${r.title.replace(/ \| Kawi.*$/, "")}](${r.path === "/" ? SITE_URL : SITE_URL + r.path}): ${r.description}`;
  const isPost = (r) => r.path.startsWith("/blog/");
  const pages = routes.filter((r) => !isPost(r));
  const posts = routes.filter(isPost);
  return [
    "# Kawi",
    "",
    "> Kawi is a regulated Brazilian company that runs a hybrid settlement engine for cross-border payments: local fiat rails such as PIX to enter, Solana and USDC to settle, delivered in the destination currency as one auditable operation.",
    "",
    "## Pages",
    ...pages.map(line),
    "",
    "## Blog",
    ...posts.map(line),
    "",
  ].join("\n");
}

const cacheDir = await loadRoutes();
const { allRoutes } = await import(
  pathToFileURL(join(cacheDir, "kawi-routes.js")).href
);
const { staticBodyForPath } = await import(
  pathToFileURL(join(cacheDir, "kawi-body.js")).href
);
const routes = allRoutes();

if (routes.length === 0) {
  console.error("prerender: no routes resolved, aborting");
  process.exit(1);
}

const template = readFileSync(join(dist, "index.html"), "utf8");
if (!template.includes(START) || !template.includes(END)) {
  console.error(`prerender: ${START} / ${END} markers missing from index.html`);
  process.exit(1);
}

const before = template.slice(0, template.indexOf(START) + START.length);
const after = template.slice(template.indexOf(END));

const ROOT = '<div id="root"></div>';

for (const route of routes) {
  let html = `${before}\n${headFor(route)}\n${after}`;

  // Inject real body text for JS-less crawlers (AI answer engines especially).
  const body = staticBodyForPath(route.path);
  if (body) html = html.replace(ROOT, `<div id="root">${body}</div>`);

  const target =
    route.path === "/" ? join(dist, "index.html") : join(dist, route.path, "index.html");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, "utf8");
}

const sitemap = sitemapFor(routes);
writeFileSync(join(dist, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(root, "public", "sitemap.xml"), sitemap, "utf8");

const llms = llmsTxtFor(routes);
writeFileSync(join(dist, "llms.txt"), llms, "utf8");
writeFileSync(join(root, "public", "llms.txt"), llms, "utf8");

rmSync(join(cacheDir, "kawi-routes.js"), { force: true });
rmSync(join(cacheDir, "kawi-body.js"), { force: true });
console.log(`prerender: wrote ${routes.length} html files, sitemap.xml and llms.txt`);
