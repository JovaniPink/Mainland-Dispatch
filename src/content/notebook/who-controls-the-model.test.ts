import { NotebookDraftSchema } from "./draft-schema";
import {
  whoControlsTheModel as draft,
  whoControlsTheModelWordCount,
} from "./who-controls-the-model";
import {
  notebookEntries,
  publicNotebookEntries,
  getPublicNotebookEntry,
} from "./index";
import { mainlandKnowledgeIndex } from "../knowledge-index";
import sitemap from "@/app/sitemap";

describe("Inquiry 11 draft boundary", () => {
  it("reserves a substantial six-section draft without publishing it", () => {
    expect(draft.ordinal).toBe(11);
    expect(draft.editorialStatus).toBe("draft");
    expect(draft.sections).toHaveLength(6);
    expect(whoControlsTheModelWordCount).toBeGreaterThanOrEqual(2500);
    expect(whoControlsTheModelWordCount).toBeLessThanOrEqual(3500);
    expect(draft).not.toHaveProperty("publishedAt");
    expect(notebookEntries.some((entry) => entry.ordinal === 11)).toBe(false);
    expect(publicNotebookEntries).toHaveLength(10);
    expect(getPublicNotebookEntry(draft.slug)).toBeUndefined();
    expect(JSON.stringify(mainlandKnowledgeIndex)).not.toContain(draft.slug);
    expect(sitemap().some((entry) => entry.url.includes(draft.slug))).toBe(
      false
    );
  });
  it("rejects publication dates and invalid source, claim, and date references", () => {
    expect(
      NotebookDraftSchema.safeParse({ ...draft, publishedAt: "2026-09-15" })
        .success
    ).toBe(false);
    const unknownSource = NotebookDraftSchema.parse(draft);
    unknownSource.sections[0].paragraphs[0].sourceIds = [
      "notebook-source-missing",
    ];
    expect(NotebookDraftSchema.safeParse(unknownSource).success).toBe(false);
    const unknownClaim = NotebookDraftSchema.parse(draft);
    unknownClaim.cases[0].claimIds = ["audit-missing"];
    expect(NotebookDraftSchema.safeParse(unknownClaim).success).toBe(false);
    expect(
      NotebookDraftSchema.safeParse({ ...draft, draftUpdatedAt: "2026-09-14" })
        .success
    ).toBe(false);
    const duplicate = {
      ...draft,
      sourceTrail: [...draft.sourceTrail, draft.sourceTrail[0]],
    };
    expect(NotebookDraftSchema.safeParse(duplicate).success).toBe(false);
  });
});
