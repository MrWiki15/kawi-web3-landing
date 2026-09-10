import type { BlogPost } from "./types";

export const moreSolanaPosts: BlogPost[] = [
  {
    slug: "settlement-chains-compared",
    title: "Solana vs Base vs Stellar vs Tron for stablecoin payments",
    seoTitle: "Best Blockchain for Stablecoin Payments",
    excerpt:
      "Not a tribal comparison. A criteria-based teardown of the four chains that actually move stablecoins at scale, judged by what a settlement engine needs, not by market narrative.",
    metaDescription:
      "A criteria-based comparison of Solana, Base, Stellar and Tron for stablecoin payments: finality, fee tail, native liquidity and settlement fit.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-09-02",
    updated: "2026-09-02",
    readingMinutes: 9,
    author: "Kawi Research",
    authorRole: "Settlement team",
    tags: ["solana", "base", "stablecoins", "comparison"],
    keywords: [
      "best blockchain for stablecoin payments",
      "Solana vs Base",
      "Tron stablecoin settlement",
      "Stellar payments",
      "stablecoin chain comparison",
    ],
    related: [
      "why-solana-for-settlement",
      "usdc-liquidity-on-solana",
      "solana-fee-study",
      "kawi-web3-cuba",
    ],
    content: [
      {
        type: "paragraph",
        text: "Ask which chain is best for payments and you will get an argument. Ask which chain settles a stablecoin transfer cheaply, quickly and with liquidity deep enough to quote real size, and you get something you can actually decide with. This is the second question, judged against the needs of a settlement engine rather than the needs of a timeline.",
      },
      { type: "heading", text: "The criteria that matter" },
      {
        type: "list",
        items: [
          "Finality: how fast a transfer is irreversible enough to deliver against, covered in [Solana finality for payments](/blog/solana-finality-for-payments).",
          "Fee tail: not the average fee but the p99 during congestion, because the worst case is what sets your margin.",
          "Native liquidity: whether the stablecoin is natively issued and redeemable, not bridged.",
          "Decentralisation and censorship-resistance: how many independent parties can stop a transfer.",
          "Operational maturity: tooling, uptime history and how the chain behaves on a bad day.",
        ],
      },
      { type: "heading", text: "Tron: liquidity without comfort" },
      {
        type: "paragraph",
        text: "Tron carries an enormous share of USDT transfers, especially for remittances, because it is cheap and familiar. But it concentrates validation heavily, which is a censorship-resistance and counterparty concern for a regulated operator. It is where a lot of volume is, not where a compliance-first engine wants its settlement guarantees to come from.",
      },
      { type: "heading", text: "Stellar: built for payments, thinner liquidity" },
      {
        type: "paragraph",
        text: "Stellar was designed for payments and does that job elegantly, with fast, cheap transfers and a clean asset model. Its constraint is depth: for large stablecoin size the liquidity and ecosystem are simply smaller, which caps quotable size even when the rails are good.",
      },
      { type: "heading", text: "Base: excellent access, shared settlement" },
      {
        type: "paragraph",
        text: "Base is a strong access layer with real developer momentum and growing native USDC. As an Ethereum layer-2 it inherits Ethereum's settlement assurances and a more complex fee surface. It is a superb place to reach users, which is exactly why we use p2p.me on Base as an access rail in some markets, as described in [our Cuba entry](/blog/kawi-web3-cuba). Access and settlement are different jobs.",
      },
      { type: "heading", text: "Solana: where we settle" },
      {
        type: "paragraph",
        text: "For the settlement leg specifically, Solana wins on the combination that matters: sub-second confirmation, a fee tail that stays small for payment-sized transfers, and deep native USDC. The full argument is in [why Solana for settlement](/blog/why-solana-for-settlement) and the liquidity case in [USDC liquidity on Solana](/blog/usdc-liquidity-on-solana).",
      },
      {
        type: "paragraph",
        text: "The honest conclusion is not that one chain wins everything. It is that access and settlement are separable, and the right architecture picks the best rail for each. We reach users where they are, and we settle where settlement is cheapest and deepest.",
      },
      {
        type: "quote",
        text: "Pick the chain for the job, not the job for the chain.",
        author: "Kawi Research",
      },
    ],
  },
  {
    slug: "solana-fee-study",
    title: "What a payments engine actually pays in Solana fees",
    seoTitle: "Solana Fees for Payments: An Empirical Look",
    excerpt:
      "Average fees are a comforting lie. During congestion the only number that matters is the tail, and the tail is what a settlement engine has to budget for. Here is how to measure it and bid for it.",
    metaDescription:
      "How to measure the real cost of settling on Solana: base fees, priority-fee percentiles during congestion, the fee tail, and how to bid without overpaying.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-08-27",
    updated: "2026-08-27",
    readingMinutes: 8,
    author: "Kawi Research",
    authorRole: "Settlement team",
    tags: ["solana", "fees", "congestion", "data"],
    keywords: [
      "Solana transaction fees",
      "Solana priority fees",
      "Solana congestion cost",
      "compute unit price",
      "Solana fee percentile",
    ],
    related: [
      "solana-fee-economics",
      "designing-for-network-degradation",
      "settlement-chains-compared",
      "unit-economics-of-a-settlement",
    ],
    content: [
      {
        type: "paragraph",
        text: "There is a number people quote for Solana fees, usually a fraction of a cent, and it is technically true and practically useless. It is the median on a calm day. A settlement engine does not live on the median; it lives on the worst hour of the worst day, and budgeting for the median is how you discover your margin was imaginary.",
      },
      { type: "heading", text: "The two components of a fee" },
      {
        type: "paragraph",
        text: "A Solana transaction pays a fixed base fee per signature, currently 5,000 lamports, which is negligible. On top of that sits a priority fee, the price per compute unit you bid to be included when block space is contested. The base fee is constant and tiny; the priority fee is the whole story.",
      },
      {
        type: "formula",
        expression: "fee  =  base_fee_per_sig  +  (compute_units  ×  price_per_cu)",
        caption:
          "The base term barely moves. The product on the right is what explodes during congestion, and it is the term you have to model as a distribution rather than a point.",
      },
      { type: "heading", text: "Measure the tail, not the mean" },
      {
        type: "paragraph",
        text: "The right way to size fee cost is to sample the priority fee paid by landed transactions over time and look at the percentiles. The median tells you nothing useful; the p95 and p99 during memecoin-driven congestion tell you the true ceiling. Budget to the p99 and treat calmer conditions as upside.",
      },
      {
        type: "paragraph",
        text: "This connects directly to unit economics: the fee you must reserve per operation is a tail statistic, and folding it into the model in [unit economics of a settlement](/blog/unit-economics-of-a-settlement) is what keeps a corridor honestly profitable.",
      },
      { type: "heading", text: "Bidding without overpaying" },
      {
        type: "list",
        items: [
          "Set the compute-unit limit tightly, so you are not paying for units you do not use.",
          "Bid the priority fee dynamically from a recent percentile of landed fees, not a fixed guess.",
          "Escalate the bid on retry rather than starting high, so calm conditions stay cheap.",
          "Cap the bid and treat the cap breach as a degraded state, handled the way [designing for network degradation](/blog/designing-for-network-degradation) describes.",
        ],
      },
      {
        type: "paragraph",
        text: "The deeper mechanics of how these fees are set live in [Solana fee economics](/blog/solana-fee-economics). The operational point here is narrower and more important: measure your own fee tail continuously, because it is a live input to pricing, not a constant you can hard-code once.",
      },
    ],
  },
  {
    slug: "stablecoin-depeg-teardown",
    title: "A stablecoin depeg teardown, and what it teaches settlement",
    seoTitle: "Stablecoin Depeg Teardown for Settlement",
    excerpt:
      "When USDC briefly lost its peg in March 2023, it was a stress test for everyone who settles on it. The lesson was not to panic; it was to design as if this will happen again.",
    metaDescription:
      "A teardown of stablecoin depeg events and what they teach a settlement engine about liquidity risk, redemption, exposure windows and designing for the next one.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-08-20",
    updated: "2026-08-20",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Settlement team",
    tags: ["stablecoins", "risk", "liquidity", "usdc"],
    keywords: [
      "stablecoin depeg",
      "USDC depeg 2023",
      "stablecoin liquidity risk",
      "stablecoin redemption risk",
      "settlement risk stablecoin",
    ],
    related: [
      "usdc-liquidity-on-solana",
      "genius-act-stablecoins",
      "fx-exposure-and-hedging",
      "prefunding-strategy",
    ],
    content: [
      {
        type: "paragraph",
        text: "Over one weekend in March 2023, a major stablecoin traded as low as the high eighties of a dollar. The reserves were largely fine and it recovered within days, but for anyone holding it as working capital those days were a genuine stress test. The useful response is not reassurance; it is to treat a depeg as a scheduled event you have not seen the date of yet.",
      },
      { type: "heading", text: "Why a depeg happens" },
      {
        type: "paragraph",
        text: "A fully-backed stablecoin can still trade below one dollar in the market, because secondary-market price and redemption value are different things. If holders fear a redemption problem, or if the venue to redeem is temporarily shut, sellers accept a discount for immediate liquidity. The peg is an equilibrium maintained by arbitrage against redemption, and it wobbles when redemption is in doubt.",
      },
      {
        type: "paragraph",
        text: "This is exactly why reserve quality and redemption rights, now codified by [the GENIUS Act](/blog/genius-act-stablecoins), are the properties that actually matter, and why we treat them as the core of [USDC liquidity on Solana](/blog/usdc-liquidity-on-solana).",
      },
      { type: "heading", text: "Where a settlement engine is exposed" },
      {
        type: "paragraph",
        text: "The exposure is the window during which value sits in the stablecoin. If a transfer enters in fiat, converts, settles on-chain and pays out within a minute, the depeg exposure is a minute. If value sits as stablecoin inventory for hours as prefunded liquidity, the exposure is hours. The risk is proportional to dwell time, not to volume.",
      },
      { type: "heading", text: "Designing for the next one" },
      {
        type: "list",
        items: [
          "Minimise dwell time: the shorter value stays in the token, the smaller the exposure, which is another argument for fast settlement.",
          "Diversify the inventory across more than one high-quality issuer where possible, so a single issuer event is survivable.",
          "Treat a depeg as a defined degraded state with its own playbook, not as an emergency invented in the moment.",
          "Size the stress reserve in [prefunding strategy](/blog/prefunding-strategy) to absorb a temporary discount without halting payouts.",
        ],
      },
      {
        type: "paragraph",
        text: "A depeg is also an FX event in disguise, and the tools to measure and hedge it are the same ones in [FX exposure and hedging](/blog/fx-exposure-and-hedging). The engine that survives the next depeg is the one that already treated it as inevitable.",
      },
    ],
  },
  {
    slug: "why-solana-transactions-drop",
    title: "Why your Solana transaction drops, and how to retry it",
    seoTitle: "Why Solana Transactions Drop, and Retrying",
    excerpt:
      "A payment that never lands is worse than one that fails loudly. On Solana, transactions get dropped for reasons that have nothing to do with your balance, and handling that is a core settlement skill.",
    metaDescription:
      "Why Solana transactions get dropped: blockhash expiry, QUIC ingestion and congestion, and how a settlement engine retries them safely and idempotently.",
    category: "Solana",
    cluster: "Solana",
    date: "2026-08-14",
    updated: "2026-08-14",
    readingMinutes: 7,
    author: "Kawi Engineering",
    authorRole: "Settlement team",
    tags: ["solana", "reliability", "retries", "engineering"],
    keywords: [
      "Solana transaction dropped",
      "Solana blockhash expired",
      "Solana QUIC congestion",
      "Solana retry transaction",
      "Solana transaction not landing",
    ],
    related: [
      "designing-for-network-degradation",
      "idempotency-in-settlement-systems",
      "solana-fee-study",
      "settlement-engine-state-machine",
    ],
    content: [
      {
        type: "paragraph",
        text: "The failure that teaches you the most about Solana is not a rejected transaction. It is a transaction that simply disappears: signed, submitted, and never seen again. For a settlement engine that is the most dangerous outcome of all, because a payment in an unknown state is worse than a payment that failed cleanly.",
      },
      { type: "heading", text: "Blockhash expiry" },
      {
        type: "paragraph",
        text: "Every Solana transaction references a recent blockhash and is only valid for a short window, roughly a minute and a half of blocks. If it does not land inside that window it becomes permanently invalid. This is a feature: it bounds how long a transaction can hang around. But it means a transaction stuck behind congestion can expire, and you must detect that rather than assume it is still pending.",
      },
      { type: "heading", text: "Ingestion and congestion" },
      {
        type: "paragraph",
        text: "Transactions reach validators over QUIC connections with limits that favour higher-staked senders under load. During congestion, lower-priority transactions can be dropped at ingestion before they ever reach a block. Your transaction was valid; it just never got in the door. The cure is a higher priority fee, bid the way [the Solana fee study](/blog/solana-fee-study) describes, plus retries.",
      },
      { type: "heading", text: "How to retry without double-paying" },
      {
        type: "paragraph",
        text: "Retrying a payment is where good intentions cause double spends. The rule is that a retry must be the same transaction, not a new one: the same idempotency guarantees from [idempotency in settlement systems](/blog/idempotency-in-settlement-systems) apply on-chain too.",
      },
      {
        type: "list",
        items: [
          "Rebroadcast the same signed transaction while its blockhash is still valid, rather than signing a new one.",
          "Once the blockhash expires, confirm the old transaction can never land before creating a replacement, keyed to the same operation.",
          "Poll by signature and by operation id, so a transaction that quietly landed is recognised and not sent twice.",
          "Represent every step as a state transition in [the settlement state machine](/blog/settlement-engine-state-machine), so an unknown outcome is a state you handle, not a gap.",
        ],
      },
      {
        type: "paragraph",
        text: "Dropped transactions are not a Solana defect to complain about; they are a property to engineer around, in the same spirit as [designing for network degradation](/blog/designing-for-network-degradation). The engine that assumes submission equals success will eventually pay twice. The one that assumes nothing landed until it confirms will not.",
      },
    ],
  },
];
