import type { BlogPost } from "./types";

export const moreEconomicsPosts: BlogPost[] = [
  {
    slug: "anatomy-of-a-no-fee-remittance",
    title: "The anatomy of a 'no-fee' remittance",
    seoTitle: "The Hidden Cost of No-Fee Remittances",
    excerpt:
      "Zero fees is a headline, not a price. The cost was moved into the exchange rate, where it is harder to see and usually larger. Here is how to find it and what it really is.",
    metaDescription:
      "How 'no-fee' remittances hide their cost in the FX spread: mid-market versus offered rate, why it beats the visible fee, and how to compare honestly.",
    category: "Remittances",
    cluster: "Economics",
    date: "2026-09-01",
    updated: "2026-09-01",
    readingMinutes: 6,
    author: "Kawi Research",
    authorRole: "Product research",
    tags: ["remittances", "fx", "pricing", "economics"],
    keywords: [
      "no fee remittance",
      "hidden remittance cost",
      "FX spread remittance",
      "true cost of sending money",
      "exchange rate markup",
    ],
    related: [
      "spread-slippage-and-effective-rate",
      "stablecoins-for-remittances",
      "brl-to-mxn-remittance-teardown",
      "card-networks-vs-stablecoin-rails",
    ],
    content: [
      {
        type: "paragraph",
        text: "A remittance service that advertises zero fees has not made the cost disappear. It has moved it somewhere you are less likely to look: the exchange rate. And because a rate markup is quoted as a rate, not as a dollar figure, most senders never compute what it actually cost them.",
      },
      { type: "heading", text: "The rate is where the money hides" },
      {
        type: "paragraph",
        text: "There is a real, observable mid-market rate between any two currencies. The rate a sender is offered is worse than that by some margin, and that margin is revenue. On a transfer of a few hundred dollars, a spread of two or three percent quietly dwarfs the small fixed fee the service proudly waived.",
      },
      {
        type: "formula",
        expression: "hidden_cost  =  amount  ×  (mid_market_rate  −  offered_rate) / mid_market_rate",
        caption:
          "The waived fee is a line you can see. This term is the one that actually moves, and it scales with the amount sent rather than staying fixed.",
      },
      { type: "heading", text: "Why senders miss it" },
      {
        type: "paragraph",
        text: "A fee is a number in your currency; a rate is a ratio you would have to compare against a benchmark you probably do not have open. The whole appeal of hiding cost in the spread is that comparison is hard. The mechanics of separating the honest rate from the markup are in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate).",
      },
      { type: "heading", text: "The only comparison that matters" },
      {
        type: "paragraph",
        text: "Ignore the fee and the rate as separate lines. Ask a single question: for the amount I send, how much arrives, in the destination currency? That all-in delivered amount is the only honest basis for comparison, and it is the number Kawi is built to make as large as possible, for the structural reasons in [why stablecoins beat correspondent banking](/blog/stablecoins-for-remittances).",
      },
      {
        type: "paragraph",
        text: "A worked example on a real corridor is in [the BRL to MXN remittance teardown](/blog/brl-to-mxn-remittance-teardown). Transparency here is not a moral flourish; it is a product advantage, because once a sender learns to compare delivered amounts, the service hiding cost in the rate stops winning.",
      },
    ],
  },
  {
    slug: "card-networks-vs-stablecoin-rails",
    title: "What card networks tell us about stablecoin margins",
    seoTitle: "Card Networks vs Stablecoin Payment Rails",
    excerpt:
      "The card system is a masterpiece of incentive design and a very expensive way to move money. Its economics are the clearest lens for understanding where stablecoin rails actually save.",
    metaDescription:
      "How card interchange economics compare to stablecoin payment rails: where the four-party model's cost comes from, and which parts stablecoin settlement removes.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-08-25",
    updated: "2026-08-25",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["economics", "interchange", "stablecoins", "payments"],
    keywords: [
      "interchange fees explained",
      "card network economics",
      "stablecoin vs card payments",
      "payment rail cost",
      "merchant acceptance cost",
    ],
    related: [
      "economics-of-cross-border-settlement",
      "anatomy-of-a-no-fee-remittance",
      "who-earns-stablecoin-yield",
      "benefits-of-hybrid-settlement-for-platforms",
    ],
    content: [
      {
        type: "paragraph",
        text: "The card networks are worth studying not because stablecoins will replace them tomorrow, but because their cost structure is the best-documented map of where money goes when value moves. If you understand why a card payment costs what it does, you understand exactly where a stablecoin rail can and cannot save.",
      },
      { type: "heading", text: "The four-party model" },
      {
        type: "paragraph",
        text: "A card payment involves the cardholder's bank, the merchant's bank, the network in the middle, and the merchant. The largest slice of the merchant's cost is interchange, paid to the cardholder's bank, plus network assessments and the acquirer's margin. Each party earns for a real function, and the total is the price of coordinating trust between strangers who never meet.",
      },
      { type: "heading", text: "Where the cost actually is" },
      {
        type: "list",
        items: [
          "Interchange: compensation to the issuing bank, and the reason rewards cards cost merchants more.",
          "Risk and chargebacks: the system prices in reversal rights, which are valuable to consumers and expensive to everyone else.",
          "Float and settlement delay: money that takes days to settle is money someone is financing.",
        ],
      },
      { type: "heading", text: "What stablecoin rails remove, and what they do not" },
      {
        type: "paragraph",
        text: "Stablecoin settlement collapses the interbank chain and the settlement delay: value moves directly and finally, and the float that the card system finances largely disappears, in the same way described in [the economics of cross-border settlement](/blog/economics-of-cross-border-settlement). That is a genuine structural saving, not a discount.",
      },
      {
        type: "paragraph",
        text: "What it does not remove for free is the value of reversal rights and dispute resolution. A card chargeback is a feature consumers rely on; a final transfer has no undo. A serious payment product has to rebuild that protection deliberately rather than pretend nobody wanted it, a point that also shapes [platform economics](/blog/benefits-of-hybrid-settlement-for-platforms).",
      },
      {
        type: "paragraph",
        text: "The lesson from interchange is subtle: the cost of a payment is mostly the cost of trust and reversibility, not the cost of the wire. Stablecoin rails win by pricing the wire near zero, and the remaining work is building the trust layer back at a fraction of the old price.",
      },
    ],
  },
  {
    slug: "who-earns-stablecoin-yield",
    title: "Who actually earns the yield on stablecoins",
    seoTitle: "Who Earns the Yield on Stablecoins",
    excerpt:
      "There is real money sitting behind every stablecoin, earning a real return. Following where that return goes explains the entire business model, and why holders are the one party who do not get it.",
    metaDescription:
      "Where stablecoin reserve yield actually goes: issuers, distributors and exchanges earn the return on the reserves, while holders are barred by design.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-08-19",
    updated: "2026-08-19",
    readingMinutes: 6,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["stablecoins", "yield", "economics", "treasury"],
    keywords: [
      "stablecoin yield who earns",
      "stablecoin reserve income",
      "stablecoin business model",
      "issuer reserve yield",
      "stablecoin economics",
    ],
    related: [
      "passing-stablecoin-yield",
      "genius-act-stablecoins",
      "float-and-cost-of-capital",
      "card-networks-vs-stablecoin-rails",
    ],
    content: [
      {
        type: "paragraph",
        text: "Every stablecoin in circulation is backed by reserves, and those reserves are not sitting in a vault doing nothing. They are largely in short-term government paper earning a market yield. On tens of billions of dollars, that yield is one of the most profitable businesses in the entire industry, and almost nobody using the token sees a cent of it.",
      },
      { type: "heading", text: "Follow the reserve" },
      {
        type: "paragraph",
        text: "The issuer holds the reserves and earns the return on them. That is the core of the model: mint a dollar-pegged token against a dollar of reserves, invest the reserves in safe short-term instruments, and keep the interest. The token is, from the issuer's side, a zero-cost source of funds.",
      },
      { type: "heading", text: "The distribution split" },
      {
        type: "paragraph",
        text: "Issuers rarely keep all of it. To drive adoption they share reserve income with the exchanges and platforms that distribute the token and hold large balances. This is why a major exchange promoting a particular stablecoin is not being charitable; it is a revenue-sharing arrangement on the float.",
      },
      { type: "heading", text: "Why holders are excluded" },
      {
        type: "paragraph",
        text: "The one party structurally cut out is the holder, and increasingly that exclusion is the law rather than a choice. As covered in [the GENIUS Act](/blog/genius-act-stablecoins) and worked through in [can a settlement engine pass yield to users](/blog/passing-stablecoin-yield), issuers are barred from paying interest to holders, to keep a payment token from becoming a deposit.",
      },
      {
        type: "list",
        items: [
          "Issuer: earns the reserve yield, the foundational profit.",
          "Distributors and exchanges: earn a shared slice for holding and promoting balances.",
          "Holder: earns nothing on the balance, by design.",
        ],
      },
      {
        type: "paragraph",
        text: "For a settlement engine the conclusion is bracing and useful: a held balance is somebody's revenue, and if it is not being minimised it is a cost you are quietly paying, which is the whole argument of [float and the cost of capital](/blog/float-and-cost-of-capital). We would rather move value than warehouse it.",
      },
    ],
  },
  {
    slug: "brl-to-mxn-remittance-teardown",
    title: "A BRL to MXN remittance, decomposed line by line",
    seoTitle: "BRL to MXN Remittance Cost, Decomposed",
    excerpt:
      "One corridor, one transfer, every cost exposed. Instead of arguing about remittance pricing in the abstract, we take a real route and account for every cent between sender and receiver.",
    metaDescription:
      "A line-by-line cost teardown of a Brazil-to-Mexico remittance: entry, FX spread, network fee, payout and float, and where a hybrid engine saves.",
    category: "Remittances",
    cluster: "Economics",
    date: "2026-08-11",
    updated: "2026-08-11",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["remittances", "corridor", "latam", "pricing"],
    keywords: [
      "BRL to MXN remittance",
      "Brazil Mexico remittance cost",
      "remittance cost breakdown",
      "latam corridor pricing",
      "cross-border cost teardown",
    ],
    related: [
      "stablecoin-flows-in-latam",
      "unit-economics-of-a-settlement",
      "spread-slippage-and-effective-rate",
      "corridor-demand-forecasting",
    ],
    content: [
      {
        type: "paragraph",
        text: "Abstract arguments about remittance cost never convince anyone. A single decomposed transfer does. So take a concrete route, Brazil to Mexico, send a few hundred reais worth of value, and account for every cost between the sender pressing send and the receiver holding pesos.",
      },
      { type: "heading", text: "The five places cost lives" },
      {
        type: "list",
        items: [
          "Entry: getting BRL into the system. Over PIX this is fast and nearly free, which is Brazil's structural advantage.",
          "Conversion: BRL to a settlement asset and then to MXN, where the FX spread lives, dissected in [spread, slippage and the effective rate](/blog/spread-slippage-and-effective-rate).",
          "Network: the on-chain settlement fee, a few cents when sized against the tail rather than the mean.",
          "Payout: delivering MXN locally, where the destination partner takes its cut.",
          "Float: the carrying cost of any capital prepositioned to make the payout instant.",
        ],
      },
      { type: "heading", text: "Where the legacy cost concentrates" },
      {
        type: "paragraph",
        text: "In the traditional version of this corridor, the conversion and the interbank hops dominate, and the float is enormous because someone is holding pre-funded pesos for days. The delivered amount shrinks not because of one big fee but because of a chain of small ones compounding, exactly the structure mapped in [the economics of cross-border settlement](/blog/economics-of-cross-border-settlement).",
      },
      { type: "heading", text: "Where the hybrid engine saves" },
      {
        type: "paragraph",
        text: "Kawi's version keeps entry nearly free via PIX, collapses the interbank hops into one on-chain settlement, and shrinks the float by settling in minutes instead of days. The saving is not a promotional rate; it is structural, and it flows straight into a larger delivered amount for the receiver.",
      },
      {
        type: "paragraph",
        text: "Turning this single teardown into a repeatable margin is the job of [unit economics of a settlement](/blog/unit-economics-of-a-settlement), and sizing the float it depends on is the job of [corridor demand forecasting](/blog/corridor-demand-forecasting). One honest decomposition is worth a hundred pricing claims.",
      },
    ],
  },
  {
    slug: "corridor-demand-forecasting",
    title: "Forecasting corridor demand so liquidity is never idle",
    seoTitle: "Forecasting Payment Corridor Demand",
    excerpt:
      "Prefunding is only as good as your forecast. Hold too little and payouts stall; hold too much and margin bleeds. Predicting corridor flow is where treasury stops being reactive.",
    metaDescription:
      "How to forecast payment corridor demand for prefunding: seasonality, paydays and events, simple time-series methods, and turning a forecast into a buffer size.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-08-05",
    updated: "2026-08-05",
    readingMinutes: 7,
    author: "Kawi Research",
    authorRole: "Treasury and pricing",
    tags: ["forecasting", "liquidity", "treasury", "economics"],
    keywords: [
      "payment demand forecasting",
      "corridor liquidity forecast",
      "remittance seasonality",
      "prefunding forecast",
      "time series payments",
    ],
    related: [
      "prefunding-inventory-math",
      "prefunding-strategy",
      "corridor-rebalancing",
      "brl-to-mxn-remittance-teardown",
    ],
    content: [
      {
        type: "paragraph",
        text: "Prefunding turns a forecast into capital. If you predict corridor flow well, the buffer sits close to what is actually needed and little is wasted. If you predict it badly, you either stall payouts or freeze margin in idle liquidity. Forecasting is the input that makes every other treasury decision either cheap or expensive.",
      },
      { type: "heading", text: "Corridor flow is not random" },
      {
        type: "paragraph",
        text: "Remittance and payment flow has structure you can exploit. It has weekly rhythm around paydays, monthly rhythm around rent and bills, and sharp, predictable spikes around holidays and remittance-heavy dates. A forecast that captures seasonality and known events is most of the battle; the residual noise is what safety stock is for.",
      },
      {
        type: "formula",
        expression: "forecast  =  trend  +  seasonality  +  known_events  +  noise",
        caption:
          "The first three terms are learnable and explain most of the movement. Only the last term has to be absorbed by buffer, and it is what sizes the safety stock.",
      },
      { type: "heading", text: "Methods that are worth it, and ones that are not" },
      {
        type: "paragraph",
        text: "You do not need a deep-learning model to forecast a corridor. A seasonal moving average or a simple exponential-smoothing model with a weekly and monthly component captures most of the signal and is easy to reason about when it is wrong. Sophistication that you cannot debug at 3am is a liability, not an asset.",
      },
      { type: "heading", text: "From forecast to buffer" },
      {
        type: "paragraph",
        text: "The forecast feeds directly into inventory math: the expected flow sets the working buffer, and the forecast error, its standard deviation, sets the safety stock through the service-level logic in [prefunding inventory math](/blog/prefunding-inventory-math). A better forecast shrinks the error term, which shrinks the buffer, which frees capital.",
      },
      {
        type: "paragraph",
        text: "This closes a loop with the rest of the treasury system: the forecast sizes the buffer in [prefunding strategy](/blog/prefunding-strategy), and the deviations trigger the moves in [corridor rebalancing](/blog/corridor-rebalancing). Forecasting is not a nice-to-have analytics project; it is the difference between capital that works and capital that waits.",
      },
    ],
  },
  {
    slug: "stablecoin-flows-in-latam",
    title: "Reading stablecoin flows across Latin America",
    seoTitle: "Stablecoin Flows Across Latin America",
    excerpt:
      "Latin America is one of the fastest-growing stablecoin markets on earth, and the reasons are not speculative. Following the flows explains where a settlement engine should build next.",
    metaDescription:
      "Why stablecoin adoption is surging across Latin America, what drives the flows beyond speculation, and how a settlement engine reads them to choose corridors.",
    category: "Economics",
    cluster: "Economics",
    date: "2026-07-29",
    updated: "2026-07-29",
    readingMinutes: 6,
    author: "Kawi Research",
    authorRole: "Product research",
    tags: ["stablecoins", "latam", "adoption", "data"],
    keywords: [
      "stablecoin adoption latam",
      "stablecoin flows Latin America",
      "USDT Latin America",
      "crypto remittances latam",
      "dollarization stablecoin",
    ],
    related: [
      "stablecoins-for-remittances",
      "economics-of-cross-border-settlement",
      "kawi-web3-cuba",
      "corridor-demand-forecasting",
    ],
    content: [
      {
        type: "paragraph",
        text: "Latin America shows up near the top of every stablecoin adoption ranking, and it is tempting to read that as trading froth. It is not. The flows are driven by something far more durable than speculation: the demand for a stable store of value and a cheap way to move it, in places where the local answer to both has been unreliable.",
      },
      { type: "heading", text: "What actually drives the demand" },
      {
        type: "list",
        items: [
          "Inflation and currency instability, which turn a dollar-pegged token into everyday savings rather than a trade.",
          "Remittances, one of the region's largest inflows, hunting for a cheaper rail than correspondent banking, as in [why stablecoins beat correspondent banking](/blog/stablecoins-for-remittances).",
          "Cross-border commerce between Latin American economies that the banking system serves slowly and expensively.",
          "A young, mobile-first population comfortable adopting a better tool when one appears.",
        ],
      },
      { type: "heading", text: "The flows are practical, not speculative" },
      {
        type: "paragraph",
        text: "The tell is in the transaction pattern: a large share of activity is in smaller, retail-sized transfers and in stablecoins rather than volatile assets. That is the signature of people using crypto as money, not as a bet, and it is why the region behaves differently from markets where activity is dominated by trading.",
      },
      { type: "heading", text: "How a settlement engine reads them" },
      {
        type: "paragraph",
        text: "Flow data is a map of where to build. Corridors with heavy, growing stablecoin volume and expensive incumbent rails are exactly where a hybrid engine creates the most value, for the structural reasons in [the economics of cross-border settlement](/blog/economics-of-cross-border-settlement). It is the same reading that put Brazil first and made [Cuba a key corridor](/blog/kawi-web3-cuba).",
      },
      {
        type: "paragraph",
        text: "Turning that map into staffed, funded corridors is a forecasting problem, handed to [corridor demand forecasting](/blog/corridor-demand-forecasting). The strategic point is simpler: in Latin America, stablecoins are not waiting for permission to be useful, and the engine that meets that demand efficiently wins the region.",
      },
    ],
  },
];
