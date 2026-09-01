import { NotebookEntrySchema } from "./schema";
import { publicNotebookEntries } from ".";

describe("Notebook front-page contract", () => {
  it("requires a thesis and source-resolved evidence preview for every public entry", () => {
    expect(publicNotebookEntries).toHaveLength(10);

    for (const entry of publicNotebookEntries) {
      expect(entry.thesis.length).toBeGreaterThan(80);
      expect(entry.frontPagePreview.finding.length).toBeGreaterThan(40);
      expect(entry.frontPagePreview.caveat.length).toBeGreaterThan(20);
      expect([1, 2, 3]).toContain(entry.frontPagePreview.sourceIds.length);

      const sourceIds = new Set(entry.sourceTrail.map((source) => source.id));
      for (const sourceId of entry.frontPagePreview.sourceIds) {
        expect(sourceIds.has(sourceId)).toBe(true);
      }
    }
  });

  it("rejects missing or unresolved front-page evidence", () => {
    const entry = publicNotebookEntries[0];
    const withoutThesis = { ...entry, thesis: undefined };
    expect(() => NotebookEntrySchema.parse(withoutThesis)).toThrow();

    const brokenPreview = {
      ...entry,
      frontPagePreview: {
        ...entry.frontPagePreview,
        sourceIds: ["notebook-source-missing"],
      },
    };
    expect(() => NotebookEntrySchema.parse(brokenPreview)).toThrow(
      /unknown Notebook source reference/
    );
  });
});
