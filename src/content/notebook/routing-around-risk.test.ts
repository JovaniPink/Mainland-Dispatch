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

describe("Routing Around Risk Notebook registry", () => {
  it("publishes a bounded fourth inquiry with six mapped corridors", () => {
    expect(entry.variant).toBe("maritime-risk");
    expect(entry.turningPoints).toHaveLength(4);
    expect(entry.claimAudit).toHaveLength(12);
    expect(entry.routes).toHaveLength(6);
    expect(entry.scaleMetrics).toHaveLength(6);
    expect(entry.timeline).toHaveLength(11);
    expect(entry.sourceTrail).toHaveLength(26);
    expect(entry.editorialStatus).toBe("published");
    expect(entry.reviewState).toBe("source-reviewed");
    expect(entry.updatedAt).toBe("2026-08-21");
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
      for (const point of route.points) {
        expect(point.sourceIds.length).toBeGreaterThan(0);
        expect(point.note.length).toBeGreaterThan(30);
      }
    }
  });

  it("places the Bering Strait west of the antimeridian", () => {
    const arcticRoute = entry.routes.find(
      (route) => route.id === "route-risk-arctic"
    );
    const beringPoint = arcticRoute?.points.find(
      (point) => point.id === "point-risk-bering"
    );

    expect(beringPoint?.coordinates).toEqual([-169, 65.8]);
    expect(arcticRoute?.path).toContainEqual([-169, 65.8]);
  });

  it("preserves unlike scale units and explicit limits", () => {
    expect(new Set(entry.scaleMetrics.map((metric) => metric.unit)).size).toBe(
      entry.scaleMetrics.length
    );
    for (const metric of entry.scaleMetrics) {
      expect(metric.sourceIds.length).toBeGreaterThan(0);
      expect(metric.caveat.length).toBeGreaterThan(40);
    }
    expect(
      entry.scaleMetrics.find((metric) => metric.id === "scale-risk-hormuz")
        ?.display
    ).toBe("20.9 million");
    expect(
      entry.scaleMetrics.find(
        (metric) => metric.id === "scale-risk-nsr-transit"
      )?.display
    ).toBe("3.2 million");
    expect(
      entry.scaleMetrics.find((metric) => metric.id === "scale-risk-inventory")
        ?.display
    ).toBe("1.492 billion");
    expect(
      entry.scaleMetrics.find((metric) => metric.id === "scale-risk-nsr-total")
        ?.display
    ).toBe("37.02 million");
  });

  it("publishes corrections instead of laundering submitted numbers", () => {
    expect(
      entry.claimAudit.filter((item) => item.decision === "retain")
    ).toHaveLength(3);
    expect(
      entry.claimAudit.filter((item) => item.decision === "qualify")
    ).toHaveLength(5);
    expect(
      entry.claimAudit.filter((item) => item.decision === "exclude")
    ).toHaveLength(4);
    expect(
      entry.claimAudit.find((item) => item.id === "audit-risk-container-count")
        ?.assessment
    ).toMatch(/15 container-ship transit voyages in 2025, up from 11/i);
    expect(
      entry.claimAudit.find((item) => item.id === "audit-risk-bellona-counts")
        ?.assessment
    ).toMatch(/separate counts and years/i);
  });

  it("records current source corrections without promoting the evidence", () => {
    expect(
      entry.claimAudit.find((item) => item.id === "audit-risk-sts")?.assessment
    ).toMatch(/Kpler data/i);
    expect(
      entry.claimAudit.find((item) => item.id === "audit-risk-arctic-schedule")
        ?.assessment
    ).toMatch(/Dubai Tower departed on August 15/i);
    expect(
      entry.claimAudit.find((item) => item.id === "audit-risk-arctic-schedule")
        ?.assessment
    ).toMatch(/does not establish arrival, completed Arctic transit/i);
    expect(
      entry.timeline.find((item) => item.date === "2026-02-28")?.explanation
    ).toMatch(/14\.9 million b\/d.*4\.9 million b\/d/i);
    expect(
      entry.sourceTrail.find(
        (source) => source.id === "notebook-source-risk-global-times-sea-legend"
      )?.publisher
    ).toBe("Global Times");
    expect(
      entry.sourceTrail.find(
        (source) => source.id === "notebook-source-risk-zhoushan-departure"
      )?.publisher
    ).toBe("Zhoushan Municipal People's Government");
    expect(
      entry.timeline.find((item) => item.date === "2026-08-15")?.explanation
    ).toMatch(/arrival, completed Arctic transit.*are not/i);
    expect(entry.reviewState).toBe("source-reviewed");
  });

  it("keeps Notebook Four in the complete published registry", () => {
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
    ]);
    expect(latestNotebookEntry.slug).toBe("where-does-origin-change");
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

  it("rejects an out-of-order maritime timeline", () => {
    const outOfOrder = copyEntry();
    const timeline = outOfOrder.timeline as Array<Record<string, unknown>>;
    [timeline[0], timeline[1]] = [timeline[1], timeline[0]];

    expect(() => NotebookEntrySchema.parse(outOfOrder)).toThrow(
      /maritime timeline entries must be chronological/
    );
  });

  it("rejects unknown sources from every maritime data surface", () => {
    const brokenRoute = copyEntry();
    const routes = brokenRoute.routes as Array<{
      sourceIds: string[];
      points: Array<{ sourceIds: string[] }>;
    }>;
    routes[0].sourceIds = ["notebook-source-missing"];
    expect(() => NotebookEntrySchema.parse(brokenRoute)).toThrow(
      /unknown Notebook source reference/
    );

    const brokenPoint = copyEntry();
    const pointRoutes = brokenPoint.routes as Array<{
      points: Array<{ sourceIds: string[] }>;
    }>;
    pointRoutes[0].points[0].sourceIds = ["notebook-source-missing"];
    expect(() => NotebookEntrySchema.parse(brokenPoint)).toThrow(
      /unknown Notebook source reference/
    );

    const brokenScale = copyEntry();
    const metrics = brokenScale.scaleMetrics as Array<{ sourceIds: string[] }>;
    metrics[0].sourceIds = ["notebook-source-missing"];
    expect(() => NotebookEntrySchema.parse(brokenScale)).toThrow(
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
    expect(new Set(entry.sourceTrail.map((source) => source.id)).size).toBe(
      entry.sourceTrail.length
    );
  });
});
