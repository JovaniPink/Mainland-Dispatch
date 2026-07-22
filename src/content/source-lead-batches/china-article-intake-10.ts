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
  byline?: string;
  accessStatus?:
    "reachable" | "paywalled" | "restricted" | "unavailable" | "unstable";
  urlStatus?: "supplied" | "redirect-resolved" | "publisher-canonical";
  disposition?: "withheld" | "rejected";
  decisionReason?: string;
};

const candidate = (item: Candidate) => ({
  accessedAt: "2026-07-22",
  sourceOrigin: "user-sourcebook" as const,
  collectionId: "china-article-corpus-2026-07-10",
  reviewState:
    item.urlStatus && item.urlStatus !== "supplied"
      ? ("metadata-checked" as const)
      : ("supplied" as const),
  disposition: item.disposition ?? ("withheld" as const),
  accessStatus: item.accessStatus ?? ("reachable" as const),
  urlStatus: item.urlStatus ?? ("supplied" as const),
  ...(item.urlStatus && item.urlStatus !== "supplied"
    ? { canonicalCheckedAt: "2026-07-22" }
    : {}),
  language: "English",
  translationStatus: "original-english" as const,
  evidenceStatus: "unverified" as const,
  ...item,
  decisionReason:
    item.decisionReason ??
    (item.accessStatus === "paywalled" || item.accessStatus === "restricted"
      ? "Full publisher text was not available for lawful direct review. Withheld before source-read pending authorized access, primary records, and independent corroboration."
      : "Publisher metadata was checked, but the complete article and supporting evidence have not yet passed direct source review. Withheld before source-read."),
});

/** Tenth neutral article-candidate batch. Discussion-only material is excluded. */
export const chinaArticleIntake10 = [
  candidate({
    id: "lead-2025-usni-qian-xuesen-history",
    title: "The missile genius America lost—and China gained",
    url: "https://www.usni.org/magazines/naval-history/2025/december/missile-genius-america-lost-and-china-gained",
    publisher: "U.S. Naval Institute",
    publishedAt: "2025-12-01",
    contentType: "analysis",
    topics: ["qian-xuesen", "missiles", "science-history", "cold-war"],
    urlStatus: "publisher-canonical",
    notes:
      "Review archival immigration, security-hearing, Caltech and government records, Qian's documented work before and after 1955, and Chinese program histories. Avoid a single-genius causal story, distinguish deportation from voluntary return and test claims that every modern missile directly traces to him.",
  }),
  candidate({
    id: "lead-2018-nyt-zte-sputnik-moment",
    title: "Near-collapse of ZTE may be China's Sputnik moment",
    url: "https://www.nytimes.com/2018/06/10/technology/china-technology-zte-sputnik-moment.html",
    publisher: "The New York Times",
    publishedAt: "2018-06-10",
    contentType: "analysis",
    topics: ["zte", "semiconductors", "export-controls", "industrial-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Treat 'Sputnik moment' as analogy. Review the Commerce denial order and settlement, ZTE filings and supply dependencies, distinguish temporary shutdown from collapse, include U.S. and Chinese responses and document later semiconductor policy and ZTE performance.",
  }),
  candidate({
    id: "lead-2016-bbc-shenzhou-11-launch",
    title: "China's Shenzhou-11 launches on Tiangong-2 mission",
    url: "https://www.bbc.com/news/world-asia-china-37670842",
    publisher: "BBC News",
    publishedAt: "2016-10-17",
    contentType: "reporting",
    topics: ["shenzhou-11", "tiangong-2", "spaceflight", "launch"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Review launch and mission records, crew, planned duration, docking target and experiments. Preserve that Tiangong-2 was a space laboratory rather than the later modular station and add actual mission outcomes instead of leaving plans as completed facts.",
  }),
  candidate({
    id: "lead-2019-nyt-hong-kong-disinformation",
    title: "China is waging a disinformation war against Hong Kong protesters",
    url: "https://www.nytimes.com/2019/08/13/world/asia/hong-kong-protests-china.html",
    publisher: "The New York Times",
    publishedAt: "2019-08-13",
    contentType: "reporting",
    topics: ["hong-kong", "disinformation", "state-media", "protests"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review each example, platform archive, account or outlet ownership, translation and distribution. Separate state-media framing, coordinated inauthentic activity and ordinary political speech; include platform and Chinese responses and avoid inferring audience effect without measurement.",
  }),
  candidate({
    id: "lead-2023-economist-police-overseas-suspects",
    title: "How China's police are ensnaring thousands of suspects abroad",
    url: "https://www.economist.com/china/2023/02/14/how-chinas-police-are-ensnaring-thousands-of-suspects-abroad",
    publisher: "The Economist",
    publishedAt: "2023-02-14",
    contentType: "reporting",
    topics: [
      "law-enforcement",
      "extraterritoriality",
      "repatriation",
      "transnational-repression",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review named cases, court and immigration records, Interpol processes, official operation statistics and methodology. Distinguish lawful extradition, voluntary return, family pressure, covert policing and adjudicated transnational repression; include defenses and host-government responses.",
  }),
  candidate({
    id: "lead-2012-slate-prison-body-double-claim",
    title: "Claim that wealthy defendants can hire prison body doubles",
    url: "https://slate.com/news-and-politics/2012/08/china-s-wealthy-and-influential-sometimes-hire-body-doubles-to-serve-their-prison-sentences.html",
    publisher: "Slate",
    publishedAt: "2012-08-02",
    contentType: "reporting",
    topics: [
      "criminal-justice",
      "wealth",
      "impersonation",
      "misleading-framing",
    ],
    urlStatus: "redirect-resolved",
    disposition: "rejected",
    decisionReason:
      "Rejected as a sensational derivative account whose generalized headline is not supported here by a reliable case corpus, judgments or independently verifiable records. Individual substitution or impersonation cases require case-level evidence and cannot establish a routine privilege for the wealthy.",
    notes:
      "Do not preserve the cultural stereotype. Any future review must identify defendants, courts, charges, judgments, identity evidence and outcomes and distinguish pretrial appearance substitution from serving a prison sentence.",
  }),
  candidate({
    id: "lead-2018-techcrunch-gait-recognition",
    title: "China can apparently identify people by the way they walk",
    url: "https://techcrunch.com/2018/11/07/china-can-apparently-now-identify-citizens-based-on-the-way-they-walk/",
    publisher: "TechCrunch",
    publishedAt: "2018-11-07",
    contentType: "reporting",
    topics: [
      "gait-recognition",
      "surveillance",
      "computer-vision",
      "biometrics",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "Review vendor claims, training and test sets, rank metrics, distance and occlusion conditions, false positives, deployment contracts and independent evaluation. Distinguish identifying enrolled subjects from identifying any citizen and document legal safeguards, responses and later performance evidence.",
  }),
  candidate({
    id: "lead-2016-literary-hub-china-new-literary-genre",
    title: "Modern China is so crazy it needs a new literary genre",
    url: "https://lithub.com/modern-china-is-so-crazy-it-needs-a-new-literary-genre/",
    publisher: "Literary Hub",
    publicationYear: 2016,
    contentType: "analysis",
    topics: ["literature", "fiction", "culture", "social-change"],
    urlStatus: "publisher-canonical",
    notes:
      "Treat the piece as literary criticism, not a factual description of a country. Review the authors, works, translation context and proposed genre definition, include competing critical traditions and avoid turning provocative language into a sociological claim.",
  }),
  candidate({
    id: "lead-2014-qz-china-zombie-companies",
    title: "Japan's zombie-company problem and China's economy",
    url: "https://qz.com/198458/zombies-once-destroyed-japans-economy-now-theyre-infecting-chinas",
    publisher: "Quartz",
    publicationYear: 2014,
    contentType: "analysis",
    topics: ["zombie-firms", "debt", "japan", "economy"],
    urlStatus: "redirect-resolved",
    notes:
      "Define zombie firms and reproduce cited credit, profitability and productivity measures. Test the Japan analogy, distinguish state-owned and private firms, avoid saying zombies 'destroyed' an economy, and add later deleveraging, bankruptcy and productivity research.",
  }),
  candidate({
    id: "lead-2021-times-amazon-xi-book-reviews",
    title:
      "Amazon reportedly allowed only five-star reviews for Xi's book in China",
    url: "https://www.thetimes.co.uk/article/amazon-agreed-to-scrub-poor-reviews-of-xi-on-chinas-site-7tzgjhmt6",
    publisher: "The Times",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["amazon", "book-reviews", "corporate-policy", "censorship"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Retrieve the full report and underlying internal records, establish which product, storefront and review functions changed, include Amazon and Chinese responses and later policy. Distinguish disabling ratings, suppressing negative reviews and allowing only five-star submissions.",
  }),
  candidate({
    id: "lead-2018-techcrunch-censors-xi-term-limits",
    title: "China's web censors intensify as Xi Jinping consolidates power",
    url: "https://techcrunch.com/2018/02/26/china-web-censors-go-into-overdrive/",
    publisher: "TechCrunch",
    publishedAt: "2018-02-26",
    contentType: "reporting",
    topics: ["censorship", "term-limits", "social-media", "xi-jinping"],
    urlStatus: "publisher-canonical",
    notes:
      "Review exact terms, posts, platforms, dates and observation locations, archive evidence and compare multiple vantage points. Tie the timing carefully to the term-limit proposal, include platform and official responses and avoid treating every missing result as demonstrated state censorship.",
  }),
  candidate({
    id: "lead-2011-dyske-efficiency-jobs-essay",
    title: "It's not China; it's efficiency that is killing our jobs",
    url: "http://dyske.com/paper/945",
    publisher: "Dyske Suematsu",
    publicationYear: 2011,
    contentType: "analysis",
    topics: ["automation", "employment", "trade", "productivity"],
    notes:
      "Treat this as a personal economic essay. Review its data and causal claims against labor-economics research on automation, import competition, sector and region, define the job and time boundaries and preserve that trade and technology effects can coexist.",
  }),
  candidate({
    id: "lead-2018-bloomberg-china-bitcoin-miner-costs",
    title:
      "Bitcoin could drop 50 percent and some China miners would still make money",
    url: "https://www.bloomberg.com/news/articles/2018-01-10/bitcoin-can-drop-50-and-china-s-miners-will-still-make-money",
    publisher: "Bloomberg",
    publishedAt: "2018-01-10",
    contentType: "reporting",
    topics: ["bitcoin", "mining", "electricity", "economics"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Reconstruct profitability by hardware, hash rate, difficulty, power price, pool fees and bitcoin price at the article date. Avoid generalizing selected low-cost miners to the whole industry and add later difficulty, equipment, energy-policy and 2021 mining-ban developments.",
  }),
  candidate({
    id: "lead-2018-ccc-social-credit-talk",
    title: "The social credit system in China",
    url: "https://media.ccc.de/v/35c3-9904-the_social_credit_system",
    publisher: "Chaos Computer Club",
    publishedAt: "2018-12-29",
    contentType: "analysis",
    topics: ["social-credit", "conference-talk", "policy", "myths"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the full talk, slides, transcript and every cited policy record. Preserve distinctions among financial credit, regulatory blacklists, court enforcement, local pilots and private products, and update claims against later scholarship and implementation evidence.",
  }),
  candidate({
    id: "lead-2019-reuters-visma-cyberattack",
    title: "Investigators attribute Visma intrusion to a China-linked group",
    url: "https://www.reuters.com/article/us-china-cyber-norway-visma/china-hacked-norways-visma-to-steal-client-secrets-investigators-idUSKCN1PV141",
    publisher: "Reuters",
    publishedAt: "2019-02-06",
    contentType: "reporting",
    topics: ["visma", "cybersecurity", "apt10", "attribution"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review Recorded Future and Rapid7 technical evidence, affected systems and data, attribution confidence and alternative explanations. Include Visma, Norwegian, Chinese and relevant government responses and later indictments or campaign findings without turning linkage into adjudicated state responsibility.",
  }),
  candidate({
    id: "lead-2016-bloomberg-foreign-tech-talent",
    title: "Why China can't easily lure foreign technology talent",
    url: "https://www.bloomberg.com/opinion/articles/2016-12-13/why-china-can-t-lure-tech-talent",
    publisher: "Bloomberg Opinion",
    publishedAt: "2016-12-13",
    contentType: "analysis",
    topics: ["talent", "immigration", "technology", "labor"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review cited migration, compensation, visa, education and quality-of-life evidence, define 'foreign tech talent' and avoid anecdotal generalization. Add later talent programs, international hiring and retention data and distinguish recruiting from long-term settlement.",
  }),
  candidate({
    id: "lead-2024-sandboarding-taklamakan-green-belt",
    title: "China completes green belt around the Taklamakan Desert",
    url: "https://sand-boarding.com/china-builds-green-wall-taklamakan-desert/",
    publisher: "Sand-boarding.com",
    publicationYear: 2024,
    contentType: "reporting",
    topics: ["taklamakan", "desertification", "green-belt", "environment"],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected as weak derivative reporting for a claim better served by dated government records, satellite and field research and independent ecological reporting. Completing a 3,046-kilometer edge barrier does not itself establish durable desertification control or ecological success.",
    notes:
      "A future Dispatch should distinguish physical encirclement, vegetation survival, sand movement, water use, biodiversity, climate effects and local livelihoods and should preserve the continuing 2050 program horizon.",
  }),
  candidate({
    id: "lead-2026-substack-yjk1000-hypersonic-cost-claim",
    title: "Claim that China is mass-producing hypersonic missiles for $99,000",
    url: "https://kdwalmsley.substack.com/p/on-sale-now-china-is-mass-producing",
    publisher: "KD Walmsley",
    publicationYear: 2026,
    contentType: "analysis",
    topics: ["hypersonic-weapons", "cost", "mass-production", "verification"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected because the extraordinary unit-cost, combat-trial and mass-production claims trace to circulated promotional slides and derivative reporting rather than an authenticated contract, audited cost basis, test record or verified production evidence.",
    notes:
      "Do not compare sticker claims with full program costs. Any future review must establish weapon definition, propulsion and flight profile, payload, test conditions, manufacturer, customer, order quantity, recurring versus development cost and delivery evidence.",
  }),
  candidate({
    id: "lead-2021-ft-anti-fraud-app-overseas-news",
    title:
      "China uses anti-fraud app to track access to overseas financial-news sites",
    url: "https://www.ft.com/content/84b6b889-ae03-47f7-9cd0-bd604b21d5de",
    publisher: "Financial Times",
    publicationYear: 2021,
    contentType: "reporting",
    topics: [
      "anti-fraud-app",
      "surveillance",
      "financial-news",
      "mobile-privacy",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the complete reported cases, app permissions, network and device evidence, installation requirements and legal basis. Distinguish access logging, alerts, questioning and content interception; include developer, police, platform and government responses and later app changes.",
  }),
  candidate({
    id: "lead-2019-bloomberg-tech-blacklist-retaliation",
    title:
      "China says 'stay tuned' for retaliation over U.S. technology blacklist",
    url: "https://www.bloomberg.com/news/articles/2019-10-08/china-says-stay-tuned-for-retaliation-over-u-s-tech-blacklist",
    publisher: "Bloomberg",
    publishedAt: "2019-10-08",
    contentType: "reporting",
    topics: ["entity-list", "retaliation", "trade", "technology"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Treat the phrase as an attributed spokesperson response, not an implemented measure. Review the U.S. entity-list action, full briefing context and subsequent Chinese unreliable-entity and export-control measures, preserving dates and causal uncertainty.",
  }),
  candidate({
    id: "lead-2019-bloomberg-china-corporate-defaults",
    title: "China defaults hit a record in 2018, with a faster pace in 2019",
    url: "https://www.bloomberg.com/news/articles/2019-05-07/china-defaults-hit-record-in-2018-the-2019-pace-is-triple-that",
    publisher: "Bloomberg",
    publishedAt: "2019-05-07",
    contentType: "reporting",
    topics: ["corporate-bonds", "defaults", "credit", "economy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Reproduce default amounts and counts with currency, onshore/offshore, issuer and annualization definitions. Explain market growth and denominator, distinguish missed payment from restructuring and add full-year 2019 and later property and local-financing debt developments.",
  }),
  candidate({
    id: "lead-2018-cleantechnica-china-q1-solar",
    title: "China installs nearly 10 gigawatts of solar in the first quarter",
    url: "https://cleantechnica.com/2018/04/24/china-installs-nearly-10-gigawatts-of-solar-in-first-quarter-up-22/",
    publisher: "CleanTechnica",
    publishedAt: "2018-04-24",
    contentType: "reporting",
    topics: ["solar", "capacity", "energy", "statistics"],
    urlStatus: "publisher-canonical",
    notes:
      "Start with National Energy Administration data, define AC/DC capacity, utility versus distributed installations and first-quarter comparison. Separate installed nameplate capacity from generation and utilization, check revisions and add curtailment and later-year context.",
  }),
  candidate({
    id: "lead-2013-devttys0-firmware-backdoor",
    title: "From China, with love",
    url: "http://devttys0.com/2013/10/from-china-with-love/",
    publisher: "devttys0",
    publishedAt: "2013-10-18",
    contentType: "analysis",
    topics: ["firmware", "routers", "backdoor", "security-research"],
    notes:
      "Review the exact device, firmware image, binary analysis, network behavior and exploit prerequisites in a safe environment. Identify vendor and model scope, disclosure and patch chronology and independent reproduction; do not generalize a product flaw to a country or infer state intent without evidence.",
  }),
  candidate({
    id: "lead-2010-wapo-godaddy-china-domain-policy",
    title:
      "GoDaddy curtails China operations over domain-registration requirements",
    url: "https://www.washingtonpost.com/wp-dyn/content/article/2010/03/24/AR2010032401543.html",
    publisher: "The Washington Post",
    publishedAt: "2010-03-24",
    contentType: "reporting",
    topics: ["godaddy", "domains", "privacy", "internet-regulation"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review congressional testimony, CNNIC requirements and GoDaddy's exact service change. Distinguish stopping new .cn registrations from leaving China entirely, include regulator response and add later registrar and domain-policy developments.",
  }),
  candidate({
    id: "lead-2019-usf-china-telecom-bgp-paper",
    title: "China Telecom's BGP hijacking",
    url: "https://scholarcommons.usf.edu/cgi/viewcontent.cgi?article=1050&context=mca",
    publisher: "University of South Florida Scholar Commons",
    publicationYear: 2019,
    contentType: "research",
    topics: ["bgp", "china-telecom", "routing", "cybersecurity"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the complete paper, route-collector coverage, event-selection method, path evidence and intent inference. Seek independent network-operator analyses and China Telecom response, distinguish leaks from deliberate hijacks and document later technical criticism or replication.",
  }),
  candidate({
    id: "lead-2019-guardian-recycling-incineration",
    title: "U.S. cities burn recyclables after China restricts waste imports",
    url: "https://www.theguardian.com/cities/2019/feb/21/philadelphia-covanta-incinerator-recyclables-china-ban-imports",
    publisher: "The Guardian",
    publishedAt: "2019-02-21",
    contentType: "reporting",
    topics: ["recycling", "incineration", "waste-trade", "cities"],
    urlStatus: "publisher-canonical",
    notes:
      "Review named city contracts, tonnage, contamination and disposition data, facility permits and emissions. Separate temporary local decisions from national practice, include company and community responses and add later domestic processing and waste-export outcomes.",
  }),
  candidate({
    id: "lead-2026-bbc-canada-china-trade-deal",
    title: "Canada's deal with China signals a shift from the United States",
    url: "https://www.bbc.com/news/articles/cm24k6kk1rko",
    publisher: "BBC News",
    publishedAt: "2026-01-17",
    contentType: "analysis",
    topics: ["canada", "trade", "diplomacy", "united-states"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the complete agreement or announced framework, tariff and product scope, implementation dates and both governments' statements. Treat 'shift' as analysis, compare total Canada-U.S. and Canada-China ties and check what was implemented after publication.",
  }),
  candidate({
    id: "lead-2017-nyt-belt-road-trillion-plan",
    title: "China's trillion-dollar plan to reshape the economic order",
    url: "https://www.nytimes.com/2017/05/13/business/china-railway-one-belt-one-road-1-trillion-plan.html",
    publisher: "The New York Times",
    publishedAt: "2017-05-13",
    contentType: "reporting",
    topics: ["belt-and-road", "infrastructure", "finance", "trade"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Define whether the trillion-dollar figure is announced, pledged, financed or projected and over what period. Review project-level contracts, lender and recipient decisions, cancellations and restructurings, environmental and labor effects and later portfolio data.",
  }),
  candidate({
    id: "lead-2023-semafor-amazon-small-business-trading",
    title: "How Amazon turned small businesses into day traders",
    url: "https://www.semafor.com/article/01/25/2023/how-amazon-turned-small-businesses-into-day-traders",
    publisher: "Semafor",
    publishedAt: "2023-01-25",
    contentType: "analysis",
    topics: ["amazon", "small-business", "e-commerce", "china"],
    urlStatus: "publisher-canonical",
    notes:
      "Review seller datasets, interview selection, geography and survival denominator, marketplace rule and logistics changes and Amazon's response. Treat 'day traders' as metaphor, distinguish U.S. merchants and China-based sellers and add later fee, aggregation and enforcement outcomes.",
  }),
] as const;
