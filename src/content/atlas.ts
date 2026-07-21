import { AtlasReleaseSchema, type AtlasRelease } from "./schema";

const release = {
  slug: "semiconductor-control-chain",
  version: "2026.07.21-1",
  title: "The semiconductor control chain",
  summary:
    "A source-led atlas of how the December 2024 US semiconductor controls moved from announcement to legal text, named companies, trade signals, and corporate disclosure.",
  methodology:
    "This release connects official records by date and documented relationship. Map lines show regulatory reach or disclosed supply-chain exposure, never inferred shipments. Trade movement is contextual correlation and does not establish policy causation.",
  publishedAt: "2026-07-21",
  retrievedAt: "2026-07-21",
  dataThrough: "2026-03-02",
  editorialStatus: "published",
  provenance: "prototype",
  reviewState: "source-snapshot",
  relatedDispatchIds: [],
  sources: [
    {
      id: "source-bis-announcement",
      label: "Commerce strengthens semiconductor export controls",
      publisher: "Bureau of Industry and Security",
      sourceClass: "policy",
      canonicalUrl:
        "https://www.bis.gov/press-release/commerce-strengthens-export-controls-restrict-chinas-capability-produce-advanced-semiconductors-military",
      publishedAt: "2024-12-02",
      retrievedAt: "2026-07-21",
      datasetVintage: "December 2, 2024 announcement",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "bis-2024-12-02-controls",
      snapshotChecksum:
        "dbecc60cd8fd21c0ad49180e40efec81626d4a4f7dce5bab36515979b3eb4cc4",
      notes:
        "Normalized excerpt records 24 equipment types, three software-tool types, 140 Entity List additions, and 14 modifications.",
    },
    {
      id: "source-federal-register-rule",
      label: "89 FR 96790 · semiconductor manufacturing equipment controls",
      publisher: "Office of the Federal Register",
      sourceClass: "legal-record",
      canonicalUrl:
        "https://www.govinfo.gov/content/pkg/FR-2024-12-05/pdf/2024-28270.pdf",
      publishedAt: "2024-12-05",
      retrievedAt: "2026-07-21",
      datasetVintage: "Federal Register Vol. 89, No. 234",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "fr-2024-28270",
      snapshotChecksum:
        "ade43c3b84ec268d7f5fa7dfdbd6dcfadfa3819a0e3195a47f0c0f0029d40fc1",
      notes:
        "The legal record controls interpretation. The Atlas records December 31, 2024 as the Entity List compliance date stated in the rule.",
    },
    {
      id: "source-trade-csl",
      label: "Consolidated Screening List",
      publisher: "International Trade Administration",
      sourceClass: "screening-data",
      canonicalUrl: "https://www.trade.gov/consolidated-screening-list",
      publishedAt: "2026-07-21",
      retrievedAt: "2026-07-21",
      datasetVintage: "Retrieved July 21, 2026",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "csl-enrichment-2026-07-21",
      snapshotChecksum:
        "1013de03b2313e66b3b8d6d50f79461a1266dd4068b75aea4e25f5aa673ddb93",
      notes:
        "Used only for alias and screening context. Trade.gov instructs readers to consult the underlying Federal Register publication for the official restriction.",
    },
    {
      id: "source-census-hs-contract",
      label: "Monthly US exports by Harmonized System code",
      publisher: "US Census Bureau",
      sourceClass: "trade-data",
      canonicalUrl:
        "https://api.census.gov/data/timeseries/intltrade/exports/hs/variables.html",
      publishedAt: "2026-05-20",
      retrievedAt: "2026-07-21",
      datasetVintage: "API documentation revised May 20, 2026",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "census-hs8486-contract-2026-07-21",
      snapshotChecksum:
        "c6a9e2190594f10666754964ea1e8b13e82f5ab6eb955d864bf901fa21984f78",
      notes:
        "Defines the preferred US-side ALL_VAL_MO series and annual-revision posture. The endpoint required a personal API key at retrieval, so it is not the value source for this release.",
    },
    {
      id: "source-un-comtrade-hs",
      label: "UN Comtrade preview · US reporter series · HS 8486",
      publisher: "United Nations Statistics Division",
      sourceClass: "trade-data",
      canonicalUrl:
        "https://comtradeapi.un.org/public/v1/preview/C/M/HS?reporterCode=842&partnerCode=156&cmdCode=8486&flowCode=X",
      publishedAt: "2026-07-21",
      retrievedAt: "2026-07-21",
      datasetVintage: "2024-01 through 2025-12 public preview snapshot",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "comtrade-842-156-8486-x-2024-2025",
      snapshotChecksum:
        "4ac6125833b024c75caf2a51fc9d97897e572b7d01c0438cdeb08bf4466c33ea",
      notes:
        "The pinned chart values come from the public preview. Records are aggregate observations flagged as estimated by UN Comtrade and are not a substitute for a keyed Census extraction.",
    },
    {
      id: "source-sec-acmr-2025",
      label: "ACM Research 2025 Form 10-K",
      publisher: "US Securities and Exchange Commission",
      sourceClass: "filing",
      canonicalUrl:
        "https://www.sec.gov/Archives/edgar/data/1680062/000162828026013231/acmr-20251231.htm",
      publishedAt: "2026-03-02",
      retrievedAt: "2026-07-21",
      datasetVintage: "Fiscal year ended December 31, 2025",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "sec-acmr-2025-10k",
      snapshotChecksum:
        "9f1f7dde95f0b0cdc9c56b900f65df14028cff8f8bec5c6f0058abcfe1733dc0",
      notes:
        "The company reports that ACM Shanghai and ACM Korea were among the additions and describes continuing operational exposure in mainland China and Korea. These statements remain company-reported evidence.",
    },
    {
      id: "source-sec-asml-2024",
      label: "ASML 2024 Form 20-F",
      publisher: "US Securities and Exchange Commission",
      sourceClass: "filing",
      canonicalUrl:
        "https://www.sec.gov/Archives/edgar/data/937966/000093796625000009/asml-20241231.htm",
      publishedAt: "2025-02-12",
      retrievedAt: "2026-07-21",
      datasetVintage: "Fiscal year ended December 31, 2024",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "sec-asml-2024-20f",
      snapshotChecksum:
        "5e1fbdaa7dac2ce3c64e7f3e3c91b3f1749f438fd4c2fb7e4e16a18e6c936973",
      notes:
        "Supports Veldhoven as a supply-chain exposure point and records company-disclosed China revenue exposure, not a shipment route.",
    },
    {
      id: "source-openfreemap",
      label: "OpenFreeMap Positron basemap",
      publisher: "OpenFreeMap",
      sourceClass: "map",
      canonicalUrl: "https://openfreemap.org/quick_start/",
      publishedAt: "2026-07-21",
      retrievedAt: "2026-07-21",
      datasetVintage: "Live vector-tile style retrieved at map load",
      language: "en",
      translationStatus: "original-english",
      snapshotId: "openfreemap-positron-2026-07-21",
      snapshotChecksum:
        "359e677097e27b4d2b09b3605eef07cdeaee0c01945128a52947289304f111c4",
      notes:
        "Provides geography only. Atlas evidence remains available through the synchronized location list if tiles or WebGL fail.",
    },
  ],
  places: [
    {
      id: "place-washington-dc",
      label: "Washington, D.C.",
      coordinates: [-77.0369, 38.9072],
      precision: "city",
      role: "Rulemaking and publication",
      sourceIds: ["source-bis-announcement", "source-federal-register-rule"],
    },
    {
      id: "place-shanghai",
      label: "Shanghai",
      coordinates: [121.4737, 31.2304],
      precision: "city",
      role: "ACM Shanghai · listed operating subsidiary",
      sourceIds: ["source-federal-register-rule", "source-sec-acmr-2025"],
    },
    {
      id: "place-veldhoven",
      label: "Veldhoven",
      coordinates: [5.4697, 51.4185],
      precision: "city",
      role: "Allied semiconductor-equipment exposure",
      sourceIds: ["source-sec-asml-2024"],
    },
  ],
  events: [
    {
      id: "event-package-announced",
      date: "2024-12-02",
      stage: "announcement",
      evidenceStatus: "officiallyAnnounced",
      title: "BIS announces the control package",
      detail:
        "The announcement describes new equipment, software, HBM, end-use, and Entity List measures.",
      sourceIds: ["source-bis-announcement"],
      placeIds: ["place-washington-dc"],
      chainSlugs: ["rule-to-reach", "reach-to-trade"],
    },
    {
      id: "event-rule-published",
      date: "2024-12-05",
      stage: "publication",
      evidenceStatus: "officiallyAnnounced",
      title: "The rule enters the Federal Register",
      detail:
        "The Federal Register supplies the controlling text, definitions, licensing requirements, and compliance instructions.",
      sourceIds: ["source-federal-register-rule"],
      placeIds: ["place-washington-dc"],
      chainSlugs: ["rule-to-reach", "reach-to-trade"],
    },
    {
      id: "event-compliance-date",
      date: "2024-12-31",
      stage: "implementation",
      evidenceStatus: "implemented",
      title: "Entity List compliance date arrives",
      detail:
        "The rule states December 31 as the compliance date for the relevant Entity List and Footnote 5 requirements.",
      sourceIds: ["source-federal-register-rule"],
      placeIds: ["place-washington-dc", "place-shanghai"],
      chainSlugs: ["rule-to-reach", "reach-to-trade"],
    },
    {
      id: "event-company-disclosure",
      date: "2026-03-02",
      stage: "observation",
      evidenceStatus: "reported",
      title: "ACM Research records continuing listing exposure",
      detail:
        "The 2025 filing identifies ACM Shanghai and ACM Korea among the additions and describes continuing operational exposure in mainland China and Korea.",
      sourceIds: ["source-sec-acmr-2025"],
      placeIds: ["place-shanghai"],
      chainSlugs: ["exposure-to-response"],
    },
  ],
  chains: [
    {
      id: "chain-rule-to-reach",
      slug: "rule-to-reach",
      eyebrow: "Policy lifecycle",
      title: "From rule text to compliance",
      summary:
        "Follow the package from the announcement through its defined scope, named parties, and compliance date.",
      steps: [
        {
          code: "RULE",
          kind: "rule",
          label: "December package",
          detail:
            "BIS announces the coordinated semiconductor-control package.",
          date: "2024-12-02",
          evidenceStatus: "officiallyAnnounced",
          sourceIds: ["source-bis-announcement"],
          placeIds: ["place-washington-dc"],
          eventIds: ["event-package-announced"],
        },
        {
          code: "SCOPE",
          kind: "scope",
          label: "24 equipment types + 3 software tools",
          detail: "The announcement also covers HBM and related end-use rules.",
          evidenceStatus: "officiallyAnnounced",
          sourceIds: ["source-bis-announcement"],
          placeIds: ["place-washington-dc"],
          eventIds: ["event-rule-published"],
        },
        {
          code: "ENTITIES",
          kind: "entity",
          label: "140 additions + 14 modifications",
          detail:
            "The official record, not the screening helper, controls each entry.",
          evidenceStatus: "implemented",
          sourceIds: ["source-federal-register-rule", "source-trade-csl"],
          placeIds: ["place-shanghai"],
          eventIds: ["event-rule-published"],
        },
        {
          code: "DATE",
          kind: "date",
          label: "December 31 compliance",
          detail: "The applicable Entity List requirements reach compliance.",
          date: "2024-12-31",
          evidenceStatus: "implemented",
          sourceIds: ["source-federal-register-rule"],
          placeIds: ["place-washington-dc", "place-shanghai"],
          eventIds: ["event-compliance-date"],
        },
      ],
      conclusion:
        "The legal sequence is established: announcement, published rule, listed parties, and compliance date can be traced to primary records.",
      caveat:
        "Legal reach does not by itself show the magnitude or effectiveness of the economic outcome.",
      evidenceStatus: "implemented",
      sourceIds: [
        "source-bis-announcement",
        "source-federal-register-rule",
        "source-trade-csl",
      ],
      placeIds: ["place-washington-dc", "place-shanghai"],
      eventIds: [
        "event-package-announced",
        "event-rule-published",
        "event-compliance-date",
      ],
    },
    {
      id: "chain-reach-to-trade",
      slug: "reach-to-trade",
      eyebrow: "Measured flow",
      title: "From listed parties to trade movement",
      summary:
        "Connect the official list to an equipment-trade series without presenting temporal alignment as proof of causation.",
      steps: [
        {
          code: "LIST",
          kind: "entity",
          label: "Named entities",
          detail:
            "The Federal Register establishes the affected legal parties.",
          date: "2024-12-05",
          evidenceStatus: "implemented",
          sourceIds: ["source-federal-register-rule"],
          placeIds: ["place-shanghai"],
          eventIds: ["event-rule-published"],
        },
        {
          code: "PLACES",
          kind: "location",
          label: "Documented city-level exposure",
          detail:
            "The map uses disclosed city relationships, not inferred facilities.",
          evidenceStatus: "reported",
          sourceIds: ["source-sec-acmr-2025", "source-sec-asml-2024"],
          placeIds: ["place-shanghai", "place-veldhoven"],
          eventIds: ["event-company-disclosure"],
        },
        {
          code: "FLOW",
          kind: "trade",
          label: "HS 8486 monthly exports",
          detail:
            "The UN Comtrade US-reporter series provides broad equipment-trade context.",
          evidenceStatus: "reported",
          sourceIds: ["source-census-hs-contract", "source-un-comtrade-hs"],
          placeIds: ["place-washington-dc", "place-shanghai"],
          eventIds: ["event-compliance-date"],
        },
        {
          code: "CAVEAT",
          kind: "caveat",
          label: "Correlation, not attribution",
          detail:
            "Commodity scope, timing, licensing, and annual revisions limit inference.",
          evidenceStatus: "contested",
          sourceIds: ["source-census-hs-contract", "source-un-comtrade-hs"],
          placeIds: [],
          eventIds: [],
        },
      ],
      conclusion:
        "The pinned series makes a post-rule change visible and testable as context.",
      caveat:
        "The series is broad, estimated in the public preview, and cannot isolate the rule from demand, licensing, or classification effects.",
      evidenceStatus: "contested",
      sourceIds: [
        "source-federal-register-rule",
        "source-census-hs-contract",
        "source-un-comtrade-hs",
      ],
      placeIds: ["place-washington-dc", "place-shanghai", "place-veldhoven"],
      eventIds: ["event-rule-published", "event-compliance-date"],
    },
    {
      id: "chain-exposure-to-response",
      slug: "exposure-to-response",
      eyebrow: "Corporate disclosure",
      title: "From affected company to unresolved effect",
      summary:
        "Separate what a listed company disclosed from what independent evidence can establish about outcomes.",
      steps: [
        {
          code: "COMPANY",
          kind: "entity",
          label: "ACM Shanghai and ACM Korea",
          detail:
            "ACM Research identifies both subsidiaries among the additions.",
          date: "2024-12-02",
          evidenceStatus: "reported",
          sourceIds: ["source-sec-acmr-2025"],
          placeIds: ["place-shanghai"],
          eventIds: ["event-company-disclosure"],
        },
        {
          code: "DISCLOSURE",
          kind: "disclosure",
          label: "Continuing operational exposure",
          detail:
            "The filing describes continuing mainland China and Korea operational exposure.",
          date: "2026-03-02",
          evidenceStatus: "reported",
          sourceIds: ["source-sec-acmr-2025"],
          placeIds: ["place-shanghai"],
          eventIds: ["event-company-disclosure"],
        },
        {
          code: "EFFECT",
          kind: "effect",
          label: "Company-reported response",
          detail:
            "This is attributed disclosure, not independent confirmation.",
          evidenceStatus: "reported",
          sourceIds: ["source-sec-acmr-2025"],
          placeIds: ["place-shanghai"],
          eventIds: ["event-company-disclosure"],
        },
        {
          code: "QUESTION",
          kind: "question",
          label: "What changed in operations?",
          detail:
            "Licensing outcomes and independently measured production effects remain open.",
          evidenceStatus: "contested",
          sourceIds: ["source-federal-register-rule", "source-sec-acmr-2025"],
          placeIds: ["place-shanghai"],
          eventIds: [],
        },
      ],
      conclusion:
        "The filing proves that the company disclosed exposure and named affected subsidiaries.",
      caveat:
        "It does not independently prove the size, duration, or cause of an operating effect.",
      evidenceStatus: "reported",
      sourceIds: ["source-federal-register-rule", "source-sec-acmr-2025"],
      placeIds: ["place-shanghai"],
      eventIds: ["event-company-disclosure"],
    },
  ],
  series: [
    {
      id: "series-us-china-hs8486",
      slug: "us-china-hs8486",
      title: "UN Comtrade preview: US reporter HS 8486 exports to China",
      description:
        "Monthly value of machines and apparatus used principally in semiconductor and related manufacturing, shown in nominal US dollars.",
      unit: "usd",
      frequency: "monthly",
      methodology:
        "Pinned from UN Comtrade public-preview records for reporter 842, partner 156, export flow X, and HS 8486. The preview marks these aggregate observations as estimated. Census ALL_VAL_MO remains the preferred US-side series but required a personal API key on retrieval.",
      sourceIds: ["source-census-hs-contract", "source-un-comtrade-hs"],
      downloadPath: "/data/us-china-hs8486-2024-2025.csv",
      observations: [
        ["2024-01", 511790292],
        ["2024-02", 226397379],
        ["2024-03", 435264392],
        ["2024-04", 511595149],
        ["2024-05", 289535825],
        ["2024-06", 338993101],
        ["2024-07", 377236164],
        ["2024-08", 299242758],
        ["2024-09", 386938886],
        ["2024-10", 279046480],
        ["2024-11", 218086360],
        ["2024-12", 296282990],
        ["2025-01", 329813603],
        ["2025-02", 126430084],
        ["2025-03", 232033453],
        ["2025-04", 193011625],
        ["2025-05", 225089608],
        ["2025-06", 321873823],
        ["2025-07", 301490611],
        ["2025-08", 144754061],
        ["2025-09", 81501209],
        ["2025-10", 136975784],
        ["2025-11", 59579342],
        ["2025-12", 126059790],
      ].map(([month, value]) => ({
        month,
        value,
        sourceIds: ["source-un-comtrade-hs"],
        estimated: true,
      })),
      annotations: [
        {
          month: "2024-12",
          label: "Control package announced",
          eventId: "event-package-announced",
        },
      ],
    },
  ],
};

export const atlasReleases: AtlasRelease[] = [
  AtlasReleaseSchema.parse(release),
];

export const publishedAtlasReleases = atlasReleases.filter(
  (item) =>
    item.editorialStatus === "published" || item.editorialStatus === "corrected"
);

export const atlasRelease = publishedAtlasReleases[0];

export function getAtlasRelease(slug: string): AtlasRelease | undefined {
  return publishedAtlasReleases.find((item) => item.slug === slug);
}
