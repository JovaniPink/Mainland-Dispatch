import { z } from "zod";
import { EvidenceStatusSchema } from "@/content/schema";

const nonEmpty = z.string().trim().min(1);
const slug = nonEmpty.regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "expected a lowercase kebab-case slug"
);
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    );
  }, "expected a real calendar date");
const sourceDate = z
  .string()
  .regex(
    /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/,
    "expected YYYY, YYYY-MM, or YYYY-MM-DD"
  )
  .refine((value) => {
    if (/^\d{4}$/.test(value)) return true;
    if (/^\d{4}-\d{2}$/.test(value)) {
      const month = Number(value.slice(5, 7));
      return month >= 1 && month <= 12;
    }
    const date = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    );
  }, "expected a real source date");
const sourceId = nonEmpty.regex(/^notebook-source-[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const NotebookEvidenceStatusSchema = z.enum([
  "observed",
  "official-position",
  "interpretation",
  "contested",
  "scenario",
]);

const NotebookFormatSchema = z.object({
  id: nonEmpty.regex(/^format-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: nonEmpty,
  title: nonEmpty,
  publisher: nonEmpty,
  duration: nonEmpty.optional(),
  url: z.url(),
  note: nonEmpty,
});

const NotebookTurningPointSchema = z.object({
  id: nonEmpty.regex(/^turning-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  timecode: nonEmpty,
  endTimecode: nonEmpty.optional(),
  seconds: z.number().int().nonnegative().optional(),
  title: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  argument: nonEmpty,
  reading: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookSourceLinkSchema = z.object({
  label: nonEmpty,
  url: z.url(),
});

const NotebookTrailItemSchema = z.object({
  id: sourceId,
  role: nonEmpty,
  title: nonEmpty,
  publisher: nonEmpty,
  author: nonEmpty.optional(),
  publishedAt: sourceDate.optional(),
  retrievedAt: isoDate.optional(),
  links: z.array(NotebookSourceLinkSchema).min(1),
  context: nonEmpty,
  limitation: nonEmpty.optional(),
});

const NotebookTimelineItemSchema = z.object({
  year: nonEmpty,
  label: nonEmpty,
  status: NotebookEvidenceStatusSchema,
  explanation: nonEmpty,
});

const NotebookClaimAuditSchema = z.object({
  id: nonEmpty.regex(/^audit-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  claim: nonEmpty,
  status: EvidenceStatusSchema,
  decision: z.enum(["retain", "qualify", "exclude"]),
  assessment: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookWatchUpdateSchema = z.object({
  id: nonEmpty.regex(/^update-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: isoDate,
  status: EvidenceStatusSchema,
  summary: nonEmpty,
  sourceIds: z.array(sourceId).min(1),
});

const NotebookWatchUpdateStateSchema = z.discriminatedUnion("state", [
  z.object({
    state: z.literal("no-verified-change"),
    reviewedAt: isoDate,
  }),
  z.object({
    state: z.literal("verified-change"),
    reviewedAt: isoDate,
    updates: z.array(NotebookWatchUpdateSchema).min(1),
  }),
]);

const NotebookWatchItemSchema = z.object({
  id: nonEmpty.regex(/^promise-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  claimType: z.enum([
    "commitment",
    "institutional_fact",
    "policy_principle",
    "observed_condition",
    "reported_proposal",
  ]),
  label: nonEmpty,
  baseline: nonEmpty,
  responsibleActor: nonEmpty,
  baselineDate: isoDate,
  deliveryWindow: nonEmpty,
  baselineStatus: EvidenceStatusSchema,
  assessmentStatus: EvidenceStatusSchema,
  whatHasHappened: nonEmpty,
  whatRemainsUnknown: z.array(nonEmpty).min(1),
  sourceIds: z.array(sourceId).min(1),
  wouldStrengthen: z.array(nonEmpty).min(1),
  wouldWeaken: z.array(nonEmpty).min(1),
  updateState: NotebookWatchUpdateStateSchema,
});

const NotebookAudioSchema = z.object({
  sourceId,
  canonicalUrl: z.url(),
  mediaUrl: z.url(),
  publisher: nonEmpty,
  duration: nonEmpty,
  transcriptAvailable: z.boolean(),
});

const NotebookBaseSchema = z.object({
  ordinal: z.number().int().positive(),
  slug,
  title: nonEmpty,
  subtitle: nonEmpty,
  description: nonEmpty,
  publishedAt: isoDate,
  updatedAt: isoDate,
  readTime: nonEmpty,
  tags: z.array(nonEmpty).min(1),
  editorialStatus: z.enum(["draft", "published", "corrected"]),
  reviewState: z.enum(["source-reviewed", "editorial-review"]),
  formats: z.array(NotebookFormatSchema).min(1),
  turningPoints: z.array(NotebookTurningPointSchema).min(1),
  sourceTrail: z.array(NotebookTrailItemSchema).min(1),
  unresolvedQuestion: nonEmpty,
  limitations: z.array(nonEmpty).min(1),
});

const ArgumentNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("argument-model"),
  timeline: z.array(NotebookTimelineItemSchema).min(1),
  sections: z.object({
    why: z.array(nonEmpty).min(1),
    model: z.array(nonEmpty).min(1),
    explains: z.array(nonEmpty).min(1),
    pushback: z.array(nonEmpty).min(1),
    context: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
});

const EvidenceWatchNotebookSchema = NotebookBaseSchema.extend({
  variant: z.literal("evidence-watch"),
  thesis: nonEmpty,
  audio: NotebookAudioSchema,
  claimAudit: z.array(NotebookClaimAuditSchema).min(1),
  watchItems: z.array(NotebookWatchItemSchema).length(6),
  sections: z.object({
    why: z.array(nonEmpty).min(1),
    proposal: z.array(nonEmpty).min(1),
    strongest: z.array(nonEmpty).min(1),
    overreach: z.array(nonEmpty).min(1),
    noul: z.array(nonEmpty).min(1),
    talent: z.array(nonEmpty).min(1),
    changed: z.array(nonEmpty).min(1),
  }),
});

export const NotebookEntrySchema = z
  .discriminatedUnion("variant", [
    ArgumentNotebookSchema,
    EvidenceWatchNotebookSchema,
  ])
  .superRefine((entry, ctx) => {
    if (entry.updatedAt < entry.publishedAt) {
      ctx.addIssue({
        code: "custom",
        message: "updatedAt must not precede publishedAt",
        path: ["updatedAt"],
      });
    }

    const checkUnique = (
      values: string[],
      path: (string | number)[],
      message: string
    ) => {
      if (new Set(values).size !== values.length) {
        ctx.addIssue({ code: "custom", message, path });
      }
    };

    checkUnique(
      entry.formats.map((format) => format.id),
      ["formats"],
      "format IDs must be unique"
    );
    checkUnique(
      entry.turningPoints.map((point) => point.id),
      ["turningPoints"],
      "turning-point IDs must be unique"
    );
    checkUnique(
      entry.sourceTrail.map((source) => source.id),
      ["sourceTrail"],
      "source IDs must be unique"
    );

    const knownSources = new Set(entry.sourceTrail.map((source) => source.id));
    const references = [
      ...entry.turningPoints.flatMap((point) => point.sourceIds),
      ...(entry.variant === "evidence-watch"
        ? [
            entry.audio.sourceId,
            ...entry.claimAudit.flatMap((item) => item.sourceIds),
            ...entry.watchItems.flatMap((item) => item.sourceIds),
            ...entry.watchItems.flatMap((item) =>
              item.updateState.state === "verified-change"
                ? item.updateState.updates.flatMap((update) => update.sourceIds)
                : []
            ),
          ]
        : []),
    ];
    for (const reference of references) {
      if (!knownSources.has(reference)) {
        ctx.addIssue({
          code: "custom",
          message: `unknown Notebook source reference: ${reference}`,
          path: ["sourceTrail"],
        });
      }
    }

    if (entry.variant === "evidence-watch") {
      checkUnique(
        entry.claimAudit.map((item) => item.id),
        ["claimAudit"],
        "claim-audit IDs must be unique"
      );
      checkUnique(
        entry.watchItems.map((item) => item.id),
        ["watchItems"],
        "watch-item IDs must be unique"
      );
      entry.watchItems.forEach((item, itemIndex) => {
        if (item.updateState.reviewedAt > entry.updatedAt) {
          ctx.addIssue({
            code: "custom",
            message: "watch review date must not follow entry updatedAt",
            path: ["watchItems", itemIndex, "updateState", "reviewedAt"],
          });
        }
        if (item.updateState.reviewedAt < item.baselineDate) {
          ctx.addIssue({
            code: "custom",
            message: "watch review date must not precede its baseline",
            path: ["watchItems", itemIndex, "updateState", "reviewedAt"],
          });
        }
        if (item.updateState.state !== "verified-change") return;

        checkUnique(
          item.updateState.updates.map((update) => update.id),
          ["watchItems", itemIndex, "updateState", "updates"],
          "watch-update IDs must be unique within a watch item"
        );
        item.updateState.updates.forEach((update, updateIndex) => {
          if (update.date < item.baselineDate) {
            ctx.addIssue({
              code: "custom",
              message: "watch update date must not precede its baseline",
              path: [
                "watchItems",
                itemIndex,
                "updateState",
                "updates",
                updateIndex,
                "date",
              ],
            });
          }
          if (update.date > item.updateState.reviewedAt) {
            ctx.addIssue({
              code: "custom",
              message: "watch update date must not follow its review date",
              path: [
                "watchItems",
                itemIndex,
                "updateState",
                "updates",
                updateIndex,
                "date",
              ],
            });
          }
        });
      });
    }
  });

export type NotebookEntry = z.infer<typeof NotebookEntrySchema>;
export type ArgumentNotebookEntry = Extract<
  NotebookEntry,
  { variant: "argument-model" }
>;
export type EvidenceWatchNotebookEntry = Extract<
  NotebookEntry,
  { variant: "evidence-watch" }
>;
export type NotebookEvidenceStatus = z.infer<
  typeof NotebookEvidenceStatusSchema
>;

export function parseNotebookEntry(value: unknown): NotebookEntry {
  return NotebookEntrySchema.parse(value);
}
