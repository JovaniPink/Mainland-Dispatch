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
};

const candidate = (item: Candidate) => ({
  accessedAt: "2026-07-22",
  sourceOrigin: "user-sourcebook" as const,
  collectionId: "china-article-corpus-2026-07-11",
  reviewState:
    item.urlStatus && item.urlStatus !== "supplied"
      ? ("metadata-checked" as const)
      : ("supplied" as const),
  disposition: "withheld" as const,
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
    item.accessStatus === "paywalled" || item.accessStatus === "restricted"
      ? "Full publisher text was not available for lawful direct review. Withheld before source-read pending authorized access, primary records, later developments, and independent corroboration."
      : "Publisher metadata was checked, but the complete article and supporting evidence have not yet passed direct source review. Withheld before source-read.",
});

/** Eleventh neutral article-candidate batch. Discussion-only material is excluded. */
export const chinaArticleIntake11 = [
  candidate({
    id: "lead-2019-reuters-apple-production-diversification",
    title: "Apple explores moving 15–30% of production capacity from China",
    url: "https://www.reuters.com/article/us-apple-china-restructuring/apple-explores-moving-15-30-of-production-capacity-from-china-nikkei-idUSKCN1TK0XN",
    publisher: "Reuters",
    publishedAt: "2019-06-19",
    contentType: "reporting",
    topics: ["apple", "manufacturing", "supply-chains", "diversification"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the underlying Nikkei report, supplier requests, product and capacity denominators and Apple and supplier responses. Preserve that 15–30 percent was an explored option, not a completed move, and add dated evidence of later production diversification.",
  }),
  candidate({
    id: "lead-2018-reuters-un-xinjiang-estimate",
    title: "UN committee hears credible reports of mass detention in Xinjiang",
    url: "https://www.reuters.com/article/us-china-rights-un/u-n-says-it-has-credible-reports-that-china-holds-million-uighurs-in-secret-camps-idUSKBN1KV1SU",
    publisher: "Reuters",
    publishedAt: "2018-08-10",
    contentType: "reporting",
    topics: ["xinjiang", "uyghurs", "detention", "united-nations"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the Committee on the Elimination of Racial Discrimination hearing, submissions and later findings, the estimate's methodology and China’s response. Attribute the statement to the committee expert who cited credible reports rather than converting it into a formal UN institutional finding.",
  }),
  candidate({
    id: "lead-2016-pentest-partners-cctv-email-backdoor",
    title: "Security analysis of CCTV firmware sending snapshots by email",
    url: "https://www.pentestpartners.com/security-blog/pwning-cctv-cameras/",
    publisher: "Pen Test Partners",
    publishedAt: "2016-02-10",
    byline: "Andrew Tierney",
    contentType: "research",
    topics: ["cctv", "firmware", "cybersecurity", "disclosure"],
    urlStatus: "redirect-resolved",
    notes:
      "Review the exact vendor, models, firmware image, triggering conditions, destination and safe reproduction, plus disclosure and patch history. An email destination or vendor location does not establish state direction; seek independent technical confirmation.",
  }),
  candidate({
    id: "lead-2019-guardian-london-protester-arrest-pressure",
    title:
      "Watchdog allegation of political pressure before London protest arrest",
    url: "https://www.theguardian.com/world/2019/jun/30/political-pressure-before-arrest-of-chinese-dissident-london",
    publisher: "The Guardian",
    publishedAt: "2019-06-30",
    contentType: "reporting",
    topics: ["tiananmen", "protest", "policing", "united-kingdom"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the police-watchdog report, arrest and court records, diplomatic and police communications and all official responses. Preserve the distinction between an allegation of pressure, evidence of communications and proof that pressure caused the arrest.",
  }),
  candidate({
    id: "lead-2017-mit-technology-review-china-ai-awakening",
    title: "China's AI awakening",
    url: "https://www.technologyreview.com/2017/10/10/148284/chinas-ai-awakening/",
    publisher: "MIT Technology Review",
    publishedAt: "2017-10-10",
    contentType: "analysis",
    topics: [
      "artificial-intelligence",
      "industrial-policy",
      "research",
      "startups",
    ],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review the complete feature, every funding, publication and company metric, case selection and policy document. Treat leadership claims as time-bounded analysis and add later evidence on research quality, commercialization, controls and company outcomes.",
  }),
  candidate({
    id: "lead-2014-bbc-south-china-sea-island-factory",
    title: "China's island factory",
    url: "https://www.bbc.co.uk/news/special/2014/newsspec_8701/index.html",
    publisher: "BBC News",
    publicationYear: 2014,
    contentType: "reporting",
    topics: [
      "south-china-sea",
      "land-reclamation",
      "satellite-imagery",
      "maritime-disputes",
    ],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the full interactive, imagery dates and methods, feature names, claimant positions and legal status. Add later construction evidence and the 2016 arbitral award while keeping physical reclamation, sovereignty claims and legal conclusions distinct.",
  }),
  candidate({
    id: "lead-2011-cnn-millionaires-emigration-survey",
    title:
      "Survey report on wealthy Chinese respondents considering emigration",
    url: "https://business.blogs.cnn.com/2011/11/01/report-half-of-chinas-rich-want-to-leave/",
    publisher: "CNN Business",
    publishedAt: "2011-11-01",
    contentType: "reporting",
    topics: ["wealth", "emigration", "survey", "demographics"],
    accessStatus: "unavailable",
    urlStatus: "publisher-canonical",
    notes:
      "Retrieve the original Hurun and Bank of China survey, questionnaire, sample frame, wealth threshold and field dates. Separate considering emigration from intending, applying or leaving, and compare later migration evidence rather than generalizing to all millionaires.",
  }),
  candidate({
    id: "lead-2016-economist-semiconductor-superpower",
    title: "China's plan to become a semiconductor superpower",
    url: "https://www.economist.com/business/2016/01/23/the-chips-are-down",
    publisher: "The Economist",
    publishedAt: "2016-01-23",
    contentType: "analysis",
    topics: ["semiconductors", "industrial-policy", "investment", "technology"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review how the reported $100 billion was aggregated and distinguish budget, target, fund size, announced investment and deployed capital. Use official fund and company records and add later production outcomes, governance problems and export-control effects.",
  }),
  candidate({
    id: "lead-2018-techcrunch-sensetime-funding",
    title: "SenseTime closes a $620 million funding round",
    url: "https://techcrunch.com/2018/05/30/even-more-money-for-senstime-ai-china/",
    publisher: "TechCrunch",
    publishedAt: "2018-05-30",
    contentType: "reporting",
    topics: ["sensetime", "funding", "artificial-intelligence", "startups"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the company announcement, investors, round structure and valuation basis. Treat 'highest-valued AI startup' as a period-specific private-market label and add later listing, sanctions, revenue, losses and business developments.",
  }),
  candidate({
    id: "lead-2018-bbc-rhino-tiger-products-policy",
    title:
      "Alarm after China announces limited easing of rhino and tiger product ban",
    url: "https://www.bbc.com/news/world-asia-46027702",
    publisher: "BBC News",
    publishedAt: "2018-10-30",
    contentType: "reporting",
    topics: ["wildlife", "conservation", "rhinos", "tigers"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the October State Council decision, conservation evidence, regulated-stock claims and responses. Crucially include the November 2018 postponement and continued old ban; the announced easing must not be presented as enduring implementation.",
  }),
  candidate({
    id: "lead-2019-taiwan-news-tim-cook-tsinghua-board",
    title: "Tim Cook named chair of Tsinghua economics advisory board",
    url: "https://www.taiwannews.com.tw/news/3800247",
    publisher: "Taiwan News",
    publicationYear: 2019,
    contentType: "reporting",
    topics: [
      "apple",
      "tsinghua-university",
      "corporate-governance",
      "education",
    ],
    urlStatus: "redirect-resolved",
    notes:
      "Review the Tsinghua School of Economics and Management advisory-board roster, appointment language, remit, term and later membership. Distinguish a school advisory role from governing the university or holding a government post.",
  }),
  candidate({
    id: "lead-2019-wsj-nba-china-events",
    title: "NBA events in China disrupted after Hong Kong tweet",
    url: "https://www.wsj.com/articles/nba-events-in-china-disrupted-over-hong-kong-tweet-11570613597",
    publisher: "The Wall Street Journal",
    publishedAt: "2019-10-09",
    contentType: "reporting",
    topics: ["nba", "hong-kong", "sports", "corporate-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the full chronology, which events were cancelled or altered, team, league, broadcaster, sponsor and official statements and later commercial outcomes. Preserve who made each decision rather than attributing every disruption to one actor.",
  }),
  candidate({
    id: "lead-2018-marketwatch-china-hustle-documentary",
    title: "The China Hustle revisits reverse mergers and short sellers",
    url: "https://www.marketwatch.com/story/finance-documentary-the-china-hustle-revisits-chinese-reverse-mergers-and-activist-short-sellers-2018-03-30",
    publisher: "MarketWatch",
    publishedAt: "2018-03-30",
    contentType: "analysis",
    topics: ["documentary", "reverse-mergers", "securities", "short-selling"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the film and identify each company and allegation, then use SEC, court, audit and exchange records plus company defenses and outcomes. A review of a documentary is neither corroboration nor a basis for generalizing across Chinese issuers.",
  }),
  candidate({
    id: "lead-2016-bloomberg-vancouver-real-estate",
    title: "Vancouver housing and wealth connected to China",
    url: "https://www.bloomberg.com/features/2016-vancouver-real-estate-market/",
    publisher: "Bloomberg",
    publicationYear: 2016,
    contentType: "reporting",
    topics: ["vancouver", "housing", "wealth", "capital-flows"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review transaction, title, tax, immigration and beneficial-ownership data, selection methods and denominators. Do not infer citizenship, residence or funding source from names or ethnicity; add later foreign-buyer tax, transparency and market evidence.",
  }),
  candidate({
    id: "lead-2016-reuters-uber-china-loss",
    title: "Uber says it was losing more than $1 billion a year in China",
    url: "https://www.reuters.com/article/uber-china-idUSKCN0VR1M9",
    publisher: "Reuters",
    publishedAt: "2016-02-18",
    contentType: "reporting",
    topics: ["uber", "ride-hailing", "competition", "finance"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the chief executive's attributed estimate, accounting period and whether it described operating loss, subsidies or spending. Seek filings and independent estimates, compare Didi on the same basis and include Uber China's later transaction with Didi.",
  }),
  candidate({
    id: "lead-2018-zdnet-free-vpn-ownership",
    title: "Study links many free mobile VPN apps to China-based ownership",
    url: "https://www.zdnet.com/article/many-free-mobile-vpn-apps-are-based-in-china-or-have-chinese-ownership/",
    publisher: "ZDNET",
    publicationYear: 2018,
    contentType: "reporting",
    topics: ["vpn", "mobile-apps", "privacy", "ownership"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the underlying app sample, ownership tracing, permissions, privacy policies and any traffic or security audits. Corporate location or ownership alone does not demonstrate data transfer, surveillance or legal compliance behavior.",
  }),
  candidate({
    id: "lead-2010-state-department-google-china",
    title: "State Department statement on Google operations in China",
    url: "https://2009-2017.state.gov/secretary/20092013clinton/rm/2010/01/135105.htm",
    publisher: "U.S. Department of State",
    publishedAt: "2010-01-12",
    contentType: "primary",
    topics: ["google", "diplomacy", "internet-freedom", "cybersecurity"],
    accessStatus: "unavailable",
    urlStatus: "redirect-resolved",
    notes:
      "Retrieve the complete official archive and contemporaneous briefing context before use. Preserve this as an attributed U.S. government position, distinguish reported cyber incidents from adjudicated attribution and add later Google and Chinese statements.",
  }),
  candidate({
    id: "lead-2018-wsj-amazon-marketplace-manipulation-video",
    title: "How marketplace manipulation affected Amazon sellers",
    url: "https://www.wsj.com/articles/how-scammers-in-china-manipulate-amazon-11545044402",
    publisher: "The Wall Street Journal",
    publicationYear: 2018,
    contentType: "reporting",
    topics: ["amazon", "e-commerce", "marketplace-integrity", "fraud"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the complete video or transcript, named accounts, demonstrated tactics, evidence chain and Amazon's response and enforcement. Keep proven conduct at account level and avoid generalizing it to China-based sellers as a class.",
  }),
  candidate({
    id: "lead-2019-japan-times-academic-freedom",
    title: "China's growing threat to academic freedom",
    url: "https://www.japantimes.co.jp/opinion/2019/11/25/commentary/japan-commentary/chinas-growing-threat-academic-freedom/",
    publisher: "The Japan Times",
    publishedAt: "2019-11-25",
    contentType: "analysis",
    topics: [
      "academic-freedom",
      "universities",
      "foreign-influence",
      "education",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Treat this as opinion. Review every cited campus case against university records, correspondence and participant accounts, include institutional and Chinese responses and counterpoints, and distinguish documented pressure from self-censorship or speculation.",
  }),
  candidate({
    id: "lead-2017-qz-china-bitcoin-mines-photo-essay",
    title: "Inside remote bitcoin mines in China",
    url: "https://qz.com/1026605/photos-chinas-bitcoin-mines-and-miners",
    publisher: "Quartz",
    publishedAt: "2017-07-13",
    contentType: "reporting",
    topics: ["bitcoin", "mining", "energy", "photography"],
    urlStatus: "redirect-resolved",
    notes:
      "Review locations, dates, access, captions and quantitative energy and capacity claims. A photo essay documents selected sites rather than national prevalence; add later energy-policy changes and the 2021 mining crackdown.",
  }),
  candidate({
    id: "lead-2015-bloomberg-china-share-suspensions",
    title: "China share suspensions cover $2.2 trillion of market value",
    url: "https://www.bloomberg.com/news/articles/2015-07-08/china-trade-halts-hit-2-2-trillion-as-state-intervention-fails",
    publisher: "Bloomberg",
    publishedAt: "2015-07-08",
    contentType: "reporting",
    topics: [
      "stock-market",
      "trading-halts",
      "market-value",
      "financial-policy",
    ],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review exchange notices, suspended-company count, market-cap calculation and intervention chronology. Market value attached to halted shares is not cash literally locked up; add reopening, price and rule outcomes.",
  }),
  candidate({
    id: "lead-2015-techcrunch-vpn-disruption",
    title: "VPN services report disruption after filtering-system changes",
    url: "https://techcrunch.com/2015/01/23/china-vpn-crackdown/",
    publisher: "TechCrunch",
    publishedAt: "2015-01-23",
    contentType: "reporting",
    topics: ["vpn", "internet-filtering", "censorship", "network-measurement"],
    urlStatus: "publisher-canonical",
    notes:
      "Review service tests, protocols, locations, provider statements, independent network measurements and official policy. Distinguish blocking or protocol interference from a legal ban and add later licensing and enforcement developments.",
  }),
  candidate({
    id: "lead-2025-nyt-china-tariff-retaliation",
    title: "China retaliates against U.S. tariffs with a 34% levy",
    url: "https://www.nytimes.com/2025/04/04/business/china-trump-tariffs-retaliation.html",
    publisher: "The New York Times",
    publishedAt: "2025-04-04",
    contentType: "reporting",
    topics: ["tariffs", "trade-war", "united-states", "trade-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review official tariff schedules, legal instruments, product coverage, base, effective dates and exemptions. Keep announcement, enactment and collection separate and add later escalation, suspension or negotiated changes.",
  }),
  candidate({
    id: "lead-2016-washington-post-next-generation-manufacturing",
    title: "Why China may not own next-generation manufacturing",
    url: "https://www.washingtonpost.com/news/innovations/wp/2016/08/26/why-china-wont-own-next-generation-manufacturing/",
    publisher: "The Washington Post",
    publishedAt: "2016-08-26",
    contentType: "analysis",
    topics: ["manufacturing", "automation", "robotics", "industrial-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Treat the headline as a forecast. Review definitions, productivity and automation metrics, company examples and comparative baselines, then evaluate against later robotics adoption, advanced-manufacturing output and industrial-policy evidence.",
  }),
  candidate({
    id: "lead-2019-reuters-yuan-seven-dollar",
    title: "Yuan weakens beyond seven per dollar amid trade tensions",
    url: "https://www.reuters.com/article/us-china-markets/china-lets-yuan-break-key-7-level-for-first-time-in-decade-as-trade-war-worsens-idUSKCN1UV061",
    publisher: "Reuters",
    publishedAt: "2019-08-05",
    contentType: "reporting",
    topics: ["yuan", "exchange-rate", "markets", "trade-war"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the PBOC fixing, onshore and offshore prices, intervention evidence and contemporaneous statements. Attribute causal interpretations, avoid treating the threshold as a policy mechanism by itself and add later exchange-rate movement.",
  }),
  candidate({
    id: "lead-2019-ieee-spectrum-china-supergrid",
    title: "China's plan to build the world's largest supergrid",
    url: "https://spectrum.ieee.org/chinas-ambitious-plan-to-build-the-worlds-biggest-supergrid",
    publisher: "IEEE Spectrum",
    publishedAt: "2019-02-21",
    byline: "Peter Fairley",
    contentType: "analysis",
    topics: ["electric-grid", "uhv", "energy", "infrastructure"],
    urlStatus: "redirect-resolved",
    notes:
      "Separate proposed, approved, operating and international grid elements. Review line-level capacity, losses, utilization, economics, environmental effects and interregional governance using utility, regulator and independent technical sources plus later project outcomes.",
  }),
  candidate({
    id: "lead-2016-marketwatch-china-circuit-breaker",
    title: "China halts stock trading after another 7% plunge",
    url: "https://www.marketwatch.com/story/china-stock-trading-halted-early-after-7-plunge-2016-01-06",
    publisher: "MarketWatch",
    publishedAt: "2016-01-07",
    contentType: "reporting",
    topics: ["stock-market", "circuit-breaker", "trading", "financial-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review exchange timestamps, index moves and circuit-breaker rules, plus currency and policy context. Include the subsequent suspension of the mechanism and distinguish correlation, trader accounts and demonstrated causes of the decline.",
  }),
  candidate({
    id: "lead-2019-bloomberg-magic-leap-trade-secret-suit",
    title: "Magic Leap alleges former engineer copied headset technology",
    url: "https://www.bloomberg.com/news/articles/2019-06-18/secretive-magic-leap-says-ex-engineer-copied-headset-for-china",
    publisher: "Bloomberg",
    publishedAt: "2019-06-18",
    contentType: "reporting",
    topics: ["magic-leap", "trade-secrets", "litigation", "augmented-reality"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the complaint, exhibits, defense, procedural history and final disposition. Preserve every claim as an allegation unless adjudicated and distinguish copying evidence, competitive plans and any asserted connection to China.",
  }),
] as const;
