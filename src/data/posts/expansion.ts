import type { BlogPost } from "./types";

export const expansionPosts: BlogPost[] = [
  {
    slug: "kawi-web3-cuba",
    title: "Kawi in Cuba: bringing Web3 and open financial tools to the island",
    seoTitle: "Kawi Brings Web3 to Cuba on Solana",
    excerpt:
      "Kawi has become the first private financial advisory and management firm operating in the Republic of Cuba since the triumph of the Revolution. Here is what we plan to do with it.",
    metaDescription:
      "Kawi, an independent firm regulated in Brazil, is bringing Web3 and open decentralized financial tools to Cuba, focused on Solana and powered by p2p.me on Base.",
    category: "Expansion",
    cluster: "Expansion",
    pillar: true,
    featured: true,
    date: "2026-09-10",
    updated: "2026-09-10",
    readingMinutes: 8,
    author: "Kawi",
    authorRole: "Company",
    tags: ["cuba", "web3", "solana", "remittances", "expansion"],
    keywords: [
      "Kawi Cuba",
      "Web3 Cuba",
      "Solana Cuba",
      "crypto remittances Cuba",
      "p2p.me Cuba",
      "decentralized finance latam",
    ],
    related: [
      "stablecoins-for-remittances",
      "why-solana-for-settlement",
      "economics-of-cross-border-settlement",
      "hybrid-settlement-infrastructure",
    ],
    content: [
      {
        type: "paragraph",
        text: "Kawi has become the first private financial advisory and management firm to operate in the Republic of Cuba since the triumph of the Revolution. It is a milestone we take seriously, less as a headline and more as a responsibility: it lets us do concrete, useful work in a market that has been underserved by modern financial technology for a very long time.",
      },
      {
        type: "paragraph",
        text: "This article explains what that milestone actually means, what it does not mean, and what we intend to build with it. In one line: we want to help bring a healthy Web3 culture to Cuba, and to make everyday financial tools cheaper, faster and more open for the people who use them.",
      },
      { type: "heading", text: "What Kawi is, and what it is not" },
      {
        type: "paragraph",
        text: "Kawi is a 100% private company. It is regulated in Brazil, and it is independent of the Cuban state. We are not a public entity, we are not a government program, and we have no affiliation with any administration. Everything we do in Cuba we do as a private, independent technology company, under our own name and our own standards.",
      },
      {
        type: "paragraph",
        text: "We say this plainly because clarity protects everyone. Users deserve to know exactly who they are dealing with, and so do partners and regulators. Kawi answers to its license in Brazil and to the people who use its products, full stop.",
      },
      {
        type: "paragraph",
        text: "Our mission is bigger than any single country: bring Web3 technology to all of Latin America in a way that is efficient, transparent and genuinely useful. Cuba is one of the key markets on that map, not the whole of it, and the same engine and principles we apply here are the ones described in [hybrid settlement infrastructure](/blog/hybrid-settlement-infrastructure).",
      },
      { type: "heading", text: "Why Cuba is a key corridor for Latam" },
      {
        type: "paragraph",
        text: "Remittances are one of the largest sources of household income in Cuba, estimated in the billions of dollars a year across formal and informal channels. For many families they are not extra money, they are the monthly budget. Yet the ways that value arrives are often slow, opaque and expensive, with a large share of each transfer lost to intermediaries and friction.",
      },
      {
        type: "paragraph",
        text: "That is precisely the problem Kawi was built to solve. Our strongest live corridor today is Brazil, where local rails such as PIX let value enter the system in seconds. Connecting a fast Brazilian entry point to an efficient delivery in Cuba is exactly the kind of route our engine is designed for, and the structural reasons it is cheaper are laid out in [the economics of cross-border settlement](/blog/economics-of-cross-border-settlement) and in [why stablecoins beat correspondent banking](/blog/stablecoins-for-remittances).",
      },
      {
        type: "paragraph",
        text: "The point is not to move money for its own sake. It is that a corridor which loses less to intermediaries and settles in minutes leaves more value in the hands of the family receiving it. On the volumes Cuba already moves, even a few percentage points of efficiency is meaningful.",
      },
      { type: "heading", text: "How we entered: p2p.me on Base" },
      {
        type: "paragraph",
        text: "Our approach to the Cuban market is not new; we have been working on it for several months. What accelerated it was the arrival of p2p.me in Cuba, an open-source, peer-to-peer protocol built on the Base network. It gave the market a credible, permissionless way for people to move between local cash and digital dollars, and it is the rail Kawi now uses as its base for access in this market.",
      },
      {
        type: "paragraph",
        text: "We want to be equally clear about what this is not. Kawi has no affiliation, ownership tie or corporate relationship with p2p.me. We are not a p2p.me project, we are not associated with p2p.me, and we do not speak for it. We have had constructive conversations with its core team about improving the infrastructure, and we expect to keep having them, but that is collaboration between two fully independent companies, nothing more. Kawi builds on p2p.me the same way anyone can build on open-source software: by using it, not by belonging to it.",
      },
      {
        type: "paragraph",
        text: "Building on an open-source protocol is a deliberate choice. It means the access layer is inspectable, that no single company owns the door, and that what we build on top can be audited and reused. For a market where trust has to be earned, open source is not a nice-to-have, it is the starting condition.",
      },
      { type: "heading", text: "Concentrating the ecosystem on Solana" },
      {
        type: "paragraph",
        text: "Kawi intends to be the representative Web3 company of the Cuban ecosystem, and the center of gravity we are building around is Solana. Our settlement engine, our stablecoin liquidity and the developer ecosystem we want to grow in Cuba are all concentrated there, for the reasons set out in [why Solana for settlement](/blog/why-solana-for-settlement): fast confirmation, fees low enough not to distort small transfers, and deep USDC liquidity.",
      },
      {
        type: "paragraph",
        text: "Using p2p.me on Base for local access and Solana for settlement is not a contradiction; it is the same hybrid philosophy that runs through everything we build. We pick the right rail for each job rather than forcing one network to do everything. Peer-to-peer access on the ground, deep and cheap settlement underneath.",
      },
      { type: "heading", text: "Open-source tools for real financial access" },
      {
        type: "paragraph",
        text: "Moving money efficiently is the first step, not the destination. What we actually want to foster is a set of open-source, decentralized financial tools that give Cubans better options than they have today, built as public goods rather than closed products.",
      },
      {
        type: "list",
        items: [
          "Decentralized crowdfunding platforms, so that a project, a small business or a community initiative can raise funds transparently, with every contribution visible and every payout accountable.",
          "Tokenization platforms, so that real assets and future cash flows can be represented, divided and exchanged in ways the traditional system does not offer locally.",
          "Open payment and savings primitives built on Solana and reachable through p2p.me, so that developers can build on top of them instead of starting from zero.",
        ],
      },
      {
        type: "paragraph",
        text: "We would rather seed an ecosystem than own a monopoly. If the tools are open, others can extend them, audit them and keep them honest, and the value stays with the people who use them.",
      },
      { type: "heading", text: "What comes next" },
      {
        type: "paragraph",
        text: "The near-term work is unglamorous and important: harden the Brazil-to-Cuba route, keep the access layer reliable, and publish the open-source pieces so builders can start. We will keep writing here about what works and what breaks, in the same measured way we cover the rest of the engine.",
      },
      {
        type: "quote",
        text: "Technology that impulses your peace of mind is only worth anything if it reaches the people who need it most. Cuba is where that promise gets tested.",
        author: "Kawi",
      },
      {
        type: "paragraph",
        text: "If you are a builder, an investor or an institution that wants to help bring open Web3 tooling to Cuba and the rest of Latin America, we would like to hear from you. The infrastructure is ready; the work now is adoption.",
      },
    ],
  },
];
