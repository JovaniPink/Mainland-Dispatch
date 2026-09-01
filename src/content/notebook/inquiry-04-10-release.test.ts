import {
  getPublicNotebookEntry,
  latestNotebookEntry,
  publicNotebookEntries,
} from "@/content/notebook";
import {
  arcticRouteSubset,
  legacyRoutingAroundRisk,
  nonArcticPortfolioSubset,
  sharedMaritimeSourceIdentities,
} from "@/content/notebook/inquiry-04-10-authority";
import { routingAroundRisk } from "@/content/notebook/routing-around-risk";
import { theArcticIsNotAShortcut } from "@/content/notebook/the-arctic-is-not-a-shortcut";
import { notebookSourceKnowledgeId } from "@/content/notebook/source-authority";

const sourceUrls = (entry: {
  formats: Array<{ url: string }>;
  sourceTrail: Array<{ links: Array<{ url: string }> }>;
}) => [
  ...entry.formats.map((format) => format.url),
  ...entry.sourceTrail.flatMap((source) =>
    source.links.map((link) => link.url)
  ),
];

const typedRecordIds = (entry: {
  turningPoints: Array<{ id: string }>;
  claimAudit: Array<{ id: string }>;
  scaleMetrics: Array<{ id: string }>;
  routes: Array<{ id: string; points: Array<{ id: string }> }>;
  timeline: Array<{ date: string; label: string }>;
}) => [
  ...entry.turningPoints.map((item) => item.id),
  ...entry.claimAudit.map((item) => item.id),
  ...entry.scaleMetrics.map((item) => item.id),
  ...entry.routes.map((item) => item.id),
  ...entry.routes.flatMap((route) => route.points.map((item) => item.id)),
  ...entry.timeline.map((item) => `${item.date}:${item.label}`),
];

describe("Inquiry 04/10 atomic custody release", () => {
  it("preserves the predecessor snapshot and reconciles every custody total", () => {
    expect(legacyRoutingAroundRisk.sourceTrail).toHaveLength(26);
    expect(sourceUrls(legacyRoutingAroundRisk)).toHaveLength(31);
    expect(new Set(sourceUrls(legacyRoutingAroundRisk)).size).toBe(28);
    expect(typedRecordIds(legacyRoutingAroundRisk)).toHaveLength(49);

    expect(routingAroundRisk.formats).toHaveLength(2);
    expect(routingAroundRisk.turningPoints).toHaveLength(3);
    expect(routingAroundRisk.claimAudit).toHaveLength(7);
    expect(routingAroundRisk.routes).toHaveLength(5);
    expect(routingAroundRisk.scaleMetrics).toHaveLength(3);
    expect(routingAroundRisk.timeline).toHaveLength(5);
    expect(routingAroundRisk.sourceTrail).toHaveLength(15);
    expect(routingAroundRisk.legacyFragments).toHaveLength(12);

    expect(theArcticIsNotAShortcut.formats).toHaveLength(1);
    expect(theArcticIsNotAShortcut.turningPoints).toHaveLength(1);
    expect(theArcticIsNotAShortcut.claimAudit).toHaveLength(5);
    expect(theArcticIsNotAShortcut.routes).toHaveLength(1);
    expect(theArcticIsNotAShortcut.routes[0].points).toHaveLength(3);
    expect(theArcticIsNotAShortcut.scaleMetrics).toHaveLength(3);
    expect(theArcticIsNotAShortcut.timeline).toHaveLength(6);
    expect(theArcticIsNotAShortcut.sourceTrail).toHaveLength(13);

    const finalSources = new Set([
      ...routingAroundRisk.sourceTrail.map((source) => source.id),
      ...theArcticIsNotAShortcut.sourceTrail.map((source) => source.id),
    ]);
    const finalUrls = new Set([
      ...sourceUrls(routingAroundRisk),
      ...sourceUrls(theArcticIsNotAShortcut),
    ]);
    const finalTypedRecords = new Set([
      ...typedRecordIds(routingAroundRisk),
      ...typedRecordIds(theArcticIsNotAShortcut),
    ]);

    expect(finalSources.size).toBe(26);
    expect(finalUrls.size).toBe(28);
    expect(finalTypedRecords.size).toBe(49);
  });

  it("keeps shared identity metadata equal while allowing scoped use records", () => {
    const overlap = routingAroundRisk.sourceTrail
      .map((source) => source.id)
      .filter((id) =>
        theArcticIsNotAShortcut.sourceTrail.some((source) => source.id === id)
      );
    expect(overlap).toEqual([
      "notebook-source-risk-aljazeera",
      "notebook-source-risk-guardian",
    ]);

    for (const id of overlap) {
      const nonArctic = routingAroundRisk.sourceTrail.find(
        (source) => source.id === id
      );
      const arctic = theArcticIsNotAShortcut.sourceTrail.find(
        (source) => source.id === id
      );
      const authority =
        sharedMaritimeSourceIdentities[
          id as keyof typeof sharedMaritimeSourceIdentities
        ];
      const identity = ({
        context,
        limitation,
        ...rest
      }: NonNullable<typeof nonArctic>) => {
        void context;
        void limitation;
        return rest;
      };

      expect(identity(nonArctic!)).toEqual(authority);
      expect(identity(arctic!)).toEqual(authority);
      expect(nonArctic?.context).not.toBe(arctic?.context);
      expect(nonArctic?.limitation).not.toBe(arctic?.limitation);
      expect(
        notebookSourceKnowledgeId("the-arctic-is-not-a-shortcut", id)
      ).toMatch(/^mainland-dispatch:source:routing-around-risk-/);
    }
  });

  it("publishes reciprocal companions and preserves every predecessor identity", () => {
    expect(routingAroundRisk.slug).toBe("routing-around-risk");
    expect(routingAroundRisk.ordinal).toBe(4);
    expect(routingAroundRisk.publishedAt).toBe("2026-08-18");
    expect(routingAroundRisk.editorialStatus).toBe("corrected");
    expect(routingAroundRisk.updatedAt).toBe("2026-09-01");
    expect(routingAroundRisk.relatedNotebooks).toEqual([
      {
        slug: "the-arctic-is-not-a-shortcut",
        relation: "companion",
        label: "Northern Sea Route constraints",
      },
    ]);
    expect(theArcticIsNotAShortcut.relatedNotebooks).toEqual([
      {
        slug: "routing-around-risk",
        relation: "companion",
        label: "The non-Arctic chokepoint portfolio",
      },
    ]);

    expect(publicNotebookEntries.map((entry) => entry.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(latestNotebookEntry.slug).toBe("the-arctic-is-not-a-shortcut");
    expect(getPublicNotebookEntry(routingAroundRisk.slug)).toBeDefined();
    expect(getPublicNotebookEntry(theArcticIsNotAShortcut.slug)).toBeDefined();
  });

  it("exposes only the routes and lenses owned by each map subset", () => {
    expect(nonArcticPortfolioSubset.id).toBe("non-arctic-portfolio");
    expect(nonArcticPortfolioSubset.allowedLenses).toEqual([
      "portfolio",
      "gulf",
      "red-sea",
    ]);
    expect(nonArcticPortfolioSubset.routes).toHaveLength(5);
    expect(nonArcticPortfolioSubset.routes).not.toContainEqual(
      expect.objectContaining({ lens: "arctic" })
    );

    expect(arcticRouteSubset.id).toBe("northern-sea-route");
    expect(arcticRouteSubset.allowedLenses).toEqual(["arctic"]);
    expect(arcticRouteSubset.initialLens).toBe("arctic");
    expect(arcticRouteSubset.routes.map((route) => route.id)).toEqual([
      "route-risk-arctic",
    ]);
  });
});
