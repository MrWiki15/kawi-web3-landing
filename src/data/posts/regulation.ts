import type { BlogPost } from "./types";

export const regulationPosts: BlogPost[] = [
  {
    slug: "brazil-vasp-framework",
    title: "Brazil's VASP framework, explained for builders",
    seoTitle: "Brazil VASP Framework and Crypto Regulation",
    excerpt:
      "Brazil put virtual-asset service providers under the central bank. Here is what Lei 14.478 actually requires, and why a regulated base changes what you can build.",
    metaDescription:
      "A builder's guide to Brazil's virtual-asset law (Lei 14.478) and central-bank oversight of VASPs: who is regulated, what it requires, and why it matters.",
    category: "Regulation",
    cluster: "Regulation",
    pillar: true,
    date: "2026-08-30",
    updated: "2026-08-30",
    readingMinutes: 8,
    author: "Kawi Compliance",
    authorRole: "Regulation team",
    tags: ["regulation", "brazil", "compliance", "vasp"],
    keywords: [
      "Brazil crypto regulation",
      "VASP Brazil",
      "Lei 14.478",
      "Banco Central virtual assets",
      "PSAV Brazil",
    ],
    related: [
      "travel-rule-in-practice",
      "genius-act-stablecoins",
      "traceability-and-security",
      "hybrid-settlement-infrastructure",
    ],
    content: [
      {
        type: "paragraph",
        text: "Brazil did something most of the region has not: it passed a clear legal framework for virtual assets and handed supervision to the central bank. For a company that settles value on public blockchains, that is not red tape, it is the foundation that makes the rest of the business defensible.",
      },
      {
        type: "paragraph",
        text: "This article is a practical map of that framework, written for people who build on top of it rather than for lawyers. It is not legal advice, and the details evolve, but the shape is stable enough to design around.",
      },
      { type: "heading", text: "What the law actually did" },
      {
        type: "paragraph",
        text: "Lei 14.478, Brazil's legal framework for virtual assets, defines what a virtual asset is, defines who counts as a virtual-asset service provider, and establishes that operating as one requires authorisation. It designates the Banco Central do Brasil as the regulator for these providers, which places crypto-native businesses under the same authority that supervises the rest of the payment system.",
      },
      {
        type: "paragraph",
        text: "That single design choice matters more than any specific rule. When the entity that supervises PIX and the banks is also the entity that supervises virtual-asset providers, the fiat and blockchain sides of a hybrid engine answer to one coherent standard instead of two contradictory ones.",
      },
      { type: "heading", text: "Who is a VASP, and who is not" },
      {
        type: "paragraph",
        text: "The definition centres on intermediation: providing exchange between virtual assets and fiat, exchange between virtual assets, transfer, custody or administration of virtual assets on behalf of third parties. If you hold or move other people's crypto, you are in scope. If you only publish open-source code that others run themselves, you generally are not.",
      },
      {
        type: "paragraph",
        text: "This distinction shapes architecture. It is why the boundary between a regulated operator and an open protocol has to be drawn deliberately, and why custody design is a compliance decision before it is an engineering one.",
      },
      { type: "heading", text: "The obligations that follow" },
      {
        type: "list",
        items: [
          "Authorisation to operate, with fit-and-proper requirements for the people in charge.",
          "Anti-money-laundering and know-your-customer programmes aligned with the financial system, including sanctions screening.",
          "Segregation of client assets from the provider's own balance sheet.",
          "Record-keeping and reporting that let a supervisor reconstruct what happened, which is exactly the property described in [settlement traceability and security](/blog/traceability-and-security).",
          "Cross-border transfer information sharing, the local expression of [the Travel Rule](/blog/travel-rule-in-practice).",
        ],
      },
      { type: "heading", text: "Why a regulated base is a moat" },
      {
        type: "paragraph",
        text: "Anyone can spin up a swap interface. Very few can operate one that a bank, an auditor and a regulator will all accept. Operating inside Brazil's framework means Kawi's settlement rails can connect to the formal financial system rather than around it, and that connection is the thing competitors without a licence cannot copy quickly.",
      },
      {
        type: "paragraph",
        text: "It also travels. A provider that already meets a central-bank standard has most of the controls a new corridor will ask for, which is why the same discipline that satisfies Brazil is what we carry into every market we open next.",
      },
      {
        type: "quote",
        text: "Regulation is not the tax you pay to operate. It is the asset that lets you connect to everything else that is regulated.",
        author: "Kawi Compliance",
      },
    ],
  },
  {
    slug: "travel-rule-in-practice",
    title: "The Travel Rule in practice, without the hand-waving",
    seoTitle: "Crypto Travel Rule in Practice for Payments",
    excerpt:
      "Everyone quotes FATF Recommendation 16. Far fewer explain what actually has to travel with a transfer, when, and what breaks when the counterparty cannot receive it.",
    metaDescription:
      "How the crypto Travel Rule works in practice: what originator and beneficiary data must travel, thresholds, counterparty discovery and failure modes.",
    category: "Regulation",
    cluster: "Regulation",
    date: "2026-08-24",
    updated: "2026-08-24",
    readingMinutes: 7,
    author: "Kawi Compliance",
    authorRole: "Regulation team",
    tags: ["regulation", "travel-rule", "compliance", "aml"],
    keywords: [
      "crypto travel rule",
      "FATF recommendation 16",
      "VASP data sharing",
      "travel rule threshold",
      "originator beneficiary information",
    ],
    related: [
      "brazil-vasp-framework",
      "genius-act-stablecoins",
      "settlement-engine-state-machine",
      "traceability-and-security",
    ],
    content: [
      {
        type: "paragraph",
        text: "The Travel Rule is the crypto version of a rule banks have followed for decades: when value moves between institutions, identifying information about the sender and receiver has to move with it. In crypto it comes from FATF Recommendation 16, and it is where a lot of otherwise-clean integrations quietly fall apart.",
      },
      { type: "heading", text: "What has to travel" },
      {
        type: "paragraph",
        text: "For a transfer above the applicable threshold, the originating provider must collect and transmit originator and beneficiary information to the receiving provider: names, an account or wallet reference, and depending on jurisdiction an identifier such as a document number or physical address. The data travels alongside the transfer, not on the blockchain itself.",
      },
      {
        type: "paragraph",
        text: "The threshold is commonly set around a USD or EUR 1000 equivalent, below which reduced information may apply. The important design point is that the on-chain transaction and the compliance message are two separate channels that must be reconciled to the same operation.",
      },
      { type: "heading", text: "The hard part: counterparty discovery" },
      {
        type: "paragraph",
        text: "A blockchain address does not announce which provider controls it, if any. Before you can send Travel Rule data you have to work out who the beneficiary institution is, confirm they can receive the message, and choose a protocol both sides speak. This counterparty-discovery problem, not the data format, is what makes the rule operationally expensive.",
      },
      { type: "heading", text: "Failure modes to design for" },
      {
        type: "list",
        items: [
          "Unhosted wallets: the beneficiary is an individual, not a provider, so there is no counterparty to send data to. Policy has to define what is allowed and what is escalated.",
          "Non-responsive counterparties: the receiving provider exists but does not answer. The transfer state machine must hold, not silently proceed.",
          "Data-quality mismatches: names that do not match sanctions-screening formats create false positives that need human review.",
        ],
      },
      {
        type: "paragraph",
        text: "Each of these is a state, not an error, which is why Travel Rule handling belongs inside the operation's lifecycle described in [the settlement state machine](/blog/settlement-engine-state-machine) rather than bolted on as a side effect.",
      },
      { type: "heading", text: "How Kawi treats it" },
      {
        type: "paragraph",
        text: "We treat the compliance message as a first-class leg of the settlement, with its own confirmation and its own reconciliation, exactly like the fiat and on-chain legs. The obligation itself is the local expression of the framework covered in [Brazil's VASP rules](/blog/brazil-vasp-framework), and the auditable record it produces is the same one described in [traceability and security](/blog/traceability-and-security).",
      },
    ],
  },
  {
    slug: "genius-act-stablecoins",
    title: "What the GENIUS Act changes for stablecoins",
    seoTitle: "GENIUS Act and the Rules for Stablecoins",
    excerpt:
      "The United States finally gave payment stablecoins a federal framework. The reserve rules are the headline; the ban on paying yield to holders is the part that reshapes business models.",
    metaDescription:
      "What the US GENIUS Act means for payment stablecoins: full reserve backing, redemption rights, the ban on yield to holders, and what it changes for settlement.",
    category: "Regulation",
    cluster: "Regulation",
    date: "2026-08-18",
    updated: "2026-08-18",
    readingMinutes: 7,
    author: "Kawi Compliance",
    authorRole: "Regulation team",
    tags: ["regulation", "stablecoins", "usdc", "policy"],
    keywords: [
      "GENIUS Act stablecoins",
      "US stablecoin regulation",
      "payment stablecoin reserves",
      "stablecoin yield ban",
      "regulated stablecoin",
    ],
    related: [
      "passing-stablecoin-yield",
      "who-earns-stablecoin-yield",
      "usdc-liquidity-on-solana",
      "brazil-vasp-framework",
    ],
    content: [
      {
        type: "paragraph",
        text: "For years the biggest risk in stablecoin settlement was not technical, it was legal: nobody could say with confidence what a stablecoin issuer had to do. The GENIUS Act, the US federal framework for payment stablecoins, replaced that uncertainty with a set of rules, and the rules are stricter and clearer than many expected.",
      },
      { type: "heading", text: "The reserve and redemption core" },
      {
        type: "paragraph",
        text: "The centre of the framework is simple to state: a payment stablecoin must be fully backed by high-quality liquid reserves such as cash and short-dated government paper, held one-to-one against tokens in circulation, with clear redemption rights for holders. That is the property a settlement engine actually depends on, because it is what lets us treat a stablecoin as a claim on dollars rather than as a speculative asset.",
      },
      {
        type: "paragraph",
        text: "Why this matters for settlement is spelled out in [USDC liquidity on Solana](/blog/usdc-liquidity-on-solana): reserve quality and redemption are what make a token quotable at scale.",
      },
      { type: "heading", text: "The part that reshapes business models" },
      {
        type: "paragraph",
        text: "The framework prohibits issuers from paying yield or interest to holders for simply holding the token. This is easy to skim past and hard to overstate. It means a stablecoin is a payment instrument, not a savings account, and it draws a bright line between moving value and paying for balances.",
      },
      {
        type: "paragraph",
        text: "That single clause redraws the map of who can earn what, which we work through in [who earns stablecoin yield](/blog/who-earns-stablecoin-yield) and in the narrower question of [whether a settlement engine can pass yield to users](/blog/passing-stablecoin-yield).",
      },
      { type: "heading", text: "What it means for a settlement engine" },
      {
        type: "list",
        items: [
          "Counterparty risk on the token drops, because backing and redemption are defined rather than promised.",
          "Product design shifts: you compete on the quality of the movement, not on interest paid to sit still.",
          "Interoperability improves, because a regulated token in one jurisdiction is easier to accept in another, including under [Brazil's VASP framework](/blog/brazil-vasp-framework).",
        ],
      },
      {
        type: "paragraph",
        text: "None of this makes stablecoins risk-free, and a framework is not the same as immunity, as the history in [the stablecoin depeg teardown](/blog/stablecoin-depeg-teardown) makes clear. But a regulated payment stablecoin is a far better primitive to settle on than an unregulated one, and that is the point.",
      },
    ],
  },
  {
    slug: "passing-stablecoin-yield",
    title: "Can a settlement engine pass stablecoin yield to users?",
    seoTitle: "Can You Pass Stablecoin Yield to Users?",
    excerpt:
      "Stablecoin reserves earn real money. The obvious question is whether the user holding the token can get any of it. Under the new frameworks, the answer is mostly no, and the nuance is the interesting part.",
    metaDescription:
      "Whether a settlement engine can pass stablecoin reserve yield to users under GENIUS and MiCA, why holder yield is restricted, and the compliant alternatives.",
    category: "Regulation",
    cluster: "Regulation",
    date: "2026-08-12",
    updated: "2026-08-12",
    readingMinutes: 6,
    author: "Kawi Compliance",
    authorRole: "Regulation team",
    tags: ["regulation", "stablecoins", "yield", "treasury"],
    keywords: [
      "stablecoin yield regulation",
      "pass stablecoin interest",
      "stablecoin savings compliance",
      "reserve income stablecoin",
      "yield-bearing stablecoin",
    ],
    related: [
      "genius-act-stablecoins",
      "who-earns-stablecoin-yield",
      "float-and-cost-of-capital",
      "brazil-vasp-framework",
    ],
    content: [
      {
        type: "paragraph",
        text: "It is the first question every treasurer asks. Reserves behind a major stablecoin sit in short-term government paper earning a real yield. If our users are holding that token inside our product, can we route some of that yield back to them? The honest answer under current frameworks is: mostly not, at least not the obvious way.",
      },
      { type: "heading", text: "Why holder yield is restricted" },
      {
        type: "paragraph",
        text: "The new regimes deliberately separate payment from investment. Under [the GENIUS Act](/blog/genius-act-stablecoins), issuers of payment stablecoins are prohibited from paying interest to holders, and the European MiCA regime restricts interest on e-money tokens in the same spirit. The goal is to keep a payment instrument from quietly becoming an unregistered deposit or security.",
      },
      {
        type: "paragraph",
        text: "So the token itself cannot be a savings account. Any design that pays users simply for holding a balance runs straight into that wall, regardless of how it is labelled.",
      },
      { type: "heading", text: "What is still possible" },
      {
        type: "list",
        items: [
          "Route users into a separately regulated, yield-bearing product, disclosed as what it is, rather than dressing up the payment token as one.",
          "Compete on price and speed of the movement, passing efficiency back as lower fees rather than as interest.",
          "Offer non-interest benefits tied to activity, which are governed by consumer rules rather than securities rules.",
        ],
      },
      { type: "heading", text: "Where the money actually goes" },
      {
        type: "paragraph",
        text: "If the user cannot receive the reserve yield, someone else does, and tracing that is the subject of [who earns stablecoin yield](/blog/who-earns-stablecoin-yield). For a settlement engine, the practical takeaway is to stop treating held balances as a revenue source and start treating idle float as a cost to minimise, exactly as framed in [float and the cost of capital](/blog/float-and-cost-of-capital).",
      },
      {
        type: "paragraph",
        text: "The discipline this imposes is healthy. A business that has to earn its margin from moving value well, rather than from paying users to sit still, builds a better product and a cleaner relationship with its regulator, including under [Brazil's framework](/blog/brazil-vasp-framework).",
      },
    ],
  },
];
