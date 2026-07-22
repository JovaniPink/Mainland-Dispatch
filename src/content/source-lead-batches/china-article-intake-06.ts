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
  collectionId: "china-article-corpus-2026-07-06",
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

/** Sixth neutral article-candidate batch. Discovery-platform data is intentionally absent. */
export const chinaArticleIntake06 = [
  candidate({
    id: "lead-2019-bbc-change4-cotton-sprout",
    title: "China's Moon mission sees first seeds sprout",
    url: "https://www.bbc.com/news/world-asia-china-46873526",
    publisher: "BBC News",
    publishedAt: "2019-01-15",
    contentType: "reporting",
    topics: ["change-4", "moon", "cotton", "space-science"],
    notes:
      "This was a preliminary experiment update, not sustained lunar agriculture. Review the mission-team record, experimental enclosure and controls, the distinction between germination on the Moon and exposure to lunar conditions, and the later death of the sprout when night temperatures fell.",
  }),
  candidate({
    id: "lead-2018-bbc-meng-hongwei-missing",
    title: "Interpol chief Meng Hongwei vanishes on trip to China",
    url: "https://www.bbc.com/news/world-europe-45761466",
    publisher: "BBC News",
    publishedAt: "2018-10-05",
    contentType: "reporting",
    topics: ["meng-hongwei", "interpol", "detention", "corruption"],
    notes:
      "An early missing-person report was quickly superseded by official detention, resignation, prosecution, conviction and sentencing. Preserve what was known on publication day, recover Interpol and Chinese records, add Meng's response and family claims, and distinguish established court outcomes from disputed process allegations.",
  }),
  candidate({
    id: "lead-2020-bloombergquint-hongguang-mini-ev",
    title: "Tesla's nemesis in China is a tiny $5,000 electric car from GM",
    url: "https://www.bloombergquint.com/business/tesla-s-nemesis-in-china-is-a-tiny-5-000-electric-car-from-gm",
    publisher: "BloombergQuint",
    publicationYear: 2020,
    contentType: "reporting",
    topics: ["hongguang-mini-ev", "electric-vehicles", "gm", "wuling"],
    accessStatus: "unavailable",
    notes:
      "The former publisher endpoint is unavailable and the competitive headline is a period framing. Recover an authorized Bloomberg copy, identify SAIC-GM-Wuling ownership precisely, verify dated price and sales figures with manufacturer and industry records, and include safety, subsidy, range and later-sales context.",
  }),
  candidate({
    id: "lead-2016-traintracks-swede-china-silicon-valley",
    title: "A Swede returns to Silicon Valley from China",
    url: "http://blog.traintracks.io/a-swede-returns-to-silicon-valley-from-china-2/",
    publisher: "Traintracks",
    publicationYear: 2016,
    contentType: "analysis",
    topics: ["entrepreneurship", "beijing", "silicon-valley", "first-person"],
    accessStatus: "unavailable",
    notes:
      "If the author republishes an authorized copy, treat it as a dated first-person essay rather than representative evidence about either Beijing or Silicon Valley and independently verify every factual generalization.",
  }),
  candidate({
    id: "lead-2018-economist-chip-wars",
    title: "Chip wars: China, America and silicon supremacy",
    url: "https://www.economist.com/leaders/2018/12/01/chip-wars-china-america-and-silicon-supremacy",
    publisher: "The Economist",
    publishedAt: "2018-12-01",
    contentType: "analysis",
    topics: ["semiconductors", "industrial-policy", "trade", "technology"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "This institutional editorial predates major export-control changes. Recover its evidence and predictions, distinguish design, fabrication, equipment, materials and packaging, and compare the 2018 argument with later controls, firm results and supply-chain data.",
  }),
  candidate({
    id: "lead-2018-bbc-un-xinjiang-detention-estimate",
    title: "China Uighurs: one million held in political camps, UN told",
    url: "https://www.bbc.com/news/world-asia-china-45147972",
    publisher: "BBC News",
    publishedAt: "2018-08-10",
    contentType: "reporting",
    topics: ["xinjiang", "uyghurs", "detention", "united-nations"],
    notes:
      "The supplied headline was not the publisher's exact title and described a UN committee session as a secret-camp fact. Review the committee transcript and cited estimate, its methodology and uncertainty, Chinese responses, subsequent leaked records, imagery, testimony, official policy changes and terminology disputes.",
  }),
  candidate({
    id: "lead-2010-dropbox-forum-china-access",
    title: "User report about Dropbox access from China",
    url: "http://forums.dropbox.com/topic.php?id=19835",
    publisher: "Dropbox forum",
    publicationYear: 2010,
    contentType: "primary",
    topics: ["dropbox", "internet-access", "network-measurement"],
    accessStatus: "unavailable",
    disposition: "rejected",
    decisionReason:
      "Rejected because the supplied URL is an unavailable user-forum thread, not a canonical article or durable measurement record. A service-blocking Dispatch requires dated multi-vantage network evidence and company and regulator responses.",
    notes:
      "Do not infer nationwide blocking, cause, duration or protocol coverage from an isolated user report or reconstruct its contents from fragments.",
  }),
  candidate({
    id: "lead-2019-china-underground-tencent-platform-reaction",
    title:
      "User reaction to Tencent's investment in a U.S. discussion platform",
    url: "https://china-underground.com/2019/02/09/reddit-is-experiencing-a-user-uprising-against-china-because-tencent-will-invest-heavily-in-the-platform/",
    publisher: "China Underground",
    publishedAt: "2019-02-09",
    contentType: "reporting",
    topics: ["tencent", "investment", "platform-governance", "user-reaction"],
    disposition: "rejected",
    decisionReason:
      "Rejected as derivative coverage centered on platform reaction rather than evidence of governance or censorship effects. Any later Dispatch should use financing records, ownership rights, platform policy and documented moderation outcomes.",
    notes:
      "User posts and viral reactions do not establish investor control or product-policy change. Keep investment terms, moderation claims and speculative fears separate.",
  }),
  candidate({
    id: "lead-2019-nyt-chongqing-rent-employment",
    title: "A Chinese city struggles with a failing economy and fading dreams",
    url: "https://www.nytimes.com/2019/04/11/world/asia/chongqing-china-employment-ford-youth.html",
    publisher: "The New York Times",
    publishedAt: "2019-04-11",
    contentType: "reporting",
    topics: ["chongqing", "rent", "employment", "urban-economy"],
    accessStatus: "paywalled",
    notes:
      "The submitted rent claim is an anecdotal price point inside a broader reported feature, not a citywide rent statistic. Recover the full story, neighborhood and unit details, official and independent housing data, wages and vacancies, Ford-related employment context, interview scope and later conditions.",
  }),
  candidate({
    id: "lead-2019-hkfp-un-xinjiang-meeting-pressure",
    title:
      "China warned countries not to attend UN meeting on Xinjiang violations",
    url: "https://hongkongfp.com/2019/04/01/china-warned-countries-not-attend-un-meeting-xinjiang-human-rights-violations/",
    publisher: "Hong Kong Free Press",
    publishedAt: "2019-04-01",
    contentType: "reporting",
    topics: ["xinjiang", "united-nations", "diplomacy", "human-rights"],
    urlStatus: "redirect-resolved",
    notes:
      "The obsolete supplied domain was normalized to the publisher's current URL. Obtain the diplomatic letter or authenticated copies, identify recipients and meeting, verify attendance effects, preserve Reuters-derived attribution, include Chinese and UN responses, and avoid equating diplomatic pressure with a proven outcome.",
  }),
  candidate({
    id: "lead-2021-bbc-zhurong-first-images",
    title: "China on Mars: Zhurong rover returns first pictures",
    url: "https://www.bbc.com/news/science-environment-57172346",
    publisher: "BBC News",
    publishedAt: "2021-05-19",
    contentType: "reporting",
    topics: ["zhurong", "mars", "space-science", "tianwen-1"],
    notes:
      "Verify original CNSA image releases, landing and deployment chronology, instrument status and mission objectives. Add later traverse results, loss of contact and current mission status; do not let the celebratory first-image frame imply continued operation.",
  }),
  candidate({
    id: "lead-2019-reuters-solar-price-forecast",
    title: "Party is over for dirt-cheap solar panels, says China executive",
    url: "https://www.reuters.com/article/us-davos-meeting-solar-gcl-idUSKCN1PI2OQ",
    publisher: "Reuters",
    publishedAt: "2019-01-24",
    contentType: "reporting",
    topics: ["solar", "panel-prices", "gcl", "forecast"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "The headline is one executive's forecast. Recover the interview, company interests and definitions, compare the prediction with observed module-price series, separate polysilicon and module economics, and include later capacity, trade, technology and supply-chain changes.",
  }),
  candidate({
    id: "lead-2017-bbc-beijing-bitcoin-exchanges",
    title: "China orders Bitcoin exchanges in capital city to close",
    url: "https://www.bbc.com/news/business-41320568",
    publisher: "BBC News",
    publishedAt: "2017-09-19",
    contentType: "reporting",
    topics: ["bitcoin", "exchanges", "regulation", "beijing"],
    urlStatus: "redirect-resolved",
    notes:
      "Identify the actual notices and affected Beijing platforms, distinguish local exchange closure from ownership or use of Bitcoin, and add the 2017 ICO action, later mining and transaction restrictions, enforcement evidence and present legal context.",
  }),
  candidate({
    id: "lead-2021-bloombergquint-tutoring-overhaul",
    title: "China bans for-profit school tutoring in sweeping overhaul",
    url: "https://www.bloombergquint.com/markets/china-bans-school-curriculum-tutoring-firms-from-going-public",
    publisher: "BloombergQuint",
    publishedAt: "2021-07-24",
    contentType: "reporting",
    topics: ["education", "tutoring", "double-reduction", "regulation"],
    accessStatus: "unavailable",
    notes:
      "Recover an authorized publisher copy and the State Council and Party directive. Specify subject, age, schedule, foreign-capital and nonprofit restrictions; distinguish announcement from implementation; document company responses, household effects, informal tutoring and later policy adjustments.",
  }),
  candidate({
    id: "lead-2019-economist-cathay-pacific",
    title:
      "Why China's assault on Cathay Pacific should scare all foreign firms",
    url: "https://www.economist.com/leaders/2019/08/22/why-chinas-assault-on-cathay-pacific-should-scare-all-foreign-firms",
    publisher: "The Economist",
    publishedAt: "2019-08-22",
    contentType: "analysis",
    topics: ["cathay-pacific", "hong-kong", "corporate-pressure", "aviation"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "This is an institutional editorial with loaded framing. Recover the cited aviation orders, staff cases, management changes and company response, distinguish state regulation from inferred coercive motive, and add later business and legal developments.",
  }),
  candidate({
    id: "lead-2019-arte-disappearing-millionaires",
    title: "China: The Disappearing Millionaires",
    url: "https://www.arte.tv/en/videos/083456-000-A/china-the-disappearing-millionaires/",
    publisher: "ARTE",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["wealth", "detention", "business", "documentary"],
    accessStatus: "unavailable",
    notes:
      "The video is no longer available in the review region. A lawful full viewing, production credits, transcript or caption record, named-case court files, family and official responses, selection criteria and later outcomes are required before evaluating its broad thesis.",
  }),
  candidate({
    id: "lead-2021-bitter-winter-coordinated-accounts",
    title: "False pro-China accounts target discussion in the United Kingdom",
    url: "https://bitterwinter.org/pro-ccp-false-pro-china-accounts-invade-twitter-in-the-uk/",
    publisher: "Bitter Winter",
    publishedAt: "2021-05-28",
    byline: "Ruth Ingram",
    contentType: "reporting",
    topics: [
      "coordinated-accounts",
      "information-operations",
      "united-kingdom",
    ],
    notes:
      "The article points to an Oxford Internet Institute study of engagement with PRC diplomatic accounts from June 2020 through January 2021. Review that underlying report, its account dataset, behavioral indicators, attribution standard and false-positive risk, plus platform enforcement records and independent replication; do not inherit the outlet's advocacy framing.",
  }),
  candidate({
    id: "lead-2020-china-tribunal-final-judgment",
    title: "Independent tribunal final judgment on forced organ harvesting",
    url: "https://chinatribunal.com/final-judgement-report/",
    publisher: "China Tribunal",
    publicationYear: 2020,
    contentType: "research",
    topics: [
      "organ-transplantation",
      "human-rights",
      "tribunal",
      "methodology",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "This was a civil-society people's tribunal, not a state court or intergovernmental judicial body. Review the complete judgment, mandate, funding and selection, evidentiary standard, witness handling, transplant-data methods, Chinese denials, scholarly criticism, WHO-related evidence and later independent findings.",
  }),
  candidate({
    id: "lead-2025-apropos-china-eating-world",
    title: "China is eating the world",
    url: "https://apropos.substack.com/p/china-is-eating-the-world",
    publisher: "Apropos",
    publishedAt: "2025-08-28",
    byline: "Santi",
    contentType: "analysis",
    topics: ["manufacturing", "exports", "industrial-policy", "globalization"],
    urlStatus: "publisher-canonical",
    notes:
      "The title is a deliberately expansive thesis, not a measurable finding. Recover the complete essay and linked datasets; define sectors, trade measures, value added and time bounds; test selection effects; and include counterexamples, domestic constraints and alternative explanations.",
  }),
  candidate({
    id: "lead-2015-slate-pedestrian-double-hit",
    title: "Claim that drivers intentionally kill pedestrians they hit",
    url: "https://slate.com/news-and-politics/2015/09/why-drivers-in-china-intentionally-kill-the-pedestrians-they-hit.html",
    publisher: "Slate",
    publishedAt: "2015-09-04",
    contentType: "analysis",
    topics: ["traffic", "pedestrians", "law", "media-claims"],
    urlStatus: "redirect-resolved",
    disposition: "rejected",
    decisionReason:
      "Rejected because a sensational nationwide causal claim is built from selected incidents and a simplified account of compensation law. A responsible treatment must begin with representative crash data, judgments, statutes and qualified legal and road-safety research.",
    notes:
      "Do not generalize intent from viral videos or anecdotes. Test prevalence, reporting bias, criminal and civil liability, insurance, regional variation and changes in law before considering a narrower corrective article.",
  }),
  candidate({
    id: "lead-2021-bbc-zhurong-video-audio",
    title: "China releases videos of its Zhurong Mars rover",
    url: "https://www.bbc.com/news/science-environment-57628653",
    publisher: "BBC News",
    publishedAt: "2021-06-27",
    contentType: "reporting",
    topics: ["zhurong", "mars", "video", "space-science"],
    notes:
      "Review the original CNSA footage and technical explanation of recorded sounds, identify which clips were transmitted and processed, and place them in mission chronology. Add later science results, hibernation and loss-of-contact status.",
  }),
  candidate({
    id: "lead-2018-techcrunch-john-oliver-censorship",
    title:
      "John Oliver is erased from Chinese internet following segment on China",
    url: "https://techcrunch.com/2018/06/25/john-oliver-is-erased-from-chinese-internet-following-segment-on-china/",
    publisher: "TechCrunch",
    publishedAt: "2018-06-25",
    contentType: "reporting",
    topics: ["john-oliver", "censorship", "social-media", "television"],
    urlStatus: "publisher-canonical",
    notes:
      "The absolute 'erased' wording needs service-by-service, query-by-query and date-bounded measurement. Review archived search evidence, account or content restrictions, the original segment, platform and government responses, circumvention and later availability.",
  }),
  candidate({
    id: "lead-2019-reuters-industrial-output-slowdown",
    title:
      "China's slowdown deepens; industrial output growth falls to 17-and-a-half-year low",
    url: "https://www.reuters.com/article/us-china-economy-activity/chinas-slowdown-deepens-industrial-output-growth-falls-to-17-1-2-year-low-idUSKBN1W102H",
    publisher: "Reuters",
    publishedAt: "2019-09-16",
    contentType: "reporting",
    topics: ["industrial-output", "economy", "retail-sales", "investment"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Treat the superlative as a dated year-on-year growth-rate comparison, not a fall in total output. Review NBS releases, seasonal and revision issues, surveyed-enterprise scope, component series, analyst estimates, policy context and later data.",
  }),
  candidate({
    id: "lead-2018-nyt-google-employees-dragonfly-protest",
    title: "Google employees protest work on censored search engine for China",
    url: "https://www.nytimes.com/2018/08/16/technology/google-employees-protest-search-censored-china.html",
    publisher: "The New York Times",
    publishedAt: "2018-08-16",
    contentType: "reporting",
    topics: ["google", "project-dragonfly", "employees", "censorship"],
    accessStatus: "paywalled",
    notes:
      "Recover the full employee letter, signer count and internal chronology, distinguish reported product plans from deployed service, include company and rights-group responses, and add later executive testimony that the project was terminated.",
  }),
  candidate({
    id: "lead-2019-wsj-amd-thatic-joint-venture",
    title: "How AMD gave China the 'keys to the kingdom'",
    url: "https://www.wsj.com/articles/u-s-tried-to-stop-china-acquiring-world-class-chips-china-got-them-anyway-11561646798",
    publisher: "The Wall Street Journal",
    publishedAt: "2019-06-27",
    contentType: "reporting",
    topics: ["amd", "thatic", "semiconductors", "technology-transfer"],
    accessStatus: "paywalled",
    notes:
      "The metaphor is editorial. Review joint-venture contracts and ownership, licensed Zen IP scope, U.S. export-control decisions, AMD and partner responses, entity-list action, technical capability actually transferred, financial outcomes and later chip-policy context.",
  }),
  candidate({
    id: "lead-2018-bloomberg-term-limit-proposal",
    title: "China seeks to repeal presidential term limit",
    url: "https://www.bloomberg.com/news/articles/2018-02-25/china-seeks-to-repeal-president-s-term-limit-opening-way-for-xi",
    publisher: "Bloomberg",
    publishedAt: "2018-02-25",
    contentType: "reporting",
    topics: ["constitution", "term-limits", "xi-jinping", "politics"],
    accessStatus: "paywalled",
    notes:
      "This reported a proposal, not yet enacted law. Review the official amendment proposal and March 2018 NPC vote, distinguish state presidency from Party and military offices, record vote totals and legal text, and add the 2023 third presidential term.",
  }),
  candidate({
    id: "lead-2018-wsj-china-gene-editing-trials",
    title: "China, unhampered by rules, races ahead in gene-editing trials",
    url: "https://www.wsj.com/articles/china-unhampered-by-rules-races-ahead-in-gene-editing-trials-1516562360",
    publisher: "The Wall Street Journal",
    publishedAt: "2018-01-21",
    contentType: "reporting",
    topics: ["gene-editing", "clinical-trials", "ethics", "regulation"],
    accessStatus: "paywalled",
    notes:
      "The cross-country 'unhampered by rules' frame needs precise laws, trial phases, registries, ethics review and enforcement evidence. Separate somatic cancer trials from heritable embryo editing, compare U.S. constraints accurately, and include the later He Jiankui case and regulatory changes.",
  }),
  candidate({
    id: "lead-2011-gz-pixel-map",
    title: "Pixel map of China",
    url: "http://gz.o.cn/",
    publisher: "gz.o.cn",
    publicationYear: 2011,
    contentType: "primary",
    topics: ["map", "digital-artifact", "visualization"],
    accessStatus: "unavailable",
    disposition: "rejected",
    decisionReason:
      "Rejected because the URL is an unavailable interactive map artifact, not an article with claims, authorship, methods or stable evidence to review. Screenshots or nostalgic references cannot supply that missing record.",
    notes:
      "A future culture item would require an authorized preserved artifact, creator identity and interview, technical and cartographic context, launch date, reception evidence and clear fair-use boundaries.",
  }),
  candidate({
    id: "lead-2018-wsj-ge-engineer-theft-allegation",
    title:
      "GE engineer linked to China allegedly stole power-plant technology, FBI says",
    url: "https://www.wsj.com/articles/ge-engineer-linked-to-china-allegedly-stole-power-plant-technology-fbi-says-1533235590",
    publisher: "The Wall Street Journal",
    publishedAt: "2018-08-02",
    contentType: "reporting",
    topics: ["trade-secrets", "ge", "fbi", "criminal-case"],
    accessStatus: "paywalled",
    notes:
      "This is allegation-stage reporting. Obtain the complaint, indictment, trial record and final judgment; identify the technology and alleged conduct without exposing sensitive details; include defense and GE responses; and use the later conviction and sentence without implying collective responsibility.",
  }),
  candidate({
    id: "lead-2018-nyt-micron-trade-secrets",
    title:
      "Inside a heist of American chip designs, as China bids for tech power",
    url: "https://www.nytimes.com/2018/06/22/technology/china-micron-chips-theft.html",
    publisher: "The New York Times",
    publishedAt: "2018-06-22",
    contentType: "reporting",
    topics: ["micron", "trade-secrets", "semiconductors", "litigation"],
    accessStatus: "paywalled",
    notes:
      "The narrative combines company allegations, criminal charges, civil litigation and industrial-policy context. Review complaints, indictments and judgments in each jurisdiction, defendants' responses, evidentiary status, UMC's later plea and settlement, and avoid attributing individual or corporate conduct to a country as a whole.",
  }),
];
