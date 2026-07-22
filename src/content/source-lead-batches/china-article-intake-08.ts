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
  collectionId: "china-article-corpus-2026-07-08",
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

/** Eighth neutral article-candidate batch. Discovery-platform data is intentionally absent. */
export const chinaArticleIntake08 = [
  candidate({
    id: "lead-2017-wsj-twelve-days-xinjiang",
    title:
      "Twelve days in Xinjiang: how China's surveillance state overwhelms daily life",
    url: "https://www.wsj.com/articles/twelve-days-in-xinjiang-how-chinas-surveillance-state-overwhelms-daily-life-1513700355",
    publisher: "The Wall Street Journal",
    publishedAt: "2017-12-19",
    contentType: "reporting",
    topics: ["xinjiang", "surveillance", "daily-life", "policing"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the full travel account, itinerary, observation protocol, translations and contemporaneous legal rules. Separate directly observed encounters from inference, protect vulnerable people, obtain government responses, and add later documentation of detention, biometric collection and surveillance procurement.",
  }),
  candidate({
    id: "lead-2009-microsoft-juku-statement",
    title:
      "Microsoft statement regarding MSN China joint venture's Juku feature",
    url: "https://news.microsoft.com/source/2009/12/15/microsoft-statement-regarding-msn-china-joint-ventures-juku-feature/",
    publisher: "Microsoft",
    publishedAt: "2009-12-15",
    contentType: "primary",
    topics: ["microsoft", "msn-china", "juku", "software-copying"],
    urlStatus: "redirect-resolved",
    notes:
      "The live first-party statement says a vendor acknowledged copied code, Microsoft suspended the beta and apologized to Plurk. Review Plurk's technical comparison and preserved code, the vendor and joint-venture structure, contemporaneous independent reporting and any later resolution; do not treat Microsoft's account as independent adjudication.",
  }),
  candidate({
    id: "lead-2015-nanfang-bing-english-search-china",
    title: "Bing features skewed English-language search results in China",
    url: "https://thenanfang.com/search-engine-bing-com-featuring-skewed-results-china/",
    publisher: "The Nanfang",
    publicationYear: 2015,
    contentType: "reporting",
    topics: ["bing", "search", "censorship", "measurement"],
    urlStatus: "publisher-canonical",
    notes:
      "Reproduce the exact queries, dates, interface language, account state, domain and location from controlled vantage points. Archive result pages, compare domestic and external endpoints, identify personalization and index effects, obtain Microsoft and regulator responses, and avoid generalizing from a small query sample.",
  }),
  candidate({
    id: "lead-2018-wsj-technology-transfer-us-companies",
    title: "How China systematically pries technology from U.S. companies",
    url: "https://www.wsj.com/articles/how-china-systematically-pries-technology-from-u-s-companies-1537972066",
    publisher: "The Wall Street Journal",
    publishedAt: "2018-09-26",
    contentType: "reporting",
    topics: [
      "technology-transfer",
      "joint-ventures",
      "trade",
      "industrial-policy",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review every company example against contracts, administrative rules, court or trade records and responses from the firms and Chinese authorities. Distinguish formal requirements, bargaining pressure, licensing, theft and ordinary commercial exchange; add post-2018 legal and policy developments.",
  }),
  candidate({
    id: "lead-2016-bloomberg-government-social-post-estimate",
    title: "China seen fabricating hundreds of millions of social-media posts",
    url: "https://www.bloomberg.com/news/articles/2016-05-19/china-seen-faking-488-million-internet-posts-to-divert-criticism",
    publisher: "Bloomberg",
    publishedAt: "2016-05-19",
    contentType: "reporting",
    topics: [
      "social-media",
      "propaganda",
      "research-methods",
      "content-analysis",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Start with the King, Pan and Roberts paper and its leaked-email corpus. Reconcile the supplied headline's 488 million figure with the paper's 448 million estimate, document extrapolation and uncertainty, distinguish government-authored distraction from false factual content, and review later scholarship and official response.",
  }),
  candidate({
    id: "lead-2025-bbc-uk-university-china-research-pressure",
    title:
      "China intimidated UK university to ditch human-rights research, documents show",
    url: "https://www.bbc.com/news/articles/cq50j5vwny6o",
    publisher: "BBC News",
    publicationYear: 2025,
    contentType: "reporting",
    topics: [
      "universities",
      "academic-freedom",
      "human-rights",
      "foreign-pressure",
    ],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "The publisher page was blocked from automated review. Retrieve the complete article and underlying documents lawfully, establish who communicated with whom and what changed, include university, researcher and Chinese responses, and distinguish documented pressure from causal claims about a research decision.",
  }),
  candidate({
    id: "lead-2016-nyt-adups-phone-data-transfer",
    title:
      "Secret backdoor in some U.S. phones sent data to China, analysts say",
    url: "https://www.nytimes.com/2016/11/16/us/politics/china-phones-software-security.html",
    publisher: "The New York Times",
    publishedAt: "2016-11-15",
    contentType: "reporting",
    topics: ["adups", "mobile-security", "firmware", "data-transfers"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review Kryptowire's report and reproducible indicators, affected firmware versions and device population, data fields and endpoints, manufacturer, carrier, Adups and government responses, intent versus capability, remediation and later technical or regulatory findings.",
  }),
  candidate({
    id: "lead-2020-ctv-wildlife-consumption-decision",
    title: "China bans consumption and trade of wild animals",
    url: "https://www.ctvnews.ca/sci-tech/china-bans-human-consumption-and-trade-of-wild-animals-1.4824540",
    publisher: "CTV News",
    publishedAt: "2020-02-24",
    contentType: "reporting",
    topics: ["wildlife", "public-health", "law", "animal-trade"],
    urlStatus: "redirect-resolved",
    notes:
      "Use the National People's Congress Standing Committee decision as the controlling record. Define consumption, trade, terrestrial wildlife, exemptions and enforcement; distinguish the emergency decision from later Wildlife Protection Law revisions and assess implementation without implying that every wildlife trade was prohibited.",
  }),
  candidate({
    id: "lead-2020-axios-hong-kong-autonomy-certification",
    title: "Pompeo tells Congress Hong Kong is no longer autonomous from China",
    url: "https://www.axios.com/2020/05/27/pompeo-hong-kong-autonomous-china",
    publisher: "Axios",
    publishedAt: "2020-05-27",
    contentType: "reporting",
    topics: ["hong-kong", "autonomy", "united-states", "national-security-law"],
    urlStatus: "redirect-resolved",
    notes:
      "Review the secretary of state's statutory certification, the Hong Kong Policy Act criteria and announced national-security legislation. Treat 'no longer autonomous' as a U.S. government determination, document Chinese and Hong Kong responses, resulting measures and later legal developments.",
  }),
  candidate({
    id: "lead-2021-bbc-three-child-policy",
    title: "China allows couples to have three children",
    url: "https://www.bbc.com/news/world-asia-china-57303592",
    publisher: "BBC News",
    publishedAt: "2021-05-31",
    contentType: "reporting",
    topics: ["population", "family-policy", "fertility", "demography"],
    urlStatus: "publisher-canonical",
    notes:
      "Distinguish the Politburo announcement from August 2021 legislation and local implementation. Review census and fertility denominators, enforcement legacies, support measures, public response evidence and subsequent births rather than attributing demographic change to one policy alone.",
  }),
  candidate({
    id: "lead-2017-diplomat-real-name-online-comments",
    title:
      "China's new wave of internet censorship: name verification for online commenting",
    url: "https://thediplomat.com/2017/08/chinas-new-wave-of-internet-censorship-name-verification-for-online-commenting/",
    publisher: "The Diplomat",
    publishedAt: "2017-08-30",
    contentType: "analysis",
    topics: [
      "real-name-registration",
      "online-comments",
      "cac",
      "internet-regulation",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Start with the CAC provisions and an authoritative translation. Define which services and account functions were covered, distinguish platform verification from public display of identity, document implementation and penalties, and compare earlier real-name rules and later enforcement.",
  }),
  candidate({
    id: "lead-2021-nikkei-taiwan-recruitment-china",
    title: "Taiwan bans recruitment for jobs in China to combat brain drain",
    url: "https://asia.nikkei.com/Business/Tech/Semiconductors/Taiwan-bans-recruitment-for-jobs-in-China-to-combat-brain-drain",
    publisher: "Nikkei Asia",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["taiwan", "semiconductors", "recruitment", "labor-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Retrieve the labor ministry order and legal basis, exact territorial and occupational scope, duration and penalties. Distinguish recruitment advertising by intermediaries from workers taking jobs, include employer and worker responses, enforcement data and later policy changes.",
  }),
  candidate({
    id: "lead-2018-nature-open-access-plan",
    title: "China backs bold plan to tear down journal paywalls",
    url: "https://www.nature.com/articles/d41586-018-07659-5",
    publisher: "Nature",
    publishedAt: "2018-12-05",
    contentType: "reporting",
    topics: ["open-access", "research-publishing", "plan-s", "science-policy"],
    urlStatus: "publisher-canonical",
    notes:
      "Identify the Chinese officials and institutions whose statements were described as support, and separate endorsement from binding national policy. Review Plan S terms, domestic journal economics, repository practice, implementation dates and later Chinese open-access policy.",
  }),
  candidate({
    id: "lead-2016-wapo-censorship-innovation",
    title:
      "China challenges the idea that censorship thwarts online innovation",
    url: "https://www.washingtonpost.com/world/asia_pacific/america-wants-to-believe-china-cant-innovate-tech-tells-a-different-story/2016/07/19/c17cbea9-6ee6-479c-81fa-54051df598c5_story.html",
    publisher: "The Washington Post",
    publishedAt: "2016-07-19",
    contentType: "analysis",
    topics: ["innovation", "censorship", "internet-industry", "technology"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Treat the censorship-innovation relationship as an analytical question, not a binary result. Review company selection, market size, investment, competition and output metrics; address protectionism, copied and original products, excluded failures, speech costs and developments since 2016.",
  }),
  candidate({
    id: "lead-2018-scmp-rain-making-system",
    title: "China plans a rain-making system three times the size of Spain",
    url: "https://www.scmp.com/news/china/society/article/2138866/china-needs-more-water-so-its-building-rain-making-network-three",
    publisher: "South China Morning Post",
    publishedAt: "2018-03-26",
    contentType: "reporting",
    topics: [
      "weather-modification",
      "water",
      "tibetan-plateau",
      "climate-science",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Separate proposed coverage area from construction and measured rainfall. Review project approvals, budget, burner and aircraft mechanisms, study design, atmospheric prerequisites, environmental and transboundary concerns, expert skepticism and subsequent operating evidence.",
  }),
  candidate({
    id: "lead-2019-reuters-fedex-export-controls-lawsuit",
    title:
      "FedEx sues U.S. government over 'impossible' task of policing exports to China",
    url: "https://www.reuters.com/article/us-huawei-tech-fedex-usa/fedex-sues-u-s-government-over-impossible-task-of-policing-exports-to-china-idUSKCN1TO047",
    publisher: "Reuters",
    publishedAt: "2019-06-24",
    contentType: "reporting",
    topics: ["fedex", "export-controls", "huawei", "litigation"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Use the complaint, challenged Export Administration Regulations and later docket outcome. Attribute the 'impossible' characterization to FedEx, distinguish carrier screening duties from strict liability, and include Commerce Department, Huawei and Chinese responses.",
  }),
  candidate({
    id: "lead-2017-atlantic-china-fast-seti",
    title: "China's race to find aliens first",
    url: "https://www.theatlantic.com/magazine/archive/2017/12/what-happens-if-china-makes-first-contact/544131/",
    publisher: "The Atlantic",
    publishedAt: "2017-11-08",
    contentType: "reporting",
    topics: ["fast", "seti", "astronomy", "science-culture"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review FAST's actual observing capabilities and SETI program, interview context, telescope governance and relocation impacts. Separate scientific search from speculation about first contact, compare other facilities and add later surveys, discoveries and access arrangements.",
  }),
  candidate({
    id: "lead-2018-cryptographyengineering-icloud-china-keys",
    title: "Apple in China: who holds the keys?",
    url: "https://blog.cryptographyengineering.com/2018/01/16/icloud-in-china/",
    publisher: "A Few Thoughts on Cryptographic Engineering",
    publishedAt: "2018-01-16",
    byline: "Matthew Green",
    contentType: "analysis",
    topics: ["apple", "icloud", "encryption", "data-localization"],
    urlStatus: "publisher-canonical",
    notes:
      "Technical analysis must be paired with Apple's security documentation, customer notices, Guizhou-Cloud Big Data arrangements, applicable law and later reporting. Identify which services and account regions are covered, distinguish key custody from plaintext access, and note unknown implementation details.",
  }),
  candidate({
    id: "lead-2019-daring-fireball-cook-china-pressure",
    title: "Cook: 'China hasn't pressured us'",
    url: "https://daringfireball.net/linked/2019/11/21/cook-china-pressure",
    publisher: "Daring Fireball",
    publishedAt: "2019-11-21",
    contentType: "analysis",
    topics: ["apple", "tim-cook", "corporate-governance", "china"],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected as a short derivative commentary item rather than a standalone evidentiary article. Any future review should begin with the complete interview, Apple's decisions and primary company or regulatory records.",
    notes:
      "Do not convert the linked-item framing into a Dispatch. Preserve the distinction between Cook's attributed statement, the commentator's interpretation and independently documented Apple decisions.",
  }),
  candidate({
    id: "lead-2018-wsj-electric-commercial-vehicles",
    title: "China has an early lead on electric commercial vehicles",
    url: "https://www.wsj.com/articles/china-has-early-lead-on-electric-commercial-vehicles-1543755601",
    publisher: "The Wall Street Journal",
    publishedAt: "2018-12-02",
    contentType: "reporting",
    topics: ["electric-vehicles", "buses", "trucks", "industrial-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Recover the cited fleet and sales datasets with vehicle-class, geography and date definitions. Review subsidies, procurement, battery supply, utilization and emissions assumptions, compare international deployment and add later market-share and policy evidence.",
  }),
  candidate({
    id: "lead-2018-phys-pollution-crackdown-trash",
    title: "Trash piles up in U.S. as China closes door to recycling",
    url: "https://phys.org/news/2018-07-trash-piles-china-door-recycling.html",
    publisher: "Phys.org / AFP",
    publishedAt: "2018-07-12",
    contentType: "reporting",
    topics: ["recycling", "waste-trade", "national-sword", "united-states"],
    urlStatus: "publisher-canonical",
    notes:
      "This is syndicated reporting. Start with China's WTO notifications and contamination standards, then use customs and municipal waste data to quantify effects. Distinguish collection, sorting, export, landfill and illegal disposal; add capacity changes, later import restrictions and affected-country responses.",
  }),
  candidate({
    id: "lead-2023-economist-taiwan-disinformation",
    title: "China is flooding Taiwan with disinformation",
    url: "https://www.economist.com/asia/2023/09/26/china-is-flooding-taiwan-with-disinformation",
    publisher: "The Economist",
    publishedAt: "2023-09-26",
    contentType: "reporting",
    topics: ["taiwan", "disinformation", "attribution", "elections"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review every campaign example, platform dataset and attribution method, including false-positive risk and domestic amplification. Separate coordinated behavior, state-media narratives and ordinary political speech; seek Taiwan, platform and Chinese responses and evaluate reach or effect only where measured.",
  }),
  candidate({
    id: "lead-2015-reuters-china-stocks-drop-july",
    title: "China stocks drop more than 8 percent",
    url: "https://www.reuters.com/article/us-markets-china-stocks/china-stocks-drop-more-than-8-percent-in-biggest-one-day-fall-since-2007-idUSKCN0Q10KE20150727",
    publisher: "Reuters",
    publishedAt: "2015-07-27",
    contentType: "reporting",
    topics: ["stock-market", "market-data", "intervention", "economy"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Reproduce index, close, prior close, trading session and comparison window from exchange data. Document suspension breadth, leverage and state-support context, distinguish contemporaneous explanations from demonstrated causes, and add the subsequent market and regulatory chronology.",
  }),
  candidate({
    id: "lead-2022-npr-uyghur-boarding-schools",
    title:
      "Uyghur children detail abuse at China's boarding schools in Xinjiang",
    url: "https://www.npr.org/2022/02/03/1073793823/china-uyghur-children-xinjiang-boarding-school",
    publisher: "NPR",
    publishedAt: "2022-02-03",
    contentType: "reporting",
    topics: ["xinjiang", "uyghur-children", "boarding-schools", "testimony"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "The publisher page was blocked from automated review. Apply trauma-informed handling to testimony from minors, review interview and translation methods, corroborate institutions and policies with records and imagery, include Chinese responses, and avoid extrapolating prevalence from an unrepresentative witness sample.",
  }),
  candidate({
    id: "lead-2016-sentinel-norway-one-china-normalization",
    title: "China forces Norway to adhere to 'One China' policy",
    url: "https://sentinel.tw/norway-one-china-policy/",
    publisher: "Taiwan Sentinel",
    publicationYear: 2016,
    contentType: "analysis",
    topics: ["norway", "taiwan", "one-china-policy", "diplomacy"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the December 2016 Norway-China normalization statement and both governments' wording. Distinguish Norway's prior position from any new concession, attribute coercion claims, include the Nobel-related diplomatic freeze and later policy practice, and compare 'One China' formulations precisely.",
  }),
  candidate({
    id: "lead-2017-msn-factory-pollution-crackdown",
    title:
      "China temporarily shuts down thousands of factories in pollution crackdown",
    url: "https://www.msn.com/en-us/news/world/china-shuts-down-tens-of-thousands-of-factories-in-widespread-pollution-crackdown/ar-AAtZIqD",
    publisher: "MSN",
    publicationYear: 2017,
    contentType: "reporting",
    topics: ["pollution", "factories", "enforcement", "industry"],
    accessStatus: "unavailable",
    disposition: "rejected",
    decisionReason:
      "Rejected because the syndicated page is unavailable, its original publisher and text cannot be authenticated from the supplied URL, and the broad shutdown count is not traceable here to a defined official dataset. Primary inspection records and accessible original reporting are better candidates.",
    notes:
      "Do not reuse circulating percentages or shutdown totals without facility definitions, inspection dates and enforcement outcomes. Separate environmental, safety and overcapacity closures and distinguish temporary suspensions from permanent shutdowns.",
  }),
  candidate({
    id: "lead-2019-nature-livestock-antimicrobial-resistance",
    title:
      "Alarm as antimicrobial resistance surges among chickens, pigs and cattle",
    url: "https://www.nature.com/articles/d41586-019-02861-5",
    publisher: "Nature",
    publishedAt: "2019-09-20",
    byline: "Emiliano Rodríguez Mega",
    contentType: "research",
    topics: ["antimicrobial-resistance", "livestock", "india", "china"],
    urlStatus: "publisher-canonical",
    notes:
      "The article reports on a Science modeling study, not a complete surveillance census. Review the underlying literature database, resistance metric, species, drug classes, spatial model, coverage bias and uncertainty; use the article's narrower northeast-China wording and add later surveillance and policy evidence.",
  }),
  candidate({
    id: "lead-2017-nyt-apple-vpn-opinion",
    title: "Apple's silence in China sets a dangerous precedent",
    url: "https://www.nytimes.com/2017/07/31/technology/apple-vpn-china-dangerous-precedent.html",
    publisher: "The New York Times",
    publishedAt: "2017-07-31",
    contentType: "analysis",
    topics: ["apple", "vpn", "app-store", "corporate-responsibility"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Treat this as an opinion argument. Review the author's role and evidence, Apple's removal notices and statements, applicable licensing rules, affected apps and availability, developer responses and later transparency reports; keep normative analysis distinct from verified events.",
  }),
  candidate({
    id: "lead-2020-taiwan-news-foreign-gaming-chat-claim",
    title: "Claim that China would ban online gaming and chat with foreigners",
    url: "https://www.taiwannews.com.tw/en/news/3916690",
    publisher: "Taiwan News",
    publishedAt: "2020-04-15",
    contentType: "reporting",
    topics: [
      "online-games",
      "cross-border-chat",
      "regulation",
      "misinformation",
    ],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected as materially overstated. The article relied on a chain leading to a gaming-forum claim and described local drafting as a nationwide enacted ban; no controlling national rule establishing the headline claim was identified.",
    notes:
      "A future Dispatch should examine the rumor's transmission and compare it with actual game-approval, real-name, content and minors' play-time rules. It must not restate the supplied claim as policy.",
  }),
  candidate({
    id: "lead-2015-weibo-tianjin-explosion-video",
    title: "Video said to show an explosion in Tianjin",
    url: "http://video.weibo.com/show?fid=1034:f2df4e43a94dc5caa90960ecf2b89c44",
    publisher: "Weibo",
    publishedAt: "2015-08-12",
    contentType: "primary",
    topics: ["tianjin", "explosion", "video", "verification"],
    accessStatus: "unstable",
    disposition: "rejected",
    decisionReason:
      "Rejected as an unstable audiovisual artifact rather than a durable article. The supplied page alone does not establish uploader, capture time, location, edit history or chain of custody, and storing or paraphrasing it would not support an evidence-led Dispatch.",
    notes:
      "If the Tianjin explosions are reviewed later, begin with official investigation and court records, verified contemporaneous footage and independent reporting. Preserve casualties, chemical hazards, accountability and uncertainty with dated sources.",
  }),
] as const;
