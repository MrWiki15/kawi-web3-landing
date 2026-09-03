import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe2, ShieldCheck, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Seo from "@/components/Seo";
import { aboutMeta } from "@/lib/routeMeta";
import { getPillarForCluster } from "@/data/blogPosts";
import {
  BLOG_URL,
  COLLABORATIONS_MAILTO,
  COMPANY_EMAIL,
  DOCS_URL,
  PORTAL_URL,
  REGULATION_URL,
  WEB_APP_URL,
} from "@/lib/links";

const stats = [
  { value: "Dec 2025", label: "Founded" },
  { value: "5", label: "Corridors live or in testing" },
  { value: "1 min", label: "Average settlement time" },
  { value: "24/7", label: "Platform availability" },
];

const pillars = [
  {
    icon: Building2,
    title: "Fiat access where people already are",
    body: "Kawi captures value locally with the rails users already trust, such as PIX and bank transfers, so entering the system never requires learning crypto first.",
  },
  {
    icon: Zap,
    title: "Blockchain settlement",
    body: "Once value is inside, settlement runs on Solana and stablecoin liquidity: fast finality, low cost and a public trail that can be audited operation by operation.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance as infrastructure",
    body: "Licensing, controls and traceability are part of the engine, not a layer added at the end. Every settlement leaves a record that can be reconciled.",
  },
  {
    icon: Globe2,
    title: "Latam first, global by design",
    body: "We start where the friction is highest and the rails are best, which is Brazil, and expand the same programmable engine to every corridor that clears its regulatory and operational bar.",
  },
];

const timeline = [
  {
    year: "Dec 2025",
    title: "Kawi is founded",
    body: "Kawi starts around one concrete problem: turning local BRL payments into usable global liquidity without waiting days for intermediaries. The first version of the settlement engine is built to answer it.",
  },
  {
    year: "Jan 2026",
    title: "Beta with real operations",
    body: "The product goes into beta so the engine can be tested against real money, real timings and real failure cases, instead of assumptions. Every leg, quote and payout is measured before opening up further.",
  },
  {
    year: "Mar 2026",
    title: "Regulated in Brazil",
    body: "Kawi becomes a regulated company in Brazil, with compliance, monitoring and reporting built into the engine rather than added around it. Brazil is the corridor that carries live volume from here on.",
  },
  {
    year: "Now",
    title: "Expanding across Latam",
    body: "The same programmable engine is being taken to more Latin American countries, one corridor at a time, as each clears its regulatory and operational bar.",
  },
];

const values = [
  {
    title: "Transparency over promises",
    body: "Every operation can be verified. We would rather show the trail than ask for trust.",
  },
  {
    title: "Speed that is measured",
    body: "Settlement time is a product metric, not a marketing line. We publish it and we defend it.",
  },
  {
    title: "Access before sophistication",
    body: "A user should be able to send value without understanding wallets, gas or networks.",
  },
  {
    title: "Long term over shortcuts",
    body: "We build inside regulation because infrastructure that cannot be audited cannot scale.",
  },
];

const AboutPage = () => {
  const pillarReading = ["Infrastructure", "Economics", "Solana", "Agentic"]
    .map((cluster) => getPillarForCluster(cluster))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return (
  <div className="min-h-screen bg-background">
    <Seo
      title={aboutMeta.title}
      description={aboutMeta.description}
      path={aboutMeta.path}
      keywords={aboutMeta.keywords}
      jsonLd={aboutMeta.jsonLd}
    />
    <Navbar />

    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">About Us</li>
            </ol>
          </nav>
          <h1 className="text-4xl lg:text-7xl font-display tracking-tight leading-[1.05] mb-8 max-w-4xl">
            We build the settlement layer
            <br className="hidden lg:block" /> Latin America was missing.
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            Kawi connects banking infrastructure with blockchain settlement so money can
            move between countries in minutes instead of days, with a record that anyone
            involved can verify.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              Open the web app
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center hover:bg-muted transition-colors"
            >
              Read the documentation
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ScrollReveal>
        <section className="border-y border-foreground/10 bg-card/40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-10 lg:py-14 ${
                    index !== 0 ? "lg:border-l lg:border-foreground/10 lg:pl-10" : ""
                  }`}
                >
                  <p className="font-display text-4xl lg:text-5xl text-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Mission */}
      <ScrollReveal>
        <section className="py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Our mission
              </span>
              <h2 className="mt-6 text-3xl lg:text-5xl font-display tracking-tight leading-tight">
                Make cross-border value move like a message.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sending money between Latin American countries still means intermediaries,
                opaque fees and days of waiting. The technology to fix it already exists.
                What was missing was an engine that speaks both languages: the regulated
                banking system and public blockchain networks.
              </p>
              <p>
                Kawi is that engine. Value enters through local fiat rails, is converted
                into stablecoin liquidity, moves across the network and is delivered in the
                destination currency. The whole path is coordinated by rules and API calls
                instead of manual operations.
              </p>
              <p>
                We are not trying to convince people to change how they pay. We are making
                the infrastructure underneath faster, cheaper and verifiable, while the
                experience stays familiar.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Pillars */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 border-t border-foreground/10 section-light">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                What we build
              </span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-background p-8 lg:p-12">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
                    <pillar.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-display mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Timeline */}
      <ScrollReveal>
        <section className="py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                How we got here
              </span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            <div className="space-y-px">
              {timeline.map((item) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-foreground/10"
                >
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm text-secondary-foreground bg-secondary/30 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="md:col-span-4 text-2xl font-display leading-tight">
                    {item.title}
                  </h3>
                  <p className="md:col-span-6 text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 border-t border-foreground/10 section-cream">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-14 max-w-2xl">
              What we hold ourselves to.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {values.map((value, index) => (
                <div key={value.title}>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-display mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Reading */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-14">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                How we think about this
              </span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {pillarReading.map((post) => (
                <Link
                  key={post.slug}
                  to={`${BLOG_URL}/${post.slug}`}
                  className="group border-t border-foreground/10 pt-6"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {post.cluster}
                  </span>
                  <h3 className="mt-3 text-xl font-display leading-snug text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>

            <p className="mt-12 text-muted-foreground">
              Our regulatory position is described on the{" "}
              <Link
                to={REGULATION_URL}
                className="text-foreground underline decoration-secondary decoration-2 underline-offset-4 hover:text-primary transition-colors"
              >
                regulation and compliance
              </Link>{" "}
              page, and the rest of our writing lives on the{" "}
              <Link
                to={BLOG_URL}
                className="text-foreground underline decoration-secondary decoration-2 underline-offset-4 hover:text-primary transition-colors"
              >
                Kawi blog
              </Link>
              .
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact */}
      <ScrollReveal>
        <section className="py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="rounded-3xl border border-foreground/10 bg-card p-10 lg:p-16">
              <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-6 max-w-2xl">
                Building something that needs settlement? Talk to us.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
                Platforms, remittance operators, investors and accelerators can reach the
                team directly at {COMPANY_EMAIL}. We answer with documentation, not decks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={COLLABORATIONS_MAILTO}
                  className="bg-primary text-primary-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Contact the team
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border text-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center hover:bg-muted transition-colors"
                >
                  Go to the portal
                </a>
                <a
                  href={BLOG_URL}
                  className="border border-border text-foreground px-8 h-14 rounded-full font-semibold inline-flex items-center justify-center hover:bg-muted transition-colors"
                >
                  Read the blog
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>

    <Footer />
  </div>
  );
};

export default AboutPage;
