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
  language?: string;
  translationStatus?:
    | "original-language"
    | "original-english"
    | "publisher-translation"
    | "independent-translation";
  accessStatus?:
    "reachable" | "paywalled" | "restricted" | "unavailable" | "unstable";
  urlStatus?: "supplied" | "redirect-resolved" | "publisher-canonical";
  disposition?: "withheld" | "rejected";
  decisionReason?: string;
};

const candidate = (item: Candidate) => ({
  accessedAt: "2026-07-22",
  sourceOrigin: "user-sourcebook" as const,
  collectionId: "china-article-corpus-2026-07-09",
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

/** Ninth neutral article-candidate batch. Discovery-platform data is intentionally absent. */
export const chinaArticleIntake09 = [
  candidate({
    id: "lead-2018-bloomberg-state-role-tech-sector",
    title: "China is nationalizing its tech sector",
    url: "https://www.bloomberg.com/opinion/articles/2018-04-12/china-is-nationalizing-its-tech-sector",
    publisher: "Bloomberg Opinion",
    publishedAt: "2018-04-12",
    contentType: "analysis",
    topics: [
      "technology",
      "state-capital",
      "investment",
      "corporate-governance",
    ],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Treat 'nationalizing' as the columnist's analytical frame, not a completed legal transfer of ownership. Review named funds, special-management shares, party committees, board rights and company examples against filings and policy records, then add later ownership and governance developments.",
  }),
  candidate({
    id: "lead-2017-nyt-chinese-students-overseas-campuses",
    title: "On campuses far from China, still under Beijing's watchful eye",
    url: "https://www.nytimes.com/2017/05/04/us/chinese-students-western-campuses-china-influence.html",
    publisher: "The New York Times",
    publishedAt: "2017-05-04",
    contentType: "reporting",
    topics: [
      "universities",
      "students",
      "academic-freedom",
      "foreign-influence",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review each campus incident, interview selection and documentary record; distinguish state direction, consular contact, student association conduct, peer disagreement and self-censorship. Protect students, include university and Chinese responses and avoid treating Chinese students as a single political bloc.",
  }),
  candidate({
    id: "lead-2020-headuck-samsung-hong-kong-dns",
    title:
      "How Samsung phones forced a mainland DNS service on Hong Kong Wi-Fi users",
    url: "https://blog.headuck.com/2020/10/12/samsung-phones-force-mainland-china-dns-service-upon-hong-kong-wifi-users/",
    publisher: "HeaDuck Research Institute",
    publishedAt: "2020-10-12",
    byline: "Headuck",
    contentType: "analysis",
    topics: ["samsung", "dns", "hong-kong", "mobile-security"],
    urlStatus: "redirect-resolved",
    notes:
      "Reproduce the firmware, region code, network and DNS observations across affected and control devices. Review the cited Android code and follow-up posts, distinguish adding a resolver from sending all traffic or content, obtain Samsung and 114DNS responses, and document fixes or later firmware behavior.",
  }),
  candidate({
    id: "lead-2018-nyt-church-crackdown-christmas",
    title: "China cracks down on Christian churches",
    url: "https://www.nytimes.com/2018/12/25/world/asia/china-christmas-church-crackdown.html",
    publisher: "The New York Times",
    publishedAt: "2018-12-25",
    contentType: "reporting",
    topics: ["religion", "churches", "law", "civil-society"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review every named church and enforcement action, applicable religious-affairs rules, registration status, local variation, congregant and lawyer testimony and government response. Add case outcomes and later religious-policy developments without generalizing one locality to all worship.",
  }),
  candidate({
    id: "lead-2021-reuters-bgi-prenatal-genetic-data",
    title: "China's gene giant harvests data from millions of women worldwide",
    url: "https://www.reuters.com/investigates/special-report/health-china-bgi-dna/",
    publisher: "Reuters",
    publishedAt: "2021-07-07",
    contentType: "reporting",
    topics: ["bgi", "genetic-data", "prenatal-testing", "privacy"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the underlying papers, patents, consent forms, privacy notices, data flows and sample counts. Distinguish demonstrated research use from possible military or surveillance applications, include BGI and government responses, jurisdictional safeguards, regulator findings and later product changes.",
  }),
  candidate({
    id: "lead-2018-foreign-policy-xinjiang-camps-duration",
    title: "China's mass internment camps have no clear end in sight",
    url: "https://foreignpolicy.com/2018/08/22/chinas-mass-internment-camps-have-no-clear-end-in-sight/",
    publisher: "Foreign Policy",
    publishedAt: "2018-08-22",
    contentType: "reporting",
    topics: ["xinjiang", "detention", "uyghurs", "human-rights"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the full article's sourcing, satellite and procurement evidence, testimony, population estimates and Chinese response. Preserve the 2018 knowledge boundary, distinguish detention facilities and later prison or labor transfers, and include subsequent documentation and contested terminology.",
  }),
  candidate({
    id: "lead-2018-hkfp-megha-rajagopalan-visa",
    title: "Journalist denied a new China visa after reporting on Xinjiang",
    url: "https://hongkongfp.com/2018/08/22/buzzfeed-journalist-denied-new-china-visa-following-award-winning-coverage-xinjiang-crackdown/",
    publisher: "Hong Kong Free Press",
    publishedAt: "2018-08-22",
    contentType: "reporting",
    topics: ["journalism", "visas", "xinjiang", "press-freedom"],
    urlStatus: "redirect-resolved",
    notes:
      "Establish the visa chronology and exact official communication, attribute the perceived connection to Xinjiang reporting rather than asserting an unrecorded motive, include journalist, employer and foreign ministry statements, and add later accreditation and reporting developments.",
  }),
  candidate({
    id: "lead-2024-krebs-versa-zero-day-volt-typhoon",
    title: "New zero-day attacks linked to China's 'Volt Typhoon'",
    url: "https://krebsonsecurity.com/2024/08/new-0-day-attacks-linked-to-chinas-volt-typhoon/",
    publisher: "Krebs on Security",
    publishedAt: "2024-08-27",
    byline: "Brian Krebs",
    contentType: "reporting",
    topics: ["volt-typhoon", "versa", "zero-day", "cybersecurity"],
    urlStatus: "publisher-canonical",
    notes:
      "Start with Versa's advisory, CVE record and affected-version details, then review Black Lotus Labs indicators and attribution confidence. Separate exploitation evidence from actor identity, identify victim and exposure scope without enabling abuse, and add CISA guidance, patches and later campaign findings.",
  }),
  candidate({
    id: "lead-2017-nyt-moodys-china-debt-downgrade",
    title: "Moody's downgrades China over debt risk",
    url: "https://www.nytimes.com/2017/05/23/business/moodys-downgrades-china-economy-debt.html",
    publisher: "The New York Times",
    publicationYear: 2017,
    contentType: "reporting",
    topics: ["debt", "credit-rating", "moodys", "economy"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Use Moody's rating action and methodology as the primary record, define government versus economy-wide debt and rating horizon, include the finance ministry response, avoid treating a forecast as certain, and add later ratings, deleveraging and property-sector developments.",
  }),
  candidate({
    id: "lead-2016-wapo-missing-girls-research",
    title: "Researchers may have 'found' many of China's missing girls",
    url: "https://www.washingtonpost.com/news/worldviews/wp/2016/11/30/researchers-may-have-found-many-of-chinas-30-million-missing-girls/",
    publisher: "The Washington Post",
    publishedAt: "2016-11-30",
    contentType: "reporting",
    topics: [
      "demography",
      "sex-ratio",
      "birth-registration",
      "research-methods",
    ],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review the underlying paper, census cohorts, late-registration assumptions, model and uncertainty, and the debate it prompted. Distinguish unregistered girls from deaths, abandonment and international adoption, use age and time boundaries, and incorporate later demographic research.",
  }),
  candidate({
    id: "lead-2018-nyt-economic-news-censorship",
    title: "China censors bad economic news amid signs of slower growth",
    url: "https://www.nytimes.com/2018/09/28/business/china-censor-economic-news.html",
    publisher: "The New York Times",
    publishedAt: "2018-09-28",
    contentType: "reporting",
    topics: ["economy", "media", "censorship", "statistics"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the complete examples, directives or takedown observations and source protection, separate formal censorship from newsroom caution and platform moderation, verify each cited indicator and revision, include official responses and preserve the 2018 economic context.",
  }),
  candidate({
    id: "lead-2026-wikipedia-china-gps-shift-section",
    title: "The China GPS shift problem",
    url: "https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China#The_China_GPS_shift_problem",
    publisher: "Wikipedia",
    publicationYear: 2026,
    contentType: "analysis",
    topics: ["maps", "gcj-02", "gps", "geospatial-data"],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected as a mutable tertiary encyclopedia section rather than a canonical article or primary technical record. A future review should start with controlling survey and mapping rules, provider documentation and reproducible coordinate-system tests.",
    notes:
      "Do not repeat claims that GPS itself is shifted or that one fixed offset applies. Distinguish WGS-84 positioning from GCJ-02 map coordinates, datum mismatch, provider implementations and legal requirements.",
  }),
  candidate({
    id: "lead-2016-wapo-social-credit-big-data-plan",
    title: "China's plan to organize society around big-data ratings",
    url: "https://www.washingtonpost.com/world/asia_pacific/chinas-plan-to-organize-its-whole-society-around-big-data-a-rating-for-everyone/2016/10/20/1cd0dd9c-9516-11e6-ae9d-0030ac1899cd_story.html",
    publisher: "The Washington Post",
    publishedAt: "2016-10-22",
    contentType: "reporting",
    topics: ["social-credit", "big-data", "governance", "financial-credit"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Preserve this as period reporting about plans and pilots, not proof of one national citizen score. Review the 2014 planning outline, financial-credit experiments, local pilots and court blacklists separately; document which proposals lapsed and how the system actually developed after 2016.",
  }),
  candidate({
    id: "lead-2025-csis-rare-earth-magnet-restrictions",
    title:
      "China's new rare-earth and magnet restrictions threaten U.S. defense supply chains",
    url: "https://www.csis.org/analysis/chinas-new-rare-earth-and-magnet-restrictions-threaten-us-defense-supply-chains",
    publisher: "Center for Strategic and International Studies",
    publishedAt: "2025-10-09",
    byline: "Gracelin Baskaran",
    contentType: "analysis",
    topics: ["rare-earths", "magnets", "export-controls", "defense"],
    urlStatus: "publisher-canonical",
    notes:
      "Start with Ministry of Commerce Announcement No. 61 of 2025 and authoritative translations. Distinguish licensing, presumptive denial and an outright ban; verify concentration and defense-use figures, implementation dates, subsequent negotiations and April 2026 evidence about actual flows.",
  }),
  candidate({
    id: "lead-2018-businessinsider-social-credit-travel-blocks",
    title: "Claim that China's social-credit system blocked millions of trips",
    url: "https://www.businessinsider.com/china-social-credit-system-blocked-people-taking-flights-train-trips-2018-5",
    publisher: "Business Insider",
    publishedAt: "2018-05-21",
    contentType: "reporting",
    topics: [
      "social-credit",
      "court-defaulters",
      "travel-restrictions",
      "misleading-framing",
    ],
    urlStatus: "redirect-resolved",
    disposition: "rejected",
    decisionReason:
      "Rejected as materially misleading derivative framing. The cited counts concern restrictions on judgment defaulters and other defined blacklists, not evidence that a universal citizen score blocked travel; primary court and regulatory records are the appropriate sources.",
    notes:
      "A future article may examine enforcement blacklists, but must define persons versus denied transactions, repeat attempts, legal basis, appeal and removal, and distinguish court enforcement from commercial or local scoring pilots.",
  }),
  candidate({
    id: "lead-2015-volkskrant-china-citizen-ratings",
    title: "China rates its own citizens, including online behaviour",
    url: "https://www.volkskrant.nl/buitenland/china-rates-its-own-citizens-including-online-behaviour~a3979668/",
    publisher: "de Volkskrant",
    publicationYear: 2015,
    contentType: "reporting",
    topics: ["social-credit", "online-behavior", "financial-credit", "policy"],
    language: "Dutch",
    translationStatus: "original-language",
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Obtain the complete Dutch text and a documented translation. Preserve the 2015 pilot and proposal context, identify every system described, separate Sesame Credit from government records and later national policy, and correct any implication that one universal behavioral score was already operating.",
  }),
  candidate({
    id: "lead-2019-scmp-zero-trust-anti-corruption-ai",
    title:
      "Is China's corruption-busting AI being turned off for being too efficient?",
    url: "https://www.scmp.com/news/china/science/article/2184857/chinas-corruption-busting-ai-system-zero-trust-being-turned-being",
    publisher: "South China Morning Post",
    publishedAt: "2019-02-04",
    contentType: "reporting",
    topics: [
      "anti-corruption",
      "artificial-intelligence",
      "government-data",
      "accountability",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "The extraordinary performance and shutdown narrative requires procurement, system documentation, deployment list, audited case outcomes and named official responses. Distinguish anomaly detection from proof of corruption, quantify false positives and human review, and treat unnamed-source explanations as allegations.",
  }),
  candidate({
    id: "lead-2021-chicago-council-defend-taiwan-poll",
    title:
      "For first time, half of Americans favor defending Taiwan if China invades",
    url: "https://globalaffairs.org/research/public-opinion-survey/first-time-half-americans-favor-defending-taiwan-if-china-invades",
    publisher: "Chicago Council on Global Affairs",
    publicationYear: 2021,
    contentType: "research",
    topics: ["taiwan", "public-opinion", "united-states", "survey"],
    urlStatus: "redirect-resolved",
    notes:
      "Review questionnaire wording, order, sample frame, field dates, weighting, mode and margin of error. Distinguish a hypothetical survey response from policy support under specified costs, compare trend questions consistently and add later polling without combining non-equivalent measures.",
  }),
  candidate({
    id: "lead-2019-wsj-fedex-pilot-detention",
    title: "China detains former U.S. Air Force pilot flying for FedEx",
    url: "https://www.wsj.com/articles/fedex-pilot-detained-by-police-in-southern-china-sources-11568906801",
    publisher: "The Wall Street Journal",
    publishedAt: "2019-09-19",
    contentType: "reporting",
    topics: ["fedex", "detention", "aviation", "legal-case"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review the legal notice, alleged items, detention and release conditions, identities and source attribution, plus FedEx, U.S. and Chinese statements. Add later charging or case disposition and avoid treating an initial detention report as proof of guilt.",
  }),
  candidate({
    id: "lead-2018-nyt-china-trade-retaliation-options",
    title: "China once looked tough on trade; its options were dwindling",
    url: "https://www.nytimes.com/2018/09/18/business/china-trade-war-retaliate.html",
    publisher: "The New York Times",
    publishedAt: "2018-09-18",
    contentType: "analysis",
    topics: ["trade-war", "tariffs", "retaliation", "economy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Preserve this as September 2018 analysis rather than a durable limit on policy options. Reconstruct tariff totals and import denominators from official schedules, distinguish formal and informal measures, include Chinese and U.S. positions and document the subsequent trade-war chronology.",
  }),
  candidate({
    id: "lead-2018-npr-crispr-cancer-trials",
    title: "Doctors in China lead race to treat cancer by editing genes",
    url: "https://www.npr.org/sections/health-shots/2018/02/21/585336506/doctors-in-china-lead-race-to-treat-cancer-by-editing-genes",
    publisher: "NPR",
    publishedAt: "2018-02-21",
    contentType: "reporting",
    topics: ["crispr", "cancer", "clinical-trials", "bioethics"],
    urlStatus: "publisher-canonical",
    notes:
      "Review trial registrations, protocols, enrollment, somatic versus germline editing, adverse events, ethics approval and peer-reviewed outcomes. Distinguish first dosing from demonstrated efficacy, compare U.S. trials on equivalent dates and add later results and regulatory changes.",
  }),
  candidate({
    id: "lead-2024-cepr-manufacturing-superpower",
    title:
      "China is the world's sole manufacturing superpower: a line sketch of the rise",
    url: "https://cepr.org/voxeu/columns/china-worlds-sole-manufacturing-superpower-line-sketch-rise",
    publisher: "CEPR / VoxEU",
    publishedAt: "2024-01-17",
    byline: "Richard Baldwin",
    contentType: "analysis",
    topics: ["manufacturing", "trade", "oecd-tiva", "industrialization"],
    urlStatus: "publisher-canonical",
    notes:
      "Reproduce figures from the cited 2023 OECD TiVA update, preserving gross output versus value added, current-price and double-counting limits, country aggregation and the 1995–2020 boundary. Add newer data where comparable and treat 'sole superpower' as a defined analytical label.",
  }),
  candidate({
    id: "lead-2021-nature-thorium-reactor-test",
    title: "China prepares to test thorium-fuelled nuclear reactor",
    url: "https://www.nature.com/articles/d41586-021-02459-w",
    publisher: "Nature",
    publishedAt: "2021-09-09",
    byline: "Smriti Mallapaty",
    contentType: "reporting",
    topics: ["thorium", "molten-salt-reactor", "nuclear-energy", "research"],
    urlStatus: "publisher-canonical",
    notes:
      "A planned test is not sustained operation or commercial viability. Review reactor design, fuel cycle, power rating, safety and waste claims, licensing and test evidence; add the 2023 operating permit and later independently verifiable milestones while separating official announcements from measured results.",
  }),
  candidate({
    id: "lead-2016-bbc-shenzhou-11-tiangong-2-video",
    title: "Astronauts enter China's Tiangong-2 space laboratory",
    url: "https://www.bbc.com/news/world-asia-china-37699910",
    publisher: "BBC News",
    publishedAt: "2016-10-19",
    contentType: "reporting",
    topics: ["shenzhou-11", "tiangong-2", "spaceflight", "video"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Correct the generic supplied headline: this concerned Shenzhou-11 docking with the Tiangong-2 laboratory, not today's modular Tiangong station. Review mission records, what the video shows, experiment and duration claims, and later program chronology.",
  }),
  candidate({
    id: "lead-2012-greatfire-tom-skype-monitoring",
    title: "China listening in on Skype: Microsoft assumes you approve",
    url: "https://en.greatfire.org/blog/2012/dec/china-listening-skype-microsoft-assumes-you-approve",
    publisher: "GreatFire",
    publicationYear: 2012,
    contentType: "analysis",
    topics: ["skype", "tom-skype", "surveillance", "privacy"],
    urlStatus: "publisher-canonical",
    notes:
      "Treat this as advocacy and technical analysis. Review the linked privacy policy, TOM-Skype architecture, Citizen Lab research, keyword and message evidence, jurisdiction and Microsoft and TOM responses; distinguish capability, filtering and demonstrated human monitoring.",
  }),
  candidate({
    id: "lead-2021-restofworld-gitee-open-source-ecosystem",
    title: "China wants to build an open-source ecosystem to rival GitHub",
    url: "https://restofworld.org/2021/china-gitee-to-rival-github/",
    publisher: "Rest of World",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["gitee", "open-source", "software-development", "platforms"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the government consortium or procurement records, Gitee metrics and definitions, developer interviews, censorship and licensing, and comparisons with GitHub. Separate policy ambition from ecosystem adoption and add later funding, availability and developer-migration evidence.",
  }),
  candidate({
    id: "lead-2025-energy-mix-us-china-emissions-half-year",
    title: "U.S. emissions rise while China's fall in first half of 2025",
    url: "https://www.theenergymix.com/u-s-emissions-rise-chinas-fall-in-massive-shift-between-worlds-biggest-climate-polluters/",
    publisher: "The Energy Mix",
    publishedAt: "2025-08-13",
    byline: "Mitchell Beer",
    contentType: "reporting",
    topics: ["emissions", "carbon-monitor", "climate", "energy"],
    urlStatus: "publisher-canonical",
    notes:
      "The figures compare January–June 2025 with the same 2024 period and come from Carbon Monitor estimates. Review the underlying dataset, revision and uncertainty, sector coverage, weather and economic effects; do not infer an annual peak or durable trajectory from six months.",
  }),
  candidate({
    id: "lead-2017-nyt-apps-removed-china-store",
    title: "Apple removes New York Times apps from its China store",
    url: "https://www.nytimes.com/2017/01/04/business/media/new-york-times-apps-apple-china.html",
    publisher: "The New York Times",
    publishedAt: "2017-01-04",
    contentType: "reporting",
    topics: ["apple", "app-store", "new-york-times", "censorship"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review Apple's notice and statement, the publisher's account, the cited local-regulation request and storefront scope. Distinguish app removal from website blocking, obtain regulator response and add later app-store transparency and media-app policy developments.",
  }),
  candidate({
    id: "lead-2018-bloomberg-belt-road-soviet-analogy",
    title: "Soviet collapse echoes in China's Belt and Road",
    url: "https://www.bloomberg.com/opinion/articles/2018-08-12/soviet-collapse-echoes-in-china-s-belt-and-road-investment",
    publisher: "Bloomberg Opinion",
    publishedAt: "2018-08-12",
    contentType: "analysis",
    topics: [
      "belt-and-road",
      "investment",
      "soviet-union",
      "political-economy",
    ],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Treat the Soviet analogy as argument, not evidence. Review project and lending data, fiscal denominators, recipient-country decisions and defaults, distinguish grants, loans and commercial investment, test counterexamples and add post-2018 restructuring and completion evidence.",
  }),
  candidate({
    id: "lead-2018-globe-mail-xinjiang-predictive-policing",
    title: "China uses big data to detain people before crimes, report says",
    url: "https://www.theglobeandmail.com/news/world/china-using-big-data-to-detain-people-in-re-education-before-crime-committed-report/article38126551/",
    publisher: "The Globe and Mail",
    publicationYear: 2018,
    contentType: "reporting",
    topics: ["xinjiang", "predictive-policing", "ijop", "detention"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Start with the cited Human Rights Watch report and its source base, then review later leaked IJOP manuals, procurement and technical research. Attribute predictive-detention claims, distinguish data collection, flagging and detention decisions, include Chinese responses and protect vulnerable testimony.",
  }),
] as const;
