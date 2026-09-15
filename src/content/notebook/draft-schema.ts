import { z } from "zod";
import { NotebookClaimAuditSchema, NotebookTrailItemSchema } from "./schema";

const text = z.string().trim().min(1);
const date = z.iso.date();
const fragment = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const references = z.array(text).min(1);

/** Drafts have revision dates, never publication dates or public registry entries. */
export const NotebookDraftSchema = z
  .strictObject({
    ordinal: z.number().int().positive(),
    slug: fragment,
    title: text,
    subtitle: text,
    thesis: text,
    editorialStatus: z.literal("draft"),
    reviewState: z.literal("editorial-review"),
    draftUpdatedAt: date,
    evidenceCutoff: date,
    tags: z.array(text).min(1),
    sections: z
      .array(
        z.object({
          id: fragment,
          title: text,
          eyebrow: text,
          paragraphs: z
            .array(
              z.object({
                text,
                sourceIds: references,
                claimIds: z.array(text),
              })
            )
            .min(1),
        })
      )
      .min(1),
    sourceTrail: z.array(NotebookTrailItemSchema).min(1),
    claimAudit: z.array(NotebookClaimAuditSchema).min(1),
    cases: z
      .array(
        z.object({
          id: fragment,
          label: text,
          activity: text,
          attribution: text,
          outcome: text,
          sourceIds: references,
          claimIds: references,
        })
      )
      .min(1),
    accessSteps: z
      .array(
        z.object({
          label: text,
          detail: text,
          sourceIds: references,
        })
      )
      .min(1),
    limitations: z.array(text).min(1),
  })
  .superRefine((draft, ctx) => {
    const sources = new Set(draft.sourceTrail.map((source) => source.id));
    const claims = new Set(draft.claimAudit.map((claim) => claim.id));
    const ids = [
      ...sources,
      ...claims,
      ...draft.sections.map((section) => section.id),
      ...draft.cases.map((item) => item.id),
    ];
    if (
      sources.size !== draft.sourceTrail.length ||
      claims.size !== draft.claimAudit.length ||
      new Set(ids).size !== ids.length
    ) {
      ctx.addIssue({ code: "custom", message: "Draft IDs must be unique" });
    }
    const referenced = [
      ...draft.claimAudit,
      ...draft.cases,
      ...draft.accessSteps,
      ...draft.sections.flatMap((section) => section.paragraphs),
    ];
    for (const item of referenced) {
      if (item.sourceIds.some((id) => !sources.has(id))) {
        ctx.addIssue({
          code: "custom",
          message: "Unknown draft source reference",
        });
      }
      if ("claimIds" in item && item.claimIds.some((id) => !claims.has(id))) {
        ctx.addIssue({
          code: "custom",
          message: "Unknown draft claim reference",
        });
      }
    }
    if (
      draft.evidenceCutoff > draft.draftUpdatedAt ||
      draft.sourceTrail.some(
        (source) =>
          source.retrievedAt > draft.draftUpdatedAt ||
          (source.publishedAt && source.publishedAt > draft.evidenceCutoff)
      )
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Draft dates exceed the recorded review or evidence cutoff",
      });
    }
  });

export type NotebookDraft = z.infer<typeof NotebookDraftSchema>;
