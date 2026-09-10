import type { BlogPost } from "./types";

export const platformPosts: BlogPost[] = [
  {
    slug: "benefits-of-hybrid-settlement-for-platforms",
    title: "What a platform actually gains from hybrid settlement",
    seoTitle: "Hybrid Settlement Benefits for Platforms",
    excerpt:
      "Not speed. Speed is the headline. The gains that change a business are capital efficiency, a smaller compliance surface and a support queue that stops growing with volume.",
    metaDescription:
      "The concrete benefits of hybrid settlement for platforms: faster payouts, lower working capital, fewer exceptions and transparent, predictable pricing.",
    category: "Platform",
    cluster: "Platform",
    pillar: true,
    date: "2026-08-22",
    updated: "2026-08-22",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Product research",
    tags: ["platforms", "marketplaces", "benefits"],
    keywords: [
      "hybrid settlement benefits",
      "marketplace payouts latam",
      "cross-border payouts platform",
      "embedded settlement",
    ],
    related: [
      "hybrid-settlement-infrastructure",
      "float-and-cost-of-capital",
      "integrate-the-kawi-widget",
      "building-a-remittance-product-on-kawi",
    ],
    content: [
      {
        type: "paragraph",
        text: "Every settlement pitch leads with speed, and speed is real. But when platforms tell us months later what actually changed, they rarely mention minutes. They mention capital, exceptions and the cost of being a payments company by accident.",
      },
      { type: "heading", text: "Working capital comes back" },
      {
        type: "paragraph",
        text: "A marketplace paying sellers across borders on a three-day cycle finances those three days. Compressing the cycle to minutes returns that capital to the business, and the arithmetic is the same as in [float and the cost of capital](/blog/float-and-cost-of-capital): shorter cycle, more turns, less balance sheet for the same volume.",
      },
      {
        type: "paragraph",
        text: "For a platform with meaningful cross-border payout volume, this is usually the largest single number in the whole evaluation, and it is almost never in the initial comparison spreadsheet.",
      },
      { type: "heading", text: "The support queue stops scaling with volume" },
      {
        type: "paragraph",
        text: "Where is my payout is the most expensive ticket in any marketplace, because answering it requires someone to chase a partner. When every operation has a live status and a verifiable trail, most of those tickets disappear and the rest are answered without a human, which is the practical payoff of [reconciliation by design](/blog/reconciliation-by-design).",
      },
      { type: "heading", text: "A smaller compliance surface" },
      {
        type: "paragraph",
        text: "Building payouts in-house means becoming responsible for local licensing, monitoring and reporting in every market you touch. Using regulated settlement infrastructure keeps that perimeter narrow. Kawi operates as a regulated company in Brazil and is expanding its framework for digital assets, and that work is ours rather than yours.",
      },
      { type: "heading", text: "Pricing you can show your users" },
      {
        type: "paragraph",
        text: "Quoting a delivered amount lets a platform tell a seller exactly what will arrive. That single change removes a whole class of disputes, and it is only possible when the underlying costs are itemised as described in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate).",
      },
      { type: "heading", text: "Optionality on what comes next" },
      {
        type: "paragraph",
        text: "Once settlement is an API call with deterministic behaviour, it can be driven by software rather than by an operations team. Platforms that integrate now are also positioned for the [agentic layer](/blog/kawi-agentic-layer) without a second migration.",
      },
      {
        type: "list",
        items: [
          "Faster payouts, measured in minutes rather than days.",
          "Working capital released by a shorter cycle.",
          "Fewer exceptions, so support cost decouples from volume.",
          "Narrower compliance perimeter.",
          "Transparent, itemised pricing you can pass through.",
        ],
      },
      {
        type: "paragraph",
        text: "If you want the implementation view rather than the business case, start with [integrating the Kawi widget and API](/blog/integrate-the-kawi-widget).",
      },
    ],
  },
  {
    slug: "settlement-sla-and-observability",
    title: "Settlement SLAs and the metrics that actually predict trouble",
    seoTitle: "Settlement SLAs and Observability Metrics",
    excerpt:
      "Uptime is the least useful number a payments platform can publish. What matters is the shape of the completion-time distribution and the rate at which operations need a human.",
    metaDescription:
      "Which metrics matter for settlement reliability: percentile completion times, exception rate, break categories and how to define an honest SLA.",
    category: "Platform",
    cluster: "Platform",
    date: "2026-08-15",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Platform reliability",
    tags: ["observability", "sla", "reliability", "metrics"],
    keywords: [
      "payment SLA",
      "settlement observability",
      "p99 settlement time",
      "payment reliability metrics",
    ],
    related: [
      "reconciliation-by-design",
      "designing-for-network-degradation",
      "event-driven-settlement-webhooks",
      "settlement-engine-state-machine",
    ],
    content: [
      {
        type: "paragraph",
        text: "A payments platform that reports 99.9% uptime and average settlement time is telling you almost nothing. Both numbers can look excellent while a meaningful share of operations are stuck, and stuck operations are the only kind anyone remembers.",
      },
      { type: "heading", text: "Percentiles, per leg" },
      {
        type: "paragraph",
        text: "Report p50, p95 and p99 completion time, broken down by leg. The average hides the tail, and the tail is the product. Splitting by leg is what makes the number actionable: a p99 dominated by the entry leg is a banking partner problem, one dominated by the on-chain leg is a [network condition](/blog/designing-for-network-degradation) problem, and they have different responses.",
      },
      { type: "heading", text: "Exception rate is the real health metric" },
      {
        type: "paragraph",
        text: "The percentage of operations requiring human intervention determines both support cost and the exception term in the [unit economics](/blog/unit-economics-of-a-settlement). It is also the earliest indicator that something structural has changed, usually days before it shows up in latency.",
      },
      { type: "heading", text: "Break categories, not break counts" },
      {
        type: "paragraph",
        text: "As argued in [reconciliation by design](/blog/reconciliation-by-design), the distribution of timing, amount, missing and duplicate breaks tells you which system to fix. A rising duplicate rate is an idempotency regression. A rising missing rate is a partner integration failing quietly.",
      },
      { type: "heading", text: "Stuck operations, by age" },
      {
        type: "list",
        items: [
          "Operations in a non-terminal state beyond their expected duration, bucketed by age.",
          "Time spent in degraded mode, and operations affected while there.",
          "Retry rate per leg, which leads latency as a signal.",
          "Webhook delivery success and consumer lag, per integrator.",
        ],
      },
      { type: "heading", text: "Write an SLA you can defend" },
      {
        type: "paragraph",
        text: "An honest SLA states a percentile, a window and an exclusion list, in the form: 95% of operations in this corridor complete within N minutes, excluding periods when the local rail or the network is degraded, with degradation defined by a published, measurable condition.",
      },
      {
        type: "paragraph",
        text: "Vague exclusions are what turn an SLA into a liability. If the excluded condition cannot be observed by both parties from published metrics, it is not an exclusion, it is an escape hatch.",
      },
      {
        type: "quote",
        text: "Publish the percentile you can defend on your worst week, not the average you achieved on your best day.",
        author: "Kawi Engineering",
      },
    ],
  },
  {
    slug: "building-a-remittance-product-on-kawi",
    title: "Building a remittance product on Kawi, end to end",
    seoTitle: "Build a Remittance Product on Kawi",
    excerpt:
      "The engine handles settlement. You still have to make a hundred product decisions, and about six of them determine whether it works.",
    metaDescription:
      "A practical guide to building a remittance product on Kawi: onboarding, quoting the delivered amount, funding, status communication, refunds and support.",
    category: "Platform",
    cluster: "Platform",
    date: "2026-08-08",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Developer experience",
    tags: ["remittances", "product", "integration"],
    keywords: [
      "build remittance app",
      "remittance product guide",
      "cross-border payment integration",
      "remittance UX",
    ],
    related: [
      "integrate-the-kawi-widget",
      "benefits-of-hybrid-settlement-for-platforms",
      "event-driven-settlement-webhooks",
      "stablecoins-for-remittances",
    ],
    content: [
      {
        type: "paragraph",
        text: "Settlement is the part we take off your plate. What remains is a product, and remittance products fail for product reasons far more often than for infrastructure reasons.",
      },
      { type: "heading", text: "Quote the delivered amount, always" },
      {
        type: "paragraph",
        text: "Let the user enter what the recipient should receive, not what they want to send. It matches how people actually think, it removes the mental arithmetic, and it forces every cost into one number, as argued in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate).",
      },
      { type: "heading", text: "Show the expiry" },
      {
        type: "paragraph",
        text: "A visible countdown on the quote sets expectations and prevents the worst support case: a user who funded a quote after it expired. The reason the window exists at all is explained in [quote expiry and price risk](/blog/quote-expiry-and-price-risk).",
      },
      { type: "heading", text: "Front-load the friction" },
      {
        type: "paragraph",
        text: "Collect identity and recipient details before the user funds, never after. Asking for a document while money is already in flight is the highest-abandonment moment in the entire flow, and it converts a settlement into a refund.",
      },
      { type: "heading", text: "Communicate status in the user's language, not yours" },
      {
        type: "list",
        items: [
          "Waiting for your payment, with the exact instructions repeated.",
          "Payment received, converting.",
          "Sent, with a reference the recipient can quote.",
          "Delivered, with the final amount.",
        ],
      },
      {
        type: "paragraph",
        text: "Drive these from [webhooks](/blog/event-driven-settlement-webhooks) rather than polling, and never expose internal state names. The user does not need to know what settling means; they need to know whether to worry.",
      },
      { type: "heading", text: "Design the refund path first" },
      {
        type: "paragraph",
        text: "Refunds are where trust is won or destroyed. Decide before launch who initiates one, how long it takes, what the user is told and how it is reconciled. Building it after the first incident guarantees the first incident is handled badly.",
      },
      { type: "heading", text: "Give support real tools" },
      {
        type: "paragraph",
        text: "One screen with the full operation trail: every state transition, every provider response, every reference. Agents who can answer without escalating are the difference between a support cost that scales with volume and one that does not, which is the same point made in [settlement SLAs and observability](/blog/settlement-sla-and-observability).",
      },
      { type: "heading", text: "Measure the right things at launch" },
      {
        type: "list",
        items: [
          "Quote-to-funded conversion, split by corridor and ticket size.",
          "Time from funded to delivered, at p95.",
          "Exception rate and its causes.",
          "Repeat rate at 30 days, which is the only real measure of trust.",
        ],
      },
      {
        type: "paragraph",
        text: "For the mechanics of the integration itself, see [adding fiat and crypto conversion to your product](/blog/integrate-the-kawi-widget).",
      },
    ],
  },
  {
    slug: "integrate-the-kawi-widget",
    title: "Adding fiat and crypto conversion to your product in an afternoon",
    seoTitle: "Kawi Widget and API Integration Guide",
    excerpt:
      "The Kawi widget mounts into any page and gives your users fiat to crypto, crypto to fiat and fiat to fiat conversion without a backend rewrite.",
    metaDescription:
      "How to integrate Kawi: mounting the RaaS widget, driving the same operations from the API, sandbox testing, idempotency keys and webhook handling.",
    category: "Developers",
    cluster: "Platform",
    date: "2026-08-01",
    readingMinutes: 6,
    author: "Kawi Engineering",
    authorRole: "Developer experience",
    tags: ["widget", "sdk", "integration", "api"],
    keywords: [
      "Kawi widget integration",
      "fiat to crypto widget",
      "payments SDK latam",
      "settlement API",
    ],
    related: [
      "event-driven-settlement-webhooks",
      "idempotency-in-settlement-systems",
      "building-a-remittance-product-on-kawi",
      "benefits-of-hybrid-settlement-for-platforms",
    ],
    content: [
      {
        type: "paragraph",
        text: "Most teams that need conversion inside their product do not want to become a payments company. They want a component that works, an event that tells them what happened, and a record they can reconcile.",
      },
      { type: "heading", text: "Mount the widget" },
      {
        type: "paragraph",
        text: "The widget is a single call. It renders inside a container you control, inherits your layout, and handles quoting, funding instructions and status on its own.",
      },
      {
        type: "code",
        language: "typescript",
        code: 'import { mountKawiRaasWidget } from "@kawiservices/sdk/widget";\n\nmountKawiRaasWidget("#kawi-widget", {\n  baseUrl: "https://mainnet.kawiservices.com",\n  appId: "YOUR_APP_ID",\n});',
      },
      { type: "heading", text: "Or drive it from the API" },
      {
        type: "paragraph",
        text: "If you already have your own interface, the same operations are available directly. You create the operation, you receive events, and the engine handles every leg underneath, exactly as described in [hybrid settlement infrastructure](/blog/hybrid-settlement-infrastructure).",
      },
      {
        type: "code",
        language: "bash",
        code: 'curl https://mainnet.kawiservices.com/api/platform/stats \\\n  -H "x-api-key: $KAWI_API_KEY"',
      },
      { type: "heading", text: "Four things to get right on day one" },
      {
        type: "list",
        items: [
          "Run a full operation end to end in the sandbox before touching production keys.",
          "Store the Kawi operation id next to your own record. It is the join key for every [reconciliation](/blog/reconciliation-by-design) later.",
          "Send an [idempotency key](/blog/idempotency-in-settlement-systems) derived from your own order id, and never regenerate it on retry.",
          "Make your [webhook handler](/blog/event-driven-settlement-webhooks) idempotent and order-independent from the start.",
        ],
      },
      {
        type: "paragraph",
        text: "Those four cost an hour at the beginning and save weeks later. Everything else in an integration is recoverable; these four are the ones that quietly corrupt data if they are wrong.",
      },
      {
        type: "paragraph",
        text: "The full reference lives in the Kawi documentation. For the product decisions around the integration, see [building a remittance product on Kawi](/blog/building-a-remittance-product-on-kawi).",
      },
    ],
  },
  {
    slug: "brl-to-usdc-corridor",
    title: "Inside the BRL to USDC corridor",
    seoTitle: "BRL to USDC: How PIX Becomes Stablecoin",
    excerpt:
      "A walkthrough of what happens between a PIX payment landing in Brazil and USDC liquidity being available on the other side.",
    metaDescription:
      "A step-by-step walkthrough of the Kawi BRL to USDC corridor: quoting, PIX capture, conversion, Solana settlement and delivery, leg by leg.",
    category: "Corridors",
    cluster: "Infrastructure",
    date: "2026-07-10",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["brazil", "usdc", "pix", "solana"],
    keywords: [
      "BRL to USDC",
      "PIX to stablecoin",
      "Brazil crypto corridor",
      "USDC settlement Brazil",
    ],
    related: [
      "hybrid-settlement-infrastructure",
      "why-solana-for-settlement",
      "settlement-engine-state-machine",
      "prefunding-strategy",
    ],
    content: [
      {
        type: "paragraph",
        text: "Brazil is the corridor where the Kawi engine was first proven, and it is our live corridor today. The reason is structural: PIX made local money movement instant, which means the only remaining bottleneck is the border.",
      },
      { type: "heading", text: "Step one: the quote" },
      {
        type: "paragraph",
        text: "Before any money moves, the operation is quoted. The quote locks the delivered amount, the rate, the fees and an expiry. Nothing about the operation is ambiguous afterwards, which is what makes reconciliation possible later. Why the expiry exists is explained in [quote expiry and price risk](/blog/quote-expiry-and-price-risk).",
      },
      {
        type: "code",
        language: "bash",
        code: "curl https://mainnet.kawiservices.com/api/platform/quote \\\n  -H \"x-api-key: $KAWI_API_KEY\" \\\n  -d '{ \"from\": \"BRL\", \"to\": \"USDC\", \"amount\": 5000 }'",
      },
      { type: "heading", text: "Step two: local capture" },
      {
        type: "paragraph",
        text: "The payer completes a PIX transfer against the quote. Confirmation typically arrives in seconds and the operation moves from awaiting_funds to funded. Until that confirmation is final, nothing downstream executes, which is a deliberate placement of the point of no return in the [state machine](/blog/settlement-engine-state-machine).",
      },
      { type: "heading", text: "Step three: conversion and on-chain settlement" },
      {
        type: "paragraph",
        text: "The funded amount is converted into USDC and settled on Solana. This is the leg where the corridor gets its speed: sub-second blocks, fees in fractions of a cent, and a transaction signature anyone can verify. The reasoning behind the network choice is in [why Solana for settlement](/blog/why-solana-for-settlement).",
      },
      {
        type: "list",
        items: [
          "Average end to end time: around one minute.",
          "Every leg carries a reference tying the bank record to the on-chain signature.",
          "Failures roll back to a defined state instead of leaving value in limbo.",
        ],
      },
      { type: "heading", text: "Step four: delivery" },
      {
        type: "paragraph",
        text: "From there the USDC is either delivered as liquidity to the receiving account or converted again into the destination currency and paid out locally. The choice belongs to the integrating platform, not to the engine.",
      },
      {
        type: "paragraph",
        text: "What makes the one-minute promise possible is not only the network. It is capital already positioned on both sides, which is the subject of [prefunding strategy](/blog/prefunding-strategy). Speed here is as much a treasury decision as an engineering one.",
      },
    ],
  },
  {
    slug: "stablecoins-for-remittances",
    title: "Why stablecoins beat correspondent banking for remittances",
    seoTitle: "Stablecoins vs Correspondent Banking for Remittances",
    excerpt:
      "The case is not ideological. It is arithmetic: fewer intermediaries, shorter settlement windows and a cost structure that does not scale with distance.",
    metaDescription:
      "Why stablecoin settlement outperforms correspondent banking for remittances: fewer hops, distance-independent cost, continuous operation and verifiable records.",
    category: "Remittances",
    cluster: "Economics",
    date: "2026-07-03",
    readingMinutes: 6,
    author: "Kawi Research",
    authorRole: "Product research",
    tags: ["remittances", "stablecoins", "latam"],
    keywords: [
      "stablecoin remittances",
      "correspondent banking cost",
      "cheaper remittances latam",
      "cross-border transfer cost",
    ],
    related: [
      "kawi-web3-cuba",
      "economics-of-cross-border-settlement",
      "fiat-rails-vs-blockchain-rails",
      "usdc-liquidity-on-solana",
      "building-a-remittance-product-on-kawi",
    ],
    content: [
      {
        type: "paragraph",
        text: "A traditional cross-border transfer passes through a chain of correspondent banks. Each link adds a fee, a cut-off time and a point where the transfer can be held. The cost is not driven by the amount sent. It is driven by the number of intermediaries, which is why small transfers are punished hardest.",
      },
      { type: "heading", text: "What changes with stablecoin settlement" },
      {
        type: "paragraph",
        text: "When the middle leg settles on-chain, the chain of intermediaries collapses into a single transfer with one sender, one receiver and one record. What remains is the local entry and the local exit, which are the parts that actually deliver value to the user.",
      },
      {
        type: "list",
        items: [
          "Settlement windows measured in seconds instead of business days.",
          "Costs that stay flat regardless of distance between countries.",
          "A public record both sides can verify without requesting a statement.",
          "Weekend and holiday operation, because the network does not close.",
        ],
      },
      {
        type: "paragraph",
        text: "The full breakdown of which cost families this removes, and which it merely reshapes, is in [the economics of cross-border settlement](/blog/economics-of-cross-border-settlement).",
      },
      { type: "heading", text: "The part people get wrong" },
      {
        type: "paragraph",
        text: "Stablecoins do not remove the need for compliance, liquidity management or local payout partners. They remove the need for the transfer itself to be slow and opaque. Everything else still has to be built properly, and the capital question in particular does not disappear, as [prefunding strategy](/blog/prefunding-strategy) makes clear.",
      },
      {
        type: "paragraph",
        text: "That is why Kawi is a hybrid engine rather than a crypto wallet. The blockchain leg is one component of a system whose job is to deliver local currency to a real person, on time, with a record that survives an audit. The rail-by-rail comparison is in [fiat rails versus blockchain rails](/blog/fiat-rails-vs-blockchain-rails).",
      },
    ],
  },
  {
    slug: "traceability-and-security",
    title: "How we make every settlement verifiable",
    seoTitle: "Settlement Traceability and Security",
    excerpt:
      "Traceability is not a dashboard feature. It is a property of the way each operation is recorded, signed and reconciled.",
    metaDescription:
      "How Kawi makes every settlement verifiable: single correlation ids, append-only state, raw provider evidence and independently checkable on-chain legs.",
    category: "Security",
    cluster: "Infrastructure",
    date: "2026-06-26",
    readingMinutes: 5,
    author: "Kawi Engineering",
    authorRole: "Platform security",
    tags: ["security", "auditability", "operations"],
    keywords: [
      "payment auditability",
      "verifiable settlement",
      "transaction traceability",
      "on-chain proof payments",
    ],
    related: [
      "reconciliation-by-design",
      "settlement-engine-state-machine",
      "token-extensions-for-regulated-flows",
      "kawi-agentic-layer",
    ],
    content: [
      {
        type: "paragraph",
        text: "In a settlement system, the question that matters after something goes wrong is simple: can you prove what happened? If the answer depends on someone remembering, the system is not ready to carry other people's money.",
      },
      { type: "heading", text: "One operation, one trail" },
      {
        type: "paragraph",
        text: "Every Kawi operation carries a single identifier from the first quote to the final payout. Bank references, conversion records and on-chain signatures all attach to it. Reconstructing an operation means reading one trail rather than correlating four systems by timestamp, which is the design principle behind [reconciliation by design](/blog/reconciliation-by-design).",
      },
      {
        type: "list",
        items: [
          "State transitions are append-only. Nothing is silently overwritten.",
          "External confirmations are stored as received, including the raw provider response.",
          "On-chain legs are verifiable independently, by anyone, without our systems.",
          "Access to operational records is limited to the systems and people that need it.",
        ],
      },
      { type: "heading", text: "Reducing the surface" },
      {
        type: "paragraph",
        text: "Fewer intermediaries also means fewer points of failure. Each removed hop is one less place where a transfer can be delayed, one less system holding user data and one less party that has to be trusted for the operation to complete.",
      },
      {
        type: "quote",
        text: "The strongest security property of a settlement is that it can be checked by someone who does not trust you.",
        author: "Kawi Engineering",
      },
      {
        type: "paragraph",
        text: "That standard becomes essential rather than admirable once software is spending money on its own. A receipt that a third party can verify is the foundation of the [agentic layer](/blog/kawi-agentic-layer).",
      },
    ],
  },
];
