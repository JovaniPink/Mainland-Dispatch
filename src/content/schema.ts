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

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");

const nonEmpty = z.string().trim().min(1);

const DispatchBase = z.object({
  id: nonEmpty,
  slug: nonEmpty,
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
  tags: z.array(z.string()),
  people: z.array(z.string()).default([]),
  organizations: z.array(z.string()).default([]),
  places: z.array(z.string()).default([]),
  relatedDispatchIds: z.array(z.string()).default([]),
  editorialStatus: EditorialStatusSchema,
});

export const ArticleDispatchSchema = DispatchBase.extend({
  kind: z.literal("article"),
  byline: z.string().optional(),
  pullQuote: z.string().optional(),
});

export const VideoDispatchSchema = DispatchBase.extend({
  kind: z.literal("video"),
  provider: z.enum(["youtube", "vimeo", "bilibili"]),
  embedId: z.string(),
  duration: z.string(),
  captions: z.array(z.string()).default([]),
});

export const AudioDispatchSchema = DispatchBase.extend({
  kind: z.literal("audio"),
  showName: z.string(),
  episode: z.string().optional(),
  duration: z.string(),
  transcriptAvailable: z.boolean().default(false),
});

export const DocumentDispatchSchema = DispatchBase.extend({
  kind: z.literal("document"),
  issuingBody: z.string(),
  pageCount: z.number().int().positive(),
  documentDate: isoDate,
  keyPassage: z.string().optional(),
});

export const SocialDispatchSchema = DispatchBase.extend({
  kind: z.literal("social"),
  platform: z.enum(["weibo", "x", "wechat", "xiaohongshu", "douyin"]),
  account: z.string(),
  captureDate: isoDate,
  archivalUrl: z.url(),
});

export const GalleryDispatchSchema = DispatchBase.extend({
  kind: z.literal("gallery"),
  imageCount: z.number().int().positive(),
  photographer: z.string().optional(),
});

export const DataDispatchSchema = DispatchBase.extend({
  kind: z.literal("data"),
  methodology: z.string(),
  measurementPeriod: z.string(),
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
  outlet: z.string(),
  headline: z.string(),
  url: z.url(),
  publishedAt: isoDate,
  language: z.string(),
  framing: z.string(),
  keyQuote: z.string(),
});

export const ComparisonSchema = z.object({
  slug: z.string(),
  title: z.string(),
  intro: z.string(),
  sources: z.array(CompareSourceSchema).min(2),
  sharedFacts: z.array(z.string()),
  differingEmphasis: z.array(z.string()),
  editorialNotes: z.string(),
  relatedDispatchIds: z.array(z.string()).default([]),
});

export type Comparison = z.infer<typeof ComparisonSchema>;

/* ── Trace ────────────────────────────────────────────────────────── */

export const TraceEntrySchema = z.object({
  id: z.string(),
  date: isoDate,
  phase: z.enum([
    "originalEvent",
    "mainlandReporting",
    "usReporting",
    "officialResponse",
    "followUpEvidence",
    "editorialAssessment",
  ]),
  title: z.string(),
  detail: z.string(),
  sourceLabel: z.string().optional(),
  sourceUrl: z.url().optional(),
  critical: z.boolean().default(false),
  dispatchId: z.string().optional(),
});

export const TraceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  intro: z.string(),
  currentAssessment: z.string(),
  assessmentStatus: EvidenceStatusSchema,
  entries: z.array(TraceEntrySchema).min(2),
});

export type Trace = z.infer<typeof TraceSchema>;
export type TraceEntry = z.infer<typeof TraceEntrySchema>;

/* ── Dossier ──────────────────────────────────────────────────────── */

export const DossierClaimSchema = z.object({
  text: z.string(),
  status: EvidenceStatusSchema,
});

export const DossierSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  lastReviewed: isoDate,
  principalEntities: z.object({
    people: z.array(z.string()),
    organizations: z.array(z.string()),
    places: z.array(z.string()),
  }),
  primaryDocuments: z.array(
    z.object({ label: z.string(), url: z.url(), date: isoDate })
  ),
  claims: z.array(DossierClaimSchema),
  unresolvedQuestions: z.array(z.string()),
  traceSlug: z.string().optional(),
  dispatchIds: z.array(z.string()),
});

export type Dossier = z.infer<typeof DossierSchema>;
