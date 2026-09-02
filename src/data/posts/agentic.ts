import type { BlogPost } from "./types";

export const agenticPosts: BlogPost[] = [
  {
    slug: "kawi-agentic-layer",
    title: "The agentic layer: settlement that software can operate on its own",
    seoTitle: "The Kawi Agentic Layer for Settlement",
    excerpt:
      "The next users of payment infrastructure will not be people filling in forms. They will be programs acting on behalf of people, and they need different guarantees.",
    metaDescription:
      "The Kawi agentic layer: why autonomous software needs machine-readable quotes, bounded authority, deterministic settlement and verifiable receipts.",
    category: "Agentic",
    cluster: "Agentic",
    pillar: true,
    date: "2026-08-24",
    updated: "2026-08-24",
    readingMinutes: 9,
    author: "Kawi Engineering",
    authorRole: "Platform architecture",
    tags: ["agents", "automation", "architecture", "future"],
    keywords: [
      "agentic payments",
      "AI agent payment infrastructure",
      "autonomous settlement",
      "machine to machine payments",
    ],
    related: [
      "primitives-for-agentic-payments",
      "machine-readable-quotes-and-intents",
      "agent-guardrails-and-spend-policies",
      "autonomous-treasury-rebalancing",
    ],
    content: [
      {
        type: "paragraph",
        text: "Almost every payment interface ever built assumes a person: someone who reads a screen, understands a rate, notices something is wrong and decides to continue. That assumption is quietly load-bearing. Remove the human and most of the safety in these systems disappears with them.",
      },
      {
        type: "paragraph",
        text: "Software that acts on a user's behalf is going to initiate payments. Not as a curiosity, but as the normal way a subscription is renewed, a supplier is paid, a treasury is rebalanced or a marketplace settles with a seller. The agentic layer is Kawi's answer to what that infrastructure has to provide.",
      },
      { type: "heading", text: "What changes when the caller is not a person" },
      {
        type: "list",
        items: [
          "Speed: an agent retries in milliseconds. Every weakness in duplicate handling is found immediately.",
          "Scale: one misconfigured loop can attempt thousands of operations before anyone notices.",
          "No judgement: an agent will not pause because a rate looks strange. Limits must be mechanical.",
          "No memory of context: the operation must carry everything needed to verify it later.",
        ],
      },
      {
        type: "paragraph",
        text: "Each of those is a hard requirement on the layer underneath. This is why we do not treat the agentic layer as a feature to be added later: it is the stress test that the foundations described in [hybrid settlement infrastructure](/blog/hybrid-settlement-infrastructure) were built to pass.",
      },
      { type: "heading", text: "Four properties an agent needs" },
      {
        type: "paragraph",
        text: "First, quotes an agent can evaluate. A price expressed for a screen is not a price a program can compare. Quotes need structure, an explicit validity window and an unambiguous delivered amount, which is the subject of [machine-readable quotes and intents](/blog/machine-readable-quotes-and-intents).",
      },
      {
        type: "paragraph",
        text: "Second, bounded authority. An agent should hold a credential that can only do specific things, up to specific amounts, for a specific period, to specific destinations. Not an API key that can do everything its owner can do. That is [agent guardrails and spend policies](/blog/agent-guardrails-and-spend-policies).",
      },
      {
        type: "paragraph",
        text: "Third, deterministic execution. Retries must be free of consequence, states must be explicit and terminal states must be final. That is exactly the [state machine](/blog/settlement-engine-state-machine) and [idempotency](/blog/idempotency-in-settlement-systems) model that already runs today.",
      },
      {
        type: "paragraph",
        text: "Fourth, receipts that prove what happened. When software spends money, the record has to be strong enough to settle a dispute without anyone's testimony. The trail described in [traceability and security](/blog/traceability-and-security) becomes the primary evidence rather than a debugging aid.",
      },
      { type: "heading", text: "The first agents are ours" },
      {
        type: "paragraph",
        text: "We are not waiting for a market to appear. The treasury decisions in [prefunding strategy](/blog/prefunding-strategy) and [corridor rebalancing](/blog/corridor-rebalancing) are continuous, numerical and rule-bounded, which makes them the natural first workload. Running our own capital under agent control is the honest way to earn the right to offer it to anyone else.",
      },
      {
        type: "quote",
        text: "An agentic payment layer is not a chat interface on top of an API. It is the set of guarantees that make it safe to remove the human from the loop.",
        author: "Kawi Engineering",
      },
      {
        type: "paragraph",
        text: "The building blocks are catalogued in [primitives for agentic payments](/blog/primitives-for-agentic-payments). Most of them are not new inventions. They are existing properties of the settlement engine, exposed in a form software can use.",
      },
    ],
  },
  {
    slug: "primitives-for-agentic-payments",
    title: "The primitives an agent needs before it can pay for anything",
    seoTitle: "Primitives for Agentic Payments",
    excerpt:
      "Identity, authority, discovery, quotation, execution, receipt. Six primitives, and most payment APIs today provide two of them properly.",
    metaDescription:
      "The six primitives autonomous agents need to make payments: verifiable identity, bounded authority, service discovery, machine-readable quotes and receipts.",
    category: "Agentic",
    cluster: "Agentic",
    date: "2026-08-17",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Platform architecture",
    tags: ["agents", "api", "architecture"],
    keywords: [
      "agent payment primitives",
      "machine to machine payment api",
      "delegated authority payments",
      "verifiable receipts",
    ],
    related: [
      "kawi-agentic-layer",
      "machine-readable-quotes-and-intents",
      "agent-guardrails-and-spend-policies",
      "idempotency-in-settlement-systems",
    ],
    content: [
      {
        type: "paragraph",
        text: "Strip away the enthusiasm and an agent making a payment needs exactly six things. Listing them is useful because it shows how much of the work is unglamorous plumbing rather than intelligence.",
      },
      { type: "heading", text: "1. Identity" },
      {
        type: "paragraph",
        text: "The agent must be identifiable as itself, distinct from the human or organisation it acts for. Sharing the principal's credential collapses two identities into one and makes it impossible to answer the only question that matters after an incident: who did this, the person or the program?",
      },
      { type: "heading", text: "2. Authority" },
      {
        type: "paragraph",
        text: "Identity says who. Authority says what they may do. A delegation should be explicit and narrow: these operation types, up to this amount, within this period, to this set of destinations. It should expire by default and be revocable instantly. This is developed in [agent guardrails and spend policies](/blog/agent-guardrails-and-spend-policies).",
      },
      { type: "heading", text: "3. Discovery" },
      {
        type: "paragraph",
        text: "The agent needs to learn what is possible without a developer reading documentation for it: which corridors exist, which currencies are supported, what limits apply, what a given operation requires. Capabilities have to be queryable, and they have to be accurate, because the agent cannot compensate for a stale document.",
      },
      { type: "heading", text: "4. Quotation" },
      {
        type: "paragraph",
        text: "A price the agent can reason about: structured, with an explicit expiry, an unambiguous delivered amount and a fully itemised cost breakdown. See [machine-readable quotes and intents](/blog/machine-readable-quotes-and-intents).",
      },
      { type: "heading", text: "5. Execution" },
      {
        type: "paragraph",
        text: "Execution must be idempotent, observable and cancellable within a defined window. An agent that cannot safely retry will either give up too early or duplicate. The mechanics are unchanged from human clients, they simply become non-negotiable, as described in [idempotency in settlement systems](/blog/idempotency-in-settlement-systems).",
      },
      { type: "heading", text: "6. Receipt" },
      {
        type: "paragraph",
        text: "A verifiable artifact stating what was requested, what was executed, under whose authority, and what the counterparty received. Strong enough to be checked by a third party who trusts neither the agent nor its operator, which is what the on-chain leg contributes in [traceability and security](/blog/traceability-and-security).",
      },
      {
        type: "list",
        items: [
          "Identity: who is acting.",
          "Authority: what they are allowed to do.",
          "Discovery: what is possible right now.",
          "Quotation: what it will cost, precisely.",
          "Execution: how it happens safely, and repeatably.",
          "Receipt: what provably happened.",
        ],
      },
      {
        type: "paragraph",
        text: "Kawi already has four of these as internal properties of the settlement engine. The agentic work is largely about exposing them as first-class, machine-facing interfaces rather than inventing something new, which is the point of the [agentic layer](/blog/kawi-agentic-layer).",
      },
    ],
  },
  {
    slug: "machine-readable-quotes-and-intents",
    title: "Machine-readable quotes and the intent that precedes them",
    seoTitle: "Machine-Readable Payment Quotes and Intents",
    excerpt:
      "A quote written for a screen is a sentence. A quote written for a program is a contract with an expiry, a breakdown and a signature.",
    metaDescription:
      "How payment quotes should be structured for autonomous agents: intents, itemised costs, explicit expiry, delivered-amount guarantees and signed commitments.",
    category: "Agentic",
    cluster: "Agentic",
    date: "2026-08-10",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Developer experience",
    tags: ["agents", "quotes", "api"],
    keywords: [
      "machine readable quote",
      "payment intent api",
      "signed quote payments",
      "agent price comparison",
    ],
    related: [
      "primitives-for-agentic-payments",
      "quote-expiry-and-price-risk",
      "spread-slippage-and-effective-rate",
      "kawi-agentic-layer",
    ],
    content: [
      {
        type: "paragraph",
        text: "Human pricing interfaces are built on shared context. A person reads the rate, glances at the fee, and understands roughly what will arrive. A program has none of that context, so everything the person inferred has to be stated.",
      },
      { type: "heading", text: "Start with the intent" },
      {
        type: "paragraph",
        text: "Before a quote there is an intent: what the agent is trying to achieve, expressed as a goal rather than as a set of API calls. Deliver exactly this amount to this destination, before this deadline, spending no more than this maximum.",
      },
      {
        type: "code",
        language: "json",
        code: '{\n  "intent": "deliver",\n  "destination": { "corridor": "BR-USDC", "account": "..." },\n  "deliver_exactly": { "amount": "250.00", "currency": "USDC" },\n  "max_source_amount": { "amount": "1400.00", "currency": "BRL" },\n  "not_after": "2026-08-10T18:00:00Z"\n}',
      },
      {
        type: "paragraph",
        text: "Expressing the goal separately from the mechanics lets the engine choose the route, and lets the agent state its real constraint. Deliver exactly 250 is a very different instruction from send 1,400 and see what arrives, and almost every real use case is the first one.",
      },
      { type: "heading", text: "What a quote must contain" },
      {
        type: "list",
        items: [
          "The delivered amount, guaranteed, not estimated.",
          "The source amount required to achieve it.",
          "An itemised cost breakdown: spread, fixed fees, network cost, payout cost.",
          "An explicit expiry timestamp, not a duration the caller has to interpret.",
          "A stable quote identifier that execution refers to.",
          "A signature over the whole thing.",
        ],
      },
      {
        type: "paragraph",
        text: "The itemisation matters more for agents than for people. A program comparing providers needs to know whether a difference comes from spread or from a fixed fee, because that determines how the comparison changes with amount, exactly as described in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate).",
      },
      { type: "heading", text: "Expiry must be explicit and enforced" },
      {
        type: "paragraph",
        text: "Agents operate on machine time. A quote with a fuzzy validity period invites an agent to execute against a stale price and then dispute the difference. An absolute timestamp, enforced as a terminal transition rather than a soft check, removes the ambiguity. The economics of choosing that window are in [quote expiry and price risk](/blog/quote-expiry-and-price-risk).",
      },
      { type: "heading", text: "Sign it" },
      {
        type: "paragraph",
        text: "A signed quote is a commitment the agent can store, present later and verify independently. It turns a dispute about what was promised into a signature check, which is the same reduction the receipt primitive provides after execution in [primitives for agentic payments](/blog/primitives-for-agentic-payments).",
      },
      {
        type: "quote",
        text: "For a human, a quote is information. For an agent, a quote is a contract. Build it like one.",
        author: "Kawi Engineering",
      },
    ],
  },
  {
    slug: "agent-guardrails-and-spend-policies",
    title: "Guardrails: giving an agent authority without giving it your keys",
    seoTitle: "Agent Spend Policies and Payment Guardrails",
    excerpt:
      "The right question is not whether you trust the agent. It is what the worst possible sequence of actions costs you if you are wrong.",
    metaDescription:
      "How to bound the authority of payment agents: scoped credentials, velocity and amount limits, destination allow-lists, escalation and kill switches.",
    category: "Agentic",
    cluster: "Agentic",
    date: "2026-08-03",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Platform security",
    tags: ["agents", "security", "policy", "limits"],
    keywords: [
      "agent spend limits",
      "scoped api credentials",
      "payment guardrails",
      "delegated payment authority",
    ],
    related: [
      "primitives-for-agentic-payments",
      "kawi-agentic-layer",
      "token-extensions-for-regulated-flows",
      "autonomous-treasury-rebalancing",
    ],
    content: [
      {
        type: "paragraph",
        text: "Handing an agent an API key that can do anything its owner can do is the payments equivalent of running everything as root. It works right up until the first bug, and then it works spectacularly badly, at machine speed.",
      },
      {
        type: "paragraph",
        text: "The useful mental model is not trust. It is blast radius. Assume the agent will at some point do the wrong thing in a loop, and design so that the cost of that is bounded and visible.",
      },
      { type: "heading", text: "Scope the credential" },
      {
        type: "paragraph",
        text: "An agent credential should name the operations it may perform, the corridors it may use and the accounts it may touch. Everything not listed is denied. It should also expire by default, because a credential that never expires eventually outlives the reason it was created.",
      },
      { type: "heading", text: "Limit on more than one axis" },
      {
        type: "list",
        items: [
          "Per-operation maximum: caps a single mistake.",
          "Rolling window total: caps a slow drain across a day or a week.",
          "Velocity: caps operations per minute, which is what catches runaway loops.",
          "Destination allow-list: the strongest control available, and the most underused.",
          "Novel-destination rule: first payment to an unseen destination requires escalation.",
        ],
      },
      {
        type: "paragraph",
        text: "Any single limit can be defeated by a pattern designed around it. Amount limits are defeated by many small operations; velocity limits are defeated by patience. Layered limits are what make the space of harmful behaviours small.",
      },
      { type: "heading", text: "Escalate rather than refuse" },
      {
        type: "paragraph",
        text: "A binary allow-or-deny policy is either too loose or too annoying. The better design has a middle state: operations above a threshold are held pending approval instead of rejected, so the agent keeps working within its envelope and a human is asked only about the cases that deserve attention.",
      },
      { type: "heading", text: "A kill switch that actually works" },
      {
        type: "paragraph",
        text: "Revocation must take effect immediately across every path, including operations already in flight where they have not passed the point of no return. A revocation that only stops new requests is not a kill switch; it is a suggestion. Where the [state machine](/blog/settlement-engine-state-machine) places irreversibility determines how much of an in-flight operation can still be stopped.",
      },
      { type: "heading", text: "Attribute everything" },
      {
        type: "paragraph",
        text: "Every operation records which agent initiated it, under which delegation, from which principal, against which policy version. Without that, post-incident analysis is guesswork, and the receipts described in [primitives for agentic payments](/blog/primitives-for-agentic-payments) lose most of their value.",
      },
      {
        type: "paragraph",
        text: "Some of these constraints can eventually be pushed down to the asset itself, which is why [token extensions for regulated flows](/blog/token-extensions-for-regulated-flows) matter here: a limit the token enforces is a limit no integration mistake can bypass.",
      },
      {
        type: "quote",
        text: "Do not ask whether the agent is trustworthy. Ask what it costs you if it is not, then make that number small.",
        author: "Kawi Engineering",
      },
    ],
  },
  {
    slug: "autonomous-treasury-rebalancing",
    title: "Autonomous treasury: the first job we are giving to agents",
    seoTitle: "Autonomous Treasury Rebalancing with Agents",
    excerpt:
      "Treasury rebalancing is continuous, numerical and rule-bounded. It is the most obvious thing in the company to automate, and the best place to prove the guardrails work.",
    metaDescription:
      "How Kawi automates treasury operations with bounded agents: forecasting corridor drain, sizing transfers and operating under hard policy limits.",
    category: "Agentic",
    cluster: "Agentic",
    date: "2026-07-27",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Treasury engineering",
    tags: ["agents", "treasury", "automation", "liquidity"],
    keywords: [
      "autonomous treasury",
      "automated liquidity management",
      "agent treasury operations",
      "payment liquidity forecasting",
    ],
    related: [
      "corridor-rebalancing",
      "prefunding-strategy",
      "agent-guardrails-and-spend-policies",
      "kawi-agentic-layer",
    ],
    content: [
      {
        type: "paragraph",
        text: "If you are going to let software move money, start with your own. Kawi's first agentic workload is treasury: watching corridor balances, forecasting drain and moving liquidity before a buffer becomes a problem.",
      },
      {
        type: "paragraph",
        text: "It is a good first workload for three reasons. The decisions are numerical, so they can be evaluated objectively. The counterparties are our own accounts, so the destination allow-list is tiny. And the alternative is a person watching dashboards at three in the morning, which is neither reliable nor humane.",
      },
      { type: "heading", text: "What the agent actually does" },
      {
        type: "list",
        items: [
          "Observes balances, in-flight operations and recent flow per corridor, continuously.",
          "Forecasts outflow over the replenishment lead time using the distribution, not the average.",
          "Compares projected balance against the reorder point from [prefunding inventory math](/blog/prefunding-inventory-math).",
          "Sizes a transfer that respects the band logic in [corridor rebalancing](/blog/corridor-rebalancing).",
          "Executes within hard policy limits, or escalates when the decision falls outside them.",
        ],
      },
      {
        type: "paragraph",
        text: "Notice that none of this requires the agent to be clever. It requires it to be consistent, awake and correct, which is precisely where software beats people and where people have historically been asked to compete.",
      },
      { type: "heading", text: "Forecasting the tail, not the mean" },
      {
        type: "paragraph",
        text: "The useful forecast is not expected outflow. It is the high percentile of outflow over the lead time, because that is what determines whether a buffer survives. An agent optimising the average will be right most days and expensively wrong on exactly the days that matter.",
      },
      {
        type: "formula",
        expression: "projected_shortfall  =  forecast_outflow(p95, L)  −  ( balance  +  inbound_in_flight )",
        caption:
          "A positive shortfall triggers replenishment. Using p95 rather than the mean is the difference between a buffer that holds and one that fails at month end.",
      },
      { type: "heading", text: "The guardrails are the product" },
      {
        type: "paragraph",
        text: "The agent operates under the layered limits from [agent guardrails and spend policies](/blog/agent-guardrails-and-spend-policies): a destination allow-list containing only Kawi treasury accounts, per-transfer and daily caps, velocity limits, and mandatory escalation for anything unusual.",
      },
      {
        type: "paragraph",
        text: "It also has no authority to move money to a customer. Treasury and settlement authority are separate, so a treasury agent failing badly is expensive to us and invisible to users. That separation is deliberate and permanent.",
      },
      { type: "heading", text: "Measured against a boring baseline" },
      {
        type: "paragraph",
        text: "The agent is evaluated against a simple threshold rule, not against a fantasy of perfect foresight. Fewer stockouts, less idle capital and fewer transfers than the baseline is a win. Anything else means the baseline stays.",
      },
      {
        type: "quote",
        text: "The measure of a treasury agent is not how clever its decisions look. It is how few interesting nights it produces.",
        author: "Kawi Engineering",
      },
      {
        type: "paragraph",
        text: "Once this is boring, the same pattern generalises to customer-facing autonomy. That path is described in [the agentic layer](/blog/kawi-agentic-layer).",
      },
    ],
  },
];
