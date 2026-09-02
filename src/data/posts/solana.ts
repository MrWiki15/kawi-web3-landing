import type { BlogPost } from "./types";

export const solanaPosts: BlogPost[] = [
  {
    slug: "why-solana-for-settlement",
    title: "Why Kawi settles on Solana",
    seoTitle: "Why Solana for Cross-Border Settlement",
    excerpt:
      "The middle leg of a hybrid settlement has three requirements. Solana is the network that satisfies all three at once, and the third one is the hard part.",
    metaDescription:
      "Why Kawi settles cross-border payments on Solana: sub-second block times, fees that stay negligible for small tickets, and deep USDC liquidity.",
    category: "Solana",
    cluster: "Solana",
    pillar: true,
    date: "2026-08-25",
    updated: "2026-08-25",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["solana", "stablecoins", "usdc", "architecture"],
    keywords: [
      "why Solana for payments",
      "Solana settlement layer",
      "USDC on Solana",
      "stablecoin settlement network",
    ],
    related: [
      "solana-finality-for-payments",
      "solana-fee-economics",
      "usdc-liquidity-on-solana",
      "hybrid-settlement-infrastructure",
    ],
    content: [
      {
        type: "paragraph",
        text: "In [hybrid settlement infrastructure](/blog/hybrid-settlement-infrastructure), the blockchain leg does one job: move value between two points that are far apart, quickly, cheaply and verifiably. Choosing the network for that job is not an ideological decision. It is three constraints, and most networks fail at least one.",
      },
      { type: "heading", text: "Constraint one: confirmation cannot dominate the clock" },
      {
        type: "paragraph",
        text: "Kawi targets end-to-end settlement measured in about a minute. Within that budget, the entry leg, conversion, on-chain transfer and payout instruction all have to fit. A network whose practical confirmation time is measured in minutes consumes the entire budget by itself.",
      },
      {
        type: "paragraph",
        text: "Solana produces blocks sub-second and reaches a usable confirmation level in a small number of seconds. That leaves the majority of the time budget for the fiat legs, which are the parts we do not control. The nuance between confirmed and finalised is covered in [Solana finality for payments](/blog/solana-finality-for-payments).",
      },
      { type: "heading", text: "Constraint two: fees cannot distort small tickets" },
      {
        type: "paragraph",
        text: "Remittance-sized transfers are small. A fixed network fee of a few dollars is invisible on a hundred-thousand-dollar treasury movement and fatal on a fifty-dollar transfer. Because blockchain fees do not scale with amount, the fee is effectively a floor on the ticket size a corridor can serve profitably.",
      },
      {
        type: "paragraph",
        text: "Solana's fees stay in fractions of a cent under normal conditions, which keeps the floor low enough that the network cost is not a term worth optimising in the [unit economics of a settlement](/blog/unit-economics-of-a-settlement). Contention and priority fees change that picture at the margin, which is why we treat them explicitly in [Solana fee economics](/blog/solana-fee-economics).",
      },
      { type: "heading", text: "Constraint three: the stablecoin has to be deep" },
      {
        type: "paragraph",
        text: "This is the one most comparisons skip. A fast, cheap network with thin stablecoin liquidity is useless for settlement, because the cost of a transfer is irrelevant next to the slippage of getting in and out of the asset. What matters is not the network's throughput but the depth of the USDC book against the currencies you actually touch.",
      },
      {
        type: "paragraph",
        text: "Solana carries deep native USDC liquidity with direct issuance and redemption, which means the conversion legs can execute at tight spreads at the sizes a corridor needs. We break that down in [USDC liquidity on Solana](/blog/usdc-liquidity-on-solana), and its effect on price in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate).",
      },
      { type: "heading", text: "What we get on top" },
      {
        type: "list",
        items: [
          "Programmability: settlement conditions can be expressed on-chain rather than in an operations runbook.",
          "Token extensions that make regulated stablecoin flows expressible at the asset level, covered in [token extensions for regulated flows](/blog/token-extensions-for-regulated-flows).",
          "Independent verification: a counterparty can confirm a transfer without trusting Kawi's systems.",
          "A single asset and a single network for many corridors, which simplifies [rebalancing](/blog/corridor-rebalancing) enormously.",
        ],
      },
      { type: "heading", text: "What we design against" },
      {
        type: "paragraph",
        text: "No network is unconditionally available, and treating one as if it were is how payment platforms discover their own fragility. Degraded performance and elevated fees are operating conditions to be handled, not incidents to be surprised by. Our approach is described in [designing for network degradation](/blog/designing-for-network-degradation).",
      },
      {
        type: "quote",
        text: "Choose a settlement network for the properties you need on your worst day, not the numbers you quote on your best one.",
        author: "Kawi Engineering",
      },
    ],
  },
  {
    slug: "solana-finality-for-payments",
    title: "Confirmed, finalised, and what a payment engine should wait for",
    seoTitle: "Solana Finality and Commitment for Payments",
    excerpt:
      "Waiting too little risks reorganisation. Waiting too long spends your latency budget on certainty you already had. The right answer depends on the amount.",
    metaDescription:
      "How Solana commitment levels work in practice, what confirmed and finalised actually guarantee, and how to choose a waiting policy by ticket size.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-08-18",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["solana", "finality", "reliability"],
    keywords: [
      "Solana finality",
      "Solana commitment levels",
      "confirmed vs finalized Solana",
      "blockchain confirmation payments",
    ],
    related: [
      "why-solana-for-settlement",
      "settlement-engine-state-machine",
      "designing-for-network-degradation",
      "settlement-sla-and-observability",
    ],
    content: [
      {
        type: "paragraph",
        text: "A settlement engine has to answer one question about every on-chain transfer: is it safe to act on this yet? Acting means instructing the payout leg, which is irreversible from the customer's point of view.",
      },
      { type: "heading", text: "The commitment levels" },
      {
        type: "list",
        items: [
          "processed: the transaction has been included by a node. It carries the weakest guarantee and should never trigger a payout.",
          "confirmed: the block has been voted on by a supermajority of stake. In practice this is the level payments run on.",
          "finalised: enough blocks have been built on top that reversal is treated as economically implausible.",
        ],
      },
      {
        type: "paragraph",
        text: "The gap between confirmed and finalised is seconds, not minutes, but in a one-minute end-to-end budget seconds are not free. The decision is therefore a policy, not a constant.",
      },
      { type: "heading", text: "A waiting policy by amount" },
      {
        type: "paragraph",
        text: "The cost of being wrong scales with the amount. The cost of waiting is roughly fixed. So the correct policy is tiered: small operations act on confirmed, large ones wait for finalised, and the threshold is set where the expected loss from a reversal exceeds the value of the seconds saved.",
      },
      {
        type: "formula",
        expression: "wait_for_finalised  ⇔  p_reversal · amount  >  value_of_seconds_saved",
        caption:
          "p_reversal at the confirmed level is very small but not zero. Because it multiplies the amount, the threshold falls out of the arithmetic rather than out of taste.",
      },
      {
        type: "paragraph",
        text: "Treasury movements and [corridor rebalancing](/blog/corridor-rebalancing) transfers always wait for the stronger guarantee. They are large, and nobody is watching a progress bar.",
      },
      { type: "heading", text: "Confirmation is evidence, not state" },
      {
        type: "paragraph",
        text: "A confirmation does not set the operation's state directly. It is evidence submitted to the [state machine](/blog/settlement-engine-state-machine), which decides whether the implied transition is legal. That indirection is what allows the waiting policy to change without touching the lifecycle model.",
      },
      { type: "heading", text: "Do not conflate submission with inclusion" },
      {
        type: "paragraph",
        text: "A submitted transaction that has not been included is not pending forever. It has a blockhash validity window, after which it can never land. An engine that keeps waiting on such a transaction stalls an operation that should have been retried. Track the window explicitly, treat expiry as a distinct outcome, and rebuild rather than rebroadcast.",
      },
      {
        type: "paragraph",
        text: "How that behaves when the network is under stress is the subject of [designing for network degradation](/blog/designing-for-network-degradation), and how it is measured is part of [settlement SLAs and observability](/blog/settlement-sla-and-observability).",
      },
    ],
  },
  {
    slug: "solana-fee-economics",
    title: "Solana fee economics for a payments business",
    seoTitle: "Solana Fee Economics for Payment Margins",
    excerpt:
      "Network fees are the smallest line in our cost model and the one most likely to be misunderstood, because the average tells you almost nothing about the tail.",
    metaDescription:
      "How Solana base fees, priority fees and compute budgets affect settlement cost, why the fee tail matters more than the average, and how to bid well.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-08-11",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["solana", "fees", "economics"],
    keywords: [
      "Solana priority fees",
      "Solana transaction cost",
      "blockchain fees payments",
      "compute unit price",
    ],
    related: [
      "why-solana-for-settlement",
      "unit-economics-of-a-settlement",
      "designing-for-network-degradation",
      "pricing-a-corridor",
    ],
    content: [
      {
        type: "paragraph",
        text: "On a spreadsheet, Solana network fees round to zero against every other cost in a settlement. That is true on average and misleading as a planning assumption, because a payments business is defined by its tail behaviour.",
      },
      { type: "heading", text: "Two components" },
      {
        type: "paragraph",
        text: "A transaction pays a base fee proportional to the number of signatures, and optionally a priority fee expressed as a price per compute unit. The base fee is small and predictable. The priority fee is a bid in an auction for inclusion when blocks are contended, and it is the part that moves.",
      },
      {
        type: "formula",
        expression: "fee  =  base_fee(signatures)  +  compute_unit_limit × compute_unit_price",
        caption:
          "The bid is the product of a limit you set and a price you choose. Setting the limit close to actual usage is what stops a high price from becoming an expensive mistake.",
      },
      { type: "heading", text: "Request what you use" },
      {
        type: "paragraph",
        text: "A transaction that requests a large compute limit and uses a fraction of it still pays the priority fee on the requested amount. Simulating the transaction to size the limit is the single highest-return optimisation available, and it costs nothing at runtime.",
      },
      { type: "heading", text: "Bid dynamically, cap deliberately" },
      {
        type: "paragraph",
        text: "A fixed priority fee is wrong in both directions: it overpays when the network is quiet and fails to land when it is busy. Kawi bids from recent observed fees for the accounts being written, escalates on retry, and enforces a hard ceiling per operation.",
      },
      {
        type: "paragraph",
        text: "The ceiling matters more than the bidding. It converts an unbounded cost risk into a bounded one and turns a fee spike into a [degradation event](/blog/designing-for-network-degradation) with a defined response rather than a surprise on the P&L.",
      },
      { type: "heading", text: "Where it lands in the cost model" },
      {
        type: "paragraph",
        text: "In the [unit economics of a settlement](/blog/unit-economics-of-a-settlement), the network fee is a small fixed cost per operation. Its practical importance is that fixed costs set the minimum viable ticket size: below some amount, no spread covers them. That is the connection to [pricing a corridor](/blog/pricing-a-corridor).",
      },
      {
        type: "list",
        items: [
          "Model the 99th percentile fee, not the mean, when sizing minimum tickets.",
          "Batch treasury movements where possible; batch nothing that a customer is waiting on.",
          "Alert on fee-driven retries, because they are an early signal of network stress.",
        ],
      },
      {
        type: "quote",
        text: "The network fee is never the reason a corridor is unprofitable. It is often the reason a corridor is unpredictable.",
        author: "Kawi Research",
      },
    ],
  },
  {
    slug: "usdc-liquidity-on-solana",
    title: "USDC liquidity is the real settlement asset",
    seoTitle: "USDC Liquidity on Solana for Settlement",
    excerpt:
      "The network moves the token. The token is only useful if you can get in and out of it at size, on both sides of the corridor, at a price you can quote.",
    metaDescription:
      "Why stablecoin depth matters more than throughput for settlement, how native USDC issuance and redemption reduce risk, and how liquidity caps quotable size.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-08-04",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["usdc", "stablecoins", "liquidity", "solana"],
    keywords: [
      "USDC liquidity Solana",
      "stablecoin depth",
      "native USDC vs bridged",
      "settlement asset",
    ],
    related: [
      "why-solana-for-settlement",
      "spread-slippage-and-effective-rate",
      "prefunding-strategy",
      "stablecoins-for-remittances",
    ],
    content: [
      {
        type: "paragraph",
        text: "It is easy to evaluate a blockchain on throughput and fees, because those numbers are published. The number that actually determines whether a corridor works is how much stablecoin you can buy or sell without moving the price against yourself.",
      },
      { type: "heading", text: "Depth beats speed" },
      {
        type: "paragraph",
        text: "Suppose a network settles instantly and charges nothing, but converting a corridor-sized amount into its stablecoin costs fifty basis points of slippage. Against a rail that takes ten seconds and charges a cent but converts at five basis points, the second one wins by an order of magnitude on every ticket that matters.",
      },
      {
        type: "paragraph",
        text: "That is why we treat depth as the primary selection criterion in [why Solana for settlement](/blog/why-solana-for-settlement), and why slippage rather than fees drives the arithmetic in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate).",
      },
      { type: "heading", text: "Native issuance removes a whole risk category" },
      {
        type: "paragraph",
        text: "USDC on Solana is natively issued, with direct mint and redemption against the issuer. That matters for a settlement business in a way it does not for a trader: it means the exit from the settlement asset does not depend exclusively on secondary market depth at the moment you need it.",
      },
      {
        type: "paragraph",
        text: "Bridged representations of a stablecoin add a dependency whose failure mode is correlated with exactly the stressed conditions in which you most need to exit. For infrastructure that holds inventory as part of a [prefunding strategy](/blog/prefunding-strategy), that correlation is disqualifying.",
      },
      { type: "heading", text: "Liquidity is what makes a quote possible" },
      {
        type: "paragraph",
        text: "A quote is a promise to execute at a price. You can only promise what you can execute. Maximum quotable size per corridor is therefore derived from observed depth at an acceptable slippage, refreshed continuously, and it caps the ticket sizes the product will accept.",
      },
      {
        type: "list",
        items: [
          "Measure depth at the size you actually trade, not at the top of book.",
          "Track it on both legs: entry-side and destination-side conversion have different books.",
          "Re-derive maximum quotable size continuously, and let it fall automatically when depth thins.",
          "Treat the redemption path as a real fallback, tested rather than assumed.",
        ],
      },
      {
        type: "paragraph",
        text: "Depth also decides how cheaply inventory can be moved between corridors, which is the mechanism behind [corridor rebalancing](/blog/corridor-rebalancing).",
      },
    ],
  },
  {
    slug: "token-extensions-for-regulated-flows",
    title: "Token extensions and what they change for regulated stablecoin flows",
    seoTitle: "Solana Token Extensions for Regulated Flows",
    excerpt:
      "Compliance behaviour that used to live in application code can increasingly be expressed at the asset level. That is a bigger shift than it sounds.",
    metaDescription:
      "How Solana token extensions such as transfer hooks and confidential transfers affect regulated stablecoin settlement, and where policy should stay off-chain.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-07-28",
    readingMinutes: 6,
    author: "Kawi Engineering",
    authorRole: "Platform architecture",
    tags: ["solana", "compliance", "token-2022"],
    keywords: [
      "Solana token extensions",
      "token-2022 compliance",
      "transfer hooks stablecoin",
      "regulated on-chain settlement",
    ],
    related: [
      "why-solana-for-settlement",
      "traceability-and-security",
      "agent-guardrails-and-spend-policies",
      "usdc-liquidity-on-solana",
    ],
    content: [
      {
        type: "paragraph",
        text: "For most of the history of on-chain payments, compliance lived entirely off-chain. The token was a dumb bearer instrument, and every rule about who could hold it or move it was enforced by the application in front of it.",
      },
      {
        type: "paragraph",
        text: "Token extensions change where some of that logic can live. Behaviour such as hooks that run on transfer, richer on-chain metadata and confidentiality options make it possible to express parts of a policy at the asset level rather than only in the operator's backend.",
      },
      { type: "heading", text: "Why this matters for settlement" },
      {
        type: "list",
        items: [
          "Rules that travel with the asset cannot be bypassed by touching a different interface.",
          "Metadata attached on-chain strengthens the audit trail described in [traceability and security](/blog/traceability-and-security).",
          "Confidentiality options let commercially sensitive amounts stay private without giving up verifiability of the transfer itself.",
        ],
      },
      { type: "heading", text: "Where policy should stay off-chain" },
      {
        type: "paragraph",
        text: "Not everything belongs on-chain, and enthusiasm here is a trap. Identity, sanctions screening, source-of-funds assessment and jurisdictional rules involve data that must not be public and judgements that change faster than deployed programs. Those stay in the engine.",
      },
      {
        type: "paragraph",
        text: "The useful split is: express invariants on-chain, keep judgement off-chain. An invariant is a rule that is always true and cheap to check. A judgement is a decision that depends on context and evidence.",
      },
      { type: "heading", text: "The connection to autonomous payments" },
      {
        type: "paragraph",
        text: "Asset-level constraints become far more valuable when the party initiating a transfer is software rather than a person. A limit enforced by the token is a limit an agent cannot argue with, which is one of the building blocks of [agent guardrails and spend policies](/blog/agent-guardrails-and-spend-policies).",
      },
      {
        type: "quote",
        text: "Put invariants where they cannot be bypassed. Keep judgement where it can be revised.",
        author: "Kawi Engineering",
      },
    ],
  },
  {
    slug: "designing-for-network-degradation",
    title: "Designing a payments engine for the network's bad days",
    seoTitle: "Designing Payments for Network Degradation",
    excerpt:
      "Networks degrade before they fail, and degradation is far more common than failure. A settlement engine should treat it as an operating mode, not an incident.",
    metaDescription:
      "How Kawi handles blockchain congestion: blockhash windows, escalating retries, fee ceilings, backpressure and honest customer communication.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-07-21",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Platform reliability",
    tags: ["reliability", "solana", "operations"],
    keywords: [
      "blockchain congestion payments",
      "transaction retry strategy",
      "payment system resilience",
      "degraded mode operations",
    ],
    related: [
      "solana-finality-for-payments",
      "solana-fee-economics",
      "settlement-engine-state-machine",
      "settlement-sla-and-observability",
    ],
    content: [
      {
        type: "paragraph",
        text: "The question is never whether a network will have a bad hour. It is whether your engine turns that hour into delayed settlements or into inconsistent state. The first is an inconvenience. The second is an incident with an accounting tail.",
      },
      { type: "heading", text: "Degradation is a mode, not an exception" },
      {
        type: "paragraph",
        text: "Kawi runs an explicit degraded mode triggered by observable signals: inclusion latency rising, priority fees exceeding a threshold, retry rates climbing. Entering it changes behaviour deliberately rather than letting timeouts pile up.",
      },
      {
        type: "list",
        items: [
          "Raise the bid within the ceiling defined in [Solana fee economics](/blog/solana-fee-economics), then stop.",
          "Widen the maximum quotable size downwards so new exposure is smaller while conditions are poor.",
          "Prioritise customer-facing operations over internal [rebalancing](/blog/corridor-rebalancing) transfers.",
          "Apply backpressure at the quote layer instead of accepting work the engine cannot complete.",
        ],
      },
      { type: "heading", text: "Retry is rebuild, not rebroadcast" },
      {
        type: "paragraph",
        text: "A submitted transaction is valid only within its blockhash window. Once that expires it can never land, so retrying means building a fresh transaction, not resending the old bytes. Every rebuild carries the same idempotency key so a late inclusion of a previous attempt cannot double-pay, following the rules in [idempotency in settlement systems](/blog/idempotency-in-settlement-systems).",
      },
      {
        type: "paragraph",
        text: "The dangerous window is the one where an old attempt might still land while a new one is in flight. The engine resolves that by treating the on-chain record as authoritative and reconciling before releasing the payout leg, never the other way around.",
      },
      { type: "heading", text: "Tell the customer the truth" },
      {
        type: "paragraph",
        text: "During degradation the honest message is that settlement is slower than usual and the operation is safe. A progress indicator that keeps promising the normal time is worse than a clear delay notice, because it converts a tolerable wait into a broken promise.",
      },
      {
        type: "paragraph",
        text: "Whatever the engine does in this mode has to be measurable afterwards. Time in degraded mode, operations affected, fees paid and SLA impact are all first-class metrics in [settlement SLAs and observability](/blog/settlement-sla-and-observability).",
      },
      {
        type: "quote",
        text: "Systems are not judged by their behaviour at the median. They are judged by what they do in the worst ten minutes of the quarter.",
        author: "Kawi Engineering",
      },
    ],
  },
];
