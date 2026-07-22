import { filterDispatches, sortByCuratedDesc } from "./filters";
import { dispatches } from "@/content/dispatches";

describe("filterDispatches", () => {
  it("returns everything with no filters", () => {
    const result = filterDispatches(dispatches, {
      vertical: "all",
      kind: "all",
      query: "",
    });
    expect(result).toHaveLength(dispatches.length);
  });

  it("filters by vertical", () => {
    const result = filterDispatches(dispatches, {
      vertical: "culture",
      kind: "all",
      query: "",
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((d) => d.verticals.includes("culture"))).toBe(true);
  });

  it("filters by kind", () => {
    const result = filterDispatches(dispatches, {
      vertical: "all",
      kind: "article",
      query: "",
    });
    expect(result.every((d) => d.kind === "article")).toBe(true);
    expect(result).toHaveLength(dispatches.length);
  });

  it("combines vertical and kind filters", () => {
    const result = filterDispatches(dispatches, {
      vertical: "technology",
      kind: "article",
      query: "",
    });
    expect(
      result.every(
        (d) => d.kind === "article" && d.verticals.includes("technology")
      )
    ).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("searches across title, tags, and entities case-insensitively", () => {
    const result = filterDispatches(dispatches, {
      vertical: "all",
      kind: "all",
      query: "DeepSeek",
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      filterDispatches(dispatches, {
        vertical: "all",
        kind: "all",
        query: "zzz-no-match-zzz",
      })
    ).toHaveLength(0);
  });
});

describe("sortByCuratedDesc", () => {
  it("sorts newest curated first without mutating the input", () => {
    const sorted = sortByCuratedDesc(dispatches);
    expect(sorted).not.toBe(dispatches);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].curatedAt >= sorted[i].curatedAt).toBe(true);
    }
  });
});
