import { z } from "zod";

export const EditorialStatusSchema = z.enum([
  "draft",
  "metadataCheck",
  "editorialReview",
  "sourceReview",
  "ready",
  "scheduled",
  "published",
  "corrected",
  "archived",
]);

export const TranslationStatusSchema = z.enum([
  "original-english",
  "original-chinese",
  "machine-translated",
  "human-translated",
  "bilingual",
]);

export const VerticalSchema = z.enum([
  "bilateral",
  "culture",
  "mainland",
  "technology",
  "economy",
]);

/** Evidence posture for dossier claims and trace assessments. */
export const EvidenceStatusSchema = z.enum([
  "reported",
  "officiallyAnnounced",
  "implemented",
  "independentlyObserved",
  "contested",
  "superseded",
  "corrected",
]);

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    );
  }, "expected a real calendar date");

const nonEmpty = z.string().trim().min(1);
const slug = nonEmpty.regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "expected a lowercase kebab-case slug"
);
const nonEmptyList = z.array(nonEmpty).default([]);

const DispatchBase = z.object({
  id: nonEmpty.regex(
    /^d-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a d- prefixed id"
  ),
  slug,
  title: nonEmpty,
  summary: nonEmpty,
  commentary: nonEmpty,
  whyItMatters: nonEmpty,
  source: nonEmpty,
  sourceUrl: z.url(),
  sourceDate: isoDate,
  curatedAt: isoDate,
  updatedAt: isoDate,
  language: nonEmpty,
  translationStatus: TranslationStatusSchema,
  verticals: z.array(VerticalSchema).min(1),
  tags: nonEmptyList,
  people: nonEmptyList,
  organizations: nonEmptyList,
  places: nonEmptyList,
  relatedDispatchIds: nonEmptyList,
  editorialStatus: EditorialStatusSchema,
  provenance: z.enum(["verified", "prototype"]),
});

export const ArticleDispatchSchema = DispatchBase.extend({
  kind: z.literal("article"),
  byline: nonEmpty.optional(),
  pullQuote: nonEmpty.optional(),
});

export const VideoDispatchSchema = DispatchBase.extend({
  kind: z.literal("video"),
  provider: z.enum(["youtube", "vimeo", "bilibili"]),
  embedId: nonEmpty,
  duration: nonEmpty,
  captions: nonEmptyList,
});

export const AudioDispatchSchema = DispatchBase.extend({
  kind: z.literal("audio"),
  showName: nonEmpty,
  episode: nonEmpty.optional(),
  duration: nonEmpty,
  transcriptAvailable: z.boolean().default(false),
});

export const DocumentDispatchSchema = DispatchBase.extend({
  kind: z.literal("document"),
  issuingBody: nonEmpty,
  pageCount: z.number().int().positive(),
  documentDate: isoDate,
  keyPassage: nonEmpty.optional(),
});

export const SocialDispatchSchema = DispatchBase.extend({
  kind: z.literal("social"),
  platform: z.enum(["weibo", "x", "wechat", "xiaohongshu", "douyin"]),
  account: nonEmpty,
  captureDate: isoDate,
  archivalUrl: z.url(),
});

export const GalleryDispatchSchema = DispatchBase.extend({
  kind: z.literal("gallery"),
  imageCount: z.number().int().positive(),
  photographer: nonEmpty.optional(),
});

export const DataDispatchSchema = DispatchBase.extend({
  kind: z.literal("data"),
  methodology: nonEmpty,
  measurementPeriod: nonEmpty,
  downloadUrl: z.url().optional(),
});

export const OriginalDispatchSchema = DispatchBase.extend({
  kind: z.literal("original"),
  wordCount: z.number().int().positive().optional(),
});

export const DispatchSchema = z.discriminatedUnion("kind", [
  ArticleDispatchSchema,
  VideoDispatchSchema,
  AudioDispatchSchema,
  DocumentDispatchSchema,
  SocialDispatchSchema,
  GalleryDispatchSchema,
  DataDispatchSchema,
  OriginalDispatchSchema,
]);

export type Dispatch = z.infer<typeof DispatchSchema>;
export type DispatchKind = Dispatch["kind"];
export type EditorialStatus = z.infer<typeof EditorialStatusSchema>;
export type EvidenceStatus = z.infer<typeof EvidenceStatusSchema>;
export type Vertical = z.infer<typeof VerticalSchema>;

/* ── Compare ──────────────────────────────────────────────────────── */

export const CompareSourceSchema = z.object({
  role: z.enum(["mainland", "us", "primary"]),
  outlet: nonEmpty,
  headline: nonEmpty,
  url: z.url(),
  publishedAt: isoDate,
  language: nonEmpty,
  framing: nonEmpty,
  keyQuote: nonEmpty,
});

export const ComparisonSchema = z.object({
  slug,
  title: nonEmpty,
  intro: nonEmpty,
  sources: z.array(CompareSourceSchema).min(2),
  sharedFacts: z.array(nonEmpty).min(1),
  differingEmphasis: z.array(nonEmpty).min(1),
  editorialNotes: nonEmpty,
  relatedDispatchIds: nonEmptyList,
  provenance: z.enum(["verified", "prototype"]),
});

export type Comparison = z.infer<typeof ComparisonSchema>;

/* ── Trace ────────────────────────────────────────────────────────── */

export const TraceEntrySchema = z.object({
  id: nonEmpty,
  date: isoDate,
  phase: z.enum([
    "originalEvent",
    "mainlandReporting",
    "usReporting",
    "officialResponse",
    "followUpEvidence",
    "editorialAssessment",
  ]),
  title: nonEmpty,
  detail: nonEmpty,
  sourceLabel: nonEmpty.optional(),
  sourceUrl: z.url().optional(),
  critical: z.boolean().default(false),
  dispatchId: nonEmpty.optional(),
});

export const TraceSchema = z.object({
  slug,
  title: nonEmpty,
  intro: nonEmpty,
  currentAssessment: nonEmpty,
  assessmentStatus: EvidenceStatusSchema,
  entries: z.array(TraceEntrySchema).min(2),
  provenance: z.enum(["verified", "prototype"]),
});

export type Trace = z.infer<typeof TraceSchema>;
export type TraceEntry = z.infer<typeof TraceEntrySchema>;

/* ── Dossier ──────────────────────────────────────────────────────── */

export const DossierClaimSchema = z.object({
  text: nonEmpty,
  status: EvidenceStatusSchema,
});

export const DossierSchema = z.object({
  slug,
  title: nonEmpty,
  summary: nonEmpty,
  lastReviewed: isoDate,
  principalEntities: z.object({
    people: nonEmptyList,
    organizations: nonEmptyList,
    places: nonEmptyList,
  }),
  primaryDocuments: z.array(
    z.object({ label: nonEmpty, url: z.url(), date: isoDate })
  ),
  claims: z.array(DossierClaimSchema).min(1),
  unresolvedQuestions: z.array(nonEmpty).min(1),
  traceSlug: slug.optional(),
  dispatchIds: z.array(nonEmpty).min(1),
  provenance: z.enum(["verified", "prototype"]),
});

export type Dossier = z.infer<typeof DossierSchema>;
