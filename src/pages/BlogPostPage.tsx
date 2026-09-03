import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Clock, Link2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichText from "@/components/RichText";
import ScrollReveal from "@/components/ScrollReveal";
import Seo from "@/components/Seo";
import { postMeta } from "@/lib/routeMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  formatPostDate,
  getClusterPosts,
  getIncomingLinks,
  getPillarForCluster,
  getPostBySlug,
  getRelatedPosts,
  sortedPosts,
  type BlogBlock,
} from "@/data/blogPosts";
import { BLOG_URL } from "@/lib/links";

const localeMap: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  pt: "pt-BR",
};

const Block = ({ block }: { block: BlogBlock }) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl lg:text-3xl font-display tracking-tight text-foreground mt-14 mb-5 scroll-mt-28">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-lg text-muted-foreground leading-relaxed"
            >
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-secondary pl-6">
          <p className="text-xl lg:text-2xl font-display leading-snug text-foreground">
            {block.text}
          </p>
          {block.author && (
            <cite className="mt-3 block not-italic text-sm font-mono text-muted-foreground">
              {block.author}
            </cite>
          )}
        </blockquote>
      );
    case "code":
      return (
        <div className="my-8 rounded-2xl border border-foreground/10 bg-foreground overflow-hidden">
          <div className="px-4 py-2 border-b border-background/10 text-[11px] font-mono uppercase tracking-widest text-background/50">
            {block.language}
          </div>
          <pre className="p-4 lg:p-6 overflow-x-auto text-sm leading-relaxed text-background/90">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "formula":
      return (
        <figure className="my-8 rounded-2xl border border-foreground/10 bg-muted/50 overflow-hidden">
          <div className="px-5 py-6 overflow-x-auto">
            <p className="font-mono text-base lg:text-lg text-foreground whitespace-pre">
              {block.expression}
            </p>
          </div>
          {block.caption && (
            <figcaption className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return (
        <p className="text-lg text-muted-foreground leading-relaxed my-6">
          <RichText text={block.text} />
        </p>
      );
  }
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const locale = localeMap[lang] ?? "en-US";
  const [copied, setCopied] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!post) return <Navigate to={BLOG_URL} replace />;

  const path = `${BLOG_URL}/${post.slug}`;
  const related = getRelatedPosts(post, 3);
  const pillar = post.pillar ? undefined : getPillarForCluster(post.cluster);
  const clusterPosts = getClusterPosts(post.cluster).filter((p) => p.slug !== post.slug);
  const referencedBy = getIncomingLinks(post.slug)
    .filter((p) => !related.some((r) => r.slug === p.slug))
    .slice(0, 4);

  const index = sortedPosts.findIndex((entry) => entry.slug === post.slug);
  const previous = index > 0 ? sortedPosts[index - 1] : null;
  const next = index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null;

  const meta = postMeta(post.slug);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={meta?.title ?? `${post.title} | Kawi`}
        description={meta?.description ?? post.excerpt}
        path={path}
        keywords={post.keywords}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.updated ?? post.date}
        section={post.category}
        tags={post.tags}
        jsonLd={meta?.jsonLd ?? []}
      />
      <Navbar />

      <main>
        <article>
          {/* Header */}
          <header className="pt-32 pb-10 lg:pt-44 lg:pb-14">
            <div className="max-w-3xl mx-auto px-6 lg:px-0">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  <li>
                    <Link to="/" className="hover:text-foreground transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      to={BLOG_URL}
                      className="hover:text-foreground transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-foreground">{post.category}</li>
                </ol>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <span className="px-2.5 py-1 rounded-full bg-secondary/30 text-secondary-foreground">
                  {post.category}
                </span>
                <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                <span className="w-1 h-1 rounded-full bg-foreground/20" />
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingMinutes} min read
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              {pillar && (
                <p className="mt-6 text-sm text-muted-foreground">
                  Part of the{" "}
                  <Link
                    to={`${BLOG_URL}/${pillar.slug}`}
                    className="text-foreground underline decoration-secondary decoration-2 underline-offset-4 hover:text-primary transition-colors"
                  >
                    {post.cluster.toLowerCase()} series
                  </Link>
                  .
                </p>
              )}

              <div className="mt-10 pt-6 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                </div>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 text-sm border border-border rounded-full px-4 h-10 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  {copied ? "Link copied" : "Copy link"}
                </button>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="pb-16 lg:pb-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-0">
              {post.content.map((block, i) => (
                <Block key={`${block.type}-${i}`} block={block} />
              ))}

              <div className="mt-14 pt-8 border-t border-foreground/10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-foreground/10 text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Cluster index: the full series, from every article in it */}
        {clusterPosts.length > 0 && (
          <section className="pb-16 lg:pb-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-0">
              <div className="rounded-2xl border border-foreground/10 bg-muted/40 p-6 lg:p-8">
                <h2 className="text-lg font-display text-foreground mb-5">
                  More in {post.cluster}
                </h2>
                <ul className="space-y-3">
                  {clusterPosts.map((item) => (
                    <li key={item.slug} className="flex gap-3">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <Link
                        to={`${BLOG_URL}/${item.slug}`}
                        className="text-muted-foreground hover:text-primary transition-colors leading-relaxed"
                      >
                        {item.title}
                        {item.pillar && (
                          <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-secondary-foreground bg-secondary/30 px-2 py-0.5 rounded-full">
                            Pillar
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Referenced by */}
        {referencedBy.length > 0 && (
          <section className="pb-16 lg:pb-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-0">
              <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-5">
                Referenced by
              </h2>
              <ul className="space-y-2">
                {referencedBy.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`${BLOG_URL}/${item.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Prev / next */}
        {(previous || next) && (
          <section className="pb-16 lg:pb-24">
            <div className="max-w-3xl mx-auto px-6 lg:px-0 grid sm:grid-cols-2 gap-4">
              {previous ? (
                <Link
                  to={`${BLOG_URL}/${previous.slug}`}
                  rel="prev"
                  className="group rounded-2xl border border-foreground/10 p-6 hover:border-foreground/25 transition-colors"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-2 mb-3">
                    <ArrowLeft className="w-3 h-3" />
                    Newer
                  </span>
                  <p className="font-display text-lg leading-snug text-foreground">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`${BLOG_URL}/${next.slug}`}
                  rel="next"
                  className="group rounded-2xl border border-foreground/10 p-6 hover:border-foreground/25 transition-colors sm:text-right"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-2 mb-3 sm:justify-end">
                    Older
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <p className="font-display text-lg leading-snug text-foreground">
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <ScrollReveal>
            <section className="pb-24 lg:pb-32 border-t border-foreground/10 pt-16 lg:pt-24">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex items-center gap-4 mb-12">
                  <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    Keep reading
                  </span>
                  <div className="flex-1 h-px bg-foreground/10" />
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      to={`${BLOG_URL}/${item.slug}`}
                      className="group border-t border-foreground/10 pt-6"
                    >
                      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        {item.category}
                      </span>
                      <h3 className="mt-3 text-xl font-display leading-snug text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {item.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
