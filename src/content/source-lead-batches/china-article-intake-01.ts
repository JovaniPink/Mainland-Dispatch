const accessAudit: Record<
  string,
  { accessStatus: "restricted" | "unstable"; decisionReason: string }
> = {
  "lead-2019-reddit-blizzard-weibo-apology": {
    accessStatus: "unstable",
    decisionReason:
      "The supplied page is a repost of a company statement, not the canonical statement. Review stops pending an authenticated first-party Weibo record and independent context.",
  },
  "lead-2015-marketwatch-stock-drop": {
    accessStatus: "restricted",
    decisionReason:
      "The publisher blocks full-text retrieval. Review stops before source-read pending authorized access and the underlying exchange data.",
  },
  "lead-2020-reuters-pboc-liquidity": {
    accessStatus: "restricted",
    decisionReason:
      "The legacy publisher URL resolves but does not expose the full report. Review stops before source-read pending authorized access and the PBOC notice.",
  },
  "lead-2018-reuters-cloudhopper-hpe-ibm": {
    accessStatus: "restricted",
    decisionReason:
      "The legacy publisher URL resolves but does not expose the full report. Review stops before source-read pending authorized access and the cited indictments and company responses.",
  },
  "lead-2019-x-social-surveillance-database-leak": {
    accessStatus: "unstable",
    decisionReason:
      "A social post is not a durable or independently verified record. Review stops pending preserved technical evidence, affected-party confirmation, and independent reporting.",
  },
  "lead-2019-reuters-samsung-phone-production": {
    accessStatus: "restricted",
    decisionReason:
      "The legacy publisher URL resolves but does not expose the full report. Review stops before source-read pending authorized access and Samsung's contemporaneous statement.",
  },
  "lead-2016-wapo-internet-censorship-works": {
    accessStatus: "restricted",
    decisionReason:
      "The publisher did not expose a reviewable full text. Review stops before source-read; the broad causal thesis also requires methods and counterevidence.",
  },
};

const candidate = <T extends { id: string; paywall?: boolean }>(item: T) => {
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
export const chinaArticleIntake01 = [
  candidate({
    id: "lead-2018-nyt-china-economy-slowdown",
    title: "China’s Economy Slows Sharply",
    url: "https://www.nytimes.com/2018/12/14/business/china-economy-xi-jinping.html",
    publisher: "The New York Times",
    publishedAt: "2018-12-14",
    contentType: "reporting",
    topics: ["economy", "growth", "xi-jinping"],
    paywall: true,
    notes:
      "Historical economic reporting; recover the cited indicators and later revisions before reuse.",
  }),
  candidate({
    id: "lead-2018-intercept-google-dragonfly-transcript",
    title: "Leaked Transcript Contradicts Google’s Official Story on China",
    url: "https://theintercept.com/2018/10/09/google-china-censored-search-engine/",
    publisher: "The Intercept",
    publishedAt: "2018-10-09",
    contentType: "reporting",
    topics: ["google", "dragonfly", "censorship"],
    notes:
      "Leaked-material reporting requires authentication, Google’s response, and the later project record.",
  }),
  candidate({
    id: "lead-2017-bbc-congress-confession",
    title: "China congress: BBC team forced to sign confession",
    url: "http://www.bbc.com/news/world-asia-china-39137293",
    publisher: "BBC News",
    publicationYear: 2017,
    contentType: "reporting",
    topics: ["journalism", "detention", "press-freedom"],
    notes:
      "First-person newsroom account; verify the incident chronology and official response.",
  }),
  candidate({
    id: "lead-2013-bbc-outsourced-job-china",
    title: "US employee 'outsourced job to China'",
    url: "http://www.bbc.co.uk/news/technology-21043693",
    publisher: "BBC News",
    publicationYear: 2013,
    contentType: "reporting",
    topics: ["outsourcing", "security", "employment"],
    notes:
      "A single employment and security incident, not evidence of a general labor pattern.",
  }),
  candidate({
    id: "lead-2019-996-digital-workers-rights",
    title: "996, GitHub, and China's digital workers rights awakening",
    url: "https://chanind.github.io/china/2019/04/10/github-996-china-digital-workers-rights.html",
    publisher: "Chanind",
    publishedAt: "2019-04-10",
    contentType: "analysis",
    topics: ["996", "labor", "technology-workers"],
    notes:
      "Personal analysis should be paired with labor law, campaign archives, and worker reporting.",
  }),
  candidate({
    id: "lead-2019-reddit-blizzard-weibo-apology",
    title: "Blizzard's Weibo Account Posted an Apology to China",
    url: "https://reddit.com/r/HongKong/comments/dfkmp1/blizzards_official_weibo_account_just_posted_an/",
    publisher: "Reddit",
    publicationYear: 2019,
    contentType: "analysis",
    topics: ["blizzard", "weibo", "hong-kong"],
    notes:
      "Derivative social repost; locate the original company statement and contemporaneous reporting or reject.",
  }),
  candidate({
    id: "lead-2021-thegamer-steam-china",
    title: "Steam has been banned in China",
    url: "https://www.thegamer.com/steam-banned-china-christmas-day/",
    publisher: "TheGamer",
    publicationYear: 2021,
    contentType: "reporting",
    topics: ["steam", "games", "internet-access"],
    notes:
      "Test global Steam, Steam China, DNS reachability, and later restoration separately.",
  }),
  candidate({
    id: "lead-2023-gfw-encrypted-traffic-paper",
    title:
      "How the Great Firewall of China Detects and Blocks Fully Encrypted Traffic",
    url: "https://gfw.report/publications/usenixsecurity23/data/paper/paper.pdf",
    publisher: "USENIX Security / GFW Report",
    publicationYear: 2023,
    contentType: "research",
    topics: ["great-firewall", "encrypted-traffic", "network-measurement"],
    notes:
      "Technical paper; preserve experiment dates, vantage points, classifier limits, and reproducibility.",
  }),
  candidate({
    id: "lead-2020-bbc-india-app-ban",
    title: "India bans PUBG, Baidu and more than 100 apps linked to China",
    url: "https://www.bbc.com/news/technology-53998205",
    publisher: "BBC News",
    publishedAt: "2020-09-02",
    contentType: "reporting",
    topics: ["india", "apps", "regulation"],
    notes:
      "Resolve the Indian government orders, covered apps, stated grounds, and later status.",
  }),
  candidate({
    id: "lead-2015-marketwatch-stock-drop",
    title: "China Stock Market Drops 8.5%",
    url: "http://www.marketwatch.com/story/china-shares-wipe-out-2015-gains-as-stocks-tumble-85-2015-08-24?dist=tcountdown",
    publisher: "MarketWatch",
    publishedAt: "2015-08-24",
    contentType: "reporting",
    topics: ["stocks", "markets", "economy"],
    notes:
      "Period market report; verify index, close, currency, and causal claims against exchange data.",
  }),
  candidate({
    id: "lead-2019-techcrunch-apple-hkmap",
    title:
      "China attacks Apple for allowing Hong Kong crowdsourced police activity app",
    url: "https://techcrunch.com/2019/10/09/china-attacks-apple-for-allowing-hong-kong-crowdsourced-police-activity-app/",
    publisher: "TechCrunch",
    publishedAt: "2019-10-09",
    contentType: "reporting",
    topics: ["apple", "hong-kong", "apps"],
    notes:
      "Preserve the app-review chronology, state-media position, developer response, and Apple’s later action.",
  }),
  candidate({
    id: "lead-2020-reuters-pboc-liquidity",
    title: "China to inject $174B of liquidity as markets reopen",
    url: "https://www.reuters.com/article/us-china-health-cenbank/china-to-inject-174-billion-of-liquidity-on-monday-as-markets-reopen-idUSKBN1ZW074",
    publisher: "Reuters",
    publicationYear: 2020,
    contentType: "reporting",
    topics: ["pboc", "liquidity", "covid-19"],
    notes:
      "Verify the operation amount, instrument, net injection, exchange rate, and contemporaneous PBOC notice.",
  }),
  candidate({
    id: "lead-2018-reuters-cloudhopper-hpe-ibm",
    title: "China hacked HPE, IBM and then attacked clients",
    url: "https://www.reuters.com/article/us-china-cyber-hpe-ibm-exclusive-idUSKCN1OJ2OY",
    publisher: "Reuters",
    publicationYear: 2018,
    contentType: "reporting",
    topics: ["cybersecurity", "hpe", "ibm"],
    notes:
      "Cyber attribution and victim claims require indictments, technical reports, and company responses.",
  }),
  candidate({
    id: "lead-2019-x-social-surveillance-database-leak",
    title:
      "China’s social-network surveillance databases were reportedly exposed",
    url: "https://twitter.com/0xDUDE/status/1101917885100945409",
    publisher: "X / Twitter",
    publicationYear: 2019,
    contentType: "analysis",
    topics: ["data-leak", "surveillance", "privacy"],
    notes:
      "A social post is not sufficient authentication; locate preserved technical evidence and independent reporting.",
  }),
  candidate({
    id: "lead-2016-peoples-daily-artificial-sun",
    title: "China’s ‘Artificial Sun’ achieves fusion breakthrough",
    url: "http://en.people.cn/n3/2016/1103/c90000-9136786.html",
    publisher: "People's Daily Online",
    publicationYear: 2016,
    contentType: "reporting",
    topics: ["fusion", "east", "science"],
    notes:
      "State-media science claim; resolve device, temperature, duration, experiment record, and independent context.",
  }),
  candidate({
    id: "lead-2019-reuters-samsung-phone-production",
    title: "Samsung ends mobile phone production in China",
    url: "https://www.reuters.com/article/us-samsung-elec-china/samsung-ends-mobile-phone-production-in-china-idUSKBN1WH0LR",
    publisher: "Reuters",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["samsung", "manufacturing", "smartphones"],
    notes:
      "Distinguish handset assembly from sales, suppliers, other electronics production, and later operations.",
  }),
  candidate({
    id: "lead-2018-eia-cfc11-foam",
    title:
      "Illegal Production and Use of Banned CFC-11 in China's Foam Blowing Industry",
    url: "https://eia-global.org/reports/20180709-blowing-it-illegal-production-and-use-of-banned-cfc-11-in-chinas-foam-blowing-industry",
    publisher: "Environmental Investigation Agency",
    publishedAt: "2018-07-09",
    contentType: "research",
    topics: ["cfc-11", "ozone", "manufacturing"],
    notes:
      "Advocacy investigation; review sampling, interviews, atmospheric studies, enforcement, and later emissions evidence.",
  }),
  candidate({
    id: "lead-2018-intercept-google-security-teams",
    title:
      "Google Shut Out Privacy and Security Teams from Secret China Project",
    url: "https://theintercept.com/2018/11/29/google-china-censored-search/",
    publisher: "The Intercept",
    publishedAt: "2018-11-29",
    contentType: "reporting",
    topics: ["google", "privacy", "dragonfly"],
    notes:
      "Internal-process reporting requires document authentication, named responses, and the project’s later disposition.",
  }),
  candidate({
    id: "lead-2017-strange-parts-headphone-jack",
    title: "Bringing back the iPhone headphone jack, in China",
    url: "https://strangeparts.com/bringing-back-the-iphone-headphone-jack-in-china/",
    publisher: "Strange Parts",
    publicationYear: 2017,
    contentType: "analysis",
    topics: ["shenzhen", "hardware", "repair-culture"],
    notes:
      "First-person maker account suitable for bounded everyday-life context after full media review.",
  }),
  candidate({
    id: "lead-2025-ap-tiktok-irish-dpc-fine",
    title:
      "Irish privacy watchdog hits TikTok with €530M fine over data transfers to China",
    url: "https://apnews.com/article/tiktok-ireland-european-union-data-privacy-regulation-d386ec74becc716905d7f686d6a448e2",
    publisher: "Associated Press",
    publicationYear: 2025,
    contentType: "reporting",
    topics: ["tiktok", "privacy", "ireland"],
    notes:
      "Review the regulator’s final decision, TikTok’s response, appeal status, scope, and corrective order.",
  }),
  candidate({
    id: "lead-2016-medium-huaqiangbei-market",
    title:
      "What $50 buys you at the Huaqiangbei electronics market in Shenzhen, China",
    url: "https://medium.com/@keyboardio/what-50-buys-you-at-huaqiangbei-the-worlds-most-fascinating-electronics-market-f0384d9fca32",
    publisher: "Keyboardio / Medium",
    publicationYear: 2016,
    contentType: "analysis",
    topics: ["huaqiangbei", "electronics", "everyday-life"],
    notes:
      "First-person market visit; preserve date, exchange-rate, bargaining, and nonrepresentative sample limits.",
  }),
  candidate({
    id: "lead-2019-wsj-currency-manipulator",
    title: "U.S. Designates China as Currency Manipulator",
    url: "https://www.wsj.com/articles/chinas-currency-weakening-escalates-trade-war-11565027431?mod=rsswn",
    publisher: "The Wall Street Journal",
    publicationYear: 2019,
    contentType: "reporting",
    topics: ["currency", "treasury", "trade-war"],
    paywall: true,
    notes:
      "Pair with the Treasury designation, statutory criteria, market move, Chinese response, and later reversal.",
  }),
  candidate({
    id: "lead-2019-nyt-moral-cost-china",
    title: "Dealing with China Isn’t Worth the Moral Cost",
    url: "https://www.nytimes.com/2019/10/09/opinion/china-houston-rockets.html",
    publisher: "The New York Times",
    publishedAt: "2019-10-09",
    contentType: "analysis",
    topics: ["nba", "hong-kong", "business-ethics"],
    paywall: true,
    notes:
      "Opinion argument; factual predicates require separate reporting and company statements.",
  }),
  candidate({
    id: "lead-2022-bloomberg-mortgage-boycott-censorship",
    title: "China mortgage boycott data erased by censors as crisis spreads",
    url: "https://www.bloomberg.com/news/articles/2022-07-15/china-mortgage-boycott-data-erased-by-censors-as-crisis-spreads",
    publisher: "Bloomberg",
    publishedAt: "2022-07-15",
    contentType: "reporting",
    topics: ["mortgages", "property", "censorship"],
    paywall: true,
    notes:
      "Preserve the crowdsourced-data provenance, deletion evidence, project counts, and later property-crisis record.",
  }),
  candidate({
    id: "lead-2026-bbc-official-bribery-death-sentence",
    title: "China sentences official to death for taking $325M in bribes",
    url: "https://www.bbc.com/news/articles/c33y0n1v1xjo",
    publisher: "BBC News",
    publicationYear: 2026,
    contentType: "reporting",
    topics: ["corruption", "courts", "sentencing"],
    notes:
      "Resolve identity, court judgment, suspended-versus-immediate sentence, amount conversion, and appeal status.",
  }),
  candidate({
    id: "lead-2017-yc-china-qi-lu",
    title: "YC China and Qi Lu",
    url: "https://blog.ycombinator.com/yc-china-qi-lu/",
    publisher: "Y Combinator",
    publicationYear: 2017,
    contentType: "primary",
    topics: ["startups", "qi-lu", "y-combinator"],
    notes:
      "First-party announcement; trace what launched, governance, and later closure separately.",
  }),
  candidate({
    id: "lead-2015-bbc-two-child-policy",
    title: "China to begin two-child policy",
    url: "http://www.bbc.co.uk/news/world-asia-34665539",
    publisher: "BBC News",
    publicationYear: 2015,
    contentType: "reporting",
    topics: ["demography", "family-policy", "population"],
    notes:
      "Announcement report; review implementation, eligibility, later three-child policy, and demographic outcomes.",
  }),
  candidate({
    id: "lead-2020-nyt-african-swine-fever",
    title:
      "One-quarter of the world’s pigs died in a year due to swine fever in China",
    url: "https://www.nytimes.com/2020/01/01/opinion/china-swine-fever.html",
    publisher: "The New York Times",
    publishedAt: "2020-01-01",
    contentType: "analysis",
    topics: ["swine-fever", "agriculture", "food"],
    paywall: true,
    notes:
      "Opinion headline relies on estimates; recover herd denominator, mortality versus culling, source, and uncertainty.",
  }),
  candidate({
    id: "lead-2009-guardian-copenhagen-deal",
    title: "How do I know China wrecked the Copenhagen deal? I was in the room",
    url: "http://www.guardian.co.uk/environment/2009/dec/22/copenhagen-climate-change-mark-lynas",
    publisher: "The Guardian",
    publishedAt: "2009-12-22",
    contentType: "analysis",
    topics: ["copenhagen", "climate", "diplomacy"],
    notes:
      "First-person interpretation; compare negotiation records and other participants before assigning causation.",
  }),
  candidate({
    id: "lead-2016-wapo-internet-censorship-works",
    title: "China’s scary lesson to the world: Censoring the Internet works",
    url: "https://www.washingtonpost.com/world/asia_pacific/chinas-scary-lesson-to-the-world-censoring-the-internet-works/2016/05/23/413afe78-fff3-11e5-8bb1-f124a43f84dc_story.html",
    publisher: "The Washington Post",
    publishedAt: "2016-05-23",
    contentType: "analysis",
    topics: ["internet", "censorship", "platforms"],
    paywall: true,
    notes:
      "Broad causal thesis; define success, period, counterfactuals, circumvention, and political versus economic outcomes.",
  }),
];
