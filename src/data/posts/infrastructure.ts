import type { BlogPost } from "./types";

export const infrastructurePosts: BlogPost[] = [
  {
    slug: "hybrid-settlement-infrastructure",
    title: "Hybrid settlement infrastructure, explained end to end",
    seoTitle: "Hybrid Settlement Infrastructure: Fiat and Blockchain",
    excerpt:
      "Fiat rails are good at access and bad at distance. Blockchains are the opposite. Hybrid settlement is the engine that stops you from having to choose.",
    metaDescription:
      "A guide to hybrid settlement infrastructure: how fiat entry rails, stablecoin conversion and blockchain settlement become one auditable operation.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    pillar: true,
    date: "2026-08-28",
    updated: "2026-08-28",
    readingMinutes: 9,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["settlement", "architecture", "stablecoins", "infrastructure"],
    keywords: [
      "hybrid settlement infrastructure",
      "cross-border settlement engine",
      "fiat to stablecoin settlement",
      "programmable settlement",
      "BRL to USDC",
    ],
    related: [
      "settlement-engine-state-machine",
      "fiat-rails-vs-blockchain-rails",
      "why-solana-for-settlement",
      "economics-of-cross-border-settlement",
    ],
    content: [
      {
        type: "paragraph",
        text: "Every cross-border payment product eventually hits the same wall. The local rails users already trust are excellent at exactly one thing: letting anyone put money in. A PIX transfer in Brazil clears in seconds and costs almost nothing. But the moment that value has to cross a border, those same rails turn slow, expensive and opaque.",
      },
      {
        type: "paragraph",
        text: "Public blockchains have the inverse profile. Moving value across the world takes seconds, costs a fraction of a cent and leaves a record anyone can verify. But asking a first-time user to fund a wallet before they can send money home is a non-starter.",
      },
      {
        type: "paragraph",
        text: "Hybrid settlement infrastructure is the answer to that trade-off: use each rail for the job it is actually good at, and build an engine that owns the handoff between them. We go deeper on the comparison in [fiat rails versus blockchain rails](/blog/fiat-rails-vs-blockchain-rails).",
      },
      { type: "heading", text: "The four legs of a hybrid settlement" },
      {
        type: "paragraph",
        text: "From the outside, a Kawi operation looks like one transaction with one status. Internally it is four coordinated legs, each with its own confirmation, its own record and its own failure handling.",
      },
      {
        type: "list",
        items: [
          "Entry: value is captured locally through banking rails such as PIX or bank transfer.",
          "Conversion: the local amount is converted into stablecoin liquidity at a rate locked by a quote.",
          "Movement: settlement runs on-chain, where finality is fast and the trail is public.",
          "Delivery: the destination side either holds the stablecoin or converts back into local currency and pays out.",
        ],
      },
      {
        type: "paragraph",
        text: "Each leg produces an artifact: a bank reference, a conversion record, a transaction signature, a payout confirmation. All four attach to a single operation identifier, which is what makes [reconciliation](/blog/reconciliation-by-design) a lookup instead of an investigation.",
      },
      { type: "heading", text: "Why coordination is the hard part" },
      {
        type: "paragraph",
        text: "Any competent team can wire a bank API to a liquidity venue. What breaks in production is everything around the happy path: a bank confirmation that arrives late, a quote that expires mid-flight, a payout that fails on the destination side after the on-chain leg already settled, a webhook delivered three times because the first two responses timed out.",
      },
      {
        type: "paragraph",
        text: "A settlement engine earns its name by handling those cases deterministically. Every operation is a [state machine](/blog/settlement-engine-state-machine), every transition is recorded append-only, and no leg can execute twice because a message was redelivered. That last property is [idempotency](/blog/idempotency-in-settlement-systems), and it is not optional.",
      },
      {
        type: "quote",
        text: "If you cannot replay an operation from its records and arrive at the same final state, you do not have a settlement engine. You have a script.",
        author: "Kawi Engineering",
      },
      { type: "heading", text: "Where the money actually is" },
      {
        type: "paragraph",
        text: "The part most integrations underestimate is inventory. A settlement that promises delivery in one minute cannot wait for the entry leg to clear before starting the exit leg. That means holding balances on both sides, which is a capital decision, not an engineering one.",
      },
      {
        type: "paragraph",
        text: "This is why the engine and the treasury are designed together. The capital held to make settlements instant is the subject of our [prefunding strategy](/blog/prefunding-strategy), and the cost of holding it is the largest line in the [unit economics of a settlement](/blog/unit-economics-of-a-settlement).",
      },
      { type: "heading", text: "Why the blockchain leg is Solana" },
      {
        type: "paragraph",
        text: "The middle leg needs three properties: confirmation fast enough that it does not dominate the end-to-end time, fees low enough that they do not distort the pricing of small transfers, and a stablecoin with real depth. We explain the choice in [why Solana for settlement](/blog/why-solana-for-settlement) and the liquidity side in [USDC liquidity on Solana](/blog/usdc-liquidity-on-solana).",
      },
      { type: "heading", text: "What hybrid settlement unlocks" },
      {
        type: "paragraph",
        text: "Once settlement is programmable, it stops being an operations problem and becomes a product primitive. A platform can start a settlement from an API call, follow it with webhooks and reconcile it against its own ledger without ever holding crypto or building banking integrations. That is the case we make in [benefits of hybrid settlement for platforms](/blog/benefits-of-hybrid-settlement-for-platforms).",
      },
      {
        type: "paragraph",
        text: "It also opens a door that did not exist with manual rails: software that initiates and supervises its own payments. That is the [agentic layer](/blog/kawi-agentic-layer) we are building toward, and it only works because every step described here is already machine readable.",
      },
      {
        type: "paragraph",
        text: "The complexity stays on our side. What you integrate is a single, auditable operation. If you want the concrete version of that, read the walkthrough of the [BRL to USDC corridor](/blog/brl-to-usdc-corridor).",
      },
    ],
  },
  {
    slug: "settlement-engine-state-machine",
    title: "The state machine behind every Kawi settlement",
    seoTitle: "Settlement State Machine for Payment Operations",
    excerpt:
      "An operation is not a request and a response. It is a finite set of states, a set of legal transitions, and a rule that says what happens when reality disagrees.",
    metaDescription:
      "How Kawi models cross-border settlements as an explicit state machine: states, legal transitions, terminal states, compensation and append-only history.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-08-21",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["state machine", "architecture", "reliability"],
    keywords: [
      "payment state machine",
      "settlement lifecycle",
      "distributed transactions payments",
      "compensating transactions",
    ],
    related: [
      "hybrid-settlement-infrastructure",
      "idempotency-in-settlement-systems",
      "event-driven-settlement-webhooks",
      "reconciliation-by-design",
    ],
    content: [
      {
        type: "paragraph",
        text: "The most expensive bug class in payments is not a wrong number. It is an operation whose status nobody can agree on. The customer says it was sent, the bank says it was returned, the ledger says it is pending, and the only way to resolve it is a human reading logs.",
      },
      {
        type: "paragraph",
        text: "Kawi avoids that by refusing to let an operation exist in an undefined state. Every settlement is a finite state machine with an explicit alphabet and an explicit transition table, described in the [hybrid settlement overview](/blog/hybrid-settlement-infrastructure) as four legs, and here as the states those legs produce.",
      },
      { type: "heading", text: "The states" },
      {
        type: "list",
        items: [
          "quoted: a rate, amount and expiry are locked. No money has moved.",
          "awaiting_funds: the payer has been given instructions. The quote clock is running.",
          "funded: the entry leg is confirmed final by the local rail.",
          "converting: fiat has been exchanged for stablecoin against the locked rate.",
          "settling: the on-chain transfer has been submitted and is awaiting confirmation.",
          "delivering: the destination leg has been instructed.",
          "settled: terminal success. Every leg has a confirmation artifact.",
          "expired, rejected, returned, failed: terminal failures, each with a distinct cause.",
        ],
      },
      {
        type: "paragraph",
        text: "The important detail is that terminal states are terminal. A settled operation never moves again. If money comes back later it is a new operation with a reference to the original, not a mutation of the original. That single rule removes an entire family of accounting disputes.",
      },
      { type: "heading", text: "Transitions are the contract" },
      {
        type: "paragraph",
        text: "Only a defined set of transitions is legal. quoted can go to awaiting_funds or expired. funded can go to converting or returned. settling can go to delivering or failed. Anything else is rejected by the engine, logged as an anomaly and surfaced to operations, rather than being written into the record because a provider sent an unexpected payload.",
      },
      {
        type: "paragraph",
        text: "Provider callbacks do not set state directly. They are evidence. The engine reads the evidence, checks whether the implied transition is legal, and only then advances. Callbacks arrive out of order and more than once, which is why this evidence model pairs with [idempotency keys](/blog/idempotency-in-settlement-systems) and the [event-driven design](/blog/event-driven-settlement-webhooks).",
      },
      { type: "heading", text: "There is no rollback, only compensation" },
      {
        type: "paragraph",
        text: "A settlement spans systems that do not share a transaction boundary: a bank, an exchange venue, a blockchain, a payout partner. You cannot roll back a confirmed on-chain transfer, so the engine does not pretend to. Failure after the point of no return is handled by compensation: a defined counter-operation that returns value along a legal path, itself recorded as a first-class operation.",
      },
      {
        type: "paragraph",
        text: "That is also why the point of no return is placed deliberately. Nothing irreversible happens before the entry leg is final, and nothing is promised to the recipient before the engine holds either the funds or the inventory to cover them. The capital that makes the second half possible is covered in [prefunding strategy](/blog/prefunding-strategy).",
      },
      { type: "heading", text: "History is append-only" },
      {
        type: "paragraph",
        text: "State is stored as a sequence of transitions, not as a mutable field. The current state is a fold over that sequence. This costs a little storage and buys three things: you can replay any operation to any point in time, you can prove what was known when a decision was made, and no bug can silently overwrite the past.",
      },
      {
        type: "quote",
        text: "A status field tells you what someone believed last. A transition log tells you what actually happened.",
        author: "Kawi Engineering",
      },
      {
        type: "paragraph",
        text: "This is the foundation the rest of the platform stands on. It is what makes [traceability](/blog/traceability-and-security) a property rather than a feature, and what will let autonomous software supervise its own payments in the [agentic layer](/blog/kawi-agentic-layer).",
      },
    ],
  },
  {
    slug: "fiat-rails-vs-blockchain-rails",
    title: "Fiat rails versus blockchain rails: where each one actually wins",
    seoTitle: "Fiat Rails vs Blockchain Rails for Payments",
    excerpt:
      "The argument is usually framed as a competition. In production it is a division of labour, and the split is more predictable than the debate suggests.",
    metaDescription:
      "A practical comparison of fiat and blockchain payment rails across access, speed, cost, reversibility and auditability, and how hybrid settlement joins them.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-08-14",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Product research",
    tags: ["fiat", "blockchain", "payment rails"],
    keywords: [
      "fiat rails vs blockchain",
      "payment rails comparison",
      "PIX vs stablecoin settlement",
      "cross-border payment rails",
    ],
    related: [
      "hybrid-settlement-infrastructure",
      "why-solana-for-settlement",
      "stablecoins-for-remittances",
      "float-and-cost-of-capital",
    ],
    content: [
      {
        type: "paragraph",
        text: "Debates about whether blockchains will replace banking rails tend to compare the wrong things. The useful comparison is per property, per leg of a payment, because no real product uses one rail for everything.",
      },
      { type: "heading", text: "Access" },
      {
        type: "paragraph",
        text: "Fiat rails win decisively. A Brazilian user already has PIX, already has a bank app, and already trusts both. No onboarding, no seed phrase, no bridge. Every product that tried to make the first step a wallet has paid for it in conversion rate.",
      },
      { type: "heading", text: "Distance" },
      {
        type: "paragraph",
        text: "Blockchain rails win decisively. A domestic transfer and an intercontinental transfer cost the same and take the same time, because the network has no concept of a border. Correspondent banking, by contrast, charges for hops, and hops are what distance creates. That asymmetry is the core of the argument in [why stablecoins beat correspondent banking](/blog/stablecoins-for-remittances).",
      },
      { type: "heading", text: "Hours" },
      {
        type: "paragraph",
        text: "Banking rails have cut-offs, holidays and weekends. Blockchains do not close. For a product that promises one-minute settlement, this matters less for the average case than for the tail: it is Friday evening and the month-end holiday that produce the support tickets.",
      },
      { type: "heading", text: "Cost structure" },
      {
        type: "paragraph",
        text: "Fiat rails price by relationship and by hop. Blockchain fees are close to constant per transaction and independent of amount, which changes the shape of the cost curve rather than just its level. The consequences for pricing are worked through in [pricing a corridor](/blog/pricing-a-corridor) and [Solana fee economics](/blog/solana-fee-economics).",
      },
      { type: "heading", text: "Reversibility" },
      {
        type: "paragraph",
        text: "This is where fiat rails have a real advantage that crypto advocates tend to skip. Chargebacks, recalls and returns are risk controls. On-chain transfers are final, which is excellent for settlement certainty and unforgiving for mistakes. A hybrid engine has to place irreversibility deliberately, which is exactly what the [settlement state machine](/blog/settlement-engine-state-machine) does.",
      },
      { type: "heading", text: "Auditability" },
      {
        type: "paragraph",
        text: "Bank records are authoritative but private: you can prove a transfer to a regulator, not to your counterparty. On-chain records are public and verifiable by anyone, including someone who does not trust you. Hybrid settlement gets both, which is the point made in [how we make every settlement verifiable](/blog/traceability-and-security).",
      },
      {
        type: "list",
        items: [
          "Access and local trust: fiat rails.",
          "Distance, hours and cost per hop: blockchain rails.",
          "Reversibility and consumer protection: fiat rails.",
          "Independent verifiability and programmability: blockchain rails.",
        ],
      },
      {
        type: "paragraph",
        text: "Read that list again and the architecture designs itself: fiat at the edges, blockchain in the middle, an engine that owns the seam. That is [hybrid settlement infrastructure](/blog/hybrid-settlement-infrastructure), and the seam is where all the engineering lives.",
      },
    ],
  },
  {
    slug: "idempotency-in-settlement-systems",
    title: "Idempotency is the only reason money moves exactly once",
    seoTitle: "Idempotency in Payment Systems, in Practice",
    excerpt:
      "Networks deliver messages at least once. Money must move exactly once. Idempotency keys are the bridge between those two facts.",
    metaDescription:
      "How idempotency keys, deduplication windows and fingerprinting let a payment system guarantee exactly-once settlement on top of at-least-once message delivery.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-08-07",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Platform reliability",
    tags: ["idempotency", "reliability", "api"],
    keywords: [
      "idempotency key payments",
      "exactly once payment processing",
      "duplicate payment prevention",
      "at-least-once delivery",
    ],
    related: [
      "settlement-engine-state-machine",
      "event-driven-settlement-webhooks",
      "reconciliation-by-design",
      "integrate-the-kawi-widget",
    ],
    content: [
      {
        type: "paragraph",
        text: "Distributed systems give you at-least-once delivery. Money requires exactly-once execution. Every duplicate payment in history lives in the gap between those two sentences.",
      },
      {
        type: "paragraph",
        text: "The gap is not closed by better networks. It is closed by making repeated execution harmless, which is what idempotency means: performing an operation twice produces the same result as performing it once.",
      },
      { type: "heading", text: "The failure that creates duplicates" },
      {
        type: "paragraph",
        text: "A client sends a create-settlement request. The engine processes it. The response is lost on the way back. The client, correctly, retries. Without idempotency, the second request is indistinguishable from a genuine second payment, and the user is debited twice.",
      },
      {
        type: "paragraph",
        text: "Note that the client did nothing wrong. Retrying an unacknowledged request is the correct behaviour. The server has to make it safe.",
      },
      { type: "heading", text: "Keys, not guesses" },
      {
        type: "paragraph",
        text: "The client generates a unique key per logical operation and sends it with the request. The engine stores the key alongside the resulting operation. A repeat of the same key returns the original result instead of creating a new operation.",
      },
      {
        type: "code",
        language: "bash",
        code: 'curl https://mainnet.kawiservices.com/api/platform/settlements \\\n  -H "x-api-key: $KAWI_API_KEY" \\\n  -H "Idempotency-Key: 7f1c9c3e-order-48213" \\\n  -d \'{ "from": "BRL", "to": "USDC", "amount": 5000 }\'',
      },
      {
        type: "paragraph",
        text: "A good key is derived from something stable in your own domain, such as your order id, not from a timestamp or a random value regenerated on retry. If the key changes between attempts, it is not an idempotency key, it is a nonce.",
      },
      { type: "heading", text: "Fingerprints stop a subtler bug" },
      {
        type: "paragraph",
        text: "Reusing a key with a different payload is almost always a client bug: the same order id sent with a different amount. The engine stores a fingerprint of the request body next to the key and rejects a mismatch rather than silently returning the old result. Failing loudly here has saved more money than any retry logic.",
      },
      { type: "heading", text: "The same rule applies inbound" },
      {
        type: "paragraph",
        text: "Provider callbacks are also delivered at least once, so the engine deduplicates them by provider event id before treating them as evidence for a transition in the [state machine](/blog/settlement-engine-state-machine). Your own webhook handlers should do the same, which is why the [webhook guide](/blog/event-driven-settlement-webhooks) makes idempotent handlers a day-one requirement.",
      },
      { type: "heading", text: "Retention is a design decision" },
      {
        type: "paragraph",
        text: "Idempotency records cannot be kept forever, and cannot be discarded quickly. The window has to outlive the longest realistic client retry chain, including a queue that was paused overnight. Choose it explicitly, document it, and make expiry of a key a distinct, visible error rather than a silent duplicate.",
      },
      {
        type: "quote",
        text: "Idempotency is not a feature you add for reliability. It is the property that makes every other reliability mechanism safe to use.",
        author: "Kawi Engineering",
      },
      {
        type: "paragraph",
        text: "It also matters far beyond human clients. Software that retries automatically at machine speed multiplies every duplicate risk, which is why idempotency is a precondition for the [agentic layer](/blog/kawi-agentic-layer) rather than an optimisation within it.",
      },
    ],
  },
  {
    slug: "reconciliation-by-design",
    title: "Reconciliation by design, not as a monthly emergency",
    seoTitle: "Payment Reconciliation by Design",
    excerpt:
      "Most teams treat reconciliation as a report. It is actually a data model decision made months earlier, and it is either right or expensive.",
    metaDescription:
      "How to design a settlement system so reconciliation is a lookup, not an investigation: correlation ids, double-entry ledgers and automated matching.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-07-31",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["reconciliation", "ledger", "accounting"],
    keywords: [
      "payment reconciliation",
      "double entry ledger payments",
      "settlement breaks",
      "automated reconciliation",
    ],
    related: [
      "settlement-engine-state-machine",
      "traceability-and-security",
      "unit-economics-of-a-settlement",
      "settlement-sla-and-observability",
    ],
    content: [
      {
        type: "paragraph",
        text: "Reconciliation gets attention at month end, which is the worst possible time to discover that your data model cannot support it. By then the operations you need to match have already been written, and whatever key you failed to store is gone.",
      },
      {
        type: "paragraph",
        text: "Kawi treats reconciliation as a design constraint on the write path. If an operation cannot be reconciled automatically, it should not have been possible to create it in that shape.",
      },
      { type: "heading", text: "One correlation id, carried everywhere" },
      {
        type: "paragraph",
        text: "Every settlement has a single identifier that travels through all four legs. The bank reference, the conversion record, the on-chain signature and the payout confirmation each store it. Matching a bank statement line to a blockchain transaction becomes a join rather than a heuristic on amount and timestamp.",
      },
      {
        type: "paragraph",
        text: "Amount-and-time matching is where reconciliation projects go to die. Two customers sending the same amount within the same minute is not an edge case at volume, it is a Tuesday.",
      },
      { type: "heading", text: "Double entry, including the float" },
      {
        type: "paragraph",
        text: "Internally every movement is recorded as balanced debits and credits across named accounts: customer receivable, local bank account, conversion venue, on-chain treasury, payout partner, fee income. Nothing is a single-sided update. If the books do not balance, the write is rejected, not reported later.",
      },
      {
        type: "paragraph",
        text: "The float accounts are the ones people forget. Capital sitting in a corridor to make settlement instant is a real balance with a real carrying cost, discussed in [float and the cost of capital](/blog/float-and-cost-of-capital). If it is not modelled in the ledger, your margin numbers are fiction.",
      },
      { type: "heading", text: "Breaks are categorised, not just counted" },
      {
        type: "list",
        items: [
          "Timing breaks: both sides exist, one has not been reported yet. Resolve by waiting, with a defined ceiling.",
          "Amount breaks: fees or FX applied differently than expected. Resolve by rule, and fix the rule.",
          "Missing breaks: one side has no counterpart at all. Escalate immediately, never age silently.",
          "Duplicate breaks: two records for one movement. Almost always an [idempotency](/blog/idempotency-in-settlement-systems) failure upstream.",
        ],
      },
      {
        type: "paragraph",
        text: "Counting breaks tells you there is a problem. Categorising them tells you which system to fix. The distribution across those four categories is a better health metric for a payments platform than uptime.",
      },
      { type: "heading", text: "Reconcile continuously, not monthly" },
      {
        type: "paragraph",
        text: "Matching runs continuously against every source. A break that appears at 10:04 is visible at 10:05, when the provider still has the context to explain it, not five weeks later. This is part of the same observability surface described in [settlement SLAs and observability](/blog/settlement-sla-and-observability).",
      },
      {
        type: "quote",
        text: "The goal is not a reconciliation process that finds every break. It is a system in which most breaks are impossible to create.",
        author: "Kawi Engineering",
      },
    ],
  },
  {
    slug: "event-driven-settlement-webhooks",
    title: "Event-driven settlement: webhooks that survive the real world",
    seoTitle: "Payment Webhooks: Ordering, Retries, Idempotency",
    excerpt:
      "Webhooks arrive late, out of order, more than once, and occasionally not at all. A settlement integration has to be correct under all four conditions.",
    metaDescription:
      "How to consume settlement webhooks safely: signature verification, idempotent handlers, out-of-order events, sequence numbers and replay endpoints.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-07-24",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Developer experience",
    tags: ["webhooks", "events", "integration"],
    keywords: [
      "payment webhooks",
      "webhook retries ordering",
      "idempotent webhook handler",
      "event driven payments",
    ],
    related: [
      "idempotency-in-settlement-systems",
      "settlement-engine-state-machine",
      "integrate-the-kawi-widget",
      "settlement-sla-and-observability",
    ],
    content: [
      {
        type: "paragraph",
        text: "Polling an API until a status changes works until you have volume, and then it works badly for everyone. Events are the right model for settlement because the interesting moments are unpredictable: a bank confirmation, a network confirmation, a payout acceptance.",
      },
      {
        type: "paragraph",
        text: "But an event stream over HTTP is a lossy, unordered, at-least-once channel. Integrations that assume otherwise break in ways that are hard to reproduce.",
      },
      { type: "heading", text: "Verify before you trust" },
      {
        type: "paragraph",
        text: "Every delivery carries a signature over the raw body and a timestamp. Verify against the raw bytes before parsing, reject deliveries outside a tolerance window to prevent replay, and never take the operation id in the payload as proof of anything. The signature is the authentication; the body is just data.",
      },
      { type: "heading", text: "Handlers must be idempotent" },
      {
        type: "paragraph",
        text: "The same event will be delivered more than once, because a delivery that times out after your handler committed is indistinguishable from one that never arrived. Deduplicate on the event id and make the handler safe to run repeatedly, using the same discipline described in [idempotency in settlement systems](/blog/idempotency-in-settlement-systems).",
      },
      { type: "heading", text: "Order is not guaranteed, so do not depend on it" },
      {
        type: "paragraph",
        text: "A settling event can arrive after the settled event that followed it. Each event carries the operation's state and a monotonically increasing sequence number. Store the sequence you have applied and ignore anything lower. Never derive state by applying deltas in arrival order.",
      },
      {
        type: "code",
        language: "typescript",
        code: 'export async function handleKawiEvent(event: KawiEvent) {\n  if (await seen(event.id)) return ok();\n\n  const current = await load(event.operationId);\n  if (current && current.sequence >= event.sequence) {\n    await markSeen(event.id);\n    return ok(); // stale replay, safe to drop\n  }\n\n  await apply(event); // full state, not a delta\n  await markSeen(event.id);\n  return ok();\n}',
      },
      { type: "heading", text: "Acknowledge fast, work later" },
      {
        type: "paragraph",
        text: "Return 2xx as soon as the event is durably queued. Doing business logic inline makes your handler latency the sender's problem and turns a slow database into a retry storm. Queue first, process second.",
      },
      { type: "heading", text: "Assume you will miss some" },
      {
        type: "paragraph",
        text: "Deployments, outages and expired certificates all drop deliveries. Two backstops make that survivable: a replay endpoint that re-sends events for a time range, and periodic [reconciliation](/blog/reconciliation-by-design) that compares your view of operations against ours. Events are the fast path; reconciliation is the truth.",
      },
      {
        type: "quote",
        text: "Design your webhook handler as if every event will arrive twice, one of them late, and one of them never. Then it will be boring in production.",
        author: "Kawi Engineering",
      },
    ],
  },
  {
    slug: "quote-expiry-and-price-risk",
    title: "Quotes, expiry windows and who carries the price risk",
    seoTitle: "Quote Expiry and Price Risk in Cross-Border Settlement",
    excerpt:
      "A quote is a promise to trade at a price for a period of time. That promise is an option you wrote for free, and options are never free.",
    metaDescription:
      "Why quote expiry windows exist, how they price the option granted to the payer, and how volatility and funding time determine the right window length.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-07-17",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["pricing", "risk", "fx"],
    keywords: [
      "quote expiry payments",
      "fx price risk remittance",
      "locked exchange rate",
      "adverse selection quoting",
    ],
    related: [
      "spread-slippage-and-effective-rate",
      "fx-exposure-and-hedging",
      "pricing-a-corridor",
      "settlement-engine-state-machine",
    ],
    content: [
      {
        type: "paragraph",
        text: "When Kawi quotes an operation, it locks a rate, an amount and a set of fees for a defined window. Inside that window the payer can fund and receive exactly what was quoted. Outside it, the quote is dead and a new one is required.",
      },
      {
        type: "paragraph",
        text: "That window looks like a small usability detail. It is actually the cleanest example of risk transfer in the whole product.",
      },
      { type: "heading", text: "A quote is a written option" },
      {
        type: "paragraph",
        text: "For the duration of the window, the payer may proceed or walk away, and the rate does not move against them. If the market moves in their favour, they are more likely to fund. If it moves against them, they are more likely to abandon and re-quote.",
      },
      {
        type: "paragraph",
        text: "That asymmetry is adverse selection, and it means the realised cost of quoting is worse than the average market move. The pricing implication is worked out in [pricing a corridor](/blog/pricing-a-corridor): the spread has to cover the option, not just the transaction cost.",
      },
      { type: "heading", text: "Longer windows are strictly more expensive" },
      {
        type: "paragraph",
        text: "The value of an option grows roughly with the square root of time. Doubling a quote window does not double the cost of writing it, but it does raise it materially, and the increase is paid by every user in the spread.",
      },
      {
        type: "formula",
        expression: "expected_cost  ≈  k · σ · √T",
        caption:
          "σ is the volatility of the corridor's rate, T is the window length and k absorbs the adverse-selection skew. Longer windows and more volatile corridors both widen the spread.",
      },
      { type: "heading", text: "Shorter windows are not free either" },
      {
        type: "paragraph",
        text: "The window must comfortably exceed the time a real payer needs to complete the entry leg. Set it too tight and quotes expire mid-funding, producing refunds, support tickets and abandoned operations. Refunding an expired-but-funded operation is far more expensive than the price risk you saved.",
      },
      {
        type: "list",
        items: [
          "Corridor volatility: more volatile rates justify shorter windows.",
          "Funding time distribution: the window should cover the high percentile, not the median.",
          "Ticket size: large operations deserve tighter windows or explicit re-quoting.",
          "Hedging capability: if exposure can be hedged instantly, windows can be longer.",
        ],
      },
      { type: "heading", text: "The window is a state, not a timer" },
      {
        type: "paragraph",
        text: "In the [settlement state machine](/blog/settlement-engine-state-machine), expiry is a transition to a terminal state, not a background flag. Once expired, an operation cannot be funded, and a late payment against a dead quote is handled as a return rather than being forced through at a stale rate.",
      },
      {
        type: "paragraph",
        text: "This is also the point where the treasury side connects: whatever exposure is created between quote and settlement has to be managed, which is the subject of [FX exposure and hedging windows](/blog/fx-exposure-and-hedging).",
      },
    ],
  },
];
