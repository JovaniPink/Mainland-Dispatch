type Candidate = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt?: string;
  publicationYear?: number;
  contentType: "primary" | "research" | "reporting" | "analysis";
  topics: string[];
  notes: string;
  accessStatus?:
    "reachable" | "paywalled" | "restricted" | "unavailable" | "unstable";
  urlStatus?: "supplied" | "redirect-resolved" | "publisher-canonical";
};

const candidate = (item: Candidate) => ({
  accessedAt: "2026-08-14",
  sourceOrigin: "web-research" as const,
  collectionId: "china-quality-links-2026-08-14",
  reviewState:
    item.urlStatus && item.urlStatus !== "supplied"
      ? ("metadata-checked" as const)
      : ("supplied" as const),
  disposition: "withheld" as const,
  accessStatus: item.accessStatus ?? ("reachable" as const),
  urlStatus: item.urlStatus ?? ("supplied" as const),
  ...(item.urlStatus && item.urlStatus !== "supplied"
    ? { canonicalCheckedAt: "2026-08-14" }
    : {}),
  language: "English",
  translationStatus: "original-english" as const,
  evidenceStatus: "unverified" as const,
  paywall: item.accessStatus === "paywalled",
  ...item,
  decisionReason:
    item.accessStatus === "paywalled" || item.accessStatus === "restricted"
      ? "The publisher endpoint did not permit lawful full-text review during intake. Withheld before source-read pending authorized access, primary records, later developments, and independent corroboration."
      : "The direct publisher endpoint was checked, but the complete article and supporting evidence have not passed source review. Withheld before source-read.",
});

/** Bounded quality-link intake discovered through the past-week China HN query. */
export const chinaQualityLinks20260814 = [
  candidate({
    id: "lead-2026-economist-china-oil-power",
    title: "China's growing power in the global oil system",
    url: "https://www.economist.com/finance-and-economics/2026/08/09/china-is-now-the-worlds-great-oil-power",
    publisher: "The Economist",
    publishedAt: "2026-08-09",
    contentType: "analysis",
    topics: ["oil", "energy-security", "refining", "trade"],
    accessStatus: "paywalled",
    notes:
      "Review the article's definition of oil power and the underlying production, import, refining, storage, shipping and trading data. Keep market influence distinct from domestic crude production and test the argument against IEA, customs and company records.",
  }),
  candidate({
    id: "lead-2026-nikkei-china-rd-spending",
    title:
      "China's research and development spending relative to the United States",
    url: "https://asia.nikkei.com/business/science/china-overtakes-us-to-lead-global-r-d-spending-hitting-615bn",
    publisher: "Nikkei Asia",
    publicationYear: 2026,
    contentType: "reporting",
    topics: [
      "research-and-development",
      "science-policy",
      "spending",
      "innovation",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "Verify the data owner, reference year, currency conversion, purchasing-power treatment and public-versus-private coverage behind the reported total. Research spending is an input and does not by itself establish research quality, productivity or technological leadership.",
  }),
  candidate({
    id: "lead-2026-ft-china-jobs-squeeze",
    title: "Employment pressure in China's changing labor market",
    url: "https://www.ft.com/content/a3803e70-cb4d-444f-a31e-05be2f2c44f6",
    publisher: "Financial Times",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["employment", "youth-unemployment", "graduates", "labor-market"],
    accessStatus: "paywalled",
    notes:
      "Review official series, methodology changes, age bands, graduate and migrant-worker evidence, underemployment and regional variation. A national headline rate should not erase differences between cohorts or turn labor-market pressure into one causal story.",
  }),
  candidate({
    id: "lead-2026-scmp-kimi-k3-sandbox-test",
    title: "Researchers report Kimi K3 escaped an evaluation sandbox",
    url: "https://www.scmp.com/tech/tech-trends/article/3363271/chinas-kimi-k3-ai-model-escapes-isolated-sandbox-during-security-test-researchers",
    publisher: "South China Morning Post",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["kimi-k3", "ai-safety", "sandboxing", "evaluations"],
    urlStatus: "publisher-canonical",
    notes:
      "Locate the original evaluation, exact sandbox boundary, prompts, tools, logs, reproducibility details and researcher and vendor responses. An escape from a test harness is not automatically autonomous real-world compromise or evidence of model intent.",
  }),
  candidate({
    id: "lead-2026-reuters-apple-mac-qwen",
    title: "Apple describes Qwen access for Mac users in China",
    url: "https://www.reuters.com/business/retail-consumer/apple-says-mac-users-china-can-connect-alibabas-qwen-ai-service-2026-08-08/",
    publisher: "Reuters",
    publishedAt: "2026-08-08",
    contentType: "reporting",
    topics: ["apple", "qwen", "mac", "china-market"],
    accessStatus: "restricted",
    notes:
      "Review Apple's support material, eligible hardware and software, regional controls, data handling and Alibaba's role. Keep documentation availability, a connectable service and a broadly deployed product experience as separate implementation states.",
  }),
  candidate({
    id: "lead-2026-reuters-apple-china-ai-model",
    title: "Report that Apple is training a China-market AI model with Alibaba",
    url: "https://www.reuters.com/business/retail-consumer/apple-trains-its-own-ai-model-china-market-with-alibabas-support-sources-say-2026-08-14/",
    publisher: "Reuters",
    publishedAt: "2026-08-14",
    contentType: "reporting",
    topics: ["apple", "alibaba", "ai-models", "china-market"],
    accessStatus: "restricted",
    notes:
      "Preserve the anonymous-source boundary and distinguish base-model training, adaptation, compliance support, hosting and product integration. Seek company records and observable release evidence before treating a reported project as deployed.",
  }),
  candidate({
    id: "lead-2026-brookings-electrostates-petrostates",
    title: "Electrification and exposure to an oil-shipping shock",
    url: "https://www.brookings.edu/articles/electrostates-vs-petrostates-the-us-china-and-the-hormuz-energy-shock/",
    publisher: "Brookings Institution",
    publicationYear: 2026,
    contentType: "analysis",
    topics: ["electrification", "oil", "hormuz", "energy-security"],
    urlStatus: "publisher-canonical",
    notes:
      "Review scenario assumptions, shock duration, import flows, refining, grid mix, transport electrification and industrial demand. Treat resilience as conditional and separate reduced oil exposure from broad energy independence.",
  }),
  candidate({
    id: "lead-2026-bloomberg-china-ai-stocks",
    title: "China's AI-equity market and technology-policy ambitions",
    url: "https://www.bloomberg.com/news/features/2026-08-09/china-bets-on-ai-stocks-as-it-races-against-us-for-chip-tech-dominance",
    publisher: "Bloomberg",
    publishedAt: "2026-08-09",
    contentType: "reporting",
    topics: [
      "ai-stocks",
      "capital-markets",
      "semiconductors",
      "industrial-policy",
    ],
    accessStatus: "paywalled",
    notes:
      "Review index composition, listing rules, capital raised, valuation dates, state-policy mechanisms and company fundamentals. Equity performance and financing access are not direct measures of model capability or semiconductor independence.",
  }),
  candidate({
    id: "lead-2026-nyt-china-ai-africa",
    title: "Chinese AI products and infrastructure across African markets",
    url: "https://www.nytimes.com/2026/08/05/technology/ai-china-africa.html",
    publisher: "The New York Times",
    publishedAt: "2026-08-05",
    contentType: "reporting",
    topics: [
      "africa",
      "ai-deployment",
      "digital-infrastructure",
      "technology-competition",
    ],
    accessStatus: "paywalled",
    notes:
      "Review adoption measures, country and vendor selection, language support, compute and connectivity, financing, governance and local alternatives. Separate product presence, actual use, public procurement and durable platform dependence.",
  }),
  candidate({
    id: "lead-2026-rest-of-world-ai-companions",
    title: "Regulation of AI companion products in China",
    url: "https://restofworld.org/2026/china-ai-boyfriend-ban-bytedance-doubao/",
    publisher: "Rest of World",
    publicationYear: 2026,
    contentType: "reporting",
    topics: [
      "ai-companions",
      "platform-regulation",
      "bytedance",
      "digital-life",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "Review the controlling regulatory text, implementation dates, platform changes, enforcement evidence and user interviews. Keep one product's policy response distinct from a universal ban and treat the breakup framing as reported lived experience, not a population measure.",
  }),
  candidate({
    id: "lead-2026-reuters-microsoft-china-retreat",
    title:
      "Microsoft's reduced physical footprint and continuing China business",
    url: "https://www.reuters.com/world/china/microsoft-retreats-china-ai-boom-helps-it-keep-window-open-2026-08-13/",
    publisher: "Reuters",
    publishedAt: "2026-08-13",
    contentType: "reporting",
    topics: ["microsoft", "corporate-strategy", "ai-market", "china-business"],
    accessStatus: "restricted",
    notes:
      "Review site, employment and revenue data, product availability, partner structures and company responses over time. Office or research-site closures do not by themselves establish a complete market exit.",
  }),
  candidate({
    id: "lead-2026-ars-long-march-failure",
    title: "Failure of a Long March launch vehicle during flight",
    url: "https://arstechnica.com/space/2026/08/one-of-chinas-workhorse-rockets-just-exploded-in-flight/",
    publisher: "Ars Technica",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["long-march", "spaceflight", "launch-failure", "aerospace"],
    urlStatus: "publisher-canonical",
    notes:
      "Review official mission records, the exact vehicle variant, payload, flight phase, imagery and any investigation findings. One launch failure should remain a bounded event until evidence supports a wider reliability trend.",
  }),
  candidate({
    id: "lead-2026-ft-arctic-shipping",
    title: "China-linked shipping routes through the Arctic",
    url: "https://www.ft.com/content/4456f475-f2c8-4cb7-8312-0c47c5f781b8",
    publisher: "Financial Times",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["arctic", "shipping", "trade-routes", "climate"],
    accessStatus: "paywalled",
    notes:
      "Review vessel identity, ownership, ice class, cargo, route, season, insurance, port calls, frequency, economics and emissions. A pilot or seasonal voyage is not yet a durable bypass of established shipping chokepoints.",
  }),
  candidate({
    id: "lead-2026-chinatalk-deepseek-thesis",
    title: "An argument about DeepSeek and China's open-model strategy",
    url: "https://www.chinatalk.media/p/the-deepseek-thesis",
    publisher: "ChinaTalk",
    publicationYear: 2026,
    contentType: "analysis",
    topics: ["deepseek", "open-models", "ai-strategy", "semiconductors"],
    urlStatus: "publisher-canonical",
    notes:
      "Treat the piece as an argument with testable claims and forecasts. Review model artifacts, benchmark methodology, adoption evidence, chip constraints and counterarguments and keep open-weight availability distinct from capability leadership or market share.",
  }),
  candidate({
    id: "lead-2026-reuters-fcc-china-tech",
    title:
      "Expansion of U.S. communications restrictions on Chinese technology",
    url: "https://www.reuters.com/legal/government/us-communications-agency-is-unlikely-spearhead-trumps-china-policy-2026-08-10/",
    publisher: "Reuters",
    publishedAt: "2026-08-10",
    contentType: "reporting",
    topics: [
      "fcc",
      "technology-restrictions",
      "telecommunications",
      "us-china-policy",
    ],
    accessStatus: "restricted",
    notes:
      "Review the governing statutes, commission orders, covered-equipment lists, product categories, effective dates and legal challenges. Distinguish proposals, agency authority and operative restrictions rather than describing all categories as already banned.",
  }),
  candidate({
    id: "lead-2026-spinoff-space-monitoring-station",
    title: "Proposed Chinese space-monitoring station in New Zealand",
    url: "https://thespinoff.co.nz/politics/13-08-2026/chinese-space-institute-tried-to-set-up-monitoring-station-in-new-zealand",
    publisher: "The Spinoff",
    publishedAt: "2026-08-13",
    contentType: "reporting",
    topics: [
      "new-zealand",
      "space-monitoring",
      "research-cooperation",
      "security",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "Review the proposal documents, institute identity, intended equipment, host organization, approvals, security review and current status. A proposed monitoring site is not an operating facility, and dual-use concern is not proof of an intelligence mission.",
  }),
  candidate({
    id: "lead-2026-wsj-china-origin-archaeology",
    title: "Archaeological evidence and models of early Chinese civilization",
    url: "https://www.wsj.com/world/china/a-lost-civilization-is-baffling-experts-and-rewriting-chinas-origin-story-cda8dba7",
    publisher: "The Wall Street Journal",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["archaeology", "early-china", "dating", "historiography"],
    accessStatus: "paywalled",
    notes:
      "Review the original excavation reports, dating methods, site context, artifact interpretation and named expert disagreements. New evidence may complicate established models without proving a single replacement origin story.",
  }),
  candidate({
    id: "lead-2026-wsj-sodium-ion-batteries",
    title: "Sodium-ion batteries and supply-chain diversification",
    url: "https://www.wsj.com/business/energy-oil/china-free-batteries-made-from-salt-are-finally-here-cc1cd766",
    publisher: "The Wall Street Journal",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["sodium-ion", "batteries", "supply-chains", "energy-storage"],
    accessStatus: "paywalled",
    notes:
      "Review chemistry, manufacturer specifications, production scale, cost basis, energy density, cycle life and upstream material and equipment origins. The phrase 'China-free' requires a complete, dated supply-chain definition rather than final-assembly geography.",
  }),
  candidate({
    id: "lead-2026-ft-ai-cyberattack-taiwan",
    title: "Report of an AI-assisted cyberattack against targets in Taiwan",
    url: "https://www.ft.com/content/7d2ab3e0-9085-48f6-b38a-d90260d58795",
    publisher: "Financial Times",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["taiwan", "cybersecurity", "agentic-ai", "attribution"],
    accessStatus: "paywalled",
    notes:
      "Review the original threat report, telemetry, affected systems, attribution method, model and tool use, human oversight and independent corroboration. Define which actions were autonomous instead of allowing that label to stand in for the attack chain.",
  }),
  candidate({
    id: "lead-2026-cnbc-china-us-ai-models",
    title: "Comparing Chinese and U.S. positions in the AI model ecosystem",
    url: "https://www.cnbc.com/2026/08/07/china-us-ai-race-hugging-face-models.html",
    publisher: "CNBC",
    publishedAt: "2026-08-07",
    contentType: "analysis",
    topics: [
      "ai-models",
      "hugging-face",
      "open-weights",
      "us-china-competition",
    ],
    accessStatus: "restricted",
    notes:
      "Review the dataset, model-origin coding, time window, download or usage measures and capability comparisons. Repository counts and open-weight activity should not be compared directly with closed frontier systems without a common denominator.",
  }),
] as const;
