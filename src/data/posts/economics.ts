import type { BlogPost } from "./types";

export const economicsPosts: BlogPost[] = [
  {
    slug: "economics-of-cross-border-settlement",
    title: "The economics behind hybrid settlement",
    seoTitle: "The Economics of Cross-Border Settlement",
    excerpt:
      "Cross-border payments are expensive for structural reasons, not greedy ones. Understanding the structure is what tells you which costs a new rail can actually remove.",
    metaDescription:
      "A structural breakdown of cross-border payment costs: intermediary hops, trapped capital, FX spread and overhead, and which of them hybrid settlement removes.",
    category: "Economics",
    cluster: "Economics",
    pillar: true,
    date: "2026-08-26",
    updated: "2026-08-26",
    readingMinutes: 9,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["economics", "cross-border", "cost structure"],
    keywords: [
      "cross-border payment economics",
      "correspondent banking cost",
      "nostro vostro capital",
      "settlement cost structure",
    ],
    related: [
      "unit-economics-of-a-settlement",
      "float-and-cost-of-capital",
      "prefunding-strategy",
      "pricing-a-corridor",
    ],
    content: [
      {
        type: "paragraph",
        text: "Ask why sending money across a border costs several percent and the usual answer is intermediaries. That is right but incomplete, because it does not distinguish between costs that come from doing work and costs that come from waiting.",
      },
      {
        type: "paragraph",
        text: "There are four cost families in a cross-border payment, and they respond very differently to new technology.",
      },
      { type: "heading", text: "One: hops" },
      {
        type: "paragraph",
        text: "A traditional transfer moves through a chain of correspondent banks. Each link adds a fee, a cut-off time and a point where the transfer can be held for review. Crucially, the total is driven by the number of links, not by the amount sent. This is why small transfers are punished hardest.",
      },
      {
        type: "paragraph",
        text: "A blockchain leg collapses the chain to one transfer between two accounts. That is the cost family stablecoin rails genuinely destroy, and the argument is made concretely in [why stablecoins beat correspondent banking](/blog/stablecoins-for-remittances).",
      },
      { type: "heading", text: "Two: trapped capital" },
      {
        type: "paragraph",
        text: "To pay out instantly in a destination country, someone must already hold money there. In correspondent banking that is a nostro account, funded in advance and earning little. It is not a fee, it is a balance sheet, and it is usually the largest hidden cost in the system.",
      },
      {
        type: "paragraph",
        text: "Hybrid settlement does not eliminate this cost. It changes its shape: instead of pre-funding many bilateral accounts, you hold a smaller pool of stablecoin that can be redeployed to any corridor in seconds. That is the entire argument of [prefunding strategy](/blog/prefunding-strategy), and the carrying cost is quantified in [float and the cost of capital](/blog/float-and-cost-of-capital).",
      },
      { type: "heading", text: "Three: FX spread" },
      {
        type: "paragraph",
        text: "Somewhere the currency changes, and whoever performs the conversion charges for it. This cost is real but far smaller than retail pricing implies. Most of what a consumer pays as a bad exchange rate is not conversion cost, it is the margin needed to cover the other three families, hidden in the rate because it is easier to hide there than on a fee line.",
      },
      {
        type: "paragraph",
        text: "The mechanics are separated out in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate), and the residual risk in [FX exposure and hedging](/blog/fx-exposure-and-hedging).",
      },
      { type: "heading", text: "Four: operational overhead" },
      {
        type: "paragraph",
        text: "Exceptions are expensive. A payment that completes automatically costs cents. A payment that requires a human to read logs, email a partner and wait for a reply costs orders of magnitude more, and it does not scale.",
      },
      {
        type: "paragraph",
        text: "This is where the engineering in [hybrid settlement infrastructure](/blog/hybrid-settlement-infrastructure) becomes an economic argument rather than an aesthetic one. Every mechanism in it exists to reduce the exception rate, because the exception rate is what sets the operational cost per operation.",
      },
      {
        type: "formula",
        expression:
          "cost_per_operation  =  network_cost  +  conversion_cost  +  carrying_cost(float)  +  p_exception × cost_per_exception",
        caption:
          "Only the first two terms are visible in a fee schedule. The last two decide whether a corridor is profitable, and both are consequences of design rather than pricing.",
      },
      { type: "heading", text: "What actually improves" },
      {
        type: "list",
        items: [
          "Hops: largely removed. This is the headline saving and the easiest to demonstrate.",
          "Trapped capital: reshaped, not removed. Same asset serves many corridors, so less total capital is needed.",
          "FX spread: modestly improved through deeper stablecoin liquidity and fewer conversions.",
          "Operational overhead: improved a great deal, but only if the engine is genuinely deterministic.",
        ],
      },
      {
        type: "paragraph",
        text: "Put the four together and you can compute the number that matters, which is the [unit economics of a settlement](/blog/unit-economics-of-a-settlement), and from there decide what to charge in [pricing a corridor](/blog/pricing-a-corridor).",
      },
    ],
  },
  {
    slug: "unit-economics-of-a-settlement",
    title: "The unit economics of a single settlement",
    seoTitle: "Unit Economics of a Cross-Border Settlement",
    excerpt:
      "One operation, every cost line, honestly. Including the two that most models leave out because they are not invoices.",
    metaDescription:
      "A line-by-line unit economics model for a cross-border settlement: network fees, conversion cost, carrying cost of float and contribution margin.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-08-19",
    readingMinutes: 8,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["unit economics", "margin", "cost model"],
    keywords: [
      "payment unit economics",
      "contribution margin payments",
      "cost per transaction fintech",
      "settlement margin model",
    ],
    related: [
      "economics-of-cross-border-settlement",
      "float-and-cost-of-capital",
      "spread-slippage-and-effective-rate",
      "pricing-a-corridor",
    ],
    content: [
      {
        type: "paragraph",
        text: "Take one settlement of a given size in a given corridor and account for every cost it causes. Do this honestly and the result is usually uncomfortable, because two of the biggest lines never arrive as an invoice.",
      },
      { type: "heading", text: "The visible lines" },
      {
        type: "list",
        items: [
          "Entry cost: what the local rail charges to capture the funds.",
          "Conversion cost: the spread and slippage paid to move between currencies and the settlement asset.",
          "Network cost: the on-chain fee, small and bounded, as covered in [Solana fee economics](/blog/solana-fee-economics).",
          "Payout cost: what the destination partner charges to deliver.",
        ],
      },
      {
        type: "paragraph",
        text: "These four are easy because someone sends you a bill. Any competent model has them. They are also rarely where a corridor is won or lost.",
      },
      { type: "heading", text: "The invisible lines" },
      {
        type: "paragraph",
        text: "The first is the carrying cost of the capital that made the settlement instant. If a corridor needs a pool of prefunded liquidity sized to its daily flow, every operation consumes a slice of that pool for the duration of the cycle, and that capital has a cost whether or not anyone charges you for it. The derivation is in [float and the cost of capital](/blog/float-and-cost-of-capital).",
      },
      {
        type: "paragraph",
        text: "The second is the expected cost of exceptions. Most operations complete untouched. A small fraction require investigation, correspondence or a refund, and each of those costs far more than a clean operation earns. Multiply the rate by the cost and allocate it to every operation, because that is what it is: a cost of doing this business at this quality level.",
      },
      {
        type: "formula",
        expression:
          "contribution  =  revenue  −  (entry + conversion + network + payout)  −  carrying_cost  −  p_exception × cost_per_exception",
        caption:
          "Contribution per operation. A corridor with a 2% exception rate and a high exception cost can be unprofitable while every visible line looks excellent.",
      },
      { type: "heading", text: "Fixed costs set the minimum ticket" },
      {
        type: "paragraph",
        text: "Entry, network and payout costs are largely fixed per operation. Conversion and carrying costs scale with amount. That mix produces a break-even ticket size below which no spread is sufficient, and it is the single most useful number to compute before launching a corridor.",
      },
      {
        type: "formula",
        expression: "break_even_amount  =  fixed_costs  /  (spread_rate  −  variable_rate)",
        caption:
          "If fixed costs are 0.30 and the net variable margin is 40 basis points, the corridor loses money on every ticket under 75. Raising the spread lowers the threshold and lowers conversion, which is the real trade-off.",
      },
      { type: "heading", text: "What to do with the model" },
      {
        type: "paragraph",
        text: "Rank the levers by sensitivity rather than by how easy they are to talk about. In practice the ranking is almost always: reduce the exception rate, reduce the cycle time so the same capital serves more operations, improve conversion pricing, and only then negotiate fees.",
      },
      {
        type: "paragraph",
        text: "Reducing cycle time is worth emphasising because it is counter-intuitive: making settlement faster is a capital efficiency measure before it is a customer experience measure. That relationship is the subject of [prefunding strategy](/blog/prefunding-strategy).",
      },
      {
        type: "quote",
        text: "If your cost model only contains things you were invoiced for, it is not a cost model. It is an expense report.",
        author: "Kawi Research",
      },
    ],
  },
  {
    slug: "spread-slippage-and-effective-rate",
    title: "Spread, slippage and the only rate that matters",
    seoTitle: "Spread vs Slippage: The Effective Rate",
    excerpt:
      "Mid-market rate, quoted rate and effective rate are three different numbers. Customers only experience the third one, and only the third one is honest.",
    metaDescription:
      "How to calculate the effective rate of a cross-border settlement: mid-market reference, spread, slippage, fees and the all-in cost customers experience.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-08-12",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["fx", "pricing", "slippage"],
    keywords: [
      "effective exchange rate",
      "fx spread vs slippage",
      "all-in rate remittance",
      "price impact stablecoin",
    ],
    related: [
      "pricing-a-corridor",
      "usdc-liquidity-on-solana",
      "quote-expiry-and-price-risk",
      "unit-economics-of-a-settlement",
    ],
    content: [
      {
        type: "paragraph",
        text: "Three rates appear in every cross-border transfer and they are routinely conflated, usually on purpose.",
      },
      {
        type: "list",
        items: [
          "Mid-market rate: the midpoint between bid and ask. A reference price, not something you can trade at.",
          "Quoted rate: what the provider promises. Includes their spread.",
          "Effective rate: amount delivered divided by amount paid, all fees included. The only one the customer lives with.",
        ],
      },
      {
        type: "formula",
        expression: "effective_rate  =  amount_received  /  amount_paid",
        caption:
          "Everything else is marketing. A provider advertising the mid-market rate with a separate fee and a provider hiding the fee in the rate can produce identical effective rates.",
      },
      { type: "heading", text: "Spread is a decision, slippage is a consequence" },
      {
        type: "paragraph",
        text: "Spread is what the provider chooses to charge. Slippage is what the market charges for the size you traded: the difference between the price at the top of the book and the average price actually achieved as your order consumes depth.",
      },
      {
        type: "paragraph",
        text: "Spread is roughly constant in percentage terms. Slippage grows with size and shrinks with liquidity, which is why depth is the property we care about most in [USDC liquidity on Solana](/blog/usdc-liquidity-on-solana).",
      },
      {
        type: "formula",
        expression: "slippage  ≈  (avg_execution_price  −  reference_price)  /  reference_price",
        caption:
          "Measured after the fact on real fills. A model that assumes top-of-book execution will understate cost precisely on the large tickets where the error is most expensive.",
      },
      { type: "heading", text: "Two conversions, not one" },
      {
        type: "paragraph",
        text: "A hybrid settlement usually crosses twice: local currency into the settlement asset, and the settlement asset into the destination currency. Both legs have spread and slippage, and they compound rather than add.",
      },
      {
        type: "formula",
        expression: "effective_rate  =  rate₁ · (1 − s₁) · rate₂ · (1 − s₂)  −  fixed_fees / amount",
        caption:
          "The fixed-fee term is what makes small tickets expensive in percentage terms even when both conversion legs are excellent.",
      },
      { type: "heading", text: "Publish the effective rate" },
      {
        type: "paragraph",
        text: "The comparison a customer should be able to make in one glance is: I paid this, they received that. Kawi quotes the delivered amount, which forces every cost into one number and removes the ability to look cheap by moving cost between the rate and the fee line.",
      },
      {
        type: "paragraph",
        text: "It also makes the [quote window](/blog/quote-expiry-and-price-risk) meaningful: a locked delivered amount is a promise you can verify, while a locked rate with variable fees is not.",
      },
    ],
  },
  {
    slug: "float-and-cost-of-capital",
    title: "Float: the cost nobody invoices you for",
    seoTitle: "Float and Cost of Capital in Payment Settlement",
    excerpt:
      "Capital sitting in a corridor so that settlement can be instant is not free, and the fact that no one bills you for it is precisely why it gets ignored.",
    metaDescription:
      "How to quantify the carrying cost of float in a payments business, why settlement cycle time drives capital efficiency, and how to allocate it per operation.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-08-05",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["float", "capital", "treasury"],
    keywords: [
      "float cost payments",
      "cost of capital fintech",
      "working capital remittance",
      "capital turnover payments",
    ],
    related: [
      "prefunding-strategy",
      "unit-economics-of-a-settlement",
      "corridor-rebalancing",
      "economics-of-cross-border-settlement",
    ],
    content: [
      {
        type: "paragraph",
        text: "Instant settlement is a capital product wearing a technology costume. If a recipient is paid before the sender's funds have finished clearing, someone advanced the money. That someone holds a balance, and holding balances costs money.",
      },
      { type: "heading", text: "The quantity" },
      {
        type: "paragraph",
        text: "The float a corridor requires is a function of throughput and cycle time, and it follows directly from queueing arithmetic: the average amount in flight equals the rate of flow multiplied by the time each unit spends in flight.",
      },
      {
        type: "formula",
        expression: "float_required  =  daily_volume  ×  cycle_time_in_days  ×  safety_multiplier",
        caption:
          "The safety multiplier exists because volume is not smooth. Its size is an inventory question, answered in [prefunding inventory math](/blog/prefunding-inventory-math).",
      },
      { type: "heading", text: "The price" },
      {
        type: "paragraph",
        text: "That capital has a cost equal to its next best use, whether it is borrowed or your own. Applying an annual rate over the fraction of a year each operation occupies gives the per-operation carrying cost.",
      },
      {
        type: "formula",
        expression: "carrying_cost_per_operation  =  amount  ×  annual_cost_of_capital  ×  (cycle_time_days / 365)",
        caption:
          "At a 12% annual cost and a one-day cycle, holding capital against a 1,000 operation costs about 0.33. Against a 40 basis point spread earning 4.00, that is over 8% of gross margin consumed by time alone.",
      },
      { type: "heading", text: "Why cycle time is the highest-leverage number" },
      {
        type: "paragraph",
        text: "Cycle time appears in both formulas. Halving it halves the capital needed and halves the carrying cost per operation, which improves the balance sheet and the margin simultaneously. No fee negotiation available to a payments business comes close to that leverage.",
      },
      {
        type: "paragraph",
        text: "This reframes the engineering work in [hybrid settlement infrastructure](/blog/hybrid-settlement-infrastructure). Fast confirmation is not a marketing number; it directly reduces how much capital the business has to immobilise to serve the same volume.",
      },
      {
        type: "formula",
        expression: "capital_turns_per_year  =  365  /  cycle_time_in_days",
        caption:
          "A one-day cycle turns capital 365 times a year. A three-day cycle turns it 122 times. The same balance sheet supports three times the volume.",
      },
      { type: "heading", text: "Put it in the ledger" },
      {
        type: "paragraph",
        text: "Float should appear as named accounts in the books, not as a footnote, so that margin reporting is true. That is one of the reasons the ledger design in [reconciliation by design](/blog/reconciliation-by-design) models corridor balances explicitly.",
      },
      {
        type: "quote",
        text: "Every hour you shave off settlement is capital returned to the business. Speed is a treasury strategy.",
        author: "Kawi Research",
      },
    ],
  },
  {
    slug: "prefunding-strategy",
    title: "Prefunding strategy: how Kawi keeps settlement instant without freezing capital",
    seoTitle: "Prefunding Strategy for Instant Cross-Border Settlement",
    excerpt:
      "Instant delivery requires money already sitting where it is needed. The strategy is deciding how much, in which asset, in which corridor, and how fast it can move.",
    metaDescription:
      "Kawi prefunding strategy for instant settlement: pooled stablecoin liquidity, corridor buffers, replenishment triggers and stress reserves.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-08-27",
    updated: "2026-08-27",
    readingMinutes: 9,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["prefunding", "treasury", "liquidity", "capital"],
    keywords: [
      "prefunding strategy payments",
      "liquidity management remittance",
      "nostro replacement stablecoin",
      "instant settlement capital",
    ],
    related: [
      "prefunding-inventory-math",
      "float-and-cost-of-capital",
      "corridor-rebalancing",
      "economics-of-cross-border-settlement",
    ],
    content: [
      {
        type: "paragraph",
        text: "A settlement that completes in a minute cannot wait for the entry leg to finish clearing before the exit leg begins. Something has to cover the gap. That something is prefunded capital, and how you manage it is the difference between a business with healthy margins and one that is quietly a lender.",
      },
      { type: "heading", text: "The old model: bilateral accounts" },
      {
        type: "paragraph",
        text: "Correspondent banking solves this with nostro accounts: money parked in advance in each destination. Every corridor needs its own pool, capital is stranded where it was placed, and moving it takes days. Total capital grows roughly with the number of corridors served.",
      },
      { type: "heading", text: "The pooled model" },
      {
        type: "paragraph",
        text: "Holding the buffer as stablecoin changes the shape of the problem. One pool serves many corridors, because the asset can be redeployed in seconds rather than days. Capital stops being stranded by geography and becomes stranded only by time.",
      },
      {
        type: "list",
        items: [
          "A central pool sized to aggregate exposure, not to the sum of per-corridor worst cases.",
          "A local buffer in each corridor sized to the payout partner's requirements and the corridor's variance.",
          "A rapid replenishment path so a local buffer can be topped up within minutes.",
          "A stress reserve that is never allocated to normal operations.",
        ],
      },
      {
        type: "paragraph",
        text: "The saving comes from pooling. Independent corridors do not all peak at the same moment, so aggregate variance grows more slowly than the sum of individual variances. That is the same square-root effect that makes shared inventory cheaper than dedicated inventory, and it is derived in [prefunding inventory math](/blog/prefunding-inventory-math).",
      },
      {
        type: "formula",
        expression: "σ_pooled  =  √( σ₁² + σ₂² + … + σₙ² )   ≪   σ₁ + σ₂ + … + σₙ",
        caption:
          "For n corridors of similar size and low correlation, pooled buffer requirements scale with √n rather than n. Ten corridors need roughly a third of the buffer that ten isolated pools would.",
      },
      { type: "heading", text: "Sizing is a service level, not a guess" },
      {
        type: "paragraph",
        text: "The question is not how much capital feels safe. It is what probability of running dry is acceptable, per corridor, per period. A mature corridor with predictable flow can run a tight buffer. A new corridor with lumpy volume needs a wide one until its distribution is known.",
      },
      {
        type: "paragraph",
        text: "That target is expensive to set too high and dangerous to set too low, and the cost of each unit held is exactly the carrying cost in [float and the cost of capital](/blog/float-and-cost-of-capital). The optimum comes from balancing those two, which is the calculation in the inventory article.",
      },
      { type: "heading", text: "Replenishment is a trigger, not a schedule" },
      {
        type: "paragraph",
        text: "Buffers are replenished on thresholds rather than on a calendar. Crossing a reorder point starts a transfer sized to bring the corridor back to target, accounting for what is already in flight. Scheduled top-ups are always either late or wasteful, because flow is not a schedule.",
      },
      { type: "heading", text: "The three failure modes" },
      {
        type: "list",
        items: [
          "Underfunding: settlements queue, the speed promise breaks, and support cost spikes.",
          "Overfunding: margin quietly bleeds through carrying cost that no report highlights.",
          "Misallocation: total capital is sufficient but it is in the wrong corridor, which is the most common and is solved by [rebalancing](/blog/corridor-rebalancing).",
        ],
      },
      {
        type: "paragraph",
        text: "Prefunding is also the reason the [agentic layer](/blog/kawi-agentic-layer) is a natural next step rather than a novelty: threshold monitoring, sizing and rebalancing are exactly the kind of continuous, rule-bounded decisions that software should make, as described in [autonomous treasury rebalancing](/blog/autonomous-treasury-rebalancing).",
      },
      {
        type: "quote",
        text: "Prefunding is not money you spent. It is money you decided to keep somewhere specific, and that decision has a price.",
        author: "Kawi Research",
      },
    ],
  },
  {
    slug: "prefunding-inventory-math",
    title: "The inventory math behind a prefunding buffer",
    seoTitle: "Prefunding Inventory Math for Liquidity",
    excerpt:
      "A liquidity buffer is inventory. That means a century of inventory theory applies, and the formulas are simpler than the intuition they replace.",
    metaDescription:
      "Applying inventory theory to payment liquidity: safety stock from demand variance, service levels, reorder points and the newsvendor trade-off.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-07-29",
    readingMinutes: 9,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["inventory", "math", "prefunding", "optimisation"],
    keywords: [
      "safety stock formula liquidity",
      "reorder point payments",
      "newsvendor model treasury",
      "liquidity buffer sizing",
    ],
    related: [
      "prefunding-strategy",
      "float-and-cost-of-capital",
      "corridor-rebalancing",
      "unit-economics-of-a-settlement",
    ],
    content: [
      {
        type: "paragraph",
        text: "A prefunded corridor balance behaves exactly like stock in a warehouse. Demand is uncertain, replenishment takes time, running out has a cost, and holding too much has a different cost. Treat it as inventory and the guesswork disappears.",
      },
      { type: "heading", text: "Demand during lead time" },
      {
        type: "paragraph",
        text: "The risk window is not the day. It is the lead time: the interval between deciding to replenish and the funds being usable. What matters is the distribution of outflow during that window.",
      },
      {
        type: "formula",
        expression: "μ_LT  =  μ_daily × L        σ_LT  =  σ_daily × √L",
        caption:
          "Mean scales linearly with lead time L; standard deviation scales with its square root. Halving lead time cuts required safety stock by about 30%, not 50%.",
      },
      { type: "heading", text: "Safety stock is a service level" },
      {
        type: "paragraph",
        text: "Safety stock is the buffer above expected demand that absorbs variance. Its size follows directly from the probability of running dry that you are willing to accept, expressed as a z-score.",
      },
      {
        type: "formula",
        expression: "safety_stock  =  z  ×  σ_daily  ×  √L",
        caption:
          "z = 1.65 for a 95% service level, 2.33 for 99%, 3.09 for 99.9%. Note that going from 99% to 99.9% costs a third more capital for a tenfold reduction in stockouts.",
      },
      {
        type: "paragraph",
        text: "This is where the discussion becomes concrete instead of philosophical. A corridor doing 500,000 a day with a daily standard deviation of 120,000 and a four-hour lead time needs roughly 2.33 × 120,000 × √0.167 ≈ 114,000 of safety stock for a 99% service level, on top of expected demand during the window.",
      },
      { type: "heading", text: "The reorder point" },
      {
        type: "formula",
        expression: "reorder_point  =  μ_daily × L  +  z × σ_daily × √L",
        caption:
          "Replenishment is triggered when the balance, plus anything already in flight, falls below this level. Not on a schedule.",
      },
      { type: "heading", text: "How much to send: the newsvendor trade-off" },
      {
        type: "paragraph",
        text: "Choosing the target level is a classic newsvendor problem. Holding an extra unit costs its carrying cost. Being short a unit costs the margin on the operation you could not serve, plus the reputational cost of a broken speed promise. The optimal service level is the ratio between them.",
      },
      {
        type: "formula",
        expression: "optimal_service_level  =  c_shortage  /  ( c_shortage  +  c_holding )",
        caption:
          "If a shortage costs 40 times what holding costs, the optimal service level is 40/41 ≈ 97.6%. The z-score follows from that number rather than from a round figure someone liked.",
      },
      {
        type: "paragraph",
        text: "This is the honest version of the sizing decision in [prefunding strategy](/blog/prefunding-strategy). It also shows why aiming for 100% availability is wrong: the cost of the last fraction of a percent is unbounded while the benefit is not.",
      },
      { type: "heading", text: "Correlation is the free lunch and the trap" },
      {
        type: "paragraph",
        text: "Pooling reduces total buffer because corridors do not peak together. That benefit depends entirely on correlation staying low, and correlation rises exactly in stressed conditions, when a regional event moves several corridors at once.",
      },
      {
        type: "paragraph",
        text: "The practical answer is to size normal operations on pooled variance while holding a separate stress reserve sized on the assumption that correlation goes to one. Two budgets, two assumptions, no single number pretending to cover both.",
      },
      {
        type: "list",
        items: [
          "Recompute σ_daily on a rolling window; volatility itself drifts.",
          "Measure lead time as observed, including the slow tail, not as the contractual promise.",
          "Track stockouts explicitly, and compare the realised rate to the service level you chose.",
          "Revisit the shortage cost after every incident; it is usually higher than the last estimate.",
        ],
      },
    ],
  },
  {
    slug: "corridor-rebalancing",
    title: "Rebalancing corridors before they run dry",
    seoTitle: "Corridor Rebalancing for Payment Liquidity",
    excerpt:
      "Corridors are directional. Money accumulates on one side and drains on the other, and gravity does not reverse itself.",
    metaDescription:
      "How to rebalance liquidity between payment corridors: net flow imbalance, rebalancing versus carrying cost, trigger bands and stablecoin as the medium.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-07-22",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["treasury", "rebalancing", "liquidity"],
    keywords: [
      "corridor rebalancing",
      "liquidity rebalancing payments",
      "net flow imbalance remittance",
      "treasury automation",
    ],
    related: [
      "prefunding-strategy",
      "prefunding-inventory-math",
      "autonomous-treasury-rebalancing",
      "float-and-cost-of-capital",
    ],
    content: [
      {
        type: "paragraph",
        text: "Payment corridors are almost never balanced. Far more value flows from Brazil outward than the reverse, so the outbound buffer drains and the inbound side accumulates. Left alone, one side stops working while the other holds idle capital.",
      },
      { type: "heading", text: "Net flow is what you actually manage" },
      {
        type: "formula",
        expression: "net_flow  =  inflow  −  outflow",
        caption:
          "Only the net has to be rebalanced. A corridor with heavy two-way traffic can run a small buffer; a one-directional corridor needs rebalancing at close to full volume.",
      },
      {
        type: "paragraph",
        text: "This is why corridor pairs are worth more than corridors. Two directional corridors that offset each other need dramatically less capital than the same volume flowing one way, which affects both the buffer sizing in [prefunding inventory math](/blog/prefunding-inventory-math) and the pricing in [pricing a corridor](/blog/pricing-a-corridor).",
      },
      { type: "heading", text: "The trade-off" },
      {
        type: "paragraph",
        text: "Rebalancing costs money: conversion spread, transfer fees and the operational overhead of the movement. Not rebalancing also costs money: idle capital on one side and shortage risk on the other. The optimum is a band, not a target.",
      },
      {
        type: "formula",
        expression: "rebalance_when  |balance − target|  >  band,   band ∝ √( rebalance_cost / carrying_cost )",
        caption:
          "The band widens when moving money is expensive and narrows when holding it is expensive. This is the same structure as cash management models used in corporate treasury.",
      },
      {
        type: "paragraph",
        text: "Chasing the target continuously is a classic error: it produces many small transfers whose combined cost exceeds the carrying cost they were meant to avoid.",
      },
      { type: "heading", text: "Why stablecoin makes this tractable" },
      {
        type: "paragraph",
        text: "In a bilateral banking model, rebalancing means an international transfer measured in days, so buffers must be sized for a long lead time. When the transfer medium is a stablecoin on a fast network, lead time collapses to minutes.",
      },
      {
        type: "paragraph",
        text: "Because safety stock scales with the square root of lead time, cutting lead time from days to minutes removes most of the buffer requirement. That is the quiet reason the network choice in [why Solana for settlement](/blog/why-solana-for-settlement) is a treasury decision as much as a technical one.",
      },
      { type: "heading", text: "Batch, but not customer money" },
      {
        type: "list",
        items: [
          "Batch rebalancing transfers to amortise fixed costs.",
          "Never batch a movement a customer is waiting on.",
          "Deprioritise rebalancing during [network degradation](/blog/designing-for-network-degradation).",
          "Always wait for the stronger confirmation level on treasury movements.",
        ],
      },
      {
        type: "paragraph",
        text: "Rebalancing is continuous, rule-bounded and numerical, which makes it the most obvious candidate for automation in the whole treasury. That is exactly the case we make in [autonomous treasury rebalancing](/blog/autonomous-treasury-rebalancing).",
      },
    ],
  },
  {
    slug: "fx-exposure-and-hedging",
    title: "FX exposure between quote and settlement",
    seoTitle: "FX Exposure and Hedging in Cross-Border Settlement",
    excerpt:
      "Between the moment you promise a rate and the moment you deliver, the market can move. Everything about hedging is a decision about how long that window is.",
    metaDescription:
      "Where FX exposure arises in a settlement flow, how to measure it, and the practical hedging choices: natural offsets, shorter windows and explicit hedges.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-07-15",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["fx", "risk", "hedging"],
    keywords: [
      "fx exposure payments",
      "hedging remittance flows",
      "currency risk settlement",
      "natural hedge corridors",
    ],
    related: [
      "quote-expiry-and-price-risk",
      "pricing-a-corridor",
      "corridor-rebalancing",
      "prefunding-strategy",
    ],
    content: [
      {
        type: "paragraph",
        text: "A settlement business does not want to take a view on currencies. It wants to be paid for moving money. But the structure of the product creates currency exposure whether anyone intends it or not.",
      },
      { type: "heading", text: "Three places it appears" },
      {
        type: "list",
        items: [
          "Quote exposure: between locking a rate and executing the conversion, discussed in [quote expiry and price risk](/blog/quote-expiry-and-price-risk).",
          "Inventory exposure: buffers held in local currency in a corridor are a position in that currency.",
          "Timing exposure: the gap between converting in and converting out on a multi-leg operation.",
        ],
      },
      {
        type: "paragraph",
        text: "The first is small per operation and constant. The second can be large and is easy to overlook precisely because it is not attached to any single transaction.",
      },
      { type: "heading", text: "Measure it as a position" },
      {
        type: "formula",
        expression: "net_exposure(ccy)  =  Σ open_quotes  +  local_buffers  −  hedges",
        caption:
          "Computed continuously per currency. What matters is the aggregate position, not the risk of any individual operation.",
      },
      {
        type: "formula",
        expression: "daily_VaR  ≈  z  ×  σ_daily  ×  net_exposure",
        caption:
          "A rough sizing tool, not a risk model. Its job is to tell you whether the exposure deserves an explicit hedge or is comfortably inside the spread you earn.",
      },
      { type: "heading", text: "Prefer natural offsets" },
      {
        type: "paragraph",
        text: "The cheapest hedge is flow in the other direction. If a corridor has meaningful two-way volume, the positions offset without any instrument, cost or counterparty. This is the same property that makes balanced corridor pairs so valuable in [corridor rebalancing](/blog/corridor-rebalancing).",
      },
      { type: "heading", text: "Then shorten the window" },
      {
        type: "paragraph",
        text: "The second cheapest hedge is time. Exposure grows with the square root of holding period, so halving the interval between conversion legs removes about 30% of the risk at no cost. Every improvement in settlement speed is also a reduction in currency risk.",
      },
      { type: "heading", text: "Hedge explicitly only when both fail" },
      {
        type: "paragraph",
        text: "When residual exposure in a currency exceeds a defined limit, hedge it with an instrument. Explicit hedges cost spread and add counterparty relationships, so they are the last option rather than the first. Set the limit in advance, hedge mechanically when it is crossed, and never let the decision become a market opinion.",
      },
      {
        type: "quote",
        text: "A payments company that starts forecasting currencies has stopped being a payments company.",
        author: "Kawi Research",
      },
    ],
  },
  {
    slug: "pricing-a-corridor",
    title: "How to price a corridor",
    seoTitle: "Pricing a Payment Corridor",
    excerpt:
      "Pricing is not a percentage someone picked. It is a floor derived from cost, a ceiling set by alternatives, and a decision about where in between you want to sit.",
    metaDescription:
      "A framework for pricing cross-border payment corridors: cost floor, competitive ceiling, risk premium, elasticity by ticket size and transparent pricing.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-07-08",
    readingMinutes: 8,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["pricing", "strategy", "economics"],
    keywords: [
      "payment corridor pricing",
      "remittance pricing strategy",
      "fx spread pricing",
      "transparent payment pricing",
    ],
    related: [
      "unit-economics-of-a-settlement",
      "spread-slippage-and-effective-rate",
      "quote-expiry-and-price-risk",
      "economics-of-cross-border-settlement",
    ],
    content: [
      {
        type: "paragraph",
        text: "Pricing a corridor is three questions in order: what does it cost, what do alternatives charge, and what risk are we taking that must be paid for. Skipping the first is how corridors get launched at prices that cannot survive their own volume.",
      },
      { type: "heading", text: "The floor" },
      {
        type: "paragraph",
        text: "The floor comes straight from the [unit economics of a settlement](/blog/unit-economics-of-a-settlement): fixed costs per operation plus variable costs plus carrying cost plus expected exception cost. Below it, more volume makes things worse.",
      },
      {
        type: "formula",
        expression: "price_floor(amount)  =  ( fixed_costs / amount )  +  variable_rate  +  carrying_rate  +  expected_exception_rate",
        caption:
          "The floor is a curve, not a number. It falls steeply with ticket size, which is why a single flat percentage is wrong at both ends of the distribution.",
      },
      { type: "heading", text: "The ceiling" },
      {
        type: "paragraph",
        text: "The ceiling is the all-in effective rate of the realistic alternative, computed the honest way described in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate). Comparing your quoted rate to someone else's advertised rate is a way to lose money while believing you are competitive.",
      },
      {
        type: "paragraph",
        text: "In many Latin American corridors, the real alternative is not a bank. It is an informal channel with a good rate, no traceability and no recourse. Competing there means being close enough on price that the trade-off tilts toward the traceable option.",
      },
      { type: "heading", text: "The risk premium" },
      {
        type: "list",
        items: [
          "Corridor volatility, which sets the cost of the [quote window](/blog/quote-expiry-and-price-risk).",
          "Flow imbalance, which drives [rebalancing](/blog/corridor-rebalancing) cost.",
          "Payout partner reliability, which shows up as exception rate.",
          "Regulatory and operational maturity, which is high for a new corridor and falls with experience.",
        ],
      },
      {
        type: "paragraph",
        text: "A new corridor should be priced with an explicit premium that is retired as data accumulates. Pricing a new corridor like a mature one is optimism, and the market charges for optimism.",
      },
      { type: "heading", text: "Structure beats level" },
      {
        type: "paragraph",
        text: "Because the floor is a curve, the structure should be too: a fixed component covering per-operation costs and a variable component covering amount-scaled costs. That is honest, it makes small tickets viable and it stops large tickets from subsidising the model invisibly.",
      },
      {
        type: "paragraph",
        text: "And price the delivered amount. When the customer sees exactly what arrives, comparison is possible and the incentive to hide margin in the rate disappears. That transparency is the argument in [benefits of hybrid settlement for platforms](/blog/benefits-of-hybrid-settlement-for-platforms) as much as it is a pricing choice.",
      },
      {
        type: "quote",
        text: "If your pricing only works while customers cannot compare it, it is not pricing. It is a countdown.",
        author: "Kawi Research",
      },
    ],
  },
];
