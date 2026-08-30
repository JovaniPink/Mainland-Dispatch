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
    ...(item.updateState.state === "verified-change"
      ? item.updateState.updates.map((update) => update.summary)
      : []),
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
    expect(entry.updatedAt).toBe("2026-08-08");
    expect(
      entry.watchItems.every(
        (item) =>
          item.updateState.state === "no-verified-change" &&
          item.updateState.reviewedAt === "2026-08-08"
      )
    ).toBe(true);
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

  it("advances every bounded review without inventing a verified change", () => {
    expect(
      entry.watchItems.map((item) => ({
        id: item.id,
        updateState: item.updateState,
      }))
    ).toEqual(
      [
        "promise-training",
        "promise-centers",
        "promise-mazu",
        "promise-waico",
        "promise-open-models",
        "promise-security",
      ].map((id) => ({
        id,
        updateState: {
          state: "no-verified-change",
          reviewedAt: "2026-08-08",
        },
      }))
    );
  });

  it("publishes all inquiries and resolves this entry by slug", () => {
    expect(publishedNotebookEntries.map((item) => item.slug)).toEqual([
      "what-xi-jinping-wants",
      "open-models-closed-system",
      "dominance-is-a-dashboard",
      "routing-around-risk",
      "who-absorbs-the-shock",
      "what-gets-through",
      "july-is-not-one-number",
    ]);
    expect(latestNotebookEntry.slug).toBe("july-is-not-one-number");
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

  it("keeps later updates dated, sourced, and separate from the baseline", () => {
    const validUpdate = copyEntry();
    (validUpdate.watchItems as Array<Record<string, unknown>>)[0].updateState =
      {
        state: "verified-change",
        reviewedAt: "2026-07-29",
        updates: [
          {
            id: "update-training-program",
            date: "2026-07-29",
            status: "officiallyAnnounced",
            summary:
              "A named program was announced; delivery remains unverified.",
            sourceIds: ["notebook-source-xi-waic-address"],
          },
        ],
      };
    expect(() => NotebookEntrySchema.parse(validUpdate)).not.toThrow();

    const staleEntryDate = copyEntry();
    (
      staleEntryDate.watchItems as Array<Record<string, unknown>>
    )[0].updateState = {
      state: "no-verified-change",
      reviewedAt: "2026-08-09",
    };
    expect(() => NotebookEntrySchema.parse(staleEntryDate)).toThrow(
      /watch review date must not follow entry updatedAt/
    );

    const noEvidence = copyEntry();
    (noEvidence.watchItems as Array<Record<string, unknown>>)[0].updateState = {
      state: "verified-change",
      reviewedAt: "2026-07-29",
      updates: [],
    };
    expect(() => NotebookEntrySchema.parse(noEvidence)).toThrow();

    const brokenSource = copyEntry();
    (brokenSource.watchItems as Array<Record<string, unknown>>)[0].updateState =
      {
        state: "verified-change",
        reviewedAt: "2026-07-29",
        updates: [
          {
            id: "update-training-program",
            date: "2026-07-29",
            status: "officiallyAnnounced",
            summary: "A later claim without a registry source.",
            sourceIds: ["notebook-source-missing"],
          },
        ],
      };
    expect(() => NotebookEntrySchema.parse(brokenSource)).toThrow(
      /unknown Notebook source reference/
    );

    const beforeBaseline = copyEntry();
    (
      beforeBaseline.watchItems as Array<Record<string, unknown>>
    )[0].updateState = {
      state: "verified-change",
      reviewedAt: "2026-07-29",
      updates: [
        {
          id: "update-training-program",
          date: "2026-07-16",
          status: "officiallyAnnounced",
          summary: "This predates the promise baseline.",
          sourceIds: ["notebook-source-xi-waic-address"],
        },
      ],
    };
    expect(() => NotebookEntrySchema.parse(beforeBaseline)).toThrow(
      /watch update date must not precede its baseline/
    );
  });

  it("keeps non-public entries out of the published selector contract", () => {
    expect(
      publishedNotebookEntries.every(
        (item) => item.editorialStatus === "published"
      )
    ).toBe(true);
  });
});
