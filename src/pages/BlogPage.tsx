import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Seo from "@/components/Seo";
import { blogMeta } from "@/lib/routeMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  blogCategories,
  blogClusters,
  formatPostDate,
  getClusterPosts,
  getPillarForCluster,
  sortedPosts,
  type BlogPost,
} from "@/data/blogPosts";
import { BLOG_URL, TWITTER_URL } from "@/lib/links";

const localeMap: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  pt: "pt-BR",
};

const clusterBlurbs: Record<string, string> = {
  Infrastructure:
    "How the settlement engine is built: legs, states, idempotency and reconciliation.",
  Solana: "Why the blockchain leg runs on Solana, and how we operate it on bad days.",
  Economics:
    "Where the money goes: unit economics, float, prefunding math and corridor pricing.",
  Agentic:
    "The layer that lets software operate settlement safely, starting with our own treasury.",
  Platform: "Integrating Kawi, and what a platform gains from doing it.",
  Expansion:
    "How Kawi brings Web3 and open financial tools to Latin America, starting with Cuba.",
};

const ALL = "All";

const PostCard = ({ post, locale }: { post: BlogPost; locale: string }) => (
  <article className="group border-t border-foreground/10 pt-8">
    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
      <span className="text-foreground">{post.category}</span>
      <span className="w-1 h-1 rounded-full bg-foreground/20" />
      <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
      <span className="w-1 h-1 rounded-full bg-foreground/20" />
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {post.readingMinutes} min
      </span>
    </div>

    <h2 className="text-2xl lg:text-3xl font-display leading-tight mb-4">
      <Link
        to={`${BLOG_URL}/${post.slug}`}
        className="text-foreground hover:text-primary transition-colors"
      >
        {post.title}
      </Link>
    </h2>

    <p className="text-muted-foreground leading-relaxed mb-5">{post.excerpt}</p>

    <div className="flex flex-wrap items-center gap-2 mb-5">
      {post.tags.slice(0, 4).map((tag) => (
        <span
          key={tag}
          className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-foreground/10 text-muted-foreground"
        >
          #{tag}
        </span>
      ))}
    </div>

    <Link
      to={`${BLOG_URL}/${post.slug}`}
      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
      aria-label={`Read ${post.title}`}
    >
      Read the article
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Link>
  </article>
);

const BlogPage = () => {
  const { lang } = useLanguage();
  const locale = localeMap[lang] ?? "en-US";
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const featured = sortedPosts.find((post) => post.featured) ?? sortedPosts[0];

  const visiblePosts = useMemo(
    () =>
      sortedPosts.filter(
        (post) =>
          post.slug !== featured.slug &&
          (activeCategory === ALL || post.category === activeCategory),
      ),
    [activeCategory, featured.slug],
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={blogMeta.title}
        description={blogMeta.description}
        path={blogMeta.path}
        keywords={blogMeta.keywords}
        jsonLd={blogMeta.jsonLd}
      />
      <Navbar />

      <main>
        {/* Header */}
        <section className="pt-32 pb-12 lg:pt-44 lg:pb-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground">Blog</li>
              </ol>
            </nav>

            <h1 className="text-4xl lg:text-7xl font-display tracking-tight leading-[1.05] mb-8 max-w-4xl">
              Notes from the settlement layer.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              How the Kawi engine works, the economics and math behind moving value across
              borders, why we settle on Solana, and the agentic layer we are building on
              top of it.
            </p>
          </div>
        </section>

        {/* Topic clusters */}
        <ScrollReveal>
          <section className="pb-16 lg:pb-20">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="flex items-center gap-4 mb-10">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase inline-flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  Start here
                </span>
                <div className="flex-1 h-px bg-foreground/10" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
                {blogClusters.map((cluster) => {
                  const pillar = getPillarForCluster(cluster);
                  const count = getClusterPosts(cluster).length;
                  if (!pillar) return null;
                  return (
                    <Link
                      key={cluster}
                      to={`${BLOG_URL}/${pillar.slug}`}
                      className="group bg-background p-8 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          {cluster}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(count).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="text-xl font-display leading-snug text-foreground mb-3 group-hover:text-primary transition-colors">
                        {pillar.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {clusterBlurbs[cluster] ?? pillar.excerpt}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Featured */}
        <ScrollReveal>
          <section className="pb-16 lg:pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <Link
                to={`${BLOG_URL}/${featured.slug}`}
                className="group block rounded-3xl border border-foreground/10 bg-card p-8 lg:p-14 hover:border-foreground/25 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="px-2.5 py-1 rounded-full bg-secondary/30 text-secondary-foreground">
                    Featured
                  </span>
                  <span>{featured.category}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground/20" />
                  <time dateTime={featured.date}>
                    {formatPostDate(featured.date, locale)}
                  </time>
                </div>

                <h2 className="text-3xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-6 max-w-3xl text-foreground">
                  {featured.title}
                </h2>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  {featured.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read the article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* Filters + list */}
        <section className="pb-24 lg:pb-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap gap-2 mb-14">
              {[ALL, ...blogCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`px-4 h-10 rounded-full text-sm font-medium border transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {visiblePosts.length === 0 ? (
              <p className="text-muted-foreground">No articles in this category yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
                {visiblePosts.map((post) => (
                  <PostCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Follow */}
        <ScrollReveal>
          <section className="pb-24 lg:pb-32">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="rounded-3xl border border-foreground/10 section-cream p-10 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-3">
                    New posts land on X first.
                  </h2>
                  <p className="text-muted-foreground max-w-xl">
                    Follow the Kawi account for release notes, corridor updates and the
                    occasional breakdown of what broke and how we fixed it.
                  </p>
                </div>
                <a
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center gap-2 shrink-0 hover:opacity-90 transition-opacity"
                >
                  Follow @KawiServices
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
