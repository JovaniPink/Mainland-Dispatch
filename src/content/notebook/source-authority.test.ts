import { notebookSourceKnowledgeId } from "@/content/notebook/source-authority";

describe("Notebook source knowledge authority", () => {
  it("preserves moved and shared source identity across publications", () => {
    expect(
      notebookSourceKnowledgeId(
        "what-gets-through",
        "notebook-source-gates-yu-prior"
      )
    ).toBe("mainland-dispatch:source:what-gets-through-gates-yu-prior");
    expect(
      notebookSourceKnowledgeId(
        "where-does-origin-change",
        "notebook-source-gates-yu-prior"
      )
    ).toBe("mainland-dispatch:source:what-gets-through-gates-yu-prior");
    expect(
      notebookSourceKnowledgeId(
        "the-arctic-is-not-a-shortcut",
        "notebook-source-risk-aljazeera"
      )
    ).toBe("mainland-dispatch:source:routing-around-risk-risk-aljazeera");
  });

  it("derives a deterministic identity for sources outside the migration map", () => {
    expect(
      notebookSourceKnowledgeId("new-entry", "notebook-source-new-primary")
    ).toBe("mainland-dispatch:source:new-entry-new-primary");
  });
});
