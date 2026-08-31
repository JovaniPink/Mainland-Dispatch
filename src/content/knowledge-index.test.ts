import { publishedDispatches } from "@/content/dispatches";
import { publicNotebookEntries } from "@/content/notebook";
import {
  mainlandKnowledgeIndex,
  validateMainlandKnowledgeBoundary,
} from "@/content/knowledge-index";

describe("public knowledge-contract adapter", () => {
  it("projects only public Dispatch and Notebook records", () => {
    expect(() => validateMainlandKnowledgeBoundary()).not.toThrow();
    const publications = mainlandKnowledgeIndex.objects.filter(
      ({ kind }) => kind === "publication"
    );
    expect(publications).toHaveLength(
      publishedDispatches.length + publicNotebookEntries.length
    );
  });

  it("preserves legacy IDs and canonical public routes", () => {
    for (const publication of mainlandKnowledgeIndex.objects.filter(
      ({ kind }) => kind === "publication"
    )) {
      expect(publication.legacyIds).not.toHaveLength(0);
      expect(JSON.stringify(publication)).toContain(
        "https://mainlanddispatch.com/"
      );
    }
  });

  it("does not turn curation into a license grant", () => {
    for (const source of mainlandKnowledgeIndex.objects.filter(
      ({ kind }) => kind === "source"
    )) {
      expect(JSON.stringify(source)).toContain("does not grant reuse rights");
    }
  });
});
