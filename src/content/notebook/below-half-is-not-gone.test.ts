import { isPublicNotebookEntry } from "@/content/notebook";
import { belowHalfIsNotGone } from "./below-half-is-not-gone";
import { parseEnergySystemNotebookEntry } from "./schema";

function copyEntry() {
  return JSON.parse(
    JSON.stringify(belowHalfIsNotGone)
  ) as typeof belowHalfIsNotGone;
}

describe("Below Half Is Not Gone energy-system contract", () => {
  it("preserves four ordered layers with two measures each", () => {
    expect(belowHalfIsNotGone.energyLayers.map((layer) => layer.id)).toEqual([
      "generation-mix",
      "generation-volume",
      "installed-capacity",
      "system-use",
    ]);
    expect(
      belowHalfIsNotGone.energyLayers.map((layer) => layer.measures.length)
    ).toEqual([2, 2, 2, 2]);
    expect(belowHalfIsNotGone.sourceTrail).toHaveLength(8);
    expect(belowHalfIsNotGone.formats).toHaveLength(3);
    expect(belowHalfIsNotGone.alternativeReadings).toHaveLength(4);
  });

  it("keeps a draft out of public selection", () => {
    const draft = copyEntry();
    draft.editorialStatus = "draft";
    expect(isPublicNotebookEntry(parseEnergySystemNotebookEntry(draft))).toBe(
      false
    );
  });

  it.each([
    [
      "misordered layers",
      (entry: ReturnType<typeof copyEntry>) => entry.energyLayers.reverse(),
    ],
    [
      "duplicate measure IDs",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[0].measures[1].id =
          entry.energyLayers[0].measures[0].id;
      },
    ],
    [
      "duplicate measure source references",
      (entry: ReturnType<typeof copyEntry>) => {
        const sourceId = entry.energyLayers[0].measures[0].sourceIds[0];
        entry.energyLayers[0].measures[0].sourceIds = [sourceId, sourceId];
      },
    ],
    [
      "an incomplete measure unit",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[0].measures[0].unit = "";
      },
    ],
    [
      "an incomplete measure period",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[0].measures[0].period = "";
      },
    ],
    [
      "an incomplete measure boundary",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[0].measures[0].boundary = "";
      },
    ],
    [
      "the wrong measure cardinality",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[0].measures.pop();
      },
    ],
    [
      "measure-layer mismatch",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[0].measures[0].layer = "system-use";
      },
    ],
    [
      "unknown measure source",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[0].measures[0].sourceIds = [
          "notebook-source-energy-missing",
        ];
      },
    ],
    [
      "mislabeled curtailment estimate",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.energyLayers[3].measures[1].evidenceKind = "official-measurement";
      },
    ],
    [
      "mislabeled demand forecast",
      (entry: ReturnType<typeof copyEntry>) => {
        const contrast = entry.energyLayers
          .flatMap((layer) => layer.measures)
          .flatMap((measure) => measure.contrasts)
          .find((item) => item.id === "energy-contrast-demand-forecast");
        if (!contrast) throw new Error("missing forecast contrast fixture");
        contrast.evidenceKind = "official-measurement";
      },
    ],
    [
      "future retrieval date",
      (entry: ReturnType<typeof copyEntry>) => {
        entry.sourceTrail[0].retrievedAt = "2026-09-02";
      },
    ],
  ])("rejects %s", (_, mutate) => {
    const invalid = copyEntry();
    mutate(invalid);
    expect(() => parseEnergySystemNotebookEntry(invalid)).toThrow();
  });
});
