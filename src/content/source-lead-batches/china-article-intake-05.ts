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
  collectionId: "china-article-corpus-2026-07-05",
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

/** Fifth neutral article-candidate batch. Discovery-platform data is intentionally absent. */
export const chinaArticleIntake05 = [
  candidate({
    id: "lead-2025-wapo-deepseek-security-bias",
    title:
      "AI firm DeepSeek writes less-secure code for groups China disfavors",
    url: "https://www.washingtonpost.com/technology/2025/09/16/deepseek-ai-security/",
    publisher: "The Washington Post",
    publishedAt: "2025-09-16",
    byline: "Joseph Menn",
    contentType: "reporting",
    topics: ["deepseek", "code-security", "model-bias", "evaluation"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "The headline describes a CrowdStrike experiment, not established intent by DeepSeek or the Chinese state. Obtain the full methodology, prompts, model and serving versions, sampling controls, flaw rubric, raw outputs, statistical uncertainty, competing explanations, and DeepSeek response.",
  }),
  candidate({
    id: "lead-2016-troy-hunt-offshoring-roulette",
    title:
      "Offshoring roulette: lessons from outsourcing to India, China and the Philippines",
    url: "https://www.troyhunt.com/offshoring-roulette-lessons-from-outsourcing-to-india-china-and-the-philippines/",
    publisher: "Troy Hunt",
    publishedAt: "2016-11-10",
    byline: "Troy Hunt",
    contentType: "analysis",
    topics: [
      "outsourcing",
      "software-development",
      "workplace",
      "first-person",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "The author explicitly labels many conclusions anecdotal and without hard metrics. Preserve the Pfizer-era first-person scope, distinguish outsourcing from offshoring, and independently verify wage, turnover, censorship, and labor-market claims before generalizing across countries or vendors.",
  }),
  candidate({
    id: "lead-2015-betanews-counterterrorism-encryption",
    title: "China passes law requiring tech firms to hand over encryption keys",
    url: "https://betanews.com/article/china-passes-law-requiring-tech-firms-to-hand-over-encryption-keys/",
    publisher: "BetaNews",
    publishedAt: "2015-12-27",
    byline: "Sofia Elizabella Wyciślik-Wilson",
    contentType: "reporting",
    topics: [
      "encryption",
      "counterterrorism-law",
      "technology-companies",
      "law",
    ],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected as a derivative and legally overbroad account. Any Dispatch must begin with the enacted Counter-Terrorism Law, an authoritative translation, its assistance provisions, implementing practice, and qualified legal analysis rather than this headline.",
    notes:
      "The article collapses compelled technical assistance, decryption obligations, and a universal requirement to surrender encryption keys. That distinction is material and cannot be repaired by lightly rewriting the story.",
  }),
  candidate({
    id: "lead-2019-bbc-dragonfly-terminated",
    title: "Google's Project Dragonfly 'terminated' in China",
    url: "https://www.bbc.com/news/technology-49015516",
    publisher: "BBC News",
    publishedAt: "2019-07-17",
    contentType: "reporting",
    topics: [
      "google",
      "project-dragonfly",
      "censorship",
      "corporate-governance",
    ],
    notes:
      "Verify the exact executive testimony, whether 'terminated' described the project or a broader China strategy, employee and rights-group evidence, earlier development history, and any later search-product activity. A company statement is not proof that all related work ended.",
  }),
  candidate({
    id: "lead-2018-economist-west-got-china-wrong",
    title: "How the West got China wrong",
    url: "https://www.economist.com/leaders/2018/03/01/how-the-west-got-china-wrong",
    publisher: "The Economist",
    publishedAt: "2018-03-01",
    contentType: "analysis",
    topics: ["engagement", "democracy", "markets", "foreign-policy"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "This is an institutional editorial argument about a broad and contested 'Western' wager. Identify which governments, policies, dates, and predictions it actually cites; include counterarguments and later evidence rather than treating one editorial frame as historical consensus.",
  }),
  candidate({
    id: "lead-2015-citizen-lab-great-cannon",
    title: "China’s Great Cannon",
    url: "https://citizenlab.ca/research/chinas-great-cannon/",
    publisher: "The Citizen Lab",
    publishedAt: "2015-04-10",
    byline:
      "Bill Marczak, Nicholas Weaver, Jakub Dalek, Roya Ensafi, David Fifield, Sarah McKune, Arn Rey, John Scott-Railton, Ron Deibert, and Vern Paxson",
    contentType: "research",
    topics: ["great-cannon", "ddos", "network-injection", "censorship"],
    urlStatus: "publisher-canonical",
    notes:
      "The supplied citizenlab.org path has been replaced by the current research record. Review packet captures, attribution reasoning, Baidu's denial, distinctions from the Great Firewall, limitations, and later measurements before reporting state responsibility as more than the authors' technical attribution.",
  }),
  candidate({
    id: "lead-2017-nyt-xiao-jianhua-seized",
    title:
      "Billionaire Is Reported Seized From Hong Kong Hotel and Taken Into China",
    url: "https://www.nytimes.com/2017/01/31/world/asia/xiao-jianhua-china-hong-kong-billionaire.html",
    publisher: "The New York Times",
    publishedAt: "2017-01-31",
    contentType: "reporting",
    topics: ["xiao-jianhua", "hong-kong", "detention", "finance"],
    accessStatus: "paywalled",
    notes:
      "The headline correctly signals an early reported account. Preserve attribution and add the later prosecution, 2022 conviction and sentence, company history, official record, Hong Kong jurisdiction questions, and unresolved details about the transfer.",
  }),
  candidate({
    id: "lead-2023-dan-wang-2022-letter",
    title: "2022 letter",
    url: "https://danwang.co/2022-letter/",
    publisher: "Dan Wang",
    publishedAt: "2023-03-04",
    byline: "Dan Wang",
    contentType: "analysis",
    topics: ["yunnan", "shanghai-lockdown", "everyday-life", "personal-essay"],
    urlStatus: "publisher-canonical",
    notes:
      "A long first-person annual letter combines travel observation, reported anecdotes, historical reading, and political interpretation. Preserve that mixed genre, verify externally cited claims, protect private individuals, and do not generalize the author's Shanghai and Yunnan experiences to all of China.",
  }),
  candidate({
    id: "lead-2021-smallcaps-nuclear-reactors",
    title: "China to supercharge uranium race with 150 new nuclear reactors",
    url: "https://smallcaps.com.au/article/china-supercharge-uranium-race-150-new-nuclear-reactors",
    publisher: "Small Caps",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["nuclear-energy", "uranium", "reactors", "investment"],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected as derivative investment-oriented coverage of a reported 15-year projection. Review the underlying plan, reactor registry, approvals, construction starts, completions, cancellations, and current official targets instead.",
    notes:
      "The figure is a forward-looking plan, not 150 built or approved reactors, and the uranium-investment framing creates incentives that require stronger primary sourcing.",
  }),
  candidate({
    id: "lead-2022-social-world-cup-crowd-shots",
    title: "Comparison of CCTV and international World Cup crowd shots",
    url: "https://twitter.com/billbirtles/status/1596935475725406208",
    publisher: "Social post",
    publishedAt: "2022-11-27",
    contentType: "primary",
    topics: ["world-cup", "cctv", "broadcast-editing", "zero-covid"],
    accessStatus: "unstable",
    disposition: "rejected",
    decisionReason:
      "Rejected because a social post is not a stable canonical article. The observable broadcast comparison may be reviewed as a primary artifact only alongside preserved footage, match and feed identification, a sampling method, broadcaster response, and independent reporting.",
    notes:
      "Do not infer motive from a short side-by-side clip. Later reporting found a reduction rather than total removal of crowd close-ups and discussed alternative broadcast practices and the zero-Covid context.",
  }),
  candidate({
    id: "lead-2014-reuters-gmail-blocked",
    title: "Gmail blocked in China",
    url: "https://www.reuters.com/article/2014/12/29/google-china-idUSL3N0UD21W20141229",
    publisher: "Reuters",
    publishedAt: "2014-12-29",
    contentType: "reporting",
    topics: ["gmail", "internet-blocking", "google", "network-measurement"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Verify the contemporaneous Google transparency data and independent network measurements, distinguish web and client protocols, document geography and duration, include official and Google responses, and check current service availability.",
  }),
  candidate({
    id: "lead-2019-cnbc-japan-us-treasurys",
    title: "Japan surpasses China as largest foreign holder of US Treasurys",
    url: "https://www.cnbc.com/2019/08/15/japan-surpasses-china-as-largest-foreign-holder-of-us-treasurys.html",
    publisher: "CNBC",
    publishedAt: "2019-08-15",
    contentType: "reporting",
    topics: ["us-treasurys", "japan", "foreign-holdings", "finance"],
    notes:
      "Use the dated U.S. Treasury TIC table as controlling evidence. Record valuation and custodial-location caveats, revisions, month boundaries, official versus private holdings, and later rankings; do not present a 2019 crossover as current.",
  }),
  candidate({
    id: "lead-2021-baker-mckenzie-encryption-import-control",
    title: "MOFCOM Issues New Encryption Import Control Effective Immediately",
    url: "https://sanctionsnews.bakermckenzie.com/mofcom-issues-new-encryption-import-control-effective-immediately/",
    publisher: "Baker McKenzie",
    publishedAt: "2021-11-11",
    byline: "Tina Li and Frank Pan",
    contentType: "analysis",
    topics: ["encryption", "import-controls", "mofcom", "technology-transfer"],
    urlStatus: "publisher-canonical",
    notes:
      "Legal-client analysis is useful context but not controlling law. Review the Chinese Technology Catalogue, effective date, definitions of technology transfer and key length, licensing procedure, exceptions, enforcement, and any later amendments.",
  }),
  candidate({
    id: "lead-2018-reuters-muslim-camps",
    title: "Tracking China's Muslim Gulag",
    url: "https://www.reuters.com/investigates/special-report/muslims-camps-china/",
    publisher: "Reuters",
    publicationYear: 2018,
    contentType: "reporting",
    topics: ["xinjiang", "detention", "satellite-imagery", "human-rights"],
    accessStatus: "restricted",
    notes:
      "Review the complete visual investigation, imagery dates and providers, geolocation method, facility classification, witness accounts, uncertainty, official responses, and later construction or policy changes. Do not collapse all facilities or periods into one undifferentiated claim.",
  }),
  candidate({
    id: "lead-2011-spacex-us-china-costs",
    title: "Why the US can beat China: the facts about SpaceX costs",
    url: "https://www.spacex.com/updates.php",
    publisher: "SpaceX",
    publicationYear: 2011,
    contentType: "primary",
    topics: ["spacex", "launch-costs", "china", "aerospace"],
    accessStatus: "unavailable",
    disposition: "rejected",
    decisionReason:
      "Rejected because the supplied generic updates endpoint no longer identifies a stable article or preserved company statement. A Dispatch cannot be reconstructed from the submitted title or later quotations without a publisher-authorized copy.",
    notes:
      "Even if recovered, company cost comparisons would require matched mission scope, pricing year, subsidies, reliability, vehicle configuration, and independent data.",
  }),
  candidate({
    id: "lead-2016-bloomberg-subprime-crisis",
    title: "China's Subprime Crisis Is Here",
    url: "https://www.bloomberg.com/gadfly/articles/2016-02-17/china-s-600-billion-subprime-crisis-is-already-here",
    publisher: "Bloomberg Opinion",
    publishedAt: "2016-02-17",
    contentType: "analysis",
    topics: ["finance", "shadow-banking", "consumer-credit", "risk"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "The crisis label is commentary, not a measured event. Recover the full argument, define the compared credit products and denominator, inspect cited data and subsequent losses or regulation, and avoid mapping U.S. subprime terminology onto unlike Chinese instruments without analysis.",
  }),
  candidate({
    id: "lead-2017-economist-bullet-train-network",
    title: "China has built the world’s largest bullet-train network",
    url: "https://www.economist.com/news/china/21714383-and-theres-lot-more-come-it-waste-money-china-has-built-worlds-largest",
    publisher: "The Economist",
    publishedAt: "2017-01-13",
    contentType: "reporting",
    topics: [
      "high-speed-rail",
      "infrastructure",
      "transport",
      "public-finance",
    ],
    accessStatus: "paywalled",
    notes:
      "The network-size fact requires a dated route-kilometre definition. Review ridership, utilization, fares, debt, conventional-rail displacement, regional variation, claimed development effects, later expansion, and the article's waste-versus-benefit methodology.",
  }),
  candidate({
    id: "lead-2019-atlantic-china-recycling-ban",
    title: "What Happens Now That China Won't Take U.S. Recycling",
    url: "https://www.theatlantic.com/technology/archive/2019/03/china-has-stopped-accepting-our-trash/584131/",
    publisher: "The Atlantic",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["recycling", "waste-trade", "plastics", "municipal-services"],
    accessStatus: "paywalled",
    notes:
      "Review the National Sword rules and material-specific contamination thresholds, trade data, local U.S. outcomes, displacement to other countries, environmental impacts, and later Basel and domestic-policy changes. 'Won't take recycling' is broader than the actual restrictions.",
  }),
  candidate({
    id: "lead-2017-mashable-xinjiang-spyware",
    title:
      "China forces one of its Muslim minorities to install spyware on their phones",
    url: "https://mashable.com/2017/07/21/china-spyware-xinjiang/",
    publisher: "Mashable",
    publishedAt: "2017-07-21",
    contentType: "reporting",
    topics: ["xinjiang", "mobile-surveillance", "uyghurs", "jingwang"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Derivative reporting requires the original notice, app package and technical analysis, enforcement geography, affected populations, device scope, police practice, and later evidence. Preserve the 2017 period and avoid treating one notice as timeless nationwide behavior.",
  }),
  candidate({
    id: "lead-2017-atlas-obscura-china-girls",
    title: "The Forgotten ‘China Girls’ Hidden at the Beginning of Old Films",
    url: "https://www.atlasobscura.com/articles/the-forgotten-china-girls-hidden-at-the-beginning-of-old-films",
    publisher: "Atlas Obscura",
    publishedAt: "2017-01-30",
    byline: "Sarah Laskow",
    contentType: "reporting",
    topics: [
      "film-laboratories",
      "color-calibration",
      "cinema-history",
      "terminology",
    ],
    urlStatus: "publisher-canonical",
    disposition: "rejected",
    decisionReason:
      "Rejected from this China corpus because the historical film-laboratory term is not evidence about China or Chinese life. It may be reconsidered only in a separately scoped global cinema-technology collection.",
    notes:
      "The article concerns calibration leader images, lab workers, race and film-processing history. Keyword overlap must not create a misleading China Dispatch.",
  }),
  candidate({
    id: "lead-2017-nyt-cia-informants",
    title: "Killing C.I.A. Informants, China Crippled U.S. Spying Operations",
    url: "https://www.nytimes.com/2017/05/20/world/asia/china-cia-spies-espionage.html",
    publisher: "The New York Times",
    publishedAt: "2017-05-20",
    contentType: "reporting",
    topics: ["cia", "espionage", "informants", "counterintelligence"],
    accessStatus: "paywalled",
    notes:
      "Highly sensitive claims rely substantially on unnamed former officials. Review attribution density, competing explanations for the network compromise, known prosecutions, Chinese responses, later reporting, and avoid presenting disputed technical causes or casualty counts as settled.",
  }),
  candidate({
    id: "lead-2023-nl-times-journalist-intimidation",
    title:
      "Dutch journalist who writes critically on China targeted in ‘bizarre’ intimidation scheme",
    url: "https://nltimes.nl/2023/04/08/dutch-journalist-writes-critically-china-targeted-bizarre-intimidation-scheme",
    publisher: "NL Times",
    publishedAt: "2023-04-08",
    contentType: "reporting",
    topics: [
      "journalists",
      "intimidation",
      "netherlands",
      "foreign-interference",
    ],
    urlStatus: "publisher-canonical",
    notes:
      "This is a secondary ANP/NL Times account of Marije Vlaskamp's reporting. Preserve that investigators had not identified the perpetrator, distinguish claimed Chinese-state affiliation from proof, include embassy and Dutch government responses, and review the later government-commissioned study.",
  }),
  candidate({
    id: "lead-2018-reuters-venezuela-zte-id",
    title: "How ZTE helps Venezuela create China-style social control",
    url: "https://www.reuters.com/investigates/special-report/venezuela-zte/",
    publisher: "Reuters",
    publicationYear: 2018,
    contentType: "reporting",
    topics: ["venezuela", "zte", "identity-cards", "surveillance"],
    accessStatus: "restricted",
    notes:
      "Review contracts, procurement records, database fields, observed uses, interviews, ZTE and Venezuelan responses, and changes since publication. Technical capability, intended welfare administration, alleged political use, and demonstrated individual tracking are separate claims.",
  }),
  candidate({
    id: "lead-2016-techcrunch-elevated-bus",
    title:
      "China has actually built an elevated bus that travels above car traffic",
    url: "https://techcrunch.com/2016/08/02/china-has-actually-built-that-elevated-bus-that-travels-above-car-traffic/",
    publisher: "TechCrunch",
    publishedAt: "2016-08-02",
    byline: "Fitz Tepper",
    contentType: "reporting",
    topics: ["transit-elevated-bus", "transport", "prototype", "investment"],
    urlStatus: "publisher-canonical",
    notes:
      "The road test did not establish a deployable transit system. Include the December 2016 abandonment report, design and road-clearance objections, financing allegations, 2017 arrests and legal outcomes, and distinguish a demonstration vehicle from commercial operation.",
  }),
  candidate({
    id: "lead-2019-bbc-wikipedia-editing",
    title: "China and Taiwan clash over Wikipedia edits",
    url: "https://www.bbc.com/news/technology-49921173",
    publisher: "BBC News",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["wikipedia", "taiwan", "editing", "information-conflict"],
    notes:
      "Review the cited edit histories, article-selection method, administrator actions, organized-editing evidence, Wikimedia response, language-edition differences, and later policy changes. Content disputes do not by themselves prove state coordination.",
  }),
  candidate({
    id: "lead-2015-instapainting-dafen",
    title: "How Do You Paint 10,000 Paintings a Month?",
    url: "https://www.instapainting.com/blog/company/2015/10/28/how-to-paint-10000-paintings/",
    publisher: "Instapainting",
    publishedAt: "2015-10-28",
    byline: "Chris Chen",
    contentType: "analysis",
    topics: ["dafen", "painting", "creative-labor", "manufacturing"],
    urlStatus: "publisher-canonical",
    notes:
      "Company first-person reporting mixes observed studios, business promotion, secondary history, and large unsourced industry estimates. Verify painter counts, output and market-share claims, labor arrangements, pay, subcontracting, artist perspectives, and later changes in Dafen.",
  }),
  candidate({
    id: "lead-2018-buzzfeed-google-worker-letter",
    title:
      "Googlers are openly asking bosses to cancel the censored search engine for China",
    url: "https://www.buzzfeednews.com/article/daveyalba/china-google-workers-letter-cancel-company-secret-dragonfly",
    publisher: "BuzzFeed News",
    publicationYear: 2018,
    contentType: "reporting",
    topics: [
      "google",
      "project-dragonfly",
      "employees",
      "workplace-organizing",
    ],
    accessStatus: "restricted",
    notes:
      "Recover the complete article and employee letter, verify signer count and date, distinguish worker demands from company decisions, include management response and later termination testimony, and account for BuzzFeed News archival stability.",
  }),
  candidate({
    id: "lead-2020-greenwich-hong-kong-control",
    title: "China signals plan to take full control of Hong Kong",
    url: "https://www.greenwichtime.com/news/article/China-signals-plan-to-take-full-control-of-Hong-15285627.php",
    publisher: "Greenwich Time",
    publishedAt: "2020-05-21",
    contentType: "reporting",
    topics: ["hong-kong", "national-security-law", "autonomy", "syndication"],
    accessStatus: "unavailable",
    disposition: "rejected",
    decisionReason:
      "Rejected because the supplied syndication page no longer exposes this article and stronger canonical reporting and primary legal records are available. The headline also overstates a proposal as completed total control.",
    notes:
      "A replacement review should start with the May 2020 NPC decision, the enacted June 2020 law, Hong Kong implementation, court records, official explanations, critics' analysis, and later institutional changes.",
  }),
  candidate({
    id: "lead-2016-bbc-paris-ratification",
    title: "Paris climate deal: US and China announce ratification",
    url: "https://www.bbc.com/news/world-asia-china-37265541",
    publisher: "BBC News",
    publishedAt: "2016-09-03",
    contentType: "reporting",
    topics: ["paris-agreement", "climate", "ratification", "diplomacy"],
    urlStatus: "redirect-resolved",
    notes:
      "Verify the deposited instruments and legal dates through the UN treaty record. Preserve the distinction between ratification and emissions outcomes, and add later U.S. withdrawal and re-entry chronology plus updated national commitments and performance data.",
  }),
  candidate({
    id: "lead-2016-fortune-manufacturing-forecast",
    title:
      "The U.S. Will Surpass China as the No. 1 Country for Manufacturing by 2020",
    url: "https://fortune.com/2016/03/31/united-states-manufacturing-china/",
    publisher: "Fortune",
    publishedAt: "2016-03-31",
    byline: "Chris Matthews",
    contentType: "reporting",
    topics: ["manufacturing", "competitiveness", "forecast", "labor"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "The headline reports executives' 2016 forecast from a Deloitte and Council on Competitiveness index, not an observed 2020 outcome. Recover the survey method and definition, compare the prediction with actual output, value added, exports, productivity and employment, and document metric changes.",
  }),
];
