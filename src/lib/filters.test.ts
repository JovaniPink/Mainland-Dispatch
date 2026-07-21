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
      kind: "video",
      query: "",
    });
    expect(result.every((d) => d.kind === "video")).toBe(true);
    expect(result).toHaveLength(2);
  });

  it("combines vertical and kind filters", () => {
    const result = filterDispatches(dispatches, {
      vertical: "technology",
      kind: "document",
      query: "",
    });
    expect(
      result.every(
        (d) => d.kind === "document" && d.verticals.includes("technology")
      )
    ).toBe(true);
  });

  it("searches across title, tags, and entities case-insensitively", () => {
    const result = filterDispatches(dispatches, {
      vertical: "all",
      kind: "all",
      query: "SMIC",
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
