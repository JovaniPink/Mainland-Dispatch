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
  collectionId: "china-article-corpus-2026-07-07",
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

/** Seventh neutral article-candidate batch. Discovery-platform data is intentionally absent. */
export const chinaArticleIntake07 = [
  candidate({
    id: "lead-2017-nyt-skype-china-app-stores",
    title: "Skype vanishes from app stores in China, including Apple's",
    url: "https://www.nytimes.com/2017/11/21/business/skype-app-china.html",
    publisher: "The New York Times",
    publishedAt: "2017-11-21",
    contentType: "reporting",
    topics: ["skype", "app-stores", "apple", "internet-regulation"],
    accessStatus: "paywalled",
    notes:
      "Recover the complete article and Microsoft and Apple statements, identify stores, dates and cited law, distinguish delisting from network blocking, and document later Skype availability and app-store policy changes.",
  }),
  candidate({
    id: "lead-2023-phys-pingliangtai-water-pipes",
    title:
      "China's ancient water pipe networks show communal effort without evidence of centralized authority",
    url: "https://phys.org/news/2023-08-china-ancient-pipe-networks-communal.html",
    publisher: "Phys.org / University College London",
    publishedAt: "2023-08-14",
    byline: "University College London",
    contentType: "research",
    topics: ["archaeology", "pingliangtai", "water-management", "longshan"],
    urlStatus: "publisher-canonical",
    notes:
      "This is a university-supplied research release about a Nature Water paper, not independent reporting. Review the paper, excavation record, dating, settlement and burial evidence, authors' inference from an absence of hierarchical indicators, competing interpretations and limits on generalizing beyond Pingliangtai.",
  }),
  candidate({
    id: "lead-2012-nyt-access-blocked-wen-report",
    title: "China blocks web access to The New York Times after article",
    url: "https://www.nytimes.com/2012/10/26/world/asia/china-blocks-web-access-to-new-york-times.html",
    publisher: "The New York Times",
    publishedAt: "2012-10-25",
    contentType: "reporting",
    topics: [
      "new-york-times",
      "internet-blocking",
      "wen-jiabao",
      "press-freedom",
    ],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review contemporaneous multi-vantage DNS, IP and URL measurements; the underlying Wen-family investigation and response; government and publisher statements; geographic and protocol scope; duration; circumvention; and later access history.",
  }),
  candidate({
    id: "lead-2019-berlingske-faroe-huawei-recording",
    title:
      "Recording reportedly captured pressure on Faroe Islands over Huawei 5G deal",
    url: "https://www.berlingske.dk/internationalt/banned-recording-reveals-china-ambassador-threatened-faroese-leader",
    publisher: "Berlingske",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["faroe-islands", "huawei", "5g", "diplomacy"],
    accessStatus: "paywalled",
    notes:
      "Recover the full authorized article and recording, translation and legal context for the broadcast restriction. Identify speaker, exact words, audience and conditionality; include Faroese, Danish, Chinese and Huawei responses, procurement chronology and final network decision.",
  }),
  candidate({
    id: "lead-2025-inversecos-equation-group-china-sources",
    title: "An inside look at NSA Equation Group tactics from China's lens",
    url: "https://www.inversecos.com/2025/02/an-inside-look-at-nsa-equation-group.html",
    publisher: "Inversecos",
    publishedAt: "2025-02-18",
    byline: "Inversecos",
    contentType: "analysis",
    topics: ["nsa", "equation-group", "cybersecurity", "attribution"],
    urlStatus: "publisher-canonical",
    notes:
      "The author says the Chinese-source allegations remain independently unverified and presents an aggregation for defensive research. Retrieve every cited Qihoo 360, Pangu Lab and CVERC record, preserve that attribution boundary, validate indicators safely, seek U.S. and institutional responses, and separate useful TTPs from claims about operator identity.",
  }),
  candidate({
    id: "lead-2020-yale-e360-china-fishing-fleet",
    title:
      "How China's expanding fishing fleet is depleting the world's oceans",
    url: "https://e360.yale.edu/features/how-chinas-expanding-fishing-fleet-is-depleting-worlds-oceans",
    publisher: "Yale Environment 360 / The Outlaw Ocean Project",
    publishedAt: "2020-08-17",
    byline: "Ian Urbina",
    contentType: "reporting",
    topics: ["fishing", "oceans", "iuu-fishing", "satellite-data"],
    urlStatus: "publisher-canonical",
    notes:
      "Review the underlying satellite analysis, vessel-identification and illegality criteria, North Korean and other case boundaries, stock estimates, subsidies, flag and ownership complexity, Chinese responses, labor evidence, later enforcement and updated fleet data. Do not generalize documented subsets to every Chinese vessel.",
  }),
  candidate({
    id: "lead-2019-engadget-state-ads-hong-kong",
    title: "Platform displays China-made ads attacking Hong Kong protesters",
    url: "https://www.engadget.com/2019/08/18/twitter-china-ads-attack-hong-kong-protesters",
    publisher: "Engadget",
    publishedAt: "2019-08-18",
    contentType: "reporting",
    topics: ["hong-kong", "advertising", "state-media", "platform-governance"],
    urlStatus: "publisher-canonical",
    notes:
      "Recover the ad-transparency records, purchaser identities, creative, targeting and run dates. Distinguish paid state-media advertising from later coordinated-account enforcement, include platform and advertiser responses and policy changes, and avoid inferring audience effect without evidence.",
  }),
  candidate({
    id: "lead-2015-wapo-china-cement-comparison",
    title:
      "How China used more cement in three years than the U.S. did in the entire 20th century",
    url: "https://www.washingtonpost.com/news/wonk/wp/2015/03/24/how-china-used-more-cement-in-3-years-than-the-u-s-did-in-the-entire-20th-century/",
    publisher: "The Washington Post",
    publishedAt: "2015-03-24",
    contentType: "analysis",
    topics: ["cement", "construction", "urbanization", "statistics"],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Reproduce the comparison from the cited USGS series, units and exact 2011–2013 and 1901–2000 boundaries. Check cement versus concrete terminology, data revisions and U.S. historical coverage, then add infrastructure, property, emissions, overcapacity and later consumption context.",
  }),
  candidate({
    id: "lead-2021-reuters-600kph-maglev",
    title: "China unveils 600 kph maglev train",
    url: "https://www.reuters.com/world/china/china-unveils-600-kph-maglev-train-state-media-2021-07-20/",
    publisher: "Reuters",
    publishedAt: "2021-07-20",
    contentType: "reporting",
    topics: ["maglev", "rail", "prototype", "transport"],
    accessStatus: "restricted",
    urlStatus: "publisher-canonical",
    notes:
      "Unveiling a trainset and design speed is not commercial operation at 600 kph. Review CRRC and state-media records, test evidence, guideway compatibility, certification, route proposals, economics, energy and later deployment status.",
  }),
  candidate({
    id: "lead-2015-bloomberg-rich-kids",
    title: "Children of the yuan percent: everyone hates China's rich kids",
    url: "https://www.bloomberg.com/news/features/2015-10-01/children-of-the-yuan-percent-everyone-hates-china-s-rich-kids",
    publisher: "Bloomberg",
    publishedAt: "2015-10-01",
    contentType: "reporting",
    topics: ["wealth", "inequality", "youth", "culture"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "The headline is provocative and 'rich kids' is not a defined population. Review interview selection, wealth and education data, terminology, stereotypes, counterexamples, privacy and later inequality and mobility evidence before considering a culture Dispatch.",
  }),
  candidate({
    id: "lead-2017-global-voices-chat-admin-rules",
    title: "China makes chat-group administrators liable for unlawful messages",
    url: "https://globalvoices.org/2017/09/13/china-makes-chat-group-administrators-i-e-regular-users-criminally-liable-for-unlawful-messages/",
    publisher: "Global Voices",
    publishedAt: "2017-09-13",
    contentType: "analysis",
    topics: ["chat-groups", "platform-governance", "law", "weixin"],
    urlStatus: "publisher-canonical",
    notes:
      "The supplied headline overstates administrative platform rules as automatic criminal liability. Start with the CAC provisions and authoritative translation, distinguish administrator duties, platform enforcement, administrative penalties and criminal law, then find cases and qualified legal analysis.",
  }),
  candidate({
    id: "lead-2024-economist-diaspora-espionage",
    title: "How China turns members of its diaspora into spies",
    url: "https://www.economist.com/china/2024/12/26/how-china-turns-members-of-its-diaspora-into-spies",
    publisher: "The Economist",
    publishedAt: "2024-12-26",
    contentType: "reporting",
    topics: ["diaspora", "espionage", "transnational-repression", "security"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Avoid treating a diverse diaspora as a security category. Review every named case and court record, distinguish recruitment, coercion, influence, community contact and adjudicated spying, include defenses and official responses, quantify only with valid denominators and address profiling risks.",
  }),
  candidate({
    id: "lead-2018-npr-research-funding",
    title:
      "China expands research funding, luring U.S. scientists and students",
    url: "https://www.npr.org/sections/health-shots/2018/11/27/669645323/china-expands-research-funding-luring-u-s-scientists-and-students",
    publisher: "NPR",
    publishedAt: "2018-11-27",
    contentType: "reporting",
    topics: ["research-funding", "science", "talent", "universities"],
    notes:
      "Review cited spending series in comparable currencies and purchasing power, program terms, interview selection, institutional differences and mobility data. Add later talent-program scrutiny, disclosure cases, policy changes and the distinction between collaboration and misconduct.",
  }),
  candidate({
    id: "lead-2020-bbc-mardan-ghappar-video",
    title:
      "China Uighurs: a model's video gives a rare glimpse inside internment",
    url: "https://www.bbc.com/news/world-asia-china-53650246",
    publisher: "BBC News",
    publishedAt: "2020-08-04",
    contentType: "reporting",
    topics: ["mardan-ghappar", "xinjiang", "detention", "video"],
    notes:
      "Review the complete video and transmission chain, identity and location verification, translation, detention chronology, family account and Chinese response. Separate what the footage visibly establishes from claims it cannot independently prove and add later information about Gappar.",
  }),
  candidate({
    id: "lead-2023-npr-u2-balloon-photo",
    title: "U-2 pilot's selfie above China's balloon taken over Missouri",
    url: "https://www.npr.org/2023/02/23/1159007203/selfie-china-balloon-photo",
    publisher: "NPR",
    publishedAt: "2023-02-23",
    contentType: "reporting",
    topics: ["balloon", "u-2", "surveillance", "united-states"],
    notes:
      "Use the Defense Department image and statements as primary records, establish date and location, and separate what the photograph shows from intelligence assessments of purpose and capability. Include Chinese responses, recovery analysis and later official findings.",
  }),
  candidate({
    id: "lead-2017-nyt-mattala-airport",
    title:
      "What the world's emptiest international airport says about China's influence",
    url: "https://www.nytimes.com/2017/09/13/magazine/what-the-worlds-emptiest-international-airport-says-about-chinas-influence.html",
    publisher: "The New York Times Magazine",
    publishedAt: "2017-09-13",
    contentType: "reporting",
    topics: [
      "sri-lanka",
      "mattala-airport",
      "infrastructure",
      "development-finance",
    ],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "The superlative and influence frame require passenger and flight data, financing contracts, Sri Lankan decision-making, project forecasts and alternatives. Add later airport operations, restructuring and the distinction between Mattala and Hambantota port narratives.",
  }),
  candidate({
    id: "lead-2025-carscoops-tesla-sales-decline",
    title: "Tesla sales decline across several markets, including China",
    url: "https://www.carscoops.com/2025/03/tesla-sales-falling-off-a-cliff-globally-including-germany-australia-and-china/",
    publisher: "Carscoops",
    publicationYear: 2025,
    contentType: "reporting",
    topics: ["tesla", "vehicle-sales", "electric-vehicles", "markets"],
    disposition: "rejected",
    decisionReason:
      "Rejected as sensational derivative aggregation of partial monthly registration and wholesale figures across incomparable markets. A new Dispatch should start with official market-specific series, consistent definitions and later quarterly filings.",
    notes:
      "Do not combine registrations, deliveries, wholesale and exports or infer a global structural trend from selected early-month comparisons. Separate seasonality, product changeovers, incentives and market-specific competition.",
  }),
  candidate({
    id: "lead-2019-nyt-eastern-china-cfc11",
    title:
      "Study pinpoints source of banned gas that saps ozone layer: eastern China",
    url: "https://www.nytimes.com/2019/05/22/climate/china-cfcs-banned-chemicals-ozone.html",
    publisher: "The New York Times",
    publishedAt: "2019-05-22",
    contentType: "reporting",
    topics: ["cfc-11", "ozone", "emissions", "atmospheric-science"],
    accessStatus: "paywalled",
    notes:
      "Review the Nature study, atmospheric station coverage, inverse-model assumptions, uncertainty and regional attribution limits; distinguish emissions from specific facilities; include Chinese enforcement response and later research showing emissions declines.",
  }),
  candidate({
    id: "lead-2018-reuters-apple-icloud-keys",
    title: "Apple moves to store iCloud keys in China, raising rights concerns",
    url: "https://www.reuters.com/article/us-china-apple-icloud-insight/apple-moves-to-store-icloud-keys-in-china-raising-human-rights-fears-idUSKCN1G8060",
    publisher: "Reuters",
    publishedAt: "2018-02-24",
    contentType: "reporting",
    topics: ["apple", "icloud", "encryption-keys", "data-localization"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "Review Apple's notices and support documents, GCBD ownership and operations, account migration scope, key architecture, legal-process rules and expert claims. Distinguish storage location, key custody and demonstrated access, and add later service and transparency developments.",
  }),
  candidate({
    id: "lead-2019-reuters-australia-parliament-hack-attribution",
    title: "Australia concluded China was behind parliament and party hacks",
    url: "https://www.reuters.com/article/idUSKBN1W00VF",
    publisher: "Reuters",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["australia", "parliament", "cybersecurity", "attribution"],
    accessStatus: "restricted",
    urlStatus: "redirect-resolved",
    notes:
      "This was unnamed-source reporting that the government privately reached an attribution while declining public disclosure. Recover official incident records, technical indicators if released, affected systems and data, Chinese response, later government statements and the difference between confidence assessment and public proof.",
  }),
  candidate({
    id: "lead-2018-bloomberg-guangzhou-health-incident",
    title: "U.S. employee in China suffers brain injury after sound sensations",
    url: "https://www.bloomberg.com/news/articles/2018-05-23/u-s-says-china-employee-hit-with-sound-sensations-brain-injury",
    publisher: "Bloomberg",
    publishedAt: "2018-05-23",
    contentType: "reporting",
    topics: ["guangzhou", "health-incident", "diplomacy", "uncertainty"],
    accessStatus: "paywalled",
    notes:
      "Preserve the 2018 allegation-stage uncertainty and avoid the loaded Cuba analogy as evidence of mechanism. Review State Department notices, de-identified medical findings, exposure evidence, Chinese response and later intelligence, scientific and medical assessments of anomalous health incidents.",
  }),
  candidate({
    id: "lead-2017-mricon-china-travel-laptop",
    title: "Securing a laptop for travel to China",
    url: "https://mricon.com/i/travel-laptop-setup.html",
    publisher: "mricon.com",
    publicationYear: 2017,
    contentType: "analysis",
    topics: ["travel-security", "laptops", "threat-modeling", "operations"],
    urlStatus: "publisher-canonical",
    notes:
      "Treat this as one practitioner's dated threat model and setup, not proof of compromise prevalence. Review software versions, assumptions, employer and government guidance, border-search law, usability costs and current security practice; never publish operational secrets or imply guarantees.",
  }),
  candidate({
    id: "lead-2019-ft-google-circumvention-ads",
    title: "Google blocks China ads that help bypass censorship",
    url: "https://www.ft.com/content/1091cf20-5209-11e9-b401-8d9ef1626294",
    publisher: "Financial Times",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["google", "advertising", "vpn", "censorship-circumvention"],
    accessStatus: "paywalled",
    urlStatus: "publisher-canonical",
    notes:
      "Recover the full article, specific advertiser cases, Google policy and enforcement explanation, ad geography and timing. Distinguish content policy from government direction, include vendor and rights-group responses and later advertising and app-distribution changes.",
  }),
  candidate({
    id: "lead-2019-phys-pesticide-bans-comparison",
    title:
      "Study compares U.S., EU, Brazil and China restrictions on pesticides",
    url: "https://phys.org/news/2019-06-usa-lags-eu-brazil-china.html",
    publisher: "Phys.org",
    publicationYear: 2019,
    contentType: "research",
    topics: ["pesticides", "regulation", "public-health", "comparative-policy"],
    notes:
      "The categorical supplied headline must be tested against the underlying peer-reviewed study. Review active-ingredient selection, hazard and use definitions, federal and subnational rules, dates, enforcement and exposure data; banning more substances alone does not establish lower harm.",
  }),
  candidate({
    id: "lead-2025-icpcb-cxmt-ipo",
    title: "CXMT reportedly targets a $4.2 billion IPO",
    url: "https://www.ic-pcb.com/chinas-leading-dram-maker-cxmt-targets-42-billion-ipo-as-it-takes-on-samsung-sk-hynix-and-micron.html",
    publisher: "IC-PCB",
    publicationYear: 2025,
    contentType: "reporting",
    topics: ["cxmt", "ipo", "dram", "semiconductors"],
    disposition: "rejected",
    decisionReason:
      "Rejected as derivative trade-site coverage of an anticipated transaction. A Dispatch should wait for a prospectus, exchange filing or attributable company statement and use audited financial, ownership, capacity and risk disclosures.",
    notes:
      "A target valuation and offering size are not completed facts. Verify whether an application was filed, identify currency and share structure, and distinguish production capacity, technology generation and market share.",
  }),
  candidate({
    id: "lead-2019-quartz-hong-kong-disinformation-accounts",
    title:
      "China-linked Hong Kong disinformation used repurposed adult-content accounts",
    url: "https://qz.com/1700550/china-sows-hong-kong-disinformation-using-twitter-porn-accounts/",
    publisher: "Quartz",
    publicationYear: 2019,
    contentType: "reporting",
    topics: [
      "hong-kong",
      "disinformation",
      "coordinated-accounts",
      "attribution",
    ],
    accessStatus: "paywalled",
    notes:
      "Review the platform takedown dataset and attributed information-operation archive, account-history method, sample size and analyst report. Distinguish platform attribution from demonstrated state direction, avoid sensational selection bias and add later research and enforcement.",
  }),
  candidate({
    id: "lead-2010-webcache-internet-traffic-hijack",
    title:
      "Claim that China hijacked 15 percent of global internet traffic for 18 minutes",
    url: "http://webcache.googleusercontent.com/search?q=cache:4lR05JZoeUMJ:www.nationaldefensemagazine.org/blog/Lists/Posts/Post.aspx%3FID%3D249+http://www.nationaldefensemagazine.org/blog/Lists/Posts/Post.aspx%3FID%3D249&hl=en&gl=us&strip=0",
    publisher: "Obsolete web cache",
    publicationYear: 2010,
    contentType: "reporting",
    topics: ["bgp", "internet-routing", "attribution", "network-measurement"],
    accessStatus: "unavailable",
    disposition: "rejected",
    decisionReason:
      "Rejected because the supplied cache URL is dead and the extraordinary 15-percent claim was contested over measurement, route propagation and intent. Revisit only from preserved BGP data, the original report and independent technical analyses.",
    notes:
      "A routing leak is not automatically an intentional hijack, observed route announcements are not the same as measured traffic volume, and geographic origin does not establish state direction.",
  }),
  candidate({
    id: "lead-2018-bloomberg-p2p-lender-failures",
    title: "China's peer-to-peer lenders fall as panic spreads",
    url: "https://www.bloomberg.com/news/articles/2018-07-20/china-s-p2p-platform-failures-surge-as-panic-spreads-in-market",
    publisher: "Bloomberg",
    publishedAt: "2018-07-20",
    contentType: "reporting",
    topics: ["peer-to-peer-lending", "finance", "defaults", "regulation"],
    accessStatus: "paywalled",
    notes:
      "Define platform failure, default, fraud and wind-down; recover the cited tracker's coverage and denominator; distinguish lender, borrower and depositor losses; review regulation and protests; and add the later industry cleanup and court outcomes.",
  }),
  candidate({
    id: "lead-2015-nyt-south-china-sea-construction",
    title: "What China has been building in the South China Sea",
    url: "https://www.nytimes.com/interactive/2015/07/30/world/asia/what-china-has-been-building-in-the-south-china-sea.html",
    publisher: "The New York Times",
    publishedAt: "2015-07-30",
    contentType: "reporting",
    topics: [
      "south-china-sea",
      "islands",
      "satellite-imagery",
      "maritime-disputes",
    ],
    accessStatus: "paywalled",
    urlStatus: "redirect-resolved",
    notes:
      "Review all imagery dates, providers, geolocation and annotations; distinguish land reclamation, civilian facilities, military capability and legal status; include competing claims and responses, the 2016 arbitral award and later construction and deployment evidence.",
  }),
  candidate({
    id: "lead-2017-techcrunch-bbc-cctv-demo",
    title: "China's CCTV network took seven minutes to locate a BBC reporter",
    url: "https://techcrunch.com/2017/12/13/china-cctv-bbc-reporter/",
    publisher: "TechCrunch",
    publishedAt: "2017-12-13",
    contentType: "reporting",
    topics: ["cctv", "facial-recognition", "bbc", "surveillance"],
    urlStatus: "publisher-canonical",
    notes:
      "This was a prearranged demonstration, not a blinded benchmark or proof of universal real-time coverage. Review the original BBC segment, system and watch-list enrollment, search area, operator role, false positives, vendor and police claims, legal safeguards and later independent performance evidence.",
  }),
];
