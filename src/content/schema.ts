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
/** Items must be non-empty strings; the list itself may be empty (defaults to []). */
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

/* ── Evidence Atlas ──────────────────────────────────────────────── */

export const AtlasSourceClassSchema = z.enum([
  "policy",
  "legal-record",
  "screening-data",
  "trade-data",
  "filing",
  "map",
]);

export const AtlasLifecycleStageSchema = z.enum([
  "announcement",
  "publication",
  "implementation",
  "observation",
]);

export const AtlasStepKindSchema = z.enum([
  "rule",
  "scope",
  "entity",
  "date",
  "location",
  "trade",
  "disclosure",
  "effect",
  "question",
  "caveat",
]);

export const AtlasSourceRecordSchema = z.object({
  id: nonEmpty.regex(
    /^source-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a source- prefixed id"
  ),
  label: nonEmpty,
  publisher: nonEmpty,
  sourceClass: AtlasSourceClassSchema,
  canonicalUrl: z.url(),
  publishedAt: isoDate,
  retrievedAt: isoDate,
  datasetVintage: nonEmpty,
  language: nonEmpty,
  translationStatus: TranslationStatusSchema,
  snapshotId: nonEmpty,
  snapshotChecksum: nonEmpty.regex(
    /^[a-f0-9]{64}$/,
    "expected a SHA-256 checksum"
  ),
  notes: nonEmpty,
});

export const AtlasPlaceSchema = z.object({
  id: nonEmpty.regex(
    /^place-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a place- prefixed id"
  ),
  label: nonEmpty,
  coordinates: z.tuple([
    z.number().min(-180).max(180),
    z.number().min(-90).max(90),
  ]),
  precision: z.enum(["exact", "city", "country"]),
  role: nonEmpty,
  sourceIds: z.array(nonEmpty).min(1),
});

/** A drawn map connection between two places. Content-driven so the map never invents a route. */
export const AtlasRelationSchema = z.object({
  id: nonEmpty.regex(
    /^relation-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a relation- prefixed id"
  ),
  from: nonEmpty,
  to: nonEmpty,
  label: nonEmpty,
});

export const AtlasEventSchema = z.object({
  id: nonEmpty.regex(
    /^event-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected an event- prefixed id"
  ),
  date: isoDate,
  stage: AtlasLifecycleStageSchema,
  evidenceStatus: EvidenceStatusSchema,
  title: nonEmpty,
  detail: nonEmpty,
  sourceIds: z.array(nonEmpty).min(1),
  placeIds: nonEmptyList,
  chainSlugs: z.array(slug).min(1),
});

export const SignalStepSchema = z.object({
  code: nonEmpty,
  kind: AtlasStepKindSchema,
  label: nonEmpty,
  detail: nonEmpty,
  date: isoDate.optional(),
  evidenceStatus: EvidenceStatusSchema,
  sourceIds: z.array(nonEmpty).min(1),
  placeIds: nonEmptyList,
  eventIds: nonEmptyList,
});

export const SignalChainSchema = z.object({
  id: nonEmpty.regex(
    /^chain-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a chain- prefixed id"
  ),
  slug,
  eyebrow: nonEmpty,
  title: nonEmpty,
  summary: nonEmpty,
  steps: z.array(SignalStepSchema).length(4),
  conclusion: nonEmpty,
  caveat: nonEmpty,
  evidenceStatus: EvidenceStatusSchema,
  sourceIds: z.array(nonEmpty).min(1),
  placeIds: nonEmptyList,
  eventIds: nonEmptyList,
});

export const AtlasObservationSchema = z.object({
  month: nonEmpty.regex(/^\d{4}-\d{2}$/, "expected YYYY-MM"),
  value: z.number().nonnegative(),
  sourceIds: z.array(nonEmpty).min(1),
  estimated: z.boolean(),
});

export const AtlasAnnotationSchema = z.object({
  month: nonEmpty.regex(/^\d{4}-\d{2}$/, "expected YYYY-MM"),
  label: nonEmpty,
  eventId: nonEmpty,
});

export const AtlasSeriesSchema = z.object({
  id: nonEmpty.regex(
    /^series-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a series- prefixed id"
  ),
  slug,
  title: nonEmpty,
  description: nonEmpty,
  unit: z.literal("usd"),
  frequency: z.literal("monthly"),
  methodology: nonEmpty,
  sourceIds: z.array(nonEmpty).min(1),
  downloadPath: nonEmpty.regex(/^\//, "expected a root-relative path"),
  observations: z.array(AtlasObservationSchema).min(2),
  annotations: z.array(AtlasAnnotationSchema),
});

export const AtlasReleaseSchema = z.object({
  slug,
  version: nonEmpty,
  title: nonEmpty,
  summary: nonEmpty,
  methodology: nonEmpty,
  publishedAt: isoDate,
  retrievedAt: isoDate,
  dataThrough: isoDate,
  editorialStatus: EditorialStatusSchema,
  provenance: z.literal("prototype"),
  reviewState: z.literal("source-snapshot"),
  relatedDispatchIds: nonEmptyList,
  sources: z.array(AtlasSourceRecordSchema).min(1),
  chains: z.array(SignalChainSchema).min(1),
  places: z.array(AtlasPlaceSchema).min(1),
  relations: z.array(AtlasRelationSchema),
  events: z.array(AtlasEventSchema).length(4),
  series: z.array(AtlasSeriesSchema).min(1),
});

export type AtlasSourceRecord = z.infer<typeof AtlasSourceRecordSchema>;
export type AtlasPlace = z.infer<typeof AtlasPlaceSchema>;
export type AtlasRelation = z.infer<typeof AtlasRelationSchema>;
export type AtlasEvent = z.infer<typeof AtlasEventSchema>;
export type SignalChain = z.infer<typeof SignalChainSchema>;
export type AtlasSeries = z.infer<typeof AtlasSeriesSchema>;
export type AtlasRelease = z.infer<typeof AtlasReleaseSchema>;
export type AtlasLifecycleStage = z.infer<typeof AtlasLifecycleStageSchema>;
