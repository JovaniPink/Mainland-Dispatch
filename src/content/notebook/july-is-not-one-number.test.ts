import {
  getPublicNotebookEntry,
  latestNotebookEntry,
  publicNotebookEntries,
} from "@/content/notebook";
import {
  parseEconomicSignalsNotebookEntry,
  type EconomicSignalsNotebookEntry,
} from "@/content/notebook/schema";
import { julyIsNotOneNumber as entry } from "./july-is-not-one-number";

function copyEntry(): EconomicSignalsNotebookEntry {
  const copy: unknown = JSON.parse(JSON.stringify(entry));
  return parseEconomicSignalsNotebookEntry(copy);
}

describe("July Is Not One Number Notebook registry", () => {
  it("keeps Inquiry 07 in the complete source-reviewed registry", () => {
    expect(entry).toMatchObject({
      variant: "economic-signals",
      ordinal: 7,
      slug: "july-is-not-one-number",
      title: "July Is Not One Number",
      publishedAt: "2026-08-29",
      updatedAt: "2026-08-29",
      editorialStatus: "published",
      reviewState: "source-reviewed",
    });
    expect(publicNotebookEntries.map((item) => item.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ]);
    expect(latestNotebookEntry.ordinal).toBeGreaterThan(entry.ordinal);
    expect(getPublicNotebookEntry(entry.slug)).toStrictEqual(entry);
  });

  it("preserves six distinct indicators with their periods, units, and bases", () => {
    expect(entry.indicators.map((indicator) => indicator.dimension)).toEqual([
      "industrial-output",
      "industrial-profits",
      "retail-sales",
      "fixed-investment",
      "property",
      "manufacturing-pmi",
    ]);

    expect(entry.indicators).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dimension: "industrial-output",
          period: "July 2026",
          display: "+4.5%",
          value: 4.5,
          unit: "percent change",
          comparison: "year over year",
          basis: "real",
        }),
        expect.objectContaining({
          dimension: "industrial-profits",
          period: "January-July 2026",
          display: "+17.6%",
          value: 17.6,
          unit: "percent change",
          comparison: "year over year",
          basis: "comparable",
        }),
        expect.objectContaining({
          dimension: "retail-sales",
          period: "July 2026",
          display: "+0.6%",
          value: 0.6,
          unit: "percent change",
          comparison: "year over year",
          basis: "nominal",
        }),
        expect.objectContaining({
          dimension: "fixed-investment",
          period: "January-July 2026",
          display: "-6.7%",
          value: -6.7,
          unit: "percent change",
          comparison: "year over year",
          basis: "not price adjusted",
        }),
        expect.objectContaining({
          dimension: "property",
          period: "January-July 2026",
          display: "-19.2%",
          value: -19.2,
          unit: "percent change",
          comparison: "year over year",
          basis: "comparable",
        }),
        expect.objectContaining({
          dimension: "manufacturing-pmi",
          period: "July 2026",
          display: "49.2",
          value: 49.2,
          unit: "diffusion index points",
          comparison: "50-point threshold",
          basis: "seasonally adjusted survey",
        }),
      ])
    );
  });

  it("keeps sector contrasts and alternative readings attached to sources", () => {
    const profit = entry.indicators.find(
      (indicator) => indicator.dimension === "industrial-profits"
    );
    const investment = entry.indicators.find(
      (indicator) => indicator.dimension === "fixed-investment"
    );

    expect(profit?.contrasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Electronics profits",
          display: "+110%",
        }),
        expect.objectContaining({
          label: "Automotive profits",
          display: "-20.4%",
        }),
        expect.objectContaining({ label: "Receivables", display: "+8.5%" }),
        expect.objectContaining({
          label: "Finished-goods inventories",
          display: "+10.8%",
        }),
      ])
    );
    expect(investment?.contrasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Intellectual-property products",
          display: "+9.1%",
        }),
        expect.objectContaining({
          label: "Non-governmental investment",
          display: "-9.4%",
        }),
      ])
    );

    expect(entry.alternativeReadings).toHaveLength(5);
    expect(new Set(entry.alternativeReadings.map((item) => item.id)).size).toBe(
      entry.alternativeReadings.length
    );
    expect(Object.hasOwn(entry, "verdict")).toBe(false);
    expect(entry.limitations.join(" ")).toMatch(
      /retail sales are not total household consumption/i
    );
  });

  it("preserves primary, official, independent, and technical source roles", () => {
    const roles = entry.sourceTrail.map((source) => source.role);
    expect(roles.filter((role) => role.startsWith("Primary"))).toHaveLength(6);
    expect(roles.filter((role) => role.startsWith("Official"))).toHaveLength(1);
    expect(roles.filter((role) => role.startsWith("Independent"))).toHaveLength(
      3
    );
    expect(roles.filter((role) => role.startsWith("Technical"))).toHaveLength(
      1
    );

    const pmi = entry.sourceTrail.find((source) => source.id.endsWith("pmi"));
    const profits = entry.sourceTrail.find((source) =>
      source.id.endsWith("profits")
    );
    expect(pmi?.publishedAt).toBe("2026-08-01");
    expect(profits?.publishedAt).toBe("2026-08-27");
    expect(profits?.links.map((link) => link.label)).toEqual([
      "Chinese release",
      "English release",
    ]);

    expect(
      Object.fromEntries(
        entry.sourceTrail.map((source) => [source.id, source.publishedAt])
      )
    ).toEqual({
      "notebook-source-july-output": "2026-08-18",
      "notebook-source-july-profits": "2026-08-27",
      "notebook-source-july-retail": "2026-08-18",
      "notebook-source-july-investment": "2026-08-18",
      "notebook-source-july-property": "2026-08-18",
      "notebook-source-july-pmi": "2026-08-01",
      "notebook-source-july-nbs-summary": "2026-08-17",
      "notebook-source-july-world-bank": "2026-07-07",
      "notebook-source-july-oecd": "2026-06",
      "notebook-source-july-imf": "2026-01-28",
      "notebook-source-july-bis": "2025-12-17",
    });
  });

  it("rejects duplicate dimensions, reading IDs, and unresolved sources", () => {
    const duplicateDimension = copyEntry();
    duplicateDimension.indicators[5].dimension =
      duplicateDimension.indicators[4].dimension;
    expect(() => parseEconomicSignalsNotebookEntry(duplicateDimension)).toThrow(
      /indicator dimensions must be unique/
    );

    const duplicateReading = copyEntry();
    duplicateReading.alternativeReadings[1].id =
      duplicateReading.alternativeReadings[0].id;
    expect(() => parseEconomicSignalsNotebookEntry(duplicateReading)).toThrow(
      /alternative-reading IDs must be unique/
    );

    const unresolved = copyEntry();
    unresolved.indicators[0].sourceIds = ["notebook-source-missing"];
    expect(() => parseEconomicSignalsNotebookEntry(unresolved)).toThrow(
      /unknown Notebook source reference/
    );
  });

  it("rejects drift from the required source-role counts", () => {
    const wrongIndependentCount = copyEntry();
    const independent = wrongIndependentCount.sourceTrail.find((source) =>
      source.role.startsWith("Independent")
    );
    if (!independent) throw new Error("expected an independent source role");
    independent.role = "Technical research - duplicated role";

    expect(() =>
      parseEconomicSignalsNotebookEntry(wrongIndependentCount)
    ).toThrow(/exactly three independent source roles/);
  });

  it("rejects cardinality, status, and composite-verdict drift", () => {
    const extraFormat = copyEntry();
    extraFormat.formats.push({
      ...extraFormat.formats[0],
      id: "format-july-extra",
    });
    expect(() => parseEconomicSignalsNotebookEntry(extraFormat)).toThrow(
      /exactly 3 context formats/
    );

    const extraSource = copyEntry();
    extraSource.sourceTrail.push({
      ...extraSource.sourceTrail[0],
      id: "notebook-source-july-extra",
      role: "Additional context",
    });
    expect(() => parseEconomicSignalsNotebookEntry(extraSource)).toThrow(
      /exactly 11 source records/
    );

    const missingLimitation = copyEntry();
    missingLimitation.limitations.pop();
    expect(() => parseEconomicSignalsNotebookEntry(missingLimitation)).toThrow(
      /exactly 8 limitations/
    );

    const wrongIndicatorStatus = copyEntry();
    Object.assign(wrongIndicatorStatus.indicators[0], { status: "scenario" });
    expect(() =>
      parseEconomicSignalsNotebookEntry(wrongIndicatorStatus)
    ).toThrow();

    const wrongReadingStatus = copyEntry();
    Object.assign(wrongReadingStatus.alternativeReadings[0], {
      status: "observed",
    });
    expect(() =>
      parseEconomicSignalsNotebookEntry(wrongReadingStatus)
    ).toThrow();

    const compositeVerdict: unknown = {
      ...copyEntry(),
      verdict: "one-number judgment",
    };
    expect(() => parseEconomicSignalsNotebookEntry(compositeVerdict)).toThrow(
      /unrecognized key.*verdict/i
    );
  });

  it("keeps Inquiry 07 authored content on clean HTTPS URLs in ASCII US English", () => {
    const authoredContent = JSON.stringify(entry);
    const links = [
      ...entry.formats.map((format) => format.url),
      ...entry.sourceTrail.flatMap((source) =>
        source.links.map((link) => link.url)
      ),
    ];

    expect(links.every((url) => url.startsWith("https://"))).toBe(true);
    expect(links.every((url) => !url.includes("utm_"))).toBe(true);
    expect(authoredContent).not.toMatch(/[^\x00-\x7F]/);
  });
});
