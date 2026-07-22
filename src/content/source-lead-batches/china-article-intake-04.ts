type Candidate = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt?: string;
  publicationYear?: number;
  contentType: "primary" | "reporting" | "analysis";
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
  collectionId: "china-article-corpus-2026-07-04",
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
      ? "Full publisher text was not available for lawful review. Withheld before source-read pending authorized access, primary records, and independent corroboration."
      : "Publisher metadata was checked, but the complete article and supporting evidence have not yet passed source review. Withheld before source-read."),
});

/** Fourth neutral article-candidate batch. Discovery-platform metadata is never retained. */
export const chinaArticleIntake04 = [
  candidate({
    id: "lead-2021-axios-exchange-cyberattacks",
    title:
      "U.S. and key allies accuse China of Microsoft Exchange cyberattacks",
    url: "https://www.axios.com/china-cyberattacks-nato-181e71d2-7414-45f3-9463-c8b1d46392c1.html",
    publisher: "Axios",
    publishedAt: "2021-07-19",
    contentType: "reporting",
    topics: ["cybersecurity", "microsoft-exchange", "attribution", "diplomacy"],
    accessStatus: "restricted",
    notes:
      "Treat government attribution as attributed, not independently proven. Review the joint statements, indictments, technical indicators, named actor distinctions, and China's response.",
  }),
  candidate({
    id: "lead-2018-nyt-ai-shame-cameras",
    title: "Inside China’s Dystopian Dreams: A.I., Shame and Lots of Cameras",
    url: "https://www.nytimes.com/2018/07/08/business/china-surveillance-technology.html",
    publisher: "The New York Times",
    publishedAt: "2018-07-08",
    contentType: "reporting",
    topics: ["surveillance", "facial-recognition", "policing", "privacy"],
    accessStatus: "paywalled",
    notes:
      "Separate observed deployments, vendor demonstrations, official aspirations, and rhetorical framing. Later procurement records and system-performance evidence are required.",
  }),
  candidate({
    id: "lead-2014-reuters-windows-8-ban",
    title: "China bans use of Windows 8 on government computers",
    url: "https://www.reuters.com/article/2014/05/20/us-microsoft-china-idUSBREA4J07Q20140520",
    publisher: "Reuters",
    publishedAt: "2014-05-20",
    contentType: "reporting",
    topics: ["windows", "government-procurement", "cybersecurity", "microsoft"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Locate the controlling procurement notice and distinguish central-government purchasing rules from a nationwide product ban; include Microsoft's response and later localization policy.",
  }),
  candidate({
    id: "lead-2010-google-china-update",
    title: "A new approach to China: an update",
    url: "https://googleblog.blogspot.com/2010/03/new-approach-to-china-update.html",
    publisher: "Google",
    publishedAt: "2010-03-22",
    byline: "David Drummond",
    contentType: "primary",
    topics: ["google", "search", "censorship", "hong-kong"],
    urlStatus: "publisher-canonical",
    notes:
      "A company statement is primary evidence for Google's decision and framing, not independent evidence for disputed attack attribution. Reconstruct redirects, licensing, government response, and later service availability.",
  }),
  candidate({
    id: "lead-2018-balding-leaving-china",
    title: "Balding Out",
    url: "https://www.baldingsworld.com/2018/07/17/balding-out/",
    publisher: "Balding's World",
    publishedAt: "2018-07-17",
    contentType: "analysis",
    topics: ["academia", "expatriate-life", "speech", "personal-essay"],
    urlStatus: "publisher-canonical",
    notes:
      "First-person commentary can support only the author's account and interpretation. Verify institutional facts and avoid generalizing one departure into conditions for all foreign scholars.",
  }),
  candidate({
    id: "lead-2023-wired-myopia-taiwan",
    title: "The World Is Going Blind. Taiwan Offers a Warning, and a Cure",
    url: "https://www.wired.com/story/taiwan-epicenter-of-world-myopia-epidemic/",
    publisher: "Wired",
    publishedAt: "2023-08-22",
    byline: "Amit Katwala",
    contentType: "reporting",
    topics: ["myopia", "public-health", "taiwan", "education"],
    urlStatus: "publisher-canonical",
    notes:
      "The supplied headline overstates a specific blindness ranking. Review epidemiological definitions, age cohorts, causal evidence, treatment effects, and primary studies before making cross-country claims.",
  }),
  candidate({
    id: "lead-2020-dw-us-arrest-warning",
    title: "US citizens warned they face arbitrary arrest in China",
    url: "https://www.dw.com/en/china-us-arrest/a-54144205",
    publisher: "Deutsche Welle",
    publishedAt: "2020-07-11",
    contentType: "reporting",
    topics: ["travel-advisory", "detention", "diplomacy", "law"],
    urlStatus: "redirect-resolved",
    notes:
      "Anchor the claim to the dated U.S. advisory, quote its scope carefully, include China's response, and check subsequent advisory changes and documented cases.",
  }),
  candidate({
    id: "lead-2019-bbc-tiananmen-forgettance",
    title: "Tiananmen 30 years on – China's great act of 'forgettance'",
    url: "https://www.bbc.com/news/blogs-china-blog-48455582",
    publisher: "BBC News",
    publishedAt: "2019-06-04",
    contentType: "analysis",
    topics: ["tiananmen", "memory", "censorship", "history"],
    urlStatus: "publisher-canonical",
    notes:
      "Preserve the essay's interpretive character. Corroborate censorship practices, education policy, commemoration restrictions, and generational survey claims with dated records.",
  }),
  candidate({
    id: "lead-2018-thread-mirror-google-censorship",
    title:
      "Ex-Google engineer describing the company's role in China censorship",
    url: "https://threader.app/thread/1051725524064591872",
    publisher: "Threader",
    publicationYear: 2018,
    contentType: "analysis",
    topics: ["google", "censorship", "archival-integrity"],
    accessStatus: "unstable",
    disposition: "rejected",
    decisionReason:
      "Rejected as a derivative thread mirror with no stable, reviewable canonical article. Any underlying first-person claims require the original record and independent verification.",
    notes:
      "The endpoint exposes a generic mirror shell rather than a stable publisher article. Do not build a Dispatch from a headline or reconstructed social thread.",
  }),
  candidate({
    id: "lead-2023-ars-pinduoduo-zero-day",
    title:
      "Android app from China executed 0-day exploit on millions of devices",
    url: "https://arstechnica.com/information-technology/2023/03/android-app-from-china-executed-0-day-exploit-on-millions-of-devices/",
    publisher: "Ars Technica",
    publishedAt: "2023-03-27",
    contentType: "reporting",
    topics: ["android", "pinduoduo", "zero-day", "mobile-security"],
    urlStatus: "publisher-canonical",
    notes:
      "Trace claims to technical analyses, affected versions, exploit behavior, distribution counts, Google actions, and company response. National origin is context, not evidence of state direction.",
  }),
  candidate({
    id: "lead-2019-wsj-mac-pro-production",
    title: "Apple Moves Mac Pro Production to China",
    url: "https://www.wsj.com/articles/apple-moves-mac-pro-production-to-china-11561728769",
    publisher: "The Wall Street Journal",
    publishedAt: "2019-06-28",
    contentType: "reporting",
    topics: ["apple", "mac-pro", "manufacturing", "supply-chain"],
    accessStatus: "paywalled",
    notes:
      "A 2019 sourcing report requires later-development context: Apple subsequently announced U.S. Mac Pro manufacturing. Separate component sourcing, assembly location, model generation, and policy negotiations.",
  }),
  candidate({
    id: "lead-2018-medium-hot-sauce-china",
    title: "What I Learned From Making Hot Sauce at Scale in China",
    url: "https://medium.com/@jingtheory/what-i-learned-from-making-hot-sauce-at-scale-2cbb8ec709ba",
    publisher: "Jing Theory / Medium",
    publicationYear: 2018,
    contentType: "analysis",
    topics: [
      "food-manufacturing",
      "entrepreneurship",
      "supply-chain",
      "first-person",
    ],
    accessStatus: "restricted",
    notes:
      "Treat operational lessons as first-person experience. Verify factory, regulatory, testing, cost, and scale claims; do not generalize one production run to Chinese manufacturing broadly.",
  }),
  candidate({
    id: "lead-2019-foreign-policy-us-surveillance-firms",
    title: "U.S. Firms Are Helping Build China's Orwellian State",
    url: "https://foreignpolicy.com/2019/03/19/962492-orwell-china-socialcredit-surveillance/",
    publisher: "Foreign Policy",
    publishedAt: "2019-03-19",
    byline: "Lindsay Gorman and Matt Schrader",
    contentType: "analysis",
    topics: ["surveillance", "us-companies", "exports", "human-rights"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Map each named company's product, sale, intermediary, deployment, date, and response. Distinguish surveillance systems from the many local and sectoral programs often grouped under social credit.",
  }),
  candidate({
    id: "lead-2021-bbc-uyghur-speaking-up",
    title: "The cost of speaking up against China",
    url: "https://www.bbc.com/news/world-asia-china-56563449",
    publisher: "BBC News",
    publishedAt: "2021-03-31",
    contentType: "reporting",
    topics: ["uyghurs", "diaspora", "family-separation", "human-rights"],
    urlStatus: "publisher-canonical",
    notes:
      "Handle testimony with care and attribution. Seek documentary corroboration where safe, include official responses, and avoid exposing vulnerable people through unnecessary personal detail.",
  }),
  candidate({
    id: "lead-2018-mainichi-gene-edited-babies",
    title: "First gene-edited babies claimed in China",
    url: "https://mainichi.jp/english/articles/20181126/p2g/00m/0fe/047000c",
    publisher: "The Mainichi",
    publishedAt: "2018-11-26",
    contentType: "reporting",
    topics: ["gene-editing", "crispr", "bioethics", "research-governance"],
    urlStatus: "redirect-resolved",
    notes:
      "This was an initial claim. Incorporate subsequent confirmation, scientific criticism, investigation, court outcome, participant privacy, and changes to Chinese bioethics governance.",
  }),
  candidate({
    id: "lead-2016-wired-google-china-experience",
    title: "When It Comes to China, Google’s Experience Still Says It All",
    url: "https://www.wired.com/2016/08/when-it-comes-to-china-googles-experience-still-says-it-all/",
    publisher: "Wired",
    publishedAt: "2016-08-03",
    byline: "Steven Levy",
    contentType: "analysis",
    topics: ["google", "censorship", "search", "corporate-strategy"],
    urlStatus: "publisher-canonical",
    notes:
      "The supplied Backchannel address now resolves to a dead page; this is the publisher's live successor. Review the essay against Google's statements, licensing history, and later reported China projects.",
  }),
  candidate({
    id: "lead-2019-nyt-ecuador-surveillance-export",
    title: "Made in China, Exported to the World: The Surveillance State",
    url: "https://www.nytimes.com/2019/04/24/technology/ecuador-surveillance-cameras-police-government.html",
    publisher: "The New York Times",
    publishedAt: "2019-04-24",
    contentType: "reporting",
    topics: ["ecuador", "surveillance-exports", "cameras", "public-security"],
    accessStatus: "paywalled",
    notes:
      "Verify contracts, financing, system ownership, operator practice, crime claims, maintenance, and Ecuadorian and supplier responses. Technology export does not by itself establish identical political use.",
  }),
  candidate({
    id: "lead-2010-wapo-google-reporting-instructions",
    title: "China's instructions on reporting on Google",
    url: "https://www.washingtonpost.com/wp-dyn/content/article/2010/03/24/AR2010032402511.html",
    publisher: "The Washington Post",
    publishedAt: "2010-03-24",
    contentType: "reporting",
    topics: ["google", "media-directives", "censorship", "journalism"],
    urlStatus: "redirect-resolved",
    notes:
      "Authenticate the reported directives, distinguish central and local instructions, preserve uncertainty about provenance, and place them in the March 2010 Google dispute chronology.",
  }),
  candidate({
    id: "lead-2021-theprint-flightradar24",
    title:
      "China says Indian 'govt-backed' group Evil Flower is attacking it, shuts down airlines data",
    url: "https://theprint.in/opinion/chinascope/china-says-indian-govt-backed-group-evil-flower-is-attacking-it-shuts-down-airlines-data/762663/",
    publisher: "ThePrint",
    publishedAt: "2021-11-08",
    byline: "Aadil Brar",
    contentType: "analysis",
    topics: ["flightradar24", "flight-data", "cybersecurity", "india"],
    urlStatus: "publisher-canonical",
    notes:
      "The supplied shorthand headline is not the article title. Separate official accusations, the flight-data application's removal, cybersecurity claims, and evidence for alleged Indian government backing.",
  }),
  candidate({
    id: "lead-2020-intercept-zoom-encryption",
    title:
      "Zoom’s Encryption Is 'Not Suited for Secrets' and Has Surprising Links to China, Researchers Discover",
    url: "https://theintercept.com/2020/04/03/zooms-encryption-is-not-suited-for-secrets-and-has-surprising-links-to-china-researchers-discover/",
    publisher: "The Intercept",
    publishedAt: "2020-04-03",
    byline: "Micah Lee",
    contentType: "reporting",
    topics: ["zoom", "encryption", "routing", "security"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the Citizen Lab paper, Zoom's response and remediation, key-routing evidence, terminology corrections, and the 2020 product version. Do not imply current behavior from a dated flaw.",
  }),
  candidate({
    id: "lead-2019-techcrunch-reddit-tencent",
    title: "Reddit raises $300 million from Tencent at $3 billion value",
    url: "https://techcrunch.com/2019/02/11/reddit-300-million/",
    publisher: "TechCrunch",
    publishedAt: "2019-02-11",
    byline: "Josh Constine",
    contentType: "reporting",
    topics: ["reddit", "tencent", "venture-capital", "ownership"],
    urlStatus: "publisher-canonical",
    notes:
      "Verify financing documents and investor share where available. Investment does not establish editorial control; distinguish valuation, capital raised, ownership percentage, governance rights, and later corporate changes.",
  }),
  candidate({
    id: "lead-2016-nyt-automation-jobs",
    title: "The Long-Term Jobs Killer Is Not China. It’s Automation.",
    url: "https://www.nytimes.com/2016/12/21/upshot/the-long-term-jobs-killer-is-not-china-its-automation.html",
    publisher: "The New York Times",
    publishedAt: "2016-12-21",
    contentType: "analysis",
    topics: ["automation", "manufacturing-jobs", "trade", "labor-economics"],
    accessStatus: "paywalled",
    notes:
      "Avoid a single-cause frame. Review cited models, time periods, sector and regional effects, counterfactuals, subsequent literature, and the different mechanisms of trade exposure and automation.",
  }),
  candidate({
    id: "lead-2017-dailymail-baojun-ev",
    title: "GM unveils $5K EV in China",
    url: "https://www.dailymail.com/sciencetech/article-4776002/GM-unveils-5K-EV-Tesla-affordable-Model-3.html",
    publisher: "Daily Mail",
    publishedAt: "2017-08-10",
    contentType: "reporting",
    topics: ["electric-vehicles", "baojun", "gm", "urban-mobility"],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected as a derivative account where manufacturer material and higher-quality reporting should be reviewed directly. The comparison to Tesla is editorial framing rather than a sound product equivalence.",
    notes:
      "If revisited, use SAIC-GM-Wuling specifications and sales records, including price after incentives, range standard, vehicle class, market availability, and later model history.",
  }),
  candidate({
    id: "lead-2014-intercept-core-secrets",
    title: "Core Secrets: NSA Saboteurs in China and Germany",
    url: "https://theintercept.com/2014/10/10/core-secrets/",
    publisher: "The Intercept",
    publishedAt: "2014-10-10",
    contentType: "reporting",
    topics: ["nsa", "supply-chain-security", "surveillance", "documents"],
    urlStatus: "publisher-canonical",
    notes:
      "The supplied First Look URL is obsolete. Review the underlying documents, redactions, author interpretation, affected-company responses, operational chronology, and later official or technical corroboration.",
  }),
  candidate({
    id: "lead-2021-bbc-china-embassy-tweet",
    title: "Twitter deletes China embassy's Xinjiang 'emancipation' tweet",
    url: "https://www.bbc.com/news/world-asia-china-55608089",
    publisher: "BBC News",
    publishedAt: "2021-01-10",
    contentType: "reporting",
    topics: ["xinjiang", "platform-moderation", "diplomacy", "propaganda"],
    urlStatus: "publisher-canonical",
    notes:
      "Preserve the exact platform-policy basis, tweet chronology, embassy position, and wider evidentiary dispute. A deletion decision is not independent proof of every underlying human-rights claim.",
  }),
  candidate({
    id: "lead-2019-inkstone-xu-zhangrun-exit-ban",
    title:
      "Law professor who criticized President Xi Jinping barred from leaving China",
    url: "https://www.inkstonenews.com/politics/law-professor-xu-zhangrun-barred-leaving-china/article/3008103",
    publisher: "Inkstone",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["xu-zhangrun", "academia", "exit-ban", "speech"],
    urlStatus: "publisher-canonical",
    notes:
      "Verify the professor's account, university actions, legal basis or absence of notice, official response, and later detention and employment developments. Keep unconfirmed motives attributed.",
  }),
  candidate({
    id: "lead-2019-asia-times-maglev",
    title: "China laying tracks for 1,000km/h maglev trains",
    url: "https://asiatimes.com/2019/10/china-laying-tracks-for-1000km-h-maglev-trains/",
    publisher: "Asia Times",
    publishedAt: "2019-10-02",
    byline: "KG Chan",
    contentType: "reporting",
    topics: ["maglev", "transport", "research", "infrastructure"],
    urlStatus: "publisher-canonical",
    notes:
      "Treat speed and deployment as reported research goals unless test evidence shows otherwise. Verify track type, vacuum-tube distinction, prototype status, responsible institutes, funding, and later milestones.",
  }),
  candidate({
    id: "lead-2020-bloomberg-uk-hong-kong-citizenship",
    title: "U.K. Plans Citizenship for Hong Kong Residents in Row With China",
    url: "https://www.bloomberg.com/news/articles/2020-05-28/u-k-plans-citizenship-for-hong-kong-residents-in-row-with-china",
    publisher: "Bloomberg",
    publishedAt: "2020-05-28",
    contentType: "reporting",
    topics: ["hong-kong", "bno", "citizenship", "migration"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "This was a plan during a fast-changing policy sequence. Include the final BN(O) route, eligibility and dates, implementation data, later rule changes, and Chinese government response.",
  }),
  candidate({
    id: "lead-2018-la-times-trade-secret-theft",
    title:
      "China ‘has taken the gloves off’ in its thefts of U.S. technology secrets",
    url: "https://www.latimes.com/politics/la-na-pol-china-economic-espionage-20181116-story.html",
    publisher: "Los Angeles Times",
    publishedAt: "2018-11-16",
    contentType: "reporting",
    topics: [
      "trade-secrets",
      "economic-espionage",
      "technology",
      "law-enforcement",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "Separate allegations, charges, convictions, intelligence assessments, civil disputes, and broad national attribution. Review named cases, legal outcomes, methodology, business responses, and China's denials.",
  }),
  candidate({
    id: "lead-2019-zdnet-comac-c919-hacking",
    title:
      "Building China's Comac C919 airplane involved a lot of hacking, report says",
    url: "https://www.zdnet.com/article/building-chinas-comac-c919-airplane-involved-a-lot-of-hacking-report-says/",
    publisher: "ZDNet",
    publishedAt: "2019-10-15",
    contentType: "reporting",
    topics: ["comac", "c919", "cybersecurity", "aerospace"],
    urlStatus: "publisher-canonical",
    notes:
      "This is secondary reporting on a security-company account and U.S. cases. Follow the CrowdStrike report, indictments and outcomes, supplier evidence, COMAC and Chinese responses, and avoid converting alleged objectives into proven acquisition.",
  }),
];
