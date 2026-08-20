import {
  getPublishedNotebookEntry,
  latestNotebookEntry,
  publishedNotebookEntries,
} from "@/content/notebook";
import { dominanceIsADashboard as entry } from "./dominance-is-a-dashboard";
import { NotebookEntrySchema } from "./schema";

function copyEntry() {
  return JSON.parse(JSON.stringify(entry)) as Record<string, unknown>;
}

const editorialText = [
  entry.thesis,
  ...Object.values(entry.sections).flat(),
  ...entry.turningPoints.flatMap((point) => [point.argument, point.reading]),
  ...entry.claimAudit.flatMap((item) => [item.claim, item.assessment]),
  ...entry.comparisons.flatMap((item) => [item.reading, item.caveat]),
  ...entry.concentrations.flatMap((item) => [item.reading, item.caveat]),
  ...entry.demographicProfiles.flatMap((profile) => [profile.note]),
  ...entry.timeline.map((item) => item.explanation),
  ...entry.sourceTrail.flatMap((source) => [
    source.context,
    source.limitation ?? "",
  ]),
].join(" ");

describe("Dominance Is a Dashboard Notebook registry", () => {
  it("publishes a deep, bounded third inquiry", () => {
    const wordCount = editorialText.trim().split(/\s+/).length;

    expect(wordCount).toBeGreaterThanOrEqual(4000);
    expect(wordCount).toBeLessThanOrEqual(6500);
    expect(entry.turningPoints).toHaveLength(4);
    expect(entry.claimAudit).toHaveLength(8);
    expect(entry.comparisons).toHaveLength(8);
    expect(entry.concentrations).toHaveLength(5);
    expect(entry.demographicProfiles).toHaveLength(2);
    expect(entry.timeline).toHaveLength(10);
    expect(entry.sourceTrail).toHaveLength(23);
    expect(entry.editorialStatus).toBe("published");
    expect(entry.reviewState).toBe("source-reviewed");
    expect(entry.updatedAt).toBe("2026-08-14");
  });

  it("keeps every indicator dated, sourced, and qualified", () => {
    for (const metric of entry.comparisons) {
      expect(metric.asOf).toMatch(/^\d{4}(?:-\d{2})?$/);
      expect(metric.sourceIds.length).toBeGreaterThan(0);
      expect(metric.caveat.length).toBeGreaterThan(30);
    }
    for (const concentration of entry.concentrations) {
      expect(concentration.value).toBeGreaterThanOrEqual(0);
      expect(concentration.value).toBeLessThanOrEqual(100);
      expect(concentration.sourceIds.length).toBeGreaterThan(0);
      expect(concentration.caveat.length).toBeGreaterThan(30);
    }
  });

  it("aligns demographic display bands without erasing provenance", () => {
    expect(entry.demographicProfiles.map((profile) => profile.country)).toEqual(
      ["China", "United States"]
    );
    for (const profile of entry.demographicProfiles) {
      const total = profile.ageBands.reduce(
        (sum, ageBand) => sum + ageBand.value,
        0
      );
      expect(total).toBeCloseTo(100, 1);
      expect(profile.note).toMatch(/official|Census/i);
    }
  });

  it("records corrections without promoting rejected claims", () => {
    expect(
      entry.claimAudit.filter((item) => item.decision === "retain")
    ).toHaveLength(1);
    expect(
      entry.claimAudit.filter((item) => item.decision === "qualify")
    ).toHaveLength(4);
    expect(
      entry.claimAudit.filter((item) => item.decision === "exclude")
    ).toHaveLength(3);
    expect(
      entry.claimAudit.find((item) => item.id === "audit-dominance-scientists")
        ?.assessment
    ).toMatch(/all destination countries, not 20,000 moves to China/i);
    expect(
      entry.claimAudit.find((item) => item.id === "audit-dominance-biopharma")
        ?.assessment
    ).toMatch(/early-stage development programs/i);
  });

  it("keeps Notebook Three published after later inquiries", () => {
    expect(publishedNotebookEntries.map((item) => item.slug)).toContain(
      "dominance-is-a-dashboard"
    );
    expect(latestNotebookEntry.ordinal).toBeGreaterThan(entry.ordinal);
    expect(getPublishedNotebookEntry(entry.slug)).toStrictEqual(entry);
  });

  it("rejects duplicate comparison, concentration, and country identities", () => {
    const duplicateComparison = copyEntry();
    const comparisons = duplicateComparison.comparisons as Array<
      Record<string, unknown>
    >;
    comparisons[1].id = comparisons[0].id;
    expect(() => NotebookEntrySchema.parse(duplicateComparison)).toThrow(
      /comparison metric IDs must be unique/
    );

    const duplicateConcentration = copyEntry();
    const concentrations = duplicateConcentration.concentrations as Array<
      Record<string, unknown>
    >;
    concentrations[1].id = concentrations[0].id;
    expect(() => NotebookEntrySchema.parse(duplicateConcentration)).toThrow(
      /concentration metric IDs must be unique/
    );

    const duplicateCountry = copyEntry();
    const profiles = duplicateCountry.demographicProfiles as Array<
      Record<string, unknown>
    >;
    profiles[1].country = profiles[0].country;
    expect(() => NotebookEntrySchema.parse(duplicateCountry)).toThrow(
      /demographic countries must be unique/
    );
  });

  it("rejects unknown source references from every new data surface", () => {
    for (const field of [
      "comparisons",
      "concentrations",
      "demographicProfiles",
      "timeline",
    ] as const) {
      const broken = copyEntry();
      const items = broken[field] as Array<Record<string, unknown>>;
      items[0].sourceIds = ["notebook-source-missing"];
      expect(() => NotebookEntrySchema.parse(broken)).toThrow(
        /unknown Notebook source reference/
      );
    }
  });

  it("keeps public evidence links clean", () => {
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
