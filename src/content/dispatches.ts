import { z } from "zod";
import { DispatchSchema, type Dispatch, type DispatchKind } from "./schema";

const seeds: unknown[] = [
  {
    kind: "video",
    id: "d-001",
    slug: "animation-beyond-hollywood",
    title:
      "China's domestic animation industry is building franchises beyond Hollywood's orbit",
    summary:
      "A studio-level look at how Ne Zha 2's record run changed financing for domestic animation slates.",
    commentary:
      "The interviews with mid-tier studio heads are the valuable part. Everyone cites the box-office number; few outlets ask who now owns the pipeline of characters being greenlit off the back of it.",
    whyItMatters:
      "The meaningful shift is not only box-office revenue, but ownership of durable characters and cultural vocabulary.",
    source: "Sixth Tone",
    sourceUrl: "https://www.sixthtone.com/news/animation-franchises",
    sourceDate: "2026-07-18",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "zh/en",
    translationStatus: "bilingual",
    verticals: ["culture"],
    tags: ["film", "animation", "youth-culture"],
    people: [],
    organizations: ["Light Chaser Animation", "Enlight Media"],
    places: ["Beijing", "Chengdu"],
    relatedDispatchIds: ["d-004", "d-009"],
    editorialStatus: "published",
    provider: "youtube",
    embedId: "dQw4w9WgXcQ",
    duration: "09:42",
    captions: ["zh", "en"],
  },
  {
    kind: "article",
    id: "d-002",
    slug: "bis-entity-list-expansion",
    title:
      "Commerce adds 14 Chinese firms to the Entity List over advanced-node tooling",
    summary:
      "Reuters details the July expansion of export restrictions targeting semiconductor toolmakers and two packaging houses.",
    commentary:
      "Read past the headline count: three of the fourteen are subsidiaries of firms already listed, which tells you more about enforcement gaps than about escalation.",
    whyItMatters:
      "Each expansion reshapes which Chinese fabs can service which nodes — and quietly redraws the market for domestic tool substitutes.",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com/technology/bis-entity-list-july",
    sourceDate: "2026-07-15",
    curatedAt: "2026-07-19",
    updatedAt: "2026-07-19",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "technology"],
    tags: ["export-controls", "semiconductors"],
    people: [],
    organizations: ["Bureau of Industry and Security", "SMIC"],
    places: ["Washington", "Shanghai"],
    relatedDispatchIds: ["d-003", "d-007", "d-011"],
    editorialStatus: "published",
    byline: "Karen Freifeld",
    pullQuote:
      "The additions close a loophole that had allowed re-export through third-country intermediaries.",
  },
  {
    kind: "document",
    id: "d-003",
    slug: "mofcom-response-statement",
    title:
      "MOFCOM statement on US export control measures, with annotated translation",
    summary:
      "The Ministry of Commerce's formal response, notable for reviving 'development interests' language absent since 2024.",
    commentary:
      "The phrasing shift is deliberate. Compare paragraph three against the 2024 statement: 'legitimate rights' has become 'legitimate rights and development interests' — a wider claim.",
    whyItMatters:
      "Official statements are the primary record. Reading them directly, rather than through summaries, shows what escalation language is actually in play.",
    source: "Ministry of Commerce (PRC)",
    sourceUrl: "https://www.mofcom.gov.cn/statement-2026-07",
    sourceDate: "2026-07-16",
    curatedAt: "2026-07-19",
    updatedAt: "2026-07-20",
    language: "zh",
    translationStatus: "human-translated",
    verticals: ["bilateral"],
    tags: ["export-controls", "official-statements"],
    people: [],
    organizations: ["MOFCOM"],
    places: ["Beijing"],
    relatedDispatchIds: ["d-002", "d-007"],
    editorialStatus: "published",
    issuingBody: "Ministry of Commerce, People's Republic of China",
    pageCount: 3,
    documentDate: "2026-07-16",
    keyPassage:
      "China will take necessary measures to safeguard the legitimate rights and development interests of Chinese enterprises.",
  },
  {
    kind: "article",
    id: "d-004",
    slug: "us-distribution-chinese-cinema",
    title:
      "Why Chinese blockbusters still struggle to find US theatrical distribution",
    summary:
      "The Hollywood Reporter examines the distribution economics behind limited US releases of major Chinese titles.",
    commentary:
      "The piece is strongest on exhibitor economics and weakest on audience data — it assumes diaspora audiences without measuring them. Worth pairing with actual AMC per-screen numbers.",
    whyItMatters:
      "Distribution, not production, is where cultural exchange actually narrows. The bottleneck is commercial, and it is measurable.",
    source: "The Hollywood Reporter",
    sourceUrl:
      "https://www.hollywoodreporter.com/chinese-cinema-us-distribution",
    sourceDate: "2026-07-10",
    curatedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "bilateral"],
    tags: ["film", "distribution"],
    people: [],
    organizations: ["AMC Theatres", "CMC Pictures"],
    places: ["Los Angeles"],
    relatedDispatchIds: ["d-001"],
    editorialStatus: "published",
    byline: "Patrick Brzeski",
  },
  {
    kind: "audio",
    id: "d-005",
    slug: "chinatalk-ai-competition",
    title: "ChinaTalk: benchmarking the open-weight model race, mid-2026",
    summary:
      "A technical episode on where Chinese open-weight models actually stand relative to US frontier labs.",
    commentary:
      "The guests disagree productively on evaluation contamination, which most coverage treats as settled. The 40-minute mark, on inference-cost asymmetry, is the essential segment.",
    whyItMatters:
      "Model competition is usually reported as a horse race. The infrastructure and cost story underneath is the one with policy consequences.",
    source: "ChinaTalk",
    sourceUrl: "https://www.chinatalk.media/podcast/open-weight-race",
    sourceDate: "2026-07-12",
    curatedAt: "2026-07-15",
    updatedAt: "2026-07-15",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology"],
    tags: ["ai", "open-weights"],
    people: ["Jordan Schneider"],
    organizations: ["DeepSeek", "Alibaba"],
    places: [],
    relatedDispatchIds: ["d-002"],
    editorialStatus: "published",
    showName: "ChinaTalk",
    episode: "Mid-2026 model landscape",
    duration: "58:20",
    transcriptAvailable: true,
  },
  {
    kind: "social",
    id: "d-006",
    slug: "weibo-graduate-employment-thread",
    title:
      "A Weibo thread on graduate employment that survived moderation for three days",
    summary:
      "A widely shared first-person account of the 2026 graduate job market from a Wuhan engineering graduate.",
    commentary:
      "Archived before removal. The comment section matters as much as the post — note how many replies pivot to civil-service exam prep as the default plan.",
    whyItMatters:
      "Moderated-then-removed threads are a real signal of where official tolerance sits on economic sentiment, but they need archival discipline to cite responsibly.",
    source: "Weibo",
    sourceUrl: "https://weibo.com/thread/example",
    sourceDate: "2026-07-08",
    curatedAt: "2026-07-11",
    updatedAt: "2026-07-11",
    language: "zh",
    translationStatus: "human-translated",
    verticals: ["mainland"],
    tags: ["employment", "youth-culture", "social-media"],
    people: [],
    organizations: [],
    places: ["Wuhan"],
    relatedDispatchIds: ["d-010"],
    editorialStatus: "sourceReview",
    platform: "weibo",
    account: "@工科毕业生2026",
    captureDate: "2026-07-09",
    archivalUrl: "https://archive.org/weibo-thread-capture",
  },
  {
    kind: "document",
    id: "d-007",
    slug: "bis-interim-final-rule",
    title: "BIS interim final rule: advanced computing and semiconductor items",
    summary:
      "The 212-page Federal Register text implementing the July export-control expansion.",
    commentary:
      "Sections 744.11 and the new license-exception carve-out are where the substance lives. Most reporting summarized the press release, not the rule.",
    whyItMatters:
      "The rule text, not the announcement, determines what actually ships. Carve-outs here will define the next year of compliance disputes.",
    source: "Federal Register",
    sourceUrl: "https://www.federalregister.gov/bis-interim-rule-2026",
    sourceDate: "2026-07-15",
    curatedAt: "2026-07-18",
    updatedAt: "2026-07-18",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "technology"],
    tags: ["export-controls", "semiconductors", "primary-documents"],
    people: [],
    organizations: ["Bureau of Industry and Security"],
    places: ["Washington"],
    relatedDispatchIds: ["d-002", "d-003"],
    editorialStatus: "published",
    issuingBody: "US Department of Commerce, Bureau of Industry and Security",
    pageCount: 212,
    documentDate: "2026-07-15",
    keyPassage:
      "License applications for items destined to facilities fabricating logic at 14nm or below will be reviewed under a presumption of denial.",
  },
  {
    kind: "gallery",
    id: "d-008",
    slug: "chongqing-ev-factory-photos",
    title: "Inside a Chongqing EV plant retooled for export-market production",
    summary:
      "Photo essay documenting the right-hand-drive conversion lines feeding Southeast Asian and UK markets.",
    commentary:
      "The captions quietly confirm something the trade data implies: the export lines run newer equipment than the domestic ones.",
    whyItMatters:
      "Tariff debates are abstract until you see which markets a production line is physically tooled for.",
    source: "Caixin",
    sourceUrl: "https://www.caixinglobal.com/ev-plant-photo-essay",
    sourceDate: "2026-07-05",
    curatedAt: "2026-07-09",
    updatedAt: "2026-07-09",
    language: "zh/en",
    translationStatus: "bilingual",
    verticals: ["economy", "mainland"],
    tags: ["ev", "manufacturing", "tariffs"],
    people: [],
    organizations: ["Changan"],
    places: ["Chongqing"],
    relatedDispatchIds: ["d-010"],
    editorialStatus: "editorialReview",
    imageCount: 14,
    photographer: "Ding Gang",
  },
  {
    kind: "article",
    id: "d-009",
    slug: "gaming-approvals-july-batch",
    title: "July gaming approvals include three US-developed titles",
    summary:
      "The NPPA's monthly license batch approved 105 titles, with imported licenses reaching their highest count since 2023.",
    commentary:
      "The imported-title count is the story, but check the fine print: all three US titles come through joint-venture publishers, which shapes revenue splits considerably.",
    whyItMatters:
      "Gaming approvals are one of the few monthly, quantifiable measures of cultural-market opening or closing.",
    source: "Niko Partners",
    sourceUrl: "https://nikopartners.com/july-2026-approvals",
    sourceDate: "2026-07-17",
    curatedAt: "2026-07-20",
    updatedAt: "2026-07-20",
    language: "en",
    translationStatus: "original-english",
    verticals: ["culture", "technology"],
    tags: ["gaming", "regulation"],
    people: [],
    organizations: ["NPPA", "Tencent"],
    places: [],
    relatedDispatchIds: ["d-001"],
    editorialStatus: "published",
    byline: "Daniel Ahmad",
  },
  {
    kind: "data",
    id: "d-010",
    slug: "h1-trade-flows-dataset",
    title: "H1 2026 US–China trade flows: the dataset behind the headlines",
    summary:
      "Census Bureau trade data showing bilateral goods trade down 4.1% year-on-year, with sharp category divergence.",
    commentary:
      "The aggregate decline hides the interesting movement: semiconductor-equipment exports fell 38% while agricultural exports rose 11%. Category-level reading is mandatory here.",
    whyItMatters:
      "Trade totals get quoted as a temperature reading. The category breakdown is where policy effects are actually visible.",
    source: "US Census Bureau",
    sourceUrl: "https://www.census.gov/foreign-trade/china-h1-2026",
    sourceDate: "2026-07-14",
    curatedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    language: "en",
    translationStatus: "original-english",
    verticals: ["economy", "bilateral"],
    tags: ["trade", "data"],
    people: [],
    organizations: ["US Census Bureau"],
    places: [],
    relatedDispatchIds: ["d-006", "d-008"],
    editorialStatus: "published",
    methodology:
      "Monthly customs-district goods data, seasonally unadjusted, HS-4 category level.",
    measurementPeriod: "January–June 2026",
    downloadUrl: "https://www.census.gov/foreign-trade/china-h1-2026.csv",
  },
  {
    kind: "video",
    id: "d-011",
    slug: "smic-earnings-call-analysis",
    title:
      "What SMIC's earnings call revealed about domestic tool substitution",
    summary:
      "Asianometry's close reading of SMIC's capex guidance and what it implies about yield on domestic lithography tools.",
    commentary:
      "The capex-to-wafer-start ratio analysis is the kind of arithmetic that separates real analysis from vibes. His uncertainty flags are honest — note which numbers are inferred.",
    whyItMatters:
      "Export-control effectiveness ultimately shows up in fab economics, not policy announcements. Earnings calls are where the evidence surfaces.",
    source: "Asianometry",
    sourceUrl: "https://www.youtube.com/watch?v=smic-analysis",
    sourceDate: "2026-07-19",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["technology", "economy"],
    tags: ["semiconductors", "export-controls"],
    people: [],
    organizations: ["SMIC", "SiCarrier"],
    places: ["Shanghai"],
    relatedDispatchIds: ["d-002", "d-007"],
    editorialStatus: "published",
    provider: "youtube",
    embedId: "smic-analysis",
    duration: "18:47",
    captions: ["en"],
  },
  {
    kind: "original",
    id: "d-012",
    slug: "reading-the-july-signals",
    title: "Reading the July signals: controls tighten, culture opens",
    summary:
      "Our own assessment of an apparently contradictory month: the hardest export-control expansion in two years alongside the most permissive cultural-import window since 2023.",
    commentary:
      "These two tracks are usually reported by different desks and never connected. Read together, they suggest deliberate compartmentalization rather than contradiction.",
    whyItMatters:
      "If economic and cultural policy are being decoupled on purpose, most 'relations are warming/cooling' framing is measuring the wrong thing.",
    source: "Mainland Dispatch",
    sourceUrl: "https://mainlanddispatch.example.com/original/july-signals",
    sourceDate: "2026-07-21",
    curatedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    language: "en",
    translationStatus: "original-english",
    verticals: ["bilateral", "culture", "technology"],
    tags: ["editorial", "export-controls", "gaming"],
    people: [],
    organizations: [],
    places: [],
    relatedDispatchIds: ["d-002", "d-009", "d-001"],
    editorialStatus: "published",
    wordCount: 1450,
  },
];

export const dispatches: Dispatch[] = z.array(DispatchSchema).parse(seeds);

export function getDispatch(slug: string): Dispatch | undefined {
  return dispatches.find((d) => d.slug === slug);
}

export function getDispatchById(id: string): Dispatch | undefined {
  return dispatches.find((d) => d.id === id);
}

export function relatedDispatches(d: Dispatch): Dispatch[] {
  return d.relatedDispatchIds
    .map(getDispatchById)
    .filter((x): x is Dispatch => Boolean(x));
}

export function countsByVertical(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const d of dispatches) {
    for (const v of d.verticals) counts[v] = (counts[v] ?? 0) + 1;
  }
  return counts;
}

export function countsByKind(): Partial<Record<DispatchKind, number>> {
  const counts: Partial<Record<DispatchKind, number>> = {};
  for (const d of dispatches) counts[d.kind] = (counts[d.kind] ?? 0) + 1;
  return counts;
}
