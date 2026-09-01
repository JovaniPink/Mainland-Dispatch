import {
  getPublicNotebookEntry,
  latestNotebookEntry,
  publicNotebookEntries,
} from "@/content/notebook";
import { routingAroundRisk as entry } from "./routing-around-risk";
import { NotebookEntrySchema } from "./schema";

function copyEntry() {
  return JSON.parse(JSON.stringify(entry)) as Record<string, unknown>;
}

describe("Routing Around Risk corrected Notebook registry", () => {
  it("publishes the exact non-Arctic Inquiry 04 contract", () => {
    expect(entry).toMatchObject({
      variant: "maritime-risk",
      ordinal: 4,
      slug: "routing-around-risk",
      publishedAt: "2026-08-18",
      updatedAt: "2026-09-01",
      readTime: "20 min",
      editorialStatus: "corrected",
      reviewState: "source-reviewed",
    });
    expect(entry.formats).toHaveLength(2);
    expect(entry.turningPoints).toHaveLength(3);
    expect(entry.claimAudit).toHaveLength(7);
    expect(entry.routes).toHaveLength(5);
    expect(entry.routes.every((route) => route.lens !== "arctic")).toBe(true);
    expect(entry.scaleMetrics).toHaveLength(3);
    expect(entry.timeline).toHaveLength(5);
    expect(entry.sourceTrail).toHaveLength(15);
    expect(entry.sections).not.toHaveProperty("arctic");
  });

  it("keeps every route dated, sourced, and geographically bounded", () => {
    for (const route of entry.routes) {
      expect(route.asOf).toMatch(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/);
      expect(route.sourceIds.length).toBeGreaterThan(0);
      expect(route.caveat.length).toBeGreaterThan(40);
      expect(route.path.length).toBeGreaterThanOrEqual(2);
      for (const [longitude, latitude] of route.path) {
        expect(longitude).toBeGreaterThanOrEqual(-180);
        expect(longitude).toBeLessThanOrEqual(180);
        expect(latitude).toBeGreaterThanOrEqual(-85);
        expect(latitude).toBeLessThanOrEqual(85);
      }
    }
  });

  it("preserves unlike non-Arctic scale units and explicit limits", () => {
    expect(new Set(entry.scaleMetrics.map((metric) => metric.unit)).size).toBe(
      3
    );
    expect(
      entry.scaleMetrics.find((metric) => metric.id === "scale-risk-hormuz")
        ?.display
    ).toBe("20.9 million");
    expect(
      entry.scaleMetrics.find((metric) => metric.id === "scale-risk-inventory")
        ?.display
    ).toBe("1.492 billion");
    expect(
      entry.scaleMetrics.find((metric) => metric.id === "scale-risk-suez")
        ?.display
    ).toBe("22%");
  });

  it("keeps corrections and enablement limits without Arctic source drift", () => {
    expect(
      entry.claimAudit.find((item) => item.id === "audit-risk-sts")?.assessment
    ).toMatch(/Kpler data/i);
    expect(
      entry.claimAudit.find((item) => item.id === "audit-risk-russian-command")
        ?.assessment
    ).toMatch(/did not show Russia directing/i);
    expect(
      entry.sourceTrail.some(
        (source) => source.id === "notebook-source-risk-nsidc-passage"
      )
    ).toBe(false);
  });

  it("keeps the complete ten-entry public registry", () => {
    expect(publicNotebookEntries.map((item) => item.slug)).toEqual([
      "what-xi-jinping-wants",
      "open-models-closed-system",
      "dominance-is-a-dashboard",
      "routing-around-risk",
      "who-absorbs-the-shock",
      "what-gets-through",
      "july-is-not-one-number",
      "below-half-is-not-gone",
      "where-does-origin-change",
      "the-arctic-is-not-a-shortcut",
    ]);
    expect(latestNotebookEntry.slug).toBe("the-arctic-is-not-a-shortcut");
    expect(getPublicNotebookEntry(entry.slug)).toStrictEqual(entry);
  });

  it("rejects duplicate route, point, and scale identities", () => {
    const duplicateRoute = copyEntry();
    const routes = duplicateRoute.routes as Array<Record<string, unknown>>;
    routes[1].id = routes[0].id;
    expect(() => NotebookEntrySchema.parse(duplicateRoute)).toThrow(
      /route IDs must be unique/
    );

    const duplicatePoint = copyEntry();
    const pointRoutes = duplicatePoint.routes as Array<{
      points: Array<Record<string, unknown>>;
    }>;
    pointRoutes[1].points[0].id = pointRoutes[0].points[0].id;
    expect(() => NotebookEntrySchema.parse(duplicatePoint)).toThrow(
      /map point IDs must be unique/
    );

    const duplicateScale = copyEntry();
    const scales = duplicateScale.scaleMetrics as Array<
      Record<string, unknown>
    >;
    scales[1].id = scales[0].id;
    expect(() => NotebookEntrySchema.parse(duplicateScale)).toThrow(
      /scale metric IDs must be unique/
    );
  });

  it("rejects chronology and unknown-source drift", () => {
    const outOfOrder = copyEntry();
    const timeline = outOfOrder.timeline as Array<Record<string, unknown>>;
    [timeline[0], timeline[1]] = [timeline[1], timeline[0]];
    expect(() => NotebookEntrySchema.parse(outOfOrder)).toThrow(
      /maritime timeline entries must be chronological/
    );

    const brokenRoute = copyEntry();
    const routes = brokenRoute.routes as Array<{ sourceIds: string[] }>;
    routes[0].sourceIds = ["notebook-source-missing"];
    expect(() => NotebookEntrySchema.parse(brokenRoute)).toThrow(
      /unknown Notebook source reference/
    );
  });

  it("keeps every public evidence link clean", () => {
    const links = [
      ...entry.formats.map((format) => format.url),
      ...entry.sourceTrail.flatMap((source) =>
        source.links.map((link) => link.url)
      ),
    ];
    expect(links.every((url) => !url.includes("utm_"))).toBe(true);
    expect(new Set(entry.sourceTrail.map((source) => source.id)).size).toBe(15);
  });
});
