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
  collectionId: "china-article-corpus-2026-07-12",
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

/** Twelfth neutral article-candidate batch. A previously cataloged URL is excluded. */
export const chinaArticleIntake12 = [
  candidate({
    id: "lead-2018-inquirer-lenovo-local-backdoors",
    title: "Lenovo executive discusses local data-access requirements",
    url: "https://www.theinquirer.net/inquirer/news/3062910/lenovo-companies-working-in-china-may-have-to-install-local-backdoors",
    publisher: "The Inquirer",
    publicationYear: 2018,
    contentType: "reporting",
    topics: ["lenovo", "cybersecurity", "data-access", "regulation"],
    accessStatus: "unavailable",
    urlStatus: "publisher-canonical",
    notes:
      "Retrieve the complete interview and recording, identify the exact question and jurisdiction, and compare the wording with applicable cybersecurity, encryption and lawful-access rules. Do not convert a conditional executive statement into proof that a particular product contains a backdoor.",
  }),
  candidate({
    id: "lead-2017-mashable-livestreaming-overclaim",
    title: "Claim that China banned livestreaming",
    url: "https://mashable.com/article/china-bans-livestreaming",
    publisher: "Mashable",
    publishedAt: "2017-06-23",
    contentType: "reporting",
    topics: [
      "livestreaming",
      "platform-regulation",
      "media",
      "misleading-framing",
    ],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    disposition: "rejected",
    decisionReason:
      "Rejected because the blanket headline materially overstates a targeted regulatory action affecting particular services and content. Any future treatment must start from the regulator's notice, named platforms, legal scope and subsequent licensing and enforcement—not from a nationwide claim that livestreaming itself was banned.",
    notes:
      "Locate the regulator's original notice and platform responses and distinguish service suspension, licensing, content restrictions and an industry-wide prohibition.",
  }),
  candidate({
    id: "lead-2021-carnegie-evergrande-meltdown",
    title: "What does the Evergrande meltdown mean for China?",
    url: "https://carnegieendowment.org/china-financial-markets/2024/02/what-does-evergrande-meltdown-mean-for-china",
    publisher: "Carnegie Endowment for International Peace",
    publishedAt: "2021-09-20",
    byline: "Michael Pettis",
    contentType: "analysis",
    topics: ["evergrande", "property", "debt", "financial-system"],
    urlStatus: "redirect-resolved",
    notes:
      "Treat the piece as contemporaneous analysis. Reproduce liability, GDP and property-sector denominators, separate reported facts from the author's forecasts, and add restructuring, liquidation, housing-delivery and macroeconomic developments through the review date.",
  }),
  candidate({
    id: "lead-2018-china-money-network-bitmain-round",
    title: "Sequoia Capital China reportedly joined Bitmain's pre-IPO round",
    url: "https://www.chinamoneynetwork.com/2018/06/11/sequoia-capital-china-said-to-invest-in-bitmains-400m-pre-ipo-round",
    publisher: "China Money Network",
    publishedAt: "2018-06-11",
    contentType: "reporting",
    topics: ["bitmain", "venture-capital", "valuation", "cryptocurrency"],
    urlStatus: "publisher-canonical",
    notes:
      "Review investor and company confirmations, round close, share terms and valuation basis. Preserve 'said to' as unconfirmed, distinguish pre-money and post-money valuation, and include the later abandoned listing effort and company developments.",
  }),
  candidate({
    id: "lead-2011-geek-military-hacking-documentary-claim",
    title:
      "Claim that a television documentary proved military-university hacking",
    url: "https://www.geek.com/news/china-airs-documentary-proving-military-university-is-hacking-u-s-targets-1412103/",
    publisher: "Geek.com",
    publicationYear: 2011,
    contentType: "reporting",
    topics: ["cybersecurity", "military", "television", "misleading-framing"],
    accessStatus: "unavailable",
    urlStatus: "redirect-resolved",
    disposition: "rejected",
    decisionReason:
      "Rejected as an unavailable derivative article whose headline claims proof beyond what a brief television image can establish. A future cyber-attribution review would require the original broadcast, authenticated frames, network and ownership records, technical analysis, alternative explanations and official responses.",
    notes:
      "Do not treat an on-screen IP address or university label as conclusive attribution of an operation, operator or government authorization.",
  }),
  candidate({
    id: "lead-2018-bloomberg-google-workers-dragonfly-letter",
    title: "Google workers sign letter seeking an end to China search project",
    url: "https://www.bloomberg.com/news/articles/2018-11-27/google-workers-sign-letter-seeking-end-to-china-search-project",
    publisher: "Bloomberg",
    publishedAt: "2018-11-27",
    contentType: "reporting",
    topics: ["google", "dragonfly", "labor-organizing", "censorship"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the full employee letter, signatory count and timing, management statements and project records. Distinguish employee demands, reported project state and an actual corporate decision, then include the project's later termination.",
  }),
  candidate({
    id: "lead-2018-bloomberg-waste-import-displacement",
    title:
      "Study projects global waste displacement after China's import restrictions",
    url: "https://www.bloomberg.com/news/articles/2018-06-20/china-just-handed-the-world-a-111-million-ton-trash-problem",
    publisher: "Bloomberg",
    publishedAt: "2018-06-20",
    contentType: "reporting",
    topics: ["waste", "recycling", "imports", "environment"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the underlying Science Advances model, material categories, period, baseline and 111-million-ton cumulative projection. Avoid presenting modeled displacement as waste already stranded and add observed trade, recycling, landfill and incineration outcomes.",
  }),
  candidate({
    id: "lead-2020-bbc-hong-kong-national-security-law",
    title: "China passes a national security law for Hong Kong",
    url: "https://www.bbc.com/news/world-asia-china-52765838",
    publisher: "BBC News",
    publishedAt: "2020-06-30",
    contentType: "reporting",
    topics: ["hong-kong", "national-security-law", "legislation", "rights"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the enacted Chinese text, promulgation and Hong Kong gazette, offense elements, jurisdiction and implementation. Include government explanations, legal criticism, prosecutions and later institutional changes while separating statutory text from predicted effects.",
  }),
  candidate({
    id: "lead-2013-bloomberg-pboc-bitcoin-financial-institutions",
    title:
      "China bars financial institutions from handling bitcoin transactions",
    url: "https://www.bloomberg.com/news/articles/2013-12-05/china-s-pboc-bans-financial-companies-from-bitcoin-transactions",
    publisher: "Bloomberg",
    publishedAt: "2013-12-05",
    contentType: "reporting",
    topics: ["bitcoin", "financial-regulation", "pboc", "cryptocurrency"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the joint agency notice and exact entities and activities covered. Distinguish restrictions on regulated institutions from individual possession or every bitcoin transaction, and add later exchange, mining and virtual-currency rules.",
  }),
  candidate({
    id: "lead-2008-wang-jianshuo-map-coordinate-transforms",
    title: "How mandated coordinate transforms affect maps in China",
    url: "https://home.wangjianshuo.com/20081109_all_maps_in_china_are_transformed.htm",
    publisher: "Wang Jianshuo's Blog",
    publishedAt: "2008-11-09",
    contentType: "analysis",
    topics: ["maps", "coordinates", "gcj-02", "geospatial-data"],
    urlStatus: "redirect-resolved",
    notes:
      "Treat this as a practitioner explanation. Verify terminology, legal requirements and transformations against technical and regulatory sources; distinguish GCJ-02 offsets, provider implementation, GPS measurements and display misalignment rather than saying all maps are transformed identically.",
  }),
  candidate({
    id: "lead-2019-cnbc-us-workers-china-rules",
    title:
      "How China-market pressure may affect U.S. employees' social-media use",
    url: "https://www.cnbc.com/2019/10/08/social-media-use-could-change-for-americans-after-chinas-nba-shutdown.html",
    publisher: "CNBC",
    publishedAt: "2019-10-08",
    contentType: "analysis",
    topics: ["social-media", "employment", "corporate-policy", "speech"],
    urlStatus: "publisher-canonical",
    notes:
      "Treat 'may' and 'could' as analysis. Review named employer policies, contracts, labor law, concrete disciplinary cases and employee protections, separating plausible incentives from documented changes across U.S. workplaces.",
  }),
  candidate({
    id: "lead-2023-pv-magazine-china-module-prices",
    title: "China solar-module prices continue falling",
    url: "https://www.pv-magazine.com/2023/06/23/china-solar-module-prices-keep-diving/",
    publisher: "pv magazine",
    publishedAt: "2023-06-23",
    contentType: "reporting",
    topics: ["solar", "module-prices", "manufacturing", "energy"],
    urlStatus: "publisher-canonical",
    notes:
      "Review price source, module class, currency, tax and delivery terms, sample and dates. Separate spot quotes from realized contract prices and add polysilicon, inventory, capacity, trade-policy and later price developments.",
  }),
  candidate({
    id: "lead-2021-reuters-taiwan-independence-liability",
    title:
      "China announces lifelong liability for listed Taiwan-independence supporters",
    url: "https://www.reuters.com/world/china/china-says-it-will-hold-supporters-taiwans-independence-criminally-responsible-2021-11-05/",
    publisher: "Reuters",
    publishedAt: "2021-11-05",
    contentType: "reporting",
    topics: ["taiwan", "criminal-law", "cross-strait", "sanctions"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the Taiwan Affairs Office statement, named individuals, asserted legal basis and jurisdiction. Treat it as an official announcement until enforcement is evidenced and include Taiwan responses and later measures.",
  }),
  candidate({
    id: "lead-2023-nyt-operation-fox-hunt-verdict",
    title: "Three men convicted in U.S. harassment case tied to China",
    url: "https://www.nytimes.com/2023/06/20/nyregion/verdict-china-spying-trial.html",
    publisher: "The New York Times",
    publishedAt: "2023-06-20",
    contentType: "reporting",
    topics: [
      "operation-fox-hunt",
      "harassment",
      "trial",
      "transnational-repression",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review indictment, verdict form, trial evidence, acquittals, sentencing and appeals. Attribute agency and government links at the level proved for each defendant and include defense and Chinese government responses.",
  }),
  candidate({
    id: "lead-2013-nyt-bloomberg-reporter-suspension",
    title:
      "Bloomberg News suspends reporter amid dispute over unpublished China article",
    url: "https://www.nytimes.com/2013/11/18/world/asia/reporter-on-unpublished-bloomberg-article-is-suspended.html",
    publisher: "The New York Times",
    publishedAt: "2013-11-17",
    contentType: "reporting",
    topics: ["journalism", "bloomberg", "editorial-independence", "china"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review employment and editorial chronology, the unpublished investigation's status, internal statements and reporter and company responses. Avoid asserting motive as fact and add later reporting and organizational outcomes.",
  }),
  candidate({
    id: "lead-2014-washington-post-yao-ming-ivory-campaign",
    title: "Yao Ming campaigns in China against ivory consumption",
    url: "https://www.washingtonpost.com/world/ex-rocket-yao-ming-aims-to-save-africas-elephants--with-china-campaign/2014/09/03/87ebbe2a-d3e1-4283-964e-8d87dea397d6_story.html",
    publisher: "The Washington Post",
    publishedAt: "2014-09-03",
    contentType: "reporting",
    topics: ["ivory", "conservation", "yao-ming", "public-campaigns"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review campaign design, audience and survey evidence, ivory-market and poaching trends and causal limits. Add China's later domestic ivory ban and enforcement evidence without attributing a national policy shift to one celebrity campaign.",
  }),
  candidate({
    id: "lead-2014-greatfire-google-service-blocking",
    title: "Monitoring report on a large expansion of website blocking",
    url: "https://en.greatfire.org/blog/2014/nov/china-just-blocked-thousands-websites",
    publisher: "GreatFire",
    publicationYear: 2014,
    contentType: "research",
    topics: ["internet-filtering", "google", "measurement", "censorship"],
    urlStatus: "redirect-resolved",
    notes:
      "Review measurement vantage points, tested hostnames, failure signatures, dates and reproducibility. Distinguish domains, subdomains and dependent sites, avoid equating every failure with a new block and seek independent network measurements and official or provider responses.",
  }),
  candidate({
    id: "lead-2019-bbc-xinjiang-thought-transformation-video",
    title: "Inside China's 'thought transformation' camps",
    url: "https://www.bbc.com/news/av/world-asia-china-48667221",
    publisher: "BBC News",
    publishedAt: "2019-06-17",
    contentType: "reporting",
    topics: ["xinjiang", "detention", "video", "propaganda"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review the complete video, filming conditions, translations, participant selection and what access was controlled. Corroborate institutional claims independently, include official explanations and survivor evidence and distinguish staged presentation from independently observed conditions.",
  }),
  candidate({
    id: "lead-2024-renewables-now-wind-solar-capacity",
    title: "China's combined wind and solar nameplate capacity exceeds coal",
    url: "https://renewablesnow.com/news/chinas-total-wind-and-solar-capacity-outstrips-coal-rystad-says-865106/",
    publisher: "Renewables Now",
    publishedAt: "2024-08-01",
    byline: "Plamena Tisheva",
    contentType: "reporting",
    topics: ["wind", "solar", "coal", "electricity-capacity"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the Rystad dataset, technology definitions and nameplate denominator. Capacity is not generation, dispatchability or emissions; compare official capacity and generation data and inspect curtailment, utilization and later additions.",
  }),
  candidate({
    id: "lead-2019-our-world-in-data-india-population-overtake",
    title: "When India was projected to overtake China in population",
    url: "https://ourworldindata.org/india-will-soon-overtake-china-to-become-the-most-populous-country-in-the-world",
    publisher: "Our World in Data",
    publicationYear: 2019,
    contentType: "analysis",
    topics: ["population", "demography", "india", "projections"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the UN projection vintage, uncertainty interval and source revisions and distinguish projected crossover from directly observed census counts. Add the later UN estimate and explain comparability limits in both countries' population data.",
  }),
  candidate({
    id: "lead-2012-npr-secret-document-xiaogang",
    title: "The village agreement associated with China's rural reforms",
    url: "https://www.npr.org/sections/money/2012/01/20/145360447/the-secret-document-that-transformed-china",
    publisher: "NPR",
    publishedAt: "2012-01-20",
    contentType: "reporting",
    topics: ["xiaogang", "rural-reform", "agriculture", "economic-history"],
    urlStatus: "redirect-resolved",
    notes:
      "Review the document, participant accounts and local and national policy chronology. Avoid a single-document transformation story: distinguish village experimentation, parallel reforms, official adoption and later retrospective mythmaking.",
  }),
  candidate({
    id: "lead-2021-economist-struggle-involution",
    title: "China urges struggle while some people opt out",
    url: "https://www.economist.com/china/2021/07/03/china-urges-its-people-to-struggle-some-say-no",
    publisher: "The Economist",
    publishedAt: "2021-07-03",
    contentType: "analysis",
    topics: ["lying-flat", "work", "youth", "social-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the full article, Chinese terms and translations, sampled posts and official statements. Separate an online discourse from measured population behavior and add labor-market, survey, censorship and later policy evidence.",
  }),
  candidate({
    id: "lead-2019-nikkei-nio-job-cuts",
    title: "Nio cuts jobs as losses mount",
    url: "https://asia.nikkei.com/Business/Companies/China-s-Tesla-NIO-slashes-thousands-of-jobs-as-losses-mount",
    publisher: "Nikkei Asia",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["nio", "electric-vehicles", "employment", "finance"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review company filings and statements, headcount baseline, timing and whether announced cuts occurred. Avoid the 'China's Tesla' analogy as analysis and add financing, deliveries, later staffing and profitability evidence.",
  }),
  candidate({
    id: "lead-2016-popsci-an225-production-forecast",
    title: "Claim that China would restart production of the An-225",
    url: "https://www.popsci.com/china-will-resurrect-worlds-largest-plane/",
    publisher: "Popular Science",
    publishedAt: "2016-09-07",
    contentType: "reporting",
    topics: ["an-225", "aviation", "forecast", "misleading-framing"],
    urlStatus: "redirect-resolved",
    disposition: "rejected",
    decisionReason:
      "Rejected because the definitive headline elevated a preliminary cooperation agreement into a production outcome that did not occur. Historical treatment should use the signed documents, distinguish completion of the existing aircraft from licensed production, and include the project's nonimplementation and the aircraft's later destruction.",
    notes:
      "A memorandum or announced agreement is not a resurrected production program; later outcomes are essential to the historical record.",
  }),
  candidate({
    id: "lead-2018-nyt-malaysia-china-investment",
    title: "Malaysia reassesses China-backed projects",
    url: "https://www.nytimes.com/2018/08/20/world/asia/china-malaysia.html",
    publisher: "The New York Times",
    publishedAt: "2018-08-20",
    contentType: "reporting",
    topics: ["malaysia", "belt-and-road", "infrastructure", "investment"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review contracts, financing, project status and the prime minister's exact language and domestic political context. Add renegotiation and implementation outcomes and distinguish concern about particular deals from rejection of all Chinese investment.",
  }),
  candidate({
    id: "lead-2017-reuters-pboc-bitcoin-exchange-checks",
    title: "Bitcoin falls as China's central bank examines exchanges",
    url: "https://www.reuters.com/article/us-china-bitcoin-idUSKBN14V15Q",
    publisher: "Reuters",
    publishedAt: "2017-01-11",
    contentType: "reporting",
    topics: ["bitcoin", "exchanges", "pboc", "markets"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Review PBOC notices, exchange statements, inspection scope and price data across venues and time zones. Attribute price causality rather than asserting it and include later withdrawal restrictions and regulatory outcomes.",
  }),
  candidate({
    id: "lead-2017-bloomberg-sp-china-rating-cut",
    title: "S&P cuts China's sovereign credit rating amid debt concerns",
    url: "https://www.bloomberg.com/news/articles/2017-09-21/s-p-lowers-china-s-rating-to-a-from-aa-says-outlook-stable",
    publisher: "Bloomberg",
    publishedAt: "2017-09-21",
    contentType: "reporting",
    topics: ["credit-rating", "debt", "sovereign-risk", "economy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the rating action and methodology, exact old and new ratings, outlook and government response. Distinguish an agency opinion from a measured default probability and add later rating and debt developments.",
  }),
  candidate({
    id: "lead-2019-bloomberg-china-gdp-overstatement-study",
    title: "Study estimates China's GDP growth was overstated for nine years",
    url: "https://www.bloomberg.com/news/articles/2019-03-08/china-s-gdp-growth-pace-was-inflated-for-nine-years-study-finds",
    publisher: "Bloomberg",
    publishedAt: "2019-03-08",
    contentType: "reporting",
    topics: ["gdp", "statistics", "methodology", "economic-growth"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Review the underlying paper, provincial and national data, model, period and uncertainty, peer responses and official revisions. Preserve 'study estimates' rather than treating one reconstruction as a definitive corrected GDP series.",
  }),
  candidate({
    id: "lead-2016-nyt-china-mobile-technology",
    title: "China's mobile ecosystem as a source of technology innovation",
    url: "https://www.nytimes.com/2016/08/03/technology/china-mobile-tech-innovation-silicon-valley.html",
    publisher: "The New York Times",
    publishedAt: "2016-08-02",
    contentType: "analysis",
    topics: ["mobile-technology", "payments", "platforms", "innovation"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Treat 'cutting edge' as comparative analysis. Review product examples, adoption denominators, market structure and chronology, distinguish invention from diffusion and business-model integration, and add later platform and regulatory developments.",
  }),
] as const;
