import type { BlogPost } from "./types";

export const moreInfrastructurePosts: BlogPost[] = [
  {
    slug: "double-entry-ledger-for-crypto-fiat",
    title: "Designing a double-entry ledger for a crypto-fiat business",
    seoTitle: "Double-Entry Ledger for Crypto and Fiat",
    excerpt:
      "The oldest idea in accounting is also the safest foundation for a settlement engine. One append-only ledger that speaks fiat and on-chain in the same language is what keeps the books honest.",
    metaDescription:
      "How to design a double-entry ledger for fiat and on-chain movements together: accounts, immutability, reconciliation and why append-only beats editable rows.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-08-28",
    updated: "2026-08-28",
    readingMinutes: 8,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["ledger", "accounting", "engineering", "reconciliation"],
    keywords: [
      "double entry ledger crypto",
      "crypto fiat accounting",
      "immutable ledger design",
      "payments ledger schema",
      "append only ledger",
    ],
    related: [
      "chaos-engineering-for-settlement",
      "reconciliation-by-design",
      "settlement-engine-state-machine",
      "idempotency-without-idempotent-apis",
    ],
    content: [
      {
        type: "paragraph",
        text: "The temptation when you build a payments system is to track balances in a column and update it as money moves. It works until the first dispute, and then it fails catastrophically, because a mutable balance has no memory of how it got there. The fix is six hundred years old: double-entry bookkeeping, applied to a business that speaks both fiat and blockchain.",
      },
      { type: "heading", text: "Every movement is two entries" },
      {
        type: "paragraph",
        text: "In a double-entry ledger, value is never created or destroyed, only moved between accounts, and every movement is recorded as a matched pair: a debit somewhere and an equal credit somewhere else. The invariant is that the whole system always sums to zero. If it does not, you have a bug you can see immediately rather than a discrepancy you discover in an audit.",
      },
      {
        type: "formula",
        expression: "Σ debits  =  Σ credits        (always, for every operation)",
        caption:
          "This is the entire safety property. A settlement that does not balance to zero is rejected before it is committed, not reconciled after the fact.",
      },
      { type: "heading", text: "Modelling fiat and on-chain together" },
      {
        type: "paragraph",
        text: "The trick for a hybrid engine is to treat a bank balance, a stablecoin balance and a customer's entitlement as accounts in the same ledger, denominated carefully and linked by the operation that moves between them. A BRL-in, USDC-settled, MXN-out transfer is a sequence of balanced entries across fiat and crypto accounts, tied to one operation id, exactly the lifecycle in [the settlement state machine](/blog/settlement-engine-state-machine).",
      },
      { type: "heading", text: "Append-only or nothing" },
      {
        type: "list",
        items: [
          "Entries are never edited or deleted. A correction is a new, reversing entry, so history is complete and tamper-evident.",
          "Every entry carries the operation id and the external references, which is what makes reconciliation a lookup rather than an investigation, per [reconciliation by design](/blog/reconciliation-by-design).",
          "Balances are derived by summing entries, never stored as the source of truth, so they can always be recomputed and verified.",
        ],
      },
      {
        type: "paragraph",
        text: "The payoff is that the ledger becomes the single source of truth a regulator, an auditor and an engineer can all trust, which is the property described in [traceability and security](/blog/traceability-and-security). An append-only, always-balancing ledger is not the boring part of a settlement engine. It is the part that lets everything else be trusted.",
      },
    ],
  },
  {
    slug: "idempotency-without-idempotent-apis",
    title: "Idempotency when your bank's API doesn't have it",
    seoTitle: "Idempotency Against Non-Idempotent APIs",
    excerpt:
      "Exactly-once is easy when everyone cooperates. The real world hands you bank APIs that will happily process the same payout twice. Here is how to build safety on top of partners who offer none.",
    metaDescription:
      "How to achieve exactly-once payments when a provider's API is not idempotent: dedup keys, pre-flight checks, reconciliation as backstop and safe retry design.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-08-16",
    updated: "2026-08-16",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["idempotency", "reliability", "engineering", "banking"],
    keywords: [
      "idempotency payments",
      "non-idempotent API",
      "exactly once payment",
      "duplicate payout prevention",
      "safe retry banking",
    ],
    related: [
      "idempotency-in-settlement-systems",
      "event-driven-settlement-webhooks",
      "reconciliation-by-design",
      "double-entry-ledger-for-crypto-fiat",
    ],
    content: [
      {
        type: "paragraph",
        text: "In the textbook, you pass an idempotency key, the provider deduplicates, and a retry is free. In production, half your partners have never heard of an idempotency key, their API will cheerfully send the same payout twice if you ask twice, and a timeout leaves you genuinely unsure whether money moved. Exactly-once is not a feature you can require; it is one you have to manufacture.",
      },
      { type: "heading", text: "The problem is the ambiguous timeout" },
      {
        type: "paragraph",
        text: "A clean failure is easy: nothing happened, retry. The dangerous case is the request that times out. Did the payout go through and the acknowledgement get lost, or did it never happen? Retrying blindly risks paying twice; not retrying risks not paying at all. Every hard idempotency problem is really this ambiguity.",
      },
      { type: "heading", text: "Manufacturing exactly-once anyway" },
      {
        type: "list",
        items: [
          "Own the dedup key yourself: attach a unique reference to every payout and store it before you call, so you always know what you intended.",
          "Pre-flight check: before retrying, query the provider for a payout carrying your reference, and only send if it truly is not there.",
          "Make the operation the unit of truth: the ledger entry from [the double-entry ledger](/blog/double-entry-ledger-for-crypto-fiat) records intent, so a retry reconciles against intent rather than guessing.",
          "Treat the provider's confirmation as an event to be verified and reconciled, in the spirit of [event-driven settlement webhooks](/blog/event-driven-settlement-webhooks).",
        ],
      },
      { type: "heading", text: "Reconciliation is the backstop, not the plan" },
      {
        type: "paragraph",
        text: "Even with pre-flight checks, some ambiguity survives, and that is what continuous reconciliation exists to catch. If a duplicate slips through, the balanced ledger surfaces it fast, and the process in [reconciliation by design](/blog/reconciliation-by-design) turns it into a correcting entry rather than a silent loss.",
      },
      {
        type: "paragraph",
        text: "The underlying discipline is the same one in [idempotency in settlement systems](/blog/idempotency-in-settlement-systems); the difference is doing it when the counterparty gives you nothing to build on. You cannot make a partner idempotent, but you can make yourself the system of record that refuses to pay twice.",
      },
    ],
  },
  {
    slug: "chaos-engineering-for-settlement",
    title: "Chaos engineering for a settlement engine",
    seoTitle: "Chaos Engineering for a Settlement Engine",
    excerpt:
      "You do not know how your payment system fails until you make it fail on purpose. Injecting the disasters you fear, on your own schedule, is how you find out before your users do.",
    metaDescription:
      "How to apply chaos engineering to a settlement engine: injecting provider timeouts, congestion and depegs to verify the system degrades safely.",
    category: "Infrastructure",
    cluster: "Infrastructure",
    date: "2026-08-07",
    updated: "2026-08-07",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Platform reliability",
    tags: ["reliability", "chaos-engineering", "testing", "engineering"],
    keywords: [
      "chaos engineering payments",
      "fault injection settlement",
      "payment system resilience",
      "failure testing fintech",
      "resilience testing",
    ],
    related: [
      "designing-for-network-degradation",
      "settlement-sla-and-observability",
      "settlement-engine-state-machine",
      "why-solana-transactions-drop",
    ],
    content: [
      {
        type: "paragraph",
        text: "Every settlement engine has a set of disasters it is quietly afraid of: the bank that stops responding mid-payout, the chain that congests when volume peaks, the stablecoin that wobbles off its peg. You can hope those never coincide with your busiest hour, or you can cause them on a Tuesday morning when everyone is watching. Chaos engineering is choosing the second option.",
      },
      { type: "heading", text: "Test the failure, not the happy path" },
      {
        type: "paragraph",
        text: "The happy path is the part that already works; it is not where the risk lives. The risk lives in the transitions the state machine handles rarely: the ambiguous timeout, the expired blockhash, the non-responsive counterparty. Chaos engineering deliberately drives the system into those states to confirm they are handled as states and not as gaps, exactly the states enumerated in [the settlement state machine](/blog/settlement-engine-state-machine).",
      },
      { type: "heading", text: "The failures worth injecting" },
      {
        type: "list",
        items: [
          "Provider timeouts and duplicate responses, to prove the idempotency guarantees actually hold under fire.",
          "Chain congestion and dropped transactions, to verify the retry and fee-escalation logic from [why Solana transactions drop](/blog/why-solana-transactions-drop).",
          "A simulated depeg, to confirm the degraded-mode playbook engages before a human panics.",
          "Partial outages, where one corridor's payout partner fails while others are healthy, to check blast radius.",
        ],
      },
      { type: "heading", text: "You only learn if you are watching" },
      {
        type: "paragraph",
        text: "Injecting failure is only half of it. The other half is observing precisely what happened, which is why chaos work and observability are the same discipline seen from two sides, and why the metrics in [settlement SLAs and observability](/blog/settlement-sla-and-observability) are the scoreboard for every experiment.",
      },
      {
        type: "paragraph",
        text: "Done regularly, this turns reliability from a hope into a measurement. The same philosophy runs through [designing for network degradation](/blog/designing-for-network-degradation): assume the bad day is coming, rehearse it deliberately, and make sure the answer to \"what happens when this breaks\" is a demo rather than a guess.",
      },
    ],
  },
];
