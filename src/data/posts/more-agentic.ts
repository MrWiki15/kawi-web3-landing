import type { BlogPost } from "./types";

export const moreAgenticPosts: BlogPost[] = [
  {
    slug: "x402-http-payments-for-agents",
    title: "x402: paying per API call, the way the web intended",
    seoTitle: "x402: HTTP-Native Payments for Agents",
    excerpt:
      "HTTP reserved a status code for payment in 1997 and left it unused for a quarter century. Agents that spend money are the reason x402 is finally worth implementing.",
    metaDescription:
      "What the x402 standard is and why it matters: reviving HTTP 402 for machine payments so agents can pay per API call with stablecoins, and how settlement fits.",
    category: "Agentic",
    cluster: "Agentic",
    date: "2026-09-03",
    updated: "2026-09-03",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Agentic payments",
    tags: ["agentic", "x402", "http", "stablecoins"],
    keywords: [
      "x402 payments",
      "HTTP 402 payment required",
      "pay per API call",
      "agent payments protocol",
      "machine payments stablecoin",
    ],
    related: [
      "primitives-for-agentic-payments",
      "machine-readable-quotes-and-intents",
      "stablecoins-for-ai-agents",
      "kawi-agentic-layer",
    ],
    content: [
      {
        type: "paragraph",
        text: "When HTTP was standardised, its authors reserved status code 402, Payment Required, and then left it unused for twenty-five years because there was no good way for software to actually pay. That gap is now the interesting part. As autonomous agents start to consume paid services on their own, x402 revives 402 as a real, open way to charge per request.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "paragraph",
        text: "The flow is exactly what the status code always implied. An agent requests a resource, the server responds with 402 and a machine-readable description of the price and how to pay, the agent pays, usually in a stablecoin, and retries the request with proof of payment. No account, no API key issued in advance, no subscription. The payment is part of the request.",
      },
      {
        type: "paragraph",
        text: "The price description is a machine-readable quote, which is why x402 slots so cleanly onto the work in [machine-readable quotes and intents](/blog/machine-readable-quotes-and-intents): the agent needs a quote it can parse and act on without a human in the loop.",
      },
      { type: "heading", text: "Why agents make this finally worth it" },
      {
        type: "paragraph",
        text: "For humans, per-request payment is friction; we prefer subscriptions and monthly bills. For an agent, the opposite is true. An agent calling a hundred different tools once each does not want a hundred subscriptions; it wants to pay a fraction of a cent per call and move on. Micropayments that made no sense for people make perfect sense for software, and that is the demand x402 serves.",
      },
      { type: "heading", text: "Where settlement fits" },
      {
        type: "list",
        items: [
          "The payment leg needs the primitives in [primitives for agentic payments](/blog/primitives-for-agentic-payments): identity, bounded authority, quote, execution and receipt.",
          "It needs a stablecoin as the unit, for the reasons in [stablecoins for AI agents](/blog/stablecoins-for-ai-agents).",
          "It needs settlement fast and cheap enough that a sub-cent payment is not eaten by the fee, which is the whole [Kawi agentic layer](/blog/kawi-agentic-layer) thesis.",
        ],
      },
      {
        type: "paragraph",
        text: "x402 is not important because 402 is finally being used. It is important because it makes paying a native verb of the web again, and an internet where software can pay for what it uses, precisely and instantly, needs a settlement layer built for exactly that.",
      },
    ],
  },
  {
    slug: "stablecoins-for-ai-agents",
    title: "Why stablecoins are the native currency of AI agents",
    seoTitle: "Stablecoins as the Currency of AI Agents",
    excerpt:
      "Give an autonomous agent a payment method and every property you took for granted gets tested. Stablecoins pass the tests that cards and bank transfers quietly fail.",
    metaDescription:
      "Why AI agents will transact in stablecoins: programmability, final settlement, global reach and sub-cent fees, where cards and bank rails fall short.",
    category: "Agentic",
    cluster: "Agentic",
    date: "2026-08-22",
    updated: "2026-08-22",
    readingMinutes: 6,
    author: "Kawi Research",
    authorRole: "Agentic payments",
    tags: ["agentic", "stablecoins", "ai", "payments"],
    keywords: [
      "stablecoins for AI agents",
      "agent payments currency",
      "AI agent money",
      "programmable payments agents",
      "machine to machine payments",
    ],
    related: [
      "identity-for-spending-agents",
      "x402-http-payments-for-agents",
      "agent-guardrails-and-spend-policies",
      "usdc-liquidity-on-solana",
    ],
    content: [
      {
        type: "paragraph",
        text: "The moment you hand a payment method to an autonomous agent, you are running a stress test on that payment method's assumptions. Cards assume a human who can be phoned about a suspicious charge. Bank transfers assume business hours and a person to approve. Agents have none of that, and stablecoins are the instrument whose assumptions actually survive.",
      },
      { type: "heading", text: "The four properties agents need" },
      {
        type: "list",
        items: [
          "Programmability: a payment an agent can construct, sign and verify in code, without a hosted checkout designed for eyes and thumbs.",
          "Final settlement: an outcome the agent can confirm and then act on, rather than a pending state that might reverse days later.",
          "Global reach: one instrument that works across borders, because an agent does not know or care which country a service is in.",
          "Sub-cent fees: economics that survive a payment worth a fraction of a cent, which cards and wires cannot.",
        ],
      },
      { type: "heading", text: "Where legacy rails fail the test" },
      {
        type: "paragraph",
        text: "A card payment for one-tenth of a cent is absurd; the interchange alone dwarfs it, for the reasons in [what card networks tell us about stablecoin margins](/blog/card-networks-vs-stablecoin-rails). A bank transfer that settles in days is useless to an agent that needs to know now whether it can proceed. The failures are not bugs; they are the rails working as designed for humans.",
      },
      { type: "heading", text: "Why stablecoins fit" },
      {
        type: "paragraph",
        text: "A stablecoin is programmable by default, settles with finality in seconds on a chain with deep liquidity like the one in [USDC liquidity on Solana](/blog/usdc-liquidity-on-solana), works the same across every border, and costs a fraction of a cent to move. It is, almost by accident, the exact instrument an agentic economy requires, which is why it underpins both [x402](/blog/x402-http-payments-for-agents) and the broader [primitives for agentic payments](/blog/primitives-for-agentic-payments).",
      },
      {
        type: "paragraph",
        text: "None of this removes the need for control; an agent with money needs strict limits, which is the subject of [agent guardrails and spend policies](/blog/agent-guardrails-and-spend-policies). But the currency question is settled. When software spends, it will spend stablecoins, because they are the only instrument that was accidentally designed for it.",
      },
    ],
  },
  {
    slug: "identity-for-spending-agents",
    title: "Identity for agents that spend money",
    seoTitle: "Identity for AI Agents That Spend Money",
    excerpt:
      "An agent with a wallet is a stranger with a signature. Before it can be trusted to pay, it needs an identity you can scope, revoke and hold accountable, without a human clicking approve.",
    metaDescription:
      "How to give spending AI agents an identity: scoped credentials, delegated authority, attestations and revocation, so autonomous payments stay accountable.",
    category: "Agentic",
    cluster: "Agentic",
    date: "2026-08-08",
    updated: "2026-08-08",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Agentic payments",
    tags: ["agentic", "identity", "security", "credentials"],
    keywords: [
      "AI agent identity",
      "agent credentials payments",
      "delegated authority agents",
      "scoped credentials",
      "agent authentication",
    ],
    related: [
      "agent-guardrails-and-spend-policies",
      "primitives-for-agentic-payments",
      "stablecoins-for-ai-agents",
      "kawi-agentic-layer",
    ],
    content: [
      {
        type: "paragraph",
        text: "A wallet address is not an identity. It is a way to sign, nothing more. The moment an agent can move money, the question stops being \"can it sign\" and becomes \"who is this, what is it allowed to do, and who is answerable when it goes wrong\". Identity for spending agents is the layer that turns an anonymous signer into an accountable actor.",
      },
      { type: "heading", text: "Who does this agent act for" },
      {
        type: "paragraph",
        text: "Every spending agent acts on behalf of someone: a user, a company, another agent. Its identity has to carry that chain of delegation, so a payment can always be traced back to the human or organisation ultimately responsible. Without that chain, you have not built an agent; you have built an untraceable spender, and no regulator or counterparty will accept it.",
      },
      { type: "heading", text: "The building blocks" },
      {
        type: "list",
        items: [
          "A verifiable identifier for the agent itself, so it can be recognised across services rather than being an anonymous key each time.",
          "Delegated, scoped authority: a credential that says this agent may spend up to this much, on these categories, until this expiry, and no more.",
          "Attestations: signed statements from the principal that this agent is authorised, which a counterparty can verify without trusting the agent's own claims.",
          "Revocation: the ability to pull the authority instantly, because an agent that cannot be switched off is a liability, not a tool.",
        ],
      },
      { type: "heading", text: "Identity and limits are the same system" },
      {
        type: "paragraph",
        text: "Identity answers who and what-is-allowed; the enforcement of what-is-allowed is the guardrails in [agent guardrails and spend policies](/blog/agent-guardrails-and-spend-policies). They are two halves of one mechanism: a scoped credential is only as good as the system that refuses the transaction when the scope is exceeded.",
      },
      {
        type: "paragraph",
        text: "This is the piece that makes the rest of the agentic stack safe to deploy. The currency comes from [stablecoins for AI agents](/blog/stablecoins-for-ai-agents), the operations from [primitives for agentic payments](/blog/primitives-for-agentic-payments), and the accountability from identity. Together they are what let an agent be trusted with money, which is the entire point of [the Kawi agentic layer](/blog/kawi-agentic-layer).",
      },
    ],
  },
];
