# Public content publication methodology

## Purpose

Mainland Dispatch publishes compact source records with editorial context. A
public card is not a scraped headline and not a claim that the publisher is
neutral or complete. It records what a reviewed source says, why an editor
selected it, and which conclusions still require other evidence.

The local Desk and source-lead inbox are review surfaces. Their contents are not
public content. Only records with `editorialStatus: published` or `corrected`
can enter public streams, routes, saved views, Compare, Trace, or Dossier
relationships.

## Required checks before publication

1. **Canonical source read.** Open and read the source itself. A search result,
   social summary, discussion link, or syndication headline is discovery only.
2. **Identity and date.** Check the canonical URL, publisher, title, byline when
   available, publication date, and source language. Preserve the original date
   even when the Dispatch is curated years later. A supplied or
   redirect-resolved URL is not a publisher-verified canonical URL.
3. **Faithful summary.** Summarize the source's actual scope and avoid turning a
   period report into a timeless claim. Attribute first-party benchmarks,
   company motives, official statements, and forecasts to their speakers.
4. **Separate commentary.** `summary` describes what the canonical source
   reports; `commentary` is Mainland Dispatch's independently written analysis;
   `whyItMatters` explains why the reviewed evidence matters. Research prompts
   are never treated as proof or retained as public citations.
5. **Limitations visible.** Record paywall, translation, archival, methodology,
   denominator, or future-verification limits where they affect interpretation.
   A promised release is `officiallyAnnounced`, not `implemented`.
6. **Relationship review.** Every relation exposed by Compare, Trace, Dossier,
   related Dispatches, or Atlas must resolve to a public record or a directly
   cited source. Review-stage Dispatches cannot be used as hidden public graph
   nodes.
7. **No synthetic details.** Do not infer quotations, page counts, people,
   locations, dates, media IDs, or quantitative values to make a component look
   complete. An empty optional structure is preferable to invented precision.
8. **Quality gate.** Run the complete repository gate and inspect production at
   desktop and mobile widths for changes to public content or navigation.
9. **Search publication gate.** A public page must have one canonical URL, a
   faithful concise description, social metadata, and—where applicable—
   structured data. Review-stage content, private reader state, and Desk data
   must remain absent from sitemap and structured-data output.

## Article-to-Dispatch review

Every external article is reviewed as its own candidate. A candidate advances
only after its canonical metadata, full text, necessary primary records,
independent corroboration, later developments, and limitations have been
reviewed. Paywalled, dead, unstable, derivative, duplicate, or materially
misleading candidates are withheld or rejected rather than drafted from a
headline or snippet.

The public record contains only canonical and supporting evidence. Informal
research prompts cannot verify a claim, satisfy an Atlas source requirement, or
create a public relationship. If a prompt surfaces a useful primary record, the
editor reviews and cites that record directly.

## Evidence status vocabulary

- `reported`: a named source reports the claim; it has not been independently
  established here.
- `officiallyAnnounced`: the responsible organization states an intended or
  current action; future delivery remains open.
- `implemented`: an operative rule, published artifact, or completed release is
  directly inspectable.
- `independentlyObserved`: at least one explicitly classified independent
  corroborating source, in addition to the canonical report, confirms the
  observation. Repeating one source ID or adding a methodology source does not
  satisfy this status.
- `contested`: sources or methods materially disagree, or the available record
  cannot decide the claim.
- `superseded`, `corrected`: a later record changes the earlier state and the
  chronology preserves both.

## Current public corpus

The public archive contains reviewed source records from ChinaFile, Sixth Tone,
Made in China Journal, Rest of World, Meta AI, and ChinaTalk. It deliberately
mixes culture and everyday life with labor and technology rather than presenting
China only through crisis or bilateral competition.

The open-model Compare, Trace, and Dossier use the same three published records:
Meta's Llama 2 announcement, Meta's Llama 3.1 announcement, and ChinaTalk's
annotated translation of Liang Wenfeng's 2024 interview. Kimi K3 appears in the
chronology and Dossier only as a sourced July 20 announcement with a July 27
verification gate; its review-stage Dispatch remains outside public routes.

The wider source-lead catalog currently contains 285 records. The seven
general-China article batches account for 208 external candidates: 193 are
withheld and 15 rejected. None is drafted or public. These figures describe
editorial intake, not the size of the public archive.

## Search and indexing boundary

Only validated public selectors may feed route generation, the sitemap,
canonical metadata or structured data. `/saved` is private browser state and is
`noindex`; `/desk` is disabled by default, disallowed and `noindex`. Public
Dispatch structured data identifies the external canonical source through
`isBasedOn` without representing the source publisher's work as Mainland
Dispatch authorship.

Atlas filters and selected steps are interaction state, not independent search
documents. The default release canonicalizes to `/atlas`; each additional
published case canonicalizes to its `case` URL. See
[`seo-and-indexing.md`](seo-and-indexing.md) for the full contract.

## Revision discipline

Corrections update `updatedAt`, preserve source and curation dates, and use the
`corrected` status when the public record changes materially. Removed or broken
sources should be archived or withdrawn, not silently replaced with a different
claim. New leads remain in review until this checklist is repeated for that
specific source.
