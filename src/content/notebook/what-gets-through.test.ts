import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  getPublicNotebookEntry,
  latestNotebookEntry,
  publicNotebookEntries,
} from "@/content/notebook";
import {
  parseCirculationGatesNotebookEntry,
  type CirculationGatesNotebookEntry,
} from "@/content/notebook/schema";
import { whatGetsThrough as entry } from "./what-gets-through";

const disallowedBritishSpellings = [
  "fav" + "oured",
  "organi" + "sation",
  "organi" + "sed",
  "pro" + "gramme",
  "lab" + "our",
  "lic" + "ence",
  "def" + "ence",
  "cen" + "tre",
] as const;

function expectAsciiUsEnglish(content: string): void {
  expect(content).not.toMatch(/[^\x00-\x7F]/);
  for (const spelling of disallowedBritishSpellings) {
    expect(content.toLowerCase()).not.toContain(spelling);
  }
}

function copyEntry(): CirculationGatesNotebookEntry {
  const copy: unknown = JSON.parse(JSON.stringify(entry));
  return parseCirculationGatesNotebookEntry(copy);
}

describe("What Gets Through Notebook registry", () => {
  it("publishes the sixth inquiry after Notebook Five closes the gap", () => {
    expect(entry).toMatchObject({
      variant: "circulation-gates",
      ordinal: 6,
      slug: "what-gets-through",
      title: "What Gets Through?",
      readTime: "24 min",
      publishedAt: "2026-08-25",
      updatedAt: "2026-08-30",
      editorialStatus: "published",
      reviewState: "source-reviewed",
    });
    expect(publicNotebookEntries.map((item) => item.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
    expect(latestNotebookEntry.ordinal).toBeGreaterThan(entry.ordinal);
    expect(getPublicNotebookEntry(entry.slug)).toStrictEqual(entry);
    expect(publicNotebookEntries.map((item) => item.slug)).toContain(
      "who-absorbs-the-shock"
    );
    expect(() =>
      parseCirculationGatesNotebookEntry(publicNotebookEntries[0])
    ).toThrow(/expected a circulation-gates Notebook entry/);
  });

  it("locks the publisher episode record and transcript limitation", () => {
    expect(entry.formats[0]).toMatchObject({
      label: "Listen",
      publisher: "China Insider - Hudson Institute",
      duration: "39:23",
    });
    expect(entry.audio).toMatchObject({
      duration: "39:23",
      reviewedAt: "2026-08-25",
      transcriptAvailable: false,
    });
    expect(
      entry.sourceTrail.find(
        (source) => source.id === "notebook-source-gates-episode"
      )
    ).toMatchObject({ retrievedAt: "2026-08-30" });
    expect(entry.limitations.join(" ")).toMatch(
      /no publisher transcript or chapter record/i
    );
  });

  it("maps three exact turning points from the publisher audio", () => {
    expect(entry.turningPoints).toHaveLength(3);
    expect(entry.turningPoints.map((point) => point.timecode)).toEqual([
      "01:53",
      "20:48",
      "29:38",
    ]);
    expect(entry.turningPoints.map((point) => point.seconds)).toEqual([
      113, 1248, 1778,
    ]);
  });

  it("defines exactly one uniquely named gate for each required domain", () => {
    expect(entry.gates.map((gate) => gate.domain)).toEqual([
      "trade",
      "culture",
      "memory",
    ]);
    expect(new Set(entry.gates.map((gate) => gate.id)).size).toBe(3);
    for (const gate of entry.gates) {
      expect(gate.subject.length).toBeGreaterThan(20);
      expect(gate.gatekeeper.length).toBeGreaterThan(10);
      expect(gate.admissionRule.length).toBeGreaterThan(20);
      expect(gate.observedMovement.length).toBeGreaterThan(20);
      expect(gate.outcome.length).toBeGreaterThan(20);
      expect(gate.caveat.length).toBeGreaterThan(30);
      expect(gate.sourceIds.length).toBeGreaterThan(0);
    }
  });

  it("retains gate-specific caveats and the expanded claim dispositions", () => {
    expect(entry.claimAudit.length).toBeGreaterThanOrEqual(28);
    expect(new Set(entry.claimAudit.map((item) => item.id)).size).toBe(
      entry.claimAudit.length
    );
    expect(entry.gates.find((gate) => gate.domain === "trade")?.caveat).toMatch(
      /aggregate|transshipment|evidence/i
    );
    expect(
      entry.gates.find((gate) => gate.domain === "culture")?.caveat
    ).toMatch(/same-day|lifetime|dated/i);
    expect(
      entry.gates.find((gate) => gate.domain === "memory")?.caveat
    ).toMatch(/sentenc|conviction/i);
  });

  it("separates the proof path from the political pressure sequence", () => {
    expect(entry.tradeProofs).toHaveLength(4);
    expect(entry.tradeProofs.map((item) => item.verdict)).toEqual([
      "documented",
      "not-publicly-established",
      "not-publicly-established",
      "not-publicly-established",
    ]);
    expect(entry.tradePressure).toHaveLength(10);
    expect(entry.tradePressure.map((item) => item.date)).toEqual([
      "2024-10-01",
      "2025-03-20",
      "2026-01-16",
      "2026-01-24",
      "2026-03-01",
      "2026-07-01",
      "2026-08-13",
      "2026-08-21",
      "2026-08-22",
      "2026-08-25",
    ]);
    expect(entry.tradeFrames).toHaveLength(5);
    expect(entry.tradeFrames.map((item) => item.sourceClass)).toEqual([
      "Commentary and analysis",
      "Official legal rationale",
      "Official risk model and allegation",
      "Official actions across time",
      "Independent trade-flow analysis",
    ]);
  });

  it("rejects missing and duplicate circulation gates", () => {
    const missing = copyEntry();
    missing.gates = missing.gates.slice(0, 2);
    expect(() => parseCirculationGatesNotebookEntry(missing)).toThrow();

    const duplicateDomain = copyEntry();
    duplicateDomain.gates[2].domain = duplicateDomain.gates[1].domain;
    expect(() => parseCirculationGatesNotebookEntry(duplicateDomain)).toThrow(
      /gate domains must be unique/
    );

    const duplicateId = copyEntry();
    duplicateId.gates[2].id = duplicateId.gates[1].id;
    expect(() => parseCirculationGatesNotebookEntry(duplicateId)).toThrow(
      /gate IDs must be unique/
    );
  });

  it("rejects duplicate claim-audit IDs", () => {
    const duplicateClaim = copyEntry();
    duplicateClaim.claimAudit[1].id = duplicateClaim.claimAudit[0].id;
    expect(() => parseCirculationGatesNotebookEntry(duplicateClaim)).toThrow(
      /claim-audit IDs must be unique/
    );
  });

  it("rejects duplicate proof and frame IDs and unordered pressure events", () => {
    const duplicateProof = copyEntry();
    duplicateProof.tradeProofs[1].id = duplicateProof.tradeProofs[0].id;
    expect(() => parseCirculationGatesNotebookEntry(duplicateProof)).toThrow(
      /trade-proof IDs must be unique/
    );

    const duplicatePressure = copyEntry();
    duplicatePressure.tradePressure[1].id =
      duplicatePressure.tradePressure[0].id;
    expect(() => parseCirculationGatesNotebookEntry(duplicatePressure)).toThrow(
      /trade-pressure IDs must be unique/
    );

    const duplicateFrame = copyEntry();
    duplicateFrame.tradeFrames[1].id = duplicateFrame.tradeFrames[0].id;
    expect(() => parseCirculationGatesNotebookEntry(duplicateFrame)).toThrow(
      /trade-frame IDs must be unique/
    );

    const invalidFrameClass = {
      ...entry,
      tradeFrames: entry.tradeFrames.map((frame, index) =>
        index === 0 ? { ...frame, sourceClass: "Editorial opinion" } : frame
      ),
    };
    expect(() =>
      parseCirculationGatesNotebookEntry(invalidFrameClass)
    ).toThrow();

    const unorderedPressure = copyEntry();
    unorderedPressure.tradePressure[1].date = "2024-09-30";
    expect(() => parseCirculationGatesNotebookEntry(unorderedPressure)).toThrow(
      /trade pressure entries must be chronological/
    );
  });

  it("resolves sources across gates, claims, turning points, preview, and audio", () => {
    const sourceIds = new Set(entry.sourceTrail.map((source) => source.id));
    const references = [
      entry.audio.sourceId,
      ...entry.frontPagePreview.sourceIds,
      ...entry.turningPoints.flatMap((point) => point.sourceIds),
      ...entry.gates.flatMap((gate) => gate.sourceIds),
      ...entry.claimAudit.flatMap((item) => item.sourceIds),
      ...entry.tradeProofs.flatMap((item) => item.sourceIds),
      ...entry.tradePressure.flatMap((item) => item.sourceIds),
      ...entry.tradeFrames.flatMap((item) => item.sourceIds),
    ];
    expect(references.every((sourceId) => sourceIds.has(sourceId))).toBe(true);

    for (const surface of [
      "gates",
      "claimAudit",
      "turningPoints",
      "tradeProofs",
      "tradePressure",
      "tradeFrames",
    ] as const) {
      const broken = copyEntry();
      broken[surface][0].sourceIds = ["notebook-source-missing"];
      expect(() => parseCirculationGatesNotebookEntry(broken)).toThrow(
        /unknown Notebook source reference/
      );
    }

    const brokenAudio = copyEntry();
    brokenAudio.audio.sourceId = "notebook-source-missing";
    expect(() => parseCirculationGatesNotebookEntry(brokenAudio)).toThrow(
      /unknown Notebook source reference/
    );
  });

  it("keeps all published evidence and audio links on clean HTTPS URLs", () => {
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

    const insecure = copyEntry();
    insecure.sourceTrail[0].links[0].url = "http://example.com/evidence";
    expect(() => parseCirculationGatesNotebookEntry(insecure)).toThrow(
      /expected an HTTPS URL/
    );

    const tracked = copyEntry();
    tracked.sourceTrail[0].links[0].url =
      "https://example.com/evidence?utm_source=test";
    expect(() => parseCirculationGatesNotebookEntry(tracked)).toThrow(
      /tracking parameters are not allowed/
    );
  });

  it("keeps Inquiry 06 authored content in ASCII US English", () => {
    const authoredContent = JSON.stringify(entry);
    expectAsciiUsEnglish(authoredContent);
  });

  it("keeps the follow-up research note in ASCII US English", () => {
    const note = readFileSync(
      join(
        process.cwd(),
        "docs/source-notes/2026-08-30-us-canada-china-transshipment-follow-up.md"
      ),
      "utf8"
    );
    expectAsciiUsEnglish(note);
  });
});
