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
  collectionId: "china-article-corpus-2026-07-13",
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
      ? "Full publisher text was not available for lawful direct review. Withheld before source-read pending authorized access, primary records, later developments, and independent corroboration."
      : "Publisher metadata was checked, but the complete article and supporting evidence have not yet passed direct source review. Withheld before source-read."),
});

/** Thirteenth neutral article-candidate batch. */
export const chinaArticleIntake13 = [
  candidate({
    id: "lead-2017-bbc-beipanjiang-bridge",
    title: "The engineering of the Beipanjiang Bridge",
    url: "https://www.bbc.com/travel/article/20170531-chinas-impossible-engineering-feat",
    publisher: "BBC Travel",
    publishedAt: "2017-05-31",
    contentType: "reporting",
    topics: ["beipanjiang-bridge", "infrastructure", "engineering", "guizhou"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Review bridge authority and engineering records, deck height versus structural height, span, cost, construction chronology, safety and regional transport effects. Preserve that 565 meters describes deck elevation above the river, not a blanket measure of the entire structure.",
  }),
  candidate({
    id: "lead-2018-bloomberg-trade-war-incidence-study",
    title: "Research estimates China bore most early U.S. tariff costs",
    url: "https://www.bloomberg.com/news/articles/2018-11-19/china-is-paying-for-most-of-trump-s-trade-war-research-says",
    publisher: "Bloomberg",
    publishedAt: "2018-11-19",
    contentType: "reporting",
    topics: ["tariffs", "trade-war", "prices", "economic-research"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the underlying paper, tariff window, products, price and exchange-rate data, pass-through model and uncertainty. Keep the result time-bounded and compare later research on importer, consumer and exporter incidence rather than presenting one estimate as the final burden allocation.",
  }),
  candidate({
    id: "lead-2019-hkfp-extradition-protest",
    title: "Hong Kong protest against the proposed extradition law",
    url: "https://hongkongfp.com/2019/06/09/just-no-china-extradition-tens-thousands-hong-kong-protest-controversial-new-law/",
    publisher: "Hong Kong Free Press",
    publishedAt: "2019-06-09",
    contentType: "reporting",
    topics: ["hong-kong", "extradition-bill", "protests", "law"],
    urlStatus: "redirect-resolved",
    notes:
      "Review the bill text, organizer and police crowd estimates, route, participant accounts and government response. Add the later suspension and withdrawal and preserve the article as an early protest record rather than a complete history of the movement.",
  }),
  candidate({
    id: "lead-2019-nyt-hong-kong-party-collision-course",
    title: "Hong Kong protests and confrontation with China's Communist Party",
    url: "https://www.nytimes.com/2019/08/12/world/asia/hong-kong-protests-communist-party.html",
    publisher: "The New York Times",
    publishedAt: "2019-08-12",
    contentType: "analysis",
    topics: ["hong-kong", "protests", "communist-party", "politics"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Treat 'collision course' as analysis. Review the events, official statements, movement diversity and chronology, include competing interpretations and later legal and institutional outcomes, and avoid presenting a forecast as a settled trajectory.",
  }),
  candidate({
    id: "lead-2017-bloomberg-china-uk-freight-train",
    title: "First China-to-United Kingdom freight train departs",
    url: "https://www.bloomberg.com/news/articles/2017-01-03/china-starts-freight-train-to-london-as-xi-promotes-trade-ties",
    publisher: "Bloomberg",
    publishedAt: "2017-01-03",
    contentType: "reporting",
    topics: ["rail-freight", "united-kingdom", "trade", "belt-and-road"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review operator records, route, transfers, cargo, distance, time, subsidy and arrival. Distinguish the first advertised service from a continuously operating direct train and add later frequency, utilization and economics.",
  }),
  candidate({
    id: "lead-2017-nyt-china-facebook-state-media",
    title: "Chinese state media use Facebook for overseas messaging",
    url: "https://www.nytimes.com/2017/11/08/technology/china-facebook.html",
    publisher: "The New York Times",
    publishedAt: "2017-11-08",
    contentType: "reporting",
    topics: ["facebook", "state-media", "propaganda", "platforms"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review account ownership, advertising records, targeting, content samples and platform policies. Distinguish state-media publication, paid promotion and coordinated inauthentic behavior, and avoid inferring audience persuasion from availability alone.",
  }),
  candidate({
    id: "lead-2019-bloomberg-hong-kong-company-stakes",
    title: "Report that mainland entities sought stakes in Hong Kong companies",
    url: "https://www.bloomberg.com/news/articles/2019-09-13/china-seeks-to-buy-control-of-hong-kong-companies-reuters-says",
    publisher: "Bloomberg",
    publishedAt: "2019-09-13",
    contentType: "reporting",
    topics: [
      "hong-kong",
      "corporate-ownership",
      "state-enterprises",
      "markets",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Locate the original reporting and identify proposed buyers, targets, stake sizes, financing, approvals and completed transactions. A reported policy discussion or approach is not evidence that control changed hands.",
  }),
  candidate({
    id: "lead-2019-guy-hance-china-daily-satire",
    title: "Personal satire about China Daily headlines",
    url: "https://www.guyhance.com/2019/06/i-dont-need-the-onion-i-have-china-daily/",
    publisher: "Guy Hance",
    publicationYear: 2019,
    contentType: "analysis",
    topics: ["satire", "state-media", "commentary", "source-quality"],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected because a personal satire post is not a substantive evidence source for a Dispatch. Any media-framing analysis must use a defined article corpus, archived originals, translation and coding method, comparison set and reproducible findings rather than selected headlines presented for ridicule.",
    notes:
      "Do not turn humor or cherry-picked examples into a generalized factual claim about a news organization or national media system.",
  }),
  candidate({
    id: "lead-2019-bloomberg-telegram-ddos-attribution",
    title: "Telegram links a large cyberattack to China-based IP addresses",
    url: "https://www.bloomberg.com/news/articles/2019-06-13/telegram-traces-cyber-attack-to-china-amid-hong-kong-protests",
    publisher: "Bloomberg",
    publishedAt: "2019-06-13",
    contentType: "reporting",
    topics: ["telegram", "ddos", "cybersecurity", "hong-kong"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review Telegram's technical statement, traffic data, attack infrastructure, botnet possibility and independent analysis. Source IP geography does not establish operator identity, state direction or motive; preserve attribution confidence and alternatives.",
  }),
  candidate({
    id: "lead-2018-new-yorker-fan-bingbing-meng-hongwei",
    title: "The disappearances of Fan Bingbing and Meng Hongwei",
    url: "https://www.newyorker.com/news/daily-comment/why-did-chinas-biggest-movie-star-and-the-interpol-chief-vanish",
    publisher: "The New Yorker",
    publicationYear: 2018,
    contentType: "analysis",
    topics: ["fan-bingbing", "meng-hongwei", "detention", "rule-of-law"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Treat as contemporaneous commentary and keep the two cases separate. Review official notices, legal proceedings, tax records, family and defense accounts and later outcomes; do not infer one mechanism solely from simultaneous public absence.",
  }),
  candidate({
    id: "lead-2016-bbc-tiangong-2-launch",
    title: "China launches the Tiangong-2 space laboratory",
    url: "https://www.bbc.com/news/world-asia-china-37370278",
    publisher: "BBC News",
    publishedAt: "2016-09-15",
    contentType: "reporting",
    topics: ["tiangong-2", "spaceflight", "launch", "science"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Review launch, mission and experiment records and actual outcomes. Preserve that Tiangong-2 was a temporary space laboratory and second trial station, not the later modular Tiangong station.",
  }),
  candidate({
    id: "lead-2011-singularity-hub-officials-scientists",
    title: "Claim that eight of China's top nine officials were scientists",
    url: "https://singularityhub.com/2011/05/17/eight-out-of-chinas-top-nine-government-officials-are-scientists/",
    publisher: "Singularity Hub",
    publishedAt: "2011-05-17",
    contentType: "analysis",
    topics: ["leadership", "education", "elite-politics", "misleading-framing"],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected because the headline relies on an undefined and misleading classification of degree fields, occupations and governing roles and freezes an obsolete leadership lineup. Serious elite-background analysis requires a named cohort, consistent coding rules, biographies, career histories and comparative denominators.",
    notes:
      "An engineering or science degree does not by itself make an official a practicing scientist, establish technocratic governance or support a causal comparison with another country.",
  }),
  candidate({
    id: "lead-2021-bbc-amnesty-xinjiang-report",
    title: "Amnesty documents detention and abuse allegations in Xinjiang",
    url: "https://www.bbc.co.uk/news/world-asia-china-57386625",
    publisher: "BBC News",
    publishedAt: "2021-06-10",
    contentType: "reporting",
    topics: ["xinjiang", "amnesty-international", "detention", "human-rights"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the full Amnesty report, interview sample, selection, corroboration and legal analysis, plus China’s response and independent evidence. Keep quoted characterization attributed and distinguish documented testimony, inference and legal conclusion.",
  }),
  candidate({
    id: "lead-2021-wta-china-tournament-suspension",
    title: "WTA suspends tournaments in China",
    url: "https://www.wtatennis.com/news/2384758/steve-simon-announces-wta-s-decision-to-suspend-tournaments-in-china",
    publisher: "Women's Tennis Association",
    publishedAt: "2021-12-01",
    contentType: "primary",
    topics: ["wta", "peng-shuai", "sports", "corporate-policy"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the complete WTA statement, event scope and rationale and clearly label it as the association's own decision record. Add responses, financial and player effects and the 2023 resumption rather than leaving the suspension as current.",
  }),
  candidate({
    id: "lead-2022-yiqin-fu-mobile-walled-gardens",
    title: "The unintended consequences of China's mobile-first internet",
    url: "https://yiqinfu.github.io/posts/walled-gardens-china/",
    publisher: "Yiqin Fu",
    publicationYear: 2022,
    contentType: "analysis",
    topics: ["mobile-internet", "wechat", "walled-gardens", "web"],
    urlStatus: "publisher-canonical",
    notes:
      "Treat as a personal technical essay. Review examples, platform behavior, accessibility and market data and separate mobile adoption, super-app design, mini-program architecture and censorship; seek user research and counterexamples.",
  }),
  candidate({
    id: "lead-2020-cbc-invisible-fishing-fleet",
    title: "Investigating China's distant-water fishing fleet",
    url: "https://newsinteractives.cbc.ca/longform/china-at-sea",
    publisher: "CBC News",
    publicationYear: 2020,
    contentType: "reporting",
    topics: ["fishing", "maritime", "ais", "distant-water-fleet"],
    urlStatus: "publisher-canonical",
    notes:
      "Review vessel identities, ownership, AIS and satellite methods, jurisdiction, fishing authorizations and case outcomes. Distinguish dark activity, signal gaps and proven illegal fishing and include company and government responses.",
  }),
  candidate({
    id: "lead-2021-guardian-dancing-grannies-device",
    title: "A remote-control device targets loud public-square speakers",
    url: "https://www.theguardian.com/world/2021/oct/08/chinas-noisy-dancing-grannies-silenced-by-device-that-disables-speakers",
    publisher: "The Guardian",
    publishedAt: "2021-10-08",
    contentType: "reporting",
    topics: ["square-dancing", "noise", "daily-life", "consumer-devices"],
    urlStatus: "publisher-canonical",
    notes:
      "Verify the device, compatible speakers, legality, sales evidence and named local cases. Treat the story as a bounded daily-life anecdote, include dancers and residents' perspectives and avoid presenting one gadget as a nationwide resolution of noise disputes.",
  }),
  candidate({
    id: "lead-2021-bbc-hong-kong-anthem-booing",
    title: "Hong Kong police investigate anthem booing at a public screening",
    url: "https://www.bbc.com/news/world-asia-china-58022068",
    publisher: "BBC News",
    publishedAt: "2021-07-30",
    contentType: "reporting",
    topics: ["hong-kong", "national-anthem", "football", "law"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review video, police statement, anthem-law provisions, arrests, charges and outcomes. Distinguish opening an investigation from a finding of criminal liability and add later case developments.",
  }),
  candidate({
    id: "lead-2015-a16z-wechat-mobile",
    title: "When one app rules them all: WeChat and mobile in China",
    url: "https://a16z.com/when-one-app-rules-them-all-the-case-of-wechat-and-mobile-in-china/",
    publisher: "Andreessen Horowitz",
    publishedAt: "2015-08-06",
    contentType: "analysis",
    topics: ["wechat", "super-apps", "mobile", "platforms"],
    urlStatus: "redirect-resolved",
    notes:
      "Treat as investor analysis. Verify product chronology and adoption metrics, define 'rules them all,' include competitors, merchant and user perspectives, governance and privacy limits and later mini-program and regulation developments.",
  }),
  candidate({
    id: "lead-2025-freakonomics-engineers-lawyers",
    title: "China is run by engineers; America is run by lawyers",
    url: "https://freakonomics.com/podcast/china-is-run-by-engineers-america-is-run-by-lawyers/",
    publisher: "Freakonomics Radio",
    publishedAt: "2025-09-19",
    byline: "Stephen J. Dubner",
    contentType: "analysis",
    topics: ["governance", "engineering", "law", "comparative-politics"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the full transcript and underlying book as an argument, not a literal occupational census. Define cohorts and mechanisms, test infrastructure and legal-system examples, include social-engineering costs and counterexamples and avoid essentializing either country.",
  }),
  candidate({
    id: "lead-2023-rest-of-world-jike-app",
    title: "Jike, a social app favored by parts of China's technology scene",
    url: "https://restofworld.org/2023/china-tech-workers-investors-founders-app/",
    publisher: "Rest of World",
    publicationYear: 2023,
    contentType: "reporting",
    topics: ["jike", "social-media", "technology-workers", "online-culture"],
    urlStatus: "publisher-canonical",
    notes:
      "Review user metrics, interview selection, platform history and moderation, define the technology-scene population and compare other communities. 'Beloved' and 'obscure' are qualitative frames requiring bounded evidence.",
  }),
  candidate({
    id: "lead-2017-nyt-underground-bank-case",
    title: "Authorities announce a $3 billion underground-bank case",
    url: "https://www.nytimes.com/2017/11/23/business/china-underground-bank-3-billion.html",
    publisher: "The New York Times",
    publishedAt: "2017-11-23",
    contentType: "reporting",
    topics: [
      "underground-banking",
      "capital-controls",
      "law-enforcement",
      "finance",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review police and court records, transaction period, currency conversion, defendants, charges and final outcomes. An announced case value is not necessarily seized assets, profit or adjudicated laundering.",
  }),
  candidate({
    id: "lead-2021-espn-peng-shuai-foreign-ministry",
    title: "Foreign Ministry says it is unaware of Peng Shuai's situation",
    url: "https://www.espn.com/tennis/story/_/id/32665214/china-foreign-ministry-not-aware-situation-surrounding-tennis-player-peng-shuai",
    publisher: "ESPN",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["peng-shuai", "tennis", "foreign-ministry", "public-statement"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the full briefing transcript, question and translation and preserve the statement as a ministry spokesperson's response, not evidence about Peng's welfare. Add later appearances, WTA actions and unresolved access limits without speculating beyond evidence.",
  }),
  candidate({
    id: "lead-2019-ft-xinjiang-tracking-leak",
    title: "Data leak indicates large-scale location tracking in Xinjiang",
    url: "https://www.ft.com/content/9ed9362e-31f7-11e9-bb0c-42459962a812",
    publisher: "Financial Times",
    publishedAt: "2019-02-17",
    contentType: "reporting",
    topics: ["xinjiang", "data-leak", "surveillance", "location-data"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the exposed database, field definitions, time span, deduplication and security researchers' method, verify operator and system ownership and distinguish logged identifiers or events from unique people continuously tracked.",
  }),
  candidate({
    id: "lead-2019-washington-post-schellenberg-sentence",
    title: "Canadian man receives death sentence in China drug case",
    url: "https://www.washingtonpost.com/world/asia_pacific/china-sentences-canadian-man-to-death-in-drug-case-linked-to-huawei-row/2019/01/14/058306a0-17fb-11e9-a804-c35766b9f234_story.html",
    publisher: "The Washington Post",
    publishedAt: "2019-01-14",
    contentType: "reporting",
    topics: ["canada", "drug-case", "death-penalty", "diplomacy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review judgments, retrial chronology, evidence, defense and government statements and later appeals. Treat linkage to the Huawei dispute as attributed analysis unless direct evidence establishes political direction.",
  }),
  candidate({
    id: "lead-2018-buzzfeed-adware-doctor",
    title: "Apple removes Adware Doctor after browsing-history disclosure",
    url: "https://www.buzzfeednews.com/article/nicolenguyen/apple-removes-adware-doctor-browsing-history",
    publisher: "BuzzFeed News",
    publishedAt: "2018-09-07",
    contentType: "reporting",
    topics: ["macos", "privacy", "app-store", "security-research"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the researcher's code and network evidence, app version, permissions, destination and Apple and developer responses. Distinguish transmission to infrastructure located in China from proof of recipient identity, use or government access.",
  }),
  candidate({
    id: "lead-2021-reuters-embassy-us-business-lobbying",
    title:
      "Chinese embassy reportedly asks U.S. businesses to oppose legislation",
    url: "https://www.reuters.com/business/exclusive-chinese-embassy-lobbies-us-business-oppose-china-bills-sources-2021-11-12/",
    publisher: "Reuters",
    publishedAt: "2021-11-12",
    contentType: "reporting",
    topics: ["lobbying", "diplomacy", "business", "legislation"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the alleged communications, recipients, bills and registration-law context and seek documentary confirmation and all responses. Distinguish ordinary diplomatic advocacy, lobbying disclosure requirements, pressure and proven threats.",
  }),
  candidate({
    id: "lead-2021-ieee-thorium-reactor",
    title: "China approaches operation of an experimental thorium reactor",
    url: "https://spectrum.ieee.org/china-closing-in-on-thorium-nuclear-reactor",
    publisher: "IEEE Spectrum",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["thorium", "molten-salt-reactor", "nuclear-energy", "research"],
    urlStatus: "publisher-canonical",
    notes:
      "Review reactor specifications, licensing, fuel cycle, test milestones and safety claims using scientific and regulator records. Separate approaching operation, criticality, sustained testing and commercial viability and add later dated results.",
  }),
  candidate({
    id: "lead-2019-techcrunch-bing-outage",
    title: "Microsoft confirms Bing is inaccessible in China",
    url: "https://techcrunch.com/2019/01/23/microsoft-confirms-bing-is-down-in-china/",
    publisher: "TechCrunch",
    publishedAt: "2019-01-23",
    contentType: "reporting",
    topics: ["bing", "internet-access", "outage", "censorship"],
    urlStatus: "publisher-canonical",
    notes:
      "Review Microsoft's statement and multi-vantage network measurements, duration and restoration. Inaccessibility alone does not establish the mechanism or responsible actor; distinguish outage, DNS or routing failure and deliberate blocking.",
  }),
  candidate({
    id: "lead-2026-ieee-china-moon-landing-plan",
    title: "China's plan for a crewed lunar landing around 2030",
    url: "https://spectrum.ieee.org/china-moon-mission-mengzhou-artemis",
    publisher: "IEEE Spectrum",
    publicationYear: 2026,
    byline: "Ned Potter",
    contentType: "analysis",
    topics: ["moon", "mengzhou", "lanyue", "spaceflight"],
    urlStatus: "publisher-canonical",
    notes:
      "Review official program statements, hardware tests, Long March 10, Mengzhou and Lanyue milestones and schedule dependencies. Keep 2030 as a target, not a completed or guaranteed landing, and separate technical comparison with Artemis from geopolitical race framing.",
  }),
] as const;
