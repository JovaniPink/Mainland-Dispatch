import { AtlasReleaseSchema, DispatchSchema } from "./schema";
import { dispatches } from "./dispatches";
import { comparisons } from "./comparisons";
import { traces } from "./traces";
import { dossiers } from "./dossiers";
import { catalog, ContentCatalogSchema } from "./catalog";
import {
  getPublicDispatch,
  isPublicDispatch,
  publishedDispatches,
} from "./dispatches";
import {
  atlasReleases,
  getAtlasRelease,
  publishedAtlasReleases,
} from "./atlas";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const validArticle = {
  kind: "article",
  id: "d-test",
  slug: "test-dispatch",
  title: "A test dispatch",
  summary: "Summary.",
  commentary: "Commentary.",
  whyItMatters: "It matters.",
  source: "Test Wire",
  sourceUrl: "https://example.com/story",
  sourceDate: "2026-07-01",
  curatedAt: "2026-07-02",
  updatedAt: "2026-07-02",
  language: "en",
  translationStatus: "original-english",
  verticals: ["bilateral"],
  tags: ["test"],
  editorialStatus: "draft",
  provenance: "prototype",
};

describe("DispatchSchema", () => {
  it("accepts a valid article dispatch", () => {
    const result = DispatchSchema.safeParse(validArticle);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.commentaryReferences).toEqual([]);
  });

  it("accepts a labeled HN commentary reference without treating it as evidence", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      commentaryReferences: [
        {
          label: "Hacker News discussion 123",
          url: "https://news.ycombinator.com/item?id=123",
          retrievedAt: "2026-07-21",
          use: "commentary-context",
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unlabeled or evidentiary commentary reference", () => {
    expect(
      DispatchSchema.safeParse({
        ...validArticle,
        commentaryReferences: [
          {
            label: " ",
            url: "https://news.ycombinator.com/item?id=123",
            retrievedAt: "2026-07-21",
            use: "commentary-context",
          },
        ],
      }).success
    ).toBe(false);
    expect(
      DispatchSchema.safeParse({
        ...validArticle,
        commentaryReferences: [
          {
            label: "Hacker News discussion 123",
            url: "https://news.ycombinator.com/item?id=123",
            retrievedAt: "2026-07-21",
            use: "evidence",
          },
        ],
      }).success
    ).toBe(false);
  });

  it("rejects an invalid sourceUrl", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      sourceUrl: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only required fields", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      title: "   ",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed date", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      sourceDate: "July 1, 2026",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an impossible calendar date", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      sourceDate: "2026-99-99",
    });
    expect(result.success).toBe(false);
  });

  it("rejects route-unsafe slugs and blank tags", () => {
    expect(
      DispatchSchema.safeParse({ ...validArticle, slug: "Not Safe" }).success
    ).toBe(false);
    expect(
      DispatchSchema.safeParse({ ...validArticle, tags: [" "] }).success
    ).toBe(false);
  });

  it("rejects an unknown kind", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      kind: "newsletter",
    });
    expect(result.success).toBe(false);
  });

  it("requires variant-specific fields (video needs embedId)", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      kind: "video",
      provider: "youtube",
      duration: "01:00",
    });
    expect(result.success).toBe(false);
  });

  it("rejects video-only fields on the wrong variant", () => {
    const video = {
      ...validArticle,
      kind: "video",
      provider: "youtube",
      embedId: "abc123",
      duration: "01:00",
    };
    expect(DispatchSchema.safeParse(video).success).toBe(true);
  });
});

describe("seed content", () => {
  it("ships thirty schema-valid dispatches", () => {
    expect(dispatches).toHaveLength(36);
  });

  it("keeps the Chinese-model source package behind editorial review", () => {
    const packageIds = new Set([
      "d-013",
      "d-014",
      "d-015",
      "d-016",
      "d-017",
      "d-018",
      "d-019",
      "d-020",
    ]);
    const packageRecords = dispatches.filter((dispatch) =>
      packageIds.has(dispatch.id)
    );

    expect(packageRecords).toHaveLength(packageIds.size);
    expect(
      packageRecords.every(
        (dispatch) => dispatch.editorialStatus === "sourceReview"
      )
    ).toBe(true);
    expect(
      publishedDispatches.some((dispatch) => packageIds.has(dispatch.id))
    ).toBe(false);
    expect(getPublicDispatch("whos-afraid-of-chinese-models")).toBeUndefined();
  });

  it("uses supplied Hacker News links only as commentary context", () => {
    const suppliedHnUrls = new Set([
      "https://news.ycombinator.com/item?id=48977128",
      "https://news.ycombinator.com/item?id=48979269",
    ]);

    expect(
      dispatches.some((dispatch) => suppliedHnUrls.has(dispatch.sourceUrl))
    ).toBe(false);
    const hnReferences = dispatches
      .flatMap((dispatch) => dispatch.commentaryReferences)
      .filter((reference) => suppliedHnUrls.has(reference.url));
    expect(new Set(hnReferences.map((reference) => reference.url))).toEqual(
      suppliedHnUrls
    );
    expect(
      hnReferences.every((reference) => reference.use === "commentary-context")
    ).toBe(true);
  });

  it("keeps the random historical backfile behind editorial review", () => {
    const backfileIds = new Set([
      "d-021",
      "d-022",
      "d-023",
      "d-024",
      "d-025",
      "d-026",
      "d-027",
      "d-028",
      "d-029",
      "d-030",
    ]);
    const backfileRecords = dispatches.filter((dispatch) =>
      backfileIds.has(dispatch.id)
    );

    expect(backfileRecords).toHaveLength(backfileIds.size);
    expect(
      backfileRecords.every(
        (dispatch) =>
          dispatch.editorialStatus === "sourceReview" &&
          dispatch.provenance === "verified" &&
          dispatch.commentaryReferences.length === 0
      )
    ).toBe(true);
    expect(
      publishedDispatches.some((dispatch) => backfileIds.has(dispatch.id))
    ).toBe(false);
    expect(
      new Set(
        backfileRecords.map((dispatch) => dispatch.sourceDate.slice(0, 4))
      )
    ).toEqual(
      new Set(["2012", "2016", "2017", "2018", "2019", "2020", "2021", "2022"])
    );
  });

  it("covers every dispatch kind", () => {
    const kinds = new Set(dispatches.map((d) => d.kind));
    expect(kinds).toEqual(
      new Set([
        "article",
        "video",
        "audio",
        "document",
        "social",
        "gallery",
        "data",
        "original",
      ])
    );
  });

  it("has resolvable relatedDispatchIds", () => {
    const ids = new Set(dispatches.map((d) => d.id));
    for (const d of dispatches) {
      for (const rel of d.relatedDispatchIds) {
        expect(ids).toContain(rel);
      }
    }
  });

  it("dossier dispatchIds and trace dispatchIds resolve", () => {
    const ids = new Set(dispatches.map((d) => d.id));
    for (const dossier of dossiers) {
      for (const id of dossier.dispatchIds) expect(ids).toContain(id);
    }
    for (const trace of traces) {
      for (const entry of trace.entries) {
        if (entry.dispatchId) expect(ids).toContain(entry.dispatchId);
      }
    }
  });

  it("comparison relatedDispatchIds resolve", () => {
    const ids = new Set(dispatches.map((d) => d.id));
    for (const c of comparisons) {
      for (const id of c.relatedDispatchIds) expect(ids).toContain(id);
    }
  });

  it("passes the complete import-time catalog integrity gate", () => {
    expect(catalog.dispatches).toHaveLength(dispatches.length);
  });

  it("rejects duplicate ids at the catalog boundary", () => {
    const result = ContentCatalogSchema.safeParse({
      ...catalog,
      dispatches: [catalog.dispatches[0], catalog.dispatches[0]],
      comparisons: [],
      traces: [],
      dossiers: [],
    });
    expect(result.success).toBe(false);
  });
});

describe("publication boundary", () => {
  it("contains only published or corrected entries", () => {
    expect(publishedDispatches.every(isPublicDispatch)).toBe(true);
  });

  it("does not resolve review-stage entries through the public lookup", () => {
    expect(
      getPublicDispatch("weibo-graduate-employment-thread")
    ).toBeUndefined();
    expect(getPublicDispatch("chongqing-ev-factory-photos")).toBeUndefined();
  });

  it("publishes only public Atlas releases", () => {
    expect(
      publishedAtlasReleases.every((item) =>
        ["published", "corrected"].includes(item.editorialStatus)
      )
    ).toBe(true);
  });
});

describe("Evidence Atlas schema and graph", () => {
  const release = atlasReleases[0];
  const cultureRelease = getAtlasRelease("rural-creator-platform-chain")!;
  const openModelRelease = getAtlasRelease("open-model-release-ledger")!;

  it("ships one source-snapshot release with four-step chains", () => {
    expect(release.reviewState).toBe("source-snapshot");
    expect(release.provenance).toBe("prototype");
    expect(release.chains.every((chain) => chain.steps.length === 4)).toBe(
      true
    );
    expect(release.series[0].observations).toHaveLength(24);
  });

  it("ships a second source-backed culture case without exposing review-stage Dispatches", () => {
    expect(atlasReleases).toHaveLength(3);
    expect(cultureRelease.dossierSlug).toBeUndefined();
    expect(cultureRelease.series).toEqual([]);
    expect(cultureRelease.relatedDispatchIds).toEqual([]);
    expect(cultureRelease.chains).toHaveLength(3);
    expect(cultureRelease.sources.every((source) => source.sourceLeadId)).toBe(
      true
    );
    expect(cultureRelease.relations.map((relation) => relation.kind)).toEqual([
      "commercial-management",
      "audience-reach",
    ]);
  });

  it("ships a source-backed open-model case without inventing geography, relations, or a benchmark series", () => {
    expect(openModelRelease.dossierSlug).toBeUndefined();
    expect(openModelRelease.places).toEqual([]);
    expect(openModelRelease.relations).toEqual([]);
    expect(openModelRelease.series).toEqual([]);
    expect(openModelRelease.relatedDispatchIds).toEqual([]);
    expect(openModelRelease.sources).toHaveLength(7);
    expect(
      openModelRelease.sources.every((source) => source.sourceLeadId)
    ).toBe(true);
    expect(openModelRelease.chains).toHaveLength(3);
    expect(
      openModelRelease.chains.every((chain) => chain.steps.length === 4)
    ).toBe(true);
  });

  it("keeps the promised Kimi weight release as a future review gate", () => {
    const kimiSource = openModelRelease.sources.find(
      (source) => source.id === "source-kimi-k3-launch"
    )!;
    const verification = openModelRelease.chains
      .flatMap((chain) => chain.steps)
      .find((step) => step.id === "step-release-verification")!;

    expect(kimiSource.revisionPolicy).toMatch(/recheck on or after july 27/i);
    expect(kimiSource.notes).toMatch(/does not establish that weights/i);
    expect(verification.kind).toBe("question");
    expect(verification.date).toBeUndefined();
  });

  it("rejects Atlas promotion of a lead that has not been source-read", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[1].sources[0].sourceLeadId =
      "lead-2025-kimi-k2-repository";
    invalid.atlasReleases[1].sources[0].canonicalUrl =
      "https://github.com/MoonshotAI/Kimi-K2";
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("also rejects unreviewed promotion in the open-model ledger", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[2].sources[0].sourceLeadId =
      "lead-2025-kimi-k2-repository";
    invalid.atlasReleases[2].sources[0].canonicalUrl =
      "https://github.com/MoonshotAI/Kimi-K2";
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects a promoted source whose URL differs from the reviewed lead", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[1].sources[0].canonicalUrl =
      "https://example.com/unreviewed-copy";
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects invalid coordinates and malformed artifact metadata", () => {
    const invalid = clone(release);
    invalid.places[0].coordinates = [181, 91];
    const comtrade = invalid.sources.find(
      (source) => source.id === "source-un-comtrade-hs"
    )!;
    comtrade.artifact!.sha256 = "missing";
    expect(AtlasReleaseSchema.safeParse(invalid).success).toBe(false);
  });

  it("records a reproducible one-period-at-a-time Comtrade query", () => {
    const comtrade = release.sources.find(
      (source) => source.id === "source-un-comtrade-hs"
    )!;
    expect(comtrade.query?.periods).toHaveLength(24);
    expect(comtrade.query?.parameters).toMatchObject({
      reporterCode: "842",
      partnerCode: "156",
      cmdCode: "8486",
      flowCode: "X",
    });
    expect(comtrade.artifact?.path).toBe(
      "public/data/us-china-hs8486-2024-2025.csv"
    );
  });

  it("rejects non-four-step chains", () => {
    const invalid = clone(release);
    invalid.chains[0].steps.pop();
    expect(AtlasReleaseSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects unresolved Atlas references and unsorted observations", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[0].chains[0].steps[0].sourceIds = ["source-missing"];
    invalid.atlasReleases[0].series[0].observations.reverse();
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects duplicate step ids and unresolved relation or series references", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[0].chains[1].steps[0].id =
      invalid.atlasReleases[0].chains[0].steps[0].id;
    invalid.atlasReleases[0].chains[0].steps[0].relationIds = [
      "relation-missing",
    ];
    invalid.atlasReleases[0].chains[0].steps[0].seriesIds = ["series-missing"];
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("requires relation sources and both endpoints in a referencing step", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[0].relations[0].sourceIds = ["source-missing"];
    const referencingStep = invalid.atlasReleases[0].chains
      .flatMap((chain) => chain.steps)
      .find((step) => step.relationIds.includes("relation-regulatory-reach"))!;
    referencingStep.placeIds = referencingStep.placeIds.filter(
      (id) => id !== "place-shanghai"
    );
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("requires every Atlas release to resolve to a dossier", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[0].dossierSlug = "missing-dossier";
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("draws map relations only between places declared on the release", () => {
    expect(release.relations.length).toBeGreaterThan(0);
    const placeIds = new Set(release.places.map((place) => place.id));
    for (const relation of release.relations) {
      expect(placeIds).toContain(relation.from);
      expect(placeIds).toContain(relation.to);
    }
  });

  it("rejects a relation that references a place outside the release", () => {
    const invalid = clone(catalog);
    invalid.atlasReleases[0].relations[0].to = "place-missing";
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("prevents Atlas releases from exposing review-stage dispatches", () => {
    const invalid = clone(catalog);
    const reviewOnly = invalid.dispatches.find(
      (item) => item.slug === "weibo-graduate-employment-thread"
    )!;
    invalid.atlasReleases[0].relatedDispatchIds = [reviewOnly.id];
    expect(ContentCatalogSchema.safeParse(invalid).success).toBe(false);
  });
});
