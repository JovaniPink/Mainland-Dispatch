import { AtlasReleaseSchema, type AtlasRelease } from "./schema";

const release = {
  slug: "semiconductor-control-chain",
  dossierSlug: "semiconductor-export-controls",
  version: "2026.07.21-2",
  title: "The semiconductor control chain",
  summary:
    "A source-led atlas of how the December 2024 US semiconductor controls moved from announcement to legal text, named companies, trade signals, and corporate disclosure.",
  methodology:
    "This release connects official records by date and documented relationship. Map lines show regulatory reach or disclosed supply-chain exposure, never inferred shipments. Trade movement is contextual correlation and does not establish policy causation.",
  publishedAt: "2026-07-21",
  retrievedAt: "2026-07-21",
  evidenceThrough: "2026-03-02",
  seriesThrough: "2025-12-31",
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
      evidenceRole: "supporting",
      canonicalUrl:
        "https://www.bis.gov/press-release/commerce-strengthens-export-controls-restrict-chinas-capability-produce-advanced-semiconductors-military",
      publishedAt: "2024-12-02",
      retrievedAt: "2026-07-21",
      datasetVintage: "December 2, 2024 announcement",
      language: "en",
      translationStatus: "original-english",
      recordId: "bis-2024-12-02-controls",
      notes:
        "Announcement-level source for 24 equipment types, three software-tool types, 140 Entity List additions, and 14 modifications. The Federal Register controls legal interpretation.",
    },
    {
      id: "source-federal-register-sme-rule",
      label: "89 FR 96790 · semiconductor manufacturing equipment controls",
      publisher: "Office of the Federal Register",
      sourceClass: "legal-record",
      evidenceRole: "controlling",
      canonicalUrl:
        "https://www.govinfo.gov/content/pkg/FR-2024-12-05/pdf/2024-28270.pdf",
      publishedAt: "2024-12-05",
      retrievedAt: "2026-07-21",
      datasetVintage: "89 FR 96790 · RIN 0694-AJ74",
      language: "en",
      translationStatus: "original-english",
      recordId: "fr-2024-28270",
      notes:
        "Controlling interim rule for advanced-computing, semiconductor-manufacturing-equipment, HBM, FN5, and FDP changes. December 31 applies only to the amendatory instructions named in the rule.",
    },
    {
      id: "source-federal-register-entity-rule",
      label: "89 FR 96830 · Entity List additions and modifications",
      publisher: "Office of the Federal Register",
      sourceClass: "legal-record",
      evidenceRole: "controlling",
      canonicalUrl:
        "https://www.govinfo.gov/content/pkg/FR-2024-12-05/pdf/2024-28267.pdf",
      publishedAt: "2024-12-05",
      retrievedAt: "2026-07-21",
      datasetVintage: "89 FR 96830 · RIN 0694-AJ77",
      language: "en",
      translationStatus: "original-english",
      recordId: "fr-2024-28267",
      notes:
        "Controlling final rule for 140 Entity List additions and 14 modifications, including ACM Research Shanghai and ACM Research Korea. Effective December 2; December 31 applies to requirements linked to FN5 designations.",
    },
    {
      id: "source-mofcom-response",
      label: "MOFCOM response to the December 2 semiconductor controls",
      publisher: "Ministry of Commerce of the People's Republic of China",
      sourceClass: "policy",
      evidenceRole: "supporting",
      canonicalUrl:
        "https://www.mofcom.gov.cn/xwfb/xwfyrth/art/2024/art_be61cee67b6340e59038896021e67453.html",
      publishedAt: "2024-12-02",
      retrievedAt: "2026-07-21",
      datasetVintage: "December 2, 2024 spokesperson response",
      language: "zh",
      translationStatus: "original-chinese",
      recordId: "mofcom-2024-12-02-semiconductor-response",
      notes:
        "Official PRC response. Its count of 136 Chinese entities is consistent with the US rule's 140 additions across China, Japan, Singapore, and South Korea; it is a government position, not independent impact evidence.",
    },
    {
      id: "source-trade-csl",
      label: "Consolidated Screening List",
      publisher: "International Trade Administration",
      sourceClass: "screening-data",
      evidenceRole: "enrichment",
      canonicalUrl: "https://www.trade.gov/consolidated-screening-list",
      retrievedAt: "2026-07-21",
      datasetVintage: "Retrieved July 21, 2026",
      revisionPolicy: "Automatically refreshed daily by Trade.gov.",
      language: "en",
      translationStatus: "original-english",
      recordId: "csl-enrichment-2026-07-21",
      notes:
        "Used only for alias and screening context. Trade.gov instructs readers to consult the underlying Federal Register publication for the official restriction.",
    },
    {
      id: "source-census-hs-contract",
      label: "Monthly US exports by Harmonized System code",
      publisher: "US Census Bureau",
      sourceClass: "methodology",
      evidenceRole: "methodology",
      canonicalUrl:
        "https://api.census.gov/data/timeseries/intltrade/exports/hs/variables.html",
      publishedAt: "2026-05-20",
      retrievedAt: "2026-07-21",
      datasetVintage: "API documentation revised May 20, 2026",
      revisionPolicy:
        "Updated monthly; previously released trade data are revised annually with the April statistics.",
      language: "en",
      translationStatus: "original-english",
      recordId: "census-hs8486-contract-2026-07-21",
      notes:
        "Defines ALL_VAL_MO and the preferred US-side extraction contract. It is methodology, not the value source for this release, because all Census trade API queries required a personal key at retrieval.",
    },
    {
      id: "source-un-comtrade-hs",
      label: "UN Comtrade preview · US reporter series · HS 8486",
      publisher: "United Nations Statistics Division",
      sourceClass: "trade-data",
      evidenceRole: "context",
      canonicalUrl: "https://uncomtrade.org/docs/un-comtrade-api/",
      retrievedAt: "2026-07-21",
      datasetVintage: "2024-01 through 2025-12 public-preview extraction",
      revisionPolicy:
        "UN Comtrade exposes only the latest version of a dataset; later revisions can replace previously retrieved values.",
      language: "en",
      translationStatus: "original-english",
      recordId: "comtrade-842-156-8486-x-2024-2025",
      artifact: {
        path: "public/data/us-china-hs8486-2024-2025.csv",
        sha256:
          "b10581d98a918ee41b3f96ef7e3a3fc8c21f335f7cdefda701c54014baffaa00",
      },
      query: {
        endpoint: "https://comtradeapi.un.org/public/v1/preview/C/M/HS",
        parameters: {
          reporterCode: "842",
          partnerCode: "156",
          cmdCode: "8486",
          flowCode: "X",
          maxRecords: "500",
        },
        periods: [
          "202401",
          "202402",
          "202403",
          "202404",
          "202405",
          "202406",
          "202407",
          "202408",
          "202409",
          "202410",
          "202411",
          "202412",
          "202501",
          "202502",
          "202503",
          "202504",
          "202505",
          "202506",
          "202507",
          "202508",
          "202509",
          "202510",
          "202511",
          "202512",
        ],
      },
      notes:
        "All 24 normalized values were rechecked against one-period official preview requests on July 21, 2026. Responses were aggregate and not directly reported; the series is contextual and is not a substitute for a keyed Census extraction.",
    },
    {
      id: "source-sec-acmr-2025",
      label: "ACM Research 2025 Form 10-K",
      publisher: "US Securities and Exchange Commission",
      sourceClass: "filing",
      evidenceRole: "supporting",
      canonicalUrl:
        "https://www.sec.gov/Archives/edgar/data/1680062/000162828026013231/acmr-20251231.htm",
      publishedAt: "2026-03-02",
      retrievedAt: "2026-07-21",
      datasetVintage: "Fiscal year ended December 31, 2025",
      language: "en",
      translationStatus: "original-english",
      recordId: "sec-acmr-2025-10k",
      notes:
        "Company-reported evidence that ACM Shanghai and ACM Korea were added, procurement was affected, and business practices changed. It is not independent observation of operational impact.",
    },
  ],
  relations: [
    {
      id: "relation-regulatory-reach",
      from: "place-washington-dc",
      to: "place-shanghai",
      label: "Regulatory reach",
      kind: "regulatory-reach",
      sourceIds: [
        "source-bis-announcement",
        "source-federal-register-entity-rule",
      ],
    },
  ],
  places: [
    {
      id: "place-washington-dc",
      label: "Washington, D.C.",
      coordinates: [-77.0369, 38.9072],
      precision: "city",
      role: "Rulemaking and publication",
      sourceIds: [
        "source-bis-announcement",
        "source-federal-register-sme-rule",
        "source-federal-register-entity-rule",
      ],
    },
    {
      id: "place-shanghai",
      label: "Shanghai",
      coordinates: [121.4737, 31.2304],
      precision: "city",
      role: "ACM Shanghai · listed operating subsidiary",
      sourceIds: [
        "source-federal-register-entity-rule",
        "source-sec-acmr-2025",
      ],
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
      title: "The companion rules enter the Federal Register",
      detail:
        "The interim SME rule and final Entity List rule provide separate controlling records for the package.",
      sourceIds: [
        "source-federal-register-sme-rule",
        "source-federal-register-entity-rule",
      ],
      placeIds: ["place-washington-dc"],
      chainSlugs: ["rule-to-reach", "reach-to-trade"],
    },
    {
      id: "event-compliance-date",
      date: "2024-12-31",
      stage: "implementation",
      evidenceStatus: "implemented",
      title: "FN5-linked compliance date arrives",
      detail:
        "December 31 applies to the amendatory instructions and Entity List requirements linked to Footnote 5—not every addition to the Entity List.",
      sourceIds: [
        "source-federal-register-sme-rule",
        "source-federal-register-entity-rule",
      ],
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
          id: "step-rule-announcement",
          code: "RULE",
          kind: "rule",
          label: "December package",
          detail:
            "BIS announces the coordinated semiconductor-control package.",
          date: "2024-12-02",
          evidenceStatus: "officiallyAnnounced",
          sourceIds: ["source-bis-announcement", "source-mofcom-response"],
          placeIds: ["place-washington-dc"],
          eventIds: ["event-package-announced"],
          relationIds: [],
          seriesIds: [],
        },
        {
          id: "step-rule-scope",
          code: "SCOPE",
          kind: "scope",
          label: "24 equipment types + 3 software tools",
          detail: "The announcement also covers HBM and related end-use rules.",
          evidenceStatus: "officiallyAnnounced",
          sourceIds: [
            "source-bis-announcement",
            "source-federal-register-sme-rule",
          ],
          placeIds: ["place-washington-dc"],
          eventIds: ["event-rule-published"],
          relationIds: [],
          seriesIds: [],
        },
        {
          id: "step-rule-entities",
          code: "ENTITIES",
          kind: "entity",
          label: "140 additions + 14 modifications",
          detail:
            "The official record, not the screening helper, controls each entry.",
          evidenceStatus: "implemented",
          sourceIds: [
            "source-federal-register-entity-rule",
            "source-trade-csl",
          ],
          placeIds: ["place-washington-dc", "place-shanghai"],
          eventIds: ["event-rule-published"],
          relationIds: ["relation-regulatory-reach"],
          seriesIds: [],
        },
        {
          id: "step-rule-compliance",
          code: "DATE",
          kind: "date",
          label: "December 31 limited compliance",
          detail:
            "The specified FN5, FDP, HBM, and linked Entity List requirements reach their delayed compliance date.",
          date: "2024-12-31",
          evidenceStatus: "implemented",
          sourceIds: [
            "source-federal-register-sme-rule",
            "source-federal-register-entity-rule",
          ],
          placeIds: ["place-washington-dc", "place-shanghai"],
          eventIds: ["event-compliance-date"],
          relationIds: ["relation-regulatory-reach"],
          seriesIds: [],
        },
      ],
      conclusion:
        "The legal sequence is established: announcement, published rule, listed parties, and compliance date can be traced to primary records.",
      caveat:
        "Legal reach does not by itself show the magnitude or effectiveness of the economic outcome.",
      evidenceStatus: "implemented",
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
          id: "step-trade-list",
          code: "LIST",
          kind: "entity",
          label: "Named entities",
          detail:
            "The Federal Register establishes the affected legal parties.",
          date: "2024-12-05",
          evidenceStatus: "implemented",
          sourceIds: ["source-federal-register-entity-rule"],
          placeIds: ["place-washington-dc", "place-shanghai"],
          eventIds: ["event-rule-published"],
          relationIds: ["relation-regulatory-reach"],
          seriesIds: [],
        },
        {
          id: "step-trade-places",
          code: "PLACES",
          kind: "location",
          label: "Documented regulatory reach",
          detail:
            "The local diagram connects the rulemaking record to a named Shanghai entity; it does not depict a shipment route or commercial relationship.",
          evidenceStatus: "implemented",
          sourceIds: ["source-federal-register-entity-rule"],
          placeIds: ["place-washington-dc", "place-shanghai"],
          eventIds: ["event-rule-published"],
          relationIds: ["relation-regulatory-reach"],
          seriesIds: [],
        },
        {
          id: "step-trade-flow",
          code: "FLOW",
          kind: "trade",
          label: "HS 8486 monthly exports",
          detail:
            "The UN Comtrade US-reporter series provides broad equipment-trade context.",
          evidenceStatus: "reported",
          sourceIds: ["source-census-hs-contract", "source-un-comtrade-hs"],
          placeIds: ["place-washington-dc", "place-shanghai"],
          eventIds: ["event-compliance-date"],
          relationIds: ["relation-regulatory-reach"],
          seriesIds: ["series-us-china-hs8486"],
        },
        {
          id: "step-trade-caveat",
          code: "CAVEAT",
          kind: "caveat",
          label: "Correlation, not attribution",
          detail:
            "Commodity scope, timing, licensing, and annual revisions limit inference.",
          evidenceStatus: "contested",
          sourceIds: ["source-census-hs-contract", "source-un-comtrade-hs"],
          placeIds: [],
          eventIds: [],
          relationIds: [],
          seriesIds: [],
        },
      ],
      conclusion:
        "The pinned series makes a post-rule change visible and testable as context.",
      caveat:
        "The series is broad, estimated in the public preview, and cannot isolate the rule from demand, licensing, or classification effects.",
      evidenceStatus: "contested",
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
          id: "step-company-identity",
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
          relationIds: [],
          seriesIds: [],
        },
        {
          id: "step-company-disclosure",
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
          relationIds: [],
          seriesIds: [],
        },
        {
          id: "step-company-effect",
          code: "EFFECT",
          kind: "effect",
          label: "Company-reported response",
          detail:
            "This is attributed disclosure, not independent confirmation.",
          evidenceStatus: "reported",
          sourceIds: ["source-sec-acmr-2025"],
          placeIds: ["place-shanghai"],
          eventIds: ["event-company-disclosure"],
          relationIds: [],
          seriesIds: [],
        },
        {
          id: "step-company-question",
          code: "QUESTION",
          kind: "question",
          label: "What changed in operations?",
          detail:
            "Licensing outcomes and independently measured production effects remain open.",
          evidenceStatus: "contested",
          sourceIds: [
            "source-federal-register-entity-rule",
            "source-sec-acmr-2025",
          ],
          placeIds: ["place-shanghai"],
          eventIds: [],
          relationIds: [],
          seriesIds: [],
        },
      ],
      conclusion:
        "The filing proves that the company disclosed exposure and named affected subsidiaries.",
      caveat:
        "It does not independently prove the size, duration, or cause of an operating effect.",
      evidenceStatus: "reported",
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

export function getAtlasReleaseForDossier(
  dossierSlug: string
): AtlasRelease | undefined {
  return publishedAtlasReleases.find(
    (item) => item.dossierSlug === dossierSlug
  );
}
