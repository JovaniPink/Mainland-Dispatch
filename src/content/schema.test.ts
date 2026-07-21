import { DispatchSchema } from "./schema";
import { dispatches } from "./dispatches";
import { comparisons } from "./comparisons";
import { traces } from "./traces";
import { dossiers } from "./dossiers";

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
};

describe("DispatchSchema", () => {
  it("accepts a valid article dispatch", () => {
    expect(DispatchSchema.safeParse(validArticle).success).toBe(true);
  });

  it("rejects an invalid sourceUrl", () => {
    const result = DispatchSchema.safeParse({
      ...validArticle,
      sourceUrl: "not-a-url",
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
  it("ships exactly twelve dispatches, all schema-valid", () => {
    expect(dispatches).toHaveLength(12);
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
});
