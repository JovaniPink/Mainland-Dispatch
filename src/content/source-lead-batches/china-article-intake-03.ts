const accessAudit: Record<
  string,
  { accessStatus: "restricted" | "unavailable"; decisionReason: string }
> = {
  "lead-2018-reuters-healthy-life-expectancy": {
    accessStatus: "restricted",
    decisionReason:
      "The legacy publisher URL resolves but does not expose the full report. Review stops before source-read pending authorized access and the exact WHO dataset release.",
  },
  "lead-2019-cassandra-yuan-devaluation": {
    accessStatus: "unavailable",
    decisionReason:
      "The supplied article returns not found. Review stops pending a publisher archive; no Dispatch can rely on the headline or surviving snippets.",
  },
  "lead-2021-daily-business-group-crypto-illegal": {
    accessStatus: "restricted",
    decisionReason:
      "The publisher blocks full-text retrieval. Review stops before source-read pending authorized access and the controlling PBOC notice.",
  },
  "lead-2017-ap-china-esa-moon-outpost": {
    accessStatus: "unavailable",
    decisionReason:
      "The legacy publisher host no longer resolves. Review stops pending a publisher-authorized archive and primary ESA or CNSA records.",
  },
  "lead-2019-nyt-reuters-simon-cheng-torture": {
    accessStatus: "restricted",
    decisionReason:
      "The syndicated legacy report is not exposed as reviewable full text. Review stops before source-read pending authorized access, the first-person account, official response, and later record.",
  },
  "lead-2019-reuters-bitcoin-mining-draft-ban": {
    accessStatus: "restricted",
    decisionReason:
      "The legacy publisher URL resolves but does not expose the full report. Review stops before source-read pending authorized access and the cited NDRC catalogue and final policy history.",
  },
};

const lead = <T extends { id: string; paywall?: boolean }>(item: T) => {
  const audit = accessAudit[item.id];
  return {
    accessedAt: "2026-07-22",
    sourceOrigin: "user-sourcebook",
    reviewState: "supplied",
    evidenceStatus: "unverified",
    collectionId: "china-article-corpus-2026-07",
    disposition: "withheld",
    ...item,
    decisionReason:
      audit?.decisionReason ??
      (item.paywall
        ? "Full canonical text is paywalled; review stops before source-read until authorized full-text review and corroboration are complete."
        : "The canonical URL resolves, but full-text and supporting-evidence review is incomplete; review stops before source-read."),
    accessStatus:
      audit?.accessStatus ?? (item.paywall ? "paywalled" : "reachable"),
  };
};

/** Article candidates supplied for editorial review. Discovery metadata is intentionally omitted. */
export const chinaArticleIntake03 = [
  lead({
    id: "lead-2021-scmp-log4j-alibaba-cloud",
    title:
      "Apache Log4j bug: China’s industry ministry pulls support from Alibaba Cloud",
    url: "https://www.scmp.com/tech/big-tech/article/3160670/apache-log4j-bug-chinas-industry-ministry-pulls-support-alibaba-cloud",
    publisher: "South China Morning Post",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["log4j", "alibaba-cloud", "cybersecurity", "regulation"],
    paywall: true,
    notes:
      "Verify the MIIT record and the disclosure timeline. A reported suspension of a cooperation arrangement is not a finding that Alibaba caused Log4Shell, and vulnerability discovery, notification, and regulatory punishment are distinct events.",
  }),
  lead({
    id: "lead-2026-substack-china-jet-engines",
    title: "Why jet engines aren't made in China",
    url: "https://aakash.substack.com/p/why-jet-engines-arent-made-in-china",
    publisher: "Aakash Gupta / Substack",
    publishedAt: "2026-07-01",
    contentType: "analysis",
    topics: ["jet-engines", "aerospace", "manufacturing", "technology"],
    notes:
      "Recent explanatory essay, not a technical authority. Check program history, materials, manufacturing yields, certification, imports, and current engine deployments against specialist and primary sources; the headline must not become a timeless claim that China makes no jet engines.",
  }),
  lead({
    id: "lead-2017-nyt-urban-cashless-payments",
    title: "In Urban China, Cash Is Rapidly Becoming Obsolete",
    url: "https://www.nytimes.com/2017/07/16/business/china-cash-smartphone-payments.html",
    publisher: "The New York Times",
    publishedAt: "2017-07-16",
    contentType: "reporting",
    topics: ["mobile-payments", "cash", "cities", "consumer-life"],
    paywall: true,
    notes:
      "Historical urban snapshot. Do not generalize observed Alipay and WeChat Pay adoption to national cash disappearance; review rural, elderly, unbanked, accessibility, merchant, and later legal-tender evidence.",
  }),
  lead({
    id: "lead-2015-chinafile-dealmaking-culture",
    title: "Booze, Sex, and the Dark Art of Dealmaking in China",
    url: "http://www.chinafile.com/reporting-opinion/postcard/bro-code",
    publisher: "ChinaFile",
    publicationYear: 2015,
    contentType: "analysis",
    topics: ["business-culture", "gender", "elite-networks", "guanxi"],
    notes:
      "A period cultural essay with a bounded authorial perspective. Preserve its gendered and elite-network sample, seek Chinese and participant perspectives, and do not turn described practices into an essentialized national business culture.",
  }),
  lead({
    id: "lead-2021-noahpinion-tech-crackdown",
    title: "Why is China smashing its tech industry?",
    url: "https://noahpinion.substack.com/p/why-is-china-smashing-its-tech-industry",
    publisher: "Noahpinion / Substack",
    publicationYear: 2021,
    contentType: "analysis",
    topics: [
      "technology-policy",
      "regulation",
      "platforms",
      "political-economy",
    ],
    notes:
      "Opinionated causal synthesis. Separate the different regulatory campaigns, agencies, legal bases, sectors, and dates, then account for subsequent policy reversals before retaining any single explanation.",
  }),
  lead({
    id: "lead-2018-wsj-american-entrepreneurs-leaving",
    title:
      "American Entrepreneurs Who Flocked to China Are Heading Home, Disillusioned",
    url: "https://www.wsj.com/articles/american-entrepreneurs-who-flocked-to-china-are-heading-home-disillusioned-1544197068",
    publisher: "The Wall Street Journal",
    publishedAt: "2018-12-07",
    contentType: "reporting",
    topics: ["entrepreneurs", "expatriates", "business-climate", "migration"],
    paywall: true,
    notes:
      "Interview-led period reporting can show individual experiences, not the prevalence of a general exodus. Resolve sample selection, visa and sector context, investment data, and counterexamples.",
  }),
  lead({
    id: "lead-2018-reuters-healthy-life-expectancy",
    title: "China overtakes U.S. for healthy lifespan: WHO data",
    url: "https://www.reuters.com/article/us-health-lifespan/china-overtakes-us-for-healthy-lifespan-who-data-idUSKCN1IV15L",
    publisher: "Reuters",
    publishedAt: "2018-05-30",
    contentType: "reporting",
    topics: ["public-health", "healthy-life-expectancy", "who", "statistics"],
    notes:
      "Healthy life expectancy is a modeled metric, not total life expectancy or a general ranking of healthcare systems. Retrieve the exact WHO release, uncertainty and later revisions before comparison.",
  }),
  lead({
    id: "lead-2019-cassandra-yuan-devaluation",
    title:
      "Why Did China Just Devalue the Yuan? How Trade Works with Free-Floating Currency",
    url: "https://www.cassandracapital.net/post/why-did-china-just-devalue-the-yuan",
    publisher: "Cassandra Capital",
    publicationYear: 2019,
    contentType: "analysis",
    topics: ["yuan", "exchange-rates", "trade", "monetary-policy"],
    notes:
      "Explanatory blog, not a primary monetary-policy record. Preserve the difference between a managed exchange-rate regime and a free float, and verify the claimed policy action and motive against PBOC data and contemporaneous analysis.",
  }),
  lead({
    id: "lead-2019-marketplace-pulse-amazon-sellers",
    title:
      "40% of the top sellers on Amazon are based in China, according to research",
    url: "https://www.marketplacepulse.com/articles/40-of-merchants-on-amazon-based-in-china",
    publisher: "Marketplace Pulse",
    publicationYear: 2019,
    contentType: "analysis",
    topics: ["amazon", "sellers", "e-commerce", "cross-border-trade"],
    notes:
      "Commercial research estimate. Capture the marketplace, date, seller-location inference, definition of top or active seller, and denominator; seller share is not transaction or revenue share.",
  }),
  lead({
    id: "lead-2018-independent-social-credit-flights",
    title:
      "China blacklists millions from booking flights as 'social credit' introduced",
    url: "https://www.independent.co.uk/news/world/asia/china-social-credit-system-flight-booking-blacklisted-beijing-points-a8646316.html",
    publisher: "The Independent",
    publicationYear: 2018,
    contentType: "reporting",
    topics: [
      "social-credit",
      "court-enforcement",
      "travel-restrictions",
      "governance",
    ],
    notes:
      "High-risk headline framing. Distinguish court judgment-defaulter enforcement, sectoral blacklists, rail or air restrictions, financial credit, local pilots, and any scoring system; retrieve the responsible agency's records and avoid the monolithic national-score myth.",
  }),
  lead({
    id: "lead-2018-bloomberg-over-30-tech-jobs",
    title: "Over 30? Too Old for Tech Jobs in China",
    url: "https://www.bloomberg.com/news/features/2018-05-02/china-s-tech-industry-wants-youth-not-experience",
    publisher: "Bloomberg",
    publishedAt: "2018-05-02",
    contentType: "reporting",
    topics: ["ageism", "technology-work", "labor", "employment"],
    paywall: true,
    notes:
      "Reported workplace ageism deserves sector, occupation, gender, firm-size, and economic-cycle context. Interviews and job listings do not establish a universal age cutoff.",
  }),
  lead({
    id: "lead-2021-daily-business-group-crypto-illegal",
    title: "China declares cryptocurrency deals ‘illegal’",
    url: "https://dailybusinessgroup.co.uk/2021/09/bitcoin-falls-as-china-declares-crypto-illegal/",
    publisher: "Daily Business Group",
    publicationYear: 2021,
    contentType: "reporting",
    claimedGrade: "D",
    topics: ["cryptocurrency", "regulation", "pboc", "financial-risk"],
    notes:
      "Derivative report with insufficient authority for the legal claim. Resolve the joint PBOC notice and translation, jurisdiction and effective scope, and distinguish transactions, exchange services, mining, and private ownership.",
  }),
  lead({
    id: "lead-2015-errata-github-attack",
    title: "Pin-pointing China's attack against GitHub",
    url: "http://blog.erratasec.com/2015/04/pin-pointing-chinas-attack-against.html",
    publisher: "Errata Security",
    publishedAt: "2015-04-02",
    contentType: "analysis",
    topics: ["github", "great-cannon", "ddos", "network-measurement"],
    notes:
      "Independent technical analysis from the incident period. Preserve observation-versus-attribution limits and compare its mechanism and location claims with GitHub, Citizen Lab, packet evidence, and later peer-reviewed work.",
  }),
  lead({
    id: "lead-2019-nyt-twitter-hong-kong-trolls",
    title:
      "How China Unleashed Twitter Trolls to Discredit Hong Kong’s Protesters",
    url: "https://www.nytimes.com/interactive/2019/09/18/world/asia/hk-twitter.html",
    publisher: "The New York Times",
    publishedAt: "2019-09-18",
    contentType: "reporting",
    topics: ["hong-kong", "twitter", "information-operations", "attribution"],
    paywall: true,
    notes:
      "Review the platform dataset, account-selection method, coordination evidence, and attribution basis. A documented campaign does not justify treating all Chinese-language users or criticism of protesters as state-directed.",
  }),
  lead({
    id: "lead-2018-economist-xinjiang-police-state",
    title: "China has turned Xinjiang into a police state like no other",
    url: "https://www.economist.com/briefing/2018/05/31/china-has-turned-xinjiang-into-a-police-state-like-no-other",
    publisher: "The Economist",
    publishedAt: "2018-05-31",
    contentType: "reporting",
    topics: ["xinjiang", "surveillance", "detention", "human-rights"],
    paywall: true,
    notes:
      "Important but dated briefing. Reconstruct the source trail for detention and surveillance claims, include affected-community testimony and official responses, and update the chronology rather than projecting 2018 conditions unchanged.",
  }),
  lead({
    id: "lead-2019-inkstone-social-credit-system",
    title: "Life on the wrong side of China’s social credit system",
    url: "https://www.inkstonenews.com/china/chinas-13-million-discredited-individuals-face-discrimination-thanks-social-credit-system/article/3003319",
    publisher: "Inkstone News",
    publicationYear: 2019,
    contentType: "reporting",
    topics: [
      "social-credit",
      "judgment-defaulters",
      "blacklists",
      "daily-life",
    ],
    notes:
      "Case reporting needs precise program identity. Separate court judgment-defaulter lists and specific restrictions from financial credit and local point pilots; verify the 13-million denominator and date against primary records.",
  }),
  lead({
    id: "lead-2015-bloomberg-treasuries-yuan",
    title: "China Sells U.S. Treasuries to Support Yuan",
    url: "http://www.bloomberg.com/news/articles/2015-08-27/china-said-to-sell-treasuries-as-dollars-needed-for-yuan-support",
    publisher: "Bloomberg",
    publishedAt: "2015-08-27",
    contentType: "reporting",
    topics: ["treasuries", "yuan", "foreign-reserves", "market-intervention"],
    paywall: true,
    notes:
      "Contemporaneous reported estimates, potentially based on anonymous sources and indirect reserve data. Distinguish liquidity operations from geopolitical divestment and incorporate subsequent official data revisions.",
  }),
  lead({
    id: "lead-2017-ap-china-esa-moon-outpost",
    title: "China talking with European Space Agency about moon outpost",
    url: "http://bigstory.ap.org/article/c7d78ca284eb4347821fe2825e347ff7/china-talking-european-space-agency-about-moon-outpost",
    publisher: "Associated Press",
    publicationYear: 2017,
    contentType: "reporting",
    topics: ["moon", "esa", "space-cooperation", "exploration"],
    notes:
      "Talks and stated interest are not an agreement, funded program, or constructed outpost. The obsolete AP Big Story URL needs a canonical or archived copy, then later ESA and Chinese program records.",
  }),
  lead({
    id: "lead-2020-wsj-us-journalists-expelled",
    title: "China Bans Americans Working for WSJ, NYT, WaPo",
    url: "https://www.wsj.com/articles/china-bans-all-u-s-nationals-working-for-the-wall-street-journal-new-york-times-washington-post-whose-press-credentials-end-in-2020-11584464690",
    publisher: "The Wall Street Journal",
    publishedAt: "2020-03-17",
    contentType: "reporting",
    topics: ["journalists", "media", "diplomacy", "press-freedom"],
    paywall: true,
    notes:
      "Verify the exact credential and nationality rules from the government announcement, the affected staff, reciprocal US media restrictions, and later status. Preserve the chronology rather than using the headline as a current rule.",
  }),
  lead({
    id: "lead-2015-sam-altman-china",
    title: "China",
    url: "http://blog.samaltman.com/china",
    publisher: "Sam Altman",
    publicationYear: 2015,
    contentType: "analysis",
    topics: [
      "travel",
      "technology",
      "entrepreneurship",
      "personal-perspective",
    ],
    notes:
      "Personal travel and technology essay from 2015. It can document the author's impressions, not representative Chinese attitudes, business conditions, or a durable national trajectory.",
  }),
  lead({
    id: "lead-2019-cbc-concordia-uyghur-event",
    title:
      "China pressured Concordia University to cancel event with Uighur activist",
    url: "https://www.cbc.ca/news/canada/montreal/chinese-officials-concordia-university-cancel-event-with-uighur-activist-1.5074423",
    publisher: "CBC News",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["concordia", "uyghurs", "academic-freedom", "foreign-influence"],
    notes:
      "Resolve the event and cancellation timeline plus university, organizer, activist, and consular accounts. One alleged intervention does not establish the prevalence of influence across Canadian campuses.",
  }),
  lead({
    id: "lead-2013-bbc-jade-rabbit-moon",
    title: "China lands Jade Rabbit robot rover on Moon",
    url: "http://www.bbc.co.uk/news/science-environment-25356603",
    publisher: "BBC News",
    publicationYear: 2013,
    contentType: "reporting",
    topics: ["jade-rabbit", "change-3", "moon", "space"],
    notes:
      "Landing and rover deployment are distinct from long-term mission performance. Pair the breaking report with mission records and later accounts of the rover's mobility problems and scientific output.",
  }),
  lead({
    id: "lead-2019-nyt-reuters-simon-cheng-torture",
    title:
      "China Tortured Me over Hong Kong, Says Former British Consulate Employee",
    url: "https://www.nytimes.com/reuters/2019/11/20/world/asia/20reuters-hongkong-protests-britain.html",
    publisher: "Reuters via The New York Times",
    publishedAt: "2019-11-20",
    contentType: "reporting",
    topics: ["simon-cheng", "hong-kong", "detention", "torture-allegation"],
    notes:
      "Report the allegation with attribution and include UK and Chinese responses, available medical or documentary evidence, and later legal or diplomatic records. The retired syndication URL may require a canonical Reuters or archive copy.",
  }),
  lead({
    id: "lead-2017-cbc-personal-data-market",
    title:
      "China has wealth of data on what individuals are doing at a micro level",
    url: "http://www.cbc.ca/news/world/china-data-for-sale-privacy-1.3927137",
    publisher: "CBC News",
    publicationYear: 2017,
    contentType: "reporting",
    topics: ["personal-data", "data-brokers", "privacy", "surveillance"],
    notes:
      "Historical investigation into data markets. Keep demonstrated broker access separate from inferred government access, identify collection methods and samples, and account for China's later cybersecurity and personal-information laws.",
  }),
  lead({
    id: "lead-2017-wsj-tesla-shanghai-deal",
    title: "Tesla Strikes Deal With Shanghai to Build Factory in China",
    url: "https://www.wsj.com/articles/tesla-strikes-deal-with-shanghai-to-build-factory-in-china-1508670181?mod=e2fb&mg=prod/accounts-wsj",
    publisher: "The Wall Street Journal",
    publicationYear: 2017,
    contentType: "reporting",
    topics: ["tesla", "shanghai", "manufacturing", "foreign-investment"],
    paywall: true,
    notes:
      "Treat this as contemporaneous reporting on a preliminary arrangement, not the final factory agreement. Trace the 2018 deal, ownership rules, approvals, construction, and production separately.",
  }),
  lead({
    id: "lead-2017-scmp-unauthorized-vpns",
    title:
      "China tightens Great Firewall by declaring unauthorised VPN services illegal",
    url: "http://www.scmp.com/news/china/policies-politics/article/2064587/chinas-move-clean-vpns-and-strengthen-great-firewall",
    publisher: "South China Morning Post",
    publicationYear: 2017,
    contentType: "reporting",
    topics: ["vpn", "great-firewall", "internet-regulation", "miit"],
    paywall: true,
    notes:
      "The cleanup campaign and authorization rules need the controlling MIIT notice. Do not infer that every VPN use became instantly illegal; identify service-provider obligations, enterprise exceptions, enforcement, geography, and current status.",
  }),
  lead({
    id: "lead-2018-bloomberg-empty-homes",
    title: "A Fifth of China’s Homes Are Empty",
    url: "https://www.bloomberg.com/news/articles/2018-11-08/a-fifth-of-china-s-homes-are-empty-that-s-50-million-apartments",
    publisher: "Bloomberg",
    publishedAt: "2018-11-08",
    contentType: "reporting",
    topics: ["housing", "vacancy", "property", "survey"],
    paywall: true,
    notes:
      "Survey or model estimate, not a census count. Record the urban sample, denominator, definition and duration of vacancy, treatment of second homes, uncertainty, and 2018 date; do not reuse 50 million as current.",
  }),
  lead({
    id: "lead-2020-nikkei-tsmc-engineers",
    title: "China hires over 100 TSMC engineers in push for chip leadership",
    url: "https://asia.nikkei.com/Business/China-tech/China-hires-over-100-TSMC-engineers-in-push-for-chip-leadership",
    publisher: "Nikkei Asia",
    publicationYear: 2020,
    contentType: "reporting",
    topics: ["tsmc", "semiconductors", "engineers", "talent"],
    paywall: true,
    notes:
      "Recruiting count and company identities may rely on unnamed sources. Hiring does not itself prove technology transfer or capability parity; seek company responses, employment context, and later fab outcomes.",
  }),
  lead({
    id: "lead-2019-reuters-bitcoin-mining-draft-ban",
    title: "China says it wants to eliminate Bitcoin mining",
    url: "https://www.reuters.com/article/us-china-cryptocurrency/china-says-it-wants-to-eliminate-bitcoin-mining-idUSKCN1RL0C4",
    publisher: "Reuters",
    publishedAt: "2019-04-09",
    contentType: "reporting",
    topics: ["bitcoin", "mining", "ndrc", "industrial-policy"],
    notes:
      "This concerned an NDRC draft industry catalogue and consultation, not an immediate nationwide ban. Track the final catalogue and distinguish this 2019 proposal from the later 2021 mining crackdown.",
  }),
];
