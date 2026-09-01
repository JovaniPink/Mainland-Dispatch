import {
  getPublicNotebookEntry,
  publicNotebookEntries,
} from "@/content/notebook";
import {
  parseTradeAdjustmentNotebookEntry,
  type TradeAdjustmentNotebookEntry,
} from "@/content/notebook/schema";
import { whoAbsorbsTheShock as entry } from "./who-absorbs-the-shock";

function copyEntry(): TradeAdjustmentNotebookEntry {
  const copy: unknown = JSON.parse(JSON.stringify(entry));
  return parseTradeAdjustmentNotebookEntry(copy);
}

describe("Who Absorbs the Shock Notebook registry", () => {
  it("publishes Inquiry 05 and closes the ordinal gap", () => {
    expect(entry).toMatchObject({
      variant: "trade-adjustment",
      ordinal: 5,
      slug: "who-absorbs-the-shock",
      title: "Who Absorbs the Shock?",
      publishedAt: "2026-08-26",
      updatedAt: "2026-08-26",
      editorialStatus: "published",
      reviewState: "source-reviewed",
    });
    expect(publicNotebookEntries.map((item) => item.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ]);
    expect(getPublicNotebookEntry(entry.slug)).toStrictEqual(entry);
  });

  it("records six completed publisher-audio passage audits", () => {
    expect(entry.passageAudit).toHaveLength(6);
    expect(entry.passageAudit.map((passage) => passage.requirement)).toEqual([
      "first-shock",
      "second-shock",
      "distribution",
      "germany",
      "policy",
      "ai-software",
    ]);
    for (const passage of entry.passageAudit) {
      expect(passage.auditState).toBe("audited");
      expect(passage.spans.length).toBeGreaterThan(0);
      expect(passage.paraphrase.length).toBeGreaterThan(60);
      expect(passage.boundary.length).toBeGreaterThan(40);
    }
    expect(entry.audio).toMatchObject({
      duration: "1:05:30",
      reviewedAt: "2026-08-26",
      transcriptAvailable: false,
    });
  });

  it("models the adjustment chain, distribution, comparison, and policy choices", () => {
    expect(entry.mechanismSteps.map((step) => step.order)).toEqual([
      1, 2, 3, 4, 5,
    ]);
    expect(entry.shockComparisons.length).toBeGreaterThanOrEqual(5);
    expect(entry.distributionCases.length).toBeGreaterThanOrEqual(6);
    expect(entry.policyOptions.length).toBeGreaterThanOrEqual(6);
    expect(entry.claimAudit.length).toBeGreaterThanOrEqual(12);
  });

  it("rejects incomplete and duplicate trade-adjustment structures", () => {
    const missingStep = copyEntry();
    missingStep.mechanismSteps = missingStep.mechanismSteps.slice(0, 4);
    expect(() => parseTradeAdjustmentNotebookEntry(missingStep)).toThrow();

    const duplicateStep = copyEntry();
    duplicateStep.mechanismSteps[1].id = duplicateStep.mechanismSteps[0].id;
    expect(() => parseTradeAdjustmentNotebookEntry(duplicateStep)).toThrow(
      /mechanism-step IDs must be unique/
    );

    const incompleteAudit = copyEntry();
    incompleteAudit.passageAudit[0].auditState = "blocked";
    expect(() => parseTradeAdjustmentNotebookEntry(incompleteAudit)).toThrow();
  });

  it("resolves every typed evidence reference", () => {
    const sourceIds = new Set(entry.sourceTrail.map((source) => source.id));
    const references = [
      entry.audio.sourceId,
      ...entry.frontPagePreview.sourceIds,
      ...entry.turningPoints.flatMap((point) => point.sourceIds),
      ...entry.passageAudit.flatMap((passage) => passage.sourceIds),
      ...entry.mechanismSteps.flatMap((step) => step.sourceIds),
      ...entry.shockComparisons.flatMap((comparison) => comparison.sourceIds),
      ...entry.distributionCases.flatMap((item) => item.sourceIds),
      ...entry.policyOptions.flatMap((option) => option.sourceIds),
      ...entry.claimAudit.flatMap((item) => item.sourceIds),
    ];
    expect(references.every((sourceId) => sourceIds.has(sourceId))).toBe(true);

    const broken = copyEntry();
    broken.policyOptions[0].sourceIds = ["notebook-source-missing"];
    expect(() => parseTradeAdjustmentNotebookEntry(broken)).toThrow(
      /unknown Notebook source reference/
    );
  });

  it("keeps public evidence and audio links on clean HTTPS URLs", () => {
    const links = [
      entry.audio.canonicalUrl,
      entry.audio.mediaUrl,
      ...entry.formats.map((format) => format.url),
      ...entry.sourceTrail.flatMap((source) =>
        source.links.map((link) => link.url)
      ),
    ];
    expect(links.every((url) => url.startsWith("https://"))).toBe(true);
    expect(links.every((url) => !url.includes("utm_"))).toBe(true);
  });

  it("keeps Inquiry 05 authored content in ASCII US English", () => {
    expect(JSON.stringify(entry)).not.toMatch(/[^\x00-\x7F]/);
  });
});
