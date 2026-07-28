import {
  getPublishedNotebookEntry,
  latestNotebookEntry,
  parseNotebookRegistry,
  publishedNotebookEntries,
} from "@/content/notebook";
import { openModelsClosedSystem as entry } from "./open-models-closed-system";
import { NotebookEntrySchema } from "./schema";

function copyEntry() {
  return JSON.parse(JSON.stringify(entry)) as Record<string, unknown>;
}

const editorialText = [
  ...Object.values(entry.sections).flat(),
  ...entry.turningPoints.flatMap((point) => [point.argument, point.reading]),
  ...entry.claimAudit.flatMap((item) => [item.claim, item.assessment]),
  ...entry.watchItems.flatMap((item) => [
    item.baseline,
    item.whatHasHappened,
    ...item.whatRemainsUnknown,
    ...item.wouldStrengthen,
    ...item.wouldWeaken,
  ]),
  ...entry.sourceTrail.flatMap((source) => [
    source.context,
    source.limitation ?? "",
  ]),
].join(" ");

describe("Open Models, Closed System Notebook registry", () => {
  it("publishes a bounded, source-reviewed second inquiry", () => {
    const wordCount = editorialText.trim().split(/\s+/).length;

    expect(wordCount).toBeGreaterThanOrEqual(2200);
    expect(wordCount).toBeLessThanOrEqual(3200);
    expect(entry.turningPoints).toHaveLength(3);
    expect(entry.claimAudit).toHaveLength(10);
    expect(entry.watchItems).toHaveLength(6);
    expect(new Set(entry.watchItems.map((item) => item.claimType))).toEqual(
      new Set([
        "commitment",
        "institutional_fact",
        "observed_condition",
        "policy_principle",
      ])
    );
    expect(entry.sourceTrail).toHaveLength(13);
    expect(entry.editorialStatus).toBe("published");
    expect(entry.reviewState).toBe("source-reviewed");
  });

  it("publishes both inquiries and resolves the latest by slug", () => {
    expect(publishedNotebookEntries.map((item) => item.slug)).toEqual([
      "what-xi-jinping-wants",
      "open-models-closed-system",
    ]);
    expect(latestNotebookEntry.slug).toBe("open-models-closed-system");
    expect(getPublishedNotebookEntry(entry.slug)).toStrictEqual(entry);
  });

  it("rejects malformed fields and broken source references", () => {
    const invalidUrl = copyEntry();
    (invalidUrl.formats as Array<Record<string, unknown>>)[0].url = "not-a-url";
    expect(() => NotebookEntrySchema.parse(invalidUrl)).toThrow();

    const invalidDate = copyEntry();
    invalidDate.publishedAt = "2026-02-30";
    expect(() => NotebookEntrySchema.parse(invalidDate)).toThrow();

    const invalidSourceDate = copyEntry();
    (
      invalidSourceDate.sourceTrail as Array<Record<string, unknown>>
    )[0].publishedAt = "July 2026";
    expect(() => NotebookEntrySchema.parse(invalidSourceDate)).toThrow();

    const brokenReference = copyEntry();
    (
      brokenReference.turningPoints as Array<Record<string, unknown>>
    )[0].sourceIds = ["notebook-source-missing"];
    expect(() => NotebookEntrySchema.parse(brokenReference)).toThrow(
      /unknown Notebook source reference/
    );
  });

  it("rejects duplicate source, turning-point, watch-item, and registry IDs", () => {
    const duplicateSource = copyEntry();
    const sourceTrail = duplicateSource.sourceTrail as Array<
      Record<string, unknown>
    >;
    sourceTrail[1].id = sourceTrail[0].id;
    expect(() => NotebookEntrySchema.parse(duplicateSource)).toThrow(
      /source IDs must be unique/
    );

    const duplicateTurning = copyEntry();
    const turningPoints = duplicateTurning.turningPoints as Array<
      Record<string, unknown>
    >;
    turningPoints[1].id = turningPoints[0].id;
    expect(() => NotebookEntrySchema.parse(duplicateTurning)).toThrow(
      /turning-point IDs must be unique/
    );

    const duplicateWatchItem = copyEntry();
    const watchItems = duplicateWatchItem.watchItems as Array<
      Record<string, unknown>
    >;
    watchItems[1].id = watchItems[0].id;
    expect(() => NotebookEntrySchema.parse(duplicateWatchItem)).toThrow(
      /watch-item IDs must be unique/
    );

    const duplicateRegistry = copyEntry();
    duplicateRegistry.ordinal = 99;
    expect(() => parseNotebookRegistry([entry, duplicateRegistry])).toThrow(
      /Notebook slugs must be unique/
    );
  });

  it("requires dated, typed, and evidence-changing watch records", () => {
    const invalidType = copyEntry();
    (invalidType.watchItems as Array<Record<string, unknown>>)[0].claimType =
      "promise";
    expect(() => NotebookEntrySchema.parse(invalidType)).toThrow();

    const invalidDate = copyEntry();
    (invalidDate.watchItems as Array<Record<string, unknown>>)[0].baselineDate =
      "2026-02-30";
    expect(() => NotebookEntrySchema.parse(invalidDate)).toThrow();

    const noWeakeningEvidence = copyEntry();
    (
      noWeakeningEvidence.watchItems as Array<Record<string, unknown>>
    )[0].wouldWeaken = [];
    expect(() => NotebookEntrySchema.parse(noWeakeningEvidence)).toThrow();
  });

  it("keeps non-public entries out of the published selector contract", () => {
    expect(
      publishedNotebookEntries.every(
        (item) => item.editorialStatus === "published"
      )
    ).toBe(true);
  });
});
