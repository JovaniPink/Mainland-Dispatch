import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  getPublicNotebookEntry,
  latestNotebookEntry,
  publicNotebookEntries,
} from "@/content/notebook";
import {
  parseCirculationTwoDomainNotebookEntry,
  type CirculationTwoDomainNotebookEntry,
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

function copyEntry(): CirculationTwoDomainNotebookEntry {
  const copy: unknown = JSON.parse(JSON.stringify(entry));
  return parseCirculationTwoDomainNotebookEntry(copy);
}

describe("What Gets Through corrected Notebook registry", () => {
  it("preserves Inquiry 06 identity under the accepted two-domain contract", () => {
    expect(entry).toMatchObject({
      variant: "circulation-two-domain",
      ordinal: 6,
      slug: "what-gets-through",
      title: "What Gets Through?",
      readTime: "16 min",
      publishedAt: "2026-08-25",
      updatedAt: "2026-09-01",
      editorialStatus: "corrected",
      reviewState: "source-reviewed",
    });
    expect(publicNotebookEntries.map((item) => item.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
    expect(latestNotebookEntry.ordinal).toBeGreaterThan(entry.ordinal);
    expect(getPublicNotebookEntry(entry.slug)).toStrictEqual(entry);
    expect(() =>
      parseCirculationTwoDomainNotebookEntry(publicNotebookEntries[0])
    ).toThrow(/expected a circulation-two-domain Notebook entry/);
  });

  it("keeps the single publisher format and consent-gated audio only here", () => {
    expect(entry.formats).toHaveLength(1);
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
      /provides no transcript or chapter record/i
    );
  });

  it("locks two exact turning points and culture-memory gates", () => {
    expect(entry.turningPoints.map((point) => point.timecode)).toEqual([
      "20:48",
      "29:38",
    ]);
    expect(entry.turningPoints.map((point) => point.seconds)).toEqual([
      1248, 1778,
    ]);
    expect(entry.gates.map((gate) => gate.domain)).toEqual([
      "culture",
      "memory",
    ]);
    expect(new Set(entry.gates.map((gate) => gate.id)).size).toBe(2);
    expect(entry.claimAudit).toHaveLength(10);
    expect(entry.sourceTrail).toHaveLength(9);
  });

  it("rejects missing, duplicate, or reordered two-domain gates", () => {
    const missing = copyEntry();
    missing.gates = missing.gates.slice(0, 1);
    expect(() => parseCirculationTwoDomainNotebookEntry(missing)).toThrow();

    const duplicate = copyEntry();
    duplicate.gates[1].id = duplicate.gates[0].id;
    duplicate.gates[1].domain = duplicate.gates[0].domain;
    expect(() => parseCirculationTwoDomainNotebookEntry(duplicate)).toThrow();

    const reordered = copyEntry();
    reordered.gates.reverse();
    expect(() => parseCirculationTwoDomainNotebookEntry(reordered)).toThrow(
      /culture then memory/
    );
  });

  it("rejects duplicate claims and unknown source references", () => {
    const duplicateClaim = copyEntry();
    duplicateClaim.claimAudit[1].id = duplicateClaim.claimAudit[0].id;
    expect(() =>
      parseCirculationTwoDomainNotebookEntry(duplicateClaim)
    ).toThrow(/claim-audit IDs must be unique/);

    for (const surface of ["gates", "claimAudit", "turningPoints"] as const) {
      const broken = copyEntry();
      broken[surface][0].sourceIds = ["notebook-source-missing"];
      expect(() => parseCirculationTwoDomainNotebookEntry(broken)).toThrow(
        /unknown Notebook source reference/
      );
    }
  });

  it("keeps all evidence and audio links on clean HTTPS URLs", () => {
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
    expect(() => parseCirculationTwoDomainNotebookEntry(insecure)).toThrow(
      /expected an HTTPS URL/
    );
  });

  it("keeps Inquiry 06 authored content and its follow-up note in ASCII US English", () => {
    expectAsciiUsEnglish(JSON.stringify(entry));
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
