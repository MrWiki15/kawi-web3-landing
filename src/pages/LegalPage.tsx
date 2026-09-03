import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { legalMeta } from "@/lib/routeMeta";
import { legalPages, type LegalPageKind } from "@/data/legalPages";

export default function LegalPage({ kind }: { kind: LegalPageKind }) {
  const page = legalPages[kind];
  const meta = legalMeta(kind);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        keywords={meta.keywords}
        jsonLd={meta.jsonLd}
      />
      <Navbar />
      <main className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{page.eyebrow}</li>
            </ol>
          </nav>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            {page.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-14">
            {page.description}
          </p>

          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.title} className="border-t border-foreground/10 pt-8">
                <h2 className="text-2xl lg:text-3xl font-display mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
