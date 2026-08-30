import {
  getPublishedNotebookEntry,
  latestNotebookEntry,
  publishedNotebookEntries,
} from "@/content/notebook";
import {
  parseCirculationGatesNotebookEntry,
  type CirculationGatesNotebookEntry,
} from "@/content/notebook/schema";
import { whatGetsThrough as entry } from "./what-gets-through";

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
      readTime: "17 min",
      publishedAt: "2026-08-25",
      updatedAt: "2026-08-25",
      editorialStatus: "published",
      reviewState: "source-reviewed",
    });
    expect(publishedNotebookEntries.map((item) => item.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
    expect(latestNotebookEntry.ordinal).toBeGreaterThan(entry.ordinal);
    expect(getPublishedNotebookEntry(entry.slug)).toStrictEqual(entry);
    expect(publishedNotebookEntries.map((item) => item.slug)).toContain(
      "who-absorbs-the-shock"
    );
    expect(() =>
      parseCirculationGatesNotebookEntry(publishedNotebookEntries[0])
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

  it("retains gate-specific caveats and at least nine claim dispositions", () => {
    expect(entry.claimAudit.length).toBeGreaterThanOrEqual(9);
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

  it("resolves sources across gates, claims, turning points, preview, and audio", () => {
    const sourceIds = new Set(entry.sourceTrail.map((source) => source.id));
    const references = [
      entry.audio.sourceId,
      ...entry.frontPagePreview.sourceIds,
      ...entry.turningPoints.flatMap((point) => point.sourceIds),
      ...entry.gates.flatMap((gate) => gate.sourceIds),
      ...entry.claimAudit.flatMap((item) => item.sourceIds),
    ];
    expect(references.every((sourceId) => sourceIds.has(sourceId))).toBe(true);

    for (const surface of ["gates", "claimAudit", "turningPoints"] as const) {
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
    expect(authoredContent).not.toMatch(/[^\x00-\x7F]/);
    const disallowedBritishSpellings: readonly string[] = [
      "fav" + "oured",
      "organi" + "sation",
      "organi" + "sed",
      "pro" + "gramme",
      "lab" + "our",
      "lic" + "ence",
      "def" + "ence",
      "cen" + "tre",
    ];
    for (const spelling of disallowedBritishSpellings) {
      expect(authoredContent.toLowerCase()).not.toContain(spelling);
    }
  });
});
