import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { ABOUT_URL, BLOG_URL } from "@/lib/links";

/**
 * Unknown URLs used to redirect to the homepage, which made every broken or
 * probed link look like a working page returning 200. Serving a real, noindexed
 * "not found" page instead keeps those URLs out of the index.
 */
const NotFoundPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Seo
      title="Page not found | Kawi"
      description="This Kawi page does not exist. Head back to the settlement engine, the blog or the company page."
      path="/404"
      noIndex
    />
    <Navbar />

    <main className="flex-1 flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-32">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
          <span className="w-8 h-px bg-secondary" />
          404
        </span>
        <h1 className="text-4xl lg:text-7xl font-display tracking-tight leading-[1.05] mb-8 max-w-3xl">
          This page is not part of Kawi.
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
          The address you followed does not match anything on the site. It may have been
          moved, or the link may have been mistyped.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="bg-primary text-primary-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
          >
            Back to the homepage
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={BLOG_URL}
            className="border border-border text-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center hover:bg-muted transition-colors"
          >
            Read the blog
          </Link>
          <Link
            to={ABOUT_URL}
            className="border border-border text-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center hover:bg-muted transition-colors"
          >
            About Kawi
          </Link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default NotFoundPage;
